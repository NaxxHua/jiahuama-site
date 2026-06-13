// Post-build SEO pass. Bakes correct per-route <head> metadata into the
// static output so crawlers and social/chat link previews — which don't run
// our client JS — see the right title/description/OG/JSON-LD per page.
//
// Pure string injection on the built dist/index.html: no headless browser,
// no framework change. Also emits sitemap.xml. Runs in `npm run build` after
// `vite build`. Route metadata comes from src/lib/seo.ts (single source).

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { ROUTES, SITE } from "../src/lib/seo.ts";

const DIST = path.resolve("dist");

const escAttr = (s) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// Make JSON-LD safe to embed inside <script>.
const escJson = (obj) =>
  JSON.stringify(obj).replace(/</g, "\\u003c");

let warned = false;
function replace(html, re, replacement, label) {
  if (!re.test(html)) {
    console.warn(`  ! prerender: could not find ${label}`);
    warned = true;
    return html;
  }
  return html.replace(re, replacement);
}

function setTitle(html, title) {
  return replace(html, /<title>[\s\S]*?<\/title>/, `<title>${escAttr(title)}</title>`, "<title>");
}

function setMetaName(html, name, content) {
  const re = new RegExp(`(<meta\\s+name="${name}"\\s+content=")[\\s\\S]*?("\\s*/?>)`);
  return replace(html, re, `$1${escAttr(content)}$2`, `meta[name=${name}]`);
}

function setMetaProp(html, prop, content) {
  const re = new RegExp(`(<meta\\s+property="${prop}"\\s+content=")[\\s\\S]*?("\\s*/?>)`);
  return replace(html, re, `$1${escAttr(content)}$2`, `meta[property=${prop}]`);
}

function setCanonical(html, href) {
  const re = /(<link\s+rel="canonical"\s+href=")[\s\S]*?("\s*\/?>)/;
  return replace(html, re, `$1${escAttr(href)}$2`, "link[rel=canonical]");
}

function injectJsonLd(html, jsonLd) {
  if (!jsonLd.length) return html;
  const scripts = jsonLd
    .map((o) => `<script type="application/ld+json">${escJson(o)}</script>`)
    .join("\n    ");
  return html.replace("</head>", `    ${scripts}\n  </head>`);
}

function buildHtml(base, route) {
  const url = `${SITE.origin}${route.path === "/" ? "/" : route.path}`;
  const ogImage = `${SITE.origin}${route.ogImage}`;
  let html = base;
  html = setTitle(html, route.title);
  html = setMetaName(html, "description", route.description);
  html = setCanonical(html, url);
  html = setMetaProp(html, "og:title", route.title);
  html = setMetaProp(html, "og:description", route.description);
  html = setMetaProp(html, "og:url", url);
  html = setMetaProp(html, "og:image", ogImage);
  html = setMetaName(html, "twitter:title", route.title);
  html = setMetaName(html, "twitter:description", route.description);
  html = setMetaName(html, "twitter:image", ogImage);
  html = injectJsonLd(html, route.jsonLd);
  return html;
}

function outFile(routePath) {
  if (routePath === "/") return path.join(DIST, "index.html");
  return path.join(DIST, routePath.replace(/^\//, ""), "index.html");
}

async function run() {
  const base = await readFile(path.join(DIST, "index.html"), "utf8");

  for (const route of ROUTES) {
    const html = buildHtml(base, route);
    const file = outFile(route.path);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, html, "utf8");
  }

  const urls = ROUTES.map(
    (r) =>
      `  <url><loc>${SITE.origin}${r.path === "/" ? "/" : r.path}</loc></url>`
  ).join("\n");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  await writeFile(path.join(DIST, "sitemap.xml"), sitemap, "utf8");

  console.log(
    `prerender-meta: wrote ${ROUTES.length} route pages + sitemap.xml` +
      (warned ? " (with warnings)" : "")
  );
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
