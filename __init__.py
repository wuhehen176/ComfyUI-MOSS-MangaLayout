from pathlib import Path

import folder_paths
from aiohttp import web
from server import PromptServer

from .layout import format_instructions, validate_layout
from .nodes import MossMangaLayout
from .store import LayoutLibrary, LibraryConflict


LIBRARY = LayoutLibrary(Path(folder_paths.get_user_directory())/'default'/'moss_manga_layout'/'layouts.json', Path(__file__).parent/'initial_layouts.json')
MossMangaLayout.library = LIBRARY
NODE_CLASS_MAPPINGS = {'MossMangaLayout':MossMangaLayout}
NODE_DISPLAY_NAME_MAPPINGS = {'MossMangaLayout':'MOSS 漫画版式控制'}
WEB_DIRECTORY = './web'


if getattr(PromptServer, 'instance', None) is not None:
    @PromptServer.instance.routes.get('/moss_manga_layout/library')
    async def read_library(request):
        return web.json_response(LIBRARY.read())

    @PromptServer.instance.routes.post('/moss_manga_layout/library')
    async def save_library(request):
        try:
            body = await request.json()
            return web.json_response(LIBRARY.save(body.get('layouts'), body.get('revision')))
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
