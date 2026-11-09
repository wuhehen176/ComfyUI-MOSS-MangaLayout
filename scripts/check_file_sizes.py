"""Check staged source blobs: new files <=20 KB; existing oversized files may only shrink."""
import argparse
from pathlib import Path
import subprocess
import sys

LIMIT = 20_000
TEXT = {'.py', '.ts', '.vue', '.js', '.mjs', '.cjs', '.css', '.md', '.txt', '.json', '.yml', '.yaml', '.sh'}
GENERATED = {'initial_layouts.json', 'docs/ComfyUI-MOSS漫画节点-参考图反推说明.txt'}


def git(root, *args):
    return subprocess.check_output(['git', *args], cwd=root, stderr=subprocess.DEVNULL)


def excluded(path):
    return (Path(path).suffix.lower() not in TEXT or path.startswith(('web/', 'examples/'))
            or path in GENERATED or Path(path).name in {'package-lock.json', 'pnpm-lock.yaml', 'yarn.lock'})


def check_sizes(root, worktree=False):
    paths = git(root, 'diff', '--name-only', '--diff-filter=ACMR', '-z', *([] if worktree else ['--cached'])).decode('utf-8').split('\0')
    if worktree:
        paths += git(root, 'diff', '--cached', '--name-only', '--diff-filter=ACMR', '-z').decode('utf-8').split('\0')
        paths += git(root, 'ls-files', '--others', '--exclude-standard', '-z').decode('utf-8').split('\0')
    errors = []
    for path in sorted(set(paths)-{''}):
        if excluded(path) or (worktree and not (root/path).is_file()):
            continue
        size = (root/path).stat().st_size if worktree else int(git(root, 'cat-file', '-s', ':'+path))
        try:
            previous = int(git(root, 'cat-file', '-s', 'HEAD:'+path))
        except subprocess.CalledProcessError:
            previous = 0
        limit = max(LIMIT, previous)
        if size > limit:
            errors.append(f'{path}: {size} bytes (limit {limit}); split by responsibility. Existing oversized files may only shrink.')
    return errors


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--worktree', action='store_true', help='Check modified/untracked files without staging them.')
    args = parser.parse_args()
    root = Path(git(Path.cwd(), 'rev-parse', '--show-toplevel').decode().strip())
    errors = check_sizes(root, args.worktree)
    print('\n'.join(errors) if errors else 'File sizes OK.')
    sys.exit(bool(errors))
