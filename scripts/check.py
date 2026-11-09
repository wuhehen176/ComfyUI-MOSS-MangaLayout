"""One entry point for source checks; --build also refreshes the distributed web assets."""
import argparse
import os
from pathlib import Path
import subprocess
import sys
import tempfile

ROOT = Path(__file__).resolve().parents[1]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--build', action='store_true')
    args = parser.parse_args()
    parent = ROOT/'.check-tmp'
    parent.mkdir(exist_ok=True)
    with tempfile.TemporaryDirectory(dir=parent) as directory:
        env = {**os.environ, 'TEMP':directory, 'TMP':directory, 'PYTHONDONTWRITEBYTECODE':'1'}
        commands = [
            [sys.executable, '-B', 'scripts/check_file_sizes.py', '--worktree'],
            [sys.executable, '-B', '-m', 'unittest', 'discover', '-s', 'tests', '-q'],
            [sys.executable, '-B', 'scripts/export_reference_guide.py', '--check'],
            ['node', 'frontend/check.mjs'],
            ['node', 'frontend/typecheck.mjs'],
        ]
        if args.build:
            commands.append(['node', 'frontend/build.mjs'])
        for command in commands:
            print('> '+' '.join(command), flush=True)
            subprocess.run(command, cwd=ROOT, env=env, check=True)
    return 0


if __name__ == '__main__':
    try:
        sys.exit(main())
    except subprocess.CalledProcessError as error:
        sys.exit(error.returncode)
