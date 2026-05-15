import type { CSSProperties, ReactNode } from "react";
import { Crown, Swords } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { useLang, useTx } from "@/i18n/LanguageContext";
import { wowProfile, lolProfile } from "@/data/games";

function GameCard({
  color,
  children,
}: {
  color: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{ "--gc": color } as CSSProperties}
      className="group relative overflow-hidden rounded-xl border border-border bg-panel/70 p-6 backdrop-blur-md transition-[box-shadow,border-color] duration-300 hover:border-[color:var(--gc)] hover:shadow-[0_12px_50px_-14px_var(--gc)]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(320px 170px at 100% 0%, color-mix(in oklab, var(--gc) 26%, transparent), transparent 70%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-border-2 bg-bg-2 px-2.5 py-1 font-mono text-[12px] text-fg-1">
      {children}
    </span>
  );
}

function WowCard() {
  const { t } = useLang();
  const g = t.about.gaming;
  const w = wowProfile;

  return (
    <GameCard color={w.classColor}>
      <div className="flex items-center justify-between">
        <span
          className="font-mono text-[11px] uppercase tracking-[0.16em]"
          style={{ color: w.classColor }}
        >
          {w.game}
        </span>
        <Swords size={18} style={{ color: w.classColor }} />
      </div>

      <p className="mt-5 font-display text-[42px] font-bold leading-none text-fg">
        {g.wowTop}
      </p>
      <p className="mt-2 text-[13px] text-fg-2">{g.wowParse}</p>

      <div className="mt-5 border-t border-border pt-4">
        <p className="font-display text-[16px] font-semibold text-fg">
          {w.character}
        </p>
        <p className="mt-0.5 text-[13px] text-fg-1">
          {w.race} {w.class} · {w.spec}
        </p>
        <p className="mt-0.5 font-mono text-[12px] text-fg-3">
          {w.realm} · {w.region} · ⟨{w.guild}⟩
        </p>
      </div>

      <div className="mt-4 rounded-lg border border-border bg-bg-2 px-3.5 py-2.5">
        <p className="text-[13px] font-medium text-fg">
          {w.encounter} — {w.difficulty}
        </p>
        <p className="mt-0.5 text-[12px] text-fg-2">
          {w.raid} · {w.expansion}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Chip>
          {g.peakDps} {w.peakDps}
        </Chip>
        <Chip>
          {g.itemLevel} {w.itemLevel}
        </Chip>
      </div>
    </GameCard>
  );
}

function LolCard() {
  const { t } = useLang();
  const tx = useTx();
  const g = t.about.gaming;
  const l = lolProfile;

  return (
    <GameCard color={l.tierColor}>
      <div className="flex items-center justify-between">
        <span
          className="font-mono text-[11px] uppercase tracking-[0.16em]"
          style={{ color: l.tierColor }}
        >
          {l.game}
        </span>
        <Crown size={18} style={{ color: l.tierColor }} />
      </div>

      <div className="mt-5 flex items-end gap-2.5">
        <p className="font-display text-[42px] font-bold leading-none text-fg">
          {l.tier}
        </p>
        <p
          className="mb-1 font-mono text-[14px] font-semibold"
          style={{ color: l.tierColor }}
        >
          {l.lp} LP
        </p>
      </div>
      <p className="mt-2 text-[13px] text-fg-2">{g.rank}</p>

      <div className="mt-5 border-t border-border pt-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">
          {g.champions}
        </p>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {l.champions.map((c) => (
            <Chip key={c.en}>{tx(c)}</Chip>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">
          {g.roles}
        </p>
        <p className="mt-1.5 text-[14px] text-fg-1">
          {l.roles.map((r) => tx(r)).join(" · ")}
        </p>
      </div>
    </GameCard>
  );
}

export default function GamingSection() {
  const { t } = useLang();
  const g = t.about.gaming;

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <Reveal>
          <h2 className="font-display text-[clamp(22px,3vw,30px)] font-bold tracking-tight text-fg">
            {g.title}
          </h2>
          <p className="mt-2 text-[15px] text-fg-2">{g.sub}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <WowCard />
            <LolCard />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
