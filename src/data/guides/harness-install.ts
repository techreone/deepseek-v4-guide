import type { GuideContent } from "./types";

// 目标关键词：deepseek harness install
// 内容来源：reference/topics/23-harness-usage-plugins.md（2026-08-16 定稿）
export const harnessInstall: GuideContent = {
  slug: "harness-install",
  category: "TUTORIAL",
  title: "How to Install DeepSeek Harness: One Command or From Source",
  seoTitle: "Install DeepSeek Harness (npx dsh)",
  readTime: "6 MIN READ",
  updatedAt: "AUG 16, 2026",
  summary:
    "Install DeepSeek Harness in one line with npx @deepseek-ai/dsh web, or build from source with pnpm. Covers the Web UI at 127.0.0.1:3080.",
  toc: [
    { id: "step-1", label: "Step 1: Prerequisites" },
    { id: "step-2", label: "Step 2: One-Command Install (npx)" },
    { id: "step-3", label: "Step 3: Build From Source (pnpm)" },
    { id: "step-4", label: "Step 4: Launch the Web UI" },
    { id: "step-5", label: "Step 5: Choose a Workspace and Start a Session" },
    { id: "step-6", label: "Step 6: Verify Your Install" },
  ],
  steps: [
    {
      num: "01",
      title: "Prerequisites",
      description:
        "You need Node.js installed (the npm package is @deepseek-ai/dsh). For the source build you also need pnpm, because the repo is a pnpm workspace monorepo[1][2].",
      list: [
        "Node.js 20+ (check with node --version)",
        "npm or pnpm for the npx route",
        "For source builds: pnpm only (the monorepo does not support npm/yarn installs cleanly)[2]",
      ],
      note: "The dsh CLI itself is lightweight; models are billed through the API providers you configure, not through the harness[1].",
    },
    {
      num: "02",
      title: "One-Command Install (npx)",
      description:
        "The fastest way to get DeepSeek Harness running is a single npx command that downloads the package and starts the Web UI[1]:",
      code: `# install and launch the Web UI in one shot
npx @deepseek-ai/dsh web

# the Web UI is served at:
# http://127.0.0.1:3080`,
      paragraphs: [
        "The web subcommand is an alias for --profile web. On first run, dsh auto-initializes the web profile, downloading the default bundles (the Standard coding agent) and creating your profile directory under $DSH_HOME[2].",
      ],
    },
    {
      num: "03",
      title: "Build From Source (pnpm)",
      description:
        "If you want to read the code, patch it, or develop plugins, clone and build the monorepo[1]:",
      code: `git clone https://github.com/deepseek-ai/deepseek-harness.git
cd deepseek-harness
pnpm install
pnpm run build
pnpm dsh web`,
      paragraphs: [
        "The build step matters: production runs expect built artifacts, so skipping pnpm run build produces confusing failures when you launch dsh. The repo uses pnpm workspaces, and build output lands in the packages before the CLI runs[2].",
      ],
    },
    {
      num: "04",
      title: "Launch the Web UI",
      description:
        "Both routes land you on the local Web UI at 127.0.0.1:3080. The interface is itself a plugin in dsh's 'everything is a plugin' model, so community skins (dsh-web-ui) and TUIs are drop-in alternatives[2][3].",
      code: `# explicit profile launch (same as 'dsh web')
dsh --profile web

# custom port
dsh --profile web --port 8080

# one-shot headless session (prints the answer, exits)
dsh --profile headless "refactor src/utils.ts and run the tests"`,
      note: "Port 3080 is the default; if you change it with --port, remember the app-arguments go after the launcher flags[2].",
    },
    {
      num: "05",
      title: "Choose a Workspace and Start a Session",
      description:
        "dsh uses your launch directory as the default filesystem position. In the Web UI you must explicitly choose a workspace (a project directory) before starting a session — sessions are sandboxed to that workspace[2].",
      list: [
        "In the Web UI, use the workspace picker to select the project folder",
        "The agent can read/write files inside the chosen workspace",
        "Starting dsh from the wrong directory is the #1 'my files are missing' cause — always confirm the workspace[2]",
      ],
      paragraphs: [
        "After choosing a workspace, you will be asked to configure a model provider on first session (DeepSeek native or a custom provider). If that step trips you up, the [[harness-setup|setup guide]] walks through providers and credentials.",
      ],
    },
    {
      num: "06",
      title: "Verify Your Install",
      description:
        "Quick sanity checks after install[2]:",
      list: [
        "dsh --help prints the launcher help (app args go after launcher flags)",
        "dsh --dump-default-config prints the composed config tree without starting",
        "dsh --profile web --port 8080 binds port 8080 without errors",
        "The Web UI loads a model picker and workspace picker at 127.0.0.1:3080",
      ],
      paragraphs: [
        "If the Web UI loads but sessions fail with MISSING_CREDENTIAL or UNKNOWN_MODEL, the problem is provider configuration, not the install — see [[harness-model|connecting any model]] and the troubleshooting table there.",
      ],
      note: "For everything that can go wrong after install, read [[harness-error-fix|common dsh errors and fixes]].",
    },
  ],
  relatedGuides: [
    { title: "What Is DeepSeek Harness?", slug: "what-is-deepseek-harness" },
    { title: "DeepSeek Harness Setup Guide", slug: "harness-setup" },
    { title: "DeepSeek Harness: Use Any Model", slug: "harness-model" },
    { title: "DeepSeek Harness Web UI", slug: "harness-web-ui" },
    { title: "DeepSeek Harness Common Errors", slug: "harness-error-fix" },
  ],
  sources: [
    { label: "deepseek-ai/deepseek-harness (GitHub README)", url: "https://github.com/deepseek-ai/deepseek-harness" },
    { label: "dsh CLI README (official)", url: "https://raw.githubusercontent.com/deepseek-ai/deepseek-harness/master/apps/cli/README.md" },
    { label: "The Complete Guide to dsh (open-harness.net)", url: "https://www.open-harness.net/" },
    { label: "DeepSeek Harness — Official Page", url: "https://deepseek.com/harness/en/" },
  ],
};
