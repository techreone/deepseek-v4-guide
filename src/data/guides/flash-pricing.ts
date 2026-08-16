import type { GuideContent } from "./types";

// target keyword: deepseek v4 flash pricing
export const flashPricing: GuideContent = {
  slug: "flash-pricing",
  category: "COST EFFICIENCY",
  title: "DeepSeek V4 Flash Pricing: Token Costs & How to Save (Aug 2026)",
  seoTitle: "DeepSeek V4 Flash Pricing: Save on Tokens",
  readTime: "8 MIN READ",
  updatedAt: "AUG 16, 2026",
  summary:
    "DeepSeek V4 Flash pricing moved to peak/off-peak tiers Aug 16: $0.22/$0.66 at off-peak, $0.44/$1.32 at peak per 1M, and cache hits still cut input costs.",
  toc: [
    { id: "step-1", label: "The Official DeepSeek V4 Flash Price Card (Aug 16)" },
    { id: "step-2", label: "Peak vs Off-Peak: The New Rate Card" },
    { id: "step-3", label: "Cache Hits: The Math Behind the Input Discount" },
    { id: "step-4", label: "Thinking Mode: Reasoning Tokens Bill at Output Price" },
    { id: "step-5", label: "DeepSeek V4 Flash vs V4 Pro: When 3x the Price Pays Off" },
    { id: "step-6", label: "DeepSeek V4 Flash vs GPT-5.5, Claude, and GLM: Cost Comparison" },
    { id: "step-7", label: "Five Ways to Cut Your DeepSeek V4 Flash Bill" },
  ],
  steps: [
    {
      num: "01",
      title: "The Official DeepSeek V4 Flash Price Card (Aug 16)",
      description:
        "DeepSeek moved every V4 model to peak/off-peak billing at 16:00 UTC on August 16, 2026.[1] For [[deepseek-v4-flash|DeepSeek V4 Flash]], the off-peak price is $0.22 per 1M input (cache miss), $0.007 per 1M input (cache hit), and $0.66 per 1M output. Peak hours run 01:00-04:00 and 06:00-10:00 UTC and bill at double: $0.44 / $1.32 (and $0.014 cache hit).",
      paragraphs: [
        "The pre-Aug-16 price was a single flat rate: $0.14 input (cache miss), $0.0028 input (cache hit), $0.28 output. Off-peak is already above that flat rate — $0.22 versus $0.14 on input and $0.66 versus $0.28 on output — so the effective cost rose even in the cheap hours, with peak hours roughly twice off-peak again. Third-party trackers (Engadget, aiPricing.guru, chat-deep.ai) all confirm the new schedule.",
        "Billing stays simple: expense = number of tokens x price, no monthly fee, no per-seat charge. One API key funds both V4 Flash and V4 Pro; only the model name and price change.",
      ],
      list: [
        "1M tokens is roughly 750,000 English words — a useful yardstick for estimating a workload's bill.",
        "The cache hit / cache miss split applies to input only; output has no cache tier.",
        "The old aliases deepseek-chat and deepseek-reasoner were permanently retired on 2026-07-24;[3] new integrations call deepseek-v4-flash directly.",
      ],
      table: {
        headers: ["Model", "Tier", "Input (cache miss)", "Input (cache hit)", "Output", "Context"],
        rows: [
          ["deepseek-v4-flash", "Off-peak", "$0.22 / 1M", "$0.007 / 1M", "$0.66 / 1M", "1M (1,048,576)"],
          ["deepseek-v4-flash", "Peak", "$0.44 / 1M", "$0.014 / 1M", "$1.32 / 1M", "1M (1,048,576)"],
          ["deepseek-v4-pro", "Off-peak", "$0.66 / 1M", "$0.022 / 1M", "$1.98 / 1M", "1M (1,048,576)"],
          ["deepseek-v4-pro", "Peak", "$1.32 / 1M", "$0.044 / 1M", "$3.96 / 1M", "1M (1,048,576)"],
        ],
      },
      code: `curl https://api.deepseek.com/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer \${DEEPSEEK_API_KEY}" \\
  -d '{
        "model": "deepseek-v4-flash",
        "messages": [
          {"role": "system", "content": "You are a helpful assistant."},
          {"role": "user", "content": "Summarize the attached changelog."}
        ],
        "thinking": {"type": "enabled"},
        "reasoning_effort": "high",
        "stream": false
      }'`,
      note: "The same base URL (https://api.deepseek.com) works for V4 Flash and V4 Pro. Only the model name changes — and, since Aug 16, the effective price by hour of day.",
    },
    {
      num: "02",
      title: "Peak vs Off-Peak: The New Rate Card",
      description:
        "DeepSeek split every V4 billing line into peak and off-peak. Off-peak is 50% below the new peak rate — $0.22 versus $0.44 on Flash input — but both tiers sit above the old flat $0.14/$0.28.",
      paragraphs: [
        "Peak windows are daily 01:00-04:00 and 06:00-10:00 UTC (they replace the earlier Beijing-time proposal). All other hours are off-peak. Seventeen of every 24 hours land in off-peak, so work that can wait should move off-peak.",
        "The 2x peak multiplier applies to every line — cache-hit input kicks up to $0.014 on Flash, cache-miss input to $0.44, output to $1.32. Scheduling non-realtime jobs (cron, retries, batch, synthetic data) into off-peak is now the single biggest structural lever on the bill.",
      ],
      table: {
        headers: ["Billing line (Flash)", "Off-peak", "Peak", "Old flat (pre-8/16)"],
        rows: [
          ["Input (cache miss)", "$0.22", "$0.44", "$0.14"],
          ["Input (cache hit)", "$0.007", "$0.014", "$0.0028"],
          ["Output", "$0.66", "$1.32", "$0.28"],
        ],
      },
      list: [
        "Peak windows: 01:00-04:00 and 06:00-10:00 UTC daily.",
        "Off-peak = 50% of the new peak rate (not 50% of the old flat rate).",
        "Move batch and retry workloads into off-peak hours to dodge the 2x multiplier.",
      ],
      note: "This is live policy from 16:00 UTC on Aug 16, not an announcement. For a deeper cost plan see the [[opencode-go|OpenCode Go]] page, where the same rate change reshaped the Flash quota.",
    },
    {
      num: "03",
      title: "Cache Hits: The Math Behind the Input Discount",
      description:
        "DeepSeek's context caching is automatic. A disk-based prefix cache stores repeated prompt prefixes, and any token served from it bills at the cache-hit price instead of the cache-miss price — still roughly 97% cheaper on input, as it was before the rate change.",
      paragraphs: [
        "At off-peak, the cache-hit rate is $0.007 versus $0.22 on a miss — about a 97% cut. The rule for maximizing hits is unchanged: put the reusable prefix first. System prompts and context documents sit at the top, volatile content at the bottom.",
        "A worked example at off-peak: 1M input on a full cache miss plus 1M output costs $0.22 + $0.66 = $0.88. With a 90% cache-hit rate, the same call lands around $0.22 x 0.1 + $0.007 x 0.9 + $0.66, or roughly $0.69.",
      ],
      list: [
        "Cache is best-effort — DeepSeek does not guarantee a hit rate.",
        "Monitor usage.prompt_cache_hit_tokens and prompt_cache_miss_tokens to see your real hit rate.",
        "There is no Batch API discount tier for DeepSeek, so caching and off-peak scheduling are the main structural levers.",
      ],
      table: {
        headers: ["Input scenario (off-peak)", "Effective price per 1M", "Savings vs $0.22 miss"],
        rows: [
          ["100% cache miss", "$0.22", "0%"],
          ["50% cache hit", "approx. $0.113", "approx. 49%"],
          ["90% cache hit", "approx. $0.028", "approx. 87%"],
          ["100% cache hit", "$0.007", "approx. 97%"],
        ],
      },
    },
    {
      num: "04",
      title: "Thinking Mode: Reasoning Tokens Bill at Output Price",
      description:
        "DeepSeek prices thinking and non-thinking modes identically — no surcharge per reasoning token. But reasoning generates extra tokens billed at the output price ($0.66 off-peak per 1M on Flash), so a long agentic run's spend is real.",
      paragraphs: [
        "Thinking is on by default with effort set to high; complex agent requests such as [[flash-ide|Claude Code]] or [[flash-opencode|OpenCode]] auto-use max. Toggle it off per request via \"thinking\": {\"type\": \"enabled\"} to drop the reasoning-token stream entirely.",
        "Reasoning also counts toward output length, which matters against the 384K max-output cap.",
      ],
      list: [
        "Reasoning tokens count in output_tokens, billed at the output rate ($0.66 off-peak) on top of the final answer.",
        "Same per-token price for all effort levels — high reasoning carries no multiplier.",
        "Off-peak scheduling and max_tokens caps tame the worst of the reasoning spend.",
      ],
    },
    {
      num: "05",
      title: "DeepSeek V4 Flash vs V4 Pro: When 3x the Price Pays Off",
      description:
        "Flash runs about a third of [[v4-pro|Pro]] per token at off-peak: $0.22 versus $0.66 on input, $0.66 versus $1.98 on output. Since both read the same 1M context, the gap is pure margin for workloads that only need Flash-level quality.",
      paragraphs: [
        "The common hybrid pattern — route everything to Flash by default, escalate to Pro on failure or low confidence — is roughly 3x cheaper end-to-end than running Pro everywhere. Flash also carries a 2500-request concurrency limit versus Pro's 500.",
        "A baseline for full-context off-peak calls: 1M input cache miss + 384K max output ≈ $0.22 + $0.253, or about $0.47 per call at the ceiling (derived from official prices).",
      ],
      table: {
        headers: ["Spec", "deepseek-v4-flash (off-peak)", "deepseek-v4-pro (off-peak)"],
        rows: [
          ["Input (cache miss)", "$0.22 / 1M", "$0.66 / 1M"],
          ["Input (cache hit)", "$0.007 / 1M", "$0.022 / 1M"],
          ["Output", "$0.66 / 1M", "$1.98 / 1M"],
          ["Total parameters", "284B", "1.6T"],
          ["Active parameters", "13B", "49B"],
          ["Context / max output", "1M / 384K", "1M / 384K"],
          ["Concurrency limit", "2500", "500"],
        ],
      },
    },
    {
      num: "06",
      title: "DeepSeek V4 Flash vs GPT-5.5, Claude, and GLM: Cost Comparison",
      description:
        "Even after the Aug 16 increase, Flash remains far below the frontier price floor. At off-peak ($0.22/$0.66) it still undercuts GPT-5.5 ($5/$30) and Claude Opus 4.8 ($5/$25) by roughly 20x on input and 45x on output.",
      paragraphs: [
        "The gap narrows at peak ($0.44/$1.32) but stays wide — still roughly 11x input and 22x output under GPT-5.5. Cache-hit input keeps the discount mechanism no US model matches at this level.",
        "One third-party comparison ran the same coding-agent workload at about $12,000/month on GPT-5.5 versus roughly a third on V4 Flash at off-peak rates.",
      ],
      table: {
        headers: ["Model", "Input per 1M", "Output per 1M"],
        rows: [
          ["DeepSeek V4 Flash (off-peak)", "$0.22", "$0.66"],
          ["DeepSeek V4 Flash (peak)", "$0.44", "$1.32"],
          ["GLM-5.2", "$1.40", "$4.40"],
          ["Gemini 3.1 Pro", "$2", "$12"],
          ["GPT-5.4", "$2.50", "$15"],
          ["Claude Opus 4.8", "$5", "$25"],
          ["GPT-5.5", "$5", "$30"],
        ],
      },
    },
    {
      num: "07",
      title: "Five Ways to Cut Your DeepSeek V4 Flash Bill",
      description:
        "Flash still undercuts every major frontier model, and stacking a few habits pushes the effective rate lower. The biggest savings come from layering levers: schedule off-peak, route Flash, engineer cache-friendly prefixes, cap output, and shop third parties.",
      paragraphs: [
        "The scale math once at off-peak: 10M input / 5M output per day with an 80% cache-hit rate gives input about 10 x (0.2 x $0.22 + 0.8 x $0.007) = $0.50/day and output $3.30/day — roughly $3.80/day, about $114/month if run entirely off-peak, more if you spill into peak.",
        "Remember caching is automatic and best-effort: put stable content first and the system does the rest.",
      ],
      list: [
        "Schedule non-realtime work in off-peak hours (avoid 01:00-04:00 and 06:00-10:00 UTC) — the single biggest lever after the rate change.",
        "Route Flash by default; escalate to V4 Pro only on failure or low confidence. Hybrid routing keeps mixed workloads about 3x cheaper end-to-end.",
        "Put reusable prefixes first: at 90% cache hit, effective off-peak input drops from $0.22 to about $0.028 (-87%).",
        "Cap output with max_tokens — Flash is verbose; Artificial Analysis consumed 210M output tokens on its eval suite.[5]",
        "Check third-party providers: [[flash-openrouter|OpenRouter]] and DeepInfra often list Flash below official rates.",
      ],
      code: `from openai import OpenAI
import os

client = OpenAI(
    api_key=os.environ.get("DEEPSEEK_API_KEY"),
    base_url="https://api.deepseek.com",
)

response = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[
        {"role": "system", "content": "You are a helpful assistant"},
        {"role": "user", "content": "Write a concise summary"},
    ],
    max_tokens=1024,  # cap output spend
    reasoning_effort="high",
    extra_body={"thinking": {"type": "enabled"}},
)
print(response.choices[0].message.content)`,
      note: "Peak/off-peak landed at 16:00 UTC on Aug 16, 2026. For the impact on fixed-price subscriptions, see the [[opencode-go|OpenCode Go]] page — the same rate change dramatically reshaped its Flash quota.",
    },
  ],
  prevGuide: {
    title: "DeepSeek V4 Flash API Setup: Base URL, Models & Your First Call",
    slug: "flash-api-setup",
  },
  nextGuide: {
    title: "DeepSeek V4 Flash Benchmarks: Agentic & Coding Scores in 2026",
    slug: "flash-benchmarks",
  },
  relatedGuides: [
    { title: "DeepSeek V4 Flash API Setup: Base URL, Models & Your First Call", slug: "flash-api-setup" },
    { title: "DeepSeek V4 Flash Benchmarks: Agentic & Coding Scores in 2026", slug: "flash-benchmarks" },
    { title: "What Is DeepSeek V4 Flash? Full Guide to the 0731 Release", slug: "deepseek-v4-flash" },
    { title: "OpenCode Go & the V4 Flash Price Hike: What Changed Aug 16", slug: "opencode-go-price-hike" },
    { title: "DeepSeek V4 Pro Pricing: Peak/Off-Peak Tiers", slug: "v4-pro-pricing" },
  ],
  sources: [
    { label: "Official DeepSeek Models & Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "Engadget — DeepSeek AI models about to cost four times more", url: "https://www.engadget.com/2236912/deepseek-ai-models-get-four-times-pricier/" },
    { label: "aiPricing.guru — DeepSeek V4 Peak & Off-Peak", url: "https://www.aipricing.guru/deepseek-pricing/" },
    { label: "Official DeepSeek V4-Preview GA News", url: "https://api-docs.deepseek.com/news/news260813/" },
    { label: "DeepSeek V4 Flash on OpenRouter", url: "https://openrouter.ai/deepseek/deepseek-v4-flash" },
    { label: "Artificial Analysis — DeepSeek V4 Flash", url: "https://artificialanalysis.ai/models/deepseek-v4-flash" },
  ],
};
