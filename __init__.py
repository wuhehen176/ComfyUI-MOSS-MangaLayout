from pathlib import Path

import folder_paths
from aiohttp import web
from server import PromptServer

from .layout import compile_layout, format_instructions, manual_source, validate_layout
from .nodes import MossMangaLayout
from .store import LayoutLibrary, LibraryConflict


LIBRARY_ROOT = Path(folder_paths.get_user_directory())/'default'/'moss_manga_layout'
LIBRARY = LayoutLibrary(LIBRARY_ROOT/'layouts.json', Path(__file__).parent/'initial_layouts.json', legacy_paths=[LIBRARY_ROOT/'manual_layouts.json'])
LIBRARIES = {'llm':LIBRARY, 'manual':LIBRARY}
MossMangaLayout.library = LIBRARY
MossMangaLayout.libraries = LIBRARIES
NODE_CLASS_MAPPINGS = {'MossMangaLayout':MossMangaLayout}
NODE_DISPLAY_NAME_MAPPINGS = {'MossMangaLayout':'MOSS 漫画版式控制'}
WEB_DIRECTORY = './web'


def request_library(request):
    mode = request.query.get('mode', 'llm')
    if mode not in LIBRARIES:
        raise ValueError('版式库类型需要 llm 或 manual。')
    return mode, LIBRARY


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
            return web.json_response({'text':compile_layout(manual_source(layout), layout)})
        except (ValueError, TypeError, AttributeError, KeyError) as error:
            return web.json_response({'error':str(error)}, status=400)
