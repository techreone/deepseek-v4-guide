import type { GuideContent } from "./types";

// target keyword: deepseek v4 pro harness
export const v4ProHarness: GuideContent = {
  slug: "v4-pro-harness",
  category: "INTEGRATION GUIDE",
  title: "DeepSeek V4 Pro + DeepSeek Harness: The Official Agent Stack",
  seoTitle: "DeepSeek V4 Pro + Harness: Agent Stack",
  readTime: "7 MIN READ",
  updatedAt: "SEP 11, 2026",
  notice:
    "Retiring: from Sept 14, 2026, all deepseek-v4-pro requests route to V4.1 Flash at Flash rates. See [[deepseek-v4-pro-retired|why V4-Pro was retired]] and [[deepseek-v4-1-flash|the V4.1 Flash guide]].",
  summary:
    "Pair DeepSeek V4 Pro 0813 with the official Harness (dsh) agent runtime: npx @deepseek-ai/dsh web, default model routing, official benchmark stack.",
  toc: [
    { id: "step-1", label: "Step 1: Why the Official Combo" },
    { id: "step-2", label: "Step 2: Install & First Run" },
    { id: "step-3", label: "Step 3: Default Model & API Key" },
    { id: "step-4", label: "Step 4: Runtime Modes for Pro Workloads" },
    { id: "step-5", label: "Step 5: Benchmarks, Caveats & Alternatives" },
  ],
  steps: [
    {
      num: "01",
      title: "Why the Official Combo",
      description:
        "DeepSeek's own agent benchmarks are measured on this exact pair: V4 Pro 0813 running inside [[deepseek-harness|DeepSeek Harness]] minimal mode at max reasoning effort, temperature 1.0, top_p 0.95[1][5]. Terminal-Bench 2.1 hits 87.9, Cybergym 83.3 (rank #1), AutomationBench 31.8 (rank #1)[1].",
      paragraphs: [
        "The Harness (dsh, v0.1 developer preview, MIT) is the agent runtime where every capability — models, tools, skills, sessions, sandboxes, storage, loops — is a plugin[6]. V4 Pro is the flagship model that plugs in by default.",
        "The result is the most 'official' agent stack in the DeepSeek ecosystem: the same code path DeepSeek uses to publish its own agent scores[1][5].",
      ],
      note: "Benchmark config stated in the official 0813 model card[1][5].",
    },
    {
      num: "02",
      title: "Install & First Run",
      description:
        "One command launches the local web UI; the CLI exposes headless and profile modes for scripting[6][7].",
      code: `# quick start (web UI on http://127.0.0.1:3080)
npx @deepseek-ai/dsh web

# or build from source
git clone https://github.com/deepseek-ai/deepseek-harness.git
cd deepseek-harness
pnpm install && pnpm run build
pnpm dsh web

# headless one-shot task
dsh --profile headless "Summarize this repo"

# Node requirement: ^22.19.0 or >= 24.0.0`,
      list: [
        "Default web UI listens on 127.0.0.1:3080[7].",
        "First run walks through onboarding: workspace, model, preset, session controls[7].",
        "CLI profiles (headless, acp, etc.) for scripting and agent-client integration[6].",
      ],
      note: "Install steps from DeepSeek's official harness page and CLI README[6][7].",
    },
    {
      num: "03",
      title: "Default Model & API Key",
      description:
        "dsh routes model calls through the DeepSeek API by default — you provide a DeepSeek API key during onboarding, and the default model selection is V4 Pro (with Flash as the lighter option)[7]. Because models are plugins, you can swap providers in configuration without touching source[6].",
      code: `# During onboarding you supply:
#   DEEPSEEK_API_KEY=sk-...            (platform.deepseek.com)
# Default model: deepseek-v4-pro (0813 GA)
# Lighter default: deepseek-v4-flash (0731)

# Swap model in config (provider/plugin level):
#   models → deepseek provider → model: deepseek-v4-flash`,
      paragraphs: [
        "Model calls are billed at DeepSeek API rates ($0.435/$0.87 per 1M for Pro before the 8/16 change; $0.66/$1.98 off-peak after)[4]. KV-cache behavior flows through: stable harness prompts reuse prefix caches, cutting input cost substantially[4].",
        "Because the model is a plugin, you can also point dsh at OpenRouter or a self-hosted vLLM endpoint without touching the harness source — the configuration screen accepts any OpenAI-compatible provider[6][7]. That makes the combo portable: the same session files and plugin set run against V4 Pro today and against a different provider tomorrow.",
      ],
      note: "Default routing per atoms.dev's hands-on dsh run and official harness docs[6][7].",
    },
    {
      num: "04",
      title: "Runtime Modes for Pro Workloads",
      description:
        "dsh ships four presets. For V4 Pro's strong reasoning, Standard and Code modes are the daily drivers; Minimal mode is exactly what DeepSeek uses for benchmarking[6].",
      table: {
        headers: ["Mode", "What it gives you", "Best for V4 Pro"],
        rows: [
          ["Standard", "Full toolset: shell, file edits, search, skills, subagents", "Daily agent work[6]"],
          ["Code", "Standard + TypeScript program orchestration", "Complex multi-step workflows[6]"],
          ["Minimal", "bash + str_replace_editor only", "Benchmarking / fair model comparison[6]"],
          ["Creator", "Inspect runtime, test Cordis plugins live", "Building custom harnesses[6]"],
        ],
      },
      paragraphs: [
        "Every run is traceable: append-only session logs capture prompts, reasoning, tool calls, and subagent scheduling, viewable in the Trajectory view — useful for debugging long Pro agent runs and for reproducing cost spikes[6].",
      ],
      note: "Mode descriptions from DeepSeek's official harness page[6].",
    },
    {
      num: "05",
      title: "Benchmarks, Caveats & Alternatives",
      description:
        "Official scores use this stack at max effort; independent harnesses measure lower — Vals' reference-harness Terminal-Bench run put Pro at 54.68% versus the official 87.9[3]. Treat official agent numbers as the ceiling, not the floor.",
      list: [
        "Official (Harness minimal + max): TB2.1 87.9, Cybergym 83.3 #1[1].",
        "Independent (reference harness): TB2.1 ~54.7 — the harness matters as much as the model[3].",
        "Alternative: OpenCode + V4 Pro — lighter, config-only, 96.40% SWE-bench Verified (neutral harness)[2].",
        "dsh is developer preview: breaking changes expected across 0.1.x releases[6].",
      ],
      paragraphs: [
        "If you want the official stack today, accept the preview-stage churn. If you want stability, [[v4-pro-opencode|OpenCode + V4 Pro]] gets you most of the way with none of the new-runtime risk — and you can revisit dsh when the plugin ecosystem matures[2][6].",
      ],
      note: "Independent TB figure from ExplainX/Vals-style reference-harness runs[3]; SWE figure from Codersera/Vals AI[2].",
    },
  ],
  prevGuide: undefined,
  nextGuide: undefined,
  relatedGuides: [
    { title: "DeepSeek Harness: Everything We Know", slug: "deepseek-harness" },
    { title: "DeepSeek V4 Pro Agent Capabilities", slug: "v4-pro-agent" },
    { title: "DeepSeek V4 Pro with OpenCode", slug: "v4-pro-opencode" },
    { title: "DeepSeek V4 Pro Benchmarks: 0813 Scores", slug: "v4-pro-benchmarks" },
    { title: "DeepSeek Harness vs Claude Code", slug: "harness-vs-claude-code" },
  ],
  sources: [
    { label: "DeepSeek-V4-Pro-0813 Model Card (Hugging Face)", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813" },
    { label: "Codersera: V4 Pro 0813 Guide & Benchmarks", url: "https://codersera.com/blog/deepseek-v4-pro-0813-guide-2026/" },
    { label: "ExplainX: V4 Pro 0813 Terminal-Bench Analysis", url: "https://explainx.ai/blog/deepseek-v4-pro-0813-terminal-bench-cline-august-2026" },
    { label: "DeepSeek Models & Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "DeepSeek V4 Pro GA Release Notes", url: "https://api-docs.deepseek.com/news/news260813/" },
    { label: "DeepSeek Harness Official Page", url: "https://deepseek.com/harness/en/" },
    { label: "Atoms.dev: DeepSeek Harness Hands-On", url: "https://atoms.dev/blog/deepseek-harness" },
  ],
};
