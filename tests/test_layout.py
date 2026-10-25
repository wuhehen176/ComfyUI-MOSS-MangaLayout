import copy
import importlib
import json
from pathlib import Path
import sys
import tempfile
import types
import unittest
from unittest.mock import patch


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
    def test_cross_panel_s_and_shared_descriptions_compile_without_text(self):
        layout={'id':'shared','description':'A full-color quiet office.','promptMode':'manual','canvas':{'width':1024,'height':1024},'panels':[{'position':'one','slots':{'F':[-400,-400,400,400],'S':[-500,-500,480,480]},'slotNotes':{'S':'An adult holding a folder in the foreground.'}}]}
        output=json.loads(core.compile_layout(core.manual_source(layout),layout,bleed=0))
        self.assertEqual(output['items'][0]['bbox'],[-500,-500,480,480])
        self.assertNotIn('speech bubble',output['summary']['caption'])
        self.assertNotIn('library_mode',node.INPUT_TYPES()['optional'])
        self.assertIn('continuous foreground subject region extending across the outer border',output['summary']['caption'])
        legacy=copy.deepcopy(layout);legacy.pop('description');legacy['usage']='Office';legacy['promptCaption']='Warm light.'
        self.assertEqual(core.validate_layout(legacy)['description'],'Office\n\nWarm light.')

    def test_plain_prompt_and_json_are_detected_without_changing_manual_mode(self):
        layout=copy.deepcopy(SEEDS[0]);before=copy.deepcopy(layout)
        plain='A full-color comic in a quiet office.\n第一格：成年人在桌边递出文件；第二格：对方点头。'
        result=node().compile(plain,layout['id'],core.dumps(layout))['result']
        self.assertTrue(result[0].endswith(plain))
        self.assertIn(f'exactly {len(layout["panels"])} distinct comic panels',result[0])
        self.assertIn('outer frame yxyx',result[0]);self.assertIn('Reading sequence:',result[0])
        self.assertNotIn('Visible lettering follows',result[0])
        self.assertEqual(result[1:],(1664,2496));self.assertEqual(layout,before)
        structured=json.loads(core.compile_layout(source(item(slot='F')),layout))
        self.assertEqual(structured['items'][0]['bbox'],layout['panels'][0]['slots']['F'])
        for invalid in ('', '   ', '{"summary":', '[{"caption":"wrong root"}]', '```json\n{}\n```'):
            with self.assertRaises(ValueError):core.compile_layout(invalid,layout)
        layout['promptMode']='manual'
        layout['panels'][0]['slotContents']={'F':[{'label':'object','caption':'An empty office.'}]}
        manual=node().compile(plain,layout['id'],core.dumps(layout))['result'][0]
        self.assertIn('An empty office.',manual);self.assertNotIn('第一格：成年人',manual)

    def test_library_unifies_legacy_modes_once_and_keeps_conflicting_ids(self):
        with tempfile.TemporaryDirectory() as directory:
            original=Path(directory)/'layouts.json'
            original.write_text(json.dumps(SEEDS),encoding='utf-8')
            old_bytes=original.read_bytes()
            direct_path=Path(directory)/'manual_layouts.json'
            direct=copy.deepcopy(SEEDS[0]);direct['promptMode']='manual';direct['promptCaption']='A quiet office.'
            manual=store.LayoutLibrary(direct_path)
            manual.save([direct],manual.read()['revision'])
            unified=store.LayoutLibrary(original,legacy_paths=[direct_path])
            initial=unified.read()
            self.assertEqual(len(initial['layouts']),len(SEEDS)+1)
            self.assertEqual(original.read_bytes(),old_bytes)
            self.assertEqual(len(list(unified.directory.glob('layout-*.json'))),len(SEEDS)+1)
            self.assertTrue(unified.migration_marker.exists())
            renamed=next(entry for entry in initial['layouts'] if entry.get('promptMode')=='manual')
            self.assertTrue(renamed['id'].endswith('_manual'))
            self.assertIn('A quiet office.',renamed['description'])
            self.assertEqual(unified.read(),initial)
            snapshot=core.dumps(renamed)
            old_library=node.library
            try:
                node.library=unified
                self.assertEqual(node.selected(renamed['id'],'','llm'),node.selected(renamed['id'],'','manual'))
                unified.save([],initial['revision'])
                self.assertEqual(unified.read()['layouts'],[])
                self.assertEqual(node.selected(renamed['id'],snapshot)['description'],renamed['description'])
                self.assertEqual(len(manual.read()['layouts']),1)
            finally:node.library=old_library

    def test_individual_file_save_keeps_old_library_when_index_commit_fails(self):
        with tempfile.TemporaryDirectory() as directory:
            library=store.LayoutLibrary(Path(directory)/'layouts.json')
            initial=library.read();library.save([SEEDS[0]],initial['revision'])
            previous=library.read();files=library._files()
            changed=copy.deepcopy(SEEDS[0]);changed['label']='Changed'
            replace=store.os.replace
            def failing_replace(source,destination):
                if Path(destination)==library.index:raise OSError('Simulated index failure')
                return replace(source,destination)
            with patch.object(store.os,'replace',side_effect=failing_replace):
                with self.assertRaises(OSError):library.save([changed],previous['revision'])
            self.assertEqual(library.read(),previous)
            self.assertEqual(library._files(),files)
            self.assertEqual(len(list(library.directory.glob('layout-*.json'))),1)

    def test_manual_mode_compiles_f_only_panels_and_keeps_llm_input_independent(self):
        layout={'id':'manual','canvas':{'width':1024,'height':1024},'promptMode':'manual','promptCaption':'An office in soft daylight.','usage':'LLM用途','panels':[
            {'position':'one','slots':{'F':[-500,-500,-20,500]},'slotNotes':{'F':'开场格'},'slotContents':{'F':[{'label':'object','caption':'A wooden desk.'},{'label':'character','caption':'An adult woman holding a folder.'}]}},
            {'position':'two','slots':{'F':[20,-500,500,500]},'slotContents':{'F':[{'label':'object','caption':'The folder on the same desk.'},{'label':'text','caption':'','text':'资料齐了。'},{'label':'text','caption':'','text':'好的。'}]}},
        ]}
        snapshot=core.dumps(layout)
        result=node().compile('This is retained as a separate LLM input.',layout['id'],snapshot)['result']
        compiled=json.loads(result[0]);self.assertEqual(result[1:],(1024,1024))
        self.assertEqual(len(compiled['items']),6)
        self.assertEqual(compiled['items'][0]['bbox'],layout['panels'][0]['slots']['F'])
        first,second=compiled['items'][-2:]
        self.assertEqual([first['text'],second['text']],['资料齐了。','好的。'])
        self.assertLess(first['bbox'][2],second['bbox'][0])
        self.assertIn('large legible glyphs',first['caption'])
        self.assertIn('LLM用途',result[0]);self.assertIn('开场格',result[0]);self.assertNotIn('slotContents',result[0])
        llm=copy.deepcopy(layout);llm['promptMode']='llm'
        self.assertEqual(len(json.loads(node().compile(source(item(slot='F')),llm['id'],core.dumps(llm))['result'][0])['items']),1)
        self.assertEqual(json.loads(snapshot),layout)

    def test_manual_empty_drafts_language_fonts_and_invalid_contents(self):
        layout={'id':'manual','canvas':{'width':1024,'height':1024},'promptMode':'manual','panels':[{'position':'one','slots':{'F':[-500,-500,500,500]},'slotContents':{'F':[{'label':'object','caption':''}]}}]}
        with self.assertRaisesRegex(ValueError,'尚未填写'):core.manual_source(layout)
        entries=[{'label':'text','caption':'','text':'请看最后一页。'},{'label':'text','caption':'Narration.','text':'这份清单我已经逐项核对过了，你看一下。','textType':'narration'},{'label':'text','caption':'','text':'ドン','textType':'sfx'}]
        layout['panels'][0]['slotContents']['F']=entries
        generated=json.loads(core.manual_source(layout));self.assertEqual([item['text'] for item in generated['items']],[item['text'] for item in entries])
        self.assertIn('medium legible glyphs',generated['items'][0]['caption']);self.assertIn('small legible glyphs',generated['items'][1]['caption'])
        self.assertIn('Japanese handwritten sound effect',generated['items'][2]['caption'])
        for bad in ({'MISSING':entries},{'F':'wrong'},{'F':[{'label':'wrong','caption':''}]}):
            changed=copy.deepcopy(layout);changed['panels'][0]['slotContents']=bad
            with self.assertRaises(ValueError):core.validate_layout(changed)
        layout['panels'][0]['slotContents']['F']=[{'label':'text','caption':'Speech.','text':''}]
        with self.assertRaisesRegex(ValueError,'准确台词'):core.manual_source(layout)
        layout['panels'][0]['slotContents']['F']=[{'label':'object','caption':'A quiet empty room.'}]
        output=core.compile_layout(core.manual_source(layout),layout)
        self.assertNotIn('speech bubble',output.lower());self.assertNotIn('Visible lettering',output)
        with tempfile.TemporaryDirectory() as directory:
            library=store.LayoutLibrary(Path(directory)/'layouts.json')
            library.save([layout],library.read()['revision'])
            self.assertEqual(library.get(layout['id'])['panels'][0]['slotContents'],layout['panels'][0]['slotContents'])

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
