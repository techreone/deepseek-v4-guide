import type { GuideContent } from "./types";

// target keyword: deepseek v4 flash pricing
export const flashPricing: GuideContent = {
  slug: "flash-pricing",
  category: "COST EFFICIENCY",
  title: "DeepSeek V4 Flash Pricing: Token Costs & How to Save Up to 98%",
  readTime: "8 MIN READ",
  updatedAt: "AUG 1, 2026",
  summary:
    "DeepSeek V4 Flash pricing is $0.14 input, $0.0028 cached, and $0.28 output per 1M tokens, and cache hits cut input costs by 98%.",
  toc: [
    { id: "step-1", label: "The Official DeepSeek V4 Flash Price Card (Per 1M Tokens)" },
    { id: "step-2", label: "Cache Hits: The Math Behind the 98% Input Discount" },
    { id: "step-3", label: "Thinking Mode: Reasoning Tokens Bill at Output Price" },
    { id: "step-4", label: "DeepSeek V4 Flash vs V4 Pro: When 3x the Price Pays Off" },
    { id: "step-5", label: "DeepSeek V4 Flash vs GPT-5.5, Claude, and GLM: Cost Comparison" },
    { id: "step-6", label: "Peak/Off-Peak 2x Pricing: Announced, Not Yet in Effect" },
    { id: "step-7", label: "Five Ways to Cut Your DeepSeek V4 Flash Bill" },
  ],
  steps: [
    {
      num: "01",
      title: "The Official DeepSeek V4 Flash Price Card (Per 1M Tokens)",
      description:
        "The official DeepSeek V4 Flash pricing page lists three numbers per 1M tokens: $0.14 for input on a cache miss, $0.0028 for input on a cache hit, and $0.28 for output. All V4 models ship with a 1M-token native context at no extra charge. Billing is simple: expense = number of tokens x price, with no monthly fee and no per-seat charge.",
      paragraphs: [
        "DeepSeek's official pricing page is the source of truth, and it carries a standard caveat: \"Product prices may vary and DeepSeek reserves the right to adjust them.\" Third-party trackers re-verified these numbers against the official page on 2026-07-25 and 2026-07-29, and they match.",
        "You pay per usage from a prepaid balance, which coexists with any granted balance, and the granted balance is deducted first. When the prepaid balance runs out, the API returns a 402 Insufficient Balance error, and you top up in the console.",
      ],
      list: [
        "1M tokens is roughly 750,000 English words, a useful yardstick for estimating a real workload's bill.",
        "The cache hit / cache miss split applies to input only; output has no cache tier.",
        "The old aliases deepseek-chat and deepseek-reasoner were permanently retired on 2026-07-24 15:59 UTC; new integrations call deepseek-v4-flash directly.",
      ],
      table: {
        headers: ["Model", "Input (cache miss)", "Input (cache hit)", "Output", "Context"],
        rows: [
          ["deepseek-v4-flash", "$0.14 / 1M", "$0.0028 / 1M", "$0.28 / 1M", "1M (1,048,576 tokens)"],
          ["deepseek-v4-pro", "$0.435 / 1M", "$0.003625 / 1M", "$0.87 / 1M", "1M (1,048,576 tokens)"],
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
      note: "The same base URL (https://api.deepseek.com) works for V4 Flash and V4 Pro. Only the model name changes — and the price.",
    },
    {
      num: "02",
      title: "Cache Hits: The Math Behind the 98% Input Discount",
      description:
        "DeepSeek's context caching is automatic. Since 2024-08-02, a disk-based prefix cache stores repeated prompt prefixes, and any token served from that cache is billed at the cache-hit price instead of the cache-miss price. No SDK changes, no headers, no switch to flip — reuse a system prompt, a long document, or few-shot prefixes and the discount applies on its own.",
      paragraphs: [
        "The headline number: $0.0028 versus $0.14 is a 98% discount on input tokens. The rule of thumb for maximizing hits is simple: put the reusable prefix first. System prompts and context documents go at the top, and volatile content goes at the bottom. At a 90% hit rate, the effective input price drops from $0.14 to about $0.017 per 1M tokens, a reduction of roughly 88%.",
        "A worked example: 1M input tokens on a full cache miss plus 1M output tokens costs $0.14 + $0.28 = $0.42. With a stable system prompt driving a 90% hit rate, the same call lands around $0.30.",
      ],
      list: [
        "Cache is best-effort — DeepSeek does not guarantee a hit rate.",
        "Monitor usage.prompt_cache_hit_tokens and prompt_cache_miss_tokens to see your real hit rate per request.",
        "There is no Batch API discount tier for DeepSeek, so caching is the main structural lever for high-volume workloads.",
      ],
      table: {
        headers: ["Input scenario", "Effective price per 1M", "Savings vs $0.14"],
        rows: [
          ["100% cache miss", "$0.14", "0%"],
          ["50% cache hit", "approx. $0.071", "approx. 49%"],
          ["90% cache hit", "approx. $0.017", "approx. 88%"],
          ["100% cache hit", "$0.0028", "98%"],
        ],
      },
      note: "Effective input price = miss% x $0.14 + hit% x $0.0028. The middle rows are derived from official prices; only the 0% and 98% rows are stated directly by DeepSeek.",
    },
    {
      num: "03",
      title: "Thinking Mode: Reasoning Tokens Bill at Output Price",
      description:
        "DeepSeek prices thinking and non-thinking modes identically — one price row per model, no surcharge for reasoning. But thinking mode generates extra reasoning tokens, and those tokens are billed at the output price of $0.28 per 1M. Enable thinking on a long agentic run and the added reasoning spend is real, so treat it as an output-cost decision, not a free feature.",
      paragraphs: [
        "Thinking is on by default, and the default effort is high. For complex agent requests such as Claude Code or OpenCode, the model is automatically set to max. For compatibility, low and medium map to high, and xhigh maps to max.",
        "If a task does not need chain-of-thought, switching to non-thinking mode removes the reasoning token stream entirely, which directly cuts the output-side spend. On Flash, thinking can be toggled per request via the \"thinking\": {\"type\": \"enabled\"} payload field.",
      ],
      list: [
        "Reasoning tokens count in output_tokens, so they consume the output price ($0.28 / 1M) on top of the final answer.",
        "Thinking mode also counts toward your output length, which matters against the 384K max-output cap.",
        "Same token price for all effort levels — high reasoning does not carry a per-token multiplier.",
      ],
      table: {
        headers: ["effort value", "Result", "Notes"],
        rows: [
          ["low", "maps to high", "Compatibility alias (medium maps the same way)"],
          ["high", "high", "Default for regular requests"],
          ["xhigh", "maps to max", "Complex agent requests auto-use max"],
        ],
      },
      note: "The price per token never changes with effort. The bill grows only because thinking adds reasoning tokens at the output rate.",
    },
    {
      num: "04",
      title: "DeepSeek V4 Flash vs V4 Pro: When 3x the Price Pays Off",
      description:
        "Flash runs about a third the price of Pro per token: $0.14 versus $0.435 on input, and $0.28 versus $0.87 on output. Since both models read and write the same 1M context, the 3x gap is pure margin for workloads that only need Flash-level quality. The common pattern is hybrid routing: route everything to Flash by default and escalate to Pro only when a request fails or confidence is low.",
      paragraphs: [
        "For mixed workloads, that hybrid pattern is roughly 3x cheaper end-to-end than running Pro everywhere. Flash also carries a 2500-request concurrency limit versus Pro's 500, so it absorbs high fan-out better. Pro's edge is capacity, not price — 1.6T total parameters against Flash's 284B.",
        "A useful baseline for full-context calls: 1M input on a cache miss plus 384K max output comes to about $0.14 + $0.1075, or roughly $0.25 per call at the ceiling (derived from official prices).",
      ],
      table: {
        headers: ["Spec", "deepseek-v4-flash", "deepseek-v4-pro"],
        rows: [
          ["Input (cache miss)", "$0.14 / 1M", "$0.435 / 1M"],
          ["Input (cache hit)", "$0.0028 / 1M", "$0.003625 / 1M"],
          ["Output", "$0.28 / 1M", "$0.87 / 1M"],
          ["Total parameters", "284B", "1.6T"],
          ["Active parameters", "13B", "49B"],
          ["Context / max output", "1M / 384K", "1M / 384K"],
          ["Concurrency limit", "2500", "500"],
        ],
      },
      list: [
        "Default to Flash for high-volume, high-fan-out calls.",
        "Escalate to Pro for hard reasoning where output quality justifies 3x.",
        "Pro's permanent price cut took effect 2026-05-31: $1.74/$0.0145/$3.48 dropped 75% to $0.435/$0.003625/$0.87.",
      ],
      note: "When migrating from the retired deepseek-chat / deepseek-reasoner aliases, map them to deepseek-v4-flash (non-thinking / thinking) — do not blindly switch to Pro.",
    },
    {
      num: "05",
      title: "DeepSeek V4 Flash vs GPT-5.5, Claude, and GLM: Cost Comparison",
      description:
        "Against the major frontier models, DeepSeek V4 Flash is the floor of the price table. Verified against official price pages on 2026-07-25, Flash charges $0.14 input and $0.28 output per 1M tokens, while GPT-5.5 runs $5/$30 and Claude Opus 4.8 runs $5/$25. GLM-5.2 at $1.40/$4.40 is the closest mainstream competitor, and Flash still undercuts it by about 10x on input and 15.7x on output.",
      paragraphs: [
        "The multiples compound fast at scale. Flash output is about 107x cheaper than GPT-5.5 and about 54x cheaper than Claude Sonnet 4.6. On input, Flash is roughly 18x cheaper than GPT-5.4 and 36x cheaper than Claude Opus 4.7. One third-party comparison ran the same coding-agent workload at about $12,000/month on GPT-5.5 versus roughly $252/month on DeepSeek V4 Flash — a 48x gap.",
        "None of this claims Flash is better; it claims Flash is dramatically cheaper per token. For cost-sensitive pipelines that tolerate a quality trade-off, the numbers are the point.",
      ],
      table: {
        headers: ["Model", "Input per 1M", "Output per 1M"],
        rows: [
          ["DeepSeek V4 Flash", "$0.14", "$0.28"],
          ["GLM-5.2", "$1.40", "$4.40"],
          ["Gemini 3.1 Pro", "$2", "$12"],
          ["GPT-5.4", "$2.50", "$15"],
          ["Claude Opus 4.8", "$5", "$25"],
          ["GPT-5.5", "$5", "$30"],
        ],
      },
      list: [
        "At scale, price gaps become real dollars: 100M tokens/day at an 80% hit rate lands around $340/month on Flash.",
        "Use the same formula to sanity-check any provider before committing a workload.",
      ],
      note: "Comparison prices verified 2026-07-25 from the official pricing page and third-party trackers. Flash prices include the cache-hit discount mechanism, which none of the listed US models match at this level.",
    },
    {
      num: "06",
      title: "Peak/Off-Peak 2x Pricing: Announced, Not Yet in Effect",
      description:
        "DeepSeek's official pricing page footnote states that peak/off-peak pricing will be adopted, with peak-hour prices set at 2x the regular rate across all billing items. The announced peak windows are daily 9:00-12:00 and 14:00-18:00 Beijing time (UTC+8). As of late July 2026, DeepSeek still charges a single flat price, and the effective date has not been announced.",
      paragraphs: [
        "This is a preview, not a price change. Do not hardcode 2x multipliers into production billing yet. Community estimates suggest that if the published windows applied today, a workload spread evenly across the day would pay roughly 29% more.",
        "Two things do not apply to V4: the old V3/R1 off-peak discounts (50% off V3, 25% off R1 outside 16:30-00:30 UTC) were V3/R1-only, and DeepSeek offers no Batch API discount tier. Once peak pricing lands, the main lever is scheduling non-realtime work outside the peak windows.",
      ],
      list: [
        "Move cron jobs, retries, and batch work into off-peak hours once the policy is live.",
        "Peak/off-peak applies to all billing items, including cache-hit input.",
        "Watch api-docs.deepseek.com/quick_start/pricing for the official effective date.",
      ],
      note: "When combined with Flash routing and cache-friendly prompts, the three levers — route Flash, raise cache hits, stagger peak windows — typically cut bills 60-80%.",
    },
    {
      num: "07",
      title: "Five Ways to Cut Your DeepSeek V4 Flash Bill",
      description:
        "DeepSeek V4 Flash pricing already undercuts every major frontier model, and a few habits push the effective rate lower still. The biggest savings come from stacking levers rather than any single setting: route Flash by default, engineer cache-friendly prefixes, cap output length, shop third-party providers, and watch your usage fields.",
      paragraphs: [
        "The scale math is worth doing once. At 10M input and 5M output tokens per day with an 80% cache hit rate, the input bill is about 10 x (0.2 x $0.14 + 0.8 x $0.0028) = $0.30/day and output is $1.40/day — roughly $1.70/day, or about $51/month. The same volume on a US frontier model typically runs into the hundreds of dollars a month.",
        "Remember that caching is automatic and best-effort: put stable content first, and the system does the rest.",
      ],
      list: [
        "Route Flash by default; escalate to V4 Pro only on failure or low confidence. Hybrid routing keeps mixed workloads about 3x cheaper end-to-end.",
        "Put reusable prefixes first: system prompts, docs, and few-shot examples at the top, volatile content last. At 90% hit, effective input drops from $0.14 to about $0.017 per 1M (-88%).",
        "Cap output with max_tokens. Flash is verbose — Artificial Analysis consumed 210M output tokens running its Intelligence Index, roughly double the category median.",
        "Check third-party providers: OpenRouter lists Flash at $0.0896/$0.1792 (about 36% off official), DeepInfra from $0.09/$0.18, Requesty at $0.10/$0.20.",
        "Track prompt_cache_hit_tokens and prompt_cache_miss_tokens to measure the hit rate your prefix order actually produces.",
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
    extra_body={"thinking": {"type": "enabled"}},  # OpenAI SDK: thinking goes in extra_body
)
print(response.choices[0].message.content)`,
      note: "Several third parties report a one-time 5M free token grant for new accounts with no credit card required. Official docs do not confirm it, and some users report not finding it — verify against your platform.deepseek.com balance before relying on it.",
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
    { title: "DeepSeek V4 Flash on OpenRouter: Setup, Pricing & BYOK", slug: "flash-openrouter" },
  ],
  sources: [
    { label: "Official DeepSeek Models & Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "Official DeepSeek V4 Preview Release", url: "https://api-docs.deepseek.com/news/news260424" },
    { label: "Official DeepSeek API Changelog", url: "https://api-docs.deepseek.com/updates/" },
    { label: "DeepSeek V4 Flash on OpenRouter", url: "https://openrouter.ai/deepseek/deepseek-v4-flash" },
    { label: "Artificial Analysis — DeepSeek V4 Flash", url: "https://artificialanalysis.ai/models/deepseek-v4-flash" },
    { label: "Morph — LLM API Pricing Comparison", url: "https://www.morphllm.com/llm-api" },
    { label: "CloudZero — DeepSeek Pricing", url: "https://www.cloudzero.com/blog/deepseek-pricing/" },
    { label: "WinBuzzer — DeepSeek Peak-Hour Pricing", url: "https://winbuzzer.com/2026/07/03/deepseek-v4-may-add-peak-hour-pricing-to-its-api-xcxwbn/" },
  ],
};
