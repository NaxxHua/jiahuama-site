import type { CSSProperties } from "react";
import { Drama } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { useLang } from "@/i18n/LanguageContext";

/** Warm stage-spotlight colour. */
const STAGE = "#e0a43c";

const PRODUCTIONS = [
  { key: "rhinoceros", poster: "/theater-rhinoceros.jpg" },
  { key: "mumble", poster: "/theater-mumble.jpg" },
] as const;

export default function TheaterSection() {
  const { t, lang } = useLang();
  const th = t.about.theater;

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <Reveal>
          <h2 className="font-display text-[clamp(22px,3vw,30px)] font-bold tracking-tight text-fg">
            {th.title}
          </h2>
          <p className="mt-2 text-[15px] text-fg-2">{th.sub}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            style={{ "--stage": STAGE } as CSSProperties}
            className="relative mt-10 overflow-hidden rounded-xl border border-border bg-panel/70 backdrop-blur-md"
          >
            {/* Warm spotlight glow */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(560px 220px at 50% 0%, color-mix(in oklab, var(--stage) 20%, transparent), transparent 70%)",
              }}
            />

            {/* Playbill header */}
            <div
              className="relative border-b border-border px-7 py-4"
              style={{
                background:
                  "color-mix(in oklab, var(--stage) 9%, transparent)",
              }}
            >
              <p
                className="font-mono text-[11px] uppercase tracking-[0.16em]"
                style={{ color: STAGE }}
              >
                {th.society}
              </p>
              <p className="mt-0.5 text-[13px] text-fg-2">{th.role}</p>
            </div>

            {/* Production credits */}
            {PRODUCTIONS.map(({ key, poster }) => {
              const p = th[key];
              const primary = lang === "zh" ? p.zh : p.en;
              const secondary = lang === "zh" ? p.en : p.zh;
              return (
                <div
                  key={key}
                  className="relative overflow-hidden border-b border-border last:border-b-0"
                >
                  <img
                    src={poster}
                    alt=""
                    aria-hidden="true"
                    onError={(e) => {
                      e.currentTarget.style.visibility = "hidden";
                    }}
                    className="pointer-events-none absolute right-0 top-0 h-full w-2/5 object-cover opacity-[0.14]"
                    style={{
                      maskImage:
                        "linear-gradient(to right, transparent, #000 85%)",
                      WebkitMaskImage:
                        "linear-gradient(to right, transparent, #000 85%)",
                    }}
                  />
                  <div className="relative flex items-start gap-4 px-7 py-6">
                    <span
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border"
                      style={{
                        color: STAGE,
                        borderColor:
                          "color-mix(in oklab, var(--stage) 30%, transparent)",
                        background:
                          "color-mix(in oklab, var(--stage) 10%, transparent)",
                      }}
                    >
                      <Drama size={19} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-[19px] font-semibold tracking-tight text-fg">
                        {primary}
                      </h3>
                      <p className="mt-0.5 text-[13px] text-fg-3">
                        {secondary}
                      </p>
                      <p className="mt-1 text-[12.5px] text-fg-3">
                        {th.directorLabel}: {p.director}
                      </p>
                      <p className="mt-2 text-[13px] italic leading-relaxed text-fg-2">
                        {p.blurb}
                      </p>
                      <p
                        className="mt-2 font-mono text-[12.5px]"
                        style={{ color: STAGE }}
                      >
                        {p.credit}
                      </p>
                      {p.note && (
                        <p className="mt-1 text-[13px] leading-relaxed text-fg-2">
                          {p.note}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
