import type { GuideContent } from "./types";

// target keyword: deepseek v4 pro responses api
export const v4ProResponsesApi: GuideContent = {
  slug: "v4-pro-responses-api",
  category: "INTEGRATION GUIDE",
  title: "DeepSeek V4 Pro Responses API & Codex Setup",
  seoTitle: "DeepSeek V4 Pro Responses API & Codex Setup",
  readTime: "7 MIN READ",
  updatedAt: "AUG 16, 2026",
  summary:
    "DeepSeek V4 Pro natively supports OpenAI's Responses API: one-click Codex setup, models.json metadata, SSE stream — full guide.",
  toc: [
    { id: "step-1", label: "Step 1: What the Responses API Means" },
    { id: "step-2", label: "Step 2: Call It From the OpenAI SDK" },
    { id: "step-3", label: "Step 3: One-Click Codex Setup" },
    { id: "step-4", label: "Step 4: Manual models.json Configuration" },
    { id: "step-5", label: "Step 5: Responses vs Chat Completions" },
  ],
  steps: [
    {
      num: "01",
      title: "What the Responses API Means",
      description:
        "The OpenAI Responses API is the successor to Chat Completions — a stateful, tool-friendly surface used by Codex and modern agent clients. With the August 13 GA, [[v4-pro|DeepSeek V4 Pro]] natively supports it at the same base_url, which unlocks Codex as a first-class client for DeepSeek[1][2].",
      paragraphs: [
        "Before GA, Responses API on the official API worked only for Flash; V4 Pro requests errored out. The 0813 release flipped that switch, and DeepSeek now ships an official Codex integration guide[2].",
      ],
      note: "Timeline per DeepSeek GA notes and community reports around August 6-13, 2026[2].",
    },
    {
      num: "02",
      title: "Call It From the OpenAI SDK",
      description:
        "Use the standard openai SDK with DeepSeek's base_url and the responses.create method. Model ID stays deepseek-v4-pro[1][2].",
      code: `from openai import OpenAI

client = OpenAI(
    api_key="<DeepSeek API Key>",
    base_url="https://api.deepseek.com",
)

resp = client.responses.create(
    model="deepseek-v4-pro",
    instructions="You are a coding agent. Return concise diffs.",
    input="Fix the failing test in tests/api_test.py",
    reasoning_effort="high",   # low / high / max
)
print(resp.output_text)`,
      list: [
        "base_url stays https://api.deepseek.com — Responses API lives on the same root[1].",
        "reasoning_effort maps to low/high/max as in Chat Completions[3].",
        "Streaming: SSE events from response.created to response.completed — no data: [DONE] terminator[2].",
      ],
      paragraphs: [
        "The missing [DONE] terminator trips up ports from Chat Completions: parsers that wait for it will hang. Listen for the response.completed event instead, then finalize from response.output[2].",
        "Tool use inside Responses follows the same pattern as Chat Completions: define functions in tools, and the model returns function_call items in the output array. For a coding agent, pass instructions plus tools in one call and iterate on the returned items — the stateful conversation object keeps the thread across turns[2].",
      ],
      note: "Streaming behavior per DeepSeek's Responses API guide[2].",
    },
    {
      num: "03",
      title: "One-Click Codex Setup",
      description:
        "DeepSeek ships a one-click script that backs up your ~/.codex config, writes a models.json with the correct V4 Pro/Flash metadata, and adds a deepseek provider block to config.toml. All Codex clients — CLI, ChatGPT desktop, and the VS Code extension — share that config, so you configure once[2].",
      code: `# macOS / Linux
bash <(curl -fsSL https://cdn.deepseek.com/api-docs/codex-deepseek-setup-en.sh)

# Windows PowerShell
irm https://cdn.deepseek.com/api-docs/codex-deepseek-setup-en.ps1 | iex

# The script backs up ~/.codex/config.toml, writes ~/.codex/models.json,
# adds [model_providers.deepseek], and validates. Re-run to switch models.`,
      list: [
        "Backs up existing config before touching anything[2].",
        "Writes reasoning metadata: context_window 1048576, reasoning levels low/high/max, tool format[2].",
        "Re-runnable: switch between Flash and Pro or restore your original config[2].",
      ],
      note: "Script behavior per DeepSeek's official Codex integration guide[2].",
    },
    {
      num: "04",
      title: "Manual models.json Configuration",
      description:
        "If you prefer hand-rolled config, write the provider and model metadata yourself. The key fields Codex needs are the context window, reasoning levels, and tool-call format[2].",
      code: `// ~/.codex/models.json (excerpt)
{
  "deepseek-v4-pro": {
    "context_window": 1048576,
    "reasoning_levels": ["low", "high", "max"],
    "default_reasoning_level": "high",
    "tool_format": "openai",
    "supports_streaming": true
  },
  "deepseek-v4-flash": {
    "context_window": 1048576,
    "reasoning_levels": ["low", "high", "max"],
    "default_reasoning_level": "high",
    "tool_format": "openai"
  }
}`,
      paragraphs: [
        "Then add the provider in ~/.codex/config.toml with model_providers.deepseek pointing at https://api.deepseek.com, and set model_provider = \"deepseek\" in the model section[2].",
      ],
      note: "Field names follow Codex's models.json schema as documented by DeepSeek[2].",
    },
    {
      num: "05",
      title: "Responses vs Chat Completions",
      description:
        "Chat Completions remains fully supported and is the right choice for stateless, high-throughput pipelines. Responses API adds a stateful conversation model with native tool orchestration — the surface Codex and next-gen agent clients expect[1][2].",
      table: {
        headers: ["Factor", "Chat Completions", "Responses API"],
        rows: [
          ["Statefulness", "Stateless", "Stateful (conversation object)"],
          ["Tool orchestration", "Manual", "Native (Codex-style)"],
          ["Codex support", "Via compatibility", "First-class[2]"],
          ["Best for", "Batch, ingestion, chat", "Agent loops, Codex, IDE agents"],
        ],
      },
      paragraphs: [
        "Both routes bill at the same per-token rates and share prefix caching[4]. If you are building a coding agent today, start on Responses API; if you are migrating a chat pipeline, Chat Completions keeps working untouched[1].",
        "A practical migration path: keep your existing Chat Completions code for batch jobs, and add a Responses API branch only for the agent path (Codex, IDE assistants). The two surfaces share the same model and key, so you can run them side by side during the transition and retire the older surface when your agent code is stable[1][2].",
      ],
      note: "Feature split per DeepSeek's Responses API and quick-start docs[1][2].",
    },
  ],
  prevGuide: undefined,
  nextGuide: undefined,
  relatedGuides: [
    { title: "DeepSeek V4 Pro API Setup Guide", slug: "v4-pro-api" },
    { title: "Use DeepSeek V4 Pro in Cursor", slug: "v4-pro-cursor" },
    { title: "DeepSeek V4 Pro with OpenCode", slug: "v4-pro-opencode" },
    { title: "DeepSeek V4 Pro Reasoning Effort Guide", slug: "v4-pro-reasoning-effort" },
    { title: "DeepSeek V4 Pro + DeepSeek Harness", slug: "v4-pro-harness" },
  ],
  sources: [
    { label: "DeepSeek Responses API Guide", url: "https://api-docs.deepseek.com/guides/responses_api/" },
    { label: "DeepSeek Codex Integration Guide", url: "https://api-docs.deepseek.com/quick_start/agent_integrations/codex/" },
    { label: "DeepSeek V4 Pro GA Release Notes", url: "https://api-docs.deepseek.com/news/news260813/" },
    { label: "DeepSeek Models & Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "DeepSeek Quick Start", url: "https://api-docs.deepseek.com/quick_start/" },
  ],
};
