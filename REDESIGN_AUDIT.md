# Celestial Cat Tarot — Redesign Audit (Phase 0)

**Date:** 2026-10-31  
**Live reference:** https://pet-tarot-rose.vercel.app/  
**Local path:** `D:\download\pet-tarot`

## Stack & architecture

| Layer | Current state |
|--------|----------------|
| Framework | **Next.js 16.4** (App Router, Turbopack, Cache Components / PPR) |
| UI | **React 19**, **Tailwind CSS v4** (`@import "tailwindcss"`, `@theme inline`) |
| Motion | **Framer Motion** (`FlipCard`, page transitions in `PetTarotApp`) |
| Fonts | **Cinzel** (serif display), **Inter** (sans) via `next/font` |
| i18n | Client context `src/lib/i18n.tsx` — **vi / en** |
| State | React local state; **no global store**; providers for audio, settings, i18n |
| Backend | **None** — 100% client-side; journal + settings + daily salt in **localStorage** |
| Deploy | Vercel (`.vercel` present); static/SSG pages + client islands |

## Routing

| Route | Purpose |
|-------|---------|
| `/` | Reading app (`PetTarotApp`) — **will become gateway; reading moves to `/reading`** |
| `/library` | Major Arcana grid (22 cards) |
| `/library/[slug]` | Card detail (static params for 22 majors) |
| `/journal` | Saved readings (localStorage) |
| `/about` | Static about copy |
| `/robots.txt`, `/sitemap.xml` | SEO |

## Card data & assets

- **Major Arcana:** 22 cards in `src/data/major-arcana.ts` with VI/EN copy, keywords, upright/reversed.
- **Minor Arcana:** `src/data/minor-arcana.ts` is **empty** — deck mode `"full"` still only uses majors in `deck.ts`.
- **Public art:** 22 PNGs in `public/cards/` (complete Major set).
- **Pipeline:** `celestial-cat-tarot/` — prompts, compose scripts, reference cat PNGs, per-card `final.png` assets.
- **Reference cat:** `celestial-cat-tarot/assets/reference/cat_reference.png` (not named `CAT_MASTER_REFERENCE.png` in repo).

## Reading flow (current)

1. Setup: spread (single / three / cross-5), topic (general, love, career, self), optional question.
2. Deck phase: shuffle animation, pick from face-down grid, flip on slot click.
3. Reading phase: per-card meanings from card data + topic intro; journal save, PNG export, hash share.
4. Daily card banner via `daily-card.ts` + localStorage salt.

## Styling & UX issues (audit)

- Heavy **glassmorphism** + **cyan/neon** accents — conflicts with requested premium antique gold / navy direction.
- Home **is** the reading UI — no dedicated **gateway** landing.
- Navigation uses emoji for settings; spread/topic steps are functional but not **immersive “reading room”**.
- **No Celtic Cross** (10); five-card spread exists as `cross` but without visual spread preview.
- **No spirituality topic** (only `self` as growth proxy).
- Library: search only; **no suit filters**; minors not listed.
- Interpretations: long paragraphs; **no structured sections** (position, topic lens, synthesis).
- `FlipCard` ignores **`prefers-reduced-motion`** from settings (only deck shuffle respects `reduceMotion`).
- Accessibility: some good patterns (aria on mute); modals/nav need consistent focus management review.

## Bugs / inconsistencies

- `getActiveDeckCards` in `deck.ts` returns majors only even when `deckMode === "full"`.
- `.gitignore` had duplicate `.vercel` entry (cleaned in prior session).
- Journal “Replay” links use `href={\`/${hash}\`}` — works on `/` but must update when reading moves to `/reading`.
- Metadata still says “22 Major” only.

## Responsive notes

- Reading grid adapts (`grid-cols-1 sm:grid-cols-3` etc.); deck picker scrolls on mobile.
- Sticky nav; max-width `5xl` — readable but not “immersive” on large desktop.

## Testing

- **No Playwright/Jest** in `package.json` — QA is manual + `npm run lint` / `npm run build`.

## Redesign constraints (from brief)

- Preserve working client-side features and localStorage journal format (v2).
- Do not add fake APIs or cloud sync claims.
- 72-card deck: **22 art complete**, **50 minors = data + placeholders** until art pipeline runs.
- Use existing major meanings as **source of truth** for interpretation layer.
