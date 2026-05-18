/**
 * Build-time fetch of the World of Warcraft character render.
 *
 * Pulls the current Blizzard-generated render for the character below and
 * writes it to public/wow-character.png, so the gaming card shows up-to-date
 * gear. The DPS parse on the card stays hand-written in src/data/games.ts —
 * it is a frozen historical record, not API data.
 *
 * Credentials (WOW_CLIENT_ID / WOW_CLIENT_SECRET) come from .env and are NOT
 * VITE_-prefixed, so they never reach the client bundle. Create a client at
 * https://develop.battle.net/.
 *
 * If credentials are missing or the API call fails, the existing image is
 * kept and the build continues — this step never breaks a deploy.
 */
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { loadEnv } from "vite";

const REGION = "us";
const REALM = "illidan";
const CHARACTER = "huasuiyue";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = resolve(root, "public/wow-character.png");

const env = loadEnv("production", root, "");
const CLIENT_ID = env.WOW_CLIENT_ID ?? process.env.WOW_CLIENT_ID;
const CLIENT_SECRET = env.WOW_CLIENT_SECRET ?? process.env.WOW_CLIENT_SECRET;

const skip = (msg) => {
  console.log(`[wow-render] ${msg} — keeping existing image.`);
  process.exit(0);
};

if (!CLIENT_ID || !CLIENT_SECRET) {
  skip("WOW_CLIENT_ID / WOW_CLIENT_SECRET not set");
}

try {
  const tokenRes = await fetch("https://oauth.battle.net/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!tokenRes.ok) skip(`OAuth failed (${tokenRes.status})`);
  const { access_token } = await tokenRes.json();

  const mediaUrl =
    `https://${REGION}.api.blizzard.com/profile/wow/character/` +
    `${REALM}/${CHARACTER}/character-media` +
    `?namespace=profile-${REGION}&locale=en_US`;
  const mediaRes = await fetch(mediaUrl, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  if (!mediaRes.ok) skip(`character-media failed (${mediaRes.status})`);
  const media = await mediaRes.json();

  const assets = media.assets ?? [];
  const pick = (key) => assets.find((a) => a.key === key)?.value;
  const renderUrl = pick("main-raw") ?? pick("main") ?? media.render_url;
  if (!renderUrl) skip("no render asset in API response");

  const imgRes = await fetch(renderUrl);
  if (!imgRes.ok) skip(`render download failed (${imgRes.status})`);
  await writeFile(OUT, Buffer.from(await imgRes.arrayBuffer()));

  console.log(`[wow-render] updated public/wow-character.png from ${renderUrl}`);
} catch (err) {
  skip(`unexpected error: ${err.message}`);
}
