import type { GuideContent } from "./types";

// target keyword: deepseek mcp
// 词族：deepseek mcp server / deepseek mcp github / deepseek mcp integration /
//       deepseek mcp connector / deepseek mcp client / deepseek mcp support /
//       deepseek mcp config / deepseek mcp blender / deepseek web search mcp /
//       deepseek harness mcp
// 事实来源：reference/topics/29-v4-1-flash-1017.md、24-harness-integrations.md、
//           30-deepseek-outage-oct2026.md + 联网核实（MCP 官方规范站、DeepSeek 官方
//           Tool Calls / Search & Fetch 文档、Blender Lab、Figma、GitHub、Cursor、OpenCode、Playwright）
export const deepseekMcpServers: GuideContent = {
  slug: "deepseek-mcp-servers",
  category: "INTEGRATION GUIDE",
  title: "DeepSeek MCP Servers: Setup & Best Pairs",
  seoTitle: "DeepSeek MCP Servers: Setup & Best Pairs",
  readTime: "10 MIN READ",
  updatedAt: "OCT 18, 2026",
  summary:
    "MCP is a host feature, not a model one. Which DeepSeek hosts can connect MCP servers, the best servers to pair, config shape, security and token cost.",
  toc: [
    { id: "step-1", label: "Step 1: MCP Is a Client Feature, Not a Model Feature" },
    { id: "step-2", label: "Step 2: What DeepSeek Actually Provides" },
    { id: "step-3", label: "Step 3: Which Host Can Actually Connect MCP" },
    { id: "step-4", label: "Step 4: The Server Categories Worth Wiring Up" },
    { id: "step-5", label: "Step 5: Blender and Figma: 3D and Design" },
    { id: "step-6", label: "Step 6: The Config Shape Most Hosts Share" },
    { id: "step-7", label: "Step 7: Security Before Convenience" },
    { id: "step-8", label: "Step 8: Cost, Failure Modes, and a Verdict" },
  ],
  steps: [
    {
      num: "01",
      title: "MCP Is a Client Feature, Not a Model Feature",
      description:
        "There is no such thing as a model that supports MCP. The Model Context Protocol is an open standard for connecting AI applications to external systems — the reference description calls it a USB-C port for AI applications. The application is the client; the model never speaks the protocol[1].",
      paragraphs: [
        "This is the single most common misunderstanding behind the phrase deepseek mcp support. When someone asks whether DeepSeek supports MCP, they are usually asking a question with no answer, because MCP does not live at the model layer. DeepSeek ships a model and an HTTP API. MCP lives one layer above that: your agent host — the CLI, the IDE, or the chat app you actually type into — opens a connection to an MCP server, discovers that server's tools, and hands those tool definitions to the model as ordinary function-calling schemas. The model emits a tool call. The host executes it. The host feeds the result back as text.",
        "DeepSeek's own tool-calling documentation makes the boundary explicit: the model returns a function call, and the model itself does not execute specific functions[2]. That sentence is the whole MCP story in miniature. Replace the hard-coded get_weather example with a filesystem MCP server and the mechanics are identical — the only difference is where the tool list comes from. Instead of you typing a schema into your request, the host asks the server what it can do.",
        "So the practical question is never whether DeepSeek supports MCP. It is which host you are running, and whether that host speaks MCP. Every other decision in this guide follows from that one. If you have been searching for a DeepSeek MCP connector to install into the model, there is nothing to install — the connector belongs on the client side.",
      ],
      note: "If you specifically want MCP inside DeepSeek's own harness, that is a different page. [[harness-mcp|DeepSeek Harness MCP setup]] covers the plugin routes, because dsh does not speak MCP natively.",
    },
    {
      num: "02",
      title: "What DeepSeek Actually Provides",
      description:
        "Two things matter on the provider side: native tool calling, and a first-party web layer that removes the need for a third-party search MCP server.",
      paragraphs: [
        "Tool calls have been in the API for a long time, and they are the mechanism every MCP host ultimately depends on. The Chat Completion API accepts a tools array, thinking mode has supported tool use since V3.2, and a beta strict mode validates your JSON schema on the server so the model cannot emit a malformed call[2]. Strict mode matters more for MCP than for hand-written tools, because MCP servers publish JSON schemas too. The tighter the provider's schema adherence, the fewer tool calls your host has to repair or retry.",
        "The second piece is newer. On October 17, 2026 DeepSeek opened its in-house Search and Fetch APIs at POST /v1/tools/search and POST /v1/tools/fetch, billed at $0.75 per 1,000 successful requests, with account-level QPS of 5 for each[3]. Search returns ranked results carrying a rerank_score and an authority tier; Fetch turns any URL into Markdown. Both authenticate with the same bearer key your chat calls already use, so there is no second credential to manage.",
        "Why this matters for MCP: a large share of community MCP servers exist for one reason — to give an agent web access. On a DeepSeek host you may not need one at all. Calls routed through DeepSeek Harness, Claude Code, or Codex server-side tools hit the same endpoints, and those calls are free of charge until per-request billing starts at 00:00 Beijing time on November 1, 2026[3]. The endpoint, operator and billing breakdown lives in the [[deepseek-search-api|Search & Fetch API guide]].",
      ],
      list: [
        "Tool calls: a tools array on Chat Completion, plus Anthropic-messages and Responses API formats[2]",
        "strict mode (beta): server-side JSON schema validation for tool arguments[2]",
        "Search API: web results with rerank_score (0-3) and authority (0-4)[3]",
        "Fetch API: one URL in, Markdown out[3]",
        "Free window for server-side tool calls via Harness, Claude Code and Codex until November 1, 2026[3]",
      ],
    },
    {
      num: "03",
      title: "Which Host Can Actually Connect MCP",
      description:
        "MCP support is a property of the host, and hosts differ a lot. Here is where the popular agent hosts stand.",
      table: {
        headers: ["Host", "MCP support", "Where you configure it"],
        rows: [
          ["DeepSeek Harness (dsh)", "Not native — via plugins", "Settings to Plugins, or cordis config"],
          ["Claude Code", "Native MCP client", ".mcp.json or claude mcp add"],
          ["Codex CLI", "Native, stdio servers", "config.toml, mcp_servers section"],
          ["OpenCode", "Native, local and remote", "opencode.json, mcp key"],
          ["Cursor", "Native, local and remote", ".cursor/mcp.json"],
          ["DeepSeek web and app chat", "No MCP", "Closed consumer surface"],
        ],
      },
      paragraphs: [
        "The DeepSeek Harness row deserves emphasis. dsh is plugin-first by design — everything, including the agent loop itself, is a plugin — and MCP arrives the same way, through a community plugin for panel configuration, a progressive-disclosure gateway for large tool catalogs, and community servers that expose dsh back to other clients. If you want the concrete install commands, [[harness-mcp|the dedicated MCP guide]] is the one to read.",
        "Claude Code, Codex CLI, OpenCode and Cursor are all native MCP clients, which is exactly why people run DeepSeek as the model inside them. If your goal is DeepSeek quality with a mature MCP client, pairing the model with one of these hosts is usually less work than extending dsh. Our [[v4-1-flash-coding-agents|comparison of coding agents]] covers that trade-off, and there are per-host walkthroughs for [[deepseek-codex|Codex CLI]] and for [[deepseek-vscode-copilot|VS Code with Copilot]].",
        "One host is easy to forget: the DeepSeek web chat and mobile app. Those are closed consumer surfaces with a fixed tool set. You cannot attach an MCP server to them, and no plugin changes that. MCP is a developer-workflow feature, not a chat feature.",
      ],
    },
    {
      num: "04",
      title: "The Server Categories Worth Wiring Up",
      description:
        "There are thousands of MCP servers. In practice most productive setups draw from five categories, and the official reference set is the sane starting point[4].",
      list: [
        "Filesystem: scoped read and write access to a project directory, so the agent acts on real files instead of pasted text[4]",
        "Git and GitHub: repository history, branches, issues and pull requests without leaving the host — GitHub maintains its own server[5]",
        "Browser and web fetch: drive a real browser or read pages, which is where Microsoft's Playwright MCP server fits[9]",
        "Databases and data stores: query a database or a memory store instead of exporting CSVs into the prompt[4]",
        "Docs lookup: pull current library documentation into context instead of trusting the model's training cutoff",
      ],
      paragraphs: [
        "The pattern that matters is that each server replaces a manual copy-paste loop. A filesystem server is worth more than ten novelty integrations, because it changes the task from here is the code I think you need into you have the repository, go read it. A Git server removes a different loop: the one where you paste diffs and logs back and forth to explain what changed.",
        "The official reference servers are deliberately educational — the repository README says they exist to demonstrate MCP features and SDK usage[4] — but filesystem, git and memory are genuinely used in production workflows, not just demos. For anything beyond that set, prefer a server with a named maintainer: GitHub's own server[5], Microsoft's Playwright server[9], and the vendor-run design and 3D servers covered next.",
      ],
    },
    {
      num: "05",
      title: "Blender and Figma: 3D and Design",
      description:
        "Two of the most-cited MCP pairings are creative tools, and both now have vendor-maintained servers. The MCP introduction literally names Figma-to-app and Blender 3D as examples of what the protocol enables[1].",
      paragraphs: [
        "Blender ships an official MCP server from the Blender Lab team. It is a lightweight server that gives an LLM a natural-language path into Blender's Python API, so the agent can inspect and modify a live scene: renaming data-blocks, finding the heaviest mesh, documenting a geometry-nodes setup, chasing shading artifacts[6]. You need Blender 5.1 or newer plus a matching add-on, and the server talks to a running Blender session rather than to a file on disk. That makes it a natural fit for the kind of work DeepSeek has been showcasing — the [[deepseek-v4-1-flash-1017|V4.1-Flash-1017 release]] led with 3D reconstruction and scene-building demos, and an MCP-driven Blender session turns those one-off demos into a repeatable loop.",
        "Figma is the design-side equivalent. The official Figma MCP server gives an agent the design context it needs to generate code from a Figma file[7], and the Framelink community server is the other widely used option, built with Cursor in mind. The use case is concrete rather than aspirational: hand the agent a frame, get components back whose spacing, naming and structure track the source file instead of an invented layout.",
        "Both servers exist to move a large visual artifact into a text-shaped channel, which is also their weak point. Treat their output as a draft. Scene analysis that ignores inactive modifiers is a real failure mode the Blender documentation calls out against its own example output[6], and generated components still need a human pass for accessibility and responsive behavior.",
      ],
      note: "Neither server produces finished production assets. Budget a review pass on geometry, materials and component structure before anything ships.",
    },
    {
      num: "06",
      title: "The Config Shape Most Hosts Share",
      description:
        "MCP server declarations have converged on a small JSON shape. Whatever host you use, you are almost always naming a server and telling the host how to launch it.",
      code: `{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/project"],
      "env": { "LOG_LEVEL": "info" }
    }
  }
}`,
      paragraphs: [
        "The three-field triple — command, args, env — is the common denominator. Command is the executable that starts the server, args are passed to it, and env carries per-server environment variables such as API keys or log levels. A server can also be declared as a remote endpoint instead of a local process, in which case you supply a URL and headers rather than a command line.",
        "Do not assume the wrapper key is identical everywhere. OpenCode nests servers under an mcp key, uses a type of local or remote, takes command as an array, and calls the environment block environment rather than env[10]. Codex CLI reads its servers from config.toml under an mcp_servers section and, as of writing, is limited to stdio servers. Cursor reads .cursor/mcp.json[8]. The shape inside each entry will look familiar; the file, the wrapper key and a few field names will not.",
        "That is why copying a snippet from a blog post into the wrong host is the single most common MCP failure. Read your host's own page first, then translate the triple. The generic block above is a schema, not a drop-in file.",
      ],
      note: "Whatever the field names, success looks the same: the host reports the server as connected, and its tools appear in the tool list before you send the first prompt.",
    },
    {
      num: "07",
      title: "Security Before Convenience",
      description:
        "An MCP server is a process running with your user's permissions. The convenience is exactly the risk.",
      list: [
        "Install only servers from sources you have reason to trust — a local server can read files and execute commands",
        "Scope filesystem servers to a project directory, never to your entire home directory",
        "Keep API keys in the env block or a secret store, never committed into a shared repository config",
        "Grant write and execute capability only where you would grant it to a script you wrote yourself",
        "Prefer servers with a named maintainer or a vendor over an anonymous package in a registry",
      ],
      paragraphs: [
        "Blender's own documentation is refreshingly blunt about this. It warns that the server will execute LLM generated code in Blender without any guards in place, and recommends running it in a virtual machine or on a system without access to sensitive information[6]. If a vendor says that about their own server, assume the same class of exposure for anything you install from an anonymous registry entry.",
        "Keys deserve their own paragraph. Because MCP configuration is usually a plain file in your project or home directory, an env block is one careless git add away from a leaked credential. Use your host's secret handling where it exists, and once a key has been committed, treat it as compromised rather than merely rotated later.",
        "Finally, keep the blast radius small the way you would for any agent tool. The protocol's security guidance exists precisely because MCP deliberately hands an application the ability to act on your behalf[1]. Your job is to decide how much it may act on, and to say no to the server that wants everything.",
      ],
    },
    {
      num: "08",
      title: "Cost, Failure Modes, and a Verdict",
      description:
        "MCP itself is free. What you pay for is context, and the failure modes are the same ones that bite any tool-calling agent.",
      paragraphs: [
        "Every MCP server you enable injects its tool definitions into the request, and every tool result comes back as tokens. OpenCode's own documentation warns that MCP adds to the context, that this can quickly add up if you have a lot of tools, and that servers such as the GitHub one tend to add a lot of tokens and can easily exceed the context limit[10]. Three well-chosen servers beat ten incidental ones, in both answer quality and cost.",
        "This is where cheap caching and small tool payloads compound. With DeepSeek Flash, cache-hit input is priced at $0.006 per million tokens at peak and $0.003 off-peak, against $0.30 and $0.15 for misses — so a stable tool-definition prefix that stays cached is close to free, while a churning one is not. A single cached token occupies 890 bytes in the FP4 main KV cache, which is why the [[v4-1-flash-kv-cache|KV cache compression work]] is worth more to multi-tool agents than to single-turn chat. Keep tool schemas stable, trim what servers return, and disable servers when they are not in use.",
        "On the failure side, treat a tool call like any other network call. Requests leave your machine, and DeepSeek's mid-October outage took chat, the V4-Pro API and the V4.1-Flash API down together for nearly five hours. A host that answers a failure by piling requests into a retry queue will drain that queue into a degraded model later, which is worse than failing fast. Set timeouts and retry limits, add a circuit breaker, and give the agent a documented path for tool unavailable instead of letting it retry forever.",
        "The verdict is short. If you want MCP with DeepSeek, pick a native client — OpenCode, Cursor, Claude Code or Codex — connect the two or three servers that close a real manual loop, and skip the rest. If you are committed to DeepSeek Harness, budget an hour for the plugin route documented in [[harness-mcp|the Harness MCP guide]]. And if the only thing you wanted from MCP was web search, you can probably drop the server entirely and call [[deepseek-search-api|Search and Fetch]] directly.",
      ],
    },
  ],
  prevGuide: { title: "DeepSeek Search & Fetch API: Setup, Pricing, Operators", slug: "deepseek-search-api" },
  nextGuide: { title: "DeepSeek Harness MCP Setup: Connect Model Context Protocol Servers", slug: "harness-mcp" },
  relatedGuides: [
    { title: "DeepSeek Harness MCP Setup: Connect Model Context Protocol Servers", slug: "harness-mcp" },
    { title: "DeepSeek Search & Fetch API: Setup, Pricing, Operators", slug: "deepseek-search-api" },
    { title: "DeepSeek V4.1 Flash Coding Agents: Which Host to Pick", slug: "v4-1-flash-coding-agents" },
    { title: "DeepSeek V4.1 Flash KV Cache: 890 Bytes per Token", slug: "v4-1-flash-kv-cache" },
    { title: "Run DeepSeek in Codex CLI", slug: "deepseek-codex" },
  ],
  sources: [
    { label: "Model Context Protocol — What is MCP?", url: "https://modelcontextprotocol.io/docs/getting-started/intro" },
    { label: "DeepSeek API Docs — Tool Calls", url: "https://api-docs.deepseek.com/guides/tool_calls/" },
    { label: "DeepSeek API Docs — Search & Fetch", url: "https://api-docs.deepseek.com/guides/search" },
    { label: "GitHub — modelcontextprotocol/servers (reference MCP servers)", url: "https://github.com/modelcontextprotocol/servers" },
    { label: "GitHub — github/github-mcp-server (official GitHub MCP server)", url: "https://github.com/github/github-mcp-server" },
    { label: "Blender — MCP Server (Blender Lab, official)", url: "https://www.blender.org/lab/mcp-server/" },
    { label: "Figma Help — Guide to the Figma MCP server", url: "https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server" },
    { label: "Cursor Docs — Model Context Protocol (MCP)", url: "https://cursor.com/docs/mcp" },
    { label: "GitHub — microsoft/playwright-mcp", url: "https://github.com/microsoft/playwright-mcp" },
    { label: "OpenCode Docs — MCP servers", url: "https://opencode.ai/docs/mcp-servers/" },
  ],
};
