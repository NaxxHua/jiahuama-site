import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "./useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

/** Set the native scroll position and keep Lenis in sync on navigation. */
export function scrollImmediatelyTo(top: number) {
  if (lenisInstance) {
    // A route swap can grow the document before its ResizeObserver fires.
    if (top > lenisInstance.limit) lenisInstance.resize();
    lenisInstance.scrollTo(top, { immediate: true });
  } else {
    window.scrollTo(0, top);
  }
}

/** Focus the destination once, so Tab can continue there even during the glide. */
export function scrollToSection(target: HTMLElement, reducedMotion: boolean) {
  target.focus({ preventScroll: true });
  if (lenisInstance && !reducedMotion) {
    lenisInstance.scrollTo(target, { duration: 0.85 });
  } else {
    target.scrollIntoView({ block: "start", behavior: reducedMotion ? "instant" : "smooth" });
  }
}

/**
 * Initialise Lenis smooth scrolling once at the app root, sharing GSAP's
 * ticker with ScrollTrigger so scroll-driven animations stay in sync.
 * Skipped entirely under prefers-reduced-motion (native scroll instead).
 */
export function useLenis() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({ duration: 1.1 });
    lenisInstance = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [reducedMotion]);
}
