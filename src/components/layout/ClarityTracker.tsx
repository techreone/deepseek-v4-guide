import Script from "next/script";

// Microsoft Clarity — AI Visibility tracking (AI citations + bot activity)
// Enable by setting NEXT_PUBLIC_CLARITY_ID (e.g. in Vercel env vars).
export function ClarityTracker() {
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  if (!clarityId) {
    return null;
  }

  return (
    <Script
      id="clarity"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${clarityId}");`,
      }}
    />
  );
}
