import type { GuideContent } from "./types";

// target keyword: deepseek search api
// 词族：deepseek web search api / deepseek search api pricing / deepseek search tool /
//       deepseek tools api / deepseek search api key / deepseek web search pricing
// 事实来源：reference/topics/29-v4-1-flash-1017.md + 官方 guides/search 指南、
//           官方 changelog（2026-10-17）、官方 X 公告（3/4 条）、marktechpost 报道
export const deepseekSearchApi: GuideContent = {
  slug: "deepseek-search-api",
  category: "API SETUP",
  title: "DeepSeek Search & Fetch API: Setup, Pricing, Operators",
  seoTitle: "DeepSeek Search & Fetch API Setup & Pricing",
  readTime: "11 MIN READ",
  updatedAt: "OCT 18, 2026",
  summary:
    "Call DeepSeek Search and Fetch at $0.75 per 1,000 requests. Endpoints, operators, rerank_score, authority tiers, QPS limits and the free window.",
  notice:
    "Search and Fetch calls made through server-side tools in DeepSeek Harness, Claude Code and Codex are free until billing starts on Oct 31, 2026 at 16:00 UTC[3].",
  toc: [
    { id: "step-1", label: "Step 1: Why DeepSeek Opened Its Search Layer" },
    { id: "step-2", label: "Step 2: Authentication and Endpoints" },
    { id: "step-3", label: "Step 3: Search in Practice with cURL and Python" },
    { id: "step-4", label: "Step 4: Query Operators That Change Results" },
    { id: "step-5", label: "Step 5: How to Read the Response Fields" },
    { id: "step-6", label: "Step 6: Fetch, and Turning a URL into Markdown" },
    { id: "step-7", label: "Step 7: Billing, the Free Window and Real Cost Math" },
    { id: "step-8", label: "Step 8: Rate Limits and Error Handling" },
    { id: "step-9", label: "Step 9: When to Use It Instead of Crawling Yourself" },
  ],
  steps: [
    {
      num: "01",
      title: "Why DeepSeek Opened Its Search Layer",
      description:
        "On October 17, 2026, DeepSeek opened two raw JSON endpoints that give agents and RAG applications access to live web content: a Search API for ranked results and a Fetch API that returns a single page as Markdown[1][2]. They shipped alongside the [[deepseek-v4-1-flash-1017|V4.1-Flash-1017 checkpoint]], so the same day that refreshed the model also handed developers a first-party web layer behind one API key.",
      paragraphs: [
        "The engine behind it is DeepSeek's own. In the changelog entry titled \"Opening up the in-house search API\", DeepSeek describes it as an AI-native, general-purpose search engine that reliably handles hundreds of millions of search requests per day and indexes hundreds of billions of web pages. It supports multilingual search and is meant to return relevant, authoritative and timely results in real time[2].",
        "The interesting part for anyone who builds agents is the filtering claim. DeepSeek says the engine screens out SEO spam, GEO manipulation and low-quality AIGC through strict detection mechanisms, so the results your model reads are less likely to be keyword-stuffed filler[2]. The official X thread repeats the same framing: powered by an in-house engine serving hundreds of millions of requests daily worldwide[3].",
        "That changes the calculus for tool builders. Previously, wiring web access into an agent meant choosing a third-party search vendor, running your own crawler, or paying a premium for a bundled browsing product. DeepSeek now offers the retrieval half of that stack as a metered API that authenticates with the same key your chat completions already use[1].",
        "This guide covers the endpoints, the request and response schemas, the query operators, the billing model, the QPS ceilings and the error codes, then ends with a straight verdict on when the API is cheaper than crawling and when it is not. If you only need the retrieval-plus-generation pattern end to end, the [[deepseek-rag-search-api|RAG walkthrough]] builds on top of these two endpoints.",
      ],
      note: "Both endpoints are read-only. There is no indexing call and no write path — you query an existing web index, you do not contribute to it[1].",
    },
    {
      num: "02",
      title: "Authentication and Endpoints",
      description:
        "Search and Fetch are raw JSON APIs. They use the same bearer authentication as the DeepSeek model API, so there is no second key to provision and no OAuth dance[1].",
      list: [
        "Base URL: https://api.deepseek.com",
        "Search: POST https://api.deepseek.com/v1/tools/search",
        "Fetch: POST https://api.deepseek.com/v1/tools/fetch",
        "Authorization: Bearer <DeepSeek API Key> (required on every call)",
        "Content-Type: application/json (required — the body is JSON, not form data)",
      ],
      paragraphs: [
        "If you already hold a DeepSeek API key for chat completions, you are done with setup. The same key that authenticates `deepseek-flash` authenticates the tools endpoints, and it is billed against the same account balance[1][3]. You can create or rotate keys from the platform console, the same place you manage model keys.",
        "Keep the key server-side. Because a Search call costs a fraction of a cent and needs no per-user consent flow, it is tempting to call the endpoint straight from a browser or a mobile client — do not. A key pasted into front-end code is a key that will be harvested. Proxy the call through your own backend, where you already control caching and rate limiting.",
        "The base URL and header shape match what the chat API expects, which matters for teams that already have a hardened HTTP client. You can reuse the same retry wrapper, the same logging, and the same secret store. The only new surface is the two paths under `/v1/tools/`[1].",
      ],
      note: "If your existing client injects an OpenAI-style base URL, point the tools calls at the root `https://api.deepseek.com` and append the full path. There is no `/v1` prefix on the chat path, but the tools endpoints do include `/v1` — a common copy-paste mistake[1].",
    },
    {
      num: "03",
      title: "Search in Practice with cURL and Python",
      description:
        "The smallest useful Search request needs exactly one field: `query`. Everything else has a default, so you can smoke-test the endpoint with a two-line body[1].",
      code: `# cURL
curl https://api.deepseek.com/v1/tools/search \\
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "DeepSeek V4 release",
    "count": 5,
    "need_content": true
  }'

# Python
import requests

response = requests.post(
    "https://api.deepseek.com/v1/tools/search",
    headers={"Authorization": "Bearer <DeepSeek API Key>"},
    json={
        "query": "DeepSeek V4 release",
        "count": 5,
        "need_content": True,
    },
)
response.raise_for_status()

for result in response.json()["results"]:
    print(result["rerank_score"], result["title"], result["url"])
    print(result["summary"])`,
      paragraphs: [
        "The request body accepts four optional fields on top of `query`. `count` sets how many results come back (default 10, range 1 to 50). `ori_question` carries the user's original question, which improves query understanding when your search string is a rewritten variant. `localization` takes an IP address used to localize results. `need_content` decides whether the full page text is returned in each result's `content` field[1].",
        "Unknown fields in the request body are ignored rather than rejected, which makes forward-compatible clients easy: you can start sending a field that a future API version will use without breaking today's calls[1].",
      ],
      table: {
        headers: ["Field", "Type", "Required", "Default", "Notes"],
        rows: [
          ["query", "string", "Yes", "—", "1–128 characters, cannot be all whitespace; supports operators"],
          ["count", "integer", "No", "10", "Number of results, 1 to 50"],
          ["ori_question", "string", "No", "—", "User's original question, 1–128 chars, null treated as absent"],
          ["localization", "string", "No", "empty", "Optional IP address used to localize search results"],
          ["need_content", "boolean", "No", "false", "When false, content is always an empty string"],
        ],
      },
      note: "Leave `need_content` off while you are prototyping. Turning it on inflates the payload with full page text, and the `summary` field is already written for a model to read[1].",
    },
    {
      num: "04",
      title: "Query Operators That Change Results",
      description:
        "The query string is forwarded with its search syntax intact, and operators combine in a single request. This is what separates the API from a plain keyword lookup — you can constrain the index before ranking happens[1].",
      table: {
        headers: ["Operator", "Example", "Effect"],
        rows: [
          ["site:", "DeepSeek site:github.com", "Restrict to one site; chain with OR for multiple"],
          ["-site:", "DeepSeek -site:example.com", "Exclude a site; separate several with spaces"],
          ["-term", "DeepSeek -advertisement", "Exclude pages containing a term"],
          ["-\"phrase\"", "DeepSeek -\"release notes\"", "Exclude pages containing an exact phrase"],
          ["\"phrase\"", "DeepSeek \"exact phrase\"", "Require an exact phrase"],
          ["lang:", "DeepSeek lang:zh,en", "Restrict to language codes, comma-separated"],
          ["after:", "DeepSeek after:2025-01-01", "Only pages published after a date"],
          ["before:", "DeepSeek before:2026-06-01", "Only pages published before a date"],
        ],
      },
      paragraphs: [
        "Multiple `site:` clauses are joined with `OR` rather than treated as an intersection, so `site:github.com OR site:huggingface.co` searches both repositories. Exclusion operators are the opposite: several space-separated terms or phrases each subtract from the result set[1].",
        "Date filtering is the operator worth building around. Recency is the single hardest signal to get right in agent retrieval, and `after:` plus `before:` lets you fence a window without post-filtering results client-side. Combine it with `lang:` and you have a reproducible scope for a daily digest, a changelog watcher, or a competitive monitor[1].",
      ],
      code: `{
  "query": "DeepSeek site:github.com OR site:huggingface.co lang:en after:2025",
  "count": 10
}`,
      note: "Operators can be combined in one query, but keep the string under the 128-character limit. If a filtered query returns nothing, the API returns HTTP 200 with an empty `results` array — not an error — so treat an empty list as a routing signal, not a failure[1].",
    },
    {
      num: "05",
      title: "How to Read the Response Fields",
      description:
        "A successful search returns HTTP 200 with a `results` array. Every item carries ranking and provenance metadata, and two of those fields are the ones you should actually branch on: `rerank_score` and `authority`[1].",
      table: {
        headers: ["Field", "Type", "Meaning"],
        rows: [
          ["rerank_score", "number", "0–3 relevance score combining relevance, authority and freshness; 1.5+ is high quality"],
          ["title", "string", "Result title"],
          ["url", "string", "Result URL"],
          ["snippet", "string", "Short display summary, typically 100–200 characters"],
          ["summary", "string", "Long summary, typically 600–800 characters, written to be read by a model"],
          ["content", "string", "Full page content; empty when need_content is false or unavailable"],
          ["site_name", "string or null", "Site name, or null when unavailable"],
          ["site_icon", "string or null", "Site icon URL, or null when unavailable"],
          ["date", "string or null", "Publication time in UTC as RFC 3339, or null when unknown"],
          ["authority", "integer", "Authority tier 0–4 (−1 unknown); 3 or above is a highly authoritative source"],
        ],
      },
      paragraphs: [
        "The intended split is simple. `snippet` is for your user interface. `summary` is what you feed the model — it is already 600 to 800 characters of query-relevant distillation, so pushing it into a RAG context costs far less than the raw page and reads better than a truncated paragraph. Only reach for `content` when you genuinely need the full text, because it is the expensive field in token terms[1].",
        "Use `rerank_score` as a threshold, not a sort key you agonize over. Scores of 1.5 and above are considered high quality, so a gate like \"keep results at or above 1.5, and widen `count` if fewer than three survive\" is a reasonable default. `authority` is the second gate: 3 or above marks a highly authoritative page, 0 to 2 is a weaker source, and −1 means the tier could not be determined[1].",
        "Treat `date` as strictly optional. It is RFC 3339 in UTC when known and null when unknown, which happens often enough on the open web that you should never hard-fail on a missing date. A pipeline that requires a timestamp will silently drop useful results[1].",
      ],
      note: "Wire both gates into your retrieval step: filter on `rerank_score >= 1.5` and prefer `authority >= 3` when you have replacements. For a deeper look at retrieval plumbing, see the [[deepseek-rag-search-api|RAG and Search API guide]].",
    },
    {
      num: "06",
      title: "Fetch, and Turning a URL into Markdown",
      description:
        "Fetch is the second half of the pair. It takes a single URL and returns the page as Markdown, which is exactly the shape a language model wants and exactly the shape a raw HTML scrape is not[1].",
      code: `curl https://api.deepseek.com/v1/tools/fetch \\
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://example.com/article"}'`,
      paragraphs: [
        "The request body has one field: `url`. It must be at most 8192 characters, must be an HTTP or HTTPS URL with a host, and must not contain a username or password. The response is equally small — a `title` string and a `content` string holding Markdown text[1].",
        "The typical pipeline is Search, then Fetch. Search gives you ranked URLs and model-ready summaries; when a snippet crosses your quality bar and you need the full argument, Fetch converts that one URL into clean Markdown. That two-step pattern keeps you from fetching twenty pages to answer one question, and it keeps your per-request bill predictable[1].",
        "Fetching is subject to the target site's availability and access policies, and this is where its error semantics differ from Search. An HTTP 403 means the fetch was rejected by the security policy, and an HTTP 404 means the API could not retrieve usable page content — an unavailable URL, a site-policy block, an error from the target site, an unsupported content type, or a page with no extractable Markdown. None of those are transient, so retrying an unchanged 404 will never succeed[1].",
      ],
      note: "Because Fetch output is Markdown, it drops navigation chrome, ad slots and script noise by construction. If you were paying a readability library to do that in-house, this replaces that step[1].",
    },
    {
      num: "07",
      title: "Billing, the Free Window and Real Cost Math",
      description:
        "Both endpoints cost $0.75 per 1,000 successful requests, billed per request rather than per token or per returned result. Search and Fetch are each metered, so a search that fetches five pages is one Search request plus five Fetch requests[1][2][3].",
      table: {
        headers: ["API", "Unit", "Price"],
        rows: [
          ["Search", "Per 1,000 successful requests", "$0.75"],
          ["Fetch", "Per 1,000 successful requests", "$0.75"],
        ],
      },
      paragraphs: [
        "The billing rule is what you should actually internalize, because it is unusually generous. A request is billable only when it returns HTTP 200 and produces a result — Search must return a non-empty `results` array, and Fetch must return page content. Failed requests, empty search results and timeouts are not billed[1].",
        "That means `count` is free in the pricing sense: asking for 50 results with `need_content` enabled costs the same $0.00075 as asking for one. Anyone who has priced per-token retrieval will recognize how different this is. You can widen `count`, turn on full content, and filter client-side without touching the unit price[1].",
        "Concrete arithmetic: 1,000 searches is $0.75. 10,000 searches is $7.50. A daily job that runs 500 searches plus 2,000 fetches costs roughly $0.375 plus $1.50, or just under $1.90 a day — about $57 a month. Because empty results are free, an aggressive filter that discards most queries costs almost nothing[1].",
        "The free window is the other number to note, and it is where sources diverge. The official X thread states plainly that Search and Fetch calls made through server-side tools in DeepSeek Harness, Claude Code and Codex are currently free for DeepSeek API users, and that billing starts on October 31, 2026 at 16:00 UTC[3]. The docs page frames the same concession more loosely — it covers Claude Code's built-in Web Search tool and Codex's `web_search` feature for the first two weeks after launch, and says the billing start date will be announced separately, without naming Harness[1]. Secondary coverage has reported the cutoff as November 1, which is the same instant expressed in Beijing time. Treat October 31, 2026 at 16:00 UTC as the concrete date and the docs wording as the caveat[1][3][4].",
      ],
      note: "If your agent runs inside one of those harnesses today, the free window is real and worth using to prototype before per-request billing begins. Build the metering in now, though — see [[harness-mcp|the Harness MCP guide]] for how server-side tools are wired.",
    },
    {
      num: "08",
      title: "Rate Limits and Error Handling",
      description:
        "Per account, Search and Fetch are limited independently at 5 QPS each, and traffic to one does not consume the other's quota. The limit is calculated at the account level regardless of which key you use, and it is separate from the model concurrency limits[1].",
      list: [
        "Search: 5 QPS per account",
        "Fetch: 5 QPS per account, plus a separate per-domain limit",
        "Limits are per account, not per key, and sit outside the model concurrency limits",
      ],
      paragraphs: [
        "Two details trip people up. First, the QPS limit is per account, not per key — minting five keys does not give you 25 QPS, it gives you five keys that collectively share five. Second, Fetch carries an additional per-domain QPS limit on top of the account limit, so hammering one host will return 429 even while your account has headroom[1].",
        "Requests above the limit receive HTTP 429. The docs give a clean triage rule: for 408, 429 and 5xx, wait and retry with backoff; for 402, top up the account before retrying; and do not retry any other 4xx without changing the request[1].",
      ],
      table: {
        headers: ["Status", "Meaning", "What to do"],
        rows: [
          ["400", "Invalid headers or body, including malformed JSON or an invalid field value", "Fix the request; do not retry as-is"],
          ["401", "API key missing or invalid", "Check the key and the Authorization header"],
          ["402", "Insufficient account balance", "Top up, then retry"],
          ["403", "Fetch rejected by the security policy", "Change the target URL"],
          ["404", "Fetch could not retrieve usable page content", "Change the URL; retrying will not help"],
          ["408", "Reading the request body timed out", "Wait and retry"],
          ["413", "Request body too large", "Shrink the body"],
          ["429", "Search or Fetch QPS limit exceeded", "Back off and retry"],
          ["500", "Internal server error", "Wait and retry"],
          ["504", "Downstream request timed out", "Wait and retry"],
        ],
      },
      note: "A 5 QPS ceiling means a naive fan-out over 100 queries takes at least 20 seconds even with perfect pipelining. Queue searches instead of firing them in parallel, and cache aggressively — the same query within a few minutes almost always deserves a cache hit. The [[deepseek-api-error-codes|error codes reference]] covers the wider API surface[1].",
    },
    {
      num: "09",
      title: "When to Use It Instead of Crawling Yourself",
      description:
        "The honest answer is that the Search and Fetch APIs are cheap in a way that in-house crawling is not, but they are not a replacement for a crawler you control[1][2].",
      paragraphs: [
        "Reach for the API when you need breadth, freshness or filtering you do not want to maintain. The in-house engine already indexes hundreds of billions of pages, serves hundreds of millions of requests a day, and applies spam detection you would otherwise have to build — and at $0.75 per 1,000 successful requests with free failures, the marginal cost of a speculative query is effectively zero[2]. For an agent that needs to look something up mid-task, for a RAG pipeline that needs current sources, or for a monitor that watches a handful of queries with `after:` date fences, the API wins on both engineering time and unit economics.",
        "Reach for your own crawler when the retrieval target is narrow and deep. If you need every page of one documentation site, respect for a specific robots policy, exact byte-level control over a page you will parse repeatedly, or a corpus small enough to keep resident, then a crawler you control is better: the per-request meter never stops, and Fetch's per-domain QPS limit will throttle a tight loop against a single host anyway[1].",
        "The pragmatic pattern is a hybrid. Keep a small local index for the content you own or refresh on a schedule, and route everything else through Search. When a Search result clears your `rerank_score` and `authority` gates but you need the full text, spend one Fetch — not twenty — on the page that actually matters. That gives you fresh web coverage without turning retrieval into a permanent infrastructure project.",
        "Finally, note where this fits in the broader stack. The tools endpoints authenticate with the same key as the model API, so they slot in beside your existing completions calls with no new credential flow. If you are still wiring up the model side, start with [[v4-1-flash-api-setup|the V4.1 Flash API setup guide]] and come back here for the retrieval layer.",
      ],
      list: [
        "Use the API for broad, fresh, filtered web retrieval — especially inside an agent loop",
        "Use the API when empty results should be free, because aggressive filtering becomes cheap",
        "Use your own crawler for narrow, deep, repeatedly parsed targets you control",
        "Cache identical queries; 5 QPS per account is the real ceiling on throughput",
        "Gate on rerank_score at 1.5 and prefer authority 3 or above",
        "Feed `summary` to the model by default, and reserve `content` for the pages that justify it",
      ],
      note: "One last caveat on the filtering story: an engine that suppresses SEO spam and low-quality AIGC is a feature for retrieval quality, and also a reminder that these are DeepSeek's own descriptions of its engine rather than an independent benchmark. Validate result quality on your own query set before you depend on it[2][4].",
    },
  ],
  prevGuide: { title: "DeepSeek-V4.1-Flash-1017: What Changed on Oct 17", slug: "deepseek-v4-1-flash-1017" },
  nextGuide: { title: "DeepSeek RAG with the Search API: A Working Pipeline", slug: "deepseek-rag-search-api" },
  relatedGuides: [
    { title: "DeepSeek-V4.1-Flash-1017: What Changed on Oct 17", slug: "deepseek-v4-1-flash-1017" },
    { title: "DeepSeek RAG with the Search API: A Working Pipeline", slug: "deepseek-rag-search-api" },
    { title: "DeepSeek API Error Codes Explained", slug: "deepseek-api-error-codes" },
    { title: "DeepSeek V4.1 Flash API Setup: Base URL & Model ID", slug: "v4-1-flash-api-setup" },
    { title: "DeepSeek Harness MCP: Connect Tools and Servers", slug: "harness-mcp" },
  ],
  sources: [
    { label: "DeepSeek API Docs: Search & Fetch", url: "https://api-docs.deepseek.com/guides/search" },
    { label: "DeepSeek API Changelog — Opening up the in-house search API (Oct 17, 2026)", url: "https://api-docs.deepseek.com/updates/" },
    { label: "DeepSeek on X: Search & Fetch APIs are now open (Oct 17, 2026)", url: "https://x.com/deepseek_ai/status/2111375650414309859" },
    { label: "DeepSeek API Reference: Search", url: "https://api-docs.deepseek.com/api/search/" },
    { label: "MarkTechPost: DeepSeek V4.1-Flash-1017 Opens Search API", url: "https://www.marktechpost.com/2026/10/17/deepseek-just-released-v4-1-flash-1017-scores-77-0-on-deepswe-opens-search-api/" },
  ],
};
