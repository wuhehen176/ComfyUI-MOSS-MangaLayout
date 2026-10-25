# 节点数据契约

适配 `ComfyUI-MOSS-MangaLayout`，不直接套其他漫画 skill 的双语输出、自由 bbox 或 comic_panel schema。

## 版式对象

```json
{
  "id": "reference_page",
  "label": "参考图版式",
  "description": "整页共用画面描述",
  "promptMode": "llm",
  "readingOrder": "上方 → 下方",
  "canvas": {"width": 1664, "height": 2496},
  "panels": [
    {
      "position": "upper",
      "layer": 0,
      "slots": {
        "F": [-1200, -780, -300, 780],
        "C": [-1180, -760, -320, 760],
        "S": [-1100, 0, 1100, 780],
        "TL": [-1160, -740, -900, -100]
      },
      "slotNotes": {
        "F": "上方背景格",
        "C": "背景，不另造子格",
        "S": "同一大人物延伸至下方，连续身体，无独立矩形框",
        "TL": "第一句对白，避脸"
      }
    },
    {
      "position": "lower",
      "layer": 1,
      "slots": {
        "F": [-250, -780, 1200, 780],
        "C": [-230, -760, 1180, 760],
        "TL": [-200, -740, 100, -100]
      },
      "slotNotes": {"F": "下方背景格", "C": "环境", "TL": "下一句对白"}
    }
  ]
}
```

- panels 数组顺序就是整数 panel 编号和读序；position 是稳定标识，不因画面左右重新排序。
- 当前节点后端兼容 64～8192 的偶数尺寸；编辑器输入完成后对齐最近的 16 倍数，新建版式优先使用 16 倍数并满足所接潜空间要求。
- slots 外接框为 `[top,left,bottom,right]`，原点在画布中心。原图点先按目标宽高缩放，再减目标半宽／半高。
- 可选 shapes 的键必须是实际槽位，值为顺时针四个 `[x,y]` 中心像素点，不能与 yxyx 混用。
- S 等内容槽可在画布内超出所属 F；跨格示例用这种方式。内容槽不另计格，遮挡仍靠描述而非硬蒙版。
- 外框重叠时 layer 影响遮挡，不替代读序。X 虚拟槽和出框像素控件已移除；跨格主体使用实际 S 或编号主体框的坐标和描述。外框重叠判断采用 F 外接矩形，只有 S 跨框时另写清其与背景的前后关系。
- description 是共用整页画面描述；slotNotes 只使用该格实际槽位键，F 存整格描述。LLM 模式把描述作为内容分配参考；直接模式可将已填描述编译为画面内容。描述本身不作为图上印字。
- 同类内框可使用 S、S_2、TL、TL_2 等独立键，各自保存坐标、描述与轮廓。编号不表示读序、层级或新增人物；按完整清单引用。槽位按需选用，空区域不补占位 item。
- 新增分格只有 F；需要的内框单独添加。已有版式保存、重载时保留原槽位，不自动补回删除项。

## 可选的手填模式

参考图反推仍可交付上述版式和独立内容 JSON。用户要在编辑器直接填写时，版式根对象可增加 `promptMode:"manual"`，并填写共用 `description`（整页描述）；每格的 `slotContents` 按实际槽位键保存内容数组。每项含 `label`（object/character/text）和字符串 `caption`，文字项另填准确 `text`，可选 `textType` 为 dialogue/narration/sfx。空白条目仅为草稿；两种模式共用各框 slotNotes，结构化人物和准确台词仍分别保存。

节点选择 manual 模式时从这些字段生成内容，不使用输入框中的旧 LLM 内容。llm 模式兼容普通整页描述、Layout JSON，或含单个 JSON 代码块的完整回复。代码块外说明不进入生图，多个代码块会报错；参考图任务若需逐项定位，继续使用带 panel/slot 的 JSON。

## 内容对象

根对象含非空 `summary.caption` 和非空 items，可选 layout；summary.canvas 单格为 single，多格为 multi_panel。

每个 item 含整数 panel、实际 slot、label、非空 caption。label 为 object/character/text；text 项另含非空 text，同人 character 的 tags 可含身份标签。

不手写 bbox。节点将坐标回填为 `abs_centralized / yxyx`，移除 panel/slot 并注入整页格数、读序和层级说明；输入 layout 不覆盖节点选择。

同一矩形字区多条文字按数组顺序上下分区；非矩形字区多泡需独立选区。节点不自动识别人脸，避脸必须在构图和字区安排时考虑。

## 工作流快照

复制安装目录 `examples/单节点编译检查.json` 的已知普通工作流，再替换内容、ID 和完整快照。核对当前 node definition，不把 API 请求包装当普通 UI 工作流。

当前 MossMangaLayout 的 widgets_values 顺序为：内容字符串、layout_id、完整 layout_snapshot JSON 字符串。旧 bleed 和 library_mode 已退出新节点控件；生成工作流前仍应核对当前 node definition，勿从旧快照猜控件数量。

LLM 与直接提示词模式共用一个版式库，每套版式一个 JSON，index.json 记录顺序与文件名。旧双库首次读取时合并，同 ID 不同内容保留为带后缀的另一条；工作流继续使用完整快照，不依赖库中文件名。

输出 layout_prompt、width、height 接文本编码器 text 与潜空间尺寸。旧工作流从快照还原，公共库之后改名、删除或改几何都不自动覆盖它。
