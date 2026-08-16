import type { GuideContent } from "./types";

// 目标关键词：deepseek harness code mode
// 内容来源：reference/topics/21-deepseek-harness-release.md + 23-harness-usage-plugins.md（2026-08-16 定稿）
export const harnessCodeMode: GuideContent = {
  slug: "harness-code-mode",
  category: "GUIDE",
  title: "DeepSeek Harness Code Mode: Orchestrating Multi-Step Tasks in TypeScript",
  seoTitle: "DeepSeek Harness Code Mode Guide",
  readTime: "7 MIN READ",
  updatedAt: "AUG 16, 2026",
  summary:
    "Code Mode is DeepSeek Harness's advanced runtime: all Standard tools plus an SDK that lets the model combine multi-step operations into one TypeScript program.",
  toc: [
    { id: "step-1", label: "Step 1: What Code Mode Is" },
    { id: "step-2", label: "Step 2: Standard Mode vs Code Mode" },
    { id: "step-3", label: "Step 3: How the SDK Works" },
    { id: "step-4", label: "Step 4: When Code Mode Wins" },
    { id: "step-5", label: "Step 5: Enabling Code Mode" },
    { id: "step-6", label: "Step 6: Limitations and Caveats" },
  ],
  steps: [
    {
      num: "01",
      title: "What Code Mode Is",
      description:
        "Code Mode is one of DeepSeek Harness's four runtime modes. It includes all of Standard mode's capabilities — file editing, shell, file and web search, skills, planning, goals, subagents, workflows — and adds the Code Mode SDK, which lets the model combine multi-step operations in a single TypeScript program[1].",
      paragraphs: [
        "The idea: instead of issuing one tool call at a time and waiting for each result, the model writes a small TypeScript program that calls several tools in sequence, with control flow, retries, and conditionals — then the harness executes that program[1].",
      ],
      note: "The four modes are plugin compositions, not special code paths — see [[harness-cordis|the Cordis architecture guide]].",
    },
    {
      num: "02",
      title: "Standard Mode vs Code Mode",
      description:
        "The practical difference is how the model interacts with tools[1]:",
      table: {
        headers: ["Dimension", "Standard mode", "Code mode"],
        rows: [
          ["Interaction", "One tool call at a time (model proposes, harness executes)", "Model writes a TypeScript program combining calls"],
          ["Multi-step work", "Several round trips", "One program, batched and sequenced"],
          ["Control flow", "Limited to the agent loop", "Full TS: loops, conditionals, retries, error handling"],
          ["Best for", "Interactive, exploratory coding", "Deterministic multi-step automation"],
        ],
      },
      paragraphs: [
        "Standard mode remains the default because it is better for interactive, unpredictable work. Code Mode is for tasks where the sequence is known and batching saves time and tokens[1].",
      ],
    },
    {
      num: "03",
      title: "How the SDK Works",
      description:
        "The Code Mode SDK exposes the harness's tools as functions inside a TypeScript program that the model generates[1].",
      code: `// conceptual example of a Code Mode program
import { bash, edit, search } from "@deepseek-ai/dsh-code-sdk";

const files = await search.find("TODO");
for (const f of files) {
  const ok = await bash.run(\`npm test -- \${f}\`);
  if (!ok) await edit.apply(f, patchFromTest(ok));
}
return { summary: "patched " + files.length + " files" };`,
      paragraphs: [
        "The model writes the program, the harness executes it with full tool access, and the session log records every step — so Code Mode runs remain fully traceable in the Trajectory view[1][2].",
      ],
    },
    {
      num: "04",
      title: "When Code Mode Wins",
      description:
        "Code Mode shines in scenarios where the operation sequence is stable and repeated[1]:",
      list: [
        "Batch refactors across many files with the same pattern",
        "Test-and-fix loops: run tests, parse failures, patch, retry",
        "Pipeline-style tasks: build → test → package → summarize",
        "Multi-repo chores where each step is deterministic",
      ],
      paragraphs: [
        "Community feedback positions it as the harness's answer to 'agentic scripts' — the reliability of a script with the adaptability of an agent underneath[3].",
      ],
    },
    {
      num: "05",
      title: "Enabling Code Mode",
      description:
        "Code Mode is a profile configuration, not a separate install[1][4]:",
      code: `# launch with the code profile (bundle composition including the SDK)
dsh --profile code

# or compose it yourself: add the Code Mode bundle to a custom profile
dsh plugin --profile my-agent add @deepseek-ai/dsh-code-mode`,
      paragraphs: [
        "Because profiles live in $DSH_HOME/profiles/<name>, you can keep a Standard profile for interactive work and a Code profile for automation, switching with a single flag[4].",
      ],
    },
    {
      num: "06",
      title: "Limitations and Caveats",
      description:
        "Code Mode is still young[1][3]:",
      list: [
        "The SDK surface is small today; expect additions before 1.0",
        "Compatibility-breaking changes are possible — pin your dsh version",
        "Traceability helps, but a misbehaving generated program can burn tokens fast — review before running",
      ],
      paragraphs: [
        "If you are comparing harnesses, see [[harness-vs-claude-code|dsh vs Claude Code]] for how the mode system differs from fixed toolchains. To understand the whole runtime family, read [[harness-minimal-mode|minimal mode]] (the benchmark rig) next.",
      ],
    },
  ],
  relatedGuides: [
    { title: "DeepSeek Harness Minimal Mode", slug: "harness-minimal-mode" },
    { title: "DeepSeek Harness Cordis Architecture", slug: "harness-cordis" },
    { title: "What Is DeepSeek Harness?", slug: "what-is-deepseek-harness" },
    { title: "DeepSeek Harness vs Claude Code", slug: "harness-vs-claude-code" },
    { title: "DeepSeek Harness Setup Guide", slug: "harness-setup" },
  ],
  sources: [
    { label: "DeepSeek Harness — Official Page", url: "https://deepseek.com/harness/en/" },
    { label: "deepseek-ai/deepseek-harness (GitHub)", url: "https://github.com/deepseek-ai/deepseek-harness" },
    { label: "The Complete Guide to dsh (open-harness.net)", url: "https://www.open-harness.net/" },
    { label: "dsh CLI README (official)", url: "https://raw.githubusercontent.com/deepseek-ai/deepseek-harness/master/apps/cli/README.md" },
  ],
};
