import type { GuideContent } from "./types";

// target keyword: deepseek v4.1 flash free
// 事实来源：reference/topics/29-v4-1-flash-1017.md、31-opencode-deepseek-1017.md
// 2026-10-18 联网核实：Zen 定价表免费清单已无 DeepSeek 条目，但实时模型清单仍返回
// deepseek-v4.1-flash-free（两处快照不一致 → 以 Console picker 为准）；OpenRouter 无活跃 :free；
// 官方 Search/Fetch 免费窗口至 2026-10-31 16:00 UTC（深挖见文末 sources）
export const deepseekFree1017: GuideContent = {
  slug: "deepseek-free-1017",
  category: "PRICING & COST",
  title: "Is DeepSeek V4.1-Flash-1017 Free? Every Route Explained",
  seoTitle: "Is DeepSeek V4.1 Flash Free? Every Route",
  readTime: "11 MIN READ",
  updatedAt: "OCT 18, 2026",
  summary:
    "DeepSeek V4.1 Flash is free to self-host but not free on the official API. Here are the real October 2026 routes, promo status, and what each costs.",
  toc: [
    { id: "step-1", label: "Step 1: The Short Answer — Weights Free, API Paid" },
    { id: "step-2", label: "Step 2: The Three Kinds of \"Free\"" },
    { id: "step-3", label: "Step 3: The OpenCode Zen Free Tier and Its Vanishing Act" },
    { id: "step-4", label: "Step 4: How to Check If a Free Tier Still Exists" },
    { id: "step-5", label: "Step 5: The One Official Free Window: Search and Fetch" },
    { id: "step-6", label: "Step 6: Cheap Hosts — OpenRouter, Zen Paid and Go" },
    { id: "step-7", label: "Step 7: The Full Route Comparison Table" },
    { id: "step-8", label: "Step 8: Four Levers That Beat Chasing Free" },
    { id: "step-9", label: "Step 9: What a Free Tier Really Costs You" },
    { id: "step-10", label: "Step 10: Compliance and the Bottom Line" },
  ],
  steps: [
    {
      num: "01",
      title: "The Short Answer — Weights Free, API Paid",
      description:
        "There is no single yes-or-no answer to whether DeepSeek V4.1-Flash-1017 is free, because the model ships in three different forms with three different price tags. The weights are free. The official API is not. And almost everything you have seen described as free is a third-party promotion with an expiry date[1][3].",
      paragraphs: [
        "Start with the weights. DeepSeek-V4.1-Flash-1017 is released under the MIT license and went up on Hugging Face and ModelScope on release day, so you can download, fine-tune and serve it commercially without paying a license fee to anyone. That is a genuine, permanent kind of free — but it is free as in speech, not as in lunch. The checkpoint is a 552B-parameter mixture of experts and lands around 511 GB on disk, so the hardware required to run it is a project in itself. If that is your plan, read [[v4-1-flash-1017-local|the local deployment route]] before you count this as a saving[1].",
        "Now the API. DeepSeek's own hosted endpoint is not free and has no free tier. Off-peak pricing for the model published as deepseek-flash runs $0.15 per million input tokens and $0.60 per million output tokens, with cache hits at $0.003 per million. Peak hours double both input and output. Billing is prepaid pay-as-you-go: no trial credits, no free request bucket, no monthly allowance on the official platform[1].",
        "That leaves the interesting middle ground. When a headline claims DeepSeek V4.1 Flash is free, it almost always means one specific platform is eating the inference cost for a limited window, usually to collect feedback or to win developer mindshare. Those offers are real, but they are temporary, they come with reduced capability, and they disappear without much warning. The rest of this page is about telling the three cases apart before you build anything on top of them[3][7].",
      ],
      list: [
        "Weights: MIT, free forever, but a 511 GB self-hosting project[1]",
        "Official API: paid only, $0.15 input / $0.60 output off-peak, $0.003 cache hit[1]",
        "Every \"free\" headline: a time-boxed third-party promotion[3][7]",
      ],
      note: "Do not plan production on a promotional endpoint. Treat a free tier as a trial and keep a paid route wired up next to it from day one[6].",
    },
    {
      num: "02",
      title: "The Three Kinds of \"Free\"",
      description:
        "Sorting the landscape into three buckets is the fastest way to avoid a nasty surprise. Bucket one is genuinely free and permanent. Bucket two is free for now. Bucket three is cheap but metered, and it is the one people most often mistake for free[1][3][5].",
      paragraphs: [
        "Genuinely free means the MIT weights you host yourself, or a retrieval window that DeepSeek is deliberately giving away for a fixed date. Nothing here can be taken back without a real announcement. The cost is paid in hardware or in scope, not in tokens.",
        "Free for now means a promotional endpoint such as a gateway's -free model variant. It bills nothing today, it is labelled limited time, and it has no published end date. This is the bucket that keeps changing under people's feet, and it is why a page like this one has to be re-checked rather than trusted.",
        "Looks cheap but metered means a low listed price per million tokens. It is not free, but it is so inexpensive that the difference is easy to ignore until you look at a bill for a heavy agent workload. Every provider on OpenRouter and the paid OpenCode tiers sit here, and the pricing is genuinely aggressively low[5].",
      ],
      table: {
        headers: ["Bucket", "Example", "What it really costs"],
        rows: [
          ["Genuinely free", "MIT weights on Hugging Face[1]", "Hardware, plus ops time"],
          ["Free for now", "A gateway's -free model variant[3][7]", "Reduced context, no SLA, expires"],
          ["Cheap but metered", "OpenRouter hosts, Zen paid, Go[5][4]", "Per-token or subscription spend"],
        ],
      },
      note: "The trap is the middle bucket. It behaves like bucket one while it lasts and then behaves like bucket three once it ends, with no migration grace period[6].",
    },
    {
      num: "03",
      title: "The OpenCode Zen Free Tier and Its Vanishing Act",
      description:
        "The most-cited \"DeepSeek V4.1 Flash is free\" story of mid-October 2026 came from OpenCode Zen, the OpenCode team's curated inference gateway. Zen listed a free variant with the model id deepseek-v4.1-flash-free, priced at $0 for input, output and cached reads, tagged as available for a limited time with no published end date[7][8].",
      paragraphs: [
        "The offer was part of what OpenCode calls Operation Cheepseek. In September the team raised the DeepSeek V4.1 Flash allowance inside its Go subscription from $15 to $60, then lifted it to $80 on October 12, and then replaced that allowance entirely with free in-app access to the model. Independent tests on October 17 confirmed it worked with no account, no card and no API key — but with a materially smaller context window than the paid route[7][3].",
        "Here is the part that matters more than the offer itself, and it is a lesson in reading gateway docs. A check of the Zen model documentation on October 18, 2026 turned up two answers at once. The pricing table's free lineup at that moment was Big Pickle, Space Bunny Free, Cat Jam Free, LongCat 2.5 Preview Free, Step 5 Preview Free, Exo Free, two MiMo free variants, two Nemotron free variants, Muse Spark 1.3 Contributor Free and Jev 1.13 Free, with DeepSeek V4.1 Flash listed only as a paid model at $0.30 input, $1.20 output and $0.006 cached read. Yet the live gateway model list served by the same team — the endpoint clients actually read — still returned deepseek-v4.1-flash-free as a selectable model id[3][8].",
        "Two snapshots of the same product disagreeing is the real signal here: a promotional entry can be present in the machine-readable model list while absent from the human-facing table, or the other way round, and neither state is a promise. So do not treat \"it is in the docs\" or \"it is not in the docs\" as the answer — treat the model picker in your own Console as the answer, and re-check it before you depend on free capacity[8].",
        "That is not proof the promotion is dead everywhere — gateway catalogs change daily and a free variant can reappear — but it is proof that you cannot take the offer for granted. This has already happened once to this exact family. When the earlier deepseek-v4-flash-free promotion ended, OpenCode confirmed in its issue tracker that the model was removed from the picker on purpose, telling users it was intentional rather than a bug and pointing them at newer free alternatives[6].",
      ],
      list: [
        "Free variant id: deepseek-v4.1-flash-free, $0 in, out and cached[8]",
        "Reported limit: a 200K-token context window, down from the paid 1M[7]",
        "Restriction: it answered inside the OpenCode app, not from your own scripts[8]",
        "Status on Oct 18, 2026: no DeepSeek entry on the Zen free list[3]",
      ],
      note: "The predecessor promotion ended the same way and OpenCode called the removal intentional[6]. Assume any -free DeepSeek variant has a finite life and plan the migration before you need it.",
    },
    {
      num: "04",
      title: "How to Check If a Free Tier Still Exists",
      description:
        "Because these offers come and go, the only durable skill is knowing where to look. Three checks take under a minute and will tell you whether a free DeepSeek route is live right now, rather than what a blog post said last week[3][6].",
      paragraphs: [
        "First, read the gateway's own model documentation, not a summary of it. Zen publishes a pricing table and a separate free-models section; the free models are the ones whose rows read Free across input, output and cached read, and each carries a limited-time note. If DeepSeek does not appear in that section, there is no free DeepSeek route on that gateway today, regardless of what the launch coverage said[3].",
        "Second, hit the models endpoint directly. Zen exposes a machine-readable catalog that you can query with curl against its inference path, and the raw list is the ground truth your client will use. If the -free id is not in that response, no amount of configuration will summon it[3].",
        "Third, watch the model picker inside the client and keep a fallback selected. The earlier DeepSeek free variant kept appearing in the API response while vanishing from the picker, which confused people into thinking their config was broken; OpenCode eventually explained this was the promotion ending, not a client bug. The practical lesson is to configure a paid model as your default and treat the free variant as the thing you opt into, never the reverse[6].",
      ],
      code: `# Zen exposes a machine-readable model catalog
curl https://opencode.ai/inference/v1/models

# the paid DeepSeek route on Zen keeps this id
#   deepseek-v4.1-flash
# a free twin, when one exists, carries the suffix
#   deepseek-v4.1-flash-free

# DeepSeek's own API path (always the same model name, never free)
#   deepseek-flash`,
      list: [
        "Check the gateway's own free-models section, not third-party recaps[3]",
        "Query the models endpoint and confirm the -free id is actually returned[3]",
        "Keep a paid model as your default and opt into free, not the other way round[6]",
      ],
      note: "A free id that exists in the API but not in the picker usually means the promotion is being wound down. Do not reconfigure your client chasing it[6].",
    },
    {
      num: "05",
      title: "The One Official Free Window: Search and Fetch",
      description:
        "There is exactly one thing DeepSeek itself is giving away right now, and it is not inference. Alongside the October 17 checkpoint, DeepSeek opened its own Search and Fetch API, and calls made through the server-side tool integrations of DeepSeek Harness, Claude Code and Codex are free until October 31, 2026 at 16:00 UTC[2][10].",
      paragraphs: [
        "Outside that window the tools are metered at $0.75 per 1,000 successful requests, charged separately for Search and Fetch, with failures and empty results not billed. The free period applies specifically to server-side tool calls routed through those three harnesses, which is a narrower thing than a free API key[2].",
        "Read the scope carefully before you restructure anything around it. This is retrieval, not reasoning: the free window covers finding and fetching pages, while the tokens your agent spends thinking about them are still billed at normal Flash rates. If your workload is mostly search and summarise, the saving is real. If it is mostly generation, the free window barely moves your bill[2][10].",
        "It is also a good illustration of the pattern in this page. DeepSeek is not being generous with the model; it is buying adoption of a brand-new tool surface, with a hard cutoff date attached. That is a promotion with a timestamp, and the timestamp is October 31. If you want the details, the dedicated Search API page covers the endpoints, operators and rate limits[2].",
      ],
      list: [
        "Free until: October 31, 2026, 16:00 UTC, via Harness, Claude Code and Codex[10]",
        "Metered price outside the window: $0.75 per 1,000 successful calls[2]",
        "Scope: retrieval only, not the model's token spend[2]",
      ],
      note: "This is the only official free window on the board. See [[deepseek-search-api|the Search and Fetch API guide]] for endpoints and operators, and [[deepseek-harness|the Harness overview]] and [[harness-claude-code|the Claude Code integration]] for how the free path is wired[2].",
    },
    {
      num: "06",
      title: "Cheap Hosts — OpenRouter, Zen Paid and Go",
      description:
        "If no free route is live, the honest next question is what cheap looks like. Two platforms dominate the answer: OpenRouter, which routes across dozens of independent providers, and OpenCode, which sells DeepSeek two ways through Zen and its Go subscription[5][4][3].",
      paragraphs: [
        "On OpenRouter the model is served by 29 providers with automatic failover, and the listed input price across them runs from roughly $0.035 to $0.60 per million tokens. There is no active free variant: the historical DeepSeek Flash free listing carries no live providers, so the Free filter is a dead end for this family. What you do get is competition, plus routing modes you can set to favour the cheapest endpoint. As of mid-October the effective price customers actually paid averaged around $0.035 input and $0.14 output per million once caching and provider discounts were applied, against a headlined list price of $0.30 and $1.20. Two concrete endpoints: inference.net at about $0.10 input and $0.72 output, and DeepInfra running a 30 percent discount at about $0.14 input and $0.42 output with cached reads near $0.0042[5].",
        "On OpenCode, Zen keeps a straight pay-as-you-go DeepSeek V4.1 Flash entry at $0.30 input, $1.20 output and $0.006 cached read, which the team describes as selling at cost with only a processing-fee markup. That is worth knowing because it means Zen is not undercutting DeepSeek so much as matching its peak rate[3].",
        "The more interesting instrument is the subscription. OpenCode Go is $10 a month and includes a DeepSeek V4.1 Flash credit of $80 per month, billed at off-peak token rates of $0.15 input and $0.60 output. OpenCode's own estimate puts typical coding-agent traffic at roughly 34,670 requests per five-hour window, 86,670 per week and 173,330 per month at that tier. For a heavy single developer that is far cheaper than metered per-token billing, and it is subscription pricing rather than a promotion, so it does not evaporate[4].",
      ],
      list: [
        "OpenRouter: 29 providers, no active free variant, floor pricing from about $0.035 input[5]",
        "OpenRouter picks: inference.net near $0.10/$0.72, DeepInfra 30 percent off near $0.14/$0.42[5]",
        "OpenCode Zen paid: $0.30 input, $1.20 output, $0.006 cached[3]",
        "OpenCode Go: $10 a month with an $80 DeepSeek credit, roughly 173,330 requests a month[4]",
      ],
      note: "Zen's paid rate and a subscription are different products. See [[flash-openrouter|the OpenRouter setup guide]] for provider routing, and [[opencode-go|the Go plan breakdown]] plus [[opencode-deepseek-1017|the OpenCode plus DeepSeek status page]] for the two OpenCode surfaces[4][5].",
    },
    {
      num: "07",
      title: "The Full Route Comparison Table",
      description:
        "Here is every route side by side, at the prices documented as of October 18, 2026. Read the notes column as carefully as the numbers, because the cheapest line is not always the cheapest outcome once context limits, availability and data terms are counted[1][3][4][5].",
      table: {
        headers: ["Route", "Input /1M", "Output /1M", "Notes"],
        rows: [
          ["Official API, off-peak", "$0.15", "$0.60", "$0.003 cache hit; the permanent baseline[1]"],
          ["Official API, peak", "$0.30", "$1.20", "01:00-04:00 and 06:00-10:00 UTC weekdays[1]"],
          ["OpenRouter promo endpoint", "~$0.035", "~$0.14", "88 percent off, promotional, not guaranteed[5]"],
          ["OpenRouter DeepInfra", "~$0.14", "~$0.42", "30 percent off, cached reads ~$0.0042[5]"],
          ["OpenRouter inference.net", "~$0.10", "~$0.72", "Listed price, high uptime[5]"],
          ["OpenCode Zen paid", "$0.30", "$1.20", "$0.006 cached; peak-rate equivalent[3]"],
          ["OpenCode Go", "$0.15", "$0.60", "$10/month, $80 credit, off-peak token rates[4]"],
          ["Zen free variant, if live", "$0.00", "$0.00", "200K context, in-app only, may already be gone[7][3]"],
          ["DeepSeek Search/Fetch", "n/a", "n/a", "Free through Oct 31 via three harnesses, then $0.75 / 1,000[2][10]"],
          ["Self-host the MIT weights", "Hardware", "Hardware", "511 GB checkpoint, no license fee, no SLA[1]"],
        ],
      },
      note: "Peak and off-peak are not cosmetic. The official window halves every rate outside the weekday peak blocks, which is the single largest saving available to most teams without changing anything about their code[1].",
    },
    {
      num: "08",
      title: "Four Levers That Beat Chasing Free",
      description:
        "Chasing a free tier is the least reliable way to save money on this model, because the offers expire and the survivors come with reduced capability. Four levers are more durable, and together they usually beat a free tier's saving without any of its risk[1][4][5].",
      paragraphs: [
        "The first lever is the off-peak window. Official rates halve outside 01:00 to 04:00 and 06:00 to 10:00 UTC on weekdays, which means a batch job moved a few hours earlier or later costs half as much for identical work. For an agent that runs on schedules you control, this is free money that never expires[1].",
        "The second is cache hits, and it is by far the largest multiplier in the list. A cache-hit input token costs $0.003 per million against $0.15 for a miss at off-peak rates, a fifty-fold difference. On real agent traffic the hit rate is genuinely high: DeepSeek reports above 90 percent on its hosted endpoint, and OpenCode's public usage data for this model shows a 97 percent cache ratio. That is why the model's effective cost looks nothing like its list price, and why keeping a stable prefix at the front of your prompt matters more than shopping for a cheaper host[1][4].",
        "The third lever is output length. The October checkpoint was retrained to finish tasks with shorter output, and output is the expensive dimension at six times the input rate. Prompting for tighter answers and stopping runaway generation saves more than a discount of a few cents per million[1].",
        "The fourth is reasoning effort. If your client defaults to maximum reasoning, you are paying for thinking tokens on every casual query. Dropping the effort level for routine work and raising it only for hard problems is a straightforward cost cut. All four levers compound, and none of them depends on a promotion staying alive[1].",
      ],
      list: [
        "Move flexible workloads off-peak: half price, permanently[1]",
        "Protect your prompt prefix for cache hits: $0.003 against $0.15, real hit rates 91 to 97 percent[1][4]",
        "Ask for shorter output: output is the six-times-expensive dimension[1]",
        "Right-size reasoning effort instead of leaving it at maximum[1]",
      ],
      note: "The full rate card and peak schedule live on [[v4-1-flash-pricing|the pricing page]], the prefix mechanics on [[v4-1-flash-kv-cache|the KV cache page]], and the effort settings on [[v4-1-flash-reasoning-effort|the reasoning effort page]][1].",
    },
    {
      num: "09",
      title: "What a Free Tier Really Costs You",
      description:
        "A free tier is not a free lunch; it is a different payment schedule. What you avoid in dollars you hand over in availability, capability and sometimes data. None of these costs appear on a pricing table, which is exactly why they catch people out[3][7][9].",
      paragraphs: [
        "The first cost is availability. Paid routes carry no strong guarantee either, but promotional endpoints have published none at all. The shared capacity behind a free tier also shows up as uneven speed: users testing the OpenCode free variant reported output dropping below 100 tokens per second once context passed 100K tokens and falling to roughly 50 near the 200K ceiling. Those are user reports rather than official figures, but the pattern is consistent with a queue that a promotion cannot control[7].",
        "The second cost is capability. The free variant capped context at 200K tokens where the paid route offers 1M, and it only answered requests originating inside the OpenCode app, so you could not repoint your own scripts at it. The free tier and the good tier are not the same product with a different price tag[7][8].",
        "The third cost is data. Gateway data terms vary widely, and the free models are often the ones with the most permissive collection language. On Zen's own privacy section, some free models state that during the free period collected data may be used to improve the model, while others promise zero retention. The distinction is invisible in the pricing row and decisive for anyone touching client code[3].",
        "Finally, there is the outage dimension. DeepSeek's own service went down for close to five hours on October 15, 2026. A paid route at least has a provider with a public record and a reason to make it right; a promotional tier has neither, and when capacity tightens the free endpoint is the first thing to degrade. If you want the full incident and refund picture, those are documented separately[1].",
      ],
      list: [
        "No SLA and no published limits on promotional endpoints[3]",
        "Reduced context: 200K on the free variant against 1M paid[7]",
        "Client lock-in: in-app only, not usable from your own scripts[8]",
        "Data terms vary; some free models train on your traffic during the free period[3]",
        "Shared capacity means unpredictable throughput on long sessions[7]",
      ],
      note: "Read the gateway's privacy section before you send proprietary code to a free model[3]. The October 15 outage and refunds are covered on [[deepseek-down|the outage page]] and [[deepseek-outage-refund|the refund page]].",
    },
    {
      num: "10",
      title: "Compliance and the Bottom Line",
      description:
        "One more consideration sits above price entirely. DeepSeek is a Chinese vendor, and whether your organisation may send code to it is a decision your own compliance process has to make, not one a gateway's terms page can make for you[3].",
      paragraphs: [
        "It is easy to assume that routing through a third-party gateway launders the question, because now you are talking to an American or European intermediary rather than directly to DeepSeek. That assumption does not hold. The intermediary is passing your prompts to an inference provider and is itself subject to that provider's terms; a zero-retention promise from one host says nothing about where the weights were trained, what the vendor's home jurisdiction requires, or whether your own policy permits the transfer. Do the review, document the decision and route accordingly.",
        "With that said, here is the practical recommendation. Use the free routes to evaluate, never to build. Try whichever promotional endpoint is live today to get a feel for the model's style and speed, and check the gateway's free-models section rather than trusting a guide, including this one. Then pick a permanent route for anything that matters: the official API with off-peak scheduling and a stable prompt prefix, an OpenRouter provider pinned for price, or an OpenCode Go subscription if your volume is steady enough to make a flat monthly credit beat metered billing.",
        "The reason to be disciplined about this is that the free tier is the least of the model's advantages. At $0.15 input and $0.60 output off-peak, with a fifty-fold cache discount and a hit rate near the top of the nineties, DeepSeek V4.1 Flash is already one of the cheapest capable coding models on the market. A promotion on top of that is a pleasant surprise, not a foundation. Build on the pricing, sample the promotions, and you will never be caught out by one ending[1][5].",
      ],
      list: [
        "Get a compliance decision on file before shipping any DeepSeek traffic[3]",
        "Prototype on promotions, ship on a permanent paid route[1]",
        "Re-check the gateway's free list, not this page, for today's status[3]",
        "Default to off-peak plus caching; that is the durable saving[1]",
      ],
      note: "Ready to wire up a permanent route? Start with [[v4-1-flash-api-setup|the API setup guide]] or [[v4-1-flash-pricing|the pricing page]] for the rate card behind these numbers[1].",
    },
  ],
  relatedGuides: [
    { title: "OpenCode and DeepSeek: Zen, Go and the 1017 Status", slug: "opencode-deepseek-1017" },
    { title: "DeepSeek V4.1 Flash Pricing: Off-Peak, Peak and Cache Rates", slug: "v4-1-flash-pricing" },
    { title: "Run DeepSeek V4.1 Flash on OpenRouter", slug: "flash-openrouter" },
    { title: "OpenCode Go: The $10 Plan and Its DeepSeek Credit", slug: "opencode-go" },
    { title: "Run V4.1-Flash-1017 Locally: GGUF, VRAM and Spark", slug: "v4-1-flash-1017-local" },
  ],
  sources: [
    { label: "DeepSeek API Docs: Models & Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "DeepSeek API Docs: Search guide", url: "https://api-docs.deepseek.com/guides/search" },
    { label: "OpenCode: Console Models (Zen) documentation", url: "https://opencode.ai/docs/zen/" },
    { label: "OpenCode: Go documentation", url: "https://opencode.ai/docs/go/" },
    { label: "OpenRouter: DeepSeek V4.1 Flash", url: "https://openrouter.ai/deepseek/deepseek-v4.1-flash" },
    { label: "GitHub: anomalyco/opencode issue 43805 (free promotion ended)", url: "https://github.com/anomalyco/opencode/issues/43805" },
    { label: "Pandaily: OpenCode makes DeepSeek V4.1 Flash free with a 200K context window", url: "https://pandaily.com/opencode-deepseek-v4-1-flash-free-200k-context-window" },
    { label: "TechPilot: DeepSeek V4.1 Flash free in OpenCode", url: "https://techpilot.ai/deepseek-v4-1-flash-free-opencode" },
    { label: "explainX: OpenCode DeepSeek V4.1 Flash free - Zen and Go limits", url: "https://explainx.ai/blog/opencode-deepseek-v4-1-flash-free-zen-go-limits-what-is-verified-2026" },
    { label: "Superpower Daily: DeepSeek opens Search and Fetch, free until October 31", url: "https://superpowerdaily.com/posts/deepseek-upgrades-flash-for-coding-agents-and-opens-its-web-search-tools" },
  ],
};
