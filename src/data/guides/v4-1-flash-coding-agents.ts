import type { GuideContent } from "./types";

// target keyword: deepseek v4.1 flash opencode / coding agent
// 内容来源：reference/topics/27-v4-1-flash.md（API/接入 + 多脚手架表）+ 23/24 harness
export const v41FlashCodingAgents: GuideContent = {
  slug: "v4-1-flash-coding-agents",
  category: "INTEGRATION",
  title: "DeepSeek V4.1 Flash for Coding Agents: OpenCode, Claude Code & Harness",
  seoTitle: "DeepSeek V4.1 Flash Coding Agent Setup",
  readTime: "10 MIN READ",
  updatedAt: "SEP 11, 2026",
  summary:
    "How to run DeepSeek V4.1 Flash in Claude Code, OpenCode, OpenClaw and other coding agents: env vars, /connect, harness minimal mode and scaffold scores.",
  toc: [
    { id: "step-1", label: "Step 1: The Official Integrate with AI Tools Guide" },
    { id: "step-2", label: "Step 2: Claude Code Environment Variables" },
    { id: "step-3", label: "Step 3: OpenCode and the /connect Flow" },
    { id: "step-4", label: "Step 4: OpenClaw Onboarding" },
    { id: "step-5", label: "Step 5: Why Benchmarks Use Harness Minimal Mode" },
    { id: "step-6", label: "Step 6: The Multi-Scaffold Score Table" },
    { id: "step-7", label: "Step 7: WorkBuddy, CodeBuddy and Official Support" },
    { id: "step-8", label: "Step 8: Choosing an Agent and Migration Risks" },
  ],
  steps: [
    {
      num: "01",
      title: "The Official Integrate with AI Tools Guide",
      description:
        "DeepSeek maintains a dedicated Integrate with AI Tools page that documents the supported ways to point an existing coding agent at deepseek-flash. Rather than a bespoke integration per tool, DeepSeek exposes two compatible endpoints and lets each tool's own provider configuration do the rest[1].",
      paragraphs: [
        "That design is why V4.1 Flash slots into agents that were never written for DeepSeek. Claude Code, OpenCode and OpenClaw all speak one of those two protocols, so the integration is a configuration change rather than a plugin[1].",
        "The API model name is deepseek-flash. Both endpoints accept it, and both support tool calls, JSON output and the reasoning-effort parameter that governs agent behaviour[2][3].",
      ],
      list: [
        "OpenAI-compatible base_url: https://api.deepseek.com[1]",
        "Anthropic-compatible base_url: https://api.deepseek.com/anthropic[1]",
        "Model id: deepseek-flash[2]",
        "Official partners with first-class support: OpenCode and WorkBuddy, including CodeBuddy[3]",
      ],
      note: "Treat the official Integrate with AI Tools page as the source of truth, because tool-side config formats change between releases[1].",
    },
    {
      num: "02",
      title: "Claude Code Environment Variables",
      description:
        "For Claude Code, DeepSeek's guide sets the Anthropic base URL and then overrides each Claude model slot so it resolves to the DeepSeek model. The main slot uses deepseek-flash[1m], which requests the 1M-token context variant[1].",
      code: `export ANTHROPIC_BASE_URL="https://api.deepseek.com/anthropic"
export ANTHROPIC_API_KEY="<DeepSeek API Key>"

export ANTHROPIC_MODEL="deepseek-flash[1m]"
export ANTHROPIC_DEFAULT_OPUS_MODEL="deepseek-flash[1m]"
export ANTHROPIC_DEFAULT_SONNET_MODEL="deepseek-flash[1m]"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="deepseek-flash"
export CLAUDE_CODE_SUBAGENT_MODEL="deepseek-flash"
export CLAUDE_CODE_EFFORT_LEVEL="max"`,
      paragraphs: [
        "Two details matter. First, the [1m] suffix is how you opt into the long-context variant; the subagent and haiku slots use the plain deepseek-flash id because they run shorter, cheaper loops[1].",
        "Second, CLAUDE_CODE_EFFORT_LEVEL=max pins reasoning effort for the agent. DeepSeek's benchmark table was produced at maximum effort, so this setting reproduces the conditions behind the headline agentic scores, at roughly 2.5x the output tokens of a low-effort run[1][5].",
      ],
      list: [
        "ANTHROPIC_BASE_URL must include /anthropic[1]",
        "deepseek-flash[1m] means the 1M-context variant[1]",
        "Subagent and haiku slots use plain deepseek-flash[1]",
        "CLAUDE_CODE_EFFORT_LEVEL=max matches benchmark settings[1][5]",
      ],
      note: "Effort is continuous from 1 to 100. Max reproduces the published scores but costs more; 60-80 recovers most accuracy for less than half the tokens[5].",
    },
    {
      num: "03",
      title: "OpenCode and the /connect Flow",
      description:
        "OpenCode supports V4.1 Flash through its /connect command. You select DeepSeek as the provider, paste an API key, and choose DeepSeek-V4.1-Flash from the model list. DeepSeek states the flow requires OpenCode v1.14.24 or newer[1].",
      paragraphs: [
        "Because OpenCode talks to DeepSeek's OpenAI-compatible endpoint, tools, file edits and shell execution behave exactly as they do with any other backend. The model swap does not change OpenCode's agent loop[1][3].",
        "The scaffold-sensitivity data is worth remembering here. In DeepSeek's own runs, OpenCode scored 65.5 on DeepSWE v1.1 and 85.0 on Terminal-Bench 2.1, below the 74.2 and 90.6 the model reached under DeepSeek Harness Minimal. The tool wrapped around the model changes the result[4].",
      ],
      list: [
        "/connect to DeepSeek to API key to DeepSeek-V4.1-Flash[1]",
        "Requires OpenCode v1.14.24 or newer[1]",
        "OpenCode DeepSWE v1.1: 65.5; TB 2.1: 85.0[4]",
      ],
      note: "See [[v4-1-flash-api-setup|the API setup guide]] for the base URL and key flow shared by every tool[1][2].",
    },
    {
      num: "04",
      title: "OpenClaw Onboarding",
      description:
        "OpenClaw connects through its onboarding flow. You run the install script, step through onboard, choose DeepSeek as the provider, and set the model to deepseek-flash. The installers are install.sh on macOS and Linux and install.ps1 on Windows[1].",
      paragraphs: [
        "OpenClaw's onboarding writes the provider and model into its configuration, so once the flow completes the agent uses V4.1 Flash for every session. There is no DeepSeek-specific fork of the tool[1].",
      ],
      note: "OpenClaw, OpenCode and Claude Code all use the same deepseek-flash model id and the same key[1][2].",
    },
    {
      num: "05",
      title: "Why Benchmarks Use Harness Minimal Mode",
      description:
        "DeepSeek evaluated its agentic benchmarks in the Minimal mode of DeepSeek Harness, a deliberately stripped runtime with only two tools: bash and str_replace_editor. The company positions Minimal as the fair, reproducible way to measure a model without a scaffold's extra machinery helping or hurting it[1][7][8].",
      paragraphs: [
        "That choice explains a number that otherwise looks odd. The official DeepSWE v1.1 score of 74.2 comes from Harness Minimal, while third-party scaffolds land lower on the same model, not because the model is worse there but because the harness differs[4].",
        "The Harness project itself is an open-source agent runtime where everything, including the main loop, is a plugin. Minimal mode strips it to the essentials for benchmarking; Standard mode is the full coding agent, and Code mode adds a TypeScript orchestration SDK[7].",
      ],
      list: [
        "Minimal mode tools: bash plus str_replace_editor only[7]",
        "Used for all official V4.1 Flash agent scores[4]",
        "Harness is MIT-licensed and plugin-based[7][8]",
      ],
      note: "If you want to reproduce the leaderboard numbers, run V4.1 Flash in Harness Minimal with a 1M context and max effort[4][5].",
    },
    {
      num: "06",
      title: "The Multi-Scaffold Score Table",
      description:
        "DeepSeek published a scaffold table showing the same V4.1 Flash model under eight different coding agents at max effort, with N=8 on DeepSWE v1.1 and N=3 on Terminal-Bench 2.1, a 1M context and a 500-step cap[4].",
      table: {
        headers: ["Scaffold", "DeepSWE v1.1", "Terminal-Bench 2.1"],
        rows: [
          ["DeepSeek Harness Minimal", "74.2", "90.6"],
          ["mini-SWE agent", "72.6", "90.3"],
          ["DeepSeek Harness Standard", "70.5", "85.8"],
          ["Claude Code", "69.8", "88.0"],
          ["DeepSeek Harness PTC", "67.6", "85.8"],
          ["Pi", "66.2", "86.1"],
          ["Codex", "65.6", "84.1"],
          ["OpenCode", "65.5", "85.0"],
        ],
      },
      paragraphs: [
        "The gap between the best and worst scaffold is about nine points on DeepSWE and six on Terminal-Bench 2.1. For teams choosing a coding agent, that spread is often larger than the difference between two adjacent frontier models[4].",
      ],
      note: "These are DeepSeek-run evaluations with sample sizes small enough that a few points are inside noise. Treat scaffold choice and effort level as first-class variables[4][5].",
    },
    {
      num: "07",
      title: "WorkBuddy, CodeBuddy and Official Support",
      description:
        "DeepSeek names WorkBuddy, including CodeBuddy, and OpenCode as official partners that already support V4.1 Flash at launch. Official support means the provider is configured for deepseek-flash and the tool has validated tool calling and reasoning parsing against the model[3].",
      paragraphs: [
        "Official support is the shortest path to a working setup, because the tool vendor has handled parser compatibility. Community integrations, by contrast, may need the deepseek_v41 tokenizer and parser modes configured manually when pointing at a self-hosted endpoint[1][5].",
      ],
      list: [
        "WorkBuddy, including CodeBuddy: official support[3]",
        "OpenCode: official support[3]",
        "Claude Code and OpenClaw: documented via Integrate with AI Tools[1]",
      ],
      note: "The same model id works across every tool, so switching agents is a config change rather than a migration[1][2].",
    },
    {
      num: "08",
      title: "Choosing an Agent and Migration Risks",
      description:
        "V4.1 Flash replaces the old V4-Flash line and, from September 14, 2026, absorbs deepseek-v4-pro traffic too. Any coding agent pinned to a legacy model id is now being served by V4.1 Flash behind the scenes[2][3].",
      paragraphs: [
        "That silent reroute is the real integration risk. A scaffold tuned around V4-Pro's output style may see behaviour drift even though the endpoint string did not change. Re-run your agent regression tests rather than assuming the swap is transparent[6].",
        "The pragmatic selection rule is to match the scaffold to the task. Input-heavy, cacheable agent loops benefit most from the 8B prefill path and the compressed KV cache, while long-horizon autonomous work still needs careful effort tuning[5][6].",
      ],
      list: [
        "Pick an officially supported tool for the least friction[3]",
        "Use the [1m] variant when context is the bottleneck[1]",
        "Set effort deliberately; max is not always the best cost/quality point[5]",
        "Re-test prompts after any silent model swap[6]",
      ],
      note: "For the mechanism behind cheap agent loops, read [[v4-1-flash-kv-cache|the KV cache guide]]; for pricing, see [[v4-1-flash-pricing|the pricing guide]][5].",
    },
  ],
  prevGuide: undefined,
  nextGuide: undefined,
  relatedGuides: [
    { title: "DeepSeek V4.1 Flash API Setup: deepseek-flash & Migration", slug: "v4-1-flash-api-setup" },
    { title: "DeepSeek V4 Flash in Cursor, Claude Code & Codex", slug: "flash-ide" },
    { title: "What Is DeepSeek Harness? The Open Agent Chassis", slug: "deepseek-harness" },
    { title: "DeepSeek Harness Minimal Mode: The Benchmark Runtime", slug: "harness-minimal-mode" },
    { title: "DeepSeek V4.1 Flash Benchmarks: Full Official Table", slug: "v4-1-flash-benchmarks" },
  ],
  sources: [
    { label: "DeepSeek Docs: Integrate with AI Tools", url: "https://api-docs.deepseek.com/guides/coding_agents/" },
    { label: "DeepSeek API Changelog (Sept 10, 2026)", url: "https://api-docs.deepseek.com/updates" },
    { label: "DeepSeek-V4.1-Flash: Smarter, Faster, More Efficient (Official)", url: "https://api-docs.deepseek.com/news/news260910/" },
    { label: "Hugging Face: DeepSeek-V4.1-Flash Model Card", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash" },
    { label: "vLLM Recipes: DeepSeek-V4.1-Flash", url: "https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4.1-Flash" },
    { label: "VentureBeat: V4.1-Flash Debuts at $0.003/1M Off-Peak", url: "https://venturebeat.com/technology/deepseek-v4-1-flash-debuts-with-0-003-1m-off-peak-cached-input-rate-and-benchmarks-eclipsing-gpt-5-6-sol-claude-opus-5" },
    { label: "GitHub: deepseek-ai/deepseek-harness", url: "https://github.com/deepseek-ai/deepseek-harness" },
    { label: "DeepSeek Harness Official Page", url: "https://deepseek.com/harness/en/" },
  ],
};
