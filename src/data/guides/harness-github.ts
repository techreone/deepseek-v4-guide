import type { GuideContent } from "./types";

// 目标关键词：deepseek harness github
// 内容来源：reference/topics/23-harness-usage-plugins.md + 21-deepseek-harness-release.md（2026-08-16 定稿）
export const harnessGithub: GuideContent = {
  slug: "harness-github",
  category: "GUIDE",
  title: "DeepSeek Harness GitHub: The 127K-Star Repo, Explained",
  seoTitle: "DeepSeek Harness GitHub: Stars & Roadmap",
  readTime: "6 MIN READ",
  updatedAt: "AUG 16, 2026",
  summary:
    "The deepseek-ai/deepseek-harness GitHub repo: 127K+ stars, MIT license, no-PR policy, Discussions-only feedback, and why stars exploded.",
  toc: [
    { id: "step-1", label: "Step 1: Repo Basics" },
    { id: "step-2", label: "Step 2: Star Growth Since Aug 13" },
    { id: "step-3", label: "Step 3: The 'Everything Is a Plugin' README" },
    { id: "step-4", label: "Step 4: No PRs, No Issues — How Feedback Works" },
    { id: "step-5", label: "Step 5: Related Repos and Ecosystem" },
    { id: "step-6", label: "Step 6: How to Follow Development" },
  ],
  steps: [
    {
      num: "01",
      title: "Repo Basics",
      description:
        "The official repository is github.com/deepseek-ai/deepseek-harness. It holds the monorepo for the dsh CLI, the Cordis kernel, and the default plugin bundles. As of August 16, 2026 it had 127,689 stars and about 12,732 forks[1].",
      list: [
        "Owner: deepseek-ai (DeepSeek's official GitHub org)",
        "License: MIT[1]",
        "Language: TypeScript (monorepo, pnpm workspaces)",
        "First public commit context: v0.1 developer preview, August 13, 2026",
      ],
      note: "Star and fork counts move quickly for this repo; check the live badge on GitHub before quoting them in your own material[1].",
    },
    {
      num: "02",
      title: "Star Growth Since Aug 13",
      description:
        "The trajectory was unusual even by hype standards[1][2][3]:",
      table: {
        headers: ["Date", "Stars (approx.)", "Context"],
        rows: [
          ["Aug 13, 2026", "~38K (day one)", "Launch day[3]"],
          ["Aug 14, 2026", "~66–95K (day two)", "Media comparisons to Claude Code[2]"],
          ["Aug 16, 2026", "~127K / 12.7K forks", "API-verified count[1]"],
        ],
      },
      paragraphs: [
        "Analysts credit the speed to three factors: the mid-August timing inside the DeepSeek V4 wave, the MIT license plus genuinely modular design (immediate reason for plugin authors to build), and the 'everything is a plugin' framing generating comparison content against Claude Code[4][5].",
      ],
    },
    {
      num: "03",
      title: "The 'Everything Is a Plugin' README",
      description:
        "The README leads with the design thesis: DeepSeek Harness is an agent harness built around one core idea — everything is a plugin. Models, tools, skills, sessions, sandboxes, storage, loops, scheduling, and the UI are all plugins[1][6].",
      paragraphs: [
        "It also documents the runtime modes (Standard / Code / Minimal / Creator), the Agent = Model + Harness formula, the append-only session log and Trajectory view, and the explicit developer-preview warning: 'THERE WILL BE COMPATIBILITY-BREAKING CHANGES'[1].",
      ],
    },
    {
      num: "04",
      title: "No PRs, No Issues — How Feedback Works",
      description:
        "A deliberate policy: the repository does not accept external pull requests and GitHub Issues are disabled[7].",
      paragraphs: [
        "Feedback and bug reports go through GitHub Discussions and the project Discord. The official extension path is to publish your own plugin tagged dsh-plugin, not to patch the core. This keeps the kernel change-controlled while pushing innovation to the plugin ecosystem[7].",
        "The project is led by Cui Tianyi, a former Jane Street engineer who joined DeepSeek in March 2026; the team went from formation to public preview in about five months[7].",
      ],
      note: "If you hit a bug, search Discussions first — the no-Issues policy means the answers live there[7].",
    },
    {
      num: "05",
      title: "Related Repos and Ecosystem",
      description:
        "Around the core repo, an ecosystem formed within days[8]:",
      list: [
        "awesome-dsh-plugin — official community-curated plugin list (4.5K stars)",
        "deepseekharness.io — independent index tracking 616+ community plugins",
        "dsh-market — an in-CLI plugin market (dsh plugin add dshmarket)",
        "Desktop shells, TUI skins, vision plugins, and MCP managers are among the top community plugins[8]",
      ],
      paragraphs: [
        "The ecosystem index is the best place to browse what exists today: categories include UI Enhancements, Models & Providers, Sessions & Messages, Memory, Tools & Capabilities, Vision & Multimodal, Skills, Workflow & Automation, Notifications, Development & Runtime, and Plugin Markets[8].",
      ],
    },
    {
      num: "06",
      title: "How to Follow Development",
      description:
        "If you want to track what changes next[1][7]:",
      list: [
        "Watch the repo on GitHub (releases and Discussions notifications)",
        "Follow @deepseek_ai on X for launch-grade announcements",
        "Read the Cordis paper linked from the official harness page for the kernel design",
        "Monitor the npm package version — 0.1.0-rc builds precede 1.0",
      ],
      paragraphs: [
        "For the practical next step, start with [[harness-install|installing dsh]] or browse [[harness-plugins|the plugin ecosystem]].",
      ],
    },
  ],
  relatedGuides: [
    { title: "DeepSeek Harness Release Date", slug: "harness-release-date" },
    { title: "DeepSeek Harness Plugins", slug: "harness-plugins" },
    { title: "What Is DeepSeek Harness?", slug: "what-is-deepseek-harness" },
    { title: "DeepSeek Harness Cordis Architecture", slug: "harness-cordis" },
    { title: "DeepSeek V4 Pro Official Release", slug: "v4-pro" },
  ],
  sources: [
    { label: "deepseek-ai/deepseek-harness (GitHub)", url: "https://github.com/deepseek-ai/deepseek-harness" },
    { label: "DeepSeek Harness Hits 95K Stars (Flowtivity)", url: "https://flowtivity.ai/blog/deepseek-harness-open-source-agent-explained/" },
    { label: "DeepSeek Harness Launch Coverage (Remio AI)", url: "https://www.remio.ai/post/deepseek-harness-launches-putting-the-agent-runtime-above-the-model" },
    { label: "DeepSeek on X — Harness Launch", url: "https://x.com/deepseek_ai/status/2087887408440164663" },
    { label: "DeepSeek Harness: Everything Is a Plugin (Medium)", url: "https://medium.com/@dinmaybrahma/deepseek-quietly-built-a-different-kind-of-ai-agent-framework-80e4775103f9" },
    { label: "DeepSeek Harness — Official Page", url: "https://deepseek.com/harness/en/" },
    { label: "The Complete Guide to dsh (open-harness.net)", url: "https://www.open-harness.net/" },
    { label: "Awesome dsh plugins (deepseekharness.io)", url: "https://deepseekharness.io/" },
  ],
};
