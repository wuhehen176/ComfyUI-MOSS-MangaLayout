import copy
import importlib
import json
from pathlib import Path
import sys
import tempfile
import types
import unittest


ROOT = Path(__file__).resolve().parents[1]
package = types.ModuleType('moss_layout_test')
package.__path__ = [str(ROOT)]
sys.modules[package.__name__] = package
core = importlib.import_module('moss_layout_test.layout')
store = importlib.import_module('moss_layout_test.store')
node = importlib.import_module('moss_layout_test.nodes').MossMangaLayout
SEEDS = json.loads((ROOT/'initial_layouts.json').read_text(encoding='utf-8'))


def source(*items):
    return json.dumps({'layout':'ignored', 'summary':{'caption':'A full-color comic page.', 'meta':['anime']}, 'items':list(items)}, ensure_ascii=False)


def item(panel=1, slot='S', **extra):
    return {'panel':panel, 'slot':slot, 'label':'character', 'caption':'An adult in a jacket.', **extra}


class LayoutChecks(unittest.TestCase):
    def test_frame_notes_survive_library_and_snapshot_but_do_not_become_image_content(self):
        layout=copy.deepcopy(SEEDS[0])
        layout['panels'][0]['slotNotes']={' f ':'  交代场景  ','S':'主体反应','DELETED':'已删除','T':23}
        checked=core.validate_layout(layout)
        self.assertEqual(checked['panels'][0]['slotNotes'],{'F':'交代场景','S':'主体反应'})
        self.assertIn(' f ',layout['panels'][0]['slotNotes'])
        with tempfile.TemporaryDirectory() as directory:
            library=store.LayoutLibrary(Path(directory)/'layouts.json')
            revision=library.read()['revision']
            library.save([checked],revision)
            self.assertEqual(library.get(checked['id'])['panels'][0]['slotNotes'],checked['panels'][0]['slotNotes'])
            snapshot=core.dumps(checked)
            self.assertEqual(node.selected(checked['id'],snapshot),checked)
            compiled=core.compile_layout(source(item(slot='S')),checked)
            self.assertNotIn('主体反应',compiled)
            self.assertNotIn('slotNotes',compiled)
            self.assertNotIn('主体反应',core.format_instructions(checked))
            checked['panels'][0]['slotNotes']['S']='库里的新用途'
            library.save([checked],library.read()['revision'])
            self.assertEqual(node.selected(checked['id'],snapshot)['panels'][0]['slotNotes']['S'],'主体反应')

    def test_real_enabled_library_compiles_all_panels_without_losing_contents(self):
        self.assertEqual({entry['id'] for entry in SEEDS}, {'arona_wave_cutout','toki_furcloak_cutout'})
        self.assertEqual(len({entry['id'] for entry in SEEDS}), len(SEEDS))
        for layout in SEEDS:
            core.validate_layout(layout)
            items = [item(i+1, next(key for key in panel['slots'] if key != 'X'), tags=['jacket']) for i, panel in enumerate(layout['panels'])]
            result = json.loads(core.compile_layout(source(*items), layout))
            self.assertEqual(len(result['items']),len(items))
            self.assertEqual(result['bbox_coord_space'],'abs_centralized')
            self.assertNotIn('layout',result)
            for index, output in enumerate(result['items']):
                self.assertEqual(output['bbox'],layout['panels'][index]['slots'][items[index]['slot']])
                self.assertEqual(output['tags'],['jacket'])
                self.assertNotIn('panel',output)
                self.assertTrue(output['caption'].startswith(f'Content of panel {index+1}:'))

    def test_panel_and_slot_mismatch_are_errors_including_missing_T(self):
        layout=copy.deepcopy(SEEDS[0])
        layout['panels'][0]['slots'].pop('T',None)
        layout['panels'][0].get('shapes',{}).pop('T',None)
        for bad in (item(99), item(1,'MISSING'), item(1,'T'), item(True)):
            with self.assertRaises(ValueError):
                core.compile_layout(source(bad),layout)

    def test_dialogue_is_kept_verbatim_and_repeated_regions_are_split(self):
        layout=SEEDS[0]
        spoken='等一下。\n请把门打开。'
        first=item(slot='TL',label='text',caption='Speech by Alice.',text=spoken)
        second=item(slot='TL',label='text',caption='Speech by Alice.',text='好的。')
        result=json.loads(core.compile_layout(source(first,second),layout))
        a,b=result['items']
        self.assertEqual(a['text'],spoken)
        self.assertLess(a['bbox'][2],b['bbox'][0])
        self.assertEqual(a['bbox'][1::2],b['bbox'][1::2])
        self.assertEqual(len(result['items']),2)

    def test_shape_layers_and_bleed(self):
        layout=copy.deepcopy(SEEDS[0])
        frame=layout['panels'][0]['slots']['F']
        top,left,bottom,right=frame
        layout['panels'][0].setdefault('shapes',{})['F']=[[left+10,top],[right,top],[right,bottom],[left,bottom]]
        layout['panels'][1]['slots']['F']=frame.copy()
        layout['panels'][0]['layer']=10
        layout['panels'][1]['layer']=0
        result=json.loads(core.compile_layout(source(item(slot='X')),layout))
        caption=result['summary']['caption']
        self.assertIn('panel 1 is in front of panel 2',caption)
        self.assertIn('clockwise corners xy',caption)
        self.assertIn('Reading sequence: panel 1 then panel 2',caption)
        box=result['items'][0]['bbox']
        self.assertLessEqual(box[0],top)
        self.assertGreaterEqual(box[2],bottom)
        self.assertGreaterEqual(box[0],-layout['canvas']['height']/2)

    def test_bad_geometry_json_and_empty_text(self):
        layout=copy.deepcopy(SEEDS[0])
        layout['panels'][0]['slots']['S']=[0,0,0,0]
        with self.assertRaises(ValueError):core.validate_layout(layout)
        for text in ('```json\n{}\n```','{"summary":{"caption":NaN}}'):
            with self.assertRaises(ValueError):core.compile_layout(text,SEEDS[0])
        with self.assertRaises(ValueError):core.compile_layout(source(item(label='text',text='')),SEEDS[0])

    def test_snapshots_survive_library_edit_delete_and_empty_library_stays_empty(self):
        with tempfile.TemporaryDirectory() as directory:
            library=store.LayoutLibrary(Path(directory)/'layouts.json',ROOT/'initial_layouts.json')
            node.library=library
            initial=library.read()
            snapshot=core.dumps(SEEDS[0])
            edited=copy.deepcopy(SEEDS[0]);edited['label']='Changed'
            revised=library.save([edited],initial['revision'])
            self.assertEqual(node.selected(edited['id'],snapshot)['label'],SEEDS[0]['label'])
            with self.assertRaises(store.LibraryConflict):library.save([],initial['revision'])
            library.save([],revised['revision'])
            self.assertEqual(library.read()['layouts'],[])
            output=node().compile(source(item()),SEEDS[0]['id'],snapshot)
            self.assertEqual(output['result'][1:],(1664,2496))
            self.assertEqual(json.loads(output['ui']['layout_preview'][0])['label'],SEEDS[0]['label'])
            with self.assertRaises(ValueError):node.selected('different',snapshot)
            with self.assertRaises(ValueError):library.get(SEEDS[0]['id'])

    def test_format_instruction_lists_only_current_format(self):
        text=core.format_instructions(SEEDS[0])
        self.assertIn('summary',text)
        self.assertIn('panel',text)
        self.assertIn('TL',text)
        self.assertIn('BR',text)
        self.assertNotIn('jacket',text)
        self.assertIn('不增加或改写画面内容',text)


if __name__=='__main__':
    unittest.main()
