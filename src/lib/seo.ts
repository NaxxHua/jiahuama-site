// Single source of truth for per-route SEO metadata.
//
// Consumed by:
//   - the client (useSeo hook) to keep <title>/<meta> in sync during SPA nav
//   - scripts/prerender-meta.mjs to bake per-route <head> into the static
//     build so crawlers and social/chat link previews see correct metadata
//
// Pure data/logic only — no React, no DOM — so the Node build script can
// import it directly (Node strips the TS types).

import { recipes } from "../data/recipes.ts";

export const SITE = {
  origin: "https://jiahuama.com",
  name: "Jiahua Ma",
  author: "Jiahua Ma",
  defaultTitle: "Jiahua Ma — Design Engineer",
  defaultDescription:
    "Jiahua Ma — Design Engineer at Visa, game developer and competitive table tennis player. Portfolio, projects, and a cyberpunk-themed recipe collection.",
  defaultOgImage: "/og-default.jpg",
  twitterCard: "summary_large_image",
} as const;

export interface RouteSeo {
  path: string;
  title: string;
  description: string;
  /** Site-relative path; made absolute at injection time. */
  ogImage: string;
  /** JSON-LD objects to embed in <head> (prerender only). */
  jsonLd: Record<string, unknown>[];
}

const PERSON: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jiahua Ma",
  url: `${SITE.origin}/`,
  jobTitle: "Design Engineer",
  worksFor: { "@type": "Organization", name: "Visa" },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Pennsylvania State University",
  },
  knowsAbout: [
    "Design Engineering",
    "Front-end Development",
    "Game Development",
    "Human-Computer Interaction",
    "Table Tennis",
  ],
  sameAs: [
    "https://github.com/NaxxHua",
    "https://www.linkedin.com/in/jiahua-ma/",
  ],
};

const WEBSITE: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: `${SITE.origin}/`,
};

function breadcrumb(name: string, path: string): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Recipes",
        item: `${SITE.origin}/recipes`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name,
        item: `${SITE.origin}${path}`,
      },
    ],
  };
}

function recipeJsonLd(
  r: (typeof recipes)[number],
  ogImage: string
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: r.title.en,
    description: r.description.en,
    image: `${SITE.origin}${ogImage}`,
    author: { "@type": "Person", name: SITE.author },
    recipeCategory: r.category === "cocktail" ? "Cocktail" : "Main course",
    recipeIngredient: r.ingredients.map((i) =>
      `${i.amount} ${i.name.en}`.trim()
    ),
    recipeInstructions: r.steps.map((s) => ({
      "@type": "HowToStep",
      name: s.title.en,
      text: s.desc.en,
    })),
  };
}

const STATIC_ROUTES: RouteSeo[] = [
  {
    path: "/",
    title: SITE.defaultTitle,
    description: SITE.defaultDescription,
    ogImage: SITE.defaultOgImage,
    jsonLd: [PERSON, WEBSITE],
  },
  {
    path: "/about",
    title: "About — Jiahua Ma",
    description:
      "Design Engineer at Visa, game developer and competitive table tennis player — and the theatre, games and lines I love away from work.",
    ogImage: SITE.defaultOgImage,
    jsonLd: [],
  },
  {
    path: "/portfolio",
    title: "Portfolio — Jiahua Ma",
    description:
      "Selected work by Jiahua Ma: design engineering at Visa, an indie game, the PsySpace mental-health app, and HCI research (CSCW 2020).",
    ogImage: SITE.defaultOgImage,
    jsonLd: [],
  },
  {
    path: "/recipes",
    title: "Recipes — Jiahua Ma",
    description:
      "A cyberpunk-themed collection of cocktail and dish recipes — each a real, mixable tribute, with cinematic detail pages.",
    ogImage: SITE.defaultOgImage,
    jsonLd: [],
  },
  {
    path: "/contact",
    title: "Contact — Jiahua Ma",
    description:
      "Get in touch with Jiahua Ma — LinkedIn, GitHub and email.",
    ogImage: SITE.defaultOgImage,
    jsonLd: [],
  },
  {
    path: "/guestbook",
    title: "Guestbook — Jiahua Ma",
    description:
      "Sign the guestbook — leave a note in English or Chinese and it's shown in the reader's language.",
    ogImage: SITE.defaultOgImage,
    jsonLd: [],
  },
];

const RECIPE_ROUTES: RouteSeo[] = recipes.map((r) => {
  const path = `/recipes/${r.id}`;
  // Recipe photos ship a compressed .jpg sibling specifically for og:image.
  const ogImage = r.image.replace(/\.webp$/, ".jpg");
  return {
    path,
    title: `${r.title.en} — Recipe — Jiahua Ma`,
    description: r.description.en,
    ogImage,
    jsonLd: [recipeJsonLd(r, ogImage), breadcrumb(r.title.en, path)],
  };
});

export const ROUTES: RouteSeo[] = [...STATIC_ROUTES, ...RECIPE_ROUTES];

/** Look up SEO for a pathname, falling back to the home/default route. */
export function getRouteSeo(pathname: string): RouteSeo {
  const clean =
    pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return ROUTES.find((r) => r.path === clean) ?? STATIC_ROUTES[0];
}
