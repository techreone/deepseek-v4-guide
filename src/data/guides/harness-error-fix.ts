import type { GuideContent } from "./types";

// target keyword: deepseek harness errors (troubleshooting)
// content source: reference/topics/23-harness-usage-plugins.md (2026-08-16)
export const harnessErrorFix: GuideContent = {
  slug: "harness-error-fix",
  category: "TUTORIAL",
  title: "DeepSeek Harness Common Errors: The Official Troubleshooting Table",
  seoTitle: "DeepSeek Harness Errors & Fixes",
  readTime: "6 MIN READ",
  updatedAt: "AUG 16, 2026",
  summary:
    "Fix DeepSeek Harness errors fast: MISSING_CREDENTIAL, UNKNOWN_MODEL, image refusals, install gotchas, and where to report bugs (Discussions, not Issues).",
  toc: [
    { id: "step-1", label: "Before You Debug" },
    { id: "step-2", label: "MISSING_CREDENTIAL" },
    { id: "step-3", label: "UNKNOWN_MODEL & Fetch 401" },
    { id: "step-4", label: "Image Requests Refused" },
    { id: "step-5", label: "Install & Launch Gotchas" },
    { id: "step-6", label: "Where to Get Help" },
  ],
  steps: [
    {
      num: "01",
      title: "Before You Debug",
      description:
        "DeepSeek Harness is a developer preview, and the official README is explicit: THERE WILL BE COMPATIBILITY-BREAKING CHANGES[1]. If a fresh install misbehaves, check your version first — old early rcs (0.0.1-rc.5) shipped bundled components that were later removed, and may not match current docs[2].",
      paragraphs: [
        "The repo has GitHub Issues disabled and accepts no external PRs. Bug reports and help live in GitHub Discussions and the community Discord — search there before filing[1][3].",
      ],
      note: "Rule of thumb: pin a current rc, and after any upgrade, re-run your critical workflows. Breaking changes are expected during the preview window.",
    },
    {
      num: "02",
      title: "MISSING_CREDENTIAL",
      description:
        "You have not stored a provider key. The harness cannot authenticate to the model API[4].",
      list: [
        "Fix: open Settings → Models and save the provider key for the model in use",
        "Alternative: set the corresponding environment variable the provider expects",
        "Keys live in $DSH_HOME/.credentials.yaml and are write-only after save — re-enter rather than edit",
      ],
      note: "Custom providers (company gateway, self-hosted endpoint) need their credential saved through the same flow — a bare key in the YAML is not enough[4].",
    },
    {
      num: "03",
      title: "UNKNOWN_MODEL & Fetch 401",
      description:
        "UNKNOWN_MODEL means the model you selected is not among the configured models for the active provider. The 401 variant appears when fetching the model list[4].",
      list: [
        "UNKNOWN_MODEL: pick a configured model, or add the missing model to the provider's model list",
        "Fetch models → 401: your key is wrong, or the endpoint does not support GET /models — if so, add models manually",
      ],
      code: `# Add a custom model manually in $DSH_HOME/settings.yaml
llm-pi-ai:
  providers:
    my-gateway:
      api: openai-completions
      baseURL: https://gateway.example/v1
      models:
        - id: legacy-chat
        - id: vision-preview
          input: [text, image]`,
    },
    {
      num: "04",
      title: "Image Requests Refused",
      description:
        "Your model rejected an image you sent. In dsh, models are text-only by default unless they declare image input[4].",
      list: [
        "Model refuses images: declare image modality — input: [text, image] on the model entry",
        "Provider rejects the request anyway: the endpoint does not actually support images — remove the image declaration and start a new session",
        "Vision models in the ecosystem: liustack/modlens is the community's first vision bridge plugin[5]",
      ],
      note: "After any model config change, open a fresh session — modality declarations apply per session[4].",
    },
    {
      num: "05",
      title: "Install & Launch Gotchas",
      description:
        "Community hands-on reports plus the docs surface four recurring setup traps[1][3][6].",
      list: [
        "npm route requires Node.js installed first",
        "Source builds need pnpm and a completed pnpm run build — production runs require built artifacts",
        "The dsh process uses its launch directory as the filesystem root; launching from the wrong directory = empty workspace. Choose the workspace explicitly in the Web UI",
        "Headless failures exit non-zero; the exit code distinguishes command, config, and startup failures — scriptable, but read the logs",
      ],
      note: "A 30-second install is the norm — the rough edges are mostly version drift and workspace selection, not the product itself[6].",
    },
    {
      num: "06",
      title: "Where to Get Help",
      description:
        "When the official table does not cover your case, the community channels are the source of truth[1][3].",
      list: [
        "GitHub Discussions — official channel for bugs and questions (Issues are disabled)",
        "Community Discord — real-time help",
        "open-harness.net — independent complete guide with a troubleshooting section",
        "deepseekharness.io — plugin index and community resources",
      ],
      paragraphs: [
        "Deep dive first: the [[harness-tutorial|tutorial]] walks a full working setup, and the [[harness-web-ui|Web UI guide]] explains workspaces and the Trajectory view that make most 'weird behavior' debuggable in minutes.",
      ],
    },
  ],
  relatedGuides: [
    { title: "DeepSeek Harness Tutorial: Build Your First Agent", slug: "harness-tutorial" },
    { title: "DeepSeek Harness Install Guide", slug: "harness-install" },
    { title: "DeepSeek Harness Web UI Guide", slug: "harness-web-ui" },
    { title: "DeepSeek Harness with Claude Code", slug: "harness-claude-code" },
  ],
  sources: [
    { label: "GitHub — deepseek-ai/deepseek-harness README (preview warnings, Discussions)", url: "https://github.com/deepseek-ai/deepseek-harness" },
    { label: "Medium — DeepSeek Cut 262 MiB of Claude Code From Its New Harness", url: "https://medium.com/@richardhightower/deepseek-harness-launches-deepseek-harness-vs-grok-build-are-they-the-claude-code-killer-c7259fa1d507" },
    { label: "open-harness.net — DeepSeek Harness Complete Guide (troubleshooting)", url: "https://www.open-harness.net/" },
    { label: "DeepSeek Harness docs — providers & credentials (official error table)", url: "https://raw.githubusercontent.com/deepseek-ai/deepseek-harness/master/docs/user/guide/providers.md" },
    { label: "GitHub — awesome-dsh-plugin (modlens vision plugin)", url: "https://github.com/awesome-dsh-plugin/awesome-dsh-plugin" },
    { label: "mdnice — DeepSeek Harness 30-second install hands-on", url: "https://mdnice.com/writing/b574368333ac46fbbef6658a5511b7cd" },
  ],
};
