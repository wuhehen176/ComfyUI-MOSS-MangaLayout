# ComfyUI-MOSS-MangaLayout

独立 ComfyUI 漫画版式节点：编辑器维护几何与描述，Python 编译 MOSS 原生提示词，不调用 LLM API。

- 当前协议和旧 Skill 文件兼容说明见 README.md；详细反推规则只有 skills/moss-comic-reference-layout/references/layout-rules.md 一份。
- Python 编译入口为 layout.py；文件校验在 layout_schema.py，几何在 geometry.py，复制给 LLM 的说明在 instructions.py。
- 前端 layouts.ts 只负责编辑器协议与校验，不再维护第二套生图编译器。
- 改协议时复用 tests/fixtures/layout-contract.json；几何重叠案例复用 frame-overlap.json。两端分别执行同一份案例。
- 旧 portrait/landscape、工作流快照、公共库版本检查和旧节点参数有兼容用途；移除前核对真实调用者。
- 不提交用户版式库、私人提示词、令牌或本地会话。examples/ 是公开示例，不是用户数据目录。
- 新函数或规则先搜索现有实现。生成的 web/ 不手改；构建修改源码后生成。
- 提交钩子按暂存区检查大小：新源码最多 20 KB，已有超标文件仅能缩小；被拒绝时按职责拆分，不增加例外。
- 新克隆启用钩子：git config core.hooksPath .githooks。
- 验证：python -B scripts/check.py；包含构建：python -B scripts/check.py --build。
- 前端依赖在 frontend/；可用 MOSS_BUILD_DEPENDENCIES 指向已有依赖项目的 package.json。
- 源码检查通过不代表本机已部署；覆盖安装副本、运行真实工作流和推送仓库分别取得授权。
