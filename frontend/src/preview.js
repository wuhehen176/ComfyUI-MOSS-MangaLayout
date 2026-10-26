import {sharedDescription,slotType} from './manga/layouts';

export function formatEntry(value) {
  const {id,label,usage,readingOrder,canvas,promptMode,promptCaption}=value;
  if(!canvas||!id)throw new Error('版式缺少 id 或 canvas。');
  const panels=value.panels??value.portrait??value.landscape;
  if(!Array.isArray(panels)||!panels.length)throw new Error('版式缺少分格。');
  return {id,label:label||id,description:sharedDescription(value),usage:usage||'',readingOrder:readingOrder||'',canvas,panels,...(promptMode?{promptMode}:{}),...(typeof promptCaption==='string'?{promptCaption}:{})};
}
export function exportEntries(value) {
  const entries=Array.isArray(value)?value:value.layouts??[value];
  if(!Array.isArray(entries))throw new Error('导入需要版式数组。');
  return entries.map(formatEntry);
}
export function purposeInstructions(value) {
  const layout=formatEntry(value);
  const panels=layout.panels.map((panel,index)=>({panel:index+1,position:panel.position,slots:Object.keys(panel.slots),slotNotes:{...Object.fromEntries(Object.entries(panel.slotContents??{}).map(([key,entries])=>[key,entries.filter(item=>item.label!=='text').map(item=>item.caption).filter(Boolean).join('\n')]).filter(([,note])=>note)),...panel.slotNotes}}));
  return '以下为当前所选版式的画面描述，请结合用户最新要求和原文分配内容。F 描述整格，其余键是内容定位参考。槽位按需要选用，未使用区域省略，不补占位项；明确承担抓握、衣袖、饰品、局部出框或接触定位的辅助槽位，分别保留引用对应完整 slot 的局部 item，不能仅并入主体 caption 后省略。主体项写整体姿态，局部项写角色归属、部位、连接、接触与遮挡，描述保持一致；多个 item 不等于多个人物。槽位名称不强制规定内容类型。画面描述本身不是台词、旁白或可见印字；明确提供的准确字样另填 text。保留既定事件、身份、人数与准确台词。下方只含槽位清单和画面描述，不含完整画布坐标与 shapes；仅凭这段信息不能确认几何没有冲突，需要结合额外提供的实际几何或回编辑器核对。\n'+JSON.stringify({layout:layout.id,description:layout.description,readingOrder:layout.readingOrder,panels},null,2);
}
export function combinedInstructions(formatText,value) {
  return formatText.trim()+'\n\n'+purposeInstructions(value);
}
export function renderPreview(canvas,layout,showSlots) {
  const ctx=canvas.getContext('2d'),w=canvas.width,h=canvas.height;
  ctx.clearRect(0,0,w,h);
  if(!layout)return;
  const scale=Math.min((w-20)/layout.canvas.width,(h-20)/layout.canvas.height);
  const dx=(w-layout.canvas.width*scale)/2,dy=(h-layout.canvas.height*scale)/2;
  ctx.save();ctx.translate(dx,dy);ctx.scale(scale,scale);ctx.translate(layout.canvas.width/2,layout.canvas.height/2);
  ctx.fillStyle='#fff';ctx.fillRect(-layout.canvas.width/2,-layout.canvas.height/2,layout.canvas.width,layout.canvas.height);
  const panels=layout.panels.map((panel,index)=>({panel,index})).sort((a,b)=>(a.panel.layer??a.index)-(b.panel.layer??b.index)||a.index-b.index);
  for(const {panel,index} of panels) {
    const box=panel.slots.F??panel.slots.C??Object.values(panel.slots)[0];
    const [top,left,bottom,right]=box;
    const points=panel.shapes?.F??[[left,top],[right,top],[right,bottom],[left,bottom]];
    ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();
    ctx.fillStyle='#eef4fd';ctx.fill();ctx.strokeStyle='#235c9e';ctx.lineWidth=2/scale;ctx.stroke();
    ctx.save();ctx.clip();
    if(showSlots) for(const [key,[y1,x1,y2,x2]] of Object.entries(panel.slots)) {
      if(!['T','TL','TR','B','BL','BR','ML','MR'].includes(slotType(key)))continue;
      const shape=panel.shapes?.[key]??[[x1,y1],[x2,y1],[x2,y2],[x1,y2]];
      ctx.beginPath();shape.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();
      ctx.strokeStyle='#dd8838';ctx.lineWidth=1/scale;ctx.stroke();ctx.fillStyle='#a65313';ctx.font=`${10/scale}px sans-serif`;ctx.fillText(key,x1+2/scale,y1+12/scale);
    }
    ctx.restore();ctx.fillStyle='#16375b';ctx.font=`bold ${13/scale}px sans-serif`;ctx.fillText(String(index+1),left+4/scale,top+16/scale);
  }
  ctx.restore();
}
