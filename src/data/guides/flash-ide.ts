import type { GuideContent } from "./types";

// target keyword: deepseek v4 flash cursor
export const flashIde: GuideContent = {
  slug: "flash-ide",
  category: "CURSOR & IDE",
  title: "DeepSeek V4 Flash in Cursor, Claude Code & Codex: Setup Guide",
  readTime: "8 MIN READ",
  updatedAt: "AUG 1, 2026",
  summary:
    "DeepSeek V4 Flash in Cursor, Claude Code and Codex: the complete setup guide. Official env vars, base URLs, model-name mapping, and the reasoning_content fix.",
  toc: [
    { id: "step-1", label: "Step 1: Get Your DeepSeek API Key and Pick a Base URL" },
    { id: "step-2", label: "Step 2: Add DeepSeek V4 Flash in Cursor (Settings → Models)" },
    { id: "step-3", label: "Step 3: Connect Claude Code with the Official Environment Variables" },
    { id: "step-4", label: "Step 4: Run Codex with the Official One-Click Script" },
    { id: "step-5", label: "Step 5: Understand Model-Name Auto-Mapping" },
    { id: "step-6", label: "Step 6: Choose Flash or Pro per Task" },
    { id: "step-7", label: "Step 7: Fix the Cursor reasoning_content 400" },
  ],
  steps: [
    {
      num: "01",
      title: "Get Your DeepSeek API Key and Pick a Base URL",
      description:
        "DeepSeek V4 speaks two native agent dialects. The OpenAI-compatible endpoint at https://api.deepseek.com and the Anthropic-compatible endpoint at https://api.deepseek.com/anthropic both accept the same sk- API key. Create one key at platform.deepseek.com/api_keys and it works in every tool below.",
      table: {
        headers: ["Endpoint", "Format", "Best for"],
        rows: [
          ["https://api.deepseek.com", "OpenAI Chat Completions (plus Responses API since the 0731 build)", "Cursor, Codex, Cline, Continue, OpenCode"],
          ["https://api.deepseek.com/anthropic", "Anthropic Messages (/v1/messages)", "Claude Code, Claude Desktop, Copilot CLI"],
        ],
      },
      list: [
        "Create your key at platform.deepseek.com/api_keys. It starts with sk- and runs pay-as-you-go, so add balance before heavy use.",
        "Model names are case-sensitive. Use deepseek-v4-flash for fast, cheap, high-frequency work and deepseek-v4-pro for complex reasoning.",
        "The old aliases deepseek-chat and deepseek-reasoner retired on July 24, 2026. Requests to them now return a hard error.",
        "Append [1m] to select the 1M-context variant of a model, for example deepseek-v4-pro[1m].",
      ],
      code: `curl https://api.deepseek.com/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer \${DEEPSEEK_API_KEY}" \\
  -d '{
        "model": "deepseek-v4-flash",
        "messages": [
          {"role": "user", "content": "Hello!"}
        ],
        "stream": false
      }'`,
      note: "One key, two endpoints. The Anthropic endpoint is currently the only official path that reaches the deepseek-v4-pro tier through Claude Code; the OpenAI endpoint powers Cursor and Codex.",
    },
    {
      num: "02",
      title: "Add DeepSeek V4 Flash in Cursor (Settings → Models)",
      description:
        "Adding DeepSeek V4 Flash in Cursor takes about two minutes. DeepSeek ships no dedicated Cursor integration page, so this is the community-verified path: Settings to Models to Add Model.",
      list: [
        "Open Settings (Cmd+, on macOS or Ctrl+, on Windows) and go to Models.",
        "Toggle Override OpenAI Base URL and enter https://api.deepseek.com. Do not append /v1.",
        "Paste your DeepSeek API key into the OpenAI API Key field. Cursor stores it locally and forwards it as a Bearer token.",
        "In Model Names, click + Add model and type the exact name: deepseek-v4-flash or deepseek-v4-pro. There is no deepseek-v4 alias.",
        "Click Verify to test the connection.",
      ],
      table: {
        headers: ["Verify result", "Meaning", "Fix"],
        rows: [
          ["Green check", "Connection OK", "Pick the model in the Chat dropdown and start a thread"],
          ["404", "Wrong base URL", "Remove the /v1 suffix — the base URL is https://api.deepseek.com"],
          ["401", "Authentication fails", "Recreate the API key at platform.deepseek.com/api_keys"],
          ["model-not-found", "Wrong model name", "Use deepseek-v4-flash or deepseek-v4-pro exactly"],
        ],
      },
      paragraphs: [
        "Once Verify passes, select the new model in the Chat dropdown before opening a thread. Pro and Flash can coexist as two entries sharing the same key and base URL.",
        "Cursor enforces its own per-plan context ceiling, so in practice you hit Cursor's limit before DeepSeek's 1M-token window.",
      ],
      note: "Custom models only route Chat and the Composer agent. Tab autocomplete still runs on Cursor's own models, and Background Agents did not support custom DeepSeek models as of May 2026.",
    },
    {
      num: "03",
      title: "Connect Claude Code with the Official Environment Variables",
      description:
        "DeepSeek's official Claude Code integration is the most authoritative of the three. Point Claude Code at the Anthropic endpoint, set the eight environment variables, and Claude Code routes to DeepSeek. Install first with npm install -g @anthropic-ai/claude-code (Node.js 18+ required; Windows also needs Git for Windows).",
      code: `npm install -g @anthropic-ai/claude-code

export ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic
export ANTHROPIC_AUTH_TOKEN=<your DeepSeek API Key>
export ANTHROPIC_MODEL=deepseek-v4-pro[1m]
export ANTHROPIC_DEFAULT_OPUS_MODEL=deepseek-v4-pro[1m]
export ANTHROPIC_DEFAULT_SONNET_MODEL=deepseek-v4-pro[1m]
export ANTHROPIC_DEFAULT_HAIKU_MODEL=deepseek-v4-flash
export CLAUDE_CODE_SUBAGENT_MODEL=deepseek-v4-flash
export CLAUDE_CODE_EFFORT_LEVEL=max
cd /path/to/my-project
claude`,
      paragraphs: [
        "The official config gives heavy reasoning to Pro and cheap high-frequency work to Flash. Flash carries the Haiku tier and sub-agents; Pro carries the main task. The [1m] suffix selects the 1M-context variant. On Windows, write each export with the $env: form. Verify the install with claude --version.",
        "Web Search works natively: Claude Code calls DeepSeek's Web Search tool when the model decides it is needed, and summarizing the results adds token cost. The awesome-deepseek-agent repo adds one more variable, CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1, and writes the Haiku tier as deepseek-v4-flash[1m].",
      ],
      list: [
        "Community reports put Claude Code on DeepSeek at roughly $7/month instead of $200/month using just two environment variables (MG-Cafe, live-tested, not official numbers).",
        "The same mapping lets Claude Desktop connect: enable developer mode, change the base URL and API key, and the claude-* names bypass the app's model-name restrictions.",
      ],
      note: "The Anthropic endpoint ignores image and document content blocks, cache_control, MCP tool-use blocks, anthropic-beta and anthropic-version headers, and top_k. Do not migrate multimodal or MCP-dependent workflows as-is.",
    },
    {
      num: "04",
      title: "Run Codex with the Official One-Click Script",
      description:
        "The 0731 build of DeepSeek V4 Flash natively supports the OpenAI Responses API, which is the protocol Codex speaks. That ends the proxy era: one official script wires up Codex, and it is re-runnable to switch models or restore the original config.",
      code: `# macOS / Linux — run once after installing Codex CLI
bash <(curl -fsSL https://cdn.deepseek.com/api-docs/codex-deepseek-setup-en.sh)

# Windows PowerShell
irm https://cdn.deepseek.com/api-docs/codex-deepseek-setup-en.ps1 | iex`,
      list: [
        "Backs up ~/.codex/config.toml to ~/.codex/backup-deepseek/.",
        "Writes ~/.codex/models.json declaring the model card: context window 1,048,576, reasoning levels low/high/max, and the apply_patch tool type.",
        "Adds a [model_providers.deepseek] section to config.toml and keeps your existing MCP and project-trust settings.",
        "Validates syntax before writing and aborts without touching any file on failure.",
        "Prompts for your sk- API key on first run.",
      ],
      paragraphs: [
        "Codex CLI, the ChatGPT desktop app, and the VS Code Codex extension share the same ~/.codex/ configuration. Today only deepseek-v4-flash integrates with Codex; DeepSeek says deepseek-v4-pro support arrives in early August 2026.",
        "The Responses endpoint has no previous_response_id, so multi-turn sessions resend the full context, and OpenAI built-in tools like file_search and code_interpreter are not supported.",
      ],
      note: "Prerequisite: install Codex CLI or the ChatGPT desktop app and launch it once so ~/.codex exists before running the script.",
    },
    {
      num: "05",
      title: "Understand Model-Name Auto-Mapping",
      description:
        "The Anthropic endpoint maps claude-* model names onto DeepSeek models automatically. In most Claude Code sessions you never type a DeepSeek slug at all.",
      table: {
        headers: ["Claude model name", "Mapped to", "Why it matters"],
        rows: [
          ["claude-opus-*", "deepseek-v4-pro", "Complex, multi-file reasoning"],
          ["claude-sonnet-* / claude-haiku-*", "deepseek-v4-flash", "Fast, high-frequency work"],
          ["Unrecognized names", "deepseek-v4-flash", "Safe fallback"],
        ],
      },
      paragraphs: [
        "That is why the official env config sets ANTHROPIC_DEFAULT_HAIKU_MODEL to deepseek-v4-flash: Claude Code still routes its internal haiku-tier calls, and DeepSeek serves them with Flash.",
        "The mapping also explains the cost math. Flash carries the haiku tier and sub-agents, so only the main task runs on the more expensive pro model.",
      ],
    },
    {
      num: "06",
      title: "Choose Flash or Pro per Task",
      description:
        "Flash and Pro are two tiers of one model family. Flash is the fast, cheap, high-frequency tier; Pro is the flagship for complex reasoning. Pick by task, not by habit.",
      table: {
        headers: ["Task type", "Model", "Price per 1M tokens (input / output)"],
        rows: [
          ["Docstrings, test stubs, single-file edits, autocomplete", "deepseek-v4-flash", "$0.14 / $0.28"],
          ["Simple agent tasks, chat, web search", "deepseek-v4-flash", "$0.14 / $0.28"],
          ["Complex planning, multi-file refactors, hard bugs", "deepseek-v4-pro", "$0.435 / $0.87"],
          ["Repeated prompt prefixes (cache hits)", "Both", "~98% discount on input"],
        ],
      },
      paragraphs: [
        "DeepSeek's own benchmarks, run on its DeepSeek Harness in minimal mode with max effort, put Flash-0731 at 82.7 on Terminal-Bench 2.1 and 54.4 on DeepSWE. The changelog says all nine published agent benchmarks beat V4-Pro-Preview. Treat these as vendor-reported until third parties reproduce them. On the independent Artificial Analysis Intelligence Index v4.1, V4-Flash-0731 scores 50, ranking #2 of 162 models in its price tier.",
        "A typical Cursor Composer run is around 20K input and 3K output tokens: about $0.013 on Pro and $0.003 on Flash. A full day at roughly 150 rounds is about $2 on Pro and under $0.50 on Flash. Community estimates put a $5 top-up at about a week of heavy Flash usage.",
      ],
      note: "Concurrency limits are account-level: 2,500 concurrent requests for flash, 500 for pro. In Cursor, your plan's own context ceiling hits before DeepSeek's 1M window.",
    },
    {
      num: "07",
      title: "Fix the Cursor reasoning_content 400",
      description:
        "The most time-consuming Cursor issue is the reasoning_content 400 on long agent runs. DeepSeek thinking mode returns both content and reasoning_content in every streaming chunk. Cursor's Chat panel renders both; Composer renders only content and throws HTTP 400 on long tool chains.",
      paragraphs: [
        "The 400 happens because DeepSeek thinking mode requires the next request to replay the full reasoning_content chain. When Cursor packages the next round, it strips that field, so DeepSeek rejects the request. Three fixes exist, from cheapest to most complete.",
      ],
      list: [
        "Use Chat to read the reasoning and Composer to change files. Zero cost, and the recommended default.",
        "Turn off thinking mode in Composer or switch to Flash. You lose the reasoning gain, but the agent stays stable.",
        "Run the community proxy yxlao/deepseek-cursor-proxy. Point Cursor at http://localhost:<port>; the proxy caches the chain-of-thought per session and replays it on the next round. The full Composer agent loop works, and thinking tokens display as collapsed Markdown.",
      ],
      note: "The agent is fully usable once you route around the reasoning replay bug — this is the price of the deepseek-v4-flash thinking mode on this IDE. And remember the legacy aliases deepseek-chat and deepseek-reasoner are gone — any tool config still sending them should switch to deepseek-v4-flash or deepseek-v4-pro.",
    },
  ],
  prevGuide: { title: "Use DeepSeek V4 Flash with OpenCode: Step-by-Step", slug: "flash-opencode" },
  nextGuide: { title: "DeepSeek V4 Flash on OpenRouter: Setup, Pricing & BYOK", slug: "flash-openrouter" },
  relatedGuides: [
    { title: "Use DeepSeek V4 Flash with OpenCode: Step-by-Step", slug: "flash-opencode" },
    { title: "DeepSeek V4 Flash API Setup: Base URL, Models & Your First Call", slug: "flash-api-setup" },
    { title: "DeepSeek V4 Flash on OpenRouter: Setup, Pricing & BYOK", slug: "flash-openrouter" },
  ],
  sources: [
    { label: "Official DeepSeek API Changelog", url: "https://api-docs.deepseek.com/updates/" },
    { label: "Integrate with Codex — Official Docs", url: "https://api-docs.deepseek.com/quick_start/agent_integrations/codex/" },
    { label: "Integrate with Claude Code — Official Docs", url: "https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code/" },
    { label: "Anthropic API Guide — Official Docs", url: "https://api-docs.deepseek.com/guides/anthropic_api/" },
    { label: "DeepSeek Models & Pricing — Official Docs", url: "https://api-docs.deepseek.com/quick_start/pricing" },
    { label: "Cursor + DeepSeek V4 Setup Guide (Codersera)", url: "https://codersera.com/blog/deepseek-v4-cursor-ide-setup-2026/" },
    { label: "deepseek-cursor-proxy (GitHub)", url: "https://github.com/yxlao/deepseek-cursor-proxy" },
    { label: "awesome-deepseek-agent — Claude Code Config", url: "https://github.com/deepseek-ai/awesome-deepseek-agent/blob/main/docs/claude_code.md" },
  ],
};
