import type { GuideContent } from "./types";

// target keyword: deepseek v4 pro vs deepseek r1
export const v4ProVsDeepseekR1: GuideContent = {
  slug: "v4-pro-vs-deepseek-r1",
  category: "COMPARISON",
  title: "DeepSeek V4 Pro vs DeepSeek R1: Should You Still Use R1?",
  seoTitle: "DeepSeek V4 Pro vs R1: Which Reasoning Model",
  readTime: "6 MIN READ",
  updatedAt: "AUG 16, 2026",
  summary:
    "DeepSeek V4 Pro vs DeepSeek R1: the 2025 reasoning pioneer vs the 2026 flagship — alias retirement, effort dials, and the practical choice.",
  toc: [
    { id: "step-1", label: "Step 1: R1 Was the Pioneer" },
    { id: "step-2", label: "Step 2: The deepseek-reasoner Retirement" },
    { id: "step-3", label: "Step 3: Architecture & Reasoning Approach" },
    { id: "step-4", label: "Step 4: Pricing & Practical Choice" },
  ],
  steps: [
    {
      num: "01",
      title: "R1 Was the Pioneer",
      description:
        "DeepSeek-R1, released January 20, 2025, was the model that put DeepSeek on the map: an open-source reasoning model whose chain-of-thought output shocked the industry at a fraction of the closed-competitor price[2]. A 0528 checkpoint followed in May 2025[2].",
      paragraphs: [
        "R1's formula was simple: give the model long chain-of-thought by default and let it think its way through math, logic, and coding problems. It was brilliant and slow — every answer came with a long reasoning trace.",
        "R1 also proved a business model: open weights could match closed reasoning models, and the community could distill the reasoning traces into smaller models. That playbook directly shaped what came after — the V4 family's open weights and visible thinking traces are R1's DNA[2].",
      ],
      note: "Release timeline from DeepSeek's official news index[2].",
    },
    {
      num: "02",
      title: "The deepseek-reasoner Retirement",
      description:
        "On July 24, 2026, DeepSeek retired the legacy aliases deepseek-chat and deepseek-reasoner[1][2]. Code that still calls deepseek-reasoner must migrate to deepseek-v4-pro or deepseek-v4-flash — the reasoning experience now lives inside the V4 family[1].",
      code: `# July 24, 2026: legacy aliases stopped resolving[1]
model="deepseek-reasoner"   # ✗ 400 now
model="deepseek-v4-pro"     # ✓ current flagship
model="deepseek-v4-flash"   # ✓ fast lane

# reasoning is now a switch, not a separate model:
reasoning_effort="low" | "high" | "max"`,
      paragraphs: [
        "The retirement is the cleanest statement of the new strategy: reasoning is no longer a separate product line. V4 Pro folds deep reasoning into a general model with an effort dial[1][3].",
      ],
      note: "Alias retirement documented in DeepSeek's API docs and the existing V4 Pro guide[1].",
    },
    {
      num: "03",
      title: "Architecture & Reasoning Approach",
      description:
        "R1 was a dedicated reasoning model: 671B total / 37B active, always-on long chain-of-thought. V4 Pro is a general-purpose 1.6T/49B MoE with reasoning-effort control — you decide how much thinking a request deserves, from low (fast chat) to max (deep proof)[1][3].",
      table: {
        headers: ["Aspect", "DeepSeek R1 (2025)", "DeepSeek V4 Pro (0813)"],
        rows: [
          ["Released", "Jan 20, 2025[2]", "Aug 13, 2026 GA[1]"],
          ["Total / active params", "671B / 37B", "1.6T / 49B[3]"],
          ["Reasoning", "Always-on long CoT", "effort dial: low/high/max[1]"],
          ["Context window", "64K-128K class", "1M tokens[3]"],
          ["Agentic coding", "Pre-agent era", "SWE-bench Verified 96.40%[4]"],
          ["API status (Aug 2026)", "Alias retired[1]", "GA, active[1]"],
        ],
      },
      paragraphs: [
        "The architecture story is the strategy story: R1 hard-wired thinking; V4 Pro makes thinking a tunable cost. For a simple query you pay Flash-class latency on Pro with reasoning_effort=low; for a hard proof you spend max and get the deep trace back in reasoning_content[1][3].",
      ],
      note: "R1 spec figures are from its 2025 release era; V4 Pro figures from the 0813 model card[3].",
    },
    {
      num: "04",
      title: "Pricing & Practical Choice",
      description:
        "Should anyone still use R1 today? For new projects, no — the alias is retired and the reasoning capability moved into the V4 family[1]. For self-hosted workloads still running R1 weights, the case is marginal: V4 Pro's weights are MIT-licensed and far stronger on coding, while R1 retains one niche — very small self-hosted deployments where 671B is already your ceiling.",
      list: [
        "New API work → deepseek-v4-pro (or flash) — the reasoning dial covers R1's use case[1].",
        "Chain-of-thought visibility → keep reasoning_content; it's still returned in thinking mode[3].",
        "Self-hosted legacy R1 → fine to keep, but plan migration to V4 Pro weights for coding tasks.",
        "Budget → Pro at $0.66/$1.98 per 1M off-peak (after 8/16) beats R1-era pricing per token and delivers far more capability per token[5].",
      ],
      paragraphs: [
        "R1 earned its place in history, but the July alias retirement closed the book. [[v4-pro|V4 Pro]] with reasoning_effort=max is the modern successor — same open-weight ethos, same visible reasoning, dramatically better agentic coding, and one model instead of two product lines[1][2][4].",
        "If you are still running R1 in production, the migration checklist is short: switch the model string to deepseek-v4-pro (or deepseek-v4-flash for speed), keep your tool-call and JSON-output code paths (both work), re-validate prompts that relied on R1's always-on deep reasoning — many of those can now drop to reasoning_effort=high and save latency — and compare the output quality on your hardest 50 prompts before deleting the R1 pipeline[1][3].",
      ],
      note: "Pricing per DeepSeek's official pricing page after the 8/16 peak/off-peak change[5].",
    },
  ],
  prevGuide: undefined,
  nextGuide: undefined,
  relatedGuides: [
    { title: "What Is DeepSeek V4 Pro? Specs & Pricing", slug: "v4-pro" },
    { title: "DeepSeek V4 Pro Reasoning Effort Guide", slug: "v4-pro-reasoning-effort" },
    { title: "DeepSeek V4 Pro vs V4 Flash: Which Model?", slug: "v4-pro-vs-flash" },
    { title: "DeepSeek V4 Pro Benchmarks: 0813 Scores", slug: "v4-pro-benchmarks" },
    { title: "DeepSeek V4 vs GPT-5.6 Luna: The Price-Cut Fight", slug: "v4-vs-gpt56-luna" },
  ],
  sources: [
    { label: "DeepSeek V4 Pro: Specs, Pricing & Release Date (site guide)", url: "https://deepseekv4guide.org/guides/v4-pro" },
    { label: "DeepSeek News & Releases Index", url: "https://api-docs.deepseek.com/news/" },
    { label: "DeepSeek-V4-Pro-0813 Model Card (Hugging Face)", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813" },
    { label: "Codersera: V4 Pro 0813 Guide & Benchmarks", url: "https://codersera.com/blog/deepseek-v4-pro-0813-guide-2026/" },
    { label: "DeepSeek Models & Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
  ],
};
