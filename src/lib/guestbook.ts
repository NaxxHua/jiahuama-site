import { supabase } from "./supabase";

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

export const NAME_MAX = 40;
export const MESSAGE_MAX = 500;

const LS_KEY = "jiahuama:guestbook";

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
      .select("id, name, message, created_at")
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) throw error;
    return (data ?? []).map((d) => ({
      id: String(d.id),
      name: d.name,
      message: d.message,
      created_at: d.created_at,
    }));
  }
  return readLocal();
}

/** Append a new entry. Name/message are trimmed and length-capped. */
export async function addEntry(
  name: string,
  message: string
): Promise<GuestbookEntry> {
  const cleanName = name.trim().slice(0, NAME_MAX);
  const cleanMessage = message.trim().slice(0, MESSAGE_MAX);

  if (supabase) {
    const { data, error } = await supabase
      .from("guestbook")
      .insert({ name: cleanName, message: cleanMessage })
      .select("id, name, message, created_at")
      .single();
    if (error) throw error;
    return {
      id: String(data.id),
      name: data.name,
      message: data.message,
      created_at: data.created_at,
    };
  }

  const entry: GuestbookEntry = {
    id: crypto.randomUUID(),
    name: cleanName,
    message: cleanMessage,
    created_at: new Date().toISOString(),
  };
  writeLocal([entry, ...readLocal()]);
  return entry;
}
