/**
 * One-time backfill of guestbook translations.
 *
 * For every row, detects the message's language and translates it into the
 * other site language by calling the `translate` Supabase Edge Function (which
 * runs Claude server-side), then writes `lang` + `message_translated` back.
 * Rows that already have both are skipped, so this is safe to re-run.
 *
 * The guestbook table's RLS only allows public SELECT/INSERT, not UPDATE, so
 * this needs the service-role key (it bypasses RLS, and also authenticates the
 * Edge Function call). Add it to .env LOCALLY — it must NEVER be committed or
 * VITE_-prefixed (it would leak into the bundle):
 *
 *   VITE_SUPABASE_URL=...           # already set for the app
 *   SUPABASE_SERVICE_ROLE_KEY=...   # Project Settings → API → service_role
 *
 * Prerequisite: the `translate` function must be deployed and its
 * ANTHROPIC_API_KEY secret set (see README → Supabase guestbook table).
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

if (!URL || !KEY) {
  console.error(
    "[backfill] Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env"
  );
  process.exit(1);
}

const FUNCTION_URL = `${URL.replace(/\/$/, "")}/functions/v1/translate`;
const detectLang = (text) => (/[㐀-鿿]/.test(text) ? "zh" : "en");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function translate(text, from, to) {
  if (from === to || !text.trim()) return null;
  try {
    const res = await fetch(FUNCTION_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${KEY}`,
        apikey: KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, from, to }),
    });
    if (!res.ok) {
      console.error(`[backfill] translate function returned ${res.status}`);
      return null;
    }
    const data = await res.json();
    return typeof data?.translated === "string" && data.translated.trim()
      ? data.translated
      : null;
  } catch (err) {
    console.error("[backfill] translate request failed:", err.message);
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
  if (row.lang === lang && row.message_translated) {
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
  await sleep(400);
}

console.log(`[backfill] Done. ${updated} updated, ${skipped} already complete.`);
