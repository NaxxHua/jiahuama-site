import { Martini, UtensilsCrossed } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import RecipeCard from "@/components/recipes/RecipeCard";
import Reveal from "@/components/ui/Reveal";
import { useLang } from "@/i18n/LanguageContext";
import { recipes } from "@/data/recipes";

export default function RecipesPage() {
  const { t } = useLang();
  const cocktails = recipes.filter((r) => r.category === "cocktail");
  const dishes = recipes.filter((r) => r.category === "dish");

  return (
    <>
      <PageHeader
        eyebrow={t.recipes.eyebrow}
        title={t.recipes.title}
        intro={t.recipes.intro}
      />

      <div className="mx-auto max-w-6xl px-5">
        {/* VA-11 HALL-A tribute strip */}
        <Reveal>
          <div className="relative mt-12 overflow-hidden rounded-xl border border-border bg-panel/70 p-8 backdrop-blur-md">
            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(420px 200px at 12% 0%, rgba(74,163,255,0.18), transparent 70%), radial-gradient(420px 200px at 90% 100%, rgba(207,60,113,0.16), transparent 70%)",
              }}
            />
            <div className="scanlines pointer-events-none absolute inset-0 opacity-30" />
            <div className="relative">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                VA-11 HALL-A
              </p>
              <h2 className="mt-2 font-display text-[clamp(20px,2.6vw,28px)] font-bold tracking-tight text-fg">
                {t.recipes.tributeTitle}
              </h2>
              <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-fg-2">
                {t.recipes.tributeBody}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Cocktails */}
        <section className="py-16">
          <Reveal>
            <h2 className="flex items-center gap-2 font-display text-[clamp(22px,3vw,30px)] font-bold tracking-tight text-fg">
              <Martini size={24} className="text-accent" />
              {t.recipes.cocktailsLabel}
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cocktails.map((recipe, i) => (
              <Reveal key={recipe.id} delay={0.04 * (i % 3)}>
                <RecipeCard recipe={recipe} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* Dishes */}
        <section className="border-t border-border py-16">
          <Reveal>
            <h2 className="flex items-center gap-2 font-display text-[clamp(22px,3vw,30px)] font-bold tracking-tight text-fg">
              <UtensilsCrossed size={22} className="text-accent" />
              {t.recipes.dishesLabel}
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {dishes.map((recipe, i) => (
              <Reveal key={recipe.id} delay={0.04 * i}>
                <RecipeCard recipe={recipe} />
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
