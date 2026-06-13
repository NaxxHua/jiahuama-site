import type { ComponentType } from "react";
import type { Lang } from "@/i18n/translations";
import manifest from "@/content/blog-manifest.json";

export interface PostMeta {
  title: string;
  summary: string;
  machine: boolean;
}

export interface Post {
  slug: string;
  date: string;
  tags: string[];
  langs: Partial<Record<Lang, PostMeta>>;
}

export const posts = manifest as Post[];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatPostDate(date: string, lang: Lang): string {
  // Parse as local midnight so a YYYY-MM-DD date isn't shifted a day by UTC.
  const d = new Date(`${date}T00:00:00`);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString(lang === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Pick the best available language for a post given the reader's preference. */
export function resolvePostLang(post: Post, prefer: Lang): Lang {
  if (post.langs[prefer]) return prefer;
  const other: Lang = prefer === "en" ? "zh" : "en";
  return post.langs[other] ? other : prefer;
}

// Lazily-loaded post bodies. Keys look like
// "../content/blog/<slug>.<lang>.mdx" (resolved relative to this file).
const loaders = import.meta.glob("../content/blog/*.mdx") as Record<
  string,
  () => Promise<{
    default: ComponentType;
    frontmatter: Record<string, unknown>;
  }>
>;

export interface LoadedPost {
  Component: ComponentType;
  lang: Lang;
}

/** Load a post body in the reader's language, falling back to the other one. */
export async function loadPostBody(
  slug: string,
  prefer: Lang
): Promise<LoadedPost | null> {
  const post = getPost(slug);
  if (!post) return null;
  const lang = resolvePostLang(post, prefer);
  const loader = loaders[`../content/blog/${slug}.${lang}.mdx`];
  if (!loader) return null;
  const mod = await loader();
  return { Component: mod.default, lang };
}
