import type { GuideContent } from "./types";

// target keyword: DeepSeek V4 vs GPT 5.6 Luna
export const v4VsGpt56Luna: GuideContent = {
  slug: "v4-vs-gpt56-luna",
  category: "COMPARISONS",
  title: "DeepSeek V4 vs GPT-5.6 Luna: Which Is Better After the Price Cut?",
  readTime: "8 MIN READ",
  updatedAt: "AUG 1, 2026",
  summary:
    "DeepSeek V4 vs GPT 5.6 Luna: Flash 0731 is $0.14/$0.28 with an AA index of 50; Luna after its 80% cut is $0.20/$1.20 at 51.",
  toc: [
    { id: "step-1", label: "What Each Model Is: Flash 0731 vs the Cheapest Luna Tier" },
    { id: "step-2", label: "Price After the 80% Cut: $0.20/$1.20 vs $0.14/$0.28" },
    { id: "step-3", label: "Intelligence: AA Index 50 vs 51, and a ~60% Cost-per-Task Gap" },
    { id: "step-4", label: "Benchmarks: Terminal-Bench 84.7 vs 82.7, and Luna's Long-Context Weak Spot" },
    { id: "step-5", label: "Speed and Latency: 1.24s First Token vs 122s of Thinking" },
    { id: "step-6", label: "Which Should You Pick? Four Scenarios" },
    { id: "step-7", label: "The Honest Limitations of Both" },
  ],
  steps: [
    {
      num: "01",
      title: "What Each Model Is: Flash 0731 vs the Cheapest Luna Tier",
      description:
        "This DeepSeek V4 vs GPT 5.6 Luna comparison sits on a coincidence of timing. OpenAI cut GPT-5.6 Luna prices by 80% on 2026-07-30, and the next day DeepSeek promoted V4 Flash from preview to its official release, build 0731.[1] Both events rewrote the cost calculus for price-conscious developers, which is exactly why this guide exists.",
      paragraphs: [
        "DeepSeek V4 Flash 0731 is the official production version of Flash, in public beta since 2026-07-31. It keeps the exact preview architecture and size — 284B total parameters, 13B active, 1M context — and was only re-post-trained for stronger agentic behavior. Nine of its published agent benchmarks beat the old preview build.[7] The official changelog adds that the V4 Pro official release \"will follow soon,\" so Flash 0731 is, for now, the only officially released V4 model. See [[deepseek-v4-flash|What Is DeepSeek V4 Flash?]] for the full 0731 breakdown.",
        "GPT-5.6 Luna is the entry tier of OpenAI's GPT-5.6 family, launched 2026-07-09. Its API docs position it for cost-sensitive, high-throughput workloads — the practical successor to the GPT-5 family's nano tier. Luna reads a 1.05M context, writes up to 128K tokens, and its knowledge cutoff is 2026-02-16.[3] OpenAI frames the tier as delivering \"performance comparable to models that were frontier-class a year ago\" at a fraction of the cost.",
      ],
      list: [
        "One is open-weight (MIT, downloadable); the other is closed and API-only.",
        "Flash is text-only; Luna accepts text plus image input.",
        "Neither has changed its weights in the last three weeks — only Luna's price and Flash's post-training did.",
      ],
      note: "\"DeepSeek V4 official\" means V4-Flash 0731 as of 2026-08-01. V4 Pro remains a preview, with the official changelog stating the release \"will follow soon.\"",
    },
    {
      num: "02",
      title: "Price After the 80% Cut: $0.20/$1.20 vs $0.14/$0.28",
      description:
        "The July 30 cut moved Luna from $1 input / $6 output per 1M tokens to $0.20 / $1.20 — an 80% drop that OpenAI attributes to inference and infrastructure efficiency gains. DeepSeek Flash kept its launch price: $0.14 input, $0.28 output, with cache hits at $0.0028, roughly a 98% discount.[8] The math below is current as of 2026-08-01.",
      paragraphs: [
        "The gap is now almost entirely on the output side. Luna's uncached input is only $0.06 more than Flash's, but its output is more than 4x Flash's. Luna also has a pricing rule Flash does not: any request whose input exceeds 272K tokens is billed at 2x input and 1.5x output prices.",
        "For full-pipeline cost, Artificial Analysis blends a 7:2:1 mix of cached input, fresh input, and output. On that blend, Flash lands at $0.06 per 1M tokens versus Luna at $0.17.[6] Luna's cache read is $0.02 (90% off) plus a cache-write fee at 1.25x uncached input; DeepSeek has no cache-write fee.",
      ],
      table: {
        headers: ["Per 1M tokens", "DeepSeek V4 Flash 0731", "GPT-5.6 Luna (post-cut)"],
        rows: [
          ["Input (cache miss)", "$0.14", "$0.20 (up to 272K) / $0.40 (over 272K)"],
          ["Output", "$0.28", "$1.20 (up to 272K) / $1.80 (over 272K)"],
          ["Input (cache hit)", "$0.0028 (98% off)", "$0.02 (90% off)"],
          ["Cache write", "None", "$0.25 (1.25x miss input)"],
          ["AA blended price (7:2:1)", "$0.06", "$0.17"],
        ],
      },
      code: `# DeepSeek V4 Flash — OpenAI-compatible, same base URL as before
curl https://api.deepseek.com/chat/completions \\
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \\
  -d '{"model": "deepseek-v4-flash",
       "messages": [{"role": "user", "content": "Classify this ticket"}],
       "reasoning_effort": "high"}'

# GPT-5.6 Luna — OpenAI Responses API
curl https://api.openai.com/v1/responses \\
  -H "Authorization: Bearer $OPENAI_API_KEY" \\
  -d '{"model": "gpt-5.6-luna",
       "input": "Classify this ticket",
       "reasoning": {"effort": "medium"}}'`,
      note: "Third-party resellers add markups: OpenRouter lists Flash at $0.0896/$0.1792 and Luna at a limited-time $0.10/$0.60. Check the provider's page, not the list price. See [[flash-pricing|DeepSeek V4 Flash pricing]] for the full cache math.",
    },
    {
      num: "03",
      title: "Intelligence: AA Index 50 vs 51, and a ~60% Cost-per-Task Gap",
      description:
        "On the Artificial Analysis Intelligence Index v4.1, GPT-5.6 Luna at max effort scores 51 and DeepSeek V4 Flash 0731 at Reasoning Max scores 50 — a single point apart.[5][4] Flash jumped from 40 to 50 over its preview build, putting it above V4 Pro (44) and one point below Luna.",
      paragraphs: [
        "The more striking number is cost per task. Even after OpenAI's 80% cut, Artificial Analysis reports that V4 Flash 0731 on DeepSeek's official API runs about 60% lower cost per task than Luna at max effort — Flash is cheaper per token and finishes tasks at comparable quality.",
        "Same-harness references: GLM-5.2 (max) also scores 51, and open-source leader Kimi K3 (max) scores 57. Luna sits above the 17 median for its price band — a strong model priced near Flash.",
      ],
      list: [
        "Flash 0731 (Reasoning Max): 50 — up from 40 on the preview, and 6 above V4 Pro (44).",
        "Luna (max): 51; Luna (xhigh): 49; Luna (high): 46 — effort level moves the score, so pick it deliberately.",
        "Cost per task is where the models truly diverge: roughly 60% in Flash's favor on DeepSeek's official API.",
      ],
      table: {
        headers: ["Model (effort)", "AA Intelligence Index", "Note"],
        rows: [
          ["GPT-5.6 Luna (max)", "51", "Price-band median is 17"],
          ["DeepSeek V4 Flash 0731 (Reasoning Max)", "50", "Preview scored 40"],
          ["DeepSeek V4 Pro (Reasoning Max)", "44", "Preview; official release pending"],
          ["GLM-5.2 (max)", "51", "Open-weight reference"],
          ["Kimi K3 (max)", "57", "Open-source leader"],
        ],
      },
      note: "The Intelligence Index is a third-party, same-harness measure — the cleanest head-to-head available. Vendor-reported benchmark tables (next step) should be read with that in mind.",
    },
    {
      num: "04",
      title: "Benchmarks: Terminal-Bench 84.7 vs 82.7, and Luna's Long-Context Weak Spot",
      description:
        "Both models are strong at agentic coding, and both vendors self-report the headline numbers. DeepSeek reports Flash 0731 at 82.7 on Terminal-Bench 2.1 — up from 61.8 on the preview — while OpenAI reports Luna at 84.7.[2] The caveat is real: these come from separate vendors' harnesses, so treat them as directional, not a controlled head-to-head.",
      paragraphs: [
        "Luna's official sheet also publishes its own weakness openly: on OpenAI's MRCR v2 8-needle long-context test at 256K-512K, Luna scores 41.3% versus GPT-5.5's 81.5%. If your workload leans on very long documents, that gap is the single clearest documented red flag in this comparison.",
        "Flash's official sheet shows the re-post-training effect: DeepSWE jumped from 7.3 on the preview to 54.4, Cybergym hit 76.7, and Toolathlon (verified) landed at 70.3. For an independent view, prefer the AA Intelligence Index; our [[flash-benchmarks|DeepSeek V4 Flash Benchmarks]] guide covers all nine numbers.",
      ],
      table: {
        headers: ["Benchmark", "DeepSeek V4 Flash 0731", "GPT-5.6 Luna"],
        rows: [
          ["Terminal-Bench 2.1", "82.7 (vendor-reported)", "84.7 (vendor-reported)"],
          ["OpenAI MRCR v2, 8-needle 256K-512K", "not reported", "41.3% (GPT-5.5: 81.5%)"],
          ["GPQA Diamond", "91% (AA-measured)", "92.3% (vendor-reported)"],
        ],
      },
      note: "No official table from either vendor directly compares it against the other. OpenAI's benchmarks reference GPT-5.5 and Claude; DeepSeek's reference Gemini and older GPT models. Read both as self-reported signals.",
    },
    {
      num: "05",
      title: "Speed and Latency: 1.24s First Token vs 122s of Thinking",
      description:
        "Latency is where these two feel most different. Artificial Analysis measures Flash's non-thinking time-to-first-token at about 1.24s on DeepSeek's official API, while Luna at max effort spends roughly 121.9 seconds thinking first. For a user waiting in chat, that is the difference between instant and \"let me check the logs.\"",
      paragraphs: [
        "Throughput is the reverse. Luna streams output at about 172.1 tokens/s at max effort, versus Flash at roughly 113.6-115.1 tokens/s on DeepSeek's official API. Luna is faster once it starts writing; Flash is faster to start at all.",
        "Two caveats. The 1.24s figure is Flash's non-thinking mode; DeepSeek has not published a thinking-mode TTFT, so pair non-thinking Flash against thinking Luna. Verbosity also shifts perceived speed: Flash used about 206M output tokens on the AA Intelligence Index versus Luna's ~130M — more words per task, not always a win.",
      ],
      list: [
        "TTFT: Flash ~1.24s (non-thinking) vs Luna ~121.9s (thinking, max).",
        "Output speed: Luna ~172.1 t/s vs Flash ~113.6-115.1 t/s on official APIs.",
        "Output volume on the same index run: ~206M tokens (Flash) vs ~130M (Luna).",
      ],
      note: "For interactive agents, prefer Flash, or run Luna at medium or low effort to cut that thinking delay. For batch pipelines, latency barely matters and the cost table in step 2 dominates the decision.",
    },
    {
      num: "06",
      title: "Which Should You Pick? Four Scenarios",
      description:
        "The honest answer to the DeepSeek V4 vs GPT 5.6 Luna question depends on your workload shape, not on benchmark averages. The four scenarios below follow the price evidence, the third-party benchmarks, and what users in the community report with both models.",
      list: [
        "High-throughput batch and pure cost — DeepSeek V4 Flash. Classification, summarization, routing, RAG lookups, and light realtime assistants care about cost per token and cost per task. Flash is cheapest on both ($0.14/$0.28 plus a ~98% cache discount).",
        "Subscription coding agents — DeepSeek V4 Flash, by a wide margin. On [[opencode-go|OpenCode Go]], Luna carries a $15/month usage allowance (roughly 10,250 requests), while Flash's allowance is $60 (roughly 158,150 requests) — about 15x more agent calls per month for the same subscription.",
        "Few, high-value, hallucination-sensitive outputs — GPT-5.6 Luna. For a complex single-step code task or a deliverable that will be reviewed, the community pattern is \"plan fast, implement, then verify.\" OpenAI reports Luna's coding agent index at 74.6, above Claude Opus 4.8's 72.5.",
        "Truly complex production engineering — neither, yet. Luna's 41.3% long-context MRCR score rules it out for very long documents, and Flash is a lighter model. This is where [[v4-pro|DeepSeek V4 Pro]] (official release pending) or OpenAI's Sol belongs.",
      ],
      note: "Re-verify third-party promos before committing: OpenRouter lists Luna at $0.10/$0.60 (limited-time 50% off) and Flash at $0.0896/$0.1792, and OpenCode Go's \"2x usage\" Luna promo has no published end date. Treat all of these as temporary.",
    },
    {
      num: "07",
      title: "The Honest Limitations of Both",
      description:
        "Both models ship with real trade-offs, and pretending otherwise is how budgets and codebases get hurt. Neither is a free lunch, and both show their edges in production.",
      paragraphs: [
        "Flash is verbose and, in practice, more prone to confabulation. Artificial Analysis measured its hallucination rate at 84% on its benchmark — down 12 points from the preview, but still in the range users describe as more hallucination-prone than GPT, Gemini, or Claude. After the 0731 update, community users also reported token usage climbing 4-5x on the same tasks. (Community reports, small samples — not a controlled study.)",
        "Luna is slow at high effort and weak at long context. The ~122s thinking TTFT at max effort is measurable, and community users describe it overthinking simple prompts. Its own published MRCR long-context score of 41.3% is the clearest documented gap. Luna is also closed-source with a knowledge cutoff of 2026-02-16; DeepSeek does not disclose Flash's cutoff.",
        "Final takeaway: price argues Flash, precision argues Luna, and both lose to bigger models on the hardest engineering. Start with Flash for high-volume work, keep Luna for the critical few, and re-run the cost table whenever either vendor changes prices — given the last three weeks, \"soon\" is a safe bet.",
      ],
      note: "Community quotes in this guide come from r/DeepSeek, r/OpenAI, r/codex, and r/opencode threads from late July 2026. They describe real-user experience, not controlled experiments, so weight them below the third-party benchmark data.",
    },
  ],
  prevGuide: {
    title: "Hermes Best Setup: DeepSeek V4 Flash 0731 + MiMo V2.5 (Vision)",
    slug: "hermes-setup",
  },
  nextGuide: undefined,
  relatedGuides: [
    { title: "Hermes Best Setup: DeepSeek V4 Flash 0731 + MiMo V2.5 (Vision)", slug: "hermes-setup" },
    { title: "What Is DeepSeek V4 Flash? Full Guide to the 0731 Release", slug: "deepseek-v4-flash" },
    { title: "DeepSeek V4 Flash Pricing: Token Costs & How to Save Up to 98%", slug: "flash-pricing" },
    { title: "DeepSeek V4 Flash Benchmarks: Agentic & Coding Scores in 2026", slug: "flash-benchmarks" },
  ],
  sources: [
    { label: "OpenAI — Advancing the Price-Performance Frontier with GPT-5.6 (July 30, 2026)", url: "https://openai.com/index/advancing-the-price-performance-frontier-with-gpt-5-6/" },
    { label: "OpenAI — GPT-5.6 Family Launch Page (Luna benchmarks)", url: "https://openai.com/index/gpt-5-6/" },
    { label: "OpenAI — GPT-5.6 Luna Model Documentation", url: "https://developers.openai.com/api/docs/models/gpt-5.6-luna" },
    { label: "Artificial Analysis — DeepSeek V4 Flash 0731 Scores 50 on the Intelligence Index", url: "https://artificialanalysis.ai/articles/deepseek-v4-flash-0731-scores-50-on-the-artificial-analysis-intelligence-index-10-points-above-previous-deepseek-v4-flash" },
    { label: "Artificial Analysis — GPT-5.6 Luna Model Page", url: "https://artificialanalysis.ai/models/gpt-5-6-luna" },
    { label: "Artificial Analysis — GPT-5.6 Luna vs DeepSeek V4 Flash Comparison", url: "https://artificialanalysis.ai/models/comparisons/gpt-5-6-luna-vs-deepseek-v4-flash" },
    { label: "DeepSeek — Official API Changelog (V4 Flash 0731 Release)", url: "https://api-docs.deepseek.com/updates/" },
    { label: "DeepSeek — Official Models & Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
  ],
};
