import type { GuideContent } from "./types";

// 目标关键词：AI agent harness
// 内容来源：reference/topics/20-harness-agent-capability.md + 13-deepseek-harness.md（2026-08-01 定稿）
// 信息分层：Anthropic/LangChain/Writer/NVIDIA/arXiv 为已发表来源；DeepSeek Harness 产品细节为 JD 原文或媒体推断，正文已标注。
export const harnessAgentCapability: GuideContent = {
  slug: "harness-agent-capability",
  category: "AI AGENTS",
  title: "Why a Native Harness Makes AI Agents Dramatically Better",
  readTime: "8 MIN READ",
  updatedAt: "AUG 1, 2026",
  summary:
    "An AI agent harness turns a raw model into a reliable agent: the same model gains up to 13.7 benchmark points and cuts per-task cost by 41%.",
  toc: [
    { id: "step-1", label: "Step 1: Agent = Model + Harness" },
    { id: "step-2", label: "Step 2: Four Things a Bare Model Gets Wrong" },
    { id: "step-3", label: "Step 3: Anthropic's Three-Agent Harness: Planner, Generator, Evaluator" },
    { id: "step-4", label: "Step 4: Solo 20 Minutes vs Harness 6 Hours" },
    { id: "step-5", label: "Step 5: The Harness Effect, Quantified" },
    { id: "step-6", label: "Step 6: The Academic Case: Harness, Not Model, Drives Performance" },
    { id: "step-7", label: "Step 7: What DeepSeek's Harness JD Reveals (and Doesn't)" },
    { id: "step-8", label: "Step 8: Why This Matters for DeepSeek V4 Users" },
  ],
  steps: [
    {
      num: "01",
      title: "Agent = Model + Harness",
      description:
        "An AI agent harness is the machinery between a raw model and the real world: context management, tool calling, memory, verification, and guardrails[2]. The industry definition is one formula: Agent = Model + Harness[7].",
      paragraphs: [
        "Anthropic calls the Claude Agent SDK 'a powerful, general-purpose agent harness' and treats multi-window context management as one of its core jobs. The harness is what lets one model work for hours across many context windows without falling apart.",
        "DeepSeek's Harness job posts use the same equation — 'Model + Harness = Agent' — and draw the boundary bluntly: everything other than the model itself belongs to the Harness. The JD lists the engineering surface: LLM API, KV Cache, agent loops, tool use, reasoning, planning, skills, MCP, memory, subagents, and multi-agent coordination.",
      ],
      code: `Model + Harness = Agent

Harness = everything outside the model:
  - context management (KV Cache, prefix caching)
  - tool orchestration (Tool Use, MCP)
  - memory and handoffs (Memory, Subagent, Multi-Agent)
  - planning and reasoning (Planning, Reasoning)
  - verification and feedback loops (self-correction, test feedback)

Source: DeepSeek Harness R&D Engineer JD, May 2026`,
      note: "A great agent is almost always a great model-plus-harness pair. That framing is why the DeepSeek Harness matters — see the [[deepseek-harness|DeepSeek Harness guide]] for the full pre-release picture.",
    },
    {
      num: "02",
      title: "Four Things a Bare Model Gets Wrong",
      description:
        "Anthropic documented four failure modes that appear when a raw model is pointed at a long task with nothing around it[1]. All four are harness problems with harness fixes.",
      paragraphs: [
        "Cross-session amnesia. A long task spans multiple context windows, and every new session starts from zero. Compaction is not enough: even Opus 4.5, given only a high-level one-sentence brief on a multi-window loop, could not produce a production-grade web app. The fix is a two-agent split — an initializer sets up the environment once, and a coding agent makes incremental changes, leaving handoff artifacts like init.sh, claude-progress.txt, git commits, and a feature_list.json with 200+ features marked failing.",
        "Context anxiety. As a model nears what it believes is its context limit, it rushes to finish. Compaction preserves continuity but never gives a clean slate; a full context reset does. On Sonnet 4.5 the anxiety was strong enough that reset became necessary; by Opus 4.5 it had mostly disappeared and the authors removed the reset.",
        "Self-evaluation bias. Asked to judge its own output, a model 'always confidently praises itself, even when quality is plainly mediocre to a human.' The lever is separation: making an independent evaluator harsher is far easier than making a generator more critical of its own work — a GAN-inspired design.",
        "Victory declaration. Agents announce 'done' without checking. Unless told to run end-to-end browser tests, Claude would write code and pass unit tests while the feature silently failed end-to-end. The fix is a checklist that only flips to passing after careful testing, plus real test tools — giving Claude tools like Puppeteer 'dramatically improved performance'.",
      ],
      note: "Every fix adds machinery around the model, not inside it. That machinery is the AI agent harness — usually a cheaper lever than waiting for a stronger model.",
    },
    {
      num: "03",
      title: "Anthropic's Three-Agent Harness: Planner, Generator, Evaluator",
      description:
        "On March 24, 2026, Anthropic published a harness design for multi-hour application development: three agents in a loop — Planner, Generator, Evaluator.",
      paragraphs: [
        "The Planner expands a one-to-four-sentence brief into a full product spec, kept at product context and high-level design so wrong implementation details can't cascade into every sprint.",
        "The Generator builds one feature per sprint on a React/Vite/FastAPI/SQLite stack with git version control. The Evaluator uses Playwright MCP to open the running app like a human and check UI, API, and database state against hard thresholds; any failure fails the sprint and returns detailed feedback.",
        "Each sprint runs on a contract: Generator and Evaluator negotiate what 'done' means before writing code, communicating through files. One level-editor sprint produced a contract with 27 acceptance criteria.",
        "Anthropic is blunt: 'Out of the box, Claude is a poor QA agent.' The first version found real problems and then talked itself out of flagging them, until several rounds of prompt tuning aligned it.",
      ],
      table: {
        headers: ["Agent", "Job", "Tools"],
        rows: [
          ["Planner", "Expand a 1-4 sentence brief into a product spec", "Spec writing, no implementation detail"],
          ["Generator", "Build one feature per sprint; self-review, then hand to QA", "React / Vite / FastAPI / SQLite + git"],
          ["Evaluator", "Test the running app like a human; hard pass thresholds", "Playwright MCP"],
        ],
      },
      note: "Model improvements move the design, not the principle. After Opus 4.6 shipped, Anthropic deleted the sprint structure and ran the Evaluator once at the end: 'the space of interesting harness combinations doesn't shrink as models improve. Instead, it moves'.",
    },
    {
      num: "04",
      title: "Solo 20 Minutes vs Harness 6 Hours",
      description:
        "Anthropic built the same 2D game with the same model, Opus 4.5, two ways. Solo with a simple prompt: 20 minutes and $9, core broken. Full harness: 6 hours and $200, playable.",
      table: {
        headers: ["Setup", "Time", "Cost", "Result"],
        rows: [
          ["Solo agent", "20 minutes", "$9", "Core broken: entities ignored input, wasted layout, silent wiring failures"],
          ["Full harness", "6 hours", "$200", "16-feature spec, ten sprints, playable game with AI-generation features"],
        ],
      },
      paragraphs: [
        "Anthropic's verdict: more than 20 times the cost, but the output-quality difference was immediate. A second demo — a digital audio workstation on Opus 4.6 with the V2 harness — ran 3 hours 50 minutes at $124.70: Planner $0.46, three build rounds $71.08 / $36.89 / $5.88, three QA rounds $3.24 / $3.09 / $4.06.",
        "The generator ran two hours solo without sprint decomposition, and QA still caught stub or display-only gaps every round. Caveat from the source: these are single runs, not repeated experiments — a cost breakdown, not a statistical claim.",
      ],
      note: "The cost gap is the headline, but the point is what $200 bought: an agent that verified its own work and finished the task.",
    },
    {
      num: "05",
      title: "The Harness Effect, Quantified",
      description:
        "The most convincing evidence is controlled numbers: keep the model fixed, change only the harness, and both scores and costs move[3].",
      paragraphs: [
        "LangChain ran Terminal Bench 2.0 with gpt-5.2-codex held fixed and changed only the harness: system prompt, tools, middleware. The score went from 52.8%, outside the top 30, to 66.5%, inside the top 5: plus 13.7 points on an unchanged model. 'We only changed the harness.'",
        "Writer's Harness Effect paper (arXiv 2607.06906) is the cleanest measurement. Across 22 tasks and 6 models, swapping only the orchestration layer cut cost per task 41% ($0.21 to $0.12) and tokens per task 38% (14.2k to 8.8k), while completion quality held flat-to-up at 0.78 to 0.81. Quality per dollar rose 82%[4].",
        "NVIDIA's open-source NOOA harness scored 82.2% on SWE-bench Verified with GPT-5.5 using 29 calls and ~1.1M tokens, where comparison harnesses needed 66 calls and 2.2M tokens for 78.2% — 'Parity or better, at roughly half the cost.'[5] NOOA's pass-by-reference design keeps tool results out of the text context, so sessions stay append-only and never need compaction.",
      ],
      table: {
        headers: ["Study", "Only variable changed", "Result"],
        rows: [
          ["LangChain, Terminal Bench 2.0", "Harness (model fixed at gpt-5.2-codex)", "52.8% -> 66.5%; Top 30 -> Top 5"],
          ["Writer Harness Effect, 22 tasks x 6 models", "Orchestration layer", "Cost -41%, tokens -38%, quality 0.78 -> 0.81"],
          ["NVIDIA NOOA, SWE-bench Verified", "Harness on GPT-5.5", "82.2% at 29 calls vs 78.2% at 66 calls"],
        ],
      },
      note: "In every row the model is the same and the harness is the only variable. Across all three, harness changes moved cost and quality more than model choice did.",
    },
    {
      num: "06",
      title: "The Academic Case: Harness, Not Model, Drives Performance",
      description:
        "'Stop Comparing LLM Agents Without Disclosing the Harness' (arXiv 2605.23950) states the Binding Constraint Thesis: for near-parity frontier models on long-horizon tasks, the harness is often the stronger determinant of performance than the model[6].",
      paragraphs: [
        "The first argument is formal: treat the harness as the controller of a closed-loop dynamical system and the LLM as the stochastic policy it drives — so small harness changes can shift performance more than replacing the model.",
        "The second is empirical: published benchmarks, industrial deployments, and variance decomposition show harness-induced variance can exceed model-induced variance — even inverting model rankings.",
        "The paper demands a disclosure standard: until the harness specification is disclosed, long-horizon agent leaderboard comparisons should be treated as incomplete and potentially misleading.",
      ],
      note: "That standard is not trivia: DeepSeek's official agent scores were all measured on an unreleased harness. The verification story continues in the next step.",
    },
    {
      num: "07",
      title: "What DeepSeek's Harness JD Reveals (and Doesn't)",
      description:
        "DeepSeek's Harness job descriptions are the best official window into the product. They confirm the same formula plus a concrete engineering surface.",
      paragraphs: [
        "The JD also says model and harness evolve together, with internal real tasks as the feedback source for both the harness product and model-capability training.",
        "Chinese tech media read the keywords as hints of specific features: KV-cache reuse and prefix caching, long-context trimming with history summarization, adaptive context strategies, and subagents in isolated contexts. These are media inferences from job keywords, not official confirmations — we separate the layers in the [[deepseek-harness|DeepSeek Harness pre-release guide]].",
        "The V4 hardware makes the pitch credible. DeepSeek's Hugging Face post highlights two numbers: at a 1M-token context, V4-Pro's per-token inference FLOPs are 27% of V3.2's, and its KV cache memory is just 10%[8]. A harness built around that cache geometry gets a cost advantage a generic harness cannot copy.",
      ],
      list: [
        "JD keywords: KV Cache, MCP, Memory, Subagent, Multi-Agent, Tool Use, Planning",
        "Official: model and harness co-evolve; internal tasks feed both",
        "Media inference, unconfirmed: cache reuse, dynamic context, subagent isolation",
        "Status Aug 1, 2026: unreleased; official scores used the unreleased minimal mode",
      ],
      note: "Co-evolution matters for benchmark reading: DeepSeek tunes the harness and the model together, so official scores measure the pair, not the model alone.",
    },
    {
      num: "08",
      title: "Why This Matters for DeepSeek V4 Users",
      description:
        "Three concrete reasons a native AI agent harness changes what you should expect from DeepSeek V4 — and how to evaluate it when it arrives.",
      paragraphs: [
        "Verification. DeepSeek's headline agent numbers — Terminal-Bench 2.1 at 82.7, DeepSWE at 54.4 — were produced by the unreleased Harness minimal mode; no third party can reproduce them until it ships. See the [[flash-benchmarks|official agent benchmarks guide]] for the full table and the debate.",
        "Cost. The harness decides how many tool calls a task burns — that number drives the bill. Third-party tests cited by 36Kr measured roughly 70 tool calls per task with Claude Code versus about 22 with OpenCode. Cache discipline is already the pitch of community projects like [[reasonix-deepseek|Reasonix]], which tunes around DeepSeek's prefix cache.",
      ],
      list: [
        "Re-test official scores the day the harness ships",
        "Cut per-task token cost — the harness sets the tool-call budget",
        "Judge by cost per completed task on your workload, not vendor leaderboards",
      ],
      note: "Four official signals mark the release: a GA entry in the DeepSeek API changelog, a harness repo under github.com/deepseek-ai, an announcement from @deepseek_ai, or a product page. For cache pricing meanwhile, see the [[flash-pricing|V4 Flash pricing guide]].",
    },
  ],
  prevGuide: {
    title: "DeepSeek Harness: Everything We Know Before the Official Release",
    slug: "deepseek-harness",
  },
  nextGuide: {
    title: "Reasonix: The DeepSeek Harness That Hits 99%+ Cache Rates",
    slug: "reasonix-deepseek",
  },
  relatedGuides: [
    { title: "DeepSeek Harness: Everything We Know Before the Official Release", slug: "deepseek-harness" },
    { title: "Reasonix: The DeepSeek Harness That Hits 99%+ Cache Rates", slug: "reasonix-deepseek" },
    { title: "DeepSeek V4 Flash Benchmarks: Agentic & Coding Scores in 2026", slug: "flash-benchmarks" },
  ],
  sources: [
    { label: "Anthropic: Harness Design for Long-Running Application Development", url: "https://www.anthropic.com/engineering/harness-design-long-running-apps" },
    { label: "Anthropic: Effective Harnesses for Long-Running Agents", url: "https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents" },
    { label: "LangChain: Improving Deep Agents with Harness Engineering", url: "https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering" },
    { label: "Writer: The Harness Effect (arXiv 2607.06906)", url: "https://arxiv.org/abs/2607.06906" },
    { label: "NVIDIA: Six Agent Harness Capabilities for Higher Model Performance", url: "https://developer.nvidia.com/blog/six-agent-harness-capabilities-for-higher-model-performance/" },
    { label: "Stop Comparing LLM Agents Without Disclosing the Harness (arXiv 2605.23950)", url: "https://arxiv.org/abs/2605.23950" },
    { label: "V2EX: DeepSeek Harness R&D Engineer JD — Original Post", url: "https://www.v2ex.com/t/1214141" },
    { label: "Hugging Face: DeepSeek V4 Blog (Official)", url: "https://huggingface.co/blog/deepseekv4" },
  ],
};
