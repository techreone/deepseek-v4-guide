import type { GuideContent } from "./types";

// target keyword: deepseek harness cli (terminal commands)
// content source: reference/topics/23-harness-usage-plugins.md (2026-08-16)
export const harnessTerminal: GuideContent = {
  slug: "harness-terminal",
  category: "TUTORIAL",
  title: "DeepSeek Harness CLI Commands: The Complete dsh Reference",
  seoTitle: "DeepSeek Harness CLI (dsh) Commands",
  readTime: "7 MIN READ",
  updatedAt: "AUG 16, 2026",
  summary:
    "Every DeepSeek Harness dsh command explained: web, profiles, headless jobs, plugin management, and config inspection — with usage examples.",
  toc: [
    { id: "step-1", label: "Command Overview" },
    { id: "step-2", label: "dsh web: Launch the UI" },
    { id: "step-3", label: "Profiles: Isolate Your Setups" },
    { id: "step-4", label: "Headless Mode: One-Shot Jobs" },
    { id: "step-5", label: "Plugin Management" },
    { id: "step-6", label: "Config Inspection & Flags" },
  ],
  steps: [
    {
      num: "01",
      title: "Command Overview",
      description:
        "The dsh CLI (npm package @deepseek-ai/dsh) is a launcher that starts apps under named profiles. Everything hangs off a small command surface[1].",
      table: {
        headers: ["Command", "What it does"],
        rows: [
          ["dsh web", "Start the Web UI (alias for --profile web)"],
          ["dsh --profile <name>", "Start an app under a named profile"],
          ["dsh --profile headless \"<task>\"", "Run one session, print the answer, exit"],
          ["dsh plugin --profile <name> <pnpm args>", "Manage plugins for a profile"],
          ["dsh --dump-default-config", "Print the default config tree (no launch)"],
          ["dsh --dump-config", "Print the merged config tree (no launch)"],
          ["dsh --help", "Launcher help"],
        ],
      },
    },
    {
      num: "02",
      title: "dsh web: Launch the UI",
      description:
        "The fastest way to start is npx @deepseek-ai/dsh web, which downloads the package and starts the Web UI at http://127.0.0.1:3080[1][2].",
      code: `# One-line launch (requires Node.js)
npx @deepseek-ai/dsh web

# Change the port (app parameters come after launcher flags)
dsh --profile web --port 8080`,
      note: "From source builds, always run pnpm run build before pnpm dsh — production runs require built artifacts[1].",
    },
    {
      num: "03",
      title: "Profiles: Isolate Your Setups",
      description:
        "A profile is a directory under $DSH_HOME/profiles/<name> containing a package.json (with the dsh.profile manifest listing ordered bundles) and a cordis.patch.yml user layer[1].",
      paragraphs: [
        "The web and headless profiles auto-initialize on first use; other profiles are created through dsh plugin. Each profile is a self-contained agent configuration — different models, different plugin sets, different filesystem roots.",
        "Profiles are cheap: create one per experiment or per client project. If a profile goes sideways, you can inspect its merged config with dsh --dump-config before touching anything, or delete the profile directory to start clean.",
        "Using one profile per project is the community-recommended pattern, because the launch directory becomes the profile's filesystem workspace[1].",
      ],
      list: [
        "Profile dir: $DSH_HOME/profiles/<name>",
        "Config layers merge: bundle patches → profile patch → global patch → --patch",
        "web/headless auto-initialize; custom profiles via dsh plugin",
      ],
    },
    {
      num: "04",
      title: "Headless Mode: One-Shot Jobs",
      description:
        "Headless runs a complete session in one invocation and prints the final answer — designed for scripts, CI, and editor delegation[1].",
      code: `# Run a one-shot agent task
dsh --profile headless "Refactor src/utils.ts and run the tests"

# Non-zero exit = command, config, or startup failure (scriptable)
dsh --profile headless "..." || echo "job failed"`,
      paragraphs: [
        "Because exit codes are meaningful, headless jobs chain cleanly into CI pipelines and pre-commit hooks. Combine with [[harness-cursor|Cursor's headless channel]] for IDE-integrated one-shots.",
        "One gotcha: headless uses its own profile, so plugins you installed for the web profile are not automatically present. Run dsh plugin --profile headless add <package> for anything the job needs.",
      ],
    },
    {
      num: "05",
      title: "Plugin Management",
      description:
        "dsh plugin forwards its arguments to pnpm, so any pnpm add/remove pattern works against the profile[1].",
      code: `# Add a plugin to the web profile
dsh plugin --profile web add <package-name>

# Add the community plugin market, then browse it
dsh plugin --profile web add dshmarket

# Chat-based plugin finder
dsh plugin --profile web add dsh-find-plugin

# Manage a headless profile's plugins
dsh plugin --profile headless add <package-name>`,
      note: "Plugin discovery, safety notes, and the popular list live in the [[harness-plugins|plugins guide]].",
    },
    {
      num: "06",
      title: "Config Inspection & Flags",
      description:
        "Before launching a complex stack, inspect what the merged configuration actually contains[1].",
      code: `# Print the default config tree
dsh --dump-default-config

# Print the merged tree (bundles + patches + overrides)
dsh --dump-config

# Launcher help
dsh --help`,
      list: [
        "--dump-default-config: baseline defaults, no launch",
        "--dump-config: merged result, no launch",
        "App parameters (like --port) must follow launcher flags",
      ],
      paragraphs: [
        "If the merged tree surprises you, the layers to check are: each bundle's patch (in bundle order), the profile cordis.patch.yml, $DSH_HOME/cordis.patch.yml, and any --patch override[1].",
        "Errors during launch? The [[harness-error-fix|troubleshooting guide]] walks the official error table.",
      ],
    },
  ],
  relatedGuides: [
    { title: "DeepSeek Harness Quickstart", slug: "harness-quickstart" },
    { title: "DeepSeek Harness Install Guide", slug: "harness-install" },
    { title: "DeepSeek Harness Web UI Guide", slug: "harness-web-ui" },
    { title: "DeepSeek Harness Common Errors & Fixes", slug: "harness-error-fix" },
  ],
  sources: [
    { label: "DeepSeek Harness — apps/cli README (dsh command reference)", url: "https://raw.githubusercontent.com/deepseek-ai/deepseek-harness/master/apps/cli/README.md" },
    { label: "DeepSeek Harness — root README (install & quick start)", url: "https://github.com/deepseek-ai/deepseek-harness" },
    { label: "open-harness.net — DeepSeek Harness Complete Guide (profiles & config layers)", url: "https://www.open-harness.net/" },
  ],
};
