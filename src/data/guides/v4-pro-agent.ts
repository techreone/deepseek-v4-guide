import type { GuideContent } from "./types";

// target keyword: deepseek v4 pro agent
export const v4ProAgent: GuideContent = {
  slug: "v4-pro-agent",
  category: "MODEL GUIDE",
  title: "DeepSeek V4 Pro Agent Capabilities: 0813 Deep Dive",
  seoTitle: "DeepSeek V4 Pro Agent Capabilities",
  readTime: "7 MIN READ",
  updatedAt: "SEP 11, 2026",
  notice:
    "Retiring: from Sept 14, 2026, all deepseek-v4-pro requests route to V4.1 Flash at Flash rates. See [[deepseek-v4-pro-retired|why V4-Pro was retired]] and [[deepseek-v4-1-flash|the V4.1 Flash guide]].",
  summary:
    "V4 Pro 0813's agent capabilities: GA agent upgrades, Terminal-Bench 2.1 87.9, Cybergym rank #1, native Responses API, coding-agent guide.",
  toc: [
    { id: "step-1", label: "Step 1: What 'Major Agent Upgrades' Means" },
    { id: "step-2", label: "Step 2: Official Agent Benchmarks" },
    { id: "step-3", label: "Step 3: Independent Agent Runs" },
    { id: "step-4", label: "Step 4: The Agent-Ready API Surface" },
    { id: "step-5", label: "Step 5: Building an Agent on V4 Pro" },
  ],
  steps: [
    {
      num: "01",
      title: "What 'Major Agent Upgrades' Means",
      description:
        "The August 13 GA announcement leads with 'Major Agent upgrades with strong production gains'[1]. Concretely: flexible reasoning effort (low/high/max) for both Pro and Flash, native OpenAI Responses API support optimized for Codex, and the 0813 checkpoint retraining focused on agentic coding[1][2].",
      paragraphs: [
        "DeepSeek positions V4 Pro's agentic coding as open-source state of the art[2]. The upgrade is not a new architecture — it is a retrained checkpoint plus a production-grade agent surface (Responses API, tool calling, reasoning control) that closed models have had for years.",
      ],
      list: [
        "Reasoning effort control: low / high / max (default high)[1][2].",
        "Native Responses API for Codex-class clients[3].",
        "Tool calling, JSON output, thinking mode — full OpenAI-compatible surface[3].",
        "Official agent benchmark harness: DeepSeek Harness minimal mode[2].",
      ],
      note: "Announcement details from DeepSeek's GA release notes[1].",
    },
    {
      num: "02",
      title: "Official Agent Benchmarks",
      description:
        "DeepSeek publishes agent scores measured with its own Harness minimal mode at max reasoning effort[2]. On the 0813 build, agentic gains over the preview are the largest single jump in the family[2][4].",
      table: {
        headers: ["Agent benchmark", "V4 Pro 0813", "V4 Pro Preview", "Delta"],
        rows: [
          ["Terminal-Bench 2.1", "87.9", "72.1", "+15.8"],
          ["DeepSWE", "62.7", "12.8", "+49.9"],
          ["Cybergym", "83.3", "52.7", "+30.6"],
          ["Toolathlon-Verified", "74.1", "55.9", "+18.2"],
          ["AutomationBench (Public)", "31.8", "12.8", "+19.0"],
        ],
      },
      paragraphs: [
        "Cybergym 83.3 and AutomationBench 31.8 are rank #1 in DeepSeek's published comparison table, ahead of Opus-4.8 and Fable-5 on those rows[2]. Terminal-Bench 2.1 at 87.9 sits just behind Kimi K3 (88.3) and Opus-4.8 (88.3)[2].",
      ],
      note: "All official figures are vendor-reported with the Harness minimal-mode config[2].",
    },
    {
      num: "03",
      title: "Independent Agent Runs",
      description:
        "Independent harnesses tell a more conservative story. Vals AI measured V4 Pro 0813 at 54.68% on Terminal-Bench with a reference harness — 33 points below the official 87.9[4]. On patch-style SWE-bench Verified with a neutral harness, V4 Pro scores 96.40% (#2 globally)[5].",
      paragraphs: [
        "The pattern is consistent: V4 Pro is near-frontier on repository-level patch generation, but end-to-end long-horizon autonomy still trails the closed flagships[4][5]. Mindstudio's 8-question eval (76.25%) also flagged over-thinking on simple prompts and over-rewriting code — real behaviors to account for when tuning agent loops[6].",
      ],
      table: {
        headers: ["Independent eval", "V4 Pro 0813", "Notes"],
        rows: [
          ["SWE-bench Verified (Vals/Codersera)", "96.40%", "#2, neutral harness[5]"],
          ["Terminal-Bench (reference harness)", "54.68%", "vs official 87.9[4]"],
          ["Mindstudio 8-question", "76.25%", "ties Muse Spark 1.2[6]"],
        ],
      },
      note: "Independent figures from the cited evals; harness choice explains most of the TB gap[4].",
    },
    {
      num: "04",
      title: "The Agent-Ready API Surface",
      description:
        "V4 Pro's API is agent-ready out of the box: Responses API, tool calling, thinking mode, and reasoning_effort all work at https://api.deepseek.com[3]. For Claude Code users, the Anthropic-compatible endpoint maps claude-opus* to deepseek-v4-pro automatically[7].",
      code: `from openai import OpenAI

client = OpenAI(api_key="...", base_url="https://api.deepseek.com")

# agent loop essentials in one call
resp = client.responses.create(
    model="deepseek-v4-pro",
    instructions="Coding agent: plan, edit files, run tests.",
    input="Implement retry logic in src/retry.ts",
    reasoning_effort="high",
    tools=[{"type": "function", "name": "run_shell", ...}],
)
print(resp.output_text)`,
      list: [
        "Responses API for stateful agent conversations[3].",
        "Tool calling with OpenAI-format function definitions[3].",
        "reasoning_effort low/high/max to balance depth vs cost[2].",
        "Anthropic endpoint for Claude Code / Copilot drop-in[7].",
      ],
      paragraphs: [
        "Two parameters matter most when tuning agent behavior: reasoning_effort and thinking. Default high is right for most loops; drop to low when the agent is doing mechanical edits and raise to max only for the reasoning-heavy step in the middle of a task[2]. Remember that thinking-mode tokens bill at output rates, so max effort on every step inflates the bill more than it helps[8].",
      ],
      note: "API surface per DeepSeek's Responses API and Anthropic API guides[3][7].",
    },
    {
      num: "05",
      title: "Building an Agent on V4 Pro",
      description:
        "For production agents, the cost math favors V4 Pro as the default brain: $0.022 per SWE-bench test at 96.40% accuracy[5]. Pair it with [[v4-pro-harness|the official Harness]] for the exact stack DeepSeek benchmarks on, or with OpenCode/Cursor for a lighter integration[3][8].",
      list: [
        "Start with reasoning_effort=high; drop to low for chat-like turns, raise to max only for the hardest steps[2].",
        "Keep shared prompt prefixes stable to maximize context-cache hits ($0.022 off-peak vs $0.66 miss per 1M after 8/16)[8].",
        "Use Responses API for agents, Chat Completions for batch pipelines[3].",
        "Tune against independent evals (54.68% TB with reference harness), not official numbers, for your own loop[4].",
      ],
      paragraphs: [
        "V4 Pro 0813 is the strongest open-source agent brain available today, with a real but narrowing gap to closed flagships on long-horizon autonomy[4][5]. The agent framework choice (Harness vs OpenCode vs Cursor) now matters as much as the model — measure your loop, not the leaderboard.",
        "Instrument your agent before scaling: log reasoning_effort, token spend, cache-hit rate, and per-task success on a small eval set. Because DeepSeek bills thinking tokens at output price and rewards cache reuse, a few percentage points of cache-hit improvement can outweigh a model upgrade on the same loop[8].",
      ],
      note: "Synthesis of official and independent sources as cited throughout.",
    },
  ],
  prevGuide: undefined,
  nextGuide: undefined,
  relatedGuides: [
    { title: "DeepSeek V4 Pro + DeepSeek Harness", slug: "v4-pro-harness" },
    { title: "DeepSeek V4 Pro Benchmarks: 0813 Scores", slug: "v4-pro-benchmarks" },
    { title: "DeepSeek V4 Pro Responses API & Codex Setup", slug: "v4-pro-responses-api" },
    { title: "DeepSeek V4 Pro Reasoning Effort Guide", slug: "v4-pro-reasoning-effort" },
    { title: "What Is DeepSeek V4 Pro? Specs & Pricing", slug: "v4-pro" },
  ],
  sources: [
    { label: "DeepSeek V4 Pro GA Release Notes", url: "https://api-docs.deepseek.com/news/news260813/" },
    { label: "DeepSeek-V4-Pro-0813 Model Card (Hugging Face)", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813" },
    { label: "DeepSeek Responses API Guide", url: "https://api-docs.deepseek.com/guides/responses_api/" },
    { label: "ExplainX: V4 Pro 0813 Terminal-Bench Analysis", url: "https://explainx.ai/blog/deepseek-v4-pro-0813-terminal-bench-cline-august-2026" },
    { label: "Codersera: V4 Pro 0813 Guide & Benchmarks", url: "https://codersera.com/blog/deepseek-v4-pro-0813-guide-2026/" },
    { label: "Mindstudio: DeepSeek V4 Pro 0813 Review", url: "https://www.mindstudio.ai/blog/deepseek-v4-pro-0813-benchmark-review" },
    { label: "DeepSeek Anthropic API Guide", url: "https://api-docs.deepseek.com/guides/anthropic_api/" },
    { label: "DeepSeek Models & Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
  ],
};
