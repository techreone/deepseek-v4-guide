import type { GuideContent } from "./types";

// 目标关键词：deepseek harness setup
// 内容来源：reference/topics/23-harness-usage-plugins.md（2026-08-16 定稿）
export const harnessSetup: GuideContent = {
  slug: "harness-setup",
  category: "TUTORIAL",
  title: "DeepSeek Harness Setup Guide: Profiles, Config Layers, and Models",
  seoTitle: "DeepSeek Harness Setup & Config Guide",
  readTime: "8 MIN READ",
  updatedAt: "AUG 16, 2026",
  summary:
    "Configure DeepSeek Harness like a pro: profile bundles, cordis.patch.yml layering, $DSH_HOME, and settings.yaml model providers.",
  toc: [
    { id: "step-1", label: "Step 1: How Configuration Is Composed" },
    { id: "step-2", label: "Step 2: Profiles and Bundles" },
    { id: "step-3", label: "Step 3: The Patch Layering Order" },
    { id: "step-4", label: "Step 4: Configure Model Providers (settings.yaml)" },
    { id: "step-5", label: "Step 5: Credentials" },
    { id: "step-6", label: "Step 6: Inspect the Result" },
  ],
  steps: [
    {
      num: "01",
      title: "How Configuration Is Composed",
      description:
        "The core idea of dsh setup is 'compose with configuration': every capability is a plugin, and profiles are just ordered lists of plugin bundles patched by a few YAML layers — you never edit the framework source to change behavior[1].",
      paragraphs: [
        "A profile directory contains two files: package.json (whose dsh.profile manifest lists an ordered bundles array) and cordis.patch.yml (the user patch layer for that profile). The web and headless profiles are auto-initialized on first use; other profiles are created with dsh plugin[2].",
      ],
      code: `# list and inspect your profile
dsh --dump-default-config   # composed config without launching
dsh --dump-config           # current profile's composed config
dsh --help                  # launcher flags (app args go after them)`,
    },
    {
      num: "02",
      title: "Profiles and Bundles",
      description:
        "Bundles are named groups of plugins. The default web profile bundles the Standard coding agent: file editing, shell, file and web search, skills, planning, goals, subagents, workflows, and the Web UI[1][2].",
      list: [
        "web profile = Standard agent + Web UI (127.0.0.1:3080)",
        "headless profile = one-shot CLI sessions that print the final answer",
        "Code / Minimal / Creator are other preset compositions of the same plugin system[1]",
        "Custom profiles: create with dsh plugin --profile <name> <pnpm args>",
      ],
      note: "You can add, remove, or reorder bundles — that is what 'compose with configuration' means[1].",
    },
    {
      num: "03",
      title: "The Patch Layering Order",
      description:
        "When multiple layers define the same setting, the last one wins. The order is[2]:",
      code: `1. bundle patches (in bundles[] order)
2. profile's cordis.patch.yml
3. $DSH_HOME/cordis.patch.yml   (global, applies to all profiles)
4. --patch overlay flags        (CLI, highest priority)`,
      paragraphs: [
        "This layering is what lets you keep a clean global config in $DSH_HOME while overriding per-project behavior in a profile, and per-run behavior with --patch. $DSH_HOME defaults to ~/.config/dsh on Linux, ~/Library/Application Support/dsh on macOS, and the equivalent on Windows.",
      ],
    },
    {
      num: "04",
      title: "Configure Model Providers (settings.yaml)",
      description:
        "Model providers live in $DSH_HOME/settings.yaml under the llm-pi-ai section. The canonical example from the official docs[3]:",
      code: `llm-pi-ai:
  providers:
    my-gateway:
      apiKeyEnv: GATEWAY_API_KEY
      api: openai-completions
      baseURL: https://gateway.example/v1
      models:
        - id: legacy-chat
        - id: vision-preview
          input: [text, image]`,
      paragraphs: [
        "The input field declares the model's modalities (text/image); hand-entered models default to text-only. defaultInput acts as a fallback, and directory providers can be adjusted with modelOverrides. The related packages are dsh-llm-pi-ai (any-model adapter) and dsh-llm-deepseek (DeepSeek-specific)[3].",
        "Model changes take effect on the next request — no restart needed[3].",
      ],
    },
    {
      num: "05",
      title: "Credentials",
      description:
        "API keys are stored in $DSH_HOME/.credentials.yaml and are write-only from the UI: once stored, the UI shows only redacted descriptions. To change a key, use the Models page in the Web UI rather than hand-editing the credentials file[3].",
      list: [
        "DeepSeek native: Settings → Models → enter your DeepSeek API key",
        "Directory providers (Anthropic, OpenAI, etc.): Add provider → select → enter key",
        "Custom provider: Provider ID (permanent, lowercase) + baseURL + API protocol + credential + models",
        "Special auth: Bedrock (AWS creds + region), Vertex (ADC project), Azure (api-version), Codex (OAuth) need more than an API key[3]",
      ],
      note: "You can also point at an environment variable via apiKeyEnv (as in the settings.yaml example), which keeps secrets out of config files.",
    },
    {
      num: "06",
      title: "Inspect the Result",
      description:
        "Before starting a session, dump the composed config to confirm your patches applied and the right models are visible[2]:",
      code: `dsh --dump-config          # inspect the final config tree
# then launch:
dsh --profile web         # or: dsh web`,
      paragraphs: [
        "If a session then fails with MISSING_CREDENTIAL or UNKNOWN_MODEL, check the troubleshooting table in the [[harness-model|use-any-model guide]]. For the full plugin install story (markets, bundles, safety), read [[harness-plugins|the plugin ecosystem guide]].",
      ],
    },
  ],
  relatedGuides: [
    { title: "How to Install DeepSeek Harness", slug: "harness-install" },
    { title: "DeepSeek Harness: Use Any Model", slug: "harness-model" },
    { title: "DeepSeek Harness Cordis Architecture", slug: "harness-cordis" },
    { title: "DeepSeek Harness Plugins", slug: "harness-plugins" },
    { title: "DeepSeek Harness Common Errors", slug: "harness-error-fix" },
  ],
  sources: [
    { label: "DeepSeek Harness — Official Page", url: "https://deepseek.com/harness/en/" },
    { label: "dsh CLI README (official)", url: "https://raw.githubusercontent.com/deepseek-ai/deepseek-harness/master/apps/cli/README.md" },
    { label: "dsh Providers Guide (official)", url: "https://raw.githubusercontent.com/deepseek-ai/deepseek-harness/master/docs/user/guide/providers.md" },
    { label: "The Complete Guide to dsh (open-harness.net)", url: "https://www.open-harness.net/" },
  ],
};
