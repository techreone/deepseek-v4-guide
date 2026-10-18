import type { GuideContent } from "./types";

// target keyword: deepseek rag
// 词族：deepseek rag api / deepseek rag tutorial / deepseek rag github / deepseek rag n8n /
//       deepseek rag locally / deepseek rag model / deepseek rag chatbot / deepseek rag example /
//       deepseek rag ollama / deepseek web search api / can deepseek api search the web
// 定位：落地教程 —— 把 2026-10-17 开放的 Search/Fetch 当作检索层，拼成 grounded RAG / agent 检索回路。
// 分工：deepseek-search-api 讲 API 参考（端点/字段/算子/计费），本页讲怎么组合成应用。
// 事实来源：官方 guides/search 指南、官方 changelog（2026-10-17）、官方 pricing 页、
//           marktechpost、developersdigest，以及 reference/topics/29-v4-1-flash-1017.md
export const deepseekRagSearchApi: GuideContent = {
  slug: "deepseek-rag-search-api",
  category: "TUTORIAL",
  title: "Build RAG with DeepSeek Search & Fetch API",
  seoTitle: "DeepSeek RAG: Build It on the Search API",
  readTime: "12 MIN READ",
  updatedAt: "OCT 18, 2026",
  summary:
    "Build grounded RAG on DeepSeek's Search and Fetch APIs: when to use live web retrieval vs a vector store, a working loop, field gates, and cost math.",
  notice:
    "Search and Fetch calls made through server-side tools in DeepSeek Harness, Claude Code and Codex are free until billing begins on Oct 31, 2026 at 16:00 UTC[1][4].",
  toc: [
    { id: "step-1", label: "Step 1: Two Ways to Give DeepSeek Retrieval" },
    { id: "step-2", label: "Step 2: What the Search and Fetch Endpoints Hand You" },
    { id: "step-3", label: "Step 3: The Minimal Grounded Loop, End to End" },
    { id: "step-4", label: "Step 4: Field Gates — rerank_score, authority, date" },
    { id: "step-5", label: "Step 5: Prompt Slots — snippet, summary, content" },
    { id: "step-6", label: "Step 6: Narrowing the Index with Operators" },
    { id: "step-7", label: "Step 7: What a Grounded Answer Costs at Volume" },
    { id: "step-8", label: "Step 8: Rate Limits, Queues and Graceful Degradation" },
    { id: "step-9", label: "Step 9: Honest Limits — Vendor Claims and Citation Checks" },
  ],
  steps: [
    {
      num: "01",
      title: "Two Ways to Give DeepSeek Retrieval",
      description:
        "RAG always means the same three moves: retrieve something relevant, put it in the prompt, and generate an answer that leans on it. What changes is where the retrieved text comes from. With DeepSeek you have two real options, and they are not interchangeable — one is an index you build and own; the other is a live web index you rent by the request[1].",
      paragraphs: [
        "The first route is the classic vector RAG stack. You chunk your corpus, call an embedding model to turn each chunk into a vector, store those vectors in a database, and at query time embed the question, run a nearest-neighbour search, and stuff the top chunks into the prompt. DeepSeek is the generation half of that pipeline; the retrieval half is infrastructure you assemble and keep running.",
        "The second route became available on October 17, 2026, when DeepSeek opened a Search API and a Fetch API. Instead of maintaining an index, you send a query string to `POST /v1/tools/search` and get back ranked web results that already carry a relevance score, an authority tier, a publication date, a short snippet, and a model-ready summary[1]. Fetch then turns any single URL into Markdown when you need the full page. There is no corpus to chunk, no embeddings to recompute, and no index to keep in sync.",
        "The decision is not \"which is better\" but \"which corpus are you indexing\". If the knowledge lives in documents you own and does not exist on the public web, no search API will find it — you need embeddings. If the knowledge is the public web and it changes daily, an index you build yourself is stale the moment it is finished, and Search wins on freshness alone.",
        "A hybrid is the pattern most production systems converge on. Keep a small vector store for the private or stable content you control, and route everything else through Search. One retrieval function, two back ends, a single prompt-building step downstream.",
      ],
      table: {
        headers: ["Dimension", "Vector RAG (self-built)", "Grounded RAG (Search / Fetch)"],
        rows: [
          ["Corpus", "Documents you own or ingest", "Live public web, hundreds of billions of pages[2]"],
          ["Setup cost", "Embedding pipeline + vector DB + chunking logic", "Two POST calls with a key you already have[1]"],
          ["Freshness", "Stale until you re-index", "Real time"],
          ["Offline / air-gapped", "Yes, fully local", "No, requires the API"],
          ["Unit cost", "Embedding calls, storage, and your own compute", "$0.75 per 1,000 successful requests per endpoint[1]"],
          ["Maintenance", "Re-embedding, index tuning, drift", "None beyond client-side caching"],
          ["Quality control", "You choose the chunking and the model", "You inherit DeepSeek's ranking and spam filtering[2]"],
          ["Best for", "Private corpora, compliance, reproducible retrieval", "Current facts, agents that must look things up mid-task"],
        ],
      },
      note: "Build order matters. If your corpus is private, vector RAG is not optional — the Search API has no access to it. If your corpus is the web, get the Search/Fetch loop working first and only add a vector store when you find content worth caching. The [[deepseek-search-api|Search and Fetch API reference]] documents the raw endpoints; this page builds the application on top of them.",
    },
    {
      num: "02",
      title: "What the Search and Fetch Endpoints Hand You",
      description:
        "Before wiring a loop, know the shape of the two responses, because the whole design falls out of them. Search returns a `results` array; Fetch returns a title and a Markdown body[1].",
      list: [
        "Search request: `query` (1–128 characters, operators allowed), plus optional `count` (1–50, default 10), `ori_question`, `localization`, `need_content`[1]",
        "Search result fields: `rerank_score`, `title`, `url`, `snippet`, `summary`, `content`, `site_name`, `site_icon`, `date`, `authority`[1]",
        "Fetch request: `url` only — an HTTP or HTTPS URL with a host, no credentials, at most 8192 characters[1]",
        "Fetch response: `title` and `content`, where content is the page rendered as Markdown[1]",
        "Both endpoints are read-only and authenticate with the same bearer key as chat completions[1]",
      ],
      paragraphs: [
        "Two fields are the reason this API is easy to build on rather than merely possible to build on. `summary` is a 600 to 800 character distillation that the documentation explicitly says is written to be read by a model — that is a retrieval payload, not a UI string[1]. And `content` is empty unless you set `need_content` to true, which keeps the default response small and cheap to pass around.",
        "The result is a clean two-tier design. Search is the cheap broad pass: ten candidates, ranked, each with 700-odd characters of query-relevant text. Fetch is the expensive narrow pass you spend on one or two URLs that survived your gates. You never have to crawl, strip HTML, or guess at a page's publication date, because `date` and `authority` come back as first-class fields[1].",
      ],
      note: "`ori_question` is the field people skip and then regret skipping. If your system rewrites a conversational question into a keyword query — \"what changed in flash 1017\" into \"DeepSeek V4.1 Flash 1017 changelog\" — pass the user's original wording alongside it. The docs describe it as an input that improves query understanding[1].",
    },
    {
      num: "03",
      title: "The Minimal Grounded Loop, End to End",
      description:
        "Here is the smallest pipeline that answers a question with cited, current sources. It is four functions: search, gate, build the prompt, generate. Fetch is wired in but called only when you need full text, because each Fetch is a separate billed request[1].",
      code: `import os, requests

API = "https://api.deepseek.com"
HEADERS = {
    "Authorization": f"Bearer {os.environ['DEEPSEEK_API_KEY']}",
    "Content-Type": "application/json",
}

def search(query, count=10, need_content=False):
    body = {"query": query, "count": count, "need_content": need_content}
    r = requests.post(f"{API}/v1/tools/search", headers=HEADERS, json=body, timeout=30)
    r.raise_for_status()
    return r.json().get("results", [])   # empty list, not an error, when nothing matches

def fetch(url):
    r = requests.post(f"{API}/v1/tools/fetch", headers=HEADERS,
                      json={"url": url}, timeout=30)
    r.raise_for_status()
    return r.json()["content"]           # page as Markdown

def answer(question, top_k=4):
    results = search(question, count=10)
    kept = [x for x in results if x["rerank_score"] >= 1.5][:top_k]
    if not kept:                          # degrade, never raise
        kept = results[:top_k]

    context = "\\n\\n".join(
        f"[{i + 1}] {x['title']} ({x['url']})\\n{x['summary']}"
        for i, x in enumerate(kept)
    )
    prompt = (
        "Answer using only the sources below. Cite each claim as [n]. "
        "If the sources do not contain the answer, say so plainly.\\n\\n"
        f"Question: {question}\\n\\nSources:\\n{context}"
    )
    r = requests.post(f"{API}/chat/completions", headers=HEADERS, timeout=120,
                      json={"model": "deepseek-flash",
                            "messages": [{"role": "user", "content": prompt}]})
    r.raise_for_status()
    return r.json()["choices"][0]["message"]["content"]

print(answer("What changed in DeepSeek V4.1 Flash 1017?"))`,
      paragraphs: [
        "Three decisions in that code matter more than the rest. First, the model is `deepseek-flash`, and since October 17, 2026 that name serves the V4.1-Flash-1017 checkpoint with no configuration change — existing integrations were switched over automatically[1][2]. If you are setting the key up for the first time, [[v4-1-flash-api-setup|the V4.1 Flash API setup guide]] covers the base URL and model name.",
        "Second, the gate runs before the prompt is built. Filtering on `rerank_score >= 1.5` costs nothing and keeps weak results out of the context window; if the filter empties the list, the code falls back to the unfiltered top results rather than returning an error[1].",
        "Third, the citation contract lives in the prompt, not in post-processing. Numbering each source and instructing the model to cite as [n] gives you a cheap way to audit an answer later: if a claim carries no citation, treat it as unverified. That is the single highest-value habit when you are generating over live web content.",
        "When you do need the full page — a long changelog, a legal document, a thread where the argument is in the middle — call `fetch(url)` for that one result and append its Markdown. Do not flip `need_content` to true on the whole search to get one page worth of text; that inflates every result in the response[1].",
      ],
      note: "The response schema for both endpoints, the error codes and the request field table are on the [[deepseek-search-api|Search & Fetch API reference page]]. If a call fails on the model side rather than the tools side, [[deepseek-api-error-codes|the error codes guide]] maps the status codes to causes.",
    },
    {
      num: "04",
      title: "Field Gates — rerank_score, authority, date",
      description:
        "Ranked results are not the same as trustworthy results. The response gives you three independent signals you can threshold before anything reaches the model: relevance, authority, and recency[1].",
      table: {
        headers: ["Field", "Range", "Threshold to use", "Why"],
        rows: [
          ["rerank_score", "0–3", "Keep at or above 1.5", "Docs call 1.5+ high quality; it blends relevance, authority and freshness[1]"],
          ["authority", "0–4 (−1 unknown)", "Prefer 3 or above", "3+ marks a highly authoritative source; 0–2 is weaker[1]"],
          ["date", "RFC 3339 UTC or null", "Apply `after:` instead of post-filtering", "Null on a large share of the web, so never hard-fail on it[1]"],
        ],
      },
      paragraphs: [
        "Use `rerank_score` as a gate with a recovery path, not as a hard filter. A workable default is: keep results at 1.5 and above; if fewer than three survive, re-run the same query with a higher `count`; if the list is still thin, drop the threshold rather than answering from two sources. Widening `count` is free in the pricing sense, so there is little reason to be stingy on the retrieval pass[1].",
        "`authority` answers a different question: is this the kind of page you want to quote? A score of 3 or above is the highly authoritative tier, 0 to 2 is weaker, and −1 means the tier could not be determined at all[1]. When you have more candidates than slots, prefer the higher tier — that is a cheap way to favour primary sources over aggregators without writing a domain allowlist.",
        "Recency deserves special handling because it is the one signal that is frequently missing. `date` is an RFC 3339 timestamp in UTC when it is known and null when it is not, and null is common enough that a pipeline which requires a timestamp will quietly discard good results[1]. The better tool is the `after:` operator, which constrains the index before ranking happens — so results that come back are already inside your window, and you are not filtering away the ones whose date happens to be missing.",
        "Keep the two gates separate in your code so you can tune them independently. Relevance failures usually mean the query needs rewriting or `ori_question` needs to carry more of the original wording. Authority failures usually mean you need a `site:` restriction to primary sources. Conflating them into one score hides which fix applies.",
      ],
      note: "Log the rejected candidates, not just the accepted ones. When an answer later looks wrong, the fastest diagnosis is usually in the results you threw away — and a query that returns ten candidates all below 1.5 is a query that wants a `site:` or `lang:` restriction rather than a threshold adjustment.",
    },
    {
      num: "05",
      title: "Prompt Slots — snippet, summary, content",
      description:
        "Three text fields describe the same page at three different lengths, and each has exactly one job in a RAG pipeline. Using them in the right slot is the difference between a cheap pipeline and an expensive one that reads worse[1].",
      list: [
        "`snippet` (typically 100–200 characters) — for your user interface, in the source list under the answer",
        "`summary` (typically 600–800 characters) — for the model, as the default retrieval payload",
        "`content` (full page) — only with `need_content: true`, and only for pages that justify it; it is the expensive field in token terms",
        "`site_name` and `site_icon` — for the citation card, so the reader can see the source at a glance",
        "`url` — always pass it into the prompt, or you lose the ability to cite or verify",
      ],
      paragraphs: [
        "The default configuration should be: search with `need_content` off, gate on `rerank_score` and `authority`, join the surviving `summary` values into the prompt, and hand the `snippet` values to your UI. That gives the model roughly 700 characters per source, in text that was written for it to read, at a fraction of the token cost of raw page text[1].",
        "Reach for `content` when the question is about a specific detail that summaries flatten — an exact version number in a long changelog, a clause in a spec, a code sample from a documentation page. Fetch that one URL instead of enabling content on the whole search. One Fetch is one billed request, the same as one Search, so the cost of being surgical is negligible[1].",
        "There is a quality argument for the same discipline. Long context is not free quality: five full pages, four of which are tangential, give the model more opportunity to blend unrelated facts into one confident sentence. Five 700-character summaries that all cleared a relevance gate produce tighter answers. Depth is worth fetching; breadth usually is not.",
      ],
      code: `# Default: model-ready summaries only (need_content off)
{"query": "DeepSeek V4.1 Flash 1017 changelog", "count": 10, "ori_question": "what changed in the new flash release"}

# Targeted depth: one URL as Markdown, after the gate passed
POST /v1/tools/fetch  {"url": "https://api-docs.deepseek.com/updates/"}`,
      note: "If you render the answer in a UI, keep the `[n]` citation markers in the text and map them to the `title` plus `url` you passed in. A grounded answer without visible sources is indistinguishable from an ungrounded one to the person reading it.",
    },
    {
      num: "06",
      title: "Narrowing the Index with Operators",
      description:
        "The `query` string is forwarded with its search syntax intact, so you can constrain the index before ranking. This is where a RAG pipeline gets its precision, and it is cheaper than retrieving broadly and filtering after the fact[1].",
      table: {
        headers: ["Operator", "Example", "Use it in RAG to"],
        rows: [
          ["site:", "DeepSeek site:github.com", "Pin retrieval to primary sources; chain with OR for several"],
          ["-site:", "DeepSeek -site:example.com", "Remove a noisy domain from every result set"],
          ["-term", "DeepSeek -advertisement", "Drop pages that contain a spam marker"],
          ["-\"phrase\"", "DeepSeek -\"release notes\"", "Exclude a recurring boilerplate phrase"],
          ["\"phrase\"", "DeepSeek \"exact phrase\"", "Require verbatim wording, such as an API field name"],
          ["lang:", "DeepSeek lang:zh,en", "Restrict to languages your users read"],
          ["after:", "DeepSeek after:2025-01-01", "Fence retrieval to a freshness window"],
          ["before:", "DeepSeek before:2026-06-01", "Exclude anything newer than your trusted snapshot"],
        ],
      },
      paragraphs: [
        "Two behaviours are worth internalizing. Multiple `site:` clauses combine with OR rather than intersecting, so `site:github.com OR site:huggingface.co` searches both repositories in one call[1]. Exclusion operators work the other way: several space-separated terms each subtract from the result set, which makes `-site:` the practical answer to a domain that keeps ranking but keeps being useless for your users.",
        "For an application, the operators that earn their place are `site:`, `lang:` and `after:`. A chatbot answering questions about your own open-source project can pin retrieval to the project's repository and docs domain and stop fighting forum reposts. A digest job can wrap its query in an `after:` fence and treat the window as reproducible. A multilingual product can fix the language instead of trusting ranking to guess.",
        "The 128-character limit on `query` is the constraint to respect, and operator syntax eats into it. Build queries programmatically, log the exact string you sent, and treat an empty `results` array as a routing signal rather than a failure — a normal search with no matches returns HTTP 200 with an empty array, which is also not billed[1]. If a filtered query keeps coming back empty, the filter is wrong, not the API.",
      ],
      code: `{
  "query": "DeepSeek V4.1 Flash site:api-docs.deepseek.com OR site:github.com lang:en after:2026-10-01",
  "count": 10
}`,
      note: "Combine `after:` with the `date` field rather than choosing between them. The operator constrains the index; the field lets you display and double-check the timestamp you got back. One is retrieval control, the other is provenance.",
    },
    {
      num: "07",
      title: "What a Grounded Answer Costs at Volume",
      description:
        "Retrieval here is billed per successful request, and the model is billed per token — two different meters, which makes the total easy to misread. Here is the arithmetic for 1,000 grounded answers on `deepseek-flash`[1][3].",
      table: {
        headers: ["Component", "Assumption", "Off-peak", "Peak"],
        rows: [
          ["Search requests", "1 per question = 1,000 successful", "$0.75", "$0.75"],
          ["Fetch requests", "0.3 per question = 300 successful", "$0.225", "$0.225"],
          ["Model input", "3,500 tokens per question, cache miss", "$0.525", "$1.05"],
          ["Model output", "250 tokens per question", "$0.15", "$0.30"],
          ["Total per 1,000 answers", "—", "≈ $1.65", "≈ $2.33"],
        ],
      },
      paragraphs: [
        "The retrieval meter is unusually simple: Search and Fetch each cost $0.75 per 1,000 successful requests, billed per request rather than per token or per returned result. A request is billable only when it returns HTTP 200 and produces a result — Search must return a non-empty `results` array, and Fetch must return page content. Failed requests, empty results and timeouts are not billed[1]. That is why the table says 300 Fetches rather than 1,000: a pipeline that fetches only when a result clears the gate pays for the depth it actually uses.",
        "Two consequences follow. `count` is free in the pricing sense — asking for 50 results with `need_content` enabled costs the same $0.00075 as asking for one — so widening retrieval is a quality decision, not a budget one[1]. And aggressive filtering is nearly free, because rejected queries that return nothing are not charged at all.",
        "The model meter is where the money actually is, and caching moves it more than anything else. Off-peak `deepseek-flash` input is $0.15 per million tokens on a cache miss and $0.003 on a cache hit, with output at $0.60; peak rates are exactly double, and peak hours are 01:00–04:00 and 06:00–10:00 UTC on weekdays[3]. At a 90% cache-hit rate on input, the model side of the table above collapses from $0.675 to about $0.06 and the whole 1,000-answer bill lands near $1.19. Per answer, that is roughly a tenth of a cent to a fifth of a cent — retrieval included. If your workload is cache-friendly in any way, [[v4-1-flash-api-setup|getting the key and base URL right]] is the cheap part of the work; measuring cache behaviour is the part that pays.",
        "The free window is the other number worth planning around. Search and Fetch calls made through server-side tools in DeepSeek Harness, Claude Code and Codex are free for DeepSeek API users until billing begins on October 31, 2026 at 16:00 UTC[1][4]. The documentation frames the same concession as covering Claude Code's built-in Web Search tool and Codex's `web_search` feature for the first two weeks after launch, with the billing start date announced separately[1]. Either way, that window is the natural time to load-test your loop: the retrieval meter is off, so you can measure real latency and re-rank quality without watching a bill. Build metering into your client now, before the window closes.",
      ],
      note: "Do the comparison against vector RAG honestly. A self-built index has no per-request fee, but it has embedding calls, storage, and the engineering time to re-index. For a workload of a few thousand questions a month over public web content, $1.65 per 1,000 answers with zero maintenance is hard to beat. For a fixed private corpus queried millions of times, the meter eventually loses to an index you own.",
    },
    {
      num: "08",
      title: "Rate Limits, Queues and Graceful Degradation",
      description:
        "Per account, Search and Fetch are limited independently at 5 QPS each, and traffic to one does not consume the other's quota. The limit applies at the account level regardless of which API key you use, and it is separate from the model concurrency limits[1].",
      table: {
        headers: ["API", "Account-level QPS", "Extra constraint"],
        rows: [
          ["Search", "5", "Account-wide, shared across all keys"],
          ["Fetch", "5", "Account-wide plus a per-domain QPS limit"],
        ],
      },
      paragraphs: [
        "The ceiling is tighter than it first appears. Five searches per second means a fan-out over 100 queries takes at least 20 seconds even with perfect pipelining, and minting five keys does not give you 25 QPS — it gives you five keys sharing five[1]. Fetch has a second, per-domain limit on top of that, so a tight loop against a single host will return HTTP 429 even while your account-wide budget has headroom.",
        "So a queue is not optional; it is the retrieval client. Serialize Search calls through a single rate limiter set below the cap, keep Fetch concurrency separate, and cache aggressively — the same query within a few minutes almost always deserves a cache hit rather than a second billable request. A simple approach that holds up in production is a token-bucket or fixed-interval limiter around every outbound tools call.",
        "Errors need a triage table rather than a generic retry. For 408, 429 and 5xx, wait and retry with backoff. For 402, top up the account before retrying. For every other 4xx, do not retry without changing the request[1]. On the Fetch side, 403 means the security policy rejected the fetch and 404 means no usable content could be extracted — neither is transient, so retrying an unchanged URL will never succeed.",
        "The last requirement is the one that separates a demo from an application: retrieval failure must degrade, not explode. If Search returns an empty array, or the queue is saturated, or the request 429s through your retry budget, the right behaviour is to answer with no sources and say so — not to throw a 500 at the user. Wrap retrieval in a function that returns an empty list on exhaustion, keep the source list empty in the prompt, and instruct the model to answer from its own knowledge while flagging that no live sources were used. The user gets a weaker answer instead of an error page[1].",
      ],
      code: `import time, threading, requests

class ToolQueue:
    """Search and Fetch are capped at 5 QPS per account, each independently."""
    def __init__(self, qps=5.0):
        self.interval = 1.0 / qps
        self.lock = threading.Lock()
        self.next_at = 0.0

    def run(self, fn, *args, **kwargs):
        with self.lock:
            now = time.monotonic()
            wait = max(0.0, self.next_at - now)
            self.next_at = max(now, self.next_at) + self.interval
        time.sleep(wait)
        for attempt in range(6):
            try:
                return fn(*args, **kwargs)
            except requests.HTTPError as e:
                status = e.response.status_code
                if status not in (408, 429, 500, 504):
                    raise                    # non-retryable: fix the request
                time.sleep(min(2 ** attempt, 30))
        return []                        # degrade to an unsourced answer

search_q = ToolQueue(qps=5)
fetch_q = ToolQueue(qps=5)`,
      note: "Watch the model-side concurrency limit separately. `deepseek-flash` allows 2500 concurrent requests, which is far above the 5 QPS tools ceiling — so the tools endpoints will bottleneck long before the model does. If your agent makes many tool calls per turn, plan the retrieval queue as the throughput limit of the whole system, not an edge case. [[v4-1-flash-coding-agents|Agent stacks that call tools in a loop]] feel this first.",
    },
    {
      num: "09",
      title: "Honest Limits — Vendor Claims and Citation Checks",
      description:
        "DeepSeek describes the engine behind Search as screening out SEO spam, GEO manipulation and low-quality AIGC through strict detection mechanisms[2]. That is a vendor description of an in-house system, and it should shape how much you trust the output rather than how little work you do validating it.",
      paragraphs: [
        "Read the claim in the right frame. An engine that suppresses keyword-stuffed filler is a genuine quality feature — it is one of the reasons a first-party search layer beats scraping a general engine and hoping the top result is the primary source. But it is DeepSeek's own account of its own index, published the same day the API launched, and it has not been independently benchmarked in the way the model's evaluation numbers have been. Treat it as a reasonable prior, not a guarantee[2].",
        "The stronger reason for caution is structural. Retrieval reduces hallucination by giving the model real text to work from; it does not eliminate it. A model can misattribute a summary to the wrong source, merge two pages into one claim, or invent a citation number that does not exist. The `[n]` contract in the prompt is what makes those failures visible — but only if something checks it. At minimum, verify that every citation marker in the answer maps to a source you actually passed in, and that the source's `summary` or `content` plausibly supports the sentence it is attached to. For higher-stakes answers, spend one Fetch on the cited URL and diff the claim against the Markdown.",
        "Set expectations for the two failure modes separately. A relevance failure looks like a well-cited answer drawn from the wrong pages, and it is fixed in retrieval: tighten with `site:` and `lang:`, raise the `rerank_score` gate, add `ori_question`. A grounding failure looks like a confident sentence with a citation that does not support it, and it is fixed in the prompt and in validation, not in the search parameters. Teams that only tune one of the two usually end up blaming the model for a retrieval problem, or the search for a prompt problem.",
        "The last caveat is about coverage. Search answers questions the public web can answer, and it returns an empty `results` array for the rest. Depending on which words a page uses, on what `lang:` and `after:` filters you applied, and on what the engine chose to index, a perfectly good source can be invisible to your query. A pipeline that treats retrieval as always-successful will confidently answer from nothing. A pipeline that treats an empty result as a distinct outcome — no sources, tell the user, offer to answer from general knowledge — behaves correctly when the web simply does not have the page.",
      ],
      list: [
        "Do not ship an answer with citations you have not validated; the `[n]` markers are an audit trail only if something audits them",
        "Keep an explicit \"no sources found\" path — an empty `results` array is a valid outcome, not an error[1]",
        "Tune relevance failures in retrieval and grounding failures in the prompt; they are different bugs",
        "Re-measure on your own query set before trusting the spam-filtering claim for production filtering decisions[2]",
        "Cache results and log the full query string, so a bad answer can be reproduced later",
        "Do not call the retrieval layer a hallucination fix; it is a grounding source that still needs checking",
      ],
      note: "This page covers the application layer. The endpoint schemas, the request field table, the full operator list and the model-side pricing all live on the [[deepseek-search-api|Search & Fetch API reference]], and the reference material on the checkpoint itself is on [[deepseek-v4-1-flash-1017|what changed on October 17]].",
    },
  ],
  prevGuide: { title: "DeepSeek Search & Fetch API: Setup, Pricing, Operators", slug: "deepseek-search-api" },
  nextGuide: { title: "DeepSeek-V4.1-Flash-1017: What Changed on Oct 17", slug: "deepseek-v4-1-flash-1017" },
  relatedGuides: [
    { title: "DeepSeek Search & Fetch API: Setup, Pricing, Operators", slug: "deepseek-search-api" },
    { title: "DeepSeek API Error Codes Explained", slug: "deepseek-api-error-codes" },
    { title: "DeepSeek-V4.1-Flash-1017: What Changed on Oct 17", slug: "deepseek-v4-1-flash-1017" },
    { title: "DeepSeek V4.1 Flash API Setup: Base URL & Model ID", slug: "v4-1-flash-api-setup" },
    { title: "DeepSeek V4.1 Flash Coding Agents: Harness and CLI Stacks", slug: "v4-1-flash-coding-agents" },
  ],
  sources: [
    { label: "DeepSeek API Docs: Search & Fetch", url: "https://api-docs.deepseek.com/guides/search" },
    { label: "DeepSeek API Changelog (search API opened, Oct 17, 2026)", url: "https://api-docs.deepseek.com/updates/" },
    { label: "DeepSeek API Docs: Models & Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "MarkTechPost: DeepSeek V4.1-Flash-1017 Opens Search API", url: "https://www.marktechpost.com/2026/10/17/deepseek-just-released-v4-1-flash-1017-scores-77-0-on-deepswe-opens-search-api/" },
    { label: "Developers Digest: DeepSeek V4.1 Flash 1017 Release Guide", url: "https://www.developersdigest.tech/blog/deepseek-v4-1-flash-1017-release-guide-2026" },
  ],
};
