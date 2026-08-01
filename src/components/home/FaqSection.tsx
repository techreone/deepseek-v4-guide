"use client";

import { useState } from "react";
import { Plus, Minus } from "@phosphor-icons/react/dist/ssr";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "DeepSeek V4 Flash 相比于 V3 和 满血版 有什么核心优势？",
      a: "V4 Flash 专门针对高并发与实时 API 场景进行了系统级蒸馏与量化加速。在保留了优秀的代码编写与复杂逻辑拆解能力的同时，首 Token 延迟降低了 40%，且 API 调用单价仅为常规大模型的几十分之一。"
    },
    {
      q: "如何确保接入过程中的生产环境稳定性？",
      a: "建议配置重试机制 (Exponential Backoff)，或者结合 LiteLLM / OneAPI 等多节点代理网关，将 DeepSeek 官方 API 作为主路由，并配置备用节点以防瞬间流量洪峰导致的 429 限流。"
    },
    {
      q: "OpenAI 代码库是否可以直接无缝替换为 V4 Flash？",
      a: "是的！DeepSeek 官方 API 100% 兼容 OpenAI 格式。你只需要把 `base_url` 改为 `https://api.deepseek.com/v1`，并将模型名称填为 `deepseek-v4-flash`，现有代码无需做任何重大修改。"
    },
    {
      q: "如何申请免费额度或参与优惠活动？",
      a: "新注册账户通常会获得官方赠送的体验 Token 额度。同时，腾讯云、阿里云与火山引擎等第三方平台部署的 DeepSeek 端点也经常推出百亿 Token 免费赠送活动。"
    }
  ];

  return (
    <div id="faq" className="scroll-mt-32 my-12 pt-8 border-t border-border-subtle">
      <h3 className="text-xl font-bold text-white font-sans tracking-tight mb-6">
        常见问题解答 (FAQ)
      </h3>

      <div className="flex flex-col border-t border-zinc-800 divide-y divide-zinc-800/80">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="py-4">
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between text-left gap-4 py-2 text-sm sm:text-base font-medium text-zinc-200 hover:text-white transition-colors"
              >
                <span>{faq.q}</span>
                <span className="shrink-0 text-zinc-400">
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>
              {isOpen && (
                <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-3xl pr-6 font-sans">
                  {faq.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
