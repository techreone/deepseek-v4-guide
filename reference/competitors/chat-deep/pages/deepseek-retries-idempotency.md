# DeepSeek Retries and Idempotency: Avoid Duplicate Work

- **URL**: https://chat-deep.ai/docs/deepseek-retries-idempotency/
- **Published**: 
- **Modified**: 
- **Category**: DeepSeek API Docs
- **Word count**: 6136
- **Code blocks**: 10
- **Description**: DeepSeek retries and idempotency: build safe API retries with backoff, jitter, durable records, cancellation handling, and duplicate-work guards.

## H1


## H2 目录
- On this page
- Quick answer: When should a DeepSeek request be retried?
- What DeepSeek officially documents
- What the live and local tests measure
- The rule that prevents most duplicate work
- DeepSeek API retry classifier
- DeepSeek retries and idempotency are three separate problems
- Design the application idempotency record
- Backoff that does not create a retry storm
- Cancellation, timeouts, and interrupted streams
- Production code patterns
- Tool calls need their own idempotency boundary
- Observability, token usage, and retry cost
- Production checklist
- Limitations
- Frequently asked questions
- Official sources
- Conclusion

## 正文
DeepSeek retries and idempotency require two separate controls: a bounded retry policy and a durable application operation record. Retry an unchanged request only when the failure is a classified transient candidate and you understand whether dispatch occurred. If a request may have reached DeepSeek but no complete result was durably stored, the safe default is unknown_outcome, not an automatic replay.

The duplicate-work failure is easy to create. An application sends a Chat Completion, the provider may start or complete inference, and the client times out before committing the response. A worker then sends the same logical job again. The application now may have two provider generations for one user action. If either answer leads to an email, database mutation, ticket, payment, publication, or other tool action, the business effect can also run twice.

Application idempotency can prevent duplicate queue rows, duplicate terminal result writes, and repeated downstream effects. It cannot prove that DeepSeek generated or billed a post-dispatch request exactly once.

This is an independent technical guide. Chat-Deep.ai is not affiliated with DeepSeek. Official documentation was reviewed on July 25, 2026. The bounded evidence run uses synthetic English markers, no customer content, no account-balance read, no third-party inference provider, and no intentional attempt to provoke a live 429, 500, or 503.

Decision first

- Fix before sending again: unchanged HTTP 400, 401, 402, and 422 conditions.

- Bounded retry candidates: HTTP 429, 500, and 503, inside an attempt and total-age budget.

- Safe local retry candidate: the application can prove that no network dispatch occurred.

- Unknown outcome: dispatch began, but no complete result was durably committed.

- Return the stored result: a terminal application record already exists.

- Protect tools separately: every side-effecting action needs its own business idempotency key.


### On this page

- When a DeepSeek request should be retried

- What DeepSeek officially documents

- Live and local evidence

- The delivery boundary rule

- DeepSeek retry classifier

- Application idempotency

- Backoff and jitter

- Cancellation and timeouts

- Node.js and Python examples

- Tool-call protection

- Cost and observability

- Production checklist

- Frequently asked questions


### Quick answer: When should a DeepSeek request be retried?

Use both the response class and the delivery stage:


Observation | Default decision | Reason
Local validation failed before dispatch | Fix locally; no provider call | DeepSeek received nothing
HTTP 400 | Do not retry unchanged | The request body format must be repaired
HTTP 401 | Pause dispatch | Authentication must be repaired
HTTP 402 | Pause paid work | Funding or balance availability must be restored
HTTP 422 | Do not retry unchanged | One or more parameters must be repaired
HTTP 429 | Reduce pressure, then retry within budget | DeepSeek documents request pacing or concurrency pressure
HTTP 500 | Brief bounded retry | DeepSeek documents a server error
HTTP 503 | Brief bounded retry | DeepSeek documents server overload
Timeout or reset after dispatch | Mark unknown_outcome by default | The provider may have performed work
Complete valid result already committed | Return it | A second call would be duplicate provider work

The current DeepSeek Error Codes page expressly says to retry 500 and 503 after a brief wait. Its 429 guidance says to pace requests reasonably. Exponential backoff, full jitter, maximum-attempt counts, and circuit breakers are application engineering choices; the official error page does not specify one mandatory algorithm.

The harder cases are not ordinary HTTP responses. A client timeout, process crash, socket reset, or interrupted stream can happen after request dispatch. HTTP status alone cannot tell the application whether the provider finished work before the response was lost. Do not convert that uncertainty into “not sent.”

Use four operational classes:


```
NOT_SENT
TRANSIENT_RESPONSE
UNKNOWN_OUTCOME
TERMINAL
```

Only NOT_SENT and a bounded TRANSIENT_RESPONSE normally return to automatic dispatch. UNKNOWN_OUTCOME requires reconciliation, a product-specific duplicate-risk decision, or manual review. TERMINAL either returns an existing result or waits for a repair.


### What DeepSeek officially documents

DeepSeek’s current Chat Completion reference documents:


```
POST https://api.deepseek.com/chat/completions
```

The request requires a model and at least one message. The current schema lists deepseek-v4-flash and deepseek-v4-pro. A non-streaming response includes a server-generated completion id, model, backend system_fingerprint, choices, finish reason, and token usage. A streaming response sends Server-Sent Event deltas and terminates with data: [DONE].

The response ID is useful for correlation after the client receives it. It is not documented as a client-supplied idempotency key, and the reviewed reference does not document a retrieve-Chat-Completion-by-ID operation.


#### Dated idempotency and cancellation audit

We reviewed the official API introduction, Chat schema, Error Codes, Rate Limit and Isolation page, FAQ, Context Caching guide, pricing page, and change log on July 25, 2026. We did not find a documented:

- Idempotency-Key request header;

- request-body idempotency field;

- client-supplied request identifier that triggers provider deduplication;

- result-replay contract for a repeated key;

- completion lookup operation for reconciliation;

- request-cancellation endpoint;

- guarantee that disconnecting the client stops provider inference;

- exactly-once provider execution or billing guarantee;

- guarantee that every 429 or 5xx response includes Retry-After.

This is a dated documentation finding, not a statement that DeepSeek can never add these capabilities. Recheck the DeepSeek API reference and change log before deploying.

Do not send an arbitrary Idempotency-Key header and infer support merely because the server accepts the request. HTTP servers can ignore unknown headers. Provider idempotency requires a published contract covering key scope, payload conflicts, replay behavior, retention, and error semantics.


#### Current concurrency and waiting behavior

The current Rate Limit and Isolation page lists account-level concurrency of:


Model | Documented concurrency limit
deepseek-v4-flash | 2,500
deepseek-v4-pro | 500

DeepSeek says a request counts from dispatch until its model response completes, all API keys under the account share the calculation, and excess concurrency returns HTTP 429. These are published ceilings, not recommended worker settings. Separate keys do not create separate quotas, so several processes or hosts need one account-wide limiter.

While a request waits, DeepSeek says a non-streaming connection can receive empty lines and a streaming connection can receive : keep-alive SSE comments. If inference has not started after ten minutes, DeepSeek says the server closes the connection. A custom parser must distinguish keep-alives from output, and application timeouts should distinguish connection, idle, first-result, attempt, and total-operation deadlines.

An older 2024 announcement contains stale no-limit language. The current dedicated rate-limit page supersedes it. This article therefore uses the current V4 concurrency table.


#### Response-level completion matters

HTTP 200 is not the only success test. The Chat schema documents finish reasons including stop, length, content_filter, tool_calls, and insufficient_system_resource.

- stop normally indicates a terminal generated answer.

- length means generation or context limits interrupted the requested task; increase or redesign the budget rather than blindly replaying unchanged.

- content_filter is a policy result, not an invitation to evade the policy through retries.

- tool_calls means the application must validate and decide whether to execute the proposed tool.

- insufficient_system_resource means the generation was interrupted because inference resources were insufficient. It can be a response-level transient candidate, but a new generation is still a new provider attempt.


### What the live and local tests measure

The preregistered protocol separates provider observations from application behavior. Automatic library retries are disabled. The normal live plan permits ten dispatch attempts and has a hard ceiling of twelve, including model discovery, successful calls, errors, and the client-abort attempt. Two spare slots are a safety ceiling, not a target.

One earlier harness attempt was excluded before result serialization because concurrent tasks raced while replacing the same local state file. Its measurements were neither reconstructed nor used. The archived state’s observed_live_dispatches value is a harness-side counter incremented before fetch; because the interrupted concurrent phase did not serialize valid terminal evidence, that counter is not treated as a verified provider-send count. The fixtures were synthetic markers with no downstream tool or business side effects. A recovery plan was recorded before a corrected run that kept the same request contract and budget but serialized local state-file writes. Every live value below comes only from that completed recovery run.

The live endpoint plan uses:

- GET /models before generation;

- a current discovered model, with deepseek-v4-flash as the preference;

- non-streaming Chat Completions;

- thinking disabled;

- temperature zero;

- a 16-token output cap;

- harmless allowlisted markers such as BASELINE_OK and DEDUP_OK;

- no tools, files, personal user_id, customer content, or account-balance read.

The table below is populated from the integrity-passed sanitized evidence files. It reports observed provider sends separately from local pre-send injection and loopback-only HTTP evidence.


![Sanitized DeepSeek retry evidence separating live API controls from local pre-dispatch, durable stored-result replay, and ambiguous-timeout scenarios.](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


Scenario | Evidence label | Provider sends | Result
Model discovery and valid control | LIVE DEEPSEEK | Included in 10 live dispatches | Model deepseek-v4-flash; baseline HTTP 200
Invalid request with messages omitted | LIVE DEEPSEEK | One observed, zero retries | Observed HTTP 400
Two failures injected before fetch, then valid control | LOCAL PRE-SEND INJECTION + LIVE FINAL CALL | One observed provider send | 2 injected pre-send failures; 3 visible attempts; 1 provider dispatch; HTTP 200; exact RETRY_OK.
Client abort after dispatch initiation | LIVE CLIENT OBSERVATION | One observed, zero retries | The client observed a local abort after dispatch; one dispatch and zero retries; provider execution, usage, and billing remain unknown.
Durable same-key replay and concurrent coalescing | APPLICATION STORE + LIVE CONTROL | One observed per logical fixture | Replay: 2 logical deliveries, 1 provider dispatch, 1 terminal write, and 1 stored-result hit; coalescing: 2 callers, 1 leader dispatch.
Three independent concurrent controls | LIVE DEEPSEEK | Three observed | Completion sequence ORDER_C_OK -> ORDER_B_OK -> ORDER_A_OK
One 503 followed by 200 | LOCAL LOOPBACK HTTP, NOT DEEPSEEK | Two observed loopback sends | Loopback statuses 503 -> 200; 2 mock sends; 1 retry; exact SERVER_RETRY_OK.
Usage and cost summary | LIVE USAGE-DERIVED ESTIMATE | All completed live calls | 0 cache-hit input, 185 cache-miss input, 24 output, and 209 known total tokens; dated known-response estimate $0.00003262; 1 usage-ambiguous dispatch excluded.

Execution window: 2026-07-25T22:36:27.419Z to 2026-07-25T22:36:32.525Z Temporary key revoked after the run: Yes (verified)

The live client-abort phase can report only what the client observed: a full response won the race, the abort fired, or another transport result occurred. Unless a complete response arrives, provider receipt, completion, tokens, and billing remain unknown. It is not evidence of provider-side cancellation.

The loopback 503-to-200 control made two real HTTP requests to a server bound to 127.0.0.1 on an ephemeral port. Its seeded retry delay was scheduled for 71 ms, and the measured wait met or exceeded that target. Across the retry, terminal-400, after-accept abort, and coalescing routes, the validator recorded five attempted and five accepted loopback requests, zero accepted non-loopback requests, and zero external-network calls. This proves the local transport, response-parsing, classifier, scheduler, abort, and coalescing paths—not a DeepSeek outage, failure-rate sample, or service observation. Likewise, the two live-run pre-send failures occur before the HTTP client is called. They can prove that three visible application attempts contain one provider dispatch, but they are not provider errors.


#### Evidence and privacy rules

The temporary credential is accepted only from memory or DEEPSEEK_API_KEY and is never intentionally written to an artifact. Publishable evidence is allowlisted and excludes authorization values, request and response headers, cookies, raw bodies, response IDs, system fingerprints, reasoning content, account identifiers, balance data, personal information, and unexpected model text. Only exact allowlisted markers can be retained as text; other output is reduced to a digest and character count. The loopback server intentionally injected eight fake sensitive values, including a credential shape, bearer value, response ID, system fingerprint, private headers, reasoning text, and an error message. A fail-closed post-write audit found none of those exact values or the documented sensitive-pattern classes in the saved evidence package. Final-byte evidence digests are stored in evidence-manifest.json. This does not replace secret management or prove that a value absent from the saved package never existed in memory.

The runner records attempts, dispatches, complete-response state, HTTP status, safe timings, exact-marker booleans, token usage, and a dated derived cost. Credential revocation is an operator action and is recorded as true only after verification.


### The rule that prevents most duplicate work

Ask this before considering another call:


> What was the last delivery boundary the application can prove?

A useful request lifecycle is:

- validate the input;

- create or load the logical operation;

- claim a lease;

- recheck cancellation;

- mark dispatching;

- initiate the network request;

- receive headers;

- read the complete body;

- validate the result;

- commit the terminal result;

- acknowledge queue delivery.

Stages one through four can be safe local retry points because the application can prove no provider request started. Stages five through eight are potentially ambiguous if the process, transport, or stream fails. Stages nine through eleven need an idempotent commit and terminal lookup, not another generation.

For example, a worker can crash after the database commits a valid result but before it acknowledges the queue message. Redelivery is expected in an at-least-once queue. The new worker should query the operation key, find succeeded, return the stored result, and acknowledge. It should not call DeepSeek again.

A different crash can happen after dispatch_started_at is persisted but before the response is stored. The database now proves dispatch may have begun but cannot prove completion. Without provider lookup or idempotency, automatic replay may duplicate generation. The honest state is unknown_outcome.


### DeepSeek API retry classifier


![DeepSeek API retry classifier mapping HTTP 400, 401, 402, 422, 429, 500, 503 and transport states to repair, retry, reconcile, or return-stored-result actions.](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


Signal | Default class | Automatic action | Required repair or guard
Local validation failure | Terminal local | Do not send | Fix payload or policy
HTTP 400 | Terminal until changed | Do not retry unchanged | Repair request shape
HTTP 401 | Operational stop | Pause dispatch | Repair or rotate credentials
HTTP 402 | Operational stop | Pause paid work | Restore funding
HTTP 422 | Terminal until changed | Do not retry unchanged | Repair parameters
HTTP 429 | Transient candidate | Bounded full-jitter backoff | Lower account pressure
HTTP 500 | Transient candidate | Bounded retry | Circuit-break if persistent
HTTP 503 | Transient candidate | Bounded retry | Reduce load or fail gracefully
Proven failure before send | Safe transport candidate | Retry within budget | Preserve the logical key
Timeout after dispatch | Ambiguous | Do not blindly replay | Reconcile or mark unknown
Reset during response body | Ambiguous | Preserve partial evidence only | Do not label unsent
Malformed unexpected HTTP 200 body | Completed but unusable | Quarantine and investigate | Do not automatically resend
finish_reason=length | Incomplete for the task | Repair budget or context | New call is a new generation
finish_reason=content_filter | Policy terminal | Apply product policy | Do not evade through replay
finish_reason=insufficient_system_resource | Response-level transient candidate | Bounded new generation if locally safe | Count the prior attempt
Stream ends before terminal state | Ambiguous partial generation | Do not splice or commit | Version or review the attempt
Tool action already executed | Side-effect boundary | Never repeat blindly | Tool-specific business key

“Retry candidate” never means retry forever. A retry must fit both an attempt budget and an overall operation-age budget. It must also use the account-wide concurrency controller; recovery traffic must not bypass the same limit that first attempts use.

If an actual response includes a valid Retry-After, respect it within the operation deadline. The official DeepSeek documentation reviewed does not promise that every relevant response includes that header, so the client needs a fallback delay.

For field-by-field troubleshooting beyond this decision table, use the site’s DeepSeek API error-code guide.


### DeepSeek retries and idempotency are three separate problems


#### Layer 1: queue or HTTP delivery

At-least-once delivery means the same logical operation can arrive more than once. The application can make this safe with a stable operation key, atomic claim or lease, terminal-state lookup before dispatch, visible attempts, and acknowledgement only after the terminal database commit.

This layer can guarantee one local logical job and one stored terminal result.


#### Layer 2: provider generation

The application’s operation key is not automatically recognized by DeepSeek. When a request times out after dispatch, the client may be unable to determine whether the provider ran inference. The reviewed public API has no documented key replay or completion lookup that resolves that uncertainty.

This layer cannot promise one provider generation or one charge after an ambiguous outcome.


#### Layer 3: downstream effects

The model may propose a tool action, but the application executes it. Email, payments, ticket creation, content publication, deletion, and account changes require a separate business key and conditional state transition. A safe generation does not automatically make the tool safe.

These guarantees should never be collapsed:


Guarantee | Application can provide it? | DeepSeek provider contract found?
One logical operation record | Yes | Not required
One committed application result | Yes | Not required
One execution of a protected local tool action | Yes, with a separate guard | Not required
One provider inference after an ambiguous timeout | No | No documented contract found
One provider charge after an ambiguous timeout | No | No documented contract found


### Design the application idempotency record

Use a caller-stable operation key for a real logical action, such as generating one approved report version or drafting one ticket reply. Scope uniqueness by tenant. Store a canonical request fingerprint beside it so the same key cannot silently represent changed input.


```
tenant_id
operation_key
request_fingerprint
payload_version
state
attempt
max_attempts
dispatch_started_at
response_completed_at
result_committed_at
cancel_requested_at
retry_available_at
last_error_class
usage_summary
result_reference
lease_owner
lease_expires_at
```

Canonicalize stable fields such as model, messages, thinking mode, sampling settings, tool schema version, and prompt-template version. Use an HMAC or another nonreversible keyed digest when the fingerprint could reveal sensitive prompt content. Do not store the API key, authorization header, raw personal data, attempt number, random trace ID, or volatile timestamp in the logical fingerprint.

If the same (tenant_id, operation_key) arrives with a different fingerprint, return a conflict. Do not return an old answer for new input and do not overwrite the first operation.


#### State machine


![DeepSeek application idempotency state machine covering receive, claim, dispatch, retry scheduling, unknown outcomes, success, cancellation before dispatch, and dead-letter handling.](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


```
received
claimed
dispatching
retry_scheduled
unknown_outcome
succeeded
failed_permanent
cancelled_before_dispatch
dead_letter
```

The critical rules are:

- received -> claimed requires an atomic lease;

- claimed -> cancelled_before_dispatch happens when a cancellation flag is already present;

- claimed -> dispatching occurs immediately before network dispatch;

- dispatching -> succeeded occurs only after validation and a terminal commit;

- dispatching -> retry_scheduled occurs only for a classified transient response within budget;

- dispatching -> unknown_outcome occurs when dispatch started but no complete outcome is available;

- exhausted retryable work becomes dead_letter;

- redelivery of succeeded returns the stored result and sends nothing.

Do not automatically transition unknown_outcome back to dispatching.


#### Database uniqueness and commit ordering

At minimum, use a database constraint:


```
ALTER TABLE operations
ADD CONSTRAINT operations_tenant_key_unique
UNIQUE (tenant_id, operation_key);
```

Commit success conditionally:


```
UPDATE operations
SET state = 'succeeded',
    result_ref = $1,
    result_committed_at = NOW()
WHERE tenant_id = $2
  AND operation_key = $3
  AND state NOT IN (
    'succeeded',
    'failed_permanent',
    'cancelled_before_dispatch'
  );
```

Production code needs a transaction, an affected-row check, fingerprint conflict handling, and queue acknowledgement after commit. If another delivery arrives after the commit, the unique record and terminal lookup prevent another provider send.


![Conceptual DeepSeek result deduplication flow using a tenant-scoped operation key, conditional terminal write, a hypothetical crash-before-ack path, and stored-result replay without another provider call.](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

The DeepSeek observability guide covers broader tracing and dashboard design. This article’s narrower requirement is that every logical operation, delivery, network send, result write, and dedupe hit remain distinguishable.


### Backoff that does not create a retry storm

A fixed delay causes synchronized workers to wake together. Use full jitter:


```
ceiling = min(cap, base * 2^retry_index)
delay = random(0, ceiling)
```

Illustrative application starting points are a 500 ms base, a 30-second cap, four total attempts including the initial send, and a separate overall operation deadline. These are not official DeepSeek defaults.

The preregistered local harness uses smaller deterministic delays so the test remains fast: a 60 ms base, 500 ms cap, 25 percent jitter range, and a fixed seed. Its purpose is to make the scheduler reproducible, not to recommend production timing.


![Local DeepSeek retry-policy simulation showing a seeded transient fault, exponential backoff with seeded bounded jitter, a bounded second attempt, and an explicit non-provider label.](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

A complete retry policy should consider:

- maximum attempts;

- maximum operation age;

- per-attempt timeout;

- valid Retry-After when present;

- account-wide concurrent retries;

- circuit-breaker state;

- interactive versus background priority;

- whether a prior provider attempt is known, rejected, or ambiguous.

Backoff cannot fix concurrency that remains above the account limit. Reduce active pressure first. One semaphore inside each process is not enough when several processes share the same DeepSeek account.


### Cancellation, timeouts, and interrupted streams


![Timeline comparing safe DeepSeek cancellation before dispatch with an ambiguous client timeout or abort after request dispatch.](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

Cancellation is certain only before dispatch. If cancel_requested_at is present when the worker owns the lease, it can transition to cancelled_before_dispatch with zero sends. Recheck cancellation after acquiring the account permit and immediately before marking the operation dispatching.

After dispatch, an AbortError, closed socket, process shutdown, or user navigation proves only that the local client stopped waiting. The reviewed DeepSeek docs do not guarantee that this stops inference or prevents token usage. Record:

- whether cancellation was requested;

- whether dispatch started;

- whether response headers arrived;

- whether the complete body arrived;

- whether a terminal result was committed.

Without a complete terminal result, use unknown_outcome. Do not report “safely cancelled” and do not automatically send a replacement unless the product explicitly accepts duplicate-generation risk.

Streaming makes partial-state handling visible. DeepSeek streams SSE deltas and ends a normal stream with [DONE]. If the connection closes after content chunks but before terminal completion, do not splice a new generation onto the partial text and present both as one answer. Store partial output separately, expose it as incomplete, discard it under a documented policy, or require review. Never execute a partially received tool call.

The DeepSeek Chat Completions guide explains the full request and stream contract. The complete DeepSeek API guide covers broader setup and authentication.


### Production code patterns

The examples keep the operation key inside the application. They do not send an undocumented idempotency header to DeepSeek. Both use explicit raw HTTP behavior so hidden SDK retries cannot add unknown network sends.


#### Node.js reference pattern

This example assumes a repository that implements atomic claim, state transitions, and a conditional terminal commit. It treats transport failure after dispatch as ambiguous and does not automatically replay it.


```
const RETRYABLE = new Set([429, 500, 503]);
const REPAIR_FIRST = new Set([400, 401, 402, 422]);

class UnknownOutcomeError extends Error {}
class TerminalRequestError extends Error {}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function retryAfterMs(headerValue, now = Date.now()) {
  if (!headerValue) return null;

  const seconds = Number(headerValue);
  if (Number.isFinite(seconds) && seconds >= 0) {
    return Math.round(seconds * 1000);
  }

  const date = Date.parse(headerValue);
  return Number.isFinite(date) ? Math.max(0, date - now) : null;
}

function fullJitterMs(attempt, baseMs = 500, capMs = 30_000) {
  const ceiling = Math.min(capMs, baseMs * 2 ** (attempt - 1));
  return Math.floor(Math.random() * (ceiling + 1));
}

function validatePayload(body) {
  if (!body || !Array.isArray(body.messages) || body.messages.length === 0) {
    throw new TerminalRequestError("messages must be a non-empty array");
  }
}

export async function createOnce({
  repo,
  tenantId,
  operationKey,
  fingerprint,
  body,
  maxAttempts = 4,
  operationDeadlineMs = 120_000,
  attemptTimeoutMs = 45_000,
}) {
  validatePayload(body); // Proven local: no network dispatch.

  const claimed = await repo.claim({
    tenantId,
    operationKey,
    fingerprint,
  });

  if (claimed.state === "succeeded") return claimed.result;
  if (claimed.state === "unknown_outcome") {
    throw new UnknownOutcomeError("manual reconciliation required");
  }

  const operationDeadline = Date.now() + operationDeadlineMs;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    if (await repo.isCancelled({ tenantId, operationKey })) {
      await repo.cancelBeforeDispatch({ tenantId, operationKey });
      throw new TerminalRequestError("cancelled before dispatch");
    }

    if (Date.now() >= operationDeadline) {
      await repo.deadLetter({ tenantId, operationKey, reason: "age_budget" });
      throw new TerminalRequestError("operation age budget exhausted");
    }

    await repo.markDispatching({ tenantId, operationKey, attempt });

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), attemptTimeoutMs);
    let response;

    try {
      // The operation key remains local; no undocumented header is sent.
      response = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
    } catch (error) {
      clearTimeout(timeout);
      await repo.markUnknown({
        tenantId,
        operationKey,
        attempt,
        errorClass: error.name === "AbortError" ? "client_abort" : "transport",
      });
      throw new UnknownOutcomeError("dispatch began; provider outcome unknown");
    }

    clearTimeout(timeout);

    if (REPAIR_FIRST.has(response.status)) {
      await repo.failPermanent({
        tenantId,
        operationKey,
        attempt,
        status: response.status,
      });
      throw new TerminalRequestError(`repair required after HTTP ${response.status}`);
    }

    if (RETRYABLE.has(response.status)) {
      if (attempt === maxAttempts || Date.now() >= operationDeadline) {
        await repo.deadLetter({
          tenantId,
          operationKey,
          reason: `HTTP_${response.status}`,
        });
        throw new TerminalRequestError("retry budget exhausted");
      }

      const serverDelay = retryAfterMs(response.headers.get("retry-after"));
      const delay = serverDelay ?? fullJitterMs(attempt);
      await repo.scheduleRetry({
        tenantId,
        operationKey,
        attempt,
        status: response.status,
        delayMs: delay,
      });
      await sleep(Math.min(delay, operationDeadline - Date.now()));
      continue;
    }

    if (!response.ok) {
      await repo.failPermanent({
        tenantId,
        operationKey,
        attempt,
        status: response.status,
      });
      throw new TerminalRequestError(`unclassified HTTP ${response.status}`);
    }

    let completion;
    try {
      completion = await response.json();
    } catch {
      await repo.markIncomplete({
        tenantId,
        operationKey,
        attempt,
        finishReason: "invalid_json",
      });
      throw new TerminalRequestError("complete response was not valid JSON");
    }

    const finishReason = completion?.choices?.[0]?.finish_reason;

    if (!finishReason || finishReason === "insufficient_system_resource") {
      await repo.markIncomplete({
        tenantId,
        operationKey,
        attempt,
        finishReason: finishReason ?? "missing",
      });
      throw new TerminalRequestError("incomplete response requires explicit policy");
    }

    return repo.commitSuccess({
      tenantId,
      operationKey,
      fingerprint,
      result: completion.choices[0].message,
      usage: completion.usage,
    });
  }
}
```

Wrap dispatch in a shared account-wide permit in a multi-process deployment. Keep logs allowlisted: logical operation, attempt, status, delivery class, timing, and token counters. Do not log the credential, raw prompt, raw response, reasoning content, or personal data.


#### Python parity pattern

httpx is configured with zero transport retries. As with the Node example, any exception after dispatch begins becomes an unknown outcome.


```
import asyncio
import os
import random
import time

import httpx

RETRYABLE = {429, 500, 503}
REPAIR_FIRST = {400, 401, 402, 422}


class UnknownOutcomeError(RuntimeError):
    pass


def full_jitter(attempt: int, base: float = 0.5, cap: float = 30.0) -> float:
    ceiling = min(cap, base * (2 ** (attempt - 1)))
    return random.uniform(0.0, ceiling)


def parse_retry_after(value: str | None) -> float | None:
    if value is None:
        return None
    try:
        return max(0.0, float(value))
    except ValueError:
        return None


async def create_once(
    repo,
    tenant_id: str,
    operation_key: str,
    fingerprint: str,
    body: dict,
    max_attempts: int = 4,
    operation_deadline_s: float = 120.0,
):
    if not isinstance(body.get("messages"), list) or not body["messages"]:
        raise ValueError("messages must be a non-empty list")  # Not sent.

    claimed = await repo.claim(tenant_id, operation_key, fingerprint)
    if claimed.state == "succeeded":
        return claimed.result
    if claimed.state == "unknown_outcome":
        raise UnknownOutcomeError("manual reconciliation required")

    deadline = time.monotonic() + operation_deadline_s
    transport = httpx.AsyncHTTPTransport(retries=0)

    async with httpx.AsyncClient(transport=transport, timeout=45.0) as client:
        for attempt in range(1, max_attempts + 1):
            if await repo.is_cancelled(tenant_id, operation_key):
                await repo.cancel_before_dispatch(tenant_id, operation_key)
                raise RuntimeError("cancelled before dispatch")

            if time.monotonic() >= deadline:
                await repo.dead_letter(tenant_id, operation_key, "age_budget")
                raise RuntimeError("operation age budget exhausted")

            await repo.mark_dispatching(tenant_id, operation_key, attempt)

            try:
                response = await client.post(
                    "https://api.deepseek.com/chat/completions",
                    headers={
                        "Authorization": f"Bearer {os.environ['DEEPSEEK_API_KEY']}",
                        "Content-Type": "application/json",
                    },
                    json=body,
                )
            except (httpx.TimeoutException, httpx.TransportError) as exc:
                await repo.mark_unknown(
                    tenant_id, operation_key, attempt, type(exc).__name__
                )
                raise UnknownOutcomeError(
                    "dispatch began; provider outcome unknown"
                ) from exc

            if response.status_code in REPAIR_FIRST:
                await repo.fail_permanent(
                    tenant_id, operation_key, attempt, response.status_code
                )
                raise RuntimeError(f"repair required after HTTP {response.status_code}")

            if response.status_code in RETRYABLE:
                if attempt == max_attempts:
                    await repo.dead_letter(
                        tenant_id, operation_key, f"HTTP_{response.status_code}"
                    )
                    raise RuntimeError("retry budget exhausted")

                delay = parse_retry_after(response.headers.get("retry-after"))
                delay = full_jitter(attempt) if delay is None else delay
                await repo.schedule_retry(
                    tenant_id, operation_key, attempt, response.status_code, delay
                )
                await asyncio.sleep(min(delay, max(0.0, deadline - time.monotonic())))
                continue

            if response.is_error:
                await repo.fail_permanent(
                    tenant_id, operation_key, attempt, response.status_code
                )
                raise RuntimeError(f"unclassified HTTP {response.status_code}")

            try:
                completion = response.json()
            except ValueError as exc:
                await repo.mark_incomplete(
                    tenant_id, operation_key, attempt, "invalid_json"
                )
                raise RuntimeError("complete response was not valid JSON") from exc

            finish_reason = completion["choices"][0].get("finish_reason")
            if not finish_reason or finish_reason == "insufficient_system_resource":
                await repo.mark_incomplete(
                    tenant_id,
                    operation_key,
                    attempt,
                    finish_reason or "missing",
                )
                raise RuntimeError("incomplete response requires explicit policy")

            return await repo.commit_success(
                tenant_id=tenant_id,
                operation_key=operation_key,
                fingerprint=fingerprint,
                result=completion["choices"][0]["message"],
                usage=completion.get("usage"),
            )
```

These patterns are intentionally conservative. A lower-level transport may sometimes prove that no request bytes were sent, but a high-level timeout usually cannot. Conservatively marking uncertain dispatch is safer than silently duplicating paid work.

For general language setup, see the DeepSeek Node.js and TypeScript guide and DeepSeek Python SDK guide.


### Tool calls need their own idempotency boundary

DeepSeek can propose a tool name and arguments, but your application executes the operation. Replaying a generation can reproduce the same tool call, produce a different one, or change arguments. A model response ID or tool_call_id is useful evidence, but it is not the sole business key for a payment, message, publication, or deletion.

Build a tool-operation key from the logical business action, tenant, tool name, and validated normalized arguments. Enforce uniqueness before execution. Store states such as prepared, executing, succeeded, failed, and unknown_outcome. If the downstream provider documents its own idempotency mechanism, use it as an additional boundary.

Never:

- execute partial streamed tool arguments;

- trust model arguments without validation and authorization;

- repeat a tool because the generation was retried;

- use prompt wording such as “only do this once” as a concurrency control;

- publish, charge, delete, email, or modify an account without the approval policy appropriate to that action.

Commit the tool result before adding it to the next conversation turn. The DeepSeek Tool Calls guide covers request schemas and validation in more depth.


### Observability, token usage, and retry cost

Measure logical operations and actual network sends separately. A pre-dispatch fault can create three visible attempts but one provider send. Hidden SDK retries can create more network sends than the application reports. Useful fields include:

- tenant-safe logical operation ID;

- hashed application operation key;

- delivery attempt and provider attempt;

- request_sent and dispatch_started;

- response headers and complete-body booleans;

- status or allowlisted exception class;

- chosen retry delay;

- operation age and full-body latency;

- cancellation before or after dispatch;

- terminal result commit and dedupe hit;

- cache-hit input, cache-miss input, output, and total tokens;

- dead-letter and manual-reconciliation counts.

DeepSeek’s Token and Token Usage page says actual processed tokens should come from returned usage because character-to-token ratios are approximate. The Chat response reports prompt_cache_hit_tokens, prompt_cache_miss_tokens, and completion_tokens.

The official Models and Pricing page listed these rates on July 25, 2026:


Model | Cache-hit input / 1M | Cache-miss input / 1M | Output / 1M
deepseek-v4-flash | $0.0028 | $0.14 | $0.28
deepseek-v4-pro | $0.003625 | $0.435 | $0.87

Calculate known attempt cost as:


```
cache-hit input / 1,000,000 x cache-hit price
+ cache-miss input / 1,000,000 x cache-miss price
+ completion output / 1,000,000 x output price
```

Include every attempt that returns complete usage. If a connection ends before the client receives final usage, do not guess zero cost. Report the known total as a lower-bound estimate and count ambiguous attempts separately. The result is a dated estimate, not an invoice or balance measurement. The site’s DeepSeek pricing guide owns the broader pricing topic.


#### Context caching does not make a retry idempotent

DeepSeek Context Caching is enabled by default. A repeated persisted input prefix can become a cache hit, and the API reports hit and miss tokens. DeepSeek says caching is best-effort and output is still generated.

A repeated request may therefore have a lower input cost, but it can still produce a new output, occupy concurrency, and repeat a tool proposal. A cache hit does not suppress the request, replay the original response, guarantee one charge, or protect a side effect.


> A cache hit can make repeated input cheaper. It does not make the repeated request idempotent.


### Production checklist


![Production checklist for DeepSeek retries covering operation keys, payload conflicts, send counters, jitter, unknown outcomes, cancellation, tool idempotency, commit ordering, and safe logs.](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

- Use one stable tenant-scoped operation key per logical action.

- Store and compare a canonical request fingerprint.

- Return an existing terminal result before every possible provider send.

- Persist the dispatch transition and count actual network sends.

- Classify failures by both status and delivery stage.

- Never retry unchanged 400, 401, 402, or 422 conditions.

- Bound 429, 500, and 503 by attempts and operation age.

- Use full jitter and an account-wide concurrency controller.

- Honor a valid Retry-After only when it is present.

- Move uncertain post-dispatch failures to unknown_outcome.

- Recheck cancellation immediately before dispatch.

- Commit the result before acknowledging queue delivery.

- Protect each downstream tool action with its own business key.

- Audit SDK defaults for hidden retries.

- Keep credentials, prompts, raw bodies, reasoning content, and personal data out of normal logs.

- Recheck current models, concurrency, errors, and pricing before release.


### Limitations

This guide cannot establish DeepSeek’s platform-wide failure rate, latency distribution, capacity, or SLA. The bounded run uses one account context, one execution window, short synthetic prompts, and low volume. Completion order and timing apply only to the observed run.

Local pre-send failures and the loopback HTTP controls exercise application branches; they are not observed DeepSeek incidents. The live invalid request validates one terminal-classifier path only. A client abort cannot prove provider cancellation. Application deduplication protects local results and effects but cannot prove exactly-once provider inference or billing.

The absence of a documented provider idempotency or cancellation contract is bounded to the official material reviewed July 25, 2026. Provider behavior, model IDs, SDK defaults, errors, concurrency limits, and prices can change. The example retry limits are engineering starting points, not official DeepSeek settings.


### Frequently asked questions


#### 1. Which DeepSeek API errors should I retry?

HTTP 429, 500, and 503 are bounded transient candidates. Do not replay unchanged 400, 401, 402, or 422 requests; repair the request, credentials, or funding first. A post-dispatch timeout is still an unknown_outcome, even if the exception looks retryable.


#### 2. Should I retry a DeepSeek 429 response?

Yes, within a strict attempt and age budget. Reduce account-wide concurrency pressure, use full jitter, and honor a valid Retry-After only when it is actually present. Immediate synchronized retries can create another 429 burst.


#### 3. Should I retry DeepSeek 500 and 503 errors?

Brief bounded retries can be reasonable because DeepSeek’s official error page recommends retrying both after a wait. Add attempt and age limits, then open a circuit or fail gracefully if the errors persist.


#### 4. Why should DeepSeek 400 and 422 errors not be retried unchanged?

They identify request-format or parameter problems. Replaying identical input does not repair malformed JSON, missing required fields, unsupported models, or invalid parameter values.


#### 5. What should my application do after DeepSeek returns 401 or 402?

Pause dispatch. Repair, reload, or rotate the credential after 401. Restore or verify available funding after 402. Retrying unchanged consumes time without resolving the operational stop.


#### 6. Does DeepSeek support an idempotency key header?

No provider-recognized idempotency header was found in the official Chat Completion reference reviewed July 25, 2026. Recheck current documentation, and treat any local operation key as an application control rather than a DeepSeek exactly-once guarantee.


#### 7. Can an application idempotency key prevent duplicate DeepSeek charges?

It can block known duplicate local sends, result writes, and downstream effects. It cannot guarantee exactly-once provider execution or billing after an ambiguous timeout because the application may not know whether the first dispatch completed.


#### 8. What is the best DeepSeek idempotency key design?

Use a tenant-scoped logical operation key plus a stored canonical request fingerprint. Reject the same key with changed input, retain the record through client and queue retry windows, and never expose secrets or raw personal data in the key.


#### 9. What does unknown_outcome mean after a DeepSeek timeout?

Dispatch began, but no complete terminal result was durably recorded. The application therefore cannot safely label the operation unsent or successful and should not automatically replay it without an explicit reconciliation or duplicate-risk policy.


#### 10. Does aborting a DeepSeek request cancel provider inference?

A client abort proves only that the client stopped waiting. The official documentation reviewed does not guarantee that the abort stopped provider inference, prevented token usage, or prevented billing.


#### 11. How should streaming interruptions be retried?

Treat a stream that ends before terminal completion as an ambiguous partial generation. Do not splice a fresh response onto partial text or repeat downstream effects; discard, version, expose as incomplete, or review it under a documented product policy.


#### 12. How do I prevent duplicate DeepSeek tool calls?

Protect each downstream action with its own business idempotency key, validated arguments, conditional state transition, and approval gate when needed. Do not rely only on a model-generated tool_call_id.


#### 13. What is full jitter for DeepSeek exponential backoff?

Calculate an exponentially increasing capped ceiling, then choose a random delay between zero and that ceiling. The random spread prevents many workers from retrying in sync.


#### 14. How many times should a DeepSeek request be retried?

DeepSeek does not publish one universal application attempt count. Use a small bounded attempt budget, a total operation-age limit, and a workload-specific policy. Four total attempts is an illustrative starting point, not an official default.


#### 15. How can I tell whether my DeepSeek SDK retries automatically?

Inspect the current SDK configuration and transport documentation, disable hidden retries during testing, and instrument actual network sends separately from logical attempts. A mismatch reveals retries outside your visible application loop.


### Official sources

- DeepSeek Create Chat Completion

- DeepSeek Error Codes

- DeepSeek Rate Limit and Isolation

- DeepSeek Models and Pricing

- DeepSeek Token and Token Usage

- DeepSeek Context Caching

- DeepSeek Lists Models

- DeepSeek Change Log


### Conclusion

Reliable DeepSeek retries follow a strict hierarchy:

- return a stored terminal result instead of sending again;

- retry only classified transient responses within a bounded policy;

- surface ambiguous delivery instead of hiding it;

- make downstream actions independently idempotent;

- measure provider sends, not only application attempts.

That design cannot promise provider exactly-once execution. It can give your application something equally important: explicit state, bounded recovery, one committed local result, and no accidental repetition of protected business effects.

## 内部链接
- [DeepSeek API error-code guide](https://chat-deep.ai/docs/deepseek-error-codes/)
- [DeepSeek observability guide](https://chat-deep.ai/docs/deepseek-observability/)
- [DeepSeek Chat Completions guide](https://chat-deep.ai/guide/create-chat-completion/)
- [complete DeepSeek API guide](https://chat-deep.ai/docs/api/)
- [DeepSeek Node.js and TypeScript guide](https://chat-deep.ai/docs/deepseek-nodejs-typescript/)
- [DeepSeek Python SDK guide](https://chat-deep.ai/docs/deepseek-python-sdk/)
- [DeepSeek Tool Calls guide](https://chat-deep.ai/docs/deepseek-tool-calls/)
- [DeepSeek pricing guide](https://chat-deep.ai/pricing/)

## 外部链接
- [DeepSeek Error Codes page](https://api-docs.deepseek.com/quick_start/error_codes/)
- [Chat Completion reference](https://api-docs.deepseek.com/api/create-chat-completion/)
- [DeepSeek API reference](https://api-docs.deepseek.com/api/deepseek-api/)
- [change log](https://api-docs.deepseek.com/updates/)
- [Rate Limit and Isolation page](https://api-docs.deepseek.com/quick_start/rate_limit/)
- [Token and Token Usage page](https://api-docs.deepseek.com/quick_start/token_usage/)
- [Models and Pricing page](https://api-docs.deepseek.com/quick_start/pricing/)
- [Context Caching](https://api-docs.deepseek.com/guides/kv_cache/)
- [DeepSeek Create Chat Completion](https://api-docs.deepseek.com/api/create-chat-completion/)
- [DeepSeek Error Codes](https://api-docs.deepseek.com/quick_start/error_codes/)
- [DeepSeek Rate Limit and Isolation](https://api-docs.deepseek.com/quick_start/rate_limit/)
- [DeepSeek Models and Pricing](https://api-docs.deepseek.com/quick_start/pricing/)
- [DeepSeek Token and Token Usage](https://api-docs.deepseek.com/quick_start/token_usage/)
- [DeepSeek Context Caching](https://api-docs.deepseek.com/guides/kv_cache/)
- [DeepSeek Lists Models](https://api-docs.deepseek.com/api/list-models/)
- [DeepSeek Change Log](https://api-docs.deepseek.com/updates/)
- [(no anchor)](https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fdeepseek-retries-idempotency%2F)
- [(no anchor)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fdeepseek-retries-idempotency%2F&text=DeepSeek%20Retries%20and%20Idempotency%3A%20Avoid%20Duplicate%20Work%20in%20Production)
- [(no anchor)](https://www.linkedin.com/shareArticle?url=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fdeepseek-retries-idempotency%2F&title=DeepSeek%20Retries%20and%20Idempotency%3A%20Avoid%20Duplicate%20Work%20in%20Production)