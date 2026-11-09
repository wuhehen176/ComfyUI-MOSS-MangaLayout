import {computed,nextTick,ref,type Ref} from 'vue';
import {slotType,type ManualContent} from './layouts';
import type {EditablePanel} from './editor';
export interface LayoutDocument { metadata?:Record<string,any>; id: string; label: string; description: string; promptMode: 'llm' | 'manual'; useBboxCorners: boolean; omitFullPageFrame?:boolean; omitSmallFrames?:boolean; width: number; height: number; panels: EditablePanel[] }

export function useFrameContent(doc:Ref<LayoutDocument>, current:Ref<EditablePanel|undefined>, selected:Ref<number>, selectedSlot:Ref<string>, selectSlot:(index:number,key:string)=>void, edit:(action:()=>void,slotEdit?:boolean)=>void, inputEdit:(key:string,action:()=>void)=>void) {
  const contentItems=computed(()=>current.value?.slotContents?.[selectedSlot.value || 'F'] ?? []);
  const quickEdit=ref<{index:number;key:string}|null>(null), quickDraft=ref('');
  const quickField=ref<HTMLTextAreaElement>();
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


  return {contentItems,quickEdit,quickDraft,quickField,addContent,changeContent,removeContent,moveContent,frameDescription,setFrameDescription,changeSlotNote,openDescription,saveQuickDescription,previewDescription};
}
