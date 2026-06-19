# Jiahua Ma — Personal Website

Source for [jiahuama.com](https://jiahuama.com) — the personal site of Jiahua Ma,
a design engineer at Visa, game developer, and table tennis player.

A bilingual (English / Chinese) portfolio with a cyberpunk-themed recipe
collection and a guestbook.

## Tech stack

- **Vite 6** + **React 18** + **TypeScript** — single-page app
- **Tailwind CSS 3** — styling, driven by a CSS-variable design-token system
- **react-router-dom 6** — routing, with route-level code splitting
- **Lenis** — smooth scrolling
- **GSAP**, **Motion**, **OGL** — animation (text reveals, scroll effects, the
  WebGL hero background)
- **simple-icons** — brand logos for the tech marquee
- **Supabase** — guestbook backend (falls back to localStorage in dev)

UI animation components are adapted from [React Bits](https://reactbits.dev) (MIT).
The site icon — a cat on a laptop under the stars — was drawn by 馨怡.

## Features

- Bilingual UI with persisted language preference
- Light / dark theme, synced to the system preference
- Animated WebGL hero, tech-stack marquee, scroll-reveal sections
- Recipe collection — glassmorphism cards and cinematic detail pages
- MDX blog with bilingual posts and an RSS feed
- ⌘K command palette and animated route transitions
- Supabase-backed guestbook
- Google Analytics 4 with SPA page-view tracking

## Development

Requires Node.js 24+ (the build imports a `.ts` module directly via Node's
native TypeScript type-stripping).

```bash
npm install
npm run dev        # start the dev server
npm run build      # type-check and build for production
npm run preview    # preview the production build
```

## Writing blog posts

Posts are MDX files in `src/content/blog/`, one per language, named
`<slug>.<lang>.mdx` (`lang` is `en` or `zh`) with frontmatter:

```mdx
---
title: "Post title"
date: "2026-06-13"
summary: "One-sentence summary."
tags: ["personal", "making"]
lang: "en"
---

Markdown / MDX body…
```

Write a post in **one** language, then let Claude translate the other:

```bash
npm run blog:translate        # generate missing translations (needs ANTHROPIC_API_KEY in .env)
npm run blog:manifest         # refresh the post index
```

`blog:translate` writes the sibling file marked `machine: true` with a
`sourceHash`, so it's only regenerated when the source changes — manual edits
to a translation are kept. Readers see posts in their language with a
view-original toggle; `npm run build` rebuilds the manifest, RSS and per-post
SEO automatically.

## Environment variables

Copy `.env.example` to `.env` and fill in:

| Variable                  | Purpose                                      |
| ------------------------- | -------------------------------------------- |
| `VITE_SUPABASE_URL`       | Supabase project URL (guestbook)             |
| `VITE_SUPABASE_ANON_KEY`  | Supabase anon key — safe to expose           |
| `VITE_GA_MEASUREMENT_ID`  | Google Analytics 4 measurement ID            |

Without the Supabase variables the guestbook runs in a localStorage-only
demo mode.

### Supabase guestbook table

Run this SQL once in the Supabase SQL editor:

```sql
create table public.guestbook (
  id                 bigint generated always as identity primary key,
  created_at         timestamptz not null default now(),
  name               text not null check (char_length(name) between 1 and 40),
  message            text not null check (char_length(message) between 1 and 500),
  lang               text not null default 'en' check (lang in ('en', 'zh')),
  message_translated text
);

alter table public.guestbook enable row level security;

create policy "Public read"   on public.guestbook for select using (true);
create policy "Public insert" on public.guestbook for insert with check (true);
```

`lang` is the message's detected source language and `message_translated`
holds it rendered in the other site language, so entries display in the
reader's current language with a one-click toggle back to the original. The
translation is produced by Claude when a message is signed (see the Edge
Function below).

### Translation Edge Function

Translation runs in a Supabase Edge Function (`supabase/functions/translate`)
so the Anthropic API key stays server-side and never reaches the client
bundle. Deploy it once and set the secret (requires the
[Supabase CLI](https://supabase.com/docs/guides/cli), linked to your project):

```bash
supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
supabase functions deploy translate
```

`supabase/config.toml` sets `verify_jwt = false` for this function: it's a
stateless translation utility called from the browser with the public
publishable key (`sb_publishable_…`), which the JWT-verification gateway would
otherwise reject. Abuse is bounded by the 2000-character input cap in the
function.

The function defaults to `claude-haiku-4-5`, which translates en↔zh well at a
low cost and latency — ideal for a guestbook. Note that API usage is billed on
the Anthropic Developer Platform, separately from any Claude.ai subscription.
Override with `supabase secrets set ANTHROPIC_MODEL=claude-opus-4-8` if you
want maximum quality.

Already have a table from before? Add the two columns instead:

```sql
alter table public.guestbook
  add column if not exists lang text not null default 'en'
    check (lang in ('en', 'zh')),
  add column if not exists message_translated text;
```

Then backfill translations for the existing rows (deploy the Edge Function
first — the backfill calls it). This writes to the table, which RLS only allows
for the service role, so it needs the **service_role** key (Project Settings →
API) in `.env` as `SUPABASE_SERVICE_ROLE_KEY` — keep it local and never
`VITE_`-prefixed:

```bash
npm run backfill:guestbook
```

## Project structure

```
src/
  pages/        route-level page components
  components/
    ui/         design-system atoms & React Bits ports
    layout/     Nav, Footer, RootLayout, PageHeader, Analytics
    home/ portfolio/ recipes/ guestbook/   section components
  hooks/        useTheme, useLang helpers, useLenis, useReducedMotion
  i18n/         LanguageContext + the bilingual string dictionary
  data/         recipes, tech-stack data
  lib/          Supabase client & guestbook data layer
```

## Deployment

Deployed to GitHub Pages via `.github/workflows/deploy.yaml` on every push to
`main`. Add `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and
`VITE_GA_MEASUREMENT_ID` as repository secrets.

## License

Private and proprietary. All rights reserved.
