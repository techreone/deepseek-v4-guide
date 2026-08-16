import type { GuideContent } from "./types";

// target keyword: deepseek harness tutorial
// content source: reference/topics/23-harness-usage-plugins.md + 24-harness-integrations.md (2026-08-16)
export const harnessTutorial: GuideContent = {
  slug: "harness-tutorial",
  category: "TUTORIAL",
  title: "DeepSeek Harness Tutorial: Build Your First Agent, End to End",
  seoTitle: "DeepSeek Harness Tutorial (Full Guide)",
  readTime: "10 MIN READ",
  updatedAt: "AUG 16, 2026",
  summary:
    "A complete DeepSeek Harness tutorial: install dsh, add a model, run your first agent, install plugins, wire MCP, and debug like a pro.",
  toc: [
    { id: "step-1", label: "What You'll Build" },
    { id: "step-2", label: "Install dsh" },
    { id: "step-3", label: "Add a Model Provider" },
    { id: "step-4", label: "Run Your First Agent" },
    { id: "step-5", label: "Understand the Four Modes" },
    { id: "step-6", label: "Add Plugins & MCP" },
    { id: "step-7", label: "Debug with the Trajectory View" },
  ],
  steps: [
    {
      num: "01",
      title: "What You'll Build",
      description:
        "By the end of this tutorial you will have a working DeepSeek Harness agent that edits code, runs shell commands, calls tools, and keeps a full audit log — all on your local machine[1].",
      list: [
        "Install the harness (one npm command)",
        "Connect a model provider (DeepSeek first)",
        "Run an agent task in the Web UI",
        "Add a community plugin and an MCP server",
        "Debug a run using the Trajectory view",
      ],
    },
    {
      num: "02",
      title: "Install dsh",
      description:
        "The fastest path needs only Node.js[1][2].",
      code: `# One-line install + launch
npx @deepseek-ai/dsh web

# If you prefer building from source
git clone https://github.com/deepseek-ai/deepseek-harness.git
cd deepseek-harness
pnpm install
pnpm run build
pnpm dsh web

# The UI opens at http://127.0.0.1:3080`,
      note: "dsh is a developer preview: the official README warns THERE WILL BE COMPATIBILITY-BREAKING CHANGES. Pin versions and re-test after upgrades[2].",
    },
    {
      num: "03",
      title: "Add a Model Provider",
      description:
        "In the Web UI, go to Settings → Models. Add your DeepSeek API key — it is stored in $DSH_HOME/.credentials.yaml and becomes write-only after saving[3].",
      paragraphs: [
        "dsh ships model-neutral: the default bundle points at DeepSeek, but you can add Anthropic, OpenAI, or any custom OpenAI-compatible endpoint. Custom providers need a Provider ID, baseURL, API protocol, credential, and model list; the UI can fetch available models from endpoints that support GET /models[3].",
        "Model changes apply on the next request — no restart needed.",
      ],
      list: [
        "DeepSeek native: Settings → Models → paste API key",
        "Catalog providers (Anthropic/OpenAI): pick provider, enter key",
        "Custom endpoint: Provider ID + baseURL + protocol + models",
      ],
    },
    {
      num: "04",
      title: "Run Your First Agent",
      description:
        "Back in the UI, choose a workspace (your project folder), open a new session, and give the agent a real task[4].",
      code: `# In the Web UI session box, try:
"Read src/main.ts, explain what it does, and fix the two obvious bugs"

# Or from the terminal (one-shot):
dsh --profile headless "Read src/main.ts and list the bugs"`,
      paragraphs: [
        "The agent will edit files, run shell commands, and report back. Everything it sees and does is recorded, so you can review the run in the Trajectory view afterwards[5].",
      ],
      note: "The workspace matters: dsh uses the chosen workspace as the agent's file root. Pick the project directory, not your home folder[4].",
    },
    {
      num: "05",
      title: "Understand the Four Modes",
      description:
        "The default bundle ships four runtime presets, each a different plugin composition[1][5].",
      table: {
        headers: ["Mode", "What it is", "Best for"],
        rows: [
          ["Standard", "Full coding agent: file editing, shell, file/web search, skills, planning, goals, subagents, workflows", "Everyday agent work"],
          ["Code", "All Standard capabilities + Code Mode SDK (model writes one TypeScript program to orchestrate multi-step ops)", "Complex multi-step tasks"],
          ["Minimal", "Two-tool agent (persistent bash + str_replace_editor)", "Model benchmarking"],
          ["Creator", "Inspect the runtime, test Cordis plugins in memory, compose new modes", "Plugin development"],
        ],
      },
    },
    {
      num: "06",
      title: "Add Plugins & MCP",
      description:
        "Everything is a plugin, so extending the agent is a package install[2][6].",
      code: `# Add a community plugin
dsh plugin --profile web add <package-name>

# Add the plugin market to browse
dsh plugin --profile web add dshmarket

# MCP arrives via plugins too — see the MCP guide
dsh plugin --profile web add dsh-plugin-setting-mcp`,
      paragraphs: [
        "Security first: installing a plugin runs third-party code with access to your files and keys. Test unknown plugins in a credential-free profile before promoting them[6].",
      ],
    },
    {
      num: "07",
      title: "Debug with the Trajectory View",
      description:
        "When a run misbehaves, open the Trajectory view for that session. It shows the append-only event log by source: system prompts, reasoning, tool calls and results, subagent scheduling, context injections[5].",
      list: [
        "Find the exact prompt the model received",
        "Inspect each tool call and its result",
        "Check where context was injected or truncated",
        "Resume, fork, search, or replay from any event",
      ],
      paragraphs: [
        "This turns 'the agent did something weird' into a reviewable transcript — the debugging story that closed-source agents cannot offer.",
        "If the error is credential or model related, the [[harness-error-fix|troubleshooting guide]] covers the official error table (MISSING_CREDENTIAL, UNKNOWN_MODEL, image refusals).",
      ],
    },
  ],
  relatedGuides: [
    { title: "DeepSeek Harness Quickstart", slug: "harness-quickstart" },
    { title: "DeepSeek Harness Install Guide", slug: "harness-install" },
    { title: "DeepSeek Harness CLI Commands (dsh)", slug: "harness-terminal" },
    { title: "DeepSeek Harness Plugins: 616+ Community Extensions", slug: "harness-plugins" },
    { title: "DeepSeek Harness MCP Setup", slug: "harness-mcp" },
  ],
  sources: [
    { label: "DeepSeek Harness Official Site — modes & everything is a plugin", url: "https://deepseek.com/harness/en/" },
    { label: "GitHub — deepseek-ai/deepseek-harness README (install, breaking changes)", url: "https://github.com/deepseek-ai/deepseek-harness" },
    { label: "DeepSeek Harness docs — providers & credentials", url: "https://raw.githubusercontent.com/deepseek-ai/deepseek-harness/master/docs/user/guide/providers.md" },
    { label: "DeepSeek Harness docs — user guide (workspaces)", url: "https://raw.githubusercontent.com/deepseek-ai/deepseek-harness/master/docs/user/guide/index.md" },
    { label: "DeepSeek Harness Official Site — every run is traceable", url: "https://deepseek.com/harness/en/" },
    { label: "GitHub — awesome-dsh-plugin (plugin safety warning)", url: "https://github.com/awesome-dsh-plugin/awesome-dsh-plugin" },
  ],
};
