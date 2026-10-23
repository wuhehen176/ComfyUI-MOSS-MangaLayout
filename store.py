import hashlib
import json
import os
from pathlib import Path
import threading
import uuid

from .layout import dumps, validate_layout


class LibraryConflict(ValueError):
    pass


class LayoutLibrary:
    def __init__(self, path, seed=None):
        self.path = Path(path)
        self.seed = Path(seed) if seed else None
        self.lock = threading.RLock()

    def read(self):
        with self.lock:
            if not self.path.exists():
                data = [validate_layout(entry) for entry in json.loads(self.seed.read_text(encoding='utf-8'))] if self.seed else []
                self._write(data)
            layouts = json.loads(self.path.read_text(encoding='utf-8'))
            return {'layouts':layouts, 'revision':hashlib.sha256(dumps(layouts).encode()).hexdigest()}

    def get(self, layout_id):
        layout = next((entry for entry in self.read()['layouts'] if entry['id'] == layout_id), None)
        if layout is None:
            raise ValueError('版式不在库中，请选择现有版式或使用工作流保存的快照。')
        return validate_layout(layout)

    def save(self, layouts, revision):
        if not isinstance(layouts, list):
            raise ValueError('版式库需要 JSON 数组。')
        layouts = [validate_layout(layout) for layout in layouts]
        if len({layout['id'] for layout in layouts}) != len(layouts):
            raise ValueError('版式 id 不能重复。')
        with self.lock:
            if self.read()['revision'] != revision:
                raise LibraryConflict('版式库已变化，请刷新版式库后重新保存；当前节点快照未修改。')
            self._write(layouts)
            return self.read()

    def _write(self, layouts):
        self.path.parent.mkdir(parents=True, exist_ok=True)
        temporary = self.path.with_name(self.path.name+'.'+uuid.uuid4().hex+'.tmp')
        try:
            temporary.write_text(json.dumps(layouts, ensure_ascii=False, indent=2), encoding='utf-8')
            os.replace(temporary, self.path)
        finally:
            temporary.unlink(missing_ok=True)
