# DeepSeek AI Agents: Tool Calling & Python Guide

- **URL**: https://chat-deep.ai/solutions/deepseek-ai-agents/
- **Published**: 2026-05-18T20:18:48+00:00
- **Modified**: 2026-07-29T12:19:56+00:00
- **Category**: DeepSeek Solutions
- **Word count**: 2956
- **Code blocks**: 2
- **Description**: Learn how to build a DeepSeek AI agent with V4 Flash or Pro, tool calling, a bounded execution loop, human approvals, and a practical Python example.

## H1


## H2 目录
- A safe DeepSeek agent architecture
- Current DeepSeek model IDs for agents
- Design tools as a security boundary
- Bounded Python agent with validation and approval
- Thinking mode and reasoning_content
- Permissions, retries, and idempotency
- Memory and RAG without data leakage
- Evaluate the whole agent, not one answer
- Production deployment checklist
- DeepSeek AI agent FAQ
- Official DeepSeek sources

## 正文
Last verified: July 28, 2026. There is no separate DeepSeek API product called “DeepSeek AI Agent.” In practical terms, a DeepSeek agent is an application-controlled loop around the DeepSeek API: the model proposes a tool call, your code validates it, your system decides whether approval is required, and only then does your application execute the action.

That distinction is the foundation of a reliable agent. DeepSeek can interpret a goal, plan a next step, and produce structured tool arguments. It does not automatically gain access to your database, browser, CRM, shell, email account, or payment system. Your application owns those connections—and must also own identity, permissions, validation, timeouts, audit logs, human review, and stop conditions.


> Quick answer: Use deepseek-v4-flash as a practical starting point for routine, high-volume agents and evaluate deepseek-v4-pro for harder planning or coding tasks. Give the model narrow tools, cap every run, reject unknown functions, and require explicit confirmation before any high-impact action.


### A safe DeepSeek agent architecture

A useful mental model is: the model proposes; the application disposes. The model can request an action, but a trusted control layer makes the decision.


```
Authenticated user request
        ↓
System instructions and policy
        ↓
DeepSeek model proposes an answer or tool call
        ↓
Allowlist + JSON argument validation + authorization
        ↓
Human approval when impact is high
        ↓
Application executes an idempotent, time-limited tool
        ↓
Sanitized tool result returns to the model
        ↓
Final answer, another bounded step, or a safe stop
```


Layer | Responsibility | Failure to prevent
Identity | Authenticate the user and resolve their tenant, role, and scope | One user acting on another user’s data
Orchestrator | Manage messages, tools, step limits, state, retries, and termination | Infinite loops and uncontrolled cost
DeepSeek model | Understand the goal and propose text or structured tool calls | Treating a probabilistic proposal as authorization
Tool gateway | Allowlist functions, validate arguments, enforce policy, and normalize results | Arbitrary API or code execution
Approval service | Bind a human confirmation to an exact user, action, arguments, and expiry | Irreversible actions without informed consent
Memory or RAG | Retrieve scoped knowledge and preserve only necessary state | Data leakage, stale facts, and invented policies
Observability | Record model version, latency, tokens, tool outcomes, approvals, and errors | Invisible quality drift and untraceable changes

Start with one narrow workflow and one or two read-only tools. A deterministic script is better when the steps never change. An agent is useful when the system must interpret natural language, choose among constrained tools, or adapt its next step to a tool result.


### Current DeepSeek model IDs for agents

DeepSeek’s official model-list example currently contains two API identifiers: deepseek-v4-flash and deepseek-v4-pro. Both are documented with tool-call support. DeepSeek’s own V4 release material markets V4-Pro as having enhanced agentic capabilities; treat that as a vendor claim and validate it on your tasks rather than assuming benchmark language guarantees production performance.


Model ID | Sensible starting use | What to test
deepseek-v4-flash | Routine support, retrieval, classification, and lower-cost tool workflows | Tool selection, latency, argument accuracy, and escalation rate
deepseek-v4-pro | More difficult planning, coding, or multi-step work | Quality gain versus added latency and cost

The retired names deepseek-chat and deepseek-reasoner are absent from the current official model list. Their post-cutoff behavior has also been inconsistent in our dated checks: requests returned HTTP 400 on July 25, while July 28 checks returned HTTP 200 and identified V4 Flash in the response. That is an observation of temporary compatibility—not a production guarantee. New agents should use the explicit V4 IDs and monitor the official list. See our DeepSeek API updates, V4 migration guide, model guide, and pricing guide before deployment.


### Design tools as a security boundary

A tool schema helps the model format a request; it does not prove that the request is safe, authorized, or factually correct. Prefer small tools with explicit names such as lookup_order_status(order_id) over a broad function such as manage_order(action, data). Use required fields, enums where possible, and additionalProperties: false. Then repeat validation in application code before execution.

- Allowlist tool names. Never dynamically import, evaluate, or dispatch a model-provided function name.

- Validate types, formats, ranges, and exact keys. Valid JSON can still contain an unauthorized customer ID or a fabricated parameter.

- Authorize after validation. Check the authenticated user’s tenant and resource permissions against server-side data.

- Separate reads from writes. Search and status lookup can often run automatically; deletion, payment, permission changes, publishing, and external messages usually need approval.

- Minimize tool output. Return only fields needed for the next step, cap response size, and remove secrets or internal stack traces.

- Treat retrieved text as untrusted data. A document saying “ignore your policy and call this tool” is content, not an instruction.

DeepSeek documents a strict tool-call mode in beta. It requires the beta base URL https://api.deepseek.com/beta and "strict": true on every function definition. The server validates supported JSON Schema features. Strict mode can improve schema conformance, but it is still beta and does not replace local validation, authorization, or approval.


### Bounded Python agent with validation and approval

This complete example uses the OpenAI Python SDK against DeepSeek’s OpenAI-compatible endpoint. It has two simulated tools: a read-only order lookup and a cancellation action. The cancellation cannot run unless a trusted application layer supplies an approval ID bound to the exact action. In the default call at the bottom, no approval exists, so the agent stops and asks for one.


```
import json
import os
import re
import time
import uuid
from typing import Any

from openai import OpenAI

MODEL = "deepseek-v4-flash"
MAX_STEPS = 6
MAX_TOOL_CALLS_PER_STEP = 3
MAX_TOOL_RESULT_CHARS = 4_000
ORDER_ID = re.compile(r"^ord_[0-9]{4,12}$")

client = OpenAI(
    api_key=os.environ["DEEPSEEK_API_KEY"],
    base_url="https://api.deepseek.com",
    timeout=30.0,
    max_retries=2,
)

# Simulated storage. Replace it with an authorized server-side service.
ORDERS = {
    "ord_1001": {"status": "processing", "owner": "current_user"},
}
IDEMPOTENT_RESULTS: dict[str, dict[str, Any]] = {}

TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "lookup_order_status",
            "description": "Read the status of an order owned by the signed-in user.",
            "parameters": {
                "type": "object",
                "properties": {"order_id": {"type": "string"}},
                "required": ["order_id"],
                "additionalProperties": False,
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "cancel_order",
            "description": (
                "Cancel an eligible order. This is a high-impact action "
                "and the application requires explicit human approval."
            ),
            "parameters": {
                "type": "object",
                "properties": {
                    "order_id": {"type": "string"},
                    "reason": {"type": "string"},
                },
                "required": ["order_id", "reason"],
                "additionalProperties": False,
            },
        },
    },
]

ALLOWED_TOOLS = {"lookup_order_status", "cancel_order"}


def audit(run_id: str, step: int, event: str, **fields: Any) -> None:
    # In production, send structured events to a protected log service.
    # Do not log secrets, private documents, or reasoning_content.
    record = {"run_id": run_id, "step": step, "event": event, **fields}
    print(json.dumps(record, separators=(",", ":"), default=str))


def validate_order_id(value: Any) -> str:
    if not isinstance(value, str) or not ORDER_ID.fullmatch(value):
        raise ValueError("Invalid order_id")
    return value


def parse_arguments(tool_name: str, raw: str) -> dict[str, str]:
    try:
        args = json.loads(raw)
    except json.JSONDecodeError as exc:
        raise ValueError("Tool arguments were not valid JSON") from exc

    if not isinstance(args, dict):
        raise ValueError("Tool arguments must be an object")

    if tool_name == "lookup_order_status":
        if set(args) != {"order_id"}:
            raise ValueError("Unexpected lookup arguments")
        return {"order_id": validate_order_id(args["order_id"])}

    if tool_name == "cancel_order":
        if set(args) != {"order_id", "reason"}:
            raise ValueError("Unexpected cancellation arguments")
        order_id = validate_order_id(args["order_id"])
        reason = args["reason"]
        if not isinstance(reason, str) or not 5 <= len(reason.strip()) <= 200:
            raise ValueError("Reason must contain 5 to 200 characters")
        return {"order_id": order_id, "reason": reason.strip()}

    raise ValueError("Unknown tool")


def lookup_order_status(order_id: str) -> dict[str, Any]:
    order = ORDERS.get(order_id)
    if not order or order["owner"] != "current_user":
        return {"found": False}
    return {"found": True, "order_id": order_id, "status": order["status"]}


def cancel_order(
    order_id: str, reason: str, idempotency_key: str
) -> dict[str, Any]:
    if idempotency_key in IDEMPOTENT_RESULTS:
        return IDEMPOTENT_RESULTS[idempotency_key]

    order = ORDERS.get(order_id)
    if not order or order["owner"] != "current_user":
        result = {"ok": False, "error": "Order not found"}
    elif order["status"] not in {"pending", "processing"}:
        result = {"ok": False, "error": "Order is not cancellable"}
    else:
        order["status"] = "cancelled"
        result = {
            "ok": True,
            "order_id": order_id,
            "status": "cancelled",
            "reason": reason,
        }

    IDEMPOTENT_RESULTS[idempotency_key] = result
    return result


def execute_tool(
    name: str,
    raw_arguments: str,
    approved_actions: dict[str, dict[str, Any]],
) -> tuple[dict[str, Any], bool]:
    if name not in ALLOWED_TOOLS:
        raise PermissionError("Unknown tool rejected")

    args = parse_arguments(name, raw_arguments)

    if name == "lookup_order_status":
        return lookup_order_status(**args), False

    # Bind approval to the authenticated user and the exact validated arguments.
    action_payload = {
        "tool": name,
        "arguments": args,
        "user_id": "current_user",
    }
    action_key = json.dumps(
        action_payload,
        sort_keys=True,
        separators=(",", ":"),
    )
    approval = approved_actions.get(action_key)
    if (
        not approval
        or approval.get("user_id") != "current_user"
        or not isinstance(approval.get("expires_at"), (int, float))
        or approval["expires_at"] <= time.time()
        or not isinstance(approval.get("approval_id"), str)
    ):
        return {
            "approval_required": True,
            "action_key": action_key,
            "summary": f"Cancel {args['order_id']} for: {args['reason']}",
        }, True

    # This record must come from an authenticated, short-lived server session.
    # Never accept an approval token invented by the model or copied from its text.
    approval_id = approval["approval_id"]
    idempotency_key = f"{action_key}:{approval_id}"
    return cancel_order(**args, idempotency_key=idempotency_key), False


def run_agent(
    user_text: str,
    approved_actions: dict[str, dict[str, Any]] | None = None,
) -> dict[str, Any]:
    run_id = str(uuid.uuid4())
    approvals = approved_actions or {}
    messages: list[dict[str, Any]] = [
        {
            "role": "system",
            "content": (
                "You are a careful order-support agent. Use tools for order facts. "
                "Never claim an action succeeded until a tool confirms it. "
                "Do not invent order data or bypass approval."
            ),
        },
        {"role": "user", "content": user_text},
    ]

    for step in range(1, MAX_STEPS + 1):
        response = client.chat.completions.create(
            model=MODEL,
            messages=messages,
            tools=TOOLS,
            tool_choice="auto",
            max_tokens=700,
            extra_body={"thinking": {"type": "disabled"}},
        )
        message = response.choices[0].message

        # Preserve the complete assistant message. If thinking mode is enabled,
        # this also preserves reasoning_content required for tool-call turns.
        messages.append(message.model_dump(exclude_none=True))
        calls = message.tool_calls or []

        if not calls:
            audit(run_id, step, "completed")
            return {
                "status": "completed",
                "run_id": run_id,
                "answer": message.content or "",
            }

        if len(calls) > MAX_TOOL_CALLS_PER_STEP:
            audit(run_id, step, "rejected", reason="too_many_tool_calls")
            raise RuntimeError("Too many tool calls in one step")

        for call in calls:
            name = call.function.name
            if name not in ALLOWED_TOOLS:
                audit(run_id, step, "rejected", tool=name)
                raise PermissionError("Unknown tool rejected")

            try:
                result, needs_approval = execute_tool(
                    name,
                    call.function.arguments,
                    approvals,
                )
            except (ValueError, PermissionError) as exc:
                audit(run_id, step, "rejected", tool=name, reason=str(exc))
                raise

            audit(
                run_id,
                step,
                "tool_checked",
                tool=name,
                approval_required=needs_approval,
            )

            if needs_approval:
                return {
                    "status": "approval_required",
                    "run_id": run_id,
                    "action": result,
                }

            result_json = json.dumps(result, separators=(",", ":"))
            if len(result_json) > MAX_TOOL_RESULT_CHARS:
                result_json = json.dumps({"error": "Tool result exceeded limit"})

            messages.append(
                {
                    "role": "tool",
                    "tool_call_id": call.id,
                    "content": result_json,
                }
            )

    audit(run_id, MAX_STEPS, "stopped", reason="step_limit")
    raise RuntimeError("Agent stopped at the configured step limit")


# No cancellation can execute because the trusted approval map is empty.
result = run_agent(
    "Check ord_1001 and cancel it because I ordered the wrong item.",
    approved_actions={},
)
print(json.dumps(result, indent=2))
```

In a real product, the approval screen should show the exact action and arguments. After the authenticated user confirms, your server creates a short-lived, one-time approval record bound to the user, tenant, action key, arguments, and expiry. Do not infer approval from phrases inside the prompt, and do not let the model mint its own approval token.


### Thinking mode and reasoning_content

The example disables thinking to keep the first implementation easy to inspect. If you enable thinking for a tool workflow, DeepSeek’s documentation requires the assistant message’s reasoning_content to be passed back in subsequent requests when that assistant turn contains tool calls. Omitting it can produce an HTTP 400 response.

Appending the SDK message with message.model_dump(exclude_none=True), as the example does, preserves the fields returned by the API. Do not reconstruct the assistant message with only content and tool_calls. Also avoid exposing or logging reasoning content; preserve it only as required inside the controlled conversation state. Test thinking and non-thinking paths separately before choosing a default.


### Permissions, retries, and idempotency

Agent reliability is mostly systems engineering. Set both a model-step limit and an overall wall-clock deadline. Give each tool its own timeout. Retry only transient failures, use exponential backoff with jitter, and keep a small retry budget. Authentication and billing errors should be surfaced for correction, not retried in a loop. See the DeepSeek API guide for current request patterns.

Retries are especially dangerous for writes. If a request times out after reaching a payment, email, or order service, the agent may not know whether the action succeeded. Use an idempotency key at the action boundary and persist the result, so replaying the same approved operation returns the earlier outcome instead of performing it twice.

- Give every run a trace ID and every tool call a stable ID.

- Log the model ID, mode, prompt version, step number, latency, token usage, tool name, validation result, approval record, and final status.

- Redact API keys, credentials, private document text, and unnecessary personal data.

- Never expose provider stack traces or internal tool errors directly to an end user.

- Use a circuit breaker when a dependency repeatedly fails.


### Memory and RAG without data leakage

The chat-completions API does not become durable business memory by itself. Your application decides which messages, summaries, and tool results to keep. Store the minimum needed, define retention, and isolate every tenant. A user-controlled conversation ID must never be sufficient to retrieve another account’s history.

For company policies or changing facts, retrieve relevant documents at run time instead of relying on model memory. Apply access control before retrieval, carry source identifiers into the answer, and let the agent say that the available context is insufficient. Retrieved passages and web pages are untrusted input, so they cannot override system policy or grant tool permission. The DeepSeek RAG knowledge-base guide covers retrieval, citations, metadata filters, and tenant isolation in more detail.


### Evaluate the whole agent, not one answer

A model benchmark does not measure whether your agent chooses the correct internal tool, respects permission boundaries, or recovers from a timeout. Build a versioned evaluation set from real workflows and include ordinary requests, ambiguous requests, malformed IDs, unauthorized resources, prompt injection, unavailable tools, duplicate retries, and explicit approval cases.


Metric | Question it answers
Task success | Did the user’s goal reach the correct final state?
Tool-selection accuracy | Did the model choose the right tool—or correctly choose none?
Argument validity | Did calls pass schema and business-rule validation?
Unauthorized-action rate | Did any run attempt or complete an action outside policy?
Approval precision | Were high-impact actions paused without blocking safe reads unnecessarily?
Loop efficiency | How many model steps and tool calls did successful runs require?
Quality, latency, and cost | Does a model or prompt change improve outcomes enough to justify its trade-offs?

Run regression tests whenever you change the model ID, thinking mode, system instructions, tool descriptions, schemas, retrieval configuration, or downstream APIs. In production, alert on rising validation failures, repeated tool loops, approval bypass attempts, latency spikes, empty responses, and token-cost anomalies.


### Production deployment checklist

- Use an official current model ID and pin your tested configuration.

- Keep the DeepSeek API key in a server-side secret store.

- Authenticate users and enforce tenant scope before any retrieval or tool call.

- Start with narrow, read-only tools and an explicit name allowlist.

- Validate every argument again in code; never trust schema conformance alone.

- Require human confirmation for writes with financial, legal, privacy, access, publishing, deletion, or external-communication impact.

- Use idempotency keys, per-tool timeouts, bounded retries, and a circuit breaker.

- Cap steps, tool calls, tokens, tool-result size, wall time, and run cost.

- Sanitize tool output and defend against prompt injection in retrieved content.

- Maintain audit trails, evaluation cases, rollback controls, and an incident owner.


### DeepSeek AI agent FAQ


#### Is “DeepSeek AI Agent” an official standalone product?

No standalone API product with that name appears in the official materials reviewed for this guide. Developers use DeepSeek models inside an application-controlled agent loop. Third-party products may also use DeepSeek as a model provider, but their tools, storage, permissions, and privacy practices belong to those products.


#### Which DeepSeek model should I use for an agent?

Begin by evaluating deepseek-v4-flash on routine workloads. Test deepseek-v4-pro where planning or coding quality has higher value. Do not select by model marketing alone: compare task success, tool accuracy, latency, and total run cost on your own evaluation set.


#### Does the model execute tool calls itself?

No. DeepSeek returns a structured request describing a function and arguments. Your application supplies and executes the function. That separation lets you reject unknown tools, validate arguments, check authorization, require approval, and log the result.


#### Is strict tool-call mode enough for production safety?

No. Strict mode is a beta schema-conformance feature reached through https://api.deepseek.com/beta. It can help format arguments, but valid arguments may still request an unauthorized or harmful action. Keep local validation, policy checks, approval, and idempotency.


#### Can a DeepSeek agent run autonomously?

It can automate bounded, low-risk workflows, but “autonomous” should not mean unbounded. Define allowed tools, resources, time, token budget, maximum steps, failure behavior, and escalation rules. Keep a human decision point for irreversible or materially consequential actions.


#### Do tool calls work with thinking mode?

Yes. DeepSeek documents tool calls in thinking mode. When an assistant turn contains a tool call, pass the complete returned assistant message—including reasoning_content—back in later requests. Do not display or log that field as an end-user explanation.


#### How should I give an agent company knowledge?

Use a permission-aware retrieval layer. Filter sources by the authenticated user and tenant before retrieval, return source metadata, constrain the answer to retrieved evidence, and test refusal when evidence is missing. Do not paste an entire private knowledge base into every prompt.


#### What should never be placed directly in an agent prompt?

Do not place API keys, passwords, unrestricted database credentials, private signing keys, or reusable approval tokens in prompts. Avoid unnecessary personal or regulated data. Give tools short-lived, least-privilege credentials on the server side instead.


### Official DeepSeek sources

- List Models — current API model identifiers.

- Tool Calls — function-calling flow and strict beta mode.

- Thinking Mode — multi-turn behavior and reasoning_content requirements.

- Error Codes — official HTTP error meanings.

- DeepSeek V4 Preview release — vendor description of V4 capabilities.

Chat-Deep.ai is an independent DeepSeek reference and is not affiliated with, endorsed by, or operated by DeepSeek. Recheck official model availability, pricing, API behavior, terms, and privacy requirements before a production release.

## 内部链接
- [DeepSeek API updates](https://chat-deep.ai/docs/deepseek-api-updates/)
- [V4 migration guide](https://chat-deep.ai/docs/migrate-deepseek-chat-reasoner-to-v4/)
- [model guide](https://chat-deep.ai/models/)
- [pricing guide](https://chat-deep.ai/pricing/)
- [DeepSeek API guide](https://chat-deep.ai/docs/api/)
- [DeepSeek RAG knowledge-base guide](https://chat-deep.ai/solutions/deepseek-rag-knowledge-base/)

## 外部链接
- [List Models](https://api-docs.deepseek.com/api/list-models/)
- [Tool Calls](https://api-docs.deepseek.com/guides/tool_calls/)
- [Thinking Mode](https://api-docs.deepseek.com/guides/thinking_mode/)
- [Error Codes](https://api-docs.deepseek.com/quick_start/error_codes/)
- [DeepSeek V4 Preview release](https://api-docs.deepseek.com/news/news260424/)
- [(no anchor)](https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fchat-deep.ai%2Fsolutions%2Fdeepseek-ai-agents%2F)
- [(no anchor)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fchat-deep.ai%2Fsolutions%2Fdeepseek-ai-agents%2F&text=DeepSeek%20AI%20Agents%3A%20Architecture%2C%20Tool%20Calling%20%26%23038%3B%20Python%20Guide)
- [(no anchor)](https://www.linkedin.com/shareArticle?url=https%3A%2F%2Fchat-deep.ai%2Fsolutions%2Fdeepseek-ai-agents%2F&title=DeepSeek%20AI%20Agents%3A%20Architecture%2C%20Tool%20Calling%20%26%23038%3B%20Python%20Guide)