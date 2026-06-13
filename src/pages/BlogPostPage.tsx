import { useEffect, useState, type ComponentType } from "react";
import { Link, useParams } from "react-router-dom";
import { MDXProvider } from "@mdx-js/react";
import { ArrowLeft, Languages, Loader2 } from "lucide-react";
import { mdxComponents } from "@/components/blog/mdxComponents";
import { useLang } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/translations";
import {
  getPost,
  loadPostBody,
  resolvePostLang,
  formatPostDate,
} from "@/lib/blog";

export default function BlogPostPage() {
  const { slug = "" } = useParams();
  const { t, lang } = useLang();
  const post = getPost(slug);

  // The reader can override the displayed language (e.g. to read the original
  // behind a machine translation). Reset the override when the site language
  // changes so the post follows the global toggle again.
  const [override, setOverride] = useState<Lang | null>(null);
  useEffect(() => setOverride(null), [lang, slug]);

  const [Body, setBody] = useState<ComponentType | null>(null);
  const displayLang = post ? override ?? resolvePostLang(post, lang) : lang;

  useEffect(() => {
    let active = true;
    setBody(null);
    loadPostBody(slug, displayLang).then((res) => {
      if (active && res) setBody(() => res.Component);
    });
    return () => {
      active = false;
    };
  }, [slug, displayLang]);

  if (!post) {
    return (
      <div className="mx-auto grid min-h-[50vh] max-w-2xl place-items-center px-5 text-center">
        <div>
          <p className="text-[15px] text-fg-2">{t.blog.notFound}</p>
          <Link
            to="/blog"
            className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium text-accent hover:text-accent-2"
          >
            <ArrowLeft size={15} />
            {t.blog.backToBlog}
          </Link>
        </div>
      </div>
    );
  }

  const meta = post.langs[displayLang]!;
  const otherLang: Lang = displayLang === "en" ? "zh" : "en";
  const hasOther = Boolean(post.langs[otherLang]);
  const showMachineNote = meta.machine && hasOther;

  return (
    <article className="mx-auto max-w-2xl px-5 pb-24 pt-16">
      <Link
        to="/blog"
        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-fg-3 transition-colors hover:text-fg"
      >
        <ArrowLeft size={15} />
        {t.blog.backToBlog}
      </Link>

      <header className="mt-8 border-b border-border pb-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">
          <time dateTime={post.date}>{formatPostDate(post.date, displayLang)}</time>
          {post.tags.map((tag) => (
            <span key={tag}>· {tag}</span>
          ))}
        </div>
        <h1 className="mt-3 font-display text-[clamp(28px,5vw,42px)] font-bold leading-[1.12] tracking-tight text-fg">
          {meta.title}
        </h1>
      </header>

      {showMachineNote && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-bg-1 px-4 py-3">
          <p className="text-[13px] text-fg-2">{t.blog.machineNote}</p>
          <button
            type="button"
            onClick={() => setOverride(otherLang)}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-panel px-3 py-1.5 text-[13px] font-medium text-fg transition-colors hover:border-border-strong"
          >
            <Languages size={14} />
            {t.blog.viewOriginal}
          </button>
        </div>
      )}

      <div className="mt-8">
        {Body ? (
          <MDXProvider components={mdxComponents}>
            <Body />
          </MDXProvider>
        ) : (
          <div className="grid min-h-[30vh] place-items-center">
            <Loader2 size={20} className="animate-spin text-fg-3" />
          </div>
        )}
      </div>
    </article>
  );
}
