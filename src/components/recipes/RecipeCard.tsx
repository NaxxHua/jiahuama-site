import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import TiltedCard from "@/components/ui/TiltedCard";
import { useLang, useTx } from "@/i18n/LanguageContext";
import type { Recipe } from "@/data/recipes";

/**
 * Glassmorphism + neon recipe card. The recipe's `accent` colour drives a
 * glow that intensifies on hover; a 3D tilt adds depth.
 */
export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const { t } = useLang();
  const tx = useTx();
  const categoryLabel =
    recipe.category === "cocktail"
      ? t.recipes.cocktailsLabel
      : t.recipes.dishesLabel;

  return (
    <TiltedCard rotateAmplitude={6} scaleOnHover={1.03}>
      <Link
        to={`/recipes/${recipe.id}`}
        style={{ "--rc": recipe.accent } as CSSProperties}
        className="group block overflow-hidden rounded-xl border border-border bg-panel/70 backdrop-blur-md transition-[box-shadow,border-color] duration-300 hover:border-[color:var(--rc)] hover:shadow-[0_10px_50px_-10px_var(--rc)]"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={recipe.image}
            alt={tx(recipe.title)}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* neon wash from the recipe accent */}
          <div
            className="pointer-events-none absolute inset-0 opacity-50 mix-blend-overlay"
            style={{
              background: `linear-gradient(160deg, transparent 40%, var(--rc))`,
            }}
          />
          <div className="scanlines pointer-events-none absolute inset-0 opacity-40" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-panel/90 via-transparent" />
          <span
            className="absolute left-3 top-3 rounded-full border px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em] backdrop-blur-md"
            style={{
              color: recipe.accent,
              borderColor: recipe.accent,
              background: "rgba(0,0,0,0.35)",
            }}
          >
            {categoryLabel}
          </span>
        </div>
        <div className="flex items-start justify-between gap-3 p-5">
          <div className="min-w-0">
            <h3 className="font-display text-[18px] font-semibold tracking-tight text-fg">
              {tx(recipe.title)}
            </h3>
            <p className="mt-1 font-mono text-[12px] text-fg-2">
              {tx(recipe.subtitle)}
            </p>
          </div>
          <ArrowUpRight
            size={18}
            className="shrink-0 text-fg-3 transition-colors group-hover:text-[color:var(--rc)]"
          />
        </div>
      </Link>
    </TiltedCard>
  );
}
