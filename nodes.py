import hashlib
import json

from .layout import compile_layout, dumps, validate_layout


class MossMangaLayout:
    library = None
    CATEGORY = 'MOSS-Image/漫画'
    RETURN_TYPES = ('STRING', 'INT', 'INT')
    RETURN_NAMES = ('layout_prompt', 'width', 'height')
    FUNCTION = 'compile'
    OUTPUT_NODE = True

    @classmethod
    def INPUT_TYPES(cls):
        return {'required':{
            'layout_json':('STRING', {'multiline':True, 'default':'', 'tooltip':'粘贴单页 summary/items JSON，每项用 panel/slot 引用版式。'}),
            'layout_id':('STRING', {'default':'', 'tooltip':'节点选择优先，覆盖输入 JSON 中的 layout。'}),
        }, 'optional':{
            'layout_snapshot':('STRING', {'default':'', 'multiline':False}),
            'bleed':('INT', {'default':72, 'min':0, 'tooltip':'X 出框基准像素；按格数调整并裁到画布内。'}),
        }}

    @classmethod
    def selected(cls, layout_id, layout_snapshot):
        if layout_snapshot.strip():
            layout = validate_layout(json.loads(layout_snapshot))
            if layout['id'] != layout_id:
                raise ValueError('节点选择与快照 id 不一致，请重新选择版式。')
            return layout
        return cls.library.get(layout_id)

    @classmethod
    def IS_CHANGED(cls, layout_json, layout_id, layout_snapshot='', bleed=72):
        return hashlib.sha256(dumps(cls.selected(layout_id, layout_snapshot)).encode()).hexdigest()

    def compile(self, layout_json, layout_id, layout_snapshot='', bleed=72):
        layout = self.selected(layout_id, layout_snapshot)
        prompt = compile_layout(layout_json, layout, bleed)
        return {'ui':{'layout_preview':[dumps(layout)]}, 'result':(prompt, layout['canvas']['width'], layout['canvas']['height'])}
