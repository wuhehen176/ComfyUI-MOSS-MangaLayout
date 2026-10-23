# MOSS 漫画版式控制

独立 ComfyUI 节点。输入已有的单页 MOSS Layout JSON，按所选版式将 `panel`、`slot` 编译成 MOSS 的中心像素 `yxyx` 坐标。不请求大模型 API，不生成剧情。

## 使用

1. 在 `ComfyUI/custom_nodes/` 中运行以下命令，然后重启 ComfyUI 并刷新浏览器。无需额外 pip 依赖。

   ```text
   git clone https://github.com/wuhehen176/ComfyUI-MOSS-MangaLayout.git
   ```
2. 添加 **MOSS-Image/漫画 → MOSS 漫画版式控制**，通过节点下方的“版式库”下拉框选择。编辑器保存后立即加入下拉列表并选中，无需刷新。下方预览显示外框、格号及字区，面板高度随按钮换行和提示文字调整；这些预览标记不会成为图中文字。
3. 点击“一键复制说明”，将格式转换要求和当前工作流快照的框用途一起交给外部 LLM，再将转换后的 JSON 粘贴到 `layout_json`。其中格式部分只规定字段结构，用途部分补充内容分配参考，不改写原文剧情。
4. `layout_prompt` 接 MOSS 工作流的 **CLIP 文本编码器**的 `text`；`width`、`height` 接潜空间节点对应尺寸。通过右键菜单将尺寸控件转成输入接口。
5. 按原 MOSS 工作流采样。输出 JSON 的 `bbox_coord_space` 为 `abs_centralized`，`bbox_format` 为 `yxyx`。

单独运行本节点也可以检查编译结果，无需模型。它输出 `STRING / INT / INT`，没有 IMAGE 接口。

可直接导入 [单节点编译检查工作流](examples/单节点编译检查.json) 查看界面和输入结构；该示例只运行编译，不采样生图。

## 参考图示例模板

- **阿罗娜·浪潮跨格前景**：[节点工作流](examples/arona/workflow.json)、[版式](examples/arona/layout.json)、[实测图](examples/arona/result.png)。四背景区域与整页跳跃人物，背景为彩色。
- **飞鸟马时·左侧分镜右侧披风跨格**：[节点工作流](examples/toki/workflow.json)、[版式](examples/toki/layout.json)、[实测图](examples/toki/result.png)。脸部、手部、雪景、回应四段镜头，右侧大人物连续跨格。

两套均已写好外框与内框用途，可作为新图的起点。直接导入对应 workflow.json，或在“导入”中选择 layout.json；同名 ID 已在库中时直接选择已有项，不会重复导入。prompt.json 是内容输入，instructions.txt 是给外部 LLM 的格式与用途说明。工作流保存完整快照，修改示例库不会覆盖旧工作流。

实测只证明各自一次结果：阿罗娜的屈膝姿态未精确复现；飞鸟马时的左下格被扩宽、披风变短。几何是提示词约束，不是像素蒙版。

## 输入约定

根对象含 `summary.caption` 和非空 `items` 数组。每个 item 含 `panel`（从 1 起，按编辑器读序编号）、`slot`、`label`、`caption`；`label` 为 `object / character / text`，文字项另含非空 `text`。现有标签、文字等内容保留。

节点选择覆盖输入中的 `layout`。不存在的格号或槽位会报错，不删人物、不删台词、不自动改选字区。坐标由节点回填，原输入的 `bbox` 会被覆盖。允许只描述部分格子；编辑器决定页面外框数量。

同一矩形字区内多条文字按数组顺序上下分配；同一变形字区内多条文字会提示分别选区。同人身份、说话人和文字写法由输入负责，本节点不改写。

## 编辑及保存

- **编辑版式**：拖动分格或内槽位；普通拖角和边中点缩放，**Ctrl＋拖角**变形。C、S、字区等所有已有内框默认全部显示，也可用预览开关统一隐藏。内槽位可以单独移动、删除、确认或取消。读序“提前／延后”和遮挡“上移一层／下移一层”独立。
- **框用途说明**：选外框 F 时说明整格用途，选内框时说明对应槽位用途。输入后保存版式，说明随共享库、导入导出和工作流快照保存；复制、缩放、确认／取消、删除及撤销保留各自正确状态。“一键复制说明”包含当前快照的格号、槽位与用途。留空沿用槽位默认用途；不直接拼入生图 JSON，不作为画面文字。
- **新建**：自选画布尺寸，自行添加分格，也可以从库中复制。所有库条目均可编辑、删除，没有受保护的默认版式。
- **共享库**：保存在 `ComfyUI/user/default/moss_manga_layout/layouts.json`（随 ComfyUI `--user-directory` 改变）。首次初始化为阿罗娜与飞鸟马时两套参考图示例，均可编辑、删除；已有共享库不被覆盖。删除全部后保持空库，不会自动补回。
- **工作流快照**：选中的完整版式随工作流保存。公共库之后修改或删除，旧工作流仍用自己的快照。要更新当前节点，明确点击“采用库中新版”或重新选择。
- **刷新版式库**只更新可选列表，不改当前快照。多个页面同时修改库时，较旧版本保存会被拒绝；刷新后重试。
- **一键复制说明**将格式转换和框用途合并为一次复制，始终使用当前节点快照。节点不连接 LLM API、不新增剧情，旧工作流的快照也不会随共享库里的新用途自动改变。已从库删除的当前快照仍会在下拉框显示其状态，保留使用能力。
- **导入／导出**处理整个版式库 JSON；导入不覆盖同名 ID。恢复默认槽位只作用于当前选中分格，不恢复被删除的库条目。

非矩形和层级会以外接框、轮廓描述、遮挡关系传给 MOSS，属于提示词控制；不执行蒙版裁剪，不能保证每次严格遵循几何边界。

## 开发

Python 编译与持久化仅使用标准库；运行时路由复用 ComfyUI 自带 aiohttp。前端已编译到 `web/`，普通安装无需 Node.js。

```powershell
python -m unittest discover -s tests -v
cd frontend
npm install
node check.mjs
npm run build
```

前端可设置 `MOSS_BUILD_DEPENDENCIES` 指向已有依赖项目的 `package.json`，复用本机依赖进行编译。


## 参考漫画图反推 skill（通用版）

[moss-comic-reference-layout](skills/moss-comic-reference-layout/SKILL.md) 可指导能看图的 agent，从漫画参考图生成可编辑版式、各框用途及内容提示词，也可按要求替换人物和用已有 MOSS 工作流测试。

支持 SKILL.md 的 agent 按各自方式安装整个 `skills/moss-comic-reference-layout` 文件夹；其他 agent 可读取完整文件夹后按说明执行。详见[跨电脑与跨 agent 使用说明](skills/使用说明.md)。skill 不绑定本机路径、端口、模型或工作流节点 ID；实际试跑需要使用者提供自己的环境。

本仓库包含节点源代码、已编译前端、两套普通场景示例和通用 skill。示例只需本节点即可编译；完整采样仍须使用者自己的 MOSS 工作流。验证范围见[验证记录](验证记录.md)，代码来源见[NOTICE](NOTICE.md)。
