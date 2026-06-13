/**
 * Build-time fetch of the World of Warcraft character render.
 *
 * Pulls the current Blizzard-generated render for the character below, stores
 * the source PNG in media/ and emits an optimized public/wow-character.webp
 * (what the gaming card actually loads), so the card shows up-to-date gear.
 * The DPS parse on the card stays hand-written in src/data/games.ts — it is a
 * frozen historical record, not API data.
 *
 * Credentials (BLIZZARD_CLIENT_ID / BLIZZARD_CLIENT_SECRET) come from .env and
 * are NOT VITE_-prefixed, so they never reach the client bundle. Create a
 * client at https://develop.battle.net/.
 *
 * If credentials are missing or the API call fails, the existing image is
 * kept and the build continues — this step never breaks a deploy.
 */
import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { loadEnv } from "vite";
import sharp from "sharp";

const REGION = "us";
const REALM = "illidan";
const CHARACTER = "huasuiyue";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = resolve(root, "media/wow-character.png");
const OUT_WEBP = resolve(root, "public/wow-character.webp");

const env = { ...loadEnv("production", root, ""), ...process.env };
const CLIENT_ID = env.BLIZZARD_CLIENT_ID ?? env.WOW_CLIENT_ID;
const CLIENT_SECRET = env.BLIZZARD_CLIENT_SECRET ?? env.WOW_CLIENT_SECRET;

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
  await mkdir(dirname(SRC), { recursive: true });
  await writeFile(SRC, Buffer.from(await imgRes.arrayBuffer()));

  // Emit the optimized WebP the gaming card loads (matches optimize:images).
  await sharp(SRC)
    .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(OUT_WEBP);

  console.log(`[wow-render] updated wow-character.webp from ${renderUrl}`);
} catch (err) {
  skip(`unexpected error: ${err.message}`);
}
