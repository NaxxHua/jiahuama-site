import { useEffect, useRef, useState } from "react";
import PageHeader from "@/components/layout/PageHeader";
import Changelog from "@/components/Changelog";
import { useLang } from "@/i18n/LanguageContext";
import { trackEvent } from "@/lib/analytics";

// ── 配置（你来改）──────────────────────────────────────────────
// 暗号：发给测试的朋友。注意这是“软门”——挡住路人即可，会看源码的人能绕过。
const ACCESS_CODE = "vat2026"; // ← 改成你想要的暗号
// 游戏托管地址（Cloudflare R2 公开 URL）。换桶/重传后若 URL 变了，改这里。
const GAME_URL_BASE = "https://pub-42f10204df9f47f59f17c37688c361f8.r2.dev/index.html";
// 缓存破坏：每次发新版游戏后把这个版本号同步成游戏 project.godot 的版本（发版 checklist 一步）。
// iframe src 带上 ?v=… → 改版后浏览器一定重新拉 index.html，配合 R2 的 no-cache，pck/wasm 也跟着刷，朋友普通刷新即玩最新版。
const GAME_VERSION = "0.13.9";
const GAME_URL = `${GAME_URL_BASE}?v=${GAME_VERSION}`;
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

  // Web-side funnel: someone reached the playable view (fresh unlock or a
  // remembered session). In-game events are tracked separately by the game.
  useEffect(() => {
    if (unlocked) trackEvent("game_launch");
  }, [unlocked]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (code.trim().toLowerCase() === ACCESS_CODE.toLowerCase()) {
      trackEvent("game_unlock");
      sessionStorage.setItem(STORAGE_KEY, "1");
      setUnlocked(true);
    } else {
      trackEvent("game_unlock_failed");
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
            onClick={() => trackEvent("game_relaunch")}
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
        <div className="mt-6 rounded-xl border border-border bg-bg-1 p-6 text-center">
          <h2 className="font-display text-[16px] font-semibold text-fg">{g.feedback.title}</h2>
          <p className="mx-auto mt-1 max-w-md text-[13px] text-fg-3">{g.feedback.intro}</p>
          <a
            href="https://discord.gg/KbzvgNQM"
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent("discord_click")}
            className="mt-4 inline-block rounded-md bg-fg px-4 py-2.5 text-[14px] font-medium text-bg transition-opacity hover:opacity-90"
          >
            {g.feedback.cta}
          </a>
        </div>
        <Changelog />
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
