import { useLang, useTx } from "@/i18n/LanguageContext";
import { changelog } from "@/data/changelog";

// 玩家向双语更新日志：跟随站点语言切换渲染（数据带 en/zh，见 src/data/changelog.ts）。
export default function Changelog() {
  const { t } = useLang();
  const tx = useTx();
  const c = t.game.changelog;

  return (
    <section className="mx-auto mt-12 max-w-2xl border-t border-border pt-8">
      <h2 className="font-display text-[18px] font-semibold text-fg">{c.title}</h2>
      <p className="mt-1 text-[13px] text-fg-3">{c.subtitle}</p>

      <ol className="mt-6 flex flex-col gap-6">
        {changelog.map((entry) => (
          <li key={entry.version} className="relative">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="rounded-md border border-border bg-bg-1 px-2 py-0.5 font-mono text-[12px] text-fg-2">
                v{entry.version}
              </span>
              <span className="font-display text-[15px] font-medium text-fg">
                {tx(entry.title)}
              </span>
              <span className="text-[12px] text-fg-3">{entry.date}</span>
            </div>
            <ul className="mt-2 flex flex-col gap-1.5 pl-1">
              {entry.items.map((item, i) => (
                <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-fg-2">
                  <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-border-strong" />
                  <span>{tx(item)}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
