from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]


class SizeGuardChecks(unittest.TestCase):
    def test_real_commits_check_staged_bytes_and_allow_only_shrinking_legacy_files(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)

            def git(*args):
                return subprocess.run(['git', '-c', 'user.name=Size Test', '-c', 'user.email=test@example.invalid',
                                       *args], cwd=root, capture_output=True)

            self.assertEqual(git('init', '-q').returncode, 0)
            legacy = root/'legacy.txt'
            legacy.write_text('a'*21_000)
            git('add', '.')
            self.assertEqual(git('commit', '-qm', 'Existing oversized source').returncode, 0)
            (root/'scripts').mkdir()
            (root/'.githooks').mkdir()
            (root/'scripts/check_file_sizes.py').write_bytes((ROOT/'scripts/check_file_sizes.py').read_bytes())
            (root/'.githooks/pre-commit').write_bytes((ROOT/'.githooks/pre-commit').read_bytes())
            (root/'.githooks/pre-commit').chmod(0o755)
            git('config', 'core.hooksPath', '.githooks')
            new = root/'new.txt'
            new.write_text('b'*20_001)
            git('add', '.')
            # The unstaged small copy must not disguise the oversized staged blob.
            new.write_text('small')
            rejected = git('commit', '-qm', 'Must reject')
            self.assertNotEqual(rejected.returncode, 0)
            self.assertIn(b'new.txt: 20001 bytes', rejected.stdout+rejected.stderr)
            git('add', 'new.txt')
            legacy.write_text('a'*21_001)
            git('add', 'legacy.txt')
            rejected = git('commit', '-qm', 'Must reject legacy growth')
            self.assertNotEqual(rejected.returncode, 0)
            self.assertIn(b'legacy.txt: 21001 bytes', rejected.stdout+rejected.stderr)
            legacy.write_text('a'*20_500)
            git('add', 'legacy.txt')
            self.assertEqual(git('commit', '-qm', 'Small new source and reduced legacy').returncode, 0)
            legacy.write_text('a'*20_501)
            git('add', 'legacy.txt')
            result = subprocess.run([sys.executable, '-B', 'scripts/check_file_sizes.py'], cwd=root, capture_output=True)
            self.assertNotEqual(result.returncode, 0)
            self.assertIn(b'limit 20500', result.stdout)
