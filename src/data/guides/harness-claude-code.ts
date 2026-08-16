import type { GuideContent } from "./types";

// target keyword: deepseek harness claude code
// content source: reference/topics/24-harness-integrations.md + 23-harness-usage-plugins.md (2026-08-16)
export const harnessClaudeCode: GuideContent = {
  slug: "harness-claude-code",
  category: "TUTORIAL",
  title: "DeepSeek Harness with Claude Code: Integrate or Migrate",
  seoTitle: "DeepSeek Harness + Claude Code Guide",
  readTime: "6 MIN READ",
  updatedAt: "AUG 16, 2026",
  summary:
    "Use DeepSeek Harness alongside or instead of Claude Code. ACP integration, the subagent pattern, and what a migration looks like in August 2026.",
  toc: [
    { id: "step-1", label: "Two Ways to Combine Them" },
    { id: "step-2", label: "Keep Claude Code, Add dsh as a Subagent" },
    { id: "step-3", label: "ACP Channel: Drive dsh from Claude-Style Clients" },
    { id: "step-4", label: "Full Migration Checklist" },
    { id: "step-5", label: "What You Give Up" },
  ],
  steps: [
    {
      num: "01",
      title: "Two Ways to Combine Them",
      description:
        "DeepSeek's own positioning is that dsh is 'less a competitor, more a framework that can sit above them' — you can call Claude Code or Codex as a subagent from inside dsh[1]. That opens two practical setups: run both in parallel, or migrate fully.",
      paragraphs: [
        "The parallel setup keeps your existing Claude Code muscle memory and adds dsh where its strengths pay off: model freedom, full traceability, and plugin-level customization. The migration path moves your workflows to dsh and closes the Claude subscription[2].",
        "Either way, the mechanics are the same: both tools speak the same kinds of protocols, and dsh's ACP/MCP channels make the handoff explicit.",
      ],
    },
    {
      num: "02",
      title: "Keep Claude Code, Add dsh as a Subagent",
      description:
        "dsh can treat Claude Code (and Codex) as callable subagents, so you delegate the model-specific work while dsh owns orchestration[1].",
      list: [
        "dsh orchestrates; Claude Code executes model-specific tasks as a subagent",
        "You keep Claude Code's strengths without abandoning the harness",
        "The subagent pattern is a first-class plugin capability, not a hack",
      ],
      paragraphs: [
        "This is the 'sit above them' architecture: dsh is the chassis, Claude Code is one of the tools plugged in. Teams that cannot drop Anthropic for certain workloads (long-form reasoning, specific tooling) use this hybrid to keep one runtime.",
      ],
    },
    {
      num: "03",
      title: "ACP Channel: Drive dsh from Claude-Style Clients",
      description:
        "If you want the reverse — drive dsh from a client you already use — the community ACP plugin exposes dsh as an Agent Client Protocol server, and ACP-capable editors (Cursor, Zed, JetBrains) connect to it[3].",
      code: `# Install the ACP channel and start the stdio server
dsh plugin --profile acp add @jeremy9682/dsh-acp
dsh --profile acp

# Point your ACP client at the server; dsh now appears
# alongside or instead of Claude Code in the same editor`,
      note: "Model choice inside dsh is a config field, not a fork: the same profile can route to DeepSeek V4, Claude, GPT, or Gemini through providers — see the [[harness-model|model configuration guide]].",
    },
    {
      num: "04",
      title: "Full Migration Checklist",
      description:
        "For teams moving from Claude Code to dsh, here is the practical order[2][4].",
      list: [
        "Install dsh and open the Web UI (npx @deepseek-ai/dsh web)",
        "Add your model provider (DeepSeek first; add others later)",
        "Port MCP servers — dsh uses MCP via plugins (see [[harness-mcp|MCP setup]])",
        "Recreate Agent Skills as dsh skills plugins",
        "Re-map your keybindings/scripts to dsh --profile headless",
        "Run two weeks of parallel A/B on real repos before dropping the subscription",
      ],
      note: "Remember dsh is a developer preview with breaking changes ahead — keep a Claude Code fallback until your critical workflows pass on dsh. The compatibility risk is real in August 2026[2].",
    },
    {
      num: "05",
      title: "What You Give Up",
      description:
        "A fair migration comparison lists what you lose as well as what you gain.",
      table: {
        headers: ["You gain with dsh", "You give up vs Claude Code"],
        rows: [
          ["MIT open source, self-hostable, auditable loop", "First-party Anthropic support and roadmap"],
          ["Any model, any provider, no subscription", "Polished managed MCP/plugin market"],
          ["Pluggable everything (loop, UI, sandbox)", "Known-good default agent behavior"],
          ["Append-only session log + Trajectory view", "Claude Code's mature CLI ergonomics"],
        ],
      },
      paragraphs: [
        "The 262 MiB story matters here too: early dsh rcs shipped bundled Claude Code components that were later removed. If you find Claude Code internals inside a dsh install, you are on an old rc — upgrade[2].",
      ],
    },
  ],
  relatedGuides: [
    { title: "DeepSeek Harness vs Claude Code", slug: "harness-vs-claude-code" },
    { title: "DeepSeek Harness MCP Setup", slug: "harness-mcp" },
    { title: "Use DeepSeek Harness with Cursor", slug: "harness-cursor" },
    { title: "Connect Claude Code & Claude Desktop to DeepSeek V4 with CC Switch", slug: "cc-switch-claude-code" },
  ],
  sources: [
    { label: "mindstudio.ai — DeepSeek Harness: agentic coding system that can call Claude Code/Codex as subagents", url: "https://www.mindstudio.ai/blog/deepseek-harness-agentic-coding" },
    { label: "Yahoo TW News — DeepSeek Open-Sources Harness (dsh)", url: "https://tw.news.yahoo.com/deepseek-%E6%AD%A3%E5%BC%8F%E9%96%8B%E6%BA%90%E8%87%AA%E5%AE%B6%E7%B7%A8%E7%A8%8B%E6%87%89%E7%94%A8-deepseek-harness-dsh-230820472.html" },
    { label: "GitHub — jeremy9682/dsh-cursor-codex (ACP channel)", url: "https://github.com/jeremy9682/dsh-cursor-codex" },
    { label: "open-harness.net — DeepSeek Harness Complete Guide (chassis model, rc.6)", url: "https://www.open-harness.net/" },
  ],
};
