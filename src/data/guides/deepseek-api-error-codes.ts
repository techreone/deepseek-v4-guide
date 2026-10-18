import type { GuideContent } from "./types";

// target keyword: deepseek error 500
// 词族：deepseek error 429 / deepseek error 401 / deepseek error 402 / deepseek error 400 /
//       deepseek error 404 / deepseek error 503 / deepseek 500 internal server error /
//       deepseek proxy error 500 / deepseek api error / deepseek error 429 janitor ai /
//       deepseek doesn't respond
// 事实来源：官方 error_codes（模型 API 7 码）/ guides/search 错误段（Search & Fetch 10 码）/
//           quick_start/rate_limit（并发 2500 & 500、keep-alive 10 分钟）/
//           status page 2026-10-15 事件与 uptime / JanitorAI 帮助页 / dev.to 宕机复盘
export const deepseekApiErrorCodes: GuideContent = {
  slug: "deepseek-api-error-codes",
  category: "REFERENCE",
  title: "DeepSeek API Error Codes: 400–503 Fixes, Retry Rules and Error 500 Triage",
  seoTitle: "DeepSeek API Error Codes: 400–503 Fixes",
  readTime: "10 MIN READ",
  updatedAt: "OCT 18, 2026",
  summary:
    "DeepSeek API error codes in one table: which 4xx errors to fix, when 429 means backoff, how 500, 503 and 504 behave, and a retry decision you can copy.",
  toc: [
    { id: "step-1", label: "Step 1: The Error Map — Model API vs Search & Fetch" },
    { id: "step-2", label: "Step 2: Read the Error Body Before the Status Code" },
    { id: "step-3", label: "Step 3: The 4xx Errors You Fix, Not Retry" },
    { id: "step-4", label: "Step 4: 429 Means You Hit a Documented Limit" },
    { id: "step-5", label: "Step 5: 5xx Means Their Server, Not Your Request" },
    { id: "step-6", label: "Step 6: The Retry Decision Table and Working Code" },
    { id: "step-7", label: "Step 7: Is DeepSeek Down, or Did You Write It Wrong?" },
    { id: "step-8", label: "Step 8: 429 and 500 Inside Janitor AI and Other Wrappers" },
    { id: "step-9", label: "Step 9: Production Checklist for DeepSeek Errors" },
  ],
  steps: [
    {
      num: "01",
      title: "The Error Map — Model API vs Search & Fetch",
      description:
        "DeepSeek publishes two separate error tables, and they are not the same list. The model API table (chat completions and the Anthropic-format endpoint) documents seven codes. The Search and Fetch tools table documents ten, because fetching someone else's web page can fail in ways that generating text cannot[1][3].",
      table: {
        headers: ["Status", "Model API", "Search & Fetch"],
        rows: [
          ["400", "Invalid Format — bad request body", "Invalid headers or body, malformed JSON, bad field value"],
          ["401", "Authentication Fails — wrong API key", "API key missing or invalid"],
          ["402", "Insufficient Balance", "Account has insufficient balance"],
          ["403", "—", "Fetch rejected by the security policy"],
          ["404", "—", "Fetch could not retrieve usable page content"],
          ["408", "—", "Reading the request body timed out"],
          ["413", "—", "Request body too large"],
          ["422", "Invalid Parameters", "—"],
          ["429", "Rate Limit Reached — too fast, or concurrency/QPS exceeded", "Search or Fetch QPS limit exceeded"],
          ["500", "Server Error", "Internal server error"],
          ["503", "Server Overloaded — high traffic", "—"],
          ["504", "—", "Downstream request timed out"],
        ],
      },
      paragraphs: [
        "Read that table once and the shape of the API becomes obvious. The three four-digit codes that appear only on the tools side — 403, 404 and 504 — are all about the third party: the site you asked DeepSeek to fetch, or the upstream hop between DeepSeek and that site. The one code that appears only on the model side, 422, is the ordinary invalid-parameter response you get when a field is out of range[1][3].",
        "The mapping to your code is equally simple. A 4xx (except 429) says the request or the account is wrong, so retrying the identical request cannot help. A 429 says you are moving too fast for a limit that is written down and measurable. A 5xx says DeepSeek had the problem. Everything in this guide follows from that split[1][3].",
      ],
      note: "If you only remember one sentence from this page, make it the one in the official tools docs: for HTTP 408, 429 or 5xx, wait and retry; for 402, top up before retrying; do not retry other 4xx errors without changing the request[3].",
    },
    {
      num: "02",
      title: "Read the Error Body Before the Status Code",
      description:
        "DeepSeek errors follow the OpenAI-compatible error format, so a single parser works for the model API and for Search and Fetch. The body is an `error` object with `message`, `type`, `param` and `code`, and the tools documentation states outright that `param` is always null[3].",
      code: `{
  "error": {
    "message": "'count' must be between 1 and 50",
    "type": "invalid_request_error",
    "param": null,
    "code": "invalid_request_error"
  }
}`,
      paragraphs: [
        "The lesson from that example is where the actionable text lives. The status code tells you the category; the `message` tells you the field and the boundary — `'count' must be between 1 and 50` is a complete fix instruction, and it is the string DeepSeek's own error-code page refers to when it says to modify your request body according to the hints in the error message[1][3].",
        "So log all four fields, not just the status. `code` mirrors `type` in the documented case, which makes it a stable value to branch on or to alert on, while `message` is for humans reading the incident. Logging only `HTTP 400` collapses two very different bugs — a malformed JSON body and a perfectly valid JSON body with `count` set to 500 — into one indistinguishable line[3].",
        "One caution when you are debugging through an aggregator. DeepSeek's own messages are precise; proxy messages are not. If the text you are staring at looks like `Proxy Error 429: Rate limit exceeded: free models per day`, that sentence was written by the wrapper in front of DeepSeek, and the quota it names belongs to the wrapper. Step 8 covers that case in detail[6].",
      ],
    },
    {
      num: "03",
      title: "The 4xx Errors You Fix, Not Retry",
      description:
        "Four of the four-digit codes are pure request defects, and one is an account-balance problem. None of them improve by sending the same bytes again, and a retry loop only burns your own request budget while you wait for a success that cannot arrive[1][3].",
      table: {
        headers: ["Status", "What it means", "The fix"],
        rows: [
          ["400", "Invalid request body format, malformed JSON, or an invalid field value", "Read the message hint and correct the body or header"],
          ["401", "Authentication fails — missing or wrong API key", "Re-check the Authorization header and the key itself"],
          ["402", "Account balance exhausted", "Top up the account, then retry"],
          ["422", "Request carries invalid parameters", "Adjust the named parameter to the documented range"],
          ["403", "Fetch rejected by the security policy", "Change the target URL — the target is refused"],
          ["404", "Fetch could not retrieve usable page content", "Change the URL; an unchanged retry will fail again"],
          ["408", "Reading the request body timed out", "Retry after a wait — this one is transient"],
          ["413", "Request body is too large", "Shrink the body, then send it"],
        ],
      },
      paragraphs: [
        "The 400-versus-422 boundary is the one people argue about, and it is worth knowing where DeepSeek draws it. On the model API, a body that is not valid JSON, or whose shape is wrong, returns 400 Invalid Format; a body that parses but carries an out-of-range or otherwise invalid parameter returns 422 Invalid Parameters[1]. On the tools endpoints the same class of error is folded into 400, whose description explicitly includes an invalid field value[3]. If you are writing one handler for both, treat 400 and 422 identically: report the hint, fail the request, do not retry.",
        "402 is the code that ends careers in demos. It is not a rate limit and not a bug — the account is out of balance. Check the balance, top up, then retry. Because DeepSeek prices by token with a peak and off-peak difference, an unexpected 402 often means someone forgot that peak hours cost double. The current numbers are in the [[v4-1-flash-pricing|V4.1 Flash pricing breakdown]][7].",
        "403 and 404 belong to Fetch, and both describe the target rather than your code. A 403 means the fetch was rejected by the security policy; a 404 means the API could not retrieve usable page content, and the documented reasons are broad: an unavailable URL, a URL blocked by site policy, an error from the target site, an unsupported content type, or a page with no extractable Markdown[3]. That last clause matters more than it looks — a JavaScript-only page that renders no server-side text can return 404 even though the URL itself loads fine in a browser.",
        "Two more four-digit codes are special cases. A 408 on the tools endpoints means reading the request body timed out, which is transient and safe to retry[3]. A 413 means your body is too large — for Fetch that usually means the `url` field blew past its 8192-character ceiling, and for Search it is a sign that you are pasting document text into a query field that takes 128 characters[3]. Neither of those should ever reach a retry queue.",
      ],
      note: "Alerts are where these codes earn their keep. Page someone on a spike in 401 or 402 — a leaked key and an empty wallet are both urgent — and route 400/422 violations to the team that owns the client. Silencing 4xx as noise is how a wrong parameter range survives to production.",
    },
    {
      num: "04",
      title: "429 Means You Hit a Documented Limit",
      description:
        "A DeepSeek error 429 means you are sending requests too quickly or have exceeded a concurrency or QPS limit, and the limits themselves are published[1][2][3]. Knowing the number tells you whether to slow down, queue, or ask for more capacity.",
      table: {
        headers: ["Surface", "Limit", "Scope"],
        rows: [
          ["deepseek-flash", "2,500 concurrent requests", "Per account"],
          ["deepseek-v4-pro", "500 concurrent requests", "Per account"],
          ["Search", "5 QPS", "Per account, independent of Fetch"],
          ["Fetch", "5 QPS", "Per account, plus a separate per-domain cap"],
        ],
      },
      paragraphs: [
        "Two properties of these limits cause most of the confusion. First, they are account-level, not key-level: minting five API keys does not give you 25 QPS on Search, it gives you five keys that collectively share five[3]. Second, the two tools endpoints are counted separately — Search traffic does not consume the Fetch quota — but Fetch adds a per-domain cap on top of the account cap, so a tight loop against one host returns 429 while your account still has headroom[3].",
        "The model side is measured in concurrency rather than QPS, which changes the shape of the fix. Concurrency is in-flight requests, so the answer is a client-side semaphore or a queue with a bounded worker pool, not a sleep between calls. If you genuinely need more than 500 or 2,500 in flight, DeepSeek documents a capacity expansion request, matched to your actual traffic and provided at no additional cost[2].",
        "There is also a cheap operational lever. DeepSeek's peak pricing window is 01:00–04:00 and 06:00–10:00 UTC on weekdays, and off-peak costs half as much[7], so peak hours are both the most expensive and the most contended. Batch jobs that can wait should be scheduled off-peak: you pay less and you collect fewer 429s and 503s. That is an inference from the published pricing and status data rather than a documented guarantee, but the correlation is hard to miss[2][7].",
        "Finally, honor `Retry-After` when it is present, and when it is absent use a floor rather than a raw exponential value. At 5 QPS an account needs at least 200 milliseconds between Search calls to stay legal, so a backoff that starts at 10 milliseconds and doubles will spend several attempts inside the wall it is trying to get around[3].",
      ],
      note: "If you are building retrieval on top of Search, read the [[deepseek-search-api|Search & Fetch API guide]] first: the operators, the `rerank_score` and `authority` gates and the per-request billing rules all change how often you actually need to call it.",
    },
    {
      num: "05",
      title: "5xx Means Their Server, Not Your Request",
      description:
        "Three codes say DeepSeek had the problem. 500 is a server error, 503 is a server overloaded by high traffic, and 504 is a downstream request timed out — in Fetch's case, the hop out to the site you asked for[1][3].",
      paragraphs: [
        "The official advice for all three is the same: retry after a brief wait, and contact support if it persists. 503 adds only the retry half[1]. That is deliberate understatement. A 503 caused by an overloaded cluster is exactly the condition that a retry storm makes worse, which is why the backoff needs jitter — if ten thousand clients all sleep one second and retry together, you have built a synchronized load spike instead of a recovery.",
        "Before you write a retry loop for 5xx, know what a real bad day looks like. On October 15, 2026, DeepSeek's status page recorded an incident titled DeepSeek Web/API Partially Unavailable covering the V4 Pro API, the V4.1 Flash API and the chat service. It opened at 00:11 UTC and was resolved at 05:04 UTC — 4 hours and 52 minutes[4]. DeepSeek refunded a full week of spend, covering October 8 to 14, as bonus credit; the refund targeted the week before the failure rather than the failure window itself[5].",
        "Scale that against the baseline. For July through October 2026, the same status page reported 99.74% availability for the V4 Pro API and 99.46% for the V4.1 Flash API[4]. Those are good numbers and they still leave hours of downtime in a quarter. Any system that treats a DeepSeek 5xx as an impossibility is making a bet the uptime record does not support.",
        "There is also a failure mode that produces no error code at all. DeepSeek's long-running requests may emit keep-alive comment lines before the JSON body, and the docs warn that if a request has not started inference after 10 minutes, the server closes the connection[2]. A client that parses the response strictly, or that has a 30-second read timeout, will report its own timeout for what is really a slow inference. Handle the empty lines, and set your timeout from your workload's p99 rather than from a default.",
      ],
      note: "If you are watching a live incident rather than debugging, the operational pages are [[deepseek-down|how to check whether DeepSeek is down]] and [[deepseek-server-busy|what to do when the server is busy]], which covers the chat-side symptoms of the same failures.",
    },
    {
      num: "06",
      title: "The Retry Decision Table and Working Code",
      description:
        "This is the whole guide compressed to one decision. Retry only the codes that can succeed on an unchanged request, cap the attempts, and treat everything else as a bug report rather than a transient condition[1][3].",
      table: {
        headers: ["Status", "Retry unchanged?", "What to actually do"],
        rows: [
          ["400 / 422", "No", "Fix the body or field value named in error.message"],
          ["401", "No", "Fix the key or the Authorization header; rotate if leaked"],
          ["402", "No", "Top up the account, then resend once"],
          ["403", "No", "Change the target URL for Fetch"],
          ["404", "No", "Change the target URL; the page has no extractable Markdown"],
          ["408", "Yes, after a wait", "Backoff, then resend the same request"],
          ["413", "No", "Shrink the body, then resend"],
          ["429", "Yes, with backoff", "Queue, honor Retry-After, raise concurrency or request expansion"],
          ["500", "Yes, with backoff", "Retry with jitter; fail over if configured; alert on a sustained rate"],
          ["503", "Yes, with backoff", "Retry with jitter, reduce client concurrency, consider failing over"],
          ["504", "Yes, with backoff", "Retry; for Fetch also consider a different source URL"],
        ],
      },
      code: `const RETRYABLE = new Set([408, 429, 500, 502, 503, 504]);

function delayFor(attempt, retryAfterHeader) {
  const server = Number(retryAfterHeader);
  if (Number.isFinite(server) && server > 0) return server * 1000;
  const base = Math.min(200 * 2 ** attempt, 8000);   // 200ms, capped at 8s
  return base / 2 + Math.random() * (base / 2);      // full jitter
}

async function callDeepSeek(request, { maxAttempts = 4 } = {}) {
  let lastError;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const res = await fetch("https://api.deepseek.com/chat/completions", request);
    if (res.ok) return res.json();

    const retryAfter = res.headers.get("retry-after");
    const body = await res.json().catch(() => null);
    const err = new Error(body?.error?.message ?? \`HTTP \${res.status}\`);
    err.status = res.status;
    err.code = body?.error?.code;
    lastError = err;

    if (!RETRYABLE.has(res.status)) throw err;        // 4xx: fix and resend, do not loop
    if (attempt === maxAttempts - 1) break;
    await new Promise((r) => setTimeout(r, delayFor(attempt, retryAfter)));
  }
  throw lastError;
}`,
      paragraphs: [
        "Three details in that snippet are the difference between a retry loop that helps and one that hurts. The retryable set is explicit, so a 402 or a 422 can never be swallowed by a loop. `Retry-After` wins over the computed delay, because the server knows when it will have room and you do not. And the delay uses full jitter, so a fleet of clients spreads its retries across the window instead of reconverging on the same instant[2].",
        "For the model API, the same policy maps onto your provider SDK: fail over on `status === undefined`, 429 and anything at or above 500, and let the SDK's own retry counter handle the rest with a bounded `maxRetries`[5]. If you already run a waypoint in front of the API, the [[harness-error-fix|Harness error fixes]] cover the client-side symptoms that look like API errors but are not.",
      ],
      note: "Set a hard ceiling on total attempts and let the request fail loudly. An unbounded retry loop turns one overloaded minute into an hour of queue growth, and it hides the incident from the alerting you built in Step 7.",
    },
    {
      num: "07",
      title: "Is DeepSeek Down, or Did You Write It Wrong?",
      description:
        "This is the question behind most searches for a DeepSeek error 500, a DeepSeek 500 internal server error or a DeepSeek API that does not respond at all, and it is answerable in about a minute if you work through the signals in order instead of guessing[1][4].",
      list: [
        "Classify first: a 4xx means your request or account, a 429 means your rate, and 5xx or a hanging connection means the service. Only the last two categories justify checking status.",
        "Open the status page and read the component, not the headline: a chat-service incident does not explain an API 500, and vice versa.",
        "Reproduce with the smallest possible request on the same key — one chat completion with a one-word prompt, or one Search call. If the small request succeeds, the problem is in your payload or your volume.",
        "Compare two keys on the same account. Both failing points at the service or the account; one failing points at that key, its permissions or its recent rotation.",
        "Call a second provider with the same prompt. If the fallback answers while DeepSeek fails, you have confirmed a provider-side fault rather than a problem in your application code.",
        "Watch for sustained 5xx rates rather than single errors. One 500 in ten thousand requests is normal; a 3% error rate that lasts five minutes is an incident you should be paging on.",
        "Log which provider served every request. Without that field you cannot tell an outage from a routing change, and your postmortem will be guesswork[5].",
      ],
      paragraphs: [
        "The order matters because each step eliminates a class of cause cheaply. Classifying costs nothing and removes the entire request-defect family. The status page removes the service family when it is green — and note that a green status page does not mean your specific endpoint is healthy, which is why the small-request reproduction and the second key come next[4].",
        "If the checks point at the service, the engineering answer is not a bigger timeout. It is a fallback provider behind the same interface, a circuit breaker that opens after a handful of consecutive 5xx responses, and a queue for work that can wait. The October 15 incident ran for nearly five hours[4]; a client with a breaker is degraded for minutes, and a client without one is degraded for the whole window.",
      ],
      note: "Build the breaker on the error class you can actually count. Because DeepSeek's error responses carry a stable `code` field, `error.code` is a better breaker key than a human-readable message that a proxy may have rewritten[3].",
    },
    {
      num: "08",
      title: "429 and 500 Inside Janitor AI and Other Wrappers",
      description:
        "When you see a DeepSeek error inside a third-party front end, the status code has usually been relayed, not generated by DeepSeek. Janitor AI's own help center describes the chain plainly: the app routes model requests through OpenRouter, which forwards to a provider and then to the model, so a single request passes through several quota layers — app to aggregator to provider to model[6].",
      paragraphs: [
        "That is why the label on the error is often `Proxy Error 429` rather than a DeepSeek error. The message attached to it is the giveaway. Janitor AI documents a free-tier daily cap that resets at 12AM GMT, with lower limits for free users and higher ones once a small credit balance exists, and it lists 400 for wrong proxy settings, 402 for exhausted credits, 429 for rate limiting, 500 for a server error and 502 for an invalid response or a model being down[6].",
        "The important diagnostic is the one Janitor AI names explicitly: if the error log includes `ErrorUpstreamFault:True`, the fault is upstream and DeepSeek's servers may be down[6]. That flag is the only reliable local signal that the failure lives at the model provider rather than at the wrapper or the aggregator. Everything else in that error table — 400 from a mistyped model name, 402 from an empty credit balance, 429 from a per-day cap — is a problem in the layer you actually control.",
        "So the handling rule for wrapped front ends is inverted from Step 6. Do not build backoff against a wrapper's 429: the limit is a daily or per-minute product quota, and sleeping for two seconds will not refill it. Re-check the key, correct the model name, switch to a model that is not rate-limited, or wait for the quota window to reset. Retry only once you have confirmed from the wrapper's own status page or documentation that the limit is a burst limit rather than a quota[6].",
        "The same logic applies to any self-hosted gateway. If your team runs LiteLLM, a proxy or a shared internal gateway in front of DeepSeek, a 403 or a 404 that DeepSeek's own tables never produce is coming from your gateway, and its logs — not DeepSeek's status page — are the place to look[1][3].",
      ],
      note: "Rule of thumb: find out who wrote the error string before you act on it. DeepSeek's messages name fields and ranges; aggregator and front-end messages name quotas, credits and model names. The vocabulary tells you which layer to fix[3][6].",
    },
    {
      num: "09",
      title: "Production Checklist for DeepSeek Errors",
      description:
        "Working through the earlier steps leaves a short list of decisions that turn DeepSeek's error semantics into behavior. Each item below maps to a code you will actually see in production[1][2][3][5].",
      list: [
        "Set `maxRetries` explicitly and keep the retryable set to 408, 429 and 5xx — never let a 401, 402 or 422 join it",
        "Use exponential backoff with jitter, honor `Retry-After`, and cap total attempts so a failure surfaces as an error rather than a hung queue",
        "Add a client-side concurrency limit well below 2,500 for `deepseek-flash` and 500 for `deepseek-v4-pro`, and request a capacity expansion before raising it",
        "Queue Search and Fetch instead of fanning out: 5 QPS per account is the ceiling, and Fetch has its own per-domain cap",
        "Set timeouts from your own p99, and remember a request that has not begun inference after 10 minutes will be closed by the server",
        "Parse the keep-alive comment lines before the JSON body, or use an SDK that already does",
        "Log `error.type`, `error.code`, `error.message` and `param` alongside which provider served the request",
        "Gate a fallback provider behind 429 and 5xx only, and re-run your evals against that fallback model — structured output drifts between models",
        "Alert on 401 and 402 immediately, on sustained 5xx rates after a few minutes, and never on individual 400s",
        "Schedule batch work into off-peak hours, where prices are half and contention is lower",
      ],
      paragraphs: [
        "If you are still standing the integration up, start with [[v4-1-flash-api-setup|the V4.1 Flash API setup guide]] for the base URL, model ID and auth shape, then come back here once requests are flowing. The error handling you write on day one is the part you will not want to rewrite during an incident.",
        "One closing caution about this page. Every code and limit here comes from DeepSeek's published documentation and status data as read on October 18, 2026[1][2][3][4]. Rates and limits change, and the model API and tools tables are maintained separately — so if a code you receive is not on these lists, the first thing to check is whether it came from DeepSeek at all[3][6].",
      ],
      note: "Prices quoted here reflect the published peak and off-peak rates as of October 2026; confirm the current numbers on the [[v4-1-flash-pricing|pricing page]] before you build a budget on them.",
    },
  ],
  prevGuide: { title: "DeepSeek Search & Fetch API: Setup, Pricing, Operators", slug: "deepseek-search-api" },
  nextGuide: { title: "DeepSeek Server Busy: What It Means and What to Do", slug: "deepseek-server-busy" },
  relatedGuides: [
    { title: "Is DeepSeek Down? How to Check and What to Do", slug: "deepseek-down" },
    { title: "DeepSeek Server Busy: What It Means and What to Do", slug: "deepseek-server-busy" },
    { title: "DeepSeek Search & Fetch API: Setup, Pricing, Operators", slug: "deepseek-search-api" },
    { title: "DeepSeek V4.1 Flash API Setup: Base URL & Model ID", slug: "v4-1-flash-api-setup" },
    { title: "DeepSeek Outage Refund: How to Check Your Free Credit", slug: "deepseek-outage-refund" },
  ],
  sources: [
    { label: "DeepSeek API Docs: Error Codes", url: "https://api-docs.deepseek.com/quick_start/error_codes" },
    { label: "DeepSeek API Docs: Rate Limit & Isolation", url: "https://api-docs.deepseek.com/quick_start/rate_limit" },
    { label: "DeepSeek API Docs: Search & Fetch — Errors", url: "https://api-docs.deepseek.com/guides/search" },
    { label: "DeepSeek Status: Web/API Partially Unavailable, Oct 15, 2026 (4h 52min)", url: "https://status.deepseek.com/incidents/7116348214287" },
    { label: "dev.to: DeepSeek's API Was Partly Down for 4h52m. It's Refunding a Week of Spend as Credit", url: "https://dev.to/gabrielanhaia/deepseeks-api-was-partly-down-for-4h52m-its-refunding-a-week-of-spend-as-credit-3p6j" },
    { label: "JanitorAI Help Center: Troubleshooting DeepSeek via OpenRouter", url: "https://help.janitorai.com/en/article/troubleshooting-deepseek-via-openrouter-8xko1u" },
    { label: "DeepSeek API Docs: Models & Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
  ],
};
