# DeepSeek Context Caching: Live Cache-Hit Tests & Cost Guide

- **URL**: https://chat-deep.ai/docs/deepseek-context-caching/
- **Published**: 2026-04-05T15:19:58+00:00
- **Modified**: 2026-07-27T07:07:05+00:00
- **Category**: DeepSeek API Docs
- **Word count**: 3272
- **Code blocks**: 2
- **Description**: Test DeepSeek context and prompt caching with live API calls. See cache-hit fields, prefix rules, cost math, latency results, and fixes for zero hits.

## H1


## H2 目录
- DeepSeek Context Caching: The Short Answer
- What DeepSeek Officially Documents
- Context Caching Is Not Conversation Memory
- Our Test Method
- Live Result 1: Exact Extension Produced a 98.23% Hit Rate
- Live Result 2: The Long A+B, A+C, A+D Sequence Hit on Calls 2 and 3
- How Prefix Length Changed the Observed Hit Rate
- Stable Prefix vs. a Volatile First Line
- Live Result 3: user_id Isolated the Observed Cache State
- Current DeepSeek Cache Pricing and Cost Formula
- Runnable Python Direct-HTTP Three-Call Test
- Cache-Friendly Prompt Design
- Why DeepSeek Cache Hits May Be Zero
- Thinking Mode, Tool Calls, and Security
- DeepSeek Context Caching FAQ
- Sources and Test Transparency

## 正文
DeepSeek context caching can make repeated API input dramatically cheaper, but a shared prefix is not a guarantee of an immediate cache hit. In our live test, an exact-extension request achieved a 98.23% cache-hit rate, four warm requests with a stable long prefix achieved 99.79%, and five similarly sized requests whose first line changed every time achieved 0%. This guide separates DeepSeek’s documented behavior from our bounded observations, shows the returned token evidence, and provides a runnable direct-HTTP Python test.

Last tested: July 27, 2026, 06:24–06:31 UTC (July 26, 2026 PDT). We used the hosted DeepSeek Chat Completions endpoint, deepseek-v4-flash, non-thinking mode, non-streaming responses, short outputs, and deterministic synthetic English content. Chat-Deep.ai is independent and is not affiliated with DeepSeek. Recheck current behavior and prices in DeepSeek’s official documentation before a production decision.


### DeepSeek Context Caching: The Short Answer

- DeepSeek says context caching is enabled automatically; there is no separate cache switch in a normal request.

- A later input can receive cache-hit tokens when it fully reuses a prefix unit that DeepSeek has already persisted.

- The API reports the result through prompt_cache_hit_tokens and prompt_cache_miss_tokens.

- Caching reuses input computation. It does not store an answer, guarantee identical output, or make the stateless API remember a conversation.

- Stable material belongs at the beginning of the request. A changing timestamp, request ID, or user-specific line at the top can destroy useful prefix reuse.

- DeepSeek describes the system as best effort. Cache construction, availability, and retention remain provider-managed.


![Redacted DeepSeek context caching live API evidence showing prompt cache hit and miss tokens](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


### What DeepSeek Officially Documents

DeepSeek’s official Context Caching guide describes an on-disk cache that is enabled by default. A hit requires more than semantically similar text: the later request must fully match a complete cache prefix unit that has already been persisted. The current guide lists three persistence paths:

- Request boundaries: a prefix unit can be persisted at the end of user input and at the end of model output.

- Common-prefix detection: after multiple requests reveal a shared prefix, that common prefix can be persisted as its own unit.

- Fixed token intervals: long inputs and outputs can be divided into prefix units at provider-defined intervals.

The official guide illustrates two important shapes. With A+B followed by A+B+C, the second request can reuse the complete A+B unit. With divergent suffixes—A+B, then A+C—the idealized example says the second request does not fully match the first unit. After the common A is detected and persisted, a third A+D request can hit it.

That documented sequence is a conceptual model, not a promise about every long request. Fixed-interval persistence and best-effort cache state can affect the returned counts. DeepSeek also says cache construction takes seconds and that unused entries are usually cleared within hours to days. The correct production rule is therefore to log the API’s usage fields instead of predicting a hit from string comparison alone.


### Context Caching Is Not Conversation Memory

DeepSeek’s multi-round conversation guide calls /chat/completions stateless. Your application must resend the prior messages it wants the model to use. Context caching may make the repeated beginning cheaper, but it does not reconstruct omitted history, save user preferences, or create a durable memory layer.


Mechanism | What it does | Who supplies the context?
DeepSeek context cache | Reuses eligible persisted input-prefix computation | Your application resends the input
Conversation history | Supplies earlier messages to the model | Your application stores and resends it
Application memory | Stores selected facts, preferences, or summaries | Your product and data layer
Response cache | Returns a previously stored answer | Your application or gateway; this is not DeepSeek context caching


### Our Test Method

We measured the cache-token fields returned by https://api.deepseek.com/chat/completions. The benchmark used one account, one endpoint, deepseek-v4-flash, thinking disabled, streaming disabled, and a short output limit. Every prompt contained deterministic synthetic English records; no customer content or personal data was sent. We recorded HTTP status, model, prompt tokens, cache-hit tokens, cache-miss tokens, completion tokens, finish reason, UTC time, and total non-streaming response time.

The suites covered exact extension, three divergent suffixes, stable versus volatile first lines, user_id isolation, eight prefix lengths, and two single-line mutations. A run-specific synthetic marker reduced accidental pre-warming from an earlier run. The key, authorization header, account balance, raw user IDs, prompts, responses, and raw bodies were excluded from the public results.


> Interpretation boundary: these are observations for one account, payload family, model, and seven-minute window. They do not reveal DeepSeek’s infrastructure and do not guarantee that another request, account, model, date, or third-party host will behave identically.


### Live Result 1: Exact Extension Produced a 98.23% Hit Rate

The cold request contained 6,893 prompt tokens and reported zero hits. The second request extended the complete earlier context and contained 6,906 prompt tokens. It reported 6,784 cache-hit tokens and 122 cache-miss tokens: a 98.23% hit rate.


Call | HTTP | Prompt tokens | Hit tokens | Miss tokens | Latency
Cold | 200 | 6,893 | 0 | 6,893 | 996 ms
Exact extension | 200 | 6,906 | 6,784 | 122 | 1,020 ms

At the Flash prices verified for this test, the second call’s input cost was approximately $0.00003608. Treating all 6,906 input tokens as cache misses would have cost approximately $0.00096684. That is a 96.27% reduction in input cost for this request, not a 96.27% reduction in its total cost: output tokens are still billed separately.


### Live Result 2: The Long A+B, A+C, A+D Sequence Hit on Calls 2 and 3

We next sent three requests with the same long byte-for-byte prefix A and three different suffixes. Call 1 was cold. Calls 2 and 3 each returned more than 7,000 cache-hit tokens.


Call | Shape | Prompt tokens | Hit tokens | Miss tokens | Latency
1 | A+B | 7,074 | 0 | 7,074 | 1,250 ms
2 | A+C | 7,074 | 7,040 | 34 | 1,055 ms
3 | A+D | 7,072 | 7,040 | 32 | 945 ms


![DeepSeek context caching prefix test matrix with cache hit rates from 92 to 5172 prompt tokens](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

This differs from a simplistic reading of the official divergent-suffix example, where the second call is described as a miss and the third can hit the newly detected common prefix. A plausible explanation is that our approximately 7,000-token shared prefix was long enough for fixed-interval persistence from the first request. That explanation is an inference consistent with the documented persistence paths; the API response does not identify which internal path produced a hit, so we cannot prove it.

The practical conclusion is more useful than forcing every workload into the A/B diagram: exact prefix stability matters, long prompts may expose additional persisted units, and the returned usage fields are the evidence that billing and monitoring should use.


### How Prefix Length Changed the Observed Hit Rate

Our cold-and-warm matrix ranged from 92 to 5,172 prompt tokens. The 92- and 132-token warm requests reported no hits. The 212-token request reported 128 hit tokens, and the hit share rose as the stable prefix grew.


Warm prompt tokens | Cache-hit tokens | Cache-miss tokens | Observed hit rate
92 | 0 | 92 | 0%
132 | 0 | 132 | 0%
212 | 128 | 84 | 60.38%
372 | 256 | 116 | 68.82%
692 | 640 | 52 | 92.49%
1,332 | 1,280 | 52 | 96.10%
2,612 | 2,560 | 52 | 98.01%
5,172 | 5,120 | 52 | 98.99%

Every non-zero hit count in this matrix was a multiple of 128. That is an observation, not proof of an official current minimum or storage-unit size. DeepSeek’s public guide does not publish the fixed interval, and a small sample cannot establish an implementation contract. Do not hard-code “128 tokens” as a production rule.


### Stable Prefix vs. a Volatile First Line

Four warm requests using a stable long prefix processed 23,602 prompt tokens: 23,552 were hits and only 50 were misses, for a 99.79% aggregate hit rate. Their median non-streaming latency was 1,035 ms. Five requests with a similarly sized body but a different first line every time processed 29,573 prompt tokens and reported zero cache hits; median latency was 1,139 ms.


![Comparison of stable and volatile DeepSeek prompt prefixes showing 99.79 percent versus zero cache hits](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

The stable group’s measured input cost was $0.00007296 versus a $0.00330428 all-miss baseline, a difference of $0.00323132. The volatile group cost $0.00414022 for input—the same as its all-miss baseline. The groups contained different request counts, so compare their hit rates and per-token behavior rather than treating the total dollar amounts as a controlled latency or cost benchmark.

Two additional controls changed one synthetic line in the middle or near the end of an otherwise repeated prompt. Those second requests reported zero hits across 5,748 and 6,201 input tokens respectively. This does not prove that every middle or late edit always invalidates the whole cache. It does show why prompt teams should version and test the exact serialized request instead of assuming that “mostly unchanged” text will preserve a useful persisted unit.


### Live Result 3: user_id Isolated the Observed Cache State

DeepSeek’s Rate Limit & Isolation guide says user_id provides KVCache isolation for users under the same account. We warmed one synthetic prefix for user A, sent the same prefix as user B, warmed B, and then returned to A.


Phase | Prompt tokens | Hit tokens | Miss tokens | Latency
User A cold | 5,901 | 0 | 5,901 | 1,217 ms
User A warm | 5,901 | 5,888 | 13 | 1,166 ms
User B first request | 5,901 | 0 | 5,901 | 1,039 ms
User B warm | 5,901 | 5,888 | 13 | 1,086 ms
User A recheck | 5,901 | 5,888 | 13 | 999 ms


![DeepSeek user_id cache isolation test for two synthetic users](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

The returned token fields were consistent with documented user_id isolation. This experiment did not inspect DeepSeek’s infrastructure, so it should not be described as a security audit. Use a stable pseudonymous identifier matching [a-zA-Z0-9\-_]+, up to 512 characters, and never put names, email addresses, account numbers, or other personal information in it. For concurrency behavior and implementation details, see our DeepSeek API rate limits guide.


### Current DeepSeek Cache Pricing and Cost Formula

DeepSeek bills cache-hit input, cache-miss input, and output separately. The following rates were verified on July 26, 2026 against the official Models & Pricing page. Prices can change; use our DeepSeek API pricing guide for broader budgeting and recheck the official table before deployment.


Model | Cache-hit input / 1M | Cache-miss input / 1M | Output / 1M
deepseek-v4-flash | $0.0028 | $0.14 | $0.28
deepseek-v4-pro | $0.003625 | $0.435 | $0.87


```
cache_hit_rate =
  prompt_cache_hit_tokens / prompt_tokens * 100

input_cost =
  prompt_cache_hit_tokens / 1_000_000 * cache_hit_price
  + prompt_cache_miss_tokens / 1_000_000 * cache_miss_price

no_cache_input_cost =
  prompt_tokens / 1_000_000 * cache_miss_price
```

The Chat Completions reference states that prompt_tokens equals cache-hit plus cache-miss prompt tokens. Validate that equation in telemetry. Do not calculate “total savings” from input alone: add completion cost, reasoning-token effects where applicable, network overhead, retries, and the value of model quality.


### Runnable Python Direct-HTTP Three-Call Test

This dependency-free Python example sends A+B, A+C, and A+D directly over HTTPS. It creates a new synthetic prefix and pseudonymous user_id each time, never prints the key, makes no automatic retries, and waits five seconds between calls. Set DEEPSEEK_API_KEY in the current process before running it. Our API key guide explains safer server-side storage.


```
#!/usr/bin/env python3
import json
import os
import time
import uuid
import urllib.error
import urllib.request

URL = "https://api.deepseek.com/chat/completions"
MODEL = "deepseek-v4-flash"
HIT_PRICE = 0.0028
MISS_PRICE = 0.14

api_key = os.environ.get("DEEPSEEK_API_KEY")
if not api_key:
    raise SystemExit("Set DEEPSEEK_API_KEY for this process.")

run_id = uuid.uuid4().hex[:12]
user_id = f"cache-demo-{run_id}"

records = "\n".join(
    f"Record {i:03d}: product=Aster; region=North; units={1000 + i}; "
    "policy=Use only these synthetic records and return no private data."
    for i in range(1, 221)
)

system_text = (
    f"Cache benchmark {run_id}. This is deterministic synthetic English. "
    "Reply with only OK."
)
stable_prefix = (
    "REFERENCE DATA\n"
    f"{records}\n"
    "END REFERENCE DATA\n"
)

suffixes = [
    "B: Confirm that the reference block is present.",
    "C: Confirm that the records are synthetic.",
    "D: Confirm that no personal data is present.",
]

def send_call(call_number, suffix):
    payload = {
        "model": MODEL,
        "messages": [
            {"role": "system", "content": system_text},
            {"role": "user", "content": stable_prefix + "\nTASK\n" + suffix},
        ],
        "thinking": {"type": "disabled"},
        "user_id": user_id,
        "max_tokens": 24,
        "stream": False,
    }

    request = urllib.request.Request(
        URL,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    started = time.perf_counter()
    try:
        with urllib.request.urlopen(request, timeout=120) as response:
            result = json.loads(response.read().decode("utf-8"))
            status = response.status
    except urllib.error.HTTPError as error:
        raise SystemExit(f"Call {call_number} failed with HTTP {error.code}")
    except urllib.error.URLError as error:
        raise SystemExit(f"Call {call_number} failed: {error.reason}")

    latency_ms = round((time.perf_counter() - started) * 1000)
    usage = result["usage"]
    prompt = int(usage["prompt_tokens"])
    hits = int(usage["prompt_cache_hit_tokens"])
    misses = int(usage["prompt_cache_miss_tokens"])

    if prompt != hits + misses:
        raise RuntimeError("Prompt-token accounting did not balance.")

    hit_rate = hits / prompt * 100 if prompt else 0
    input_cost = (hits * HIT_PRICE + misses * MISS_PRICE) / 1_000_000

    print({
        "call": call_number,
        "http_status": status,
        "model": result.get("model"),
        "prompt_tokens": prompt,
        "cache_hit_tokens": hits,
        "cache_miss_tokens": misses,
        "hit_rate_percent": round(hit_rate, 2),
        "input_cost_usd": round(input_cost, 10),
        "latency_ms": latency_ms,
    })

for number, suffix in enumerate(suffixes, start=1):
    send_call(number, suffix)
    if number != len(suffixes):
        time.sleep(5)
```

Your counts may differ from ours. A zero on call 2 is compatible with the official common-prefix example; a hit can also be compatible with documented fixed-interval persistence for a sufficiently long prefix. Run the complete sequence, keep all rows, and describe what the API returned. For OpenAI-client setup, environment handling, and error management, see the DeepSeek Python SDK guide.

For the complete dependency-free Node.js benchmark, including exact-extension, divergent-suffix, stable/volatile, prefix-length, mutation, and user_id suites, use the DeepSeek context-caching reproducible test harness on GitHub. Review the request plan before supplying a temporary key.


### Cache-Friendly Prompt Design

- Put stable content first: system instructions, policy text, long documents, tool definitions, and fixed examples should precede the changing task.

- Move volatile values later: timestamps, request IDs, session state, retrieved snippets, and the current question should follow reusable material whenever meaning permits.

- Preserve exact serialization: whitespace, headings, JSON property order, example order, and wrappers can change tokens even when the meaning looks unchanged.

- Version deliberately: record a prompt-prefix version and expected hash in application telemetry so a hit-rate drop can be tied to a release.

- Keep tenant identity out of prompt position zero: use the documented user_id field for isolation instead of prepending changing personal identifiers to a shared template.

- Measure by workload: long-document Q&A, repeated repository context, fixed few-shot examples, support policies, and multi-turn history are stronger candidates than one-off short prompts.

Production systems should record hit, miss, prompt, completion, and reasoning-token counts alongside model, prompt version, tenant-safe identifier, latency, status, finish reason, and cost. Our DeepSeek observability guide shows how to turn these fields into dashboards and alerts.


### Why DeepSeek Cache Hits May Be Zero


Symptom | Likely explanation | What to check
Every request is a miss | The first tokens change | Diff the exact system message and serialized request beginning
Second divergent request misses | The shared prefix has not yet been persisted as its own unit | Send the complete third request and inspect its usage
Short prompts never hit | No eligible persisted unit was observed | Test a longer deterministic prefix; do not assume an undocumented minimum
One tenant misses after another warms | user_id isolation | Confirm the same pseudonymous ID is used for that tenant
Hit rate fell after deployment | Prompt text, order, tools, model, or mode changed | Compare prompt hashes and release versions
A formerly warm prompt misses | Best-effort cache state expired or was unavailable | Keep the request valid without a hit and measure over time
Output differs despite a hit | Output inference is performed again | Do not confuse context caching with response caching

Do not retry merely to chase a cache hit. A miss is a valid successful request, and an automatic retry adds cost and duplicate work. Retry only appropriate transient failures with bounded backoff. Also avoid treating the small latency differences in this test as a service-level guarantee: these were non-streaming samples with short outputs, not a statistically powered time-to-first-token benchmark.


### Thinking Mode, Tool Calls, and Security

Both current V4 API models support thinking and non-thinking modes, with thinking enabled by default in the current documentation. We disabled it to keep the cache experiment focused. In an application, prompt-prefix stability still matters, but reasoning and tool workflows have additional message-history requirements. See the dedicated DeepSeek Thinking Mode guide and DeepSeek Tool Calls guide before changing or removing prior reasoning fields.

Context caching is not a reason to send more data. Apply the same data-minimization, authorization, retention, and vendor-review standards used for ordinary API input. Keep API keys server-side, use synthetic data in public benchmarks, avoid personal data in user_id, and never publish raw prompts or responses without reviewing them. Start with the broader DeepSeek API guide if you are building your first integration.


### DeepSeek Context Caching FAQ


#### Is DeepSeek context caching automatic?

Yes. DeepSeek’s official guide says it is enabled by default and requires no cache-specific request switch. Your request structure still determines how much reusable prefix may be available.


#### Why did my second request show zero cache-hit tokens?

If the calls are A+B and A+C, the second request may not fully match a previously persisted A+B unit. Common-prefix detection can make A available for a later A+D request. Short length, changed early tokens, isolation, construction delay, or best-effort availability can also explain a miss.


#### How do I verify a cache hit?

Read usage.prompt_cache_hit_tokens and usage.prompt_cache_miss_tokens. Confirm that their sum equals usage.prompt_tokens, then calculate the hit share and cost with the current model rates.


#### Does repeated text in the middle of a prompt count?

Do not rely on semantic or middle-text similarity. DeepSeek documents prefix units. Put reusable content at the beginning and test the exact serialized input.


#### Does caching remember my conversation?

No. The Chat Completions API is stateless. Your application must resend the history required for the next answer; caching can only reduce eligible repeated-input processing.


#### How long does the DeepSeek cache last?

DeepSeek says unused entries are usually cleared within a few hours to a few days. This is not a retention guarantee. Applications must work correctly and remain within budget when every request is a miss.


#### Does user_id affect cache sharing?

DeepSeek documents user_id as a KVCache-isolation control. Our two-user test returned independent cold and warm states consistent with that documentation. Use a stable pseudonymous value and no personal information.


#### Does a cache hit return the same answer?

No. DeepSeek says the output is generated through inference again. Sampling, model behavior, tools, and changing suffixes can produce a different answer even when much of the input is a cache hit.


#### Is 128 tokens the official cache block size?

No official current block size is stated in the public guide. Our non-zero matrix results were multiples of 128, but that bounded observation cannot establish a provider contract or minimum.


#### Can DeepSeek context caching be guaranteed?

No. DeepSeek calls it best effort. Design for correctness, acceptable latency, and affordable cost on a cache miss; treat hits as measured optimization rather than required application state.


#### Does the same caching behavior apply through OpenRouter, Azure, or another provider?

Do not assume it does. Our test used DeepSeek’s hosted API directly. A gateway or cloud host can expose different model IDs, usage fields, cache controls, prices, routing, and retention behavior. Check that provider’s current documentation and run a cold/warm control against the exact endpoint you will deploy.


### Sources and Test Transparency

- DeepSeek Context Caching — persistence rules, usage fields, output behavior, best-effort construction, and retention.

- Create Chat Completion — current models, request fields, and token accounting.

- Models & Pricing — rates used for the dated calculations.

- Rate Limit & Isolation — current user_id requirements and KVCache isolation.

- Multi-round Conversation — stateless conversation handling.

- Chat-Deep.ai reproducible context-caching harness — public Node.js methodology and rerunnable test code.

## 内部链接
- [DeepSeek API rate limits guide](https://chat-deep.ai/docs/api-rate-limits/)
- [DeepSeek API pricing guide](https://chat-deep.ai/pricing/)
- [API key guide](https://chat-deep.ai/docs/deepseek-api-key/)
- [DeepSeek Python SDK guide](https://chat-deep.ai/docs/deepseek-python-sdk/)
- [DeepSeek observability guide](https://chat-deep.ai/docs/deepseek-observability/)
- [DeepSeek Thinking Mode guide](https://chat-deep.ai/docs/deepseek-thinking-mode/)
- [DeepSeek Tool Calls guide](https://chat-deep.ai/docs/deepseek-tool-calls/)
- [DeepSeek API guide](https://chat-deep.ai/docs/api/)

## 外部链接
- [official Context Caching guide](https://api-docs.deepseek.com/guides/kv_cache/)
- [multi-round conversation guide](https://api-docs.deepseek.com/guides/multi_round_chat/)
- [Rate Limit & Isolation guide](https://api-docs.deepseek.com/quick_start/rate_limit/)
- [official Models & Pricing page](https://api-docs.deepseek.com/quick_start/pricing/)
- [Chat Completions reference](https://api-docs.deepseek.com/api/create-chat-completion/)
- [DeepSeek context-caching reproducible test harness on GitHub](https://github.com/chatdeepai/deepseek-api-reproducible-tests/tree/main/context-caching)
- [DeepSeek Context Caching](https://api-docs.deepseek.com/guides/kv_cache/)
- [Create Chat Completion](https://api-docs.deepseek.com/api/create-chat-completion/)
- [Models & Pricing](https://api-docs.deepseek.com/quick_start/pricing/)
- [Rate Limit & Isolation](https://api-docs.deepseek.com/quick_start/rate_limit/)
- [Multi-round Conversation](https://api-docs.deepseek.com/guides/multi_round_chat/)
- [Chat-Deep.ai reproducible context-caching harness](https://github.com/chatdeepai/deepseek-api-reproducible-tests/tree/main/context-caching)
- [(no anchor)](https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fdeepseek-context-caching%2F)
- [(no anchor)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fdeepseek-context-caching%2F&text=DeepSeek%20Context%20Caching%3A%20How%20Cache%20Hits%20Work%20and%20How%20to%20Measure%20Them)
- [(no anchor)](https://www.linkedin.com/shareArticle?url=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fdeepseek-context-caching%2F&title=DeepSeek%20Context%20Caching%3A%20How%20Cache%20Hits%20Work%20and%20How%20to%20Measure%20Them)