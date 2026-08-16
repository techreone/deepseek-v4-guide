import type { GuideContent } from "./types";

// target keyword: deepseek v4 pro reasoning effort
export const v4ProReasoningEffort: GuideContent = {
  slug: "v4-pro-reasoning-effort",
  category: "API SETUP",
  title: "DeepSeek V4 Pro Reasoning Effort: low, high & max Explained",
  seoTitle: "V4 Pro Reasoning Effort: low/high/max",
  readTime: "7 MIN READ",
  updatedAt: "AUG 16, 2026",
  summary:
    "V4 Pro has three reasoning-effort levels — low, high (default), max — from the 0813 GA build. When to use each, API examples, cost impact.",
  toc: [
    { id: "step-1", label: "What Reasoning Effort Is" },
    { id: "step-2", label: "The Three Levels: low, high, max" },
    { id: "step-3", label: "Setting It in the API" },
    { id: "step-4", label: "Cost & Latency Trade-offs" },
    { id: "step-5", label: "Choosing the Right Level" },
  ],
  steps: [
    {
      num: "01",
      title: "What Reasoning Effort Is",
      description:
        "Reasoning effort controls how deeply the model thinks before answering. DeepSeek introduced three explicit levels — `low`, `high`, and `max` — with the August 13 GA release, for both V4 Pro and [[deepseek-v4-flash|V4 Flash]][1][4].",
      paragraphs: [
        "The official announcement frames it as: low for simple tasks, high for daily agent workflows, max for complex tasks[1]. The model card and Codex integration metadata confirm the same three levels, with `high` as the default reasoning level in Codex's models.json[4][5].",
        "Before GA, effort behavior was fixed and undocumented per build; the 0813 release made it an explicit, per-request control.",
      ],
      list: [
        "Three levels: low / high / max",
        "Default: high",
        "Available for V4 Pro and V4 Flash (GA builds)",
        "Sets how much chain-of-thought the model spends before answering",
      ],
    },
    {
      num: "02",
      title: "The Three Levels: low, high, max",
      description:
        "Each level trades depth against latency and cost[1][4].",
      table: {
        headers: ["Level", "Use for", "Behavior", "Cost profile"],
        rows: [
          ["low", "Simple tasks, high-volume chat, classification", "Fast, shallow reasoning", "Cheapest per call"],
          ["high", "Daily agent workflows (default)", "Balanced deep reasoning", "Moderate"],
          ["max", "Hardest problems: competitive programming, math, complex agents", "Maximum depth", "Most expensive — reasoning tokens bill at output rates"],
        ],
      },
      paragraphs: [
        "The practical difference shows up in two places: latency (max can add many seconds of reasoning before the first output token) and bill (reasoning tokens are billed at output rates, so a max call can cost several times a low call for the same answer quality).",
        "Independent testing of the GA build noted the model 'over-thinks simple problems' at default settings — a strong argument for dropping simple traffic to `low`[6].",
      ],
    },
    {
      num: "03",
      title: "Setting It in the API",
      description:
        "The parameter is `reasoning_effort`, passed per request. It works in both OpenAI-format and Anthropic-format calls[3][5].",
      code: `from openai import OpenAI

client = OpenAI(api_key="<key>", base_url="https://api.deepseek.com")

# Simple chat — keep it cheap
client.chat.completions.create(
    model="deepseek-v4-pro",
    messages=[{"role": "user", "content": "Summarize this changelog."}],
    reasoning_effort="low",
)

# Hard agent task — max depth
client.chat.completions.create(
    model="deepseek-v4-pro",
    messages=[{"role": "user", "content": "Design and implement the parser."}],
    reasoning_effort="max",
    extra_body={"thinking": {"type": "enabled"}},
)`,
      list: [
        "OpenAI format: reasoning_effort=\"low\" | \"high\" | \"max\"",
        "Anthropic format: reasoning block with effort set to none | low | high | max",
        "Default when omitted: high",
        "Codex: the setup script writes reasoning_levels into models.json; default_reasoning_level = high",
      ],
      note: "In thinking mode, temperature, top_p, presence_penalty and frequency_penalty are ignored. FIM and chat prefix completion only work in non-thinking mode[3].",
    },
    {
      num: "04",
      title: "Cost & Latency Trade-offs",
      description:
        "The cost difference between levels is the hidden variable in every V4 Pro budget. Reasoning tokens are billed at the output rate, so a max-effort call that thinks 5,000 tokens before answering pays 5,000 output tokens of thinking on top of the answer[2][3].",
      code: `# Rough math, off-peak output rate $1.98 / 1M tokens
think_5k = 5000 * 1.98 / 1_000_000   # ≈ $0.0099 of thinking
answer_1k = 1000 * 1.98 / 1_000_000  # ≈ $0.002 of answer

# A max-effort call can spend ~5x the answer's cost just thinking.
# On peak hours the same reasoning doubles again.`,
      paragraphs: [
        "Latency follows the same curve: a `max` call on a hard problem can run tens of seconds before the first token, while `low` returns almost immediately. For interactive products, effort choice is a UX decision as much as a cost decision.",
        "The [[v4-pro-context-caching|context caching guide]] shows how a stable prefix reduces the input side of the bill; effort control is the lever on the output side.",
      ],
      note: "Estimates use official off-peak rates from August 16, 2026. Verify against the current pricing page[2].",
    },
    {
      num: "05",
      title: "Choosing the Right Level",
      description:
        "A practical decision rule that keeps both quality and the bill in check[1][6].",
      list: [
        "low: Q&A, summaries, extraction, classification, code formatting — anything a fast model can do",
        "high: default for agent loops, tool calls, code review, multi-turn work",
        "max: competitive programming, theorem-level math, tricky debugging, one-shot hard problems",
        "Route by task type, not by model — the same key can mix levels per request",
        "If you see latency complaints from users, the first fix is usually dropping simple traffic to low, not changing models",
      ],
      paragraphs: [
        "DeepSeek's own framing — low for simple tasks, high for daily agents, max for complex tasks — is a good starting point. Independent testing adds one refinement: the GA build's tendency to over-think means most 'simple' production traffic should be explicitly pinned to `low` rather than left at the default[6].",
        "For team-wide configuration, the Codex setup ([[v4-pro-responses-api|Responses API guide]]) lets you set the default reasoning level once and override per request.",
      ],
    },
  ],
  relatedGuides: [
    {
      title: "DeepSeek V4 Pro API Setup: Base URL & First Call",
      slug: "v4-pro-api",
    },
    {
      title: "DeepSeek V4 Pro Pricing: Peak & Off-Peak Rates",
      slug: "v4-pro-pricing",
    },
    {
      title: "DeepSeek V4 Pro Review: Strengths & Weaknesses",
      slug: "v4-pro-review",
    },
    {
      title: "DeepSeek V4 Pro Responses API & Codex Setup",
      slug: "v4-pro-responses-api",
    },
  ],
  sources: [
    { label: "Official DeepSeek API: V4-Pro GA Release", url: "https://api-docs.deepseek.com/news/news260813/" },
    { label: "DeepSeek Models & Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "DeepSeek First API Call Docs", url: "https://api-docs.deepseek.com/quick_start/first_api_call/" },
    { label: "DeepSeek-V4-Pro-0813 Model Card (Hugging Face)", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813" },
    { label: "DeepSeek Codex Integration Docs", url: "https://api-docs.deepseek.com/quick_start/agent_integrations/codex/" },
    { label: "MindStudio: V4 Pro 0813 Benchmark Review", url: "https://www.mindstudio.ai/blog/deepseek-v4-pro-0813-benchmark-review" },
  ],
};
