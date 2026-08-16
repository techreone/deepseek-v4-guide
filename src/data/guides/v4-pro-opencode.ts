import type { GuideContent } from "./types";

// target keyword: deepseek v4 pro opencode
export const v4ProOpencode: GuideContent = {
  slug: "v4-pro-opencode",
  category: "INTEGRATION GUIDE",
  title: "DeepSeek V4 Pro with OpenCode: Setup & Cost",
  seoTitle: "DeepSeek V4 Pro with OpenCode: Setup",
  readTime: "6 MIN READ",
  updatedAt: "AUG 16, 2026",
  summary:
    "Wire DeepSeek V4 Pro 0813 into OpenCode: provider config, model IDs, reasoning effort, and why the open agent + open model stack is cheap.",
  toc: [
    { id: "step-1", label: "Step 1: OpenCode + DeepSeek, a Natural Pair" },
    { id: "step-2", label: "Step 2: Provider Configuration" },
    { id: "step-3", label: "Step 3: Model & Reasoning Settings" },
    { id: "step-4", label: "Step 4: Cost Profile" },
    { id: "step-5", label: "Step 5: OpenCode vs Official Harness" },
  ],
  steps: [
    {
      num: "01",
      title: "OpenCode + DeepSeek, a Natural Pair",
      description:
        "OpenCode is an open-source terminal coding agent that speaks the OpenAI-compatible protocol — the same contract DeepSeek exposes at https://api.deepseek.com[1]. DeepSeek's GA notes explicitly list OpenCode as a supported backend client[2], and V4 Pro 0813 brings near-frontier patch coding (96.40% SWE-bench Verified)[5].",
      paragraphs: [
        "Because both sides are open source, the pair has no vendor lock-in: swap the model string and the same OpenCode config talks to any OpenAI-compatible provider.",
        "There is a practical reason this pairing gets so much attention in 2026: it is the cheapest way to run a near-frontier coding agent without renting a closed-model quota. OpenCode brings the agent loop (plan, edit, test, repeat) and V4 Pro brings the reasoning — and both are MIT-licensed, so CI pipelines, containers, and air-gapped setups can run the same stack the developer runs locally[2][6].",
      ],
      note: "OpenCode support is confirmed in DeepSeek's GA release notes[2].",
    },
    {
      num: "02",
      title: "Provider Configuration",
      description:
        "OpenCode reads providers from its config file. Add a deepseek provider block pointing at the official base_url, then select the model[1][2].",
      code: `# opencode config (opencode.json / config.json)
{
  "provider": {
    "deepseek": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "DeepSeek",
      "options": {
        "baseURL": "https://api.deepseek.com",
        "apiKey": "{env:DEEPSEEK_API_KEY}"
      },
      "models": {
        "deepseek-v4-pro": {
          "name": "DeepSeek V4 Pro (0813)",
          "limit": { "context": 1048576, "output": 393216 }
        },
        "deepseek-v4-flash": {
          "name": "DeepSeek V4 Flash (0731)",
          "limit": { "context": 1048576, "output": 393216 }
        }
      }
    }
  },
  "model": "deepseek/deepseek-v4-pro"
}`,
      list: [
        "baseURL https://api.deepseek.com — OpenAI-format endpoint[1].",
        "apiKey from the DEEPSEEK_API_KEY environment variable.",
        "1M context (1048576 tokens) matches the model's real window[6].",
      ],
      note: "Config shape follows OpenCode's provider model; parameters match DeepSeek's quick start[1][2].",
    },
    {
      num: "03",
      title: "Model & Reasoning Settings",
      description:
        "Use deepseek-v4-pro for agent sessions and deepseek-v4-flash for quick edits. DeepSeek's reasoning_effort (low/high/max) is passed through the OpenAI-compatible API, and thinking mode is enabled by default[3].",
      code: `# inside OpenCode sessions you can switch per task:
#  /model deepseek/deepseek-v4-pro
#  /model deepseek/deepseek-v4-flash

# reasoning_effort rides in the request body:
#   {"reasoning_effort": "high"}   <- default, daily agent work
#   {"reasoning_effort": "max"}    <- hardest tasks[3]`,
      paragraphs: [
        "OpenCode's agent loop (plan → edit → test → repeat) maps cleanly onto V4 Pro's tool-calling support. Keep the per-session context lean and stable so DeepSeek's automatic prefix caching trims the bill[4].",
      ],
      note: "Reasoning effort levels from DeepSeek's GA announcement and thinking-mode docs[2][3].",
    },
    {
      num: "04",
      title: "Cost Profile",
      description:
        "OpenCode + V4 Pro is one of the cheapest frontier-ish agent stacks: $0.022 per SWE-bench test on V4 Pro 0813 (Vals AI neutral harness)[5], and API rates of $0.435/$0.87 per 1M before the 8/16 peak/off-peak change (off-peak $0.66/$1.98 after)[4].",
      table: {
        headers: ["Stack", "SWE-bench Verified", "Cost/test"],
        rows: [
          ["OpenCode + V4 Pro 0813", "96.40%", "$0.022"],
          ["OpenCode + V4 Flash 0731", "88.80%", "$0.010"],
          ["Claude Opus 5 (any client)", "97.00%", "$1.29"],
        ],
      },
      paragraphs: [
        "The open-source stack trades about half a point of SWE accuracy for a 58x cost reduction versus the closed flagship[5]. For teams running thousands of agent iterations a day, that difference is the difference between a $220 bill and a $13,000 bill.",
        "Cache-aware session design matters more here than on closed models: keep the repository context and system prompt byte-identical across iterations so DeepSeek's automatic prefix cache serves the reused prefix at $0.003625 per 1M (pre-8/16) or $0.022 off-peak (post-8/16) instead of the miss price[4]. OpenCode's built-in session persistence helps — avoid re-sending large file contexts every turn.",
      ],
      note: "Per-test costs from Vals AI's neutral-harness leaderboard[5]; API pricing from DeepSeek docs[4].",
    },
    {
      num: "05",
      title: "OpenCode vs Official Harness",
      description:
        "DeepSeek also ships its own agent runtime, [[deepseek-harness|DeepSeek Harness]] (dsh), where official benchmarks run in 'minimal mode'[7]. OpenCode is the lighter, drop-in alternative: no new runtime, just a config block, and it supports any OpenAI-compatible provider — not just DeepSeek.",
      table: {
        headers: ["Factor", "OpenCode + V4 Pro", "DeepSeek Harness + V4 Pro"],
        rows: [
          ["Setup", "Config block only", "npx @deepseek-ai/dsh web[7]"],
          ["Runtime", "OpenCode (mature)", "dsh v0.1 developer preview[7]"],
          ["Benchmark context", "Neutral harness, 96.40%[5]", "Official minimal-mode, TB2.1 87.9[7]"],
          ["Lock-in", "None — any provider", "Plugin architecture, any model[7]"],
        ],
      },
      paragraphs: [
        "Start with OpenCode for a zero-friction path to V4 Pro today, and evaluate dsh when its plugin ecosystem (now at 60+ community plugins) stabilizes past the developer-preview stage[7].",
      ],
      note: "Harness facts from DeepSeek's official harness page and research notes[7].",
    },
  ],
  prevGuide: undefined,
  nextGuide: undefined,
  relatedGuides: [
    { title: "DeepSeek V4 Pro API Setup Guide", slug: "v4-pro-api" },
    { title: "DeepSeek V4 Flash with OpenCode", slug: "flash-opencode" },
    { title: "DeepSeek V4 Pro + DeepSeek Harness", slug: "v4-pro-harness" },
    { title: "OpenCode Go Subscription: $5 DeepSeek", slug: "opencode-go" },
    { title: "DeepSeek V4 Pro vs V4 Flash: Which Model?", slug: "v4-pro-vs-flash" },
  ],
  sources: [
    { label: "DeepSeek Quick Start: Your First API Call", url: "https://api-docs.deepseek.com/quick_start/" },
    { label: "DeepSeek V4 Pro GA Release Notes", url: "https://api-docs.deepseek.com/news/news260813/" },
    { label: "DeepSeek Thinking Mode & Reasoning Effort", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "DeepSeek Models & Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "Codersera: V4 Pro 0813 Guide & Benchmarks", url: "https://codersera.com/blog/deepseek-v4-pro-0813-guide-2026/" },
    { label: "DeepSeek-V4-Pro-0813 Model Card (Hugging Face)", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813" },
    { label: "DeepSeek Harness Official Page", url: "https://deepseek.com/harness/en/" },
  ],
};
