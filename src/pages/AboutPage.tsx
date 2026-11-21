import { Link } from "react-router-dom";
import { Gamepad2, Martini } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import LovesSection from "@/components/about/LovesSection";
import TableTennisRecord from "@/components/about/TableTennisRecord";
import StarButton from "@/components/ui/StarButton";
import Reveal from "@/components/ui/Reveal";
import { useLang } from "@/i18n/LanguageContext";

const FACETS = [
  { key: "game", Icon: Gamepad2, to: "/game" },
  { key: "bar", Icon: Martini, to: "/recipes" },
] as const;

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

      <section className="border-t border-border" aria-labelledby="off-the-clock">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <Reveal>
            <h2 id="off-the-clock" className="font-display text-[clamp(24px,3vw,34px)] font-bold tracking-tight text-fg">
              {a.offTitle}
            </h2>
          </Reveal>
          <TableTennisRecord />
          <Reveal>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-14">
              {FACETS.map(({ key, Icon, to }) => {
                const facet = a.facets[key];
                return (
                  <article key={key}>
                    <h3 className="flex items-center gap-3 font-display text-[19px] font-semibold text-fg">
                      <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                      <Link to={to} className="underline decoration-border-strong underline-offset-[5px] hover:decoration-current">{facet.title}</Link>
                    </h3>
                    <p className="mt-2 max-w-prose text-base leading-relaxed text-fg-1">
                      {facet.desc}
                    </p>
                  </article>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <LovesSection />

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
