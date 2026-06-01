/**
 * One-time backfill of guestbook translations.
 *
 * For every row, detects the message's language and fetches a translation
 * into the other site language (via MyMemory — free, key-less), then writes
 * `lang` + `message_translated` back. Rows that already have both are skipped,
 * so this is safe to re-run.
 *
 * The guestbook table's RLS only allows public SELECT/INSERT, not UPDATE, so
 * this needs the service-role key (it bypasses RLS). Add it to .env LOCALLY —
 * it must NEVER be committed or VITE_-prefixed (it would leak into the bundle):
 *
 *   VITE_SUPABASE_URL=...           # already set for the app
 *   SUPABASE_SERVICE_ROLE_KEY=...   # Project Settings → API → service_role
 *   MYMEMORY_EMAIL=you@example.com  # optional — raises the free quota
 *
 * Run with:  npm run backfill:guestbook
 */
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { loadEnv } from "vite";
import { createClient } from "@supabase/supabase-js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const env = { ...loadEnv("production", root, ""), ...process.env };

const URL = env.VITE_SUPABASE_URL;
const KEY = env.SUPABASE_SERVICE_ROLE_KEY;
const EMAIL = env.MYMEMORY_EMAIL;

if (!URL || !KEY) {
  console.error(
    "[backfill] Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env"
  );
  process.exit(1);
}

const MM_CODE = { en: "en", zh: "zh-CN" };
const detectLang = (text) => (/[㐀-鿿]/.test(text) ? "zh" : "en");
const decode = (s) =>
  s
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function translate(text, from, to) {
  if (from === to || !text.trim()) return null;
  const url =
    "https://api.mymemory.translated.net/get?q=" +
    encodeURIComponent(text) +
    `&langpair=${MM_CODE[from]}|${MM_CODE[to]}` +
    (EMAIL ? `&de=${encodeURIComponent(EMAIL)}` : "");
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    if (Number(data?.responseStatus) !== 200) return null;
    const out = data?.responseData?.translatedText;
    return typeof out === "string" && out.trim() ? decode(out) : null;
  } catch {
    return null;
  }
}

const supabase = createClient(URL, KEY, {
  auth: { persistSession: false },
});

const { data: rows, error } = await supabase
  .from("guestbook")
  .select("id, message, lang, message_translated");

if (error) {
  console.error("[backfill] Fetch failed:", error.message);
  process.exit(1);
}

let updated = 0;
let skipped = 0;

for (const row of rows ?? []) {
  const lang = detectLang(row.message);
  const langOk = row.lang === lang;
  const hasTranslation = !!row.message_translated;
  if (langOk && hasTranslation) {
    skipped++;
    continue;
  }

  const translated = await translate(row.message, lang, lang === "en" ? "zh" : "en");
  const { error: upErr } = await supabase
    .from("guestbook")
    .update({ lang, message_translated: translated })
    .eq("id", row.id);

  if (upErr) {
    console.error(`[backfill] Row ${row.id} update failed:`, upErr.message);
  } else {
    updated++;
    console.log(
      `[backfill] Row ${row.id}: ${lang} -> ${
        translated ? "translated" : "no translation"
      }`
    );
  }
  await sleep(1200); // be gentle with the free translation quota
}

console.log(`[backfill] Done. ${updated} updated, ${skipped} already complete.`);
