// Emit dist/rss.xml from the blog manifest. English metadata is preferred
// (falls back to Chinese); one feed for the whole blog. Runs after vite build.

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { SITE } from "../src/lib/seo.ts";

const MANIFEST = path.resolve("src/content/blog-manifest.json");
const OUT = path.resolve("dist/rss.xml");

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

function rfc822(date) {
  const d = new Date(`${date}T00:00:00Z`);
  return Number.isNaN(d.getTime()) ? "" : d.toUTCString();
}

async function run() {
  let posts = [];
  try {
    posts = JSON.parse(await readFile(MANIFEST, "utf8"));
  } catch {
    posts = [];
  }

  const items = posts
    .map((post) => {
      const meta = post.langs.en ?? post.langs.zh ?? {};
      const url = `${SITE.origin}/blog/${post.slug}`;
      return [
        "    <item>",
        `      <title>${esc(meta.title ?? post.slug)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${rfc822(post.date)}</pubDate>`,
        `      <description>${esc(meta.summary ?? "")}</description>`,
        ...post.tags.map((t) => `      <category>${esc(t)}</category>`),
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE.name)} — Blog</title>
    <link>${SITE.origin}/blog</link>
    <atom:link href="${SITE.origin}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Notes on design engineering, games, cooking and making things for no reason.</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;

  await writeFile(OUT, xml, "utf8");
  console.log(`build-rss: ${posts.length} item(s) -> rss.xml`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
