import {describe,it,expect} from 'vitest';
import {combinedInstructions,formatEntry,exportEntries,purposeInstructions} from './preview';
describe('standalone library import',()=>{
  const layout={id:'page',canvas:{width:1024,height:1024},panels:[{position:'one',slots:{F:[-500,-500,500,500]}}]};
  it('accepts flat exported entries and editor portrait entries without restoring presets',()=>{
    expect(exportEntries({layouts:[layout]})).toEqual([formatEntry(layout)]);
    expect(formatEntry({...layout,panels:undefined,portrait:layout.panels}).panels).toEqual(layout.panels);
    expect(exportEntries([])).toEqual([]);
  });
  it('rejects missing geometry',()=>{
    expect(()=>formatEntry({id:'empty'})).toThrow();
  });
  it('copies per-frame purposes from the selected snapshot without coordinates or visible lettering',()=>{
    const selected={...layout,usage:'开场',panels:[{...layout.panels[0],slotNotes:{F:'介绍环境与人物关系'}}]};
    const note=purposeInstructions(selected);
    expect(note).toContain('用途说明不是台词');
    const data=JSON.parse(note.slice(note.indexOf('\n')+1));
    expect(data).toMatchObject({layout:'page',usage:'开场',panels:[{panel:1,position:'one',slots:['F'],slotNotes:{F:'介绍环境与人物关系'}}]});
    expect(note).not.toContain('-500');
    expect(exportEntries([selected])[0].panels[0].slotNotes).toEqual(selected.panels[0].slotNotes);
  });
  it('combines the format contract and the selected snapshot purposes in one copy',()=>{
    const selected={...layout,id:'saved',panels:[{...layout.panels[0],slotNotes:{F:'双人对话'}}]};
    const text=combinedInstructions('仅修改输入 JSON 格式。\n',selected);
    expect(text.startsWith('仅修改输入 JSON 格式。\n\n')).toBe(true);
    expect(text).toContain('"layout": "saved"');
    expect(text).toContain('双人对话');
    expect(text.match(/以下为当前所选版式/g)).toHaveLength(1);
  });
});
