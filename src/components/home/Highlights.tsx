import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Brain,
  CreditCard,
  Gamepad2,
  GraduationCap,
  Target,
  type LucideIcon,
} from "lucide-react";
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

function HighlightCard({ def }: { def: HighlightDef }) {
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

  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[clamp(26px,3.5vw,38px)] font-bold tracking-tight text-fg">
            {t.home.highlightsTitle}
          </h2>
          <p className="mt-3 text-[15px] text-fg-2">{t.home.highlightsSub}</p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {HIGHLIGHTS.map((def) => (
            <HighlightCard key={def.key} def={def} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
