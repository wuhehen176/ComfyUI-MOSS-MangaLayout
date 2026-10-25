# MOSS 漫画完整采样工作流

导入 [MOSS 漫画.json](MOSS%20漫画.json)。此文件保留提供者的原始连线、参数、LoRA 列表和版式快照，未包含模型文件。它是完整采样模板；使用前需选择本机模型并填写画面内容。

## 使用前准备

- 安装本仓库节点及 [ComfyUI LoRA Manager](https://github.com/willmiao/ComfyUI-Lora-Manager)。其余运行节点来自 ComfyUI 核心；需要支持 `moss_image` 编码器和 `EmptyFlux2LatentImage` 的版本。
- 节点 1 选择本机 MOSS SFT 主模型；文件中为 `moss_image_sft_int8_convrot.safetensors`。
- 节点 31 选择配套 Qwen3.5-9B 文本编码器，类型保持 `moss_image`；文件中为 `qwen3.5_9b_int8_convrot.safetensors`。
- 节点 32 选择 FLUX.2 VAE；文件中为 `flux2-vae.safetensors`。节点 21 选择本机加速 LoRA；原文件引用 `moss/moss_image_sft_4_steps_lora_v2_600_avg_rank_72_bf16.safetensors`，目录名称按本机调整。
- 节点 45 保留提供者的风格 LoRA 列表，其中部分已启用；请根据本机文件逐项选择、关闭或替换。列表中的模型并非本节点运行必需。

## 填写及连接

1. 节点 1587 为 **MOSS 漫画版式控制**。原文件的 LLM 输入为空，快照含两格测试版式和占位描述，运行前请编辑成自己的画面。
2. 使用 LLM 模式时，在输入框填写整页普通提示词或按当前 `panel/slot` 清单生成的 Layout JSON；使用直接提示词模式时，在编辑器填写画面描述／台词并保存。
3. 该节点的 `layout_prompt` 已接到节点 42，与节点 40 的质量词拼接，再进入节点 4 正向编码器；不要把节点 40 当成正文输入框。
4. `width`、`height` 已接到节点 1588 潜空间尺寸，当前快照为 **1088×1920**。潜空间控件原本显示的 1024×1024 不生效，以连线输入为准。
5. 运行后经节点 17 解码、节点 18 保存图片。

## 开关联动的原始参数

| 节点 20 | 模型分支 | 步数 | CFG |
| --- | --- | --- | --- |
| 开启（文件默认） | 节点 21 加速 LoRA | 8 | 1 |
| 关闭 | 节点 13 跳层引导，单层 22 | 50 | 3 |

两分支共用 Flow shift 5、Euler、sgm_uniform。原文件节点 21 的实际 LoRA 强度为 **1.0**，但标题／便签写着“DMD latest、0.7”；标题和便签不参与执行，请以控件、连线及所选 LoRA 的适配要求为准。这些参数是提供者的保存配置，不表示所有 MOSS 或加速 LoRA 都适用。

本次加入仓库前检查了 JSON、节点与连线引用、版式编译及尺寸接口，没有重新执行模型采样。示例所需模型与 LoRA 由使用者自行准备。
