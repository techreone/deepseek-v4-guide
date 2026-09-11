import type { GuideContent } from "./types";

// target keyword: deepseek-flash model name
// 内容来源：reference/topics/28-v4-pro-retired-routing.md + 27-v4-1-flash.md + 25-v4-pro-pricing-api.md
export const deepseekFlashModelNames: GuideContent = {
  slug: "deepseek-flash-model-names",
  category: "REFERENCE",
  title: "DeepSeek Model Names & Retired IDs: The 2026 Alias Reference",
  seoTitle: "DeepSeek Model Names & Retired IDs (2026)",
  readTime: "8 MIN READ",
  updatedAt: "SEP 11, 2026",
  summary:
    "Every DeepSeek model id and status: deepseek-flash, retired V4 Flash names, the V4-Pro route from Sept 14, and old deepseek-chat / deepseek-reasoner ids.",
  toc: [
    { id: "step-1", label: "Step 1: The Current Model Name — deepseek-flash" },
    { id: "step-2", label: "Step 2: The Full Alias Table" },
    { id: "step-3", label: "Step 3: Retired Flash Names and Compatibility Routing" },
    { id: "step-4", label: "Step 4: deepseek-v4-pro — Phased Out, Routed From Sept 14" },
    { id: "step-5", label: "Step 5: Historical Names — deepseek-chat and deepseek-reasoner" },
    { id: "step-6", label: "Step 6: How Routing Works — and Why It's Risky" },
    { id: "step-7", label: "Step 7: A Production Incident Prevention Checklist" },
  ],
  steps: [
    {
      num: "01",
      title: "The Current Model Name — deepseek-flash",
      description:
        "If you call the DeepSeek API today and want the newest small model, the model string is `deepseek-flash`. It points at V4.1 Flash, released September 10, 2026, and it is the recommended id for new integrations[1][3].",
      paragraphs: [
        "DeepSeek decoupled the public model name from the architecture name. The architecture is V4.1 Flash; the API id is deepseek-flash. Keeping a stable public identifier across checkpoints lets the backend weights change without forcing every caller to edit code[1].",
        "The same id works on the OpenAI-compatible endpoint at `api.deepseek.com` and the Anthropic endpoint at `api.deepseek.com/anthropic`. For request examples, see [[v4-1-flash-api-setup|the API setup guide]].",
      ],
      list: [
        "Current id: deepseek-flash",
        "Served by: DeepSeek V4.1 Flash",
        "OpenAI endpoint: https://api.deepseek.com",
        "Anthropic endpoint: https://api.deepseek.com/anthropic",
        "Concurrency limit: 2,500[3]",
      ],
      note: "The API id is not the architecture name. Searching for \"deepseek-v4.1-flash\" as a model string may work in some tools but the documented API value is `deepseek-flash`[1].",
    },
    {
      num: "02",
      title: "The Full Alias Table",
      description:
        "This is the table to bookmark. It lists each model id, its current status, and what actually answers the request. Keep it next to your configuration files[1][2].",
      table: {
        headers: ["Model id", "Status", "Served by"],
        rows: [
          ["deepseek-flash", "Current", "DeepSeek V4.1 Flash"],
          ["deepseek-v4-flash", "Retired", "V4.1 Flash (compatibility route)"],
          ["deepseek-v4-flash-vision-exp", "Retired", "V4.1 Flash (compatibility route)"],
          ["deepseek-v4-pro", "Phasing out", "V4.1 Flash from Sept 14, 2026"],
          ["deepseek-chat", "Retired July 24, 2026", "Not a current alias"],
          ["deepseek-reasoner", "Retired July 24, 2026", "Not a current alias"],
        ],
      },
      paragraphs: [
        "The important column is the third one. A retired id does not necessarily mean a dead request. Several old ids still resolve, but the model behind them has been swapped, which is why the status and the serving model are listed separately[1][2].",
        "The current fleet is conceptually simple: one small id (`deepseek-flash`) that serves everything V4.1 Flash does, and a forthcoming flagship id, [[deepseek-v4-1-pro|deepseek-v4-1-pro]], that has no release date yet[2].",
      ],
      note: "If your dashboard reports a model name that is not in this table, you are likely seeing a third-party router's own alias rather than an official DeepSeek id[6].",
    },
    {
      num: "03",
      title: "Retired Flash Names and Compatibility Routing",
      description:
        "The two old Flash ids — `deepseek-v4-flash` and `deepseek-v4-flash-vision-exp` — were retired with the V4.1 Flash launch. They were not deleted. Requests to them are routed to V4.1 Flash and billed at Flash rates[1].",
      paragraphs: [
        "The compatibility route is both a convenience and a hazard. Your code keeps running, which is good. But the model answering the request is no longer the model your prompt was tuned for, which can invalidate regression testing. That risk is now a recurring theme in DeepSeek releases[5].",
        "The vision variant is a special case: V4-Flash-Vision-Exp was a separate experimental model. Routing it to V4.1 Flash means callers get the main multimodal model instead. In practice that is a capability upgrade, but it is still a behavior change that deserves a test pass[1][4].",
      ],
      list: [
        "deepseek-v4-flash: retired, routes to V4.1 Flash",
        "deepseek-v4-flash-vision-exp: retired, routes to V4.1 Flash",
        "Both bill at V4.1 Flash rates, not old rates",
        "Both changes are silent unless you log the resolved model[1]",
      ],
      note: "Because V4.1 Flash has native vision, the vision-exp route adds image understanding to callers who previously had none. See [[v4-1-flash-vision|the vision guide]] for the capability details[4].",
    },
    {
      num: "04",
      title: "deepseek-v4-pro — Phased Out, Routed From Sept 14",
      description:
        "DeepSeek is phasing out V4 Pro. Starting at 04:00 UTC on September 14, 2026 — 12:00 Beijing time — every request to `deepseek-v4-pro` routes to V4.1 Flash and is billed at Flash rates, until V4.1 Pro launches[1][3].",
      paragraphs: [
        "The stated reason is that multiple parties' tests put V4.1 Flash ahead of V4-Pro on performance, cost, speed, and total runtime. DeepSeek therefore frames the change as an orderly retirement rather than a failure. The id stays valid, but the backend changes[1][5].",
        "For V4-Pro customers this is mostly a price cut: off-peak output falls from $1.98 to $0.60 per million tokens. It also adds vision, which V4-Pro never had. The catch is that prompts tuned to V4-Pro's particular style should be re-tested rather than assumed safe[2][5].",
      ],
      table: {
        headers: ["Aspect", "Before Sept 14", "From Sept 14, 2026"],
        rows: [
          ["Model id", "deepseek-v4-pro", "deepseek-v4-pro (unchanged)"],
          ["Serving model", "V4-Pro-0813", "V4.1 Flash"],
          ["Off-peak output", "$1.98 / 1M", "$0.60 / 1M"],
          ["Vision", "Not supported", "Native via V4.1 Flash"],
          ["Route ends", "—", "When V4.1 Pro launches"],
        ],
      },
      note: "Read [[deepseek-v4-pro-retired|the full retirement and routing guide]] for the timeline, the community pushback, and the migration checklist[5].",
    },
    {
      num: "05",
      title: "Historical Names — deepseek-chat and deepseek-reasoner",
      description:
        "Earlier DeepSeek generations used the ids `deepseek-chat` and `deepseek-reasoner`. Both were retired on July 24, 2026 and are not part of the current V4.1 naming scheme[1].",
      paragraphs: [
        "These names referred to chat and reasoning modes rather than to specific architecture versions, which made version tracking hard. The V4 era switched to explicit model ids, and the V4.1 era continues that with `deepseek-flash`[1].",
        "If you find one of these strings in an old config, replace it with `deepseek-flash`. Do not assume a silent compatibility route exists for ids retired before the V4.1 compatibility policy, and test before you deploy rather than trusting an old tutorial[1].",
      ],
      list: [
        "deepseek-chat: retired July 24, 2026",
        "deepseek-reasoner: retired July 24, 2026",
        "Replace legacy strings with deepseek-flash",
        "Re-run evals after any model-string replacement[1]",
      ],
      note: "Tutorials written before July 2026 may still show these ids. Treat their model field as stale and verify against the current changelog[1].",
    },
    {
      num: "06",
      title: "How Routing Works — and Why It's Risky",
      description:
        "DeepSeek's routing is a server-side alias. The endpoint accepts the old string, resolves it to the current model, and bills at the current model's rate. Your base URL and payload shape do not change[1][2].",
      paragraphs: [
        "That design is convenient for migrations and dangerous for determinism. Requesty and Hacker News commentators made the same point: changing the model behind a pinned, production identifier can invalidate regression testing. The lesson is not to avoid the route, but to detect it[5][7].",
        "Three properties move together when a route changes. Billing follows the serving model, so cost changes. Capabilities follow the serving model, so a text-only id can gain vision. Behavior follows the serving model, so tuned prompts can drift. Any one of those can surprise a team that only watches uptime[1][5].",
      ],
      list: [
        "The retired id still appears in logs unless you log the resolved model",
        "Billing follows the serving model, not the requested id",
        "Capabilities follow the serving model, so a text id can gain vision",
        "Behavior follows the serving model, so tuned prompts may drift[1][5]",
      ],
      note: "Instrument your calls to record the model id you send and, where available, the model that responded. That single log line turns a silent swap into an observable event[5][7].",
    },
    {
      num: "07",
      title: "A Production Incident Prevention Checklist",
      description:
        "A short checklist for teams that depend on DeepSeek model ids in production. Each item maps to a failure this release cycle actually demonstrated[1][5].",
      list: [
        "Never hard-code a retired id when a current one exists",
        "Add a startup assertion that fails if a deprecated id is configured",
        "Run regression evals before and after any announced routing change",
        "Log the resolved or returned model id on every call",
        "Track cost per task, since routing changes the effective rate",
        "Pin reasoning_effort integers, not labels, to avoid cross-source ambiguity",
        "Watch the changelog for the V4.1 Pro launch, which ends the V4-Pro route",
      ],
      paragraphs: [
        "The broader point is that model ids are now living pointers rather than frozen artifacts. Treat them like a dependency that can change under you: pin deliberately, test on change, and keep the migration path in your release notes[5].",
        "Because the same endpoint accepts both formats and both old and new ids, the surface area for silent misconfiguration is larger than it looks. A single integration test that asserts the resolved model and the effort value will catch most surprises before users do[1][5].",
      ],
      note: "DeepSeek has not given a date for V4.1 Pro. When it launches, the `deepseek-v4-pro` compatibility route is expected to end. Re-check the changelog before each quarter and before any major release of your own[1][5].",
    },
  ],
  relatedGuides: [
    { title: "DeepSeek V4 Pro Retired: Why It Routes to V4.1 Flash", slug: "deepseek-v4-pro-retired" },
    { title: "DeepSeek V4.1 Flash API Setup: deepseek-flash & Migration", slug: "v4-1-flash-api-setup" },
    { title: "What Is DeepSeek V4.1 Flash? The 552B MoE, Explained", slug: "deepseek-v4-1-flash" },
    { title: "DeepSeek V4.1 Flash Reasoning Effort: 1-100", slug: "v4-1-flash-reasoning-effort" },
  ],
  sources: [
    { label: "DeepSeek API Changelog (Sept 10, 2026)", url: "https://api-docs.deepseek.com/updates" },
    { label: "DeepSeek-V4.1-Flash: Smarter, Faster, More Efficient (Official)", url: "https://api-docs.deepseek.com/news/news260910/" },
    { label: "DeepSeek Models & Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "The Next Web: V4.1-Flash Launch and V4-Pro Retirement", url: "https://thenextweb.com/news/deepseek-v4-1-flash-launch-v4-pro-retired-price-cut" },
    { label: "VentureBeat: V4.1-Flash Debuts at $0.003/1M Off-Peak", url: "https://venturebeat.com/technology/deepseek-v4-1-flash-debuts-with-0-003-1m-off-peak-cached-input-rate-and-benchmarks-eclipsing-gpt-5-6-sol-claude-opus-5" },
    { label: "Requesty: V4.1 Flash Retires V4-Pro (Pinned Model IDs)", url: "https://www.requesty.ai/blog/deepseek-v4-1-flash-retires-v4-pro-pinned-model-ids" },
    { label: "Hacker News: V4.1 Flash Launch Discussion", url: "https://news.ycombinator.com/item?id=49624603" },
  ],
};
