---
topic: Hermes 最佳搭配：DeepSeek V4 Flash 0731 + MiMo V2.5（识图）
slug: hermes-deepseek-mimo
category: research
updated: 2026-08-01
status: written
sources:
  - https://api-docs.deepseek.com/quick_start/agent_integrations/hermes/
  - https://hermes-agent.nousresearch.com/docs/
  - https://hermes-agent.nousresearch.com/docs/user-guide/configuration
  - https://hermes-agent.nousresearch.com/docs/user-guide/features/vision
  - https://hermes-agent.nousresearch.com/docs/integrations/providers
  - https://github.com/nousresearch/hermes-agent/
  - https://github.com/NousResearch/hermes-agent/pull/14934
  - https://github.com/NousResearch/hermes-agent/issues/32160
  - https://github.com/NousResearch/hermes-agent/issues/58581
  - https://github.com/NousResearch/hermes-agent/issues/18884
  - https://github.com/NousResearch/hermes-agent/issues/29135
  - https://mimo.xiaomi.com/mimo-v2-5/
  - https://mimo.mi.com/docs/price/pay-as-you-go
  - https://mimo.mi.com/docs/en-US/quick-start/usage-guide/multimodal-understanding/image-understanding
  - https://mimo.mi.com/docs/en-US/integration/hermes-agent
  - https://huggingface.co/XiaomiMiMo/MiMo-V2.5
  - https://openrouter.ai/xiaomi/mimo-v2.5
  - https://openrouter.ai/xiaomi/mimo-v2.5-pro
  - https://www.marktechpost.com/2026/04/22/xiaomi-releases-mimo-v2-5-pro-and-mimo-v2-5-matching-frontier-model-benchmarks-at-significantly-lower-token-cost/
  - https://pricepertoken.com/pricing-page/model/xiaomi-mimo-v2.5
  - https://hermes-agent.ai/how-to/configure-xiaomi-mimo-provider
  - https://saascity.io/blog/xiaomi-mimo-v25-pro-hermes-agent-llm-backbone-2026
  - https://www.reddit.com/r/hermesagent/comments/1uh94sy/deepseekv4flash_free_on_hermes_paid_upgraders/
  - https://www.reddit.com/r/hermesagent/comments/1ur1qiq/i_must_admit_that_deepseek_v4_flash_is_superior/
  - https://www.reddit.com/r/hermesagent/comments/1tn69g2/deepseekv4flash_is_amazing_and_cheap_as_fk/
  - https://www.reddit.com/r/hermesagent/comments/1svhsfg/hermes_deepseek_v4_pro_how_could_i_possible_use/
  - https://www.reddit.com/r/hermesagent/comments/1uiyufx/what_models_you_are_using_with_hermes/
  - https://openclawlaunch.com/guides/hermes-agent-deepseek
  - https://www.bitdoze.com/best-cheap-models-hermes-agent/
---

# Hermes 最佳搭配：DeepSeek V4 Flash 0731 + MiMo V2.5（识图）

> 主题核心：DeepSeek V4 系列是纯文本模型（无视觉输入）。Hermes（Nous Research 的自学习 agent）内置「主模型 + 辅助模型」双槽位机制（`auxiliary.vision`），把 MiMo V2.5（小米原生全模态模型，定价与 Flash 完全同价）挂到视觉槽位，即可用最便宜的文本主力 + 同价视觉补位组成完整的多模态 agent。注意：视觉要用 **MiMo-V2.5（非 Pro）**——Pro 反而是纯文本（见下方差异）。

## 核心事实（可直接入教程）

- **DeepSeek V4 Flash 是纯文本模型**：发图会被 API 直接拒绝，报错 `unknown variant image_url, expected text`（[Hermes issue #32160](https://github.com/NousResearch/hermes-agent/issues/32160)、[#58581](https://github.com/NousResearch/hermes-agent/issues/58581)）。r/hermesagent 用户实测：「DeepSeek-V4-Flash doesn't support image/vision processing — the model returned a 404 error when I tried to read the photo.」（[r/hermesagent 1tnsdpu](https://www.reddit.com/r/hermesagent/comments/1tnsdpu/hermes_cannot_read_text_from_photo_or_access/)）
- **Hermes 解决方式 = 辅助视觉模型槽位**：Hermes 文档明确规定——当主模型是纯文本模型（DeepSeek 即此类）时，图片自动走 `vision_analyze` 辅助工具，由配置的辅助视觉模型把图描述成文字、注入对话（[Hermes Vision 文档](https://hermes-agent.nousresearch.com/docs/user-guide/features/vision)）。配置写在 `auxiliary.vision` 块。
- **Hermes 对 DeepSeek V4 是原生支持**：官方 DeepSeek 文档有专门的「Integrate with Hermes Agent」页面：`hermes setup` → Quick Setup → 选 DeepSeek → 填 API Key → Base URL `https://api.deepseek.com` → 选 `deepseek-v4-pro`（[api-docs.deepseek.com](https://api-docs.deepseek.com/quick_start/agent_integrations/hermes/)）。模型原生 id `deepseek-v4-flash` / `deepseek-v4-pro` 于 2026-04-24 由 Hermes 合并进 OpenRouter 精选列表、Nous Portal 回退列表与原生 DeepSeek provider 目录（[Hermes PR #14934](https://github.com/NousResearch/hermes-agent/pull/14934)）。
- **MiMo V2.5 = 小米原生全模态模型（omnimodal）**：文本、图像、视频、音频统一架构理解；310B 总参数 / 15B 激活 Sparse MoE，48T tokens 训练，原生 1M 上下文（[mimo.xiaomi.com/mimo-v2-5/](https://mimo.xiaomi.com/mimo-v2-5/)；[HF 模型卡](https://huggingface.co/XiaomiMiMo/MiMo-V2.5)）。
- **MiMo V2.5 官方定价与 DeepSeek V4 Flash 完全同价**：输入（cache miss）$0.14 / 输出 $0.28 / cache hit 输入 $0.0028（每 1M tokens）——和 Flash 的 $0.14/$0.28 一字不差（[mimo.mi.com/docs/price/pay-as-you-go](https://mimo.mi.com/docs/price/pay-as-you-go)）。人民币 ¥1/¥2（cache hit ¥0.02），2026-05-27 官方永久降价对标 DeepSeek（[36kr](https://36kr.com/p/3826964226691972)，本仓库 03-flash-pricing 已有记录）。
- **配搭逻辑（文本主力 + 视觉补位）**：Flash 做 agent 主脑（推理/编码），MiMo V2.5 只做 `vision_analyze` 视觉描述这类辅助任务，两侧单价相同、互不抬高成本。社区印证：「hermes works best when you don't hinge on one model — you can configure ... a 'vision' model」（[r/hermesagent 1tn69g2](https://www.reddit.com/r/hermesagent/comments/1tn69g2/deepseekv4flash_is_amazing_and_cheap_as_fk/)）。
- **MiMo 官方接入 Hermes**：Xiaomi 官方文档确认 MiMo 系列正式支持 Hermes Agent（`hermes config set model.provider custom` / `model.base_url` / `model.api_key` / `model.default mimo-v2.5-pro`，`XIAOMI_API_KEY` + `XIAOMI_BASE_URL` 写入 `~/.hermes/.env`）（[mimo.mi.com/docs/en-US/integration/hermes-agent](https://mimo.mi.com/docs/en-US/integration/hermes-agent)）。社区把 MiMo 当作「稳定可靠、修复 Copilot-ACP 认证问题的首选辅助模型」（[hermes-agent.ai how-to](https://hermes-agent.ai/how-to/configure-xiaomi-mimo-provider)）。

## 规格 / 数据

| 项目 | 值 | 来源 |
|------|-----|------|
| Hermes Agent 是什么 | Nous Research 的自改进 AI agent；唯一带内置学习循环（skills/记忆/用户建模跨会话积累） | [hermes-agent.nousresearch.com/docs/](https://hermes-agent.nousresearch.com/docs/) |
| Hermes GitHub 热度 | ~211K–223K stars、43K forks、MIT license；2025-07-22 建仓；主页 hermes-agent.nousresearch.com | [github.com/nousresearch/hermes-agent/](https://github.com/nousresearch/hermes-agent/) |
| Hermes 安装 | `curl -fsSL https://hermes-agent.nousresearch.com/install.sh \| bash`（Linux/macOS/WSL2/Termux）；Windows PowerShell `iex (irm .../install.ps1)` | [Hermes 官方](https://hermes-agent.nousresearch.com/docs/) |
| Hermes 配置位置 | `~/.hermes/config.yaml`（非密钥）+ `~/.hermes/.env`（密钥） | [Hermes 配置文档](https://hermes-agent.nousresearch.com/docs/user-guide/configuration) |
| Hermes 支持的 provider | 20+：DeepSeek（`DEEPSEEK_API_KEY`，provider `deepseek`）、Xiaomi MiMo（`XIAOMI_API_KEY`，provider `xiaomi`，别名 `mimo`/`xiaomi-mimo`）、OpenRouter、Nous Portal、Anthropic、OpenAI、Ollama、vLLM 等 | [Hermes Providers 文档](https://hermes-agent.nousresearch.com/docs/integrations/providers) |
| Hermes 辅助槽位 | `auxiliary.*`：vision / web_extract / compression / title_generation / approval / triage / profile_describer 等；每槽三个旋钮 provider/model/base_url | [Hermes 配置文档](https://hermes-agent.nousresearch.com/docs/user-guide/configuration) |
| vision 槽默认 | `provider: "auto"` → 路由到主模型；纯文本主模型（DeepSeek）必须显式改配，否则图片分析失败 | [Hermes 配置文档](https://hermes-agent.nousresearch.com/docs/user-guide/configuration) |
| DeepSeek V4 Flash 参数量 | 284B total / 13B active，MoE，MIT；纯文本 | [openrouter.ai](https://openrouter.ai/deepseek/deepseek-v4-flash)；本仓库 07 篇 |
| DeepSeek V4 Flash 0731 | 2026-07-31 官方 public beta 升级（仅重做后训练）；API 继续用 `deepseek-v4-flash` 即访问新版；纯文本不变 | [developersdigest](https://www.developersdigest.tech/blog/deepseek-v4-flash-0731-opencode-guide)；本仓库 07 篇 |
| DeepSeek V4 Flash 官方价 | 输入 $0.14 / 输出 $0.28 / cache hit $0.003（每 1M） | [api-docs.deepseek.com](https://api-docs.deepseek.com/)；本仓库 03 篇 |
| MiMo-V2.5 参数量 | 310B total / 15B active，Sparse MoE；48T tokens 训练 | [HF](https://huggingface.co/XiaomiMiMo/MiMo-V2.5)、[官方](https://mimo.xiaomi.com/mimo-v2-5/) |
| MiMo-V2.5 上下文 | 1M tokens（原生） | [官方](https://mimo.xiaomi.com/mimo-v2-5/) |
| MiMo-V2.5 模态 | 原生全模态：文本/图像/视频/音频（729M ViT 视觉编码器 + 261M 音频编码器） | [HF](https://huggingface.co/XiaomiMiMo/MiMo-V2.5)、[vLLM recipes](https://recipes.vllm.ai/XiaomiMiMo/MiMo-V2.5) |
| MiMo-V2.5 架构细节 | 混合注意力 SWA+GA 5:1、滑动窗口 128；256 routed experts top-8；48 层（1 dense + 47 MoE）；FP8 e4m3 权重 | [vLLM recipes](https://recipes.vllm.ai/XiaomiMiMo/MiMo-V2.5)、[HF](https://huggingface.co/XiaomiMiMo/MiMo-V2.5) |
| MiMo-V2.5 官方价（每 1M） | 输入 cache hit $0.0028 / cache miss $0.14 / 输出 $0.28 —— 与 Flash 同价 | [mimo.mi.com/docs/price/pay-as-you-go](https://mimo.mi.com/docs/price/pay-as-you-go) |
| MiMo-V2.5-Pro 官方价 | $0.0036 / $0.435 / $0.87 —— 与 V4 Pro（$0.435/$0.87）同价 | [mimo.mi.com](https://mimo.mi.com/docs/price/pay-as-you-go) |
| MiMo-V2.5 OpenRouter 价 | 7 家 provider，输入 $0.112–$0.400（GMICloud 最低 $0.112 / 输出 $0.224） | [pricepertoken](https://pricepertoken.com/pricing-page/model/xiaomi-mimo-v2.5)、[OpenRouter](https://openrouter.ai/xiaomi/mimo-v2.5) |
| MiMo-V2.5 基准 | Claw-Eval general 62.3（Pareto frontier）；Video-MME 87.7 vs Gemini 3 Pro 88.4；Claw-Eval Multimodal 平 Claude Sonnet 4.6；MiMo Coding Bench 平 V2.5-Pro 半价 | [官方](https://mimo.xiaomi.com/mimo-v2-5/)、[marktechpost](https://www.marktechpost.com/2026/04/22/xiaomi-releases-mimo-v2-5-pro-and-mimo-v2-5-matching-frontier-model-benchmarks-at-significantly-lower-token-cost/) |
| MiMo-V2.5 API | OpenAI 兼容 `https://api.xiaomimimo.com/v1`；Anthropic 兼容 `https://api.xiaomimimo.com/anthropic`；模型 id `mimo-v2.5` | [官方图像理解文档](https://mimo.mi.com/docs/en-US/quick-start/usage-guide/multimodal-understanding/image-understanding) |
| MiMo-V2.5 图像输入 | 公网 URL 或 Base64（`data:{MIME};base64,...`）；格式 JPEG/PNG/GIF/WebP/BMP；单图 ≤50MB；支持多图；**不支持本地文件上传**（FAQ） | [官方图像理解文档](https://mimo.mi.com/docs/en-US/quick-start/usage-guide/multimodal-understanding/image-understanding) |
| MiMo-V2.5 图像 token 成本 | 约 1 张常见分辨率图 ≈ 1024 image tokens（官方示例：prompt_tokens 1085 中含 image_tokens 1024） | [官方示例响应](https://mimo.mi.com/docs/en-US/quick-start/usage-guide/multimodal-understanding/image-understanding) |
| V2 系列下线 | MiMo-V2-Pro/Omni/Flash 2026-06-01 起自动转发到 V2.5 并按 V2.5 计费；2026-06-30 正式下线，旧名失效 | [mimo.mi.com](https://mimo.mi.com/docs/en-US/integration/hermes-agent) |
| Hermes 官方 DeepSeek 接入 | `hermes setup` 引导（选 DeepSeek / 填 Key / Base URL `https://api.deepseek.com` / 选 deepseek-v4-pro） | [api-docs.deepseek.com](https://api-docs.deepseek.com/quick_start/agent_integrations/hermes/) |

## 关键差异 / 时间线

- **纯文本 vs 全模态（本教程最关键的坑）**：DeepSeek V4 Flash / V4 Pro 都是纯文本；MiMo-V2.5 **非 Pro 版**是全模态（视觉/音频/视频），而 **MiMo-V2.5-Pro 反而是纯文本**。Artificial Analysis 标注 V2.5-Pro「不支持图像输入、非多模态」（[AA](https://artificialanalysis.ai/models/mimo-v2-5-pro)）；Hermes 侧已确认 models.dev 把 `mimo-v2.5-pro` 误标为 `attachment:true`，真实全模态模型是 `mimo-v2.5`（[Hermes issue #18884](https://github.com/NousResearch/hermes-agent/issues/18884)）。→ 教程里「识图模型」必须写 **MiMo-V2.5（非 Pro）**。
- **2026-04-22**：MiMo-V2.5 与 V2.5-Pro 同天发布（[marktechpost](https://www.marktechpost.com/2026/04/22/xiaomi-releases-mimo-v2-5-pro-and-mimo-v2-5-matching-frontier-model-benchmarks-at-significantly-lower-token-cost/)、[pricepertoken](https://pricepertoken.com/pricing-page/model/xiaomi-mimo-v2.5)）。
- **2026-04-24**：DeepSeek V4 预览发布；同天 Hermes 合并 PR #14934，`deepseek-v4-pro` / `deepseek-v4-flash` 进入 Hermes 原生 DeepSeek provider 与 OpenRouter 精选（[PR #14934](https://github.com/NousResearch/hermes-agent/pull/14934)）。
- **2026-05-27**：小米宣布 MiMo-V2.5 系列 API 永久降价（最高 −99%），价格完全对齐 DeepSeek：V2.5 ¥0.02/¥1/¥2、Pro ¥0.025/¥3/¥6（[36kr](https://36kr.com/p/3826964226691972)；本仓库 03 篇已记录）。
- **2026-06-30**：MiMo V2 系列下线；Hermes 用户若还在用 `mimo-v2-pro` 等旧名需迁到 `mimo-v2.5`。
- **2026-07-31**：DeepSeek-V4-Flash-0731 官方发布（public beta，纯文本不变）—— 配对方案里的「主模型」就是这个最新版。
- **生态位**：Xiaomi 官网把 Hermes Agent 与 Claude Code / Codex / OpenClaw / OpenCode / Kilo 并列列为 MiMo 的 agent 生态伙伴（[mimo.mi.com](https://mimo.mi.com/docs/en-US/integration/hermes-agent)）；Hermes 的 Nous Portal fallback 列表里 `xiaomi/mimo-v2.5` 与 `deepseek/deepseek-v4-flash` 同列（[PR #14934 diff](https://github.com/NousResearch/hermes-agent/pull/14934)）。

## 教程素材（写作时直接引用）

**1. 安装 Hermes（官方 DeepSeek 文档步骤）**
```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
hermes setup          # → Quick Setup → 选 DeepSeek → 填 API Key → Base URL https://api.deepseek.com → 选模型
```
（[api-docs.deepseek.com](https://api-docs.deepseek.com/quick_start/agent_integrations/hermes/)；[Hermes 官方](https://hermes-agent.nousresearch.com/docs/)）

**2. 核心配置：主模型 Flash + 视觉槽 MiMo V2.5（本教程的 load-bearing 代码）**
```yaml
# ~/.hermes/.env
DEEPSEEK_API_KEY=sk-...
XIAOMI_API_KEY=sk-...          # 或 OPENROUTER_API_KEY=sk-or-...

# ~/.hermes/config.yaml
model:
  default: deepseek-v4-flash   # 主模型 = 纯文本主力（0731 版，无需改 id）
  provider: deepseek
  base_url: https://api.deepseek.com

auxiliary:
  vision:                      # 视觉槽 = 识图补位
    provider: xiaomi           # 或 openrouter
    model: mimo-v2.5           # 注意：非 Pro 版才是全模态
    # base_url: https://api.xiaomimimo.com/v1   # 需要时显式指定
```
等价 CLI（官方支持）：`hermes config set auxiliary.vision.provider xiaomi` + `hermes config set auxiliary.vision.model mimo-v2.5`；或交互式 `hermes model` → "Configure auxiliary models"（[Hermes 配置文档](https://hermes-agent.nousresearch.com/docs/user-guide/configuration)；bug workaround 示例见 [issue #58581](https://github.com/NousResearch/hermes-agent/issues/58581)）。

**3. MiMo V2.5 图像理解 API 直连写法（可作教程备用/验证段）**
```python
from openai import OpenAI
client = OpenAI(api_key=os.environ["MIMO_API_KEY"], base_url="https://api.xiaomimimo.com/v1")
client.chat.completions.create(
    model="mimo-v2.5",
    messages=[{"role": "user", "content": [
        {"type": "image_url", "image_url": {"url": "https://.../image.png"}},
        {"type": "text", "text": "please describe the content of the image"},
    ]}])
```
（[官方图像理解文档](https://mimo.mi.com/docs/en-US/quick-start/usage-guide/multimodal-understanding/image-understanding)）

**4. 可引用的句子**
- 「MiMo-V2.5 is a native omnimodal model by Xiaomi. It delivers Pro-level agentic performance at roughly half the inference cost, while surpassing MiMo-V2-Omni in multimodal perception across image and video understanding tasks.」（[OpenRouter](https://openrouter.ai/xiaomi/mimo-v2.5)）
- 「With native visual and audio understanding, MiMo-V2.5 reasons seamlessly across modalities ... supports up to 1 million tokens of context.」（[官方发布页](https://mimo.xiaomi.com/mimo-v2-5/)）
- 「On multimodal benchmarks: MiMo-V2.5 achieves a 62.3 on the Claw-Eval general subset, placing it at the Pareto frontier ... nearly tying Gemini 3 Pro on Video-MME (87.7 vs. 88.4).」（[marktechpost](https://www.marktechpost.com/2026/04/22/xiaomi-releases-mimo-v2-5-pro-and-mimo-v2-5-matching-frontier-model-benchmarks-at-significantly-lower-token-cost/)）
- 社区：r/hermesagent 用户推荐「you can use like mimo v2.5 non pro or pro both are very good because they are vision capable models and a similar if not better in some points to dpsk」，并建议直连 API 吃 ~90% cache hit 省钱（[1uh94sy](https://www.reddit.com/r/hermesagent/comments/1uh94sy/deepseekv4flash_free_on_hermes_paid_upgraders/)）。
- 反面：另一用户称「I also tried mimo as i said, but for me less capable in autonomous work!」（[1ur1qiq](https://www.reddit.com/r/hermesagent/comments/1ur1qiq/i_must_admit_that_deepseek_v4_flash_is_superior/)）；有人反映 MiMo「burning tokens like crazy」（[1svhsfg](https://www.reddit.com/r/hermesagent/comments/1svhsfg/hermes_deepseek_v4_pro_how_could_i_possible_use/)）—— 教程应提示视觉 token（约 1024 图 token/张）是额外开销。

**5. 多模型模式是 Hermes 社区共识**
- 「hermes works best when you don't hinge on one model」（[1tn69g2](https://www.reddit.com/r/hermesagent/comments/1tn69g2/deepseekv4flash_is_amazing_and_cheap_as_fk/)）；「Mimo 2.5 Pro all day long. GLM 5.2, deepseek v4 pro, mimo2.5pro ... for great alternatives」+ 主模型后挂 failover chain（[1uiyufx](https://www.reddit.com/r/hermesagent/comments/1uiyufx/what_models_you_are_using_with_hermes/)）；bitdoze 建议「DeepSeek V4 Flash 预算主力 / MiMo V2.5 Pro 或 GLM 5.2 最强 agent / DeepSeek V4 Pro 最低幻觉率」（[bitdoze](https://www.bitdoze.com/best-cheap-models-hermes-agent/)）。

## 来源清单（完整 URL）

1. https://api-docs.deepseek.com/quick_start/agent_integrations/hermes/ — DeepSeek 官方 Hermes 接入文档（安装 + hermes setup 步骤）
2. https://hermes-agent.nousresearch.com/docs/ — Hermes Agent 官方首页/文档（功能、安装、平台矩阵）
3. https://hermes-agent.nousresearch.com/docs/user-guide/configuration — 配置文档（auxiliary 槽位、config.yaml 结构、优先级）
4. https://hermes-agent.nousresearch.com/docs/user-guide/features/vision — 视觉/图片粘贴文档（纯文本主模型的 vision_analyze 路由机制）
5. https://hermes-agent.nousresearch.com/docs/integrations/providers — providers 列表（DeepSeek、Xiaomi MiMo provider: xiaomi）
6. https://github.com/nousresearch/hermes-agent/ — 仓库主页（stars/license/贡献者）
7. https://github.com/NousResearch/hermes-agent/pull/14934 — 添加 deepseek-v4-pro/flash 的 PR（merged 2026-04-24）
8. https://github.com/NousResearch/hermes-agent/issues/32160 — 非视觉主模型的自动视觉回退功能请求（含 DeepSeek 报错机制说明）
9. https://github.com/NousResearch/hermes-agent/issues/58581 — vision_analyze 未走 auxiliary.vision 的 bug + hermes config set workaround
10. https://github.com/NousResearch/hermes-agent/issues/18884 — models.dev 把 mimo-v2.5-pro 误标 attachment:true（证明非 Pro 版才是全模态）
11. https://github.com/NousResearch/hermes-agent/issues/29135 — image_input_mode auto + auxiliary.vision 路由行为（DeepSeek 场景说明）
12. https://mimo.xiaomi.com/mimo-v2-5/ — 小米官方 MiMo-V2.5 发布页（规格、基准、1M 上下文）
13. https://mimo.mi.com/docs/price/pay-as-you-go — 官方 API 定价（$0.0028/$0.14/$0.28 与 ¥0.02/¥1/¥2）
14. https://mimo.mi.com/docs/en-US/quick-start/usage-guide/multimodal-understanding/image-understanding — 官方图像理解文档（URL/Base64 输入、50MB、不支持本地文件、token 规则）
15. https://mimo.mi.com/docs/en-US/integration/hermes-agent — 官方 Hermes 接入文档（XIAOMI_API_KEY / model.provider custom / mimo-v2.5-pro）
16. https://huggingface.co/XiaomiMiMo/MiMo-V2.5 — HF 模型卡（310B/15B、48T、729M ViT、架构细节）
17. https://openrouter.ai/xiaomi/mimo-v2.5 — OpenRouter 页（omnimodal 描述、slug xiaomi/mimo-v2.5）
18. https://openrouter.ai/xiaomi/mimo-v2.5-pro — OpenRouter Pro 页（$0.348/$0.696，旗舰）
19. https://www.marktechpost.com/2026/04/22/xiaomi-releases-mimo-v2-5-pro-and-mimo-v2-5-matching-frontier-model-benchmarks-at-significantly-lower-token-cost/ — 发布报道（基准、定价）
20. https://pricepertoken.com/pricing-page/model/xiaomi-mimo-v2.5 — 跨 provider 定价（$0.112–$0.400）
21. https://hermes-agent.ai/how-to/configure-xiaomi-mimo-provider — 社区 how-to（MiMo 作辅助模型，XIAOMI_API_KEY / XIAOMI_BASE_URL）
22. https://saascity.io/blog/xiaomi-mimo-v25-pro-hermes-agent-llm-backbone-2026 — 第三方评测（V2.5 全模态「half the cost of Pro」、Hermes 兼容确认、cache hit 80-96%）
23. https://www.reddit.com/r/hermesagent/comments/1uh94sy/deepseekv4flash_free_on_hermes_paid_upgraders/ — r/hermesagent（MiMo V2.5 视觉能力 + 省钱建议）
24. https://www.reddit.com/r/hermesagent/comments/1ur1qiq/i_must_admit_that_deepseek_v4_flash_is_superior/ — r/hermesagent（MiMo 自主工作欠佳的反面评价）
25. https://www.reddit.com/r/hermesagent/comments/1tn69g2/deepseekv4flash_is_amazing_and_cheap_as_fk/ — r/hermesagent（218 upvotes，多模型模式共识、配 gemini 视觉）
26. https://www.reddit.com/r/hermesagent/comments/1svhsfg/hermes_deepseek_v4_pro_how_could_i_possible_use/ — r/hermesagent（MiMo 烧 token 反馈）
27. https://www.reddit.com/r/hermesagent/comments/1uiyufx/what_models_you_are_using_with_hermes/ — r/hermesagent（模型搭配讨论：MiMo 2.5 Pro / GLM 5.2 / failover）
28. https://openclawlaunch.com/guides/hermes-agent-deepseek — 第三方指南（Hermes + DeepSeek 配置）
29. https://www.bitdoze.com/best-cheap-models-hermes-agent/ — 第三方清单（Flash/MiMo 价位对比）

## gaps（未核实 / 需后续确认）

- **「DeepSeek V4 Flash 0731 + MiMo V2.5」作为具名组合无官方背书**：DeepSeek 与小米官方各自只写「Hermes 集成」；「主 Flash + 视觉 MiMo V2.5」是 Hermes auxiliary.vision 机制 + 社区实践拼接出的方案，属站长推荐。教程措辞应表述为「社区验证的多模型模式」，而非官方指定组合。
- **Hermes `provider: xiaomi` 槽在 auxiliary.vision 下是否开箱即用未实测**：官方 providers 文档列出 xiaomi provider，但 issue #18884 显示 xiaomi-token-plan-cn 的 models.dev attachment 元数据有 bug；最稳妥路径是走 OpenRouter 的 `xiaomi/mimo-v2.5`。建议教程同时给两种写法，并标注「若 xiaomi 直连报错请改 OpenRouter 路由」。
- **MiMo-V2.5「不支持本地文件上传」与 Hermes vision_analyze 的兼容性**：官方 FAQ 说 mimo-v2.5 不支持本地文件上传（只收 URL/Base64）；Hermes vision_analyze 发送的是 base64 data URL（文档明确支持），理论上兼容，但未见到「Hermes + xiaomi provider 实际跑通识图」的一手截图/教程实例。
- **MiMo-V2.5-Pro 是否全模态存疑**：官方页面将 V2.5 系列整体描述为「原生全模态」，但 AA 与 Hermes issue #18884 均指 Pro 为纯文本。以 AA/Hermes 侧为准（Pro 纯文本），但建议教程加一句免责说明。
- **Reddit 引用为搜索摘要提取**：Reddit 直接抓取被挡，社区引文来自搜索快照，置信度中；引用时尽量用原话短句。
- **saascity 的排名数据（#10/565、#15/283 agentic）为第三方口径**，未在 AA/OpenRouter 独立核对，教程引用时标注为媒体说法。
- **Hermes 版本要求**：官方 DeepSeek 文档与 TencentCloud 教程都提示「需最新版 Hermes 才有完整模型映射」；未核实 DeepSeek V4 / MiMo provider 支持的最低 Hermes 版本号。
