import { useEffect, useState } from "react";
import { Loader2, PenLine } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import StarButton from "@/components/ui/StarButton";
import Reveal from "@/components/ui/Reveal";
import EntryCard from "@/components/guestbook/EntryCard";
import { useLang } from "@/i18n/LanguageContext";
import { isSupabaseConfigured } from "@/lib/supabase";
import {
  addEntry,
  fetchEntries,
  MESSAGE_MAX,
  NAME_MAX,
  type GuestbookEntry,
} from "@/lib/guestbook";

type Status = "loading" | "ready" | "error";

const fieldClass =
  "w-full rounded-lg border border-border-2 bg-bg px-3.5 py-2.5 text-[14px] text-fg placeholder:text-fg-3 outline-none transition-colors focus:border-accent";

export default function GuestbookPage() {
  const { t } = useLang();
  const g = t.guestbook;

  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    let active = true;
    fetchEntries()
      .then((data) => {
        if (!active) return;
        setEntries(data);
        setStatus("ready");
      })
      .catch(() => active && setStatus("error"));
    return () => {
      active = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setFormError(g.nameRequired);
      return;
    }
    setFormError("");
    setSubmitting(true);
    try {
      const entry = await addEntry(name, message);
      setEntries((prev) => [entry, ...prev]);
      setName("");
      setMessage("");
    } catch {
      setFormError(g.error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader eyebrow={g.eyebrow} title={g.title} intro={g.intro} />

      <div className="mx-auto max-w-2xl px-5 py-16">
        {/* Sign form */}
        <Reveal>
          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-border bg-panel/70 p-6 backdrop-blur-md"
          >
            <div className="flex flex-col gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={g.namePlaceholder}
                maxLength={NAME_MAX}
                aria-label={g.namePlaceholder}
                className={fieldClass}
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={g.messagePlaceholder}
                maxLength={MESSAGE_MAX}
                rows={4}
                aria-label={g.messagePlaceholder}
                className={`${fieldClass} resize-y`}
              />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-[11.5px] text-fg-3">
                {message.length}/{MESSAGE_MAX}
              </span>
              <StarButton type="submit" disabled={submitting}>
                <PenLine size={15} />
                {submitting ? g.submitting : g.submit}
              </StarButton>
            </div>
            {formError && (
              <p className="mt-3 text-[13px] text-danger">{formError}</p>
            )}
            {!isSupabaseConfigured && (
              <p className="mt-3 text-[12px] text-fg-3">{g.demoNote}</p>
            )}
          </form>
        </Reveal>

        {/* Entries */}
        <div className="mt-12">
          <h2 className="font-display text-[18px] font-bold tracking-tight text-fg">
            {g.entriesTitle}
            {status === "ready" && entries.length > 0 && (
              <span className="ml-2 font-mono text-[13px] font-normal text-fg-3">
                {entries.length}
              </span>
            )}
          </h2>

          {status === "loading" && (
            <div className="mt-8 flex items-center justify-center gap-2 text-[14px] text-fg-2">
              <Loader2 size={16} className="animate-spin" />
              {g.loading}
            </div>
          )}

          {status === "error" && (
            <p className="mt-8 text-center text-[14px] text-danger">{g.error}</p>
          )}

          {status === "ready" && entries.length === 0 && (
            <p className="mt-8 text-center text-[14px] text-fg-2">{g.empty}</p>
          )}

          {status === "ready" && entries.length > 0 && (
            <div className="mt-5 flex flex-col gap-3">
              {entries.map((entry, i) => (
                <Reveal key={entry.id} delay={Math.min(i, 6) * 0.04}>
                  <EntryCard entry={entry} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
