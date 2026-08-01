# DeepSeek R1-0528: Benchmarks, Specs & API Status

- **URL**: https://chat-deep.ai/models/deepseek-r1-0528/
- **Published**: 2026-05-12T14:34:36+00:00
- **Modified**: 2026-07-29T12:19:14+00:00
- **Category**: 
- **Word count**: 3855
- **Code blocks**: 10
- **Description**: DeepSeek R1-0528 is a May 2025 reasoning checkpoint with improved benchmarks and an 8B distill. Review its specs, weights, local use, and historical API

## H1


## H2 目录
- Table of Contents
- What Is DeepSeek-R1-0528?
- Quick Facts
- What Changed in DeepSeek-R1-0528?
- DeepSeek-R1-0528 Technical Specs
- Official DeepSeek-R1-0528 Benchmarks
- DeepSeek-R1-0528 vs Original DeepSeek R1
- DeepSeek-R1-0528 API Status
- How to Access the Exact DeepSeek-R1-0528 Checkpoint
- How to Use DeepSeek-R1-0528
- Can You Run DeepSeek-R1-0528 Locally?
- DeepSeek-R1-0528-Qwen3-8B
- DeepSeek-R1-0528 vs Newer DeepSeek Models
- Which DeepSeek Model Should You Use?
- Best Use Cases
- Limitations and Risks
- Practical Prompting Tips
- Frequently Asked Questions
- Conclusion
- Sources Reviewed

## 正文
DeepSeek R1-0528 is a May 2025 reasoning checkpoint with improved benchmarks and an 8B distill. Review its specs, weights, local use, and historical API status. Last verified: July 28, 2026.

Last source review: July 28, 2026

DeepSeek-R1-0528 is the May 28, 2025 minor-version upgrade of DeepSeek R1, focused on deeper reasoning, stronger math and coding performance, front-end generation, reduced hallucinations, JSON output, and function calling. The official weights are published on Hugging Face as deepseek-ai/DeepSeek-R1-0528. DeepSeek’s model card reports AIME 2025 rising from 70.0% on the original R1 to 87.5% on R1-0528, with average AIME thinking length increasing from about 12K to 23K tokens per question. The model is still important for R1-line research and exact checkpoint testing, but DeepSeek’s official API has since moved toward newer V4 model names.


Current API status | Verified July 28, 2026: DeepSeek’s official hosted API model list does not expose DeepSeek-R1-0528 as a model ID; it lists deepseek-v4-flash and deepseek-v4-pro. The exact R1-0528 checkpoint remains available through DeepSeek’s official open weights and through providers that explicitly list it under their own model ID.


### Table of Contents


### What Is DeepSeek-R1-0528?

DeepSeek-R1-0528 is an upgraded checkpoint in the DeepSeek R1 reasoning model family. It was released on May 28, 2025 as a post-training update to the original R1, with improvements in complex reasoning, mathematics, programming, front-end generation, hallucination reduction, JSON output, and function calling.

The model is designed for tasks that benefit from deeper multi-step reasoning rather than quick one-shot answers. It is especially relevant for math problem solving, competitive programming, code review, technical analysis, structured outputs, and R1-compatible research workflows.

DeepSeek-R1-0528 should not be treated as the same thing as “whatever deepseek-reasoner points to today.” At release, deepseek-reasoner was upgraded to R1-0528. In 2026, DeepSeek’s official API documentation has moved to V4 model names, so exact R1-0528 access requires checking the actual checkpoint exposed by your provider.


### Quick Facts


Field | DeepSeek-R1-0528
Model name | DeepSeek-R1-0528
Developer | DeepSeek
Release date | May 28, 2025
Model family | DeepSeek R1
Model type | Open-weight reasoning / text-generation model
Official weights | deepseek-ai/DeepSeek-R1-0528 on Hugging Face
Model size note | Hugging Face lists 685B parameters; several provider pages describe the R1 architecture as 671B total parameters with 37B active parameters per inference pass.
Architecture | Mixture-of-Experts lineage from the DeepSeek R1 / DeepSeek V3 family
License | MIT terms on Hugging Face; DeepSeek R1 series supports commercial use and distillation.
Main improvements | Reasoning depth, math, coding, front-end generation, reduced hallucinations, function calling, JSON output
JSON output | Supported in the R1-0528 release; test behavior on your exact provider.
Function calling / tools | Supported in the R1-0528 release; provider implementation varies.
Context length | Provider-specific. DeepInfra lists 163,840 tokens; OpenRouter lists 164K; Azure lists 163.84K for its catalog entry.
Best for | Math, coding, complex reasoning, benchmark reproduction, R1-compatible workflows, distillation research
Official DeepSeek API status | Current official API docs center on DeepSeek-V4-Flash and DeepSeek-V4-Pro. Legacy deepseek-chat and deepseek-reasoner names were retired after the announced July 24, 2026 cutoff and now belong only in migration history.
Exact checkpoint access | Use Hugging Face weights or providers that explicitly list deepseek-ai/DeepSeek-R1-0528 or deepseek/deepseek-r1-0528.


### What Changed in DeepSeek-R1-0528?

The biggest change is deeper reasoning. DeepSeek’s model card says AIME 2025 accuracy increased from 70.0% on the previous R1 version to 87.5% on DeepSeek-R1-0528. It also says the average thinking length on AIME rose from about 12K tokens per question to about 23K tokens per question, which helps explain why the model improved on difficult math and logic tasks.

The second major change is stronger coding performance. Official/model-card results show gains on LiveCodeBench, Codeforces-Div1, SWE Verified, and Aider-Polyglot, making R1-0528 more useful for code repair, competitive programming, and multi-step software engineering tasks.

The third practical change is application integration. DeepSeek’s release note explicitly says R1-0528 supports JSON output and function calling. That makes the model more useful for structured data extraction, tool-using agents, code assistants, and workflows that need predictable output formats.

Prompting behavior also improved. The model card says system prompts are now supported and that users no longer need to force the model into a thinking pattern by adding <think>\n at the beginning of the output.


### DeepSeek-R1-0528 Technical Specs

Specs for DeepSeek-R1-0528 can look inconsistent across sources because model-card metadata, architecture descriptions, and provider catalogs do not always use the same wording. The safest approach is to separate official weights from provider-specific serving metadata.


Spec | Verified detail | Notes
Official checkpoint | deepseek-ai/DeepSeek-R1-0528 | Published by DeepSeek on Hugging Face.
Release type | Minor-version upgrade to DeepSeek R1 | Not a separate V-series model.
Release date | May 28, 2025 | Listed in DeepSeek release notes and provider pages.
Model size | 685B parameters on Hugging Face metadata | Some provider pages use the 671B total / 37B active R1 MoE description.
Tensor types | BF16, F8_E4M3, F32 listed on Hugging Face | Quantized versions are available from third parties such as Unsloth.
License | MIT | Commercial use and distillation are supported under the R1 series terms.
Input/output modality | Text input / text output | Azure’s catalog lists text input and text output; do not describe it as a vision model.
Max generation length in official benchmark setup | 64K tokens | Used for reported benchmark evaluation.
Recommended benchmark sampling | Temperature 0.6, top_p 0.95, 16 responses per query | Important when trying to reproduce official numbers.
Context window | Provider-specific | Examples: DeepInfra 163,840; OpenRouter 164K; Azure 163.84K.
Local inference | vLLM, SGLang, Transformers, Docker Model Runner, llama.cpp / Ollama via quantized GGUF | Full model local use is hardware-intensive.

For SEO and accuracy, avoid writing one universal context-length or price as if it applies everywhere. Provider routing, quantization, caching, tool support, and pricing can change independently from the model weights.


### Official DeepSeek-R1-0528 Benchmarks

The table below follows the official Hugging Face/model-card benchmark table. It includes the weaker SimpleQA result as well as the stronger math and coding results, because selective benchmark reporting can reduce trust.


Category | Benchmark | Original DeepSeek R1 | DeepSeek-R1-0528 | Delta
General | MMLU-Redux (EM) | 92.9 | 93.4 | +0.5
General | MMLU-Pro (EM) | 84.0 | 85.0 | +1.0
General | GPQA-Diamond (Pass@1) | 71.5 | 81.0 | +9.5
General | SimpleQA (Correct) | 30.1 | 27.8 | -2.3
General | FRAMES (Acc.) | 82.5 | 83.0 | +0.5
General | Humanity’s Last Exam / HLE (Pass@1) | 8.5 | 17.7 | +9.2
Code | LiveCodeBench 2408–2505 (Pass@1) | 63.5 | 73.3 | +9.8
Code | Codeforces-Div1 (Rating) | 1530 | 1930 | +400 rating
Code | SWE Verified (Resolved) | 49.2 | 57.6 | +8.4
Code | Aider-Polyglot (Acc.) | 53.3 | 71.6 | +18.3
Math | AIME 2024 (Pass@1) | 79.8 | 91.4 | +11.6
Math | AIME 2025 (Pass@1) | 70.0 | 87.5 | +17.5
Math | HMMT 2025 (Pass@1) | 41.7 | 79.4 | +37.7
Math | CNMO 2024 (Pass@1) | 78.8 | 86.9 | +8.1
Tools | BFCL_v3_MultiTurn (Acc.) | — | 37.0 | Newly reported
Tools | Tau-Bench (Pass@1) | — | 53.5 Airline / 63.9 Retail | Newly reported

The headline improvements are strongest in math, coding, and hard reasoning: AIME 2025 improved by 17.5 points, HMMT 2025 by 37.7 points, LiveCodeBench by 9.8 points, and Aider-Polyglot by 18.3 points. However, not every metric improved. SimpleQA decreased from 30.1 to 27.8 in the official table.

Benchmark results are not production guarantees. DeepSeek’s benchmark setup used a maximum generation length of 64K tokens, temperature 0.6, top_p 0.95, and 16 responses per query for sampling-based benchmarks. Real-world results can vary by provider, quantization, latency, prompt style, safety layer, context length, and output-token budget.

Benchmark note: DeepSeek’s API changelog lists Aider as 57.0 → 71.6 (+14.6), while the Hugging Face/model-card table lists Aider-Polyglot as 53.3 → 71.6 (+18.3). This page follows the Hugging Face table for the full benchmark table and notes the changelog difference where relevant.


### DeepSeek-R1-0528 vs Original DeepSeek R1

DeepSeek-R1-0528 is best understood as a stronger post-training update to the original R1 checkpoint. It keeps the R1 reasoning focus but improves reasoning depth, benchmark performance, coding usefulness, structured output support, and tool-oriented workflows.


Area | Original DeepSeek R1 | DeepSeek-R1-0528
Release timing | January 2025 | May 28, 2025
Positioning | First major open R1 reasoning checkpoint | Minor-version upgrade to the R1 family
Reasoning depth | Strong reasoning model | Longer average thinking on AIME and stronger hard-reasoning results
AIME 2025 | 70.0 | 87.5
LiveCodeBench | 63.5 | 73.3
SWE Verified | 49.2 | 57.6
Aider-Polyglot | 53.3 | 71.6
JSON output | Less emphasized in original launch | Explicitly listed in the R1-0528 release
Function calling | Less emphasized in original launch | Explicitly listed in the R1-0528 release
Prompting | Older guidance often used explicit thinking prompts | System prompt supported; forcing <think> is not required
Best fit | Open reasoning research and baseline comparisons | R1-line evaluations, stronger coding/math tasks, structured output, and distillation workflows


### DeepSeek-R1-0528 API Status

The API status is the part of DeepSeek-R1-0528 that needs the most careful wording.

At release, DeepSeek said there was no change to API usage, and the official changelog said deepseek-reasoner had been upgraded to DeepSeek-R1-0528. That was true for the May 2025 release context.

At the May 28, 2025 release, DeepSeek’s changelog said that deepseek-reasoner had been upgraded to DeepSeek-R1-0528. That statement describes a historical routing period. DeepSeek later reused the alias for thinking modes of newer model families and announced its retirement after July 24, 2026. The current official model list contains only the V4 Flash and V4 Pro IDs, so deepseek-reasoner must not be used as a synonym for R1-0528 today.

So, if your goal is “use DeepSeek’s current official API,” use the current V4 model names. If your goal is “use the exact DeepSeek-R1-0528 checkpoint,” use official weights or a provider that explicitly exposes R1-0528 by name.


### How to Access the Exact DeepSeek-R1-0528 Checkpoint


Provider / source | Model name shown | Exact R1-0528 checkpoint? | Context length if listed | JSON / tool support if listed | Notes
Hugging Face | deepseek-ai/DeepSeek-R1-0528 | Yes, official weights | Not a hosted API context guarantee | Model card says function calling support; provider behavior varies | Best source for official weights, metadata, benchmark table, license, vLLM, SGLang, and Transformers examples.
DeepInfra | deepseek-ai/DeepSeek-R1-0528 | Yes | 163,840 | JSON and Function listed | One example of an OpenAI-compatible provider that explicitly exposes the named DeepSeek-R1-0528 checkpoint.
OpenRouter | deepseek/deepseek-r1-0528 | Yes, routed model listing | 164K | Provider-dependent routing | Useful for comparing hosted providers; exact runtime behavior depends on the chosen route/provider.
Microsoft Azure AI Foundry | DeepSeek-R1-0528 | Listed, but check lifecycle | 163.84K | Function-calling support mentioned in model description | Microsoft Azure AI Foundry currently marks this catalog entry as Deprecated. This status applies to Azure’s catalog listing and deployment availability, not to the DeepSeek-R1-0528 model itself.
Together AI | DeepSeek-R1-0528 page | Page exists, but not serverless | Not a current serverless recommendation | Function Calling and JSON Mode listed as features | Together’s page currently says this model is not available on Together’s Serverless API. Do not use it as the main current API code example.
Official DeepSeek API | deepseek-v4-flash, deepseek-v4-pro | No, not as R1-0528 in current docs | 1M for V4 models | JSON Output and Tool Calls listed for V4 | Use for current official DeepSeek API development, not for exact R1-0528 checkpoint reproduction.


### How to Use DeepSeek-R1-0528


#### Provider API Example: DeepInfra

For current hosted access to the exact checkpoint, DeepInfra is a clearer example than Together because it explicitly lists deepseek-ai/DeepSeek-R1-0528 and provides an OpenAI-compatible chat completions endpoint.


```
curl "https://api.deepinfra.com/v1/openai/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPINFRA_TOKEN" \
  -d '{
    "model": "deepseek-ai/DeepSeek-R1-0528",
    "messages": [
      {
        "role": "user",
        "content": "Explain the tradeoffs between RAG and long-context prompting."
      }
    ]
  }'
```


#### Python OpenAI-Compatible Example


```
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["DEEPINFRA_TOKEN"],
    base_url="https://api.deepinfra.com/v1/openai",
)

response = client.chat.completions.create(
    model="deepseek-ai/DeepSeek-R1-0528",
    messages=[
        {
            "role": "user",
            "content": "Create a concise migration plan from keyword search to hybrid RAG."
        }
    ],
)

print(response.choices[0].message.content)
```


#### JSON Output Example

Use JSON output only when your application needs strict structured data. DeepSeek’s JSON Output documentation says to set response_format, include the word “json” in the prompt, provide an example, and set max_tokens carefully to avoid truncation. Confirm that your chosen provider supports JSON mode for this exact checkpoint.


```
response = client.chat.completions.create(
    model="deepseek-ai/DeepSeek-R1-0528",
    messages=[
        {
            "role": "system",
            "content": "Return valid json only. Example: {\"answer\": \"...\", \"confidence\": \"high|medium|low\"}"
        },
        {
            "role": "user",
            "content": "In json, summarize the main benefit of using DeepSeek-R1-0528 for benchmark reproduction."
        }
    ],
    response_format={"type": "json_object"},
    max_tokens=512,
)

print(response.choices[0].message.content)
```


#### Hugging Face

Hugging Face is the official source for the R1-0528 weights and model card. The full model is extremely large, so the Transformers example is mainly useful for teams with serious infrastructure or for adapting code to a managed environment.


```
from transformers import AutoTokenizer, AutoModelForCausalLM

model_id = "deepseek-ai/DeepSeek-R1-0528"

tokenizer = AutoTokenizer.from_pretrained(model_id, trust_remote_code=True)
model = AutoModelForCausalLM.from_pretrained(model_id, trust_remote_code=True)

messages = [{"role": "user", "content": "Who are you?"}]
inputs = tokenizer.apply_chat_template(
    messages,
    add_generation_prompt=True,
    tokenize=True,
    return_dict=True,
    return_tensors="pt",
).to(model.device)

outputs = model.generate(**inputs, max_new_tokens=256)
print(tokenizer.decode(outputs[0][inputs["input_ids"].shape[-1]:]))
```


#### vLLM

Hugging Face provides a vLLM serving example for DeepSeek-R1-0528. Treat this as a serving pattern, not as proof that an ordinary desktop can run the full model smoothly.


```
pip install vllm

vllm serve "deepseek-ai/DeepSeek-R1-0528"
```


```
curl -X POST "http://localhost:8000/v1/chat/completions" \
  -H "Content-Type: application/json" \
  --data '{
    "model": "deepseek-ai/DeepSeek-R1-0528",
    "messages": [
      {
        "role": "user",
        "content": "What changed in DeepSeek-R1-0528 compared with DeepSeek R1?"
      }
    ]
  }'
```


#### SGLang


```
pip install sglang

python3 -m sglang.launch_server \
  --model-path "deepseek-ai/DeepSeek-R1-0528" \
  --host 0.0.0.0 \
  --port 30000
```


```
curl -X POST "http://localhost:30000/v1/chat/completions" \
  -H "Content-Type: application/json" \
  --data '{
    "model": "deepseek-ai/DeepSeek-R1-0528",
    "messages": [
      {
        "role": "user",
        "content": "Give me a short checklist for evaluating a reasoning model."
      }
    ]
  }'
```


### Can You Run DeepSeek-R1-0528 Locally?

Yes, but the full model is not practical for most local machines. Hugging Face lists the official checkpoint at 685B parameters, while Unsloth’s local-running guide describes the full model as requiring about 715GB of disk space and lists quantized GGUF versions that still require very large memory budgets.


Local option | Who it fits | Practical note
Full DeepSeek-R1-0528 weights | Research labs, inference providers, teams with large GPU clusters | Not realistic for ordinary laptops or small single-GPU setups.
Quantized full-model GGUF | Advanced local users with very high RAM / unified memory | Unsloth lists a 1.66-bit TQ1_0 quant around 162GB and recommends substantial memory for useful speed.
DeepSeek-R1-0528-Qwen3-8B | Most local experimenters | Far easier to run; designed as a practical distilled reasoning model.
Hosted provider API | Most production teams | Best route when you need the full checkpoint behavior without operating the infrastructure yourself.

For most developers, the practical local path is the distilled 8B model rather than the full R1-0528 checkpoint.


```
ollama run hf.co/unsloth/DeepSeek-R1-0528-Qwen3-8B-GGUF:Q4_K_XL
```

Advanced users can experiment with quantized full-model builds, but those setups require careful memory planning, quantization choice, context-size tuning, and performance testing.


```
ollama run hf.co/unsloth/DeepSeek-R1-0528-GGUF:TQ1_0
```


### DeepSeek-R1-0528-Qwen3-8B

DeepSeek-R1-0528-Qwen3-8B is a distilled reasoning model created by transferring chain-of-thought behavior from DeepSeek-R1-0528 into a Qwen3 8B Base model. It exists to make some R1-0528-style reasoning behavior available in a smaller, cheaper, easier-to-run checkpoint.

The model card says the architecture is identical to Qwen3-8B, while the tokenizer configuration must come from DeepSeek’s R1-0528-Qwen3-8B repository rather than the original Qwen3 project.


Benchmark | DeepSeek-R1-0528-Qwen3-8B
AIME 2024 | 86.0
AIME 2025 | 76.3
HMMT February 2025 | 61.5
GPQA Diamond | 61.1
LiveCodeBench 2408–2505 | 60.5

Use the Qwen3-8B distill for local experiments, lower-cost serving, fine-tuning research, and smaller reasoning workflows. Do not describe it as equal to the full DeepSeek-R1-0528 checkpoint; the point of the distill is practicality, not complete parity.


### DeepSeek-R1-0528 vs Newer DeepSeek Models

DeepSeek-R1-0528 is no longer DeepSeek’s newest official model direction. DeepSeek V4 Preview was announced on April 24, 2026 with DeepSeek-V4-Pro and DeepSeek-V4-Flash. DeepSeek describes V4-Pro as a 1.6T-total / 49B-active model and V4-Flash as a 284B-total / 13B-active model, with 1M context as the default across official DeepSeek services.

This does not make R1-0528 obsolete for every use case. It remains valuable when you need R1-line reproducibility, exact benchmark comparisons, open-weight reasoning research, or the source checkpoint behind the Qwen3-8B distill. But if you are building a new app on DeepSeek’s official API, the current V4 model names should be evaluated first.


### Which DeepSeek Model Should You Use?


Scenario | Recommended choice | Why
Exact R1 benchmark reproduction | DeepSeek-R1-0528 | You need the actual R1-0528 checkpoint and model-card benchmark context.
Current official DeepSeek API development | DeepSeek-V4-Pro or DeepSeek-V4-Flash | These are the current official DeepSeek API model names.
Hosted exact R1-0528 access | Provider explicitly listing R1-0528 | Use a provider page that names the checkpoint, such as DeepInfra or OpenRouter.
Local lightweight reasoning experiments | DeepSeek-R1-0528-Qwen3-8B | Much easier to run than the full model.
Long-context official workflows | DeepSeek V4 models | Official V4 docs list 1M context for current DeepSeek services.
Research on reasoning distillation | DeepSeek-R1-0528 and Qwen3-8B distill | They show the relationship between full reasoning traces and smaller distilled models.


### Best Use Cases

DeepSeek-R1-0528 is best for reasoning-heavy tasks where quality matters more than lowest possible latency. Strong use cases include advanced math, competitive programming, code debugging, code review, technical planning, scientific reasoning, structured analysis, and benchmark reproduction.

The model is also useful for front-end and “vibe coding” workflows because DeepSeek specifically highlighted enhanced front-end capabilities and the model card mentions a better vibe-coding experience.

For developers, the strongest practical use cases are structured JSON output, function-calling agents, reasoning-heavy coding assistants, and tasks where the model must break down difficult problems before returning a final answer.


### Limitations and Risks

DeepSeek-R1-0528 is powerful, but it is not the default best model for every production workload. Reasoning models can be slower and more expensive per task because they may produce long intermediate reasoning before the final answer.

Provider routing matters. The same public model name can behave differently depending on quantization, serving stack, safety filters, context limits, caching, and whether the provider is routing to an exact checkpoint or a compatible alias.

The model is text input / text output, not an image-understanding model. If your workflow requires visual input, use a multimodal model instead of assuming R1-0528 can process images.

Function calling and JSON output should be tested end-to-end. Support listed in a release note or provider page does not guarantee that every edge case in your agent workflow will behave correctly.

Do not expose raw reasoning traces blindly in production. Reasoning content can contain sensitive, irrelevant, or unsafe intermediate text depending on the provider and application design. Store and display only what your product actually needs.

Finally, full local inference is hardware-heavy. For most users, hosted inference or the Qwen3-8B distill will be more practical than trying to run the full model locally.


### Practical Prompting Tips


Goal | Prompting tip
Math or logic | Ask for careful reasoning and a clearly marked final answer, such as “Return the final answer after the explanation.”
JSON output | Use response_format={"type":"json_object"} when supported, include the word “json” in the prompt, and provide a target schema example.
Code generation | Ask for assumptions, tests, and edge cases; always run or review generated code before production use.
Benchmark-like evaluation | Use the official-style temperature/top_p settings and run multiple trials rather than relying on one sample.
Tool use | Test the full tool-call loop, including reasoning-content handling if your provider returns it.
Local inference | Keep context size realistic, start with Qwen3-8B or a quantized build, and measure actual tokens per second on your machine.


### Frequently Asked Questions


#### What is DeepSeek-R1-0528?

DeepSeek-R1-0528 is the May 28, 2025 upgraded checkpoint of DeepSeek R1, designed for stronger reasoning, math, coding, front-end generation, JSON output, function calling, and reduced hallucination behavior.


#### When was DeepSeek-R1-0528 released?

DeepSeek-R1-0528 was released on May 28, 2025.


#### Is DeepSeek-R1-0528 open source?

It is an open-weight model under MIT terms according to the Hugging Face model card. The DeepSeek R1 series supports commercial use and distillation.


#### How many parameters does DeepSeek-R1-0528 have?

Hugging Face lists DeepSeek-R1-0528 as 685B parameters. Some provider pages describe the R1 MoE architecture as 671B total parameters with 37B active parameters per inference pass, so mention the source when citing a number.


#### What is the context length of DeepSeek-R1-0528?

The context length is provider-specific. DeepInfra lists 163,840 tokens, OpenRouter lists 164K, and Azure lists 163.84K for its catalog entry. Always verify the current provider page before production use.


#### Is DeepSeek-R1-0528 the same as deepseek-reasoner?

Only during a dated historical period. DeepSeek’s May 2025 changelog upgraded the deepseek-reasoner service alias to R1-0528, but the alias was later reassigned to newer model modes before DeepSeek’s announced retirement cutoff, which has now passed. It is not an identifier for the R1-0528 checkpoint today.


#### Is DeepSeek-R1-0528 still available in the official DeepSeek API?

The current official DeepSeek API docs focus on DeepSeek-V4-Flash and DeepSeek-V4-Pro. If you need exact DeepSeek-R1-0528 behavior, use the official weights or a provider that explicitly lists the R1-0528 checkpoint.


#### Does DeepSeek-R1-0528 support JSON output?

Yes. DeepSeek’s R1-0528 release says the model supports JSON output. In API use, confirm that your provider supports JSON mode for the exact endpoint you choose.


#### Does DeepSeek-R1-0528 support function calling?

Yes. DeepSeek’s R1-0528 release says function calling is supported. Implementation details can differ by provider, so test your full tool workflow before production.


#### Does DeepSeek-R1-0528 support image input?

No. DeepSeek-R1-0528 should be treated as a text-input/text-output reasoning model. Use a multimodal model if you need image understanding.


#### Can I run DeepSeek-R1-0528 locally?

Yes, but the full model is too large for most local machines. Hosted inference, quantized GGUF builds, or the smaller DeepSeek-R1-0528-Qwen3-8B distill are more practical for most users.


#### What is DeepSeek-R1-0528-Qwen3-8B?

DeepSeek-R1-0528-Qwen3-8B is an 8B distilled model created by transferring chain-of-thought behavior from DeepSeek-R1-0528 into Qwen3 8B Base. It is designed for smaller-scale reasoning experiments and local use.


#### Is DeepSeek-R1-0528 better than DeepSeek R1?

On the official benchmark table, yes. It improves over the original R1 on most math, coding, and reasoning benchmarks, including AIME 2025, GPQA-Diamond, LiveCodeBench, SWE Verified, and HMMT 2025. SimpleQA is one reported metric that decreased.


#### Is DeepSeek-R1-0528 better than newer DeepSeek models?

Not necessarily. R1-0528 is best for exact R1-line research, benchmark reproduction, and open-weight reasoning workflows. For new official DeepSeek API applications, evaluate the current V4 models first.


#### What is DeepSeek-R1-0528 best used for?

DeepSeek-R1-0528 is best used for complex reasoning, math, coding, code review, debugging, structured outputs, function-calling agents, benchmark comparison, and research into reasoning distillation.


### Conclusion

DeepSeek-R1-0528 remains one of the most important checkpoints in the DeepSeek R1 family because it materially improved reasoning, math, coding, structured output, and tool-oriented performance over the original R1. It is especially useful for R1-line benchmarking, reasoning-model research, coding tasks, JSON/function-calling workflows, and distillation studies.

For current DeepSeek-hosted API development, use and evaluate the explicit V4 model IDs. Use DeepSeek-R1-0528 only when you intentionally need that exact open-weight checkpoint or a provider explicitly exposes it by name.

The best choice depends on your goal: use DeepSeek-R1-0528 for exact R1 checkpoint work, use a provider that explicitly lists R1-0528 for hosted access, use DeepSeek-R1-0528-Qwen3-8B for local lightweight reasoning, and use newer DeepSeek V4 models for current official API workflows.


### Sources Reviewed


Source | Why it was used
DeepSeek-R1-0528 official release notes | Release date, stated improvements, JSON output, function calling, open weights.
DeepSeek API changelog | Historical API status for deepseek-reasoner and R1-0528 benchmark deltas.
Hugging Face: deepseek-ai/DeepSeek-R1-0528 | Official weights, model card, benchmark table, license, model size, vLLM/SGLang/Transformers examples.
Hugging Face: DeepSeek-R1-0528-Qwen3-8B | Distill description, Qwen3-8B benchmark results, local-use notes.
DeepSeek Models & Pricing | Current V4 API model names, 1M context, JSON/tool support, legacy alias retirement date.
DeepSeek V4 Preview release | Current model direction, V4-Pro/V4-Flash specs, official API migration note.
DeepInfra DeepSeek-R1-0528 API page | Current named checkpoint API example, context length, JSON and Function support listing.
OpenRouter R1 0528 page | Provider listing, model slug, context, release date, hosted access context.
Together AI DeepSeek-R1-0528 page | Availability check; currently not available on Together Serverless API.
Unsloth local-running guide | Local/quantized size guidance, Ollama/llama.cpp notes, practical hardware cautions.
Microsoft Azure AI Foundry catalog | Provider catalog specs, text modality, context length, lifecycle caution.

## 内部链接
- [DeepSeek R1](https://chat-deep.ai/models/deepseek-r1/)

## 外部链接
- [deepseek-ai/DeepSeek-R1-0528](https://huggingface.co/deepseek-ai/DeepSeek-R1-0528)
- [deepseek-ai/DeepSeek-R1-0528](https://huggingface.co/deepseek-ai/DeepSeek-R1-0528)
- [DeepSeek-R1-0528 official release notes](https://api-docs.deepseek.com/news/news250528/)
- [DeepSeek API changelog](https://api-docs.deepseek.com/updates/)
- [Hugging Face: deepseek-ai/DeepSeek-R1-0528](https://huggingface.co/deepseek-ai/DeepSeek-R1-0528)
- [Hugging Face: DeepSeek-R1-0528-Qwen3-8B](https://huggingface.co/deepseek-ai/DeepSeek-R1-0528-Qwen3-8B)
- [DeepSeek Models & Pricing](https://api-docs.deepseek.com/quick_start/pricing/)
- [DeepSeek V4 Preview release](https://api-docs.deepseek.com/news/news260424/)
- [DeepInfra DeepSeek-R1-0528 API page](https://deepinfra.com/deepseek-ai/DeepSeek-R1-0528/api)
- [OpenRouter R1 0528 page](https://openrouter.ai/deepseek/deepseek-r1-0528)
- [Together AI DeepSeek-R1-0528 page](https://www.together.ai/models/deepseek-r1)
- [Unsloth local-running guide](https://unsloth.ai/docs/models/tutorials/deepseek-r1-0528-how-to-run-locally)
- [Microsoft Azure AI Foundry catalog](https://ai.azure.com/catalog/models/DeepSeek-R1-0528)