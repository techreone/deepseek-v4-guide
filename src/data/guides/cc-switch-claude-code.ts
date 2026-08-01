import type { GuideContent } from "./types";

// target keyword: claude code deepseek
export const ccSwitchClaudeCode: GuideContent = {
  slug: "cc-switch-claude-code",
  category: "CLAUDE CODE & DESKTOP",
  title: "Connect Claude Code & Claude Desktop to DeepSeek V4 with CC Switch",
  readTime: "8 MIN READ",
  updatedAt: "AUG 1, 2026",
  summary:
    "Claude Code + DeepSeek V4 with CC Switch: the 123k-star GitHub manager, official base URL and env vars, Claude Desktop model mapping, and two silent traps.",
  toc: [
    { id: "step-1", label: "Step 1: What CC Switch Is and Why Claude Code Users Care" },
    { id: "step-2", label: "Step 2: Install CC Switch on Linux (deb, rpm, AppImage, or AUR)" },
    { id: "step-3", label: "Step 3: Connect Claude Code with the Official Environment Variables" },
    { id: "step-4", label: "Step 4: Add DeepSeek as a CC Switch Provider" },
    { id: "step-5", label: "Step 5: Connect Claude Desktop with Developer Mode and Model Mapping" },
    { id: "step-6", label: "Step 6: Bridge OpenCode Go Into Claude Code and Claude Desktop" },
    { id: "step-7", label: "Step 7: Avoid the Two Pitfalls That Silently Break Pro" },
  ],
  steps: [
    {
      num: "01",
      title: "What CC Switch Is and Why Claude Code Users Care",
      description:
        "CC Switch is an open-source, cross-platform desktop manager that keeps every AI coding tool on one configuration. The GitHub repository farion1231/cc-switch (MIT licensed, maintained by Jason Young) had roughly 123k stars and 8.3k forks as of August 1, 2026, with v3.19.0 released on July 30, 2026[3]. It manages provider configuration for eight tools — Claude Code, Claude Desktop, Codex, Gemini CLI, Grok Build, OpenCode, OpenClaw, and Hermes — so you stop hand-editing settings.json, config.toml, and .env files every time you switch providers.",
      paragraphs: [
        "Under the hood it is a Tauri 2 app: a React front end over a Rust backend, with SQLite (~/.cc-switch/cc-switch.db) as the single source of truth. CC Switch writes configs with a temp-file-plus-rename atomic pattern, so a failed switch never corrupts your Claude Code settings.",
        "Claude Code is the one managed tool that supports hot-switching — changes apply without restarting the terminal. Everything else needs a terminal or CLI restart. Switches write to each tool's own config file, which means the VS Code Claude Code extension and the terminal CLI share the same user-level ~/.claude/settings.json[3].",
      ],
      note: "Why run Claude Code on DeepSeek at all? The Anthropic endpoint covers both the Flash and Pro tiers[2], and the token rates undercut Claude's per-call cost — see the [[flash-pricing|pricing guide]] for exact numbers.",
    },
    {
      num: "02",
      title: "Install CC Switch on Linux (deb, rpm, AppImage, or AUR)",
      description:
        "CC Switch ships official Linux packages: .deb for Debian and Ubuntu, .rpm for Fedora, RHEL, and openSUSE, and a universal .AppImage that runs on any distro[3]. System requirements are Ubuntu 22.04+, Debian 11+, or Fedora 34+. There is no official Flatpak among the release assets.",
      code: `# Debian / Ubuntu
sudo apt install ./CC-Switch_*.deb

# Fedora / RHEL / openSUSE
sudo dnf install ./CC-Switch_*.rpm

# Any distro — universal binary
./CC-Switch-*.AppImage

# Arch Linux (AUR)
paru -S cc-switch-bin

# Wayland fix if clicks do not register or the window is black
CC_SWITCH_GDK_BACKEND=wayland ./CC-Switch-*.AppImage`,
      list: [
        "On Arch, paru -S cc-switch-bin pulls the package from the AUR[3].",        "Wayland note: the AppImage forces GDK_BACKEND=x11 (XWayland) by default. If clicks do not register or the window renders black, relaunch with CC_SWITCH_GDK_BACKEND=wayland.",
        "Under tiling compositors like sway or Hyprland the opposite can happen — if the window stops responding on native Wayland, force it back to x11.",
      ],
      note: "CC Switch needs a graphical session. On headless machines, community variants such as cc-switch-cli and cc-switch-web cover the same provider switching from the terminal.",
    },
    {
      num: "03",
      title: "Connect Claude Code with the Official Environment Variables",
      description:
        "DeepSeek's official Claude Code integration needs no third-party app: point Claude Code at the Anthropic-compatible base URL and set eight environment variables[1]. Install Claude Code first with npm install -g @anthropic-ai/claude-code (Node.js 18+), then export the block below in your shell or add it to ~/.bashrc.",
      code: `export ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic
export ANTHROPIC_AUTH_TOKEN=<your DeepSeek API Key>
export ANTHROPIC_MODEL=deepseek-v4-pro[1m]
export ANTHROPIC_DEFAULT_OPUS_MODEL=deepseek-v4-pro[1m]
export ANTHROPIC_DEFAULT_SONNET_MODEL=deepseek-v4-pro[1m]
export ANTHROPIC_DEFAULT_HAIKU_MODEL=deepseek-v4-flash
export CLAUDE_CODE_SUBAGENT_MODEL=deepseek-v4-flash
export CLAUDE_CODE_EFFORT_LEVEL=max`,
      paragraphs: [
        "The base URL must be https://api.deepseek.com/anthropic — not https://api.deepseek.com[1]. The auth token is your DeepSeek API key from platform.deepseek.com/api_keys, and the variable is ANTHROPIC_AUTH_TOKEN, not ANTHROPIC_API_KEY. Create the key once, as shown in the [[flash-api-setup|API setup guide]], and reuse it everywhere.",
        "The [1m] suffix selects the 1M-context variant of [[v4-pro|deepseek-v4-pro]] for the main tiers. Haiku-tier and sub-agent calls run on the cheaper [[deepseek-v4-flash|DeepSeek V4 Flash]], which keeps fast, high-frequency work off the expensive model.",
      ],
      list: [
        "ANTHROPIC_MODEL, ANTHROPIC_DEFAULT_OPUS_MODEL, ANTHROPIC_DEFAULT_SONNET_MODEL: deepseek-v4-pro[1m].",
        "ANTHROPIC_DEFAULT_HAIKU_MODEL and CLAUDE_CODE_SUBAGENT_MODEL: deepseek-v4-flash.",
        "CLAUDE_CODE_EFFORT_LEVEL=max keeps thinking effort at maximum.",
        "DeepSeek's awesome-deepseek-agent config adds one more line, CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1, to cut non-essential traffic.",
      ],
      note: "Web Search works natively: Claude Code calls DeepSeek's server-side Web Search tool when the model decides it needs it, and summarizing the results adds token cost.",
    },
    {
      num: "04",
      title: "Add DeepSeek as a CC Switch Provider",
      description:
        "The GUI path does the same wiring in one form. In CC Switch, add a provider with these exact values[4] — small differences in the base URL or auth field are the most common reason connections fail.",
      table: {
        headers: ["Field", "Value"],
        rows: [
          ["Name", "DeepSeek (anything you like)"],
          ["Base URL", "https://api.deepseek.com/anthropic"],
          ["Auth field", "ANTHROPIC_AUTH_TOKEN"],
          ["API Key", "Created at platform.deepseek.com/api_keys"],
          ["API format", "Anthropic Messages (native)"],
          ["Opus / Sonnet role", "deepseek-v4-pro"],
          ["Haiku role", "deepseek-v4-flash"],
          ["Sub-agent", "deepseek-v4-flash"],
        ],
      },
      paragraphs: [
        "The base URL ends in /anthropic, not /v1, and carries no trailing slash. Community testing shows that entering https://api.deepseek.com alone can list models but fails requests, and a trailing slash can produce Connection Refused[4].",
        "The auth variable is ANTHROPIC_AUTH_TOKEN — the same name the official environment block uses. The DeepSeek preset ships inside CC Switch's 50+ built-in presets and usually arrives with model mapping pre-selected.",
      ],
      note: "After switching, verify with /status inside Claude Code — the Anthropic base URL should read https://api.deepseek.com/anthropic. Hot-switching means Claude Code picks up the change without restarting the terminal.",
    },
    {
      num: "05",
      title: "Connect Claude Desktop with Developer Mode and Model Mapping",
      description:
        "Claude Desktop connects to DeepSeek through the app's official developer mode. Launch Claude Desktop without logging in, walk Help → Troubleshooting → Enable Developer Mode, then open Developer → Configure Third-Party Inference[1]. Fill in the base URL, your DeepSeek API key, and a model name.",
      table: {
        headers: ["Claude model name", "Mapped to (DeepSeek backend)"],
        rows: [
          ["claude-opus-*", "deepseek-v4-pro"],
          ["claude-sonnet-*", "deepseek-v4-flash"],
          ["claude-haiku-*", "deepseek-v4-flash"],
          ["Unrecognized names", "deepseek-v4-flash (silent fallback)"],
        ],
      },
      paragraphs: [
        "Claude Desktop only accepts claude-sonnet-*, claude-opus-*, and claude-haiku-* role IDs and rejects any other model name[4]. DeepSeek's backend maps those roles to real V4 models automatically[2]. The silent fallback is the catch: an unknown model name quietly becomes deepseek-v4-flash — the classic \"I configured Pro but Pro is running Flash\" symptom.",
        "CC Switch solves the desktop whitelist with model mapping mode plus local routing[4]. Desktop requests hit a local gateway first; CC Switch translates role IDs to real model names (Sonnet role to deepseek-v4-pro, Haiku role to deepseek-v4-flash) and forwards them to DeepSeek. The request log shows lines like claude-desktop deepseek-v4-flash claude-haiku-4-5 200 — request_model still carries the role ID, which is normal, because that is the name before mapping.",
      ],
      note: "Direct mode only works when a provider exposes a native Anthropic Messages API with role IDs Claude Desktop accepts. DeepSeek needs the mapping route, which is why CC Switch's DeepSeek preset arrives with \"requires model mapping\" checked.",
    },
    {
      num: "06",
      title: "Bridge OpenCode Go Into Claude Code and Claude Desktop",
      description:
        "CC Switch v3.18.0 added an OpenCode Go preset that bridges a Go subscription into Claude, Claude Desktop, Codex, and OpenCode[5]. You paste a plain API key — no OAuth flow — and CC Switch wires the rest. A dedicated pull request added an \"OpenCode Go (DeepSeek V4 Flash)\" preset for Claude and Claude Desktop specifically.",
      paragraphs: [
        "OpenCode Go is a low-cost subscription for open coding models: $5 for the first month, then $10/month[7]. It ships with usage limits — when you exceed them you fall back to free models or top up with Zen balance. Because CC Switch accepts the raw API key, you get a DeepSeek-backed Claude Code session without touching Anthropic's billing.",
      ],
      list: [
        "Open CC Switch and pick the OpenCode Go preset for Claude or Claude Desktop.",
        "Paste the API key from your OpenCode Zen console.",
        "Select the DeepSeek V4 Flash entry (or Pro where available).",
        "Switch provider as usual — the target app restarts its session against the new gateway.",
      ],
      note: "This is the same subscription covered in the [[opencode-go|OpenCode Go guide]]: one $5 first month unlocks a DeepSeek-backed Claude Code without official Anthropic billing.",
    },
    {
      num: "07",
      title: "Avoid the Two Pitfalls That Silently Break Pro",
      description:
        "Two issues account for most \"Claude Code + DeepSeek is broken\" reports. Know both before you switch and you will skip the support threads entirely.",
      paragraphs: [
        "Pitfall one: the reasoning_content 400 on tool calls. DeepSeek thinking mode requires the reasoning_content from a tool-calling round to be passed back verbatim in every later request; drop it and the API returns HTTP 400 (\"The content[].thinking in the thinking mode must be passed back to the API.\")[6]. Claude Code and OpenCode can filter this non-standard field, so long agentic loops 400 after a tool call — this is tracked in CC Switch issue #2331 and OpenCode issue #24901. Mitigations: run CC Switch's local proxy with the Rectifier option enabled (Settings → Advanced), which repairs third-party thinking-block format mismatches, or use the community dsv4-cc-proxy, which strips thinking events on the response side and re-adds structure on the request side.",
        "Pitfall two: the [1m] suffix downgrades you in proxy mode. In direct mode, deepseek-v4-pro[1m] is the official 1M-context model name[1]. But when CC Switch local routing or proxy mode is on, the [1m] is forwarded verbatim as part of the model name, DeepSeek does not recognize it, and the backend silently falls back to deepseek-v4-flash[8]. Your Pro sessions quietly run Flash.",
      ],
      list: [
        "In CC Switch proxy or routing mode, write deepseek-v4-pro with no suffix; keep [1m] only for direct connections[8].",
        "Mixed-vendor sessions are another 400 trigger: if the first half of a conversation used another provider, the history lacks reasoning_content and the next round fails.",
        "The Anthropic endpoint ignores cache_control, citations, top_k, and image or document content blocks — do not migrate multimodal or heavy-cache workflows as-is.",
        "Housekeeping: the legacy aliases deepseek-chat and deepseek-reasoner retired on July 24, 2026, so any config still sending them now errors. Use deepseek-v4-pro or deepseek-v4-flash.",
      ],
      note: "Verify what actually ran: check CC Switch's request log, then the DeepSeek Platform usage page for request counts and token consumption. If the model column says deepseek-v4-flash when you expect pro, the [1m] suffix is the first thing to look at.",
    },
  ],
  prevGuide: { title: "OpenCode Go: The $5/Month Subscription That Unlocks DeepSeek V4", slug: "opencode-go" },
  nextGuide: { title: "DeepSeek Harness: Everything We Know Before the Official Release", slug: "deepseek-harness" },
  relatedGuides: [
    { title: "OpenCode Go: The $5/Month Subscription That Unlocks DeepSeek V4", slug: "opencode-go" },
    { title: "DeepSeek V4 Flash in Cursor, Claude Code & Codex: Setup Guide", slug: "flash-ide" },
    { title: "DeepSeek V4 Flash API Setup: Base URL, Models & Your First Call", slug: "flash-api-setup" },
    { title: "DeepSeek Harness: Everything We Know Before the Official Release", slug: "deepseek-harness" },
  ],
  sources: [
    { label: "Integrate with Claude Code — Official DeepSeek Docs", url: "https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code/" },
    { label: "Anthropic API Guide — Official DeepSeek Docs", url: "https://api-docs.deepseek.com/guides/anthropic_api/" },
    { label: "CC Switch (GitHub)", url: "https://github.com/farion1231/cc-switch" },
    { label: "CC Switch Docs — Add Provider & Claude Desktop", url: "https://ccswitch.io/en/docs?item=add&section=providers" },
    { label: "CC Switch v3.18.0 Release — OpenCode Go Presets", url: "https://github.com/farion1231/cc-switch/releases/tag/v3.18.0" },
    { label: "Thinking Mode & reasoning_content — Official DeepSeek Docs", url: "https://api-docs.deepseek.com/guides/thinking_mode/" },
    { label: "OpenCode Go — Pricing & Docs", url: "https://opencode.ai/go" },
    { label: "CC Switch Issue #2337 — [1m] in Local-Routing Mode", url: "https://github.com/farion1231/cc-switch/issues/2337" },
  ],
};
