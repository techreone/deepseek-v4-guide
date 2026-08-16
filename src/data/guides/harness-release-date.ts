import type { GuideContent } from "./types";

// 目标关键词：deepseek harness release date
// 内容来源：reference/topics/21-deepseek-harness-release.md（2026-08-16 定稿）
export const harnessReleaseDate: GuideContent = {
  slug: "harness-release-date",
  category: "NEWS & UPCOMING",
  title: "DeepSeek Harness Release Date: v0.1 Developer Preview Is Here",
  seoTitle: "DeepSeek Harness Release Date (Aug 13, 2026)",
  readTime: "7 MIN READ",
  updatedAt: "AUG 16, 2026",
  summary:
    "DeepSeek Harness v0.1 released August 13, 2026 as an MIT-licensed developer preview. Full timeline from the July 31 changelog mention to the 127K-star launch.",
  toc: [
    { id: "step-1", label: "Step 1: The Short Answer" },
    { id: "step-2", label: "Step 2: July 31 — First Official Mention" },
    { id: "step-3", label: "Step 3: The August 10–20 NDA Beta Reports" },
    { id: "step-4", label: "Step 4: August 13 — v0.1 Developer Preview Launch" },
    { id: "step-5", label: "Step 5: What 'Developer Preview' Means" },
    { id: "step-6", label: "Step 6: What to Watch Next" },
  ],
  steps: [
    {
      num: "01",
      title: "The Short Answer",
      description:
        "DeepSeek Harness was released as a developer preview on August 13, 2026, version v0.1, with source code open-sourced under the MIT license the same day[1][2]. It is live today: the official page at deepseek.com/harness is up, the GitHub repository is public, and the npm package @deepseek-ai/dsh installs and runs[1].",
      paragraphs: [
        "If you are asking 'when is DeepSeek Harness coming out?' because you saw 'to be released soon' in the July 31 changelog — that note is out of date. The framework has shipped, and the current version is a developer preview rather than a stable 1.0[1][2].",
      ],
      note: "Version at the time of writing: v0.1.0 (npm shows 0.1.0-rc builds). DeepSeek's README warns there will be compatibility-breaking changes until 1.0[3].",
    },
    {
      num: "02",
      title: "July 31 — First Official Mention",
      description:
        "The name 'DeepSeek Harness' first appeared in official documentation in the July 31, 2026 changelog that launched the V4-Flash-0731 build[4].",
      paragraphs: [
        "The changelog stated that every Code Agent benchmark for the new build was run using 'the DeepSeek Harness minimal mode (to be released soon)' with max effort, topp=0.95, and temperature=1.0. The Hugging Face model card said the same. That single mention is what created the 'to be released soon' expectation that dominated the first half of August[4].",
      ],
      list: [
        "July 31, 2026: changelog names DeepSeek Harness minimal mode as the benchmark framework[4]",
        "Same day: media and community start tracking 'when does DeepSeek Harness release'",
        "No repo existed under github.com/deepseek-ai at that point",
      ],
    },
    {
      num: "03",
      title: "The August 10–20 NDA Beta Reports",
      description:
        "Before the launch, two leaked-report threads pointed at a mid-August window. On July 28, Fast Technology (via Sina Finance) reported the official V4 rollout would begin with internal testing around mid-August. On July 30, Zhineng Jiyuan AGI (via Sina) reported an NDA-style closed beta for a small group of invited users, followed by general availability between August 10 and 20[5].",
      paragraphs: [
        "Both reports relied on circulated screenshots and anonymous sources, so they were never independent confirmation. They turned out to be directionally correct: the public release landed on August 13, inside the reported window[5][1].",
      ],
      table: {
        headers: ["Date", "Event", "Source type"],
        rows: [
          ["Jul 28, 2026", "Fast Tech / Sina: internal testing, mid-August V4", "Reported (leaked screenshot)"],
          ["Jul 30, 2026", "Zhineng Jiyuan / Sina: NDA beta, GA Aug 10–20", "Reported (anonymous source)"],
          ["Aug 13, 2026", "v0.1 developer preview + source release", "Official[1][2]"],
        ],
      },
      note: "The reported NDA beta itself was never publicly confirmed; the release skipped straight to an open developer preview.",
    },
    {
      num: "04",
      title: "August 13 — v0.1 Developer Preview Launch",
      description:
        "On August 13, 2026, DeepSeek announced the developer preview on its official channel: 'DeepSeek Harness is now in developer preview for agent harness developers worldwide — source code included'[1][6].",
      paragraphs: [
        "The launch bundle was: the official page (deepseek.com/harness/en), the GitHub repository (deepseek-ai/deepseek-harness), the npm package @deepseek-ai/dsh, developer docs, a community plugin index, and the Cordis paper. Everything is a plugin became the tagline: models, tools, skills, sessions, sandboxes, storage, loops, scheduling, and UI are all swappable plugins[1].",
        "The market response was immediate. Star counts went roughly 38K on day one, ~95K by day two, and over 127K with 12.7K+ forks by August 16. An independent plugin index already tracks 616+ community plugins[7][8].",
      ],
      list: [
        "Aug 13: official announcement on X (@deepseek_ai) and the harness site[6]",
        "Same day: source on GitHub, package on npm, docs live[1]",
        "Aug 14–16: 127K+ stars, 616+ plugins indexed, multiple independent guides appear[7][8]",
      ],
      note: "Media quickly framed it as a Claude Code rival, but the framework can actually run Claude Code or Codex as a sub-agent inside itself — see [[what-is-deepseek-harness|What Is DeepSeek Harness?]].",
    },
    {
      num: "05",
      title: "What 'Developer Preview' Means",
      description:
        "A developer preview is not a stable release. The official README states plainly: 'THERE WILL BE COMPATIBILITY-BREAKING CHANGES'[3].",
      paragraphs: [
        "In practice this means: the core architecture (Cordis plugin kernel) is the point of stability, while plugin APIs, CLI flags, and configuration formats can change between releases. The npm package currently ships 0.1.0-rc builds. Projects that build on dsh today should pin versions and follow GitHub Discussions for breaking-change announcements — the project deliberately does not use GitHub Issues[3].",
      ],
    },
    {
      num: "06",
      title: "What to Watch Next",
      description:
        "The likely next milestones, based on the official roadmap signals[1][3]:",
      list: [
        "A stable 1.0 release (no date announced) that freezes plugin APIs",
        "More official plugins in the models/tools/sandbox categories",
        "DeepSeek's own agent product built on the harness, hinted at by the hiring materials",
        "Third-party reproductions of the official benchmarks using minimal mode (see [[harness-benchmark|harness benchmarks]])",
      ],
      paragraphs: [
        "For hands-on steps today, jump to [[harness-install|How to Install DeepSeek Harness]]. For the release that shipped alongside it, read [[v4-pro-release-date|DeepSeek V4 Pro GA release]].",
      ],
    },
  ],
  relatedGuides: [
    { title: "What Is DeepSeek Harness?", slug: "what-is-deepseek-harness" },
    { title: "How to Install DeepSeek Harness", slug: "harness-install" },
    { title: "DeepSeek Harness GitHub Repository", slug: "harness-github" },
    { title: "DeepSeek V4 Pro Release Date", slug: "v4-pro-release-date" },
    { title: "DeepSeek V4 Pro Official Release", slug: "v4-pro" },
  ],
  sources: [
    { label: "DeepSeek Harness — Official Page", url: "https://deepseek.com/harness/en/" },
    { label: "deepseek-ai/deepseek-harness (GitHub)", url: "https://github.com/deepseek-ai/deepseek-harness" },
    { label: "The Complete Guide to dsh (open-harness.net)", url: "https://www.open-harness.net/" },
    { label: "DeepSeek V4 Flash — Official Changelog", url: "https://api-docs.deepseek.com/news/news260731/" },
    { label: "DeepSeek Harness Launch Coverage (Remio AI)", url: "https://www.remio.ai/post/deepseek-harness-launches-putting-the-agent-runtime-above-the-model" },
    { label: "DeepSeek on X — Harness Launch", url: "https://x.com/deepseek_ai/status/2087887408440164663" },
    { label: "DeepSeek Harness Hits 95K Stars (Flowtivity)", url: "https://flowtivity.ai/blog/deepseek-harness-open-source-agent-explained/" },
    { label: "Awesome dsh plugins index (deepseekharness.io)", url: "https://deepseekharness.io/" },
  ],
};
