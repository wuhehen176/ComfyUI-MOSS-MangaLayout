/** Editable layout geometry and manual content, shared by the editor modules. */
export type MangaOrientation = 'portrait' | 'landscape';

/** 单槽位坐标,[y_min, x_min, y_max, x_max],画布中心为原点。 */
export type FrameBox = number[];

export interface ManualContent {
  label: 'object' | 'character' | 'text';
  caption: string;
  text?: string;
  textType?: 'dialogue' | 'narration' | 'sfx';
}

export interface MangaPanel {
  locked?:boolean;
  /** 该格在版式里的位置代号,如 single / top-left / right-main。 */
  position: string;
  /** 绘制层级，越大越靠前；省略时使用面板数组顺序。与阅读顺序独立。 */
  layer?: number;
  /** 槽位字母 → 坐标框。 */
  slots: Record<string, FrameBox>;
  /** 共用画面描述：LLM 模式作为分配依据，直接模式编译为对应区域内容。 */
  slotNotes?: Record<string, string>;
  /** 结构化的手填画面与准确台词；与共用描述分别保存。 */
  slotContents?: Record<string, ManualContent[]>;
  /** 自定义四边形轮廓：[x,y]，以画布中心为原点；bbox 仍为其外接矩形。 */
  shapes?: Record<string, number[][]>;
}

export interface MangaLayoutDef {
  omitFullPageFrame?:boolean;
  omitSmallFrames?:boolean;
  label: string;
  useBboxCorners?: boolean;
  promptMode?: 'llm' | 'manual';
  promptCaption?: string;
  /** 这套版式适合什么节拍：拼进提示词清单，直接引导模型挑选。 */
  usage?: string;
  readingOrder: string;
  panels: MangaPanel[];
}
