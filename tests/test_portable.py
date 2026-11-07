import copy, json, unittest
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
