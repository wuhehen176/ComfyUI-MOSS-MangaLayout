from pathlib import Path

import folder_paths
from aiohttp import web
from server import PromptServer

from .layout import compile_layout, format_instructions, manual_source, validate_layout
from .nodes import MossMangaLayout
from .store import LayoutLibrary, LibraryConflict


LIBRARY = LayoutLibrary(Path(folder_paths.get_user_directory())/'default'/'moss_manga_layout'/'layouts.json', Path(__file__).parent/'initial_layouts.json')
LIBRARIES = {'llm':LIBRARY, 'manual':LayoutLibrary(Path(folder_paths.get_user_directory())/'default'/'moss_manga_layout'/'manual_layouts.json')}
MossMangaLayout.library = LIBRARY
MossMangaLayout.libraries = LIBRARIES
NODE_CLASS_MAPPINGS = {'MossMangaLayout':MossMangaLayout}
NODE_DISPLAY_NAME_MAPPINGS = {'MossMangaLayout':'MOSS 漫画版式控制'}
WEB_DIRECTORY = './web'


def request_library(request):
    mode = request.query.get('mode', 'llm')
    if mode not in LIBRARIES:
        raise ValueError('版式库类型需要 llm 或 manual。')
    return mode, LIBRARIES[mode]


if getattr(PromptServer, 'instance', None) is not None:
    @PromptServer.instance.routes.get('/moss_manga_layout/library')
    async def read_library(request):
        try:
            _, library = request_library(request)
            return web.json_response(library.read())
        except ValueError as error:
            return web.json_response({'error':str(error)}, status=400)

    @PromptServer.instance.routes.post('/moss_manga_layout/library')
    async def save_library(request):
        try:
            body = await request.json()
            mode, library = request_library(request)
            layouts = body.get('layouts')
            if isinstance(layouts, list) and any(not isinstance(entry, dict) or entry.get('promptMode', 'llm') != mode for entry in layouts):
                raise ValueError('版式模式与目标库不一致，请分别保存到对应版式库。')
            return web.json_response(library.save(layouts, body.get('revision')))
        except LibraryConflict as error:
            return web.json_response({'error':str(error)}, status=409)
        except (ValueError, TypeError, AttributeError) as error:
            return web.json_response({'error':str(error)}, status=400)

    @PromptServer.instance.routes.post('/moss_manga_layout/format')
    async def copy_format(request):
        try:
            layout = validate_layout(await request.json())
            return web.json_response({'text':format_instructions(layout)})
        except (ValueError, TypeError, AttributeError) as error:
            return web.json_response({'error':str(error)}, status=400)

    @PromptServer.instance.routes.post('/moss_manga_layout/manual')
    async def copy_manual_prompt(request):
        try:
            body = await request.json()
            layout = validate_layout(body['layout'])
            if layout.get('promptMode') != 'manual':
                raise ValueError('请先在编辑器切换到直接提示词模式并保存。')
            bleed = body.get('bleed', 72)
            if not isinstance(bleed, int) or isinstance(bleed, bool) or not 0 <= bleed <= 8192:
                raise ValueError('出框像素需要 0～8192 的整数。')
            return web.json_response({'text':compile_layout(manual_source(layout), layout, bleed)})
        except (ValueError, TypeError, AttributeError, KeyError) as error:
            return web.json_response({'error':str(error)}, status=400)
