import type { GuideContent } from "./types";

// target keyword: DeepSeek Reasonix
// content source: reference/topics/16-reasonix-deepseek.md + 02-flash-api-guide.md (finalized 2026-08-01)
// note: README hero "$12 vs $61" contradicts the benchmark table's $1.38; the guide uses the table and flags the gap.
export const reasonixDeepseek: GuideContent = {
  slug: "reasonix-deepseek",
  category: "COST EFFICIENCY",
  title: "Reasonix: The DeepSeek Harness That Hits 99%+ Cache Rates",
  readTime: "8 MIN READ",
  updatedAt: "AUG 1, 2026",
  summary:
    "DeepSeek Reasonix is a cache-first terminal coding agent that hit 99.82% prefix-cache hits on 435M input tokens, cutting a $61/day bill to $1.38.",
  toc: [
    { id: "step-1", label: "Step 1: Why Cache Hit Rate Is the Cost Variable That Matters" },
    { id: "step-2", label: "Step 2: What Is DeepSeek Reasonix?" },
    { id: "step-3", label: "Step 3: The Cache-First Loop: Three Regions, Strict Invariants" },
    { id: "step-4", label: "Step 4: The Hard Numbers: One Real Day at 99.82%" },
    { id: "step-5", label: "Step 5: Tool-Call Repair and the Cost-Control Pillar" },
    { id: "step-6", label: "Step 6: Install and First Run" },
    { id: "step-7", label: "Step 7: Configure reasonix.toml for Cache-Stable Sessions" },
    { id: "step-8", label: "Step 8: Community Verdict, Honest Limits, and Pairing With OpenCode" },
  ],
  steps: [
    {
      num: "01",
      title: "Why Cache Hit Rate Is the Cost Variable That Matters",
      description:
        "DeepSeek's cache hit rate is the biggest lever on your API bill, and it is not a server-side setting you toggle on. On the official pricing page, V4 Flash charges $0.0028 per 1M input tokens when the prefix hits the context cache, versus $0.14 per 1M when it misses — a 50x spread on the same tokens[4].",
      paragraphs: [
        "The mechanism explains the spread. DeepSeek's context caching is automatic, best-effort, and byte-prefix based: a request earns the discount only when its byte prefix exactly matches a previously seen request[3]. Whether you pay $0.0028 or $0.14 for the history you resend each turn is decided by how your client orders, reorders, or rewrites that conversation.",
        "Agents are the worst case for misses: they resend the whole conversation — system prompt, tool definitions, history — before every request. If the prefix drifts, you pay full price each turn.",
        "The gap is large in practice. At a 30% hit rate, V4 Flash input prices at roughly $0.099 per 1M; at 99%, the same input prices at roughly $0.004 per 1M — about 24x cheaper from cache discipline alone.",
      ],
      list: [
        "V4 Flash cache hit: $0.0028 per 1M input tokens",
        "V4 Flash cache miss: $0.14 per 1M input tokens",
        "50x input-price spread; output is $0.28 per 1M either way",
        "V4 Pro cache hit $0.003625 vs miss $0.435 — a 120x spread",
      ],
      note: "The legacy aliases deepseek-chat and deepseek-reasoner were retired on July 24, 2026; always use deepseek-v4-flash or deepseek-v4-pro. For the full breakdown, see the [[flash-pricing|DeepSeek V4 Flash pricing guide]].",
    },
    {
      num: "02",
      title: "What Is DeepSeek Reasonix?",
      description:
        "DeepSeek Reasonix is a DeepSeek-native terminal coding agent and harness from the esengine organization on GitHub — a single static Go binary tuned around DeepSeek's prefix cache so token costs stay low across long sessions[1].",
      paragraphs: [
        "Official backing is the first differentiator. Reasonix is one of the few third-party integrations with a dedicated page in DeepSeek's own API docs, titled \"Integrate with Reasonix\"[2]. Vendor documentation is not endorsement, but it signals the project follows the API well.",
        "Scale followed traction: roughly 28.3k stars and 1.8k forks as of August 1, 2026. The project is MIT-licensed and ships as one static Go binary for macOS, Linux, and Windows; the npm package reasonix is just an installer that pulls that binary. Current release line: v1.18.0.",
        "The tagline carries the intent: a DeepSeek-native agent \"engineered around prefix-cache stability — leave it running.\" The longer a session stays alive with a stable prefix, the cheaper each turn gets.",
      ],
      note: "Do not confuse this with the [[deepseek-harness|official DeepSeek Harness]], which is \"to be released soon\" and is a separate product. Reasonix is a community harness that DeepSeek's docs chose to document — see [[harness-agent-capability|why a native harness makes agents dramatically better]].",
    },
    {
      num: "03",
      title: "The Cache-First Loop: Three Regions, Strict Invariants",
      description:
        "Reasonix's design reduces to one discipline: every request's context is partitioned into three regions with strict invariants — an immutable prefix, an append-only log, and a volatile scratch area[6].",
      paragraphs: [
        "ImmutablePrefix freezes the system prompt, tool definitions, and few-shot examples byte-for-byte at session start, so nothing drifts. AppendOnlyLog means history only ever grows — never reordered, rewritten, or re-serialized. VolatileScratch holds reasoning and temp state that resets each turn and never enters the cache prefix.",
        "Auto-compact sits on top: near the context limit, old turns fold into a summary, and the summary request is shaped to reuse the main agent's already-cached system, tool, and history prefix. The benchmark doc puts it plainly: \"DeepSeek gave us cacheable bytes. The four mechanisms above are how we keep the bytes cacheable.\"[5]",
        "The lesson generalizes: caching is a server capability, and hit rate is a client design decision. Two clients on the same DeepSeek API can land at 30% and 99%.",
      ],
      note: "\"That single discipline is enough to push cache hit rates to 85-95% on real sessions. Nothing else in the framework would matter if this was wrong,\" the maintainer wrote.",
    },
    {
      num: "04",
      title: "The Hard Numbers: One Real Day at 99.82%",
      description:
        "The project publishes a real-world cache benchmark built from an actual user day. On May 1, 2026, that day logged 435,033,856 cached input tokens against just 767,616 uncached — a 99.82% hit rate across 435.98M tokens.",
      paragraphs: [
        "The cost is the point: $1.38 that day, versus $61.06 at a 0% hit rate — a 97.7% saving. On the V4 Pro tier, the same day cost $2.07 instead of $189.73, a 98.9% saving; Pro's wider 120x cache spread makes the discipline pay even more.",
        "One honesty note: the README's hero image says \"~$12 instead of ~$61\" — about 5x — which contradicts the benchmark table's $1.38. The table is the detail; the $12 figure looks like an older estimate on earlier prices. Use the table numbers.",
      ],
      table: {
        headers: ["Metric", "Real day (May 1, 2026)", "0% cache baseline", "Saving"],
        rows: [
          ["Cached input tokens", "435,033,856", "0", "99.82% hit rate"],
          ["Total input tokens", "435,981,235", "435,981,235", "—"],
          ["V4 Flash daily cost", "$1.38", "$61.06", "97.7%"],
          ["V4 Pro daily cost", "$2.07", "$189.73", "98.9%"],
        ],
      },
      note: "A single-day snapshot is not a guarantee, but it is a documented real session from the maintainers' repo — the number the project's marketing and DeepSeek's docs both point back to.",
    },
    {
      num: "05",
      title: "Tool-Call Repair and the Cost-Control Pillar",
      description:
        "A high hit rate does not make an agent usable; tool calling does. Reasonix wraps DeepSeek's known tool-call quirks in a repair pipeline, then layers a cost-control pillar on top so long sessions stay cheap by design.",
      list: [
        "Flatten — deep or wide tool schemas are flattened so argument serialization stops breaking",
        "Scavenge — tool calls stuck in the reasoning stream are recovered and re-emitted",
        "Truncation repair — truncated JSON tool calls are detected and fixed",
        "Storm suppression — repeated tool-call storms are throttled",
        "Flash-first default — the executor runs on deepseek-v4-flash; /pro or /preset max moves a turn or session to v4-pro",
        "Turn-end compaction — automatic compression under a 3000-token ceiling",
      ],
      paragraphs: [
        "Two old features were deliberately removed, a useful signal about the project's taste. v0.31 deleted the R1 Thought Harvesting and self-consistency branching features because they \"rarely paid for themselves\". The framework keeps only what earns its cost.",
        "Cost control is in the defaults: the executor runs on the cheap flash tier, and a model can self-report a <<<NEEDS_PRO>>> signal to escalate mid-session when the task justifies it. The default pair is deepseek-v4-flash as executor with an optional planner model for heavier work.",
      ],
      note: "Slash commands have moved between releases: DeepSeek's current docs list /pro and /preset max, while older architecture notes mention /model. Run /help on your installed version to confirm.",
    },
    {
      num: "06",
      title: "Install and First Run",
      description:
        "Reasonix installs three ways, and one of them is the route DeepSeek's own docs recommend: npx reasonix code. Every route lands on the same prebuilt static Go binary, with no Node runtime to maintain after install.",
      code: `# Option 1: global install (any OS, pulls the prebuilt Go binary)
npm i -g reasonix

# Option 2: macOS via Homebrew
brew install esengine/reasonix/reasonix

# Option 3: no install — the path DeepSeek's official docs recommend
npx reasonix code

# First run: guided setup writes your API key to ~/.reasonix/config.json
reasonix setup

# Start the interactive session, or run a one-shot task
reasonix
reasonix run "implement the TODOs in main.go"`,
      paragraphs: [
        "Before setup, create a DeepSeek API key at platform.deepseek.com/api_keys. The [[flash-api-setup|DeepSeek V4 Flash API setup guide]] covers the key, base URL, and first request.",
        "reasonix setup walks you through provider and model selection and persists the API key to ~/.reasonix/config.json. Then plain reasonix opens the interactive TUI, and reasonix run \"...\" executes a one-shot task.",
        "Inside the TUI: /pro runs the next turn on V4 Pro, /preset max uses Pro for the whole session, and /preset fast restores the default.",
      ],
      note: "New DeepSeek accounts reportedly start with a free 5M-token grant and no credit card requirement — enough to trial Reasonix before paying. DeepSeek has not confirmed the grant officially, so treat it as reported.",
    },
    {
      num: "07",
      title: "Configure reasonix.toml for Cache-Stable Sessions",
      description:
        "Configuration lives in reasonix.toml. The compaction thresholds do double duty: they decide when old context folds into a summary, and they keep the cached prefix intact by compacting before the ceiling.",
      code: `default_model = "deepseek-flash"   # executor; add [agent] planner_model = "deepseek-pro" for dual-model

[context]
soft_compact_ratio = 0.5           # prompt a compact at 50% context (keeps the cache-first prefix)
tool_result_snip_ratio = 0.6       # trim stale tool results before summarizing
compact_ratio = 0.8                # attempt a compact at 80%
compact_force_ratio = 0.9          # forced compact ceiling at 90%
# prices = { "deepseek-v4-flash" = { cache_hit = 0.0028, input = 0.14, output = 0.28 } }  # per 1M tokens, USD`,
      paragraphs: [
        "Project instructions follow the pattern Claude Code popularized: REASONIX.md for committed project rules, REASONIX.local.md for personal git-ignored notes, and ~/.config/reasonix/REASONIX.md globally. The project calls REASONIX.md \"the Reasonix analog of Claude Code's CLAUDE.md\".",
        "An optional prices table in the same file teaches the CLI your per-model rates — cache_hit 0.0028, input 0.14, output 0.28 in USD per 1M — so the cost badge reflects your real numbers.",
        "Whatever you tune, keep the immutable region identical across sessions: a single changed byte in the system prompt or tool definitions breaks the byte-prefix match and forfeits the discount.",
      ],
      note: "Treat compaction ratios as cache controls, not just memory controls. Compact early and the summary can reuse the cached prefix; compact late and the rebuild may miss.",
    },
    {
      num: "08",
      title: "Community Verdict, Honest Limits, and Pairing With OpenCode",
      description:
        "Reception is enthusiastic but not unanimous. On r/DeepSeek, users report sharp jumps in cache hits after switching — one wrote \"I went from a less than 5% cache hits with claude code to 90% with reasonix\" — and credit it with shrinking their DeepSeek balance usage drastically[8].",
      paragraphs: [
        "The counterpoint is real. OpenCode users report equally high hit rates — one HN user logged roughly 97.9% cache hits on 1.2 billion tokens in a day, another claims 96-98% with opencode + deepseek-v4-flash[7]. The deeper critique from an experienced harness author: when tools deliberately break the prefix, it is usually because they tested it and got better results overall — append-only is one strategy, not always the best.",
        "Honest limits: Reasonix is still in active development with a smaller feature surface than Claude Code or OpenCode — no first-class multi-agent orchestration, no RAG, no web UI, and DeepSeek's flash tier is not multimodal, so it cannot process UI mockups. Quality comparisons against classic agents are community opinion; no controlled benchmark pits it against Claude Code or OpenCode on task completion. The maintainer positions the tool as \"opinionated, not general.\"",
        "Pairing with OpenCode: you are not locked in. reasonix-connector is a community plugin that brings Reasonix's cache-optimized backend into OpenCode's UI, and pi-reasonix ports the algorithm for other clients. If you stay in OpenCode, cache discipline still pays: Reddit users describe the [[opencode-go|OpenCode Go subscription]] as usage-based with cache hits taken into account — a community claim, not a vendor one.",
      ],
      list: [
        "Most common positive report: cache hits jump to 90%+ on long sessions after switching",
        "Smaller feature surface; no multi-agent orchestration, no RAG, no web UI",
        "Development is ongoing; the v2 rewrite lives on the main-v2 branch",
      ],
      note: "Measure cost per completed task, not hit rate alone. A 99% hit rate on a loop that finishes the job is a win; on a loop that churns, it is still expensive.",
    },
  ],
  prevGuide: {
    title: "Why a Native Harness Makes AI Agents Dramatically Better",
    slug: "harness-agent-capability",
  },
  nextGuide: {
    title: "Hermes Best Setup: DeepSeek V4 Flash 0731 + MiMo V2.5 (Vision)",
    slug: "hermes-setup",
  },
  relatedGuides: [
    { title: "Why a Native Harness Makes AI Agents Dramatically Better", slug: "harness-agent-capability" },
    { title: "OpenCode Go: The $5/Month Subscription That Unlocks DeepSeek V4", slug: "opencode-go" },
    { title: "DeepSeek V4 Flash API Setup: Base URL, Models & Your First Call", slug: "flash-api-setup" },
    { title: "DeepSeek Harness: Everything We Know Before the Official Release", slug: "deepseek-harness" },
  ],
  sources: [
    { label: "GitHub: esengine/DeepSeek-Reasonix", url: "https://github.com/esengine/DeepSeek-Reasonix" },
    { label: "DeepSeek Official Docs: Integrate with Reasonix", url: "https://api-docs.deepseek.com/quick_start/agent_integrations/reasonix/" },
    { label: "DeepSeek Official Docs: Context Caching on Disk", url: "https://api-docs.deepseek.com/guides/kv_cache/" },
    { label: "DeepSeek Official Docs: Models & Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "Reasonix: Real-World Cache Benchmark", url: "https://github.com/esengine/DeepSeek-Reasonix/blob/v1/benchmarks/real-world-cache/README.md" },
    { label: "dev.to: How a DeepSeek-Only Agent Framework Hit 85% Prefix Cache Rate", url: "https://dev.to/esengine/how-a-deepseek-only-agent-framework-hit-85-prefix-cache-rate-and-saved-93-vs-claude-5c9g" },
    { label: "Hacker News: Reasonix Discussion (729 points)", url: "https://news.ycombinator.com/item?id=48256953" },
    { label: "Reddit r/DeepSeek: Thoughts on Reasonix?", url: "https://www.reddit.com/r/DeepSeek/comments/1tnrv19/thoughts_on_reasonix/" },
  ],
};
