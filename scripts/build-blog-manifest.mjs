// Build src/content/blog-manifest.json from the MDX posts' frontmatter.
//
// The manifest is the single source of post metadata (title/summary/date/tags
// per language) used by the client list, src/lib/seo.ts and the RSS builder —
// none of which can glob/parse MDX the way Vite does. Post bodies are still
// loaded lazily from the .mdx files at render time.
//
// Runs at the start of `npm run build`; pure Node + gray-matter, no API key.

import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.resolve("src/content/blog");
const OUT = path.resolve("src/content/blog-manifest.json");

const FILE_RE = /^(.+)\.(en|zh)\.mdx$/;

async function run() {
  let files = [];
  try {
    files = await readdir(BLOG_DIR);
  } catch {
    files = [];
  }

  const bySlug = new Map();

  for (const file of files.sort()) {
    const m = FILE_RE.exec(file);
    if (!m) continue;
    const [, slug, lang] = m;
    const raw = await readFile(path.join(BLOG_DIR, file), "utf8");
    const { data } = matter(raw);

    if (!bySlug.has(slug)) {
      bySlug.set(slug, { slug, date: "", tags: [], langs: {} });
    }
    const entry = bySlug.get(slug);
    entry.langs[lang] = {
      title: String(data.title ?? slug),
      summary: String(data.summary ?? ""),
      machine: Boolean(data.machine),
    };
    // Date and tags are language-neutral; take them from whichever file has them.
    if (data.date) entry.date = String(data.date);
    if (Array.isArray(data.tags) && data.tags.length) entry.tags = data.tags;
  }

  const posts = [...bySlug.values()]
    .filter((p) => Object.keys(p.langs).length > 0)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

  await writeFile(OUT, JSON.stringify(posts, null, 2) + "\n", "utf8");
  console.log(`build-blog-manifest: ${posts.length} post(s) -> blog-manifest.json`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
