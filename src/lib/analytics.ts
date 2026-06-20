/**
 * Fire a GA4 custom event through the gtag instance set up by the Analytics
 * component. No-ops when GA isn't configured (no VITE_GA_MEASUREMENT_ID) or
 * before gtag.js has loaded, so call sites don't need to guard.
 */
export function trackEvent(
  name: string,
  params?: Record<string, unknown>
): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params ?? {});
}
