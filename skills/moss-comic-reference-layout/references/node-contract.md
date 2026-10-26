# 节点数据契约

适配 `ComfyUI-MOSS-MangaLayout`，不直接套其他漫画 skill 的双语输出、自由 bbox 或 comic_panel schema。

## 版式对象与规则来源

版式字段、坐标换算、斜框、角色编号、局部辅助定位及跨格规则统一见 [反推核心规则](layout-rules.md)，本文件只补充与节点运行接口有关的约定。

- 后端接受 64～8192 的偶数尺寸；编辑器将输入对齐最近的 16 倍数。实际采样另需满足所接潜空间的约束。
- `description` 是共用整页描述，`slotNotes` 按实际槽位保存各框描述。LLM 模式把它们交给外部模型；直接模式可将已填描述编译为画面内容。已有独立定位项的组织遵循核心规则。
- 新增分格只有 F；已有槽位及删除状态随版式和快照保留，不自动补槽位。
- X 虚拟槽已移除。编译器按 F 的外接矩形近似判断外框重叠；轮廓和遮挡说明是提示词引导，不是像素蒙版。

## 可选的手填模式

参考图反推仍可交付上述版式和独立内容 JSON。用户要在编辑器直接填写时，版式根对象可增加 `promptMode:"manual"`，并填写共用 `description`（整页描述）；每格的 `slotContents` 按实际槽位键保存内容数组。每项含 `label`（object/character/text）和字符串 `caption`，文字项另填准确 `text`，可选 `textType` 为 dialogue/narration/sfx。空白条目仅为草稿；两种模式共用各框 slotNotes，结构化人物和准确台词仍分别保存。

节点选择 manual 模式时从这些字段生成内容，不使用输入框中的旧 LLM 内容。llm 模式兼容普通整页描述、Layout JSON，或含单个 JSON 代码块的完整回复。代码块外说明不进入生图，多个代码块会报错；参考图任务若需逐项定位，继续使用带 panel/slot 的 JSON。

## 内容对象

根对象含非空 `summary.caption` 和非空 items，可选 layout；summary.canvas 单格为 single，多格为 multi_panel。

每个 item 含整数 panel、实际 slot、label、非空 caption。label 为 object/character/text；text 项另含非空 text，同人 character 的 tags 可含身份标签。

不手写 bbox。节点将坐标回填为 `abs_centralized / yxyx`，移除 panel/slot 并注入整页格数、读序和层级说明；输入 layout 不覆盖节点选择。

内容组织、特殊构图、多尺度展示与主体／局部项的关系遵循核心规则。逐项引用实际槽位后，编译器才回填该项的区域坐标；只在其他项中提及某局部不能代替这一定位。

同人角色身份 tag 采用可读写法，例如 `shirasu azusa (blue archive)`；只对已确认的身份 tag 做等价整理，保留版本限定，其余风格 tag 和触发词原样保留。对白 caption 用英文明确说话人并与人物英文名一致，未知姓名使用稳定称呼；旁白和拟声分别标明类型与声源。

MOSS 内容 caption 推荐英文；准确对白、拟声的语言与字体按用户要求或参考图确定。无法辨认的原字样列为待补，不猜成原文，也不生成空 text 项；只有用户要求新示例或创作时才自拟台词，并说明它是示例。

对白按所选读序连贯分配，一句一泡；长句可在语义边界拆成不重复的两泡。气泡靠说话人或画外声源，避脸与关键手势，沉默者不补空气泡。字号根据文字长度、语言和字区容量选择；用户提供阈值时沿用，不把案例的字号规则推广到所有语言。容量不足换字区、版式或分页，不继续缩字硬塞。

`summary.canvas` 可选，输入已有时保留；从零填写时单格使用 `single`、多格使用 `multi_panel`，与版式库 canvas 宽高对象区分。

同一矩形字区多条文字按数组顺序上下分区；非矩形字区多泡需独立选区。节点不自动识别人脸，避脸必须在构图和字区安排时考虑。

## 工作流快照

复制安装目录 `examples/单节点编译检查.json` 的已知普通工作流，再替换内容、ID 和完整快照。核对当前 node definition，不把 API 请求包装当普通 UI 工作流。

当前 MossMangaLayout 的 widgets_values 顺序为：内容字符串、layout_id、完整 layout_snapshot JSON 字符串。旧 bleed 和 library_mode 已退出新节点控件；生成工作流前仍应核对当前 node definition，勿从旧快照猜控件数量。

LLM 与直接提示词模式共用一个版式库，每套版式一个 JSON，index.json 记录顺序与文件名。旧双库首次读取时合并，同 ID 不同内容保留为带后缀的另一条；工作流继续使用完整快照，不依赖库中文件名。

输出 layout_prompt、width、height 接文本编码器 text 与潜空间尺寸。旧工作流从快照还原，公共库之后改名、删除或改几何都不自动覆盖它。
