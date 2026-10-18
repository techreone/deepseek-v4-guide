#!/usr/bin/env python3
"""Google Suggest 补全词库抓取 —— deepseekv4guide.org 选词阶段。

用法:
  python3 keywords/suggest-crawl.py [--out keywords/suggest-20261018.json] [--delay 0.4]

背景: 1017 checkpoint（2026-10-17）+ 10 月连续宕机窗口，Trends 对新 checkpoint 无数据，
      选词靠 Google 补全 API（真实用户措辞）。
纪律: 串行 + 间隔（未公开端点，别开并发）；一次前缀一次补全，不做字母汤展开。
代理: 本机 7900（Clash Verge）现役，启动前逐端口探测，禁止硬编码死端口。
"""
import argparse
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import date

SUGGEST = "https://suggestqueries.google.com/complete/search"
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"


def detect_proxy() -> str | None:
    """逐端口探测现役 HTTP 代理；都不通回退直连（返回 None）。"""
    for p in (7900, 7897, 7890):
        try:
            req = urllib.request.Request("https://www.google.com", method="HEAD")
            opener = urllib.request.build_opener(
                urllib.request.ProxyHandler({"http": f"http://127.0.0.1:{p}", "https": f"http://127.0.0.1:{p}"})
            )
            opener.open(req, timeout=4)
            return f"http://127.0.0.1:{p}"
        except Exception:
            continue
    return None


SEEDS = [
    # ---- 1017 checkpoint（本次核心新词族）----
    "deepseek 1017", "deepseek v4.1 flash 1017", "deepseek flash 1017",
    "v4.1 flash 1017", "deepseek v4.1 flash 1017 release", "deepseek v4.1 flash 1017 benchmark",
    "deepseek 1017 vs", "deepseek 1017 benchmark", "deepseek 1017 release date",
    "deepseek v4.1 flash 1017 download", "deepseek v4.1 flash 1017 gguf",
    "deepseek v4.1 flash 1017 huggingface", "deepseek v4.1 flash 1017 weights",
    "deepseek v4.1 flash 1017 api", "deepseek v4.1 flash 1017 local",
    "deepseek 1017 how to", "deepseek 1017 what is", "deepseek 1017 is",
    "deepseek v4.1 flash 1017 how", "deepseek v4.1 flash 1017 what",
    # ---- 基础模型词族 ----
    "deepseek v4.1 flash", "deepseek flash", "deepseek v4.1",
    "deepseek v4.1 flash how", "deepseek v4.1 flash what", "deepseek v4.1 flash is",
    "deepseek v4.1 flash can", "deepseek v4.1 flash does", "deepseek v4.1 flash why",
    "deepseek v4.1 flash api", "deepseek v4.1 flash pricing", "deepseek v4.1 flash price",
    "deepseek v4.1 flash benchmark", "deepseek v4.1 flash size", "deepseek v4.1 flash parameters",
    "deepseek v4.1 flash context window", "deepseek v4.1 flash vision",
    "deepseek v4.1 flash reasoning effort", "deepseek v4.1 flash vs",
    "deepseek v4.1 flash vs opus", "deepseek v4.1 flash vs kimi", "deepseek v4.1 flash vs gpt",
    "deepseek v4.1 flash vs gemini", "deepseek v4.1 flash vs glm",
    "deepseek v4.1 flash coding", "deepseek v4.1 flash review", "deepseek v4.1 flash reddit",
    "deepseek v4.1 flash worth it", "deepseek v4.1 flash free", "deepseek v4.1 flash download",
    "deepseek v4.1 flash gguf", "deepseek v4.1 flash vram", "deepseek v4.1 flash local",
    "deepseek v4.1 flash vllm", "deepseek v4.1 flash ollama",
    # ---- 宕机 / 稳定性（本次事件线）----
    "deepseek down", "deepseek outage", "deepseek status", "deepseek api down",
    "deepseek is down", "deepseek outage today", "deepseek refund", "deepseek credit refund",
    "deepseek compensation", "deepseek server", "deepseek server busy",
    "deepseek down how", "deepseek outage when", "deepseek outage why",
    "deepseek api outage", "deepseek uptime", "deepseek reliability",
    "deepseek status page", "deepseek error", "deepseek 500 error",
    # ---- Search / Fetch API（同日新功能）----
    "deepseek search api", "deepseek fetch api", "deepseek web search",
    "deepseek search tool", "deepseek tools api", "deepseek search api pricing",
    "deepseek search api how", "deepseek search api example", "deepseek rag",
    "deepseek mcp", "deepseek function calling", "deepseek tool calling",
    # ---- 集成 / harness ----
    "deepseek harness", "deepseek harness how", "deepseek harness install",
    "deepseek harness vs", "deepseek harness mcp", "deepseek harness plugin",
    "deepseek claude code", "deepseek codex", "deepseek cursor",
    "deepseek opencode", "opencode deepseek", "opencode deepseek 1017",
    "opencode go deepseek", "opencode zen deepseek", "opencode deepseek flash",
    "deepseek vscode", "deepseek copilot", "deepseek agent",
    # ---- 迁移 / 模型名 ----
    "deepseek model names", "deepseek model id", "deepseek-flash", "deepseek v4 flash",
    "deepseek v4 flash retired", "deepseek v4 pro", "deepseek v4 pro retired",
    "deepseek v4 pro api", "deepseek api key", "deepseek api base url",
    "deepseek api pricing", "deepseek api rate limit", "deepseek api migration",
    # ---- 生态 / 本地 ----
    "deepseek gguf", "deepseek local", "deepseek ollama", "deepseek lm studio",
    "deepseek dgx spark", "deepseek hardware requirements", "deepseek vram",
    "deepseek llama.cpp", "deepseek quant", "deepseek fp8",
    # ---- 疑问式裸前缀 ----
    "deepseek how", "deepseek what", "deepseek when", "deepseek why",
    "deepseek can", "deepseek does", "deepseek will", "deepseek is",
]


def fetch(q: str, proxy: str | None, timeout: int = 15) -> list[str]:
    params = urllib.parse.urlencode({"client": "firefox", "hl": "en", "gl": "us", "q": q})
    req = urllib.request.Request(f"{SUGGEST}?{params}", headers={"User-Agent": UA})
    handlers = [urllib.request.ProxyHandler({"http": proxy, "https": proxy})] if proxy else []
    opener = urllib.request.build_opener(*handlers)
    with opener.open(req, timeout=timeout) as resp:
        raw = resp.read()
    data = json.loads(raw.decode("utf-8", "ignore"))
    out = data[1] if isinstance(data, list) and len(data) > 1 else []
    return [s for s in out if isinstance(s, str)]


NOISE_RE = re.compile(
    r"(\bdeepseek\s+stock\b|\bdeepseek\s+app\b.*\bdownload\b|\bdeepseek\s+apk\b"
    r"|\bdeepseek\s+coder\b.*\bv1\b|\bdeepseek\s+r1\b|\bdeepseek\s+v2\b|\bdeepseek\s+v3\b)",
    re.I)


def is_noise(s: str) -> bool:
    return bool(NOISE_RE.search(s.strip()))


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default="keywords/suggest-20261018.json")
    ap.add_argument("--limit", type=int, default=0)
    ap.add_argument("--delay", type=float, default=0.4)
    args = ap.parse_args()

    proxy = detect_proxy()
    print(f"代理: {proxy or '直连'}", file=sys.stderr)

    seeds = list(dict.fromkeys(SEEDS))
    if args.limit > 0:
        seeds = seeds[: args.limit]

    results, errors, seen, noise = [], [], set(), set()
    for i, q in enumerate(seeds, 1):
        s = None
        for attempt in (1, 2):
            try:
                s = fetch(q, proxy)
                break
            except Exception as e:
                if attempt == 2:
                    errors.append({"q": q, "error": f"{type(e).__name__}: {e}"[:200]})
                else:
                    time.sleep(1.5)
        if s is not None:
            results.append({"q": q, "suggestions": s})
            for item in s:
                if is_noise(item):
                    noise.add(item)
                elif item not in seen:
                    seen.add(item)
        if i % 20 == 0:
            print(f"  ... {i}/{len(seeds)} 种子，累计 {len(seen)} 个去重补全词", file=sys.stderr)
        time.sleep(args.delay)

    payload = {
        "crawledAt": date.today().isoformat(),
        "seed": "deepseek v4.1 flash 1017",
        "proxy": proxy or "direct",
        "results": results,
        "allSuggestions": list(seen),
        "noise": sorted(noise),
        "errors": errors,
    }
    os.makedirs(os.path.dirname(args.out), exist_ok=True)
    with open(args.out, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=1)

    print(f"种子 {len(seeds)} 个，成功 {len(results)}，失败 {len(errors)}，"
          f"去重补全词 {len(payload['allSuggestions'])} 个 → {args.out}")
    return 0 if results else 1


if __name__ == "__main__":
    sys.exit(main())
