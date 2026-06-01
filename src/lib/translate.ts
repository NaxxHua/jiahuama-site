import type { Lang } from "@/i18n/translations";

/** MyMemory language codes for each site language. */
const MM_CODE: Record<Lang, string> = { en: "en", zh: "zh-CN" };

/**
 * Heuristic source-language detection: any CJK character means the text
 * is Chinese, otherwise English. Good enough for short guestbook messages.
 */
export function detectLang(text: string): Lang {
  return /[㐀-鿿]/.test(text) ? "zh" : "en";
}

/** Decode the handful of HTML entities MyMemory occasionally returns. */
function decodeEntities(s: string): string {
  return s
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

/**
 * Translate `text` from one site language to the other via MyMemory — a
 * free, key-less, CORS-enabled service. Returns the translated string, or
 * `null` when the languages match, the text is empty, or the request fails;
 * callers fall back to showing the original message.
 */
export async function translate(
  text: string,
  from: Lang,
  to: Lang
): Promise<string | null> {
  if (from === to || !text.trim()) return null;

  const url =
    "https://api.mymemory.translated.net/get?q=" +
    encodeURIComponent(text) +
    `&langpair=${MM_CODE[from]}|${MM_CODE[to]}`;

  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    if (Number(data?.responseStatus) !== 200) return null;
    const translated = data?.responseData?.translatedText;
    if (typeof translated !== "string" || !translated.trim()) return null;
    return decodeEntities(translated);
  } catch {
    return null;
  }
}
