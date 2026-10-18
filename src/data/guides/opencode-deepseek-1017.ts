import type { GuideContent } from "./types";

// target keyword: opencode deepseek 1017
// 事实来源：reference/topics/31-opencode-deepseek-1017.md + 2026-10-18 一手核实
// （opencode.ai/docs/zen、/docs/go、opencode.ai/inference/v1/models、opencode.ai/data/deepseek/deepseek-v4-1-flash、
//   deepseek.com/en/news/deepseek-v4-1-flash、github.com/anomalyco/opencode/issues/43805）
export const opencodeDeepseek1017: GuideContent = {
  slug: "opencode-deepseek-1017",
  category: "INTEGRATION GUIDE",
  title: "DeepSeek 1017 in OpenCode: Zen, Go & Free Tiers",
  seoTitle: "OpenCode DeepSeek 1017: Zen, Go & Free",
  readTime: "11 MIN READ",
  updatedAt: "OCT 18, 2026",
  summary:
    "DeepSeek's 1017 checkpoint is live through OpenCode's DeepSeek provider. Zen, Go and the free entry are separate lanes: endpoints, prices, what to verify.",
  notice:
    "Checked October 18, 2026. The DeepSeek provider lane is confirmed as 1017; OpenCode's own Zen and Go endpoint has no announcement either way[1][7].",
  toc: [
    { id: "step-1", label: "Step 1: Two Lanes, One Confirmed Answer" },
    { id: "step-2", label: "Step 2: Lane A — DeepSeek's Provider Is Already 1017" },
    { id: "step-3", label: "Step 3: Lane B — Zen, the Pay-As-You-Go Gateway" },
    { id: "step-4", label: "Step 4: Go's $10 Subscription and the $80 Flash Allowance" },
    { id: "step-5", label: "Step 5: The Free Entry: Real, Limited-Time, Not a Plan" },
    { id: "step-6", label: "Step 6: Wiring It Up: /connect, /models, opencode.jsonc" },
    { id: "step-7", label: "Step 7: Why It Matters: Flash Is OpenCode's #1 Model" },
    { id: "step-8", label: "Step 8: Is the Hosted Endpoint 1017? How to Check" },
    { id: "step-9", label: "Step 9: Cutting the Bill and the Fallback You Need" },
  ],
  steps: [
    {
      num: "01",
      title: "Two Lanes, One Confirmed Answer",
      description:
        "OpenCode reaches DeepSeek two completely different ways, and only one of them is confirmed to be the 1017 checkpoint today: DeepSeek's own API through the built-in provider, and OpenCode's hosted Zen or Go endpoint. Mixing them up is how people end up paying twice for the same work[1][3].",
      paragraphs: [
        "Lane A is DeepSeek itself. OpenCode ships a DeepSeek provider that talks to api.deepseek.com. Because DeepSeek kept the model name deepseek-flash and swapped the weights behind it on October 17, 2026, anything pointed at that lane is already running 1017 with zero configuration changes. The naming mechanics are covered in [[deepseek-v4-1-flash-1017|the 1017 checkpoint explainer]][7].",
        "Lane B is OpenCode's own inference endpoint, sold two ways: Zen, a pay-as-you-go gateway, and Go, a monthly subscription. Here the model id is deepseek-v4.1-flash, and neither OpenCode nor DeepSeek has said whether the hosted weights were refreshed to 1017. The honest status is unannounced, verify it yourself[1][2].",
        "What this guide does not cover: whether 1017 is any good, and how DeepSeek Harness relates to it. This is about plumbing and the bill, because that is the part nobody has written down clearly since October 17.",
      ],
      list: [
        "Lane A — DeepSeek's API via /connect: confirmed 1017, DeepSeek's list prices, no OpenCode fee[7]",
        "Lane B — OpenCode Zen: pay-as-you-go, model id deepseek-v4.1-flash, $0.30 / $1.20 per 1M tokens[1]",
        "Lane C — OpenCode Go: $10/month with an $80 monthly Flash allowance, off-peak $0.15 / $0.60[2]",
        "Free entry — deepseek-v4.1-flash-free on Zen: a limited-time promotion, not a plan[1]",
      ],
      note: "DeepSeek named OpenCode an official partner when V4.1-Flash launched on September 10, 2026, alongside WorkBuddy and CodeBuddy. Partner status means OpenCode supports the model family; it does not mean the hosted endpoint runs the newest checkpoint[5].",
    },
    {
      num: "02",
      title: "Lane A — DeepSeek's Provider Is Already 1017",
      description:
        "This is the shortest path and the only one confirmed as of October 18, 2026. Run /connect, choose DeepSeek, paste an api.deepseek.com key, then run /models. There is no 1017 toggle to find, because the checkpoint is served under the same model name[3][7].",
      paragraphs: [
        "DeepSeek did not rename the model. The checkpoint went live on the website, the app and the API at the same moment, and the API name is still deepseek-flash, so an existing DeepSeek configuration moves onto 1017 without an edit. The legacy aliases deepseek-v4-flash and deepseek-v4-flash-vision-exp are still accepted and are also served by the 1017 weights at Flash rates[5][7].",
        "The rates on this lane are DeepSeek's published ones: $0.30 per 1M input on a cache miss, $0.006 per 1M on a cache hit, and $1.20 per 1M output at peak, with everything cut in half off-peak. Peak hours are 01:00-04:00 and 06:00-10:00 UTC, Monday through Friday, excluding Chinese public holidays. The full table with worked costs is in [[v4-1-flash-pricing|the V4.1 Flash pricing guide]][7].",
        "The trade-off is that you inherit DeepSeek's availability. The public API had a partial outage lasting nearly five hours on October 15, 2026, after which DeepSeek credited a week of spend back to API accounts. If you want an independent second lane, that is precisely what Zen and Go exist for. The timeline and refund terms are in [[deepseek-down|the outage write-up]][10].",
      ],
      note: "Existing integrations that pin deepseek-v4-flash get no stability benefit from pinning: the alias is served by 1017 anyway, so pinning only hides which weights you are actually using[7].",
    },
    {
      num: "03",
      title: "Lane B — Zen, the Pay-As-You-Go Gateway",
      description:
        "Zen is OpenCode's flexible lane. You fund a balance, get one key, and pay per request at list prices. DeepSeek V4.1 Flash sits at $0.30 input, $1.20 output and $0.006 cached read per 1M tokens — the same numbers as DeepSeek's peak list rates, not a discount[1].",
      paragraphs: [
        "Per the Zen documentation, the chat-completions endpoint for the default gateway surface is https://opencode.ai/inference/v1/chat/completions, and the model list is available at https://opencode.ai/inference/v1/models. Inside OpenCode you address the model as opencode/deepseek-v4.1-flash[1].",
        "The pricing model is explicitly a pass-through. OpenCode states its goal is to sell at cost with a markup only to cover processing fees, and the docs say card fees are passed along at cost — 4.4% plus $0.30 per transaction — with nothing charged beyond that. So the Zen lane buys convenience, one key across many models, and independence from api.deepseek.com; it does not buy cheaper DeepSeek tokens[1].",
        "Practical arithmetic with OpenCode's own assumed agent request — 410 input, 71,300 cached and 310 output tokens — works out to roughly $0.00092 per request at Zen rates, or about $1 per 1,100 requests. Scale that to OpenCode's own estimate of a heavy month, 173,330 requests, and the list price lands near $160[1][2].",
      ],
      table: {
        headers: ["Lane", "Model id", "Price per 1M (in / out / cached read)"],
        rows: [
          ["DeepSeek API via /connect", "deepseek-flash", "$0.30 / $1.20 / $0.006 (peak)"],
          ["OpenCode Zen (pay-as-you-go)", "deepseek-v4.1-flash", "$0.30 / $1.20 / $0.006"],
          ["OpenCode Go ($10/month)", "deepseek-v4.1-flash", "$0.15 / $0.60 / $0.003 (off-peak)"],
          ["OpenCode Zen free entry", "deepseek-v4.1-flash-free", "Free, limited time"],
        ],
      },
      note: "Zen also carries DeepSeek V4 Pro at $1.74 input and $3.48 output per 1M tokens, but DeepSeek is phasing V4 Pro out in favour of V4.1-Flash, so treat that entry as the expensive legacy lane rather than the default[1][5].",
    },
    {
      num: "04",
      title: "Go's $10 Subscription and the $80 Flash Allowance",
      description:
        "Go is OpenCode's subscription: $10 per month for Go, $40 per month for Go Plus. DeepSeek V4.1 Flash carries a monthly usage allowance of $80 on Go and $160 on Go Plus, and it is spent at DeepSeek's rates — half price during off-peak hours[2].",
      paragraphs: [
        "Allowances are dollar amounts rather than request counts, and each model's monthly limit is enforced across three rolling windows: 20% of the monthly limit per 5 hours, 50% per week, and 100% per month. For Flash on Go that is $16 per 5 hours, $40 per week and $80 per month, with every figure doubled on Go Plus[2].",
        "OpenCode's own estimates put Go's Flash allowance at 34,670 requests per 5 hours, 86,670 per week and 173,330 per month, assuming 410 input, 71,300 cached and 310 output tokens per request. That estimate is worth checking against the rate card, because the arithmetic tells you when the allowance assumes you work. At off-peak prices the assumed request costs about $0.00046, and 173,330 of them lands within a cent of $80 — so the headline request counts are off-peak numbers. Run the same workload during peak hours and your $80 buys roughly half as many requests[2].",
        "The Go endpoint is https://opencode.ai/inference/go/openai/v1/chat/completions and the model id stays deepseek-v4.1-flash; in OpenCode you select it as opencode-go/deepseek-v4.1-flash. Note that [[opencode-go|the earlier OpenCode Go guide]] predates the current rate card, so read its request counts as historical rather than current. Go asks clients to identify themselves with their own user agent and to send a stable session id in the x-opencode-session header so that routing and prompt caching behave. OpenCode lists Hermes, Claude Code, Codex, ZCode, Pi, jcode and Kilo Code CLI as validated clients, and flags DeepSeek Harness as still missing the session header on some model paths[2].",
      ],
      table: {
        headers: ["Go on DeepSeek V4.1 Flash", "Go ($10/month)", "Go Plus ($40/month)"],
        rows: [
          ["Monthly Flash allowance", "$80", "$160"],
          ["Per 5 hours (20%)", "$16", "$32"],
          ["Per week (50%)", "$40", "$80"],
          ["Est. requests per month", "173,330", "346,670"],
          ["Token price off-peak (in / out / cached)", "$0.15 / $0.60 / $0.003", "same"],
          ["Token price peak (in / out / cached)", "$0.30 / $1.20 / $0.006", "same"],
        ],
      },
      note: "Go and Go Plus are single-member plans: a workspace holding a Go subscription cannot invite members. If you do hit a window limit and keep a Zen balance, enabling the Use balance option makes Go fall back to pay-as-you-go instead of blocking your requests[2].",
    },
    {
      num: "05",
      title: "The Free Entry: Real, Limited-Time, Not a Plan",
      description:
        "There is a free entry called deepseek-v4.1-flash-free on Zen, and it is real — a check on October 18, 2026 found it listed in the Zen documentation and still present in the live gateway model list. OpenCode labels it free for a limited time: no end date, no SLA, no capacity promise[1][6].",
      paragraphs: [
        "Snapshots of this page disagree with each other, and that disagreement is the useful information. Promotional entries on the gateway appear and disappear without announcement. The previous DeepSeek free entry, deepseek-v4-flash-free, was reported missing from the Zen provider dropdown even while it was still visible in the Zen models API — a gap tracked in OpenCode issue 43805[8].",
        "The practical rule is therefore not which snapshot is right, but how you treat any free entry. Check the model picker in your own Console before you design around free capacity, and never make a free model the only path in a workflow. Keep a paid fallback — a DeepSeek API key, a Zen balance, or Go — so that a promotion ending is a cost change rather than an outage. The failure mode is rarely a slower free tier; it is a model that is no longer selectable[8].",
        "If the goal is simply to try the 1017 checkpoint at no cost, note that the OpenAI-compatible DeepSeek API is cheap enough that a trial week costs cents, and it is the lane where 1017 availability is confirmed. [[deepseek-free-1017|The 1017 free-access guide]] covers the trial options across providers[7].",
      ],
      note: "A free entry with no publishing date and no SLA is a demo, not a production lane. Budget for the day it disappears and you will never be surprised by it[1][8].",
    },
    {
      num: "06",
      title: "Wiring It Up: /connect, /models, opencode.jsonc",
      description:
        "Every lane is wired the same way, because Zen and Go are OpenCode providers and DeepSeek is a built-in provider. The flow is /connect, choose the provider, paste the key, then /models to pick a model[1][2][3].",
      list: [
        "/connect in the OpenCode TUI[1]",
        "Choose DeepSeek for Lane A, OpenCode pay-as-you-go for Zen, or OpenCode Go for the subscription[1][2][3]",
        "Paste the API key for that lane — keys are not interchangeable between Zen, Go and DeepSeek[1][2]",
        "/models and confirm what you expect: deepseek-flash, opencode/deepseek-v4.1-flash, or opencode-go/deepseek-v4.1-flash[1][2]",
      ],
      code: `{
  "$schema": "https://opencode.ai/config.json",
  "model": "opencode/deepseek-v4.1-flash"
}`,
      paragraphs: [
        "Pinning the model in opencode.jsonc removes the per-session selection step and makes the lane you are paying for explicit. For Go the same file takes opencode-go/deepseek-v4.1-flash. If you keep both keys, the config file is the cleanest way to avoid burning Go allowance on a personal experiment by accident.",
        "Because Zen and Go are OpenAI-compatible, the same keys work in other coding agents, but only the Go lane expects the x-opencode-session header and only the Go lane has allowances to exhaust. Model naming is where most confusion starts across these three lanes; [[deepseek-flash-model-names|the model names reference]] maps the aliases, and [[flash-opencode|the OpenCode plus DeepSeek walkthrough]] covers plain bring-your-own-key setup if you skip the subscription entirely[1][2].",
      ],
      note: "The DeepSeek provider key and the Zen or Go key are billed by different companies. Copying a key into the wrong provider slot is the most common self-inflicted error here, and it fails with an authentication error rather than a billing surprise[1][3].",
    },
    {
      num: "07",
      title: "Why It Matters: Flash Is OpenCode's #1 Model",
      description:
        "This is not a niche integration. OpenCode publishes per-model usage, and DeepSeek V4.1 Flash is the most-used model on the platform, ranked first by tokens for the trailing week on the data page updated October 17, 2026[4].",
      paragraphs: [
        "Over the trailing two months the page attributes 255 trillion tokens to DeepSeek V4.1 Flash — 25% of all tokens OpenCode served — from roughly 2.5 million unique users and 50.9 million completed sessions. Average cost per session is $0.0624, total spend $3.18 million, and 96.7% of input tokens were served from cache, with weekly retention of 64.2%. Those figures refresh hourly, so read them as a snapshot of mid-October rather than a fixed fact[4].",
        "Two details matter when you are choosing a lane. First, the cache ratio: 96.7% of input arriving as cache reads is what makes agent work on this model affordable at all, and it is the reason the Go allowance stretches as far as it does. Second, the migration already happened inside OpenCode's user base — the older deepseek-v4-flash entry now sits around eighth place with 2.7 trillion tokens for the week, while the 4.1 entry leads at 67 trillion[4].",
        "Geographically the usage is broad: China accounts for about 26% of two-month tokens and the United States about 12%, with Japan, Germany, Singapore and Brazil behind them. A model that most OpenCode users already run is a defensible default, which means your real decision is not capability but which lane you pay through[4].",
      ],
      note: "Because the model is this widely used, its free tier is also the first thing to be contended for. Popularity is an argument for having a paid fallback, not against using the free entry while it lasts[1][4].",
    },
    {
      num: "08",
      title: "Is the Hosted Endpoint 1017? How to Check",
      description:
        "Neither OpenCode nor DeepSeek has said whether the Zen or Go hosted weights were refreshed to the 1017 checkpoint. DeepSeek's own API lane is confirmed; OpenCode's own endpoint is unknown. Treat that difference as a task to verify, not as a verdict either way[5][7].",
      paragraphs: [
        "One weak signal points toward the catalog not having been refreshed. OpenCode's entry for the model still lists a release date of September 10, 2026, links its weights to the September Hugging Face repository, and carries September benchmark values — DeepSWE 74.2 and Terminal-Bench 31.2 — rather than the numbers DeepSeek reports for 1017. Catalog metadata is not evidence of what the servers run, but it does suggest nobody updated the entry on October 17[4].",
        "The strongest available check is behavioural. Send the same prompt down both lanes and compare: 1017 was tuned for longer end-to-end tasks with shorter output, so a real difference shows up in trajectory length and verbosity before it shows up in any single answer. Hold the prompt, the tool definitions and the reasoning effort identical, or you are measuring your own configuration[7].",
        "One caution about response fingerprints. Community threads in r/opencode describe 1017 silently rolling out and point at system_fingerprint values changing. A changing fingerprint means server-side configuration changed; it is not proof that the weights were replaced. Use it as a hint to re-run the behavioural comparison, never as the conclusion[9].",
      ],
      note: "If confirmed 1017 behaviour on an OpenCode endpoint is a hard requirement, the only guaranteed route today is Lane A: DeepSeek's provider at api.deepseek.com, where deepseek-flash is the 1017 checkpoint[7].",
    },
    {
      num: "09",
      title: "Cutting the Bill and the Fallback You Need",
      description:
        "Two levers do almost all the work: the off-peak window and cache reuse. Off-peak is exactly half price, and agent traffic is cache-heavy by nature, so the combination is what makes this model affordable at all[2][7].",
      paragraphs: [
        "The peak window is narrow and defined in UTC: 01:00-04:00 and 06:00-10:00, Monday through Friday, with Chinese public holidays excluded. Every other hour, including all weekend hours, is off-peak. If you run scheduled jobs, batch refactors or long test loops, moving them outside those seven weekday hours halves the token rate on every lane that follows DeepSeek pricing — which includes Go[2][7].",
        "Cache is the bigger lever of the two. With cache reads at $0.006 per 1M tokens against $0.30 for a cache miss, the difference between a stable prompt prefix and a churning one dominates the bill, and OpenCode's own data page shows 96.7% of input served from cache on this model. Keep the system prompt and tool definitions stable across a session so the prefix stays cached, and avoid reshuffling context for cosmetic reasons[1][4].",
        "Then plan for the fallback, because every lane has a failure mode. DeepSeek's own API ran a partial outage of nearly five hours on October 15, 2026 and refunded a week of spend as credit; free entries carry no SLA at all; and Go allowances can be exhausted mid-task. A robust setup is two keys plus a config you can switch in seconds: DeepSeek's API as the default, a Zen balance or Go as the bulk lane, and the ability to fall back to whichever is up. The timeline and refund terms are in [[deepseek-down|the October outage guide]][10].",
        "One privacy footnote that people miss when comparing lanes. OpenCode documents that DeepSeek's zero-data-retention agreement is renewed monthly and was valid through October 31, 2026 on the Go side, while the Zen documentation states its models are hosted in the US and EU. If your work is governed by contractual data rules, read both pages before choosing a lane rather than after[1][2].",
      ],
      list: [
        "Cheapest for heavy agent use: Go at $10 per month, provided you can keep peak-hour work down — the $80 Flash allowance is sized for off-peak rates[2]",
        "Cheapest for light or bursty use: DeepSeek's API directly, where 1017 is confirmed and you only pay for what you send[7]",
        "Most flexible: a Zen balance as a second key, so a Go limit or a DeepSeek outage becomes a switch rather than a stop[1]",
        "Never: a workflow whose only model is a limited-time free entry[8]",
      ],
      note: "The blunt conclusion: if you want 1017 today and no ambiguity, use the DeepSeek provider in OpenCode. If you want the lowest bill for a lot of agent work, use Go and keep the heavy jobs off-peak. If you want a buffer against either provider failing, pay for the third lane before you need it[1][2][7].",
    },
  ],
  prevGuide: {
    title: "What Is DeepSeek-V4.1-Flash-1017? The Oct 17 Checkpoint Explained",
    slug: "deepseek-v4-1-flash-1017",
  },
  nextGuide: {
    title: "Is DeepSeek 1017 Free? Where to Run It Without Paying",
    slug: "deepseek-free-1017",
  },
  relatedGuides: [
    { title: "What Is DeepSeek-V4.1-Flash-1017? The Oct 17 Checkpoint Explained", slug: "deepseek-v4-1-flash-1017" },
    { title: "Is DeepSeek 1017 Free? Where to Run It Without Paying", slug: "deepseek-free-1017" },
    { title: "OpenCode Go: The Subscription That Unlocks DeepSeek V4", slug: "opencode-go" },
    { title: "Use DeepSeek V4 Flash with OpenCode: Step-by-Step", slug: "flash-opencode" },
    { title: "DeepSeek V4.1 Flash Pricing: Token Costs & How to Save", slug: "v4-1-flash-pricing" },
  ],
  sources: [
    { label: "OpenCode Zen Documentation (Official)", url: "https://opencode.ai/docs/zen/" },
    { label: "OpenCode Go Documentation (Official)", url: "https://opencode.ai/docs/go/" },
    { label: "OpenCode Providers Documentation (Official)", url: "https://opencode.ai/docs/providers/" },
    { label: "OpenCode Data: DeepSeek V4.1 Flash Usage & Cost", url: "https://opencode.ai/data/deepseek/deepseek-v4-1-flash" },
    { label: "DeepSeek News: Introducing DeepSeek-V4.1-Flash (Sept 10, 2026)", url: "https://www.deepseek.com/en/news/deepseek-v4-1-flash/" },
    { label: "explainx: OpenCode DeepSeek V4.1 Flash Free, Zen & Go Limits", url: "https://explainx.ai/blog/opencode-deepseek-v4-1-flash-free-zen-go-limits-what-is-verified-2026" },
    { label: "DeepSeek API Changelog (Oct 17, 2026)", url: "https://api-docs.deepseek.com/updates" },
    { label: "anomalyco/opencode Issue #43805: Free Model Missing from Zen Dropdown", url: "https://github.com/anomalyco/opencode/issues/43805" },
    { label: "r/opencode: DeepSeek V4.1 Flash 1017 Rolling Out", url: "https://www.reddit.com/r/opencode/comments/1x83wt3/deepseek_v41_flash_1017_is_silently_rolling_out/" },
    { label: "DeepSeek Status: October 15, 2026 Incident", url: "https://status.deepseek.com/incidents/7116348214287" },
  ],
};
