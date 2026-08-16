import type { GuideContent } from "./types";

// target keyword: deepseek v4 pro release date
export const v4ProReleaseDate: GuideContent = {
  slug: "v4-pro-release-date",
  category: "MODEL GUIDE",
  title: "DeepSeek V4 Pro Release Date: From Preview to GA (2026)",
  seoTitle: "DeepSeek V4 Pro Release Date: GA on Aug 13",
  readTime: "7 MIN READ",
  updatedAt: "AUG 16, 2026",
  summary:
    "DeepSeek V4 Pro went generally available on August 13, 2026 with the 0813 build, ending a 4-month preview. Full release timeline, GA details, and what changed.",
  toc: [
    { id: "step-1", label: "When Did DeepSeek V4 Pro Go GA?" },
    { id: "step-2", label: "The Full V4 Pro Timeline: Preview to GA" },
    { id: "step-3", label: "What the 0813 GA Build Includes" },
    { id: "step-4", label: "How to Get V4 Pro Today" },
    { id: "step-5", label: "What Comes Next" },
  ],
  steps: [
    {
      num: "01",
      title: "When Did DeepSeek V4 Pro Go GA?",
      description:
        "DeepSeek V4 Pro went generally available on August 13, 2026, when DeepSeek shipped the **0813 checkpoint** — the build that moved the 1.6T-parameter flagship from preview to production[1]. The GA announcement is dated 2026/08/13 in the official API changelog, and every service (API, app, and web) switched to the 0813 build the same day.",
      paragraphs: [
        "That date ends a nearly four-month preview: V4 Pro launched as a preview on April 24, 2026, and every build between April and August was explicitly labeled a preview. The 0813 release is the first production build, and the model ID on the API stayed `deepseek-v4-pro` — no migration needed for existing callers[3].",
        "The August 13 launch landed in the same window as another DeepSeek release: the [[deepseek-harness|DeepSeek Harness]] developer preview, an MIT-licensed agent framework that DeepSeek used to produce the official agent benchmarks for the 0813 build[1].",
      ],
      list: [
        "GA date: August 13, 2026 (0813 checkpoint)",
        "Preview period: April 24, 2026 – August 13, 2026",
        "Model ID unchanged: deepseek-v4-pro",
        "Announced alongside the DeepSeek Harness developer preview",
      ],
      note: "Some third-party trackers list the rollout window as 'August 12-13' because the pricing page and app updates landed across those two days. The official changelog entry is dated 2026/08/13[1].",
    },
    {
      num: "02",
      title: "The Full V4 Pro Timeline: Preview to GA",
      description:
        "The path from preview to GA had several milestones, and most of them changed what you pay and how you call the model.",
      table: {
        headers: ["Date", "Event", "Status"],
        rows: [
          ["Apr 24, 2026", "V4 Pro launches as preview alongside V4 Flash; 1M context becomes default", "Official"],
          ["May 22-31, 2026", "V4 Pro API takes a permanent 75% price cut", "Official"],
          ["Jun 29, 2026", "The Paper reports a mid-July GA window (rumor)", "Unconfirmed"],
          ["Jul 20, 2026", "36kr claims GA rollout testing already underway", "Unconfirmed"],
          ["Jul 24, 2026", "Legacy model names deepseek-chat / deepseek-reasoner retired", "Official"],
          ["Jul 31, 2026", "Flash-0731 goes public beta; Pro stays preview; 'official release will follow soon'", "Official"],
          ["Aug 13, 2026", "V4 Pro 0813 goes GA; Harness developer preview ships", "Official"],
          ["Aug 16, 2026", "Peak/off-peak pricing takes effect at 16:00 UTC", "Official"],
        ],
      },
      paragraphs: [
        "The pre-GA rumor mill was loud but mostly wrong on timing: mid-July windows and 'as early as tomorrow' claims all missed, and the actual GA landed on August 13. The reliable signals were official — the July 31 changelog explicitly said the Pro release 'will follow soon,' which pointed at early-to-mid August[1].",
        "For context on the smaller sibling released the same day as the preview, see the [[deepseek-v4-flash|DeepSeek V4 Flash]] guide; Flash hit its own official build (Flash-0731) on July 31, two weeks before Pro went GA.",
      ],
    },
    {
      num: "03",
      title: "What the 0813 GA Build Includes",
      description:
        "The GA release was not just a status flip — it shipped three headline upgrades: major agent improvements, flexible reasoning effort, and native OpenAI Responses API support[1].",
      list: [
        "Major agent upgrades with strong production gains (DeepSeek's phrasing)",
        "Flexible reasoning effort for V4 Pro and V4 Flash: low / high / max",
        "Native OpenAI Responses API support, optimized for Codex with one-click setup",
        "V4 Pro available on app and web through 'Expert Mode'",
        "Peak and off-peak API pricing introduced (off-peak 50% lower than peak)",
      ],
      paragraphs: [
        "On benchmarks, the 0813 build is a large jump over the preview: Terminal Bench 2.1 goes from 72.1 (preview) to 87.9, and the build takes first place on Cybergym (83.3) and AutomationBench (31.8) in DeepSeek's official tables[4]. Independent testing by MindStudio scored it 76.25% on an 8-task coding/reasoning suite, versus 24.8% for the preview[6].",
        "Those official agent numbers were produced with the DeepSeek Harness in minimal mode at max reasoning effort — see the [[harness-benchmark|DeepSeek Harness benchmarks]] page for how the harness affects the scores.",
      ],
      note: "All official benchmark numbers are vendor-reported and were produced with DeepSeek's own harness configuration. Independent reproduction of the full official table is not yet available[4][6].",
    },
    {
      num: "04",
      title: "How to Get V4 Pro Today",
      description:
        "You do not need to do anything special to move to GA — the model ID is unchanged and the API already points at the 0813 build[3].",
      code: `from openai import OpenAI

client = OpenAI(
    api_key="<DeepSeek API Key>",
    base_url="https://api.deepseek.com",
)

response = client.chat.completions.create(
    model="deepseek-v4-pro",
    messages=[{"role": "user", "content": "Explain the agent upgrade in the 0813 build."}],
    reasoning_effort="high",  # low / high / max
)`,
      list: [
        "API: model deepseek-v4-pro, base URL https://api.deepseek.com",
        "App/web: switch the model menu to V4 Pro — it runs in 'Expert Mode'",
        "Anthropic-format callers: use https://api.deepseek.com/anthropic",
        "Codex users: the official one-click setup script configures Responses API support",
      ],
      note: "If you were on the preview, nothing breaks: the same key, base URL, and model name keep working. The only visible change is the checkpoint behind the name[3].",
    },
    {
      num: "05",
      title: "What Comes Next",
      description:
        "The biggest post-GA change is pricing: peak/off-peak rates took effect at 16:00 UTC on August 16, 2026 — three days after GA[1][2].",
      paragraphs: [
        "Under the new schedule, V4 Pro costs $1.98 per 1M output tokens off-peak and $3.96 peak, up from $0.87 flat. If you are planning capacity, the [[v4-pro-pricing|full V4 Pro pricing]] page has the complete table and the [[v4-pro-surge-pricing|peak vs off-peak scheduling guide]] explains how to route workloads to the cheap hours.",
        "Beyond pricing, watch for the ecosystem around the model: the [[v4-pro-responses-api|Responses API setup]] page covers the Codex one-click config, and the [[v4-pro-0813|0813 build explainer]] details what changed versus the preview build.",
      ],
      note: "Timing note: DeepSeek has not published a date for the next V4 Pro build. The 0813 checkpoint is the current GA as of August 16, 2026.",
    },
  ],
  relatedGuides: [
    {
      title: "DeepSeek V4 Pro 0813 Build Explained",
      slug: "v4-pro-0813",
    },
    {
      title: "DeepSeek V4 Pro Pricing: Peak & Off-Peak Rates",
      slug: "v4-pro-pricing",
    },
    {
      title: "DeepSeek Harness Release Date & v0.1 Launch",
      slug: "harness-release-date",
    },
    {
      title: "DeepSeek V4 Pro: Specs, Pricing & Release Date",
      slug: "v4-pro",
    },
  ],
  sources: [
    { label: "Official DeepSeek API: V4-Pro GA Release", url: "https://api-docs.deepseek.com/news/news260813/" },
    { label: "DeepSeek Models & Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "DeepSeek First API Call Docs", url: "https://api-docs.deepseek.com/quick_start/first_api_call/" },
    { label: "DeepSeek-V4-Pro-0813 Model Card (Hugging Face)", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813" },
    { label: "MindStudio: V4 Pro 0813 Benchmark Review", url: "https://www.mindstudio.ai/blog/deepseek-v4-pro-0813-benchmark-review" },
  ],
};
