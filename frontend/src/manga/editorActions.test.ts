import {describe,it,expect} from 'vitest';
import {editablePanel,setSlotRect,slotRect,saveEditedPanel} from './editor';
import {regions,moveRegions,alignRegions,duplicateRegions,deleteRegions,splitPanel} from './editorActions';
const canvas={width:1024,height:1024};
function panel(x:number){const p=editablePanel({x,y:100,width:180,height:200},canvas);p.slots={};return p;}
describe('editor batch operations',()=>{
 it('selects parent only when children are also selected; moves the group without moving a child twice',()=>{
   const panels=[panel(20),panel(320)];setSlotRect(panels[0],'S',{x:30,y:120,width:40,height:50});
   const selected=[{panel:0,slot:''},{panel:0,slot:'S'},{panel:1,slot:''}];
   expect(regions(panels,selected)).toHaveLength(2);moveRegions(panels,selected,40,10,canvas);
   expect(slotRect(panels[0],'S').x).toBe(70);expect(panels[1].x).toBe(360);
 });
 it('duplicates numbered slots with their content, shape and notes, then deletes and leaves F',()=>{
   const panels=[panel(20)];const p=panels[0];setSlotRect(p,'S',{x:30,y:120,width:40,height:50});p.slotNotes={S:'hand'};p.slotContents={S:[{label:'character',caption:'Her hand'}]};p.corners.S=[[0,0],[1,.1],[1,1],[0,1]];
   const clone=duplicateRegions(panels,[{panel:0,slot:'S'}],canvas);expect(clone[0].slot).toBe('S_2');expect(p.slotContents.S_2).toEqual(p.slotContents.S);expect(p.corners.S_2).toEqual(p.corners.S);
   deleteRegions(panels,clone);expect(p.slots.S_2).toBeUndefined();expect(saveEditedPanel(p,canvas,'one').slots.F).toBeDefined();
 });
 it('aligns and distributes; locked frames stay fixed and new split panels have no inner slots',()=>{
   const panels=[panel(20),panel(300),panel(700)];const rs=panels.map((_,panel)=>({panel,slot:''}));
   alignRegions(panels,rs,'gap-x',canvas);expect(panels[1].x).toBe(360);
   panels[1].locked=true;moveRegions(panels,rs,10,10,canvas);expect(panels[1].x).toBe(360);
   deleteRegions(panels,[rs[1]]);expect(panels).toHaveLength(3);
   splitPanel(panels,0,'y');expect(panels[1].slots).toEqual({});expect(panels[1].position).toBeUndefined();
 });
});
