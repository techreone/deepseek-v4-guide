"use client";

import { 
  Cpu, 
  CodeBlock, 
  Lightning, 
  CaretRight, 
  Sliders, 
  CheckCircle 
} from "@phosphor-icons/react/dist/ssr";

export function RightSidebar() {
  const relatedModels = [
    {
      name: "DeepSeek R1",
      desc: "强化学习满血推理大模型，擅长复杂逻辑与代码推演。",
      tag: "推理旗舰",
      icon: "🧠"
    },
    {
      name: "DeepSeek V3",
      desc: "多语言通用基础大模型，高吞吐量与稳定性保障。",
      tag: "基础通用",
      icon: "⚡"
    },
    {
      name: "Claude 3.5 Sonnet",
      desc: "Anthropic 旗舰模型，用于基准评测与效果对比。",
      tag: "对比参照",
      icon: "🎯"
    }
  ];

  const devSkills = [
    {
      title: "Vercel AI SDK 接入",
      desc: "秒级实现 React 打字机式 Streaming 流式文本渲染。",
      icon: "⚛️"
    },
    {
      title: "Cursor IDE 本地配置",
      desc: "替换默认 OpenAI API 端点，让 Cursor 全自动写代码。",
      icon: "💻"
    },
    {
      title: "LiteLLM 网关代理",
      desc: "配置负载均衡、自动重试与多 Key 轮询管理。",
      icon: "🌐"
    }
  ];

  return (
    <aside className="flex flex-col gap-6 w-full">
      {/* Specs Quick Card */}
      <div className="rounded-xl bg-zinc-900/90 border border-zinc-800 p-5 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-cyan-400" />
            官方规格参数
          </span>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
            ONLINE
          </span>
        </div>

        <div className="flex flex-col gap-3 font-mono text-xs">
          <div className="flex justify-between items-center py-1 border-b border-zinc-800/60">
            <span className="text-zinc-400">上下文窗口</span>
            <span className="text-white font-semibold">128,000 Tokens</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-zinc-800/60">
            <span className="text-zinc-400">API 输入单价</span>
            <span className="text-emerald-400 font-semibold">$0.07 / 1M</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-zinc-800/60">
            <span className="text-zinc-400">API 输出单价</span>
            <span className="text-emerald-400 font-semibold">$0.28 / 1M</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-zinc-800/60">
            <span className="text-zinc-400">首 Token 延迟</span>
            <span className="text-cyan-400 font-semibold">&lt; 350 ms</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-zinc-400">协议兼容性</span>
            <span className="text-zinc-200 font-semibold">OpenAI API</span>
          </div>
        </div>
      </div>

      {/* Related Models Box */}
      <div className="rounded-xl bg-zinc-900/90 border border-zinc-800 p-5 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-bold text-white font-sans tracking-tight">
            相关模型推荐
          </h4>
          <a href="#" className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-0.5">
            查看更多 <CaretRight className="w-3 h-3" />
          </a>
        </div>

        <div className="flex flex-col gap-3">
          {relatedModels.map((item, idx) => (
            <a
              key={idx}
              href="#"
              className="group p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-700 transition-all hover:bg-zinc-800/50 flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-sm shrink-0">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-xs font-semibold text-zinc-200 group-hover:text-cyan-400 transition-colors truncate">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 shrink-0">
                    {item.tag}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 line-clamp-2 leading-tight">
                  {item.desc}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Developer Tools & Skills */}
      <div className="rounded-xl bg-zinc-900/90 border border-zinc-800 p-5 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-bold text-white font-sans tracking-tight">
            相关技能与工具
          </h4>
          <a href="#" className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-0.5">
            查看所有 <CaretRight className="w-3 h-3" />
          </a>
        </div>

        <div className="flex flex-col gap-3">
          {devSkills.map((item, idx) => (
            <a
              key={idx}
              href="#"
              className="group p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-700 transition-all hover:bg-zinc-800/50 flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-sm shrink-0">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold text-zinc-200 group-hover:text-cyan-400 transition-colors block mb-1">
                  {item.title}
                </span>
                <p className="text-[11px] text-zinc-400 line-clamp-2 leading-tight">
                  {item.desc}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
