import type { GuideContent } from "./types";

// 目标关键词：deepseek harness sandbox
// 内容来源：reference/topics/21-deepseek-harness-release.md + 23-harness-usage-plugins.md（2026-08-16 定稿）
export const harnessSandbox: GuideContent = {
  slug: "harness-sandbox",
  category: "GUIDE",
  title: "DeepSeek Harness Sandbox: Isolation for Agent Execution",
  seoTitle: "DeepSeek Harness Sandbox: Isolation Guide",
  readTime: "7 MIN READ",
  updatedAt: "AUG 16, 2026",
  summary:
    "DeepSeek Harness sandboxes are swappable plugins; Minimal mode uses bash + str_replace_editor; tool approval never sandboxes plugin code.",
  toc: [
    { id: "step-1", label: "Step 1: Sandboxes Are Plugins" },
    { id: "step-2", label: "Step 2: What Each Mode Ships" },
    { id: "step-3", label: "Step 3: Workspaces and File Isolation" },
    { id: "step-4", label: "Step 4: The Security Model (and Its Limits)" },
    { id: "step-5", label: "Step 5: Swapping the Sandbox Provider" },
    { id: "step-6", label: "Step 6: Practical Advice" },
  ],
  steps: [
    {
      num: "01",
      title: "Sandboxes Are Plugins",
      description:
        "In DeepSeek Harness, sandboxes are a first-class plugin category. The official capability list names them explicitly — models, tools, skills, sessions, sandboxes, storage, loops, scheduling, and the UI are all plugins — which means the execution environment an agent runs in is replaceable like any other component[1].",
      paragraphs: [
        "That matters for two groups. Security-conscious teams can plug in a container or VM-backed sandbox for tool execution, and benchmarkers can run the minimal two-tool composition for reproducible model evaluation without the noise of a full environment[1][2].",
      ],
      note: "Because the sandbox is a plugin, its behavior is configured per profile — the same codebase can run a desktop agent and a benchmark harness.",
    },
    {
      num: "02",
      title: "What Each Mode Ships",
      description:
        "The four official modes carry different default sandbox behavior[1]:",
      table: {
        headers: ["Mode", "Default execution environment", "Notes"],
        rows: [
          ["Standard", "Full toolset: file editing + shell + web search", "File access scoped to the workspace"],
          ["Code", "Standard + Code Mode SDK", "TypeScript programs orchestrate multi-step tool calls"],
          ["Minimal", "Persistent bash + str_replace_editor only", "Two-tool minimal environment for benchmarks[2]"],
          ["Creator", "Runtime inspection environment", "In-memory plugin testing, no persistent side effects"],
        ],
      },
      paragraphs: [
        "Minimal mode's two tools are the same pair DeepSeek used for the official V4-Flash-0731 agent benchmarks: a persistent bash shell and a str_replace_editor for file edits[2].",
      ],
    },
    {
      num: "03",
      title: "Workspaces and File Isolation",
      description:
        "File-level isolation is organized around the workspace concept. dsh uses the launch directory as the default filesystem position, and in the Web UI you must explicitly choose a workspace before starting a session[3].",
      paragraphs: [
        "In practice this means an agent session's file reads and writes are anchored to the chosen project directory. Sessions started from the wrong directory are the most common 'my files are missing' failure — always confirm the workspace before delegating anything important[3].",
      ],
      list: [
        "Workspace = the project directory the agent operates in",
        "Web UI requires an explicit workspace choice per session[3]",
        "Launching dsh from the wrong directory = empty or missing files",
      ],
    },
    {
      num: "04",
      title: "The Security Model (and Its Limits)",
      description:
        "The honest security picture[4]:",
      paragraphs: [
        "Tool execution inside a session is gated by an approval policy — the agent proposes tool calls and you approve them. That is the primary control. What is NOT sandboxed: plugin code itself. Installing a plugin means running third-party code that can read your files, use your credentials, and reach the network. Tool approval does not sandbox plugin code[4].",
        "The community guidebook recommendation is blunt: treat unfamiliar plugins as untrusted, test them in an environment without secrets, and prefer plugins that declare their dsh.bundle manifest so at least the dependency surface is visible[4].",
      ],
      note: "For a browser of what plugins exist and their trust posture, see the [[harness-plugins|plugin ecosystem guide]].",
    },
    {
      num: "05",
      title: "Swapping the Sandbox Provider",
      description:
        "To change the execution environment, you swap or extend the sandbox plugin in your profile's bundle list — the same mechanism as any other capability[1][5].",
      code: `# typical flow
dsh plugin --profile web add <sandbox-plugin>
# then edit the profile's cordis.patch.yml to select the plugin,
# and restart the profile:
dsh --profile web`,
      paragraphs: [
        "Because sandbox configuration is part of the profile patch layer (bundle patches → profile cordis.patch.yml → $DSH_HOME/cordis.patch.yml → --patch), you can keep a strict sandbox in your global config and relax it per-project — see [[harness-setup|the setup guide]] for the layering order[5].",
      ],
    },
    {
      num: "06",
      title: "Practical Advice",
      description:
        "Summary of what to do today[3][4]:",
      list: [
        "Confirm the workspace before every important session",
        "Gate risky tool calls through the approval policy (default on)",
        "Run unfamiliar plugins in a secrets-free environment first[4]",
        "Pin your dsh version — developer preview means compatibility-breaking changes[6]",
      ],
      paragraphs: [
        "If you came here from the benchmark discussion, Minimal mode's two-tool environment is the reproducible setup to study — see [[harness-benchmark|harness benchmarks]]. For installation, start at [[harness-install|install dsh]].",
      ],
    },
  ],
  relatedGuides: [
    { title: "DeepSeek Harness Cordis Architecture", slug: "harness-cordis" },
    { title: "DeepSeek Harness Minimal Mode", slug: "harness-minimal-mode" },
    { title: "DeepSeek Harness Benchmarks", slug: "harness-benchmark" },
    { title: "DeepSeek Harness Plugins", slug: "harness-plugins" },
    { title: "DeepSeek Harness Setup Guide", slug: "harness-setup" },
  ],
  sources: [
    { label: "DeepSeek Harness — Official Page", url: "https://deepseek.com/harness/en/" },
    { label: "DeepSeek V4 Flash — Official Changelog", url: "https://api-docs.deepseek.com/news/news260731/" },
    { label: "dsh CLI README (official)", url: "https://raw.githubusercontent.com/deepseek-ai/deepseek-harness/master/apps/cli/README.md" },
    { label: "Awesome dsh plugins index (deepseekharness.io)", url: "https://deepseekharness.io/" },
    { label: "The Complete Guide to dsh (open-harness.net)", url: "https://www.open-harness.net/" },
    { label: "deepseek-ai/deepseek-harness (GitHub)", url: "https://github.com/deepseek-ai/deepseek-harness" },
  ],
};
