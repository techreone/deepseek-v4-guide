import type { GuideContent } from "./types";

// target keyword: deepseek harness plugins
// content source: reference/topics/23-harness-usage-plugins.md (2026-08-16)
export const harnessPlugins: GuideContent = {
  slug: "harness-plugins",
  category: "TOOLS & EXTENSIONS",
  title: "DeepSeek Harness Plugins: The 616+ Community Extension Ecosystem",
  seoTitle: "DeepSeek Harness Plugins (616+ Extensions)",
  readTime: "7 MIN READ",
  updatedAt: "AUG 16, 2026",
  summary:
    "Everything is a plugin in DeepSeek Harness. How to install plugins with dsh, find 616+ community extensions, and which are worth installing.",
  toc: [
    { id: "step-1", label: "Why Plugins Are the Product" },
    { id: "step-2", label: "How to Install a Plugin" },
    { id: "step-3", label: "Where to Find Plugins" },
    { id: "step-4", label: "The Most Popular Plugins" },
    { id: "step-5", label: "Plugin Safety: What You Accept" },
  ],
  steps: [
    {
      num: "01",
      title: "Why Plugins Are the Product",
      description:
        "DeepSeek Harness is built around one idea: everything is a plugin. The Cordis kernel only mounts, unmounts, and resolves plugin dependencies — every agent capability lives in plugins: models, tools, skills, sessions, sandboxes, storage, loops, scheduling, and the UI[1].",
      paragraphs: [
        "That is why the plugin ecosystem exploded within days of the August 13, 2026 launch. Three days in, the community index listed 616 plugins, the official awesome-dsh-plugin list passed 4,519 stars, and the main repository passed 127,689 stars[2].",
        "You do not fork the harness to change behavior; you install or write a plugin. Capabilities are composed in configuration, and swapping one plugin is a config change, not a source change[1].",
      ],
      list: [
        "Models and providers are plugins (dsh-llm-pi-ai, dsh-llm-deepseek)",
        "Tools, skills, sandboxes, and sessions are plugins",
        "Even the agent loop, scheduling, and the UI are plugins",
      ],
    },
    {
      num: "02",
      title: "How to Install a Plugin",
      description:
        "Plugins are npm packages with a dsh.bundle manifest. Install them per profile with dsh plugin, which forwards to pnpm[2].",
      code: `# Install a plugin into the web profile
dsh plugin --profile web add <package-name>

# Install the community plugin market, then browse it
dsh plugin --profile web add dshmarket

# Chat-based plugin finder
dsh plugin --profile web add dsh-find-plugin

# Add a plugin to a headless/other profile the same way
dsh plugin --profile headless add <package-name>`,
      paragraphs: [
        "For publishers: add the dsh-plugin topic to your GitHub repo so the ecosystem lists discover it. The official recommendation for extending dsh is to publish a plugin rather than patch the source[2].",
        "The plugin model also means the harness UI itself is extensible: the desktop shell (deepseek-harness-desktop), the Web UI skin with task board and git graph (dsh-web-ui), and the Claude Code-style TUI (dsh-TUI) are all plugins you can stack on the same profile[3].",
      ],
      note: "Plugin configuration lives in the profile's cordis.patch.yml and the global $DSH_HOME/cordis.patch.yml. Configuration layers merge in order: bundle patches → profile patch → global patch → --patch overrides[2].",
    },
    {
      num: "03",
      title: "Where to Find Plugins",
      description:
        "Three discovery channels cover the ecosystem in August 2026[2].",
      list: [
        "awesome-dsh-plugin (official community list, 4,519★) — categorized: UI, Models & Providers, Sessions & Messages, Memory, Tools, Vision, Skills, Workflow, Notifications, Dev & Runtime, Plugin Markets",
        "deepseekharness.io — community index tracking 616 plugins",
        "dshmarket — the in-app plugin market you install with dsh plugin add dshmarket",
      ],
      paragraphs: [
        "Because the main repo has GitHub Issues disabled and accepts no external PRs, contribution happens through plugin publication and GitHub Discussions — which is exactly why the plugin channel is the growth surface[2].",
      ],
    },
    {
      num: "04",
      title: "The Most Popular Plugins",
      description:
        "Star counts as of August 16, 2026 — momentum indicators in the launch window[2].",
      table: {
        headers: ["Plugin", "Stars", "What it does"],
        rows: [
          ["nexu-io/open-design", "87,363", "Design plugin (open-source Claude Design alternative)"],
          ["anywhere-labs/deepseek-harness-desktop", "8,457", "Desktop shell for the harness"],
          ["zhu1090093659/dsh-web-ui", "3,295", "Web UI skin: task board, git graph"],
          ["liustack/modlens", "2,287", "First vision plugin (vision bridge)"],
          ["ccch1mneyyy/dsh-TUI", "1,490", "Claude Code-style terminal UI"],
          ["Js2Hou/dsh-mcp-manager", "—", "Visual MCP management"],
          ["Ceelog/dsh-plugins (dsh-plugin-setting-mcp)", "—", "Configure MCP from the settings panel"],
        ],
      },
      note: "For MCP wiring specifically, see the [[harness-mcp|MCP setup guide]]. For a Claude Code-style look, dsh-TUI is the fastest way to get familiar.",
    },
    {
      num: "05",
      title: "Plugin Safety: What You Accept",
      description:
        "Installing a plugin means running third-party code on your machine, with access to your files, credentials, and network[2].",
      paragraphs: [
        "The community's own security warning is blunt: tool approval does not sandbox plugin code. A plugin can read your files, use your stored API keys, and reach the network. Review unfamiliar plugins — read the source, check the stars and recency — before adding them to a profile that holds credentials[2].",
        "Recommended practice: test new plugins in a clean profile with no keys stored, then promote them to your working profile only after they behave.",
        "Building your own stack on top of the plugin model? The [[harness-cordis|Cordis architecture guide]] explains how plugins mount and compose, and the [[harness-tutorial|full tutorial]] walks through a plugin-backed agent setup end to end.",
      ],
      list: [
        "Install unfamiliar plugins into a credential-free profile first",
        "Prefer plugins from the official awesome list or with visible source",
        "Remember keys are stored in $DSH_HOME/.credentials.yaml and written-only",
      ],
    },
  ],
  relatedGuides: [
    { title: "DeepSeek Harness MCP Setup", slug: "harness-mcp" },
    { title: "DeepSeek Harness Web UI Guide", slug: "harness-web-ui" },
    { title: "DeepSeek Harness CLI Commands (dsh)", slug: "harness-terminal" },
    { title: "DeepSeek Harness: Everything Is a Plugin (Cordis Architecture)", slug: "harness-cordis" },
  ],
  sources: [
    { label: "DeepSeek Harness Official Site — Everything Is a Plugin", url: "https://deepseek.com/harness/en/" },
    { label: "deepseekharness.io — 616 Community Plugins Index", url: "https://deepseekharness.io/" },
    { label: "GitHub — awesome-dsh-plugin/awesome-dsh-plugin (official community list)", url: "https://github.com/awesome-dsh-plugin/awesome-dsh-plugin" },
    { label: "GitHub — deepseek-ai/deepseek-harness (CLI plugin docs)", url: "https://github.com/deepseek-ai/deepseek-harness" },
  ],
};
