// Supabase Edge Function — translate guestbook messages with Claude.
//
// The Anthropic API key lives only here, as a Supabase secret, and never
// reaches the client bundle:
//
//   supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
//   supabase functions deploy translate
//
// Optional secret ANTHROPIC_MODEL overrides the model (default: Haiku — it
// translates en<->zh well at a fraction of the cost and latency of larger
// models, ideal for a guestbook). Set it to e.g. claude-opus-4-8 for maximum
// quality.
//
// Deno runtime; the npm: specifier pulls the official SDK.
import Anthropic from "npm:@anthropic-ai/sdk";

const MODEL = Deno.env.get("ANTHROPIC_MODEL") ?? "claude-haiku-4-5";
const MAX_INPUT = 2000;
const LANG_NAME: Record<string, string> = {
  en: "English",
  zh: "Simplified Chinese",
};

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });

const anthropic = new Anthropic({ apiKey: Deno.env.get("ANTHROPIC_API_KEY") });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "method not allowed" }, 405);

  let text: unknown, from: unknown, to: unknown;
  try {
    ({ text, from, to } = await req.json());
  } catch {
    return json({ error: "invalid JSON body" }, 400);
  }

  if (
    typeof text !== "string" ||
    !text.trim() ||
    text.length > MAX_INPUT ||
    !LANG_NAME[from as string] ||
    !LANG_NAME[to as string] ||
    from === to
  ) {
    return json({ error: "invalid input" }, 400);
  }

  try {
    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: [
        {
          type: "text",
          text:
            `You are a translation engine for a website guestbook. Translate the ` +
            `user's message from ${LANG_NAME[from as string]} to ${LANG_NAME[to as string]}. ` +
            `Output ONLY the translated text — no quotes, no preamble, no explanation. ` +
            `Preserve the original tone, emoji, punctuation, and line breaks. Do not ` +
            `translate proper nouns, @handles, URLs, or code. If the text is already in ` +
            `${LANG_NAME[to as string]}, return it unchanged.`,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [{ role: "user", content: text }],
    });

    const block = message.content.find((b) => b.type === "text");
    const translated = block && "text" in block ? block.text.trim() : "";
    if (!translated) return json({ error: "empty translation" }, 502);
    return json({ translated });
  } catch (err) {
    console.error("[translate] Anthropic error:", err);
    return json({ error: "translation failed" }, 502);
  }
});
