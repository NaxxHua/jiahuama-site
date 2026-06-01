import { supabase } from "./supabase";
import type { Lang } from "@/i18n/translations";

/**
 * Heuristic source-language detection: any CJK character means the text
 * is Chinese, otherwise English. Good enough for short guestbook messages.
 */
export function detectLang(text: string): Lang {
  return /[㐀-鿿]/.test(text) ? "zh" : "en";
}

/**
 * Translate `text` from one site language to the other via the `translate`
 * Supabase Edge Function (which calls Claude server-side — the API key never
 * reaches the client). Returns the translated string, or `null` when the
 * languages match, the text is empty, Supabase isn't configured, or the
 * request fails; callers fall back to showing the original message.
 */
export async function translate(
  text: string,
  from: Lang,
  to: Lang
): Promise<string | null> {
  if (from === to || !text.trim() || !supabase) return null;

  try {
    const { data, error } = await supabase.functions.invoke("translate", {
      body: { text, from, to },
    });
    if (error) return null;
    const translated = (data as { translated?: string } | null)?.translated;
    return typeof translated === "string" && translated.trim()
      ? translated
      : null;
  } catch {
    return null;
  }
}
