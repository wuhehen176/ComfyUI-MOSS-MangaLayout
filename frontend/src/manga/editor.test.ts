import {describe,it,expect} from 'vitest';
import {deformCorner,editablePanel,fitRect,panelFromRect,panelRect,quadPoints,saveEditedPanel,setSlotRect,slotRect,snapRect} from './editor';
import {parseCustomLayout} from './layouts';

describe('editable layout geometry',()=>{
  it('拒绝角点交叉，不破坏原槽位，外框也能变成凸四边形', () => {
    const canvas={width:1024,height:1024};
    const panel=editablePanel({x:100,y:100,width:600,height:600},canvas);
    const before=JSON.stringify(panel);
    expect(deformCorner(panel,'F',[[100,100],[700,700],[700,100],[100,700]],canvas)).toBe(false);
    expect(JSON.stringify(panel)).toBe(before);
    expect(deformCorner(panel,'F',[[100,100],[700,100],[700,700],[100,500]],canvas)).toBe(true);
    expect(saveEditedPanel(panel,canvas,'one').shapes?.F).toEqual([[-412,-412],[188,-412],[188,188],[-412,-12]]);
  });
  it('自定义非默认槽位可保留，删除全部内框仍保留 F，复制不应共享槽位对象', () => {
    const canvas = { width: 1024, height: 1024 };
    const source = { position:'one', slots:{F:[-400,-400,400,400],ML:[-300,-390,0,-200]} };
    const panel = editablePanel(panelRect(source,canvas),canvas,source);
    expect(Object.keys(panel.slots)).toEqual(['ML']);
    const copy = JSON.parse(JSON.stringify(panel));
    delete copy.slots.ML;
    expect(panel.slots.ML).toBeDefined();
    expect(saveEditedPanel(copy,canvas,'one').slots).toEqual({F:source.slots.F});
  });
  it('任意横画布的槽位均有正面积，越界移动缩放被限制', () => {
    const canvas = { width: 1600, height: 900 };
    const rect = fitRect({ x: -10, y: 899, width: 2400, height: 1 }, canvas);
    expect(rect).toEqual({ x: 0, y: 876, width: 1600, height: 24 });
    const panel = panelFromRect(rect, canvas, 'panel-1');
    const custom = parseCustomLayout(JSON.stringify({ id: 'wide', canvas, landscape: [panel] }));
    expect(custom.canvas).toEqual(canvas);
    expect(Object.keys(panel.slots)).toEqual(['F','C','S','T','B','TL','TR','BL','BR','ML','MR','L','R','O']);
    expect(() => parseCustomLayout(JSON.stringify({ ...custom, canvas: { width: 1599, height: 900 } }))).toThrow(/偶数/);
    const alternate = parseCustomLayout(JSON.stringify({ ...custom, canvas: { width: 900, height: 1600 } }));
    expect(alternate.canvas).toEqual({ width: 900, height: 1600 });
    expect(alternate.landscape).toEqual(custom.landscape);
  });
  it('按邻格边缘吸附，同时保持框内尺寸和最小分格', () => {
    const canvas = { width: 1024, height: 1024 };
    const rect = snapRect({ x: 202, y: 101, width: 200, height: 300 }, canvas, [{ x: 400, y: 100, width: 200, height: 300 }], 6);
    expect(rect.x).toBe(200);
    expect(rect.y).toBe(100);
    expect(rect.width).toBe(200);
    expect(snapRect({ x: 0, y: 0, width: 21, height: 20 }, canvas, [], 6, true).width).toBeGreaterThanOrEqual(24);
  });
  it('preserves notes and layers through save/reload without compiler dependencies',()=>{
    const canvas={width:1024,height:1024};
    const panel=editablePanel({x:100,y:100,width:600,height:600},canvas);
    panel.layer=3;panel.slotNotes={F:'Scene',S:'Person',REMOVED:'Unused'};
    const saved=saveEditedPanel(panel,canvas,'one');
    const parsed=parseCustomLayout(JSON.stringify({id:'notes',canvas,portrait:[saved]}));
    expect(parsed.portrait?.[0].slotNotes).toEqual({F:'Scene',S:'Person'});
    const loaded=editablePanel(panelRect(saved,canvas),canvas,saved);
    expect(loaded.layer).toBe(3);
    expect(saveEditedPanel(loaded,canvas,'one')).toEqual(saved);
  });
  it('keeps deleted slots deleted when the parent moves and scales',()=>{
    const canvas={width:1024,height:1024};
    const panel=editablePanel({x:100,y:200,width:600,height:400},canvas);
    setSlotRect(panel,'T',{x:140,y:220,width:300,height:80});delete panel.slots.S;
    Object.assign(panel,{x:200,y:250,width:300,height:600});
    const saved=saveEditedPanel(panel,canvas,'one');
    expect(saved.slots.T).toEqual([-232,-292,-112,-142]);
    expect(saved.slots.S).toBeUndefined();
    expect(saveEditedPanel(editablePanel(panelRect(saved,canvas),canvas,saved),canvas,'one')).toEqual(saved);
  });
  it('keeps a shaped text region through resize and reload',()=>{
    const canvas={width:1024,height:1024};const panel=editablePanel({x:100,y:100,width:600,height:600},canvas);
    const points=quadPoints(panel,'T');points[2][1]+=100;expect(deformCorner(panel,'T',points,canvas)).toBe(true);
    const shaped=saveEditedPanel(panel,canvas,'one');
    expect(saveEditedPanel(editablePanel(panelRect(shaped,canvas),canvas,shaped),canvas,'one')).toEqual(shaped);
    setSlotRect(panel,'T',{x:100,y:100,width:400,height:200});expect(quadPoints(panel,'T')[0]).toEqual([100,100]);
  });
});
