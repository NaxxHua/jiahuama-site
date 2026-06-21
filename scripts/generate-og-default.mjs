// Generate the default social-share image (public/og-default.jpg, 1200x630)
// used as og:image for non-recipe routes. Branded card on the site's dark
// background. Run once and commit:  npm run generate:og
import path from "node:path";
import sharp from "sharp";

const OUT = path.resolve("public/og-default.jpg");

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b0f14"/>
      <stop offset="100%" stop-color="#0e1620"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="42%" r="60%">
      <stop offset="0%" stop-color="#1e3a5f" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#0b0f14" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="0" y="0" width="1200" height="6" fill="#4aa3a3"/>
  <text x="80" y="300" font-family="Helvetica, Arial, sans-serif" font-size="104" font-weight="700" fill="#f4f7fa">Jiahua Ma</text>
  <text x="84" y="372" font-family="Helvetica, Arial, sans-serif" font-size="32" font-weight="500" fill="#9fb2c2">Full-Stack Software Engineer · Game Developer · Table Tennis</text>
  <text x="84" y="548" font-family="Helvetica, Arial, sans-serif" font-size="30" font-weight="500" fill="#4aa3a3">jiahuama.com</text>
</svg>`;

await sharp(Buffer.from(svg)).jpeg({ quality: 86 }).toFile(OUT);
console.log(`generated ${OUT}`);
