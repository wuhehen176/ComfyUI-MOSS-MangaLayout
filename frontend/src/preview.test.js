import {describe,it,expect} from 'vitest';
import {combinedInstructions,formatEntry,exportEntries,purposeInstructions,renderPreview} from './preview';
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
  it('编号字区保留完整名称、独立描述，并显示在预览中',()=>{
    const selected={...layout,panels:[{...layout.panels[0],slots:{...layout.panels[0].slots,TL:[-450,-450,-300,-100],TL_2:[-250,-450,-100,-100]},slotNotes:{TL:'第一句',TL_2:'第二句'}}]};
    const text=purposeInstructions(selected);expect(text).toContain('"TL_2"');expect(text).toContain('第二句');
    expect(formatEntry(selected).panels[0].slots.TL_2).toEqual([-250,-450,-100,-100]);
    const labels=[];const ctx=new Proxy({fillText:value=>labels.push(value)},{get:(target,key)=>key in target?target[key]:()=>{}});
    renderPreview({width:500,height:500,getContext:()=>ctx},selected,true);
    expect(labels).toContain('TL');expect(labels).toContain('TL_2');
  });
  it('keeps both editing pages and handwritten contents in exports without leaking them into LLM purposes',()=>{
    const manual={...layout,promptMode:'manual',promptCaption:'A bright office.',panels:[{...layout.panels[0],slotNotes:{F:'用途'},slotContents:{F:[{label:'character',caption:'A woman in a navy jacket.'}]}}]};
    expect(exportEntries([manual])[0]).toEqual(formatEntry(manual));
    expect(formatEntry(manual).promptMode).toBe('manual');
    expect(formatEntry(manual).promptCaption).toBe('A bright office.');
    expect(formatEntry(manual).panels[0].slotContents).toEqual(manual.panels[0].slotContents);
    expect(purposeInstructions(manual)).toContain('用途');
    expect(purposeInstructions(manual)).not.toContain('navy jacket');
  });
  it('copies per-frame purposes from the selected snapshot without coordinates or visible lettering',()=>{
    const selected={...layout,usage:'开场',panels:[{...layout.panels[0],slotNotes:{F:'介绍环境与人物关系'}}]};
    const note=purposeInstructions(selected);
    expect(note).toContain('画面描述本身不是台词');
    const data=JSON.parse(note.slice(note.indexOf('\n')+1));
    expect(data).toMatchObject({layout:'page',description:'开场',panels:[{panel:1,position:'one',slots:['F','X'],slotNotes:{F:'介绍环境与人物关系'}}]});
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
