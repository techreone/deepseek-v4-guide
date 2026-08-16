import type { GuideContent } from "./types";

// 目标关键词：what is deepseek harness
// 内容来源：reference/topics/21-deepseek-harness-release.md + 23-harness-usage-plugins.md + 24-harness-integrations.md（2026-08-16 定稿）
export const whatIsDeepseekHarness: GuideContent = {
  slug: "what-is-deepseek-harness",
  category: "GUIDE",
  title: "What Is DeepSeek Harness? The Plugin-First Agent Framework Explained",
  seoTitle: "What Is DeepSeek Harness? Agent Framework",
  readTime: "9 MIN READ",
  updatedAt: "AUG 16, 2026",
  summary:
    "DeepSeek Harness (dsh) is DeepSeek's open-source agent framework where every capability — models, tools, even the loop — is a plugin. Released Aug 13, 2026.",
  toc: [
    { id: "step-1", label: "DeepSeek Harness in One Sentence" },
    { id: "step-2", label: "Agent = Model + Harness" },
    { id: "step-3", label: "Everything Is a Plugin: The Cordis Kernel" },
    { id: "step-4", label: "The Four Runtime Modes" },
    { id: "step-5", label: "How It Differs From Claude Code and OpenCode" },
    { id: "step-6", label: "Why It Exploded to 127K GitHub Stars" },
    { id: "step-7", label: "Should You Use It?" },
  ],
  steps: [
    {
      num: "01",
      title: "DeepSeek Harness in One Sentence",
      description:
        "DeepSeek Harness (CLI: dsh) is DeepSeek's open-source agent framework where every capability — models, tools, skills, sessions, sandboxes, storage, the agent loop, scheduling, and even the UI — is a plugin that can be swapped, replaced, or recomposed in configuration[1].",
      paragraphs: [
        "DeepSeek released it as a developer preview on August 13, 2026, with the source code open-sourced under the MIT license on the same day[2]. The framework is built on Cordis, a plugin meta-framework: the Cordis kernel handles plugin mounting, unmounting, and dependencies, while every agent capability lives in plugins[1].",
        "The result is deliberately unlike a finished assistant such as Claude Code. Independent guides describe dsh not as a ready-to-use agent but as the chassis you assemble an agent from — 'there is no privileged core to patch,' because even the default coding agent is itself just a composition of plugins[3].",
      ],
      list: [
        "Open source, MIT license, developer preview since Aug 13, 2026[2]",
        "Everything is a plugin: models, tools, skills, sessions, sandboxes, storage, loops, scheduling, UI[1]",
        "Built on the Cordis meta-framework (kernel manages plugin lifecycle and dependencies)[1]",
        "Model-agnostic — it does not force DeepSeek models[3]",
        "Every run is traceable via an append-only session log with a Trajectory view[1]",
      ],
      note: "Names in the wild: GitHub repo deepseek-ai/deepseek-harness, npm package @deepseek-ai/dsh, official page deepseek.com/harness[1].",
    },
    {
      num: "02",
      title: "Agent = Model + Harness",
      description:
        "DeepSeek defines the framework with one formula: Agent = Model + Harness. The model is the soul of an agent; the harness is everything that keeps it working in real-world environments[1].",
      paragraphs: [
        "In practice that means context management, tool calling, file read and write, terminal execution, self-correction driven by test feedback, memory, MCP wiring, and feedback loops all live outside the model — inside the harness[4]. DeepSeek's own job descriptions used the same framing during spring 2026 hiring: everything outside the model itself belongs to the Harness.",
        "Because the split is explicit, you can change one side without touching the other: swap the model provider without rebuilding the tool stack, or replace a tool plugin without retraining anything. That composability is the core design bet of the project.",
      ],
      code: `Agent = Model + Harness

The model is the soul of an agent.
A harness lets an agent understand its environment,
use tools, and keep working in real-world settings.
— DeepSeek Harness official docs`,
    },
    {
      num: "03",
      title: "Everything Is a Plugin: The Cordis Kernel",
      description:
        "DeepSeek Harness is built on Cordis's plugin system. Cordis services and events let plugins work together, and developers select, swap, or extend any capability in configuration — without changing the Harness source code[1].",
      paragraphs: [
        "Plugin categories are the full surface of an agent: models, tools, skills, sessions, sandboxes, storage, loops, scheduling, and the UI. The kernel only mounts, unmounts, and resolves dependencies between them; none of the agent behavior is privileged.",
        "This architecture is why the community calls it an 'agent factory' rather than a single agent: the same runtime can produce a minimal benchmark agent, a full coding assistant, or a custom multi-agent workflow by composing different plugin sets[3].",
      ],
      list: [
        "Cordis kernel: plugin mounting, unmounting, dependency resolution[1]",
        "Capabilities as plugins: models, tools, skills, sessions, sandboxes, storage, loops, scheduling, UI[1]",
        "Configuration composes plugins — no source changes needed[1]",
        "616+ community plugins indexed within days of launch[5]",
      ],
      note: "Plugin configuration lives in the profile's cordis.patch.yml and the global $DSH_HOME/cordis.patch.yml; layers merge in order[6].",
    },
    {
      num: "04",
      title: "The Four Runtime Modes",
      description:
        "dsh ships with four runtime presets, each a different plugin composition for a different job: Standard, Code, Minimal, and Creator[1].",
      table: {
        headers: ["Mode", "What It Does", "Best For"],
        rows: [
          ["Standard", "Full coding agent: file editing, shell, web search, skills, planning, goals, subagents, workflows", "Daily agent work"],
          ["Code", "Standard tools + Code Mode SDK — the model writes one TypeScript program to orchestrate multi-step operations", "Complex multi-step tasks"],
          ["Minimal", "Two-tool agent: persistent bash + str_replace_editor", "Fair model benchmarking"],
          ["Creator", "Inspect the runtime, test Cordis plugins in memory, combine them into new modes", "Building new presets"],
        ],
      },
      paragraphs: [
        "The modes matter because they are the same engine with different plugin sets. DeepSeek's own agent benchmarks were measured on Minimal mode, which is why benchmark scores travel with the harness configuration, not just the model[1].",
      ],
    },
    {
      num: "05",
      title: "How It Differs From Claude Code and OpenCode",
      description:
        "The media consensus is that dsh is positioned as a direct Claude Code rival, but the architecture is different: Claude Code is a mature closed-source product, while dsh is an open runtime where even the agent loop is replaceable[4].",
      paragraphs: [
        "Against [[harness-vs-opencode|OpenCode]], the difference is philosophical: OpenCode is a single-toolchain open-source agent; dsh is a plugin runtime you assemble an agent from. That makes dsh more flexible but less turnkey — expect a steeper initial setup in exchange for total control over tools, sandboxes, and the loop.",
        "The full feature-by-feature comparison lives in the [[harness-vs-claude-code|vs Claude Code guide]], including the early-rc note that DeepSeek cut a bundled Claude Code component (262 MiB) before the official release[4].",
      ],
      list: [
        "vs Claude Code: open vs closed source; plugin-runtime vs single toolchain[4]",
        "vs OpenCode: agent factory vs ready-made agent[3]",
        "Model-agnostic on both sides — you can run DeepSeek models in any harness[4]",
      ],
      note: "For a working comparison of cost per task across harnesses, see [[harness-benchmark|the benchmark guide]].",
    },
    {
      num: "06",
      title: "Why It Exploded to 127K GitHub Stars",
      description:
        "The repo hit 38K stars on day one and roughly 127K within three days — one of the fastest open-source launches of 2026[2][7].",
      paragraphs: [
        "The usual explanations line up: a famous lab open-sourcing its agent runtime under MIT, a genuinely different 'everything is a plugin' architecture, and timing — it landed in the same week as the V4 Pro GA, when DeepSeek attention was at its peak[7].",
        "Velocity is not maturity. The official README still warns of compatibility-breaking changes in the 0.1.0 release candidates, so production users should pin versions and follow the [[harness-github|GitHub guide]] for the roadmap.",
      ],
      note: "Star counts change quickly. Verify current numbers on the repo before quoting them in your own content[2].",
    },
    {
      num: "07",
      title: "Should You Use It?",
      description:
        "Choose dsh if you want an open, model-agnostic agent runtime with replaceable plugins, or if you need to benchmark models fairly in a minimal environment. Skip it for now if you need a polished turnkey assistant today[3].",
      paragraphs: [
        "For a working setup start with the [[harness-install|install guide]] (one line: npx @deepseek-ai/dsh web), then the [[harness-quickstart|quickstart]] and [[harness-tutorial|full tutorial]]. If you hit errors, the [[harness-error-fix|troubleshooting guide]] covers the common ones.",
        "Production caution: the developer preview is under active change, and the plugin ecosystem is young. Test plugins in a credential-free profile first, and pin your dsh version.",
      ],
      note: "Everything on this page is as of Aug 16, 2026 — dsh v0.1.0 developer preview. Official docs: deepseek.com/harness[1].",
    },
  ],
  relatedGuides: [
    { title: "How to Install DeepSeek Harness", slug: "harness-install" },
    { title: "DeepSeek Harness Plugins: The Full Ecosystem", slug: "harness-plugins" },
    { title: "DeepSeek Harness vs Claude Code", slug: "harness-vs-claude-code" },
    { title: "DeepSeek Harness vs OpenCode", slug: "harness-vs-opencode" },
    { title: "DeepSeek Harness Cordis Architecture", slug: "harness-cordis" },
  ],
  sources: [
    { label: "DeepSeek Harness Official Site — Everything Is a Plugin", url: "https://deepseek.com/harness/en/" },
    { label: "GitHub — deepseek-ai/deepseek-harness", url: "https://github.com/deepseek-ai/deepseek-harness" },
    { label: "open-harness.net — The Complete Guide to DeepSeek Harness", url: "https://www.open-harness.net/" },
    { label: "medium — DeepSeek Harness vs Claude Code analysis", url: "https://medium.com/@richardhightower/deepseek-harness-launches-deepseek-harness-vs-grok-build-are-they-the-claude-code-killer-c7259fa1d507" },
    { label: "deepseekharness.io — Community Plugins Index", url: "https://deepseekharness.io/" },
    { label: "GitHub — awesome-dsh-plugin (community list)", url: "https://github.com/awesome-dsh-plugin/awesome-dsh-plugin" },
    { label: "flowtivity — Why 95K (now 127K) GitHub Stars in Days", url: "https://flowtivity.ai/blog/deepseek-harness-open-source-agent-explained/" },
  ],
};
