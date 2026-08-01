# DeepSeek Coding Benchmark: Flash vs Pro in 5 Languages

- **URL**: https://chat-deep.ai/docs/deepseek-coding-benchmark/
- **Published**: 
- **Modified**: 
- **Category**: DeepSeek API Docs
- **Word count**: 3199
- **Code blocks**: 2
- **Description**: See a live DeepSeek coding benchmark across Python, JavaScript, Java, Go, and C#, with compilation, 14 tests, token use, cost, and limits.

## H1


## H2 目录
- Test disclosure and freshness
- On this page
- What this DeepSeek coding benchmark tested
- Why the task uses a monotonic deque
- Exact live results
- Why three Flash cells stopped at extraction
- Language-by-language findings
- Tokens and cost
- Why this article does not rank latency
- How to interpret the result
- How to reproduce a safer coding evaluation
- Limitations
- Frequently asked questions
- Sources

## 正文
In this controlled DeepSeek coding benchmark, deepseek-v4-pro produced five safely extractable programs and all five passed every test. deepseek-v4-flash produced two safely extractable programs, both of which passed every test; its Java, Go, and C# cells failed at the extraction gate and were not compiled. The combined result was 7 of 10 programs passing the full pipeline and 98 of 140 model-language test opportunities passing.

That is a precise result for one algorithmic task, one generation per cell, five local toolchains, and a dated API run. It is not evidence that Pro always writes better code, that Flash cannot write Java, Go, or C#, or that one language is easier for either model.

The benchmark used the same shortest-subarray problem in Python, JavaScript, Java, Go, and C#. Each model received one fresh request per language with thinking enabled, reasoning_effort: high, a 4,096-token output cap, no repair prompt, no retry, and no access to test feedback. Every safely extracted program was compiled or syntax-checked and run against the same 14 deterministic cases.

Chat-Deep.ai is an independent technical site and is not affiliated with DeepSeek. For the broader product experience, start with the DeepSeek guide on Chat-Deep.ai.

Benchmark at a glance

- Live requests: 10 planned, 10 observed

- Models: deepseek-v4-flash and deepseek-v4-pro

- Languages: Python, JavaScript, Java, Go, and C#

- Full-pipeline passes: 7 of 10

- Pro: 5 of 5 programs passed all 14 cases

- Flash: 2 of 5 programs passed all 14 cases

- HTTP responses: 10 of 10 returned status 200

- Extraction failures: Flash Java, Flash Go, and Flash C#

- Automatic retries: 0

- Total tokens: 30,083

- Dated usage-derived cost: $0.0147965696

- Temporary API key: revoked after the run and revocation recorded


### Test disclosure and freshness


Evidence item | Recorded value
Official documentation review | July 25, 2026
Live workflow window | 2026-07-26 00:49:59.205Z to 00:56:04.572Z
Benchmark design | Frozen before the first live request
Live call budget | Exactly 10, with a hard ceiling of 10
Execution order | Sequential, concurrency 1
Replacements or repair calls | None
Independent local audit | Passed; zero additional API requests
Runner SHA-256 | b84a7f0d130914c21b779a680d5c13d549c0634e7711bbaa3ec41dd7b30da5ef

The public evidence is intentionally sanitized. It excludes API credentials, authorization headers, account details, raw completion IDs, raw backend fingerprints, response headers, raw assistant messages, and private paths. Source hashes were retained for the seven accepted programs, while the three rejected outputs were not persisted as source files.


### On this page

- What this DeepSeek coding benchmark tested

- Why the task uses a monotonic deque

- Exact live results

- Why three Flash cells stopped at extraction

- Language-by-language findings

- Tokens and cost

- Why this article does not rank latency

- How to interpret the result

- How to reproduce a safer coding evaluation

- Limitations

- Frequently asked questions


### What this DeepSeek coding benchmark tested

DeepSeek’s current Chat Completion API reference documents deepseek-v4-flash and deepseek-v4-pro as model values. It also documents explicit thinking controls, usage counters, returned model names, and non-streaming responses. The Thinking Mode guide explains the enabled or disabled switch and the high and max reasoning-effort values.

We compared the two current V4 API model IDs with this fixed matrix:


Language | Flash generation | Pro generation | Shared validation
Python 3.12 | 1 | 1 | Syntax check plus 14 cases
JavaScript on Node.js 24 | 1 | 1 | Syntax check plus 14 cases
Java 21 | 1 | 1 | Compile plus 14 cases
Go 1.26 | 1 | 1 | Compile plus 14 cases
C# / .NET Framework compiler 4.8 | 1 | 1 | Compile plus 14 cases

Every request used a new one-turn conversation. The shared system message asked for one complete source file, standard input and output only, no network, no environment variables, and no external files. Language-specific wording changed only the filename, runtime compatibility, and integer-type guidance.

The exact request configuration was:


```
{
  "stream": false,
  "thinking": { "type": "enabled" },
  "reasoning_effort": "high",
  "max_tokens": 4096
}
```

Temperature and top-p were omitted. DeepSeek’s current thinking documentation says those sampling controls do not affect thinking mode, so including them would add noise without making the comparison more controlled.


![Six-stage DeepSeek coding benchmark pipeline from frozen prompt through API response, extraction, safety, build, and fourteen tests.](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


### Why the task uses a monotonic deque

The program had to find the minimum length of a non-empty contiguous subarray whose sum is at least K. Array values could be negative, K used signed 64-bit range, and a correct solution needed 64-bit prefix sums.

A standard sliding window works when all values are non-negative because extending the window cannot reduce its sum. Negative values break that property. The expected linear-time solution builds prefix sums and maintains candidate prefix indices in a deque:

- Remove indices from the front while the current prefix minus the oldest candidate reaches K; each removal yields a valid length.

- Remove indices from the back while their prefix sum is greater than or equal to the current prefix; they can never be a better future starting point.

- Append the current prefix index.

The benchmark expected O(n) behavior. It did not attempt to prove asymptotic complexity by timing huge arrays, but the prompt explicitly rejected an O(n squared) design and the retained sources could be reviewed against the requested approach.

The 14 frozen cases covered exact answers, impossible answers, mixed positive and negative inputs, non-positive thresholds, deque-front and deque-back pressure, a late one-element optimum, a whole-array answer, and prefix sums beyond signed 32-bit range. A brute-force oracle independently recalculated every expected value before dispatch.


![Fourteen shortest-subarray test categories covering negative values, impossible answers, non-positive targets, deque pressure, and 64-bit prefix sums.](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


### Exact live results

All 10 requests returned HTTP 200 and the requested model ID. That only proves the API request succeeded at the transport and response-envelope level. A cell counted as a benchmark pass only after source extraction, a safety gate, compilation or syntax validation, execution, and exact output comparison for all 14 cases.


Model | Language | API | Extraction | Compile or syntax | Tests | Final outcome
Flash | Python | 200 | Passed | Passed | 14/14 | Full pass
Pro | Python | 200 | Passed | Passed | 14/14 | Full pass
Pro | JavaScript | 200 | Passed | Passed | 14/14 | Full pass
Flash | JavaScript | 200 | Passed | Passed | 14/14 | Full pass
Flash | Java | 200 | Failed: empty response | Not run | 0/14 | Extraction failure
Pro | Java | 200 | Passed | Passed | 14/14 | Full pass
Pro | Go | 200 | Passed | Passed | 14/14 | Full pass
Flash | Go | 200 | Failed: malformed code fence | Not run | 0/14 | Extraction failure
Flash | C# | 200 | Failed: empty response | Not run | 0/14 | Extraction failure
Pro | C# | 200 | Passed | Passed | 14/14 | Full pass


![Sanitized screenshot-style dashboard listing model, language, HTTP status, extraction outcome, test count, tokens, and final result for ten live calls.](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

The aggregate model view is intentionally mechanical:


Model | Fully passed cells | Cases credited | Total tokens | Dated cost
deepseek-v4-flash | 2/5 | 28/70 | 17,497 | $0.0046435536
deepseek-v4-pro | 5/5 | 70/70 | 12,586 | $0.0101530160
Combined | 7/10 | 98/140 | 30,083 | $0.0147965696

The “cases credited” denominator treats a cell that never reached execution as zero passed cases. This is useful for full-pipeline reliability, but it should not be mistaken for a claim that the unseen code would have failed each algorithmic case. There was no accepted source to compile or run in those cells.


![Two-by-five result matrix showing full passes for both Python and JavaScript cells, Pro passes for Java, Go, and C#, and three Flash extraction stops.](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


### Why three Flash cells stopped at extraction

The extraction gate is part of the product-facing result, not a footnote. A coding response that cannot be turned into the requested file without manual interpretation is not deployment-ready output.

The Flash Java and Flash C# cells were recorded as empty_response. The Flash Go cell was recorded as malformed_code_fence. Each response consumed the full 4,096 completion-token allowance. The harness did not retain raw assistant messages, so this article cannot reconstruct or reclassify those outputs. It reports only the sanitized classifications produced during the live run.

No source file was written for those three cells. The safety scanner, compiler, and tests were therefore not run. This prevents a malformed boundary from becoming executable code by accident and avoids silently “helping” a model by repairing its format.

The benchmark also did not send a follow-up such as “return the code again.” A repair turn would test a different workflow, consume a different token budget, and give three cells more opportunities than the others. The zero-retry design preserved the original 10-cell comparison at the cost of leaving failed cells failed.

The right conclusion is narrow: in this run, Flash had three output-extraction failures in Java, Go, and C# under a 4,096-token cap. It would be unsupported to conclude that Flash lacks the underlying programming ability in those languages. A larger repeated trial could separate formatting reliability, truncation, and code correctness.


### Language-by-language findings


#### Python

Both Python programs were safely extracted, passed syntax validation, and returned all 14 expected answers. Flash used 1,428 total tokens and Pro used 2,063. This single pair shows equal fixture correctness, not statistical equivalence.


#### JavaScript

Both JavaScript programs passed all 14 cases. Pro used 3,089 total tokens and Flash used 2,978. Both prompts recorded 128 cache-hit tokens, so their input-cost calculation used a mixture of cache-hit and cache-miss rates.


#### Java

Pro produced an accepted Java source, compiled with javac 21.0.12, and passed every case. Flash returned HTTP 200 but the extraction result was empty, so no Java file reached the compiler. This is a pipeline reliability difference for the observed generations, not a Java capability verdict.


#### Go

Pro’s Go source compiled with Go 1.26.3 and passed all fixtures. Flash reached HTTP 200 but failed the strict one-file extraction contract because the code fence was malformed. No manual fence repair was allowed.


#### C#

Pro’s C# source compiled with the .NET Framework compiler file version 4.8.4161.0 and passed all fixtures. Flash’s output was classified as empty at extraction, and no code was executed.

The seven retained source files were independently rechecked after the live run. Their SHA-256 values matched the report, all seven recompiled or passed syntax validation, and all seven again emitted exactly 14 correct lines. The independent audit made zero API requests and did not modify the benchmark state.


### Tokens and cost

The API returned usage fields for prompt tokens, cache-hit prompt tokens, cache-miss prompt tokens, completion tokens, and totals. Cost was calculated with the prices frozen on July 25, 2026 from DeepSeek’s official Models and Pricing page:


Model | Cache-hit input / 1M | Cache-miss input / 1M | Output / 1M
deepseek-v4-flash | $0.0028 | $0.14 | $0.28
deepseek-v4-pro | $0.003625 | $0.435 | $0.87


```
cost =
  cache_hit_input_tokens  * cache_hit_rate  / 1,000,000
+ cache_miss_input_tokens * cache_miss_rate / 1,000,000
+ completion_tokens       * output_rate     / 1,000,000
```


Metric | Flash | Pro | Combined
Prompt tokens | 1,324 | 1,324 | 2,648
Completion tokens | 16,173 | 11,262 | 27,435
Total tokens | 17,497 | 12,586 | 30,083
Estimated cost | $0.0046435536 | $0.0101530160 | $0.0147965696


![Comparison of Flash and Pro total tokens, dated API cost, and cost per accepted source in the ten-call benchmark.](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

Pro cost more even though it used fewer total tokens because its documented input and output rates were higher on the verification date. Flash’s three extraction failures each consumed 4,096 completion tokens, increasing its token count without producing executable files. That illustrates why a cheaper token rate does not guarantee the lowest cost per accepted result.

Using the observed full-pipeline outcomes, the dated cost per accepted program was about $0.00232 for Flash and $0.00203 for Pro. Those derived figures are specific to this tiny run and should not be used as procurement forecasts. Prices can change, cache behavior is best effort, and repeated generations would produce different token counts.


### Why this article does not rank latency

The runner stored a high-resolution http.latency_ms value, but code review found that its timer stopped immediately after fetch() returned response headers and before the JSON body was awaited and parsed. It is therefore not end-to-end generation latency. Ranking the models with those roughly 288-496 ms values would be misleading.

The durable state contains start-to-complete workflow intervals of roughly 13.6 to 47.0 seconds. Those intervals are also not pure provider latency: they include the API wait, body handling, extraction, compilation or syntax checks, unit execution, and state-file writes. Local compilation was especially visible in the Pro Go cell.


![Timing warning distinguishing a response-header fetch timer from a durable workflow interval that also includes extraction, compilation, tests, and state writes.](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

This article therefore makes no model-speed claim. A future latency study should instrument at least time to headers, time to complete body, extraction time, compile time, test time, and state-write time separately. Streaming tests would need additional markers such as time to first content token and time to final event.


### How to interpret the result

The strongest supported statement is:


> On July 25-26, 2026, under one frozen shortest-subarray task and one generation per model-language pair, Pro completed the full pipeline in 5 of 5 cells. Flash completed it in 2 of 5 cells; its other three cells stopped at strict source extraction. All seven extracted programs passed all 14 deterministic tests, and an independent local audit reproduced those seven results.

That statement separates three dimensions that are often mixed together:

- API success: all 10 calls returned HTTP 200.

- Artifact usability: 7 of 10 responses yielded a safe, extractable source file.

- Code correctness after extraction: 7 of 7 retained files passed the complete fixture.


![Evidence funnel separating ten successful API responses, seven usable source artifacts, and seven programs that passed every deterministic test.](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

For an application that needs a one-shot source file with no repair loop, extraction reliability matters directly. For an interactive coding assistant that can ask for reformats or continue an incomplete response, the same raw model behavior might lead to a different practical outcome. Benchmark design must match the workflow being selected.

Official model-card benchmarks answer broader questions with much larger datasets. DeepSeek’s official V4 model card reports vendor-run results for coding and agentic evaluations. Those figures are context, not data points that can be averaged with this test. Our experiment measures a narrow one-file contract across five languages.


### How to reproduce a safer coding evaluation

Use a process that prevents invisible favors and accidental execution:

- Freeze the task and fixtures first. Store the exact prompt, model-language order, tool versions, and expected outputs before dispatch.

- Use a hard call ceiling. Write a durable dispatch marker before each request and never resend an indeterminate cell.

- Counterbalance simple order effects. Do not always run one model first within every language pair.

- Keep conversations independent. A previous solution or test failure must not leak into the next cell.

- Extract conservatively. Accept only the requested source shape, reject malformed boundaries, and impose size limits.

- Scan before execution. Block network, subprocess, environment access, and unexpected file writes.

- Compile in isolated directories. Apply execution timeouts and output caps.

- Use deterministic expected output. Do not use another language model as the judge for an algorithm with exact answers.

- Record failures at their actual stage. HTTP success, extraction, safety, compilation, and tests are different states.

- Audit retained artifacts. Hash sources and rerun them without making new provider calls.

Publishing a raw prompt and a screenshot of a model answer is not enough. A useful coding benchmark needs an executable contract, reproducible validators, failure accounting, and honest limits.


### Limitations

- There was one generation per model-language cell. No confidence interval or stable win rate can be estimated.

- One shortest-subarray task cannot represent debugging, repository work, framework knowledge, security review, or agentic development.

- The 14 cases were deterministic and independently oracle-checked, but they are still a small fixture.

- Three cells stopped at extraction. Because raw assistant messages were intentionally not retained, their classifications cannot be independently reconstructed.

- A 4,096-token cap may have contributed to the three full-budget Flash failures, but the stored evidence cannot prove causation.

- No repair turns were allowed, so this is a strict one-shot artifact benchmark rather than an interactive coding workflow.

- The timing instrumentation does not support provider-latency ranking.

- Token counts were checked for arithmetic consistency, but they were not compared with a provider billing export.

- Cost uses prices verified on July 25, 2026 and can become stale.

- Toolchain startup affects local workflow duration, especially for compiled languages.

- The temporary credential’s revocation was recorded and the credential was absent from artifacts, but the independent auditor did not reopen the provider UI.

- The runner file hash was computed after the minimal Node process-compatibility patch and is not cryptographically anchored by the provider.


### Frequently asked questions


#### Which DeepSeek model won this coding benchmark?

deepseek-v4-pro completed all five model-language cells, while deepseek-v4-flash completed two. This is a win for Pro on this exact one-shot pipeline, not a general claim about every coding task.


#### What programming task did the benchmark use?

It used the shortest non-empty contiguous subarray whose sum is at least K, with negative values allowed. The expected linear-time approach uses 64-bit prefix sums and a monotonic deque.


#### Which languages were tested?

The benchmark tested Python 3.12, JavaScript on Node.js 24, Java 21, Go 1.26, and C# with the .NET Framework compiler 4.8.


#### How many live DeepSeek API calls were made?

Exactly 10 live calls were planned and observed: two models across five languages. Calls were sequential, the hard ceiling was 10, and automatic retries were disabled.


#### Did every API request succeed?

All 10 requests returned HTTP 200 and the requested model name. Three Flash responses still failed the stricter source-extraction gate, showing that HTTP success is not the same as a usable program.


#### Why did Flash fail Java, Go, and C#?

Flash Java and C# were recorded as empty responses at extraction, while Flash Go had a malformed code fence. The raw messages were not retained, so the evidence does not support a more specific causal claim.


#### Were failed outputs manually repaired?

No. There were no repair prompts, manual source edits, silent fence fixes, or replacement calls. A failed extraction remained a failed cell.


#### How many unit tests did each program face?

Each accepted program faced the same 14 deterministic cases. All seven accepted programs passed 14 of 14, and the independent local audit reproduced every retained result.


#### Was thinking mode enabled?

Yes. Every request explicitly enabled thinking and set reasoning_effort to high. Temperature and top-p were omitted.


#### How much did the benchmark cost?

The usage-derived estimate was $0.0147965696 using DeepSeek prices verified on July 25, 2026. It is a dated estimate, not an invoice or a future price guarantee.


#### Which model used fewer tokens?

Pro used 12,586 total tokens and Flash used 17,497. Flash’s three extraction failures each consumed the full 4,096-token completion allowance, which raised its total without yielding executable source.


#### Was Pro cheaper because it used fewer tokens?

No. Pro’s estimated total was $0.0101530160 versus $0.0046435536 for Flash because the verified Pro token rates were higher. In this run, however, Pro’s derived cost per accepted file was slightly lower.


#### Which model was faster?

This benchmark does not make a speed claim. The stored fetch timer measured time to response headers, while durable workflow intervals also included local extraction, compilation, tests, and state writes.


#### Can these results be reproduced?

The seven retained source files were hashed, recompiled or syntax-checked, and rerun against the frozen fixture by an independent local audit. Repeating the provider generations would be a new experiment and may produce different code.


#### Should I choose DeepSeek V4 Flash or Pro for coding?

Choose with a repeated test that matches your workload, languages, output contract, repair policy, latency needs, and budget. This snapshot favors Pro for strict one-shot file delivery, while both models were correct whenever a source file passed extraction.


### Sources

- DeepSeek Create Chat Completion API

- DeepSeek Thinking Mode guide

- DeepSeek Models and Pricing

- DeepSeek Context Caching

- DeepSeek API change log

- Official DeepSeek V4 model card

## 内部链接
- [DeepSeek guide on Chat-Deep.ai](https://chat-deep.ai/)

## 外部链接
- [Chat Completion API reference](https://api-docs.deepseek.com/api/create-chat-completion/)
- [Thinking Mode guide](https://api-docs.deepseek.com/guides/thinking_mode/)
- [Models and Pricing page](https://api-docs.deepseek.com/quick_start/pricing/)
- [V4 model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash)
- [DeepSeek Create Chat Completion API](https://api-docs.deepseek.com/api/create-chat-completion/)
- [DeepSeek Thinking Mode guide](https://api-docs.deepseek.com/guides/thinking_mode/)
- [DeepSeek Models and Pricing](https://api-docs.deepseek.com/quick_start/pricing/)
- [DeepSeek Context Caching](https://api-docs.deepseek.com/guides/kv_cache/)
- [DeepSeek API change log](https://api-docs.deepseek.com/updates/)
- [Official DeepSeek V4 model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash)
- [(no anchor)](https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fdeepseek-coding-benchmark%2F)
- [(no anchor)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fdeepseek-coding-benchmark%2F&text=DeepSeek%20Coding%20Benchmark%20Across%20Python%2C%20JavaScript%2C%20Java%2C%20Go%2C%20and%20C%23)
- [(no anchor)](https://www.linkedin.com/shareArticle?url=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fdeepseek-coding-benchmark%2F&title=DeepSeek%20Coding%20Benchmark%20Across%20Python%2C%20JavaScript%2C%20Java%2C%20Go%2C%20and%20C%23)