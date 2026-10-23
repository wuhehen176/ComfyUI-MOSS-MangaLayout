# 节点数据契约

适配 `ComfyUI-MOSS-MangaLayout`，不直接套其他漫画 skill 的双语输出、自由 bbox 或 comic_panel schema。

## 版式对象

```json
{
  "id": "reference_page",
  "label": "参考图版式",
  "usage": "整页用途",
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
- 当前节点宽高校验为 64～8192 的偶数，另需满足所接潜空间的要求。
- slots 外接框为 `[top,left,bottom,right]`，原点在画布中心。原图点先按目标宽高缩放，再减目标半宽／半高。
- 可选 shapes 的键必须是实际槽位，值为顺时针四个 `[x,y]` 中心像素点，不能与 yxyx 混用。
- S 等内容槽可在画布内超出所属 F；跨格示例用这种方式。内容槽不另计格，遮挡仍靠描述而非硬蒙版。
- 外框重叠时 layer 影响遮挡，不替代读序。当前编辑器没有专用可配置 X 槽；编译器保留的 legacy X 扩框能力不是可视化控件，本流程优先编辑实际 S、E 等区域。
- slotNotes 只使用该格实际槽位键，F 存整格用途。用途跟随库和快照，不直接进入编译后的正向 JSON。

## 内容对象

根对象含非空 `summary.caption` 和非空 items，可选 layout；summary.canvas 单格为 single，多格为 multi_panel。

每个 item 含整数 panel、实际 slot、label、非空 caption。label 为 object/character/text；text 项另含非空 text，同人 character 的 tags 可含身份标签。

不手写 bbox。节点将坐标回填为 `abs_centralized / yxyx`，移除 panel/slot 并注入整页格数、读序和层级说明；输入 layout 不覆盖节点选择。

同一矩形字区多条文字按数组顺序上下分区；非矩形字区多泡需独立选区。节点不自动识别人脸，避脸必须在构图和字区安排时考虑。

## 工作流快照

复制安装目录 `examples/单节点编译检查.json` 的已知普通工作流，再替换内容、ID 和完整快照。核对当前 node definition，不把 API 请求包装当普通 UI 工作流。

当前 MossMangaLayout 的 widgets_values 顺序为：内容 JSON 字符串、layout_id、完整 layout_snapshot JSON 字符串、bleed 数值。

输出 layout_prompt、width、height 接文本编码器 text 与潜空间尺寸。旧工作流从快照还原，公共库之后改名、删除或改几何都不自动覆盖它。
