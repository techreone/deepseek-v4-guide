import type { GuideContent } from "./types";

// target keyword: deepseek harness cursor
// content source: reference/topics/24-harness-integrations.md (2026-08-16)
export const harnessCursor: GuideContent = {
  slug: "harness-cursor",
  category: "TUTORIAL",
  title: "Use DeepSeek Harness with Cursor: ACP, MCP & Headless Integration",
  seoTitle: "DeepSeek Harness + Cursor Integration",
  readTime: "7 MIN READ",
  updatedAt: "AUG 16, 2026",
  summary:
    "dsh has no official IDE plugin, but dsh-cursor-codex adds three channels: ACP, MCP, and headless. Set up DeepSeek Harness with Cursor in minutes.",
  toc: [
    { id: "step-1", label: "Why You Need a Bridge" },
    { id: "step-2", label: "Channel 1: ACP (Agent Client Protocol)" },
    { id: "step-3", label: "Channel 2: MCP Tools for Cursor" },
    { id: "step-4", label: "Channel 3: Headless One-Shot Tasks" },
    { id: "step-5", label: "The One-Click Open Editor Plugin" },
    { id: "step-6", label: "Workflow Tips" },
  ],
  steps: [
    {
      num: "01",
      title: "Why You Need a Bridge",
      description:
        "DeepSeek Harness ships with a local Web UI and a CLI, but no official IDE plugin. The community dsh-cursor-codex project (August 15, 2026) fills the gap with three integration channels, verified against dsh 0.1.0-rc.6[1].",
      paragraphs: [
        "The goal is simple: keep Cursor as your editor and let dsh do the agent work — or delegate from Cursor into dsh without leaving the IDE.",
      ],
      list: [
        "Official dsh: Web UI + CLI + headless, no IDE plugin",
        "Community bridge: ACP channel, MCP channel, headless channel",
        "Verified on dsh 0.1.0-rc.6 (Aug 15, 2026)",
      ],
    },
    {
      num: "02",
      title: "Channel 1: ACP (Agent Client Protocol)",
      description:
        "ACP is the emerging standard for connecting editors to agents. With dsh's ACP plugin, your ACP-capable client (Cursor, Zed, JetBrains) can drive the harness directly[1].",
      code: `# Install the ACP channel
dsh plugin --profile acp add @jeremy9682/dsh-acp

# Start the ACP stdio server
dsh --profile acp

# Then point an ACP client (Cursor / Zed / JetBrains) at this server`,
      note: "ACP support in Cursor and JetBrains is evolving fast in 2026 — check your IDE's ACP client settings and the dsh-cursor-codex README for the current wiring.",
    },
    {
      num: "03",
      title: "Channel 2: MCP Tools for Cursor",
      description:
        "The same project ships a zero-dependency MCP stdio server exposing dsh_delegate and dsh_health as MCP tools. Merge its cursor template into your ~/.cursor/mcp.json and Cursor gains dsh as callable tools[1].",
      code: `# 1. Install the MCP server plugin (per profile)
dsh plugin --profile web add <mcp-server-package>

# 2. Merge the cursor template into your Cursor config
#    templates/cursor/mcp.json  ->  ~/.cursor/mcp.json

# 3. Reload Cursor, then:
#    dsh_delegate "<task>"   — hand a task to the harness
#    dsh_health              — check profile status`,
      paragraphs: [
        "Codex users configure the same server through dsh.config.toml instead of the Cursor JSON.",
        "This channel is the reverse of the [[harness-mcp|MCP setup guide]]: here dsh itself becomes an MCP server consumed by the IDE.",
      ],
    },
    {
      num: "04",
      title: "Channel 3: Headless One-Shot Tasks",
      description:
        "No protocol needed for one-off jobs — dsh's headless profile runs a session, prints the final answer, and exits[2].",
      code: `# Run a single task without a UI
dsh --profile headless "Refactor src/utils.ts and run the tests"`,
      paragraphs: [
        "Headless mode is ideal for delegating from an IDE keybind, a CI job, or a terminal alias. Non-zero exit codes signal a failed command/config/startup, which makes it scriptable[2].",
      ],
    },
    {
      num: "05",
      title: "The One-Click Open Editor Plugin",
      description:
        "For the opposite direction — jumping from a dsh session into your editor — the community plugin dsh-plugin-open-editor adds a header button that opens the current project in your local editor: VS Code, Cursor, JetBrains, or Vim[1].",
      paragraphs: [
        "The common real-world workflow reported by testers: run the harness in a terminal (or Web UI), use Cursor as the IDE, and let the open-editor plugin sync the project context. 'Terminal harness + Cursor IDE, both doing their thing'[1].",
      ],
      list: [
        "dsh session header → one click → open project in Cursor",
        "Supported editors: VS Code, Cursor, JetBrains, Vim",
      ],
    },
    {
      num: "06",
      title: "Workflow Tips",
      description:
        "Based on early hands-on reports and the integration project's own docs[1].",
      list: [
        "Use headless for quick delegated tasks from the editor; use ACP when you want full agent-in-IDE",
        "Keep your dsh profile dedicated to one project to avoid workspace confusion (dsh uses the launch directory as its filesystem root)[2]",
        "Store DeepSeek keys once in the Models screen; they are written-only afterwards[3]",
        "For model-side Cursor setup (the older proxy route for V4 Pro reasoning_content), see [[v4-pro-cursor|V4 Pro with Cursor]]",
      ],
      note: "Stuck on any step? The [[harness-error-fix|common errors guide]] has the official troubleshooting table, and the [[harness-mcp|MCP guide]] covers server wiring in depth.",
    },
  ],
  relatedGuides: [
    { title: "DeepSeek Harness MCP Setup", slug: "harness-mcp" },
    { title: "DeepSeek Harness CLI Commands (dsh)", slug: "harness-terminal" },
    { title: "DeepSeek Harness Common Errors & Fixes", slug: "harness-error-fix" },
    { title: "DeepSeek V4 Pro with Cursor", slug: "v4-pro-cursor" },
  ],
  sources: [
    { label: "GitHub — jeremy9682/dsh-cursor-codex (ACP/MCP/headless channels)", url: "https://github.com/jeremy9682/dsh-cursor-codex" },
    { label: "GitHub — deepseek-ai/deepseek-harness (apps/cli README: profiles & headless)", url: "https://raw.githubusercontent.com/deepseek-ai/deepseek-harness/master/apps/cli/README.md" },
    { label: "DeepSeek Harness docs — providers & credentials", url: "https://raw.githubusercontent.com/deepseek-ai/deepseek-harness/master/docs/user/guide/providers.md" },
    { label: "GitHub — awesome-dsh-plugin (dsh-plugin-open-editor)", url: "https://github.com/awesome-dsh-plugin/awesome-dsh-plugin" },
  ],
};
