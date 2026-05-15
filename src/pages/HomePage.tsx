import { Link } from "react-router-dom";
import { ArrowRight, FolderGit2, Martini, User, type LucideIcon } from "lucide-react";
import Hero from "@/components/home/Hero";
import Highlights from "@/components/home/Highlights";
import TechMarquee from "@/components/ui/TechMarquee";
import SpotlightCard from "@/components/ui/SpotlightCard";
import CountUp from "@/components/ui/CountUp";
import Reveal from "@/components/ui/Reveal";
import { useLang } from "@/i18n/LanguageContext";

const TECH = [
  "Flutter",
  "Swift",
  "React",
  "TypeScript",
  "Figma",
  "UI / UX Design",
  "Python",
  "Dart",
  "SQL & NoSQL",
  "R",
];

const EXPLORE: { key: "portfolio" | "recipes" | "about"; to: string; Icon: LucideIcon }[] = [
  { key: "portfolio", to: "/portfolio", Icon: FolderGit2 },
  { key: "recipes", to: "/recipes", Icon: Martini },
  { key: "about", to: "/about", Icon: User },
];

function ExploreSection() {
  const { t } = useLang();
  return (
    <section className="border-t border-border bg-bg-1">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <Reveal>
          <h2 className="text-center font-display text-[clamp(26px,3.5vw,38px)] font-bold tracking-tight text-fg">
            {t.home.exploreTitle}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {EXPLORE.map(({ key, to, Icon }) => {
              const item = t.home.explore[key];
              return (
                <SpotlightCard
                  key={key}
                  className="group rounded-lg border border-border bg-panel p-6 transition-colors hover:border-border-strong"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-lg border border-accent-border bg-accent-bg text-accent">
                    <Icon size={19} />
                  </span>
                  <h3 className="mt-4 flex items-center gap-1.5 font-display text-[18px] font-semibold text-fg">
                    {item.title}
                    <ArrowRight
                      size={15}
                      className="text-fg-3 transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-fg-2">
                    {item.desc}
                  </p>
                  <Link to={to} className="absolute inset-0" aria-label={item.title} />
                </SpotlightCard>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StatsSection() {
  const { t } = useLang();
  const stats: { value: number; suffix: string; label: string }[] = [
    { value: 4, suffix: "+", label: t.home.stats.years },
    { value: 10, suffix: "", label: t.home.stats.recipes },
    { value: 1, suffix: "", label: t.home.stats.game },
  ];
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <Reveal>
        <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="bg-panel px-6 py-8 text-center">
              <p className="font-display text-[40px] font-bold tracking-tight text-fg">
                <CountUp to={s.value} duration={1.6} />
                {s.suffix}
              </p>
              <p className="mt-1 text-[13px] uppercase tracking-wider text-fg-3">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function HomeCTA() {
  const { t } = useLang();
  return (
    <section className="relative overflow-hidden border-t border-border">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(620px 280px at 50% 50%, var(--hero-glow-1), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-2xl px-5 py-28 text-center">
        <Reveal>
          <h2 className="font-display text-[clamp(28px,4vw,44px)] font-bold tracking-tight text-fg">
            {t.home.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-fg-2">
            {t.home.ctaBody}
          </p>
          <Link
            to="/contact"
            className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-accent-2"
          >
            {t.common.getInTouch}
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export default function HomePage() {
  const { t } = useLang();
  return (
    <>
      <Hero />

      <section className="border-y border-border bg-bg-1 py-10">
        <div className="mx-auto max-w-6xl px-5">
          <p className="mb-5 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
            {t.home.techLabel}
          </p>
          <TechMarquee items={TECH} />
        </div>
      </section>

      <Highlights />
      <ExploreSection />
      <StatsSection />
      <HomeCTA />
    </>
  );
}
