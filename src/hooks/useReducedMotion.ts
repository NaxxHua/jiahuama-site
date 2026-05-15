import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mql = window.matchMedia(QUERY);
  try {
    mql.addEventListener("change", callback);
    return () => mql.removeEventListener("change", callback);
  } catch {
    mql.addListener(callback);
    return () => mql.removeListener(callback);
  }
}

function getSnapshot(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia(QUERY).matches;
}

/**
 * Returns `true` when the user has requested reduced motion at the OS level.
 * Re-renders live when the setting changes. Mandated by WCAG 2.3.3 — call it
 * before triggering anything decorative.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
