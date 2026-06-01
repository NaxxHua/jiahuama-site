import { useState } from "react";
import { Languages } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { useLang } from "@/i18n/LanguageContext";
import type { GuestbookEntry } from "@/lib/guestbook";

export default function EntryCard({ entry }: { entry: GuestbookEntry }) {
  const { lang, t } = useLang();
  const g = t.guestbook;

  // A translation is available only when the message isn't already in the
  // reader's language. Default to showing it, with a toggle back to the original.
  const hasTranslation = entry.lang !== lang && !!entry.messageTranslated;
  const [showOriginal, setShowOriginal] = useState(false);
  const showingTranslation = hasTranslation && !showOriginal;
  const body = showingTranslation ? entry.messageTranslated! : entry.message;

  const initial = entry.name.trim().charAt(0).toUpperCase() || "?";
  const date = new Date(entry.created_at).toLocaleDateString(
    lang === "zh" ? "zh-CN" : "en-US",
    { year: "numeric", month: "short", day: "numeric" }
  );

  return (
    <SpotlightCard className="rounded-lg border border-border bg-panel p-5 transition-colors hover:border-border-strong">
      <div className="flex items-start gap-3.5">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-accent-border bg-accent-bg font-display text-[15px] font-semibold text-accent">
          {initial}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <span className="truncate font-display text-[15px] font-semibold text-fg">
              {entry.name}
            </span>
            <span className="shrink-0 font-mono text-[11.5px] text-fg-3">
              {date}
            </span>
          </div>
          <p className="mt-1.5 whitespace-pre-wrap break-words text-[14px] leading-relaxed text-fg-1">
            {body}
          </p>
          {hasTranslation && (
            <button
              type="button"
              onClick={() => setShowOriginal((v) => !v)}
              className="mt-2 inline-flex items-center gap-1.5 font-mono text-[11.5px] text-fg-3 transition-colors hover:text-accent"
            >
              <Languages size={12} />
              {showingTranslation ? g.viewOriginal : g.viewTranslation}
            </button>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
}
