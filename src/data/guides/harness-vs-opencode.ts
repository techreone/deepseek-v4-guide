import type { GuideContent } from "./types";

// target keyword: deepseek harness vs opencode
// content source: reference/topics/24-harness-integrations.md (2026-08-16)
export const harnessVsOpencode: GuideContent = {
  slug: "harness-vs-opencode",
  category: "COMPARISON",
  title: "DeepSeek Harness vs OpenCode: Agent Factory or Agent?",
  seoTitle: "DeepSeek Harness vs OpenCode (2026)",
  readTime: "6 MIN READ",
  updatedAt: "AUG 16, 2026",
  summary:
    "OpenCode is an open-source coding agent; DeepSeek Harness is an agent factory. Cost per task, architecture, and when to use each — compared with real numbers.",
  toc: [
    { id: "step-1", label: "The Category Difference" },
    { id: "step-2", label: "Cost per Task: Real Numbers" },
    { id: "step-3", label: "A/B Testing Methodology" },
    { id: "step-4", label: "Ecosystem Maturity Timeline" },
    { id: "step-5", label: "Which One Should You Use?" },
  ],
  steps: [
    {
      num: "01",
      title: "The Category Difference",
      description:
        "OpenCode is an open-source, single-toolchain coding agent in the OpenAI lineage. DeepSeek Harness (dsh) is defined by its own developers as an agent development and runtime environment — a plugin-driven 'agent factory' rather than a ready-to-use agent[1].",
      paragraphs: [
        "That distinction shapes everything. OpenCode ships as a working agent you install and point at a model. dsh ships as a runtime where you compose the agent from plugins — models, tools, sessions, sandboxes, and even the loop itself — and then run it, with a full Standard-mode agent included as the default bundle[2].",
        "In practice both can do the same job today: install, pick a model, start editing code. The difference shows up when you want to change how the agent behaves — swap a tool, replace the sandbox, or run headless in CI.",
      ],
      list: [
        "OpenCode: ready-to-use open-source coding agent (OpenAI ecosystem)",
        "dsh: agent factory — assemble capabilities from plugins, run the result",
        "Both are free, open source, and model-neutral",
      ],
    },
    {
      num: "02",
      title: "Cost per Task: Real Numbers",
      description:
        "Which harness you choose changes your token bill, because the harness decides how many tool calls a task burns. A Composio benchmark on DeepSeek V4 Flash measured per-task spend across agent harnesses (August 11, 2026)[3].",
      table: {
        headers: ["Harness", "Cost per task (DeepSeek V4 Flash)"],
        rows: [
          ["DeepAgents", "$0.045"],
          ["Hermes", "$0.056+"],
          ["OpenCode", "$0.073"],
          ["Codex", "higher than OpenCode"],
        ],
      },
      paragraphs: [
        "dsh did not ship in that particular table, but the pattern is the point: harness efficiency is a first-order cost driver. Fewer tool calls per task means fewer tokens and faster completions, independent of model price[3].",
        "If you are comparing dsh against OpenCode on cost, run both on the same DeepSeek model and measure tokens per task — the model bill is identical, so the harness is the variable.",
      ],
      note: "DeepSeek also bills KV-cache hits at a deep discount, and the harness layer changes cache-prefix hit rates. The cheapest combination is a cache-friendly harness on a cache-aware model[4].",
    },
    {
      num: "03",
      title: "A/B Testing Methodology",
      description:
        "Community benchmarkers split harness comparisons into two clean tracks so results stay interpretable[5].",
      list: [
        "Track A: same DeepSeek model on both harnesses — isolates harness differences",
        "Track B: each tool with its recommended native settings — measures the full product experience",
        "dsh ships a Minimal mode (bash + str_replace_editor only) designed for fair model benchmarks[2]",
      ],
      paragraphs: [
        "Minimal mode is worth calling out: it strips dsh to two tools so a model can be scored in a controlled environment. That is exactly what DeepSeek used for its own public agent benchmark numbers on [[flash-benchmarks|V4 Flash 0731]].",
        "For your own comparison, Track A answers 'which runtime executes better on my model', Track B answers 'which product would I rather live in'. Both are valid; just don't mix them.",
      ],
    },
    {
      num: "04",
      title: "Ecosystem Maturity Timeline",
      description:
        "A pre-launch roundup (August 7) judged dsh and its open-source harness peers as not-yet-mature on plugins, MCP, community, and bug-fix velocity, and advised waiting[6]. Three days after the August 13 launch, that assessment flipped: the plugin index passed 616 extensions and the repo passed 127K stars, with an official community plugin list (awesome-dsh-plugin) already at 4.5K stars[2].",
      paragraphs: [
        "OpenCode's ecosystem is older and quieter. It has a solid single-toolchain experience and a stable community, but it does not have a plugin market, because it is not a plugin platform.",
        "Maturity assessment for August 2026: OpenCode is the safer, more conservative choice; dsh is the fast-moving platform with breaking changes still ahead. The [[harness-plugins|plugin ecosystem guide]] has the full inventory.",
      ],
    },
    {
      num: "05",
      title: "Which One Should You Use?",
      description:
        "Pick by job, not by hype.",
      list: [
        "Use OpenCode if you want one stable agent, a small footprint, and no interest in composing your own stack",
        "Use DeepSeek Harness if you want to assemble a custom agent, swap models freely, or run a fully auditable loop",
        "Use dsh headless in CI for one-shot tasks (dsh --profile headless \"<task>\")[2]",
        "Cost-sensitive teams on DeepSeek V4 Flash should A/B both and watch tool-call counts",
      ],
      paragraphs: [
        "Both agents run the same models, so the decision is about control versus convenience. For the bigger picture — how dsh sits above and below other agents — read the [[harness-tutorial|end-to-end tutorial]], and for the incumbent comparison see [[harness-vs-claude-code|dsh vs Claude Code]].",
      ],
    },
  ],
  relatedGuides: [
    { title: "DeepSeek Harness vs Claude Code", slug: "harness-vs-claude-code" },
    { title: "DeepSeek Harness CLI Commands (dsh)", slug: "harness-terminal" },
    { title: "DeepSeek Harness Plugins: 616+ Community Extensions", slug: "harness-plugins" },
    { title: "Use DeepSeek V4 Flash with OpenCode", slug: "flash-opencode" },
  ],
  sources: [
    { label: "GitHub — deepseek-ai/deepseek-harness README (agent development/runtime environment)", url: "https://github.com/deepseek-ai/deepseek-harness" },
    { label: "DeepSeek Harness Official Site — Modes & Everything Is a Plugin", url: "https://deepseek.com/harness/en/" },
    { label: "Composio — Best Agent Harness for DeepSeek V4 Flash (cost per task)", url: "https://composio.dev/content/best-agent-harness-deepseek-v4-flash" },
    { label: "alphalab — DeepSeek Harness A/B Methodology & KV cache", url: "https://www.alphalab.site/deepseek-harness" },
    { label: "tenten — 2026 DeepSeek V4 Flash Coding Agent Roundup (OpenCode/Codex/Claude Code)", url: "https://university.tenten.co/t/2026-deepseek-v4-flash-coding-agent-opencode-codex-claude-code/2501" },
  ],
};
