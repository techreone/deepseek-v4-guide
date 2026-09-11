import type { GuideContent } from "./types";

// target keyword: deepseek v4 pro claude code
export const v4ProClaudeCode: GuideContent = {
  slug: "v4-pro-claude-code",
  category: "INTEGRATION GUIDE",
  title: "DeepSeek V4 Pro with Claude Code: No-Code Setup",
  seoTitle: "DeepSeek V4 Pro with Claude Code: Setup",
  readTime: "6 MIN READ",
  updatedAt: "SEP 11, 2026",
  notice:
    "Retiring: from Sept 14, 2026, all deepseek-v4-pro requests route to V4.1 Flash at Flash rates. See [[deepseek-v4-pro-retired|why V4-Pro was retired]] and [[deepseek-v4-1-flash|the V4.1 Flash guide]].",
  summary:
    "Run DeepSeek V4 Pro inside Claude Code via the Anthropic endpoint: ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic, auto opus mapping.",
  toc: [
    { id: "step-1", label: "Step 1: The Anthropic-Compatible Endpoint" },
    { id: "step-2", label: "Step 2: Configure Claude Code" },
    { id: "step-3", label: "Step 3: Model Mapping Rules" },
    { id: "step-4", label: "Step 4: What Works & What Doesn't" },
    { id: "step-5", label: "Step 5: V4 Pro vs Claude Models" },
  ],
  steps: [
    {
      num: "01",
      title: "The Anthropic-Compatible Endpoint",
      description:
        "DeepSeek exposes an Anthropic-format endpoint at https://api.deepseek.com/anthropic that speaks the Messages API[1]. Because Claude Code talks to that protocol, it can use DeepSeek as a drop-in backend — no code changes, no forks[2].",
      paragraphs: [
        "The August 13 GA release notes confirm Claude Code and GitHub Copilot can use DeepSeek directly as a backend[2]. V4 Pro 0813 is the flagship option here: 96.40% SWE-bench Verified at $0.022 per test[5].",
      ],
      note: "Endpoint documented in DeepSeek's Anthropic API guide and GA release notes[1][2].",
    },
    {
      num: "02",
      title: "Configure Claude Code",
      description:
        "Set two environment variables and Claude Code routes every request to DeepSeek. The same variables work for Claude Code CLI, GitHub Copilot, and any Anthropic-SDK client[1][2].",
      code: `# terminal / shell profile
export ANTHROPIC_BASE_URL="https://api.deepseek.com/anthropic"
export ANTHROPIC_API_KEY="<DeepSeek API Key>"

# start Claude Code — no further config needed
claude`,
      list: [
        "ANTHROPIC_BASE_URL must include /anthropic — the root https://api.deepseek.com is the OpenAI-format endpoint[1].",
        "ANTHROPIC_API_KEY is your DeepSeek key from platform.deepseek.com.",
        "For GitHub Copilot: the same two variables apply via its Anthropic-compatible provider slot[2].",
      ],
      note: "Environment-variable setup per DeepSeek's Anthropic API guide[1].",
    },
    {
      num: "03",
      title: "Model Mapping Rules",
      description:
        "DeepSeek maps Claude model names automatically. claude-opus* (and other high-end names) resolve to deepseek-v4-pro; unsupported model names fall back to deepseek-v4-flash[1]. You can usually leave Claude Code's model setting untouched.",
      table: {
        headers: ["Requested model", "Actually used", "Notes"],
        rows: [
          ["claude-opus-4.x / claude-opus*", "deepseek-v4-pro", "Flagship mapping[1]"],
          ["claude-sonnet*", "deepseek-v4-pro (or flash)", "Depends on build version"],
          ["Anything unsupported", "deepseek-v4-flash", "Safe fallback[1]"],
          ["explicit deepseek-v4-pro", "deepseek-v4-pro", "Supported via Messages API model field[1]"],
        ],
      },
      paragraphs: [
        "If you want to force a specific model, pass it directly in the Messages API model field — deepseek-v4-pro and deepseek-v4-flash both work on the Anthropic endpoint[1].",
      ],
      note: "Mapping rules from DeepSeek's Anthropic API documentation[1].",
    },
    {
      num: "04",
      title: "What Works & What Doesn't",
      description:
        "Tool calling, multi-turn conversations, JSON output, and thinking-mode reasoning all work through the Anthropic endpoint[1][3]. Two caveats: Anthropic-format requests use a reasoning block with effort levels (none/low/high/max) that mirror DeepSeek's reasoning_effort[3], and legacy Anthropic-only features like MCP-brokered auth are not applicable.",
      list: [
        "Works: agent tool loops, file editing, terminal commands inside Claude Code.",
        "Works: reasoning blocks with effort none/low/high/max[3].",
        "Works: streaming responses in Anthropic SSE format[1].",
        "Not applicable: Anthropic-specific account features, quota bundles, or Opus-exclusive tools.",
      ],
      paragraphs: [
        "In practice, V4 Pro through Claude Code behaves like a frontier coding agent with DeepSeek pricing: tool-call-heavy sessions bill at $0.66/$1.98 per 1M off-peak after the 8/16 pricing change[4].",
        "The mental model for the endpoint: DeepSeek speaks Anthropic's Messages wire format, so anything that expects an Anthropic client — Claude Code CLI, Copilot's Anthropic slot, custom Anthropic-SDK apps — treats it as a drop-in. Your DeepSeek key works as the bearer token, and DeepSeek's own docs confirm Claude Code and GitHub Copilot as supported backends[1][2].",
        "Cost is where this setup surprises people: the same Claude Code session that would burn $1.29 per task on Claude Opus 5 runs for about $0.022 per task on V4 Pro[5]. If your team already standardized on Claude Code's interface, switching the backend is two environment variables — the UI, keybindings, slash commands, and agent loop stay exactly the same.",
      ],
      note: "Capability list synthesized from DeepSeek's Anthropic API and thinking-mode guides[1][3].",
    },
    {
      num: "05",
      title: "V4 Pro vs Claude Models",
      description:
        "Against real Claude models, V4 Pro 0813 sits just below the top: 96.40% SWE-bench Verified versus Claude Opus 5's 97.00% — at 1/59th of the per-test cost ($0.022 vs $1.29)[5]. On BenchLM's composite, Claude-class models lead by a wider margin on long-horizon agentic work[6].",
      table: {
        headers: ["Model (Vals AI, SWE-bench Verified)", "Score", "Cost/test"],
        rows: [
          ["Claude Opus 5", "97.00%", "$1.29"],
          ["DeepSeek V4 Pro 0813", "96.40%", "$0.022"],
          ["DeepSeek V4 Flash 0731", "88.80%", "$0.010"],
        ],
      },
      paragraphs: [
        "The pragmatic setup for many teams: Claude Code UI + DeepSeek backend for volume work, and switch ANTHROPIC_BASE_URL back to Anthropic only when you need maximum autonomous agent behavior. Both routes share the same Claude Code interface, so the switch is two environment variables[1][2].",
        "Before committing to the switch, run a 50-task A/B on your own repo: same prompts against both backends, and compare pass rate, tokens per task, and wall-clock time. The SWE-bench delta (96.4% vs 97.0%) is inside the noise band for most real workloads, but long-horizon autonomy still favors Anthropic on independent agentic evals[5][6].",
      ],
      note: "SWE-bench Verified figures from Codersera/Vals AI[5]; composite rankings per BenchLM[6].",
    },
  ],
  prevGuide: undefined,
  nextGuide: undefined,
  relatedGuides: [
    { title: "DeepSeek V4 Pro API Setup Guide", slug: "v4-pro-api" },
    { title: "Use DeepSeek V4 Pro in Cursor", slug: "v4-pro-cursor" },
    { title: "DeepSeek V4 Flash in Cursor, Claude Code & Codex", slug: "flash-ide" },
    { title: "Claude Code & CC Switch with DeepSeek V4", slug: "cc-switch-claude-code" },
    { title: "DeepSeek V4 Pro vs V4 Flash: Which Model?", slug: "v4-pro-vs-flash" },
  ],
  sources: [
    { label: "DeepSeek Anthropic API Guide", url: "https://api-docs.deepseek.com/guides/anthropic_api/" },
    { label: "DeepSeek V4 Pro GA Release Notes", url: "https://api-docs.deepseek.com/news/news260813/" },
    { label: "DeepSeek Thinking Mode & Reasoning Effort", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "DeepSeek Models & Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "Codersera: V4 Pro 0813 Guide & Benchmarks", url: "https://codersera.com/blog/deepseek-v4-pro-0813-guide-2026/" },
    { label: "BenchLM: V4 Pro vs GPT-5.5 Comparison", url: "https://benchlm.ai/compare/deepseek-v4-pro-vs-gpt-5.5" },
  ],
};
