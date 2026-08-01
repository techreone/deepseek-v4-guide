import type { GuideContent } from "./types";

// target keyword: best cheap AI
export const beginnerGuide: GuideContent = {
  slug: "beginner-guide",
  category: "BEGINNER GUIDE",
  title: "Why DeepSeek V4 Is the Best Cheap AI Right Now: A Beginner Guide",
  readTime: "8 MIN READ",
  updatedAt: "AUG 1, 2026",
  summary:
    "Best cheap AI in 2026 is a real label: DeepSeek V4 costs about 97-99% less than GPT-5.5 and Claude, and you can start free at chat.deepseek.com.",
  toc: [
    { id: "step-1", label: "What Is DeepSeek V4? Two Models, One Name" },
    { id: "step-2", label: "Why the \"Best Cheap AI\" Label Holds Up: The Price Gap" },
    { id: "step-3", label: "Quality: Flash Is Sonnet-Class, Pro Is Opus-Class" },
    { id: "step-4", label: "Three Ways to Try It for Free or Nearly Free" },
    { id: "step-5", label: "The Honest Downside List" },
    { id: "step-6", label: "Who Should Pick DeepSeek V4 (and Who Should Think Twice)" },
    { id: "step-7", label: "Your First 10 Minutes: A Beginner Action Plan" },
  ],
  steps: [
    {
      num: "01",
      title: "What Is DeepSeek V4? Two Models, One Name",
      description:
        "You do not need to memorize model names to use DeepSeek V4, you just need to know there are two of them. DeepSeek V4 is an open-source AI family released as a preview on April 24, 2026, and its MIT-licensed weights are downloadable if you ever want to run it yourself.[2] The two models are DeepSeek V4 Flash and DeepSeek V4 Pro, and every entry point in this guide lets you pick between them.",
      paragraphs: [
        "Think of the pair as a fast junior engineer and a careful senior one. Flash is the quick, efficient, economical workhorse: 284B total parameters with 13B active per token, built for high-volume everyday work.[2] Pro is the flagship: 1.6T total parameters and 49B active per token, aimed at what DeepSeek calls \"quality reasoning\" — complex code, long analysis, agent tasks.[2]",
        "Both models read up to 1M tokens of context, and both support a thinking mode that returns chain-of-thought reasoning before the answer.[1] The real difference between them is price and depth, not access.",
      ],
      list: [
        "Pick Flash when you need speed and volume: drafts, summaries, data extraction, most coding.",
        "Pick Pro when the answer has to be careful: hard math, architecture, long multi-step reasoning.",
        "Both share the same 1M-token context, so you can swap models mid-project without changing anything else.",
      ],
      note: "New to the family? Start with [[deepseek-v4-flash|DeepSeek V4 Flash]] — it is the model this site's Flash guides are built around. The flagship is covered in [[v4-pro|DeepSeek V4 Pro]].",
    },
    {
      num: "02",
      title: "Why the \"Best Cheap AI\" Label Holds Up: The Price Gap",
      description:
        "The price gap is the reason this label is not an exaggeration. DeepSeek V4 Flash charges $0.14 per 1M input tokens and $0.28 per 1M output tokens.[1] The US models you already know cost an order of magnitude more: GPT-5.5 runs $5 input / $30 output, and Claude Sonnet 4.6 runs $3 / $15.[5] On output tokens, Flash is roughly 100x cheaper than GPT-5.5 ($0.28 vs $30).",
      paragraphs: [
        "Third-party trackers sum the gap as 97-99% cheaper than GPT-5.5 and Claude Sonnet for the same token volume.[5] Even among open-weight competitors, Flash is the price floor: GLM-5.2 sits at $1.40 / $4.40 per 1M, still about 10x more expensive on input.",
        "Prices get friendlier from there. Cache-hit input drops to $0.0028 per 1M tokens, a 98% discount on repeated prefixes that applies automatically with no configuration.[1] On OpenRouter, you can buy Flash at $0.0896 / $0.1792 per 1M, about 36% off the official rate.[4]",
      ],
      table: {
        headers: ["Model", "Input per 1M tokens", "Output per 1M tokens"],
        rows: [
          ["DeepSeek V4 Flash", "$0.14", "$0.28"],
          ["GLM-5.2", "$1.40", "$4.40"],
          ["Claude Sonnet 4.6", "$3", "$15"],
          ["GPT-5.5", "$5", "$30"],
        ],
      },
      list: [
        "1M tokens is roughly 750,000 English words, so a casual month of API use is a rounding error in dollars.",
        "The 97-99% figure compares per-token prices; your real savings depend on output volume, which is where Flash is cheapest relative to GPT-5.5.[5]",
      ],
      note: "The full cost picture, including cache math and peak-hour pricing that is announced but not yet in effect, is in the [[flash-pricing|pricing guide]].",
    },
    {
      num: "03",
      title: "Quality: Flash Is Sonnet-Class, Pro Is Opus-Class",
      description:
        "Cheap only matters if the model is actually good, so here is the quality picture. Independent evaluation firm Artificial Analysis puts V4 Flash's Intelligence Index at 47 on its Max setting, roughly the level of Claude Sonnet 4.6's max configuration.[3] Community reviewers read the same story on agent-heavy workloads, calling the July 31, 2026 build an \"undisputed price-performance leader.\"",
      paragraphs: [
        "A caveat worth keeping: Artificial Analysis also flags that the strongest published benchmark numbers come from DeepSeek's own model card, which describes Flash-0731 as \"broadly competitive with the strongest proprietary models available.\"[2] Treat vendor-reported scores as directional, not an independent verdict.",
        "For the flagship, community threads routinely place V4 Pro in Opus-class territory for hard reasoning — at a fraction of the price. Whether that quality gap is worth the premium is exactly the trade-off this guide helps you make, rather than a fact anyone can settle for you.",
      ],
      list: [
        "Flash's official positioning: fast, efficient, economical, with reasoning that \"closely approaches\" V4 Pro.[2]",
        "The 0731 build is a re-post-trained Flash, not a new architecture — parameters, context, and price are all unchanged.[2]",
        "For a beginner, the practical takeaway: Flash handles daily work well enough that most people will rarely need Pro.",
      ],
      note: "Benchmark scores vary by configuration and date. The full agent-benchmark table, with all caveats, lives in the flash-benchmarks guide.",
    },
    {
      num: "04",
      title: "Three Ways to Try It for Free or Nearly Free",
      description:
        "You do not have to pay anything to meet DeepSeek V4, and the cheapest paid path is almost nothing. There are three good on-ramps, from the zero-dollar web app to a $5 subscription.",
      paragraphs: [
        "First, the web app at chat.deepseek.com is free and needs no subscription. The model picker at the top switches between Instant Mode (V4 Flash) and Expert Mode (V4 Pro).[2]",
        "Second, the API. Multiple third-party trackers report that new accounts receive a one-time grant of about 5 million free tokens — roughly $3.40-$8.40 of value, valid about 30 days, with no credit card required.[7] This is third-party reporting: the official pricing page does not state the grant directly, and a few users report not seeing it, so check your actual balance at platform.deepseek.com after registering.",
        "Third, the cheapest paid on-ramp for developers: OpenCode Go costs $5 for the first month, then $10/month, and includes DeepSeek V4 Flash and Pro through the open-source OpenCode agent.[6]",
      ],
      table: {
        headers: ["Entry point", "Cost", "What you get"],
        rows: [
          ["chat.deepseek.com", "Free", "Instant Mode (V4 Flash) and Expert Mode (V4 Pro)"],
          ["API free-token grant", "Free (third-party reported)", "About 5M tokens, ~30 days, no credit card"],
          ["OpenCode Go", "$5 first month, then $10/month", "Coding agent with V4 Flash and Pro included"],
        ],
      },
      list: [
        "Web chat: register with email, phone, or Google, then start in Instant Mode.",
        "API: check whether the reported free-token grant is in your balance before adding a card.",
        "Coding: the $5 first month of OpenCode Go beats buying per-call API credits for many users.",
      ],
      note: "The subscription route is covered in detail in the [[opencode-go|OpenCode Go guide]].",
    },
    {
      num: "05",
      title: "The Honest Downside List",
      description:
        "No honest \"best cheap AI\" writeup skips the downsides, so here they are in plain terms. The biggest one is hallucination: on Artificial Analysis' Omniscience accuracy test, V4 Pro scored 94% and V4 Flash 96% — the models answer confidently even when they do not know.[3] For comparison, GLM-5.2 scored 28% and MiniMax M3 scored 16% on the same test.[3]",
      list: [
        "Not for high-stakes medical, legal, or financial advice. A confident wrong answer is the real risk, and it applies to every model in this price class.",
        "English output is not always stable. One user reported the model switching back to Chinese mid-session despite an explicit English-only request.[8]",
        "Niche weak spots: community reviews single out Swift as a weak language for Flash, and some users find long reasoning runs slow.",
        "Verify important outputs. Community members warn that an agent left fully unattended can cut corners and ship incomplete work.",
      ],
      note: "These are trade-offs, not deal-breakers. For daily writing and coding the risk profile is manageable; for anything where a wrong answer has real cost, keep a human in the loop.",
    },
    {
      num: "06",
      title: "Who Should Pick DeepSeek V4 (and Who Should Think Twice)",
      description:
        "Whether DeepSeek V4 is the right pick for you depends on your use case, so treat this as a self-check rather than a verdict.",
      paragraphs: [
        "Great fit: budget-sensitive individuals, students, and developers; workloads with lots of calls such as classification, extraction, summarization, and code completion; and anyone who values open weights they could self-host or move between platforms.[3]",
        "Think twice: teams whose answers must be right the first time, projects that need rock-solid English-only output, and anyone planning to let an agent run fully unattended.",
        "A common pattern among heavy users is hybrid routing: Flash for the high-volume work, then an escalation to Pro — or a US model — for the rare request that needs maximum care. The cost math usually makes Flash the default.[1]",
      ],
      list: [
        "Budget-conscious individual, student, or solo developer: strongly consider.",
        "High-throughput pipeline or batch processing: Flash is purpose-built for this.",
        "High-stakes advice or fully autonomous agents: be careful and verify everything.",
      ],
      note: "If price-performance is your only question, the pricing guide breaks down exactly when Flash beats Pro and when the premium for Pro is worth it.",
    },
    {
      num: "07",
      title: "Your First 10 Minutes: A Beginner Action Plan",
      description:
        "Ten minutes is enough to form a first opinion. Here is the fastest path from zero to a real answer, without spending anything beyond a $5 optional detour.",
      list: [
        "Open chat.deepseek.com, sign up with email, phone, or Google, and start in Instant Mode (V4 Flash). Ask something you already know the answer to, so you can judge the quality yourself.[2]",
        "If you want API access, register at platform.deepseek.com, check whether the reported ~5M free-token grant appears in your balance, and generate an API key.[7]",
        "Developers: try OpenCode Go for $5 in the first month and run the same prompt inside a real coding agent.[6]",
        "Compare the results against whatever you use today. If output quality holds for your tasks at a fraction of the price, you have your answer.",
      ],
      code: `curl https://api.deepseek.com/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer \${DEEPSEEK_API_KEY}" \\
  -d '{
    "model": "deepseek-v4-flash",
    "messages": [
      {"role": "user", "content": "Summarize the 3 key points about DeepSeek V4 Flash in one sentence."}
    ],
    "stream": false
  }'`,
      note: "Key, base URL, and a full first-call walkthrough are in the [[flash-api-setup|Flash API setup guide]].",
    },
  ],
  prevGuide: undefined,
  nextGuide: {
    title: "OpenCode Go: The $5/Month Subscription That Unlocks DeepSeek V4",
    slug: "opencode-go",
  },
  relatedGuides: [
    { title: "What Is DeepSeek V4 Flash? Full Guide to the 0731 Release", slug: "deepseek-v4-flash" },
    { title: "DeepSeek V4 Flash Pricing: Token Costs & How to Save Up to 98%", slug: "flash-pricing" },
    { title: "OpenCode Go: The $5/Month Subscription That Unlocks DeepSeek V4", slug: "opencode-go" },
    { title: "DeepSeek V4 Flash API Setup: Base URL, Models & Your First Call", slug: "flash-api-setup" },
  ],
  sources: [
    { label: "Official DeepSeek V4 Models & Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "Official DeepSeek V4 Preview Release Announcement", url: "https://api-docs.deepseek.com/news/news260424" },
    { label: "Artificial Analysis — DeepSeek V4 Pro & V4 Flash Review", url: "https://artificialanalysis.ai/articles/deepseek-is-back-among-the-leading-open-weights-models-with-v4-pro-and-v4-flash" },
    { label: "DeepSeek V4 Flash on OpenRouter", url: "https://openrouter.ai/deepseek/deepseek-v4-flash" },
    { label: "CostGoat — DeepSeek API Pricing vs GPT-5.5 and Claude", url: "https://www.costgoat.com/pricing/deepseek-api" },
    { label: "OpenCode Go — Official Documentation", url: "https://opencode.ai/docs/go/" },
    { label: "PricePerToken — DeepSeek Free Tier (5M tokens)", url: "https://pricepertoken.com/endpoints/deepseek/free" },
    { label: "Reddit r/LocalLLaMA — V4 Flash Language & Quality Feedback", url: "https://www.reddit.com/r/LocalLLaMA/comments/1vbidkp/deepseekv4flash_has_been_updated_the_official/" },
  ],
};
