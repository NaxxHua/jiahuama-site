// Optimize source photos in media/ into web-ready assets in public/.
//
// For every source image we emit a downscaled WebP (used on-page). Recipe
// photos additionally get a compressed JPEG, used as the og:image because a
// few social/chat platforms still preview WebP unreliably.
//
// Run once after adding or changing a source image:
//   npm run optimize:images
// Outputs are committed; this is intentionally NOT part of `npm run build`.

import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC_DIR = path.resolve("media");
const OUT_DIR = path.resolve("public");

// WebP (on-page) — generous cap; recipe heroes render near full-bleed.
const WEBP_MAX_EDGE = 1600;
const WEBP_QUALITY = 78;

// JPEG (og:image only) — smaller, social-preview friendly.
const JPEG_MAX_EDGE = 1200;
const JPEG_QUALITY = 80;

// Base names (without extension) that also need an og:image JPEG.
const NEEDS_OG_JPEG = new Set([
  "big_plate_chicken",
  "mooncake",
  "cobalt_velvet",
  "blue_fairy",
  "piano_woman",
  "moon_blast",
  "zen_star",
  "pile_driver",
  "piano_man",
  "fluffy_dream",
]);

const fmtKB = (bytes) => `${Math.round(bytes / 1024)} KB`;

async function fileSize(p) {
  try {
    return (await stat(p)).size;
  } catch {
    return 0;
  }
}

async function run() {
  await mkdir(OUT_DIR, { recursive: true });

  const entries = (await readdir(SRC_DIR)).filter((n) =>
    /\.(jpe?g|png)$/i.test(n)
  );
  if (entries.length === 0) {
    console.log("optimize:images — no source images in media/");
    return;
  }

  for (const name of entries.sort()) {
    const base = name.replace(/\.[^.]+$/, "");
    const srcPath = path.join(SRC_DIR, name);
    const srcBytes = await fileSize(srcPath);

    const webpOut = path.join(OUT_DIR, `${base}.webp`);
    await sharp(srcPath)
      .rotate() // respect EXIF orientation
      .resize({
        width: WEBP_MAX_EDGE,
        height: WEBP_MAX_EDGE,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: WEBP_QUALITY })
      .toFile(webpOut);

    let extra = "";
    if (NEEDS_OG_JPEG.has(base)) {
      const jpegOut = path.join(OUT_DIR, `${base}.jpg`);
      await sharp(srcPath)
        .rotate()
        .resize({
          width: JPEG_MAX_EDGE,
          height: JPEG_MAX_EDGE,
          fit: "inside",
          withoutEnlargement: true,
        })
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
        .toFile(jpegOut);
      extra = ` + ${base}.jpg (${fmtKB(await fileSize(jpegOut))})`;
    }

    console.log(
      `${name} (${fmtKB(srcBytes)}) → ${base}.webp (${fmtKB(
        await fileSize(webpOut)
      )})${extra}`
    );
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
