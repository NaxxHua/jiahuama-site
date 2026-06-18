import { useEffect, useRef, useState } from "react";
import PageHeader from "@/components/layout/PageHeader";
import { useLang } from "@/i18n/LanguageContext";

// ── 配置（你来改）──────────────────────────────────────────────
// 暗号：发给测试的朋友。注意这是“软门”——挡住路人即可，会看源码的人能绕过。
const ACCESS_CODE = "vat2026"; // ← 改成你想要的暗号
// 游戏托管地址（Cloudflare R2 公开 URL）。换桶/重传后若 URL 变了，改这里。
const GAME_URL = "https://pub-42f10204df9f47f59f17c37688c361f8.r2.dev/index.html";
const STORAGE_KEY = "biav-demo-unlocked";
// ──────────────────────────────────────────────────────────────

export default function GamePage() {
  const { t } = useLang();
  const g = t.game;
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 记住已解锁（本次浏览器），免得每次重输。
  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") setUnlocked(true);
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (code.trim().toLowerCase() === ACCESS_CODE.toLowerCase()) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setUnlocked(true);
    } else {
      setError(true);
      inputRef.current?.focus();
    }
  }

  if (unlocked) {
    return (
      <section className="mx-auto max-w-6xl px-5 py-8">
        <div className="mb-3 flex items-center justify-between">
          <h1 className="font-display text-[18px] font-semibold text-fg">{g.title}</h1>
          <a
            href={GAME_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-border px-3 py-1.5 text-[13px] text-fg-2 transition-colors hover:border-border-strong hover:text-fg"
          >
            {g.relaunch}
          </a>
        </div>
        <div className="relative w-full overflow-hidden rounded-xl border border-border bg-black" style={{ aspectRatio: "16 / 9" }}>
          <iframe
            src={GAME_URL}
            title={g.title}
            className="absolute inset-0 h-full w-full"
            allow="autoplay; fullscreen; gamepad; cross-origin-isolated"
            allowFullScreen
          />
        </div>
        <p className="mt-3 text-center text-[13px] text-fg-3">{g.hint}</p>
      </section>
    );
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
