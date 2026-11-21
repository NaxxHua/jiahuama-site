import { useRef, type MouseEvent } from "react";
import { Link, useHref } from "react-router-dom";
import { ArrowRight, ArrowDown } from "lucide-react";
import { motion, type Variants } from "motion/react";
import Threads from "@/components/ui/Threads";
import SplitText from "@/components/ui/SplitText";
import GradientText from "@/components/ui/GradientText";
import StarButton from "@/components/ui/StarButton";
import { useLang } from "@/i18n/LanguageContext";
import { useTheme } from "@/hooks/useTheme";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scrollToSection } from "@/hooks/useLenis";

const THREAD_COLORS: Record<"light" | "dark", [number, number, number]> = {
  light: [0.18, 0.53, 0.88],
  dark: [0.29, 0.64, 1],
};

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.15 + i * 0.1, ease: EASE_OUT },
  }),
};

export default function Hero() {
  const { t } = useLang();
  const theme = useTheme();
  const reducedMotion = useReducedMotion();

  const heroRef = useRef<HTMLElement>(null);
  const routedHighlights = useHref("#highlights");
  const highlightsHref = routedHighlights.includes("#/") ? routedHighlights : "#highlights";

  function goToHighlights(event: MouseEvent<HTMLAnchorElement>) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const section = document.getElementById("highlights");
    if (!section) return;
    event.preventDefault();
    // File previews can use the fragment for routing. Leave that route intact.
    if (highlightsHref === "#highlights" && window.location.protocol !== "file:" && window.location.hash !== highlightsHref) {
      window.history.replaceState(window.history.state, "", highlightsHref);
    }
    scrollToSection(section, reducedMotion);
  }

  return (
    <section ref={heroRef} className="relative flex min-h-[86vh] items-center justify-center overflow-hidden">
      {/* Animated thread background */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(680px 320px at 50% 18%, var(--hero-glow-1), transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-70"
          style={{
            maskImage: "linear-gradient(to bottom, #000 55%, transparent 95%)",
            WebkitMaskImage: "linear-gradient(to bottom, #000 55%, transparent 95%)",
          }}
        >
          <Threads color={THREAD_COLORS[theme]} amplitude={1.4} distance={0.1} interactionTarget={heroRef} />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-5 py-24 text-center">
        <motion.p
          custom={0}
          variants={fadeUp}
          initial={reducedMotion ? false : "hidden"}
          animate="show"
          className="font-mono text-[13px] uppercase tracking-[0.18em] text-fg-2"
        >
          {t.home.eyebrow}
        </motion.p>

        <SplitText
          tag="h1"
          text="Jiahua Ma"
          delay={55}
          duration={1}
          className="mt-3 font-display text-[clamp(48px,9vw,92px)] font-bold leading-[1.02] tracking-tight text-fg"
        />

        <motion.p
          custom={1}
          variants={fadeUp}
          initial={reducedMotion ? false : "hidden"}
          animate="show"
          className="mt-5 text-[clamp(15px,2.2vw,19px)] font-medium"
        >
          <GradientText>{t.home.roles[0]}</GradientText>
          <span className="text-fg-3"> · </span>
          <span className="text-fg-1">{t.home.roles[1]}</span>
          <span className="text-fg-3"> · </span>
          <span className="text-fg-1">{t.home.roles[2]}</span>
        </motion.p>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial={reducedMotion ? false : "hidden"}
          animate="show"
          className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-fg-2"
        >
          {t.home.tagline}
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial={reducedMotion ? false : "hidden"}
          animate="show"
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            to="/portfolio"
            className="group inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-accent-2"
          >
            {t.home.ctaWork}
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
          <StarButton to="/contact">{t.home.ctaContact}</StarButton>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <a href={highlightsHref} onClick={goToHighlights} className="flex min-h-11 min-w-11 flex-col items-center justify-center gap-1.5 rounded-sm outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent font-mono text-[10.5px] uppercase tracking-[0.16em] text-fg-3">
          {t.home.scroll}
          <ArrowDown size={13} aria-hidden="true" className="motion-safe:animate-bounce" />
        </a>
      </div>
    </section>
  );
}
