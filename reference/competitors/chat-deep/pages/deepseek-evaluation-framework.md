# DeepSeek Evaluation Framework: Evals, RAG & Regression

- **URL**: https://chat-deep.ai/docs/deepseek-evaluation-framework/
- **Published**: 2026-06-21T18:08:59+00:00
- **Modified**: 2026-07-27T22:55:55+00:00
- **Category**: DeepSeek API Docs
- **Word count**: 5459
- **Code blocks**: 5
- **Description**: Build a DeepSeek evaluation framework with golden datasets, RAG metrics, hallucination checks, regression tests, release gates, and human review.

## H1


## H2 目录
- DeepSeek Evaluation Framework: Quick Answer
- Model Benchmarking vs Application Evaluation
- Define the Evaluation Contract and Risk Tiers
- Build and Version a Golden Dataset
- Record a Reproducible DeepSeek Run Manifest
- Choose Deterministic, Model-Based, Human, and Operational Metrics
- Measure Hallucination, Faithfulness, Factuality, and Groundedness
- Evaluate DeepSeek JSON Output
- Evaluate DeepSeek RAG Pipelines
- Evaluate DeepSeek Agents and Tool Calls
- Calibrate LLM-as-a-Judge and Human Review
- Handle Non-Determinism, Repeated Runs, and Statistical Uncertainty
- Run Regression Tests in CI Without Duplicate or Unbounded Spend
- Monitor Production and Promote Failures Back Into the Dataset
- Original DeepSeek V4 Evaluation Study: Method and Results
- Release Scorecard, Decision Rules, and Failure Analysis
- Method and Source Boundaries
- Frequently Asked Questions

## 正文
Last verified: July 27, 2026. This guide defines a DeepSeek evaluation framework for applications that call the DeepSeek API. It is an application-authored testing pattern, not an official DeepSeek product, hosted evaluation service, or universal scorecard. It combines versioned golden datasets, deterministic checks, RAG and tool metrics, calibrated model judges, human review, regression gates, and privacy-safe production feedback.


> Evidence rule: official DeepSeek documentation describes the API contract; a dated live observation describes only the tested requests; an evaluator score is a derived judgment; and a release threshold is a local policy. Keeping those four evidence classes separate prevents a fluent report from becoming a misleading claim.

Contents: quick answer | benchmarks vs application evals | risk contract | golden dataset | run manifest | metrics | hallucination | JSON | RAG | agents | judge calibration | uncertainty | CI | production feedback | original study | release decision | FAQ.


### DeepSeek Evaluation Framework: Quick Answer

A DeepSeek evaluation framework is a repeatable system for deciding whether a DeepSeek-powered application satisfies its own task contract. Define the behavior and risk first, freeze representative cases, run an exact model and prompt configuration, score each failure dimension separately, route uncertainty to reviewers, apply a predeclared release gate, and monitor the shipped workflow. Public model benchmarks can help shortlist a model, but they cannot validate your prompts, retrieved documents, JSON schema, tools, safety policy, latency, or cost.

This guide also includes a dated, bounded DeepSeek V4 application study with a frozen plan, sanitized results, explicit limitations, and a reproducible test package.

- Define: write the task contract, risk tier, owner, and unacceptable failures.

- Freeze: version the golden dataset, prompts, model settings, retriever, tools, and scoring rules.

- Run: execute a baseline and candidate under the same bounded plan.

- Score: keep deterministic, model-based, human, and operational evidence separate.

- Review: send ambiguous, high-risk, and scorer-disagreement cases to qualified people.

- Gate: block critical failures and material regressions, even when the average improves.

- Learn: promote reviewed production failures into the next dataset version.

Start with the DeepSeek API request and response contract so the test harness validates the behavior your application actually receives. Then make every experiment reproducible enough that another engineer can explain a pass, a failure, or a changed result without seeing private user content.


![DeepSeek application evaluation architecture connecting task contracts, golden datasets, frozen runs, automated scorers, human review, release gates, production monitoring, and regression feedback](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


### Model Benchmarking vs Application Evaluation


Question | Model benchmark | Application evaluation
What is tested? | A model across a published capability suite | Your complete workflow, prompts, context, tools, policies, and validators
What is the comparison unit? | Models or model versions | A production baseline and a release candidate
Who defines success? | The benchmark author | The product, domain, safety, and engineering owners
What can it support? | Candidate selection and external context | A task-specific release decision
What can it not prove? | Your hosted API reliability or product quality | General model superiority outside the tested distribution

For carefully scoped external context, the U.S. Center for AI Standards and Innovation published an April 2026 evaluation of the open-weight DeepSeek V4 Pro model. CAISI served the model on cloud H200 and B200 GPUs and reported results across nine benchmarks spanning five domains. Its approximately eight-month capability-gap statement was an aggregate, IRT-inspired inference across its evaluation design, not a claim about every task.

That study did not test the hosted api.deepseek.com service, this site’s prompts, a private RAG index, or a production agent. Its cost comparison also used prices available for that separate study. It must not be used as evidence for current API price, availability, latency, or an application’s release readiness. This is the boundary that keeps external benchmark context useful without turning it into borrowed proof.


### Define the Evaluation Contract and Risk Tiers

Write the evaluation contract before choosing metrics. A useful contract says what the system must do, what it must never do, which evidence is authoritative, who owns the decision, and what happens after a failure. “Helpful answer” is not testable. “Extract the invoice total as a decimal, cite the source page, abstain when the page is absent, and never initiate payment” is testable.


Risk tier | Example consequence | Recommended evidence | Example release treatment
Low | Style or convenience issue | Automated format and preference checks | Allow a small, understood variance
Moderate | Incorrect workflow or support answer | Deterministic assertions, groundedness, sampled human review | Require no material regression by segment
High | Financial, legal, safety, access, or irreversible impact | Case-level checks, domain review, authorization tests, abstention | Block on one known critical failure

Give every case a task owner, risk owner, and reviewer path. Define the deployment slice too: language, customer type, document source, tool class, input length, and failure severity can matter more than the overall average. A candidate that improves common low-risk cases while breaking one access-control case should not pass because its mean score increased.


### Build and Version a Golden Dataset

A golden dataset is a versioned collection of cases with expected behavior, not a folder of impressive prompts. Each case needs a stable ID, task family, risk tier, input or message history, reference context, expected result or rubric, prohibited claims, expected tool trace, provenance, reviewer, and case-level gate. Multi-turn cases need the exact messages sent because DeepSeek Chat Completions is stateless; the caller supplies the history required for each turn.


```
{
  "id": "grounded-abstention",
  "dataset_version": "support-eval-v3",
  "risk": "high",
  "context": "The supplied policy does not state a refund period.",
  "question": "How many days is the refund period?",
  "expected": {
    "abstention_token": "INSUFFICIENT_CONTEXT",
    "prohibited_claims": ["a guessed number"]
  },
  "owner": "support-policy",
  "review_status": "approved"
}
```

Separate development cases used during prompt design, regression cases that protect known behavior, and a blind holdout that is not copied into prompts or demonstrations. Run exact and near-duplicate detection across the splits. Track whether an example was derived from synthetic data, approved production feedback, a policy document, or an incident. Redact personal data and secrets before a trace becomes an eval case, and re-review cases when the underlying source expires.

Contamination can be subtler than an exact duplicate. A holdout answer may appear in a few-shot demonstration, a retrieval index, a judge rubric, a generated training example, or a debugging transcript. Maintain a source ledger, compare normalized text and semantic near-duplicates, and record which people saw the blind split. If a case leaks, move it out of the holdout and create a genuinely unseen replacement rather than quietly reporting the favorable result.

There is no universal minimum case count. Twenty carefully reviewed cases may expose a critical workflow failure that thousands of generic questions miss. Start with coverage of typical, edge, adversarial, and known-failure behavior, then expand based on production evidence. Publish the actual sample size and limitations instead of implying that dataset size alone creates statistical authority.


![Anatomy of a versioned DeepSeek golden evaluation case with development, regression, and blind holdout splits plus leakage, privacy, and deduplication controls](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


### Record a Reproducible DeepSeek Run Manifest

A model name is not a complete experiment identity. Freeze a run manifest before provider calls and hash it. Record the dataset and prompt versions, requested model, thinking mode, reasoning effort, tool schema, retrieval index, client and harness versions, timeout, concurrency, retry policy, request cap, case order, evaluator versions, UTC timestamp, and dated price snapshot. When the response returns system_fingerprint, retain a safe value internally for diagnosis; keep provider request IDs and tool-call IDs out of public evidence.


Manifest field | Why it matters | DeepSeek-specific note
Requested and returned model | Detects routing or configuration drift | Use current canonical IDs and compare the response field
thinking.type | Changes response fields and valid controls | Thinking is documented as enabled by default
reasoning_effort | Defines the intended thinking configuration | Current documented values include high and max
Sampling settings | Prevents false causal claims | temperature and top_p do not take effect in thinking mode; presence and frequency penalties are deprecated and ineffective
Concurrency and retries | Affect latency, spend, duplication, and failure rate | Official limits are account-level concurrency, not RPM or TPM
Usage and price date | Makes cost math auditable | Separate cache-hit input, cache-miss input, and output

DeepSeek’s official models and pricing page, checked on July 27, 2026, lists deepseek-v4-flash and deepseek-v4-pro, both with a 1M-token context length, maximum output of 384K tokens, thinking and non-thinking modes, JSON Output, and Tool Calls. Verify the live model list for the account before each study and use our current DeepSeek model guide for application-level selection context.


Documented model | Cache-hit input / 1M | Cache-miss input / 1M | Output / 1M | Account concurrency
deepseek-v4-flash | $0.0028 | $0.14 | $0.28 | 2,500
deepseek-v4-pro | $0.003625 | $0.435 | $0.87 | 500

The 1M-token context specification is a capacity limit, not proof that the application finds and uses the correct passage at every position. Long-context evaluation should vary evidence location, distractor density, source conflict, and output limits. Likewise, a high maximum output does not remove the need to treat finish_reason: "length" as an incomplete structured result.

DeepSeek’s V4 preview announcement said that deepseek-chat and deepseek-reasoner would become unavailable after July 24, 2026 at 15:59 UTC. That cutoff has passed. New fixtures should use the canonical V4 IDs; do not claim whether a legacy alias still resolves without a dated live request. When evaluating thinking behavior, follow the DeepSeek Thinking Mode protocol and score the final answer. The provider-returned reasoning_content field is not “hidden reasoning,” but it should still be treated as sensitive and excluded from public artifacts.


### Choose Deterministic, Model-Based, Human, and Operational Metrics

Use the cheapest reliable evaluator for each failure. Exact match, a numeric tolerance, JSON parsing, JSON Schema, citation-ID membership, allowlisted tool names, and authorization outcomes should be deterministic. A model judge is useful for tightly defined relevance, contradiction, or pairwise-preference questions, but its output is evaluator-produced evidence. Human reviewers own ambiguous meaning, high-impact policy, and scorer disagreements. Operational evidence covers latency, timeout, cancellation, tokens, cache fields, and estimated cost.


Evidence class | Examples | Source and unit | Decision owner
Provider-returned | Model, finish reason, token usage, cache-hit and cache-miss tokens | DeepSeek response fields; tokens or categorical state | Engineering validates the contract
Application-measured | Duration, timeout, retry, cancellation, tool execution result | Application clock and control plane | Engineering or operations
Evaluator-produced | Exact match, schema result, claim support, pairwise preference | Named scorer and version; boolean, label, or bounded score | Evaluation owner
Human or reconciled | Reviewer label, disagreement resolution, release decision | Documented rubric and review record | Domain and risk owners

Keep component results visible. A request can return HTTP 200 yet fail its format contract; valid JSON can fail its schema; a schema-valid answer can be unsupported; a correct model proposal can still be unauthorized to execute. Aggregating all of those states into one “quality score” hides the remediation path. For operational implementation, connect token and failure evidence to privacy-safe DeepSeek observability and check DeepSeek context caching evidence without assuming that a repeated prefix guarantees a hit.


![Ownership matrix for DeepSeek provider fields, application measurements, evaluator scores, human labels, and reconciled release evidence](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


### Measure Hallucination, Faithfulness, Factuality, and Groundedness

These terms answer different questions. Faithfulness asks whether a claim follows from the supplied context. Factuality asks whether it agrees with authoritative external truth. Groundedness asks whether the response is supported by the evidence the task permits it to use. Hallucination is a broader failure label that may include unsupported, invented, or contradictory content. A response can be faithful to stale context but factually wrong, or factually correct from prior knowledge but unfaithful to the supplied evidence.

Evaluate material claims, not only whole answers. Extract the claims; match each one to an allowed citation or source span; label it supported, unsupported, contradictory, or unverifiable; then test whether the task required abstention when support was absent. Run deterministic source-ID and quotation checks before a model judge. Route ambiguous or high-risk claims to a human who can inspect the authoritative source.


Supplied-context result | External-truth result | Useful label | Action
Supported | Correct | Faithful and factual | Pass this dimension
Supported | Incorrect or stale | Faithful to bad context | Fix retrieval/source governance
Unsupported | Correct | Factual but ungrounded | Fail a closed-context contract
Unsupported | Unknown | Unsupported claim | Review or fail by risk
Contradicts context | Any | Contradiction | Fail and investigate
Abstains when evidence is absent | Not required | Correct abstention | Pass the abstention contract

If you use a 0-5 severity scale, label it as a local rubric and publish the annotation instructions. Calibrate it with examples and report reviewer disagreement. Do not claim that the number is an official DeepSeek, OpenAI, or NIST metric.


![Decision tree separating DeepSeek output faithfulness, factuality, groundedness, unsupported claims, contradictions, and correct abstention](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


### Evaluate DeepSeek JSON Output

DeepSeek’s official JSON Output guide requires response_format: {"type":"json_object"}, and the prompt should explicitly request JSON and describe the expected structure. It also warns that content can occasionally be empty and that an insufficient max_tokens can truncate the result. Therefore, “the parser did not throw” is only one assertion.


```
function evaluateJsonContract(content, finishReason, schemaCheck) {
  const nonempty = typeof content === "string" && content.length > 0;
  const finishReasonOk = finishReason === "stop";
  let value = null;
  let jsonParse = false;

  if (nonempty) {
    try {
      value = JSON.parse(content);
      jsonParse = true;
    } catch {
      jsonParse = false;
    }
  }

  const schemaExact = jsonParse && schemaCheck(value);
  return { nonempty, finishReasonOk, jsonParse, schemaExact };
}
```

An exact schema check must validate required keys, reject forbidden extra keys with additionalProperties: false, and test types, enums, ranges, identifier membership, and business rules. Keep nonempty, finish_reason_ok, json_parse, schema_exact, claims_supported, and task_success as separate fields. The dedicated DeepSeek JSON Output live tests and validation guide covers the request format and stronger production implementation.


### Evaluate DeepSeek RAG Pipelines

RAG evaluation needs two scorecards because retrieval and generation fail differently. For the retriever, measure whether required evidence was present, how it ranked, whether distractors displaced it, and whether sources were stale or conflicting. For the generator, measure claim support, citation correctness, faithfulness, factuality, relevance, and abstention. An end-to-end answer score cannot tell you which component to fix.

- Supported question: all required facts appear in the supplied context and answer.

- Insufficient context: the required fact is absent and the model must abstain.

- Distractor case: a plausible but irrelevant chunk competes with the authoritative source.

- Stale or conflicting case: the system must apply source priority and surface uncertainty.

- Retrieval failure: required evidence exists in the corpus but is missing from the selected context.

Watch for deceptive successes. A model can answer correctly from prior knowledge after poor retrieval, which should fail a closed-context grounding contract. It can also faithfully repeat an obsolete document, which points to source freshness rather than generation. Record retriever version, index build, chunking policy, filters, and source-set version in the run manifest so a changed answer can be traced to the right layer.


![Two-stage DeepSeek RAG evaluation pipeline separating retriever coverage and ranking from generator faithfulness, citations, factuality, relevance, and abstention](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


### Evaluate DeepSeek Agents and Tool Calls

A tool call is a model proposal, not an executed action. Score the number and order of proposed calls, selected tool, JSON parsing, exact argument schema, allowlist membership, authorization result, side-effect policy, execution result, recovery behavior, continuation, and final task completion separately. The public study should use synthetic or stubbed tools and stop invalid or unauthorized proposals before execution.

DeepSeek’s official Tool Calls guide warns that model-generated arguments can be invalid or include hallucinated parameters, so application-side validation remains mandatory. Strict mode is Beta, uses the https://api.deepseek.com/beta base URL, requires strict: true on each function, and supports a constrained JSON Schema subset. Even strict schema conformance does not prove that the correct tool was selected, the values are safe, the user is authorized, or the workflow succeeded. See the tested DeepSeek Tool Calls and function validation guide for the full implementation boundary.


```
const proposal = {
  toolName: "lookup_synthetic_record",
  argumentsValid: true,
  allowlisted: true,
  authorized: true,
  sideEffectClass: "read_only"
};

const mayExecute =
  proposal.argumentsValid &&
  proposal.allowlisted &&
  proposal.authorized &&
  proposal.sideEffectClass === "read_only";

// A public evaluation uses a stub even when mayExecute is true.
```

Thinking-mode agent tests also need a protocol assertion. The official Thinking Mode guide says that when a thinking-mode turn returns tool calls, the assistant tool-call message, including its reasoning_content, must be passed back for the continuation request. Omission can produce HTTP 400. Test the handling without storing or publishing the raw reasoning field.


![DeepSeek agent evaluation trace covering model proposal, argument validation, authorization, stubbed tool execution, continuation, final answer, and reviewer outcome](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


### Calibrate LLM-as-a-Judge and Human Review

An LLM judge can scale review, but it cannot define truth by itself. Give the judge a narrow rubric, explicit pass and fail examples, an allowed output schema, and only the evidence needed for the decision. Classification, pass/fail, and randomized pairwise comparison are usually easier to audit than an unconstrained 1-10 quality score.

- Human agreement: compare judge labels with blinded domain-review labels on a calibration subset.

- Position bias: randomize baseline and candidate order, then measure whether reversing order changes the preference.

- Style and verbosity bias: include concise-correct and verbose-wrong examples.

- Self-preference: test whether the judge favors output from the same model family.

- Prompt injection: include candidate output or context that tells the evaluator to award a pass.

- Malformed judgment: route non-JSON or uncertain output to review rather than silently coercing it.

Version the judge prompt, model, mode, and rubric. Recalibrate after any change. Report agreement and disagreement, not just the judge’s average. Human review should be risk-based: this framework uses qualified human approval as a local policy for ambiguous and high-impact cases, but that does not by itself state a legal requirement. Preserve reviewer privacy and document how disagreements were reconciled.

Agreement needs context. Raw percentage agreement can look high when one label dominates, while Cohen’s kappa adjusts for chance agreement but can behave unexpectedly with rare classes and small samples. Publish the label distribution, confusion matrix, reviewer count, and unresolved cases alongside any summary statistic. If the calibration set is small, call the result a calibration check, not validation of the judge across domains.


### Handle Non-Determinism, Repeated Runs, and Statistical Uncertainty

For variable tasks, one observation is not a stable estimate. Repeat the same frozen case, report the per-case pass rate and disagreement rate, and compare baseline and candidate on paired inputs. Randomize answer order for pairwise judging. Preserve a seed only when the complete system supports it; a stored seed does not create reproducibility when the provider does not guarantee deterministic execution.

Use uncertainty honestly. A Wilson interval is useful for a binomial pass rate, and an exact paired sign test can summarize discordant baseline-candidate pairs. Neither rescues a tiny or unrepresentative dataset. With six pairs, one changed case moves the reported rate by 16.7 percentage points. Show counts beside percentages, label small samples, inspect critical cases individually, and avoid claiming significance when the design cannot support it.

Do not vary controls that the selected mode ignores. In DeepSeek thinking mode, the official Thinking Mode guide says temperature, top_p, presence_penalty, and frequency_penalty do not take effect. A sampling experiment that changes those fields while thinking remains enabled is not a valid causal comparison.


### Run Regression Tests in CI Without Duplicate or Unbounded Spend

Use two gates. Run dataset validation, scorer unit tests, schema fixtures, cost reconciliation, and privacy checks offline on every change. Run paid provider evaluation only after explicit approval against a frozen plan. Reserve every planned request in a fail-closed ledger before sending it, cap total requests and estimated cost, use bounded concurrency, and disable automatic retries during the publication study so an ambiguous timeout cannot duplicate paid work.


```
# Node.js 20+, no external packages
npm test
npm run offline
npm run hash-plan

# The public package deliberately refuses provider access.
# A separately reviewed live adapter is required for paid calls.
npm run live
```

The reproducibility package for this article is available at the DeepSeek evaluation framework repository. Its offline-first harness validates the synthetic dataset, exact and JSON scorers, grounding and abstention logic, non-executing tool checks, final-answer math, paired regression statistics, reviewer agreement, usage reconciliation, cost estimates, and recursive privacy audit. The default live command fails closed; the separately reviewed live adapter accepts an in-memory key, refuses duplicate run artifacts, and never persists provider payload text.

For production adaptations, use the DeepSeek Python SDK guide or the DeepSeek Node.js and TypeScript guide, apply the documented DeepSeek concurrency controls, and classify failures with the DeepSeek API error guide. Creating a provider client is not permission to publish its raw payloads.


![Two-tier DeepSeek evaluation CI pipeline with offline checks, bounded provider runs, request and cost caps, regression gates, human review, and fail-closed publication](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


### Monitor Production and Promote Failures Back Into the Dataset

Offline evals protect only known distributions. In production, collect allowlisted metadata by default: task class, model and prompt versions, finish state, validation booleans, latency buckets, token counts, cache counts, safe error class, reviewer disposition, and business outcome. Do not export prompts, outputs, retrieved documents, tool payloads, authorization headers, raw errors, or reasoning_content simply because an observability platform can accept them.

Where content retention is genuinely necessary, establish consent or another appropriate basis, redact before export, restrict access, set retention periods, and keep private traces separate from public evidence. Sample failures into a review queue, assign a taxonomy, reproduce them with synthetic or minimized fixtures, obtain domain approval, and add only reviewed cases to a new dataset version. Rerun the production baseline as well as the candidate so the gate measures regression instead of comparing against an old memory.

A public artifact should expose the minimum evidence needed to reproduce the calculation: case aliases, configuration versions, booleans, bounded counts, aggregate token totals, scorer versions, and file hashes. It should exclude credentials, headers, account balance, request and tool-call IDs, raw prompts, generated answers, retrieved text, tool arguments and results, reasoning text, reviewer identity, raw errors, stack traces, and local paths. Run the privacy audit recursively because forbidden fields can hide inside nested objects.

Use provider-reported usage rather than character estimates. DeepSeek’s current pricing separates cache-hit input, cache-miss input, and output tokens, so calculate each component from a dated DeepSeek API pricing snapshot. The Chat Completions response supports an estimate, not an account balance; reconcile finance-critical reporting with billing records.


```
estimatedCost =
  (cacheHitInputTokens / 1_000_000) * cacheHitPrice +
  (cacheMissInputTokens / 1_000_000) * cacheMissPrice +
  (completionTokens / 1_000_000) * outputPrice;
```


### Original DeepSeek V4 Evaluation Study: Method and Results


#### Method and Controls

Study date: July 27, 2026 UTC. This was a bounded application acceptance study against a frozen synthetic plan, not a general DeepSeek benchmark, reliability measurement, or SLA. The plan hash was 135c8d1b4682d88824d0cf4f9f9ad2e084480cdad08c9d9abd3155658033d1ed. It paired six task contracts across deepseek-v4-flash as the baseline and deepseek-v4-pro as the candidate: exact output, exact JSON schema, grounded QA, insufficient-context abstention, non-executing tool selection, and thinking-mode final-answer math.

The predeclared cap was 12 provider requests, concurrency was one, automatic retries were zero, and the timeout was 30 seconds. Five task families disabled thinking; the math case enabled thinking with reasoning_effort: high. The harness scored only the final answer for that case and did not persist raw reasoning_content. The live-run model verification was: all 12 requests returned HTTP 200, the returned model matched the planned canonical ID in every observation, and a backend fingerprint field was present.


#### Verification and Results

Before publication, the local verification suite passed 69 of 69 tests covering dataset and plan integrity, exact and schema scorers, grounding, abstention, tool safety, paired statistics, human-review calibration, usage and cost reconciliation, duplicate-run prevention, and recursive privacy checks. The temporary API key was revoked immediately after the live run and was never written to the package.

Post-run evidence audit: the frozen July 27 sanitizer retained and evaluated the first tool proposal but did not retain the number of proposals. Its two tool-case passes therefore establish that the first retained proposal matched the intended tool and argument contract; they do not prove that no additional proposal was returned. The retained evidence does prove that every returned model ID and terminal finish_reason matched the frozen request contract. The published harness now requires the requested model identity, exact terminal state, and exactly one tool proposal. Because tool-call cardinality cannot be reconstructed without the deliberately discarded provider payload, the post-run publication decision is human review required, even though the original frozen illustrative gate recorded a pass.


Study field | Sanitized result | Interpretation boundary
Exact tested model IDs | deepseek-v4-flash, deepseek-v4-pro | Observed for this dated run only
Planned / observed requests | 12 / 12 | No automatic retries
Flash baseline contract passes | 6 / 6 | Small synthetic case set
Pro candidate contract passes | 6 / 6 | Small synthetic case set
Paired candidate wins / losses / ties | 0 / 0 / 6 | Counts, not a general model ranking
Total prompt / completion / all tokens | 1476 / 367 / 1843 | Provider usage after reconciliation
Estimated cost | $0.000648060000 | Using official prices checked July 27, 2026; not a bill
Failed or review-routed cases | 0 failures under the original frozen evaluator; post-run evidence audit requires human review because tool-call cardinality was not retained; 7 of 12 offline reviewer-calibration items also routed to human review | Raw outputs are not published
Privacy audit | Passed; 0 issues across 575 audited nodes | Publication fails closed unless it passes
Illustrative release outcome | Human review required after the post-run evidence audit; the original frozen illustrative gate recorded a pass, but tool-call cardinality was not retained | Local policy for this synthetic study

Result interpretation: Flash and Pro each passed 6 of 6 bounded contracts under the original frozen evaluator, so all six paired comparisons were ties. This is mixed or insufficient comparative evidence, not proof of equivalence. The Wilson 95% interval for an observed 6 of 6 pass rate is 0.609657 to 1.000000, which is too wide for a production reliability claim. A post-run evidence audit changed the publication decision to human review required because the sanitizer did not retain tool-call cardinality.


#### Limitations

Study limitations: The live result contains one observation per task-model pair and no stochastic repeats. The frozen sanitizer retained only the first tool proposal, not the total proposal count. The study used synthetic English-only cases, one account, a small paired sample, one serial execution plan, and no production traffic. It did not estimate availability, long-run latency, safety across untested domains, or performance over the 1M-token context limit.


![Sanitized DeepSeek V4 application evaluation dashboard showing the bounded case set, contract checks, RAG and tool results, run count and single-observation limitations, token usage, estimated cost, release decision, and privacy audit](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


### Release Scorecard, Decision Rules, and Failure Analysis

A release scorecard should contain absolute contract gates and paired regression gates. The following numbers are illustrative local policy for a synthetic reference application. They are not DeepSeek recommendations, industry standards, or statistically justified defaults for another product.


Dimension | Illustrative local gate | Owner | Failure response
Critical exact, schema, authorization, and abstention cases | 100% pass and no known regression | Engineering plus risk owner | Block release
Moderate-risk task success | No material paired decline from current production | Product and evaluation owner | Inspect slices and remediate
High-risk subjective cases | Qualified reviewer approval with resolved disagreements | Domain reviewer | Hold for human decision
Latency and cost | Within a predeclared product budget | Operations and finance | Optimize or obtain an explicit exception
Evidence integrity | Complete manifest, reconciled usage, passing privacy audit | Evaluation owner | No publication and no promotion


#### A Practical Failure-Analysis Order

- Confirm the case, prompt, dataset, model, mode, and evaluator versions.

- Separate transport, terminal-state, parsing, schema, evidence, policy, and task failures.

- Reproduce offline when possible; do not spend another provider request by reflex.

- Compare the same case against the production baseline and inspect the risk slice.

- Send judge disagreement or ambiguous source interpretation to a reviewer.

- Fix the responsible layer, add the reviewed failure to a new dataset version, and rerun the gate.


### Method and Source Boundaries

Current DeepSeek facts in this guide were checked against the official models and pricing table, Chat Completions reference, JSON Output guide, Thinking Mode guide, Tool Calls guide, context caching guide, and account-level concurrency guide. General risk and evaluation principles were cross-checked with NIST AI RMF Measure guidance. No third-party framework behavior is presented as a DeepSeek platform fact.

Before adapting the harness, create and protect credentials using the DeepSeek API key guide. Compatible clients can also follow the OpenAI SDK with DeepSeek guide, but the evaluation contract remains application-owned regardless of client library.


### Frequently Asked Questions


#### What is a DeepSeek evaluation framework?

It is a task-specific system for testing an application that uses DeepSeek. It versions cases and configuration, runs a baseline and candidate, applies deterministic, model-based, human, and operational checks, then uses predeclared release rules. The framework described here is an application-authored pattern, not an official DeepSeek product.


#### How do you evaluate a DeepSeek API application?

Define the task and unacceptable failures, build a representative golden dataset, freeze the model and application configuration, run paired tests, score each failure dimension separately, review uncertain or high-risk cases, and block critical regressions. Continue sampling privacy-safe production failures into later dataset versions.


#### How many examples should a DeepSeek golden dataset contain?

There is no universal number. Coverage of deployment behavior, known failures, edge cases, adversarial cases, and high-risk segments matters more than a headline count. Start with reviewed cases for each critical workflow, publish the sample size and limitations, and grow the dataset from approved production evidence.


#### How do you test DeepSeek hallucinations in a RAG system?

Score retrieval and generation separately. Check whether required evidence was retrieved, then classify each material answer claim as supported, unsupported, contradictory, or unverifiable. Test citation membership and abstention when context is insufficient. Also include stale, conflicting, and distractor documents so a plausible answer cannot hide a pipeline failure.


#### Can DeepSeek evaluate its own answers?

It can act as a model judge for narrow classifications or pairwise comparisons, but the score is not ground truth. Calibrate it against blinded human labels, test self-preference, position and verbosity bias, prompt injection, and malformed judgments, and route disagreements to review.


#### Which DeepSeek evaluation metrics should block a release?

Block failures tied to the application’s defined harm: exact schema violations, unauthorized tools, failed required abstention, unsupported high-risk claims, or a known critical regression. Average relevance or preference scores should not override a case-level safety or authorization failure. Thresholds must be calibrated locally.


#### How do you run DeepSeek regression tests in CI/CD?

Run offline dataset, scorer, schema, and privacy tests on every change. Put provider calls behind an explicit bounded job with a frozen plan, request and spend caps, controlled concurrency, zero automatic retries for the study, sanitized artifacts, and a fail-closed release and publication decision.


#### How do you compare DeepSeek V4 Flash and V4 Pro fairly?

Use identical versioned cases, prompts, context, tool schemas, mode settings, timeouts, evaluator versions, and case order. Compare paired case outcomes and report usage and estimated cost by model. Do not mix current API prices with historical benchmark assumptions, and do not call a small application test a general model ranking.


#### How many times should each LLM evaluation case be repeated?

Repeat stochastic cases enough to reveal meaningful variation for the decision and risk level; there is no universal count. Report both observations and cases, show per-case disagreement, and use uncertainty intervals only when the sample supports them. One pass is an observation, not a reliability estimate.


#### How do you control the token cost of a DeepSeek evaluation run?

Freeze a request cap, output-token limits, model mix, concurrency, retry policy, and price snapshot before the run. Reserve requests in a ledger, stop at the cap, and calculate cache-hit input, cache-miss input, and output separately from provider-reported usage. Treat the result as an estimate until reconciled with billing records.

Bottom line: a useful DeepSeek evaluation framework does not chase one impressive score. It makes the task, evidence, uncertainty, privacy boundary, and release decision inspectable. Freeze what you test, measure the component that can fail, publish only sanitized evidence, and let reviewed production failures make the next version harder to fool.

## 内部链接
- [DeepSeek API request and response contract](https://chat-deep.ai/docs/api/)
- [current DeepSeek model guide](https://chat-deep.ai/models/)
- [DeepSeek Thinking Mode protocol](https://chat-deep.ai/docs/deepseek-thinking-mode/)
- [privacy-safe DeepSeek observability](https://chat-deep.ai/docs/deepseek-observability/)
- [DeepSeek context caching evidence](https://chat-deep.ai/docs/deepseek-context-caching/)
- [DeepSeek JSON Output live tests and validation guide](https://chat-deep.ai/docs/json-output/)
- [DeepSeek Tool Calls and function validation guide](https://chat-deep.ai/docs/deepseek-tool-calls/)
- [the DeepSeek Python SDK guide](https://chat-deep.ai/docs/deepseek-python-sdk/)
- [the DeepSeek Node.js and TypeScript guide](https://chat-deep.ai/docs/deepseek-nodejs-typescript/)
- [DeepSeek concurrency controls](https://chat-deep.ai/docs/api-rate-limits/)
- [DeepSeek API error guide](https://chat-deep.ai/docs/deepseek-error-codes/)
- [DeepSeek API pricing snapshot](https://chat-deep.ai/pricing/)
- [DeepSeek API key guide](https://chat-deep.ai/docs/deepseek-api-key/)
- [OpenAI SDK with DeepSeek guide](https://chat-deep.ai/docs/openai-sdk-to-deepseek/)

## 外部链接
- [April 2026 evaluation of the open-weight DeepSeek V4 Pro model](https://www.nist.gov/news-events/news/2026/05/caisi-evaluation-deepseek-v4-pro)
- [models and pricing page](https://api-docs.deepseek.com/quick_start/pricing/)
- [the live model list](https://api-docs.deepseek.com/api/list-models/)
- [V4 preview announcement](https://api-docs.deepseek.com/news/news260424/)
- [JSON Output guide](https://api-docs.deepseek.com/guides/json_mode/)
- [Tool Calls guide](https://api-docs.deepseek.com/guides/tool_calls/)
- [Thinking Mode guide](https://api-docs.deepseek.com/guides/thinking_mode/)
- [Thinking Mode guide](https://api-docs.deepseek.com/guides/thinking_mode/)
- [the DeepSeek evaluation framework repository](https://github.com/chatdeepai/deepseek-api-reproducible-tests/tree/main/evaluation-framework)
- [models and pricing table](https://api-docs.deepseek.com/quick_start/pricing/)
- [Chat Completions reference](https://api-docs.deepseek.com/api/create-chat-completion/)
- [JSON Output guide](https://api-docs.deepseek.com/guides/json_mode/)
- [Thinking Mode guide](https://api-docs.deepseek.com/guides/thinking_mode/)
- [Tool Calls guide](https://api-docs.deepseek.com/guides/tool_calls/)
- [context caching guide](https://api-docs.deepseek.com/guides/kv_cache/)
- [account-level concurrency guide](https://api-docs.deepseek.com/quick_start/rate_limit/)
- [NIST AI RMF Measure guidance](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/)
- [(no anchor)](https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fdeepseek-evaluation-framework%2F)
- [(no anchor)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fdeepseek-evaluation-framework%2F&text=DeepSeek%20Evaluation%20Framework%3A%20Golden%20Datasets%2C%20Regression%20Tests%2C%20Hallucination%20Scoring%2C%20and%20Human%20Review)
- [(no anchor)](https://www.linkedin.com/shareArticle?url=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fdeepseek-evaluation-framework%2F&title=DeepSeek%20Evaluation%20Framework%3A%20Golden%20Datasets%2C%20Regression%20Tests%2C%20Hallucination%20Scoring%2C%20and%20Human%20Review)