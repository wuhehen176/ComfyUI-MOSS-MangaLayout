import json
from pathlib import Path
import unittest
from layout import validate_layout


class ContractChecks(unittest.TestCase):
    def test_shared_frontend_backend_cases(self):
        cases = json.loads((Path(__file__).parent/'fixtures/layout-contract.json').read_text(encoding='utf-8'))
        for case in cases:
            with self.subTest(case=case['name']):
                if case['valid']:
                    validate_layout(case['layout'])
                else:
                    with self.assertRaises(ValueError):
                        validate_layout(case['layout'])
