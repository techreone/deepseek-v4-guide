"use client";

import { useEffect, useRef } from "react";

interface AdsterraNativeProps {
  className?: string;
  label?: string;
}

/**
 * Adsterra Native Banner 广告（幂等注入，仿 roguewiki AdsterraNative）。
 * - 容器 ID 由 Adsterra 广告位绑定（invoke.js 按此 ID 定位），不能改。
 * - 固定容器 ID 意味着同一页面只能渲染一个实例。
 */
export default function AdsterraNative({
  className = "",
  label = "",
}: AdsterraNativeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    // 容器 ID 由 Adsterra 广告位绑定（invoke.js 按此 ID 定位），不能改
    const containerId = "container-e33521c364da3f018360333ee0d07fc5";
    const scriptSrc =
      "https://pl30876532.effectivecpmnetwork.com/e33521c364da3f018360333ee0d07fc5/invoke.js";

    // 幂等：脚本已加载则只复用容器，不重复注入（防 StrictMode 双调 / 多实例重复加载）
    if (
      !document.querySelector(`script[data-adsterra-native="${containerId}"]`)
    ) {
      let adDiv = document.getElementById(containerId);
      if (!adDiv) {
        adDiv = document.createElement("div");
        adDiv.id = containerId;
        container.appendChild(adDiv);
      }
      const script = document.createElement("script");
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      script.setAttribute("data-adsterra-native", containerId);
      script.src = scriptSrc;
      container.appendChild(script);
    }
  }, []);

  return (
    <div
      className={`my-6 rounded-lg border border-zinc-800/80 bg-[#0c0c0e] p-4 shadow-md ${className}`}
    >
      {label && (
        <div className="mb-3 border-b border-zinc-800/80 pb-2 text-[10px] font-mono font-bold tracking-wider text-zinc-600 uppercase">
          {label}
        </div>
      )}
      <div ref={containerRef} className="min-h-[100px] w-full" />
    </div>
  );
}
