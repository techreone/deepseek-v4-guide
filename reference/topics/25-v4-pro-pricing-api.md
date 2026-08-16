---
topic: DeepSeek-V4-Pro-0813 定价、评测与 API 细节
slug: v4-pro-pricing-api
category: release
updated: 2026-08-16
status: research
sources:
  - https://api-docs.deepseek.com/quick_start/pricing/
  - https://api-docs.deepseek.com/news/news260813/
  - https://api-docs.deepseek.com/quick_start/first_api_call/
  - https://api-docs.deepseek.com/quick_start/agent_integrations/codex/
  - https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813
  - https://www.mindstudio.ai/blog/deepseek-v4-pro-0813-benchmark-review
  - https://explainx.ai/blog/deepseek-v4-pro-0813-terminal-bench-cline-august-2026
  - https://rohitai.com/blog/deepseek-v4-pro-0813-ga-benchmarks-pricing
  - https://www.reddit.com/r/LocalLLaMA/comments/1vmi0fg/deepseek_v4pro0813_benchmarks/
---

# DeepSeek-V4-Pro-0813：定价、评测与 API 细节（2026-08-16 调研）

## 一、定价（官方 pricing 页，2026-08-16 抓取）

### 旧价（8/16 16:00 UTC 前，flat rate）

| 模型 | 1M input（cache hit） | 1M input（cache miss） | 1M output |
|---|---|---|---|
| deepseek-v4-flash | $0.0028 | $0.14 | $0.28 |
| deepseek-v4-pro | $0.003625 | $0.435 | $0.87 |

### 新价（peak / off-peak，2026-08-16 16:00 UTC 生效）

- **Peak hours**：01:00-04:00 与 06:00-10:00 UTC（其余全为 off-peak）
- off-peak = **新 peak 价的一半**（explainx 明确：不是今天价的一半）

| 模型 | 时段 | 1M input（cache hit） | 1M input（cache miss） | 1M output |
|---|---|---|---|---|
| flash | OFF-PEAK | $0.007 | $0.22 | $0.66 |
| flash | PEAK | $0.014 | $0.44 | $1.32 |
| pro | OFF-PEAK | $0.022 | $0.66 | $1.98 |
| pro | PEAK | $0.044 | $1.32 | $3.96 |

### 涨价幅度核算（相对旧价）

- pro output：$0.87 → off-peak $1.98（**+127.6%**）/ peak $3.96（**+355%**）
- pro input cache miss：$0.435 → off-peak $0.66（+51.7%）/ peak $1.32（+203%）
- pro input **cache hit**：$0.003625 → off-peak $0.022（+507%）/ peak $0.044（**+1114%**）
- flash output：$0.28 → off-peak $0.66（+135.7%）/ peak $1.32（+371%）
- **"涨价 1100%"传闻核实**：Facebook 标题的 "1,100% Price Hike" 特指 pro 的 **cache-hit 输入价在 peak 时段**（+1114%），最极端场景；常规 output 涨幅为 128%-355%。媒体标题夸大，正文需区分。

### 其他官方细节

- 计费 = tokens × 单价，先用 granted balance
- Concurrency：flash 2500 / pro 500（见 Rate Limit & Isolation）
- 缓存命中价适用于 context caching

## 二、0813 GA 评测（官方 HF 模型卡 + 独立评测）

### 官方 benchmark（DeepSeek-V4-Pro-0813，2026-08-13 发布）

| Benchmark | V4 Pro 0813 | Flash-0731 | V4 Pro Preview | GLM-5.2 | Kimi K3 | Opus-4.8 | Fable-5 |
|---|---|---|---|---|---|---|---|
| HLE (wo/w tools) | 42.7 / 60.0 | 37.8 / 51.5 | 37.7 / 48.2 | 34.8 / 45.1 | 40.5 / 54.7 | 43.5 / 56.0 | 49.8 / 57.9 |
| **Terminal Bench 2.1** | **87.9** | 82.7 | 72.1 | 61.8 | 81.0 | 88.3 | 85.0 |
| NL2Repo | 61.5 | 54.2 | 38.5 | 39.4 | 48.9 | - | 69.7 |
| Cybergym | **83.3** | 76.7 | 52.7 | 38.7 | - | 80.0 | 78.3 |
| DeepSWE | 62.7 | 54.4 | 12.8 | 7.3 | 46.2 | 67.5 | 58.0 |
| Toolathlon-Verified | 74.1 | 70.3 | 55.9 | 49.7 | 59.9 | 76.5 | 76.2 |
| Agents' Last Exam | 25.7 | 25.2 | 16.5 | 15.8 | 23.8 | 27.6 | 25.7 |
| AutomationBench (Public) | **31.8** | 25.1 | 12.8 | 10.8 | 12.9 | 30.8 | 27.2 |
| DSBench-FullStack† | 71.1 | 68.7 | 41.8 | 37.0 | 61.8 | 73.7 | 71.6 |
| DSBench-Hard† | 67.2 | 59.6 | 31.1 | 25.8 | 54.5 | 63.0 | 71.7 |

- † DSBench 为内部测试集
- **评测配置**（官方注明）：code-agent 任务用 **DeepSeek Harness minimal mode** 作为 agent 框架，**max reasoning effort**，temperature=1.0，top_p=0.95——即官方 agent 分数 = Harness + V4 Pro 的组合成绩
- 亮点：TB2.1 87.9（逼近 Kimi K3 88.3 / Fable-5 88）；**Cybergym 83.3 全场第一**；**AutomationBench 31.8 全场第一**；相对 preview（TB2.1 72.1）**+15.8 分**

### 独立评测（mindstudio，2026-08-13）

- 8 题编码/推理独立评测：**61/80（76.25%）**，与 Muse Spark 1.2 并列，略低于 Kimi K3 和 Opus 5；**preview 仅 24.8%** → 单版本最大跃迁之一
- 实测发现：**过度思考简单问题**、过度重写代码（比任务需要的多）；前端生成/任务规划/澄清问题能力强；"有时小兄弟 V4 Flash 更适合日常"

## 三、API 细节

### 调用参数（官方 First API Call）

- base_url（OpenAI 格式）：https://api.deepseek.com；Anthropic 格式：https://api.deepseek.com/anthropic
- model：deepseek-v4-pro（调用方式不变，指向最新 0813）
- **thinking**：`"thinking": {"type": "enabled"}`（默认 thinking 模式，可切 non-thinking，见 Thinking Mode 文档）
- **reasoning_effort**：`"reasoning_effort": "high"`（低/高/最大 = low/high/max）
- FIM / Chat Prefix Completion 仅 non-thinking 模式

### reasoning effort（官方模型卡 + Codex models.json 确认）

- 三档：**low**（快、浅推理）/ **high**（复杂问题深度推理，默认）/ **max**（最难问题最大深度）
- Codex models.json 中 default_reasoning_level = high
- 官方公告：low 用于简单任务，high 用于日常 Agent 工作流，max 用于复杂任务

### Responses API（官方 Codex 集成文档）

- DeepSeek API **原生支持 OpenAI Responses API**（Codex 通过 Responses API 对话）
- 所有 Codex 客户端（CLI / ChatGPT desktop / VS Code IDE 扩展）共享同一配置文件，配一次全通
- **一键配置脚本**（推荐）：macOS/Linux `bash <(curl -fsSL https://cdn.deepseek.com/api-docs/codex-deepseek-setup-en.sh)`；Windows PowerShell `irm https://cdn.deepseek.com/api-docs/codex-deepseek-setup-en.ps1 | iex`
- 脚本动作：备份 ~/.codex/config.toml → 写 ~/.codex/models.json（flash+pro 元数据：context_window 1048576、reasoning_levels low/high/max、tool 格式等）→ 改 config.toml 加 [model_providers.deepseek] → 校验 → 可随时重跑换模型/还原
- 手动方式：手写 models.json + config.toml 的 model_providers.deepseek 段
- 时间线注意：8/6 时（GA 前）仅 flash 支持 Responses/Codex，pro 会报错（X @xiangxiang103）；**8/13 GA 后 pro 原生支持**

### Expert Mode

- V4 Pro 在 **app / web 通过 "Expert Mode" 使用**（官方公告 + Binance/36氪 报道）
- 桌面端模型菜单可见 V4 Pro（选它即 Expert Mode 跑 V4-Pro）

### 本地部署（HF 模型卡）

- 无 Jinja chat template：提供 encoding 文件夹（Python 脚本演示 OpenAI 兼容格式编码）
- vLLM 部署：DSpark speculative decoding 单 flag 开启（--speculative-config '{"method":"dspark",...}'），4×GB300 单节点示例
- 权重 MIT，官方自托管可行

## 四、适合做独立页面的主题建议

1. **deepseek v4 pro pricing**（新峰谷定价 + 涨价解读，重点数据页）
2. **deepseek v4 pro benchmarks**（0813 官方 + 独立评测全表，Harness minimal mode 说明）
3. **deepseek v4 pro responses api / codex setup**（一键脚本 + models.json 教程，Codex 用户刚需）
4. **deepseek v4 pro reasoning effort**（low/high/max 三档选择指南，配 API 参数示例）
5. **deepseek v4 pro review**（mindstudio 实测：过度思考/前端强/与 flash 的日常选择）
6. **deepseek v4 pro 0813**（版本说明 + vs preview 变化）
7. **deepseek v4 pro expert mode**（app/web 用法）
8. **deepseek v4 pro context caching**（缓存价 8/16 后 peak +507%~+1114%，对缓存策略影响大）
