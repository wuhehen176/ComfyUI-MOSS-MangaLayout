<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, shallowRef } from 'vue';
import ModalMask from '@/components/ModalMask.vue';
import { canvasOf, normalizeCanvas, orientationOf, parseCustomLayout, sharedDescription, slotType, type MangaCustomLayout, type ResolvedLayout, type ManualContent } from '@/manga/layouts';
import { containsPoint, drawRect, nextSlot, textSlot, clamp, deformCorner, editablePanel, fitRect, MIN_PANEL, panelRect, quadPoints, saveEditedPanel, setSlotRect, slotRect, snapRect, type EditablePanel, type PanelRect } from '@/manga/editor';

import {regions,bounds,moveRegions,alignRegions,duplicateRegions,deleteRegions,splitPanel,type Region} from '@/manga/editorActions';

const props = defineProps<{ sources: (ResolvedLayout & { key: string })[]; existingIds: string[]; initialKey?: string; editingId?: string; initialMode?: 'llm' | 'manual' }>();
const emit = defineEmits<{ close: []; save: [layout:MangaCustomLayout,keepOpen?:boolean,done?:()=>void] }>();
interface LayoutDocument { metadata?:Record<string,any>; id: string; label: string; description: string; promptMode: 'llm' | 'manual'; useBboxCorners: boolean; omitFullPageFrame?:boolean; omitSmallFrames?:boolean; width: number; height: number; panels: EditablePanel[] }
function unusedId(base: string): string {
  let id = base, suffix = 2;
  while (props.existingIds.includes(id)) id = `${base}_${suffix++}`;
  return id;
}
const doc = ref<LayoutDocument>({ id: unusedId('my_layout'), label: '自定义版式', description: '', promptMode:props.initialMode ?? 'llm', useBboxCorners:false, width: 1088, height: 1920, panels: [] });
const selected = ref(-1);
const selectedSlot = ref('');
const selection=ref<Region[]>([]);
const selectedRegions=computed(()=>regions(doc.value.panels,selection.value));
const showObjects=ref(true),showProperties=ref(true);
const contextMenu=ref<{x:number;y:number;height:number;parent:number;hits:Region[]}|null>(null);
const showCreate=ref(false);
type DrawKind='F'|'S'|'O'|'text';
const drawTool=shallowRef<{kind:DrawKind;parent:EditablePanel|null}|null>(null);
const drawPreview=ref<PanelRect|null>(null);
let drawing:{id:number;start:{x:number;y:number}}|null=null;
const drawOwner=computed(()=>drawTool.value?.parent ? doc.value.panels.indexOf(drawTool.value.parent) : -1);
const canDrawInner=computed(()=>!!contextMenu.value && !!doc.value.panels[contextMenu.value.parent] && !doc.value.panels[contextMenu.value.parent].locked);
function startDraw(kind:DrawKind):void {
  const parent=kind==='F'?null:doc.value.panels[contextMenu.value?.parent ?? selected.value];
  if(kind!=='F' && (!parent || parent.locked)){error.value='请先选择一个未锁定的 F 分格。';return;}
  cancelDraw();confirmSlot();drawTool.value={kind,parent};contextMenu.value=null;error.value='';
  svg.value?.focus?.();
}
function releasePointer(id:number):void {if(svg.value?.hasPointerCapture(id))svg.value.releasePointerCapture(id);}
function cancelDraw():void {
  const id=drawing?.id;drawing=null;drawPreview.value=null;drawTool.value=null;
  if(id!==undefined)releasePointer(id);
  gestureBounds=null;
}
function drawDown(event:PointerEvent):void {
  if(!drawTool.value || event.button!==0 || spaceHeld)return;
  event.preventDefault();event.stopPropagation();
  svg.value?.focus?.();gestureBounds=svg.value!.getBoundingClientRect();
  drawing={id:event.pointerId,start:point(event)};
  drawPreview.value=drawRect(drawing.start,drawing.start,canvas.value);
  svg.value!.setPointerCapture(event.pointerId);
}
function updateDraw(event:PointerEvent):void {
  if(!drawing || event.pointerId!==drawing.id)return;
  let rect=drawRect(drawing.start,point(event),canvas.value);
  if(rect.width>0 && rect.height>0 && snap.value && !event.altKey){
    const parent=drawTool.value?.parent;
    const others=parent ? [parent,...Object.keys(parent.slots).map(key=>slotRect(parent,key))] : doc.value.panels;
    const threshold=6*doc.value.width/gestureBounds!.width;
    rect=snapRect(rect,canvas.value,others,threshold,false,1);
    rect=snapRect(rect,canvas.value,others,threshold,true,1);
  }
  drawPreview.value=rect;
}
function finishDraw(event:PointerEvent,cancel:boolean):void {
  if(!drawing || event.pointerId!==drawing.id)return;
  if(!cancel)updateDraw(event);
  const tool=drawTool.value!,start=drawing,rect=drawPreview.value!;
  const raw=drawRect(start.start,point(event),canvas.value);
  const screen=gestureBounds!;
  const valid=!cancel && raw.width*screen.width/doc.value.width>=4 && raw.height*screen.height/doc.value.height>=4 && rect.width>=(tool.kind==='F'?MIN_PANEL:1) && rect.height>=(tool.kind==='F'?MIN_PANEL:1);
  cancelDraw();
  if(!valid)return;
  if(tool.kind==='F'){
    edit(()=>{
      const panel=editablePanel(rect,canvas.value);panel.slots={};
      panel.layer=Math.max(-1,...doc.value.panels.map((p,i)=>p.layer??i))+1;
      doc.value.panels.push(panel);
    });
    selectPanel(doc.value.panels.length-1);
  } else {
    const index=doc.value.panels.indexOf(tool.parent!);
    if(index<0 || tool.parent!.locked){error.value='所属分格已变化，请重新选择后绘制。';return;}
    const key=nextSlot(tool.parent!,tool.kind==='text'?textSlot(tool.parent!,rect):tool.kind);
    edit(()=>setSlotRect(tool.parent!,key,rect));selectSlot(index,key);
  }
}
function chooseHit(hit:Region):void {selectSlot(hit.panel,hit.slot);contextMenu.value=null;}
function hitLabel(hit:Region):string {return `第 ${hit.panel+1} 格 · ${hit.slot || 'F'}${doc.value.panels[hit.panel].locked?' · 已锁定':''}`;}

const savedId=ref(props.editingId??'');
let spaceHeld=false;
let navigation:{id:number;x:number;y:number;left:number;top:number}|null=null;
const marquee=ref<{x:number;y:number;width:number;height:number}|null>(null);
let marqueeStart:{x:number;y:number;selection:Region[]}|null=null;
function chooseRegion(index:number,key='',extend=false):void {
  if(extend){
    const list=[...selectedRegions.value],at=list.findIndex(r=>r.panel===index&&r.slot===key);
    if(at>=0)list.splice(at,1);else list.push({panel:index,slot:key});
    const active=list.at(-1);if(active)selectSlot(active.panel,active.slot);else selectPanel(-1);selection.value=list;
  } else selectSlot(index,key);
}
function selectedRegion(index:number,key=''):boolean {return selectedRegions.value.some(r=>r.panel===index&&r.slot===key);}
function batch(action:()=>void):void {const key=selectedSlot.value;edit(action);selection.value=regions(doc.value.panels,selection.value);if(key&&current.value?.slots[key])selectedSlot.value=key;}
function duplicateSelection():void {batch(()=>{selection.value=duplicateRegions(doc.value.panels,selectedRegions.value,canvas.value);});const r=selection.value.at(-1);if(r){selected.value=r.panel;selectedSlot.value=r.slot;}}
function deleteSelection():void {batch(()=>deleteRegions(doc.value.panels,selectedRegions.value));selection.value=[];selectPanel(-1);}
function alignSelection(mode:string):void {batch(()=>alignRegions(doc.value.panels,selectedRegions.value,mode,canvas.value));}
function splitSelection(axis:'x'|'y'):void {try{batch(()=>splitPanel(doc.value.panels,selected.value,axis));selection.value=[{panel:selected.value,slot:''}];}catch(e){error.value=String(e instanceof Error?e.message:e);}}
function lockSelected():void {
 const ids=[...new Set(selectedRegions.value.map(r=>r.panel))],locked=ids.every(i=>doc.value.panels[i].locked);
 edit(()=>ids.forEach(i=>doc.value.panels[i].locked=!locked));
}
function fitView(selectedOnly=false):void {
  canvasZoom.value=1;
  void nextTick(()=>{
    const viewport=canvasViewport.value;if(!viewport||!svg.value)return;
    if(!selectedOnly){viewport.scrollLeft=0;viewport.scrollTop=0;return;}
    const box=bounds(doc.value.panels,selectedRegions.value);if(!box)return;
    const rect=svg.value.getBoundingClientRect();
    canvasZoom.value=clamp(Math.min(viewport.clientWidth/(box.width/doc.value.width*rect.width),viewport.clientHeight/(box.height/doc.value.height*rect.height))*.85,.25,4);
    void nextTick(()=>{const after=svg.value!.getBoundingClientRect(),outer=viewport.getBoundingClientRect();viewport.scrollLeft+=after.left-outer.left+(box.x+box.width/2)/doc.value.width*after.width-viewport.clientWidth/2;viewport.scrollTop+=after.top-outer.top+(box.y+box.height/2)/doc.value.height*after.height-viewport.clientHeight/2;});
  });
}
function viewportDown(e:PointerEvent):void {
 if(!spaceHeld && e.button!==1)return;
 e.preventDefault();e.stopPropagation();const v=canvasViewport.value!;
 navigation={id:e.pointerId,x:e.clientX,y:e.clientY,left:v.scrollLeft,top:v.scrollTop};v.setPointerCapture(e.pointerId);
}
function viewportMove(e:PointerEvent):void {if(navigation?.id===e.pointerId){const v=canvasViewport.value!;v.scrollLeft=navigation.left+navigation.x-e.clientX;v.scrollTop=navigation.top+navigation.y-e.clientY;}}
function viewportUp(e:PointerEvent):void {if(navigation?.id===e.pointerId){navigation=null;const v=canvasViewport.value!;if(v.hasPointerCapture(e.pointerId))v.releasePointerCapture(e.pointerId);}}
function blankDown(e:PointerEvent):void {if(e.button!==0||spaceHeld)return;const p=point(e);marqueeStart={...p,selection:e.shiftKey?[...selection.value]:[]};marquee.value={...p,width:0,height:0};svg.value!.setPointerCapture(e.pointerId);}
function menu(e:MouseEvent,index=-1,key=''):void {
  e.preventDefault();e.stopPropagation();if(drawing || gesture)return;
  cancelDraw();
  if(index>=0 && !selectedRegion(index,key))selectSlot(index,key);
  const p=point(e),hits:Region[]=[];
  for(const {rect:panel,index:i} of [...drawn.value].reverse()){
    for(const slot of Object.keys(panel.slots).reverse())if(containsPoint(panel,slot,p))hits.push({panel:i,slot});
    if(containsPoint(panel,'F',p))hits.push({panel:i,slot:''});
  }
  showCreate.value=false;
  const y=Math.max(8,Math.min(e.clientY,window.innerHeight-360));
  contextMenu.value={x:Math.max(8,Math.min(e.clientX,window.innerWidth-238)),y,height:window.innerHeight-y-8,parent:index>=0?index:selected.value,hits};
}

const sourceKey = ref(props.initialKey ?? '');
const snap = ref(true);
const slotsPreview = ref(true);
const error = ref('');
const discard = ref(false);
const dialog = ref<HTMLElement>();
const svg = ref<SVGSVGElement>();
const canvasViewport = ref<HTMLDivElement>();
const canvasZoom = ref(1);
const canvasWidth = ref(1088), canvasHeight = ref(1920);
const undoStack = ref<string[]>([]), redoStack = ref<string[]>([]);
const baseline = ref('');
const current = computed(() => doc.value.panels[selected.value]);
const activeRect = computed(() => current.value ? selectedSlot.value && current.value.slots[selectedSlot.value] ? slotRect(current.value, selectedSlot.value) : current.value : null);
const slotLabels: Record<string,string> = { C:'内区', S:'主体', T:'顶部文字', B:'底部文字', TL:'左上文字', TR:'右上文字', BL:'左下文字', BR:'右下文字', L:'左人物', R:'右人物', O:'道具/音效', ML:'左侧文字', MR:'右侧文字', E:'有限越线' };
const newSlot = ref('S');
const availableSlots = computed(() => current.value ? ['C','S','T','B','TL','TR','BL','BR','ML','MR','L','R','O'] : []);
const slotToAdd = computed(() => availableSlots.value.includes(newSlot.value) ? newSlot.value : availableSlots.value[0] ?? '');
const contentItems = computed(() => current.value?.slotContents?.[selectedSlot.value || 'F'] ?? []);
const quickEdit = ref<{index: number; key: string} | null>(null);
const quickDraft = ref('');
const quickField = ref<HTMLTextAreaElement>();
let slotSession: { before: string; undo: string[]; redo: string[] } | null = null;
function confirmSlot(): void {
  lastInput=null;
  slotSession = null; selectedSlot.value = '';
}
function cancelSlot(): void {
  if (slotSession) {
    const session = slotSession;
    restore(session.before);
    undoStack.value = session.undo; redoStack.value = session.redo;
  }
  confirmSlot();
}
function selectPanel(index: number): void { confirmSlot(); selected.value = index; selection.value=index<0?[]:[{panel:index,slot:''}]; }
function selectSlot(index: number, key: string): void {
  if (selected.value === index && selectedSlot.value === key) return;
  selectPanel(index);
  if (key && current.value?.slots[key]) {
    slotSession = { before: snapshot(), undo: [...undoStack.value], redo: [...redoStack.value] };
    selectedSlot.value = key; selection.value=[{panel:index,slot:key}]; slotsPreview.value = true;
  }
}
function setActiveRect(rect: PanelRect): void {
  if (!current.value || current.value.locked) return;
  if (selectedSlot.value) setSlotRect(current.value, selectedSlot.value, rect);
  else doc.value.panels[selected.value] = { ...current.value, ...rect };
}
function deleteSlot(): void {
  const key = selectedSlot.value;
  if (current.value && key) edit(() => { delete current.value!.slots[key]; delete current.value!.corners[key]; if (current.value!.slotNotes) delete current.value!.slotNotes[key]; if (current.value!.slotContents) delete current.value!.slotContents[key]; });
}
function addSlot(): void {
  const base = slotToAdd.value;
  if (!current.value || !base) return;
  const key=nextSlot(current.value,base);
  edit(() => {
    const panel=current.value!, template=slotRect(editablePanel(panel,canvas.value),base);
    const offset=24*Object.keys(panel.slots).filter(key=>slotType(key)===base).length;
    setSlotRect(panel,key,fitRect({...template,x:template.x+offset,y:template.y+offset},canvas.value,1));
  });
  selectSlot(selected.value,key);
}
function resetSlots(): void {
  if (current.value) edit(() => { const panel=current.value!; panel.slots = {...editablePanel(panel, canvas.value).slots}; panel.corners = Object.fromEntries(Object.entries(panel.corners).filter(([key])=>key==='F')); selectedSlot.value = ''; });
}
function visibleSlots(panel: EditablePanel, index: number): { key: string; rect: PanelRect }[] {
  if (!slotsPreview.value) return [];
  return Object.keys(panel.slots)
    .sort((a,b) => Number(selectedRegion(index,a))-Number(selectedRegion(index,b)) || Number(index===selected.value&&a===selectedSlot.value)-Number(index===selected.value&&b===selectedSlot.value)).map(key => ({ key, rect: slotRect(panel,key) }));
}
const canvas = computed(() => ({ width: doc.value.width, height: doc.value.height }));
const drawn = computed(() => doc.value.panels.map((rect, index) => ({ rect, index })).sort((a, b) => (a.rect.layer ?? a.index) - (b.rect.layer ?? b.index) || a.index-b.index));
// Editing focus changes only SVG paint order. Saved layers and reading order use drawn.
const displayed=computed(()=>{
  const focused=new Set(selectedRegions.value.map(r=>r.panel));
  return [...drawn.value].sort((a,b)=>Number(focused.has(a.index))-Number(focused.has(b.index)) || Number(a.index===selected.value)-Number(b.index===selected.value));
});
const selectedLayer = computed(() => drawn.value.findIndex(item => item.index === selected.value));
function moveLayer(delta: number): void {
  const rank = selectedLayer.value, to = rank + delta;
  if (rank < 0 || to < 0 || to >= drawn.value.length) return;
  const ordered = [...drawn.value];
  [ordered[rank], ordered[to]] = [ordered[to], ordered[rank]];
  edit(() => { ordered.forEach(({rect},layer) => { rect.layer = layer; }); });
}
const snapshot = (): string => JSON.stringify(doc.value);
const positions = computed(() => {
  const used = new Set(doc.value.panels.map(panel=>panel.position).filter(Boolean));
  return doc.value.panels.map((panel,index) => {
    if (panel.position) return panel.position;
    let suffix=index+1;
    while (used.has(`panel-${suffix}`)) suffix++;
    const name=`panel-${suffix}`; used.add(name); return name;
  });
});
function remember(before: string): void {
  if (before === snapshot()) return;
  undoStack.value.push(before);
  if (undoStack.value.length > 100) undoStack.value.shift();
  redoStack.value = [];
  error.value = '';
}
function edit(action: () => void, slotEdit = false): void { if (!slotEdit) confirmSlot(); const before = snapshot(); action(); remember(before); }
function restore(value: string): void {
  doc.value = JSON.parse(value);
  canvasWidth.value = doc.value.width; canvasHeight.value = doc.value.height;
  selected.value = Math.min(selected.value, doc.value.panels.length - 1);
  if (!current.value?.slots[selectedSlot.value]) selectedSlot.value = '';
  selection.value=regions(doc.value.panels,selection.value);
  error.value = ''; discard.value = false;
}
function undo(): void { confirmSlot(); const before = undoStack.value.pop(); if (before) { redoStack.value.push(snapshot()); restore(before); } }
function redo(): void { confirmSlot(); const after = redoStack.value.pop(); if (after) { undoStack.value.push(snapshot()); restore(after); } }
function loadSource(): void {
  const source = props.sources.find(item => item.key === sourceKey.value);
  if (!source) return;
  edit(() => {
    const editing = source.id === props.editingId;
    doc.value = { metadata: JSON.parse(JSON.stringify(source)), id: editing ? source.id : unusedId(`${source.id}_copy`), label: editing ? source.label : `${source.label}（副本）`, description:sharedDescription(source), promptMode:source.promptMode ?? 'llm', useBboxCorners:source.useBboxCorners === true, omitFullPageFrame:source.omitFullPageFrame, omitSmallFrames:source.omitSmallFrames, ...source.canvas, panels: source.panels.map((panel,index) => ({...editablePanel(panelRect(panel, source.canvas), source.canvas, panel), layer:panel.layer ?? index})) };
  });
  canvasWidth.value = doc.value.width; canvasHeight.value = doc.value.height;
  selectPanel(doc.value.panels.length ? 0 : -1);
}
function resizeCanvas(): void {
  alignCanvasInput();
  const size = normalizeCanvas({ width: canvasWidth.value, height: canvasHeight.value });
  if (!size) { error.value = '画布宽高须为 64～8192 的数值，输入完成后自动对齐到最近的 16 倍数。'; return; }
  edit(() => {
    const old = canvas.value;
    doc.value.panels = doc.value.panels.map(p => ({ ...p, ...fitRect({ x: p.x * size.width / old.width, y: p.y * size.height / old.height, width: p.width * size.width / old.width, height: p.height * size.height / old.height }, size) }));
    Object.assign(doc.value, size);
  });
}
function alignCanvasInput(): void {
  const align=(value: number): number => Number.isFinite(value) ? Math.max(64,Math.min(8192,Math.round(value/16)*16)) : value;
  canvasWidth.value=align(canvasWidth.value);canvasHeight.value=align(canvasHeight.value);
}
function preset(width: number, height: number): void { canvasWidth.value = width; canvasHeight.value = height; resizeCanvas(); }
function add(): void {
  edit(() => {
    const offset = (doc.value.panels.length % 5) * .04;
    const panel = editablePanel(fitRect({ x: doc.value.width * (.08 + offset), y: doc.value.height * (.08 + offset), width: doc.value.width * .55, height: doc.value.height * .3 }, canvas.value), canvas.value);
    panel.slots = {};
    doc.value.panels.push({...panel, layer:Math.max(-1,...doc.value.panels.map((p,i)=>p.layer ?? i))+1});
    selectPanel(doc.value.panels.length - 1);
  });
}
function remove(): void { if (current.value) edit(() => { doc.value.panels.splice(selected.value, 1); selectPanel(Math.min(selected.value, doc.value.panels.length - 1)); }); }
function duplicate(): void { if (current.value) edit(() => { doc.value.panels.push({ ...JSON.parse(JSON.stringify(current.value!)), ...fitRect({ ...current.value!, x: current.value!.x + 24, y: current.value!.y + 24 }, canvas.value), position:undefined, layer:Math.max(-1,...doc.value.panels.map((p,i)=>p.layer ?? i))+1 }); selectPanel(doc.value.panels.length - 1); }); }
function reorder(delta: number): void {
  const to = selected.value + delta;
  if (!current.value || to < 0 || to >= doc.value.panels.length) return;
  edit(() => { const [p] = doc.value.panels.splice(selected.value, 1); doc.value.panels.splice(to, 0, p); selected.value = to; });
}
function changeRect(key: keyof PanelRect, event: Event): void {
  const value = Number((event.target as HTMLInputElement).value);
  if (activeRect.value && Number.isFinite(value)) edit(() => { setActiveRect(fitRect({ ...activeRect.value!, [key]: value }, canvas.value, selectedSlot.value ? 1 : MIN_PANEL)); }, true);
}
function changeText(key: 'id' | 'label' | 'description', event: Event): void { inputEdit(`document:${key}`,() => { doc.value[key] = (event.target as HTMLInputElement).value; }); }
function changePromptMode(mode: 'llm' | 'manual'): void {
  const key=selectedSlot.value;
  edit(() => { doc.value.promptMode=mode; });
  if (key) selectSlot(selected.value,key);
}
function changeBboxCorners(event: Event): void {
  edit(() => { doc.value.useBboxCorners=(event.target as HTMLInputElement).checked; });
}
function addContent(): void {
  if (!current.value) return;
  const key=selectedSlot.value || 'F';
  const label = ['T','B','TL','TR','BL','BR','ML','MR'].includes(slotType(key)) ? 'text' : ['S','L','R'].includes(slotType(key)) ? 'character' : 'object';
  edit(() => { ((current.value!.slotContents ??= {})[key] ??= []).push({label,caption:'',...(label==='text'?{text:'',textType:'dialogue' as const}:{})}); },true);
}
function changeContent(index: number, key: keyof ManualContent, event: Event): void {
  const value=(event.target as HTMLInputElement).value;
  edit(() => { Object.assign(contentItems.value[index],{[key]:value}); },true);
}
function removeContent(index: number): void { edit(() => { contentItems.value.splice(index,1); },true); }
function moveContent(index: number, delta: number): void {
  const to=index+delta;
  if (to<0 || to>=contentItems.value.length) return;
  edit(() => { const [item]=contentItems.value.splice(index,1); contentItems.value.splice(to,0,item); },true);
}
function frameDescription(panel: EditablePanel, key: string): string {
  return panel.slotNotes?.[key] ?? (panel.slotContents?.[key] ?? []).filter(item=>item.label!=='text' && item.caption.trim()).map(item=>item.caption).join('\n');
}
let lastInput:{key:string;time:number;after:string}|null=null;
function inputEdit(key:string,action:()=>void):void {
  const before=snapshot(),coalesce=lastInput?.key===key && before===lastInput.after && Date.now()-lastInput.time<750;
  edit(action,true);
  if(coalesce&&before!==snapshot())undoStack.value.pop();
  lastInput={key,time:Date.now(),after:snapshot()};
}
function setFrameDescription(index: number, key: string, note: string): void {
  const panel=doc.value.panels[index];
  if (!panel) return;
  inputEdit(`note:${index}:${key}`,() => {
    const visuals=(panel.slotContents?.[key] ?? []).filter(item=>item.label!=='text');
    if (visuals.length===1 && (!panel.slotNotes?.[key] || panel.slotNotes[key]===visuals[0].caption)) visuals[0].caption=note;
    if (note) (panel.slotNotes ??= {})[key] = note;
    else if (panel.slotNotes) delete panel.slotNotes[key];
  });
}
function changeSlotNote(event: Event): void { setFrameDescription(selected.value,selectedSlot.value || 'F',(event.target as HTMLTextAreaElement).value); }
function openDescription(index: number, key: string): void {
  selectSlot(index,key==='F'?'':key);
  quickEdit.value={index,key};quickDraft.value=frameDescription(doc.value.panels[index],key);
  void nextTick(()=>quickField.value?.focus());
}
function saveQuickDescription(): void {
  if (!quickEdit.value) return;
  setFrameDescription(quickEdit.value.index,quickEdit.value.key,quickDraft.value);quickEdit.value=null;
}
function previewDescription(panel: EditablePanel, key: string): string {
  const text=frameDescription(panel,key).replace(/\s+/g,' ').trim();
  return text.length>80?text.slice(0,80)+'…':text;
}

let gestureBounds:DOMRect|null=null;
let queuedPointer:PointerEvent|null=null,pointerFrame=0;
function canvasMove(event:PointerEvent):void {if(!gesture&&!marqueeStart&&!drawing)return;queuedPointer=event;if(!pointerFrame)pointerFrame=requestAnimationFrame(()=>{pointerFrame=0;const event=queuedPointer;queuedPointer=null;if(event)move(event);});}
function canvasEnd(event:PointerEvent,cancel=false):void {if(pointerFrame)cancelAnimationFrame(pointerFrame);pointerFrame=0;const pending=queuedPointer;queuedPointer=null;if(pending&&!cancel)move(pending);end(event,cancel);gestureBounds=null;}
let gesture: { pointerId: number; x: number; y: number; clientX:number; clientY:number; dragging:boolean; rect: PanelRect; before: string; handle: string; quad:number[][]; deform:boolean } | null = null;
function zoomCanvas(event: WheelEvent): void {
  if (!event.ctrlKey || !event.deltaY) return;
  event.preventDefault();event.stopPropagation();
  if (gesture || drawing || !svg.value || !canvasViewport.value) return;
  const viewport=canvasViewport.value, before=svg.value.getBoundingClientRect();
  const x=(event.clientX-before.left)/before.width, y=(event.clientY-before.top)/before.height;
  const delta=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?viewport.clientHeight:1);
  canvasZoom.value=clamp(canvasZoom.value*Math.exp(-delta*.002),.25,4);
  void nextTick(()=>{
    const after=svg.value?.getBoundingClientRect();
    if (after) { viewport.scrollLeft+=after.left+x*after.width-event.clientX;viewport.scrollTop+=after.top+y*after.height-event.clientY; }
  });
}
function point(event: Pick<MouseEvent,'clientX'|'clientY'>): { x: number; y: number } {
  const rect = gestureBounds ?? svg.value!.getBoundingClientRect();
  return { x: (event.clientX - rect.left) / rect.width * doc.value.width, y: (event.clientY - rect.top) / rect.height * doc.value.height };
}
function begin(event: PointerEvent, index: number, handle = '', slot = ''): void {
  if (event.button !== 0 || gesture) return;
  svg.value?.focus?.();
  if(event.shiftKey){chooseRegion(index,slot,true);return;}
  if(!selectedRegion(index,slot) || handle)selectSlot(index,slot);
  if(current.value?.locked)return;
  gestureBounds=svg.value!.getBoundingClientRect();
  gesture = { pointerId: event.pointerId, ...point(event), clientX:event.clientX,clientY:event.clientY,dragging:false,rect: { ...activeRect.value! }, before: snapshot(), handle, quad:quadPoints(current.value!,slot || 'F'), deform:event.ctrlKey && handle.length===2 };
}
function move(event: PointerEvent): void {
  if(drawing){updateDraw(event);return;}
  if(marqueeStart){const p=point(event),a=marqueeStart;marquee.value={x:Math.min(a.x,p.x),y:Math.min(a.y,p.y),width:Math.abs(p.x-a.x),height:Math.abs(p.y-a.y)};return;}
  if (!gesture || event.pointerId !== gesture.pointerId) return;
  const p = point(event), g = gesture, dx = p.x - g.x, dy = p.y - g.y;
  // Capturing a stationary click on the SVG retargets dblclick away from its frame.
  if (!g.dragging) {
    if (Math.hypot(event.clientX-g.clientX,event.clientY-g.clientY)<3) return;
    g.dragging=true;svg.value!.setPointerCapture(event.pointerId);
  }
  if(!g.handle && selectedRegions.value.length>1){
    doc.value.panels=JSON.parse(g.before).panels;
    moveRegions(doc.value.panels,selectedRegions.value,dx,dy,canvas.value);return;
  }
  const minimum = selectedSlot.value ? 1 : MIN_PANEL;
  if (g.deform) {
    const index = ['nw','ne','se','sw'].indexOf(g.handle);
    const points = g.quad.map((p,i) => i===index ? [p[0]+dx,p[1]+dy] : p);
    deformCorner(current.value!,selectedSlot.value || 'F',points,canvas.value);
    return;
  }
  let rect = { ...g.rect };
  if (!g.handle) { rect.x += dx; rect.y += dy; }
  else {
    if (g.handle.includes('w')) { rect.x = clamp(g.rect.x + dx, 0, g.rect.x + g.rect.width - minimum); rect.width = g.rect.x + g.rect.width - rect.x; }
    if (g.handle.includes('n')) { rect.y = clamp(g.rect.y + dy, 0, g.rect.y + g.rect.height - minimum); rect.height = g.rect.y + g.rect.height - rect.y; }
    if (g.handle.includes('e')) rect.width = clamp(g.rect.width + dx, minimum, doc.value.width - rect.x);
    if (g.handle.includes('s')) rect.height = clamp(g.rect.height + dy, minimum, doc.value.height - rect.y);
  }
  rect = fitRect(rect, canvas.value, minimum);
  const others = selectedSlot.value ? [current.value!, ...Object.keys(current.value!.slots).filter(key => key !== selectedSlot.value).map(key => slotRect(current.value!, key))] : doc.value.panels.filter((_, i) => i !== selected.value);
  const unsnapped = { ...rect };
  if (snap.value && !event.altKey) rect = snapRect(rect, canvas.value, others, 6 * doc.value.width / (gestureBounds ?? svg.value!.getBoundingClientRect()).width, !!g.handle, minimum);
  if (g.handle === 'e' || g.handle === 'w') { rect.y = unsnapped.y; rect.height = unsnapped.height; }
  if (g.handle === 'n' || g.handle === 's') { rect.x = unsnapped.x; rect.width = unsnapped.width; }
  setActiveRect(rect);
}
function end(event: PointerEvent, cancel = false): void {
  if(drawing){finishDraw(event,cancel);return;}
  if(marqueeStart){
    const box=marquee.value!,prior=marqueeStart.selection;marqueeStart=null;marquee.value=null;
    if(!cancel){selection.value=[...prior,...doc.value.panels.flatMap((p,i)=>p.x>=box.x&&p.y>=box.y&&p.x+p.width<=box.x+box.width&&p.y+p.height<=box.y+box.height?[{panel:i,slot:''}]:[])];const last=selection.value.at(-1);selected.value=last?.panel??-1;selectedSlot.value='';}
    if(svg.value?.hasPointerCapture(event.pointerId))svg.value.releasePointerCapture(event.pointerId);return;
  }
  if (!gesture || event.pointerId !== gesture.pointerId) return;
  const before = gesture.before;
  gesture = null;
  if (svg.value?.hasPointerCapture(event.pointerId)) svg.value.releasePointerCapture(event.pointerId);
  if (cancel) restore(before); else remember(before);
}
function handles(): { name: string; x: number; y: number }[] {
  const points = quadPoints(current.value!, selectedSlot.value || 'F');
  return ['nw','ne','se','sw'].flatMap((name,i) => [{ name, x:points[i][0], y:points[i][1] }, { name:['n','e','s','w'][i], x:(points[i][0]+points[(i+1)%4][0])/2, y:(points[i][1]+points[(i+1)%4][1])/2 }]);
}
function polygon(panel: EditablePanel, key: string): string { return quadPoints(panel,key).map(p=>p.join(',')).join(' '); }
function requestClose(): void {
  cancelDraw();
  if (snapshot() !== baseline.value || canvasWidth.value !== doc.value.width || canvasHeight.value !== doc.value.height) discard.value = true;
  else emit('close');
}
function keydown(event: KeyboardEvent): void {
  if (event.key === 'Tab' && dialog.value) {
    const items = [...dialog.value.querySelectorAll<HTMLElement>('button:not(:disabled),input,textarea,select,[tabindex="0"]')];
    const root = dialog.value.getRootNode() as Document | ShadowRoot;
    const active = root.activeElement;
    if (event.shiftKey && (active === items[0] || active === dialog.value)) { event.preventDefault(); items.at(-1)?.focus(); }
    else if (!event.shiftKey && active === items.at(-1)) { event.preventDefault(); items[0]?.focus(); }
  }
  if(drawTool.value && (event.key==='Escape' || ((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='z'))){event.preventDefault();event.stopPropagation();cancelDraw();return;}
  if (event.key === 'Escape') { event.stopPropagation();if(quickEdit.value){quickEdit.value=null;return;}if(contextMenu.value){contextMenu.value=null;return;}requestClose();return; }
  if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='s'){event.preventDefault();event.stopPropagation();(event.target as HTMLElement)?.blur?.();void nextTick(()=>save(true));return;}

  if ((event.target as HTMLElement).matches('input,textarea,select,[contenteditable=true]')) return;
  if(event.code==='Space'){event.preventDefault();spaceHeld=true;return;}
  if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='d'){event.preventDefault();duplicateSelection();return;}
  if((event.ctrlKey||event.metaKey)&&event.key==='0'){event.preventDefault();canvasZoom.value=1;return;}
  if(event.key==='Home'){event.preventDefault();fitView();return;}
  if(event.key.toLowerCase()==='f'&&!event.ctrlKey&&!event.metaKey){event.preventDefault();fitView(true);return;}
  if ((event.ctrlKey || event.metaKey) && ['z', 'y'].includes(event.key.toLowerCase())) {
    event.preventDefault(); if (event.key.toLowerCase() === 'y' || event.shiftKey) redo(); else undo();
  } else if (event.key === 'Delete') { event.preventDefault(); deleteSelection(); }
  else if (activeRect.value && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
    event.preventDefault();
    const d = event.shiftKey ? 10 : 1;
    batch(()=>moveRegions(doc.value.panels,selectedRegions.value,event.key==='ArrowRight'?d:event.key==='ArrowLeft'?-d:0,event.key==='ArrowDown'?d:event.key==='ArrowUp'?-d:0,canvas.value));
  }
}
function save(keepOpen=false): void {
  cancelDraw();
  if (canvasWidth.value !== doc.value.width || canvasHeight.value !== doc.value.height) { error.value = '画布尺寸已修改，请先点击“应用尺寸”。'; return; }
  if (!doc.value.id.trim() || (props.existingIds.includes(doc.value.id.trim()) && doc.value.id.trim() !== savedId.value)) { error.value = '版式库已有此 ID，请填写未使用的 ID，或打开该版式编辑。'; return; }
  if (!doc.value.panels.length) { error.value = '请至少添加一格。'; return; }
  try {
    const orientation = orientationOf(doc.value.width, doc.value.height);
    const standard = canvasOf(orientation);
    if (doc.value.id.trim() === props.editingId && props.sources.some(source => {
      const sourceOrientation = orientationOf(source.canvas.width, source.canvas.height);
      const sourceStandard = canvasOf(sourceOrientation);
      return source.id === props.editingId && sourceOrientation !== orientation && (doc.value.width !== standard.width || doc.value.height !== standard.height || source.canvas.width !== sourceStandard.width || source.canvas.height !== sourceStandard.height);
    })) {
      error.value = '此版式含另一画布方向。使用非标准尺寸时请填写新的版式 ID，另存后可保留原版式的两个方向。'; return;
    }
    const metadata={...doc.value.metadata};
    delete metadata.panels; delete metadata.key;
    const other=props.sources.find(source=>source.id===doc.value.metadata?.id && orientationOf(source.canvas.width,source.canvas.height)!==orientation);
    if(other) metadata[orientation==='portrait'?'landscape':'portrait']=other.panels;
    const layout = parseCustomLayout(JSON.stringify({ ...metadata, id:doc.value.id.trim(), label:doc.value.label.trim() || doc.value.id.trim(), description:doc.value.description.trim(), usage:metadata.usage ?? doc.value.description.trim(), promptCaption:metadata.promptCaption ?? doc.value.description.trim(), promptMode:doc.value.promptMode, useBboxCorners:doc.value.useBboxCorners, omitFullPageFrame:doc.value.omitFullPageFrame, omitSmallFrames:doc.value.omitSmallFrames, canvas:canvas.value, readingOrder:positions.value.join(' → '), [orientation]:doc.value.panels.map((r,i)=>saveEditedPanel(r,canvas.value,positions.value[i])) }));
    emit('save',layout,keepOpen,()=>{savedId.value=layout.id;baseline.value=snapshot();});
  } catch (e) { error.value = e instanceof Error ? e.message : String(e); }
}
onUnmounted(()=>{if(pointerFrame)cancelAnimationFrame(pointerFrame);cancelDraw();});
onMounted(() => {
  if (props.initialKey) loadSource();
  undoStack.value = []; redoStack.value = []; baseline.value = snapshot();
  void nextTick(() => dialog.value?.focus());
});
</script>

<template>
  <ModalMask :open="true" top-layer @close="requestClose">
    <section ref="dialog" class="manga-designer" role="dialog" aria-modal="true" aria-label="快捷自定义版式" tabindex="-1" @keydown.stop="keydown" @keyup="spaceHeld=false" @focusout="spaceHeld=false" @pointerdown="contextMenu=null">
      <div v-if="contextMenu" class="context-menu" role="menu" aria-label="画布右键菜单" :style="{left:contextMenu.x+'px',top:contextMenu.y+'px',maxHeight:contextMenu.height+'px'}" @pointerdown.stop @contextmenu.prevent>
        <button type="button" role="menuitem" :aria-expanded="showCreate" @click="showCreate=!showCreate">＋ 绘制新框 {{showCreate?'▾':'▸'}}</button>
        <div v-if="showCreate" class="create-options" role="group" aria-label="新框类型">
          <button type="button" role="menuitem" @click="startDraw('F')">外框 F</button>
          <button type="button" role="menuitem" :disabled="!canDrawInner" @click="startDraw('S')">人物 S</button>
          <button type="button" role="menuitem" :disabled="!canDrawInner" @click="startDraw('O')">物品 O</button>
          <button type="button" role="menuitem" :disabled="!canDrawInner" @click="startDraw('text')">文字</button>
          <small>{{canDrawInner ? `内框归第 ${contextMenu.parent+1} 格` : '选择未锁定的 F 后可添加内框'}}</small>
        </div>
        <details v-if="contextMenu.hits.length" class="hit-list"><summary>选择此处的框（{{contextMenu.hits.length}}）</summary><div><button v-for="hit in contextMenu.hits" :key="`${hit.panel}:${hit.slot}`" type="button" role="menuitem" @click="chooseHit(hit)">{{hitLabel(hit)}}</button></div></details>
        <template v-if="current">
          <button type="button" role="menuitem" @click="openDescription(selected,selectedSlot||'F');contextMenu=null">编辑画面描述</button>
          <button type="button" role="menuitem" :disabled="current.locked" @click="duplicateSelection();contextMenu=null">复制 Ctrl+D</button>
          <button type="button" role="menuitem" :disabled="current.locked" @click="deleteSelection();contextMenu=null">删除 Delete</button>
          <button type="button" role="menuitem" @click="lockSelected();contextMenu=null">锁定 / 解锁</button>
          <button type="button" role="menuitem" @click="moveLayer(1);contextMenu=null">上移一层</button>
          <button type="button" role="menuitem" @click="moveLayer(-1);contextMenu=null">下移一层</button>
        </template>
      </div>
      <header>
        <strong>{{ editingId ? '可视化编辑版式' : '快捷自定义版式' }}</strong>
        <div class="inline">
          <button type="button" @click="requestClose">取消</button>
          <button type="button" class="primary" @click="save(false)">{{ editingId && doc.id.trim() === editingId ? '保存版式修改' : '保存新版式' }}</button>
          <button type="button" aria-label="关闭编辑器" @click="requestClose">✕</button>
        </div>
      </header>
      <div class="canvas-controls"><button type="button" @click="showObjects=!showObjects">对象栏</button><button type="button" @click="showProperties=!showProperties">属性栏</button><span class="hint">{{ snapshot()===baseline ? '已保存' : '有未保存修改' }} · Ctrl+S 保存并继续编辑</span>
        <label>画布宽 <input v-model.number="canvasWidth" aria-label="画布宽" type="number" min="64" max="8192" step="16" @change="alignCanvasInput" /></label>
        <label>画布高 <input v-model.number="canvasHeight" aria-label="画布高" type="number" min="64" max="8192" step="16" @change="alignCanvasInput" /></label>
        <button type="button" @click="resizeCanvas">应用尺寸</button>
      </div>
      <p class="hint">改变画布尺寸会等比例换算各轴坐标。工作流与预设尺寸须与此画布一致；请连接节点的宽高输出到潜空间尺寸输入。</p>
      <div class="designer-body" :class="{'hide-objects':!showObjects,'hide-properties':!showProperties}">
        <aside v-show="showObjects" class="tools">
          <details><summary>载入其他版式</summary><label>从现有版式复制<select v-model="sourceKey" aria-label="源版式"><option value="">请选择</option><option v-for="source in sources" :key="source.key" :value="source.key">{{ source.label }} · {{ source.canvas.width }}×{{ source.canvas.height }}</option></select></label>
          <button type="button" :disabled="!sourceKey" @click="loadSource">载入副本</button></details>
          <button type="button" @click="add">＋ 新增分格</button>
          <button type="button" :disabled="!current" @click="duplicateSelection">复制选中项</button>
          <button type="button" :disabled="!current" @click="deleteSelection">删除选中项</button>
          <div class="inline"><button type="button" :disabled="!undoStack.length" @click="undo">撤销</button><button type="button" :disabled="!redoStack.length" @click="redo">重做</button></div>
          <label class="check"><input v-model="snap" type="checkbox" />对齐吸附</label>
          <label class="check"><input v-model="slotsPreview" type="checkbox" />显示可编辑槽位</label>
          <label class="check"><input v-model="doc.omitFullPageFrame" type="checkbox" />省略全画布 F 框说明</label><label class="check"><input v-model="doc.omitSmallFrames" type="checkbox" />省略小格 F 框说明</label>
          <label class="check" title="实验功能：为斜切外框的四个顶点追加小 bbox；保存版式后用于提示词编译。"><input :checked="doc.useBboxCorners" type="checkbox" @change="changeBboxCorners" />使用 BBOX 角点</label>
          <p class="hint">拖动外框移动整格；拖动黄色/绿色小框单独编辑槽位。直接拖动四角或边中点缩放；按住 Ctrl 再拖四角才形变。Alt 暂停吸附，方向键微调，Delete 删除选中项，Ctrl+Z 撤销。</p>
          <details open class="object-tree"><summary>对象 · 读序（先读 1）</summary><div v-for="(p,i) in doc.panels" :key="i" class="tree-panel"><button type="button" :class="{active:selectedRegion(i)}" @click="chooseRegion(i,'',$event.shiftKey)">第 {{i+1}} 格 · F {{p.locked?'🔒':''}}</button><div class="tree-slots"><button v-for="key in Object.keys(p.slots)" :key="key" type="button" :class="{active:selectedRegion(i,key)}" @click="chooseRegion(i,key,$event.shiftKey)" @dblclick="openDescription(i,key)">{{key}}</button></div></div></details>
          <div class="inline"><button type="button" :disabled="!selectedRegions.length" @click="lockSelected">锁定 / 解锁</button><button type="button" :disabled="!current||!!selectedSlot" @click="splitSelection('x')">左右等分</button><button type="button" :disabled="!current||!!selectedSlot" @click="splitSelection('y')">上下等分</button></div>
          <strong>调整读序</strong>
          <div class="inline"><button type="button" :disabled="selected <= 0" @click="reorder(-1)">提前</button><button type="button" :disabled="selected < 0 || selected >= doc.panels.length-1" @click="reorder(1)">延后</button></div>
          <div class="inline"><button type="button" :disabled="selectedLayer < 0 || selectedLayer >= doc.panels.length-1" @click="moveLayer(1)">上移一层</button><button type="button" :disabled="selectedLayer <= 0" @click="moveLayer(-1)">下移一层</button></div>
          <p class="hint">{{ current ? `当前第 ${selectedLayer+1} / ${doc.panels.length} 层（数字越大越靠前）。` : '' }}层级控制重叠遮挡，不改变读序；遮挡关系自动写入生图提示词。</p>
        </aside>
        <div class="canvas-area">
          <div ref="canvasViewport" class="canvas-viewport" aria-label="画布缩放区域" @wheel.capture="zoomCanvas" @pointerdown.capture="viewportDown" @pointermove="viewportMove" @pointerup="viewportUp" @pointercancel="viewportUp">
          <svg ref="svg" class="layout-canvas" :class="{drawing:!!drawTool}" @pointerdown.capture="drawDown" @contextmenu.prevent="menu($event)" :viewBox="`0 0 ${doc.width} ${doc.height}`" :style="{ aspectRatio: `${doc.width}/${doc.height}`, width: `min(${100*canvasZoom}%, ${62*doc.width/doc.height*canvasZoom}vh)` }" role="img" aria-label="版式画布" tabindex="0" @pointermove="canvasMove" @pointerup="canvasEnd($event)" @pointercancel="canvasEnd($event,true)" @lostpointercapture="canvasEnd($event,true)">
            <rect :width="doc.width" :height="doc.height" fill="white" @pointerdown="blankDown" />
            <g v-for="{ rect: r, index: i } in displayed" :key="i" class="panel" :data-panel="i" :class="{ selected:selectedRegion(i) }" @contextmenu="menu($event,i)" @pointerdown.stop="begin($event,i)" @dblclick.stop.prevent="openDescription(i,'F')">
              <polygon :points="polygon(r,'F')" :fill="selectedRegion(i) ? '#dcecff' : '#f1f2f4'" :stroke="selectedRegion(i) ? '#2675cf' : '#333'" stroke-width="2" vector-effect="non-scaling-stroke" />
              <foreignObject v-if="previewDescription(r,'F')" :x="r.x+6" :y="r.y+doc.width*.04" :width="Math.max(1,r.width-12)" :height="Math.max(1,Math.min(r.height-doc.width*.04,doc.width*.055))" class="frame-description"><div :style="{fontSize:`${doc.width*.018}px`}" :title="frameDescription(r,'F')">{{ previewDescription(r,'F') }}</div></foreignObject>
              <g v-for="s in visibleSlots(r,i)" :key="s.key" class="slot" :data-slot="s.key" @pointerdown.stop="begin($event,i,'',s.key)" @dblclick.stop.prevent="openDescription(i,s.key)" @contextmenu="menu($event,i,s.key)">
                <polygon :points="polygon(r,s.key)" :fill="slotType(s.key)==='T' ? '#e5ba6638' : '#50a18a18'" :stroke="selectedRegion(i,s.key) ? '#df7827' : slotType(s.key)==='T' ? '#b48733' : '#50a18a'" :stroke-width="selectedRegion(i,s.key) ? 2 : 1" stroke-dasharray="5 4" vector-effect="non-scaling-stroke" />
                <text :x="s.rect.x+5" :y="s.rect.y+doc.width*.025" :font-size="doc.width*.021" fill="#575c62">{{ s.key }}</text>
                <foreignObject v-if="previewDescription(r,s.key)" :x="s.rect.x+6" :y="s.rect.y+doc.width*.032" :width="Math.max(1,s.rect.width-12)" :height="Math.max(1,Math.min(s.rect.height-doc.width*.032,doc.width*.055))" class="frame-description"><div :style="{fontSize:`${doc.width*.018}px`}" :title="frameDescription(r,s.key)">{{ previewDescription(r,s.key) }}</div></foreignObject>
              </g>
              <text :x="r.x+8" :y="r.y+doc.width*.032" :font-size="doc.width*.026" fill="#164b83">{{ i+1 }}</text>
            </g>
              <rect v-if="drawPreview" class="draw-preview" v-bind="drawPreview" fill="#2675cf22" stroke="#2675cf" stroke-dasharray="6 4" vector-effect="non-scaling-stroke" pointer-events="none" />
              <rect v-if="marquee" v-bind="marquee" fill="#2675cf22" stroke="#2675cf" stroke-dasharray="5 4" vector-effect="non-scaling-stroke" />
              <template v-if="!drawTool && current && activeRect && selectedRegions.length===1 && !current.locked"><rect v-for="h in handles()" :key="h.name" class="resize-handle" :data-ctrl-deform="h.name.length===2" :data-handle="h.name" :rx="h.name.length===2 ? doc.width*.009 : 0" :x="h.x-doc.width*.009" :y="h.y-doc.width*.009" :width="doc.width*.018" :height="doc.width*.018" :fill="selectedSlot ? '#df7827' : '#2675cf'" stroke="white" vector-effect="non-scaling-stroke" :style="{cursor:`${h.name}-resize`}" :aria-label="`${h.name} 控制点`" @pointerdown.stop.prevent="begin($event,selected,h.name,selectedSlot)" /></template>
          </svg>
          </div>
          <div v-if="drawTool" class="draw-status" role="status">{{drawTool.kind==='F'?'绘制外框 F':`绘制${drawTool.kind==='S'?'人物':drawTool.kind==='O'?'物品':'文字'}内框 · 归第 ${drawOwner+1} 格`}}：按住左键拖动，Esc 取消<button type="button" @click="cancelDraw">取消绘制</button></div>
          <div class="canvas-toolbar"><button type="button" @click="fitView()">适应画布</button><button type="button" :disabled="!selectedRegions.length" @click="fitView(true)">聚焦选中 F</button><button type="button" @click="canvasZoom=1">100%</button><span>已选 {{selectedRegions.length}} 项</span><select aria-label="批量对齐" :disabled="selectedRegions.length<2" value="" @change="alignSelection(($event.target as HTMLSelectElement).value);($event.target as HTMLSelectElement).value='' "><option value="">对齐 / 分布</option><option value="left">左对齐</option><option value="right">右对齐</option><option value="top">顶对齐</option><option value="bottom">底对齐</option><option value="center-x">水平居中</option><option value="center-y">垂直居中</option><option value="gap-x">水平等间距（3项）</option><option value="gap-y">垂直等间距（3项）</option></select></div>
          <p class="hint">{{ doc.width }}×{{ doc.height }} · {{ doc.panels.length }} 格 · 缩放 {{ Math.round(canvasZoom*100) }}% · Ctrl＋滚轮缩放 · 空格拖动画布 · Shift 多选 · 空白处框选 · 双击编辑描述<br />右键绘制新框；选中框仅在编辑时临时置前，保存层级不变。槽位可单独移动，随外框缩放。</p>
        </div>
        <aside v-show="showProperties" class="properties">
          <div class="mode-switch" role="tablist" aria-label="内容编辑模式" :class="{manual:doc.promptMode==='manual'}" @keydown.left.prevent="changePromptMode('llm')" @keydown.right.prevent="changePromptMode('manual')">
            <span class="mode-thumb" aria-hidden="true"></span>
            <button type="button" role="tab" :aria-selected="doc.promptMode==='llm'" @click="changePromptMode('llm')">← LLM 说明</button>
            <button type="button" role="tab" :aria-selected="doc.promptMode==='manual'" @click="changePromptMode('manual')">直接提示词 →</button>
          </div>
          <details><summary>版式信息</summary><label>版式 ID<input :value="doc.id" aria-label="版式 ID" @change="changeText('id',$event)" /></label>
          <label>名称<input :value="doc.label" aria-label="版式名称" @change="changeText('label',$event)" /></label></details>
          <label>画面描述<textarea :value="doc.description" aria-label="整页画面描述" rows="3" placeholder="全页共用的画风、环境与光照；两种模式共用" @input="changeText('description',$event)"></textarea></label>
          <template v-if="current">
            <strong>第 {{ selected+1 }} 格 · {{ selectedSlot ? `${selectedSlot} ${slotLabels[slotType(selectedSlot)] ?? '槽位'}` : '外框 F' }}</strong>
            <div v-if="selectedSlot" class="slot-actions">
              <div class="inline"><button type="button" class="primary" @click="confirmSlot">确定内框</button><button type="button" @click="cancelSlot">取消内框修改</button></div>
            </div>
            <button type="button" :disabled="!selectedSlot" @click="deleteSlot">删除选中槽位</button>
            <button type="button" @click="resetSlots">恢复本格默认槽位</button>
            <div class="inline"><select :value="slotToAdd" aria-label="新增内框类型" :disabled="!availableSlots.length" @change="newSlot=($event.target as HTMLSelectElement).value"><option v-for="key in availableSlots" :key="key" :value="key">{{ key }} {{ slotLabels[key] }}</option></select><button type="button" :disabled="!slotToAdd" @click="addSlot">添加内框</button></div>
            <label>{{ selectedSlot ? `内框 ${selectedSlot} 画面描述` : '外框 F 画面描述' }}
              <textarea :value="frameDescription(current,selectedSlot || 'F')" aria-label="当前框画面描述" rows="3" :placeholder="selectedSlot ? '描述本框的人物、动作、场景或取景' : '描述本格的场景与人物关系'" @input="changeSlotNote"></textarea>
            </label>
            <div v-if="doc.promptMode==='manual'" class="manual-content">
              <strong>{{ selectedSlot ? `内框 ${selectedSlot}` : '外框 F' }} 追加人物／台词</strong>
              <div v-for="(item,index) in contentItems" :key="index" class="content-card">
                <div class="inline"><span>{{ index+1 }}</span><select :value="item.label" aria-label="内容类型" @change="changeContent(index,'label',$event)"><option value="object">场景／物件</option><option value="character">人物</option><option value="text">文字</option></select></div>
                <template v-if="item.label==='text'">
                  <label>文字类型<select :value="item.textType ?? 'dialogue'" @change="changeContent(index,'textType',$event)"><option value="dialogue">对白</option><option value="narration">旁白</option><option value="sfx">日文拟声</option></select></label>
                  <label>准确台词／文字<textarea :value="item.text ?? ''" aria-label="准确台词" rows="3" @input="changeContent(index,'text',$event)"></textarea></label>
                </template>
                <label>{{ item.label==='text' ? '文字表现说明（选填）' : '画面描述' }}<textarea :value="item.caption" aria-label="当前内容描述" rows="3" :placeholder="item.label==='text' ? '英文描述说话人、气泡形状与位置；留空使用常规样式' : '英文描述本框可见的场景、人物、动作与取景'" @input="changeContent(index,'caption',$event)"></textarea></label>
                <div class="inline"><button type="button" :disabled="index===0" @click="moveContent(index,-1)">上移</button><button type="button" :disabled="index===contentItems.length-1" @click="moveContent(index,1)">下移</button><button type="button" @click="removeContent(index)">删除内容</button></div>
              </div>
              <button type="button" @click="addContent">＋ 添加画面／台词</button>
              <p class="hint">一个框可添加多个人物或多条文字，按列表顺序输出。空白条目留作草稿；每句台词单独一项，人物与气泡可用独立内框定位。</p>
            </div>
            <div class="slot-list"><button type="button" :class="{active:!selectedSlot}" @click="confirmSlot">外框 F</button><button v-for="(_,key) in current.slots" :key="key" type="button" :class="{active:selectedSlot===key}" @click="selectSlot(selected,String(key))">{{ key }} {{ slotLabels[slotType(String(key))] ?? '' }}</button></div>
            <label v-for="field in (['x','y','width','height'] as const)" :key="field">{{ {x:'左边距',y:'上边距',width:'宽度',height:'高度'}[field] }}<input :value="activeRect?.[field]" :aria-label="`${selectedSlot ? '槽位' : '分格'}${field}`" type="number" step="1" @change="changeRect(field,$event)" /></label>
          </template>
          <p v-else class="hint">添加或选择一格，编辑精确尺寸。</p>
          <p class="hint">右侧按钮可选重叠槽位，Delete 删除小框，撤销可恢复。普通拖动四角或边中点改大小，Ctrl+拖四角改形状。MOSS 以外接矩形与轮廓描述接收形状参考，不保证精确裁剪。</p>
        </aside>
      </div>
      <p v-if="error" role="alert" class="error">{{ error }}</p>
      <footer v-if="discard"><span>放弃未保存的修改？</span><button type="button" @click="discard=false">继续编辑</button><button type="button" @click="emit('close')">放弃修改</button></footer>
      <div v-if="quickEdit" class="quick-mask" @mousedown.self="quickEdit=null">
        <section class="quick-dialog" role="dialog" aria-modal="true" aria-label="快速编辑画面描述" @keydown.stop @keydown.esc.prevent="quickEdit=null">
          <header><strong>第 {{ quickEdit.index+1 }} 格 · {{ quickEdit.key }} 画面描述</strong><button type="button" aria-label="关闭快速编辑" @click="quickEdit=null">✕</button></header>
          <textarea ref="quickField" v-model="quickDraft" aria-label="快速画面描述" rows="7" @keydown.ctrl.enter.prevent="saveQuickDescription"></textarea>
          <footer><button type="button" @click="quickEdit=null">取消</button><button type="button" class="primary" @click="saveQuickDescription">确定画面描述</button></footer>
        </section>
      </div>
    </section>
  </ModalMask>
</template>

<style scoped>
.frame-description{pointer-events:none}.frame-description div{background:#fffD;color:#20334e;line-height:1.3;padding:2px 4px;border-radius:3px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow-wrap:anywhere}.quick-mask{position:fixed;inset:0;background:#0006;z-index:10010;display:grid;place-items:center;padding:20px}.quick-dialog{width:min(560px,90vw);padding:18px;background:var(--bbi-surface,#fff);color:var(--bbi-ink,#222);border-radius:10px;box-shadow:0 12px 50px #0005}.quick-dialog textarea{width:100%;resize:vertical}
.mode-switch{position:relative;display:flex;flex:none;border:1px solid #7d8b9e;border-radius:7px;padding:3px;isolation:isolate}.mode-switch button{flex:1;border:0;padding:7px 2px;font-size:11px;white-space:nowrap;background:transparent}.mode-thumb{position:absolute;z-index:-1;left:3px;top:3px;bottom:3px;width:calc(50% - 3px);background:#2675cf;border-radius:4px;transition:transform .18s}.mode-switch.manual .mode-thumb{transform:translateX(100%)}.mode-switch [aria-selected="true"]{color:#fff}.manual-content{display:flex;flex-direction:column;gap:9px}.content-card{border:1px solid #8885;border-radius:6px;padding:8px;display:flex;flex-direction:column;gap:7px}.content-card button{padding:4px;font-size:11px}.content-card textarea{width:100%}
.slot-actions{grid-column:1/-1;padding:8px;border:1px solid #2675cf66;border-radius:6px}.slot-actions .hint{margin-bottom:0}
.manga-designer{width:min(1140px,96vw);max-height:94vh;overflow:auto;background:var(--bbi-surface,#fff);color:var(--bbi-ink,#222);border-radius:12px;padding:18px;box-sizing:border-box;box-shadow:0 16px 64px #0005;outline:none;font-size:13px}
header,footer,.canvas-controls,.inline{display:flex;gap:8px;align-items:center;flex-wrap:wrap}header{justify-content:space-between;font-size:17px;margin-bottom:14px}footer{justify-content:flex-end;margin-top:14px;border-top:1px solid #8884;padding-top:12px}.canvas-controls label{display:flex;align-items:center;gap:5px}.canvas-controls input{width:90px}.designer-body{display:grid;grid-template-columns:180px minmax(180px,1fr) 180px;gap:16px;margin-top:12px}.tools,.properties{display:flex;flex-direction:column;gap:9px}.tools label:not(.check),.properties label{display:flex;flex-direction:column;gap:5px}.check{display:flex;gap:5px;align-items:center}input,textarea,select{box-sizing:border-box;min-width:0;max-width:100%;padding:6px;border:1px solid #8886;border-radius:5px;color:inherit;background:transparent;font:inherit}button{border:1px solid #8886;border-radius:6px;background:transparent;color:inherit;padding:6px 9px;cursor:pointer;font:inherit}button:disabled{opacity:.4;cursor:default}button.active,button.primary{background:#2675cf;color:white}button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible,.layout-canvas:focus-visible{outline:2px solid #2675cf;outline-offset:2px}.hint{font-size:12px;line-height:1.6;opacity:.75;margin:7px 0}.canvas-area{background:#8881;border:1px solid #8884;padding:12px;display:flex;flex-direction:column;align-items:center;min-width:0}.canvas-viewport{width:100%;height:62vh;overflow:auto;overscroll-behavior:contain}.layout-canvas{display:block;margin:0 auto;max-width:none;height:auto;overflow:visible;touch-action:none;user-select:none;box-shadow:0 2px 10px #0003}.panel,.slot{cursor:move}.slot-list{display:flex;flex-wrap:wrap;gap:4px;max-height:145px;overflow:auto}.slot-list button{font-size:11px;padding:4px 5px}.panel text{pointer-events:none}.error{color:#b3261e}
@media(max-width:760px){.designer-body{grid-template-columns:1fr}.tools{display:flex;flex-direction:row;flex-wrap:wrap}.tools>.hint{width:100%}.properties{display:grid;grid-template-columns:1fr 1fr}.properties>.hint{grid-column:1/-1}.canvas-viewport{height:58vh}.manga-designer{padding:12px}}
.manga-designer{width:min(1600px,97vw);height:94vh;overflow:hidden;display:flex;flex-direction:column;padding:14px}header{flex:none;border-bottom:1px solid #8884;padding-bottom:10px}.canvas-controls{flex:none}.designer-body{flex:1;min-height:0;grid-template-columns:auto minmax(220px,1fr) auto}.tools,.properties{overflow:auto;min-height:0;padding:3px 7px 10px 2px;scrollbar-gutter:stable}.tools{width:210px;resize:horizontal;min-width:170px;max-width:360px}.properties{width:260px;resize:horizontal;min-width:210px;max-width:360px}.canvas-area{min-height:0;padding:8px;overflow:hidden}.canvas-viewport{height:auto;flex:1;min-height:100px}.canvas-toolbar{display:flex;gap:6px;align-items:center;flex-wrap:wrap;flex:none;padding-top:8px}.canvas-toolbar span{white-space:nowrap}.designer-body.hide-objects{grid-template-columns:minmax(220px,1fr) auto}.designer-body.hide-properties{grid-template-columns:auto minmax(220px,1fr)}.designer-body.hide-objects.hide-properties{grid-template-columns:1fr}.tree-panel{padding:4px 0;border-bottom:1px solid #8883}.tree-panel>button{width:100%;text-align:left}.tree-slots{display:flex;flex-wrap:wrap;gap:3px;margin:5px 0 4px 12px}.tree-slots button{padding:3px 6px;font-size:11px}.object-tree summary{cursor:pointer;padding:8px 0;font-weight:600}.context-menu{position:fixed;z-index:10030;width:180px;padding:6px;display:flex;flex-direction:column;gap:4px;border:1px solid #8886;background:var(--bbi-surface,#fff);border-radius:8px;box-shadow:0 8px 30px #0005}.context-menu button{text-align:left}.manga-designer>footer{flex:none}.manga-designer>.hint{margin:3px 0}
@media(max-width:900px){.designer-body{grid-template-columns:170px minmax(200px,1fr) 220px;gap:8px}.manga-designer{width:99vw}}@media(max-width:640px){.designer-body,.designer-body.hide-objects,.designer-body.hide-properties{display:flex;flex-direction:column;overflow:auto}.canvas-area{min-height:48vh;order:-1}.tools,.properties{overflow:visible;min-height:auto;flex:none;resize:none}.tools,.properties{width:100%;min-width:0;max-width:none}.canvas-viewport{min-height:36vh}}
.layout-canvas.drawing,.layout-canvas.drawing :deep(*){cursor:crosshair!important}.context-menu{width:222px;max-height:calc(100vh - 16px);overflow:auto}.create-options{display:grid;grid-template-columns:1fr 1fr;gap:4px;border-block:1px solid #8884;padding:6px 0}.create-options small{grid-column:1/-1;padding:3px;opacity:.75}.hit-list summary{cursor:pointer;padding:6px 4px}.hit-list>div{max-height:150px;overflow:auto;display:flex;flex-direction:column;gap:3px}.draw-status{display:flex;gap:8px;align-items:center;padding:7px;color:#a8d2ff;flex-wrap:wrap}.draw-status button{padding:3px 7px}.draw-preview{pointer-events:none}
</style>
