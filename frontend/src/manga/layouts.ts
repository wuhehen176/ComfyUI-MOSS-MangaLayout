import { directionalLayout } from './portable';
import type { FrameBox, MangaLayoutDef, MangaOrientation, MangaPanel, ManualContent } from './types';
export type { FrameBox, MangaLayoutDef, MangaOrientation, MangaPanel, ManualContent };

export function slotType(key: string): string { return key.replace(/_[1-9]\d*$/, ''); }

export function orientationOf(width?: number, height?: number): MangaOrientation {
  return typeof width === 'number' && typeof height === 'number' && width > height ? 'landscape' : 'portrait';
}

/** Legacy files without a canvas retain their original default size. */
export function canvasOf(orientation: MangaOrientation): { width: number; height: number } {
  return orientation === 'portrait' ? {width:1088,height:1920} : {width:1920,height:1088};
}

export interface MangaCustomLayout {
  omitFullPageFrame?:boolean;
  omitSmallFrames?:boolean;
  id: string;
  useBboxCorners?: boolean;
  description?: string;
  promptMode?: 'llm' | 'manual';
  promptCaption?: string;
  label?: string;
  /** 选择引导：这套版式适合什么节拍，拼进提示词清单。 */
  usage?: string;
  readingOrder?: string;
  portrait?: MangaPanel[];
  landscape?: MangaPanel[];
  /** 快捷编辑器保存的画布尺寸；旧版式缺省时沿用对应方向内置画布。 */
  canvas?: { width: number; height: number };
}

export interface ResolvedLayout extends MangaLayoutDef {
  id: string;
  description?: string;
  canvas: { width: number; height: number };
}

export function parseCustomLayout(text: string): MangaCustomLayout {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch (error) {
    throw new Error(`JSON 解析失败:${error instanceof Error ? error.message : String(error)}`);
  }
  parsed=directionalLayout(parsed as Record<string,unknown>);
  const entry = normalizeCustom(parsed);
  if (!entry) {
    throw new Error('需要形如 {"id":"my_layout","label":"…","portrait":[{"position":"…","slots":{"F":[y1,x1,y2,x2]}}]}');
  }
  if (!entry.portrait?.length && !entry.landscape?.length) {
    throw new Error('portrait 与 landscape 至少要有一个方向的面板');
  }
  const source = parsed as Record<string, unknown>;
  for (const key of ['omitFullPageFrame','omitSmallFrames','useBboxCorners']) if(source[key]!==undefined && typeof source[key]!=='boolean') throw new Error(`${key} 需要布尔值。`);
  if (source.promptMode !== undefined && !['llm','manual'].includes(source.promptMode as string)) throw new Error('提示词模式需要 llm 或 manual。');
  for (const key of ['description','promptCaption']) if(source[key]!==undefined && typeof source[key]!=='string') throw new Error('画面描述需要字符串。');
  if (source.canvas !== undefined && !normalizeCanvas(source.canvas)) throw new Error('画布宽高必须是 64～8192 的偶数。');
  for (const orientation of ['portrait', 'landscape'] as const) {
    if (source[orientation] === undefined) continue;
    const panels = source[orientation];
    const canvas = entry.canvas ? (orientationOf(entry.canvas.width,entry.canvas.height)===orientation ? entry.canvas : {width:entry.canvas.height,height:entry.canvas.width}) : canvasOf(orientation);
    if (entry.canvas && canvas.width!==canvas.height && orientationOf(canvas.width, canvas.height) !== orientation) throw new Error('面板方向与自定义画布宽高不符。');
    const positions = new Set<string>();
    if (!Array.isArray(panels) || !panels.length) throw new Error(`${orientation}:需要非空面板数组。`);
    for (const rawPanel of panels) {
      const panel = rawPanel as MangaPanel | null;
      const position = typeof panel?.position === 'string' ? panel.position.trim().toLowerCase() : '';
      if (!position || positions.has(position)) throw new Error(`${orientation}:面板位置不能为空或重复。`);
      positions.add(position);
      if (panel?.layer !== undefined && !Number.isSafeInteger(panel.layer)) throw new Error(`${orientation}/${position}:层级必须为安全整数。`);
      if (!panel?.slots || typeof panel.slots !== 'object' || Array.isArray(panel.slots) || !Object.keys(panel.slots).length) {
        throw new Error(`${orientation}/${position}:需要槽位坐标。`);
      }
      if (panel?.locked!==undefined && typeof panel.locked!=='boolean') throw new Error(`${orientation}/${position}:锁定状态需要布尔值。`);
      if (panel?.slotContents!==undefined) {
        if (!panel.slotContents || typeof panel.slotContents!=='object' || Array.isArray(panel.slotContents)) throw new Error(`${orientation}/${position}:手填内容格式错误。`);
        const contentSlots=new Set<string>();
        for (const [slot,entries] of Object.entries(panel.slotContents)) {
          const key=slot.trim().toUpperCase();
          if (!panel.slots[key] || contentSlots.has(key) || !Array.isArray(entries) || entries.some(item=>!item || !['object','character','text'].includes(item.label) || typeof item.caption!=='string' || (item.text!==undefined && typeof item.text!=='string') || (item.textType!==undefined && !['dialogue','narration','sfx'].includes(item.textType)))) throw new Error(`${orientation}/${position}/${slot}:手填内容或文字类型无效。`);
          contentSlots.add(key);
        }
      }
      for (const [slot, rawBox] of Object.entries(panel.slots)) {
        if (slotType(slot)==='X') throw new Error('X 槽位已移除，请将跨格主体放入 S 或编号主体框，并调整其实际坐标。');
        const box = normalizeBox(rawBox);
        if (!/^[A-Z]+(?:_[1-9]\d*)?$/.test(slot) || !box || box[0] < -canvas.height / 2 || box[2] > canvas.height / 2 ||
            box[1] < -canvas.width / 2 || box[3] > canvas.width / 2) {
          throw new Error(`${orientation}/${position}/${slot}:坐标无效或超出画布。`);
        }
      }
      if (panel.shapes!==undefined && (!panel.shapes || typeof panel.shapes!=='object' || Array.isArray(panel.shapes))) throw new Error('shapes 需要对象。');
      for (const [slot, shape] of Object.entries(panel.shapes ?? {})) {
        if (!panel.slots[slot] || !validQuad(shape) || shape.some(([x,y]) => Math.abs(x) > canvas.width/2 || Math.abs(y) > canvas.height/2)) {
          throw new Error(`${orientation}/${position}/${slot}:四边形角点无效、交叉或超出画布。`);
        }
      }
    }
  }
  return entry;
}

function normalizeBox(raw: unknown): FrameBox | null {
  if (!Array.isArray(raw) || raw.length !== 4) return null;
  const nums = raw;
  if (nums.some(value => !Number.isSafeInteger(value))) return null;
  const [y1, x1, y2, x2] = nums as [number, number, number, number];
  if (y1 >= y2 || x1 >= x2) return null;
  return [y1, x1, y2, x2];
}

function normalizePanels(raw: unknown): MangaPanel[] | undefined {
  if (!Array.isArray(raw)) return undefined;
  const out: MangaPanel[] = [];
  for (const item of raw) {
    if (!item || typeof item !== 'object' || Array.isArray(item)) continue;
    const panel = item as Partial<MangaPanel>;
    const position = typeof panel.position === 'string' ? panel.position.trim() : '';
    const slotsRaw = panel.slots && typeof panel.slots === 'object' ? (panel.slots as Record<string, unknown>) : null;
    if (!position || !slotsRaw) continue;
    const slots: Record<string, FrameBox> = {};
    for (const [key, value] of Object.entries(slotsRaw)) {
      const box = normalizeBox(value);
      if (box) slots[key.trim().toUpperCase()] = box;
    }
    const shapes: Record<string, number[][]> = {};
    if (panel.shapes && typeof panel.shapes === 'object') {
      for (const [key, value] of Object.entries(panel.shapes)) {
        const slot = key.trim().toUpperCase();
        if (slots[slot] && validQuad(value)) shapes[slot] = value.map(p => [...p]);
      }
    }
    const slotNotes: Record<string,string> = {};
    if (panel.slotNotes && typeof panel.slotNotes === 'object' && !Array.isArray(panel.slotNotes)) {
      for (const [key,value] of Object.entries(panel.slotNotes)) {
        const slot = key.trim().toUpperCase();
        if (slots[slot] && typeof value === 'string' && value.trim()) slotNotes[slot] = value.trim();
      }
    }
    const slotContents: Record<string, ManualContent[]> = {};
    if (panel.slotContents && typeof panel.slotContents === 'object' && !Array.isArray(panel.slotContents)) {
      for (const [key, value] of Object.entries(panel.slotContents)) {
        const slot = key.trim().toUpperCase();
        if (slots[slot] && Array.isArray(value)) slotContents[slot] = JSON.parse(JSON.stringify(value));
      }
    }
    if (Object.keys(slots).length) out.push({ position, slots, ...(panel.locked===true ? {locked:true} : {}), ...(Number.isSafeInteger(panel.layer) ? { layer:panel.layer } : {}), ...(Object.keys(shapes).length ? { shapes } : {}), ...(Object.keys(slotNotes).length ? { slotNotes } : {}), ...(Object.keys(slotContents).length ? { slotContents } : {}) });
  }
  return out.length ? out : undefined;
}

function normalizeCustom(raw: unknown): MangaCustomLayout | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const entry = raw as Partial<MangaCustomLayout>;
  const id = typeof entry.id === 'string' ? entry.id.trim() : '';
  if (!id) return null;
  const portrait = normalizePanels(entry.portrait);
  const landscape = normalizePanels(entry.landscape);
  const label = typeof entry.label === 'string' ? entry.label.trim() : undefined;
  const usage = typeof entry.usage === 'string' ? entry.usage.trim() : undefined;
  const readingOrder = typeof entry.readingOrder === 'string' ? entry.readingOrder.trim() : undefined;
  if (!portrait && !landscape && !label && !usage && !readingOrder) return null;
  const canvas = normalizeCanvas(entry.canvas);
  return { id, label, usage, readingOrder, portrait, landscape, ...(typeof entry.omitFullPageFrame==='boolean'?{omitFullPageFrame:entry.omitFullPageFrame}:{}),...(typeof entry.omitSmallFrames==='boolean'?{omitSmallFrames:entry.omitSmallFrames}:{}), ...(canvas ? { canvas } : {}), ...(entry.promptMode ? { promptMode:entry.promptMode } : {}), ...(typeof entry.useBboxCorners === 'boolean' ? { useBboxCorners:entry.useBboxCorners } : {}), ...(typeof entry.promptCaption === 'string' ? { promptCaption:entry.promptCaption } : {}), ...(typeof entry.description === 'string' ? { description:entry.description } : {}) };
}

export function sharedDescription(value: {description?: unknown; usage?: unknown; promptCaption?: unknown}): string {
  if (typeof value.description === 'string') return value.description;
  return [...new Set([value.usage,value.promptCaption].filter((text): text is string => typeof text === 'string' && !!text.trim()).map(text=>text.trim()))].join('\n\n');
}

export function normalizeCanvas(raw: unknown): { width: number; height: number } | null {
  if (!raw || typeof raw !== 'object') return null;
  const { width, height } = raw as { width: number; height: number };
  return [width, height].every(v => Number.isInteger(v) && v >= 64 && v <= 8192 && v % 2 === 0) ? { width, height } : null;
}

/** 顶点按轮廓顺序排列，拒绝交叉、翻转与退化的四边形。 */
export function validQuad(raw: unknown): raw is number[][] {
  if (!Array.isArray(raw) || raw.length !== 4 || raw.some(p => !Array.isArray(p) || p.length !== 2 || p.some(v => typeof v !== 'number' || !Number.isFinite(v)))) return false;
  return raw.every((p,i) => {
    const q = raw[(i+1)%4], r = raw[(i+2)%4];
    return (q[0]-p[0])*(r[1]-q[1]) - (q[1]-p[1])*(r[0]-q[0]) > .01;
  });
}
