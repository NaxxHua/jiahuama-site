import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "./useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

/** Position a newly rendered route at its requested section or its start. */
export function scrollToTop(anchor: HTMLElement | null = null) {
  if (lenisInstance) {
    lenisInstance.resize();
    lenisInstance.scrollTo(anchor ?? 0, { immediate: true });
  } else if (anchor) {
    anchor.scrollIntoView();
  } else {
    window.scrollTo(0, 0);
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
