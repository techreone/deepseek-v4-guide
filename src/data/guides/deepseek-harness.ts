import type { GuideContent } from "./types";

// 目标关键词：deepseek harness
// 内容来源：reference/topics/13-deepseek-harness.md + 01-v4-flash-overview.md + 04-flash-benchmark.md（2026-08-01 定稿）
// 信息分层：Official = DeepSeek 官方已披露；Reported = 媒体报道/传闻，未获官方确认；Analysis = 分析推断。正文与表格均按此标注。
export const deepseekHarness: GuideContent = {
  slug: "deepseek-harness",
  category: "NEWS & UPCOMING",
  title: "DeepSeek Harness: Everything We Know Before the Official Release",
  seoTitle: "DeepSeek Harness: Everything We Know So Far",
  readTime: "8 MIN READ",
  updatedAt: "AUG 1, 2026",
  summary:
    "DeepSeek Harness is DeepSeek's official agent framework, first named in the July 31 changelog and marked 'to be released soon.'",
  toc: [
    { id: "step-1", label: "Step 1: What Is DeepSeek Harness?" },
    { id: "step-2", label: "Step 2: Model + Harness = Agent: What the JD Reveals" },
    { id: "step-3", label: "Step 3: The Official Harness-Measured Benchmarks" },
    { id: "step-4", label: "Step 4: The Benchmark-Maxxing Debate" },
    { id: "step-5", label: "Step 5: Rumored Timeline: Official vs Reported vs Analysis" },
    { id: "step-6", label: "Step 6: Watch Out for the Same-Name Trap" },
    { id: "step-7", label: "Step 7: Why the Harness Release Matters" },
    { id: "step-8", label: "Step 8: How to Watch for the Official Release" },
  ],
  steps: [
    {
      num: "01",
      title: "What Is DeepSeek Harness?",
      description:
        "DeepSeek Harness is DeepSeek's official agent framework, and it is not released yet. The name appears in exactly one place in official documentation so far: the July 31, 2026 changelog that launched the V4-Flash-0731 build[1].",
      paragraphs: [
        "That changelog note reads: 'For the Code Agent tasks in the public benchmark sets, the official DeepSeek-V4-Flash was tested using the DeepSeek Harness minimal mode (to be released soon) as the framework, with the max effort level, topp=0.95, and temperature=1.0'. The Hugging Face model card says the same in fewer words: the agent benchmark numbers were produced with the official DeepSeek Harness, which is 'to be released'[2].",
        "So the official definition, as of August 1, 2026, is narrow: the Harness is the agent framework DeepSeek used to run its own coding-agent benchmarks. 'Minimal mode' is the only configuration DeepSeek has disclosed, and it was used with max reasoning effort, topp 0.95, and temperature 1.0. Everything else about the product is still official silence.",
      ],
      list: [
        "First mentioned in the official changelog on July 31, 2026",
        "Used to run every public Code Agent benchmark for V4-Flash-0731",
        "Minimal mode config: max effort, topp=0.95, temperature=1.0",
        "No GitHub repo exists under github.com/deepseek-ai as of August 1, 2026[3]",
        "Official status: 'to be released soon'",
      ],
      note: "'To be released soon' is not a release. As of August 1, 2026, DeepSeek has published no download and no product page for the Harness[8].",
    },
    {
      num: "02",
      title: "Model + Harness = Agent: What the JD Reveals",
      description:
        "DeepSeek's own job descriptions give the clearest definition of what the Harness will do. The core formula is simple: Model + Harness = Agent[4].",
      paragraphs: [
        "The formula comes straight from DeepSeek's hiring materials. The company is turning its frontier model capabilities into leading agent products, and it defines the split bluntly: everything outside the model itself belongs to the Harness.",
        "That scope is the whole engineering surface of an agent: context management, tool calling, file read and write, terminal execution, self-correction driven by test feedback, memory, MCP, and feedback loops. If the model is the brain, the Harness is everything else.",
        "DeepSeek has been staffing this team since spring 2026. The same job posts say the new hires will help build a desktop agent product and define what the Harness means at DeepSeek.",
      ],
      code: `Model + Harness = Agent

"Everything outside the model itself belongs to the Harness."
(DeepSeek Harness job description, translated from Chinese)

The Harness scope covers:
- context management
- tool calling
- file read / write
- terminal execution
- self-correction and test feedback
- memory
- MCP
- feedback loops`,
      note: "This is why the benchmark numbers matter: the model and the harness evolve together. Official scores are a measure of the pair, not the model alone.",
    },
    {
      num: "03",
      title: "The Official Harness-Measured Benchmarks",
      description:
        "Every official agent score DeepSeek published on July 31 was measured with the DeepSeek Harness minimal mode. Here is the complete table from the changelog: nine benchmarks, two of which are internal test sets.",
      paragraphs: [
        "The DeepSWE jump is the headline: 7.3 on the preview to 54.4, a 645% increase on the same model after re-post-training[6]. DeepSeek says Flash 0731 wins all nine published benchmarks against its own V4-Pro-Preview.",
        "Two rows are marked internal. DSBench-FullStack and DSBench-Hard are DeepSeek's own test sets and cannot be reproduced externally. The other seven are public benchmarks, but every score is vendor-reported, and until the Harness ships, no third party can reproduce any of them.",
      ],
      table: {
        headers: ["Benchmark", "V4-Flash-0731", "Preview comparison", "Status"],
        rows: [
          ["Terminal-Bench 2.1", "82.7", "61.8 (Flash Preview)", "Public"],
          ["NL2Repo", "54.2", "—", "Public"],
          ["Cybergym", "76.7", "—", "Public"],
          ["DeepSWE", "54.4", "7.3 (+645%)", "Public"],
          ["Toolathlon (verified)", "70.3", "—", "Public"],
          ["Agent Last Exam", "25.2", "—", "Public"],
          ["Automation Bench (Public)", "25.1", "—", "Public"],
          ["DSBench-FullStack", "68.7", "37.0 (Preview)", "Internal set"],
          ["DSBench-Hard", "59.6", "—", "Internal set"],
        ],
      },
      note: "For the full breakdown of these scores and the fine print on the +645% figure, see the [[flash-benchmarks|official agent benchmarks guide]].",
    },
    {
      num: "04",
      title: "The Benchmark-Maxxing Debate",
      description:
        "Because the harness behind these scores is unreleased, the entire official agent benchmark table is vendor-reported. 'Benchmark maxxing' is the loudest question in the community, and the answer is genuinely split[7].",
      paragraphs: [
        "The sharpest challenge comes from the DeepSWE benchmark thread. DeepSWE is a harder, from-scratch benchmark with behavioral verifiers, and its author ran every model through one shared harness: a single bash tool and a single prompt. But the fairness pilot only covered Claude, GPT, and Gemini. DeepSeek was not in it. As one top comment put it: 'A bottom-of-board score for the one model nobody validated the harness against reads as a harness result, not a capability result'.",
        "Independent numbers add context. A separate DeepSWE audit by yage.ai in June 2026 scored V4-Pro at just 8% pass@1, against 70% for GPT-5.5 and 54% for Opus 4.7. Compare that with the 54.4 the official Harness reports for Flash 0731 on the same benchmark, and the gap is the whole argument in miniature.",
        "Reaction to the July 31 release on r/LocalLLaMA mixed genuine enthusiasm with a blunt caveat: strong numbers only count if they reproduce outside the lab. Until an independent lab re-runs the suite, treat every official agent number as directional.",
      ],
      list: [
        "All nine official scores are vendor-reported; the measuring harness is not public",
        "DeepSWE's fairness pilot validated its harness only on Claude, GPT, and Gemini",
        "yage.ai's independent DeepSWE run scored V4-Pro at 8% vs GPT-5.5's 70%",
        "Analysts advise waiting for independent labs before betting on high-value workloads",
      ],
      note: "Read the delta column with care: the preview comparison scores (61.8, 7.3) come from third-party runs on a different framework, not the DeepSeek Harness, so the before/after gap is directional, not apples-to-apples.",
    },
    {
      num: "05",
      title: "Rumored Timeline: Official vs Reported vs Analysis",
      description:
        "Release-date chatter is everywhere, and almost none of it is official. This is the part of the DeepSeek Harness story where you must separate three layers of information: what DeepSeek confirmed, what the press reported, and what analysts inferred.",
      paragraphs: [
        "The two most specific claims come from reports built on leaked screenshots. On July 28, Fast Technology (via Sina Finance) reported that the official V4 would begin internal testing, with V4 arriving around mid-August, and linked the delay to the Harness. On July 30, Zhineng Jiyuan AGI (via Sina) reported a narrower window: an NDA-style closed beta for a small group of invited users, followed by V4 general availability between August 10 and 20.",
        "A third-party analysis aggregator is blunt about both: they rely on circulated screenshots and anonymous sources, so they do not count as independent confirmation. August 10-20 should be treated as a reported target, not a confirmed date.",
      ],
      table: {
        headers: ["Layer", "Statement", "Status"],
        rows: [
          ["Official", "Changelog names the Harness minimal mode and says it is 'to be released soon' (Jul 31)", "Confirmed by DeepSeek"],
          ["Official", "All public Code Agent benchmarks were run with the Harness minimal mode", "Confirmed by DeepSeek"],
          ["Official", "The V4-Pro official release 'will follow soon'", "Confirmed by DeepSeek"],
          ["Reported", "Internal testing began the week of Jul 28; V4 lands around mid-August", "Not confirmed"],
          ["Reported", "NDA-style closed beta for invited users; V4 GA window Aug 10-20", "Not confirmed"],
          ["Analysis", "V4 delays are linked to the Harness; the two may launch together", "Speculation"],
        ],
      },
      note: "Rule of thumb: anything not in the official changelog is not confirmed. Circulated screenshots are not sources.",
    },
    {
      num: "06",
      title: "Watch Out for the Same-Name Trap",
      description:
        "Search 'deepseek harness' today and you will find a minefield: third-party tools and community repos using the exact same name. None of them are the official product.",
      paragraphs: [
        "The official DeepSeek Harness has not shipped, and nothing exists under the github.com/deepseek-ai organization. That gap is exactly what third parties are filling with the same name.",
      ],
      list: [
        "Official DeepSeek Harness — unreleased; no repo under github.com/deepseek-ai as of Aug 1, 2026",
        "FreeBuff — a third-party terminal coding agent from the CodeBuff team that dominates current 'deepseek harness' search results; it is unrelated to DeepSeek",
        "HenryZ838978/deepseek-harness — a community GitHub project (Python library, CLI, and MCP server); personal, not official",
        "DeepSeek-TUI — a popular community terminal agent for DeepSeek models; related ecosystem, still not official",
      ],
      note: "The keyword 'deepseek harness' is, for now, occupied by pages that are not the product. Anything claiming to be a download, a repo, or a review of the official Harness should be treated as third-party.",
    },
    {
      num: "07",
      title: "Why the Harness Release Matters",
      description:
        "The Harness is not a benchmark footnote. It is the only path to verifying DeepSeek's agent claims, and it will likely be the way most people run DeepSeek agents once it ships.",
      paragraphs: [
        "First, verification. Every official agent score was produced by software you cannot run. Until the Harness is public, no third party can reproduce DeepSWE 54.4 or Terminal-Bench 2.1 82.7, and analysts advise waiting for independent labs such as yage.ai before making production decisions on high-value workloads.",
        "Second, cost. The harness decides how a model actually works on your tasks: how many tool calls it makes, how it manages context, how it corrects itself. Third-party tests cited by 36Kr measured roughly 70 tool calls per task for Claude Code versus about 22 for OpenCode[5]. DeepSeek's own job description puts smart context management at the center of the Harness, which could change that math and your [[flash-pricing|token bill]].",
        "Third, the product entry. The Harness team is building DeepSeek's desktop agent product. It may become the default way to use DeepSeek for coding, alongside the existing Claude Code, OpenCode, and Codex integrations.",
      ],
      list: [
        "It is the only way to re-test official agent benchmarks",
        "It will set the tool-call efficiency baseline for DeepSeek agent work",
        "It may become DeepSeek's official agent product entry point",
      ],
    },
    {
      num: "08",
      title: "How to Watch for the Official Release",
      description:
        "You do not need rumors to follow the DeepSeek Harness. There are four official signals to watch, and when any of them appears, the 'to be released soon' promise is becoming real.",
      paragraphs: [
        "The changelog is the strongest signal: it is where the Harness was first named, and it is updated by DeepSeek itself. Meanwhile, the [[deepseek-v4-flash|V4 Flash]] release is already live and usable without waiting for the Harness.",
      ],
      list: [
        "The DeepSeek API changelog adds a GA entry for the Harness — the same page that first named it",
        "A new repository appears under github.com/deepseek-ai — currently there is no harness repo there",
        "The official @deepseek_ai X account announces it",
        "A download or product page for the Harness goes live",
      ],
      note: "Until one of those four fires, treat any 'release date' you read online as reported, not confirmed. For the flagship model that is expected alongside it, see the [[v4-pro|V4 Pro guide]].",
    },
  ],
  prevGuide: {
    title: "Connect Claude Code & Claude Desktop to DeepSeek V4 with CC Switch",
    slug: "cc-switch-claude-code",
  },
  nextGuide: {
    title: "DeepSeek V4 Technical Report Explained: Architecture & Benchmarks",
    slug: "official-tech-report",
  },
  relatedGuides: [
    { title: "Connect Claude Code & Claude Desktop to DeepSeek V4 with CC Switch", slug: "cc-switch-claude-code" },
    { title: "DeepSeek V4 Flash Benchmarks: Agentic & Coding Scores in 2026", slug: "flash-benchmarks" },
    { title: "DeepSeek V4 Pro: Specs, Pricing & Release Date (2026)", slug: "v4-pro" },
    { title: "What Is DeepSeek V4 Flash? Full Guide to the 0731 Release", slug: "deepseek-v4-flash" },
  ],
  sources: [
    { label: "DeepSeek API Changelog (Official)", url: "https://api-docs.deepseek.com/updates/" },
    { label: "Hugging Face: DeepSeek-V4-Flash-0731 Model Card (Official)", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731" },
    { label: "GitHub: deepseek-ai Organization (Official)", url: "https://github.com/deepseek-ai" },
    { label: "36Kr: 'Model + Harness = Agent' and the Harness Team", url: "https://36kr.com/p/3818407956366208" },
    { label: "36Kr: Harness Tool-Call Costs and Internal Test Rumors", url: "https://36kr.com/p/3916402632644486" },
    { label: "TechTimes: V4 Flash 0731 Beats Its Flagship Pro on Nine Agent Benchmarks", url: "https://www.techtimes.com/articles/322513/20260731/deepseek-retrained-v4-flash-beats-its-flagship-pro-nine-agent-benchmarks.htm" },
    { label: "Reddit r/LocalLLaMA: DeepSWE Harness Fairness Question", url: "https://www.reddit.com/r/LocalLLaMA/comments/1tsse9i/deepswe_benchmarks_indicate_that_deepseek_v4_pro/" },
    { label: "DeepSeekV4Pro.com: Reported Mid-August V4 Window and Harness Beta", url: "https://deepseekv4pro.com/news/deepseek-v4-ga-mid-august-release-window-harness-beta" },
  ],
};
