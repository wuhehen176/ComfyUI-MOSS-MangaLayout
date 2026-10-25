import hashlib
import json

from .layout import compile_layout, dumps, manual_source, validate_layout


class MossMangaLayout:
    library = None
    libraries = None
    CATEGORY = 'MOSS-Image/漫画'
    RETURN_TYPES = ('STRING', 'INT', 'INT')
    RETURN_NAMES = ('layout_prompt', 'width', 'height')
    FUNCTION = 'compile'
    OUTPUT_NODE = True

    @classmethod
    def INPUT_TYPES(cls):
        return {'required':{
            'layout_json':('STRING', {'multiline':True, 'default':'', 'tooltip':'支持普通画面提示词、单页 Layout JSON，或含一个 JSON 代码块的 LLM 回复。JSON 按 panel/slot 编译，代码块外说明不进入生图。节点不调用 LLM。直接提示词模式使用编辑器保存的内容。'}),
            'layout_id':('STRING', {'default':'', 'tooltip':'节点选择优先，覆盖输入 JSON 中的 layout。'}),
        }, 'optional':{
            'layout_snapshot':('STRING', {'default':'', 'multiline':False}),
        }}

    @classmethod
    def selected(cls, layout_id, layout_snapshot, library_mode='llm'):
        if layout_snapshot.strip():
            layout = validate_layout(json.loads(layout_snapshot))
            if layout['id'] != layout_id:
                raise ValueError('节点选择与快照 id 不一致，请重新选择版式。')
            return layout
        if cls.library is None and cls.libraries is not None:
            return cls.libraries[library_mode].get(layout_id)
        return cls.library.get(layout_id)

    @classmethod
    def IS_CHANGED(cls, layout_json, layout_id, layout_snapshot='', bleed=72, library_mode='llm'):
        return hashlib.sha256(dumps(cls.selected(layout_id, layout_snapshot, library_mode)).encode()).hexdigest()

    def compile(self, layout_json, layout_id, layout_snapshot='', bleed=72, library_mode='llm'):
        layout = self.selected(layout_id, layout_snapshot, library_mode)
        source = manual_source(layout) if layout.get('promptMode') == 'manual' else layout_json
        prompt = compile_layout(source, layout, bleed)
        return {'ui':{'layout_preview':[dumps(layout)]}, 'result':(prompt, layout['canvas']['width'], layout['canvas']['height'])}
