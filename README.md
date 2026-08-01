# DeepSeek V4 Guide

**🌐 Live site: [https://deepseekv4guide.org](https://deepseekv4guide.org)**

An independent, researched tutorial hub for **DeepSeek V4 Flash & Pro** — API setup, pricing, benchmarks, agent integration, and local deployment. Every fact is sourced (see the REFERENCES on each guide); prices and benchmark scores are labeled with their as-of date and marked when vendor-reported.

## Guides

| Guide | Topic |
|-------|-------|
| [What Is DeepSeek V4 Flash?](https://deepseekv4guide.org/guides/deepseek-v4-flash) | The July 31, 2026 official release explained |
| [DeepSeek V4 Flash API Setup](https://deepseekv4guide.org/guides/flash-api-setup) | Base URL, models, first call |
| [DeepSeek V4 Flash Pricing](https://deepseekv4guide.org/guides/flash-pricing) | Token costs & how to save up to 98% |
| [DeepSeek V4 Flash Benchmarks](https://deepseekv4guide.org/guides/flash-benchmarks) | Agentic & coding scores in 2026 |
| [Use DeepSeek V4 Flash with OpenCode](https://deepseekv4guide.org/guides/flash-opencode) | Open-source coding agent |
| [DeepSeek V4 Flash in Cursor, Claude Code & Codex](https://deepseekv4guide.org/guides/flash-ide) | IDE integration |
| [DeepSeek V4 Flash on OpenRouter](https://deepseekv4guide.org/guides/flash-openrouter) | Setup, pricing & BYOK |
| [DeepSeek V4 Flash Model Size](https://deepseekv4guide.org/guides/flash-model-size) | Params, VRAM & local deployment |
| [Download from HuggingFace & Run Locally](https://deepseekv4guide.org/guides/flash-huggingface) | Weights, vLLM, GGUF |
| [DeepSeek V4 Pro](https://deepseekv4guide.org/guides/v4-pro) | Specs, pricing & release date |
| [Beginner Guide](https://deepseekv4guide.org/guides/beginner-guide) | Best cheap AI right now |
| [OpenCode Go Subscription](https://deepseekv4guide.org/guides/opencode-go) | $5/month unlocks DeepSeek V4 |
| [Claude Code & Claude Desktop + CC Switch](https://deepseekv4guide.org/guides/cc-switch-claude-code) | Connect to DeepSeek V4 |
| [DeepSeek Harness Tracker](https://deepseekv4guide.org/guides/deepseek-harness) | Everything we know pre-release |
| [Why a Native Harness Improves Agents](https://deepseekv4guide.org/guides/harness-agent-capability) | Model + Harness = Agent |
| [Reasonix: 99%+ Cache Rates](https://deepseekv4guide.org/guides/reasonix-deepseek) | The DeepSeek cache-first harness |
| [Hermes + MiMo V2.5 Vision Setup](https://deepseekv4guide.org/guides/hermes-setup) | Best pairing for Hermes |
| [DeepSeek V4 vs GPT-5.6 Luna](https://deepseekv4guide.org/guides/v4-vs-gpt56-luna) | Comparison after the price cut |
| [DeepSeek V4 Technical Report](https://deepseekv4guide.org/guides/official-tech-report) | Architecture & official benchmarks |

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, static export-ready)
- [Tailwind CSS 4](https://tailwindcss.com)
- Deployed on [Vercel](https://vercel.com)
- SEO: per-page metadata, sitemap, robots.txt, llms.txt, JSON-LD structured data, IndexNow

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

Content lives in `src/data/guides/` (one file per tutorial) and research notes in `reference/`. Research files record verified facts with source URLs; tutorials never fabricate numbers.

## Independence

This project is **not affiliated with or endorsed by DeepSeek** or any model provider. Official info: [api-docs.deepseek.com](https://api-docs.deepseek.com), [platform.deepseek.com](https://platform.deepseek.com), [status.deepseek.com](https://status.deepseek.com).
