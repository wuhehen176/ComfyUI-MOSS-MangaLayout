import { app } from '../../scripts/app.js';
import { api } from '../../scripts/api.js';
import { createApp } from 'vue';
import Editor from './Editor.vue';
import { combinedInstructions, exportEntries, formatEntry, renderPreview } from './preview.js';

const libraries={llm:{layouts:[],revision:''},manual:{layouts:[],revision:''}};
const listeners=new Set();
const stylesheet=new URL(import.meta.url);
stylesheet.pathname=stylesheet.pathname.replace(/[^/]+$/,'moss_layout.css');
const css=document.createElement('link');css.rel='stylesheet';css.href=stylesheet.href;document.head.append(css);

async function request(path,options={}) {
  const response=await api.fetchApi('/moss_manga_layout/'+path,options);
  const body=await response.json();
  if(!response.ok) throw new Error(body.error||`请求失败：${response.status}`);
  return body;
}
async function refresh(mode) {
  libraries[mode]=await request('library?mode='+mode); listeners.forEach(fn=>fn());
}
async function refreshAll() {await Promise.all(['llm','manual'].map(refresh));}
async function saveLibrary(layouts,mode) {
  libraries[mode]=await request('library?mode='+mode,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({layouts,revision:libraries[mode].revision})});
  listeners.forEach(fn=>fn());
}
function showEditor(selected,onSave,mode) {
  const host=document.createElement('div');document.body.append(host);
  let editing;
  const close=()=>{editing.unmount();host.remove();};
  editing=createApp(Editor,{
    sources:[...(selected?[selected]:[]),...libraries[mode].layouts.filter(layout=>layout.id!==selected?.id)].map(layout=>({...layout,key:layout.id})),
    existingIds:libraries[mode].layouts.map(layout=>layout.id),
    initialMode:mode,
    libraryIds:Object.fromEntries(['llm','manual'].map(key=>[key,libraries[key].layouts.map(layout=>layout.id)])),
    initialKey:selected?.id,editingId:selected?.id,
    onClose:close,
    onSave:async value=>{
      try {
        const saved=formatEntry(value);
        const targetMode=saved.promptMode??'llm', library=libraries[targetMode];
        const found=library.layouts.some(entry=>entry.id===saved.id);
        if(found && (saved.id!==selected?.id || targetMode!==mode)) throw new Error('目标版式库已有此 ID，请改名或从目标库打开编辑。');
        await saveLibrary(found ? library.layouts.map(entry=>entry.id===saved.id?saved:entry) : [...library.layouts,saved],targetMode);
        onSave(saved);close();
      } catch(error) {window.alert(error.message);}
    },
  });
  editing.mount(host);
}
async function copyText(text) {
  try {await navigator.clipboard.writeText(text);}
  catch {
    const field=document.createElement('textarea');field.value=text;field.style.position='fixed';field.style.top='-10000px';document.body.append(field);
    field.select();const copied=document.execCommand('copy');field.remove();if(!copied)throw new Error('浏览器无法访问剪贴板。');
  }
}

function install(node) {
  const id=node.widgets.find(widget=>widget.name==='layout_id');
  const snapshot=node.widgets.find(widget=>widget.name==='layout_snapshot');
  if(!id||!snapshot)return;
  snapshot.type='hidden';snapshot.computeSize=()=>[0,-4];
  const mode=node.widgets.find(widget=>widget.name==='library_mode')??{value:'llm'};
  mode.type='hidden';mode.computeSize=()=>[0,-4];
  const library=()=>libraries[mode.value==='manual'?'manual':'llm'];
  id.type='combo';id.options={...id.options,values:()=>[...new Set([...library().layouts.map(entry=>entry.id),id.value].filter(Boolean))]};
  let previewHeight=400,widget,resizeFrame;
  const box=document.createElement('div');box.className='moss-layout-node-panel';box.style.cssText='width:100%;height:400px;display:flex;flex-direction:column;gap:6px;padding:6px;box-sizing:border-box;overflow:hidden;background:#202733;color:#ecf1f7;font:12px system-ui;';
  const modePicker=document.createElement('select');modePicker.setAttribute('aria-label','版式库类型');modePicker.style.cssText='flex:none;height:32px;color:#fff;background:#344052;border:1px solid #7d8b9e;border-radius:4px;padding:3px 6px';
  for(const [value,label] of [['llm','LLM 用途库'],['manual','直接提示词库']]){const option=document.createElement('option');option.value=value;option.textContent=label;modePicker.append(option);}box.append(modePicker);
  const pickerRow=document.createElement('label');pickerRow.style.cssText='display:flex;align-items:center;gap:8px;flex:none;min-height:32px';pickerRow.append(document.createTextNode('版式库'));
  const picker=document.createElement('select');picker.setAttribute('aria-label','选择库中版式');picker.style.cssText='flex:1;min-width:0;height:32px;color:#fff;background:#344052;border:1px solid #7d8b9e;border-radius:4px;padding:3px 6px';pickerRow.append(picker);box.append(pickerRow);
  const controls=document.createElement('div');controls.style.cssText='display:flex;flex-wrap:wrap;gap:5px;flex:none';box.append(controls);
  const status=document.createElement('div');status.setAttribute('role','status');status.style.cssText='min-height:30px;white-space:normal;overflow-wrap:anywhere;flex:none';box.append(status);
  const canvas=document.createElement('canvas');canvas.width=1000;canvas.height=540;canvas.style.cssText='display:block;width:100%;height:240px;min-height:240px;flex:none;object-fit:contain;background:#e9edf3';box.append(canvas);
  const toggle=document.createElement('label');const check=document.createElement('input');check.type='checkbox';check.checked=true;toggle.append(check,document.createTextNode('显示字区'));controls.append(toggle);
  function current() {return snapshot.value ? JSON.parse(snapshot.value) : null;}
  function fitPanel() {
    if(!widget)return;
    previewHeight=12+24+modePicker.offsetHeight+pickerRow.offsetHeight+controls.offsetHeight+status.offsetHeight+240;
    box.style.height=previewHeight+'px';
    const minimum=node.computeSize();
    if(node.size[1]<minimum[1])node.setSize([node.size[0],minimum[1]]);
    app.graph?.setDirtyCanvas(true,true);
  }
  function scheduleFit() {
    cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(fitPanel);
  }
  function updatePicker() {
    modePicker.value=mode.value;
    picker.replaceChildren();
    for(const entry of library().layouts) {
      const option=document.createElement('option');option.value=entry.id;option.textContent=`${entry.id} · ${entry.label||entry.id}`;picker.append(option);
    }
    if(!library().layouts.some(entry=>entry.id===id.value)) {
      const option=document.createElement('option');option.value=id.value||'';option.textContent=snapshot.value?`${id.value} · 当前工作流快照（库中已无此版式）`:'请选择版式，或新建／导入';option.disabled=true;picker.prepend(option);
    }
    picker.value=id.value||'';
    picker.disabled=!library().layouts.length;
  }
  function update() {
    updatePicker();
    try {
      const layout=current();renderPreview(canvas,layout,check.checked);
      status.textContent=layout?`${layout.label||layout.id} · ${layout.canvas.width}×${layout.canvas.height} · ${layout.panels.length} 格 · ${layout.promptMode==='manual'?'直接提示词（读取手填内容）':'LLM 输入'} · 工作流快照`:'没有选中版式：请新建或导入。';
    } catch(error){status.textContent=error.message;}
    app.graph?.setDirtyCanvas(true,true);
    scheduleFit();
  }
  function select(layout) {
    mode.value=layout.promptMode??'llm';id.value=layout.id;snapshot.value=JSON.stringify(layout);update();app.graph?.change();
  }
  function button(label,action) {
    const control=document.createElement('button');control.textContent=label;control.type='button';control.style.cssText='padding:4px 7px;border:1px solid #7d8b9e;border-radius:4px;background:#344052;color:#fff;cursor:pointer';
    control.onclick=async()=>{try{await action();}catch(error){status.textContent=error.message;}};controls.append(control);
  }
  button('编辑版式',()=>{const chosen=current();if(!chosen)throw new Error('先选择版式。');showEditor(chosen,select,mode.value);});
  button('新建',()=>showEditor(null,select,mode.value));
  button('删除',async()=>{
    const chosen=current();if(!chosen)throw new Error('先选择版式。');
    await saveLibrary(library().layouts.filter(entry=>entry.id!==chosen.id),mode.value);
    update();status.textContent='已从公共库删除。当前节点保留工作流快照；不会自动恢复到库。';
  });
  button('刷新版式库',()=>refresh(mode.value));
  button('一键复制说明',async()=>{
    const chosen=current();if(!chosen)throw new Error('先选择版式。');
    const result=await request('format',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(chosen)});
    await copyText(combinedInstructions(result.text,chosen));status.textContent='已复制格式转换＋当前快照的框用途说明，可一起交给 LLM。';
  });
  button('复制手填提示词',async()=>{
    const chosen=current();if(!chosen)throw new Error('先选择版式。');
    if(chosen.promptMode!=='manual')throw new Error('请先在编辑器第二页填写画面描述／台词，并保存为直接提示词模式。');
    const result=await request('manual',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({layout:chosen,bleed:node.widgets.find(widget=>widget.name==='bleed')?.value??72})});
    await copyText(result.text);status.textContent='已复制包含坐标的 MOSS 提示词；运行节点时 layout_prompt 输出相同内容。';
  });
  button('导出版式库',()=>{
    const url=URL.createObjectURL(new Blob([JSON.stringify({mode:mode.value,layouts:library().layouts},null,2)],{type:'application/json'}));
    const link=document.createElement('a');link.href=url;link.download=`moss-manga-${mode.value}-layouts.json`;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
  button('导出当前版式',()=>{
    const chosen=current();if(!chosen)throw new Error('先选择版式。');
    const url=URL.createObjectURL(new Blob([JSON.stringify(formatEntry(chosen),null,2)],{type:'application/json'}));
    const link=document.createElement('a');link.href=url;link.download='moss-manga-current-layout.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
  button('导入',()=>{
    const input=document.createElement('input');input.type='file';input.accept='.json,application/json';
    input.onchange=async()=>{
      try {
        if(!input.files?.[0])return;
        const data=JSON.parse(await input.files[0].text()), entries=exportEntries(data);
        const modes=new Set(entries.map(entry=>entry.promptMode??data.mode??mode.value));
        if(modes.size>1 || [...modes].some(mode=>!['llm','manual'].includes(mode)))throw new Error('请分别导入 LLM 用途库和直接提示词库文件。');
        const targetMode=[...modes][0]??mode.value;
        for(const entry of entries)entry.promptMode=targetMode;
        const ids=new Set(libraries[targetMode].layouts.map(entry=>entry.id));
        if(entries.some(entry=>ids.has(entry.id)))throw new Error('导入含同名 ID，请先改名；不会覆盖已有版式。');
        await saveLibrary([...libraries[targetMode].layouts,...entries],targetMode);if(entries.length)select(entries[0]);else update();
      }catch(error){status.textContent=error.message;}
    };input.click();
  });
  check.onchange=update;
  modePicker.onchange=()=>{
    mode.value=modePicker.value;
    const selected=library().layouts.find(entry=>entry.id===id.value)??library().layouts[0];
    if(selected)select(selected);else{id.value='';snapshot.value='';update();app.graph?.change();}
  };
  picker.onchange=()=>{
    const selected=library().layouts.find(entry=>entry.id===picker.value);
    if(selected)select(selected);
  };
  id.callback=value=>{
    const selected=library().layouts.find(entry=>entry.id===value);
    if(selected)select(selected);else update();
  };
  widget=node.addDOMWidget('版式预览','moss_layout_preview',box,{serialize:false,hideOnZoom:false,getMinHeight:()=>previewHeight,getMaxHeight:()=>previewHeight,getHeight:()=>previewHeight});
  widget.computeSize=width=>[width,previewHeight];
  node.setSize([Math.max(node.size[0],460),Math.max(node.size[1],640)]);
  const resizeObserver=new ResizeObserver(scheduleFit);[pickerRow,controls,status].forEach(element=>resizeObserver.observe(element));
  const onResize=node.onResize;
  node.onResize=function(...args){const result=onResize?.apply(this,args);scheduleFit();return result;};
  const onConfigure=node.onConfigure;
  node.onConfigure=function(...args){const result=onConfigure?.apply(this,args);setTimeout(()=>{if(snapshot.value)mode.value=current()?.promptMode??'llm';update();},0);return result;};
  listeners.add(update);
  const onRemoved=node.onRemoved;
  node.onRemoved=function(...args){listeners.delete(update);resizeObserver.disconnect();cancelAnimationFrame(resizeFrame);return onRemoved?.apply(this,args);};
  refreshAll().then(()=>{
    if(snapshot.value)mode.value=current()?.promptMode??'llm';
    if(!snapshot.value && !id.value && library().layouts.length)select(library().layouts[0]);
    else if(!snapshot.value && id.value){const selected=library().layouts.find(entry=>entry.id===id.value);if(selected)select(selected);}
    update();
  }).catch(error=>{status.textContent=error.message;});
}

app.registerExtension({name:'MOSS.MangaLayout',beforeRegisterNodeDef(nodeType,nodeData){
  if(nodeData.name!=='MossMangaLayout')return;
  const created=nodeType.prototype.onNodeCreated;
  nodeType.prototype.onNodeCreated=function(...args){const result=created?.apply(this,args);install(this);return result;};
}});
