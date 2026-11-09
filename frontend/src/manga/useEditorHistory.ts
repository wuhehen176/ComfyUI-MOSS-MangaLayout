import {ref, type Ref} from 'vue';

/** One history for geometry, descriptions and manual content; inner-frame cancellation uses the same snapshots. */
export function useEditorHistory<T>(doc:Ref<T>, error:Ref<string>, confirmSlot:()=>void, onRestore:()=>void) {
  const undoStack=ref<string[]>([]), redoStack=ref<string[]>([]), baseline=ref('');
  const snapshot=():string=>JSON.stringify(doc.value);
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
    onRestore();
  }
  function undo(): void { confirmSlot(); const before = undoStack.value.pop(); if (before) { redoStack.value.push(snapshot()); restore(before); } }
  function redo(): void { confirmSlot(); const after = redoStack.value.pop(); if (after) { undoStack.value.push(snapshot()); restore(after); } }
  let lastInput:{key:string;time:number;after:string}|null=null;
  function inputEdit(key:string,action:()=>void):void {
    const before=snapshot(),coalesce=lastInput?.key===key && before===lastInput.after && Date.now()-lastInput.time<750;
    edit(action,true);
    if(coalesce&&before!==snapshot())undoStack.value.pop();
    lastInput={key,time:Date.now(),after:snapshot()};
  }
  function resetInputGroup():void { lastInput=null; }
  return {undoStack,redoStack,baseline,snapshot,remember,edit,restore,undo,redo,inputEdit,resetInputGroup};
}
