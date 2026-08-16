import type { GuideContent } from "./types";

// 目标关键词：deepseek harness cordis
// 内容来源：reference/topics/21-deepseek-harness-release.md + 23-harness-usage-plugins.md（2026-08-16 定稿）
export const harnessCordis: GuideContent = {
  slug: "harness-cordis",
  category: "GUIDE",
  title: "DeepSeek Harness Cordis Architecture: How the Plugin Kernel Works",
  seoTitle: "DeepSeek Harness Cordis Architecture",
  readTime: "8 MIN READ",
  updatedAt: "AUG 16, 2026",
  summary:
    "Inside DeepSeek Harness's Cordis kernel: plugin mounting, services and events between plugins, and why 'everything is a plugin' changes how agents are built.",
  toc: [
    { id: "step-1", label: "Step 1: Why a Kernel at All" },
    { id: "step-2", label: "Step 2: What the Cordis Kernel Does" },
    { id: "step-3", label: "Step 3: Services and Events" },
    { id: "step-4", label: "Step 4: The Session Event Stream" },
    { id: "step-5", label: "Step 5: Modes as Plugin Compositions" },
    { id: "step-6", label: "Step 6: The Cordis Paper and Roadmap" },
  ],
  steps: [
    {
      num: "01",
      title: "Why a Kernel at All",
      description:
        "DeepSeek's design bet is that an agent runtime should be a dynamically composed collection of plugins rather than one giant application. The kernel exists to keep that composition sane: mounting, unmounting, and dependency resolution are the only things it owns[1].",
      paragraphs: [
        "Every agent capability lives in a plugin: models, tools, skills, sessions, sandboxes, storage, loops, scheduling, and the UI. Because the loop itself is a plugin, changing how the agent reasons between steps is a configuration change rather than a fork[1][2].",
      ],
      note: "This is the architectural claim behind 'everything is a plugin' — see [[what-is-deepseek-harness|What Is DeepSeek Harness?]] for the user-level explanation.",
    },
    {
      num: "02",
      title: "What the Cordis Kernel Does",
      description:
        "The Cordis kernel manages three things for every plugin: mounting, unmounting, and dependencies[1].",
      list: [
        "Mounting: activating a plugin in the runtime and registering its capabilities",
        "Unmounting: safely removing a plugin (and any plugins that depend on it)",
        "Dependencies: resolving which plugins require which, in the right order",
      ],
      paragraphs: [
        "The kernel is intentionally minimal. It does not implement tool calling, memory, or any agent behavior itself — those come from plugins. That separation is what lets you swap a sandbox provider or a model adapter without touching the core[1].",
      ],
    },
    {
      num: "03",
      title: "Services and Events",
      description:
        "Plugins cooperate through two mechanisms: Cordis services and Cordis events[1].",
      paragraphs: [
        "A service is a capability one plugin publishes that other plugins can consume (for example, a search service, a storage service, or a sandbox service). Events are messages flowing through the runtime — tool-call results, subagent scheduling, context injections — that plugins can listen to and act on.",
        "This is the same pattern used by mature plugin ecosystems: the kernel stays stable, the behavior comes from the graph of services and event handlers.",
      ],
    },
    {
      num: "04",
      title: "The Session Event Stream",
      description:
        "Traceability is built on the event stream, not on ad-hoc logging. Everything the model sees is recorded in an append-only session log: system prompts, reasoning, tool calls and results, subagent scheduling, and every context injection[1].",
      paragraphs: [
        "The Trajectory view lets you inspect these records by source. Resume, fork, search, and replay all operate on the same event stream — which is exactly what makes a harness useful for debugging agent behavior in production[1].",
      ],
      code: `Session log (append-only):
- system prompts
- reasoning tokens
- tool calls + results
- subagent scheduling
- context injections

Operations on the stream:
- resume / fork / search / replay`,
      note: "For the benchmark angle of traceability, see [[harness-benchmark|harness benchmarks]] — the official scores come from the minimal-mode composition of this same system.",
    },
    {
      num: "05",
      title: "Modes as Plugin Compositions",
      description:
        "The four runtime modes are not special code paths — they are preset bundle compositions of plugins[1]:",
      table: {
        headers: ["Mode", "Composition", "Typical use"],
        rows: [
          ["Standard", "File editor + shell + search + skills + planning + goals + subagents + workflows", "Day-to-day coding agent"],
          ["Code", "Standard + Code Mode SDK (TypeScript multi-step orchestration)", "Complex multi-step automation"],
          ["Minimal", "Persistent bash + str_replace_editor only", "Benchmarking models"],
          ["Creator", "Runtime inspection + in-memory plugin testing", "Plugin development"],
        ],
      },
      paragraphs: [
        "Because modes are just bundles, you can build your own: combine a subset of Standard's tools with a custom model adapter, then launch it as a named profile via dsh --profile <name>[2].",
      ],
    },
    {
      num: "06",
      title: "The Cordis Paper and Roadmap",
      description:
        "DeepSeek published the Cordis paper alongside the preview, linked from the official harness page. It describes the kernel design and the dependency model in formal terms[1].",
      paragraphs: [
        "The official roadmap signals point at: plugin API stabilization before 1.0, more official plugins across models/tools/sandboxes, and DeepSeek's own agent product built on the harness (hinted at by hiring materials about a desktop agent product). The repo does not accept PRs — evolution happens through new plugins and coordinated core releases[3].",
      ],
      note: "To start building on this architecture, read [[harness-setup|the setup guide]] for profiles and patches, then [[harness-plugins|the plugin ecosystem]].",
    },
  ],
  relatedGuides: [
    { title: "What Is DeepSeek Harness?", slug: "what-is-deepseek-harness" },
    { title: "DeepSeek Harness Setup Guide", slug: "harness-setup" },
    { title: "DeepSeek Harness Plugins", slug: "harness-plugins" },
    { title: "DeepSeek Harness GitHub Repository", slug: "harness-github" },
    { title: "DeepSeek Harness Sandbox", slug: "harness-sandbox" },
  ],
  sources: [
    { label: "DeepSeek Harness — Official Page", url: "https://deepseek.com/harness/en/" },
    { label: "deepseek-ai/deepseek-harness (GitHub)", url: "https://github.com/deepseek-ai/deepseek-harness" },
    { label: "The Complete Guide to dsh (open-harness.net)", url: "https://www.open-harness.net/" },
    { label: "dsh: Everything Is a Plugin (DeepSeek on X)", url: "https://x.com/deepseek_ai/status/2087887408440164663" },
  ],
};
