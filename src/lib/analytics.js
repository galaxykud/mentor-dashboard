const COUNTER_ID = 113253171;
let previousUrl;

export function initializeAnalytics() {
  if (!import.meta.env.PROD) return;
  window.ym = window.ym || function (...args) {
    (window.ym.a = window.ym.a || []).push(args);
  };
  window.ym.l = Date.now();
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://mc.yandex.ru/metrika/tag.js?id=${COUNTER_ID}`;
  document.head.appendChild(script);
  window.ym(COUNTER_ID, "init", {
    defer: true,
    webvisor: true,
    clickmap: true,
    ecommerce: "dataLayer",
    accurateTrackBounce: true,
    trackLinks: true,
  });
}

export function trackPage(page, hasStudent) {
  if (!import.meta.env.PROD || typeof window.ym !== "function") return;
  const path = page === "home" ? "/" : `/${page}`;
  // Keep student names and query values out of pageview URLs.
  const url = `${location.origin}${import.meta.env.BASE_URL}#${path}${hasStudent ? "/card" : ""}`;
  if (url === previousUrl) return;
  window.ym(COUNTER_ID, "hit", url, {
    title: document.title,
    referer: previousUrl || document.referrer,
  });
  previousUrl = url;
}
