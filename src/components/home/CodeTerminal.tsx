"use client";

import { useState } from "react";
import { Check, Copy } from "@phosphor-icons/react/dist/ssr";

export function CodeTerminal() {
  const [copied, setCopied] = useState(false);

  const codeSnippet = `import os
from openai import OpenAI

# 100% OpenAI SDK compatible - just change the base_url
client = OpenAI(
    api_key=os.environ.get("DEEPSEEK_API_KEY"),
    base_url="https://api.deepseek.com/v1"
)

response = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[
        {"role": "system", "content": "You are a helpful coding assistant."},
        {"role": "user", "content": "What is the best practice to integrate DeepSeek V4?"}
    ],
    stream=True
)

for chunk in response:
    print(chunk.choices[0].delta.content or "", end="")`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="code" className="scroll-mt-24 my-10 rounded-lg bg-[#0e0e11] border border-zinc-800/80 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#141418] border-b border-zinc-800/60 text-xs font-mono">
        <div className="flex items-center gap-2 text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-zinc-600"></span>
          <span>quickstart.py</span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-mono bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 rounded transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">COPIED</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-zinc-400" />
              <span>COPY CODE</span>
            </>
          )}
        </button>
      </div>

      <pre className="p-4 font-mono text-xs sm:text-sm text-zinc-300 overflow-x-auto leading-relaxed whitespace-pre bg-[#0a0a0c]">
        <code>{codeSnippet}</code>
      </pre>
    </div>
  );
}
