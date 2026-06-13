import type { CSSProperties, ReactNode } from "react";
import { Crown, Swords } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { useLang, useTx } from "@/i18n/LanguageContext";
import { wowProfile, lolProfile } from "@/data/games";

function GameCard({
  color,
  image,
  children,
}: {
  color: string;
  /** Optional faded character art bled into the right of the card. */
  image?: string;
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
      {image && (
        <img
          src={image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.currentTarget.style.visibility = "hidden";
          }}
          className="pointer-events-none absolute right-0 top-0 h-full w-3/5 object-cover object-top opacity-[0.16]"
          style={{
            maskImage: "linear-gradient(to right, transparent, #000 78%)",
            WebkitMaskImage: "linear-gradient(to right, transparent, #000 78%)",
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
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
  const tx = useTx();
  const g = t.about.gaming;
  const w = wowProfile;

  return (
    <GameCard color={w.classColor} image={w.image}>
      <div className="flex items-center justify-between">
        <span
          className="font-mono text-[11px] uppercase tracking-[0.16em]"
          style={{ color: w.classColor }}
        >
          {tx(w.game)}
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
          {tx(w.race)} {tx(w.class)} · {tx(w.spec)}
        </p>
        <p className="mt-0.5 font-mono text-[12px] text-fg-3">
          {tx(w.realm)} · {tx(w.region)} · ⟨{w.guild}⟩
        </p>
      </div>

      <div className="mt-4 inline-block rounded-lg border border-border bg-bg-2 px-3.5 py-2.5">
        <p className="text-[13px] font-medium text-fg">
          {tx(w.encounter)} — {tx(w.difficulty)}
        </p>
        <p className="mt-0.5 text-[12px] text-fg-2">
          {tx(w.raid)} · {tx(w.expansion)}
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
          {tx(l.game)}
        </span>
        <Crown size={18} style={{ color: l.tierColor }} />
      </div>

      <div className="mt-5 flex items-end gap-2.5">
        <p className="font-display text-[42px] font-bold leading-none text-fg">
          {tx(l.tier)}
        </p>
        <p
          className="mb-1 font-mono text-[14px] font-semibold"
          style={{ color: l.tierColor }}
        >
          {l.lp} LP
        </p>
      </div>
      <p className="mt-2 text-[13px] text-fg-2">{g.rank}</p>

      {/* Champion skins — hover a panel to expand it. */}
      <div className="mt-5 border-t border-border pt-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">
          {g.champions}
        </p>
        <div className="mt-3 flex h-44 gap-1.5">
          {l.champions.map((c) => (
            <div
              key={c.name.en}
              className="group/champ relative basis-0 grow overflow-hidden rounded-md transition-[flex-grow] duration-500 ease-out hover:grow-[5]"
            >
              <img
                src={c.image}
                alt={tx(c.name)}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-[center_22%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-2.5">
                <p className="truncate font-display text-[14px] font-semibold text-white">
                  {tx(c.name)}
                </p>
                <p className="mt-0.5 truncate font-mono text-[10px] text-white/0 transition-colors duration-300 group-hover/champ:text-white/75">
                  {tx(c.skin)}
                </p>
              </div>
            </div>
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

/**
 * Competitive game profiles. Standalone it renders its own section + heading;
 * pass `asSubsection` to drop the wrapper so it can sit under another heading
 * (e.g. the "Things I love" section).
 */
export default function GamingSection({
  asSubsection = false,
}: {
  asSubsection?: boolean;
}) {
  const { t } = useLang();
  const g = t.about.gaming;

  const cards = (
    <Reveal delay={asSubsection ? 0 : 0.1}>
      <div
        className={`${asSubsection ? "mt-5" : "mt-10"} grid gap-4 sm:grid-cols-2`}
      >
        <WowCard />
        <LolCard />
      </div>
    </Reveal>
  );

  if (asSubsection) return cards;

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <Reveal>
          <h2 className="font-display text-[clamp(22px,3vw,30px)] font-bold tracking-tight text-fg">
            {g.title}
          </h2>
          <p className="mt-2 text-[15px] text-fg-2">{g.sub}</p>
        </Reveal>
        {cards}
      </div>
    </section>
  );
}
