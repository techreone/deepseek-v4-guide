import type { GuideContent } from "./types";

// target keyword: deepseek v4 pro cursor
export const v4ProCursor: GuideContent = {
  slug: "v4-pro-cursor",
  category: "INTEGRATION GUIDE",
  title: "Use DeepSeek V4 Pro in Cursor: Complete Setup",
  seoTitle: "DeepSeek V4 Pro in Cursor: Setup Guide",
  readTime: "6 MIN READ",
  updatedAt: "AUG 16, 2026",
  summary:
    "Connect Cursor to DeepSeek V4 Pro 0813: OpenAI-compatible base_url, model names, reasoning-effort support, and the proxy workaround.",
  toc: [
    { id: "step-1", label: "Step 1: Why V4 Pro in Cursor" },
    { id: "step-2", label: "Step 2: Add DeepSeek as a Custom Provider" },
    { id: "step-3", label: "Step 3: Model Names & Reasoning Settings" },
    { id: "step-4", label: "Step 4: The reasoning_content Caveat" },
    { id: "step-5", label: "Step 5: Agent Mode Tips" },
  ],
  steps: [
    {
      num: "01",
      title: "Why V4 Pro in Cursor",
      description:
        "Cursor runs on OpenAI-compatible providers, and DeepSeek exposes exactly that contract at https://api.deepseek.com[1]. With the 0813 GA, V4 Pro became a credible in-IDE coding model: 96.40% on SWE-bench Verified (third-party neutral harness) at $0.022 per test[5], with MIT-licensed weights behind it.",
      paragraphs: [
        "The August 13 GA also shipped native Responses API support and a Codex integration path[2][4], which matters for Cursor because Cursor's agent uses OpenAI-style tool calling under the hood — the same contract DeepSeek implements.",
      ],
      list: [
        "One base_url, OpenAI SDK, tool calls, JSON output — everything Cursor needs.",
        "Reasoning effort low/high/max for fine-grained cost control[1].",
        "1M-token context window fits large-repo agent loops[6].",
      ],
      note: "Benchmark figure from Codersera/Vals AI's neutral-harness leaderboard[5].",
    },
    {
      num: "02",
      title: "Add DeepSeek as a Custom Provider",
      description:
        "In Cursor, open Settings → Models → Add a new OpenAI-compatible provider and point it at DeepSeek. The official quick-start documents the same parameters you will reuse everywhere: base_url https://api.deepseek.com and your DeepSeek API key[1].",
      code: `# Cursor → Settings → Models → "Add Provider"
# Provider type: OpenAI-compatible
Name:        DeepSeek
Base URL:    https://api.deepseek.com
API key:     <DeepSeek API Key from platform.deepseek.com>

# Then enable these model IDs in the Models list:
#   deepseek-v4-pro
#   deepseek-v4-flash`,
      list: [
        "Base URL is https://api.deepseek.com — do not append /v1 (DeepSeek accepts it, but the documented root is cleaner).",
        "Use the same key as the official API; there is no separate Cursor key.",
        "If your Cursor build needs /v1, it works too — DeepSeek is prefix-agnostic[1].",
      ],
      note: "DeepSeek's official first-call guide shows base_url https://api.deepseek.com with the OpenAI SDK[1].",
    },
    {
      num: "03",
      title: "Model Names & Reasoning Settings",
      description:
        "Model names are stable: deepseek-v4-pro resolves to the 0813 GA checkpoint, deepseek-v4-flash to the 0731 build[1]. Cursor lets you set per-model parameters; pass reasoning_effort through extra-body configuration where your Cursor version supports it[1][3].",
      table: {
        headers: ["Setting", "Value", "Notes"],
        rows: [
          ["Model (main)", "deepseek-v4-pro", "0813 GA checkpoint[1]"],
          ["Reasoning effort", "high (default)", "low for speed, max for hard tasks[3]"],
          ["Thinking mode", "enabled by default", "chain-of-thought in reasoning_content[3]"],
          ["Context window", "1M tokens", "works with Cursor's @-context injection"],
        ],
      },
      paragraphs: [
        "DeepSeek's official announcement frames effort levels as: low for simple tasks, high for daily agent workflows, max for complex tasks[2]. In Cursor, match effort to what the tab is doing — low during autocomplete-style edits, high or max for refactors and architecture changes.",
      ],
      note: "Parameter behavior per DeepSeek's thinking-mode and GA documentation[2][3].",
    },
    {
      num: "04",
      title: "The reasoning_content Caveat",
      description:
        "DeepSeek returns chain-of-thought in the reasoning_content field of the OpenAI-format response[3]. Some Cursor builds forward only the content field and drop reasoning_content, which can truncate long thinking traces or break streaming mid-thought on older versions.",
      paragraphs: [
        "If you hit odd truncation, the community workaround is a small local proxy that rewrites reasoning_content into the content stream before it reaches Cursor (the deepseek-cursor-proxy pattern). This is a model-access fix, not a harness integration, and is optional — most users run fine without it after the 0813 update.",
        "The proxy pattern is simple: a Python/Node server listens on localhost, forwards requests to DeepSeek with the reasoning_content field, and merges it into the visible message so Cursor's UI doesn't drop the thinking trace. You keep your API key local, and the only downside is an extra hop that adds a few milliseconds. If you see 'response ended mid-thought' or empty tool-call reasoning, this is the first thing to try.",
        "A cleaner alternative: use the official Codex path — DeepSeek's one-click Codex setup configures models.json with correct reasoning metadata for agent clients[4]. Cursor's agent mode benefits from the same metadata being present.",
      ],
      note: "reasoning_content behavior is documented in DeepSeek's thinking-mode guide[3]; proxy workaround is a community pattern.",
    },
    {
      num: "05",
      title: "Agent Mode Tips",
      description:
        "For Cursor's agent/composer mode, treat V4 Pro like a frontier coding model with a budget: keep the shared system prompt and repo context stable so prefix caching kicks in (cache-hit input drops to $0.022 off-peak after the 8/16 pricing change)[1].",
      list: [
        "Keep a consistent @-mentioned file set per task to maximize cache hits.",
        "Schedule long agent runs into off-peak hours (all hours except 01:00-04:00 and 06:00-10:00 UTC) to halve the new rates[1].",
        "Escalate from [[deepseek-v4-flash|V4 Flash]] to V4 Pro only when a task needs deep reasoning — the hybrid pattern cuts cost ~3x[6].",
        "Test the tool-call loop on a small repo first; tool calling is fully supported but tuning effort/thinking per step helps.",
      ],
      paragraphs: [
        "The combination of MIT weights, native tool calling, and sub-$0.02-per-test coding accuracy makes V4 Pro a strong default inside Cursor for open-source teams — with [[v4-pro-vs-gpt-5.5|the closed flagships]] still ahead only on long-horizon autonomous tasks[5][7].",
        "Budget tip after the 8/16 pricing change: a full day of Cursor agent sessions on V4 Pro at off-peak rates costs about a third of what the same sessions cost at peak. If your team is in a timezone where your working hours overlap the UTC peak windows (01:00-04:00 and 06:00-10:00 UTC), consider shifting heavy agent runs or accepting the peak price for interactive work — the difference is roughly 2x on every token[1].",
      ],
      note: "Pricing per DeepSeek official pricing page captured August 16, 2026[1].",
    },
  ],
  prevGuide: undefined,
  nextGuide: undefined,
  relatedGuides: [
    { title: "DeepSeek V4 Pro API Setup Guide", slug: "v4-pro-api" },
    { title: "DeepSeek V4 Pro vs V4 Flash: Which Model?", slug: "v4-pro-vs-flash" },
    { title: "DeepSeek V4 Pro with Claude Code", slug: "v4-pro-claude-code" },
    { title: "DeepSeek V4 Flash in Cursor, Claude Code & Codex", slug: "flash-ide" },
    { title: "DeepSeek V4 Pro Responses API & Codex Setup", slug: "v4-pro-responses-api" },
  ],
  sources: [
    { label: "DeepSeek Quick Start: Your First API Call", url: "https://api-docs.deepseek.com/quick_start/" },
    { label: "DeepSeek V4 Pro GA Release Notes", url: "https://api-docs.deepseek.com/news/news260813/" },
    { label: "DeepSeek Thinking Mode & Reasoning Effort", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "DeepSeek Codex Integration Guide", url: "https://api-docs.deepseek.com/quick_start/agent_integrations/codex/" },
    { label: "Codersera: V4 Pro 0813 Guide & Benchmarks", url: "https://codersera.com/blog/deepseek-v4-pro-0813-guide-2026/" },
    { label: "DeepSeek-V4-Pro-0813 Model Card (Hugging Face)", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813" },
    { label: "BenchLM: V4 Pro vs GPT-5.5 Comparison", url: "https://benchlm.ai/compare/deepseek-v4-pro-vs-gpt-5.5" },
  ],
};
