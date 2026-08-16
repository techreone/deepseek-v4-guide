import type { GuideContent } from "./types";

// target keyword: deepseek harness web ui
// content source: reference/topics/23-harness-usage-plugins.md (2026-08-16)
export const harnessWebUi: GuideContent = {
  slug: "harness-web-ui",
  category: "TUTORIAL",
  title: "DeepSeek Harness Web UI: Complete Guide to dsh Web",
  seoTitle: "DeepSeek Harness Web UI Guide",
  readTime: "6 MIN READ",
  updatedAt: "AUG 16, 2026",
  summary:
    "DeepSeek Harness's local Web UI at 127.0.0.1:3080: launch with dsh web, choose a workspace, trace every run in Trajectory view, and manage sessions.",
  toc: [
    { id: "step-1", label: "What the Web UI Is" },
    { id: "step-2", label: "Launching the UI" },
    { id: "step-3", label: "Workspaces: The Launch-Directory Trap" },
    { id: "step-4", label: "Trajectory View: Audit Every Run" },
    { id: "step-5", label: "Sessions: Resume, Fork, Search, Replay" },
    { id: "step-6", label: "Custom Ports & Profiles" },
  ],
  steps: [
    {
      num: "01",
      title: "What the Web UI Is",
      description:
        "The dsh Web UI is the default interface of DeepSeek Harness — a local application served at 127.0.0.1:3080 that gives you the full agent experience without touching the CLI[1].",
      paragraphs: [
        "It is a plugin too, like everything else in the harness. The default bundle ships it, and community skins exist (dsh-web-ui adds a task board and git graph)[2].",
      ],
    },
    {
      num: "02",
      title: "Launching the UI",
      description:
        "One npm command starts the Web UI: npx @deepseek-ai/dsh web. No clone, no build, no configuration required[1].",
      code: `# One-line launch (needs Node.js installed)
npx @deepseek-ai/dsh web

# Open http://127.0.0.1:3080 in your browser

# Or from source
git clone https://github.com/deepseek-ai/deepseek-harness.git
cd deepseek-harness
pnpm install
pnpm run build
pnpm dsh web`,
      note: "dsh web is an alias for dsh --profile web. The first launch auto-initializes the web profile[1].",
    },
    {
      num: "03",
      title: "Workspaces: The Launch-Directory Trap",
      description:
        "The dsh process uses its launch directory as the default filesystem location. In the Web UI you must explicitly choose a workspace (your project directory) before opening a session — starting from the wrong directory leaves you with an empty workspace[1].",
      list: [
        "Web UI flow: launch dsh web → Choose workspace → open a session",
        "The workspace becomes the agent's file root",
        "Launch dsh from a neutral directory, then pick the project in the UI",
      ],
      paragraphs: [
        "This is the single most common confusion in early hands-on reports: users launch dsh inside one folder, expect another, and see no files. Set the workspace explicitly in the UI[3].",
        "Tip: launch dsh from a neutral directory (for example your home folder), then use the workspace chooser to open the project you intend to edit. That keeps the launch directory decoupled from the session root.",
      ],
    },
    {
      num: "04",
      title: "Trajectory View: Audit Every Run",
      description:
        "Every run is traceable. dsh records everything the model sees in an append-only session log: system prompts, reasoning, tool calls and results, subagent scheduling, and every context injection[4].",
      paragraphs: [
        "The Trajectory view lets you inspect these records by source. That means you can see exactly what a model was shown before it acted — the audit trail competitors do not expose.",
        "For teams with compliance or cost-audit needs, this is a headline feature: the full input stream is inspectable after the fact[4].",
        "Concretely: open a finished session, switch to Trajectory, and filter by source to see only system prompts, only tool results, or only subagent scheduling events. Every entry links back to the session timeline, so a suspicious tool result is one click from its cause.",
      ],
    },
    {
      num: "05",
      title: "Sessions: Resume, Fork, Search, Replay",
      description:
        "All session operations run on the same event stream that powers the Trajectory view[4].",
      list: [
        "Resume — continue a session where it stopped",
        "Fork — branch a session into a new direction",
        "Search — find any recorded tool call or context injection",
        "Replay — re-run the recorded event stream",
      ],
    },
    {
      num: "06",
      title: "Custom Ports & Profiles",
      description:
        "The port is an app parameter, and launcher flags come before app parameters[1].",
      code: `# Run the web UI on a custom port
dsh --profile web --port 8080

# Inspect the merged config tree without launching
dsh --dump-config`,
      paragraphs: [
        "Profiles isolate plugin sets and configuration: a dedicated profile per project or per experiment keeps the UI clean. Community projects like deepseek-harness-desktop wrap the Web UI in a desktop shell[2].",
        "Prefer keyboard-driven work? The community dsh-TUI plugin offers a Claude Code-style terminal UI as an alternative[2].",
      ],
      note: "Next steps: wire external tools through the [[harness-mcp|MCP setup guide]], or extend the UI itself with [[harness-plugins|community plugins]].",
    },
  ],
  relatedGuides: [
    { title: "DeepSeek Harness Quickstart", slug: "harness-quickstart" },
    { title: "DeepSeek Harness CLI Commands (dsh)", slug: "harness-terminal" },
    { title: "DeepSeek Harness Plugins: 616+ Community Extensions", slug: "harness-plugins" },
    { title: "DeepSeek Harness Install Guide", slug: "harness-install" },
  ],
  sources: [
    { label: "DeepSeek Harness docs — user guide (Web UI, workspaces, profiles)", url: "https://raw.githubusercontent.com/deepseek-ai/deepseek-harness/master/docs/user/guide/index.md" },
    { label: "GitHub — awesome-dsh-plugin (dsh-web-ui, deepseek-harness-desktop, dsh-TUI)", url: "https://github.com/awesome-dsh-plugin/awesome-dsh-plugin" },
    { label: "open-harness.net — DeepSeek Harness Complete Guide", url: "https://www.open-harness.net/" },
    { label: "DeepSeek Harness Official Site — Every run is traceable / Trajectory view", url: "https://deepseek.com/harness/en/" },
  ],
};
