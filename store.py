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
        self.directory = self.path.with_suffix('')
        self.index = self.directory/'index.json'
        self.seed = Path(seed) if seed else None
        self.lock = threading.RLock()

    def read(self):
        with self.lock:
            if not self.index.exists():
                source = self.path if self.path.exists() else self.seed
                data = [validate_layout(entry) for entry in json.loads(source.read_text(encoding='utf-8'))] if source else []
                self._write(data)
            layouts = [validate_layout(json.loads((self.directory/name).read_text(encoding='utf-8'))) for name in self._files()]
            return {'layouts':layouts, 'revision':hashlib.sha256(dumps(layouts).encode()).hexdigest()}

    def _files(self):
        if not self.index.exists():
            return []
        index = json.loads(self.index.read_text(encoding='utf-8'))
        files = index.get('files') if isinstance(index, dict) else None
        if not isinstance(files, list) or any(not isinstance(name, str) or Path(name).name != name or not name.startswith('layout-') or not name.endswith('.json') for name in files) or len(set(files)) != len(files):
            raise ValueError('版式库索引无效，请保留文件后检查 index.json。')
        return files

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

    @staticmethod
    def _atomic(path, text):
        temporary = path.with_name(path.name+'.'+uuid.uuid4().hex+'.tmp')
        try:
            temporary.write_text(text, encoding='utf-8')
            os.replace(temporary, path)
        finally:
            temporary.unlink(missing_ok=True)

    def _write(self, layouts):
        self.directory.mkdir(parents=True, exist_ok=True)
        previous, files, created = self._files(), [], []
        try:
            for layout in layouts:
                label = ''.join(c if c.isalnum() or c in '-_' else '_' for c in layout['id'])[:32]
                digest = hashlib.sha256(dumps(layout).encode()).hexdigest()[:32]
                name = f'layout-{label}-{digest}.json'
                path = self.directory/name
                if not path.exists():
                    self._atomic(path, json.dumps(layout, ensure_ascii=False, indent=2))
                    created.append(path)
                files.append(name)
            # Each layout has its own immutable file. One atomic index switch
            # commits the whole library, so partial writes keep the old version.
            self._atomic(self.index, json.dumps({'version':1, 'files':files}, ensure_ascii=False, indent=2))
        except BaseException:
            for path in created:
                try:
                    path.unlink(missing_ok=True)
                except OSError:
                    pass
            raise
        for name in set(previous)-set(files):
            try:
                (self.directory/name).unlink(missing_ok=True)
            except OSError:
                pass
