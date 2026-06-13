import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import Reveal from "@/components/ui/Reveal";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { useLang } from "@/i18n/LanguageContext";
import { posts, resolvePostLang, formatPostDate } from "@/lib/blog";

export default function BlogPage() {
  const { t, lang } = useLang();

  return (
    <>
      <PageHeader
        eyebrow={t.nav.blog}
        title={t.blog.title}
        intro={t.blog.intro}
      />

      <section className="mx-auto max-w-3xl px-5 py-16">
        {posts.length === 0 ? (
          <Reveal>
            <p className="text-center text-[15px] text-fg-2">{t.blog.empty}</p>
          </Reveal>
        ) : (
          <div className="flex flex-col gap-4">
            {posts.map((post, i) => {
              const pl = resolvePostLang(post, lang);
              const meta = post.langs[pl]!;
              return (
                <Reveal key={post.slug} delay={i * 0.05}>
                  <SpotlightCard className="group rounded-lg border border-border bg-panel p-6 transition-colors hover:border-border-strong sm:p-7">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">
                      <time dateTime={post.date}>
                        {formatPostDate(post.date, lang)}
                      </time>
                      {meta.machine && pl !== lang && (
                        <span className="text-fg-3">· {t.blog.machineTag}</span>
                      )}
                    </div>
                    <h2 className="mt-2 flex items-center gap-1.5 font-display text-[20px] font-semibold tracking-tight text-fg">
                      {meta.title}
                      <ArrowRight
                        size={16}
                        className="text-fg-3 transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
                      />
                    </h2>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-fg-2">
                      {meta.summary}
                    </p>
                    {post.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-border-2 bg-bg-2 px-2.5 py-1 font-mono text-[11.5px] text-fg-1"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <Link
                      to={`/blog/${post.slug}`}
                      viewTransition
                      className="absolute inset-0"
                      aria-label={meta.title}
                    />
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
