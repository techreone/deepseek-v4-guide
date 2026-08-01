# DeepSeek OCR Guide: Setup, API, Benchmarks & OCR 2

- **URL**: https://chat-deep.ai/models/deepseek-ocr/
- **Published**: 2026-05-06T03:56:46+00:00
- **Modified**: 2026-07-29T02:16:48+00:00
- **Category**: 
- **Word count**: 4244
- **Code blocks**: 5
- **Description**: Learn what DeepSeek OCR is, how it works, how to run it locally, API options, benchmarks, OCR 2 differences, PDF OCR, and RAG use cases.

## H1


## H2 目录
- Quick Summary Box
- What Is DeepSeek OCR?
- How DeepSeek OCR Works
- Key Features of DeepSeek OCR
- DeepSeek OCR Benchmarks and Performance
- DeepSeek OCR vs Traditional OCR
- DeepSeek OCR vs DeepSeek OCR 2
- How to Install and Run DeepSeek OCR Locally
- Using DeepSeek OCR with Hugging Face
- Using DeepSeek OCR with vLLM
- Is There a DeepSeek OCR API?
- DeepSeek OCR for PDFs
- DeepSeek OCR for RAG Pipelines
- Practical Use Cases
- Limitations and Risks
- Best Practices Checklist
- Who Should Use DeepSeek OCR?
- FAQ
- Conclusion

## 正文
DeepSeek-OCR and OCR 2 are open-weight document-recognition models for text, layouts, PDFs, and visual token compression. Review setup, benchmarks, and API options. Last verified: July 28, 2026.

DeepSeek OCR, also written as DeepSeek-OCR, is a document OCR and vision-language model built to read images, scanned documents, and PDFs while compressing visual information into a small number of visual tokens. It is not just a classic OCR engine that detects characters line by line. It is a DeepSeek AI research and production model for optical context compression, where a page of text is represented visually, compressed by an encoder, and decoded back into text, Markdown, or structured document content. The official paper describes DeepSeek-OCR as a model made of DeepEncoder and DeepSeek3B-MoE-A570M, with code and model weights publicly available.

Interest in DeepSeek OCR grew because document-heavy AI systems need cheaper, cleaner ways to process long files. For RAG pipelines, research paper parsing, scanned archive processing, and PDF-to-Markdown workflows, the bottleneck is not only OCR accuracy; it is also token cost, layout preservation, table handling, and throughput. DeepSeek-OCR tries to solve that by converting dense visual pages into compact visual tokens before decoding them into text. Its official repository was released on October 20, 2025, added upstream vLLM support on October 23, 2025, and later introduced DeepSeek-OCR2 on January 27, 2026.


### Quick Summary Box


Item | Summary
What it is | An open OCR / vision-language model for image and document understanding
Best for | Complex PDFs, Markdown OCR, RAG preprocessing, long-document extraction, training-data generation
Main technology | Optical context compression using DeepEncoder and a DeepSeek MoE decoder
Model size | Hugging Face lists DeepSeek-OCR as a 3B-parameter BF16 Image-Text-to-Text model
License | MIT for DeepSeek-OCR; DeepSeek-OCR-2 is listed under Apache-2.0
Local deployment | Supported through Hugging Face Transformers and vLLM on NVIDIA GPUs
Hosted availability | Google Cloud Vertex AI lists deepseek-ocr-maas as a GA managed API; Hugging Face says its model is not deployed by an HF Inference Provider
API status | DeepSeek’s official API docs list chat/reasoning models, not DeepSeek-OCR; use Google MaaS, third-party services, or self-hosting
OCR 2 difference | DeepSeek-OCR 2 adds DeepEncoder V2 and Visual Causal Flow for better reading order and document layout reasoning
Main limitations | GPU requirements, dependency complexity, possible OCR errors, hallucination risk, API confusion, and benchmark-vs-production gaps

DeepSeek-OCR is listed on Hugging Face as an Image-Text-to-Text, Transformers, Safetensors, multilingual, vision-language, OCR model with custom code and MIT license. The model card also lists 3B parameters and BF16 tensor type.


### What Is DeepSeek OCR?

DeepSeek OCR is an OCR-focused vision-language model that reads visual document input and generates text-like output. In practical terms, you give it an image or a rendered PDF page, prompt it with something like “Convert the document to markdown,” and receive extracted text, Markdown, or layout-aware output. The official GitHub examples show prompts for Markdown conversion, free OCR, figure parsing, visual description, and region localization.

The important difference is that DeepSeek OCR is not built around the traditional OCR pipeline of detection, line segmentation, character recognition, and post-processing. It treats OCR as a compression and decompression problem. A document page is encoded into visual tokens, those tokens are compressed, and the decoder reconstructs the textual content. This is why the paper calls the approach Contexts Optical Compression: the page acts as a visual carrier for text context, and the model learns to decode it back.

A visual token is a compact representation of part of an image. In a vision-language model, these tokens are passed to a language model decoder in the same broad way that text tokens are passed to an LLM. The fewer visual tokens you need per page, the cheaper and more scalable the system can become. DeepSeek-OCR’s paper argues that OCR is a useful testbed because the model can be quantitatively evaluated: the input page contains text, the compressed visual representation is decoded, and the output can be compared with ground truth.

For RAG, this matters because every document parser eventually feeds text into chunking, embeddings, retrieval, and answer generation. A parser that preserves headings, tables, and reading order while keeping token usage manageable can reduce downstream cleanup work. DeepSeek OCR’s strongest appeal is therefore not “OCR accuracy only”; it is the combination of OCR, document understanding, and token-efficient preprocessing.


### How DeepSeek OCR Works

A simplified DeepSeek OCR pipeline looks like this:

- The user provides an image, scanned page, or rendered PDF page.

- DeepEncoder processes the visual input.

- The encoder compresses visual information into a controlled number of visual tokens.

- A DeepSeek MoE decoder generates the final text, Markdown, or structured output.

- The output is saved and used for search, RAG, training data, or document automation.

The official paper says DeepEncoder was designed to maintain low activation memory under high-resolution input while achieving high compression ratios. It also says DeepSeek-OCR uses DeepEncoder and DeepSeek3B-MoE-A570M as the decoder.

A useful analogy is to imagine compressing a full page into a highly informative thumbnail, but instead of a human looking at the thumbnail, a trained decoder reconstructs the text. That analogy is imperfect because the model does not simply downscale the image; it learns visual features that are useful for decoding text, layout, tables, formulas, and document structure.

The DeepSeek paper describes DeepEncoder as connecting window attention and global attention components through a convolutional compressor. The window attention component can process many high-resolution visual tokens, while the compressor reduces tokens before they enter dense global attention. This is the architectural reason the model can use relatively few visual tokens while still handling high-resolution document pages.


### Key Features of DeepSeek OCR

DeepSeek OCR’s main features are useful for developers building document AI systems rather than simple “image to text” scripts.

Image and document OCR: It can process document images and scanned pages, and the official prompts include both “Free OCR” and “Convert the document to markdown.”

PDF workflows: The GitHub repository includes a vLLM PDF inference script and reports PDF concurrency around 2,500 tokens/s on an A100-40G in the repository notes.

Markdown output: The Hugging Face and GitHub examples use a grounding prompt to convert a document to Markdown, which is especially useful for indexing and downstream rendering.

Resolution modes: The open-source model supports native Tiny, Small, Base, and Large modes with 64, 100, 256, and 400 vision tokens, plus a dynamic “Gundam” mode.

Transformers and vLLM support: DeepSeek-OCR can be run with Hugging Face Transformers, and the project announced upstream vLLM support on October 23, 2025.

Self-hosting: The weights and code are public through GitHub and Hugging Face, making the model suitable for teams that need local or private document processing.

Complex document understanding: Google Cloud describes DeepSeek-OCR as a comprehensive OCR model that analyzes complex documents and recognizes mathematical formulas as well as curved, rotated, or overlapping text.


### DeepSeek OCR Benchmarks and Performance

The headline benchmark claim from the DeepSeek-OCR paper is token compression. The abstract reports that when the number of text tokens is within 10 times the number of vision tokens, meaning compression ratio below 10x, DeepSeek-OCR achieves 97% OCR precision. At a 20x compression ratio, the paper reports about 60% OCR accuracy.

The HTML version of the paper gives a more granular view: 96%+ precision at 9–10x compression, 90% at 10–12x compression, and 60% at 20x compression on the Fox benchmark. The authors also frame the work as an investigation into whether visual modality can act as an efficient compression medium for long textual context.

For document parsing, the abstract says DeepSeek-OCR surpasses GOT-OCR2.0 on OmniDocBench while using 100 vision tokens and outperforms MinerU2.0 while using fewer than 800 vision tokens. The same abstract reports production-scale generation of 200k+ pages per day on a single A100-40G. The body of the paper also reports 33 million pages per day using 20 nodes with eight A100-40G GPUs each, which is approximately consistent with a 200k+ pages/day-per-GPU production figure.

These figures should be treated as official research and production reports, not guaranteed results for every team. Actual performance depends on page density, scan quality, language, tables, formulas, image resolution, batching, GPU type, prompt choice, vLLM configuration, and validation strategy.


### DeepSeek OCR vs Traditional OCR


Dimension | DeepSeek OCR | Tesseract | PaddleOCR | Cloud OCR tools
Best use case | Complex documents, PDF-to-Markdown, RAG preprocessing, token-efficient document understanding | Simple printed text extraction, CLI workflows, CPU-friendly OCR | Broad OCR toolkit, multilingual OCR, production document parsing | Managed extraction where teams want low infrastructure burden
Layout understanding | Stronger than classic OCR because it is VLM-based and can produce Markdown/layout-aware output | Limited without extra layout tooling | Strong ecosystem for layout, document parsing, and AI workflows | Often strong, varies by vendor
Token efficiency | Core design goal through optical context compression | Not designed around LLM token compression | Can prepare documents for LLMs but not primarily optical compression | Depends on provider
Hardware requirements | Serious use usually needs NVIDIA GPU | CPU-friendly | CPU/GPU options depending on pipeline | Provider-managed
Deployment complexity | Medium to high because of CUDA, PyTorch, FlashAttention, vLLM, and custom code | Low | Medium | Low for API use
Cost profile | Low software cost, higher GPU/infrastructure cost | Low infrastructure cost | Flexible | Usage-based API cost
RAG suitability | Strong for Markdown and complex layouts | Needs extra cleanup | Strong document parsing ecosystem | Strong when structured output is available
Main limitation | Requires careful setup and validation | Weak on complex layouts without add-ons | Pipeline complexity and version changes | Privacy, cost, vendor lock-in

Tesseract is an open-source OCR engine under Apache 2.0 that can be used directly or through an API to extract printed text from images, and it supports a wide variety of languages. PaddleOCR describes itself as a toolkit that turns PDFs or images into structured data for AI and supports 100+ languages.

The practical conclusion is simple: use Tesseract when you need simple, local, CPU-friendly OCR; use PaddleOCR when you want a mature OCR/document toolkit; use a cloud OCR API when managed infrastructure matters most; and consider DeepSeek OCR when complex document understanding, Markdown output, and token-efficient VLM parsing are more important than minimal setup.


### DeepSeek OCR vs DeepSeek OCR 2

DeepSeek-OCR 2 is the newer version of the DeepSeek OCR line. Its paper, DeepSeek-OCR 2: Visual Causal Flow, was published on January 28, 2026. It introduces DeepEncoder V2, a new encoder designed to dynamically reorder visual tokens based on image semantics instead of relying only on a rigid raster-scan order from top-left to bottom-right.

The main idea behind Visual Causal Flow is that documents are not always read in simple spatial order. A human reader follows headings, columns, captions, tables, footnotes, and formulas according to meaning. DeepSeek-OCR 2 tries to make the encoder more compatible with this kind of semantic reading order before the decoder generates text.


Feature | DeepSeek-OCR | DeepSeek-OCR 2
Release status | Released October 2025 | Presented January 2026
Encoder | DeepEncoder | DeepEncoder V2
Main idea | Optical context compression | Visual Causal Flow and semantic token reordering
Decoder | DeepSeek 3B MoE family | Retains a 3B MoE decoder with about 500M active parameters
Token range | Native and dynamic modes, including Gundam | 256 to 1120 visual tokens in the paper’s design
Best fit | Stable baseline, self-hosted OCR, PDF workflows | Newer document reading logic, better reading order, research exploration
License | MIT | Apache-2.0
Caution | Not always simple to deploy | Newer, so production behavior should be tested carefully

The OCR 2 paper reports 91.09% overall on OmniDocBench v1.5, compared with 87.36% for DeepSeek-OCR using 9 crops, and says OCR 2 improves performance by 3.73% under similar training data sources. It also reports lower reading-order edit distance and reduced repetition rates in production-style comparisons.

Choose DeepSeek-OCR if you want the original model, existing examples, and a widely discussed baseline. Choose DeepSeek-OCR 2 if reading order, complex layouts, and newer architecture matter more and your team can tolerate additional testing.


### How to Install and Run DeepSeek OCR Locally

The official repository says its tested environment is CUDA 11.8 with Torch 2.6.0, and the Hugging Face model card says inference examples were tested on Python 3.12.9 with CUDA 11.8. Always check the official repository before installation because GPU packages, vLLM wheels, and Transformers versions change quickly.

A practical local setup usually looks like this:


```
git clone https://github.com/deepseek-ai/DeepSeek-OCR.git
cd DeepSeek-OCR
conda create -n deepseek-ocr python=3.12.9 -y
conda activate deepseek-ocr
# Install the CUDA/PyTorch stack that matches your machine.
# Then install project requirements from the repository.
pip install -r requirements.txt
```

For Hugging Face Transformers inference, the official examples use AutoTokenizer, AutoModel, trust_remote_code=True, FlashAttention 2, BF16, and a prompt such as:


```
<image>
<|grounding|>Convert the document to markdown.
```

A simplified example:


```
from transformers import AutoModel, AutoTokenizer
import torch
model_name = "deepseek-ai/DeepSeek-OCR"
tokenizer = AutoTokenizer.from_pretrained(
    model_name,
    trust_remote_code=True
)
model = AutoModel.from_pretrained(
    model_name,
    trust_remote_code=True,
    use_safetensors=True,
    _attn_implementation="flash_attention_2"
).eval().cuda().to(torch.bfloat16)
prompt = "<image>\n<|grounding|>Convert the document to markdown."
image_file = "page.png"
output_path = "./ocr-output"
result = model.infer(
    tokenizer,
    prompt=prompt,
    image_file=image_file,
    output_path=output_path,
    base_size=1024,
    image_size=640,
    crop_mode=True,
    save_results=True
)
```

Because the model uses custom code, review the repository and model files before running it in a sensitive environment. For production, pin versions in a lockfile or Docker image, test throughput with your own document types, and validate extracted tables and numbers.


### Using DeepSeek OCR with Hugging Face

Hugging Face is the easiest way to download the model weights and inspect the model card. The DeepSeek-OCR model card includes the model tags, license, Transformers example, vLLM reference, model size, tensor type, and evaluation results.

Use Hugging Face when you want to:

- Run a small proof of concept.

- Test image OCR on a single GPU.

- Convert individual pages to Markdown.

- Inspect model files and custom code.

- Compare DeepSeek-OCR with DeepSeek-OCR-2.

The model card also states that DeepSeek-OCR is not deployed by a Hugging Face Inference Provider at the time checked, so do not assume you can call it as a hosted Hugging Face API without deploying it yourself or using another service.


### Using DeepSeek OCR with vLLM

vLLM matters when you need better throughput, batching, or an OpenAI-compatible local serving endpoint. The official GitHub release notes say DeepSeek-OCR became supported in upstream vLLM on October 23, 2025, and the vLLM recipe describes offline batch processing and online OCR serving.

A simplified vLLM serving command looks like this:


```
vllm serve deepseek-ai/DeepSeek-OCR \
  --logits_processors vllm.model_executor.models.deepseek_ocr:NGramPerReqLogitsProcessor \
  --no-enable-prefix-caching \
  --mm-processor-cache-gb 0
```

The vLLM guide recommends using the custom logits processor, turning off prefix caching and image reuse for OCR workloads, using plain prompts instead of chat-style instruction formats, and adjusting max_num_batched_tokens according to hardware.

For DeepSeek-OCR-2, vLLM provides a similar recipe using deepseek-ai/DeepSeek-OCR-2, with the same general serving pattern and OpenAI-compatible local API example.


### Is There a DeepSeek OCR API?

This is one of the most important points to clarify because many pages confuse DeepSeek’s chat API with DeepSeek OCR.


#### 1. DeepSeek official API

Verified July 28, 2026: DeepSeek’s official model-list documentation shows deepseek-v4-flash and deepseek-v4-pro. It does not list DeepSeek-OCR or DeepSeek-OCR-2 as standard hosted API model IDs. The older deepseek-chat and deepseek-reasoner strings are also absent from the current documented list and should be treated as historical compatibility aliases. To use DeepSeek OCR, either self-host the official code and weights or choose a third-party managed service that explicitly lists the OCR checkpoint. A local OpenAI-compatible vLLM endpoint or a third-party model API is not the same product as DeepSeek’s official hosted chat API; use the model ID, terms, limits, and privacy rules published by the endpoint you actually call.


#### 2. Google Cloud Vertex AI MaaS

Google Cloud Vertex AI documents DeepSeek-OCR as a managed API with model ID deepseek-ocr-maas, launch stage GA, inputs of Text, Documents, and Images, and output of Text. The Google Cloud page lists the release date as October 23, 2025 and the supported region as us-central1, with 8,192 context length and 8,192 max output.

Google’s broader DeepSeek models page also says managed DeepSeek models are available through Vertex AI and instructs users to use deepseek-ocr-maas for DeepSeek-OCR.


#### 3. Third-party hosted APIs

There are third-party sites claiming DeepSeek OCR API access. Treat them carefully. Verify model provenance, privacy terms, pricing, data retention, and whether they actually run the official model. For legal, financial, medical, or confidential documents, prefer a trusted managed provider or self-hosted deployment.


#### 4. Self-hosted API

A self-hosted API is often the best option for teams that need privacy and control. You can serve DeepSeek-OCR with vLLM using an OpenAI-compatible local endpoint, or wrap Transformers inference behind FastAPI. For production, add authentication, file validation, rate limiting, asynchronous jobs, and output validation.


### DeepSeek OCR for PDFs

DeepSeek OCR does not magically understand a PDF file as one continuous object unless your pipeline prepares it correctly. A robust PDF workflow usually renders each page to an image, runs OCR per page or in batches, saves Markdown/JSON output, and then merges the pages with metadata.

Recommended PDF workflow:

- Detect whether the PDF already has embedded text.

- Use direct text extraction for clean digital PDFs when possible.

- Render scanned or problematic pages to images.

- Use a sensible DPI, commonly 200–300 DPI for OCR experiments.

- Remove blank pages before inference.

- Batch pages by similar size and density.

- Use Markdown output for headings, lists, tables, and formulas.

- Store page numbers, bounding references, and source metadata.

- Validate numeric values, dates, tables, and citations.

- Send cleaned content into chunking and indexing.

DeepSeek-OCR is strongest when the document is visually complex enough to benefit from a VLM-based parser. For simple one-column digital PDFs with selectable text, direct PDF text extraction may be faster, cheaper, and less error-prone.


### DeepSeek OCR for RAG Pipelines

DeepSeek OCR can be used as the document ingestion layer in a RAG pipeline:


```
PDF or image
→ page rendering
→ DeepSeek OCR / Markdown OCR
→ cleanup and validation
→ chunking
→ embeddings
→ vector database
→ retrieval
→ LLM answer with citations
```

The advantage is that Markdown preserves more useful structure than plain text. Headings can guide chunk boundaries, tables can be retained in a readable form, and formulas can be converted to a format that is easier to search or display. Mistral’s OCR documentation makes a similar point for Document AI: preserving document structure, hierarchy, lists, tables, and Markdown output makes OCR easier to parse and render downstream.

The risk is that VLM OCR can still make mistakes. It may repeat text, misread numbers, alter table structure, or hallucinate content on blank or noisy pages. RAG systems should not blindly trust OCR output. Store page-level provenance, compare critical fields against the original document, and use human review for high-stakes domains.


### Practical Use Cases

Research papers: Convert scanned papers, equations, figures, and tables into Markdown for search and retrieval.

Invoices and receipts: Extract vendor names, dates, totals, tax fields, line items, and notes, then validate numbers with deterministic checks.

Legal contracts: Preserve headings, clauses, exhibits, signatures, and page references before indexing.

Financial reports: Convert dense tables and footnotes into searchable content, but validate numeric outputs carefully.

Technical manuals: Parse diagrams, captions, tables, and multi-column layouts for support bots or internal knowledge bases.

Scanned archives: Process older documents where direct text extraction fails, while preserving page-level metadata.

Multilingual documents: DeepSeek-OCR is tagged as multilingual on Hugging Face, while alternatives such as PaddleOCR and MinerU also emphasize multilingual OCR support.

Training data generation: The DeepSeek-OCR paper explicitly highlights production-scale generation of training data for LLMs and VLMs.


### Limitations and Risks

DeepSeek OCR is powerful, but it is not the best choice for every OCR task.

First, serious local use generally requires a modern NVIDIA GPU and a compatible CUDA stack. The official examples are tested with CUDA 11.8, Torch 2.6.0, FlashAttention, and BF16, which is more complex than running a CPU OCR package.

Second, dependency management can be fragile. vLLM, Transformers, PyTorch, FlashAttention, CUDA, and custom model code must be aligned. A minor version mismatch can break deployment.

Third, OCR errors still happen. VLM-based OCR may preserve more structure, but it can still misread characters, columns, formulas, or table cells.

Fourth, blank pages and noisy scans can create unreliable output. Add preprocessing and blank-page detection rather than sending every page to the model.

Fifth, privacy matters. If documents contain customer data, contracts, financial records, or medical information, review whether self-hosting or a trusted managed environment is required.

Finally, benchmark numbers are not production guarantees. They are useful for comparison, but your own workload is the real benchmark.


### Best Practices Checklist

- Preprocess images: deskew, crop borders, normalize orientation, and remove noise.

- Detect blank pages before OCR.

- Use deterministic inference settings where possible, such as temperature 0.

- Compare against a baseline OCR engine on your own documents.

- Validate tables, dates, totals, names, and legal references.

- Save page number, file ID, render settings, prompt, model version, and timestamp.

- Use Markdown for RAG, but keep the original PDF page reference.

- Add human review for legal, financial, medical, or compliance documents.

- Monitor latency, GPU utilization, cost per page, and failure rate.

- Test both DeepSeek-OCR and DeepSeek-OCR 2 if reading order is important.


### Who Should Use DeepSeek OCR?

Use DeepSeek OCR if you need OCR for complex documents, want Markdown output, care about token-efficient document processing, need local or self-hosted OCR, or are building RAG pipelines over scanned and visually rich documents.

Avoid DeepSeek OCR if your documents are simple, your team cannot maintain GPU infrastructure, you need a plug-and-play OCR API immediately, or you only need plain text from clean digital PDFs.

Best alternatives by scenario:


Scenario | Better option
Simple printed text on CPU | Tesseract
Broad OCR toolkit with multilingual support | PaddleOCR
Managed API with structured PDF extraction | Mistral OCR or Google Cloud options
Full document parsing with Markdown/JSON ecosystem | MinerU
Complex OCR with optical token compression | DeepSeek OCR
Newer semantic reading-order research | DeepSeek OCR 2

MinerU, for example, supports PDF, image, DOCX, PPTX, and XLSX inputs; removes headers and footers; preserves document structure; converts formulas to LaTeX; converts tables to HTML; supports OCR for 109 languages; and offers Markdown and JSON outputs. Mistral OCR is a hosted Document AI OCR processor for extracting text and structured content from PDFs, with Markdown output and table-format options.


### FAQ


#### What is DeepSeek OCR?

DeepSeek OCR is an open OCR and vision-language model from DeepSeek-AI that reads images and documents and converts them into text, Markdown, or structured output. Its core idea is optical context compression: representing document text visually with fewer tokens before decoding it.


#### Is DeepSeek OCR open source?

DeepSeek-OCR has public code and model weights, and its GitHub repository lists an MIT license. DeepSeek-OCR-2 is listed with an Apache-2.0 license on GitHub and Hugging Face.


#### How does DeepSeek OCR work?

It processes an image or document page through DeepEncoder, compresses the page into visual tokens, and uses a DeepSeek MoE decoder to generate text or Markdown output. The paper describes this as a proof of concept for vision-text compression.


#### Is DeepSeek OCR free?

The model weights and code are publicly available, so self-hosting can avoid per-page API fees. However, running it locally still costs GPU time, engineering effort, storage, and maintenance.


#### Can DeepSeek OCR read PDFs?

Yes, but the normal workflow is to render PDF pages into images and process them page by page or in batches. The official GitHub repository includes PDF inference examples for vLLM.


#### Does DeepSeek OCR have an API?

DeepSeek-OCR is not listed as a standard model ID in DeepSeek’s official hosted API catalog as of July 28, 2026. It can be self-hosted behind an OpenAI-compatible local endpoint, and some third-party platforms may offer managed OCR endpoints under provider-specific IDs.


#### What is the difference between DeepSeek OCR and DeepSeek OCR 2?

DeepSeek-OCR focuses on optical context compression with DeepEncoder. DeepSeek-OCR 2 introduces DeepEncoder V2 and Visual Causal Flow, which dynamically reorders visual tokens based on document semantics to improve reading order and layout understanding.


#### Is DeepSeek OCR better than Tesseract?

For complex documents, Markdown output, tables, formulas, and RAG preprocessing, DeepSeek OCR may be more suitable. For simple printed text extraction on CPU, Tesseract is easier and lighter. Tesseract remains a strong open-source OCR engine for printed text extraction.


#### Can DeepSeek OCR be used for RAG?

Yes. It can convert scanned pages and complex documents into Markdown-like text before chunking, embedding, and indexing. The main requirement is validation, because OCR errors can propagate into retrieval and answer generation.


#### What hardware do I need for DeepSeek OCR?

The official examples target NVIDIA GPUs with CUDA 11.8, Torch 2.6.0, BF16, and FlashAttention. For production, an A100-class GPU or equivalent is more realistic than CPU-only inference.


#### Does DeepSeek OCR support tables and formulas?

DeepSeek-OCR is designed for complex document understanding, and Google Cloud describes it as capable of recognizing mathematical formulas and difficult text such as curved, rotated, or overlapping text.


#### Is DeepSeek OCR safe for private documents?

It can be safer than a third-party API if self-hosted in your own controlled environment. Still, you must review custom code, secure the deployment, restrict access, log carefully, and avoid sending sensitive files to unverified hosted services.


### Conclusion

DeepSeek OCR is one of the most interesting OCR models for developers because it treats document reading as both an OCR problem and a token-compression problem. That makes it especially relevant for complex PDFs, scanned documents, Markdown extraction, RAG ingestion, and large-scale training-data pipelines.

The best reason to use DeepSeek OCR is not simply that it can read text. The stronger reason is that it can represent dense document pages with relatively few visual tokens, preserve useful structure, and integrate with Transformers or vLLM for self-hosted workflows. DeepSeek-OCR 2 extends that direction with Visual Causal Flow and better reading-order logic.

For simple OCR, use simpler tools. For complex document AI and RAG, DeepSeek OCR deserves serious evaluation.

## 内部链接
- [DeepSeek AI](https://chat-deep.ai/)

## 外部链接
- [DeepSeek-OCR](https://github.com/deepseek-ai/DeepSeek-OCR)
- [official paper](https://arxiv.org/abs/2510.18234)
- [DeepEncoder](https://arxiv.org/abs/2510.18234)
- [DeepSeek3B-MoE-A570M](https://arxiv.org/abs/2510.18234)
- [code and model weights publicly available](https://github.com/deepseek-ai/DeepSeek-OCR)
- [vLLM support](https://docs.vllm.ai/projects/recipes/en/latest/DeepSeek/DeepSeek-OCR.html)
- [DeepSeek’s official API docs](https://api-docs.deepseek.com/)
- [Contexts Optical Compression](https://arxiv.org/html/2510.18234v1)
- [GOT-OCR2.0 on OmniDocBench](https://arxiv.org/abs/2510.18234)
- [PaddleOCR](https://github.com/PaddlePaddle/PaddleOCR)
- [DeepSeek-OCR 2](https://github.com/deepseek-ai/DeepSeek-OCR-2)
- [DeepSeek-OCR 2: Visual Causal Flow](https://arxiv.org/abs/2601.20552)
- [Hugging Face model](https://huggingface.co/deepseek-ai/DeepSeek-OCR)
- [official model-list documentation](https://api-docs.deepseek.com/api/list-models/)
- [deepseek-ocr-maas](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/maas/deepseek/deepseek-ocr)
- [MinerU](https://github.com/opendatalab/MinerU)
- [Tesseract](https://tesseract-ocr.github.io/tessdoc/)
- [Mistral OCR](https://docs.mistral.ai/studio-api/document-processing/basic_ocr)