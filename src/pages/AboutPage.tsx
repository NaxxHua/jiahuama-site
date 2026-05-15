import { Gamepad2, Martini, Target, type LucideIcon } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import SpotlightCard from "@/components/ui/SpotlightCard";
import StarButton from "@/components/ui/StarButton";
import Reveal from "@/components/ui/Reveal";
import { useLang } from "@/i18n/LanguageContext";

const FACETS: { key: "game" | "tabletennis" | "bar"; Icon: LucideIcon }[] = [
  { key: "game", Icon: Gamepad2 },
  { key: "tabletennis", Icon: Target },
  { key: "bar", Icon: Martini },
];

export default function AboutPage() {
  const { t } = useLang();
  const a = t.about;

  return (
    <>
      <PageHeader eyebrow={a.eyebrow} title={a.title} intro={a.intro} />

      <section className="mx-auto max-w-2xl px-5 py-20">
        <Reveal>
          <h2 className="font-display text-[clamp(22px,3vw,30px)] font-bold tracking-tight text-fg">
            {a.journeyTitle}
          </h2>
        </Reveal>
        <div className="mt-6 flex flex-col gap-5">
          {a.journey.map((para, i) => (
            <Reveal key={i} delay={0.05 * i}>
              <p className="text-[15.5px] leading-[1.75] text-fg-1">{para}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-bg-1">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <Reveal>
            <h2 className="font-display text-[clamp(22px,3vw,30px)] font-bold tracking-tight text-fg">
              {a.offTitle}
            </h2>
            <p className="mt-2 text-[15px] text-fg-2">{a.offSub}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {FACETS.map(({ key, Icon }) => {
                const facet = a.facets[key];
                return (
                  <SpotlightCard
                    key={key}
                    className="rounded-lg border border-border bg-panel p-6 transition-colors hover:border-border-strong"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-lg border border-accent-border bg-accent-bg text-accent">
                      <Icon size={19} />
                    </span>
                    <h3 className="mt-4 font-display text-[17px] font-semibold text-fg">
                      {facet.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-fg-2">
                      {facet.desc}
                    </p>
                  </SpotlightCard>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-2xl px-5 py-20 text-center">
          <Reveal>
            <p className="font-display text-[clamp(20px,2.6vw,26px)] font-semibold tracking-tight text-fg">
              {a.ctaLine}
            </p>
            <div className="mt-6 flex justify-center">
              <StarButton to="/portfolio">{a.ctaWork}</StarButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
