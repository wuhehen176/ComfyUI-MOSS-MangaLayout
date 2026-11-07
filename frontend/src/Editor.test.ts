import { describe, expect, it, vi } from 'vitest';
import { createRenderer, defineComponent, nextTick, ssrContextKey } from 'vue';
import Editor from './Editor.vue';
import { quadPoints,slotRect,containsPoint,drawRect,textSlot } from '@/manga/editor';

// 在 Vue 活跃组件中执行实际 setup/指针处理器；画布只替换测量与捕获接口。
function editor(props: Record<string,unknown> = {}) {
  let state: any;
  const events: any[][] = [];
  const renderer = createRenderer<any, any>({
    createElement:()=>({}), createText:()=>({}), createComment:()=>({}),
    setText:()=>{}, setElementText:()=>{}, patchProp:()=>{}, insert:()=>{}, remove:()=>{},
    parentNode:()=>null, nextSibling:()=>null,
  });
  const app = renderer.createApp(defineComponent({ setup() {
    state = (Editor as any).setup({ sources:[], existingIds:[], ...props }, { emit:(...args:any[])=>events.push(args), expose:()=>{} });
    return ()=>null;
  } }));
  app.provide(ssrContextKey, {});
  app.mount({});
  state.preset(1024,1024);
  state.add();
  state.resetSlots();
  state.svg.value = {
    getBoundingClientRect:()=>({left:0,top:0,width:1024,height:1024}),
    setPointerCapture:()=>{}, hasPointerCapture:()=>false,
  };
  return { state, events, close:()=>app.unmount() };
}

describe('版式编辑器 Ctrl 角点交互',()=>{
  it('角点开关默认关闭，可撤销重做并随保存和重新载入保留',()=>{
    const {state,events,close}=editor();
    expect(state.doc.value.useBboxCorners).toBe(false);
    state.changeBboxCorners({target:{checked:true}});
    expect(state.doc.value.useBboxCorners).toBe(true);
    state.undo();expect(state.doc.value.useBboxCorners).toBe(false);
    state.redo();expect(state.doc.value.useBboxCorners).toBe(true);
    state.changePromptMode('manual');state.changePromptMode('llm');
    state.save();const saved=events.at(-1)[1];
    expect(saved.useBboxCorners).toBe(true);
    const loaded=editor({editingId:saved.id,sources:[{...saved,key:'saved',panels:saved.portrait??saved.landscape}]});
    loaded.state.sourceKey.value='saved';loaded.state.loadSource();
    expect(loaded.state.doc.value.useBboxCorners).toBe(true);
    loaded.state.changeBboxCorners({target:{checked:false}});loaded.state.save();
    expect(loaded.events.at(-1)[1].useBboxCorners).toBe(false);
    loaded.close();close();
  });
  it('同类内框可重复添加，各自描述、内容、坐标与形变独立保存，删除可撤销',()=>{
    const {state,events,close}=editor();
    const original=JSON.stringify(state.doc.value.panels[0].slots.S);
    state.newSlot.value='S';state.addSlot();expect(state.selectedSlot.value).toBe('S_2');
    expect(state.availableSlots.value).toContain('S');
    state.changeSlotNote({target:{value:'右侧的成年同事'}});
    state.changeRect('x',{target:{value:500}});state.changePromptMode('manual');state.addContent();
    expect(state.contentItems.value[0].label).toBe('character');
    state.changeContent(0,'caption',{target:{value:'An adult colleague at the right.'}});
    const second=JSON.stringify(state.doc.value.panels[0].slots.S_2);
    const points=quadPoints(state.doc.value.panels[0],'S_2');
    const event={button:0,pointerId:4,clientX:points[2][0],clientY:points[2][1],ctrlKey:true,altKey:false};
    state.begin(event,0,'se','S_2');state.move({...event,clientX:event.clientX-30});state.end(event);
    state.newSlot.value='S';state.addSlot();expect(state.selectedSlot.value).toBe('S_3');
    expect(JSON.stringify(state.doc.value.panels[0].slots.S)).toBe(original);
    expect(state.doc.value.panels[0].slots.S_2).toBeDefined();
    state.newSlot.value='TL';state.addSlot();expect(state.selectedSlot.value).toBe('TL_2');
    state.addContent();expect(state.contentItems.value[0].label).toBe('text');
    state.changeContent(0,'text',{target:{value:'资料齐了。'}});state.confirmSlot();state.save();
    const saved=events.at(-1)[1], panels=saved.portrait??saved.landscape;
    expect(panels[0].slotNotes.S_2).toBe('右侧的成年同事');expect(panels[0].shapes.S_2).toHaveLength(4);
    const loaded=editor({editingId:saved.id,sources:[{...saved,key:'saved',panels}]});
    loaded.state.sourceKey.value='saved';loaded.state.loadSource();
    expect(loaded.state.doc.value.panels[0].slotContents.TL_2[0].text).toBe('资料齐了。');
    expect(loaded.state.doc.value.panels[0].slotNotes.S_2).toBe('右侧的成年同事');
    loaded.state.selectSlot(0,'S_2');loaded.state.deleteSlot();
    expect(loaded.state.doc.value.panels[0].slots.S_2).toBeUndefined();
    expect(loaded.state.doc.value.panels[0].slots.S_3).toBeDefined();
    loaded.state.undo();expect(JSON.stringify(loaded.state.doc.value.panels[0].slots.S_2)).toBe(second);
    loaded.state.selectSlot(0,'S_2');loaded.state.deleteSlot();loaded.state.newSlot.value='S';loaded.state.addSlot();
    expect(loaded.state.selectedSlot.value).toBe('S_2');
    expect(loaded.state.doc.value.panels[0].slotNotes?.S_2).toBeUndefined();
    loaded.close();close();
  });
  it('普通点击不捕获指针，双击可编辑原框；实际拖动才捕获且可撤销',()=>{
    const {state,close}=editor();let captures=0;
    state.svg.value.setPointerCapture=()=>captures++;
    const event={button:0,pointerId:9,clientX:120,clientY:120,ctrlKey:false};
    const before=JSON.stringify(state.doc.value);
    for (let i=0;i<2;i++) {state.begin(event,0,'','S');state.move({...event,clientX:121});state.end(event);}
    expect(captures).toBe(0);expect(JSON.stringify(state.doc.value)).toBe(before);
    state.openDescription(0,'S');expect(state.quickEdit.value).toEqual({index:0,key:'S'});state.quickEdit.value=null;
    state.begin(event,0,'','S');state.move({...event,clientX:160,clientY:160});state.end(event);
    expect(captures).toBe(1);expect(JSON.stringify(state.doc.value)).not.toBe(before);
    state.undo();expect(JSON.stringify(state.doc.value)).toBe(before);close();
  });
  it('Ctrl滚轮只缩放预览并保持鼠标锚点，普通滚轮不拦截且坐标不变',async()=>{
    const {state,close}=editor();const before=JSON.stringify(state.doc.value);
    let prevented=0,stopped=0;
    state.canvasViewport.value={scrollLeft:0,scrollTop:0,clientHeight:500};
    state.svg.value.getBoundingClientRect=()=>({left:0,top:0,width:400*state.canvasZoom.value,height:400*state.canvasZoom.value});
    const event={ctrlKey:false,deltaY:-120,deltaMode:0,clientX:100,clientY:200,preventDefault:()=>prevented++,stopPropagation:()=>stopped++};
    state.zoomCanvas(event);expect(state.canvasZoom.value).toBe(1);expect(prevented).toBe(0);
    state.zoomCanvas({...event,ctrlKey:true});await nextTick();
    expect(state.canvasZoom.value).toBeGreaterThan(1);expect(prevented).toBe(1);expect(stopped).toBe(1);
    expect(state.canvasViewport.value.scrollLeft).toBeCloseTo(100*(state.canvasZoom.value-1));
    state.zoomCanvas({...event,ctrlKey:true,deltaY:1e6});await nextTick();expect(state.canvasZoom.value).toBe(.25);
    state.zoomCanvas({...event,ctrlKey:true,deltaY:-1e6});await nextTick();expect(state.canvasZoom.value).toBe(4);
    expect(JSON.stringify(state.doc.value)).toBe(before);close();
  });
  it('旧版描述合并到共用字段，双击快捷修改可撤销，切换模式保持内容',()=>{
    const {state,events,close}=editor({editingId:'legacy',initialKey:'legacy',existingIds:['legacy'],sources:[{id:'legacy',key:'legacy',label:'Legacy',usage:'共同场景',promptCaption:'Warm daylight.',canvas:{width:1024,height:1024},panels:[{position:'one',slots:{F:[-400,-400,400,400],S:[-300,-300,300,300]},slotNotes:{S:'人物在桌边'}}]}]});
    expect(state.doc.value.description).toBe('共同场景\n\nWarm daylight.');
    state.openDescription(0,'S');expect(state.quickDraft.value).toBe('人物在桌边');
    state.quickDraft.value='人物递出文件';state.saveQuickDescription();
    expect(state.previewDescription(state.doc.value.panels[0],'S')).toBe('人物递出文件');
    expect(state.quickEdit.value).toBeNull();state.changePromptMode('manual');
    expect(state.doc.value.panels[0].slotNotes.S).toBe('人物递出文件');
    state.changePromptMode('llm');state.undo();state.undo();state.undo();
    expect(state.doc.value.panels[0].slotNotes.S).toBe('人物在桌边');
    state.save();expect(events.at(-1)[1].description).toBe('共同场景\n\nWarm daylight.');
    close();
  });
  it('输入完成后宽高对齐最近16倍数，应用后保留比例、描述与形变',()=>{
    const {state,close}=editor();state.changeSlotNote({target:{value:'整格描述'}});
    const old=JSON.parse(JSON.stringify(state.doc.value.panels[0]));
    state.canvasWidth.value=1081;state.canvasHeight.value=1911;state.alignCanvasInput();
    expect([state.canvasWidth.value,state.canvasHeight.value]).toEqual([1088,1904]);
    state.resizeCanvas();expect([state.doc.value.width,state.doc.value.height]).toEqual([1088,1904]);
    expect(state.doc.value.panels[0].x).toBeCloseTo(Math.round(old.x*1088/1024));
    expect(state.doc.value.panels[0].slotNotes.F).toBe('整格描述');
    state.canvasWidth.value=72;state.canvasHeight.value=9000;state.alignCanvasInput();
    expect([state.canvasWidth.value,state.canvasHeight.value]).toEqual([80,8192]);close();
  });
  it('S内框可跨出外框，保存和重新载入保持轮廓及描述，不提供新增X',()=>{
    const {state,events,close}=editor();
    expect(state.availableSlots.value).not.toContain('X');
    state.selectSlot(0,'S');state.changeSlotNote({target:{value:'跨出分格的前景人物'}});
    state.changeRect('x',{target:{value:0}});state.changeRect('y',{target:{value:0}});
    state.changeRect('width',{target:{value:1024}});state.changeRect('height',{target:{value:1024}});state.confirmSlot();
    const before=quadPoints(state.doc.value.panels[0],'S');
    expect(before[0]).toEqual([0,0]);expect(before[2]).toEqual([1024,1024]);
    state.save();const saved=events.at(-1)[1];
    const loaded=editor({editingId:saved.id,sources:[{...saved,key:'saved',panels:saved.portrait??saved.landscape}]});
    loaded.state.sourceKey.value='saved';loaded.state.loadSource();
    expect(quadPoints(loaded.state.doc.value.panels[0],'S')).toEqual(before);
    expect(loaded.state.doc.value.panels[0].slotNotes.S).toBe('跨出分格的前景人物');
    loaded.close();close();
  });
  it('两种输出模式共用一个库，切换后可更新原 ID，仍保护其他版式',()=>{
    const {state,events,close}=editor({initialMode:'llm',editingId:'page',existingIds:['page','other']});
    state.doc.value.id='page';state.changePromptMode('manual');state.save();
    expect(events.at(-1)?.[0]).toBe('save');
    expect(events.at(-1)?.[1].promptMode).toBe('manual');
    state.doc.value.id='other';const count=events.length;state.save();
    expect(events.length).toBe(count);expect(state.error.value).toContain('版式库已有此 ID');
    close();
  });
  it('新增分格只有外框，手动添加的内框可删除且撤销恢复',()=>{
    const {state,events,close}=editor();
    state.add();
    expect(state.doc.value.panels[1].slots).toEqual({});
    state.newSlot.value='TR'; state.addSlot();
    expect(Object.keys(state.doc.value.panels[1].slots)).toEqual(['TR']);
    state.changePromptMode('manual');state.addContent();
    state.changeContent(0,'text',{target:{value:'请进。'}});
    state.deleteSlot();
    expect(state.doc.value.panels[1].slotContents.TR).toBeUndefined();
    state.undo();
    expect(state.doc.value.panels[1].slotContents.TR[0].text).toBe('请进。');
    state.save();
    const saved=events.findLast((event:any[])=>event[0]==='save')[1];
    expect(Object.keys(saved.portrait?.[1].slots ?? saved.landscape?.[1].slots ?? [])).toEqual(['F','TR']);
    close();
  });

  it('两种模式共用画面描述，人物和台词随保存、复制、缩放和读序移动保留',()=>{
    const {state,events,close}=editor();
    state.changeText('description',{target:{value:'用于交接文件的场景'}});
    state.changeSlotNote({target:{value:'交代场景与人物关系'}});
    state.changePromptMode('manual');
    expect(state.doc.value.description).toBe('用于交接文件的场景');
    state.changeText('description',{target:{value:'A full-color comic in warm daylight.'}});
    state.addContent();state.changeContent(0,'caption',{target:{value:'An office with a wooden desk.'}});
    state.selectSlot(0,'TR');state.addContent();state.changeContent(0,'text',{target:{value:'资料齐了。'}});state.confirmSlot();
    state.changePromptMode('llm');
    expect(state.doc.value.description).toBe('A full-color comic in warm daylight.');
    expect(state.doc.value.panels[0].slotNotes.F).toBe('交代场景与人物关系');
    state.changePromptMode('manual');
    state.duplicate();state.selectSlot(1,'TR');state.changeContent(0,'text',{target:{value:'好的。'}});state.confirmSlot();
    expect(state.doc.value.panels[0].slotContents.TR[0].text).toBe('资料齐了。');
    state.preset(1664,2496);state.reorder(-1);state.save();
    const saved=events.findLast((event:any[])=>event[0]==='save')[1];
    expect(saved).toMatchObject({promptMode:'manual',description:'A full-color comic in warm daylight.',promptCaption:'A full-color comic in warm daylight.',usage:'A full-color comic in warm daylight.'});
    expect(saved.portrait[0].slotContents.TR[0].text).toBe('好的。');
    expect(saved.portrait[1].slotContents.TR[0].text).toBe('资料齐了。');
    expect(saved.portrait[0].slotNotes.F).toBe('交代场景与人物关系');
    const loaded=editor({editingId:saved.id,sources:[{...saved,key:'saved',panels:saved.portrait}]});
    loaded.state.sourceKey.value='saved';loaded.state.loadSource();
    expect(loaded.state.doc.value.promptMode).toBe('manual');
    expect(loaded.state.doc.value.panels[1].slotContents.TR[0].text).toBe('资料齐了。');
    loaded.close();close();
  });

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


describe('编辑工作台快捷操作',()=>{
  it('多选内框和外框后批量移动、复制、锁定与删除均保留几何及撤销',()=>{
    const {state,close}=editor();state.add();
    state.chooseRegion(0,'');state.chooseRegion(1,'',true);
    expect(state.selectedRegions.value).toHaveLength(2);
    state.chooseRegion(1,'',true);expect(state.selected.value).toBe(0);state.chooseRegion(1,'',true);
    const before=JSON.stringify(state.doc.value.panels);
    state.keydown({key:'ArrowRight',target:{matches:()=>false},preventDefault:()=>{}});
    expect(JSON.stringify(state.doc.value.panels)).not.toBe(before);state.undo();
    expect(JSON.stringify(state.doc.value.panels)).toBe(before);
    state.chooseRegion(0,'');state.chooseRegion(1,'',true);state.duplicateSelection();
    expect(state.doc.value.panels).toHaveLength(4);state.lockSelected();state.deleteSelection();
    expect(state.doc.value.panels).toHaveLength(4);
    state.chooseRegion(2,'');state.chooseRegion(3,'',true);state.lockSelected();state.deleteSelection();
    expect(state.doc.value.panels).toHaveLength(2);state.undo();expect(state.doc.value.panels).toHaveLength(4);close();
  });
  it('Ctrl+S 发出保留编辑器的保存请求，只有保存回调才更新基线',()=>{
    const {state,events,close}=editor();const previous=state.baseline.value;state.save(true);
    const event=events.at(-1);expect(event[0]).toBe('save');expect(event[2]).toBe(true);expect(state.baseline.value).toBe(previous);
    event[3]();expect(state.baseline.value).toBe(state.snapshot());expect(events.some(e=>e[0]==='close')).toBe(false);close();
  });
});


function pointer(x:number,y:number,id=21) {
  return {button:0,pointerId:id,clientX:x,clientY:y,ctrlKey:false,altKey:true,shiftKey:false,preventDefault:()=>{},stopPropagation:()=>{}};
}
function draw(state:any,kind:string,parent:number,start:number[],end:number[]) {
  state.contextMenu.value={parent,hits:[],x:0,y:0,height:800};
  state.startDraw(kind);state.drawDown(pointer(start[0],start[1]));
  state.move(pointer(end[0],end[1]));state.end(pointer(end[0],end[1]));
}
describe('右键拖绘与临时聚焦',()=>{
  it('拖绘F无默认内框，一次操作只产生一条撤销，可反向绘制且不修改旧格',()=>{
    const {state,close}=editor();state.snap.value=false;
    const original=JSON.stringify(state.doc.value.panels[0]),count=state.undoStack.value.length;
    draw(state,'F',-1,[600,700],[200,300]);
    expect(state.doc.value.panels).toHaveLength(2);
    expect(state.doc.value.panels[1]).toMatchObject({x:200,y:300,width:400,height:400,slots:{}});
    expect(JSON.stringify(state.doc.value.panels[0])).toBe(original);
    expect(state.undoStack.value.length).toBe(count+1);expect(state.drawTool.value).toBeNull();
    state.undo();expect(state.doc.value.panels).toHaveLength(1);state.redo();expect(state.doc.value.panels).toHaveLength(2);close();
  });
  it('在分格内创建S/O/文字自动归所属F，跨格拖绘及重复编号保留独立区域',()=>{
    const {state,events,close}=editor();state.snap.value=false;state.add();
    const first=JSON.stringify(state.doc.value.panels[0]);
    const second=state.doc.value.panels[1];Object.assign(second,{x:300,y:300,width:400,height:400});
    draw(state,'S',1,[10,10],[900,900]);expect(state.selected.value).toBe(1);expect(state.selectedSlot.value).toBe('S');
    expect(slotRect(second,'S')).toEqual({x:10,y:10,width:890,height:890});
    draw(state,'S',1,[500,400],[650,650]);expect(state.selectedSlot.value).toBe('S_2');
    draw(state,'O',1,[500,500],[550,550]);expect(second.slots.O).toBeDefined();
    draw(state,'text',1,[520,320],[650,390]);expect(second.slots.TR).toBeDefined();
    draw(state,'text',1,[520,320],[650,390]);expect(second.slots.TR_2).toBeDefined();
    expect(JSON.stringify(state.doc.value.panels[0])).toBe(first);
    state.save();const result=events.at(-1)[1];expect(result.portrait[1].slots.S_2).toBeDefined();expect(result.portrait[1].slots.TR_2).toBeDefined();close();
  });
  it('缩放和平移后按SVG真实位置换算，反向和越出画布裁到有效范围',()=>{
    const {state,close}=editor();state.snap.value=false;
    state.svg.value.getBoundingClientRect=()=>({left:-120,top:-60,width:512,height:512});
    draw(state,'F',-1,[80,140],[-70,-10]);expect(state.doc.value.panels[1]).toMatchObject({x:100,y:100,width:300,height:300});
    expect(drawRect({x:100,y:100},{x:2000,y:-90},{width:1024,height:1024})).toEqual({x:100,y:0,width:924,height:100});close();
  });
  it('Esc、pointercancel和误点不写入文档，不添加撤销或关闭编辑器',()=>{
    const {state,events,close}=editor(),before=state.snapshot(),undos=state.undoStack.value.length;
    state.startDraw('F');state.drawDown(pointer(100,100));state.move(pointer(500,500));
    state.keydown({key:'Escape',preventDefault:()=>{},stopPropagation:()=>{}});
    expect(state.snapshot()).toBe(before);expect(state.drawPreview.value).toBeNull();expect(state.drawTool.value).toBeNull();
    state.startDraw('F');state.drawDown(pointer(100,100));state.end(pointer(600,600),true);
    draw(state,'F',-1,[100,100],[101,101]);
    expect(state.snapshot()).toBe(before);expect(state.undoStack.value.length).toBe(undos);expect(events).toEqual([]);close();
  });
  it('没有所属F或F已锁定时不创建内框；开始后父格消失时不产生孤立槽位',()=>{
    const {state,close}=editor();state.snap.value=false;
    state.selectPanel(-1);state.startDraw('O');expect(state.drawTool.value).toBeNull();
    state.doc.value.panels[0].locked=true;state.contextMenu.value={parent:0};state.startDraw('S');expect(state.drawTool.value).toBeNull();
    state.doc.value.panels[0].locked=false;state.startDraw('S');state.drawDown(pointer(100,100));state.doc.value.panels=[];state.end(pointer(500,500));
    expect(state.doc.value.panels).toEqual([]);expect(state.error.value).toContain('所属分格');close();
  });
  it('选中被盖住的F或其内框会临时置前，实际层级、读序、撤销记录及保存输出完全不变',()=>{
    const {state,events,close}=editor();state.add();state.doc.value.panels[0].layer=0;state.doc.value.panels[1].layer=9;
    state.selectPanel(-1);state.save();const output=JSON.stringify(events.at(-1)[1]);
    const before=state.snapshot(),undoCount=state.undoStack.value.length;
    state.selectPanel(0);expect(state.displayed.value.map((p:any)=>p.index)).toEqual([1,0]);expect(state.drawn.value.map((p:any)=>p.index)).toEqual([0,1]);expect(state.selectedLayer.value).toBe(0);
    state.selectSlot(0,'S');expect(state.displayed.value.at(-1).index).toBe(0);
    expect(state.snapshot()).toBe(before);expect(state.undoStack.value.length).toBe(undoCount);
    state.save();expect(JSON.stringify(events.at(-1)[1])).toBe(output);
    state.selectPanel(-1);expect(state.displayed.value.map((p:any)=>p.index)).toEqual([0,1]);close();
  });
  it('在斜框右键按实际四边形命中；菜单能选择被完全遮挡的框',()=>{
    const {state,close}=editor();state.add();
    const p=state.doc.value.panels[0];Object.assign(p,{x:0,y:0,width:200,height:200});p.slots={};p.corners.F=[[.5,0],[1,.5],[.5,1],[0,.5]];
    expect(containsPoint(p,'F',{x:10,y:10})).toBe(false);expect(containsPoint(p,'F',{x:100,y:100})).toBe(true);
    Object.assign(state.doc.value.panels[1],{x:0,y:0,width:200,height:200});
    vi.stubGlobal('window',{innerWidth:1000,innerHeight:800});
    try {
      state.menu(pointer(10,10),1);expect(state.contextMenu.value.hits.some((r:any)=>r.panel===0)).toBe(false);
      state.menu(pointer(100,100),1);expect(state.contextMenu.value.hits.map((r:any)=>r.panel)).toContain(0);
      state.chooseHit({panel:0,slot:''});expect(state.selected.value).toBe(0);expect(state.contextMenu.value).toBeNull();expect(state.displayed.value.at(-1).index).toBe(0);
    } finally {vi.unstubAllGlobals();close();}
  });
  it('文字按实际位置选槽，横向通栏使用T/B，中部使用ML/MR',()=>{
    const p={x:0,y:0,width:600,height:900};
    expect(textSlot(p,{x:30,y:20,width:540,height:100})).toBe('T');
    expect(textSlot(p,{x:30,y:780,width:540,height:100})).toBe('B');
    expect(textSlot(p,{x:10,y:400,width:100,height:100})).toBe('ML');
    expect(textSlot(p,{x:480,y:400,width:100,height:100})).toBe('MR');
  });
});
