# 连接使用者的 ComfyUI

仅在需要编译、导入库或实际生图时读取。本文对应配套 `ComfyUI-MOSS-MangaLayout` 接口；版本不同先检查实际源码或服务定义。

## 环境信息

从当前任务、项目配置或使用者获取以下值；只询问当前操作确实缺少的信息。不沿用案例作者的路径、端口、模型或节点编号。

| 信息 | 使用场景 |
| --- | --- |
| 节点目录：含 `layout.py` 的安装目录 | 离线编译 |
| Python 可执行程序 | 编译辅助脚本，Python 3.10+ |
| ComfyUI 服务根 URL | 导入共享库、实际生图，不预设端口 |
| 已有 MOSS 工作流 | 实际生图，优先 API 格式；普通 UI JSON 按当前节点定义转换 |
| 输出目录 | 保存版式、内容、编译结果、快照和测试记录 |

不把 API 密钥、服务配置或模型文件打包进 skill。凭证通过使用者现有环境提供，不输出到交付记录。

## 离线编译

脚本只依赖 Python 标准库和配套节点的 `layout.py`，无需启动 ComfyUI。将大写占位符替换为真实路径；`python` 可替换为指定 Python 程序。

```text
python "SKILL_DIR/scripts/compile_template.py" --node-dir "NODE_DIR" --layout "OUTPUT_DIR/layout.json" --prompt "OUTPUT_DIR/prompt.json" --output "OUTPUT_DIR/compiled.json"
```

编译通过不等于模型严格遵守区域；节点输出文本布局约束，不是硬裁切蒙版或姿态 ControlNet。

## 共享版式库

- `GET <BASE_URL>/moss_manga_layout/library`：读取两种编辑模式共用的版式库，保存完整响应作备份。旧查询参数 `mode=llm` 和 `mode=manual` 仍接受，但都访问同一个库。
- 当前版本响应含 `layouts` 和 `revision`。向 `POST <BASE_URL>/moss_manga_layout/library` 提交合并后的完整列表及原 revision，只新增或修改授权条目并保留其他条目。两种模式共用同一套 ID 与 revision；手填模式由版式的 `promptMode:"manual"` 指定。
- HTTP 409 时重新读取、合并并检查冲突，不覆盖另一端的新修改。
- `POST <BASE_URL>/moss_manga_layout/format`：传完整版式，生成面向 LLM 的字段格式说明；“一键复制说明”在前端追加当前快照的框用途。
- `POST <BASE_URL>/moss_manga_layout/manual`：传 `{"layout":完整版式}`，返回已编译手填提示词的 text；这里只做编译，不排队采样。

创建文件不代表已经导入库。添加模板不授权清空库；不通过改初始模板覆盖运行中的共享库。

## 将节点接入真实生成链路

1. 检查指定服务的 `/object_info/MossMangaLayout`、`/queue` 和当前工作流。服务不可用时保留离线文件，说明尚未生图。
2. 动态定位正向文本编码器、潜空间尺寸和保存图像分支，不写死节点 ID。普通 UI JSON 的连线与控件序列不同于 API graph，不能直接互换或丢弃关联的控件数据。
3. 当前节点输入为 `layout_json`、`layout_id` 和可选 `layout_snapshot`；快照包含完整版式，`promptMode` 决定使用 LLM 输入还是已保存的手填内容。旧 `bleed`、`library_mode` 只为历史调用保留兼容，不加入新工作流控件。输出 0 `layout_prompt` 接正向文本，输出 1/2 `width`/`height` 接潜空间尺寸。按当前 `/object_info` 核对类型。
4. 复用模型、编码器、VAE、采样器和必要适配器。只处理当前任务中的明确冲突，记录本次请求差异，不改写原工作流。确保版式节点确实连入最终保存分支。
5. 用户要求试跑时通过 `/prompt` 提交 API graph，保存返回的 `prompt_id`，查询 `/history/<prompt_id>`。中断后先查询已存 ID，避免重复排队；不取消别人的任务。
6. 从 history 获取输出文件并查看实际图像，可用 `/view` 或使用者允许的输出目录。未查看图片时只报告执行状态，不宣称分格或人体已通过验收。

远程服务与 agent 不在同一机器时，通过 HTTP 获取结果，不假定两端文件路径相同。没有连通性或运行工具时，交付文件与手动连接步骤。
