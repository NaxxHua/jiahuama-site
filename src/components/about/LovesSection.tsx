import { Quote as QuoteIcon } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SpotlightCard from "@/components/ui/SpotlightCard";
import TheaterSection from "@/components/about/TheaterSection";
import GamingSection from "@/components/about/GamingSection";
import { useLang } from "@/i18n/LanguageContext";
import { discoQuote } from "@/data/loves";

/** Disco Elysium teal. */
const QUOTE = "#4aa3a3";

function GroupLabel({ children, first }: { children: string; first?: boolean }) {
  return (
    <Reveal>
      <p
        className={`${
          first ? "mt-12" : "mt-16"
        } font-mono text-[11px] uppercase tracking-[0.18em] text-fg-3`}
      >
        {children}
      </p>
    </Reveal>
  );
}

/**
 * "Things I love" — one section that gathers the theatre playbill, the game
 * profiles, and a favourite passage under a single heading.
 */
export default function LovesSection() {
  const { t, lang } = useLang();
  const l = t.about.loves;
  const q = discoQuote;

  const text = lang === "zh" ? q.zh : q.en;
  const source = lang === "zh" ? q.source.zh : q.source.en;
  const note = q.note ? (lang === "zh" ? q.note.zh : q.note.en) : "";

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <Reveal>
          <h2 className="font-display text-[clamp(22px,3vw,30px)] font-bold tracking-tight text-fg">
            {l.title}
          </h2>
          <p className="mt-2 text-[15px] text-fg-2">{l.sub}</p>
        </Reveal>

        <GroupLabel first>{l.stage}</GroupLabel>
        <TheaterSection asSubsection />

        <GroupLabel>{l.games}</GroupLabel>
        <GamingSection asSubsection />

        <GroupLabel>{l.words}</GroupLabel>
        <Reveal delay={0.05}>
          <SpotlightCard
            spotlightColor="rgba(74, 163, 163, 0.16)"
            className="relative mt-5 overflow-hidden rounded-xl border border-border bg-panel p-7 sm:p-9"
          >
            {/* Disco Elysium mural — "Un jour je serai de retour près de toi" */}
            <img
              src="/quote-disco.webp"
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.style.visibility = "hidden";
              }}
              className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-[0.35]"
            />
            {/* Readability scrim — theme-aware, holds strong across the text
                column (~65%), then fades to reveal the mural on the right. */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-panel via-panel/90 via-65% to-panel/40" />
            {/* Teal glow */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  `radial-gradient(440px 200px at 0% 0%, color-mix(in oklab, ${QUOTE} 18%, transparent), transparent 70%)`,
              }}
            />
            <QuoteIcon
              size={30}
              className="relative"
              style={{ color: QUOTE }}
              aria-hidden="true"
            />
            <blockquote className="relative mt-4 max-w-2xl">
              <p className="whitespace-pre-line text-[15.5px] italic leading-[1.85] text-fg">
                {text}
              </p>
            </blockquote>
            <figcaption className="relative mt-6 font-mono text-[12.5px]">
              <span style={{ color: QUOTE }}>— {source}</span>
              {note && <span className="text-fg-2"> · {note}</span>}
            </figcaption>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}
