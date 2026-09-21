import Script from "next/script";

// Google Analytics 4 (GA4) — 媒体资源/数据流由 ga4.py provision 生成。
// 与 ClarityTracker 的区别：GA4 是全站基础统计，ID 直接内联（不靠 env），
// 否则 CI/部署环境没配变量就会静默不加载。
const GA4_MEASUREMENT_ID = "G-XQJE9RDJEG";

export function GA4Tracker() {
  return (
    <>
      <Script
        id="ga4-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
      />
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4_MEASUREMENT_ID}');`,
        }}
      />
    </>
  );
}
