import type { GuideContent } from "./types";

// target keyword: deepseek server busy
// 词族：deepseek why server is busy / deepseek server busy fix / deepseek server busy reddit /
//       deepseek server busy now / deepseek server busy today / deepseek server busy problem /
//       deepseek server busy please try again later / deepseek server busy extension
// 事实来源：reference/topics/30-deepseek-outage-oct2026.md、reference/topics/29-v4-1-flash-1017.md
//           + 官方 status page / thinking mode 文档 / pricing 文档（联网核实）
export const deepseekServerBusy: GuideContent = {
  slug: "deepseek-server-busy",
  category: "TUTORIAL",
  title: "\"DeepSeek Server Busy\": What It Means & How to Fix It",
  seoTitle: "DeepSeek Server Busy: Meaning & Fixes",
  readTime: "11 MIN READ",
  updatedAt: "OCT 18, 2026",
  summary:
    "DeepSeek's server busy message means queued capacity, not a broken account. Peak-hour timing, Instant mode, backoff and fallback fixes for users and devs.",
  toc: [
    { id: "step-1", label: "Step 1: What the Message Actually Means" },
    { id: "step-2", label: "Step 2: Busy vs a Real Outage" },
    { id: "step-3", label: "Step 3: Why It Happens at Peak Hours" },
    { id: "step-4", label: "Step 4: What \"Use Instant Mode\" Really Means" },
    { id: "step-5", label: "Step 5: Fixes for Regular Chat Users" },
    { id: "step-6", label: "Step 6: The \"Server Busy\" Chrome Extension Question" },
    { id: "step-7", label: "Step 7: For Developers — Retry with Backoff and Jitter" },
    { id: "step-8", label: "Step 8: For Developers — Queues, Breakers, Fallback" },
    { id: "step-9", label: "Step 9: For Developers — Move Batch Work Off-Peak" },
    { id: "step-10", label: "Step 10: What Not to Do, and the Verdict" },
  ],
  steps: [
    {
      num: "01",
      title: "What the Message Actually Means",
      description:
        "The exact wording varies, but the family is unmistakable: \"The server is busy. Please try again later.\" and \"Server is busy. Try again later, or use Instant mode.\"[4] It is the single most reported DeepSeek error, and it is almost always a capacity signal rather than a fault in your account.[3][4]",
      paragraphs: [
        "Read the sentence literally. A busy server is a server that is still running. Your request was not rejected, corrupted, or misconfigured — it arrived at a queue that was already full, and the platform chose to shed it rather than make every caller wait. Independent troubleshooting write-ups describe the same mechanism: when concurrent demand exceeds what the inference cluster can serve at that moment, the load balancer or the queue starts returning busy notices instead of accepting the work.[4]",
        "That distinction matters because it tells you what will not help. Changing your password, clearing cookies, reinstalling the app, switching browsers, or toggling a VPN does nothing to a saturated GPU pool. Users on Reddit reach the same conclusion from the outside, which is why the recurring reply in those threads is not a device fix but a timing or mode workaround.[4]",
        "The second half of the message is the useful half. \"Or use Instant mode\" is not filler — it is DeepSeek telling you that a lighter model path has spare capacity right now. That is the single most actionable clue the interface gives you, and Step 4 unpacks it.[4]",
        "One caveat on vocabulary: busy is a symptom, not an identifier. It can be produced by a genuine capacity crunch, by a partial degradation, or by maintenance. It carries no unique HTTP status of its own in the web app — which is exactly why the next step is about separating busy noise from a real incident.[1][2]",
      ],
      note: "If the message appears once and a rerun succeeds, nothing is wrong at all. A busy notice that clears on the next attempt is normal queueing behaviour on a service running at high utilization, not a bug worth investigating.",
    },
    {
      num: "02",
      title: "Busy vs a Real Outage",
      description:
        "Occasional busy messages and a platform outage look similar from the chat window, but they are different events with different responses. The dividing line is the official status page.[1][2]",
      paragraphs: [
        "DeepSeek publishes a public status page listing each component — the chat service, the V4 Pro API, the V4.1 Flash API, the file upload service and the search service — with long-term uptime figures. Over the July-to-October 2026 window the page reported 99.74% uptime for the V4 Pro API, 99.46% for the V4.1 Flash API, 99.93% for the search service and 100% for file uploads.[1] Those numbers are the baseline you should calibrate against: a platform that is up 99.5% of the time is expected to be degraded or down for roughly three and a half hours across three months.",
        "When there is an active incident, the status page says so explicitly, with a timeline and a named set of affected components. The October 15, 2026 event is the benchmark: the chat service, the V4 Pro API and the V4.1 Flash API were all hit, the web and app clients showed \"server temporarily unavailable\", and the official duration was four hours and fifty-two minutes before full restoration.[2][3] During that window, retrying was pointless. During an ordinary busy spike, retrying after a pause usually works. DeepSeek later returned the prior week's API spend as bonus credit — the [[deepseek-outage-refund|refund mechanics are covered separately]].",
        "Frequency data is the other half of calibration. Caixin counted 13 separate incidents since the start of September 2026, most of them web or API performance degradation, and four of them partial interruptions of both web and API.[3] So a user who sees busy messages a few times a week is not unlucky — that is the expected texture of a service running at this utilization.",
        "The practical rule is short. Check the status page first: an active incident means wait, and do not tune anything. No incident plus intermittent busy means capacity pressure, and every fix in the rest of this guide applies.[1][3]",
      ],
      table: {
        headers: ["Symptom", "Status page", "What it is", "What to do"],
        rows: [
          ["Busy notice, clears on retry", "No incident", "Queue saturation at peak", "Wait 30-120s, retry, or switch mode"],
          ["Busy notice, every retry fails", "Active incident", "Partial or full outage", "Stop retrying; watch status page"],
          ["Web app shows server unavailable", "Incident with timeline", "Component down", "Wait for restoration; use fallback provider"],
          ["Only Expert mode fails, Instant works", "No incident", "Heavy model is hot", "Use Instant mode / deepseek-flash"],
        ],
      },
      note: "Uptime percentages on the status page cover the API services; the chat web app can be degraded without moving those numbers much. Treat the incident timeline, not the uptime figure, as the outage detector.[1]",
    },
    {
      num: "03",
      title: "Why It Happens at Peak Hours",
      description:
        "Busy messages cluster. They are not spread evenly across the day, and DeepSeek publishes the exact windows where its own pricing already implies heavy load: peak hours are 01:00-04:00 and 06:00-10:00 UTC, Monday through Friday, excluding Chinese public holidays.[6]",
      paragraphs: [
        "Those two windows are the periods DeepSeek charges full price for, and off-peak hours are billed at half the peak rate. A vendor does not discount half of the clock for no reason — the discount exists because demand, and therefore contention for inference capacity, is concentrated in the peak windows and slack elsewhere.[6]",
        "Translated into local time, the peak windows land squarely on the Chinese workday: 01:00-04:00 UTC is 09:00-12:00 in Beijing, and 06:00-10:00 UTC is 14:00-18:00 in Beijing. That is the morning block and the afternoon block of the busiest market for the service, which is why users outside China feel the pressure most in their own evening or small hours.[6]",
        "Release surges sit on top of the daily curve. The V4 Preview launch in April 2026 and the V4.1-Flash-1017 checkpoint in October 2026 both drew a wave of new traffic, and the days after a release are exactly when capacity complaints peak. The pattern generalizes: a new model, a viral demo, or a heavy agent workload all push the same inference pool harder.[2]",
        "For a developer this is actionable rather than merely interesting. If your jobs fail most often at a particular hour, that hour is telling you where your queue belongs. Step 9 turns that observation into a scheduling decision that also cuts the bill in half.[6]",
      ],
      list: [
        "Peak: 01:00-04:00 UTC and 06:00-10:00 UTC, Monday to Friday",
        "Peak windows equal Beijing working hours (09:00-12:00 and 14:00-18:00)",
        "Weekends and Chinese public holidays are off-peak in full",
        "Launch weeks and viral moments add a demand spike on top of the daily curve",
        "Everything outside peak is billed at half the peak rate[6]",
      ],
    },
    {
      num: "04",
      title: "What \"Use Instant Mode\" Really Means",
      description:
        "The busy message often suggests Instant mode, and that suggestion is a real load-balancing hint. In the DeepSeek chat interface, Instant mode and Expert mode map to different models, and one of them has far more headroom under pressure.",
      paragraphs: [
        "Instant mode runs the fast, lightweight model — on the chat site and app that is the V4-Flash line — while Expert mode routes to the heavier reasoning model, V4-Pro. When inference capacity is tight, the heavy model is the one that saturates first, because every request against it occupies far more compute for far longer. Switching to Instant is therefore not a downgrade you settle for; it is choosing the lane with spare capacity.[4]",
        "There is a second layer, and it is the one API users control directly. DeepSeek's thinking mode is enabled by default, and the default reasoning effort is high. That is the mechanism behind the disclaimer shown in the API documentation, and it is why a \"think hard\" request costs more wall-clock time and more capacity than a plain one.[5]",
        "In the web interface this shows up as the thinking or deep-reasoning toggle. Turning it off for ordinary questions — rewriting an email, summarizing a document, answering a factual question — removes the queue-sensitive part of the request entirely. The troubleshooting literature converges on the same advice: short prompts with reasoning off clear the queue far more reliably than a very long paste with thinking on.[4]",
        "On the API side the toggle is explicit and cheap to implement. Setting thinking to disabled, or reasoning effort to none, gives you the non-thinking path. That is the developer equivalent of clicking Instant mode, and it is worth exposing as a fallback: when a thinking-mode call is shed or times out, retry the same prompt with thinking disabled before you give up on the provider.[5] If you have not provisioned a key yet, [[v4-1-flash-api-setup|the API setup guide]] covers the base URL and model id.",
      ],
      code: `// OpenAI-compatible: skip the reasoning pass under load
const response = await client.chat.completions.create({
  model: "deepseek-flash",
  messages,
  // non-thinking path — the API equivalent of chat's "Instant mode"
  extra_body: { thinking: { type: "disabled" } },
});`,
      note: "Do not disable thinking for tasks that genuinely need it — multi-step maths, code debugging, long-context analysis. The ordering that works is: try thinking mode, and only fall back to the non-thinking path when the request is shed or slow.[5]",
    },
    {
      num: "05",
      title: "Fixes for Regular Chat Users",
      description:
        "If you are using chat.deepseek.com or the mobile app and the busy notice keeps appearing, these are the moves that actually change your odds. None of them require installing anything.",
      list: [
        "Wait 30 to 120 seconds and send once more. One polite retry clears most busy notices.[4]",
        "Switch from Expert mode to Instant mode when the heavy model is hot — the message itself suggests it.[4]",
        "Turn thinking off for simple questions; drop the mode that consumes the most capacity.[4][5]",
        "Shorten the prompt. A huge paste at peak load is shed far more often than a targeted question.[4]",
        "Shift your session out of the peak windows: 01:00-04:00 and 06:00-10:00 UTC on weekdays.[6]",
        "Check the status page before assuming anything is your fault; an incident means waiting is the only fix.[1]",
        "Prefer the API over the web interface if you have a key — programmatic requests can retry and back off for you.",
        "If web chat is the bottleneck, a hosted third-party endpoint is an option, with the data caveats below.",
      ],
      paragraphs: [
        "The single highest-leverage change for most users is mode, not network. Users who report that the busy error \"only ever happens in Expert mode\" have already diagnosed it: the heavy model is the contended resource, and Instant mode exists precisely to absorb that traffic. Keep thinking mode on for the questions that earn it, and turn it off for the rest.[4][5]",
        "Timing is the second lever. If you are in Europe or the Americas, the peak windows fall in your evening and small hours, which means a late-morning or mid-afternoon session in your own timezone is often off-peak. Shifting a recurring task — a daily digest, a batch of rewrites — by a few hours frequently removes the failures without any code change.[6]",
        "Using the API instead of the web interface is a genuine upgrade for anyone hitting busy regularly. Web chat hides the queue from you and gives you no retry policy; an API call returns a status you can branch on, and a retry loop can wait patiently for capacity. You keep the same model family and, with cache hits, often pay very little: input cache-hit pricing starts at $0.006 per million tokens at peak on the Flash line, and the full [[v4-1-flash-pricing|peak versus off-peak table]] is worth bookmarking.[6]",
        "Third-party hosting is the last resort, not the first. Reseller platforms and aggregators do keep DeepSeek-family models online when the first-party endpoint is saturated, because they run their own capacity. But your prompts and any attached data leave the official trust boundary and land in another operator's account, with their own retention and logging policies. For throwaway questions that is fine; for internal documents, client data or anything regulated, it is not a trade you should make casually.[4]",
      ],
      note: "Switching networks, clearing cache, or reinstalling the app does not create inference capacity. If a fix is not changing which model you call, how big your request is, or when it runs, it is not a fix.",
    },
    {
      num: "06",
      title: "The \"Server Busy\" Chrome Extension Question",
      description:
        "Search for the busy error and you will find browser extensions that promise to fix it, including ones named directly after the error that automatically resend the request until a reply comes back. We do not recommend installing them, and the reason is worth stating plainly.[4]",
      paragraphs: [
        "Understand what the extension can and cannot do. It cannot give DeepSeek more GPUs, and it cannot move your request to the front of a queue. All it does is automate clicks: detect the busy banner, wait, and send the request again. That is behaviour you can reproduce with one manual retry or, better, with an API retry loop you control.[4]",
        "The cost is trust. An extension that operates on the DeepSeek site has to run inside your logged-in page. That is the same origin that holds your session token, and any extension with the right host permissions can read the page it is injected into — including your conversation history, your prompts, and whatever you paste in. A content script that reads the chat DOM to detect the busy banner is, technically, a content script that can read the chat DOM. Whether it does anything else depends entirely on who wrote it and whether they maintain it in good faith.",
        "There is also a supply-chain angle that has nothing to do with the original author. Extensions change owners, ship silent updates and get abandoned. A tool you installed because it was small and simple can gain a new permission in an update you never review. Installing an unlisted, single-purpose extension for a problem that a manual retry already solves is a bad risk-to-reward trade.",
        "The honest alternative costs nothing. Retry once by hand after a minute. If you need automation, write it against the API, where you own the credentials, the retry policy and the logs. And if you do decide to use any extension, read its permission list first: anything asking for access to all sites, or to your cookies, is far more access than a retry button needs.[4]",
      ],
      note: "Never paste an API key, a session token, or private documents into a chat window while an unknown extension is active on that page. The risk is not hypothetical — it is the exact access level these extensions request.",
    },
    {
      num: "07",
      title: "For Developers — Retry with Backoff and Jitter",
      description:
        "If you call the DeepSeek API, busy messages arrive as HTTP status codes, mainly 429 and 5xx. The correct response is bounded exponential backoff with jitter, and the correct scope is narrow: retry only errors that are genuinely transient.[2]",
      paragraphs: [
        "The standard triage rule is short. Retry 408, 429 and 5xx. Do not retry other 4xx codes without changing the request, and top up on 402 before retrying at all. A retried 400 is a 400 forever, and each attempt still spends your rate limit. Getting this boundary wrong is the most common way a retry layer turns a provider hiccup into a self-inflicted outage.[2]",
        "Jitter is the part people skip and the part that matters at scale. If a thousand clients all back off by exactly two seconds, they all return at the same instant and reproduce the stampede. Full jitter — sleeping a random duration between zero and the computed cap — spreads the retries out and is what turns a thundering herd into a steady trickle.",
        "Bound everything. Cap the number of attempts, cap the total delay, and set a per-request timeout so a hung connection is not held open for minutes. When a provider is genuinely down, as on October 15, 2026, the right behaviour is to fail fast after a couple of attempts and let the breaker open, not to accumulate an unbounded retry queue that all fires the moment service returns.[2][3]",
      ],
      code: `const RETRYABLE = new Set([408, 429, 500, 502, 503, 504]);

async function withBackoff<T>(fn: () => Promise<T>, maxAttempts = 5): Promise<T> {
  let attempt = 0;
  for (;;) {
    try {
      return await fn();
    } catch (err: any) {
      const status = err?.status ?? err?.response?.status;
      // network-layer failures have no status; treat them as transient
      const transient = status === undefined || RETRYABLE.has(status);
      attempt += 1;
      if (!transient || attempt >= maxAttempts) throw err;
      const cap = Math.min(30_000, 500 * 2 ** attempt);
      const delay = Math.random() * cap; // full jitter
      await new Promise((r) => setTimeout(r, delay));
    }
  }
}`,
      note: "Never retry in a tight loop. Aggressive retries do not beat a full queue; they add load, burn your rate limit, and can get a well-behaved client throttled. If the plain paths are still saturated, the [[deepseek-api-error-codes|error codes reference]] maps the rest of the surface.",
    },
    {
      num: "08",
      title: "For Developers — Queues, Breakers, Fallback",
      description:
        "Retries handle a blip. They do not handle a five-hour outage, and they do not stop a saturated queue from absorbing your whole workload. Three architectural pieces do: an explicit queue, a circuit breaker, and a second provider.[2]",
      paragraphs: [
        "Serializing your own traffic is the first win. A queue with a fixed concurrency ceiling and a retry-on-failure policy turns a burst of parallel calls into a metered stream, which is precisely what a busy endpoint wants. It also gives you a place to persist work: non-urgent jobs that fail can be replayed later instead of being lost, which converts an outage from a data-loss event into a delay.",
        "The circuit breaker is the piece that keeps a five-hour outage from becoming a five-hour pile of timeouts. Track the error rate per provider; when it crosses a threshold, stop sending traffic and fail fast for a cool-down window, then probe with a single request. A breaker that opens within a minute of an incident does more for your tail latency than any amount of retry tuning, because it stops the queue from growing while the provider is dark.[2]",
        "Fallback is the backstop. Register a second provider with a different base URL and a different model behind the same interface, and fail over only on errors that mean the provider cannot serve you: connection failures, 429, and 5xx. Do not fail over on a 400 — that is your bug, and the second provider will reject it identically.",
        "Two disciplines make fallback safe. First, re-run your evaluation suite on the fallback model before you trust it in production, because a different model will drift on structured output, tool calling and formatting. Second, log which provider served each request, so that a quality regression later can be traced to the failover rather than blamed on the primary. Cache aggressively as well: DeepSeek's own endpoint sees very high cache hit rates, and for repeated prompts a cache hit is both cheaper and instant.[6]",
      ],
      list: [
        "Queue your own requests behind a fixed concurrency ceiling",
        "Open a circuit breaker on sustained 429/5xx and probe back slowly",
        "Fail over to a second provider only on transient errors — never on 4xx",
        "Re-run evals after any failover; different models drift on structured output",
        "Log the serving provider per request for later attribution",
        "Cache deterministic prompts; cache hits are cheap and never queued[6]",
      ],
      note: "A single provider is a single point of failure by definition, and the outage record makes that concrete: the chat service and both APIs failed together on October 15, 2026.[2][3] If your product depends on DeepSeek being up, the fallback is not optional polish.",
    },
    {
      num: "09",
      title: "For Developers — Move Batch Work Off-Peak",
      description:
        "The most underrated fix is also the cheapest: schedule bulk work into the hours that are both emptier and half price. Peak is 01:00-04:00 and 06:00-10:00 UTC, Monday to Friday; everything else is off-peak and billed at half the peak rate.[6]",
      paragraphs: [
        "This is the rare optimization where the cost and the reliability incentives point the same way. Off-peak hours have spare inference capacity, so fewer of your requests are shed, and they carry a 50% discount, so the same job costs half as much. You are not choosing between reliability and budget; you are collecting both.[6]",
        "The arithmetic is straightforward on the Flash line. At peak, input at a cache miss is $0.30 per million tokens and output is $1.20 per million; off-peak those fall to $0.15 and $0.60. A nightly job that reprocesses a document corpus, refreshes an embedding index, or regenerates a content backlog is a natural fit — it does not need to run at midday, and moving it halves its bill while removing its exposure to the busiest hours.[6]",
        "The scheduling rules to encode are simple. Exclude the two peak windows in UTC rather than in local time, because UTC is what the pricing definition uses and daylight-saving shifts will otherwise move your job into a peak window twice a year. Treat weekends and Chinese public holidays as fully off-peak and, being emptier, ideal for the heaviest batches. Keep interactive traffic on the fast path regardless — a user waiting for an answer cannot be queued until 22:00 UTC.[6]",
        "One design pattern closes the loop. Mark every job as interactive or batch at creation time. Route batch jobs through the queue from Step 8 and prefer off-peak scheduling for anything not marked interactive, with interactive work allowed to burst at any hour and fail over to the fallback provider when it is shed. That single split captures the discount, dodges the busiest windows, and keeps latency-sensitive traffic out of the queue.[2][6]",
      ],
      code: `# Run the nightly batch at 22:30 UTC — off-peak everywhere, and half price.
on:
  schedule:
    - cron: "30 22 * * 1-5"   # weekdays, outside 01:00-04:00 and 06:00-10:00 UTC
jobs:
  batch:
    steps:
      - run: python batch_generate.py --tier batch --prefer-off-peak`,
      note: "Do not schedule a job at 00:55 UTC or 05:55 UTC and assume it is safe. A long job that starts just before a peak window will spend most of its runtime inside it. Offset the start by at least the expected job duration.[6]",
    },
    {
      num: "10",
      title: "What Not to Do, and the Verdict",
      description:
        "Most of the advice circulating about this error is noise. Here is what to skip, and the short version of what to do instead.",
      paragraphs: [
        "Do not install an unlisted browser extension to \"fix\" the busy error. It cannot add capacity, it runs inside your authenticated session, and the retry behaviour it provides is something you can do yourself or reproduce safely against the API.[4]",
        "Do not hammer retry. A tight loop of regenerations does not beat a full queue. It adds load, spends your own rate limit, and in the worst case gets your account throttled exactly when you need it most. One retry after a pause, then back off properly or fall over to another provider.[2][4]",
        "Do not assume your account or your device is at fault. The error is server-side by construction, and the same message appears for large numbers of users during a launch week or a peak window. Check the status page, then act on timing and mode.[1][4]",
        "Do not treat uptime percentages as a guarantee. The status page's July-to-October 2026 figures — 99.74% for the V4 Pro API and 99.46% for the V4.1 Flash API — are honest numbers, and they still describe hours of degraded service per quarter. Plan for it rather than being surprised by it.[1]",
        "The verdict, in one line for each audience. If you are chatting: switch to Instant mode, turn thinking off for simple questions, retry once after a minute, and shift your sessions out of the 01:00-04:00 and 06:00-10:00 UTC weekday windows.[4][5][6] If you are building: retry with jittered backoff on 429 and 5xx, queue and break rather than pile up, keep a second provider behind your interface, and push batch work into the half-price off-peak hours.[2][6]",
        "That is the whole game. The busy message is not a mystery to be solved or a bug to be reported — it is a load signal, and the correct response is to change which model you call, how hard you call it, and when you call it.",
      ],
      list: [
        "Skip unknown retry extensions that act on your logged-in session",
        "Skip tight retry loops that burn your own quota",
        "Skip device-side fixes: cache, VPN, reinstall, browser swaps",
        "Chat users: Instant mode, thinking off, one polite retry, off-peak timing",
        "Developers: jittered backoff, queue, circuit breaker, provider fallback",
        "Everyone: schedule heavy work into the half-price off-peak windows",
      ],
      note: "If the busy error is happening right now, start with the [[deepseek-down|live outage check]] and come back for the fixes. If you need to know exactly which status code you were handed, the [[deepseek-api-error-codes|error codes reference]] has the full mapping.",
    },
  ],
  prevGuide: { title: "DeepSeek Down? Live Status and Outage Tracker", slug: "deepseek-down" },
  nextGuide: { title: "DeepSeek Outage Refund: How the 7-Day Credit Works", slug: "deepseek-outage-refund" },
  relatedGuides: [
    { title: "DeepSeek Down? Live Status and Outage Tracker", slug: "deepseek-down" },
    { title: "DeepSeek API Error Codes Explained", slug: "deepseek-api-error-codes" },
    { title: "DeepSeek Outage Refund: How the 7-Day Credit Works", slug: "deepseek-outage-refund" },
    { title: "DeepSeek V4.1 Flash Pricing: Peak vs Off-Peak", slug: "v4-1-flash-pricing" },
    { title: "DeepSeek V4.1 Flash API Setup: Base URL & Model ID", slug: "v4-1-flash-api-setup" },
  ],
  sources: [
    { label: "DeepSeek Status — official service status and incident history", url: "https://status.deepseek.com/" },
    { label: "TechNode: DeepSeek implements fix after partial outage affects chat and API services (Oct 15, 2026)", url: "https://technode.com/2026/10/15/deepseek-implements-fix-after-partial-outage-affects-chat-and-api-services/" },
    { label: "Caixin Global: DeepSeek restores services after nearly five-hour outage (Oct 16, 2026)", url: "https://www.caixinglobal.com/2026-10-16/deepseek-restores-services-after-nearly-five-hour-outage-102493794.html" },
    { label: "Reddit r/DeepSeek: \"Server is busy. Try again later, or use Instant mode\"", url: "https://www.reddit.com/r/DeepSeek/comments/1th89w3/server_is_busy_try_again_later_or_use_instant_mode/" },
    { label: "DeepSeek API Docs: Thinking Mode", url: "https://api-docs.deepseek.com/guides/thinking_mode" },
    { label: "DeepSeek API Docs: Models and Pricing (peak vs off-peak)", url: "https://api-docs.deepseek.com/quick_start/pricing" },
  ],
};
