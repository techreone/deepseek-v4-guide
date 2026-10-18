import type { GuideContent } from "./types";

// target keyword: deepseek codex
// 词族：deepseek codex setup / deepseek codex cli / deepseek codex integration /
//       deepseek codex cc switch / deepseek codex github / deepseek codex api /
//       deepseek codex subagent / deepseek codex equivalent / deepseek codex app
// 事实来源：官方 Integrate with Codex 文档、官方 Using the Responses API 文档、
//           官方 pricing/changelog、官方 X 公告、CC Switch Codex 路由文档、developersdigest
export const deepseekCodex: GuideContent = {
  slug: "deepseek-codex",
  category: "INTEGRATION GUIDE",
  title: "DeepSeek + Codex CLI: Native Responses API Setup",
  seoTitle: "DeepSeek + Codex CLI: Responses API Setup",
  readTime: "10 MIN READ",
  updatedAt: "OCT 18, 2026",
  summary:
    "Connect OpenAI's Codex CLI, desktop app and VS Code extension to DeepSeek: the official one-click script, the exact config.toml, models.json, and real cost.",
  notice:
    "Model refresh: since Oct 17, 2026 the name deepseek-flash serves DeepSeek-V4.1-Flash-1017 with no config change[4][5]. See [[deepseek-v4-1-flash-1017|what changed on Oct 17]].",
  toc: [
    { id: "step-1", label: "Step 1: Why Codex Gets Its Own DeepSeek Guide" },
    { id: "step-2", label: "Step 2: What You Get — Models, Context and the 1017 Refresh" },
    { id: "step-3", label: "Step 3: Run the Official One-Click Setup Script" },
    { id: "step-4", label: "Step 4: The Exact config.toml Shape" },
    { id: "step-5", label: "Step 5: models.json and Why the Catalog File Matters" },
    { id: "step-6", label: "Step 6: Use It in CLI, Desktop App and VS Code" },
    { id: "step-7", label: "Step 7: CC Switch and the Same config.toml" },
    { id: "step-8", label: "Step 8: Web Search, Real Cost and the Traps to Avoid" },
  ],
  steps: [
    {
      num: "01",
      title: "Why Codex Gets Its Own DeepSeek Guide",
      description:
        "Codex is OpenAI's coding agent, and it does not talk to models over the Chat Completions shape that most OpenAI-compatible clients use. Codex speaks the Responses API, so a generic OpenAI-compatible endpoint is not enough[1]. DeepSeek's API supports the Responses API format natively, and it supports it specifically to serve Codex: the official guide opens by saying Codex talks to models via the Responses API, which the DeepSeek API natively supports[1][2].",
      paragraphs: [
        "That single fact is why this page exists. The [[flash-ide|Cursor and IDE setup guide]] covers Codex in one step, and [[cc-switch-claude-code|the CC Switch guide]] covers the Claude side. Neither explains the Codex-specific pieces: a provider block whose wire_api must be responses, a model catalog file that tells Codex what DeepSeek models can do, and a desktop-app section that decides which reasoning levels appear in the picker. Those details are what this guide is for[1].",
        "The distinction matters because before native Responses support, running DeepSeek in Codex meant a translation layer. A proxy or router would accept Codex's Responses request, rewrite it into Chat Completions for the upstream, then convert the answer back. DeepSeek removed that step for its own models, and the practical effect is fewer moving parts, fewer 404 and 400 errors on the /responses path, and one less process to keep alive[1][2][6].",
        "One configuration serves every Codex client. Codex CLI, the ChatGPT desktop app, and the Codex IDE extension for VS Code all read the same ~/.codex/ directory, so you configure DeepSeek once and it appears in all three[1]. If you are coming from a Claude-first workflow, the mental model is inverted: Claude Code is configured with environment variables, while Codex is configured with a TOML file and a JSON catalog[1][2].",
      ],
      note: "DeepSeek is not an OpenAI product and this site is not affiliated with either company. Everything below follows DeepSeek's own published Codex integration notes[1].",
    },
    {
      num: "02",
      title: "What You Get — Models, Context and the 1017 Refresh",
      description:
        "Two model ids are wired into the Codex setup: deepseek-flash and deepseek-v4-pro[1]. deepseek-flash is the one the script configures by default, and it is the id you should reach for in most Codex sessions because it is the cheap, fast tier[1][3].",
      paragraphs: [
        "The name deepseek-flash is a stable pointer rather than a frozen version. As of October 17, 2026 it serves DeepSeek-V4.1-Flash-1017, the post-training refresh that shipped the same day the Search and Fetch APIs opened. Architecture, parameter count and price did not change; what changed is the checkpoint behind the name, and existing integrations picked it up with zero configuration edits[4][5]. If your Codex session already pointed at deepseek-flash, it was running the new checkpoint the day it landed. The older id deepseek-v4-flash is still accepted and is served by the same checkpoint[4].",
        "The capability envelope is generous for an agent. Context is 1M tokens (1,048,576), the API maximum output is 384K, tool calls and parallel tool calling are supported, and thinking mode is on by default. Vision is native on Flash, so image input works, and FIM plus chat prefix completion are available only in non-thinking mode. For the parameter-level detail, see [[v4-1-flash-api-setup|the API setup guide]][3][4].",
        "There is one caveat worth stating plainly, because it is the difference between \"it runs\" and \"it runs at its best.\" DeepSeek tuned the 1017 checkpoint for DeepSeek Harness v0.2.1-rc.1 and later, and it also names Tencent CodeBuddy and WorkBuddy. Codex is not on that list[4]. Nothing stops Codex from working — the official integration exists precisely so it does — but a harness that was not the tuning target may not capture the full benchmark gain the checkpoint reports. Treat the published agent scores as a ceiling that a tuned harness reaches, not a promise your Codex setup will hit[4].",
      ],
      table: {
        headers: ["Property", "deepseek-flash (Codex default)", "deepseek-v4-pro"],
        rows: [
          ["Served by", "DeepSeek-V4.1-Flash-1017 since Oct 17, 2026", "Routed per DeepSeek's current model policy"],
          ["Context window", "1,048,576 tokens", "1,048,576 tokens"],
          ["Max API output", "384K tokens", "384K tokens"],
          ["Thinking mode", "On by default", "On by default"],
          ["Vision (image input)", "Yes, native", "No"],
          ["Built-in web_search", "Not supported", "Supported"],
        ],
      },
      note: "The setup script offers deepseek-flash as option 1 and deepseek-v4-pro as option 2[1]. Because built-in web search only works with deepseek-v4-pro, the model choice also decides whether Codex can search the web[1].",
    },
    {
      num: "03",
      title: "Run the Official One-Click Setup Script",
      description:
        "DeepSeek ships a setup script that performs the whole configuration, and the official docs mark it as the recommended path[1]. The only prerequisite is that Codex CLI or the ChatGPT desktop app is installed and has been launched at least once, so that the ~/.codex directory exists[1].",
      code: `# macOS / Linux — run in the terminal
bash <(curl -fsSL https://cdn.deepseek.com/api-docs/codex-deepseek-setup-en.sh)

# Windows — run in PowerShell
irm https://cdn.deepseek.com/api-docs/codex-deepseek-setup-en.ps1 | iex`,
      paragraphs: [
        "After launch the script shows a menu. Option 1 configures Codex to use deepseek-flash, which also accepts image input. Option 2 configures deepseek-v4-pro. Option 9 restores the default Codex configuration and removes the DeepSeek settings. On first run it prompts for your API key, which starts with sk- and comes from the DeepSeek Platform[1].",
        "Four things happen when you pick an option, and each one is a safety feature. First, the script backs up ~/.codex/config.toml to ~/.codex/backup-deepseek/, so you can restore the previous state at any time. Second, it writes the model catalog ~/.codex/models.json. Third, it rewrites only the necessary fields in config.toml, adds a [model_providers.deepseek] section, and writes enabled-reasoning-efforts into the [desktop] section while keeping the other desktop settings. Fourth, it validates the syntax of both files before writing, and aborts without touching anything if validation fails[1].",
        "The script preserves your existing MCP servers and project trust levels. If an existing field conflicts with the DeepSeek configuration, it removes the field and prints the reason for each removal. It is re-runnable: run it again to switch between Flash and Pro, or to pick up settings added by newer versions of the script. If an older run had installed the legacy deepseek-v4-flash or deepseek-v4-flash-vision-exp entries, a fresh run removes them and leaves only deepseek-flash and deepseek-v4-pro[1].",
      ],
      list: [
        "Backs up config.toml to ~/.codex/backup-deepseek/ before writing[1].",
        "Writes ~/.codex/models.json with the DeepSeek model metadata[1].",
        "Adds [model_providers.deepseek] and keeps your MCP and project-trust settings[1].",
        "Validates config.toml and models.json first, and aborts on a syntax error[1].",
        "Re-runnable: switch models, or restore your original config with option 9[1].",
      ],
      note: "Prefer to see every field before it lands on disk? Skip to the manual route in the next step — it produces the same result and is what the script itself writes[1].",
    },
    {
      num: "04",
      title: "The Exact config.toml Shape",
      description:
        "The manual route is two files. Create ~/.codex/models.json first, then edit ~/.codex/config.toml — create it if it does not exist — and add the block below. Set experimental_bearer_token to your DeepSeek API key[1].",
      code: `# ~/.codex/config.toml
model = "deepseek-flash"
model_provider = "deepseek"
preferred_auth_method = "apikey"
forced_login_method = "api"
model_reasoning_effort = "high"
web_search = "disabled"
show_raw_agent_reasoning = true
model_catalog_json = "~/.codex/models.json"

[model_providers.deepseek]
name = "deepseek"
base_url = "https://api.deepseek.com/"
wire_api = "responses"
experimental_bearer_token = "<your DeepSeek API Key>"

[desktop]
enabled-reasoning-efforts = ["low", "medium", "high", "xhigh", "ultra", "max"]`,
      paragraphs: [
        "Two fields carry the whole integration. wire_api = \"responses\" tells Codex to speak the Responses API rather than Chat Completions, and base_url = \"https://api.deepseek.com/\" points that Responses traffic at DeepSeek. DeepSeek's Responses API guide states the base_url is https://api.deepseek.com[2]. Note the trailing slash in the official config example — it is the documented form, so keep it[1].",
        "The remaining fields are Codex controls. model sets the default model, and model_provider must match the id of the [model_providers.<id>] section, which is deepseek here. preferred_auth_method and forced_login_method together make Codex authenticate with an API key and skip the ChatGPT account login. model_reasoning_effort sets reasoning depth: higher values think more deeply and answer better at the cost of longer response time. show_raw_agent_reasoning surfaces the model's raw thinking content and only takes effect in Codex CLI, where you press Ctrl + T to view it. model_catalog_json points at the catalog file from the next step[1].",
        "The [desktop] section controls which reasoning effort levels appear in the ChatGPT desktop app picker, and enabled-reasoning-efforts lists all six: low, medium, high, xhigh, ultra, and max[1]. One trap: if config.toml already contains a [desktop] section, add enabled-reasoning-efforts to that section instead of creating a second one — a duplicate section makes the file invalid[1]. The web_search field is set to disabled here because the example uses deepseek-flash, which does not support built-in search; enabling it is covered in Step 8[1].",
      ],
      note: "The API key sits in plain text in config.toml, which is exactly why the field is named experimental_bearer_token[1]. Keep ~/.codex/ out of any repository you commit — the common trap is a dotfiles repo that tracks ~/.codex without an ignore rule.",
    },
    {
      num: "05",
      title: "models.json and Why the Catalog File Matters",
      description:
        "Codex reads model capabilities from a catalog file, not from the provider endpoint. ~/.codex/models.json declares the metadata of the DeepSeek models — context window size, supported reasoning effort levels, tool call formats — so Codex can treat DeepSeek models like its built-in ones[1]. The official docs publish the full file, and it is identical to what the setup script writes[1].",
      code: `// ~/.codex/models.json (excerpt — deepseek-flash entry)
{
  "models": [
    {
      "slug": "deepseek-flash",
      "display_name": "DeepSeek-Flash",
      "description": "Latest frontier agentic coding model with image input.",
      "input_modalities": ["text", "image"],
      "apply_patch_tool_type": "freeform",
      "web_search_tool_type": "text",
      "supports_parallel_tool_calls": true,
      "context_window": 1048576,
      "max_context_window": 1048576,
      "effective_context_window_percent": 95,
      "default_reasoning_level": "high",
      "supported_reasoning_levels": [
        { "effort": "low",  "description": "Fast responses with lighter reasoning" },
        { "effort": "high", "description": "Extra high reasoning depth for complex problems" },
        { "effort": "max",  "description": "Maximum reasoning depth for the hardest problems" }
      ],
      "minimal_client_version": "0.144.0"
    }
  ]
}`,
      paragraphs: [
        "Three fields explain most of the behavior you will observe. input_modalities includes image for deepseek-flash, and that is what tells Codex the model accepts images. context_window is 1048576, the full 1M window, with effective_context_window_percent at 95 so Codex compacts before it runs out. supported_reasoning_levels lists low, high and max for this model, and default_reasoning_level is high[1].",
        "apply_patch_tool_type is set to freeform, which is how Codex sends its file edits. DeepSeek's Responses API supports exactly one custom tool, {\"type\": \"custom\", \"name\": \"apply_patch\"}, and it says this is for Codex compatibility; any other custom tool name returns a 400 error[2]. That is the concrete reason the catalog and the API have to agree: Codex sends apply_patch as a custom tool, and DeepSeek accepts that specific one[2].",
        "minimal_client_version is 0.144.0, which is also the version the freeform apply_patch registration needs. If you are on an older Codex CLI, the catalog may not take effect — update Codex before you debug anything else[1][6].",
      ],
      note: "If you hand-write models.json and Codex ignores it, check model_catalog_json in config.toml first. Codex will not read a catalog file you never pointed it at[1].",
    },
    {
      num: "06",
      title: "Use It in CLI, Desktop App and VS Code",
      description:
        "Once configured, all three Codex clients read the same ~/.codex/ configuration, so there is no per-client setup[1]. Verification is different for each, and knowing the expected signal saves a round of confusion.",
      list: [
        "Codex CLI: cd into your project and run the codex command. If the startup banner shows model: deepseek-flash, the configuration is in effect[1].",
        "ChatGPT desktop app: the model picker showing Custom or the selected model name such as DeepSeek-Flash both mean the configuration is in effect. Which one appears depends on your ChatGPT version; when it shows the name you can switch models in the app, and when it shows Custom the model actually in use is deepseek-flash[1].",
        "Codex IDE extension for VS Code: it shares the same configuration as Codex CLI, so install the extension and start using it[1].",
      ],
      paragraphs: [
        "The desktop-app nuance deserves emphasis because it produces the most common \"did it work?\" question. A picker that says Custom is not a failure — it means the app is hiding the model name but running deepseek-flash underneath. If you want to see the name, use the CLI banner or the in-session model command[1].",
        "There is also a session-history effect that looks like data loss and is not. Codex stores session history in separate groups by login method: sessions created with an official ChatGPT subscription and sessions created with a third-party API such as DeepSeek are kept apart, and only the group matching the current configuration is shown. Nothing is deleted. Restoring the previous configuration — for example with menu option 9 of the setup script — brings the earlier sessions back and hides the DeepSeek ones in turn. Restart the ChatGPT client after switching for the change to take effect[1].",
        "If you also drive DeepSeek from VS Code Copilot, that is a different integration path with its own settings; see [[deepseek-vscode-copilot|the VS Code Copilot guide]] for the GitHub Copilot Chat route rather than the Codex extension[1].",
      ],
      note: "Verify what actually ran, not just what you configured. DeepSeek returns usage in the response, where input_tokens_details.cached_tokens counts the tokens that hit the context cache and output_tokens_details.reasoning_tokens counts chain-of-thought tokens[2].",
    },
    {
      num: "07",
      title: "CC Switch and the Same config.toml",
      description:
        "CC Switch is the open-source desktop manager that keeps every AI coding tool on one configuration, and Codex is one of the tools it manages. It writes Codex's own ~/.codex/config.toml, which means CC Switch and the official setup script are two ways to edit the same file rather than two independent layers[7].",
      paragraphs: [
        "The relationship is straightforward: if you let CC Switch manage Codex, you do not hand-edit config.toml, and you should not run the DeepSeek setup script on top of a CC Switch-managed config without expecting a rewrite. Pick one owner for the file. The [[cc-switch-claude-code|CC Switch guide]] covers the Claude Code and Claude Desktop side of the same tool[7].",
        "The important update is that the old workaround is no longer needed for DeepSeek. CC Switch's own Codex routing documentation states that since version 3.19.1 the DeepSeek preset connects directly over native Responses, and that deepseek-v4-pro can also connect directly. The local routing path, which rewrites Responses requests into Chat Completions and converts the answers back, now exists mainly for providers that are still Chat-format — the docs name SiliconFlow and ModelScope, among others[6].",
        "How to tell which case you are in: look for the Needs Routing badge on the Codex provider card. A provider without the badge already connects over native Responses and needs no routing. A DeepSeek provider saved before 3.19.1 keeps the badge and keeps going through Chat, because a saved configuration is not changed by a CC Switch upgrade. You can convert it in place by setting Upstream Format to Responses (native); the docs say there is no need to delete and recreate it[6].",
        "Two details from that documentation are worth carrying over. The DeepSeek preset's default model is deepseek-flash as of CC Switch 3.20.4. And the official catalog used by the direct connection requires Codex CLI 0.144.0 or newer, which CC Switch does not verify for you — the same version floor that appears in models.json[1][6]. One side effect of a direct connection is that requests no longer pass through the local route, so per-request proxy accounting cannot see them; the usage is still recorded through Codex session-log import, grouped under a single Codex (Session) entry, and you distinguish providers by the model id on each row[6].",
      ],
      note: "If routing is enabled, CC Switch points Codex at http://127.0.0.1:15721/v1 while keeping wire_api = \"responses\", and injects the real API key during forwarding so it is not exposed in Codex's live configuration[6].",
    },
    {
      num: "08",
      title: "Web Search, Real Cost and the Traps to Avoid",
      description:
        "Codex's built-in web search is available only when Codex uses deepseek-v4-pro. The setup script writes web_search = \"disabled\"; to enable search, switch the model and set the field to live, then restart Codex[1].",
      code: `# ~/.codex/config.toml — enable built-in web search
model = "deepseek-v4-pro"
web_search = "live"`,
      paragraphs: [
        "When search runs, DeepSeek executes it on the server, and the docs say the requests are billed at Search API pricing[1]. That pricing is $0.75 per 1,000 successful requests, with failed requests and empty results not billed[3]. There is also a free window: Search and Fetch calls made through server-side tools in DeepSeek Harness, Claude Code and Codex are free until billing starts on October 31, 2026 at 16:00 UTC, which is the same instant as November 1 in Beijing time. Treat that date as concrete and prototype now rather than after it passes. The [[deepseek-search-api|Search and Fetch API guide]] covers operators, response fields and the QPS ceilings[3][5].",
        "Token cost is where Codex sessions actually spend money, and the cache rate is what makes it cheap. Flash pricing is $0.15 per million input tokens off-peak, $0.003 per million cached input tokens, and $0.60 per million output tokens; peak rates are double those figures[4]. Peak hours are 01:00–04:00 and 06:00–10:00 UTC, Monday to Friday, excluding Chinese public holidays, and everything else counts as off-peak[4].",
        "An agent loop resends a long, largely identical prefix on every turn, so cache hits dominate. DeepSeek's own endpoint has reported a 91.5 percent cache hit rate, and OpenRouter's weighted figures put the effective input price at roughly $0.017 per million tokens rather than $0.15[4]. A rough day of agent work makes the arithmetic concrete: if a Codex session burns about 8 million input tokens and 400K output tokens over a working day, the input side lands near $0.14 at the effective cache rate and the output side near $0.24 off-peak — under half a dollar. Shift a heavy day to peak hours and double it, or let cache hit rate fall and the input side climbs toward the uncached $1.20 ceiling. The lever you control is cache friendliness: keep the prefix stable across turns and avoid rewriting the head of your context[4].",
      ],
      table: {
        headers: ["Item", "Off-peak", "Peak"],
        rows: [
          ["Input, cache miss (per 1M)", "$0.15", "$0.30"],
          ["Input, cache hit (per 1M)", "$0.003", "$0.006"],
          ["Output (per 1M)", "$0.60", "$1.20"],
          ["Search API (per 1,000 requests)", "$0.75", "$0.75"],
        ],
      },
      list: [
        "Do not mix parameter styles. The Responses API silently ignores parameters it does not support, including previous_response_id, conversation, store and background, so code ported from a stateful Responses client will not error — it will quietly behave differently[2].",
        "Do not commit your key. experimental_bearer_token is plain text in config.toml; keep ~/.codex/ out of version control[1].",
        "Back off on 429 and 5xx. Wait and retry with backoff for rate limits and server errors, top up the account on a 402, and do not blindly retry other 4xx responses without changing the request[3].",
        "Expect statelessness. DeepSeek's Responses API does not support previous_response_id or conversation, so multi-turn sessions resend the full context, which is exactly why the cache rate matters so much[2].",
        "Check the model name, not just the id. deepseek-v4-flash and deepseek-v4-flash-vision-exp are still accepted and served by V4.1-Flash-1017, but older Codex configs that list them should be refreshed to deepseek-flash[1][4].",
      ],
      note: "For the API-level compatibility matrix behind these traps — which parameters are supported, ignored, or unsupported — see [[v4-pro-responses-api|the Responses API guide]], and keep [[deepseek-v4-1-flash-1017|the 1017 release notes]] open while you tune reasoning effort[2][4].",
    },
  ],
  prevGuide: { title: "DeepSeek V4.1 Flash in VS Code Copilot: Setup Guide", slug: "deepseek-vscode-copilot" },
  nextGuide: { title: "DeepSeek MCP Servers: Connect Tools to Any Agent", slug: "deepseek-mcp-servers" },
  relatedGuides: [
    { title: "DeepSeek V4 Flash in Cursor, Claude Code & Codex: Setup Guide", slug: "flash-ide" },
    { title: "DeepSeek V4 Pro Responses API & Codex Setup", slug: "v4-pro-responses-api" },
    { title: "Connect Claude Code & Claude Desktop to DeepSeek with CC Switch", slug: "cc-switch-claude-code" },
    { title: "DeepSeek Search & Fetch API: Setup, Pricing, Operators", slug: "deepseek-search-api" },
    { title: "DeepSeek V4.1 Flash API Setup: deepseek-flash & Migration", slug: "v4-1-flash-api-setup" },
  ],
  sources: [
    { label: "Integrate with Codex — Official DeepSeek Docs", url: "https://api-docs.deepseek.com/quick_start/agent_integrations/codex/" },
    { label: "Using the Responses API — Official DeepSeek Docs", url: "https://api-docs.deepseek.com/guides/responses_api/" },
    { label: "Search & Fetch API Guide — Official DeepSeek Docs", url: "https://api-docs.deepseek.com/guides/search" },
    { label: "DeepSeek Models & Pricing — Official Docs", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "DeepSeek on X: V4.1-Flash-1017 and the Search API (Oct 17, 2026)", url: "https://x.com/deepseek_ai/status/2111375640717033777" },
    { label: "CC Switch — Codex Local Routing & DeepSeek Migration Notes (GitHub)", url: "https://github.com/farion1231/cc-switch/blob/main/docs/guides/codex-deepseek-routing-guide-en.md" },
    { label: "Developers Digest: DeepSeek V4.1-Flash-1017 Release Guide", url: "https://www.developersdigest.tech/blog/deepseek-v4-1-flash-1017-release-guide-2026" },
  ],
};
