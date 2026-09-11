import type { GuideContent } from "./types";

// target keyword: deepseek v4 pro retired / 下架
// 内容来源：reference/topics/28-v4-pro-retired-routing.md（2026-09-11）
export const deepseekV4ProRetired: GuideContent = {
  slug: "deepseek-v4-pro-retired",
  category: "RELEASE",
  title: "DeepSeek V4 Pro Retired: Why It Routes to V4.1 Flash",
  seoTitle: "DeepSeek V4 Pro Retired: Routes to V4.1",
  readTime: "9 MIN READ",
  updatedAt: "SEP 11, 2026",
  summary:
    "DeepSeek is phasing out V4-Pro. From Sept 14, 2026 all deepseek-v4-pro requests route to V4.1 Flash at Flash prices — timeline, reasons and developer backlash.",
  toc: [
    { id: "step-1", label: "Step 1: The Official Announcement, Quoted" },
    { id: "step-2", label: "Step 2: September 14, 2026, 12:00 Beijing Time" },
    { id: "step-3", label: "Step 3: Billing: Now Charged at Flash Rates" },
    { id: "step-4", label: "Step 4: Timeline from Preview to Retirement" },
    { id: "step-5", label: "Step 5: Why DeepSeek Is Phasing Out V4-Pro" },
    { id: "step-6", label: "Step 6: Hacker News and the Silent-Reroute Backlash" },
    { id: "step-7", label: "Step 7: What It Actually Changes for You" },
    { id: "step-8", label: "Step 8: Not the Same as the NVIDIA NIM Removal" },
  ],
  steps: [
    {
      num: "01",
      title: "The Official Announcement, Quoted",
      description:
        "DeepSeek broke the news inside its V4.1 Flash release post. The company wrote that tests by multiple parties put V4.1-Flash ahead of V4-Pro on performance, cost, speed and total runtime, and concluded: “We're phasing out V4-Pro”[1].",
      paragraphs: [
        "The follow-up sentence is the operational one: “Starting at 04:00 UTC on Sept 14, 2026, all deepseek-v4-pro requests will route to V4.1-Flash at V4.1-Flash rates. This will continue until V4.1-Pro launches”[1].",
        "Two things stand out. DeepSeek is not deleting the old model id; it is rerouting it. And the reroute is explicitly temporary, a bridge until the architecture family's own flagship, [[deepseek-v4-1-pro|V4.1 Pro]], is ready[1][5].",
      ],
      list: [
        "V4.1-Flash leads V4-Pro on performance, cost, speed and total runtime[1]",
        "deepseek-v4-pro requests reroute to V4.1-Flash[1]",
        "Requests are charged at V4.1-Flash rates[1][2]",
        "The arrangement lasts until V4.1-Pro launches[1]",
      ],
      note: "The pricing page footnote confirms both the rerouting and the billing rule, so this is a documented behaviour rather than a rumour[2].",
    },
    {
      num: "02",
      title: "September 14, 2026, 12:00 Beijing Time",
      description:
        "The effective moment is 04:00 UTC on September 14, 2026, which DeepSeek's announcement and Chinese-language coverage render as 12:00 Beijing time on the same day. From that instant every deepseek-v4-pro call is served by V4.1 Flash[1][4].",
      paragraphs: [
        "The change is server-side and silent from the client's perspective. You keep sending the same request body to the same endpoint with the same model string, and DeepSeek's router decides what actually answers[1][5].",
        "That is exactly the pattern developers find uncomfortable. The API contract looks unchanged while the model behind it changes, which means the usual signal that something needs re-testing, a new model name, never fires[5][6].",
      ],
      note: "If you rely on a pinned model id for reproducibility, this is the moment to check how your provider surfaces the change[9].",
    },
    {
      num: "03",
      title: "Billing: Now Charged at Flash Rates",
      description:
        "The practical upside is a price cut. A deepseek-v4-pro request routed to V4.1 Flash is billed at V4.1 Flash rates, so off-peak output drops from the Pro rate to the Flash rate. DeepSeek's pricing page footnote makes the rule explicit[1][2].",
      table: {
        headers: ["Model / route", "Off-peak output /1M", "Peak output /1M"],
        rows: [
          ["deepseek-v4-pro (old rates)", "$1.98", "$3.96"],
          ["deepseek-v4-pro after Sept 14", "$0.60", "$1.20"],
          ["deepseek-flash (current)", "$0.60", "$1.20"],
        ],
      },
      paragraphs: [
        "Bloomberg Intelligence and press coverage estimated the broader V4.1 Flash launch cut prices by as much as 32 percent relative to the August pricing change, and the V4-Pro reroute inherits that reduction[4][5].",
        "For teams that pinned deepseek-v4-pro for cost predictability, the reroute is a genuine saving. The catch is that the same teams lose the right to assume they know which model is answering[5][9].",
      ],
      note: "Off-peak is roughly half of peak, and peak windows fall on weekday mornings UTC[2].",
    },
    {
      num: "04",
      title: "Timeline from Preview to Retirement",
      description:
        "V4-Pro had a short life. It arrived as a preview on April 24, 2026, reached general availability on August 13, 2026 with the 0813 checkpoint, and was slated for phase-out just a month later when V4.1 Flash launched on September 10[3].",
      table: {
        headers: ["Date (2026)", "Event"],
        rows: [
          ["Apr 24", "V4-Pro / V4-Flash preview launch[3]"],
          ["Jul 31", "V4-Flash-0731 beta; V4-Pro unchanged[3]"],
          ["Aug 13", "V4-Pro GA (0813 checkpoint) across app, web and API[3]"],
          ["Aug 16", "V4 family moves to peak / off-peak pricing[3]"],
          ["Sep 10", "V4.1 Flash launches; V4-Pro phase-out announced[1][3]"],
          ["Sep 14", "All deepseek-v4-pro requests route to V4.1 Flash[1]"],
          ["TBD", "V4.1-Pro launch (no date announced)[1]"],
        ],
      },
      paragraphs: [
        "The compressed timeline explains the reaction. A flagship that reached GA in August was being retired in September, which is unusually fast for a frontier release and signals how quickly DeepSeek wants to consolidate on the new architecture[1][3].",
      ],
      note: "V4.1 Flash also retired the deepseek-v4-flash and deepseek-v4-flash-vision-exp names on the same day, routing both to the new model[1][3].",
    },
    {
      num: "05",
      title: "Why DeepSeek Is Phasing Out V4-Pro",
      description:
        "DeepSeek's stated reason is a straight four-way comparison: V4.1 Flash wins on performance, cost, speed and total runtime. It is the kind of claim every vendor makes, but the rerouting decision is a strong signal the company believes it[1].",
      paragraphs: [
        "Community analysis adds a resource argument. Reddit commenters argued that V4-Pro's 1.6T-parameter, 49B-active design underperformed for its size, and that retiring it frees training capacity for newer models, a plausible motive given the architecture-generational gap[7].",
        "There is also an architectural reason. V4-Pro belongs to the older V4 family, while V4.1 introduces CED, CSA2 and Engram. DeepSeek says the new family targets a higher capability ceiling, faster inference, higher throughput and scaling to larger models, which is why V4.1-Pro, not V4-Pro, is the intended flagship[1][3].",
      ],
      list: [
        "No deleting: the id stays, the serving model changes[1]",
        "A four-way comparison favours V4.1 Flash[1]",
        "Community view: V4-Pro underperformed for its size[7]",
        "A new architecture family supersedes the old one[3]",
      ],
      note: "This is a reroute, not a shutdown. Legacy and current names and their statuses are catalogued on [[deepseek-flash-model-names|the model names guide]][1][3].",
    },
    {
      num: "06",
      title: "Hacker News and the Silent-Reroute Backlash",
      description:
        "The sharpest criticism came from the developer community. On the Hacker News launch thread, commenters argued that swapping the model behind an existing production identifier invalidates regression testing, even when the new model is better and cheaper[6].",
      paragraphs: [
        "VentureBeat made the same point in print, writing that changing the underlying model behind an existing production identifier can invalidate regression testing. Any team that tuned prompts or agent behaviour against V4-Pro now has a backend it did not choose[5][6].",
        "Requesty's analysis of pinned model ids framed it as a governance problem: teams that pin an id for determinism are, by design, telling the provider not to change the model. A reroute overrides that expectation without changing the string the team sees[9].",
      ],
      list: [
        "A silent reroute invalidates regression tests[6]",
        "Prompt- and agent-tuned teams must re-test[5]",
        "Pinned ids no longer guarantee a fixed model[9]",
      ],
      note: "The disagreement is not about whether V4.1 Flash is better; it is about whether a provider should change a live model id without a versioned name[5][6].",
    },
    {
      num: "07",
      title: "What It Actually Changes for You",
      description:
        "For most callers, nothing about the request changes. The base URL and the model name stay the same, so existing code keeps working. What changes is what answers, and therefore what you should verify[1][3].",
      paragraphs: [
        "Capability moves in both directions. On coding and agent benchmarks the routed model is usually stronger: Terminal-Bench 2.1 rises from 87.9 on V4-Pro to 90.6 on V4.1 Flash, and DeepSWE v1.1 jumps from 62.7 to 74.2. But some reasoning items fall, with HLE dropping from 42.7 to 36.8[3][4].",
        "You also gain native vision, which V4-Pro never supported. If your pipeline assumed text-only input, that is an additive capability; if it assumed a particular output style, it is a reason to re-run evaluations[1][4].",
      ],
      list: [
        "No code change required[1]",
        "Billing switches to cheaper Flash rates[1][2]",
        "Coding scores rise while some reasoning scores fall[3]",
        "Native vision becomes available[1]",
        "Re-run regression tests on your own workload[5][6]",
      ],
      note: "The V4-Pro Expert Mode in the app and web UI has no announced successor handling yet, so treat that surface as unsettled[3].",
    },
    {
      num: "08",
      title: "Not the Same as the NVIDIA NIM Removal",
      description:
        "A separate, earlier event is often confused with this retirement. In early August 2026, V4 Pro and Flash were briefly removed from NVIDIA's NIM catalogue, prompting speculation that NVIDIA was freeing servers for other models[8].",
      paragraphs: [
        "That NIM catalogue change happened weeks before the September 10 V4.1 Flash launch, was specific to NVIDIA's hosted catalogue rather than DeepSeek's own API, and was never described by DeepSeek as a retirement. The September 14 reroute is a DeepSeek API decision with an official announcement[1][8].",
        "Keeping the two events apart matters because they imply different remedies. A catalogue removal affects users of that specific platform; the deepseek-v4-pro reroute affects anyone calling DeepSeek's own endpoint. The retirement timeline and the NVIDIA thread are distinct records[1][8].",
      ],
      list: [
        "NIM removal: early August 2026, NVIDIA catalogue only[8]",
        "DeepSeek reroute: September 14, 2026, DeepSeek API[1]",
        "Different scopes, different announcements[1][8]",
      ],
      note: "For forward-looking coverage of the successor, treat V4.1 Pro as unannounced until DeepSeek gives a date[1].",
    },
  ],
  prevGuide: undefined,
  nextGuide: undefined,
  relatedGuides: [
    { title: "DeepSeek V4 Pro: Specs, Pricing & Release Date (2026)", slug: "v4-pro" },
    { title: "DeepSeek V4 Pro Pricing: Peak, Off-Peak & Surge Rates", slug: "v4-pro-pricing" },
    { title: "What Is DeepSeek V4.1 Flash? The 552B MoE, Explained", slug: "deepseek-v4-1-flash" },
    { title: "DeepSeek Flash Model Names: Every ID and Its Status", slug: "deepseek-flash-model-names" },
    { title: "DeepSeek V4.1 Pro: The Next Flagship (Coming Soon)", slug: "deepseek-v4-1-pro" },
  ],
  sources: [
    { label: "DeepSeek-V4.1-Flash: Smarter, Faster, More Efficient (Official)", url: "https://api-docs.deepseek.com/news/news260910/" },
    { label: "DeepSeek Models & Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "DeepSeek API Changelog (Sept 10, 2026)", url: "https://api-docs.deepseek.com/updates" },
    { label: "The Next Web: V4.1-Flash Launch and V4-Pro Retirement", url: "https://thenextweb.com/news/deepseek-v4-1-flash-launch-v4-pro-retired-price-cut" },
    { label: "VentureBeat: V4.1-Flash Debuts at $0.003/1M Off-Peak", url: "https://venturebeat.com/technology/deepseek-v4-1-flash-debuts-with-0-003-1m-off-peak-cached-input-rate-and-benchmarks-eclipsing-gpt-5-6-sol-claude-opus-5" },
    { label: "Hacker News: V4.1 Flash Launch Discussion", url: "https://news.ycombinator.com/item?id=49624603" },
    { label: "Reddit r/SillyTavernAI: V4-Pro Requests Will Route", url: "https://www.reddit.com/r/SillyTavernAI/comments/1wbgxus/all_requests_to_the_deepseekv4pro_model_will_be" },
    { label: "NVIDIA Developer Forums: DeepSeek V4 Pro / Flash Removed", url: "https://forums.developer.nvidia.com/t/deepseek-v4-pro-flash-removed/379558" },
    { label: "Requesty: V4.1 Flash Retires V4-Pro Pinned Model IDs", url: "https://www.requesty.ai/blog/deepseek-v4-1-flash-retires-v4-pro-pinned-model-ids" },
  ],
};
