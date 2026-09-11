import type { GuideContent } from "./types";

// target keyword: deepseek harness quickstart
// content source: reference/topics/23-harness-usage-plugins.md (2026-08-16)
export const harnessQuickstart: GuideContent = {
  slug: "harness-quickstart",
  category: "TUTORIAL",
  title: "DeepSeek Harness Quickstart: Running in 60 Seconds",
  seoTitle: "DeepSeek Harness Quickstart Guide",
  readTime: "4 MIN READ",
  updatedAt: "AUG 16, 2026",
  summary:
    "Run DeepSeek Harness in under a minute: npx @deepseek-ai/dsh web, pick a workspace, add your API key, and run your first agent task.",
  toc: [
    { id: "step-1", label: "Prerequisites" },
    { id: "step-2", label: "Launch the Harness" },
    { id: "step-3", label: "Add Your API Key" },
    { id: "step-4", label: "Run Your First Task" },
    { id: "step-5", label: "Quick Answers to Common Questions" },
    { id: "step-6", label: "What to Try Next" },
  ],
  steps: [
    {
      num: "01",
      title: "Prerequisites",
      description:
        "You need Node.js (for the npm package) and a DeepSeek API key — the same key you use for [[flash-api-setup|DeepSeek API calls]][1].",
      list: [
        "Node.js installed",
        "DeepSeek API key (platform.deepseek.com)",
        "About one minute of patience",
      ],
    },
    {
      num: "02",
      title: "Launch the Harness",
      description:
        "One command downloads and starts the harness with its Web UI[1].",
      code: `npx @deepseek-ai/dsh web

# Then open http://127.0.0.1:3080 in your browser`,
      note: "This is dsh v0.1.0-rc.x, a developer preview — expect breaking changes between releases. The community reports a 30-second install with a few rough edges on the way[2].",
      paragraphs: [
        "The npx command does double duty: it fetches the latest package and starts the web profile. If npx fails with a network error, install Node.js 20+ first or clone the repo and build from source (pnpm install && pnpm run build && pnpm dsh web)[1].",
      ],
    },
    {
      num: "03",
      title: "Add Your API Key",
      description:
        "In the UI: Settings → Models → add your DeepSeek API key. It is saved to $DSH_HOME/.credentials.yaml and becomes write-only after that[3].",
      paragraphs: [
        "dsh defaults to DeepSeek models. If you want Claude, GPT, or a custom gateway later, the provider screen supports catalog providers and custom OpenAI-compatible endpoints — see the [[harness-model|model configuration guide]].",
        "Key management note: once saved, keys are write-only — you cannot read them back from the UI or the credentials file. If you suspect a bad key, re-enter it in the Models screen rather than trying to edit the stored value.",
      ],
    },
    {
      num: "04",
      title: "Run Your First Task",
      description:
        "Choose a workspace (your project folder), open a session, and ask for something real[4].",
      code: `# In the session box:
"Summarize this repository's structure in 10 bullets"

# Or terminal one-shot:
dsh --profile headless "Summarize this repository in 10 bullets"`,
      paragraphs: [
        "The agent reads files, may run shell commands, and returns an answer. Open the Trajectory view afterwards to see exactly what it saw and did[5].",
        "If the agent cannot see your files, you chose the wrong workspace: the session uses the selected workspace as its file root, so pick the project directory in the workspace chooser before opening the session[4].",
        "Still nothing happening? Check the Models screen shows a saved key and that your DeepSeek account has credit — MISSING_CREDENTIAL and silent 401s are the two most common first-run blockers, both covered in the [[harness-error-fix|troubleshooting guide]].",
      ],
    },
    {
      num: "05",
      title: "Quick Answers to Common Questions",
      description:
        "The three questions that come up in every first-run thread[1][3][4].",
      list: [
        "Does dsh work without a DeepSeek account? — Yes: models are plugins, so you can configure any OpenAI-compatible provider. DeepSeek is just the default.",
        "Why can't the agent see my files? — You launched in the wrong directory or skipped the workspace chooser. Pick the project folder in the UI before opening a session.",
        "Is it safe to use with my API key? — Keys are stored write-only in $DSH_HOME/.credentials.yaml; only install plugins you trust, since plugins run with your credentials[6].",
      ],
      paragraphs: [
        "Anything else: the [[harness-error-fix|error table]] is the fastest first stop, and the community Discord + GitHub Discussions are where the preview-era answers actually live[1].",
      ],
    },
    {
      num: "06",
      title: "What to Try Next",
      description:
        "The quickstart is the front door. From here the obvious next stops are[1][6].",
      list: [
        "[[harness-tutorial|Full tutorial]] — build a real agent setup step by step",
        "[[harness-plugins|Plugins]] — add community extensions (616+ available)",
        "[[harness-mcp|MCP setup]] — connect external tools",
        "[[harness-cursor|Cursor integration]] — drive the harness from your IDE",
        "[[harness-terminal|CLI reference]] — profiles, headless jobs, config inspection",
      ],
      note: "Rough edge somewhere? The [[harness-error-fix|troubleshooting guide]] covers the official error table.",
    },
  ],
  relatedGuides: [
    { title: "DeepSeek Harness Install Guide", slug: "harness-install" },
    { title: "DeepSeek Harness Tutorial: Build Your First Agent", slug: "harness-tutorial" },
    { title: "DeepSeek Harness Web UI Guide", slug: "harness-web-ui" },
    { title: "DeepSeek V4 Flash API Setup", slug: "flash-api-setup" },
  ],
  sources: [
    { label: "DeepSeek Harness — root README (npx quick start)", url: "https://github.com/deepseek-ai/deepseek-harness" },
    { label: "mdnice — DeepSeek Harness 30-second install hands-on", url: "https://mdnice.com/writing/b574368333ac46fbbef6658a5511b7cd" },
    { label: "DeepSeek Harness docs — providers & credentials", url: "https://raw.githubusercontent.com/deepseek-ai/deepseek-harness/master/docs/user/guide/providers.md" },
    { label: "DeepSeek Harness docs — user guide (workspaces)", url: "https://raw.githubusercontent.com/deepseek-ai/deepseek-harness/master/docs/user/guide/index.md" },
    { label: "DeepSeek Harness Official Site — every run is traceable", url: "https://deepseek.com/harness/en/" },
    { label: "open-harness.net — DeepSeek Harness Complete Guide", url: "https://www.open-harness.net/" },
  ],
};
