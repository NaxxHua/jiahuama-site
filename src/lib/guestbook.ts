import { supabase } from "./supabase";
import { detectLang, translate } from "./translate";
import type { Lang } from "@/i18n/translations";

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  /** Source language of `message`. */
  lang: Lang;
  /** `message` rendered in the other site language, or null if unavailable. */
  messageTranslated: string | null;
  created_at: string;
}

export const NAME_MAX = 40;
export const MESSAGE_MAX = 500;

const SELECT_COLS = "id, name, message, lang, message_translated, created_at";

const LS_KEY = "jiahuama:guestbook";

type Row = {
  id: string | number;
  name: string;
  message: string;
  lang?: string | null;
  message_translated?: string | null;
  created_at: string;
};

function toEntry(d: Row): GuestbookEntry {
  return {
    id: String(d.id),
    name: d.name,
    message: d.message,
    lang: d.lang === "zh" ? "zh" : "en",
    messageTranslated: d.message_translated ?? null,
    created_at: d.created_at,
  };
}

function readLocal(): GuestbookEntry[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as GuestbookEntry[]) : [];
  } catch {
    return [];
  }
}

function writeLocal(entries: GuestbookEntry[]) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(entries));
  } catch {
    /* storage full or unavailable — entry still shows for this session */
  }
}

/** Most-recent-first list of guestbook entries. */
export async function fetchEntries(): Promise<GuestbookEntry[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from("guestbook")
      .select(SELECT_COLS)
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) throw error;
    return (data ?? []).map(toEntry);
  }
  return readLocal();
}

/**
 * Append a new entry. Name/message are trimmed and length-capped, the
 * message's language is detected, and a translation into the other site
 * language is fetched and stored alongside it so it can be shown instantly.
 */
export async function addEntry(
  name: string,
  message: string
): Promise<GuestbookEntry> {
  const cleanName = name.trim().slice(0, NAME_MAX);
  const cleanMessage = message.trim().slice(0, MESSAGE_MAX);
  const lang = detectLang(cleanMessage);
  const messageTranslated = await translate(
    cleanMessage,
    lang,
    lang === "en" ? "zh" : "en"
  );

  if (supabase) {
    const { data, error } = await supabase
      .from("guestbook")
      .insert({
        name: cleanName,
        message: cleanMessage,
        lang,
        message_translated: messageTranslated,
      })
      .select(SELECT_COLS)
      .single();
    if (error) throw error;
    return toEntry(data as Row);
  }

  const entry: GuestbookEntry = {
    id: crypto.randomUUID(),
    name: cleanName,
    message: cleanMessage,
    lang,
    messageTranslated,
    created_at: new Date().toISOString(),
  };
  writeLocal([entry, ...readLocal()]);
  return entry;
}
