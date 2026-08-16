import type { GuideContent } from "./types";

// 目标关键词：deepseek harness model（use any model）
// 内容来源：reference/topics/23-harness-usage-plugins.md providers 部分（2026-08-16 定稿）
export const harnessModel: GuideContent = {
  slug: "harness-model",
  category: "TUTORIAL",
  title: "DeepSeek Harness Models: How to Use Any Model (Not Just DeepSeek)",
  seoTitle: "DeepSeek Harness: Connect Any Model",
  readTime: "8 MIN READ",
  updatedAt: "AUG 16, 2026",
  summary:
    "DeepSeek Harness is model-agnostic: connect DeepSeek natively, pick an Anthropic/OpenAI provider, or add an OpenAI-compatible endpoint. settings.yaml explained.",
  toc: [
    { id: "step-1", label: "Step 1: Models Are Plugins" },
    { id: "step-2", label: "Step 2: DeepSeek Native" },
    { id: "step-3", label: "Step 3: Directory Providers (Anthropic, OpenAI, More)" },
    { id: "step-4", label: "Step 4: Custom Providers" },
    { id: "step-5", label: "Step 5: settings.yaml Deep Dive" },
    { id: "step-6", label: "Step 6: Troubleshooting Provider Errors" },
  ],
  steps: [
    {
      num: "01",
      title: "Models Are Plugins",
      description:
        "Unlike vendor-locked agent tools, DeepSeek Harness treats models as swappable plugins. The official page is explicit: plugins provide every agent capability, including models, and developers can select, swap, or extend any capability in configuration without changing the Harness source code[1].",
      paragraphs: [
        "Concretely, that means the same harness can drive DeepSeek V4, Claude, GPT, Gemini, or a company gateway — and the model change takes effect on the next request, no restart required[2].",
      ],
      note: "Model freedom is one of the main reasons teams evaluate dsh over Claude Code — see [[harness-vs-claude-code|the comparison guide]].",
    },
    {
      num: "02",
      title: "DeepSeek Native",
      description:
        "The zero-config path is DeepSeek's own models: Settings → Models → enter your DeepSeek API key, and the default model set (V4-Pro / V4-Flash) becomes available[2].",
      code: `# in the Web UI
Settings → Models → add DeepSeek API key
# keys are stored in $DSH_HOME/.credentials.yaml (write-only after save)`,
      list: [
        "Default models: DeepSeek V4 Pro and V4 Flash",
        "The key is stored redacted — change it through the Models page, not by editing the file[2]",
        "No baseURL needed; DeepSeek's endpoint is built into the dsh-llm-deepseek adapter",
      ],
    },
    {
      num: "03",
      title: "Directory Providers (Anthropic, OpenAI, More)",
      description:
        "For non-DeepSeek models, add a directory provider: Add provider → select Anthropic or OpenAI → enter your key. Directory providers ship with the endpoint, protocol, and model list, so there is nothing else to fill in[2].",
      paragraphs: [
        "The exceptions are providers with special auth flows: Bedrock (AWS credentials + region), Vertex (ADC project), Azure (api-version), and Codex (OAuth). For those, just pasting an API key is not enough — configure the full credential context in the provider settings[2].",
      ],
    },
    {
      num: "04",
      title: "Custom Providers",
      description:
        "If your model lives behind a company gateway, a self-hosted endpoint, or any OpenAI-compatible service not in the directory, add a custom provider[2]:",
      list: [
        "Provider ID: permanent, lowercase, no spaces",
        "baseURL: the OpenAI-compatible base (e.g. https://gateway.example/v1)",
        "API protocol: openai-completions (or the matching protocol)",
        "Credential: API key or an environment variable via apiKeyEnv",
        "Models: enter them manually, or use 'Fetch available models' to probe GET /models[2]",
      ],
      paragraphs: [
        "Custom providers are how teams route dsh through LiteLLM-style gateways, keep keys out of config (apiKeyEnv), and test local servers.",
      ],
    },
    {
      num: "05",
      title: "settings.yaml Deep Dive",
      description:
        "Providers are declared in $DSH_HOME/settings.yaml under llm-pi-ai. The official example[2]:",
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
        "The input field declares modalities: hand-entered models default to text-only, so a vision model needs input: [text, image]. defaultInput acts as a fallback for requests without an explicit modality, and directory providers can be adjusted with modelOverrides. The relevant adapters are dsh-llm-pi-ai (any-model) and dsh-llm-deepseek (DeepSeek-specific)[2].",
      ],
    },
    {
      num: "06",
      title: "Troubleshooting Provider Errors",
      description:
        "The official troubleshooting table covers the common failures[2]:",
      table: {
        headers: ["Error", "Cause / fix"],
        rows: [
          ["MISSING_CREDENTIAL", "No key stored for the provider; save it on the Models page or set the apiKeyEnv variable"],
          ["UNKNOWN_MODEL", "The selected model is not configured; add it to the provider's models list"],
          ["Fetch models → 401", "Wrong key, or the endpoint lacks GET /models — enter models manually"],
          ["Image rejected", "The model does not declare the image modality; add input: [text, image]"],
          ["Provider refuses image request", "Endpoint does not actually support images — remove the image declaration and start a new session"],
        ],
      },
      note: "Still stuck? See [[harness-error-fix|common dsh errors]] for the wider troubleshooting guide.",
    },
  ],
  relatedGuides: [
    { title: "DeepSeek Harness Setup Guide", slug: "harness-setup" },
    { title: "DeepSeek V4 Pro API Setup", slug: "v4-pro-api" },
    { title: "DeepSeek V4 Pro Official Release", slug: "v4-pro" },
    { title: "DeepSeek Harness vs Claude Code", slug: "harness-vs-claude-code" },
    { title: "DeepSeek Harness Common Errors", slug: "harness-error-fix" },
  ],
  sources: [
    { label: "DeepSeek Harness — Official Page", url: "https://deepseek.com/harness/en/" },
    { label: "dsh Providers Guide (official)", url: "https://raw.githubusercontent.com/deepseek-ai/deepseek-harness/master/docs/user/guide/providers.md" },
    { label: "The Complete Guide to dsh (open-harness.net)", url: "https://www.open-harness.net/" },
    { label: "dsh CLI README (official)", url: "https://raw.githubusercontent.com/deepseek-ai/deepseek-harness/master/apps/cli/README.md" },
  ],
};
