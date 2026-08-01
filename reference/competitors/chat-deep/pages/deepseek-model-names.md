# DeepSeek Model Names: API IDs, Labels and Checkpoints

- **URL**: https://chat-deep.ai/research/deepseek-model-names/
- **Published**: 2026-07-24T07:40:26+00:00
- **Modified**: 2026-07-29T02:17:15+00:00
- **Category**: Blog
- **Word count**: 2431
- **Code blocks**: 3
- **Description**: Decode DeepSeek model names and learn which label belongs in API code, Hugging Face downloads, or local runtimes, including aliases, Base and Distill.

## H1


## H2 目录
- The six layers behind DeepSeek model names
- Which exact string belongs in each tool?
- How to decode a DeepSeek checkpoint name
- What the common prefixes and suffixes mean
- Base, post-trained, and DSpark checkpoints in V4
- Why deepseek-chat was an alias, not a checkpoint
- Why deepseek-reasoner is not another name for R1
- Is V4 Pro Max a separate model?
- Product labels are controls, not model IDs
- Five common naming mistakes
- How to verify a DeepSeek model name before deployment
- DeepSeek model names FAQ

## 正文
Use this DeepSeek model-name reference to distinguish current V4 API IDs, product labels, official checkpoints, provider aliases, and retired historical names. Last verified: July 28, 2026.

DeepSeek model names are not interchangeable strings. A product label such as Expert Mode, an API ID such as deepseek-v4-pro, and a repository ID such as deepseek-ai/DeepSeek-V4-Pro belong to different systems—even when they refer to related technology. This guide shows which exact name to use in API code, model downloads, local servers, and third-party platforms.

Quick answer: which DeepSeek name should you use?

- DeepSeek-hosted API: use deepseek-v4-flash or deepseek-v4-pro in the model field.

- Hugging Face or a local model path: use the exact repository ID, such as deepseek-ai/DeepSeek-V4-Pro.

- Web or app: select the visible product mode; do not copy that label into API code.

- Third-party cloud or local server: use the ID documented by that provider or the served name configured on your endpoint.

Last verified: July 28, 2026.

Independent guide: Chat-Deep.ai is not affiliated with DeepSeek. Model catalogs and routing can change, so production systems should verify accepted IDs against the endpoint they call.


### The six layers behind DeepSeek model names

The shortest way to understand the naming system is to ask what each string identifies. The same release can appear at several layers, but a value from one layer is not automatically valid at another.


Name layer | Example | Where it belongs | Can it go in DeepSeek’s API model field?
Product or UI label | Expert Mode | DeepSeek web or app interface | No
Release family | DeepSeek-V4 | Announcements, research, and general discussion | No
Variant or display name | DeepSeek-V4-Pro | Readable prose and model cards | No; use its lowercase API ID
Official API ID | deepseek-v4-pro | Requests to api.deepseek.com | Yes
Repository or checkpoint ID | deepseek-ai/DeepSeek-V4-Pro | Hugging Face downloads and local model paths | No
Provider or served name | your-configured-alias | Cloud deployment, gateway, vLLM, or another runtime | Only on the endpoint that defines it


![DeepSeek API documentation comparing the deepseek-v4-flash and deepseek-v4-pro API IDs with the DeepSeek V4 Flash and V4 Pro model labels](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


### Which exact string belongs in each tool?


#### DeepSeek’s hosted API

For a request sent to https://api.deepseek.com, use the model IDs returned by DeepSeek’s official Lists Models endpoint. At the July 28, 2026 verification, its example response contains:


```
{
  "object": "list",
  "data": [
    {
      "id": "deepseek-v4-flash",
      "object": "model",
      "owned_by": "deepseek"
    },
    {
      "id": "deepseek-v4-pro",
      "object": "model",
      "owned_by": "deepseek"
    }
  ]
}
```

The capitalization and hyphenation are part of the identifier. Do not substitute DeepSeek-V4-Pro, DeepSeek V4 Pro, or deepseek-ai/DeepSeek-V4-Pro. For complete request setup, authentication, and error handling, use the DeepSeek API guide; for SDK migration details, see OpenAI SDK with DeepSeek.


#### Hugging Face and local model loaders

A Hugging Face ID has two parts: the organization namespace and the repository slug. For example:


```
deepseek-ai/DeepSeek-V4-Pro
```

This is a repository ID, not DeepSeek’s cloud API ID. It may be supplied to Transformers, vLLM, SGLang, or another loader that accepts a Hugging Face path. Case can matter, so copy the repository ID exactly from the verified deepseek-ai organization or its model card.


#### vLLM, SGLang, and self-hosted endpoints

A local server often uses a repository path when it starts, but it may expose a different name to clients. For example, a server can load deepseek-ai/DeepSeek-V4-Pro and publish a short alias through its serving configuration. The client must then send the served name, not necessarily the source repository. The base URL tells you which catalog controls the model field. See the practical guide to serve DeepSeek with vLLM.


#### Ollama, LM Studio, and quantized downloads

Desktop runtimes can add registry names, tags, sizes, and quantization labels. A string such as deepseek-r1:8b is an Ollama tag, while a GGUF filename may include Q4_K_M. These values describe a runtime package or file; neither is an official model ID for api.deepseek.com.


#### Third-party model providers

A third-party platform may require a provider prefix, regional inference profile, catalog ID, or user-created deployment name. Even though the JSON field is still called model, the accepted string is controlled by the base URL being called. Copy it from that provider’s model catalog and do not assume DeepSeek’s own ID is portable.


#### Anthropic-compatible integration names

DeepSeek’s Anthropic-compatible endpoint adds another naming layer. Its documented model mapping maps Claude names beginning with claude-opus to deepseek-v4-pro, and names beginning with claude-haiku or claude-sonnet to deepseek-v4-flash. Those Claude-shaped strings are compatibility inputs, not DeepSeek checkpoints. Record the mapping when auditing an integration so a framework label is not mistaken for the model identity behind it.


![Diagram showing the differences between a DeepSeek release family, display label, API ID, Hugging Face repository ID, and local served name](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


### How to decode a DeepSeek checkpoint name

Checkpoint names usually read from the broad family toward a narrower variant. Consider:


```
DeepSeek-R1-Distill-Qwen-32B
```

- DeepSeek identifies the publishing organization or project family.

- R1 identifies the reasoning release lineage.

- Distill says this is a distilled checkpoint rather than the full R1 model.

- Qwen identifies the base-model family used for that distilled checkpoint.

- 32B identifies its parameter-size class—not its context window, download size, or API version.

DeepSeek’s official R1 repository says the distilled models are Qwen- or Llama-based dense models fine-tuned with samples generated by DeepSeek-R1. Therefore, DeepSeek-R1-Distill-Qwen-32B is not a 32B slice of the 671B R1 architecture. The DeepSeek R1 family guide covers the release itself, while the R1-0528 checkpoint guide covers its dated update.


### What the common prefixes and suffixes mean


Token | Usually indicates | Important caution
V2, V3, V4 | A general model generation or release line | The family label alone is not necessarily an API ID or repository ID.
R1 | The reasoning-model lineage | DeepSeek-R1 is not one of the two V4 IDs returned by DeepSeek’s hosted API model list.
Coder, Math, Prover | A specialized code, mathematics, or formal-proof family | An official open checkpoint is not automatically a hosted DeepSeek API route.
VL, Janus, OCR | Vision-language, multimodal, or document-recognition families | Do not invent a hosted V4 vision or OCR API ID from the family name.
Pro, Flash | Named variants within the V4 release | Use title case in prose and the exact lowercase ID in API requests.
Base | A base checkpoint before instruction or chat post-training | It does not mean a smaller chat model.
Chat, Instruct | A checkpoint post-trained for conversation or instruction following | Read the model card; naming is not perfectly uniform across every family.
Zero | The R1-Zero training variant | It is a specific checkpoint name, not a general “no-cost” label.
Distill-Qwen, Distill-Llama | A distilled model based on the named external model family | It is not the full R1 architecture at a smaller size.
0324, 0528, 1210 | A release-stamped checkpoint name matching a documented month and day | Verify the release note instead of assuming every four-digit suffix follows the same convention.
Exp, Terminus, Speciale | An officially named experimental or revision variant | Availability can expire even when weights remain downloadable.
DSpark | A V4 package with an added speculative-decoding module | It is not a separate V4 family or hosted API ID.
GGUF, AWQ, GPTQ, Q4, Q8 | A format, conversion, or quantization | These often come from third parties and do not create a new official DeepSeek model family.


### Base, post-trained, and DSpark checkpoints in V4

The official V4 model card lists four primary downloadable checkpoints: DeepSeek-V4-Flash-Base, DeepSeek-V4-Flash, DeepSeek-V4-Pro-Base, and DeepSeek-V4-Pro. The -Base repositories are base weights; the versions without that suffix are post-trained releases intended for interactive use. The official V4 collection also lists DSpark packages with an added speculative-decoding module.

When downloading, include the namespace—for example, deepseek-ai/DeepSeek-V4-Pro-Base. When calling DeepSeek’s hosted API, use deepseek-v4-pro instead. See the official DeepSeek V4 model card for the checkpoint table and the DeepSeek V4 Pro and Flash guide for the model-level explanation.


### Why deepseek-chat was an alias, not a checkpoint

A checkpoint name identifies a specific set of weights or release artifact. An API alias can route to different backends over time. DeepSeek’s change log shows that deepseek-chat moved across V2, V2.5, V3, V3-0324, V3.1, V3.1-Terminus, V3.2-Exp, V3.2, and finally a V4 Flash compatibility route. That history makes the distinction concrete: the alias was a stable-looking entry point, not a permanent model identity.


Date | Alias | Backend documented at that point
December 26, 2024 | deepseek-chat | DeepSeek-V3
January 20, 2025 | deepseek-reasoner | DeepSeek-R1
May 28, 2025 | deepseek-reasoner | DeepSeek-R1-0528
December 1, 2025 | Both aliases | V3.2 non-thinking and thinking modes
April 24, 2026 | Both aliases | V4 Flash non-thinking and thinking compatibility routes

Current status — verified July 28, 2026: DeepSeek’s official model-list documentation shows only deepseek-v4-flash and deepseek-v4-pro. The announced July 24 retirement deadline for deepseek-chat and deepseek-reasoner has passed. Keep the older strings in this page’s historical routing table, but do not present them as current API model IDs or guaranteed compatibility routes. If an old alias succeeds on a particular request, that is undocumented endpoint behavior—not a stable model identity or support commitment.


### Why deepseek-reasoner is not another name for R1

In January 2025, deepseek-reasoner routed to DeepSeek-R1; in May it moved to R1-0528. Later it represented the thinking mode of V3.1 and V3.2, then became a temporary V4 Flash thinking route. Saying “deepseek-reasoner means R1” is therefore only correct for a dated period, not as a permanent definition.

The safe rule is to separate the historical API alias from the downloadable R1 checkpoints. A provider may still offer R1 under its own ID, but that ID belongs to the provider’s catalog.


### Is V4 Pro Max a separate model?

No. DeepSeek’s V4 model card uses labels such as DeepSeek-V4-Pro-Max and DeepSeek-V4-Flash-Max for maximum reasoning-effort modes. The downloadable checkpoint table does not list separate -Max repositories, and the hosted API model list does not return separate Max IDs.

Model selection and reasoning configuration are two different choices. Choose deepseek-v4-pro or deepseek-v4-flash, then control thinking through the request. DeepSeek documents thinking.type as enabled or disabled and reasoning_effort as high or max. The dedicated Thinking Mode documentation is the authoritative configuration reference.


### Product labels are controls, not model IDs

DeepSeek’s V4 announcement presents the web experience through Expert Mode and Instant Mode, while its API section separately provides lowercase V4 model IDs. That separation matters. A UI mode may bundle routing, tools, prompting, reasoning effort, or other product behavior that is not represented by a single portable model string.

Similarly, DeepThink has appeared as a reasoning control in DeepSeek’s product. It should not be treated as a permanent synonym for R1, deepseek-reasoner, or a downloadable checkpoint. If a workflow needs reproducibility, record the endpoint, accepted model ID, thinking settings, and verification date—not only the button label shown in the app.


### Five common naming mistakes

- Sending a display name to the hosted API. Use deepseek-v4-pro, not DeepSeek-V4-Pro.

- Sending a Hugging Face path to DeepSeek’s hosted API. deepseek-ai/DeepSeek-V4-Pro is a repository ID.

- Calling every smaller R1 model “R1 8B” or “R1 32B.” Preserve Distill and the Qwen or Llama base family because they describe the model’s origin.

- Treating a quantization as a new official model. GGUF, AWQ, GPTQ, FP8, and Q4 labels usually describe packaging or precision.

- Assuming a model ID works across providers. The same model field can accept different naming systems depending on the base URL.


### How to verify a DeepSeek model name before deployment

- Identify the endpoint. Is it DeepSeek, a cloud provider, a local server, or a desktop runtime?

- Query or inspect that endpoint’s catalog. For DeepSeek, call GET /models; for a provider, use its catalog; for a local server, inspect its served-model configuration.

- Copy the ID exactly. Preserve case, punctuation, namespace, version, region, and tag.

- Verify the artifact separately. If you download weights, read the exact model card for architecture, license, tokenizer, chat template, and serving requirements. The DeepSeek open-weight and licensing guide explains why “official” and “available by API” are different claims.

- Pin what can be pinned. Record the checkpoint revision or provider version when reproducibility matters; avoid moving aliases in production.

- Run a small smoke test. Confirm the accepted ID, response metadata, required features, and error behavior before a full rollout.

If the real question is which model fits a workload rather than how its name is structured, use the DeepSeek model list and selection guide. This page deliberately focuses on identity and naming.


### DeepSeek model names FAQ


#### What DeepSeek model name should I use in the API?

For DeepSeek’s hosted API, use an identifier returned by its current model catalog. At the July 28, 2026 verification, the documented IDs were deepseek-v4-flash and deepseek-v4-pro.


#### Is DeepSeek-V4-Pro the same string as deepseek-v4-pro?

No. They are related labels, but the title-case form is the readable model-version name and the lowercase form is the official DeepSeek API ID.


#### Can I put deepseek-ai/DeepSeek-V4-Pro in a DeepSeek API request?

No. That is the Hugging Face repository ID. Use deepseek-v4-pro with DeepSeek’s hosted endpoint.


#### Is deepseek-reasoner the same as DeepSeek R1?

Only during a historical routing period. The alias later pointed to R1-0528, V3.1/V3.2 thinking modes, and a V4 Flash compatibility route. It was not a permanent checkpoint name.


#### What does DeepSeek-R1-Distill-Qwen-32B mean?

It is a 32B Qwen-based dense model fine-tuned with samples generated by DeepSeek-R1. It is not the full R1 architecture reduced to 32B parameters.


#### What do checkpoint suffixes such as 0324 and 0528 mean?

For those documented DeepSeek releases, the suffix is a month-and-day release stamp. Verify the corresponding release note rather than applying the rule blindly to every four-digit suffix.


#### Are Base and Instruct checkpoints interchangeable?

No. Base checkpoints precede instruction or chat post-training; Instruct or post-trained checkpoints are tuned for following user requests. They can require different prompting, templates, and evaluation.


#### Is DeepSeek V4 Pro Max a separate model?

No. In DeepSeek’s V4 documentation, Max is a reasoning-effort mode. It is not a separate API ID or a separately listed downloadable checkpoint.


#### Can a local DeepSeek server use a different model name?

Yes. A local or self-hosted server can expose a configured served-model alias. Clients must use the name that endpoint advertises.


#### Are GGUF, AWQ, GPTQ, or Q4 names official DeepSeek models?

Usually not. These terms normally identify a file format, conversion, or quantization. Check the publisher and source model before treating a derivative as official.


#### How can I verify that a DeepSeek API model ID is accepted?

Call the endpoint’s model-list operation, compare the returned IDs with your configuration, and send a small test request. Do not rely on an old blog post or a model name copied from another provider.

## 内部链接
- [DeepSeek API guide](https://chat-deep.ai/docs/api/)
- [OpenAI SDK with DeepSeek](https://chat-deep.ai/docs/openai-sdk-to-deepseek/)
- [serve DeepSeek with vLLM](https://chat-deep.ai/guide/deepseek-with-vllm/)
- [DeepSeek R1 family guide](https://chat-deep.ai/models/deepseek-r1/)
- [R1-0528 checkpoint guide](https://chat-deep.ai/models/deepseek-r1-0528/)
- [DeepSeek V4 Pro and Flash guide](https://chat-deep.ai/models/deepseek-v4/)
- [DeepSeek open-weight and licensing guide](https://chat-deep.ai/models/is-deepseek-open-source/)
- [DeepSeek model list and selection guide](https://chat-deep.ai/models/)

## 外部链接
- [DeepSeek API Docs](https://api-docs.deepseek.com/quick_start/pricing/#model-details)
- [official Lists Models endpoint](https://api-docs.deepseek.com/api/list-models/)
- [documented model mapping](https://api-docs.deepseek.com/guides/anthropic_api/#anthropic-model-mapping)
- [official R1 repository](https://github.com/deepseek-ai/DeepSeek-R1)
- [official DeepSeek V4 model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro#model-downloads)
- [DeepSeek API Change Log](https://api-docs.deepseek.com/updates/)
- [Thinking Mode documentation](https://api-docs.deepseek.com/guides/thinking_mode/)
- [V4 announcement](https://api-docs.deepseek.com/news/news260424/)