import type { GuideContent } from "./types";

// target keyword: opencode go
export const opencodeGo: GuideContent = {
  slug: "opencode-go",
  category: "CODING AGENTS",
  title: "OpenCode Go: The $5/Month Subscription That Unlocks DeepSeek V4",
  readTime: "8 MIN READ",
  updatedAt: "AUG 1, 2026",
  summary:
    "OpenCode Go is OpenCode's official subscription: $5 for the first month, then $10, and it unlocks DeepSeek V4 Flash with a $60 monthly usage credit.",
  toc: [
    { id: "step-1", label: "Step 1: What Is OpenCode Go (and What It Is Not)" },
    { id: "step-2", label: "Step 2: The DeepSeek V4 Credits Inside: Flash vs Pro" },
    { id: "step-3", label: "Step 3: Subscribe: From opencode.ai to Your First API Key" },
    { id: "step-4", label: "Step 4: Connect the Go Key in OpenCode: /connect and /models" },
    { id: "step-5", label: "Step 5: Flash vs Pro: How to Spend Your $60" },
    { id: "step-6", label: "Step 6: BYOK vs Go: Do You Even Need the Subscription?" },
    { id: "step-7", label: "Step 7: Privacy, Regions, and Fine Print" },
  ],
  steps: [
    {
      num: "01",
      title: "What Is OpenCode Go (and What It Is Not)",
      description:
        "OpenCode Go is the official subscription tier of the OpenCode team (SST/Anomaly), billed through OpenCode Zen. It is not a third-party proxy and not an OpenRouter product — one API key and one endpoint open the entire plan for a month.[1]",
      paragraphs: [
        "The plan is flat-rate. It costs $5 for the first month, then $10 per month, and it bundles 17 open-source coding models, including DeepSeek V4 Flash and V4 Pro.[2] The lineup also carries Grok 4.5, GLM-5.2, GPT 5.6 Luna, Kimi K3, Qwen3.7, MiniMax M3, and MiMo-V2.5. Your allowance is measured in dollar usage value, not per-request charges.",
        "The value proposition is a lever: OpenCode's stated goal is that you pay $10 and get about $60 in usage, thanks to bulk discounts and reserved GPU capacity — roughly a 6x multiplier. For DeepSeek-heavy workflows, that turns a $10 bill into a month of effectively unlimited Flash.",
        "If you are new to the V4 family, start with the [[beginner-guide|beginner guide]] on why DeepSeek V4 is the best cheap AI right now. If you already run OpenCode against the official DeepSeek API, that path still works — see the [[flash-opencode|OpenCode + DeepSeek V4 Flash guide]] for the BYOK route.",
      ],
      list: [
        "Official subscription from OpenCode, billed via OpenCode Zen — not a reseller, not OpenRouter.",
        "$5 first month, then $10 per month.",
        "17 open-source models on one key and one endpoint.",
        "Pay $10, get about $60 in usage value — roughly 6x leverage.",
      ],
      note: "OpenCode Go is in beta. Pricing, the model lineup, and the limits can change at any time.",
    },
    {
      num: "02",
      title: "The DeepSeek V4 Credits Inside: Flash vs Pro",
      description:
        "The Go plan carries two DeepSeek V4 models, and each has its own monthly credit. Cheap models stretch much further than expensive ones, so know what you are buying before you subscribe.",
      table: {
        headers: ["", "DeepSeek V4 Flash", "DeepSeek V4 Pro"],
        rows: [
          ["Monthly credit", "$60", "$15"],
          ["Per 1M tokens (in / out / cache read)", "$0.14 / $0.28 / $0.0028", "$0.435 / $0.87 / $0.003625"],
          ["Estimated requests / 5 hours", "31,650", "3,450"],
          ["Estimated requests / month", "158,150", "17,150"],
        ],
      },
      paragraphs: [
        "Global limits cap the whole account at $12 of usage per 5-hour window, $30 per week, and $60 per month.[1] At typical request sizes, DeepSeek V4 Flash is officially estimated at 31,650 requests per 5 hours and roughly 158,150 per month — effectively unlimited for a solo developer.",
        "The per-token rates inside Go mirror DeepSeek's current official pricing: Flash at $0.14 input / $0.28 output per 1M tokens, Pro at $0.435 / $0.87.[4] The subscription buys volume at those rates, not a per-token discount.",
        "Model ids on Go use an opencode-go/ prefix, so you request opencode-go/deepseek-v4-flash or opencode-go/deepseek-v4-pro.",
      ],
      note: "Request estimates assume typical coding requests: roughly 790 input, 68,000 cache-read, and 280 output tokens for Flash. They are estimates from OpenCode, not guarantees.",
    },
    {
      num: "03",
      title: "Subscribe: From opencode.ai to Your First API Key",
      description:
        "Subscribing takes about two minutes. Open opencode.ai, sign in to OpenCode Zen, and click Subscribe to Go.",
      list: [
        "Open opencode.ai and sign in with your OpenCode Zen account (register if you do not have one).",
        "Click Subscribe to Go — the first month is $5.",
        "Pay. Users in China can pay with Alipay: scanning the QR code signs the recurring agreement automatically on the first payment.[5]",
        "Create an API key in the Zen console and copy it. Paste it only into your own tools.",
      ],
      paragraphs: [
        "The Zen console also shows your remaining limits. One detail to know: only one member per workspace holds a Go subscription, so share the key with teammates rather than paying twice.",
      ],
      code: `# list the models available on your Go key (OpenAI-compatible)
curl https://opencode.ai/zen/go/v1/models -H "Authorization: Bearer YOUR_GO_API_KEY"`,
    },
    {
      num: "04",
      title: "Connect the Go Key in OpenCode: /connect and /models",
      description:
        "With the key in hand, point OpenCode at the Go channel. Run /connect, choose OpenCode Go, and paste the key — or set the model in opencode.json so every session uses it.",
      list: [
        "/connect in the OpenCode TUI.",
        "Select OpenCode Go.",
        "Paste your Go API key.",
        "/models — confirm opencode-go/deepseek-v4-flash and opencode-go/deepseek-v4-pro appear.",
      ],
      code: `{
  "$schema": "https://opencode.ai/config.json",
  "model": "opencode-go/deepseek-v4-flash"
}`,
      paragraphs: [
        "The model id to request is opencode-go/deepseek-v4-flash, served through OpenCode's own OpenAI-compatible endpoint at https://opencode.ai/zen/go/v1/chat/completions.",
        "Because the endpoint is OpenAI-compatible, the same key works in any OpenAI-compatible agent — Hermes, Pi, OpenClaw, Mastra, and others. It also plugs into Claude Code and Claude Desktop through the OpenCode Go preset in the CC Switch desktop app — see the [[cc-switch-claude-code|CC Switch tutorial]].",
      ],
    },
    {
      num: "05",
      title: "Flash vs Pro: How to Spend Your $60",
      description:
        "Flash and Pro are different tools. Community reviews describe Flash as a Sonnet-level model for daily coding, while V4 Pro is the one reviewers compare to Claude Opus. Budget each where it fits.",
      paragraphs: [
        "The pattern users converge on: let an expensive reasoning model plan and review, and let DeepSeek V4 Flash execute the build. On execution duty, users report the monthly cap is nearly impossible to hit.[6]",
        "Independent trackers agree Flash sits near the frontier — the Artificial Analysis Intelligence Index v4.1 scored it 50 at max effort, ranked #2 of 173 models. Benchmarks and daily feel are different layers, which is why the Sonnet-level label stuck in the community.",
        "[[v4-pro|DeepSeek V4 Pro]] is one of Go's least obvious advantages: third-party analyses note it is missing from the Zen pricing table, so Go is one of only two cheap routes to it, alongside the official DeepSeek API.[8]",
      ],
      list: [
        "Plan and review with GLM-5.2 or Kimi K3; build and execute with Flash or MiMo.",
        "Expensive models burn the 5-hour and weekly windows fast — Kimi K3's official estimate is about 110 requests per 5 hours.",
        "Run the main loop on opencode-go/deepseek-v4-flash and escalate to opencode-go/deepseek-v4-pro only for architecture or hard debugging.",
      ],
      note: "Flash on Go is the 0731 build, hosted in China. If requests fail, open opencode.ai, enable 'Enable models hosted in China', and restart OpenCode.",
    },
    {
      num: "06",
      title: "BYOK vs Go: Do You Even Need the Subscription?",
      description:
        "OpenCode itself is free — MIT-licensed open source — and you can bring your own DeepSeek key at any time. BYOK bills at official [[flash-pricing|DeepSeek rates]]; Go is a fixed monthly fee for bulk quota.",
      paragraphs: [
        "The rule of thumb from users who measured their spend: if you pay more than $10 per month on the DeepSeek API, Go is worth it; below that, direct billing is cheaper. The $60 credit is relaxed enough that heavy Flash users rarely see the cap.",
        "There is a real debate about which is cheaper for Flash-heavy work specifically — direct API billing can win there. Go pulls ahead when you mix in V4 Pro and the other 15 models, because one $10 key replaces several bills.",
        "From the command line, the Go channel works like any model id:",
      ],
      code: `opencode run -m opencode-go/deepseek-v4-flash "Fix the failing test in auth.ts"`,
      list: [
        "OpenCode is free, MIT-licensed, with a large open-source community — the subscription is optional.",
        "BYOK at official rates: Flash $0.14 / $0.28 per 1M; Pro $0.435 / $0.87.",
        "Go: $10 per month flat, one key, roughly $60 of usage value.",
      ],
      note: "Go's dollar credits are reference prices — the bulk discount is already inside the 6x multiplier. Recheck current official DeepSeek rates in the [[flash-pricing|pricing guide]] before you move a heavy workload.",
    },
    {
      num: "07",
      title: "Privacy, Regions, and Fine Print",
      description:
        "One privacy caveat matters before you commit a codebase: every Go model is zero-retention (0-day, not used for training) except DeepSeek V4 Flash, which is marked 'used for model training, no agreement'.[1] That single exception changes which projects you run on Flash.",
      paragraphs: [
        "For proprietary or client work, treat Flash-on-Go as a training-eligible model and keep secrets out of the context. The other 15 models hold nothing and use nothing for training.",
        "Region: most Go models run in US, EU, and Singapore data centers, but the 0731 Flash build runs on China-hosted servers. Open opencode.ai and enable 'Enable models hosted in China' — otherwise Flash requests fail with HTTP 403.",
        "Fine print: the $60 monthly credit resets on a schedule OpenCode does not document, the 5-hour window boundary is not published, and pricing is still beta. Budget for the worst case and test for one month before you commit a team.",
        "DeepSeek V4 is also a text-only model — it cannot read images or UI mockups, so feed it code and specs, not screenshots.",
      ],
      note: "If you go past a window limit, enable 'Use balance' in the console and Go falls back to your Zen balance instead of blocking you.",
    },
  ],
  prevGuide: {
    title: "Why DeepSeek V4 Is the Best Cheap AI Right Now: A Beginner Guide",
    slug: "beginner-guide",
  },
  nextGuide: {
    title: "Connect Claude Code & Claude Desktop to DeepSeek V4 with CC Switch",
    slug: "cc-switch-claude-code",
  },
  relatedGuides: [
    {
      title: "Why DeepSeek V4 Is the Best Cheap AI Right Now: A Beginner Guide",
      slug: "beginner-guide",
    },
    {
      title: "Use DeepSeek V4 Flash with OpenCode: Step-by-Step",
      slug: "flash-opencode",
    },
    {
      title: "DeepSeek V4 Flash Pricing: Token Costs & How to Save Up to 98%",
      slug: "flash-pricing",
    },
    {
      title: "Connect Claude Code & Claude Desktop to DeepSeek V4 with CC Switch",
      slug: "cc-switch-claude-code",
    },
  ],
  sources: [
    {
      label: "OpenCode Go Documentation (Official)",
      url: "https://opencode.ai/docs/go/",
    },
    {
      label: "OpenCode Go Landing Page (Official)",
      url: "https://opencode.ai/go",
    },
    {
      label: "Artificial Analysis: DeepSeek V4 Flash",
      url: "https://artificialanalysis.ai/models/deepseek-v4-flash",
    },
    {
      label: "DeepSeek Official Pricing Page",
      url: "https://api-docs.deepseek.com/quick_start/pricing/",
    },
    {
      label: "OpenCode Go Alipay Support (GitHub Issue)",
      url: "https://github.com/esengine/DeepSeek-Reasonix/issues/3006",
    },
    {
      label: "Reddit r/opencode: Is OpenCode Go Worth It?",
      url: "https://www.reddit.com/r/opencode/comments/1tn9sit/considering_buying_opencode_go_is_it_worth_it/",
    },
    {
      label: "Reddit r/opencodeCLI: How Long Do OpenCode Go Limits Last?",
      url: "https://www.reddit.com/r/opencodeCLI/comments/1u3n68t/how_long_do_opencode_go_limits_actually_last_for/",
    },
    {
      label: "Zidooka: OpenCode Go Plan Review",
      url: "https://www.zidooka.com/archives/4393",
    },
  ],
};
