---
topic: DeepSeek V4 Flash 正式版总览（0731）
slug: v4-flash-overview
category: research
updated: 2026-08-01
status: written
sources:
  - https://api-docs.deepseek.com/updates/
  - https://api-docs.deepseek.com/quick_start/pricing/
  - https://api-docs.deepseek.com/news/news260424/
  - https://api-docs.deepseek.com/quick_start/agent_integrations/codex
  - https://api-docs.deepseek.com/guides/coding_agents/
  - https://api-docs.deepseek.com/guides/thinking_mode/
  - https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731
  - https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash
  - https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-DSpark
  - https://openrouter.ai/deepseek
  - https://openrouter.ai/deepseek/deepseek-v4-flash
  - https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash
  - https://unsloth.ai/docs/models/deepseek-v4
  - https://github.com/BerriAI/litellm/issues/27439
  - https://docs.openclaw.ai/providers/deepseek
  - https://ollama.com/library/deepseek-v4-flash
  - https://www.reddit.com/r/LocalLLaMA/comments/1vbidkp/deepseekv4flash_has_been_updated_the_official/
  - https://www.reddit.com/r/LocalLLaMA/comments/1vbp7kb/deepseekaideepseekv4flash0731_on_huggingface/
  - https://www.reddit.com/r/DeepSeek/comments/1vbj0aa/deepseekv4flash_update/
  - https://www.techtimes.com/articles/322513/20260731/deepseek-retrained-v4-flash-beats-its-flagship-pro-nine-agent-benchmarks.htm
  - https://www.techtimes.com/articles/319236/20260628/deepseek-releases-dspark-speculative-decoding-makes-v4-85-percent-faster.htm
  - https://www.marktechpost.com/2026/07/31/deepseek-upgrades-deepseek-v4-flash-0731-with-major-agentic-and-coding-gains/
  - https://www.marktechpost.com/2026/06/27/deepseek-releases-dspark-a-speculative-decoding-framework-that-accelerates-deepseek-v4-per-user-generation-60-85-over-mtp-1/
  - https://arxiv.org/abs/2607.05147
  - https://venturebeat.com/orchestration/deepseek-open-sources-dspark-a-new-framework-to-speed-up-llm-inference-by-up-to-85
  - https://www.deeplearning.ai/the-batch/deepseeks-dspark-gains-velocity
  - https://www.digitalapplied.com/blog/deepseek-v4-flash-0731-official-release-agent-benchmarks
  - https://www.orcarouter.ai/blog/deepseek-v4-flash-official-release
  - https://www.igeekphone.com/deepseek-launches-official-v4-flash-api-public-preview-confirms-v4-pro-release-coming-soon/
  - https://www.morphllm.com/deepseek-v4
  - https://www.spheron.network/blog/deploy-deepseek-v4-flash-gpu-cloud/
  - https://www.latent.space/p/ainews-deepseek-v4-pro-16t-a49b-and
  - https://deepseek.ai/pricing
  - https://felloai.com/deepseek-pricing/
  - https://www.opslyft.com/blog/deepseek-api-pricing-2026
  - https://benchlm.ai/deepseek/api-pricing
  - https://www.cloudzero.com/blog/deepseek-pricing/
  - https://www.framia.converge.ai/page/en-US/news/deepseek-v4-thinking-modes
  - https://x.com/deepseek_ai/status/2047516941074796676
---

# DeepSeek V4 Flash 正式版总览（0731）

## 核心事实（可直接入教程）

- **官方正式版（2026-07-31 上线，public beta）**：DeepSeek API changelog 宣布 DeepSeek-V4-Flash API 进入官方正式发布（public beta），构建号 **DeepSeek-V4-Flash-0731**；调用方式不变，仍设 `model=deepseek-v4-flash` 即自动用最新版 ([api-docs.deepseek.com/updates](https://api-docs.deepseek.com/updates/))
- **正式版 ≠ 新架构**：官方原文「DeepSeek-V4-Flash-0731 keeps the same model architecture and size as DeepSeek-V4-Flash-Preview, and was only re-post-trained」——架构与参数量完全不变（284B total / 13B active、1M context），仅重新跑了后训练（post-training）([api-docs.deepseek.com/updates](https://api-docs.deepseek.com/updates/))
- **升级范围仅限 Flash API**：官方明确「This update only upgrades the DeepSeek-V4-Flash API. The DeepSeek-V4-Pro API and the APP/WEB models are unchanged. The official release of DeepSeek-V4-Pro will follow soon.」（V4-Pro 正式版即将推出）([api-docs.deepseek.com/updates](https://api-docs.deepseek.com/updates/))
- **Agent 能力大幅增强，官方自称全面超越自家 V4-Pro-Preview**：9 个已发布 agent 基准全部胜出，如 Terminal-Bench 2.1 = 82.7（vs V4-Pro-Preview 72.1 / Flash Preview 61.8）、DeepSWE = 54.4（preview 仅 7.3，+645%）、Cybergym = 76.7、NL2Repo = 54.2、Toolathlon verified = 70.3、Agent Last Exam = 25.2、Automation Bench (Public) = 25.1、DSBench-FullStack = 68.7、DSBench-Hard = 59.6（全部为 DeepSeek 自测 vendor figures）([api-docs.deepseek.com/updates](https://api-docs.deepseek.com/updates/)、[techtimes.com](https://www.techtimes.com/articles/322513/20260731/deepseek-retrained-v4-flash-beats-its-flagship-pro-nine-agent-benchmarks.htm))
- **0731 新增两大开发能力**：原生支持 **Responses API 格式**、并针对 **Codex** 做了专门适配（配置见 [codex 文档](https://api-docs.deepseek.com/quick_start/agent_integrations/codex)）([api-docs.deepseek.com/updates](https://api-docs.deepseek.com/updates/))
- **0731 权重已开源（MIT）**：官方仓库 `deepseek-ai/DeepSeek-V4-Flash-0731` 已上线 Hugging Face，model card 明示为官方正式版、取代 preview、并附带 DSpark 投机解码模块（结构与 `DeepSeek-V4-Flash-DSpark` 相同）([huggingface.co](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731)、[marktechpost.com](https://www.marktechpost.com/2026/07/31/deepseek-upgrades-deepseek-v4-flash-0731-with-major-agentic-and-coding-gains/))
- **模型定位（官方 4 月 preview 公告）**：Flash 是「快速、高效、经济」的轻量档，推理能力接近 V4-Pro、简单 Agent 任务与 V4-Pro 持平；V4-Pro 才是旗舰（1.6T/49B），官方称其 Agentic Coding 开源最强、世界知识仅次于 Gemini-3.1-Pro、Math/STEM/Coding 超过所有开源模型 ([api-docs.deepseek.com/news/news260424](https://api-docs.deepseek.com/news/news260424/))
- **价格不变**：正式版沿用 preview 价格 $0.14（input, cache miss）/ $0.28（output）per 1M tokens；cache hit 仅 $0.0028（≈98% 折扣）([api-docs.deepseek.com/quick_start/pricing](https://api-docs.deepseek.com/quick_start/pricing/))

## 规格 / 数据

| 项目 | 值 | 来源 |
|------|-----|------|
| 模型 ID（API slug） | `deepseek-v4-flash`（官方）；OpenRouter 另有 `deepseek/deepseek-v4-flash-0731` | [api-docs](https://api-docs.deepseek.com/quick_start/pricing/)、[openrouter.ai/deepseek](https://openrouter.ai/deepseek) |
| 正式构建号 | DeepSeek-V4-Flash-0731（2026-07-31） | [api-docs/updates](https://api-docs.deepseek.com/updates/) |
| 总参数 / 激活参数 | 284B total / 13B active（MoE） | [HF 0731 model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) |
| HF 仓库显示参数量 | 304B（含 DSpark 草稿模块；基础模型仍是 284B） | [HF 0731 model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731)、[Reddit r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/comments/1vbp7kb/deepseekaideepseekv4flash0731_on_huggingface/) |
| 上下文窗口 | 1M（1,048,576 tokens）；最大输出 384K（393,216） | [api-docs pricing](https://api-docs.deepseek.com/quick_start/pricing/)、[openrouter](https://openrouter.ai/deepseek/deepseek-v4-flash) |
| 输入模态 | 纯文本（text only） | [HF](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash) |
| 精度格式 | FP4 + FP8 Mixed（MoE expert 参数 FP4，其余 FP8）；HF 文件类型含 BF16/F32/F8_E4M3 | [HF 0731 model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731)、[HF preview](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash) |
| 注意力架构 | Hybrid：Compressed Sparse Attention (CSA) + Heavily Compressed Attention (HCA) | [HF preview model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash) |
| 长上下文效率 | 官方称 V4-Pro 在 1M context 下仅需 V3.2 的 27% 单 token 推理 FLOPs、10% KV cache（此数字标注为 Pro 而非 Flash） | [HF preview model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash) |
| 推理 effort 档位（0731） | `reasoning_effort` 支持 `low` / `high` / `max` 三档；preview 文档称 Non-think / Think High / Think Max | [HF 0731 model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731)、[vLLM recipes](https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash)、[unsloth docs](https://unsloth.ai/docs/models/deepseek-v4) |
| 思考模式 | 默认开启 thinking；可用 `thinking: {"type":"enabled"}` 控制；非思考模式关闭 | [api-docs 首页示例](https://api-docs.deepseek.com/)、[unsloth docs](https://unsloth.ai/docs/models/deepseek-v4) |
| effort 归一化（社区工具实测） | `xhigh`→`max`，`low/medium`→`high`（LiteLLM 按 DeepSeek 文档归一化） | [LiteLLM GitHub issue #27439](https://github.com/BerriAI/litellm/issues/27439) |
| 采样参数推荐 | temperature=1.0、top_p=1.0；agentic 场景 top_p=0.95；high/max 档建议 max output ≥384K | [HF 0731 model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731)、[unsloth docs](https://unsloth.ai/docs/models/deepseek-v4) |
| 官方定价（per 1M tokens） | input cache hit $0.0028 / cache miss $0.14 / output $0.28 | [api-docs/quick_start/pricing](https://api-docs.deepseek.com/quick_start/pricing/) |
| V4-Pro 官方定价（对比） | input cache hit $0.003625 / cache miss $0.435 / output $0.87（2026-05-31 起永久降 ~75%，原 $1.74/$0.0145/$3.48） | [api-docs/quick_start/pricing](https://api-docs.deepseek.com/quick_start/pricing/)、[deepseek.ai/pricing](https://deepseek.ai/pricing) |
| 并发上限 | Flash 2,500；Pro 500 | [api-docs/quick_start/pricing](https://api-docs.deepseek.com/quick_start/pricing/) |
| 峰值/谷值定价 | 官方将实施 peak/off-peak 定价：peak 时段 2x 价格（北京时区 UTC+8 每日 9:00–12:00、14:00–18:00），生效日期未定 | [api-docs/quick_start/pricing](https://api-docs.deepseek.com/quick_start/pricing/) |
| 免费额度 | 新账号约 500 万 tokens（≈30 天有效） | [felloai.com](https://felloai.com/deepseek-pricing/)、[opslyft.com](https://www.opslyft.com/blog/deepseek-api-pricing-2026) |
| 权重体积（本地部署） | 原生 FP4/FP8 约 158–167 GB（Reddit 报 167GB 同 DSpark 版）；FP8 全量约 284 GB；BF16 约 568 GB（超出 4×H200） | [lushbinary 转述于 framia](https://framia.converge.ai/page/en-US/news/deepseek-v4-huggingface)、[spheron.network](https://www.spheron.network/blog/deploy-deepseek-v4-flash-gpu-cloud/)、[Reddit r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/comments/1vbp7kb/deepseekaideepseekv4flash0731_on_huggingface/) |
| 部署框架要求 | vLLM ≥ 0.7.0 或 SGLang ≥ 0.4.4；需要 `--tokenizer-mode deepseek_v4` + `--tool-call-parser deepseek_v4` | [clore.ai 转述](https://docs.clore.ai/guides/language-models/deepseek-v4)、[vLLM recipes](https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash) |
| GGUF 量化 | unsloth 提供（0731 GGUF 已建仓）；无损 Q8 (UD-Q8_K_XL) 162 GB、Q4 (UD-Q4_K_XL) ~155 GB；单卡 RTX 4090 可跑社区量化版 | [unsloth HF](https://huggingface.co/unsloth/DeepSeek-V4-Flash-GGUF)、[Reddit r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/comments/1vbp7kb/deepseekaideepseekv4flash0731_on_huggingface/)、[framia](https://framia.converge.ai/page/en-US/news/deepseek-v4-huggingface) |

## 关键差异 / 时间线

- **2026-04-24（preview 首发）**：DeepSeek-V4 家族正式亮相并开源——V4-Pro（1.6T/49B）+ V4-Flash（284B/13B），均 1M context、MIT 权重；同日在 chat.deepseek.com 上线（Expert Mode / Instant Mode），API 支持 OpenAI ChatCompletions 与 Anthropic 双接口 ([api-docs/news260424](https://api-docs.deepseek.com/news/news260424/))。同时宣布 `deepseek-chat` / `deepseek-reasoner` 两个旧别名于 3 个月后退役（2026-07-24），过渡期内分别映射到 V4-Flash 非思考 / 思考模式 ([api-docs/updates](https://api-docs.deepseek.com/updates/))
- **2026-06-27（DSpark 发布）**：DeepSeek 开源 DSpark 投机解码框架（MIT），生产环境 V4-Flash 每用户生成速度比旧 MTP-1 基线快 60–85%、V4-Pro 快 57–78%，不换权重不加硬件 ([techtimes](https://www.techtimes.com/articles/319236/20260628/deepseek-releases-dspark-speculative-decoding-makes-v4-85-percent-faster.htm)、[arxiv 2607.05147](https://arxiv.org/abs/2607.05147))
- **2026-07-24 15:59 UTC**：旧 API 别名 `deepseek-chat`、`deepseek-reasoner` 正式退役，之后调用返回错误；迁移为一行改动：model 参数改为 `deepseek-v4-flash` 或 `deepseek-v4-pro`，base_url/API key 不变 ([api-docs/updates](https://api-docs.deepseek.com/updates/)、[cloudzero.com](https://www.cloudzero.com/blog/deepseek-pricing/))。注意 `deepseek-reasoner` 映射的是 Flash 思考模式而非 Pro（cloudzero 明确提示）
- **2026-07-31（正式版 0731）**：Flash API 进入 public beta；同一架构仅重跑 post-training；新增 Responses API 与 Codex 适配；9 项 agent 基准全面超过 V4-Pro-Preview；V4-Pro API 与 APP/WEB 不变，官方称 V4-Pro 正式版「will follow soon」([api-docs/updates](https://api-docs.deepseek.com/updates/))
- **preview vs 0731 的确切差异（可写进教程的核心点）**：非新模型、非新架构、参数量/上下文/价格全不变；变化 = ①重新后训练（agentic 强化）②原生 Responses API ③Codex 适配 ④发布渠道从 Preview 转 public beta ([api-docs/updates](https://api-docs.deepseek.com/updates/)、[wan27.org](https://wan27.org/blog/deepseek-v4-flash-official-release))
- **值得注意的歧义点**：Digital Applied 7-31 报道称「0731 权重当时尚未出现在 HF」([digitalapplied](https://www.digitalapplied.com/blog/deepseek-v4-flash-0731-official-release-agent-benchmarks))，但 Reddit 同日与 MarkTechPost 均确认 `deepseek-ai/DeepSeek-V4-Flash-0731` 已上线、Unsloth 也在做 GGUF；本次检索已直接抓取到 0731 官方 HF 仓库，权重现已可用。教程写作应以「0731 权重已开源」为准

## 教程素材（写作时直接引用）

**API 接入（base_url / slug / 接口）**
- OpenAI 格式 base_url：`https://api.deepseek.com`；Anthropic 格式：`https://api.deepseek.com/anthropic`；model 设 `deepseek-v4-flash`（正式版）或 `deepseek-v4-pro` ([api-docs/quick_start/pricing](https://api-docs.deepseek.com/quick_start/pricing/))
- 首次调用示例（官方文档，OpenAI SDK）：base_url 用 `https://api.deepseek.com`，请求体带 `"thinking": {"type": "enabled"}` 与 `"reasoning_effort": "high"`；`reasoning_effort` 三档 `low` / `high` / `max` ([api-docs 首页](https://api-docs.deepseek.com/))
- 思考模式下 chain-of-thought 经 `reasoning_content` 字段返回；多轮带 tool call 时必须把上一轮 `reasoning_content` 一起回传，否则后续思考断链；无 tool call 的中间轮可不回传 ([api-docs/guides/thinking_mode](https://api-docs.deepseek.com/guides/thinking_mode/))
- 功能矩阵：JSON Output、Tool Calls、**Responses API（当前仅 Flash 支持，Pro 预计 2026 年 8 月初加入）**、Anthropic API、Chat Prefix Completion（Beta）、FIM Completion（仅非思考模式）([api-docs/quick_start/pricing](https://api-docs.deepseek.com/quick_start/pricing/))

**Codex 接入（0731 的卖点）**
- 官方一键脚本（macOS/Linux）：`bash <(curl -fsSL https://cdn.deepseek.com/api-docs/codex-deepseek-setup-en.sh)`；Windows PowerShell：`irm https://cdn.deepseek.com/api-docs/codex-deepseek-setup-en.ps1 | iex`；脚本写 `~/.codex/models.json`（声明 context window 1,048,576、effort 档 low/high/max、tool 格式等）并改 `~/.codex/config.toml` 加 `[model_providers.deepseek]`，原配置备份到 `~/.codex/backup-deepseek/` ([api-docs/codex](https://api-docs.deepseek.com/quick_start/agent_integrations/codex))
- Codex 全线客户端（CLI、ChatGPT 桌面版、VS Code 扩展）共用同一份配置；当前仅 `deepseek-v4-flash` 支持 Codex，Pro 预计 2026 年 8 月初支持 ([api-docs/codex](https://api-docs.deepseek.com/quick_start/agent_integrations/codex))

**Claude Code / OpenCode / OpenClaw 接入**
- Claude Code（官方推荐环境变量）：`ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic`、`ANTHROPIC_MODEL=deepseek-v4-pro[1m]`、`ANTHROPIC_DEFAULT_OPUS_MODEL=deepseek-v4-pro[1m]`、`ANTHROPIC_DEFAULT_SONNET_MODEL=deepseek-v4-pro[1m]`、`ANTHROPIC_DEFAULT_HAIKU_MODEL=deepseek-v4-flash`、`CLAUDE_CODE_SUBAGENT_MODEL=deepseek-v4-flash`、`CLAUDE_CODE_EFFORT_LEVEL=max`（`[1m]` 后缀 = 1M 上下文变体；用 Flash 扛 Haiku/子代理、Pro 扛主任务可省 80–90% 子代理成本，therouter 估算）([api-docs/guides/coding_agents](https://api-docs.deepseek.com/guides/coding_agents/)、[therouter.ai](https://therouter.ai/news/deepseek-coding-agent-integration-guide-claude-code-opencode/))
- OpenCode：`/connect deepseek` 命令后选模型；建议升级到 ≥ v1.14.24；重度推理任务官方建议用 V4-Pro、高量低价用 V4-Flash ([api-docs/guides/coding_agents](https://api-docs.deepseek.com/guides/coding_agents/))
- OpenClaw：`openclaw onboard --install-daemon` → 选 QuickStart → provider 选 DeepSeek → 输入 API key → 模型填 `deepseek-v4-pro` 或 `deepseek-v4-flash`；OpenClaw 会自动回填 `reasoning_content` 支持多轮工具调用；`/think max` 映射到 `reasoning_effort: max` ([api-docs/guides/coding_agents](https://api-docs.deepseek.com/guides/coding_agents/)、[docs.openclaw.ai/providers/deepseek](https://docs.openclaw.ai/providers/deepseek))
- Ollama：`ollama launch claude --model deepseek-v4-flash:cloud`、`ollama launch opencode --model deepseek-v4-flash:cloud`、`ollama launch openclaw --model deepseek-v4-flash:cloud`（还有 Hermes Agent）([ollama.com/library/deepseek-v4-flash](https://ollama.com/library/deepseek-v4-flash))

**本地部署**
- vLLM 启动示例（官方 0731 model card，4×GB300 节点，开启 DSpark）：`vllm serve deepseek-ai/DeepSeek-V4-Flash-0731 --trust-remote-code --kv-cache-dtype fp8 --block-size 256 --data-parallel-size 4 --enable-expert-parallel --moe-backend deep_gemm_mega_moe --attention-config '{"use_fp4_indexer_cache": true}' --speculative-config '{"method":"dspark","num_speculative_tokens":7,"draft_sample_method":"greedy"}'` ([HF 0731 model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731))
- 该仓库**不带 Jinja chat template**，改用 `encoding/` 目录下的 `encode_messages` / `parse_message_from_completion_text` 工具；用 vLLM `--tokenizer-mode deepseek_v4` 则 OpenAI 兼容端点免脚本可用 ([HF 0731 model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731)、[vLLM recipes](https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash))
- 关闭思考模式（Unsloth）：`--chat-template-kwargs '{"enable_thinking":false}'`；开启 `{"enable_thinking":true}`；Think Max 建议 `--max-model-len >= 393216` ([unsloth.ai/docs/models/deepseek-v4](https://unsloth.ai/docs/models/deepseek-v4)、[vLLM recipes](https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash))
- 硬件（第三方估算）：FP8 全量约 284 GB → 4×H100 SXM5（320 GB）或 4×H200 SXM5（564 GB）；BF16 约 568 GB 超出 4×H200；量化后单张 80GB GPU 可跑 ([spheron.network](https://www.spheron.network/blog/deploy-deepseek-v4-flash-gpu-cloud/)、[clore.ai](https://docs.clore.ai/guides/language-models/deepseek-v4))

**能力定位与对比语境（写作可直接引用）**
- 官方 Flash 定位：快、便宜、Agent 任务为主力；「Reasoning capabilities closely approach V4-Pro」「Performs on par with V4-Pro on simple Agent tasks」([api-docs/news260424](https://api-docs.deepseek.com/news/news260424/))
- 0731 官方模型卡：Flash-0731 在已发布基准上超越 V4-Pro (Preview)，「broadly competitive with the strongest proprietary models available」([HF 0731 model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731))
- 第三方对比数字（全部 vendor-reported，harness 未开源前不可复测）：Terminal-Bench 2.1 82.7 vs GLM-5.2 81.0 / Opus-4.8 85.0；DeepSWE 54.4 vs GLM-5.2 46.2 / Opus-4.8 58.0；Agent Last Exam 25.2 vs GLM-5.2 23.8 / Opus-4.8 25.7；DSBench-FullStack 68.7 vs GLM-5.2 61.8 / Opus-4.8 71.6（完整 9 项表见 [HF 0731 model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731)）
- 同基准 Kimi K3 发布时 Terminal-Bench 2.1 = 76.1（约两周前），Flash-0731 82.7 高于它（developersdigest 对比）([developersdigest.tech](https://www.developersdigest.tech/blog/deepseek-v4-flash-0731-opencode-guide))
- 价格语境：V4-Flash $0.14/$0.28 约为 V4-Pro 输出价（$0.87）的 1/3；官方 cache hit $0.0028 ≈ 98% 折扣；90% 输入走 cache hit 时有效 input 成本约 $0.017/M（-88%）；对比 GPT-5.5（$5/$30）、Claude Sonnet 4.6（$3/$15）约便宜 97–99%（第三方比较）([deepseek.ai/pricing](https://deepseek.ai/pricing)、[costgoat.com](https://costgoat.com/pricing/deepseek-api))
- 独立评测（Artificial Analysis，2026-07-31）：V4 Flash 0731 (Reasoning, Max Effort) AA Intelligence Index = 50，比 4 月旧 Flash（40）+10，比 V4-Pro 非 Max（44）高 6 分，距 GPT-5.6 Luna / GLM-5.2（均 51）差 1 分，距开源第一 Kimi K3（57）差 7 分（详见同主题 benchmark 研究文件 `04-flash-benchmark.md`）([artificialanalysis.ai](https://artificialanalysis.ai/articles/deepseek-v4-flash-0731-scores-50-on-the-artificial-analysis-intelligence-index-10-points-above-previous-deepseek-v4-flash))
- 社区反应（真实用户语境）：r/LocalLLaMA 有人质疑「numbers are good but they have to actually exist outside of a lab」（担心 benchmark maxxing）；r/DeepSeek 用户疑问「多少提升来自 post-training、多少来自还没发布的 DeepSeek Harness」；也有用户实测「deepseek API got smarter」且注意到 V4 Instant 模式变聪明；社区普遍期待 GGUF 权重发布 ([reddit r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/comments/1vbidkp/deepseekv4flash_has_been_updated_the_official/)、[reddit r/DeepSeek](https://www.reddit.com/r/DeepSeek/comments/1vbj0aa/deepseekv4flash_update/))

**DSpark（0731 附带模块，教程加分项）**
- DSpark = Confidence-Scheduled Speculative Decoding with Semi-Autoregressive Generation；2026-06-27 开源（MIT），联合作者含梁文锋（DeepSeek 创始人）与北京大学团队；论文 [arxiv 2607.05147](https://arxiv.org/abs/2607.05147)；训练/评测代码 DeepSpec 一并开源
- 生产数据（DeepSeek 自测）：每用户生成速度 V4-Flash +60–85%、V4-Pro +57–78%（vs MTP-1 基线，吞吐持平）；总吞吐 +51%（Flash，80 tok/s/user 目标）/ +52%（Pro，35 tok/s）；严格目标下 +661%/+406%；离线 draft 接受长度比 Eagle3 +26–31%、比 DFlash +16–18% ([marktechpost 0627](https://www.marktechpost.com/2026/06/27/deepseek-releases-dspark-a-speculative-decoding-framework-that-accelerates-deepseek-v4-per-user-generation-60-85-over-mtp-1/)、[deeplearning.ai](https://www.deeplearning.ai/the-batch/deepseeks-dspark-gains-velocity)、[venturebeat](https://venturebeat.com/orchestration/deepseek-open-sources-dspark-a-new-framework-to-speed-up-llm-inference-by-up-to-85))
- 0731 权重自带 DSpark 模块（HF 仓库显示 304B 参数即因此，非基础模型变大）；vLLM 用 `--speculative-config '{"method":"dspark","num_speculative_tokens":7,"draft_sample_method":"greedy"}'` 开启 ([HF 0731 model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731)、[Reddit](https://www.reddit.com/r/LocalLLaMA/comments/1vbp7kb/deepseekaideepseekv4flash0731_on_huggingface/))

## 来源清单（完整 URL，全部列出）

1. https://api-docs.deepseek.com/updates/ — 官方 changelog（0731 正式版公告原文 + 0424 V4 发布 + 旧别名退役）
2. https://api-docs.deepseek.com/quick_start/pricing/ — 官方模型与定价（base_url、功能矩阵、并发、峰值定价、缓存价格）
3. https://api-docs.deepseek.com/news/news260424/ — V4 preview 官方公告（定位、Expert/Instant Mode、开源声明）
4. https://api-docs.deepseek.com/quick_start/agent_integrations/codex — Codex 官方接入文档（一键脚本、models.json/config.toml）
5. https://api-docs.deepseek.com/guides/coding_agents/ — Claude Code / OpenCode / OpenClaw 官方接入指南（环境变量）
6. https://api-docs.deepseek.com/guides/thinking_mode/ — 思考模式（reasoning_content 多轮规则）
7. https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731 — 0731 官方模型卡（9 项基准表、effort 档、vLLM 命令、DSpark、采样参数、MIT）
8. https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash — preview 模型卡（架构、CSA+HCA、FP4/FP8、三档推理模式、技术报告链接）
9. https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-DSpark — DSpark 附模块模型卡（同 checkpoint + 投机解码模块）
10. https://openrouter.ai/deepseek — OpenRouter 模型清单（V4 Flash 0731 于 7-31 上架、$0.14/$0.28）
11. https://openrouter.ai/deepseek/deepseek-v4-flash — OpenRouter Flash 页（$0.0896/$0.1792 转售价、1.05M context）
12. https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash — vLLM recipe（effort 命名、采样、serving 命令、Think Max 384K）
13. https://unsloth.ai/docs/models/deepseek-v4 — Unsloth 文档（三档模式、enable_thinking、top_p 0.95）
14. https://github.com/BerriAI/litellm/issues/27439 — LiteLLM issue（reasoning_effort 归一化 xhigh→max 等）
15. https://docs.openclaw.ai/providers/deepseek — OpenClaw DeepSeek provider 文档（reasoning_content 回填、/think max）
16. https://ollama.com/library/deepseek-v4-flash — Ollama 模型页（:cloud 启动 Claude Code/OpenCode/OpenClaw/Hermes）
17. https://www.reddit.com/r/LocalLLaMA/comments/1vbidkp/deepseekv4flash_has_been_updated_the_official/ — r/LocalLLaMA 讨论（社区反应、质疑、API 激活）
18. https://www.reddit.com/r/LocalLLaMA/comments/1vbp7kb/deepseekaideepseekv4flash0731_on_huggingface/ — r/LocalLLaMA 讨论（0731 上 HF、304B=DSpark、167GB、unsloth GGUF）
19. https://www.reddit.com/r/DeepSeek/comments/1vbj0aa/deepseekv4flash_update/ — r/DeepSeek 更新帖（仅 Flash API 升级、Harness 疑问）
20. https://www.techtimes.com/articles/322513/20260731/deepseek-retrained-v4-flash-beats-its-flagship-pro-nine-agent-benchmarks.htm — TechTimes（9 项基准全胜、DeepSWE +645%、第三方尚未服务 0731）
21. https://www.techtimes.com/articles/319236/20260628/deepseek-releases-dspark-speculative-decoding-makes-v4-85-percent-faster.htm — TechTimes（DSpark 发布、梁文锋署名、60–85%）
22. https://www.marktechpost.com/2026/07/31/deepseek-upgrades-deepseek-v4-flash-0731-with-major-agentic-and-coding-gains/ — MarkTechPost（0731 上 HF、DSpark 附模块、Responses/Codex）
23. https://www.marktechpost.com/2026/06/27/deepseek-releases-dspark-a-speculative-decoding-framework-that-accelerates-deepseek-v4-per-user-generation-60-85-over-mtp-1/ — MarkTechPost（DSpark 细节、Eagle3/DFlash 对比、DeepSpec）
24. https://arxiv.org/abs/2607.05147 — DSpark 论文
25. https://venturebeat.com/orchestration/deepseek-open-sources-dspark-a-new-framework-to-speed-up-llm-inference-by-up-to-85 — VentureBeat（DSpark 吞吐 51%/52%、661%/406% 语境）
26. https://www.deeplearning.ai/the-batch/deepseeks-dspark-gains-velocity — DeepLearning.AI（DSpark 摘要、MTP-1 历史）
27. https://www.digitalapplied.com/blog/deepseek-v4-flash-0731-official-release-agent-benchmarks — Digital Applied（0731 分析、harness 置疑、2500 并发）
28. https://www.orcarouter.ai/blog/deepseek-v4-flash-official-release — OrcaRouter（0731 解读、0% markup 定价语境）
29. https://www.igeekphone.com/deepseek-launches-official-v4-flash-api-public-preview-confirms-v4-pro-release-coming-soon/ — iGeekPhone（V4-Pro 正式版 coming soon）
30. https://www.morphllm.com/deepseek-v4 — MorphLLM（V4 家族规格/定价、$0.87 Pro 输出）
31. https://www.spheron.network/blog/deploy-deepseek-v4-flash-gpu-cloud/ — Spheron（Flash 部署硬件、FP4/FP8 体积）
32. https://www.latent.space/p/ainews-deepseek-v4-pro-16t-a49b-and — AINews（V3.2 vs V4 价格、base+instruct 双版本、32T tokens、FP4 训练）
33. https://deepseek.ai/pricing — deepseek.ai（V4-Pro 75% 永久降价、cache 数学、V4 无 off-peak 折扣）
34. https://felloai.com/deepseek-pricing/ — FelloAI（5M 免费 tokens、cache 98% 折扣）
35. https://www.opslyft.com/blog/deepseek-api-pricing-2026 — OpsLift（免费 App、5M tokens、Server Busy 限流）
36. https://benchlm.ai/deepseek/api-pricing — BenchLM（别名退役时间、无 Batch 折扣档）
37. https://www.cloudzero.com/blog/deepseek-pricing/ — CloudZero（别名 7-24 15:59 UTC 退役、deepseek-reasoner 映射 Flash 而非 Pro）
38. https://www.framia.converge.ai/page/en-US/news/deepseek-v4-thinking-modes — Framia（三档推理模式详解、Flash Max Codeforces 3052）
39. https://x.com/deepseek_ai/status/2047516941074796676 — DeepSeek 官方 X（V4 与 Claude Code/OpenClaw/OpenCode 集成声明）
40. https://www.developersdigest.tech/blog/deepseek-v4-flash-0731-opencode-guide — DevelopersDigest（Terminal-Bench vs Kimi K3、价格语境）
41. https://wan27.org/blog/deepseek-v4-flash-official-release — wan27（0731 发布解读、别名退役、surge pricing 未生效）
42. https://www.therouter.ai/news/deepseek-coding-agent-integration-guide-claude-code-opencode/ — TheRouter（Claude Code/OpenCode/OpenClaw 配置、子代理成本 80-90%）
43. https://www.framia.converge.ai/page/en-US/news/deepseek-v4-huggingface — Framia（HF 下载指南、MIT、单卡 4090 可跑量化版）
44. https://docs.clore.ai/guides/language-models/deepseek-v4 — Clore（vLLM/SGLang 版本要求、量化部署）
45. https://www.costgoat.com/pricing/deepseek-api — CostGoat（价格对比 GPT-5.5/Sonnet 4.6、双接口格式）
46. https://www.deepinfra.com/deepseek-ai/DeepSeek-V4-Flash — DeepInfra demo（Flash 效率定位）
47. https://arxiv.org/abs/2606.19348 — V4 技术报告（HF 模型卡引用；标题 "DeepSeek-V4: Towards Highly Efficient Million-Token Context Intelligence"）※仅经 HF 引用，未直接抓取正文
