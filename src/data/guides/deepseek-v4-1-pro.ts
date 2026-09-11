import type { GuideContent } from "./types";

// target keyword: deepseek v4.1 pro
// 内容来源：reference/topics/28-v4-pro-retired-routing.md 与 27-v4-1-flash.md（官方表述与社区解读分开标注）
export const deepseekV41Pro: GuideContent = {
  slug: "deepseek-v4-1-pro",
  category: "UPCOMING",
  title: "DeepSeek V4.1 Pro: What We Know So Far",
  seoTitle: "DeepSeek V4.1 Pro: What We Know So Far",
  readTime: "8 MIN READ",
  updatedAt: "SEP 11, 2026",
  summary:
    "DeepSeek V4.1 Pro has no release date. The official signal: V4-Pro requests route to V4.1 Flash until V4.1 Pro launches. What to expect and how to track it.",
  toc: [
    { id: "step-1", label: "Step 1: The Current State of V4.1 Pro" },
    { id: "step-2", label: "Step 2: What DeepSeek Has Actually Said" },
    { id: "step-3", label: "Step 3: The Sept 14 V4-Pro Routing Deadline" },
    { id: "step-4", label: "Step 4: Why V4.1 Pro Exists — the Architecture Generation" },
    { id: "step-5", label: "Step 5: What to Expect — Flagship Positioning" },
    { id: "step-6", label: "Step 6: Official vs Rumored — Confidence Labels" },
    { id: "step-7", label: "Step 7: How to Track the Launch" },
    { id: "step-8", label: "Step 8: What It Means for API Users Now" },
  ],
  steps: [
    {
      num: "01",
      title: "The Current State of V4.1 Pro",
      description:
        "DeepSeek V4.1 Pro does not have a release date. What exists today is a name that DeepSeek itself used in an official routing announcement, a new architecture family that can scale to larger models, and a retired flagship waiting to be succeeded. Everything else is inference[1][2].",
      paragraphs: [
        "V4.1 Pro is the presumed flagship of the V4.1 generation that began with [[deepseek-v4-1-flash|V4.1 Flash]] on September 10, 2026. DeepSeek described V4.1 Flash as the smallest model in the new family and said the family is designed for scaling to larger models, which strongly implies a larger sibling is planned[2].",
        "This page separates what DeepSeek has stated officially from what the community has inferred. We update it as official information appears, and we label every claim accordingly[1][4].",
      ],
      note: "As of September 11, 2026, no official V4.1 Pro model card, pricing entry, or weights exist[2][3].",
    },
    {
      num: "02",
      title: "What DeepSeek Has Actually Said",
      description:
        "DeepSeek's official September 10 news post contains the clearest existing statement about V4.1 Pro. It explains that all deepseek-v4-pro requests will route to V4.1 Flash at V4.1 Flash rates, and that this routing 'will continue until V4.1-Pro launches'[1].",
      paragraphs: [
        "That single sentence establishes three official facts: the product name V4.1-Pro is real, DeepSeek intends to launch it, and its launch will end the interim routing of V4-Pro traffic to Flash. The company gave no date, no specification, and no price[1].",
        "DeepSeek also stated that its new architecture family is built for a higher capability ceiling, faster inference, higher throughput, and scaling to larger models, and it listed V4.1 Flash as the family's smallest member. These are official statements, not speculation[2].",
      ],
      list: [
        "Official: the name V4.1-Pro appears in DeepSeek's own announcement[1]",
        "Official: V4-Pro traffic routes to V4.1 Flash until V4.1 Pro launches[1]",
        "Official: the V4.1 family scales to larger models[2]",
        "Not official: any release date, parameter count, price, or benchmark[1][2]",
      ],
      note: "Source: DeepSeek's September 10, 2026 news post and pricing footnotes. Nothing in this guide should be read as a confirmed launch schedule[1][3].",
    },
    {
      num: "03",
      title: "The Sept 14 V4-Pro Routing Deadline",
      description:
        "The one firm date in the V4.1 Pro story is about V4-Pro, not V4.1 Pro. From 04:00 UTC on September 14, 2026 (12:00 Beijing time), every deepseek-v4-pro request routes to V4.1 Flash and is billed at V4.1 Flash rates. This continues until V4.1 Pro launches[1][2].",
      paragraphs: [
        "The interim routing is effectively a price cut and a capability swap at once. Users calling deepseek-v4-pro pay Flash rates — $0.60 per million output off-peak instead of the old Pro rate — and receive V4.1 Flash behind the same identifier, which is stronger on most agent benchmarks but weaker on some knowledge rows[1][2].",
        "Because the routing is time-boxed to end at V4.1 Pro's launch, it also functions as a countdown of sorts. When the routing stops, V4.1 Pro has arrived. Until then, there is no way to know the date from the outside[1].",
      ],
      table: {
        headers: ["Date (2026)", "Event"],
        rows: [
          ["Apr 24", "V4-Pro / V4-Flash preview released"],
          ["Aug 13", "V4-Pro GA (0813 checkpoint)"],
          ["Sep 10", "V4.1 Flash launch; V4-Flash line retired"],
          ["Sep 14, 04:00 UTC", "All deepseek-v4-pro requests route to V4.1 Flash"],
          ["TBD", "V4.1 Pro launch (no date announced)[1][2]"],
        ],
      },
      note: "The routing is per DeepSeek's official announcement and pricing-page footnote. See [[deepseek-v4-pro-retired|the V4-Pro retirement guide]] for the full timeline[1][4].",
    },
    {
      num: "04",
      title: "Why V4.1 Pro Exists — the Architecture Generation",
      description:
        "V4.1 Pro is expected to be the flagship of DeepSeek's new architecture family, built on Causal Encoder-Decoder (CED) with CSA2 attention and Engram memory — the same design used by [[deepseek-v4-1-flash|V4.1 Flash]]. It would replace V4-Pro, which belongs to the previous generation[2][4].",
      paragraphs: [
        "The retired V4-Pro was a 1.6T-parameter MoE with 49B active parameters. DeepSeek said multiple parties' tests put V4.1 Flash ahead of V4-Pro on performance, cost, speed, and total runtime — the stated reason for phasing the flagship out. A company does not retire its 1.6T flagship unless it has a replacement in mind[1][4].",
        "Community analysis points to the same conclusion. On the r/SillyTavernAI thread discussing the retirement, a widely cited comment argued the Pro model was 'underperforming by its size,' and that DeepSeek was removing it to free training capacity for a retrained successor. That reasoning is plausible but is community interpretation, not an official rationale[5][4].",
      ],
      note: "The CED, CSA2, and Engram components are documented in the V4.1 Flash model card; their reuse in V4.1 Pro is inferred from DeepSeek's statement that the family scales to larger models[2].",
    },
    {
      num: "05",
      title: "What to Expect — Flagship Positioning",
      description:
        "The most reasonable expectation is that V4.1 Pro becomes DeepSeek's flagship: a larger CED-family model than V4.1 Flash, positioned above it on the hardest reasoning and long-horizon agent tasks, with a higher price tier and a routed model id such as deepseek-v4-pro or a new deepseek-v4.1-pro name[1][2].",
      paragraphs: [
        "Two patterns from this release cycle hint at how it may appear. First, DeepSeek tends to reuse existing identifiers and change the model behind them, as it did with deepseek-v4-pro and deepseek-v4-flash. Second, it publishes a Hugging Face model card and pricing page at launch. Watching those two locations is probably the fastest way to catch the release[1][2][3].",
        "What is genuinely unknown is scale. A flagship successor to a 1.6T/49B model could be larger, similarly sized but more efficient, or even smaller on the CED design if efficiency wins. DeepSeek has not published any parameter figure, and no credible official leak has surfaced as of this writing[2][4].",
      ],
      list: [
        "Expected: larger or more capable CED-family model than V4.1 Flash",
        "Expected: flagship price tier above Flash, likely with peak/off-peak rates",
        "Expected: reuse of the deepseek-v4-pro id and/or a new pro name",
        "Unknown: parameter count, activation per token, context changes",
        "Unknown: launch date, benchmark results, license[1][2]",
      ],
      note: "Positioning is an inference from official statements plus market logic, not an official specification[1][2].",
    },
    {
      num: "06",
      title: "Official vs Rumored — Confidence Labels",
      description:
        "Because V4.1 Pro is unreleased, separating confirmed facts from speculation matters. DeepSeek has confirmed the name and the routing-until-launch plan. It has not confirmed a date, size, price, or capability. Community discussion has filled the gap with plausible but unverified claims[1][4][5].",
      paragraphs: [
        "A practical rule: treat as confirmed only what appears on api-docs.deepseek.com or the deepseek-ai Hugging Face organization. Treat as speculation anything sourced to a forum, a social post, or an aggregator. Even consistent community claims can be right in direction and wrong in detail[1][3][5].",
      ],
      table: {
        headers: ["Claim", "Status", "Basis"],
        rows: [
          ["The name V4.1 Pro exists", "Official", "DeepSeek news post[1]"],
          ["V4-Pro routes to Flash until V4.1 Pro launches", "Official", "DeepSeek news post + pricing page[1][3]"],
          ["The V4.1 family scales to larger models", "Official", "DeepSeek news post[2]"],
          ["V4.1 Pro will be the flagship successor", "Strong inference", "Retirement rationale + family framing[1][4]"],
          ["Training capacity freed for a retrain", "Community interpretation", "Reddit thread on the retirement[5]"],
          ["Any specific launch date", "Unconfirmed", "No official source[1][2]"],
        ],
      },
      note: "If a date circulates without an api-docs or Hugging Face source, label it unconfirmed[1][3][5].",
    },
    {
      num: "07",
      title: "How to Track the Launch",
      description:
        "The reliable places to watch are DeepSeek's API changelog, its news posts, its pricing page, and its Hugging Face organization. A launch typically shows up as a changelog entry, a pricing row, and a model card within the same window[1][3].",
      paragraphs: [
        "The changelog is the highest-signal source because model routing changes are documented there even when no blog post appears. The pricing page is second, because a new flagship almost always arrives with new rates. The Hugging Face organization is where weights and technical reports appear for open releases[1][3].",
        "One caution: because DeepSeek silently reroutes existing identifiers, an app or third-party dashboard may show 'deepseek-v4-pro' long after the backend changed. Do not treat a familiar model string as proof the model is unchanged. Check the changelog and compare output behavior instead[1][4].",
      ],
      list: [
        "api-docs.deepseek.com/updates — changelog, highest signal[3]",
        "api-docs.deepseek.com/news/ — official announcements[2]",
        "api-docs.deepseek.com/quick_start/pricing/ — new rate rows[1]",
        "huggingface.co/deepseek-ai — weights and model cards for open releases",
        "This page — updated with confidence labels when news lands",
      ],
      note: "For the identifier mechanics, see [[deepseek-flash-model-names|the model-names reference]] and [[v4-1-flash-api-setup|the API setup guide]][1][4].",
    },
    {
      num: "08",
      title: "What It Means for API Users Now",
      description:
        "In the meantime, API users already gained a price cut: from September 14, deepseek-v4-pro calls run on V4.1 Flash at Flash rates. The practical action today is not to wait for V4.1 Pro but to re-baseline your application on the model that is actually serving your traffic[1][2].",
      paragraphs: [
        "Two things are worth doing now. First, keep model ids configurable rather than hard-coded, so a future launch or reroute is a config change rather than a code change. Second, re-run regression tests, because the model behind deepseek-v4-pro changed even though the identifier did not[1][4].",
        "When V4.1 Pro does launch, expect a new price tier and possibly a new name. Budget for a higher per-token rate than Flash, and plan a fallback route so that a flagship outage or rate limit does not stall production. Teams already routing to Flash will have the cheapest lane available if the flagship proves expensive[1][3].",
      ],
      list: [
        "Today: deepseek-v4-pro → V4.1 Flash at Flash rates (from Sept 14)[1]",
        "Keep model ids in configuration, not hard-coded[4]",
        "Re-run regression suites after any reroute[4]",
        "Prepare a Flash fallback for when the flagship launches at a higher price[1][3]",
      ],
      note: "For current capability and cost details, see [[deepseek-v4-1-flash|the V4.1 Flash guide]] and [[v4-1-flash-pricing|the pricing guide]][1][3].",
    },
  ],
  relatedGuides: [
    { title: "What Is DeepSeek V4.1 Flash? The 552B MoE, Explained", slug: "deepseek-v4-1-flash" },
    { title: "DeepSeek V4 Pro Retired: Why It Routes to V4.1 Flash", slug: "deepseek-v4-pro-retired" },
    { title: "DeepSeek V4.1 Flash Pricing: $0.003 Cache Hits & Peak Rates", slug: "v4-1-flash-pricing" },
    { title: "DeepSeek Flash Model Names: IDs, Aliases & Retirements", slug: "deepseek-flash-model-names" },
    { title: "DeepSeek V4.1 Flash Benchmarks: Full Official Table", slug: "v4-1-flash-benchmarks" },
  ],
  sources: [
    { label: "DeepSeek-V4.1-Flash: Smarter, Faster, More Efficient (Official News Post)", url: "https://api-docs.deepseek.com/news/news260910/" },
    { label: "DeepSeek API Changelog (Sept 10, 2026)", url: "https://api-docs.deepseek.com/updates" },
    { label: "DeepSeek Models & Pricing (Routing Footnote)", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "The Next Web: V4.1-Flash Launch and V4-Pro Retirement", url: "https://thenextweb.com/news/deepseek-v4-1-flash-launch-v4-pro-retired-price-cut" },
    { label: "Reddit r/SillyTavernAI: V4-Pro Routing Discussion", url: "https://www.reddit.com/r/SillyTavernAI/comments/1wbgxus/all_requests_to_the_deepseekv4pro_model_will_be" },
    { label: "Hacker News: V4.1 Flash Launch Discussion", url: "https://news.ycombinator.com/item?id=49624603" },
    { label: "Requesty: V4.1 Flash Retires V4-Pro Pinned Model IDs", url: "https://www.requesty.ai/blog/deepseek-v4-1-flash-retires-v4-pro-pinned-model-ids" },
  ],
};
