import type { GuideContent } from "./types";

// target keyword: deepseek v4.1 flash 1017
// 事实来源：reference/topics/29-v4-1-flash-1017.md（官方 changelog / news261017 / HF 1017 模型卡 / pricing / X）
export const deepseekV41Flash1017: GuideContent = {
  slug: "deepseek-v4-1-flash-1017",
  category: "RELEASE",
  title: "What Is DeepSeek-V4.1-Flash-1017? The Oct 17 Checkpoint Explained",
  seoTitle: "DeepSeek V4.1 Flash 1017: Oct 17 Checkpoint",
  readTime: "10 MIN READ",
  updatedAt: "OCT 18, 2026",
  summary:
    "DeepSeek-V4.1-Flash-1017 is the Oct 17, 2026 post-training snapshot: same 552B MoE, same price, MIT weights, and a new Search API.",
  notice:
    "Published October 17, 2026. Same architecture and same price as V4.1-Flash — the change is post-training only[1][2].",
  toc: [
    { id: "step-1", label: "Step 1: Naming and What 1017 Actually Is" },
    { id: "step-2", label: "Step 2: The Architecture Did Not Change" },
    { id: "step-3", label: "Step 3: What Actually Changed: Self-Feedback RL" },
    { id: "step-4", label: "Step 4: Benchmark Overview (Vendor-Reported)" },
    { id: "step-5", label: "Step 5: Pricing and Cache Economics" },
    { id: "step-6", label: "Step 6: The Search and Fetch API Opened the Same Day" },
    { id: "step-7", label: "Step 7: Open Weights and Local Feasibility" },
    { id: "step-8", label: "Step 8: Should You Switch, and How It Applies" },
  ],
  steps: [
    {
      num: "01",
      title: "Naming and What 1017 Actually Is",
      description:
        "DeepSeek-V4.1-Flash-1017 was published on October 17, 2026, and the name is the whole story: the four-digit suffix 1017 is the release date, not a version number. This is a post-training checkpoint of V4.1-Flash, not a new model and not a new architecture[1][2].",
      paragraphs: [
        "The API model name did not change. It is still deepseek-flash, so existing integrations move to the 1017 checkpoint automatically with no code edit — DeepSeek's own wording is that the checkpoint went live on the website, the app, and the API at the same moment[2]. The legacy aliases deepseek-v4-flash and deepseek-v4-flash-vision-exp are still accepted, and they are served by the same 1017 weights at the same Flash price[2][3].",
        "DeepSeek also raised the minimum tooling bar: DeepSeek Harness v0.2.1-rc.1 or newer, because this checkpoint was tuned against that runtime. Tencent CodeBuddy and WorkBuddy are named as targeted integrations as well[2]. The MODEL VERSION field on the docs and pricing pages now reads DeepSeek-V4.1-Flash-1017, which is the cleanest way to confirm what your endpoint is actually serving[5].",
      ],
      list: [
        "1017 = October 17, 2026, the snapshot date — not a version bump[1]",
        "API name unchanged: still deepseek-flash, zero code change[2]",
        "Legacy aliases deepseek-v4-flash and deepseek-v4-flash-vision-exp still route[2][3]",
        "Recommended runtime: DeepSeek Harness v0.2.1-rc.1 or newer[2]",
      ],
      note: "If a summary told you 1017 is a new model or a new version line, that is wrong. It is the same model, re-trained[1][2].",
    },
    {
      num: "02",
      title: "The Architecture Did Not Change",
      description:
        "Everything structural is carried over from the September V4.1-Flash release. The checkpoint keeps the Causal Encoder-Decoder layout of 40 layers — 20 causal encoder layers plus 20 decoder layers — on a 552B backbone with a 196B Engram, which the Hugging Face repo reports as 763B total parameters[1][3].",
      paragraphs: [
        "Activation stays asymmetric: 8B active during prefill and 16B during decode. The context window is 1M tokens (1,048,576), the API maximum output is 384K, and the concurrency ceiling is 2,500. Vision is native — text and image in — and thinking mode is on by default[3].",
        "The KV cache design is unchanged too: FP4 main KV at 890 bytes per token with SWA Bounded Replay. The official model card title, Pushing the Limits of KV Cache Compression, still describes the 1017 release, which is a strong signal that memory behavior is the same engineering story as September[3].",
        "The practical reading is simple. Any advice that applied to V4.1-Flash about memory footprint, context length, vision input, or activation cost applies unchanged to 1017. Only quality and behavior moved.",
      ],
      table: {
        headers: ["Spec", "V4.1-Flash-1017"],
        rows: [
          ["Architecture", "Causal Encoder-Decoder (CED), 40 layers"],
          ["Layers", "20 causal encoder + 20 decoder"],
          ["Parameters", "552B backbone + 196B Engram (763B reported)"],
          ["Active params", "8B prefill / 16B decode"],
          ["Context window", "1M (1,048,576)"],
          ["Max API output", "384K"],
          ["Concurrency", "2,500"],
          ["Modality", "Text + image in (native vision)"],
          ["KV cache", "FP4 main KV, 890 bytes/token"],
        ],
      },
      note: "For the full architecture walkthrough, see [[deepseek-v4-1-flash|the V4.1 Flash explainer]][3].",
    },
    {
      num: "03",
      title: "What Actually Changed: Self-Feedback RL",
      description:
        "The one real change is the post-training objective. DeepSeek describes it as reinforcement learning with self-feedback, and the goal shifted from answering a single turn well to finishing an entire project end to end[2].",
      paragraphs: [
        "The company illustrated the shift with four demos: a 3D reconstruction of the Forbidden City, a browser racing game, a Portal 2 recreation in Godot, and Valley of Ages, a 3D scene that evolves from prehistory to the modern day[2]. The marketing phrase attached to it is Wish-Driven Programming Made Real — the pitch being that you describe the outcome you want and the model carries the build across many steps instead of stopping at a plausible snippet[2].",
        "The other half of the change is behavioral rather than numeric. DeepSeek says output got shorter and tasks complete faster. That matters for cost more than any headline score, because at an unchanged per-token price a shorter trajectory is a cheaper trajectory. This is the mechanism behind the Pareto improvement claim: better results without a higher bill[2].",
        "Read that claim carefully. Pareto improvement here means performance up and cost not up — it does not mean a price cut. Several second-hand write-ups translated the shorter output into a discount, but the rate card did not move[2][5].",
      ],
      note: "Shorter output plus the same rates is the honest version of the efficiency story[2].",
    },
    {
      num: "04",
      title: "Benchmark Overview (Vendor-Reported)",
      description:
        "DeepSeek published a full comparison on the model card, and every number here is DeepSeek's own — vendor-reported, not independently verified. Evaluation used the Claude Code harness for Terminal-Bench 4.0 and the Mini-SWE-V2 harness for DeepSWE v1.1[3].",
      paragraphs: [
        "All eleven reported items improved over the September V4.1-Flash, with gains between 2.0 and 11.1 points. The largest jumps are Terminal-Bench 4.0 (+11.1), ProgramBench (+8.8), and Apex Bench v1.1 (+7.5). DeepSWE v1.1, the most-cited agentic coding number, moved from 74.2 to 77.0[3].",
        "The checkpoint takes first place among the listed models on four benchmarks: DeepSWE v1.1, Automation-Bench v1.0.6, Agents' Last Exam, and Apex Bench v1.1. Against Kimi K3 and GLM-5.3 it wins everywhere except HLE. It still trails Claude Opus 5 on HLE (-13.7), Terminal-Bench 4.0 (-9.5), ProgramBench (-7.9), and NL2Repo-Bench (-6.9)[3].",
        "Two caveats belong next to any of these figures. First, the comparison table does not include Opus 5.5 or the GPT-6 generation. Second, independent verification had not landed at publication — the first Hacker News comments on the release were openly skeptical that a checkpoint would move agentic scores by double digits. Treat the table as a ceiling under DeepSeek's own harness until a third party reproduces it[3].",
      ],
      table: {
        headers: ["Benchmark", "1017", "V4.1-Flash (Sept)", "Kimi K3", "GLM-5.3", "Opus 5"],
        rows: [
          ["HLE w/o tools", "42.6", "36.8", "43.5", "42.0", "56.3"],
          ["Terminal-Bench 4.0", "42.3", "31.2", "12.6", "37.9", "51.8"],
          ["DeepSWE v1.1", "77.0", "74.2", "67.5", "66.9", "74.0"],
          ["ProgramBench", "29.1", "20.3", "17.5", "19.0", "37.0"],
          ["NL2Repo-Bench", "68.2", "65.4", "58.0", "58.0", "75.3"],
          ["Automation-Bench v1.0.6", "60.5", "54.8", "46.7", "48.8", "50.3"],
          ["Agents' Last Exam", "35.4", "31.8", "27.6", "28.5", "28.6"],
          ["Apex Bench v1.1", "72.1", "64.6", "47.8", "56.6", "65.8"],
          ["Chartography (w/tools)", "83.0", "78.9", "68.1", "—", "84.0"],
          ["BabyVision (w/tools)", "92.5", "89.6", "85.7", "—", "94.1"],
          ["ZeroBench-main (w/tools)", "51.0", "49.0", "41.0", "—", "52.0"],
        ],
      },
      note: "Full deltas, harness details, and the multi-scaffold caveat live in [[v4-1-flash-1017-benchmarks|the 1017 benchmarks page]][3].",
    },
    {
      num: "05",
      title: "Pricing and Cache Economics",
      description:
        "The rate card is identical to V4.1-Flash, as of October 17, 2026. Off-peak is exactly half of peak. Peak hours are 01:00-04:00 and 06:00-10:00 UTC, Monday through Friday, excluding Chinese public holidays; everything else is off-peak[5].",
      paragraphs: [
        "Cache behavior is where the real cost lives. DeepSeek reports a 91.5% cache hit rate on its own endpoint, and OpenRouter's weighted numbers put the effective input price near $0.017 per million tokens. OpenCode-side observation has seen cache ratios as high as 97%[2][5].",
        "You can sanity-check the mechanism with the published rates. At 91.5% hits off-peak, a blended input price is about 91.5% at $0.003 plus 8.5% at $0.15, which lands near $0.0155 per million tokens. That arithmetic is not a new discount — it is the same rate card, exploited by cache reuse[5].",
        "So the cost story for 1017 is two-part. The shorter output from self-feedback RL reduces what you pay per completed task at an unchanged output rate, and the cache-hit economics reward workloads that resend a stable prefix. The model got cheaper to operate, not cheaper per token.",
      ],
      table: {
        headers: ["deepseek-flash", "Peak", "Off-peak"],
        rows: [
          ["Input (cache hit)", "$0.006", "$0.003"],
          ["Input (cache miss)", "$0.30", "$0.15"],
          ["Output", "$1.20", "$0.60"],
        ],
      },
      note: "The full breakdown by effort level is in [[v4-1-flash-pricing|the V4.1 Flash pricing guide]][5].",
    },
    {
      num: "06",
      title: "The Search and Fetch API Opened the Same Day",
      description:
        "Alongside the checkpoint, DeepSeek opened a self-hosted Search and Fetch API on October 17. The endpoints are POST https://api.deepseek.com/v1/tools/search and POST https://api.deepseek.com/v1/tools/fetch[2][6].",
      paragraphs: [
        "Pricing is $0.75 per 1,000 successful requests, or CNY 5 per 1,000, with each endpoint billed separately. Failed or empty requests are not charged. QPS is capped at 5 for Search and 5 for Fetch, applied at the account level and independently per endpoint[6].",
        "Search supports a real operator set — site:, -site:, the minus and quoted-phrase operators, lang:, after:, and before: — and each result carries a rerank_score from 0 to 3 and an authority score from 0 to 4. Fetch takes any URL and returns Markdown, which makes it a drop-in for retrieval pipelines that currently bolt on a scraper[6].",
        "There is a free window worth using. Server-side tool calls routed through DeepSeek Harness, Claude Code, or Codex are free until October 31, 2026 at 16:00 UTC. One secondary source cites November 1; plan against the October 31 date to be safe[6].",
      ],
      list: [
        "Search and Fetch are DeepSeek's own engine — the company cites hundreds of millions of daily requests over a web index in the hundreds of billions of pages[2]",
        "Billing: $0.75 per 1,000 successful requests per endpoint; failures are free[6]",
        "Rate limits: 5 QPS for Search, 5 QPS for Fetch, account-level[6]",
        "Free until Oct 31, 2026 16:00 UTC via Harness, Claude Code, and Codex[6]",
      ],
      note: "Setup and operator examples are in [[deepseek-search-api|the DeepSeek Search API guide]][6].",
    },
    {
      num: "07",
      title: "Open Weights and Local Feasibility",
      description:
        "The checkpoint shipped under MIT on release day, on Hugging Face at deepseek-ai/DeepSeek-V4.1-Flash-1017 and on ModelScope. Any report claiming the 1017 weights were withheld is a stale snapshot from publication morning[2][3].",
      paragraphs: [
        "There is no Jinja chat template. DeepSeek instead provides a reference implementation in encoding/encoding.py plus deepseek-recipe, a Rust package with Python bindings, so tooling that expects a template file needs a small adaptation[3].",
        "Recommended sampling is temperature 1.0 and top_p 1.0, with max_tokens of at least 256K. Community quantization followed fast: Baekpica's DeepSeek-V4.1-Flash-1017-VQ-GGUF was converted on release day, turning the roughly 510GB official checkpoint into an approximately 113.6 GB base GGUF. That package includes the model's own three-tower MTP drafter, a roughly 1GB vision sidecar, and the 1017 Engram table, and it targets a single 128GB DGX Spark. The loader validates 1,000 tensors, 113,556,639,424 bytes, with slots=1000 bound=1000 and zero missing[4].",
        "Even so, self-hosting remains a several-hundred-gigabyte engineering project on the official weights. The GGUF route makes a single-machine demo plausible, not production hosting.",
      ],
      note: "Hardware sizing and quantization trade-offs are covered in [[v4-1-flash-1017-local|the 1017 local deployment guide]][4].",
    },
    {
      num: "08",
      title: "Should You Switch, and How It Applies",
      description:
        "For most API users there is nothing to switch. Because the model name is still deepseek-flash, traffic already routes to 1017 the moment DeepSeek flips the checkpoint on the server side. Confirm it by checking the MODEL VERSION field on the pricing page[5].",
      paragraphs: [
        "The reasons to act deliberately are narrower. If you pin a legacy alias like deepseek-v4-flash, you are still served by 1017 at the Flash price, so pinning buys no stability[2][3]. If you run DeepSeek Harness, upgrade to v0.2.1-rc.1 or newer, since the checkpoint was tuned against it. If you self-host, you now have a release-day GGUF to test on a single machine[4].",
        "What to watch: shorter output changes your token accounting, so re-measure cost per completed task rather than assuming the old ratio. The new Search and Fetch endpoints may let you delete a scraper and a reranker from your stack while the free window lasts. And treat the benchmark jump as unverified until an independent harness reproduces it[3].",
        "The blunt conclusion: 1017 is a quality and behavior refresh at the same architecture and the same price, with a genuinely new Search API attached. Adopt it by doing nothing on the API side, upgrade Harness, and spend your attention on the two things that changed — output length and the tools endpoints.",
      ],
      list: [
        "API users: no action needed; deepseek-flash already points at 1017[2]",
        "Harness users: move to v0.2.1-rc.1 or newer[2]",
        "Self-hosters: start from the community GGUF, not the 510GB checkpoint[4]",
        "Cost owners: re-measure per-task spend, since output length changed[2]",
      ],
      note: "Migration details and alias behavior are in [[v4-1-flash-api-setup|the V4.1 Flash API setup guide]] and [[deepseek-flash-model-names|the model names reference]]. A side-by-side with the September build is in [[v4-1-flash-1017-vs-v4-1-flash|1017 vs V4.1-Flash]][2][3].",
    },
  ],
  prevGuide: {
    title: "What Is DeepSeek V4.1 Flash? The 552B MoE, Explained",
    slug: "deepseek-v4-1-flash",
  },
  nextGuide: {
    title: "DeepSeek V4.1 Flash 1017 Benchmarks: Full Table",
    slug: "v4-1-flash-1017-benchmarks",
  },
  relatedGuides: [
    { title: "DeepSeek V4.1 Flash 1017 Benchmarks: Full Table", slug: "v4-1-flash-1017-benchmarks" },
    { title: "1017 vs V4.1 Flash: What the Checkpoint Changed", slug: "v4-1-flash-1017-vs-v4-1-flash" },
    { title: "DeepSeek Search API: Search & Fetch Endpoints", slug: "deepseek-search-api" },
    { title: "Running V4.1 Flash 1017 Locally: GGUF & Sizing", slug: "v4-1-flash-1017-local" },
    { title: "What Is DeepSeek V4.1 Flash? The 552B MoE, Explained", slug: "deepseek-v4-1-flash" },
  ],
  sources: [
    { label: "DeepSeek API Changelog (Oct 17, 2026)", url: "https://api-docs.deepseek.com/updates" },
    { label: "DeepSeek News: V4.1-Flash-1017 Release (Oct 17, 2026)", url: "https://api-docs.deepseek.com/news/news261017" },
    { label: "Hugging Face: DeepSeek-V4.1-Flash-1017 Model Card", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017" },
    { label: "Hugging Face: Baekpica DeepSeek-V4.1-Flash-1017-VQ-GGUF", url: "https://huggingface.co/Baekpica/DeepSeek-V4.1-Flash-1017-VQ-GGUF" },
    { label: "DeepSeek API Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "DeepSeek Search API Guide", url: "https://api-docs.deepseek.com/guides/search" },
  ],
};
