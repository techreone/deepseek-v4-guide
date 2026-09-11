import type { GuideContent } from "./types";

// target keyword: deepseek v4 flash opencode
export const flashOpencode: GuideContent = {
  slug: "flash-opencode",
  category: "AI CODING AGENTS",
  title: "Use DeepSeek V4 Flash with OpenCode: Step-by-Step",
  seoTitle: "Use DeepSeek V4 Flash with OpenCode: Guide",
  readTime: "8 MIN READ",
  updatedAt: "SEP 11, 2026",
  notice:
    "Superseded Sept 10, 2026: DeepSeek V4-Flash was retired and now routes to V4.1 Flash. See [[deepseek-v4-1-flash|What Is DeepSeek V4.1 Flash?]] for the current model, [[v4-1-flash-pricing|the new pricing]], and [[deepseek-flash-model-names|the model-name migration table]].",
  summary:
    "DeepSeek V4 Flash OpenCode setup: connect the 284B open-weight model in minutes with /connect, opencode.json, or OpenCode Go.",
  toc: [
    { id: "step-1", label: "Step 1: What Is OpenCode and Why DeepSeek V4 Flash Fits It" },
    { id: "step-2", label: "Step 2: Prerequisites: OpenCode Version and a DeepSeek API Key" },
    { id: "step-3", label: "Step 3: Connect with the Built-in /connect DeepSeek Provider" },
    { id: "step-4", label: "Step 4: Configure opencode.json for DeepSeek V4 Flash (Manual Path)" },
    { id: "step-5", label: "Step 5: Enable Thinking and Reasoning Effort on V4 Flash" },
    { id: "step-6", label: "Step 6: Run DeepSeek V4 Flash from the Command Line" },
    { id: "step-7", label: "Step 7: OpenCode Go: DeepSeek V4 Flash on a Subscription" },
    { id: "step-8", label: "Step 8: Local Options and OpenCode vs. Claude Code & Codex" },
  ],
  steps: [
    {
      num: "01",
      title: "What Is OpenCode and Why DeepSeek V4 Flash Fits It",
      description:
        "OpenCode is an open-source, terminal-based AI coding agent that runs locally on your machine. It reads your codebase, edits files, runs commands, and keeps iterating until a task is finished, all from a TUI in your terminal.",
      paragraphs: [
        "DeepSeek officially announced that the V4 family integrates seamlessly with Claude Code, OpenClaw, and OpenCode, and that V4 already powers DeepSeek's own internal agentic coding workflows. The official guidance is direct: keep base_url, just update model to deepseek-v4-pro or deepseek-v4-flash.[1] Both the OpenAI ChatCompletions format and the Anthropic API format are supported.[2]",
        "[[deepseek-v4-flash|DeepSeek V4 Flash]] is the fast, efficient, economical tier of the V4 family. It is a [[flash-model-size|284B-total / 13B-active MoE model]] with a 1M token context window and MIT-licensed weights.[3] Its reasoning closely approaches V4 Pro, and it performs on par with V4 Pro on simple agent tasks. Community users on r/opencode call Flash the undisputed price-performance leader and the closest thing to Opus, measuring roughly 100-150 tokens/s with OpenCode.",
      ],
      list: [
        "Built-in /connect provider for DeepSeek, so no manual config file is required.",
        "The model id deepseek-v4-flash automatically points at the official 0731 build.",
        "Official [[flash-pricing|pricing]] of $0.14 input / $0.28 output per 1M tokens keeps high-volume work cheap.",
      ],
    },
    {
      num: "02",
      title: "Prerequisites: OpenCode Version and a DeepSeek API Key",
      description:
        "Before you connect, confirm your OpenCode version is at least v1.14.24 and grab a DeepSeek API key from platform.deepseek.com/api_keys. Both are one-time steps that take about a minute.",
      list: [
        "OpenCode >= v1.14.24 is required for the built-in DeepSeek provider. The old Go-binary build reports v0.0.x and throws 'agent coder not found'; reinstall with npm install -g opencode-ai.[7]",
        "Create a DeepSeek API key from the [[flash-api-setup|API Keys page]]. You paste it in raw, with no Bearer prefix.",
        "Use the model id deepseek-v4-flash. Not deepseek-v4, not deepseek-flash, and not the retired deepseek-chat or deepseek-reasoner aliases.",
      ],
      code: `curl https://api.deepseek.com/v1/models -H "Authorization: Bearer your-key"`,
      note: "Model names matter. A custom provider passes the model id through verbatim to the API, so deepseek-v4-flash must match exactly. The old aliases deepseek-chat and deepseek-reasoner were retired on July 24, 2026 and no longer route to V4 Flash.",
    },
    {
      num: "03",
      title: "Connect with the Built-in /connect DeepSeek Provider",
      description:
        "The official DeepSeek V4 Flash + OpenCode path needs no config file. Launch OpenCode, type /connect, enter deepseek, paste your API key, and pick a model.",
      code: `opencode            # enter the TUI
/connect            # type "deepseek" and select the provider
# paste your DeepSeek API Key
# pick a DeepSeek model, then fine-tune with /models`,
      note: "The official wizard defaults to the DeepSeek-V4-Pro entry, so after a full restart run /models and select deepseek-v4-flash when Flash is your target. OpenCode >= v1.14.24 is mandatory for this flow.",
    },
    {
      num: "04",
      title: "Configure opencode.json for DeepSeek V4 Flash (Manual Path)",
      description:
        "Prefer full control? Declare DeepSeek as a custom provider in opencode.json at your project root, or in ~/.config/opencode/ for a global setup that applies everywhere.[5]",
      code: `{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "deepseek": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "DeepSeek",
      "options": { "baseURL": "https://api.deepseek.com/v1" },
      "models": {
        "deepseek-v4-pro":  { "name": "DeepSeek V4 Pro" },
        "deepseek-v4-flash": { "name": "DeepSeek V4 Flash" }
      }
    }
  }
}`,
      paragraphs: [
        "Credentials stay separate from the provider config. Run opencode auth login, choose Other, use deepseek as the provider id, and paste your key. It is stored in ~/.local/share/opencode/auth.json. The provider key in opencode.json must match that id exactly.",
        "Two details trip people up: do not wrap the key in a Bearer prefix, and do not rely on a soft reload. Quit OpenCode completely and relaunch it before /models will show the newly declared models.",
      ],
    },
    {
      num: "05",
      title: "Enable Thinking and Reasoning Effort on V4 Flash",
      description:
        "DeepSeek V4 Flash keeps thinking on by default and accepts a reasoning_effort level of low, high, or max. In OpenCode you control both per model inside the provider block.",
      code: `{
  "provider": {
    "deepseek": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "DeepSeek",
      "options": { "baseURL": "https://api.deepseek.com", "apiKey": "YOUR_DEEPSEEK_API_KEY" },
      "models": {
        "deepseek-v4-pro": {
          "name": "DeepSeek-V4-Pro",
          "limit": { "context": 1048576, "output": 262144 },
          "options": { "reasoningEffort": "high", "thinking": { "type": "enabled" } }
        },
        "deepseek-v4-flash": {
          "name": "DeepSeek-V4-Flash",
          "limit": { "context": 1048576, "output": 262144 },
          "options": { "reasoningEffort": "high", "thinking": { "type": "enabled" } }
        }
      }
    }
  },
  "agents": {
    "coder":  { "model": "deepseek-v4-pro",  "maxTokens": 16000 },
    "task":   { "model": "deepseek-v4-flash", "maxTokens": 8000 },
    "title":  { "model": "deepseek-v4-flash" }
  },
  "autoCompact": true
}`,
      paragraphs: [
        "This agent-split setup is the recommended pattern: [[v4-pro|V4 Pro]] writes real code while V4 Flash handles file search, grep, and title generation. Community cost reports land around 85% Pro / 15% Flash, keeping the expensive model on the work that matters.",
        "Reasoning effort maps to OpenCode's --variant flag. --variant max is Think Max, which wants the full 384K output context. high is the cost-effective default for day-to-day coding.",
      ],
      note: "DeepSeek's official sampling guidance for agentic scenarios is temperature 1.0 and top_p 0.95 (top_p 1.0 for everything else). On high or max effort, the maximum output is 384K tokens.",
    },
    {
      num: "06",
      title: "Run DeepSeek V4 Flash from the Command Line",
      description:
        "Once connected, invoke DeepSeek V4 Flash from OpenCode directly with opencode run. You can target the official API or the OpenCode Go channel in the same command.",
      code: `opencode run -m deepseek/deepseek-v4-flash "Fix the typo in README.md"
opencode run -m deepseek/deepseek-v4-pro --dangerously-skip-permissions "Build a REST API"
opencode run -m deepseek/deepseek-v4-pro --variant max "Architect a distributed caching system"
opencode run --model opencode-go/deepseek-v4-flash --variant max "your task"   # OpenCode Go channel`,
      list: [
        "Run opencode test first. It takes about two seconds and verifies the connection before any real work.",
        "Keep the model id exactly deepseek-v4-flash; custom providers pass it through verbatim.",
        "During peak hours the official DeepSeek API can return 503s or timeouts. Raise the request timeout above 60s or route through a gateway fallback.",
        "Your auth provider id and the config key must match. Check with opencode auth list.",
      ],
    },
    {
      num: "07",
      title: "OpenCode Go: DeepSeek V4 Flash on a Subscription",
      description:
        "OpenCode Go bundles DeepSeek V4 Flash with a flat monthly credit. Subscribe at opencode.ai/auth, copy the API key, then run /connect and pick OpenCode Go.[4]",
      paragraphs: [
        "Use the model id opencode-go/deepseek-v4-flash. Under the hood it is the same deepseek-v4-flash model served through OpenCode's own endpoint, https://opencode.ai/zen/go/v1/chat/completions.",
        "Go pricing mirrors the official DeepSeek rates at $0.14 input / $0.28 output per 1M tokens, with cache reads at $0.0028. The $60 monthly credit makes Flash one of the most economical models on the service.",
      ],
      table: {
        headers: ["Item", "DeepSeek V4 Flash on OpenCode Go"],
        rows: [
          ["Price (per 1M tokens)", "$0.14 input / $0.28 output / $0.0028 cache read"],
          ["Monthly credit", "$60 included"],
          ["Request quota", "31,650 / 5 hours · 79,050 / week · 158,150 / month"],
          ["Global spend limits", "$12 / 5 hours · $30 / week · $60 / month"],
        ],
      },
      note: "Region note: the 0731 build is hosted in China on OpenCode Go. Open opencode.ai and enable 'Enable models hosted in China', then restart. Without it, requests fail with HTTP 403. Go's other models do not use China-hosted servers.",
    },
    {
      num: "08",
      title: "Local Options and OpenCode vs. Claude Code & Codex",
      description:
        "If you want to skip API keys entirely, Ollama can launch OpenCode pointed at DeepSeek V4 Flash in a single command.[6]",
      code: `ollama launch opencode --model deepseek-v4-flash:cloud`,
      paragraphs: [
        "Ollama offers the same one-liner for the other agents: ollama launch claude --model deepseek-v4-flash:cloud and ollama launch openclaw --model deepseek-v4-flash:cloud.",
        "For the comparison: OpenCode talks to DeepSeek through the OpenAI-compatible endpoint at https://api.deepseek.com/v1. [[flash-ide|Claude Code]] instead uses the Anthropic-compatible endpoint https://api.deepseek.com/anthropic, where claude-haiku* and claude-sonnet* map to deepseek-v4-flash and claude-opus* maps to deepseek-v4-pro. Routing haiku and subagent traffic to Flash cuts subagent costs by 80-90%. Codex needs no conversion layer at all: the 0731 build natively supports the Responses API and is specifically adapted for Codex.",
      ],
      table: {
        headers: ["Agent", "Config method", "V4 Flash role"],
        rows: [
          ["OpenCode", "/connect deepseek or an opencode.json provider block (@ai-sdk/openai-compatible, baseURL api.deepseek.com/v1)", "Default / grunt-work model, or -m deepseek/deepseek-v4-flash"],
          ["Claude Code", "Env vars pointing at api.deepseek.com/anthropic; ANTHROPIC_DEFAULT_HAIKU_MODEL=deepseek-v4-flash", "Haiku tier + subagents"],
          ["OpenClaw", "openclaw onboard --install-daemon, then DeepSeek and deepseek-v4-pro or deepseek-v4-flash", "Manually typed default model"],
          ["Codex CLI", "Native Responses API support since the 0731 build", "Same model, no conversion layer"],
        ],
      },
    },
  ],
  prevGuide: {
    title: "DeepSeek V4 Flash Benchmarks: Agentic & Coding Scores in 2026",
    slug: "flash-benchmarks",
  },
  nextGuide: {
    title: "DeepSeek V4 Flash in Cursor, Claude Code & Codex: Setup Guide",
    slug: "flash-ide",
  },
  relatedGuides: [
    {
      title: "DeepSeek V4 Flash in Cursor, Claude Code & Codex: Setup Guide",
      slug: "flash-ide",
    },
    {
      title: "What Is DeepSeek V4 Flash? Full Guide to the 0731 Release",
      slug: "deepseek-v4-flash",
    },
    {
      title: "DeepSeek V4 Flash API Setup: Base URL, Models & Your First Call",
      slug: "flash-api-setup",
    },
  ],
  sources: [
    {
      label: "Official DeepSeek OpenCode Integration Guide",
      url: "https://api-docs.deepseek.com/quick_start/agent_integrations/opencode/",
    },
    {
      label: "Official DeepSeek Coding Agents Guide",
      url: "https://api-docs.deepseek.com/guides/coding_agents/",
    },
    {
      label: "DeepSeek V4 Preview Announcement",
      url: "https://api-docs.deepseek.com/news/news260424/",
    },
    {
      label: "OpenCode Go Documentation",
      url: "https://opencode.ai/docs/go/",
    },
    {
      label: "OpenCode Providers Documentation",
      url: "https://opencode.ai/docs/providers/",
    },
    {
      label: "DeepSeek Awesome Agent Repository",
      url: "https://github.com/deepseek-ai/awesome-deepseek-agent",
    },
    {
      label: "OpenCode + DeepSeek Setup Guide (Haimaker)",
      url: "https://haimaker.ai/blog/deepseek-opencode-setup/",
    },
    {
      label: "OpenRouter: DeepSeek V4 Flash Model Page",
      url: "https://openrouter.ai/deepseek/deepseek-v4-flash",
    },
  ],
};
