import { useEffect, useRef, useState } from "react";
import PageHeader from "@/components/layout/PageHeader";
import { useLang } from "@/i18n/LanguageContext";
import { trackEvent } from "@/lib/analytics";

// ── 配置（你来改）──────────────────────────────────────────────
// 暗号：软门（挡住路人即可，会看源码的人能绕过）。
const ACCESS_CODE = "vat2026";
// 通过暗号后跳转的目标。现在 = 工作室站直链游戏 play.mucolumbae.com（R2 biav-demo 桶，发版即更新）。
// 注：mucolumbae 站上更完整的游戏页 owner 还在写；写好后把这里换成那个页面的地址即可。
const PLAY_URL = "https://play.mucolumbae.com/";
const STORAGE_KEY = "biav-demo-unlocked";
// ──────────────────────────────────────────────────────────────

function go() {
  trackEvent("game_launch");
  window.location.replace(PLAY_URL);
}

export default function GamePage() {
  const { t } = useLang();
  const g = t.game;
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 本会话已解锁过 → 直接跳转，免得每次重输暗号。
  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") go();
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (code.trim().toLowerCase() === ACCESS_CODE.toLowerCase()) {
      trackEvent("game_unlock");
      sessionStorage.setItem(STORAGE_KEY, "1");
      go(); // 暗号通过 → 跳转到 play.mucolumbae.com
    } else {
      trackEvent("game_unlock_failed");
      setError(true);
      inputRef.current?.focus();
    }
  }

  return (
    <>
      <PageHeader eyebrow={g.eyebrow} title={g.title} intro={g.intro} />
      <section className="mx-auto max-w-sm px-5 py-16">
        <form onSubmit={submit} className="flex flex-col gap-4">
          <label className="text-[14px] font-medium text-fg-2" htmlFor="game-code">
            {g.codeLabel}
          </label>
          <input
            id="game-code"
            ref={inputRef}
            type="text"
            autoComplete="off"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError(false);
            }}
            placeholder={g.placeholder}
            className="rounded-md border border-border bg-bg-1 px-4 py-3 text-[15px] text-fg outline-none transition-colors focus:border-border-strong"
          />
          {error && <p className="text-[13px] text-red-500">{g.wrong}</p>}
          <button
            type="submit"
            className="rounded-md bg-fg px-4 py-3 text-[15px] font-medium text-bg transition-opacity hover:opacity-90"
          >
            {g.enter}
          </button>
          <p className="text-center text-[12px] text-fg-3">{g.hint}</p>
        </form>
      </section>
    </>
  );
}
