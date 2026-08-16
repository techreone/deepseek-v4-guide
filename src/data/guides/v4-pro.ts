import type { GuideContent } from "./types";

// target keyword: deepseek v4 pro
// 内容来源：reference/topics/22-v4-pro-ga.md + 25-v4-pro-pricing-api.md（2026-08-16 更新）
// 状态变更：V4 Pro 已于 2026-08-13 GA（0813 build），定价改为 8/16 生效的 peak/off-peak 峰谷制
export const v4Pro: GuideContent = {
  slug: "v4-pro",
  category: "MODEL GUIDE",
  title: "DeepSeek V4 Pro: GA Release, Pricing & Benchmarks (0813)",
  seoTitle: "DeepSeek V4 Pro: GA, Pricing & Benchmarks",
  readTime: "10 MIN READ",
  updatedAt: "AUG 16, 2026",
  summary:
    "DeepSeek V4 Pro is now GA (Aug 13, 2026, 0813 build): 1.6T-param MoE, 1M context, new peak/off-peak pricing from Aug 16, and agent-first upgrades.",
  toc: [
    { id: "step-1", label: "What Is DeepSeek V4 Pro?" },
    { id: "step-2", label: "V4 Pro Architecture & Long-Context Engineering" },
    { id: "step-3", label: "V4 Pro Pricing: Peak / Off-Peak Rates (Aug 16)" },
    { id: "step-4", label: "V4 Pro Benchmarks: 0813 GA Results" },
    { id: "step-5", label: "V4 Pro GA: Reasoning Effort, Responses API & Expert Mode" },
    { id: "step-6", label: "Flash-0731 vs Pro-0813: Which to Use" },
    { id: "step-7", label: "Calling the DeepSeek V4 Pro API" },
    { id: "step-8", label: "Should You Build on DeepSeek V4 Pro Now?" },
  ],
  steps: [
    {
      num: "01",
      title: "What Is DeepSeek V4 Pro?",
      description:
        "DeepSeek V4 Pro is the flagship of the DeepSeek V4 family, now generally available. It is a Mixture-of-Experts (MoE) model with 1.6T total parameters and 49B active per token, a 1M-token context window, and 384K max output. Text-only, MIT-licensed[4].",
      paragraphs: [
        "It launched as a preview on April 24, 2026 alongside [[deepseek-v4-flash|DeepSeek V4 Flash]], and moved to general availability on August 13, 2026 with the 0813 checkpoint — the build now served by the API under the unchanged model id deepseek-v4-pro[1][2].",
        "DeepSeek positions it as its answer to top closed-source models — 'performance rivaling the world's top closed-source models,' with agentic coding as open-source state of the art. The GA release centers on agent upgrades: flexible reasoning effort, native OpenAI Responses API support, and an Expert Mode in the app[1].",
      ],
      table: {
        headers: ["Spec", "DeepSeek V4 Pro", "DeepSeek V4 Flash"],
        rows: [
          ["Total parameters", "1.6T", "284B"],
          ["Active parameters (per token)", "49B", "13B"],
          ["Context window", "1M tokens", "1M tokens"],
          ["Max output", "384K tokens", "384K tokens"],
          ["Modality", "Text only", "Text only"],
          ["License", "MIT", "MIT"],
          ["Precision (inference)", "FP4 + FP8 mixed", "FP4 + FP8 mixed"],
          [
            "Released",
            "Apr 24, 2026 (preview); Aug 13, 2026 (GA, 0813)",
            "Apr 24, 2026 (preview); Jul 31, 2026 (0731 beta)",
          ],
        ],
      },
      note: "Every figure in this table comes from DeepSeek's official model card or API docs. The 0813 build is what the API serves today; model id deepseek-v4-pro is unchanged[1][4].",
    },
    {
      num: "02",
      title: "V4 Pro Architecture & Long-Context Engineering",
      description:
        "V4 Pro is engineered to make million-token context practical: at 1M context, per-token inference FLOPs are only 27% of DeepSeek V3.2, and KV cache is just 10% (vendor-reported).",
      paragraphs: [
        "Under the hood, V4 Pro pairs two attention mechanisms — Compressed Sparse Attention (CSA) and Heavily Compressed Attention (HCA) — with Manifold-Constrained Hyper-Connections (mHC) and the Muon optimizer. It was pretrained on more than 32T tokens. The technical report, 'DeepSeek-V4: Towards Highly Efficient Million-Token Context Intelligence,' is on arXiv as 2606.19348 (April 26, 2026).",
        "For inference, the Pro build uses FP4 for MoE expert parameters and FP8 for everything else — which is why the full weights come to a third-party estimate of roughly 862GB of VRAM. The hosted API remains the practical route for most teams; DeepSeek publishes an official vLLM recipe if you do self-host.",
      ],
      list: [
        "1M context is native and the official default across DeepSeek services — no extra charge.",
        "Max output of 384K tokens; Think Max workloads recommend a context of at least 384K.",
        "Recommended sampling defaults: temperature 1.0, top_p 1.0.",
        "Self-hosting starting point: 8-GPU vLLM setup (official recipe); 4x80GB GPUs are a realistic minimum per third-party estimates.",
      ],
      note: "The 27% FLOPs / 10% KV cache figures and the 32T pretraining count are vendor-reported from the technical report.",
    },
    {
      num: "03",
      title: "V4 Pro Pricing: Peak / Off-Peak Rates (Aug 16)",
      description:
        "On August 16, 2026 (16:00 UTC) DeepSeek switched the whole V4 lineup to peak / off-peak pricing. Off-peak rates are 50% lower than the new peak rates; peak hours are 01:00-04:00 and 06:00-10:00 UTC[1][3].",
      table: {
        headers: ["Per 1M tokens (USD)", "Pro OFF-PEAK", "Pro PEAK", "Flash OFF-PEAK", "Flash PEAK"],
        rows: [
          ["Input (cache hit)", "$0.022", "$0.044", "$0.007", "$0.014"],
          ["Input (cache miss)", "$0.66", "$1.32", "$0.22", "$0.44"],
          ["Output", "$1.98", "$3.96", "$0.66", "$1.32"],
        ],
      },
      paragraphs: [
        "Compared with the pre-Aug-16 flat rates (Pro $0.435 input / $0.87 output; Flash $0.14 / $0.28), this is a real price increase: Pro output rises +127.6% off-peak and +355% at peak; the cache-hit input price rises +507% off-peak and +1114% at peak[3].",
        "That +1114% figure is where the 'DeepSeek V4 Pro 1,100% price hike' headlines come from — it is the worst-case corner (cache-hit input during peak hours), not the headline rate. Normalize your workloads to off-peak (roughly 12 of every 24 hours) to cut the bill roughly in half[3].",
        "Concurrency limits are unchanged: Pro 500 concurrent requests, Flash 2,500. Cache-hit pricing applies automatically via context caching — no SDK changes required[3].",
      ],
      note: "All prices per 1M tokens, verified on DeepSeek's official pricing page August 16, 2026[3]. Thinking-mode reasoning tokens bill at the output price. See [[v4-pro-pricing|the V4 Pro pricing guide]] for the full breakdown and cost strategy.",
    },
    {
      num: "04",
      title: "V4 Pro Benchmarks: 0813 GA Results",
      description:
        "The 0813 GA build closes the gap to the closed frontier and takes first place on two agent benchmarks. All official agent scores were measured with the [[deepseek-harness|DeepSeek Harness]] minimal mode at max reasoning effort[4].",
      table: {
        headers: ["Benchmark", "V4 Pro 0813", "Flash-0731", "V4 Pro Preview", "Opus-4.8"],
        rows: [
          ["Terminal-Bench 2.1", "87.9", "82.7", "72.1", "88.3"],
          ["Cybergym", "83.3 (1st)", "76.7", "52.7", "80.0"],
          ["AutomationBench (Public)", "31.8 (1st)", "25.1", "12.8", "30.8"],
          ["DeepSWE", "62.7", "54.4", "12.8", "67.5"],
          ["NL2Repo", "61.5", "54.2", "38.5", "—"],
          ["Toolathlon (verified)", "74.1", "70.3", "55.9", "76.5"],
          ["Agents' Last Exam", "25.7", "25.2", "16.5", "27.6"],
        ],
      },
      paragraphs: [
        "Headlines from the table: Terminal-Bench 2.1 jumps from 72.1 (preview) to 87.9 (+15.8), just behind Opus-4.8's 88.3; Cybergym 83.3 and AutomationBench 31.8 are the highest published scores in the comparison set[4]. DeepSWE 62.7 is a 390% jump over the preview's 12.8.",
        "An independent 8-task coding/reasoning evaluation by mindstudio scored 0813 at 61/80 (76.25%), tied with Muse Spark 1.2 and slightly below Kimi K3 and Opus 5 — versus just 24.8% for the preview build. Their field notes: it over-thinks simple problems and over-rewrites code, but is strong at front-end generation, task planning, and clarifying questions[7].",
        "One caveat in both sources: every official number is a Harness + model result (minimal mode, max effort). Independent reproduction with a different harness can diverge — the harness choice is part of the score[4][8].",
      ],
      note: "† DSBench rows are internal test sets, not externally reproducible. For the full 10-row table and the preview-vs-GA delta analysis, see [[v4-pro-benchmarks|the V4 Pro benchmarks guide]].",
    },
    {
      num: "05",
      title: "V4 Pro GA: Reasoning Effort, Responses API & Expert Mode",
      description:
        "The GA release is a production upgrade, not a version bump. Three changes matter for developers[1].",
      list: [
        "Flexible reasoning effort: low (simple tasks) / high (daily agent workflows, the default) / max (complex tasks). Parameter: reasoning_effort, with thinking enabled by default on Pro[1][5].",
        "Native OpenAI Responses API support, optimized for Codex with one-click setup — all Codex clients (CLI, ChatGPT desktop, VS Code extension) share one config file[1][5].",
        "Expert Mode in app/web: select V4 Pro in the desktop model menu to run it with the heavier agent-style reasoning loop[1].",
      ],
      code: `# One-click Codex setup (macOS / Linux) — backs up ~/.codex/config.toml,
# writes models.json (flash + pro metadata) and configures model_providers.deepseek
bash <(curl -fsSL https://cdn.deepseek.com/api-docs/codex-deepseek-setup-en.sh)

# Windows (PowerShell)
irm https://cdn.deepseek.com/api-docs/codex-deepseek-setup-en.ps1 | iex`,
      paragraphs: [
        "The reasoning_effort knob is the practical headline: earlier preview builds were effectively max-only, which made simple calls slow and expensive. With low available, cheap routing (low for simple, high for daily agents, max only for hard problems) is now possible on both Pro and Flash[1][5].",
        "The Responses API support is the other big one — before GA (Aug 6) only Flash supported Responses/Codex; Pro errored. Since 0813, Pro is natively supported through the same endpoint[5].",
      ],
      note: "In thinking mode, temperature, top_p, presence_penalty, and frequency_penalty are silently ignored. FIM and Chat Prefix Completion work only in non-thinking mode[6].",
    },
    {
      num: "06",
      title: "Flash-0731 vs Pro-0813: Which to Use",
      description:
        "The practical routing question: Flash now costs roughly one-third of Pro at off-peak, and Flash-0731's agent numbers already beat Pro-Preview. The GA closes part of that gap on agent work — but Pro still leads on raw reasoning and world knowledge[1][3][4].",
      table: {
        headers: ["Dimension", "V4 Pro 0813", "V4 Flash 0731"],
        rows: [
          ["Off-peak output price / 1M", "$1.98", "$0.66"],
          ["Terminal-Bench 2.1 (official)", "87.9", "82.7"],
          ["DeepSWE (official)", "62.7", "54.4"],
          ["Concurrency", "500", "2,500"],
          ["Best for", "Hard reasoning, complex agents, world knowledge", "High-volume daily coding at low cost"],
        ],
      },
      paragraphs: [
        "A common pattern after GA: default to [[deepseek-v4-flash|Flash]], escalate to Pro for hard reasoning and complex agentic tasks, and schedule non-urgent Pro jobs into off-peak hours to halve the bill. DeepSeek's own 22-benchmark aggregation puts Flash at roughly 83% of Pro's quality at a third of the price[3].",
        "Both support the same reasoning_effort levels and the Responses API, so the switch is a model string, not a migration[1][5].",
      ],
      note: "All benchmark numbers are official (Harness minimal mode) unless noted. Independent reproduction with other harnesses can diverge.",
    },
    {
      num: "07",
      title: "Calling the DeepSeek V4 Pro API",
      description:
        "The GA build is call-compatible: same base URL, same key, same model id deepseek-v4-pro. Add reasoning_effort and the optional thinking block[1][6].",
      code: `from openai import OpenAI

client = OpenAI(
    api_key="<DeepSeek API Key>",
    base_url="https://api.deepseek.com",   # Anthropic format: https://api.deepseek.com/anthropic
)

response = client.chat.completions.create(
    model="deepseek-v4-pro",
    messages=[{"role": "user", "content": "Refactor this function to be async."}],
    reasoning_effort="high",              # low | high | max
    extra_body={"thinking": {"type": "enabled"}},
)
# Chain of thought is returned in reasoning_content; the answer in content.`,
      list: [
        "OpenAI Responses API is natively supported — Codex can talk to DeepSeek directly (one-click setup script in Step 5)[5].",
        "Anthropic-format calls use base_url https://api.deepseek.com/anthropic with a reasoning block (effort: none/low/high/max)[6].",
        "In thinking mode, temperature/top_p/presence/frequency penalties are ignored; multi-turn tool calls must return reasoning_content or you get a 400[6].",
        "Legacy aliases deepseek-chat / deepseek-reasoner stopped resolving on July 24, 2026 — use deepseek-v4-pro or deepseek-v4-flash.",
      ],
      paragraphs: [
        "For a full setup walkthrough (OpenAI format, Anthropic format, tool calls, and the Responses API), see [[v4-pro-api|the V4 Pro API guide]] and [[v4-pro-responses-api|the Responses API + Codex guide]].",
      ],
      note: "V4 Pro now supports Chat Completions, the Anthropic-compatible endpoint, tool calls, JSON output, and — since GA — the Responses API[1][5].",
    },
    {
      num: "08",
      title: "Should You Build on DeepSeek V4 Pro Now?",
      description:
        "Short answer: yes for agentic workloads that need the flagship, with an off-peak scheduling strategy. The GA removes the 'preview' risk; the pricing change removes the 'flat rate' assumption.",
      list: [
        "Cost: off-peak Pro output is $1.98/1M vs $3.96 at peak — schedule batch and background agent jobs into off-peak hours (about 12h/day)[3].",
        "Reasoning effort: route simple calls to low to avoid paying max-depth token cost on trivial tasks[1][5].",
        "Cache: context caching is automatic; cache-hit input is $0.022 off-peak — reuse prefixes to cut input cost[3].",
        "Hybrid: Flash-first default with Pro escalation stays the value pattern; Pro leads on world knowledge and hard reasoning[3].",
        "Self-host: 862GB VRAM estimate (third-party) — the hosted API is the realistic default; official vLLM recipe exists if you insist.",
      ],
      paragraphs: [
        "The GA verdict from independent testing is a qualified yes: 0813 is 'one of the largest single-version jumps' (24.8% → 76.25% on the mindstudio suite), though reviewers note over-thinking on simple problems and code over-rewriting — tune reasoning_effort low for simple tasks[7].",
        "If you pair it with the official [[deepseek-harness|DeepSeek Harness]], you get the exact stack DeepSeek used for its agent benchmarks (minimal mode, max effort)[4]. For routing guidance between the family, see [[v4-pro-vs-flash|V4 Pro vs Flash]] and [[v4-pro-vs-gpt-5.5|V4 Pro vs GPT-5.5]].",
      ],
      note: "Every figure in this guide comes from DeepSeek's official docs, the model card, or the cited independent evaluations, all as of August 16, 2026. Official agent scores are vendor-reported and measured on the Harness.",
    },
  ],
  prevGuide: {
    title: "Download DeepSeek V4 Flash from HuggingFace & Run It Locally",
    slug: "flash-huggingface",
  },
  nextGuide: undefined,
  relatedGuides: [
    { title: "DeepSeek V4 Pro Pricing: Peak/Off-Peak Rates (Aug 2026)", slug: "v4-pro-pricing" },
    { title: "DeepSeek V4 Pro Benchmarks: 0813 GA Results", slug: "v4-pro-benchmarks" },
    { title: "What Is DeepSeek V4 Flash? Full Guide to the 0731 Release", slug: "deepseek-v4-flash" },
    { title: "DeepSeek V4 Pro vs V4 Flash", slug: "v4-pro-vs-flash" },
    { title: "DeepSeek V4 Pro Responses API & Codex Setup", slug: "v4-pro-responses-api" },
  ],
  sources: [
    { label: "DeepSeek-V4-Pro GA Release Announcement (Official)", url: "https://api-docs.deepseek.com/news/news260813/" },
    { label: "DeepSeek V4 Preview Announcement (Official)", url: "https://api-docs.deepseek.com/news/news260424/" },
    { label: "DeepSeek Models & Pricing (Official)", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "DeepSeek-V4-Pro-0813 Model Card (Hugging Face)", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813" },
    { label: "DeepSeek Codex Integration Docs (Official)", url: "https://api-docs.deepseek.com/quick_start/agent_integrations/codex/" },
    { label: "DeepSeek Thinking Mode Guide (Official)", url: "https://api-docs.deepseek.com/guides/thinking_mode" },
    { label: "mindstudio.ai: V4 Pro 0813 Benchmark Review", url: "https://www.mindstudio.ai/blog/deepseek-v4-pro-0813-benchmark-review" },
    { label: "explainx.ai: V4 Pro 0813 Terminal-Bench & Cline (Aug 2026)", url: "https://explainx.ai/blog/deepseek-v4-pro-0813-terminal-bench-cline-august-2026" },
  ],
};
