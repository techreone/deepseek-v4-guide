import type { GuideContent } from "./types";

// target keyword: deepseek v4 pro api
export const v4ProApi: GuideContent = {
  slug: "v4-pro-api",
  category: "API SETUP",
  title: "DeepSeek V4 Pro API Setup: Base URL, Model ID & First Call",
  seoTitle: "DeepSeek V4 Pro API Setup Guide",
  readTime: "7 MIN READ",
  updatedAt: "SEP 11, 2026",
  notice:
    "Retiring: from Sept 14, 2026, all deepseek-v4-pro requests route to V4.1 Flash at Flash rates. See [[deepseek-v4-pro-retired|why V4-Pro was retired]] and [[deepseek-v4-1-flash|the V4.1 Flash guide]].",
  summary:
    "Call DeepSeek V4 Pro with model deepseek-v4-pro, base URL api.deepseek.com, reasoning_effort low/high/max. OpenAI + Anthropic formats and Codex setup.",
  toc: [
    { id: "step-1", label: "The V4 Pro API in One Paragraph" },
    { id: "step-2", label: "First Call: OpenAI-Compatible Format" },
    { id: "step-3", label: "Thinking Mode & Reasoning Effort" },
    { id: "step-4", label: "Anthropic-Compatible Endpoint" },
    { id: "step-5", label: "Multi-Turn & Tool Calls: Gotchas" },
    { id: "step-6", label: "Codex & the Responses API" },
  ],
  steps: [
    {
      num: "01",
      title: "The V4 Pro API in One Paragraph",
      description:
        "The DeepSeek V4 Pro API is OpenAI-compatible: keep your existing DeepSeek API key, point at `https://api.deepseek.com`, and set `model` to `deepseek-v4-pro`. That is the whole migration — the GA release on August 13 kept the model ID unchanged, so nothing breaks for existing callers[1][3].",
      list: [
        "Base URL: https://api.deepseek.com (OpenAI format)",
        "Model ID: deepseek-v4-pro (unchanged since preview)",
        "Auth: standard DeepSeek API key (Bearer)",
        "Thinking: enabled by default, controllable via the thinking parameter",
        "Reasoning effort: low / high / max, defaults to high",
      ],
      note: "Legacy model names deepseek-chat and deepseek-reasoner were retired on July 24, 2026 — if your code still uses them, update the model field[1].",
    },
    {
      num: "02",
      title: "First Call: OpenAI-Compatible Format",
      description:
        "A minimal call using the official OpenAI SDK against the DeepSeek endpoint[3].",
      code: `from openai import OpenAI

client = OpenAI(
    api_key="<DeepSeek API Key>",
    base_url="https://api.deepseek.com",
)

response = client.chat.completions.create(
    model="deepseek-v4-pro",
    messages=[{"role": "user", "content": "Write a Python function that parses CSV with a quoted-field edge case."}],
    reasoning_effort="high",
)

print(response.choices[0].message.content)`,
      paragraphs: [
        "The API returns reasoning in `reasoning_content` and the final answer in `content`, mirroring how [[flash-api-setup|V4 Flash]] behaves. Everything you already built for Flash — streaming, JSON output, tool calls — works the same way against Pro[3].",
        "Rate limits: V4 Pro allows 500 concurrent requests by default, versus 2,500 for Flash. If you plan bursty load, account for the lower ceiling[2].",
      ],
    },
    {
      num: "03",
      title: "Thinking Mode & Reasoning Effort",
      description:
        "V4 Pro ships with thinking enabled by default, and the GA release added three explicit reasoning-effort levels: `low`, `high`, and `max`[1][4].",
      code: `# Explicit thinking + effort
response = client.chat.completions.create(
    model="deepseek-v4-pro",
    messages=[{"role": "user", "content": "Solve this competitive-programming problem."}],
    reasoning_effort="max",
    extra_body={"thinking": {"type": "enabled"}},
)`,
      list: [
        "low: fast, shallow reasoning — simple tasks, high-volume chat",
        "high: deep reasoning for complex problems — the default",
        "max: maximum depth for the hardest problems — agentic and math workloads",
        "FIM and chat prefix completion are only available in non-thinking mode",
        "In thinking mode, temperature / top_p / presence_penalty / frequency_penalty are ignored",
      ],
      note: "The [[v4-pro-reasoning-effort|reasoning effort guide]] breaks down which level to pick for which workload, including the cost impact (reasoning tokens bill at output rates)[2].",
    },
    {
      num: "04",
      title: "Anthropic-Compatible Endpoint",
      description:
        "DeepSeek exposes an Anthropic-compatible endpoint at `https://api.deepseek.com/anthropic`, so Claude Code and other Anthropic-SDK clients can point at V4 Pro without a proxy[1].",
      code: `# Anthropic-style call (Claude Code, etc.)
# base_url: https://api.deepseek.com/anthropic
# model:    deepseek-v4-pro
# reasoning block with effort set to none | low | high | max`,
      paragraphs: [
        "The [[v4-pro-claude-code|Claude Code setup page]] walks through the full config, including the reasoning-effort block syntax. The same endpoint works for the rest of the V4 family — swap the model to `deepseek-v4-flash` for the cheaper tier.",
      ],
    },
    {
      num: "05",
      title: "Multi-Turn & Tool Calls: Gotchas",
      description:
        "Two failure modes trip up most people moving from preview-era code to the GA build[3].",
      list: [
        "Multi-turn with tools: you must return `reasoning_content` from the previous turn in the next request, or the call fails with a 400 error",
        "Thinking mode is default-on: non-thinking callers (FIM, prefix completion) must explicitly disable thinking",
        "Reasoning tokens count as output tokens — a max-effort call can surprise you on cost",
      ],
      paragraphs: [
        "If you hit a 400 after enabling tools, the usual cause is the missing reasoning_content echo. Keep the assistant turn's reasoning field in your state and pass it back verbatim[3].",
      ],
      note: "All of these behaviors are shared with the rest of the V4 lineup; the [[flash-api-setup|Flash API guide]] documents the same conventions.",
    },
    {
      num: "06",
      title: "Codex & the Responses API",
      description:
        "The GA build added native OpenAI Responses API support, and DeepSeek ships a one-click setup script for Codex clients[5].",
      code: `# One-click Codex setup (macOS / Linux)
bash <(curl -fsSL https://cdn.deepseek.com/api-docs/codex-deepseek-setup-en.sh)

# Windows PowerShell
irm https://cdn.deepseek.com/api-docs/codex-deepseek-setup-en.ps1 | iex`,
      list: [
        "The script writes ~/.codex/models.json with deepseek-v4-pro and deepseek-v4-flash metadata (1M context, reasoning levels low/high/max)",
        "It adds a [model_providers.deepseek] block to ~/.codex/config.toml",
        "All Codex clients (CLI, ChatGPT desktop, VS Code extension) share the same config — configure once",
        "Rerun the script anytime to switch models or restore your previous config",
      ],
      note: "Before GA (Aug 6), Responses API worked only for Flash; the 0813 release enabled it for Pro[5]. See the [[v4-pro-responses-api|Responses API guide]] for manual models.json/config.toml setup.",
    },
  ],
  relatedGuides: [
    {
      title: "DeepSeek V4 Flash API Setup",
      slug: "flash-api-setup",
    },
    {
      title: "DeepSeek V4 Pro Reasoning Effort: low/high/max",
      slug: "v4-pro-reasoning-effort",
    },
    {
      title: "DeepSeek V4 Pro Responses API & Codex Setup",
      slug: "v4-pro-responses-api",
    },
    {
      title: "DeepSeek V4 Pro Pricing: Peak & Off-Peak Rates",
      slug: "v4-pro-pricing",
    },
  ],
  sources: [
    { label: "Official DeepSeek API: V4-Pro GA Release", url: "https://api-docs.deepseek.com/news/news260813/" },
    { label: "DeepSeek Models & Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "DeepSeek First API Call Docs", url: "https://api-docs.deepseek.com/quick_start/first_api_call/" },
    { label: "DeepSeek-V4-Pro-0813 Model Card (Hugging Face)", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813" },
    { label: "DeepSeek Codex Integration Docs", url: "https://api-docs.deepseek.com/quick_start/agent_integrations/codex/" },
  ],
};
