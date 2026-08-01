---
topic: DeepSeek V4 Flash API 接入
slug: flash-api-guide
category: research
updated: 2026-08-01
status: partial
sources:
  - https://api-docs.deepseek.com/
  - https://api-docs.deepseek.com/updates/
  - https://api-docs.deepseek.com/news/news260424/
  - https://api-docs.deepseek.com/quick_start/pricing/
  - https://api-docs.deepseek.com/quick_start/error_codes/
  - https://api-docs.deepseek.com/quick_start/rate_limit/
  - https://api-docs.deepseek.com/guides/thinking_mode/
  - https://api-docs.deepseek.com/guides/responses_api/
  - https://api-docs.deepseek.com/quick_start/agent_integrations/codex
  - https://platform.deepseek.com/api_keys
  - https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash
  - https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-Base
  - https://openrouter.ai/deepseek/deepseek-v4-flash
  - https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash
  - https://ollama.com/library/deepseek-v4-flash
  - https://build.nvidia.com/deepseek-ai/deepseek-v4-flash
  - https://www.requesty.ai/blog/rate-limits-for-llm-providers-openai-anthropic-and-deepseek
  - https://benchlm.ai/deepseek/api-pricing
  - https://techgenyz.com/deepseek-v4-flash-api/
  - https://github.com/BerriAI/litellm/issues/27439
  - https://unsloth.ai/docs/models/deepseek-v4
  - https://deepseek.ai/pricing
  - https://chat-deep.ai/pricing/
  - https://deepseekai.guide/api/deepseek-api-error-codes/
---

# DeepSeek V4 Flash API 接入

> 研究时间：2026-08-01。本文件为英文教程站点 deepseekv4guide.org 的写作素材。所有事实均带来源；无法核实的内容列在末尾 gaps 区。

## 核心事实（可直接入教程）

- API 完全兼容 OpenAI 格式。调用方式：**base_url 保持 `https://api.deepseek.com` 不变，把 model 设为 `deepseek-v4-flash`** 即可（官方 changelog 原文确认 "Keep base_url, just update model"）([api-docs.deepseek.com/updates](https://api-docs.deepseek.com/updates/)、[api-docs.deepseek.com/news/news260424](https://api-docs.deepseek.com/news/news260424/))。
- `deepseek-v4-flash` 目前指向 **DeepSeek-V4-Flash-0731**（与 Flash-Preview 同架构同尺寸，仅重新后训练；0731 更新仅升级 API 版 V4-Flash，APP/Web 与 V4-Pro 不受影响）([api-docs.deepseek.com/updates](https://api-docs.deepseek.com/updates/))。
- 旧模型名 `deepseek-chat` / `deepseek-reasoner` 于 **2026-07-24 停用**；此前分别路由到 deepseek-v4-flash 的非思考 / 思考模式。新集成一律使用 `deepseek-v4-flash` 或 `deepseek-v4-pro` ([api-docs.deepseek.com/updates](https://api-docs.deepseek.com/updates/)、[deepseek.ai/pricing](https://deepseek.ai/pricing)、[chat-deep.ai/pricing](https://chat-deep.ai/pricing/))。
- **原生支持 OpenAI Responses API 格式**，并为 **Codex** 做了专门适配；V4-Flash API 处于 **public beta** 正式发布状态。V4-Pro 的 Responses API / Codex 支持预计 2026 年 8 月初上线（当前不支持）([api-docs.deepseek.com/updates](https://api-docs.deepseek.com/updates/)、[api-docs.deepseek.com/guides/responses_api](https://api-docs.deepseek.com/guides/responses_api/)、[api-docs.deepseek.com/quick_start/agent_integrations/codex](https://api-docs.deepseek.com/quick_start/agent_integrations/codex))。
- 官方 API Key 创建入口：**platform.deepseek.com/api_keys**；官方 API 文档站：**api-docs.deepseek.com**（Quickstart 首页 + "create an API key first" 指引）([api-docs.deepseek.com/api/deepseek-api](https://api-docs.deepseek.com/updates/)、[platform.deepseek.com/api_keys](https://platform.deepseek.com/api_keys))。
- 模型规模：**284B 总参数 / 13B 激活参数**的 MoE（Mixture-of-Experts）模型，**1M token 上下文**，**最大输出 384K token**（官方 HF 模型卡 + 官方 pricing 页，厂商口径）([huggingface.co/deepseek-ai/DeepSeek-V4-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash)、[api-docs.deepseek.com/quick_start/pricing](https://api-docs.deepseek.com/quick_start/pricing/))。

## 规格 / 数据

| 项目 | 值 | 来源 |
|------|-----|------|
| base_url（OpenAI 格式） | `https://api.deepseek.com` | [api-docs.deepseek.com](https://api-docs.deepseek.com/) |
| base_url（Anthropic 格式） | `https://api.deepseek.com/anthropic` | [api-docs.deepseek.com](https://api-docs.deepseek.com/) |
| model 名 | `deepseek-v4-flash`（另：`deepseek-v4-pro`） | [api-docs.deepseek.com](https://api-docs.deepseek.com/) |
| 当前版本 | DeepSeek-V4-Flash-0731 | [api-docs.deepseek.com/updates](https://api-docs.deepseek.com/updates/) |
| 上下文长度 | 1M（1,048,576 tokens） | [api-docs.deepseek.com/quick_start/pricing](https://api-docs.deepseek.com/quick_start/pricing/) |
| 最大输出 | 384K tokens | [api-docs.deepseek.com/quick_start/pricing](https://api-docs.deepseek.com/quick_start/pricing/) |
| 总 / 激活参数 | 284B / 13B（MoE） | [huggingface.co](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash) |
| 价格：输入 cache miss | $0.14 / 1M tokens | [api-docs.deepseek.com/quick_start/pricing](https://api-docs.deepseek.com/quick_start/pricing/) |
| 价格：输入 cache hit | $0.0028 / 1M tokens | [api-docs.deepseek.com/quick_start/pricing](https://api-docs.deepseek.com/quick_start/pricing/) |
| 价格：输出 | $0.28 / 1M tokens | [api-docs.deepseek.com/quick_start/pricing](https://api-docs.deepseek.com/quick_start/pricing/) |
| 并发上限（账户级） | **2500 并发请求**（V4-Pro 为 500） | [api-docs.deepseek.com/quick_start/rate_limit](https://api-docs.deepseek.com/quick_start/rate_limit/)、[api-docs.deepseek.com/quick_start/pricing](https://api-docs.deepseek.com/quick_start/pricing/) |
| 思考模式 | 支持非思考 / 思考（默认开启）；effort 取值 low/high/max | [api-docs.deepseek.com/quick_start/pricing](https://api-docs.deepseek.com/quick_start/pricing/)、[api-docs.deepseek.com/guides/thinking_mode](https://api-docs.deepseek.com/guides/thinking_mode/) |
| 功能 | JSON Output ✓、Tool Calls ✓、Responses API ✓、Anthropic API ✓、Chat Prefix Completion（Beta）✓、FIM（仅非思考模式）✓ | [api-docs.deepseek.com/quick_start/pricing](https://api-docs.deepseek.com/quick_start/pricing/) |
| OpenRouter 第三方报价 | $0.0896 in / $0.1792 out（第三方，非官方价） | [openrouter.ai/deepseek/deepseek-v4-flash](https://openrouter.ai/deepseek/deepseek-v4-flash) |

### 官方 V4-Flash 代理性能基准（2026-07-31 changelog，厂商口径）
| 基准 | 分数 |
|------|------|
| Terminal Bench 2.1 | 82.7 |
| NL2Repo | 54.2 |
| Cybergym | 76.7 |
| DeepSWE | 54.4 |
| Toolathlon (verified) | 70.3 |
| Agent Last Exam | 25.2 |
| Automation Bench (Public) | 25.1 |
| DSBench-FullStack（内部测试集） | 68.7 |
| DSBench-Hard（内部 Coding Agent 难题集） | 59.6 |

官方说明：公开基准中的 Code Agent 任务使用即将发布的 DeepSeek Harness minimal mode 框架、max effort、top_p=0.95、temperature=1.0 测试；DSBench 两项为内部测试集。来源：[api-docs.deepseek.com/updates](https://api-docs.deepseek.com/updates/)。注意：这些为厂商自测数字，教程中应标注 "vendor-reported"。

## 关键差异 / 时间线

- **2026-04-24**：DeepSeek-V4（Pro/Flash）发布。API 立即支持，base_url 不变，改 model 名即可；支持 OpenAI ChatCompletions 与 Anthropic 双接口。官方宣布 legacy 名 3 个月后（2026-07-24）停用 ([api-docs.deepseek.com/news/news260424](https://api-docs.deepseek.com/news/news260424/)、[api-docs.deepseek.com/updates](https://api-docs.deepseek.com/updates/))。
- **2026-04-26 12:15 UTC**：全部模型 cache-hit 输入价格降至首发价 1/10（Flash cache hit 因此为 $0.0028）([tokenmix.ai/blog/deepseek-cache-hit-pricing](https://tokenmix.ai/blog/deepseek-cache-hit-pricing)、[deepseek.ai/pricing](https://deepseek.ai/pricing))。
- **2026-07-24 15:59 UTC**：`deepseek-chat` / `deepseek-reasoner` 两个 legacy 别名正式停用；此前映射到 Flash 非思考 / 思考模式 ([api-docs.deepseek.com/updates](https://api-docs.deepseek.com/updates/)、[deepseek.ai/pricing](https://deepseek.ai/pricing))。
- **2026-07-31**：DeepSeek-V4-Flash API 进入 public beta 正式发布；原生支持 Responses API、专门适配 Codex；版本更新为 DeepSeek-V4-Flash-0731（架构尺寸不变、仅重新后训练）。官方声明 V4-Pro 正式版 "will follow soon" ([api-docs.deepseek.com/updates](https://api-docs.deepseek.com/updates/))。
- **2026 年 8 月初（预告）**：V4-Pro 预计支持 Responses API / Codex ([api-docs.deepseek.com/guides/responses_api](https://api-docs.deepseek.com/guides/responses_api/)、[api-docs.deepseek.com/quick_start/agent_integrations/codex](https://api-docs.deepseek.com/quick_start/agent_integrations/codex))。
- **峰值/非峰值定价（预告，尚未生效）**：DeepSeek 即将推出 2x 峰值定价，峰值时段为北京时间（UTC+8）每日 9:00–12:00 与 14:00–18:00，适用于所有计费项，生效日期以官方公告为准 ([api-docs.deepseek.com/quick_start/pricing](https://api-docs.deepseek.com/quick_start/pricing/))。
- 思考模式细节（Thinking Mode 指南）：thinking 默认开启；常规请求默认 effort=high；复杂 agent 请求（如 Claude Code、OpenCode）自动设为 max；为兼容性 low/medium 映射到 high、xhigh 映射到 max ([api-docs.deepseek.com/guides/thinking_mode](https://api-docs.deepseek.com/guides/thinking_mode/)、[github.com/BerriAI/litellm/issues/27439](https://github.com/BerriAI/litellm/issues/27439))。

## 教程素材（写作时直接引用）

### 快速开始：官方第一步（curl，Chat Completions 格式）
官方首页示例（model 可用 `deepseek-v4-pro` 或 `deepseek-v4-flash` 替换；`thinking`/`reasoning_effort` 为可选思考参数）([api-docs.deepseek.com](https://api-docs.deepseek.com/))：
```
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${DEEPSEEK_API_KEY}" \
  -d '{
        "model": "deepseek-v4-flash",
        "messages": [
          {"role": "system", "content": "You are a helpful assistant."},
          {"role": "user", "content": "Hello!"}
        ],
        "thinking": {"type": "enabled"},
        "reasoning_effort": "high",
        "stream": false
      }'
```

### 快速开始：Python（OpenAI SDK，官方示例）
```
# pip3 install openai
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get('DEEPSEEK_API_KEY'),
    base_url="https://api.deepseek.com")

response = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[
        {"role": "system", "content": "You are a helpful assistant"},
        {"role": "user", "content": "Hello"},
    ],
    stream=False,
    reasoning_effort="high",
    extra_body={"thinking": {"type": "enabled"}})   # OpenAI SDK 需把 thinking 放进 extra_body
print(response.choices[0].message.content)
```
来源：[api-docs.deepseek.com](https://api-docs.deepseek.com/)、[api-docs.deepseek.com/guides/thinking_mode](https://api-docs.deepseek.com/guides/thinking_mode/)

### 快速开始：Node.js（OpenAI SDK，官方示例）
```
import OpenAI from "openai";

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY,
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "deepseek-v4-flash",
    thinking: {"type": "enabled"},
    reasoning_effort: "high",
    stream: false,
  });
  console.log(completion.choices[0].message.content);
}
main();
```
来源：[api-docs.deepseek.com](https://api-docs.deepseek.com/)

### Responses API（仅 V4-Flash 支持）
官方示例（Python，base_url 相同）([api-docs.deepseek.com/guides/responses_api](https://api-docs.deepseek.com/guides/responses_api/))：
```
from openai import OpenAI
client = OpenAI(api_key="<your DeepSeek API Key>", base_url="https://api.deepseek.com")

response = client.responses.create(
    model="deepseek-v4-flash",
    instructions="You are a helpful assistant.",
    input="Hi, how are you?",
)
print(response.output_text)
```
- 流式：`stream=True`，返回语义化 SSE 事件序列（每条带 `event` 字段与递增的 `sequence_number`），以 `response.completed` / `response.incomplete` / `response.failed` 结束，**没有 `data: [DONE]` 消息**。
- 事件类型列表：`response.created`、`response.in_progress`、`response.output_item.added/done`、`response.content_part.added/done`、`response.reasoning_text.delta/done`（链式思考）、`response.output_text.delta/done`、`response.function_call_arguments.delta/done`、`response.custom_tool_call_input.delta/done`（apply_patch）、`response.web_search_call.*`、`response.completed/incomplete/failed`。
- 兼容性要点：temperature 范围 [0.0, 2.0]（思考模式下无效）、top_p 思考模式无效、top_logprobs 范围 [0,20]、tool_choice 支持 none/auto/required/指定工具。**不支持的参数被静默忽略**（如 previous_response_id、conversation、store（恒为 false）、metadata、background 等），现有 Responses API 客户端可无修改接入。
- 工具：`function` ✓；`web_search` / `web_search_2025_08_26` ✓（服务端执行）；`custom` 仅支持 `{"type":"custom","name":"apply_patch"}`（Codex 兼容用）；`file_search`/`code_interpreter`/`computer_use`/`mcp` 被忽略。
- 输入项：`message`（roles user/assistant/system/developer，developer 按 system 处理）、`function_call`、`function_call_output`、`reasoning`、`web_search_call`；**图片/文件输入不支持**（input_image 被替换为占位文本）。
- 计费字段：`usage.input_tokens`（含 `input_tokens_details.cached_tokens` 缓存命中数）、`usage.output_tokens`（含 `output_tokens_details.reasoning_tokens` 思考 token 数）。

### 集成 Codex（官方一键脚本）
- 前提：已安装并至少启动过一次 Codex CLI 或 ChatGPT 桌面版（确保 `~/.codex` 存在）。
- macOS/Linux：`bash <(curl -fsSL https://cdn.deepseek.com/api-docs/codex-deepseek-setup-en.sh)`
- Windows PowerShell：`irm https://cdn.deepseek.com/api-docs/codex-deepseek-setup-en.ps1 | iex`
- 脚本行为：把 `~/.codex/config.toml` 备份到 `~/.codex/backup-deepseek/`；写入模型目录 `~/.codex/models.json`；向 `config.toml` 添加 `[model_providers.deepseek]` 段（冲突字段会移除并打印原因）；写入前校验语法，校验失败则中止不修改任何文件。首次运行会要求输入 `sk-` 开头的 API Key（在 platform.deepseek.com/api_keys 获取）。
- Codex 官方为 Flash 声明的模型元数据（models.json 关键字段）：`context_window: 1048576`、`max_context_window: 1048576`、`effective_context_window_percent: 95`、`apply_patch_tool_type: "freeform"`、`web_search_tool_type: "text"`、`supports_parallel_tool_calls: true`、`default_reasoning_level: "high"`、支持 reasoning levels low/high/max、`minimal_client_version: "0.144.0"`、display_name "DeepSeek-V4-Flash"、description "Latest frontier agentic coding model."。
- Codex 通过 **Responses API** 与模型通信；当前仅 `deepseek-v4-flash` 支持 Codex，V4-Pro 预计 2026 年 8 月初支持。
来源：[api-docs.deepseek.com/quick_start/agent_integrations/codex](https://api-docs.deepseek.com/quick_start/agent_integrations/codex)、[api-docs.deepseek.com/guides/responses_api](https://api-docs.deepseek.com/guides/responses_api/)

### 思考模式（thinking mode）
- 官方文档：thinking 开关默认开启；默认 effort 为 high；复杂 agent 请求自动升为 max；low/medium 兼容性映射为 high，xhigh 映射为 max ([api-docs.deepseek.com/guides/thinking_mode](https://api-docs.deepseek.com/guides/thinking_mode/))。
- Chat Completions 下思考内容出现在 `reasoning_content` 字段（与 OpenAI o 系列响应形状一致）([developersdigest.tech/blog/deepseek-v4-developer-guide](https://www.developersdigest.tech/blog/deepseek-v4-developer-guide))。
- 多轮时 `reasoning_content` 会被 API 忽略，需照常回传 assistant message ([api-docs.deepseek.com/guides/thinking_mode](https://api-docs.deepseek.com/guides/thinking_mode/))。

### 错误码（官方 Error Codes 页，共 7 个）
| 码 | 含义 | 官方建议 |
|----|------|----------|
| 400 | Invalid Format（请求体格式错误） | 按报错提示修改请求体 |
| 401 | Authentication Fails（API key 错误） | 检查 / 重新创建 API key |
| 402 | Insufficient Balance（余额不足） | 到 Top up 页充值 |
| 422 | Invalid Parameters（参数无效） | 按报错提示修改参数 |
| 429 | Rate Limit Reached（请求过快） | 合理控制请求节奏；官方还建议可临时切换到其他 LLM 供应商 |
| 500 | Server Error | 稍候重试；持续则联系官方 |
| 503 | Server Overloaded（高流量过载） | 稍候重试 |

来源：[api-docs.deepseek.com/quick_start/error_codes](https://api-docs.deepseek.com/quick_start/error_codes/)
补充（第三方梳理）：400/401/402/422 属于"改请求再重试"，429/500/503 属于"限速/退避后重试"；429 用指数退避 + jitter，检查 Retry-After 头；402 表示预付费余额耗尽，浏览器端 chat 可能仍可用 ([chat-deep.ai/docs/deepseek-error-codes](https://chat-deep.ai/docs/deepseek-error-codes/)、[deepseekai.guide/api/deepseek-api-error-codes](https://deepseekai.guide/api/deepseek-api-error-codes/)、[deepseek-usa.ai/docs/deepseek-error-codes](https://deepseek-usa.ai/docs/deepseek-error-codes/))。

### 速率限制（官方 Rate Limit & Isolation 页）
- DeepSeek 的限流是 **并发数（concurrency）制，而非 RPM/TPM 配额制**。账户级并发上限：`deepseek-v4-flash` = **2500**，`deepseek-v4-pro` = **500**；超出返回 HTTP 429。
- 并发按**账户**计算（同账户所有 API key 共享额度）；一个请求从提交到响应完成占用一个并发槽位。
- `user_id` 参数（Chat Completions 的 `user` 字段 / Responses API 的 `user`）可实现业务侧用户级细粒度管理：内容安全隔离、调度隔离、KV Cache 隔离。正则 `[a-zA-Z0-9\-_]+`，最长 512 字符。常规用户所有 user_id 合并计入并发；每个 user_id 也有独立上限（flash 2500 / pro 500），超出返回 429。
- 需要更高并发可提交 capacity expansion 请求，官方称匹配实际业务需求、扩容不额外收费。
- 第三方观察（Requesty）：DeepSeek 不设显式 RPM/TPM 配额，高负载时通过**减慢响应 + keep-alive 信号**（非流式用空行、流式用 `: keep-alive`）而非直接拒绝；单请求 30 分钟超时后服务端断开连接。这与官方 "不拒绝、排队变慢" 的说法一致。
来源：[api-docs.deepseek.com/quick_start/rate_limit](https://api-docs.deepseek.com/quick_start/rate_limit/)、[api-docs.deepseek.com/quick_start/pricing](https://api-docs.deepseek.com/quick_start/pricing/)、[requesty.ai/blog/rate-limits-for-llm-providers-openai-anthropic-and-deepseek](https://www.requesty.ai/blog/rate-limits-for-llm-providers-openai-anthropic-and-deepseek)、[chat-deep.ai/docs/api-rate-limits](https://chat-deep.ai/docs/api-rate-limits/)

### 上下文缓存（成本优化关键）
- 自动、无需配置：重复的 prompt 前缀命中服务端磁盘缓存，命中 token 按 cache-hit 价计费（Flash：$0.0028 vs miss $0.14，约 98% 折扣）。`usage.prompt_cache_hit_tokens` / `prompt_cache_miss_tokens` 字段可观测。缓存是 best-effort，不保证命中率 ([api-docs.deepseek.com/quick_start/pricing](https://api-docs.deepseek.com/quick_start/pricing/)、[deepseekai.guide/api/deepseek-api-context-caching](https://deepseekai.guide/api/deepseek-api-context-caching/)、[devtk.ai/en/blog/deepseek-api-pricing-guide-2026](https://devtk.ai/en/blog/deepseek-api-pricing-guide-2026/))。

### 第三方托管 / 别名（教程中可作"还能在哪用"）
- **OpenRouter**：model 名 `deepseek/deepseek-v4-flash`，OpenAI 兼容，第三方价 $0.0896/$0.1792 per 1M，context 1,048,576、max output 384K；reasoning effort 支持 high 与 xhigh（xhigh 映射 max）([openrouter.ai/deepseek/deepseek-v4-flash](https://openrouter.ai/deepseek/deepseek-v4-flash))。
- **NVIDIA NIM**：base_url `https://integrate.api.nvidia.com/v1`，model `deepseek-ai/deepseek-v4-flash`，max_tokens 16384，思考通过 `extra_body={"chat_template_kwargs":{"thinking":True,"reasoning_effort":"high"}}` ([build.nvidia.com/deepseek-ai/deepseek-v4-flash](https://build.nvidia.com/deepseek-ai/deepseek-v4-flash))。
- **Ollama**：`deepseek-v4-flash:cloud` 标签，支持 opencode/hermes/openclaw/Claude Code 一行启动 ([ollama.com/library/deepseek-v4-flash](https://ollama.com/library/deepseek-v4-flash))。
- **vLLM 本地部署**：model `deepseek-ai/DeepSeek-V4-Flash`；官方推荐 temperature=1.0、top_p=1.0（agentic 场景 top_p=0.95）；Think Max 需 context ≥ 393216（384K）；单卡配置加载 148.66 GiB checkpoint；另有 NVFP4 量化变体 `nvidia/DeepSeek-V4-Flash-NVFP4`（Blackwell 平台，FP4 indexer cache）([recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash](https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash)、[huggingface.co/deepseek-ai/DeepSeek-V4-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash))。

## 来源清单（完整 URL，全部列出）

1. https://api-docs.deepseek.com/ — Your First API Call（官方快速开始：base_url、model、curl/Python/Node 示例）
2. https://api-docs.deepseek.com/updates/ — Change Log（0731 Flash 正式发布 beta、代理基准、legacy 名停用时间线、Responses API 支持声明）
3. https://api-docs.deepseek.com/news/news260424/ — DeepSeek V4 Preview Release（V4 发布公告、base_url 不变说明、Flash 284B/13B）
4. https://api-docs.deepseek.com/quick_start/pricing/ — Models & Pricing（官方价格表、1M/384K、并发上限、峰值定价预告）
5. https://api-docs.deepseek.com/quick_start/error_codes/ — Error Codes（400/401/402/422/429/500/503 官方定义）
6. https://api-docs.deepseek.com/quick_start/rate_limit/ — Rate Limit & Isolation（并发制限流、2500/500、user_id 隔离）
7. https://api-docs.deepseek.com/guides/thinking_mode/ — Thinking Mode（thinking 默认开启、effort 映射）
8. https://api-docs.deepseek.com/guides/responses_api/ — Using the Responses API（仅 flash 支持、事件表、兼容性表、usage 字段）
9. https://api-docs.deepseek.com/quick_start/agent_integrations/codex — Integrate with Codex（一键脚本、models.json 元数据、config.toml 说明）
10. https://platform.deepseek.com/api_keys — 官方 API Key 创建入口
11. https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash — HF 模型卡（284B/13B、1M context、CSA/HCA 注意力、FP4+FP8、三档 effort、Think Max 需 384K context）
12. https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-Base — HF Base 模型（292B params fp8）
13. https://openrouter.ai/deepseek/deepseek-v4-flash — OpenRouter 页（第三方价、context/output 规格、effort 支持）
14. https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash — vLLM Recipes（本地部署参数、NVFP4 变体、148.66 GiB checkpoint）
15. https://ollama.com/library/deepseek-v4-flash — Ollama（deepseek-v4-flash:cloud）
16. https://build.nvidia.com/deepseek-ai/deepseek-v4-flash — NVIDIA NIM 示例代码
17. https://www.requesty.ai/blog/rate-limits-for-llm-providers-openai-anthropic-and-deepseek — Requesty 限流分析（无 RPM/TPM 配额、keep-alive、30 分钟超时）
18. https://benchlm.ai/deepseek/api-pricing — BenchLM 第三方价格核验（2026-07-25）
19. https://techgenyz.com/deepseek-v4-flash-api/ — Techgenyz 新闻（Flash API beta、Responses API 集成报道）
20. https://github.com/BerriAI/litellm/issues/27439 — LiteLLM issue（reasoning_effort 透传问题，印证 effort 值域）
21. https://unsloth.ai/docs/models/deepseek-v4 — Unsloth（本地运行参数、三档 effort）
22. https://deepseek.ai/pricing — 第三方价格指南（legacy 别名 7-24 退役确认、价格历史）
23. https://chat-deep.ai/pricing/ — chat-deep.ai 价格页（2026-07-29 核验价格）
24. https://deepseekai.guide/api/deepseek-api-error-codes/ — 错误码处理策略（429 为动态并发限流）
25. https://tokenmix.ai/blog/deepseek-cache-hit-pricing — cache-hit 定价与节省计算
26. https://deepseekai.guide/api/deepseek-api-context-caching/ — 上下文缓存机制细节（64 token 存储单元、best-effort）
27. https://www.developersdigest.tech/blog/deepseek-v4-developer-guide — 开发者指南（reasoning_content、thinking 参数、Flash 默认非思考）
28. https://chat-deep.ai/docs/api-rate-limits/ — 第三方限流实测（账户级并发、429）

## gaps（未能核实 / 需后续确认）

- **账户注册的具体步骤**：官方文档仅给出"先在 platform.deepseek.com/api_keys 创建 API key"，未在本次抓取中获取到账号注册/邮箱验证/充值的分步流程；教程如需写注册流程，需另行核实（或指向 platform.deepseek.com 引导注册）。
- **Codex 配置的 config.toml 完整字段内容**：本次抓取获得 models.json 元数据与 `[model_providers.deepseek]` 段说明，但 config.toml 的完整示例字段（base_url / wire_api / env_key 具体写法）在 extract 中被截断，未完整捕获。
- **新用户是否仍有免费赠送额度 / granted balance 的具体政策**：第三方提及可能存在带有效期的 granted balance，但官方未在本次抓取中确认具体数额与规则。
- **峰值/非峰值 2x 定价的生效日期**：官方仅预告，未公布生效日期（以官方公告为准）。
- **V4-Pro 的 Responses API / Codex 支持时间**：官方口径为"预计 2026 年 8 月初"，无精确日期。
- 所有 benchmark 分数均为 DeepSeek 厂商自测（vendor-reported），独立第三方复测结果未在本次搜索中获取。
