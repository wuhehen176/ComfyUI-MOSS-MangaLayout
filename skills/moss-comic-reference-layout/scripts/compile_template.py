"""Compile an editable template using the installed node's own compiler."""
import argparse
import importlib.util
import json
from pathlib import Path


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--node-dir', required=True, type=Path)
    parser.add_argument('--layout', required=True, type=Path)
    parser.add_argument('--prompt', required=True, type=Path)
    parser.add_argument('--output', required=True, type=Path)
    parser.add_argument('--bleed', type=int, default=72)
    args = parser.parse_args()
    compiler = args.node_dir/'layout.py'
    if not compiler.is_file():
        parser.error(f'Node compiler not found: {compiler}')
    spec = importlib.util.spec_from_file_location('moss_reference_compiler', compiler)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    layout = json.loads(args.layout.read_text(encoding='utf-8-sig'))
    prompt = args.prompt.read_text(encoding='utf-8-sig')
    compiled = module.compile_layout(prompt, layout, args.bleed)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(compiled, encoding='utf-8')
    print(f'Compiled {layout["id"]}: {len(layout["panels"])} panels -> {args.output}')


if __name__ == '__main__':
    main()
