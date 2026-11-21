import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowUpRight,
  Brain,
  CreditCard,
  Gamepad2,
  GraduationCap,
  Target,
  type LucideIcon,
} from "lucide-react";
import { MatchCardDialog } from "@/components/matches/MatchCardDialog";
import { personalBestMatch } from "@/data/tableTennis";
import BorderGlow from "@/components/ui/BorderGlow";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Reveal from "@/components/ui/Reveal";
import { useLang } from "@/i18n/LanguageContext";

type HighlightKey =
  | "visa"
  | "game"
  | "psyspace"
  | "research"
  | "tabletennis";

interface HighlightDef {
  key: HighlightKey;
  Icon: LucideIcon;
  href: string;
  external: boolean;
  span: string;
}

const HIGHLIGHTS: HighlightDef[] = [
  {
    key: "visa",
    Icon: CreditCard,
    href: "https://design.visa.com",
    external: true,
    span: "md:col-span-2",
  },
  {
    key: "game",
    Icon: Gamepad2,
    href: "/portfolio",
    external: false,
    span: "md:col-span-1",
  },
  {
    key: "psyspace",
    Icon: Brain,
    href: "/portfolio",
    external: false,
    span: "md:col-span-1",
  },
  {
    key: "research",
    Icon: GraduationCap,
    href: "/portfolio",
    external: false,
    span: "md:col-span-1",
  },
  {
    key: "tabletennis",
    Icon: Target,
    href: "/about",
    external: false,
    span: "md:col-span-1",
  },
];

function HighlightCard({ def, onViewMatch }: { def: HighlightDef; onViewMatch: () => void }) {
  const { t } = useLang();
  const item = t.home.highlights[def.key];
  const { Icon } = def;

  return (
    <BorderGlow className={def.span}>
      <SpotlightCard className="group h-full rounded-lg border border-border bg-panel p-6 transition-colors hover:border-border-strong">
        <div className="flex h-full flex-col">
          <div className="flex items-start justify-between">
            <span className="grid h-10 w-10 place-items-center rounded-lg border border-accent-border bg-accent-bg text-accent">
              <Icon size={19} />
            </span>
            <ArrowUpRight
              size={17}
              className="text-fg-3 transition-colors group-hover:text-accent"
            />
          </div>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">
            {item.tag}
          </p>
          <h3 className="mt-1.5 font-display text-[18px] font-semibold tracking-tight text-fg">
            {item.title}
          </h3>
          <p className="mt-2 text-[14px] leading-relaxed text-fg-2">
            {item.desc}
          </p>
          {def.key === "tabletennis" && (
            <button
              type="button"
              aria-haspopup="dialog"
              className="group/print relative z-10 mt-3 flex w-fit items-center gap-3 rounded-md py-1 pr-2 text-left text-[13px] font-medium text-accent hover:text-accent-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
              onClick={(event) => {
                event.currentTarget.focus({ preventScroll: true });
                onViewMatch();
              }}
            >
              <img
                src={personalBestMatch.card}
                width={40}
                height={50}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-[50px] w-10 rounded-sm shadow-sm motion-safe:transition-transform motion-safe:group-hover/print:-rotate-3"
              />
              <span className="underline underline-offset-4">{t.about.facets.tabletennis.matchCard}</span>
            </button>
          )}
        </div>

        {def.external ? (
          <a
            href={def.href}
            target="_blank"
            rel="noreferrer noopener"
            className="absolute inset-0"
            aria-label={item.title}
          />
        ) : (
          <Link
            to={def.href}
            className="absolute inset-0"
            aria-label={item.title}
          />
        )}
      </SpotlightCard>
    </BorderGlow>
  );
}

export default function Highlights() {
  const { t } = useLang();
  const [matchOpen, setMatchOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { hash } = useLocation();

  // A direct link can arrive before the lazy homepage has rendered its anchor.
  useEffect(() => {
    if (hash === "#highlights") sectionRef.current?.scrollIntoView({ block: "start" });
  }, [hash]);

  return (
    <section ref={sectionRef} id="highlights" aria-labelledby="highlights-title" tabIndex={-1} className="mx-auto max-w-6xl scroll-mt-16 px-5 py-24">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="highlights-title" className="font-display text-[clamp(26px,3.5vw,38px)] font-bold tracking-tight text-fg">
            {t.home.highlightsTitle}
          </h2>
          <p className="mt-3 text-[15px] text-fg-2">{t.home.highlightsSub}</p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {HIGHLIGHTS.map((def) => (
            <HighlightCard key={def.key} def={def} onViewMatch={() => setMatchOpen(true)} />
          ))}
        </div>
      </Reveal>
      <MatchCardDialog open={matchOpen} onClose={() => setMatchOpen(false)} />
    </section>
  );
}
