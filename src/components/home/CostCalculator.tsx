"use client";

import { useState } from "react";
import { CurrencyDollar, TrendDown, ShieldCheck, Sparkle } from "@phosphor-icons/react/dist/ssr";

export function CostCalculator() {
  const [millionTokens, setMillionTokens] = useState<number>(50); // Default 50 Million tokens

  // Pricing constants (per 1M input tokens, official 2026-07 rates)
  const deepseekV4Price = 0.14; // DeepSeek V4 Flash (cache miss)
  const gpt4oPrice = 5.0; // OpenAI GPT-5.5
  const claudeSonnetPrice = 3.0; // Claude Sonnet 4.6

  const deepseekCost = millionTokens * deepseekV4Price;
  const gpt4oCost = millionTokens * gpt4oPrice;
  const claudeCost = millionTokens * claudeSonnetPrice;

  const savingsPct = Math.round(((gpt4oCost - deepseekCost) / gpt4oCost) * 100);
  const monthlySavings = (gpt4oCost - deepseekCost).toFixed(2);

  return (
    <div id="cost-calculator" className="scroll-mt-32 my-12 rounded-xl bg-zinc-900/90 border border-zinc-800 p-6 sm:p-8 backdrop-blur-md">
      <div className="flex items-center gap-2 mb-2">
        <CurrencyDollar className="w-6 h-6 text-emerald-400" />
        <h3 className="text-xl font-bold text-white font-sans tracking-tight">
          API 成本与省钱算盘
        </h3>
      </div>
      <p className="text-xs sm:text-sm text-zinc-400 mb-8 max-w-2xl">
        拖动下方滑动条，对比 DeepSeek V4 Flash 与竞品模型在相同 Token 调用量下的真实账单区别。
      </p>

      {/* Slider Input Area */}
      <div className="mb-8 p-5 rounded-lg bg-zinc-950/80 border border-zinc-800">
        <div className="flex justify-between items-center mb-4">
          <label className="text-xs font-mono text-zinc-300">
            预计每月 API Token 调用量:
          </label>
          <span className="text-lg font-mono font-bold text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded border border-cyan-800/60">
            {millionTokens} M Tokens <span className="text-xs text-zinc-400">({millionTokens * 100} 万字)</span>
          </span>
        </div>

        <input
          type="range"
          min="5"
          max="500"
          step="5"
          value={millionTokens}
          onChange={(e) => setMillionTokens(Number(e.target.value))}
          className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />
        <div className="flex justify-between text-[11px] font-mono text-zinc-500 mt-2">
          <span>5M (个人测试)</span>
          <span>100M (中小团队)</span>
          <span>500M (高并发生产环境)</span>
        </div>
      </div>

      {/* Comparison Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* DeepSeek V4 Flash */}
        <div className="p-5 rounded-lg bg-gradient-to-b from-cyan-950/40 to-zinc-900 border-2 border-cyan-500/60 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-cyan-500 text-zinc-950 font-mono font-bold text-[10px] px-2 py-0.5 rounded-bl">
            极度节省 97%
          </div>
          <div className="text-xs font-mono text-cyan-400 font-semibold mb-1">DeepSeek V4 Flash</div>
          <div className="text-3xl font-mono font-bold text-white mb-2">
            ${deepseekCost.toFixed(2)}
            <span className="text-xs text-zinc-400 font-normal"> /月</span>
          </div>
          <div className="text-[11px] text-zinc-400 font-mono">单价: $0.07 / 1M Tokens</div>
          <div className="mt-4 pt-3 border-t border-cyan-900/60 flex items-center gap-1.5 text-xs text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>首选推荐 · 极致并发吞吐</span>
          </div>
        </div>

        {/* GPT-4o */}
        <div className="p-5 rounded-lg bg-zinc-950/60 border border-zinc-800">
          <div className="text-xs font-mono text-zinc-400 font-semibold mb-1">OpenAI GPT-5.5</div>
          <div className="text-3xl font-mono font-bold text-zinc-300 mb-2">
            ${gpt4oCost.toFixed(2)}
            <span className="text-xs text-zinc-500 font-normal"> /月</span>
          </div>
          <div className="text-[11px] text-zinc-500 font-mono">单价: $5.00 / 1M Tokens</div>
          <div className="mt-4 pt-3 border-t border-zinc-800/80 text-xs text-zinc-500">
            多支出: +${(gpt4oCost - deepseekCost).toFixed(2)} /月
          </div>
        </div>

        {/* Claude 3.5 Sonnet */}
        <div className="p-5 rounded-lg bg-zinc-950/60 border border-zinc-800">
          <div className="text-xs font-mono text-zinc-400 font-semibold mb-1">Claude Sonnet 4.6</div>
          <div className="text-3xl font-mono font-bold text-zinc-300 mb-2">
            ${claudeCost.toFixed(2)}
            <span className="text-xs text-zinc-500 font-normal"> /月</span>
          </div>
          <div className="text-[11px] text-zinc-500 font-mono">单价: $3.00 / 1M Tokens</div>
          <div className="mt-4 pt-3 border-t border-zinc-800/80 text-xs text-zinc-500">
            多支出: +${(claudeCost - deepseekCost).toFixed(2)} /月
          </div>
        </div>
      </div>

      {/* Highlight Savings Summary Banner */}
      <div className="p-4 rounded-lg bg-emerald-950/40 border border-emerald-800/60 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-300">
          <Sparkle className="w-5 h-5 text-emerald-400" />
          <span>切换至 DeepSeek V4 Flash，您每月预计可直接省下 <strong className="text-white font-mono font-bold">${monthlySavings} USD</strong> 的 API 开销！</span>
        </div>
        <a 
          href="https://platform.deepseek.com"
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs font-mono font-medium px-3 py-1.5 rounded bg-emerald-500 text-zinc-950 hover:bg-emerald-400 transition-colors"
        >
          前往官方充值开通 ➔
        </a>
      </div>
    </div>
  );
}
