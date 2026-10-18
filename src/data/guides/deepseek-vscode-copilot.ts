import type { GuideContent } from "./types";

// target keyword: deepseek vscode
// 词族：deepseek copilot / deepseek vscode extension / deepseek vscode plugin /
//      deepseek copilot vscode / deepseek copilot extension / deepseek copilot cli /
//      deepseek vscode api / deepseek vscode continue / deepseek copilot proxy /
//      deepseek copilot visual studio / deepseek vscode agent / deepseek cursor alternative
// 事实来源：reference/topics/29-v4-1-flash-1017.md + 本文写作时联网核实的一手文档
//   - DeepSeek 官方 docs（base_url / model 名 / pricing / FIM）
//   - VS Code 官方 docs（BYOK + Custom Endpoint provider + chatLanguageModels.json）
//   - DeepSeek 官方 agent 集成文档（github_copilot / copilot_cli / cline）
//   - Continue / Cline / Roo Code 官方文档
export const deepseekVscodeCopilot: GuideContent = {
  slug: "deepseek-vscode-copilot",
  category: "TOOLS & EXTENSIONS",
  title: "DeepSeek VSCode Setup: Copilot BYOK, Continue & Cline",
  seoTitle: "DeepSeek VSCode & Copilot: Setup Guide",
  readTime: "12 MIN READ",
  updatedAt: "OCT 18, 2026",
  summary:
    "Two working ways to run DeepSeek V4.1 Flash in VS Code: Copilot's Custom Endpoint BYOK, or Continue, Cline and Roo Code against an OpenAI-compatible provider.",
  toc: [
    { id: "step-1", label: "Step 1: Two Paths into VS Code" },
    { id: "step-2", label: "Step 2: Copilot BYOK via Custom Endpoint" },
    { id: "step-3", label: "Step 3: Continue, Cline and Roo Code" },
    { id: "step-4", label: "Step 4: The Anthropic Endpoint & Copilot CLI" },
    { id: "step-5", label: "Step 5: Model Names and Capability Limits" },
    { id: "step-6", label: "Step 6: Why Editor Completions Differ" },
    { id: "step-7", label: "Step 7: What It Actually Costs" },
    { id: "step-8", label: "Step 8: Pitfalls and Debugging" },
  ],
  steps: [
    {
      num: "01",
      title: "Two Paths into VS Code",
      description:
        "There are two supported ways to put DeepSeek behind VS Code, and they solve different problems. Path A is GitHub Copilot's own model picker: VS Code's Custom Endpoint provider stores your DeepSeek API key and exposes deepseek-flash as a native chat model, so agent mode, tool calls, edit tools and MCP servers keep working[4]. Path B is a third-party extension such as Continue, Cline or Roo Code, installed alongside Copilot and configured with DeepSeek's OpenAI-compatible base URL[1].",
      paragraphs: [
        "Choose Path A if you already pay for Copilot and simply want DeepSeek as one more entry in a picker you already use. Choose Path B if you want DeepSeek to drive the agent loop itself, need per-role model routing (a cheap model for tab completion, a stronger one for chat), or want a sidebar that is not tied to a Copilot subscription. DeepSeek now lists GitHub Copilot as a first-class supported backend, so neither route is a community hack[1].",
        "One limitation applies to both. Routine inline code completions still come from Copilot: VS Code documents that semantic search, inline suggestions and embedding-based features require a GitHub account and are not served by BYOK models[4]. If your goal is a fully self-hosted editor with no GitHub dependency, that part is not available — plan around it rather than fighting it.",
      ],
      list: [
        "Path A — Copilot Custom Endpoint (BYOK): one JSON file, no extra extension, works without a Copilot plan[4].",
        "Path B — Continue / Cline / Roo Code: full agent sidebar, own tool loop, per-role models[8][9][11].",
        "Both point at the same contract: base URL https://api.deepseek.com with model deepseek-flash[1].",
        "If you have already wired DeepSeek into other editors, compare against [[flash-ide|the IDE roundup]] before rebuilding anything.",
      ],
      note: "Names differ across vendors, so read [[deepseek-flash-model-names|the model-name explainer]] first if you are unsure whether to type deepseek-flash or deepseek-v4-flash.",
    },
    {
      num: "02",
      title: "Copilot BYOK via Custom Endpoint",
      description:
        "Open the Chat view, open the model picker, and select Manage Language Models — or run the Chat: Manage Language Models command from the Command Palette. Choose Add Models, then Custom Endpoint. This provider replaces the older OpenAI Compatible provider, and the old github.copilot.chat.customOAIModels setting is now deprecated[4]. Enter a group name and your DeepSeek key, then pick the API type: Responses or Chat Completions for https://api.deepseek.com, or Messages if you point at https://api.deepseek.com/anthropic[1][4].",
      paragraphs: [
        "VS Code then opens chatLanguageModels.json, where you describe the model yourself. DeepSeek-V4.1-Flash-1017 reports 1M tokens of context and up to 384K of output, so declare contextWindow as 1000000 and set maxOutputTokens to a realistic ceiling for editor work — 64000 is a sane starting point, because a single chat turn rarely needs more[2].",
        "Set toolCalling to true. A model that does not declare tool-calling support is hidden from the picker for agent sessions entirely, which is the most common reason a correctly typed DeepSeek entry seems to disappear[4]. If you want the agent to reach outside the editor, this is also the flag that makes [[deepseek-mcp-servers|MCP servers]] usable with DeepSeek.",
      ],
      code: `// chatLanguageModels.json — opened automatically by the Custom Endpoint wizard
[
  {
    "name": "DeepSeek",
    "vendor": "customendpoint",
    "apiKey": "\${input:myDeepSeekKey}",
    "apiType": "chat-completions",
    "models": [
      {
        "id": "deepseek-flash",
        "name": "DeepSeek Flash",
        "url": "https://api.deepseek.com/chat/completions",
        "toolCalling": true,
        "vision": true,
        "contextWindow": 1000000,
        "maxOutputTokens": 64000,
        "thinking": true,
        "supportsReasoningEffort": ["low", "medium", "high"],
        "reasoningEffortFormat": "chat-completions"
      }
    ]
  }
]`,
      note: "Keep the key out of the file. VS Code documents the \${input:...} indirection precisely so a raw key never lands in something you might commit[4].",
    },
    {
      num: "03",
      title: "Continue, Cline and Roo Code",
      description:
        "All three extensions follow the same three-field pattern that DeepSeek's own integration docs use: provider set to an OpenAI-compatible mode, base URL https://api.deepseek.com, and model ID deepseek-flash[7]. Cline and Roo Code expose this in a settings panel; Continue keeps it in a YAML file.",
      paragraphs: [
        "In Cline, open the settings gear, set API Provider to OpenAI Compatible, then fill in Base URL, API Key and Model ID. Use the Model Configuration section to declare the context window, max output tokens, image support and the per-million-token prices, so Cline's cost readout reflects reality instead of a default guess[8].",
        "Roo Code presents the same panel with one hard requirement: it uses native OpenAI tool calling exclusively and has no XML-based fallback, so a model without tool calling cannot be used at all[11]. DeepSeek Flash does support tool calls, so it qualifies[2].",
        "Continue stores everything in ~/.continue/config.yaml. Its current OpenAI provider documents the apiBase field for OpenAI-compatible endpoints[9], and DeepSeek's own Continue integration doc shows a native deepseek provider with apiBase pointed at the /beta path so the autocomplete role works[12]. The model name in that older doc should now be deepseek-flash.",
      ],
      code: `# ~/.continue/config.yaml (macOS / Linux)
name: Workstation
version: 1.0.0
schema: v1

models:
  # Agent + chat + edit role
  - name: DeepSeek Flash
    provider: openai
    model: deepseek-flash
    apiBase: https://api.deepseek.com
    apiKey: sk-your-deepseek-key
    roles: [chat, edit, apply, summarize]

  # Tab autocomplete role — DeepSeek serves this through the FIM endpoint
  - name: DeepSeek FIM
    provider: deepseek
    model: deepseek-flash
    apiBase: https://api.deepseek.com/beta
    apiKey: sk-your-deepseek-key
    roles: [autocomplete]`,
      note: "Splitting roles is the point of Path B: the autocomplete entry talks to the FIM endpoint, which is Beta, non-thinking only and capped at 4K output tokens[3].",
    },
    {
      num: "04",
      title: "The Anthropic Endpoint & Copilot CLI",
      description:
        "DeepSeek publishes a second base URL for clients that speak the Anthropic Messages API: https://api.deepseek.com/anthropic[1]. This is not cosmetic. DeepSeek's own Copilot CLI guide warns that configuring Copilot CLI with provider type openai returns a 400 error — the reasoning_content in the thinking mode must be passed back to the API — because DeepSeek expects the thinking trace echoed on later turns and Copilot CLI's OpenAI path does not do that. Setting the provider type to anthropic avoids the problem entirely[5].",
      paragraphs: [
        "The same logic applies inside VS Code. When you add a Custom Endpoint model, the API type you select determines whether the thinking trace survives the round trip: Messages mode routes to the Anthropic-shaped endpoint, Chat Completions mode to the OpenAI-shaped one[1][4]. If you hit thinking-mode errors in either direction, change the API type before changing anything else.",
        "The Anthropic endpoint is also why DeepSeek works with the whole family of Anthropic-format agents — the same trick that makes [[deepseek-codex|Codex]] and Claude-format harnesses work — so you can reuse one API key across the editor and the terminal.",
      ],
      list: [
        "Install with: npm install -g @github/copilot (Node.js 22 or later)[5].",
        "COPILOT_PROVIDER_TYPE=anthropic — required; the openai type triggers the thinking-mode 400[5].",
        "COPILOT_PROVIDER_BASE_URL=https://api.deepseek.com/anthropic[1][5].",
        "COPILOT_PROVIDER_API_KEY=sk-your-deepseek-key and COPILOT_MODEL=deepseek-flash[5].",
        "Set COPILOT_PROVIDER_MAX_PROMPT_TOKENS and COPILOT_PROVIDER_MAX_OUTPUT_TOKENS explicitly, because DeepSeek is not in Copilot CLI's built-in model catalogue[5].",
      ],
      code: `# GitHub Copilot CLI — DeepSeek via the Anthropic-compatible endpoint
export COPILOT_PROVIDER_TYPE=anthropic
export COPILOT_PROVIDER_BASE_URL=https://api.deepseek.com/anthropic
export COPILOT_PROVIDER_API_KEY=sk-your-deepseek-key
export COPILOT_MODEL=deepseek-flash

# Optional: DeepSeek is not in Copilot's built-in catalogue
export COPILOT_PROVIDER_MAX_PROMPT_TOKENS=840000
export COPILOT_PROVIDER_MAX_OUTPUT_TOKENS=128000

copilot`,
      note: "GitHub documents the same BYOK variables at the general level (base URL, API key, model); DeepSeek's guide adds the anthropic provider type and the token ceilings[5][10].",
    },
    {
      num: "05",
      title: "Model Names and Capability Limits",
      description:
        "Use deepseek-flash. As of October 2026 that name is served by DeepSeek-V4.1-Flash-1017, the checkpoint released on October 17, 2026, and existing integrations moved onto it with no configuration change[1]. The legacy names deepseek-v4-flash and deepseek-v4-flash-vision-exp are still accepted, but those models are retired and their requests are served by the same checkpoint and billed at the Flash price[1][2].",
      table: {
        headers: ["Capability", "deepseek-flash", "Notes for VS Code"],
        rows: [
          ["Context window", "1M tokens", "Enough for a large file set in one agent turn[2]"],
          ["Max output", "384K tokens", "Set maxOutputTokens lower; 64K is plenty in chat[2]"],
          ["Thinking mode", "On by default", "Supports non-thinking and thinking modes[2]"],
          ["Tool calls", "Yes", "Required by Roo Code and by Copilot agent mode[2][11]"],
          ["JSON output", "Yes", "Useful for structured edit instructions[2]"],
          ["Responses API", "Yes", "Available as a Custom Endpoint API type[2][4]"],
          ["Anthropic Messages", "Yes", "Via https://api.deepseek.com/anthropic[1]"],
          ["Vision (image input)", "Yes on Flash", "deepseek-v4-pro does not support vision[2]"],
          ["FIM completion", "Beta, non-thinking only", "4K output cap, /beta base URL[2][3]"],
        ],
      },
      paragraphs: [
        "Two rows matter more than the rest for editor work. Tool calling is what makes the model usable in agent mode at all — Copilot, Cline and Roo Code all refuse a model that cannot call tools[4][8][11]. The 1M context window is what lets an agent hold a large file set in a single turn, though you rarely want to pay for all of it; the cost step below shows why.",
        "If you want the fuller release picture, including the benchmarks DeepSeek reported for this checkpoint, see [[deepseek-v4-1-flash-1017|the 1017 release guide]].",
      ],
      note: "DeepSeek's pricing page is the authority for this table: it lists FIM Completion as non-thinking mode only, and Vision as supported on deepseek-flash but not on deepseek-v4-pro[2].",
    },
    {
      num: "06",
      title: "Why Editor Completions Differ",
      description:
        "Two rules make an editor different from a chat app. First, BYOK does not cover inline suggestions: VS Code documents that code completions, semantic search and embedding-based features still require a GitHub account and are not served by your own model[4]. Second, DeepSeek's FIM completion endpoint is Beta, capped at 4K output tokens, available only in non-thinking mode, and reached through the https://api.deepseek.com/beta base URL[2][3].",
      paragraphs: [
        "That leaves tab completion with two workable setups. Either keep Copilot's built-in completions model and use DeepSeek only for chat and agent work, or let Continue own the autocomplete role and point it at the FIM endpoint[3][9]. DeepSeek's FIM guide documents exactly this integration and links to its Continue configuration, so it is the supported path rather than a workaround[3].",
        "Thinking mode is the other setting to get right. DeepSeek enables thinking by default, which is correct for chat and agent turns and wrong for anything latency-sensitive[2]. In VS Code you can expose the choice by declaring supportsReasoningEffort and reasoningEffortFormat on the model in chatLanguageModels.json, which puts a Thinking Effort menu next to the model name[4]. DeepSeek's official Copilot extension exposes the same idea as a simpler three-way choice: None, High or Max[6].",
        "A practical diagnostic: if the agent feels slow rather than wrong, turn thinking off or down before you blame the network. A completion that takes tens of seconds is almost always a reasoning model doing thinking work nobody asked for[2][6].",
      ],
      note: "Non-thinking mode is not a downgrade — DeepSeek's pricing page lists FIM as non-thinking only precisely because completion is a latency-bound, non-reasoning task[2].",
    },
    {
      num: "07",
      title: "What It Actually Costs",
      description:
        "Editor traffic is the best-case workload for DeepSeek's price list, because the same system prompt, file headers and conversation prefix get replayed on every turn. A cache hit costs $0.003 per million input tokens off-peak against $0.15 for a miss, and output costs $0.60 per million off-peak. Peak hours double every line, and they are narrow: 01:00 to 04:00 and 06:00 to 10:00 UTC, Monday through Friday, excluding Chinese public holidays[2].",
      table: {
        headers: ["Line item (per 1M tokens)", "Off-peak", "Peak"],
        rows: [
          ["Input, cache hit", "$0.003", "$0.006"],
          ["Input, cache miss", "$0.15", "$0.30"],
          ["Output", "$0.60", "$1.20"],
        ],
      },
      paragraphs: [
        "Take a realistic example. One long agent session sends 2M input tokens, of which 90 percent hit the cache, and produces 60K output tokens. Off-peak that is 1.8M cached tokens at $0.003 plus 0.2M misses at $0.15, which is $0.0054 + $0.03, plus 0.06M output at $0.60, which is $0.036. Total: about seven cents. Run the identical session inside a peak window and you pay about fourteen[2].",
        "The advice follows directly from the arithmetic. Keep the prefix stable across the turns of one task — the same system prompt, the same edit-tool instructions, the same file context — because that is what turns an input token from a $0.15 token into a $0.003 one. Batch long autonomous runs into off-peak hours when your schedule allows, and route tab completion to the cheapest possible role rather than reusing the model you ask architecture questions. If you want the wider price context across DeepSeek's models, [[v4-1-flash-api-setup|the API setup guide]] and the on-site pricing pages cover it.",
      ],
      note: "Prices are as of October 18, 2026, per DeepSeek's pricing page; off-peak is exactly half of peak, and off-peak covers all hours outside the two UTC windows, including full weekends and Chinese public holidays[2].",
    },
    {
      num: "08",
      title: "Pitfalls and Debugging",
      description:
        "Almost every VS Code failure with DeepSeek is a configuration error rather than a model error. These are the ones worth knowing before you file a bug report.",
      list: [
        "Never paste a raw key into a tracked file. VS Code recommends the input-variable indirection in chatLanguageModels.json so the value lives in secret storage instead of in your repository[4].",
        "Do not double the route. VS Code resolves a Custom Endpoint URL by using it as-is when it already contains /chat/completions, /responses or /messages, and otherwise inserting /v1 and appending the path[4]. Pasting a full endpoint into a field that wants a base URL produces a doubled path such as /chat/completions/chat/completions, which is not a route DeepSeek publishes.",
        "If you see the message that reasoning_content in the thinking mode must be passed back, your client is on the OpenAI path while DeepSeek is thinking. Either move the provider to the Anthropic endpoint or disable thinking[1][5].",
        "Read the extension's own log first. Copilot, Cline, Roo Code and Continue each surface HTTP failures in their own output channel, and that is where the real status code lives — errors relayed through a client's own layer can be reworded before you see them[8][9][11].",
        "If a model never appears in the Copilot picker, check toolCalling. Models without tool support are hidden for agent sessions[4].",
        "Expect a slow first token on an uncached prefix. A cached prefix is fast and nearly free; a brand-new 200K-token context is neither[2].",
      ],
      note: "For the underlying API semantics — status codes, streaming, thinking-mode fields — see [[deepseek-api-error-codes|DeepSeek API error codes]].",
    },
  ],
  prevGuide: undefined,
  nextGuide: undefined,
  relatedGuides: [
    { title: "DeepSeek V4 Flash in Cursor, Claude Code & Codex", slug: "flash-ide" },
    { title: "DeepSeek Flash Model Names Explained", slug: "deepseek-flash-model-names" },
    { title: "DeepSeek V4.1 Flash API Setup", slug: "v4-1-flash-api-setup" },
    { title: "DeepSeek V4.1-Flash-1017 Release Guide", slug: "deepseek-v4-1-flash-1017" },
    { title: "DeepSeek V4 Pro in Cursor: Setup Guide", slug: "v4-pro-cursor" },
  ],
  sources: [
    { label: "DeepSeek API Docs — Your First API Call (base URLs, model names)", url: "https://api-docs.deepseek.com/" },
    { label: "DeepSeek API Docs — Models & Pricing (features, context, rates, peak hours)", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "DeepSeek API Docs — FIM Completion (Beta)", url: "https://api-docs.deepseek.com/guides/fim_completion/" },
    { label: "VS Code Docs — AI language models in VS Code (BYOK & Custom Endpoint)", url: "https://code.visualstudio.com/docs/agent-customization/language-models" },
    { label: "DeepSeek — Integrate with GitHub Copilot CLI (Anthropic endpoint)", url: "https://github.com/deepseek-ai/awesome-deepseek-agent/blob/main/docs/copilot_cli.md" },
    { label: "DeepSeek — Integrate with GitHub Copilot (VS Code extension)", url: "https://github.com/deepseek-ai/awesome-deepseek-agent/blob/main/docs/github_copilot.md" },
    { label: "DeepSeek — Integrate with Cline (OpenAI-compatible provider)", url: "https://github.com/deepseek-ai/awesome-deepseek-agent/blob/main/docs/cline.md" },
    { label: "Cline Docs — OpenAI Compatible provider", url: "https://docs.cline.bot/provider-config/openai-compatible" },
    { label: "Continue Docs — Configure OpenAI / OpenAI-compatible models", url: "https://docs.continue.dev/customize/model-providers/top-level/openai" },
    { label: "GitHub Docs — Adding LLM models to GitHub Copilot CLI (BYOK)", url: "https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/use-byok-models" },
    { label: "Roo Code Docs — Using OpenAI Compatible Providers", url: "https://roocodeinc.github.io/Roo-Code/providers/openai-compatible/" },
    { label: "DeepSeek — Integrate with Continue (config.yaml, FIM autocomplete role)", url: "https://github.com/deepseek-ai/awesome-deepseek-integration/blob/main/docs/continue/README.md" },
  ],
};
