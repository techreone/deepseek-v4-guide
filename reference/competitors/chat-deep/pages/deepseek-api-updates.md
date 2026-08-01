# DeepSeek API Updates: Changelog & Deprecated Models Tracker

- **URL**: https://chat-deep.ai/docs/deepseek-api-updates/
- **Published**: 2026-07-26T12:57:58+00:00
- **Modified**: 2026-07-28T23:01:39+00:00
- **Category**: DeepSeek API Docs
- **Word count**: 2481
- **Code blocks**: 0
- **Description**: Track DeepSeek API updates, current V4 model IDs, deprecated and unlisted aliases, breaking changes, and dated live compatibility checks.

## H1


## H2 目录
- Latest DeepSeek API Update — Quick Answer
- Current DeepSeek API Model Status
- Official Lifecycle Status vs Observed API Behavior
- Current API Contract Watchlist
- Current V4 Pricing Snapshot
- DeepSeek API Changelog — Newest First
- Deprecated, Retired, Unlisted, Historical, and Rejected Are Different
- What Developers Need to Change Now
- How This Tracker Verifies DeepSeek API Changes
- Update Ledger and Freshness Policy
- Limitations
- Frequently Asked Questions
- Official Sources
- Related DeepSeek Developer Guides

## 正文
DeepSeek API updates now require two separate answers: what DeepSeek officially documents, and what the hosted API accepts at a specific moment. DeepSeek’s current documentation lists deepseek-v4-flash and deepseek-v4-pro. The V4 announcement said deepseek-chat and deepseek-reasoner would become inaccessible after July 24, 2026 at 15:59 UTC. Yet a bounded live check on July 28 found that both old names—and the historical deepseek-coder name—were accepted and routed to deepseek-v4-flash.


> Practical conclusion: build new integrations with deepseek-v4-flash or deepseek-v4-pro. Do not treat the July 28 compatibility behavior as a cancellation of the announced retirement, a support guarantee, or evidence that an unlisted name will keep working. Compatibility routing can change without becoming a new first-party lifecycle promise.

Official sources reviewed: July 28, 2026 · Live test: July 28, 2026, 22:44 UTC · Requests: 7 planned and 7 observed · Retries: 0 · Temporary key: revoked after the run


### Latest DeepSeek API Update — Quick Answer

- Current documented API IDs: deepseek-v4-flash and deepseek-v4-pro.

- Current live inventory: GET /models returned exactly those two IDs on July 28.

- Legacy cutoff: the V4 release notice announced July 24, 2026 at 15:59 UTC as the point after which deepseek-chat and deepseek-reasoner would be inaccessible.

- Post-cutoff observation: on July 28, the two legacy names and deepseek-coder returned HTTP 200 in this account and reported deepseek-v4-flash as the returned model.

- Developer action: migrate to an explicit V4 ID and treat old-name acceptance as temporary compatibility only.

- Latest dated official changelog entry: April 24, 2026. DeepSeek has not added a separate July 24 retirement event to the public changelog as of this review.


#### What Changed Since the July 25 Check?


Probe | July 25 observation | July 28 observation | Interpretation
GET /models | Flash and Pro | Flash and Pro | No inventory change observed
deepseek-v4-flash | HTTP 200 | HTTP 200 | Current documented ID accepted
deepseek-v4-pro | HTTP 200 | HTTP 200 | Current documented ID accepted
deepseek-chat | HTTP 400 | HTTP 200 → Flash | Unlisted compatibility behavior changed
deepseek-reasoner | HTTP 400 | HTTP 200 → Flash | Observed with thinking explicitly disabled
deepseek-coder | HTTP 400 | HTTP 200 → Flash | Historical name accepted but still unlisted
Synthetic invalid control | HTTP 400 | HTTP 400 | The endpoint still rejected an unknown control

The July 25 and July 28 runs used the same seven-operation structure and short synthetic marker contract, but this tracker does not claim that every hidden routing condition or provider-side rollout variable was identical. The defensible finding is narrower: the observed result changed. That is precisely why production code should not infer lifecycle policy from one request.


![DeepSeek API compatibility snapshot showing current models and July 28 alias routing results](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


### Current DeepSeek API Model Status


Exact request ID | First-party status | July 28 /models | July 28 chat result | Production action
deepseek-v4-flash | Current documented model | Listed | HTTP 200; returned Flash | Use explicitly for cost-sensitive workloads
deepseek-v4-pro | Current documented model | Listed | HTTP 200; returned Pro | Use explicitly for higher-capability workloads
deepseek-chat | Past announced discontinuation cutoff | Not listed | HTTP 200; returned Flash | Migrate; do not depend on compatibility routing
deepseek-reasoner | Past announced discontinuation cutoff | Not listed | HTTP 200; returned Flash with thinking disabled | Migrate and set thinking behavior explicitly
deepseek-coder | Historical API name; no current listing | Not listed | HTTP 200; returned Flash | Replace with an explicit current ID

Only the first two rows are supported by both the current model documentation and live inventory. The remaining results are dated compatibility observations. A name can be accepted without appearing in /models; it can also stop being accepted later. Check the official model-list reference, the current pricing and model matrix, and a small live probe before any production change.


### Official Lifecycle Status vs Observed API Behavior

This tracker uses four evidence levels and never substitutes one for another:

- Official lifecycle statement: a dated DeepSeek page explicitly announces a launch, migration window, cutoff, deprecation, or removal.

- Current documented contract: the model matrix, endpoint schema, rate-limit guide, or feature guide describes present behavior.

- Dated live observation: one bounded account and payload produced a recorded HTTP result at a specific UTC time.

- Inference: a cautious interpretation supported by the preceding evidence but not stated by DeepSeek as policy.


![Evidence hierarchy separating official DeepSeek deprecation notices from model-list observations, request results, and alias hypotheses.](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

The V4 notice is first-party evidence that DeepSeek intended the two legacy aliases to become inaccessible after the cutoff. The July 28 response is live evidence that they were accepted for this test despite that notice. The responsible conclusion is not that retirement was “reversed.” It is that current runtime compatibility and the announced lifecycle do not presently align.


### Current API Contract Watchlist

Not every important API change appears as a dated changelog entry. The following current-contract details can break assumptions even when the model ID stays the same.


Surface | Current documented behavior reviewed July 28 | Developer impact
Thinking mode | Both V4 models support thinking and non-thinking modes; thinking is enabled by default | Set the mode explicitly when reproducibility, latency, or output shape matters
Context and output | 1M context and up to 384K maximum output | Client-side limits and cost guards should not assume older V3-era caps
Concurrency | 2,500 for Flash and 500 for Pro | Separate scheduling and capacity planning by exact model
Penalty parameters | frequency_penalty and presence_penalty are marked deprecated and ineffective | HTTP acceptance does not mean those fields change sampling
Queued inference | DeepSeek documents keep-alive traffic while queued and may close a request that has not started inference within 10 minutes | Use timeouts, cancellation, and idempotent retries instead of blind replay
FIM completion | The pricing matrix and completion reference are not fully aligned on model eligibility | Do not assume Flash FIM support from a summary table alone; verify the endpoint contract and your account

For implementation detail, use the dedicated guides for DeepSeek thinking mode, API rate limits, tool calls, context caching, and error handling. This page records the status boundary; it does not duplicate every integration tutorial.


### Current V4 Pricing Snapshot

Prices reviewed on July 28, 2026 are per one million tokens:


Model | Input: cache hit | Input: cache miss | Output
deepseek-v4-flash | $0.0028 | $0.14 | $0.28
deepseek-v4-pro | $0.003625 | $0.435 | $0.87

Do not reuse historical caching prices or older statements that there is no concurrency limit. Those descriptions were correct for earlier API generations, not the current V4 contract. Check the official price page before budgeting and use our DeepSeek pricing guide for worked calculations.


### DeepSeek API Changelog — Newest First

The official change log shows why a stable-looking alias is not a pinned model version. The same names moved through multiple model families before V4 introduced explicit first-class IDs.


![DeepSeek API update timeline showing moving aliases, V4 model IDs, the migration window, and the legacy alias retirement deadline.](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


Date | Official event | Operational impact
2026-07-24 15:59 UTC | Announced cutoff for deepseek-chat and deepseek-reasoner passed | Applications should already target explicit V4 IDs; the date came from the April V4 notice
2026-04-24 | DeepSeek-V4 Flash and Pro launched for OpenAI Chat Completions and Anthropic-format access | New IDs, 1M context, dual thinking modes, and a legacy migration window
2025-12-01 | Aliases upgraded to DeepSeek-V3.2; temporary V3.2-Speciale endpoint announced | In-place alias behavior changed and a separate endpoint had its own expiry
2025-09-29 | Aliases upgraded to DeepSeek-V3.2-Exp | Experimental model behavior arrived behind familiar request strings
2025-09-22 | DeepSeek-V3.1-Terminus update | Language consistency and agent behavior changed without new alias names
2025-08-21 | DeepSeek-V3.1 launched | Hybrid reasoning and stronger agent capabilities reached the API aliases
2025-05-28 | deepseek-reasoner upgraded to R1-0528 | Reasoning, JSON output, and function-calling behavior changed
2025-03-24 | deepseek-chat upgraded to V3-0324 | Reasoning, coding, writing, search, and function calling improved
2025-01-20 | DeepSeek-R1 introduced through deepseek-reasoner | A new reasoning family used an API alias rather than a pinned release ID
2024-12-26 | deepseek-chat upgraded to DeepSeek-V3 | Major family change behind the same request name
2024-09-05 | Chat and Coder merged into DeepSeek-V2.5 with both aliases retained | Two names temporarily converged on one model family
2024-08-02 | Context caching on disk launched | Input-cost and latency behavior changed independently of model naming
2024-07-25 | JSON output, function calling, chat prefix completion, and FIM features announced | Endpoint capability expanded without a model-retirement event

The authoritative chronology is the DeepSeek change log. The V4 release notice supplies the V4 model names, compatibility window, and announced cutoff. This tracker adds dated runtime evidence and operational interpretation; it does not replace first-party policy.


### Deprecated, Retired, Unlisted, Historical, and Rejected Are Different

- Deprecated: a first-party source warns that a field or identifier is being phased out.

- Scheduled for retirement or discontinuation: a first-party source provides a cutoff after which access is expected to end.

- Unlisted: an identifier does not appear in the current /models inventory. This is evidence about discoverability, not a complete lifecycle statement.

- Historical: a name appears in old official documentation but is not presented as a current model ID.

- Observed accepted or rejected: one request returned a specific HTTP result at a specific time. It does not define future support.

That vocabulary matters here. deepseek-chat and deepseek-reasoner are past an announced discontinuation cutoff, yet were observed accepted on July 28. deepseek-coder is a historical name that was also accepted, but this tracker found no current first-party statement restoring it as a supported model ID.


### What Developers Need to Change Now

- Replace old names with deepseek-v4-flash or deepseek-v4-pro in code, configuration, queues, dashboards, fixtures, and alert rules.

- Choose the successor by workload quality, latency, concurrency, and cost—not by assuming an old alias will keep its current route.

- Set thinking behavior explicitly and regression-test the response fields your application consumes.

- Run a small canary with the exact production payload shape, including tools, JSON output, streaming, and timeout behavior where applicable.

- Make retries idempotent and stop retrying permanent model or validation errors.

- Keep a reversible fallback that uses a tested current model ID, not another undocumented alias.

Use the complete deepseek-chat and deepseek-reasoner to V4 migration guide for replacement code, rollout gates, queue handling, canaries, and rollback. Use the DeepSeek API testing guide for mocks, regression fixtures, streaming tests, and a separately gated live smoke test.


### How This Tracker Verifies DeepSeek API Changes

The July 28 candidate set and seven-call ceiling were fixed before execution. Calls were sequential, automatic retries were disabled, and each successful Chat Completion had to return the exact synthetic marker TRACKER_OK. The chat payload used explicit non-thinking mode, temperature zero, a 16-token output ceiling, and no private or user-derived content.


Evidence field | Recorded value
UTC window | 2026-07-28 22:44:31.979Z to 22:44:36.454Z
Inventory request | HTTP 200 in 426 ms; exactly Flash and Pro listed
Current-model probes | Flash HTTP 200 in 321 ms; Pro HTTP 200 in 284 ms
Old-name probes | Chat, Reasoner, and Coder each HTTP 200 in 281–284 ms
Invalid control | HTTP 400 with a sanitized invalid_request_error classification
Successful usage | 11 prompt + 4 completion = 15 total tokens per successful marker request
Credential lifecycle | Dedicated temporary key created for the run, revoked, and verified absent in the provider interface

No API key, Authorization header, account identifier, balance, completion ID, raw response, raw provider error, raw system_fingerprint, or private prompt is published. The test did not measure model quality, regional availability, sustained reliability, rate-limit enforcement, architecture, or billing accuracy. One successful request cannot promise that a compatibility route will exist tomorrow.


### Update Ledger and Freshness Policy


Date | Source review | Live test | Material finding
2026-07-28 | Yes | Yes | Inventory unchanged; three unlisted old names changed from observed HTTP 400 to HTTP 200 compatibility routing
2026-07-25 | Yes | Yes | Flash and Pro accepted; Chat, Reasoner, Coder, and invalid control returned HTTP 400
2026-04-24 | Official event | Not a tracker run | V4 Flash and Pro announced with a three-month legacy-name migration window


![DeepSeek API tracker schedule with weekly source checks, monthly live snapshots, event reviews, quarterly audits, and a 31-day stale flag.](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

A documentation review, live test, and prose edit are recorded separately. This page is reviewed after a dated DeepSeek announcement, a model-list change, a reported compatibility break, or a material contract change. A prose-only correction never receives a new live-test date.


### Limitations

- Hosted behavior may differ by time, account, rollout cohort, region, endpoint family, or payload shape.

- The test used OpenAI-format Chat Completions and did not test the Anthropic-format endpoint.

- The deepseek-reasoner probe explicitly disabled thinking; it does not establish the default mode of that compatibility route.

- Returned model labels do not expose weights, prove architectural identity, or guarantee stable routing.

- The current official documentation contains some summary/reference mismatches; endpoint-specific references should win over assumptions until DeepSeek resolves them.

- Pricing and concurrency are time-sensitive. Recheck the official pages before production budgeting.


### Frequently Asked Questions


#### What Is the Latest DeepSeek API Update?

The latest dated first-party changelog entry is the April 24, 2026 V4 launch. The most important current operational update in this tracker is a July 28 live observation: old unlisted names that returned HTTP 400 on July 25 returned HTTP 200 and routed to Flash. That observation is not a new official lifecycle announcement.


#### Which DeepSeek Model IDs Are Currently Documented?

deepseek-v4-flash and deepseek-v4-pro. They are the two IDs shown by the current model documentation and the July 28 live /models result.


#### Do deepseek-chat and deepseek-reasoner Still Work?

They worked for this one bounded July 28 test and returned deepseek-v4-flash. They are not listed by /models, and DeepSeek’s V4 notice announced that they would become inaccessible after July 24 at 15:59 UTC. Treat the successful responses as temporary compatibility evidence and migrate anyway.


#### What Replaces deepseek-chat and deepseek-reasoner?

Use deepseek-v4-flash or deepseek-v4-pro and configure thinking mode explicitly. Flash is the lower-cost option; Pro is the higher-capability option. Test the exact workload rather than selecting from the old alias name alone.


#### Does a Model Missing from /models Mean It Cannot Be Called?

No. The July 28 test is a counterexample: three unlisted old names were accepted. Missing from /models means the identifier is not in the current advertised inventory. It does not, by itself, prove rejection or future removal.


#### How Can I Check the Current DeepSeek Model List?

Send an authenticated GET https://api.deepseek.com/models request, compare the returned IDs with the official model and pricing pages, then run one low-cost schema check against the exact candidate model. Keep that live check outside the default unit-test path.


#### Where Should I Monitor Official DeepSeek API Changes?

Monitor the official DeepSeek change log, API documentation, models and pricing page, and dated news posts. Use this independent tracker for post-cutoff observations and operational interpretation.


### Official Sources

- DeepSeek Change Log

- DeepSeek V4 Preview Release

- List Models API

- Create Chat Completion

- Models and Pricing

- Thinking Mode

- Rate Limit and Isolation

- Context Caching

- FIM Completion Reference


### Related DeepSeek Developer Guides

- DeepSeek API documentation guide

- Migrate deepseek-chat and deepseek-reasoner to V4

- Test DeepSeek API calls with mocks and live checks

- DeepSeek model comparison

- DeepSeek pricing guide

- DeepSeek error codes

Editorial disclosure: Chat-Deep.ai is independent from DeepSeek and is not endorsed by DeepSeek. First-party claims are linked to official sources; runtime findings are labeled with their test date and scope.

## 内部链接
- [DeepSeek thinking mode](https://chat-deep.ai/docs/deepseek-thinking-mode/)
- [API rate limits](https://chat-deep.ai/docs/api-rate-limits/)
- [tool calls](https://chat-deep.ai/docs/deepseek-tool-calls/)
- [context caching](https://chat-deep.ai/docs/deepseek-context-caching/)
- [error handling](https://chat-deep.ai/docs/deepseek-error-codes/)
- [DeepSeek pricing guide](https://chat-deep.ai/pricing/)
- [deepseek-chat and deepseek-reasoner to V4 migration guide](https://chat-deep.ai/docs/migrate-deepseek-chat-reasoner-to-v4/)
- [DeepSeek API testing guide](https://chat-deep.ai/docs/testing-deepseek-api/)
- [DeepSeek API documentation guide](https://chat-deep.ai/docs/api/)
- [Migrate deepseek-chat and deepseek-reasoner to V4](https://chat-deep.ai/docs/migrate-deepseek-chat-reasoner-to-v4/)
- [Test DeepSeek API calls with mocks and live checks](https://chat-deep.ai/docs/testing-deepseek-api/)
- [DeepSeek model comparison](https://chat-deep.ai/models/)
- [DeepSeek pricing guide](https://chat-deep.ai/pricing/)
- [DeepSeek error codes](https://chat-deep.ai/docs/deepseek-error-codes/)

## 外部链接
- [official model-list reference](https://api-docs.deepseek.com/api/list-models/)
- [current pricing and model matrix](https://api-docs.deepseek.com/quick_start/pricing/)
- [official price page](https://api-docs.deepseek.com/quick_start/pricing/)
- [DeepSeek change log](https://api-docs.deepseek.com/updates/)
- [V4 release notice](https://api-docs.deepseek.com/news/news260424/)
- [DeepSeek change log](https://api-docs.deepseek.com/updates/)
- [API documentation](https://api-docs.deepseek.com/)
- [models and pricing page](https://api-docs.deepseek.com/quick_start/pricing/)
- [DeepSeek Change Log](https://api-docs.deepseek.com/updates/)
- [DeepSeek V4 Preview Release](https://api-docs.deepseek.com/news/news260424/)
- [List Models API](https://api-docs.deepseek.com/api/list-models/)
- [Create Chat Completion](https://api-docs.deepseek.com/api/create-chat-completion/)
- [Models and Pricing](https://api-docs.deepseek.com/quick_start/pricing/)
- [Thinking Mode](https://api-docs.deepseek.com/guides/thinking_mode/)
- [Rate Limit and Isolation](https://api-docs.deepseek.com/quick_start/rate_limit/)
- [Context Caching](https://api-docs.deepseek.com/guides/kv_cache/)
- [FIM Completion Reference](https://api-docs.deepseek.com/api/create-completion/)
- [(no anchor)](https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fdeepseek-api-updates%2F)
- [(no anchor)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fdeepseek-api-updates%2F&text=DeepSeek%20API%20Updates%3A%20Changelog%20and%20Deprecated%20Models%20Tracker)
- [(no anchor)](https://www.linkedin.com/shareArticle?url=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fdeepseek-api-updates%2F&title=DeepSeek%20API%20Updates%3A%20Changelog%20and%20Deprecated%20Models%20Tracker)