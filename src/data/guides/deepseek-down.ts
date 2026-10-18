import type { GuideContent } from "./types";

// target keyword: deepseek down
// 词族：is deepseek down / deepseek outage / deepseek outage today / deepseek down reddit /
//       deepseek status / deepseek is down right now / deepseek servers down /
//       deepseek problems today / deepseek major outage / deepseek status page / deepseek api down
// 事实来源：reference/topics/30-deepseek-outage-oct2026.md（官方 status page incident / Caixin /
//           SCMP / CGTN / TechNode / dev.to 复盘）+ 官方 API 错误码文档
export const deepseekDown: GuideContent = {
  slug: "deepseek-down",
  category: "NEWS & UPCOMING",
  title: "Is DeepSeek Down Right Now? Outage History and Status Check",
  seoTitle: "Is DeepSeek Down? Status & Outage History",
  readTime: "10 MIN READ",
  updatedAt: "OCT 18, 2026",
  summary:
    "How to tell a DeepSeek outage from a problem on your side: the official status page, the Oct 15 2026 timeline, error-code triage and failover setup.",
  notice:
    "Latest major event: October 15, 2026 — chat, V4-Pro API and V4.1-Flash API degraded for 4h52m. Compensation covered October 8–14 API spend[1][3]. See [[deepseek-outage-refund|how to check your credit]].",
  toc: [
    { id: "step-1", label: "Step 1: Is It You, or Is It DeepSeek?" },
    { id: "step-2", label: "Step 2: Check the Official Status Page First" },
    { id: "step-3", label: "Step 3: The Oct 15, 2026 Outage, Minute by Minute" },
    { id: "step-4", label: "Step 4: How Often Does DeepSeek Actually Go Down?" },
    { id: "step-5", label: "Step 5: Read Your Error Code Before Blaming the Server" },
    { id: "step-6", label: "Step 6: Rule Out Your Own Setup" },
    { id: "step-7", label: "Step 7: Verify With a Second Provider" },
    { id: "step-8", label: "Step 8: Build So the Next Outage Costs You Nothing" },
    { id: "step-9", label: "Step 9: What DeepSeek Has Said, and What It Has Not" },
  ],
  steps: [
    {
      num: "01",
      title: "Is It You, or Is It DeepSeek?",
      description:
        "When DeepSeek stops answering, there are only two possibilities, and they need opposite responses. Either the service itself is degraded, or something in your own path — key, balance, network, config — is broken. The whole job of this page is to separate those two cases in under two minutes.",
      paragraphs: [
        "The first case is real and not rare. On October 15, 2026, DeepSeek's chat service, the V4-Pro API and the V4.1-Flash API all degraded at the same time, with the chat service fully offline for part of the window, and the official status page logged the total disruption at 4 hours 52 minutes[1][3][6]. When three separate components fail together, no amount of client-side debugging will help you.",
        "The second case is more common day to day. An expired key, an exhausted balance, a rotated model name, a corporate proxy that drops long POST bodies, or a local rate limiter will all produce what looks like an outage from the inside. If you are running a coding agent through a wrapper such as [[flash-opencode|OpenCode with Flash]], the failure can also be in the wrapper rather than the API.",
        "So the diagnosis order matters. Work outward from the provider to yourself, never the other way around, because the provider check is one page and costs nothing:",
        "That order is also the structure of this guide. Steps 2 through 5 handle the service side — status page, outage record, frequency, and the error codes that tell you which side failed. Steps 6 through 8 handle your side, and then remove the problem permanently by adding failover so that the next outage degrades your product instead of stopping it.",
      ],
      list: [
        "Step 1 — Open the official status page and read the component-level state[2]",
        "Step 2 — Read the exact HTTP status your call returned; it names the guilty side[8]",
        "Step 3 — Test a second network and a second key to exclude local causes",
        "Step 4 — Call a different provider: if that works, the fault is DeepSeek's, not your link",
      ],
      note: "If the status page says operational and your calls still fail, stop reading about outages. Go straight to [[deepseek-api-error-codes|the error codes reference]] — a 401 or a 402 is your account, not DeepSeek[8].",
    },
    {
      num: "02",
      title: "Check the Official Status Page First",
      description:
        "DeepSeek publishes service health at status.deepseek.com. It is the only source that speaks for the provider, it is updated during incidents, and it lists components separately rather than as one blob, which is what lets you tell a partial failure from a total one[1][2].",
      paragraphs: [
        "Read it at the component level. The page tracks the chat service, the V4-Pro API and the V4.1-Flash API as distinct entries, so an incident affecting only the API while chat stays up is visible as exactly that[2]. During the October 15, 2026 event all three entries degraded together, which is rare and is the reason so many people simultaneously concluded that everything was down[1][6].",
        "Each incident gets a permanent URL under status.deepseek.com/incidents/, and the October 15 record is /incidents/7116348214287[1]. Those pages carry the timestamps you need for claims: degradation start, full outage, transition into monitoring, and restoration. Keep the incident URL for the event you are citing rather than linking the bare status page, because the front page rotates as new incidents are published.",
        "Current component state, not history, is the thing to read when you are mid-outage. The convention on the page is simple: degraded performance means the service answers but slowly or with elevated error rates; partial outage means some requests succeed; major outage means the component is not serving. The September-through-October period shows all three labels in use, most often degraded performance[2][3].",
        "Two habits make this page far more useful. First, check permission cost: reading it takes fifteen seconds, and it answers the most common customer-support question before you open a ticket. Second, treat DownDetector-style crowd reports as a secondary signal, not a source of truth. DownDetector showed hundreds of user reports on October 1, 2026, but crowd data reflects user frustration, not provider status, and it lags and over-reports during partial incidents[3].",
      ],
      note: "This site is independent and not affiliated with DeepSeek. The status page is the provider's own publication; everything else here is context that helps you read it correctly.",
    },
    {
      num: "03",
      title: "The Oct 15, 2026 Outage, Minute by Minute",
      description:
        "The October 15, 2026 incident is the reference case for this page, so it is worth knowing the exact shape of it. What began as degraded API performance ended as a multi-component interruption that took the chat service completely offline for part of the window and was closed out at 4 hours 52 minutes[1][3][6].",
      table: {
        headers: ["Milestone", "Beijing (CST)", "UTC", "California (PDT)"],
        rows: [
          ["Degradation begins; V4-Pro and V4.1-Flash API hit first", "Oct 15, 08:11", "Oct 15, 00:11", "Oct 14, 17:11"],
          ["Chat service fully offline; web and app show server unavailable", "Oct 15, 09:08", "Oct 15, 01:08", "Oct 14, 18:08"],
          ["Status page moves the incident into monitoring", "Oct 15, 12:49", "Oct 15, 04:49", "Oct 14, 21:49"],
          ["All services restored", "Oct 15, 13:04", "Oct 15, 05:04", "Oct 14, 22:04"],
          ["Official duration for the whole event", "4h 52m", "4h 52m", "4h 52m"],
        ],
      },
      paragraphs: [
        "The affected surface is the interesting part: the conversation service, the DeepSeek-V4-Pro API and the DeepSeek-V4.1-Flash API were all impaired within the same window[1][6]. That combination matters for developers, because it means a fallback pinned to the other DeepSeek model would not have saved you. V4-Pro and V4.1-Flash both failed, so an intra-vendor failover buys nothing when the outage is at the platform layer.",
        "The lesson for anyone reading this mid-incident is that the status page transitioned to monitoring at 12:49 and restoration was declared at 13:04, a fifteen-minute verification window rather than a second outage. If you see the page move to monitoring, your requests should be succeeding again; if they are not, retest your own configuration before assuming the incident reopened.",
        "Note that DeepSeek's official duration is measured across the entire event, from the first degradation to full restoration. Third-party write-ups of the same incident quote the same 4h52m figure[3][7], which makes it the safest number to cite. Shorter durations circulating in comment threads usually describe only the chat-service blackout, which ran from 09:08 to 13:04 Beijing time.",
      ],
      note: "For the compensation terms attached to this incident — which API spend was refunded and how it is credited — see [[deepseek-outage-refund|the refund walkthrough]]. The short version is that the refund covered the week before the outage, not the outage hours[3][5].",
    },
    {
      num: "04",
      title: "How Often Does DeepSeek Actually Go Down?",
      description:
        "The honest answer is that full outages are uncommon but degradation is frequent. Caixin's tally counted 13 service disruptions since September 2026, most of them web and API performance degradation, with four of them amounting to partial web-and-API interruptions[3].",
      paragraphs: [
        "Media coverage placed the October 15 event as the fifth outage of October alone, coming two weeks after a wave of DownDetector reports on October 1, 2026[3]. Those two data points describe different things — one is a provider-published incident, the other is user-reported volume — but together they explain why DeepSeek reliability has become a visible topic rather than a private engineering concern.",
        "The uptime figures are the number to internalize, and they are good rather than bad. Over July through October 2026 the status page reported 99.91% uptime for the V4-Pro API and 99.47% for the V4.1-Flash API[2]. One alternate reading of the V4-Pro figure lists 99.74% instead, and it is worth flagging that discrepancy rather than pretending a single authoritative number exists: status-page uptime is measured on the monitoring service's own probe, so sliding-window boundaries and whether a degraded interval counts as partial downtime both move the result.",
        "Translate those percentages into time, because that is what you actually plan around. At 99.91%, monthly downtime budget is roughly 39 minutes. At 99.47%, it is roughly 3.8 hours. An afternoon-long incident on a single day is entirely consistent with a ninety-nine-point-something annual figure — which is why a single outage in the news does not mean the service is unusable, and also why any product built on one provider needs a plan for that afternoon.",
      ],
      table: {
        headers: ["Metric", "Reported figure", "Basis"],
        rows: [
          ["Disruptions since September 2026", "13", "Caixin tally; most were web/API performance degradation[3]"],
          ["Of those, partial web-and-API interruptions", "4", "Caixin tally[3]"],
          ["October 2026 count as of Oct 15", "The fifth", "Media tally reported Oct 15–16[3]"],
          ["Oct 1, 2026 user reports", "Hundreds of users", "DownDetector crowd signal, not provider-published[3]"],
          ["V4-Pro API uptime, Jul–Oct 2026", "99.91% (an alternate reading lists 99.74%)", "Official status page[2]"],
          ["V4.1-Flash API uptime, Jul–Oct 2026", "99.47%", "Official status page[2]"],
        ],
      },
      note: "Uptime percentages are self-reported on DeepSeek's own status page and are not an independent audit. Treat them as the provider's best account of its own availability, and verify with your own error-rate metrics — which is what step 8 sets up[2].",
    },
    {
      num: "05",
      title: "Read Your Error Code Before Blaming the Server",
      description:
        "The HTTP status on your failed call is the single most useful diagnostic you have, and it answers the framing question directly: server-side codes mean DeepSeek, account-side codes mean you. DeepSeek's own error documentation splits the same way[8].",
      table: {
        headers: ["Status", "What it means", "Whose side"],
        rows: [
          ["500 / 502 / 503 / 504", "Server error, upstream failure, or gateway timeout", "DeepSeek — outage or overload"],
          ["429", "Rate limit or quota exceeded for the calling account", "Your traffic pattern"],
          ["401", "API key missing, revoked, or malformed", "Your credentials"],
          ["402", "Insufficient account balance", "Your billing"],
          ["400", "Malformed request body or invalid parameter", "Your payload"],
          ["408", "Reading the request body timed out", "Network or client timeout"],
        ],
      },
      paragraphs: [
        "The practical rule that follows from this table is the failover rule. A network-layer failure with no status at all, a 429, or any status of 500 and above are the only conditions where retrying against a second provider is the correct action[8]. Every other 4xx is a statement about your request, your key, or your balance, and retrying it elsewhere just moves the same broken call to a different server.",
        "There is a second trap hidden in the 429 case. Rate limits in current DeepSeek deployments are enforced per account rather than per key, so minting additional keys does not multiply your throughput — it creates several keys that share one ceiling[8]. If you are seeing 429 during an incident, the cause may be that your own retry logic is amplifying load rather than that DeepSeek is saturated. Check [[deepseek-server-busy|the server-busy guide]] for that pattern.",
        "Keep the raw response body as well as the status. During incidents, providers sometimes return a 503 with a body that names the upstream component, and that body is worth capturing in logs because it identifies whether you hit a gateway, a model server, or something else entirely. Log the status, the body, the request id and the timestamp for every failed call; during the next incident those four fields turn a guess into a diagnosis.",
      ],
      note: "If your error surface is unfamiliar, work through [[deepseek-api-error-codes|DeepSeek API error codes explained]] once while everything is healthy. Reading that page for the first time in the middle of an outage is a waste of the outage.",
    },
    {
      num: "06",
      title: "Rule Out Your Own Setup",
      description:
        "Once the status page reads operational and your code is a 4xx rather than a 5xx, the remaining work is local. This is a checklist, not a narrative — run it in order and stop at the first hit.",
      list: [
        "Confirm the status page shows all components operational at this moment[2]",
        "Re-read the status code: 401 means check the key, 402 means check the balance[8]",
        "Verify the base URL and the exact model id you are sending; a renamed model returns a 400-class error rather than a silent fallback[8]",
        "Re-send the same request with curl from your machine and from a different network to separate client libraries, proxies and ISP paths",
        "Rotate to a fresh key and retry once — a revoked key is indistinguishable from an outage in a broken client",
        "Check for a local rate limiter or agent-side concurrency cap that is rejecting calls before they leave your process[8]",
        "Confirm your account is actually live by listing models, which requires no completion tokens and cannot be rate-limited by generation load",
      ],
      paragraphs: [
        "The curl step earns its place. Client libraries add retries, timeouts and header defaults that can turn a working endpoint into a failing one, and a raw HTTP call is the fastest way to remove all of them. If curl succeeds and your application fails, the outage was never DeepSeek's — it was in your stack.",
        "Configuration errors cluster around upgrades. If you changed model names or endpoints recently, the first suspect is your own diff, not the provider. The base URL, the model id and the authentication header for the current Flash line are documented in [[v4-1-flash-api-setup|the V4.1 Flash API setup guide]], and confirming them against a known-good page takes a minute[8].",
      ],
      note: "One asymmetry is worth remembering: provider-side failures affect many users at once, so the status page and community reports light up. If nobody else reports trouble and your status page is green, the prior probability is strongly on your side of the wire.",
    },
    {
      num: "07",
      title: "Verify With a Second Provider",
      description:
        "The decisive test is to send a comparable request down a different path. If a second provider answers, the fault is DeepSeek's. If nothing answers, your network is the common factor and the outage is local.",
      paragraphs: [
        "For this test to mean anything, the second path must be genuinely different: a different vendor or a different routing layer, a different base URL, and ideally a different network egress. Calling the other DeepSeek model from the same process on the same host proves very little, and on October 15, 2026 it would have proved nothing at all, since V4-Pro and V4.1-Flash were both impaired[1][6].",
        "A routed or aggregator endpoint is the cheapest second path for most developers. If your stack already reaches models through an OpenAI-compatible gateway, the same client code can be pointed at a different base URL with a different model name, which makes the test a configuration change rather than a project. [[flash-openrouter|Routing Flash through OpenRouter]] covers that setup for this model line, including the model identifiers to use.",
        "Interpret the outcome carefully in both directions. Second provider works, first fails — DeepSeek-side incident or an account problem, which the error code from step 5 already told you. Both fail — network, DNS, proxy or local firewall, and you should test the same request from a mobile hotspot or a second machine before touching any application code. Both work — the failure was transient and most likely a retry that succeeded on a second attempt, which is itself a signal that your timeout and retry settings need review.",
      ],
      note: "Do not build the second path only when you need it. Provisioning a fallback during an incident means fighting a provider's signup flow while your product is down. Set it up on a quiet Tuesday — see step 8.",
    },
    {
      num: "08",
      title: "Build So the Next Outage Costs You Nothing",
      description:
        "Given 13 disruptions since September 2026 and four partial web-and-API interruptions in that window, treating an outage as a surprise is a choice rather than bad luck[3]. A single-provider design is a single point of failure by construction, and the fix is a small amount of ordinary engineering.",
      paragraphs: [
        "Start with the failover predicate, because getting it wrong causes more damage than having no fallback at all. Failover belongs on network failures, throttling and server errors; 4xx responses that describe your own request should never be retried anywhere, because a retry against a second provider produces the same error and hides the real problem[8].",
        "Then add the three controls that turn a five-hour outage into a degraded hour rather than a queue you never recover from. A request timeout in the range of twenty seconds stops a stalled connection from holding a worker. A maximum retry count with backoff stops retry storms, which matter because limits are enforced per account and your own amplification can look like provider saturation[8]. A circuit breaker that trips after a small number of consecutive failures stops you from pouring traffic into a component the status page already calls degraded[2].",
        "Two operational habits make the failover trustworthy. First, re-run your evaluations whenever a request is served by the fallback model, because structured output, JSON adherence and tool-call formatting drift between models, and a silent quality regression is worse than a visible error. Second, record which provider served every request, so you can reconcile cost, latency and quality after the fact instead of reasoning from memory.",
        "Finally, alert on your own error rate rather than waiting for users to report. A dashboard that compares per-minute 5xx and timeout rates against the status page will tell you an incident is happening minutes before the provider posts one, and it will also catch the failures the status page never reports, such as a single model endpoint behaving badly while the platform as a whole stays green.",
        "The framing that helps: you are not trying to prevent DeepSeek outages, because you cannot. You are trying to make sure an outage is an incident in someone else's infrastructure rather than an incident in yours. Caching repeated results and queueing non-urgent work are the two cheapest ways to reach that state, and both also reduce spend.",
      ],
      list: [
        "Failover only on no-status network errors, 429, and 5xx — never on other 4xx[8]",
        "Timeout around 20 seconds, bounded retries with backoff, and a circuit breaker",
        "Cache repeatable results and queue non-urgent jobs for replay after recovery",
        "Keep a second provider pre-provisioned with a different base URL and a different model",
        "Re-run evals after any traffic served by the fallback model",
        "Alert on your own 5xx and timeout rates, not on user complaints",
      ],
      code: `function shouldFailover(status) {
  // Network-layer failure, throttling, or server-side error
  if (status === undefined || status === 429 || status >= 500) return true;
  // 400/401/402/403/404 describe the request itself.
  // Retrying them on another provider reproduces the same error.
  return false;
}`,
      note: "Long outages are where intra-vendor fallback fails. On October 15, 2026 the chat service, V4-Pro and V4.1-Flash were all affected in the same window, so your backup provider needs to be outside DeepSeek entirely[1][6].",
    },
    {
      num: "09",
      title: "What DeepSeek Has Said, and What It Has Not",
      description:
        "For the October 15, 2026 incident, DeepSeek has not published a technical root cause. That absence is itself the finding: anything claiming a specific trigger is inference, not disclosure[1][3][4].",
      paragraphs: [
        "What the company has said, in its compensation notice, is that it conducted a full investigation and eliminated single points of dependency[4][5]. That phrase is a category of fix rather than a cause — it says redundant components replaced shared ones, without naming which dependency failed. There is also no indication of a security incident or data breach associated with the event; the available evidence describes an availability failure, not a compromise[3][4].",
        "The compensation terms are the one concrete commitment attached to the incident. The refund applies to API accounts and covers consumption between October 8 and October 14, 2026, credited as bonus credit automatically, and it is credited rather than paid out in cash[3][4][5]. Note what that means: it compensates the week before the outage rather than the outage hours, so a light user should not expect a large number. [[deepseek-outage-refund|The refund guide]] walks through checking whether a credit landed.",
        "One piece of sequencing invites speculation and deserves a firm answer instead. The outage was on October 15, 2026, and the [[deepseek-v4-1-flash-1017|V4.1-Flash-1017 checkpoint]] shipped two days later on October 17. There is a tempting narrative here — a broken platform rushed into a new release — and there is no evidence for it. DeepSeek has not confirmed any connection between the outage and the checkpoint, and treating the two-day gap as causation is exactly the kind of inference this page exists to prevent[1][2].",
        "The useful conclusion for a user standing in the middle of the next incident is unchanged. Check the status page, read the error code, exclude your own setup, and have a fallback already wired. Provider-side reliability improves or it does not; your architecture deciding whether one degraded platform takes your product with it is entirely within your control[3][8].",
      ],
      note: "This page is maintained by an independent site and is not DeepSeek's official status page. When the two disagree, believe status.deepseek.com — and if you are mid-incident right now, go there first[1][2].",
    },
  ],
  prevGuide: { title: "DeepSeek-V4.1-Flash-1017: What Changed on Oct 17", slug: "deepseek-v4-1-flash-1017" },
  nextGuide: { title: "DeepSeek Outage Refunds: How to Check Your Credit", slug: "deepseek-outage-refund" },
  relatedGuides: [
    { title: "DeepSeek Outage Refunds: How to Check Your Credit", slug: "deepseek-outage-refund" },
    { title: "DeepSeek Server Busy: Why Requests Queue and Fail", slug: "deepseek-server-busy" },
    { title: "DeepSeek API Error Codes Explained", slug: "deepseek-api-error-codes" },
    { title: "DeepSeek-V4.1-Flash-1017: What Changed on Oct 17", slug: "deepseek-v4-1-flash-1017" },
    { title: "DeepSeek V4.1 Flash API Setup: Base URL & Model ID", slug: "v4-1-flash-api-setup" },
  ],
  sources: [
    { label: "DeepSeek Status — Incident report, October 15, 2026 (4h52m)", url: "https://status.deepseek.com/incidents/7116348214287" },
    { label: "DeepSeek Status — live component health and uptime", url: "https://status.deepseek.com/" },
    { label: "Caixin Global — DeepSeek Restores Services After Nearly Five-Hour Outage", url: "https://www.caixinglobal.com/2026-10-16/deepseek-restores-services-after-nearly-five-hour-outage-102493794.html" },
    { label: "SCMP — DeepSeek offers user refunds after suffering another major outage", url: "https://www.scmp.com/tech/big-tech/article/3371047/deepseek-offers-user-refunds-after-suffering-another-major-outage" },
    { label: "CGTN — DeepSeek offers compensation after restoring from service outage", url: "https://news.cgtn.com/news/2026-10-15/DeepSeek-offers-compensation-after-restoring-from-service-outage-1RgrRBZHn9u/share_amp.html" },
    { label: "TechNode — DeepSeek implements fix after partial outage affects chat and API services", url: "https://technode.com/2026/10/15/deepseek-implements-fix-after-partial-outage-affects-chat-and-api-services/" },
    { label: "dev.to — DeepSeek's API was partly down for 4h52m; it's refunding a week of spend as credit", url: "https://dev.to/gabrielanhaia/deepseeks-api-was-partly-down-for-4h52m-its-refunding-a-week-of-spend-as-credit-3p6j" },
    { label: "DeepSeek API Docs — Error codes", url: "https://api-docs.deepseek.com/quick_start/error_codes" },
  ],
};
