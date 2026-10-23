import { describe, expect, it } from 'vitest';
import { createRenderer, defineComponent, ssrContextKey } from 'vue';
import Editor from './Editor.vue';
import { quadPoints } from '@/manga/editor';

// 在 Vue 活跃组件中执行实际 setup/指针处理器；画布只替换测量与捕获接口。
function editor(props: Record<string,unknown> = {}) {
  let state: any;
  const renderer = createRenderer<any, any>({
    createElement:()=>({}), createText:()=>({}), createComment:()=>({}),
    setText:()=>{}, setElementText:()=>{}, patchProp:()=>{}, insert:()=>{}, remove:()=>{},
    parentNode:()=>null, nextSibling:()=>null,
  });
  const app = renderer.createApp(defineComponent({ setup() {
    state = (Editor as any).setup({ sources:[], existingIds:[], ...props }, { emit:()=>{}, expose:()=>{} });
    return ()=>null;
  } }));
  app.provide(ssrContextKey, {});
  app.mount({});
  state.preset(1024,1024);
  state.add();
  state.svg.value = {
    getBoundingClientRect:()=>({left:0,top:0,width:1024,height:1024}),
    setPointerCapture:()=>{}, hasPointerCapture:()=>false,
  };
  return { state, close:()=>app.unmount() };
}

describe('版式编辑器 Ctrl 角点交互',()=>{
  it('内外框用途独立保存；取消恢复本次内框说明，确认保留，清空可撤销',()=>{
    const {state,close}=editor();
    const change=(value:string)=>state.changeSlotNote({target:{value}});
    change('Opening panel ');
    expect(state.doc.value.panels[0].slotNotes.F).toBe('Opening panel ');
    change('整格用于开场');
    state.selectSlot(0,'S'); change('主体用于反应特写');
    state.cancelSlot();
    expect(state.doc.value.panels[0].slotNotes).toEqual({F:'整格用于开场'});
    state.selectSlot(0,'S'); change('主体用于反应特写'); state.confirmSlot();
    expect(state.doc.value.panels[0].slotNotes).toEqual({F:'整格用于开场',S:'主体用于反应特写'});
    state.selectSlot(0,'S'); change(''); state.confirmSlot();
    expect(state.doc.value.panels[0].slotNotes.S).toBeUndefined();
    state.undo();
    expect(state.doc.value.panels[0].slotNotes.S).toBe('主体用于反应特写');
    close();
  });

  it('复制和缩放保留框用途且副本独立；删除槽位移除其用途，撤销恢复',()=>{
    const {state,close}=editor();
    state.changeSlotNote({target:{value:'外框用途'}});
    state.selectSlot(0,'S'); state.changeSlotNote({target:{value:'主体用途'}}); state.confirmSlot();
    state.duplicate();
    state.selectSlot(1,'S'); state.changeSlotNote({target:{value:'副本主体用途'}}); state.confirmSlot();
    expect(state.doc.value.panels[0].slotNotes.S).toBe('主体用途');
    state.canvasWidth.value=1664;state.canvasHeight.value=2496;state.resizeCanvas();
    expect(state.doc.value.panels[1].slotNotes).toEqual({F:'外框用途',S:'副本主体用途'});
    state.selectSlot(1,'S');state.deleteSlot();
    expect(state.doc.value.panels[1].slotNotes.S).toBeUndefined();
    state.undo();
    expect(state.doc.value.panels[1].slotNotes.S).toBe('副本主体用途');
    close();
  });

  it('左右下字区可独立调整和删除，恢复默认槽位后重新出现',()=>{
    const {state,close}=editor();
    const right=JSON.stringify(state.doc.value.panels[0].slots.BR);
    state.selectSlot(0,'BL');
    state.changeRect('x',{target:{value:150}});
    state.confirmSlot();
    expect(JSON.stringify(state.doc.value.panels[0].slots.BR)).toBe(right);
    state.selectSlot(0,'BL'); state.deleteSlot(); state.confirmSlot();
    expect(state.doc.value.panels[0].slots.BL).toBeUndefined();
    expect(state.doc.value.panels[0].slots.BR).toBeDefined();
    state.resetSlots();
    expect(state.doc.value.panels[0].slots.BL).toBeDefined();
    expect(state.doc.value.panels[0].slots.ML).toBeDefined();
    close();
  });
  it('层级独立于读序，移动层级可撤销且重新排列读序不改变遮挡',()=>{
    const {state,close}=editor(); state.add();
    const first=state.doc.value.panels[0], second=state.doc.value.panels[1];
    state.selectPanel(0); state.moveLayer(1);
    expect(state.doc.value.panels[0]).toBe(first);
    expect(state.drawn.value.map((item:any)=>item.index)).toEqual([1,0]);
    state.undo();
    expect(state.drawn.value.map((item:any)=>item.index)).toEqual([0,1]);
    state.redo();
    expect(state.drawn.value.map((item:any)=>item.index)).toEqual([1,0]);
    const top=state.doc.value.panels[0];
    state.reorder(1);
    expect(state.doc.value.panels[1]).toBe(top);
    expect(state.drawn.value.at(-1).rect).toBe(top);
    state.resizeCanvas();
    expect(state.doc.value.panels[1].layer).toBe(1);
    close();
  });
  it('内框默认全部可见，确认和重新载入后保持显示；总开关仍可关闭',()=>{
    const {state,close}=editor();
    const visible=()=>state.visibleSlots(state.doc.value.panels[0],0).map((slot:any)=>slot.key).sort();
    const keys=Object.keys(state.doc.value.panels[0].slots).sort();
    expect(visible()).toEqual(keys);
    state.selectSlot(0,'R');
    state.changeRect('x',{target:{value:300}});
    const rect=JSON.stringify(state.doc.value.panels[0].slots.R);
    state.confirmSlot();
    expect(state.selectedSlot.value).toBe('');
    expect(state.visibleSlots(state.doc.value.panels[0],0).map((slot:any)=>slot.key)).toContain('R');
    expect(JSON.stringify(state.doc.value.panels[0].slots.R)).toBe(rect);
    state.restore(JSON.stringify(state.doc.value));
    expect(visible()).toEqual(keys);
    state.slotsPreview.value=false;
    expect(state.visibleSlots(state.doc.value.panels[0],0)).toEqual([]);
    state.slotsPreview.value=true;
    expect(visible()).toEqual(keys);
    close();
  });
  it('可视化编辑载入原 ID 和名称，不自动新建副本',()=>{
    const {state,close}=editor({editingId:'original',existingIds:['original'],sources:[{key:'original:portrait',id:'original',label:'原版式',canvas:{width:1088,height:1920},panels:[{position:'one',slots:{F:[-900,-500,900,500],R:[-800,0,800,450]}}]}]});
    state.sourceKey.value='original:portrait'; state.loadSource();
    expect(state.doc.value.id).toBe('original');
    expect(state.doc.value.label).toBe('原版式');
    expect(state.positions.value).toEqual(['one']);
    state.duplicate();
    expect(state.positions.value).toEqual(['one','panel-2']);
    state.reorder(-1);
    expect(state.positions.value[1]).toBe('one');
    state.resizeCanvas();
    expect(state.positions.value[1]).toBe('one');
    close();
  });
  it('确定内框保留修改并返回外框，取消恢复形变且不会留下已取消的撤销记录',()=>{
    const {state,close}=editor();
    state.selectSlot(0,'T');
    state.changeRect('x',{target:{value:200}});
    const confirmed=JSON.stringify(state.doc.value);
    state.confirmSlot();
    expect(state.selectedSlot.value).toBe('');
    expect(state.selected.value).toBe(0);
    expect(JSON.stringify(state.doc.value)).toBe(confirmed);
    const history=[...state.undoStack.value];
    state.selectSlot(0,'T');
    const points=quadPoints(state.doc.value.panels[0],'T');
    const event={button:0,pointerId:1,clientX:points[2][0],clientY:points[2][1],ctrlKey:true,altKey:false};
    state.begin(event,0,'se','T');
    state.move({...event,clientX:event.clientX-40,clientY:event.clientY+40});
    state.end(event);
    state.changeRect('y',{target:{value:210}});
    expect(JSON.stringify(state.doc.value)).not.toBe(confirmed);
    state.cancelSlot();
    expect(state.selectedSlot.value).toBe('');
    expect(JSON.stringify(state.doc.value)).toBe(confirmed);
    expect(state.undoStack.value).toEqual(history);
    expect(state.redoStack.value).toEqual([]);
    state.undo(); state.redo();
    expect(JSON.stringify(state.doc.value)).toBe(confirmed);
    close();
  });
  it('切换内框保留上一项，取消当前内框不影响之前修改；删除仍作用于选中槽位',()=>{
    const {state,close}=editor();
    state.selectSlot(0,'T');
    state.changeRect('x',{target:{value:200}});
    const confirmed=JSON.stringify(state.doc.value);
    state.selectSlot(0,'S');
    state.changeRect('x',{target:{value:240}});
    state.cancelSlot();
    expect(JSON.stringify(state.doc.value)).toBe(confirmed);
    state.selectSlot(0,'T'); state.deleteSlot();
    expect(state.doc.value.panels[0].slots.T).toBeUndefined();
    expect(state.doc.value.panels[0].slots.S).toBeDefined();
    close();
  });
  it('普通四角只缩放，Ctrl+四角只移动目标角点，Ctrl+边中点仍为缩放',()=>{
    for (const [ctrlKey,handle] of [[false,'se'],[true,'se'],[true,'e']] as const) {
      const {state,close}=editor();
      const before=quadPoints(state.doc.value.panels[0],'T');
      const event={button:0,pointerId:1,clientX:before[2][0],clientY:before[2][1],ctrlKey,altKey:false};
      state.begin(event,0,handle,'T');
      state.move({...event,clientX:event.clientX-40,clientY:event.clientY+40});
      state.end(event);
      const after=quadPoints(state.doc.value.panels[0],'T');
      if (ctrlKey && handle==='se') {
        expect(after[0]).toEqual(before[0]); expect(after[1]).toEqual(before[1]); expect(after[3]).toEqual(before[3]);
        expect(after[2][0]).toBeCloseTo(before[2][0]-40);
        expect(after[2][1]).toBeCloseTo(before[2][1]+40);
      } else {
        expect(after[0][1]).toBeCloseTo(after[1][1]); expect(after[1][0]).toBeCloseTo(after[2][0]);
        expect(after[2][1]).toBeCloseTo(after[3][1]); expect(after[3][0]).toBeCloseTo(after[0][0]);
        expect(after[1][0]).not.toBe(before[1][0]);
        if (handle==='e') expect(after[2][1]).toBeCloseTo(before[2][1]);
      }
      close();
    }
  });
});
