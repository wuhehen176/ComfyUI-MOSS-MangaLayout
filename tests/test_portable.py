import copy, json, subprocess, sys, tempfile, unittest
from pathlib import Path
from layout import validate_layout,compile_layout
class PortableChecks(unittest.TestCase):
    def test_legacy_skill_and_frame_switches(self):
        p={'position':'one','slots':{'F':[-512,-512,512,512],'S':[-450,-450,450,450]},'locked':True}
        old={'id':'legacy','canvas':{'width':1024,'height':1024},'portrait':[p],'landscape':[copy.deepcopy(p)],'usage':'Purpose','description':'Picture','promptCaption':'Direct','omitFullPageFrame':True}
        restored=validate_layout(old)
        self.assertEqual(restored['landscape'],old['landscape'])
        source={'summary':{'caption':'A quiet room.'},'items':[{'panel':1,'slot':'S','label':'character','caption':'A person sits.'}]}
        compiled=json.loads(compile_layout(json.dumps(source),restored))
        self.assertNotIn('Page frame guide',compiled['summary']['caption'])
        self.assertNotIn('Content of panel',compiled['items'][0]['caption'])
        self.assertEqual(compiled['items'][0]['bbox'],p['slots']['S'])
    def test_conflicting_primary_is_rejected(self):
        with self.assertRaises(ValueError): validate_layout({'id':'x','canvas':{'width':1024,'height':1024},'panels':[],'portrait':[{'position':'one','slots':{'F':[-512,-512,512,512]}}]})

    def test_skill_compiler_loads_the_node_package_from_an_unrelated_directory(self):
        root = Path(__file__).resolve().parents[1]
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory)/'compiled.json'
            result = subprocess.run([sys.executable, '-B', str(root/'skills/moss-comic-reference-layout/scripts/compile_template.py'),
                                     '--node-dir', str(root), '--layout', str(root/'examples/arona/layout.json'),
                                     '--prompt', str(root/'examples/arona/prompt.json'), '--output', str(output)],
                                    cwd=directory, capture_output=True)
            self.assertEqual(result.returncode, 0, result.stderr.decode(errors='replace'))
            layout = json.loads((root/'examples/arona/layout.json').read_text(encoding='utf-8'))
            source = (root/'examples/arona/prompt.json').read_text(encoding='utf-8')
            self.assertEqual(output.read_text(encoding='utf-8'), compile_layout(source, layout))
