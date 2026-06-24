import { useLang } from "@/i18n/LanguageContext";
import { trackEvent } from "@/lib/analytics";

// 个人站不再托管试玩 / 暗号门：/game 只问一句，把人送到工作室站的试玩页
// （邀请码 gate 现在在 mucolumbae.com/game 那边）。
const PLAY_PAGE = "https://mucolumbae.com/game";

const COPY = {
  zh: { q: "你是来试玩的嘛？", sub: "试玩搬到工作室站了。", cta: "去试玩 →" },
  en: { q: "Here to try the demo?", sub: "The demo moved to our studio site.", cta: "Play →" },
};

export default function GamePage() {
  const { lang } = useLang();
  const c = COPY[lang];
  return (
    <section className="mx-auto flex max-w-sm flex-col items-center gap-6 px-5 py-28 text-center">
      <h1 className="font-display text-[24px] font-semibold text-fg">{c.q}</h1>
      <p className="text-[14px] text-fg-3">{c.sub}</p>
      <a
        href={PLAY_PAGE}
        onClick={() => trackEvent("game_launch")}
        className="rounded-md bg-fg px-6 py-3 text-[15px] font-medium text-bg transition-opacity hover:opacity-90"
      >
        {c.cta}
      </a>
    </section>
  );
}
