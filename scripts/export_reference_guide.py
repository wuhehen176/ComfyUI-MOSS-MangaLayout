"""Export the standalone TXT from the skill's canonical layout rules."""
import argparse
from pathlib import Path


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true', help='Fail if the published TXT differs from the core rules.')
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    source = root/'skills/moss-comic-reference-layout/references/layout-rules.md'
    target = root/'docs/ComfyUI-MOSS漫画节点-参考图反推说明.txt'
    expected = source.read_bytes()
    if args.check:
        if not target.is_file() or target.read_bytes() != expected:
            parser.exit(1, 'Reference guide is out of date; run scripts/export_reference_guide.py.\n')
        print('Reference guide matches the canonical layout rules.')
        return
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_bytes(expected)
    print(f'Exported {target.relative_to(root)}')


if __name__ == '__main__':
    main()
