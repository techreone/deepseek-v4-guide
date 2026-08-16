import type { GuideContent } from "./types";

// 目标关键词：deepseek harness
// 内容来源：reference/topics/21-deepseek-harness-release.md + 23-harness-usage-plugins.md + 24-harness-integrations.md（2026-08-16 更新）
// 状态变更：Harness 已于 2026-08-13 发布 v0.1 developer preview（MIT 开源），本文从"未发布预告"改写为"已发布"视角
export const deepseekHarness: GuideContent = {
  slug: "deepseek-harness",
  category: "AGENT FRAMEWORK",
  title: "DeepSeek Harness: Release, Install & Plugin Guide",
  seoTitle: "DeepSeek Harness: Release, Install & Plugins",
  readTime: "9 MIN READ",
  updatedAt: "AUG 16, 2026",
  summary:
    "DeepSeek Harness (dsh) v0.1 is out: an MIT-licensed, plugin-first agent framework where every capability is a plugin. Release, install, modes, plugins.",
  toc: [
    { id: "step-1", label: "Step 1: What Is DeepSeek Harness?" },
    { id: "step-2", label: "Step 2: Release Timeline: From Changelog to v0.1" },
    { id: "step-3", label: "Step 3: How to Install DeepSeek Harness" },
    { id: "step-4", label: "Step 4: The Four Runtime Modes" },
    { id: "step-5", label: "Step 5: Everything Is a Plugin: The Ecosystem" },
    { id: "step-6", label: "Step 6: Harness vs Claude Code: Two Different Bets" },
    { id: "step-7", label: "Step 7: Should You Use It?" },
  ],
  steps: [
    {
      num: "01",
      title: "What Is DeepSeek Harness?",
      description:
        "DeepSeek Harness (CLI: dsh) is DeepSeek's official agent framework, released as a developer preview on August 13, 2026 with the source code open-sourced under the MIT license the same day[1][2].",
      paragraphs: [
        "The core idea is 'Everything is a plugin': models, tools, skills, sessions, sandboxes, storage, the agent loop, scheduling, and even the UI are all plugins that can be swapped, replaced, or recomposed in configuration without touching the Harness source code[1]. The framework is built on Cordis, a plugin meta-framework whose kernel handles plugin mounting, unmounting, and dependencies[1].",
        "DeepSeek frames it with a simple formula: Agent = Model + Harness. The model is the soul of an agent; the harness is everything that keeps it working in a real environment — understanding its environment, using tools, and staying on task[1].",
        "It is deliberately model-agnostic: nothing forces you to use DeepSeek models. You can point it at any OpenAI-compatible endpoint, including Claude, GPT, or a company gateway[3].",
      ],
      list: [
        "Released Aug 13, 2026 as developer preview; MIT license, source included[1][2]",
        "GitHub: deepseek-ai/deepseek-harness; npm: @deepseek-ai/dsh[2]",
        "Built on Cordis: every agent capability lives in a plugin[1]",
        "Every run is traceable via an append-only session log with a Trajectory view[1]",
        "Four runtime presets: Standard, Code, Minimal, Creator[1]",
      ],
      note: "The name in the wild: repo deepseek-ai/deepseek-harness (127K+ stars in three days[2]), npm package @deepseek-ai/dsh, official page deepseek.com/harness[1]. See the [[what-is-deepseek-harness|full explainer]] for a deeper architecture walkthrough.",
    },
    {
      num: "02",
      title: "Release Timeline: From Changelog to v0.1",
      description:
        "The Harness went from a footnote in the July 31 changelog to a public release in under two weeks. Here is the timeline as it actually happened.",
      table: {
        headers: ["Date", "Event", "Status"],
        rows: [
          ["Jul 31, 2026", "V4-Flash-0731 changelog names the Harness minimal mode: 'to be released soon'; all nine official agent benchmarks were run with it", "Confirmed"],
          ["Jul 28-Aug 10", "Media reports of internal testing and an NDA-style closed beta window (Aug 10-20)", "Reported"],
          ["Aug 13, 2026", "Harness v0.1 developer preview released: source code, official page, and X announcement", "Confirmed[1][2][4]"],
          ["Aug 14-16, 2026", "Community explosion: 38K stars day one, ~127K stars and 616 community plugins by Aug 16", "Confirmed[2][5]"],
        ],
      },
      paragraphs: [
        "The changelog entry that started it all read: 'For the Code Agent tasks in the public benchmark sets, the official DeepSeek-V4-Flash was tested using the DeepSeek Harness minimal mode (to be released soon) as the framework, with the max effort level, topp=0.95, and temperature=1.0.'[6]",
        "The release came bundled with [[v4-pro|DeepSeek V4 Pro]]'s GA on the same day — the flagship's agent benchmarks are measured on the Harness, so the two ship as one story[1][4].",
      ],
      note: "Version today is 0.1.0-rc.6 on npm. The README explicitly warns there will be compatibility-breaking changes — treat upgrades carefully during the preview[2].",
    },
    {
      num: "03",
      title: "How to Install DeepSeek Harness",
      description:
        "The fastest path is one npm command. It launches the local Web UI, which by default listens on http://127.0.0.1:3080.",
      code: `# One-line install + launch (Web UI on http://127.0.0.1:3080)
npx @deepseek-ai/dsh web

# Or build from source
git clone https://github.com/deepseek-ai/deepseek-harness.git
cd deepseek-harness
pnpm install
pnpm run build
pnpm dsh web`,
      list: [
        "Headless mode for one-shot jobs: dsh --profile headless \"<task>\"",
        "Named profiles live in $DSH_HOME/profiles/<name>; web and headless auto-initialize on first use",
        "The launch directory is your default file system position — pick your project folder, then choose a workspace in the Web UI[2]",
        "Need Node.js first; source builds require pnpm (the repo is a pnpm workspace)[2]",
      ],
      paragraphs: [
        "After launch, the Web UI asks you to choose a workspace (your project directory), then you can start a session. Everything else — models, tools, skills — is configured through the UI or the $DSH_HOME/settings.yaml file[3].",
        "For a step-by-step walkthrough with screenshots and the mistakes people hit, see the [[harness-install|DeepSeek Harness install guide]]; for first-run troubleshooting, see [[harness-error-fix|common errors and fixes]].",
      ],
      note: "Security note from the community: installing a plugin runs third-party code. The tool-approval flow does not sandbox plugin code, so test unfamiliar plugins in an environment without real credentials[5].",
    },
    {
      num: "04",
      title: "The Four Runtime Modes",
      description:
        "DeepSeek Harness ships with four composable runtime presets. They share the same plugin system, so any capability can be swapped between them.",
      table: {
        headers: ["Mode", "What it includes", "Best for"],
        rows: [
          ["Standard", "Full coding agent: file editing, shell, file/web search, skills, planning, goals, subagents, workflows", "Day-to-day agentic coding"],
          ["Code", "All of Standard plus the Code Mode SDK — the model composes multi-step operations in one TypeScript program", "Complex multi-step tasks the model can plan ahead"],
          ["Minimal", "Two tools only: persistent bash + str_replace_editor", "Benchmarking models in a minimal environment"],
          ["Creator", "Inspect the runtime, test Cordis plugins in memory, combine them into new modes", "Plugin developers and power users"],
        ],
      },
      paragraphs: [
        "The Minimal mode is what DeepSeek used to produce every official agent benchmark number — including V4 Pro's 0813 scores (Terminal-Bench 2.1 87.9, Cybergym 83.3)[1][7]. Treat official agent scores as a Harness-plus-model result, not model-only.",
        "Every run is recorded in an append-only session log: system prompts, reasoning, tool calls and results, subagent scheduling, and context injections. The Trajectory view lets you inspect these by source, and resume, fork, search, and replay all operate on the same event stream[1].",
      ],
      note: "Modes are presets, not silos — Creator mode exists precisely so you can compose a new mode from existing plugins[1].",
    },
    {
      num: "05",
      title: "Everything Is a Plugin: The Ecosystem",
      description:
        "The plugin ecosystem is the reason the Harness exploded. By August 16, three days after release, the repo had ~127K stars and community indexes listed 616 plugins[2][5].",
      paragraphs: [
        "Plugins are installed per profile, either by package name or from a plugin market:",
        "dsh plugin --profile web add <package>   # any npm package with a dsh.bundle manifest",
        "dsh plugin --profile web add dshmarket    # one-command plugin market",
        "dsh plugin --profile web add dsh-find-plugin  # chat-style plugin search",
        "The official community list is awesome-dsh-plugin (4.5K stars), organized into categories: UI Enhancements, Models & Providers, Sessions & Messages, Memory, Tools & Capabilities, Vision & Multimodal, Skills, Workflow & Automation, Notifications, Development & Runtime, and Plugin Markets[5].",
      ],
      list: [
        "nexu-io/open-design — design plugin (87K stars), open-source Claude Design alternative[5]",
        "anywhere-labs/deepseek-harness-desktop — desktop shell (8.4K stars)[5]",
        "liustack/modlens — first vision plugin (vision bridge)[5]",
        "MCP managers: dsh-mcp-manager (visual) and dsh-plugin-setting-mcp (settings panel)[5]",
        "TUI skins like ccch1mneyyy/dsh-TUI for a Claude Code-style terminal[5]",
      ],
      note: "The repo does not accept external PRs and GitHub Issues are disabled; feedback flows through GitHub Discussions and Discord. The intended extension path is publishing your own plugin with the dsh-plugin topic tag[2][5].",
    },
    {
      num: "06",
      title: "Harness vs Claude Code: Two Different Bets",
      description:
        "Media immediately branded the Harness a 'Claude Code killer,' but the architecture is a different bet: Claude Code is a finished assistant, DeepSeek Harness is the chassis you assemble an agent from.",
      table: {
        headers: ["Dimension", "DeepSeek Harness (dsh)", "Claude Code"],
        rows: [
          ["Open source", "MIT, full source", "Closed source"],
          ["Architecture", "Everything is a plugin; the agent loop itself is swappable (Cordis kernel)", "Single toolchain + MCP / skills / plugins"],
          ["Models", "Model-agnostic — any OpenAI-compatible provider", "Optimized for Claude models"],
          ["Run surface", "Local Web UI (127.0.0.1:3080) + CLI / headless", "Terminal CLI + IDE plugins"],
          ["Traceability", "Append-only session log + Trajectory view", "Session history"],
          ["Price", "Free (MIT); you pay model API costs", "Subscription + API costs"],
          ["Maturity", "Developer preview, breaking changes warned", "Mature, production-proven"],
        ],
      },
      paragraphs: [
        "Two details make the comparison concrete. First, dsh can call Claude Code or Codex as sub-agents — it is 'less a competitor, more a framework that can sit above them'[8]. Second, early release candidates briefly bundled Claude Code internals (about 262 MiB); the final rc removed them, and the older build still lingers on npm[9].",
        "The community take after hands-on testing: completion quality depends on the model × harness × tools × cache combination, not a single 'who wins.' For the direct feature comparison, see [[harness-vs-claude-code|Harness vs Claude Code]]; for the OpenCode comparison, see [[harness-vs-opencode|Harness vs OpenCode]].",
      ],
      note: "Vendor position, not a benchmark verdict: if you want a finished, supported product today, Claude Code works out of the box. If you want a plugin-first runtime you control, the Harness is the more open path[8].",
    },
    {
      num: "07",
      title: "Should You Use It?",
      description:
        "The honest answer depends on your appetite for preview-era breakage and how much you value the plugin architecture.",
      list: [
        "Yes, if: you want full control of your agent runtime, plan to build custom tools/skills, or want to run V4 Pro/Flash agentic workloads with the official framework[1].",
        "Yes, if: you want a model-agnostic harness — one runtime for DeepSeek, Claude, GPT, or a company gateway[3].",
        "Hold off if: you need a stable, supported product for production-critical pipelines — the preview explicitly warns of compatibility-breaking changes[2].",
        "Hold off if: you can't accept the extension model (no PRs, no Issues — plugins are the only supported extension path)[2].",
      ],
      paragraphs: [
        "Practical middle ground: run the Web UI locally for experiments, keep Claude Code or Codex for production, and evaluate the Harness on real tasks as the ecosystem matures. The four official signals from the pre-release era have now all fired — changelog mention, repo under deepseek-ai, official X announcement, and a product page — so what remains is stability, not existence.",
        "If you are new to the ecosystem, start with the [[harness-quickstart|quickstart]], then read [[harness-plugins|the plugin guide]] and the [[harness-tutorial|full tutorial]]. Pair it with [[v4-pro|DeepSeek V4 Pro]] for the flagship agent experience.",
      ],
      note: "Everything in this guide is as of August 16, 2026. The preview moves fast — check the GitHub README before upgrading.",
    },
  ],
  prevGuide: {
    title: "Connect Claude Code & Claude Desktop to DeepSeek V4 with CC Switch",
    slug: "cc-switch-claude-code",
  },
  nextGuide: {
    title: "DeepSeek V4 Technical Report Explained: Architecture & Benchmarks",
    slug: "official-tech-report",
  },
  relatedGuides: [
    { title: "What Is DeepSeek Harness? Plugin-First Agent Framework", slug: "what-is-deepseek-harness" },
    { title: "How to Install DeepSeek Harness (dsh)", slug: "harness-install" },
    { title: "DeepSeek Harness Plugins: The 600+ Ecosystem", slug: "harness-plugins" },
    { title: "DeepSeek Harness vs Claude Code", slug: "harness-vs-claude-code" },
    { title: "DeepSeek V4 Pro: GA Release, Pricing & Benchmarks (0813)", slug: "v4-pro" },
  ],
  sources: [
    { label: "DeepSeek Harness Official Page", url: "https://deepseek.com/harness/en/" },
    { label: "GitHub: deepseek-ai/deepseek-harness", url: "https://github.com/deepseek-ai/deepseek-harness" },
    { label: "DeepSeek Harness Provider Docs (docs/user/guide/providers.md)", url: "https://raw.githubusercontent.com/deepseek-ai/deepseek-harness/master/docs/user/guide/providers.md" },
    { label: "DeepSeek X Announcement", url: "https://x.com/deepseek_ai/status/2087887408440164663" },
    { label: "awesome-dsh-plugin: Community Plugin List", url: "https://github.com/awesome-dsh-plugin/awesome-dsh-plugin" },
    { label: "DeepSeek API Changelog (Jul 31, 2026)", url: "https://api-docs.deepseek.com/updates/" },
    { label: "DeepSeek-V4-Pro-0813 Model Card (Hugging Face)", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813" },
    { label: "mindstudio.ai: DeepSeek Harness — Agentic Coding Explained", url: "https://www.mindstudio.ai/blog/deepseek-harness-agentic-coding" },
    { label: "Medium: DeepSeek Harness vs Grok Build — Claude Code Killer?", url: "https://medium.com/@richardhightower/deepseek-harness-launches-deepseek-harness-vs-grok-build-are-they-the-claude-code-killer-c7259fa1d507" },
  ],
};
