import type { GuideContent } from "./types";

// target keyword: deepseek harness mcp
// content source: reference/topics/24-harness-integrations.md + 23-harness-usage-plugins.md (2026-08-16)
export const harnessMcp: GuideContent = {
  slug: "harness-mcp",
  category: "TUTORIAL",
  title: "DeepSeek Harness MCP Setup: Connect Model Context Protocol Servers",
  seoTitle: "DeepSeek Harness MCP Setup (2026)",
  readTime: "6 MIN READ",
  updatedAt: "AUG 16, 2026",
  summary:
    "DeepSeek Harness has no native MCP — it arrives via plugins. Setup dsh-plugin-setting-mcp, the dsh-mcp-lens gateway, and community MCP servers.",
  toc: [
    { id: "step-1", label: "How MCP Works in dsh" },
    { id: "step-2", label: "Option 1: Settings-Panel MCP Plugin" },
    { id: "step-3", label: "Option 2: dsh-mcp-lens Gateway" },
    { id: "step-4", label: "Option 3: Community MCP Server" },
    { id: "step-5", label: "Web Search MCP Plugins" },
    { id: "step-6", label: "Troubleshooting MCP Connections" },
  ],
  steps: [
    {
      num: "01",
      title: "How MCP Works in dsh",
      description:
        "DeepSeek Harness does not speak MCP natively — Model Context Protocol arrives as plugins, configured through the settings panel or cordis configuration[1].",
      paragraphs: [
        "Because everything in dsh is a plugin, MCP support is a family of plugins rather than one built-in protocol: an official community plugin for panel-based configuration, a gateway plugin for large tool directories, and community servers that expose dsh's own capabilities back to MCP clients like Cursor or Codex[1][2].",
      ],
      list: [
        "MCP integration is plugin-based, not a native protocol",
        "Configure via Settings → Plugins or cordis config layers",
        "Three main routes: settings plugin, gateway, community server",
      ],
    },
    {
      num: "02",
      title: "Option 1: Settings-Panel MCP Plugin",
      description:
        "The official community plugin dsh-plugin-setting-mcp lets you configure MCP servers from the dsh settings panel instead of hand-editing YAML[2].",
      code: `# Install the settings-panel MCP plugin into the web profile
dsh plugin --profile web add dsh-plugin-setting-mcp

# Then open the Web UI at http://127.0.0.1:3080
# Settings → Plugins → MCP → add your server URL / command
# (stdio servers are declared in the profile's cordis.patch.yml)`,
      note: "For users of the visual alternative, the community plugin dsh-mcp-manager (Js2Hou) provides a dedicated UI for managing MCP servers[2].",
    },
    {
      num: "03",
      title: "Option 2: dsh-mcp-lens Gateway",
      description:
        "If you maintain a large remote tool directory, dsh-mcp-lens acts as an MCP gateway with progressive disclosure: two stable interfaces for searching big tool catalogs, lazy connection, and bounded caching[1].",
      paragraphs: [
        "Progressive disclosure means the model only loads the tool definitions it actually queries — which keeps context small and latency low even when thousands of tools are registered. That is the pattern for enterprise MCP estates.",
        "The gateway is the right choice when a single MCP server would dump an overwhelming tool list into every request.",
      ],
    },
    {
      num: "04",
      title: "Option 3: Community MCP Server",
      description:
        "The dsh-cursor-codex project ships a zero-dependency MCP stdio server that exposes dsh itself as MCP tools — dsh_delegate and dsh_health — callable from Cursor or Codex[1].",
      code: `# Expose dsh as MCP tools for Cursor / Codex
# Merge the server into Cursor:
#   merge templates/cursor/mcp.json into ~/.cursor/mcp.json
# Codex uses dsh.config.toml instead

# dsh_delegate — hand a task to dsh from any MCP client
# dsh_health — check the harness profile status`,
      paragraphs: [
        "This is the reverse direction: instead of dsh consuming MCP servers, dsh becomes an MCP server. Combined with the [[harness-cursor|Cursor integration guide]], it closes the loop between the IDE and the harness.",
      ],
    },
    {
      num: "05",
      title: "Web Search MCP Plugins",
      description:
        "For agent web search, community plugins wrap existing search MCP services with DeepSeek-friendly defaults[1].",
      list: [
        "dsh-web-search-exa — keyless anonymous MCP fallback (mcp.exa.ai/mcp) plus keyed REST mode",
        "dsh-tavily — multiple-key rotation for Tavily",
      ],
      paragraphs: [
        "Both are drop-in tool plugins; add them with dsh plugin add and they register as agent search tools. Keys are stored per profile in $DSH_HOME/.credentials.yaml[3].",
      ],
    },
    {
      num: "06",
      title: "Troubleshooting MCP Connections",
      description:
        "Most MCP failures in dsh come from configuration layering or credential handling, not from the servers themselves[2][3].",
      list: [
        "Plugin not loading: confirm it is installed into the profile you launched (dsh plugin --profile web add ...)",
        "Server not reachable: check the URL/command in the profile's cordis.patch.yml",
        "Credential errors: store keys via the Models/settings screen — they are written to .credentials.yaml and not readable afterwards",
        "Changed config not applying: model and provider changes apply on the next request; plugin changes need a profile restart",
      ],
      note: "Stuck on a config-layer issue? The [[harness-error-fix|common errors guide]] covers MISSING_CREDENTIAL, UNKNOWN_MODEL, and the rest of the official troubleshooting table.",
    },
  ],
  relatedGuides: [
    { title: "DeepSeek Harness Plugins: 616+ Community Extensions", slug: "harness-plugins" },
    { title: "Use DeepSeek Harness with Cursor", slug: "harness-cursor" },
    { title: "DeepSeek Harness Common Errors & Fixes", slug: "harness-error-fix" },
    { title: "DeepSeek Harness with Claude Code", slug: "harness-claude-code" },
  ],
  sources: [
    { label: "GitHub — jeremy9682/dsh-cursor-codex (MCP server + Cursor/Codex integration)", url: "https://github.com/jeremy9682/dsh-cursor-codex" },
    { label: "GitHub — awesome-dsh-plugin (MCP plugins: dsh-plugin-setting-mcp, dsh-mcp-lens, dsh-web-search-exa)", url: "https://github.com/awesome-dsh-plugin/awesome-dsh-plugin" },
    { label: "DeepSeek Harness docs — providers & credentials ($DSH_HOME/.credentials.yaml)", url: "https://raw.githubusercontent.com/deepseek-ai/deepseek-harness/master/docs/user/guide/providers.md" },
  ],
};
