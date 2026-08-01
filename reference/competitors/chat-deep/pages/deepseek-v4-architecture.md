# DeepSeek V4 Architecture Explained: MoE, mHC & 1M

- **URL**: https://chat-deep.ai/docs/deepseek-v4-architecture/
- **Published**: 2026-07-25T13:53:55+00:00
- **Modified**: 
- **Category**: DeepSeek API Docs
- **Word count**: 4158
- **Code blocks**: 0
- **Description**: DeepSeek V4 architecture explained with official sources and live API tests covering MoE, hybrid attention, mHC, 1M context, reasoning, and agents.

## H1


## H2 目录
- The short version
- DeepSeek V4 at a glance
- The complete architecture in one picture
- 1. DeepSeekMoE: many experts, selective activation
- 2. Hybrid attention: why DeepSeek V4 needs both CSA and HCA
- 3. mHC: a wider, constrained residual pathway
- 4. MTP, Muon, mixed precision, and the training pipeline
- 5. Live API benchmark: what we tested
- 6. Long-context retrieval results: 8/8 at 847,423 tokens
- 7. Prompt caching: verified hits and lower observed latency
- 8. JSON output: reliable when the dedicated mode was used
- 9. Reasoning effort: clear gains, visible limits
- 10. Agents and tool calling: both models completed the loop
- Flash or Pro: which DeepSeek V4 model should you choose?
- What the one-million-token context changes for agents
- Limitations of this explanation and benchmark
- Frequently asked questions
- Conclusion

## 正文
DeepSeek V4 is not one architectural trick. It is a system-level redesign that combines sparse expert activation, two kinds of compressed attention, a more stable residual pathway, long-context infrastructure, and post-training designed for reasoning and tool use. The result is a family with a stated one-million-token context window—but the practical story is more nuanced than the specification alone suggests.

This guide explains what is inside DeepSeek V4, what each component is supposed to accomplish, and what we could actually observe through the live API. We tested both deepseek-v4-flash and deepseek-v4-pro for model availability, long-context retrieval, prompt caching, JSON output, constrained reasoning, and a multi-step tool-calling workflow.


### The short version

- MoE: V4-Pro has 1.6 trillion total parameters but activates 49 billion per token; V4-Flash has 284 billion total and activates 13 billion.

- Hybrid attention: Compressed Sparse Attention (CSA) performs sparse selection over compressed memory, while Heavily Compressed Attention (HCA) performs dense attention over a much more aggressively compressed representation.

- mHC: Manifold-Constrained Hyper-Connections expand and dynamically mix the residual stream while constraining the mapping for stable signal propagation.

- One-million-token context: the official limit is 1M. In our own retrieval test, both models recovered all eight hidden records at 847,423 input tokens.

- Reasoning and agents: thinking modes materially improved exact constrained reasoning in our tests, and both models completed a multi-tool procurement workflow. However, the hardest optimization case still failed.

- Important boundary: API tests can measure behavior, latency, token usage, and output compliance. They cannot independently prove that a hosted response used MoE, CSA, HCA, or mHC internally.


![DeepSeek V4 architecture overview showing MoE, hybrid attention, mHC, one-million-token context, and agent tools](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


### DeepSeek V4 at a glance


Specification | DeepSeek V4 Flash | DeepSeek V4 Pro
Total parameters | 284B | 1.6T
Activated parameters | 13B | 49B
Architecture | Mixture-of-Experts | Mixture-of-Experts
Context length | 1M tokens | 1M tokens
Maximum output in hosted API docs | 384K tokens | 384K tokens
Modes | Non-thinking, Think High, Think Max | Non-thinking, Think High, Think Max
Hosted API model ID | deepseek-v4-flash | deepseek-v4-pro

These figures come from the official DeepSeek V4 model card and the current DeepSeek API model documentation. DeepSeek describes the release as a preview series. The model card also states that the pre-trained models use FP8 mixed precision, while the post-trained releases use FP4 for MoE expert parameters and FP8 for most other parameters.


#### Configuration-level anatomy of Flash and Pro


Architecture detail | V4 Flash | V4 Pro
Transformer layers | 43 | 61
Hidden size | 4,096 | 7,168
MoE experts per layer | 1 shared + 256 routed | 1 shared + 384 routed
Routed experts used per token | 6 | 6
Initial hash-routed MoE layers | 3 | 3
CSA compression / selected entries | 4 tokens per entry / top 512 | 4 tokens per entry / top 1,024
HCA compression | 128 tokens per entry | 128 tokens per entry
Uncompressed local branch | 128 tokens | 128 tokens
mHC residual-stream expansion | 4× | 4×
Configured maximum positions | 1,048,576 | 1,048,576

These are declared report and checkpoint-configuration values, not properties inferred from API output. Flash begins with two pure sliding-window attention layers, while Pro begins with two HCA layers; the remaining attention stack interleaves CSA and HCA. Both models keep a separate 128-token uncompressed branch so recent detail does not depend only on compressed memory.

A key point is that total parameter count is not the same as per-token compute. A dense model attempts to use essentially all of its feed-forward parameters for every token. An MoE model stores many experts but routes each token through only a subset. This distinction is why the activated figures—13B and 49B—matter when interpreting serving cost and latency.


### The complete architecture in one picture


![Original diagram of the DeepSeek V4 transformer stack with hybrid attention, mHC residual streams, MoE feed-forward layers, and multi-token prediction](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

DeepSeek V4 remains a decoder-only Transformer. It retains two major ideas from DeepSeek V3: the DeepSeekMoE feed-forward design and Multi-Token Prediction (MTP). The major additions are hybrid CSA/HCA attention and mHC residual connections. The training recipe adds the Muon optimizer, while the serving stack adds specialized kernels, a heterogeneous KV cache, prefix reuse, and on-disk cache storage.

It helps to separate four layers of the system:

- Model capacity: MoE supplies a large pool of specialized feed-forward parameters without activating the full pool for every token.

- Memory access: CSA and HCA reduce how much historical context each attention layer must store and process.

- Signal flow: mHC changes how information is carried and mixed between Transformer blocks.

- Behavior: supervised fine-tuning, reinforcement learning, reasoning-effort modes, on-policy distillation, and tool-use training shape what users observe.


### 1. DeepSeekMoE: many experts, selective activation

The feed-forward network usually holds a large share of a Transformer’s parameters. DeepSeek replaces a single dense feed-forward network with fine-grained routed experts plus shared experts. A router assigns each token to a limited set of routed experts, while shared experts provide capacity that is available across tokens.


![Diagram explaining token routing through shared and selected experts in DeepSeek V4 MoE layers](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

Imagine three tokens in a prompt: one describing a Python exception, one discussing a contract clause, and one containing a mathematical identity. Their representations can be sent to different expert combinations. The model retains enormous aggregate capacity, but only the selected pathways perform the main expert computation for each token.

According to the architecture section of the official technical report, V4 keeps the DeepSeekMoE paradigm but changes the affinity-score activation to the square root of Softplus. It retains an auxiliary-loss-free load-balancing strategy, adds a small sequence-level balance loss, and removes the previous constraint on the number of routing target nodes.

V4 also makes an unusual change in the first several Transformer blocks: their dense feed-forward layers are replaced with MoE layers that use hash routing. The destination expert is determined by a predefined hash function based on the input token ID. Later layers can use learned routing based on the evolving hidden representation.


#### What MoE does—and does not—mean

- It can raise total capacity without proportionally raising active feed-forward compute for every token.

- It creates a routing and distributed-systems problem: experts must be balanced and often spread across accelerators.

- It does not guarantee that a particular query will be correct because it reached a “better” expert.

- It does not make 1M context possible by itself. Long-context efficiency is primarily addressed by the attention and cache design.

DeepSeek reports a fused MoE kernel and fine-grained communication-computation overlap to keep expert-parallel execution efficient. Those infrastructure decisions are part of why parameter counts alone cannot predict hosted latency.


### 2. Hybrid attention: why DeepSeek V4 needs both CSA and HCA

Standard dense self-attention becomes expensive as a sequence grows because each new token must compare against a growing history, and the system must preserve a key-value representation of that history. A one-million-token context magnifies both the compute and KV-cache problems.

DeepSeek V4 does not use one attention mechanism in every layer. It interleaves Compressed Sparse Attention and Heavily Compressed Attention. Both compress the sequence dimension, but they make different tradeoffs after compression.


![Comparison diagram of Compressed Sparse Attention and Heavily Compressed Attention in DeepSeek V4](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


#### Compressed Sparse Attention (CSA)

CSA first combines each group of m tokens into a compressed KV entry. It then uses DeepSeek Sparse Attention to select only k compressed entries for each query. A lightweight “lightning indexer” scores candidates so that the full attention operation does not have to examine every compressed memory block.

In plain language, CSA keeps a compressed map of the past and retrieves a small, query-dependent set of relevant regions. It is designed to preserve selective, fine-grained access across a very long sequence while avoiding a dense scan of all history.


#### Heavily Compressed Attention (HCA)

HCA uses a much larger compression group, m′, where m′ is substantially greater than m. After that aggressive compression, it performs dense attention over the smaller set of compressed entries. HCA therefore avoids sparse selection but accepts a coarser global memory.

A useful mental model is that CSA is a detailed index that opens a few relevant sections, while HCA is a compact overview that can be scanned in full. Interleaving them gives the stack both selective detail and inexpensive global coverage.


#### How local detail is preserved

Compression creates an obvious risk: a query may lose precise information from nearby tokens, especially inside its own compressed block. DeepSeek adds a sliding-window branch with uncompressed KV entries from recent tokens to both CSA and HCA. The report also describes shared-key-value multi-query attention, grouped output projections, partial rotary positional embeddings, and an attention-sink mechanism.

The design is therefore not simply “compress the prompt.” It combines coarse long-range memory with an exact recent window and layer-level alternation between sparse and dense access patterns.


#### The official efficiency claim

At a 1M-token context, DeepSeek estimates that V4-Pro uses 27% of the single-token inference FLOPs and 10% of the KV-cache size of DeepSeek V3.2. For V4-Flash, it reports 10% of the FLOPs and 7% of the KV-cache size. The report attributes these gains to hybrid compressed attention plus lower-precision computation and storage.

These are developer-reported architectural estimates, not measurements from our hosted API account. They compare against DeepSeek V3.2 under the report’s methodology; they should not be interpreted as universal latency reductions or as comparisons with unrelated providers.


### 3. mHC: a wider, constrained residual pathway

Residual connections let each block add a learned transformation to an existing signal. They are central to training deep Transformers because they give information and gradients a direct path through the network. Hyper-Connections widen that residual stream into multiple parallel channels and learn how to mix them before and after a layer.


![Diagram of Manifold-Constrained Hyper-Connections widening and mixing the residual stream in DeepSeek V4](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

The problem is that unrestricted mixing can become numerically unstable when repeated through a deep stack. Manifold-Constrained Hyper-Connections address that by constraining the residual mixing matrix to be doubly stochastic: its entries are non-negative, and its rows and columns each sum to one. The technical report says this bounds the matrix’s spectral norm at one, making the residual transformation non-expansive.

The input, residual, and output mappings remain dynamic: they combine learned static parameters with input-dependent components. DeepSeek applies bounded transformations to the input and output mappings and uses Sinkhorn-Knopp normalization to project the residual mapping onto the allowed manifold.

In practical terms, mHC gives the model more flexible routes for carrying information across layers while placing guardrails on how those routes amplify or cancel signals. It is an architectural training-stability and expressivity mechanism. It is not an API mode, and there is no black-box prompt that can demonstrate that mHC was active.


### 4. MTP, Muon, mixed precision, and the training pipeline

DeepSeek V4 retains Multi-Token Prediction from V3. Instead of training only for the immediate next token, auxiliary objectives predict additional future tokens. DeepSeek says the V4 MTP configuration is unchanged from V3.

The family introduces the Muon optimizer for faster convergence and better training stability. The report also details hybrid Newton-Schulz iterations and safeguards against exploding attention logits. These are training mechanisms; they do not change how an API client formats a request.

DeepSeek reports pre-training V4-Flash on 32 trillion tokens and V4-Pro on 33 trillion. Post-training follows two stages. First, separate specialist models are cultivated for domains such as mathematics, coding, agents, and instruction following through supervised fine-tuning and GRPO reinforcement learning. Second, a unified model learns from those specialists through on-policy distillation.

The post-training stack also distinguishes Non-think, Think High, and Think Max. DeepSeek’s thinking-mode documentation says thinking is enabled by default in the API, with High as the regular reasoning effort and Max available for greater test-time effort. Low and Medium map to High, while xHigh maps to Max.


### 5. Live API benchmark: what we tested

We ran black-box tests against the hosted DeepSeek API on July 25, 2026. The goal was not to reproduce DeepSeek’s research benchmarks. It was to answer narrower operational questions: Are both model IDs available? Can the hosted models retrieve dispersed facts from very long inputs? Does prefix caching appear in usage counters? Do reasoning modes improve exact constraint satisfaction? Can each model complete a multi-step tool loop?

Evidence rule: the official paper is our source for internal architecture. Our API tests validate only observable hosted behavior. A successful 847K-token retrieval does not prove CSA or HCA; a correct planning answer does not reveal which experts were activated; and no output can verify mHC.

The GET /models endpoint returned HTTP 200 and listed both deepseek-v4-flash and deepseek-v4-pro. Tests used deterministic checkers where possible. Latency is wall-clock request completion time from our environment, not server-side time-to-first-token. Each long-context row is one observed run, so it is a functional check rather than a statistically robust speed benchmark.

The live responses reported system fingerprints fp_8b330d02d0_prod0820_fp8_kvcache_20260402 for Flash and fp_9954b31ca7_prod0820_fp8_kvcache_20260402 for Pro. We include them to make the snapshot identifiable; a later hosted deployment can return different fingerprints and behavior.


### 6. Long-context retrieval results: 8/8 at 847,423 tokens

We generated long synthetic records and placed eight unique “needle” facts at separated positions. The prompt asked for all eight identifiers exactly. A checker compared the returned set with the expected set. Both models recovered every needle in every tested context band.


Model | Input tokens | Needles recovered | Observed completion latency
V4 Flash | 81,842 | 8/8 | 5.773 seconds
V4 Pro | 90,522 | 8/8 | 10.731 seconds
V4 Flash | 276,022 | 8/8 | 18.747 seconds
V4 Pro | 276,022 | 8/8 | 15.117 seconds
V4 Flash | 847,423 | 8/8 | 83.426 seconds
V4 Pro | 847,423 | 8/8 | 49.599 seconds


![Live DeepSeek V4 API long-context retrieval results up to 847,423 input tokens](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

This is strong evidence that the hosted endpoints could accept and use an input near the documented ceiling in our test. It is not evidence that every 847K-token task will succeed. Exact-key retrieval is easier to grade than synthesis, contradiction resolution, chronology, or reasoning across hundreds of documents.

The first Flash and Pro cases used different input sizes, so their 5.773-second and 10.731-second results are not a clean head-to-head speed comparison. At the two matched sizes, Pro happened to finish faster. With one run per condition, that observation can be influenced by load, scheduling, output length, and cache state. It should not be generalized into “Pro is always faster.”

We stopped at 847,423 input tokens rather than claiming a full one-million-token validation. The nominal context window must also accommodate requested output and, in thinking mode, reasoning tokens. Production systems need a safety margin instead of filling the entire advertised window with source material.


### 7. Prompt caching: verified hits and lower observed latency

DeepSeek says disk-based context caching is enabled by default. A later request can reuse a persisted matching prefix, and the response reports prompt_cache_hit_tokens and prompt_cache_miss_tokens. We tested a large repeated prefix, then changed the instruction at the end.


Request | Cache accounting | Observed latency
Cold large prefix | 150,024 miss tokens | 7.448 seconds
Warm matching prefix | 150,016 hit + 31 miss tokens | 2.788 seconds
Unrelated control | 90,045 miss tokens | 5.450 seconds


![DeepSeek V4 context cache test showing cold misses, warm prefix hits, and an unrelated control request](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

The warm request was about 62.6% faster than the cold request in this observation. More importantly, the usage counters directly identified 150,016 cache-hit tokens, while the control remained a miss. That validates the hosted caching behavior described in the official context-caching guide.

Do not treat 62.6% as a guaranteed speedup. DeepSeek describes cache reuse as best effort, cache creation can take seconds, and entries can be cleared after hours or days. Exact prefix structure matters. Design long-document applications so stable material comes first and the changing question comes last.


### 8. JSON output: reliable when the dedicated mode was used

In five V4-Flash non-thinking requests made with the API’s JSON response format, the model returned exact, parseable JSON in all five cases. The output matched the requested keys and values, giving a 5/5 result in this small check.

This distinction matters because asking for “JSON only” in natural language is weaker than enabling the structured response format. DeepSeek’s JSON Output documentation requires response_format: {"type":"json_object"}, the word “json” in the prompt, a clear example, and enough output tokens to avoid truncation.

Later in our tool test, neither model obeyed a prompt-only JSON requirement perfectly: Pro wrapped the object in a code fence, and Flash added prose plus a fenced object. The lesson is operational, not contradictory. Use the dedicated JSON mode and parse validation when machine-readable output is mandatory; do not rely only on wording.


### 9. Reasoning effort: clear gains, visible limits

We used deterministic constraint problems rather than subjective writing prompts. The checker evaluated the final allocation or total, not whether the explanation sounded plausible.


Test | Non-thinking | Think High / Max
Routing-and-total task; correct total = 21 | Both selected the correct route, but Flash returned 20 and Pro returned 24 | Both High and Max returned the correct total of 21
Integer allocation under multiple constraints | Incorrect for both models | Correct in thinking modes; first Pro Max run stopped at the 4,096-token cap, then succeeded with 5,638 reasoning tokens in 72.884 seconds
Hard constrained portfolio | All non-thinking outputs invalid | High and Max produced no final answer even with a 12,000-reasoning-token allowance


![DeepSeek V4 live reasoning benchmark comparing non-thinking, Think High, and Think Max](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

The results support a practical rule: non-thinking mode can identify the right qualitative path and still fail on exact arithmetic or global constraints. Thinking High and Max improved the two solvable tasks, but more reasoning tokens were not a universal cure. The hardest case did not yield a final answer within the tested allowance.

The first Pro Max allocation attempt also shows why output and reasoning budgets are part of correctness. Hitting a 4,096-token cap interrupted the solution. On retry, the correct run used 5,638 reasoning tokens and took 72.884 seconds. For difficult optimization, applications need timeouts, token budgets, validators, and a fallback plan—not just a higher effort setting.


### 10. Agents and tool calling: both models completed the loop

An agent is more than a model response. The host application defines functions, the model chooses a tool and supplies arguments, the application executes it, and the result is returned to the model for another decision. DeepSeek’s tool-calling guide explicitly notes that the model does not execute the function itself.

Our procurement scenario required several dependent calls. The agent had to check inventory for products AX-17 and BY-42, retrieve supplier quotes of 50 and 48 units, calculate shipping for a 97.6 kg order to Berlin, and then report the landed cost and remaining budget.

- Both V4-Flash and V4-Pro called the inventory tool for AX-17 and BY-42.

- Both requested and used the supplier quotes of 50 and 48.

- Both called the shipping tool with 97.6 kg and Berlin.

- Both calculated the correct landed cost of 608.4 and budget remainder of 11.6.


![Live DeepSeek V4 agent test showing inventory, supplier quote, shipping, and final calculation tool steps](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

The functional outcome was correct for both models. Output-format compliance was not: Pro enclosed its final JSON in a Markdown code fence, while Flash added explanatory prose and a fenced JSON block despite a JSON-only instruction. A production orchestrator should validate the final schema and, when possible, use the API’s dedicated JSON response format for the final step.

The official report gives agent behavior deeper post-training support. It describes a tool-call format with a dedicated token, interleaved thinking across tool-result rounds, specialist agent training, and sandbox infrastructure used for large-scale reinforcement learning. Those choices can help explain the product direction, but our one successful workflow is not a general agent benchmark.


### Flash or Pro: which DeepSeek V4 model should you choose?


Choose V4 Flash when… | Choose V4 Pro when…
Throughput and low input cost are primary constraints. | Knowledge depth and harder agent workflows justify the larger model.
The task is extraction, classification, routine JSON, or straightforward tool selection. | The task involves difficult reasoning, coding, or multi-stage decisions.
You can validate outputs and escalate failures. | A failed first pass is more expensive than a slower request.
You need a fast first stage in a model-routing pipeline. | You are already using Think High or Max for complex work.

Our results do not support a simplistic winner. Flash achieved 5/5 exact JSON in the dedicated mode and passed every long-context needle test. Pro was faster in our two matched long-context runs and is the larger-capacity model, but it also failed the same non-thinking constraint tests and the hardest portfolio task.

A sensible production pattern is to start with Flash for validated routine work, invoke thinking for mathematically constrained tasks, and escalate difficult or high-value cases to Pro. Always measure with your own prompts, context sizes, region, and concurrency.


### What the one-million-token context changes for agents

A large context window gives an agent more room for repository files, documents, prior tool outputs, plans, and intermediate state. It reduces the pressure to discard earlier evidence during a long workflow. DeepSeek says V4 preserves reasoning history across tool-call rounds and can use 512K contexts in some of its internal code and search agent evaluations.

More context is not the same as more intelligence. Long histories can contain stale assumptions, conflicting tool outputs, repeated files, or prompt injection. Applications still need retrieval, provenance, access controls, state compaction, and explicit verification. The architecture lowers the cost of retaining information; it does not decide which information should be trusted.

For an overview of the model as a product, see our DeepSeek V4 model page. You can also return to the DeepSeek resources homepage for related guides and tests.


### Limitations of this explanation and benchmark

- Hosted internals are not observable. We relied on the official technical report for MoE, CSA, HCA, mHC, precision, and training claims.

- The tests were black-box and small-sample. They demonstrate specific successes and failures, not population-level quality or latency.

- Latency is environment-dependent. Network path, queueing, output length, cache state, and service load can change results.

- Needle retrieval is not full comprehension. It tests whether hidden identifiers can be recovered, not whether the model can reason accurately over an entire 847K-token corpus.

- The documented release is a preview. Model behavior, limits, pricing, and API compatibility can change.

- No safety evaluation was performed. This test did not assess hallucination rates, prompt injection resistance, privacy, harmful output, or bias.

The official paper itself notes open questions around training stability, long-context latency, long-horizon agents, and future multimodal capability. Treat DeepSeek V4 as a powerful system that still requires application-level guardrails and evaluation.


### Frequently asked questions

Yes. Both V4-Flash and V4-Pro use DeepSeekMoE feed-forward layers with routed and shared experts. Flash has 284B total parameters and 13B activated parameters; Pro has 1.6T total and 49B activated.

CSA compresses groups of tokens and then sparsely selects a small number of compressed KV entries for each query. HCA compresses much more aggressively and performs dense attention over the resulting smaller memory. DeepSeek V4 interleaves the two mechanisms.

Manifold-Constrained Hyper-Connections widen the residual stream into multiple channels and dynamically mix them. The residual mapping is constrained to a doubly stochastic matrix to improve signal stability through deep stacks while retaining flexible pathways.

We verified successful 8/8 needle retrieval at 847,423 input tokens on both hosted models. We did not fill the entire nominal 1M window, so this article does not claim an independent full-limit validation.

No. A context limit states how much material the API can accept, not that every fact will be recalled or every cross-document inference will be correct. Retrieval, synthesis, chronology, and contradiction handling should be evaluated separately.

No. Thinking modes improved two exact constraint tests, but the hardest portfolio problem produced no final answer even with a 12,000-reasoning-token allowance. More test-time compute raises capability on some tasks but does not guarantee completion or correctness.

No. The model proposes a tool name and arguments. Your application must validate the call, execute the function in a controlled environment, return the result, and decide whether to continue the loop.

Flash is a strong default for routine, validated workflows and lower-cost throughput. Pro is better positioned for knowledge-heavy and difficult multi-stage work. The right choice depends on your tools, validators, latency target, and failure cost.


### Conclusion

DeepSeek V4’s architecture is best understood as a coordinated answer to long-horizon inference. MoE increases model capacity without activating every parameter. CSA and HCA reduce the attention and KV-cache burden of enormous histories. mHC strengthens the residual pathway while constraining it for stability. MTP, Muon, mixed precision, specialized infrastructure, and agent-focused post-training complete the system.

The live tests show that the hosted product can turn part of that design goal into useful behavior: both models recovered 8/8 dispersed facts at 847,423 input tokens, exposed large prompt-cache hits, and completed a dependent tool workflow. They also exposed real limits. Non-thinking answers failed exact constraints, a reasoning run hit its token ceiling, the hardest optimization never produced a final answer, and prompt-only JSON instructions were not obeyed cleanly.

That combination—impressive scale with measurable failure modes—is the most useful way to evaluate DeepSeek V4. Use the architecture to understand its design, and use your own validated workloads to decide where it belongs in production.


#### Primary sources and verification date

- DeepSeek V4 Technical Report: Towards Highly Efficient Million-Token Context Intelligence

- Official DeepSeek V4 Pro model card

- Official DeepSeek V4 preview release announcement

- Official models, limits, features, and pricing page

- Official thinking-mode guide

- Official tool-calling guide

- Official JSON Output guide

- Official context-caching guide

Last verified: July 25, 2026. API behavior can change. Re-run critical tests against the model version and account configuration you plan to deploy.

## 内部链接
- [DeepSeek V4 model page](https://chat-deep.ai/models/deepseek-v4/)
- [DeepSeek resources homepage](https://chat-deep.ai/)

## 外部链接
- [official DeepSeek V4 model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)
- [DeepSeek API model documentation](https://api-docs.deepseek.com/quick_start/pricing/)
- [architecture section of the official technical report](https://arxiv.org/html/2606.19348v1#S2.SS1)
- [thinking-mode documentation](https://api-docs.deepseek.com/guides/thinking_mode/)
- [official context-caching guide](https://api-docs.deepseek.com/guides/kv_cache/)
- [JSON Output documentation](https://api-docs.deepseek.com/guides/json_mode/)
- [tool-calling guide](https://api-docs.deepseek.com/guides/tool_calls/)
- [DeepSeek V4 Technical Report: Towards Highly Efficient Million-Token Context Intelligence](https://arxiv.org/html/2606.19348v1)
- [Official DeepSeek V4 Pro model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)
- [Official DeepSeek V4 preview release announcement](https://api-docs.deepseek.com/news/news260424/)
- [Official models, limits, features, and pricing page](https://api-docs.deepseek.com/quick_start/pricing/)
- [Official thinking-mode guide](https://api-docs.deepseek.com/guides/thinking_mode/)
- [Official tool-calling guide](https://api-docs.deepseek.com/guides/tool_calls/)
- [Official JSON Output guide](https://api-docs.deepseek.com/guides/json_mode/)
- [Official context-caching guide](https://api-docs.deepseek.com/guides/kv_cache/)
- [(no anchor)](https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fdeepseek-v4-architecture%2F)
- [(no anchor)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fdeepseek-v4-architecture%2F&text=DeepSeek%20V4%20Architecture%20Explained%3A%20MoE%2C%20Hybrid%20Attention%2C%20mHC%2C%201M%20Context%2C%20and%20Agents)
- [(no anchor)](https://www.linkedin.com/shareArticle?url=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fdeepseek-v4-architecture%2F&title=DeepSeek%20V4%20Architecture%20Explained%3A%20MoE%2C%20Hybrid%20Attention%2C%20mHC%2C%201M%20Context%2C%20and%20Agents)