import type { GuideContent } from "./types";

// target keyword: deepseek harness vs claude code
// content source: reference/topics/24-harness-integrations.md + 23-harness-usage-plugins.md (2026-08-16)
export const harnessVsClaudeCode: GuideContent = {
  slug: "harness-vs-claude-code",
  category: "COMPARISON",
  title: "DeepSeek Harness vs Claude Code: Which Agent Framework Wins in 2026?",
  seoTitle: "DeepSeek Harness vs Claude Code (2026)",
  readTime: "7 MIN READ",
  updatedAt: "AUG 16, 2026",
  summary:
    "DeepSeek Harness vs Claude Code: MIT open-source plugin runtime vs a mature closed agent — architecture, model freedom, cost, and ecosystem compared.",
  toc: [
    { id: "step-1", label: "The One-Sentence Difference" },
    { id: "step-2", label: "Feature-by-Feature Comparison Table" },
    { id: "step-3", label: "Architecture: Plug-in Runtime vs Single Toolchain" },
    { id: "step-4", label: "The 262 MiB Claude Code Removal Story" },
    { id: "step-5", label: "Cost: Free Runtime vs Subscription" },
    { id: "step-6", label: "Real-World Impressions" },
    { id: "step-7", label: "Which One Should You Pick?" },
  ],
  steps: [
    {
      num: "01",
      title: "The One-Sentence Difference",
      description:
        "DeepSeek Harness (dsh) is an MIT-licensed agent runtime where everything — models, tools, sessions, sandboxes, even the agent loop itself — is a swappable plugin[1], while Claude Code is a mature, closed-source coding agent optimized for Anthropic models[2].",
      paragraphs: [
        "Both are marketed as 'coding agents', but they sit at different levels. Media coverage calls dsh a 'direct rival to Claude Code', and the comparison is fair on features. The structural difference is that dsh is a chassis you assemble from plugins, while Claude Code is a finished product with a plugin layer on top[2].",
        "This one distinction drives almost every other difference in the table below: openness, model freedom, customizability, and how the community contributes.",
      ],
      list: [
        "dsh: agent factory — you compose capabilities from plugins",
        "Claude Code: finished agent — you configure it and add MCP/skills/plugins",
      ],
    },
    {
      num: "02",
      title: "Feature-by-Feature Comparison Table",
      description:
        "Here is the side-by-side every 'deepseek harness vs claude code' search is looking for, compiled from official docs and multi-source community coverage (August 14-16, 2026)[2][3].",
      table: {
        headers: ["Dimension", "DeepSeek Harness (dsh)", "Claude Code"],
        rows: [
          ["Open source", "MIT, full source on GitHub (127K+ stars in 3 days)", "Closed source"],
          ["Architecture", "Everything is a plugin (Cordis kernel); agent loop is pluggable", "Single toolchain + MCP/skills/plugins"],
          ["Models", "Any OpenAI-compatible provider; defaults to DeepSeek V4", "Optimized for Claude models"],
          ["Interface", "Local Web UI (127.0.0.1:3080) + CLI / headless", "Terminal CLI + IDE plugins"],
          ["Traceability", "Append-only session log + Trajectory view", "Session history"],
          ["Modes", "Standard / Code / Minimal / Creator presets", "Single agent mode"],
          ["Cost", "Free open source (pay only model API)", "Subscription + API"],
          ["Ecosystem", "616+ community plugins in 3 days", "Mature MCP / plugin market"],
        ],
      },
      note: "Star counts and plugin counts are moving fast in the launch window (Aug 13-16, 2026) — treat them as directional evidence of momentum, not stable metrics[3].",
    },
    {
      num: "03",
      title: "Architecture: Plug-in Runtime vs Single Toolchain",
      description:
        "The dsh architecture is the point of the product. Built on the Cordis meta-framework, the Cordis kernel handles plugin mounting, unmounting, and dependency resolution, and every agent capability — models, tools, skills, sessions, sandboxes, storage, loops, scheduling, UI — is a plugin[1].",
      paragraphs: [
        "Claude Code takes the opposite route: a tightly integrated agent with MCP, Agent Skills, and plugins bolted on as extension points. That gives it polish and consistency out of the box, but the core loop is not user-replaceable[2].",
        "The practical consequence: with dsh you can swap the model provider, replace the sandbox, add a scheduling loop, or fork the whole loop into a custom mode — all from configuration, without touching the source. With Claude Code you work within the product's own extension model.",
        "Because models are plugins, dsh ships neutral: you can run it against DeepSeek V4, Claude, GPT, or Gemini through a custom provider — a point Anthropic's product cannot match[1][4].",
      ],
      code: `# dsh: swap the model provider without touching source
# (add a custom OpenAI-compatible endpoint via the Web UI,
#  or via $DSH_HOME/settings.yaml with a providers block)

llm-pi-ai:
  providers:
    my-gateway:
      api: openai-completions
      baseURL: https://gateway.example/v1
      models:
        - id: legacy-chat`,
    },
    {
      num: "04",
      title: "The 262 MiB Claude Code Removal Story",
      description:
        "A telling detail from the launch coverage: early release candidates of dsh actually shipped with Claude Code components bundled inside — then DeepSeek cut them before the official release[5].",
      paragraphs: [
        "The early build (0.0.1-rc.5) weighed about 586 MiB and included Claude Code internals, which critics saw as DeepSeek borrowing the incumbent's code. The official rc removed those components, trimming the package to roughly 262 MiB. Old builds remain on the npm registry, so pin your install to a current version[5].",
        "The saga matters for two reasons: it shows how closely DeepSeek studied Claude Code when building the harness, and it sharpens the 'clean-room vs borrowed' debate that runs under every dsh-vs-Claude-Code discussion.",
      ],
      note: "Always install the latest dsh rc. Version drift to early 0.0.1 builds pulls in deprecated bundled components and missing fixes — see the [[harness-error-fix|common errors guide]] for install gotchas.",
    },
    {
      num: "05",
      title: "Cost: Free Runtime vs Subscription",
      description:
        "The pricing models are structurally different, and that is often the deciding factor for solo developers.",
      paragraphs: [
        "dsh is free and open source (MIT). You pay only for the model API you route through it — which can be [[flash-pricing|DeepSeek V4 Flash at $0.14/M input]] or any other provider you configure. Claude Code charges a subscription on top of model API costs[2].",
        "The real cost comparison is therefore the model bill × the harness's efficiency. Community cost tests with DeepSeek V4 Flash measured per-task spend across harnesses: roughly $0.045 (DeepAgents) to $0.073 (OpenCode) — the harness itself changes your token economics because it decides how many tool calls a task burns[6].",
        "With dsh you also control caching: the harness layer affects KV-cache prefix hits, and DeepSeek bills cache hits at a steep discount, so harness×model choices land directly on the invoice[4].",
      ],
    },
    {
      num: "06",
      title: "Real-World Impressions",
      description:
        "Three days after launch the community verdict is enthusiastic but provisional. Hacker News discussion passed 680 points on day one; Reddit users called the architecture 'a whole different level' after installing dsh; YouTube comparisons ran under titles like 'The Results Surprised Me'[2].",
      paragraphs: [
        "Chinese-language hands-on coverage reported a 30-second install with some rough edges along the way — the kind of friction you expect from a developer preview[2].",
        "The honest take from most testers: completion quality depends on the model × harness × tools × cache combination, not on a single 'who is better' answer. dsh gives you the freedom to tune that combination; Claude Code gives you a known-good default.",
      ],
      note: "dsh is a developer preview with official warnings about compatibility-breaking changes ahead. For production-critical work in August 2026, test both against your own repos before committing — see the [[harness-tutorial|full tutorial]] for a repeatable setup.",
    },
    {
      num: "07",
      title: "Which One Should You Pick?",
      description:
        "Choose based on what you optimize for, not on star counts.",
      list: [
        "Pick Claude Code if you want a polished, supported, predictable agent on Anthropic models and don't need to fork the loop",
        "Pick DeepSeek Harness if you want model freedom, full auditability, plugin-level customization, or DeepSeek-native pricing",
        "Try dsh first if you already pay DeepSeek API bills — the harness is free and the model is the cheapest part",
        "Run both in parallel for two weeks on real tasks; the A/B method beats any benchmark table",
      ],
      paragraphs: [
        "Related reading: the architectural detail lives in the [[harness-cordis|Cordis architecture guide]], and if you are comparing against the other big open-source agent, see [[harness-vs-opencode|DeepSeek Harness vs OpenCode]].",
      ],
    },
  ],
  relatedGuides: [
    { title: "DeepSeek Harness vs OpenCode: What's Different?", slug: "harness-vs-opencode" },
    { title: "DeepSeek Harness: Everything Is a Plugin (Cordis Architecture)", slug: "harness-cordis" },
    { title: "DeepSeek Harness Plugins: 616+ Community Extensions", slug: "harness-plugins" },
    { title: "DeepSeek Harness with Claude Code: Integration & Migration", slug: "harness-claude-code" },
    { title: "DeepSeek V4 Flash Pricing: Token Costs & Savings", slug: "flash-pricing" },
  ],
  sources: [
    { label: "DeepSeek Harness Official Site — Everything Is a Plugin", url: "https://deepseek.com/harness/en/" },
    { label: "Yahoo TW News — DeepSeek Open-Sources Harness (dsh), Aims at Claude Code", url: "https://tw.news.yahoo.com/deepseek-%E6%AD%A3%E5%BC%8F%E9%96%8B%E6%BA%90%E8%87%AA%E5%AE%B6%E7%B7%A8%E7%A8%8B%E6%87%89%E7%94%A8-deepseek-harness-dsh-230820472.html" },
    { label: "GitHub — deepseek-ai/deepseek-harness README", url: "https://github.com/deepseek-ai/deepseek-harness" },
    { label: "omniakey blog — DeepSeek Harness Custom Provider Setup", url: "https://omniakey.com/blog/deepseek-harness-omniakey-setup" },
    { label: "Medium — DeepSeek Cut 262 MiB of Claude Code From Its New Harness", url: "https://medium.com/@richardhightower/deepseek-harness-launches-deepseek-harness-vs-grok-build-are-they-the-claude-code-killer-c7259fa1d507" },
    { label: "Composio — Best Agent Harness for DeepSeek V4 Flash (cost per task)", url: "https://composio.dev/content/best-agent-harness-deepseek-v4-flash" },
  ],
};
