import { useRef, useState, type CSSProperties } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowLeft, Check, GlassWater, Lightbulb, Link2 } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { useLang, useTx } from "@/i18n/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { recipes } from "@/data/recipes";

export default function RecipeDetailPage() {
  const { id } = useParams();
  const { t } = useLang();
  const tx = useTx();
  const reducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imgY = reducedMotion ? "0%" : rawY;

  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return (
      <section className="mx-auto max-w-2xl px-5 py-32 text-center">
        <h1 className="font-display text-3xl font-bold text-fg">
          {t.recipes.notFound}
        </h1>
        <Link
          to="/recipes"
          className="mt-6 inline-flex items-center gap-2 text-[14px] font-medium text-accent hover:text-accent-2"
        >
          <ArrowLeft size={16} />
          {t.recipes.backToRecipes}
        </Link>
      </section>
    );
  }

  const accentStyle = { "--rc": recipe.accent } as CSSProperties;

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div style={accentStyle}>
      {/* Parallax hero */}
      <div ref={heroRef} className="relative h-[62vh] min-h-[420px] overflow-hidden">
        <motion.img
          src={recipe.image}
          alt={tx(recipe.title)}
          style={{ y: imgY }}
          className="absolute inset-x-0 top-[-11%] h-[122%] w-full object-cover"
        />
        <div className="scanlines pointer-events-none absolute inset-0 opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/55 to-bg/20" />
        <div
          className="pointer-events-none absolute inset-0 opacity-70 mix-blend-overlay"
          style={{ background: "linear-gradient(150deg, transparent 45%, var(--rc))" }}
        />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-4xl px-5 pb-10">
            <Link
              to="/recipes"
              className="inline-flex items-center gap-1.5 font-mono text-[12px] text-fg-1 transition-colors hover:text-fg"
            >
              <ArrowLeft size={14} />
              {t.recipes.backToRecipes}
            </Link>
            <span
              className="ml-3 rounded-full border px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em]"
              style={{ color: recipe.accent, borderColor: recipe.accent }}
            >
              {recipe.category === "cocktail"
                ? t.recipes.cocktailsLabel
                : t.recipes.dishesLabel}
            </span>
            <h1 className="mt-3 font-display text-[clamp(34px,6vw,60px)] font-bold leading-[1.05] tracking-tight text-fg">
              {tx(recipe.title)}
            </h1>
            <p className="mt-2 font-mono text-[13px] text-fg-1">
              {tx(recipe.subtitle)}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-5 py-14">
        <p className="max-w-2xl text-[16px] leading-relaxed text-fg-1">
          {tx(recipe.description)}
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-[300px_1fr]">
          {/* Sticky ingredient panel */}
          <aside className="md:sticky md:top-24 md:self-start">
            <div className="overflow-hidden rounded-xl border border-border bg-panel/70 backdrop-blur-md">
              <div
                className="border-b border-border px-5 py-3.5"
                style={{ background: "color-mix(in oklab, var(--rc) 12%, transparent)" }}
              >
                <h2 className="font-display text-[15px] font-semibold text-fg">
                  {t.recipes.ingredients}
                </h2>
              </div>
              <ul className="flex flex-col divide-y divide-border">
                {recipe.ingredients.map((ing, i) => (
                  <li
                    key={i}
                    className="flex items-baseline justify-between gap-4 px-5 py-2.5"
                  >
                    <span className="text-[13.5px] text-fg-1">
                      {tx(ing.name)}
                    </span>
                    {ing.amount && (
                      <span
                        className="shrink-0 font-mono text-[12.5px]"
                        style={{ color: recipe.accent }}
                      >
                        {ing.amount}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              {(recipe.glass || recipe.equivalent) && (
                <div className="flex flex-col gap-2 border-t border-border px-5 py-3.5 text-[12.5px]">
                  {recipe.glass && (
                    <div className="flex items-center gap-2 text-fg-2">
                      <GlassWater size={14} style={{ color: recipe.accent }} />
                      <span className="text-fg-3">{t.recipes.glassLabel}:</span>
                      {tx(recipe.glass)}
                    </div>
                  )}
                  {recipe.equivalent && (
                    <div className="flex items-center gap-2 text-fg-2">
                      <span className="text-fg-3">
                        {t.recipes.equivalentLabel}:
                      </span>
                      {tx(recipe.equivalent)}
                    </div>
                  )}
                </div>
              )}
            </div>
          </aside>

          {/* Steps */}
          <div>
            <h2 className="font-display text-[20px] font-bold tracking-tight text-fg">
              {t.recipes.instructions}
            </h2>
            <ol className="mt-5 flex flex-col gap-4">
              {recipe.steps.map((step, i) => (
                <Reveal key={i} delay={0.04 * i}>
                  <li className="flex gap-4 rounded-lg border border-border bg-panel p-5">
                    <span
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full font-mono text-[14px] font-bold"
                      style={{
                        color: recipe.accent,
                        background:
                          "color-mix(in oklab, var(--rc) 14%, transparent)",
                        border: "1px solid var(--rc)",
                      }}
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <h3 className="font-display text-[15.5px] font-semibold text-fg">
                        {tx(step.title)}
                      </h3>
                      <p className="mt-1 text-[14px] leading-relaxed text-fg-2">
                        {tx(step.desc)}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>

        {/* Story — scanline dossier card */}
        <Reveal>
          <div className="relative mt-12 overflow-hidden rounded-xl border border-border bg-panel/70 p-7 backdrop-blur-md">
            <div className="scanlines pointer-events-none absolute inset-0 opacity-25" />
            <div
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                background:
                  "radial-gradient(360px 160px at 100% 0%, color-mix(in oklab, var(--rc) 22%, transparent), transparent 70%)",
              }}
            />
            <div className="relative">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                {t.recipes.storyLabel}
              </h2>
              <p className="mt-3 text-[15px] italic leading-relaxed text-fg-1">
                {tx(recipe.story)}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Tips */}
        {recipe.tips && recipe.tips.length > 0 && (
          <Reveal>
            <div className="mt-6 rounded-xl border border-border bg-panel p-7">
              <h2 className="flex items-center gap-2 font-display text-[16px] font-semibold text-fg">
                <Lightbulb size={17} style={{ color: recipe.accent }} />
                {t.recipes.tipsLabel}
              </h2>
              <ul className="mt-3 flex flex-col gap-2.5">
                {recipe.tips.map((tip, i) => (
                  <li
                    key={i}
                    className="flex gap-2.5 text-[14px] leading-relaxed text-fg-2"
                  >
                    <Check
                      size={15}
                      className="mt-0.5 shrink-0"
                      style={{ color: recipe.accent }}
                    />
                    {tx(tip)}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}

        {/* Share */}
        <div className="mt-10 flex items-center justify-between border-t border-border pt-8">
          <Link
            to="/recipes"
            className="inline-flex items-center gap-2 text-[14px] font-medium text-fg-1 transition-colors hover:text-fg"
          >
            <ArrowLeft size={16} />
            {t.recipes.backToRecipes}
          </Link>
          <button
            type="button"
            onClick={share}
            className="inline-flex items-center gap-2 rounded-lg border border-border-2 bg-bg-2 px-4 py-2 text-[13.5px] font-medium text-fg-1 transition-colors hover:border-border-strong hover:text-fg"
          >
            {copied ? (
              <>
                <Check size={15} className="text-accent" />
                {t.recipes.shareCopied}
              </>
            ) : (
              <>
                <Link2 size={15} />
                {t.recipes.share}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
