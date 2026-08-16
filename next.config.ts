import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 静态导出到 out/，供 Cloudflare Pages 托管（纯静态，零 ISR 消耗）
  // 仅 build 时启用 export；dev 模式保持正常 server 渲染，
  // 否则 dev 下也强制所有动态路由必须被 generateStaticParams 覆盖，骨架期会 500
  output: process.env.NODE_ENV === "development" ? undefined : "export",
  reactStrictMode: true,
};

export default nextConfig;
