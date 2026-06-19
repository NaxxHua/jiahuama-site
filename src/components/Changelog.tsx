import { useState } from "react";
import { useLang, useTx } from "@/i18n/LanguageContext";
import { changelog } from "@/data/changelog";

// 玩家向双语更新日志：左侧数轴，节点 = 小版本(0.1/0.2/0.3/0.4)，点开看里面每个 patch 的改动。
// 数据带 en/zh，跟随站点语言切换渲染（见 src/data/changelog.ts）。
export default function Changelog() {
  const { t } = useLang();
  const tx = useTx();
  const c = t.game.changelog;
  // 默认只展开最新的小版本，其余收起。
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    changelog.length ? { [changelog[0].minor]: true } : {}
  );

  const toggle = (minor: string) =>
    setOpen((o) => ({ ...o, [minor]: !o[minor] }));

  return (
    <section className="mx-auto mt-12 max-w-2xl border-t border-border pt-8">
      <h2 className="font-display text-[18px] font-semibold text-fg">{c.title}</h2>
      <p className="mt-1 text-[13px] text-fg-3">{c.subtitle}</p>

      <div className="relative mt-8 pl-9">
        {/* 数轴竖线 */}
        <span
          aria-hidden
          className="absolute bottom-2 left-[11px] top-2 w-px bg-border"
        />

        {changelog.map((mv) => {
          const isOpen = !!open[mv.minor];
          return (
            <div key={mv.minor} className="relative pb-7 last:pb-0">
              {/* 轴上的节点 */}
              <span
                aria-hidden
                className={`absolute left-[11px] top-[7px] h-[15px] w-[15px] -translate-x-1/2 rounded-full border-2 transition-colors ${
                  isOpen
                    ? "border-fg bg-fg"
                    : "border-border-strong bg-bg"
                }`}
              />

              <button
                type="button"
                onClick={() => toggle(mv.minor)}
                aria-expanded={isOpen}
                className="group flex w-full items-baseline gap-3 text-left"
              >
                <span className="font-display text-[20px] font-semibold leading-none text-fg">
                  {mv.minor}
                </span>
                <span className="font-display text-[14px] text-fg-2 transition-colors group-hover:text-fg">
                  {tx(mv.title)}
                </span>
                <span className="ml-auto flex items-center gap-2 text-[12px] text-fg-3">
                  {mv.span}
                  <svg
                    aria-hidden
                    viewBox="0 0 16 16"
                    className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-90" : ""}`}
                  >
                    <path
                      d="M6 4l4 4-4 4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>

              {isOpen && (
                <ol className="mt-4 flex flex-col gap-5">
                  {mv.patches.map((p) => (
                    <li key={p.version}>
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="rounded-md border border-border bg-bg-1 px-2 py-0.5 font-mono text-[12px] text-fg-2">
                          v{p.version}
                        </span>
                        <span className="font-display text-[14px] font-medium text-fg">
                          {tx(p.title)}
                        </span>
                        <span className="text-[12px] text-fg-3">{p.date}</span>
                      </div>
                      <ul className="mt-2 flex flex-col gap-1.5 pl-1">
                        {p.items.map((item, i) => (
                          <li
                            key={i}
                            className="flex gap-2 text-[13px] leading-relaxed text-fg-2"
                          >
                            <span
                              aria-hidden
                              className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-border-strong"
                            />
                            <span>{tx(item)}</span>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
