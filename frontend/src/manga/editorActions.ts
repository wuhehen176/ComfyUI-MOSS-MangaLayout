import {fitRect,setSlotRect,slotRect,MIN_PANEL,type CanvasSize,type EditablePanel,type PanelRect} from './editor';
export interface Region {panel:number;slot:string}
export function regions(panels:EditablePanel[],selection:Region[]):Region[] {
  const seen=new Set<string>();
  return selection.filter(r=>panels[r.panel] && (!r.slot || panels[r.panel].slots[r.slot])).filter(r=>{
    const key=`${r.panel}:${r.slot}`;
    if(seen.has(key) || (r.slot && selection.some(p=>p.panel===r.panel&&!p.slot))) return false;
    seen.add(key);return true;
  });
}
export function bounds(panels:EditablePanel[],selection:Region[]):PanelRect|null {
  const rs=regions(panels,selection).map(r=>r.slot?slotRect(panels[r.panel],r.slot):panels[r.panel]);
  if(!rs.length)return null;
  const x=Math.min(...rs.map(r=>r.x)),y=Math.min(...rs.map(r=>r.y));
  return {x,y,width:Math.max(...rs.map(r=>r.x+r.width))-x,height:Math.max(...rs.map(r=>r.y+r.height))-y};
}
function assign(panels:EditablePanel[],r:Region,rect:PanelRect,canvas:CanvasSize):void {
  if(panels[r.panel].locked)return;
  const next=fitRect(rect,canvas,r.slot?1:MIN_PANEL);
  if(r.slot)setSlotRect(panels[r.panel],r.slot,next);else Object.assign(panels[r.panel],next);
}
export function moveRegions(panels:EditablePanel[],selection:Region[],dx:number,dy:number,canvas:CanvasSize):void {
  const rs=regions(panels,selection).filter(r=>!panels[r.panel].locked),box=bounds(panels,rs);
  if(!box)return;
  dx=Math.max(-box.x,Math.min(canvas.width-box.x-box.width,dx));dy=Math.max(-box.y,Math.min(canvas.height-box.y-box.height,dy));
  for(const r of rs){const rect=r.slot?slotRect(panels[r.panel],r.slot):panels[r.panel];assign(panels,r,{...rect,x:rect.x+dx,y:rect.y+dy},canvas);}
}
export function alignRegions(panels:EditablePanel[],selection:Region[],mode:string,canvas:CanvasSize):void {
  const rs=regions(panels,selection).filter(r=>!panels[r.panel].locked),box=bounds(panels,rs);if(!box||rs.length<2)return;
  const rect=(r:Region)=>r.slot?slotRect(panels[r.panel],r.slot):panels[r.panel];
  if(mode==='gap-x'||mode==='gap-y'){
    if(rs.length<3)return;
    const horizontal=mode==='gap-x',axis=horizontal?'x':'y',size=horizontal?'width':'height';
    rs.sort((a,b)=>rect(a)[axis]-rect(b)[axis]);
    const first=rect(rs[0]),last=rect(rs.at(-1)!);
    const gap=(last[axis]+last[size]-first[axis]-rs.reduce((sum,r)=>sum+rect(r)[size],0))/(rs.length-1);
    let cursor=first[axis];
    for(const r of rs){const next={...rect(r),[axis]:cursor};cursor+=next[size]+gap;assign(panels,r,next,canvas);}return;
  }
  for(const r of rs){const next={...rect(r)};
    if(mode==='left')next.x=box.x;if(mode==='right')next.x=box.x+box.width-next.width;
    if(mode==='top')next.y=box.y;if(mode==='bottom')next.y=box.y+box.height-next.height;
    if(mode==='center-x')next.x=box.x+(box.width-next.width)/2;if(mode==='center-y')next.y=box.y+(box.height-next.height)/2;
    assign(panels,r,next,canvas);
  }
}
export function duplicateRegions(panels:EditablePanel[],selection:Region[],canvas:CanvasSize):Region[] {
  const result:Region[]=[];
  for(const r of regions(panels,selection)){
    const p=panels[r.panel];if(p.locked)continue;
    if(!r.slot){const clone:EditablePanel=JSON.parse(JSON.stringify(p));delete clone.position;clone.layer=Math.max(-1,...panels.map((p,i)=>p.layer??i))+1;Object.assign(clone,fitRect({...clone,x:clone.x+24,y:clone.y+24},canvas));panels.push(clone);result.push({panel:panels.length-1,slot:''});}
    else {const base=r.slot.replace(/_[1-9]\d*$/,''),rect=slotRect(p,r.slot);let key=base,n=2;while(p.slots[key])key=`${base}_${n++}`;
      setSlotRect(p,key,fitRect({...rect,x:rect.x+24,y:rect.y+24},canvas,1));
      if(p.corners[r.slot])p.corners[key]=JSON.parse(JSON.stringify(p.corners[r.slot]));
      if(p.slotNotes?.[r.slot])p.slotNotes[key]=p.slotNotes[r.slot];
      if(p.slotContents?.[r.slot])p.slotContents[key]=JSON.parse(JSON.stringify(p.slotContents[r.slot]));
      result.push({panel:r.panel,slot:key});}
  }return result;
}
export function deleteRegions(panels:EditablePanel[],selection:Region[]):void {
  for(const r of regions(panels,selection).sort((a,b)=>b.panel-a.panel)){
    const p=panels[r.panel];if(p.locked)continue;
    if(!r.slot)panels.splice(r.panel,1);else{delete p.slots[r.slot];delete p.corners[r.slot];delete p.slotNotes?.[r.slot];delete p.slotContents?.[r.slot];}
  }
}
export function splitPanel(panels:EditablePanel[],index:number,axis:'x'|'y'):void {
  const p=panels[index];if(!p||p.locked)return;
  // Splitting a slanted quad would need polygon clipping; keep geometry explicit.
  if(p.corners.F)throw new Error('请先将外框恢复为矩形，再使用等分。');
  const size=axis==='x'?'width':'height',gap=8,half=Math.floor((p[size]-gap)/2);if(half<MIN_PANEL)throw new Error('分格太小，无法继续等分。');
  const other:EditablePanel={x:p.x,y:p.y,width:p.width,height:p.height,slots:{},corners:{},layer:Math.max(-1,...panels.map((p,i)=>p.layer??i))+1};
  other[axis]=p[axis]+half+gap;other[size]=p[size]-half-gap;p[size]=half;panels.splice(index+1,0,other);
}
