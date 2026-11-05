# Celestial Cat Tarot — Project Context (for agents)

**Read this file first** before exploring the repo. Prefer this over broad codebase scans.  
After any meaningful change, **append a changelog entry** at the bottom (do not rewrite history).

## Product

- **Name:** Celestial Cat Tarot (repo folder `pet-tarot`; GitHub `Aiko_Tarot_web`)
- **Live:** https://pet-tarot-rose.vercel.app
- **What it is:** Client-side Next.js tarot web app — bilingual VI/EN, interactive reading room, 72-card custom deck, journal in localStorage
- **What it is NOT:** No LLM/AI providers, no AI SDK, no chatbot AI, no backend DB, no Neon. Interpretations are **deterministic / rule-based only**.

## Stack

| Piece | Detail |
|-------|--------|
| Framework | Next.js **16.4.x** App Router (breaking vs older Next — check `node_modules/next/dist/docs/` + `AGENTS.md`) |
| UI | React 19, Tailwind 4, Framer Motion |
| Deploy | Vercel production alias `pet-tarot-rose.vercel.app` |
| Persistence | Browser localStorage only |
| Tests | `npm run test:reader` (tsx smoke); `npm run lint`; `npm run build` |

## Deck (preserve identity)

- **72 cards total** — do **not** expand to RWS 78
- 22 Major + 13 Celestial Wands + 13 Lunar Cups + 12 Astral Swords + 12 Golden Pentacles
- No Kings anywhere; Swords & Pentacles have **no Queens**
- Art: `public/cards/*.png` (status: `CARD_DECK_STATUS.md`)

## Key directories

```
src/app/                 # routes: /, /reading, /library, /journal, /about
src/components/          # PetTarotApp, ReadingInterpretation, HomeGateway, …
src/data/deck-index.ts   # runtime TarotCard merge (72)
src/data/major-arcana.ts # majors
src/data/minors/         # minor specs + assemble
src/data/knowledge/      # structured KB for interpretation engine
src/data/spreads/        # configurable spread registry
src/lib/reader/          # deterministic interpretation orchestrator
src/lib/tarot.ts         # journal, legacy SpreadId/TopicId helpers
src/lib/deck.ts          # shuffle / draw
```

## Reading flow (mental model)

1. Setup: spread (registry id via `?spread=`), topic, depth (`quick|standard|deep`), optional question  
2. Deck: shuffle → user picks face-down cards into slots → flip  
3. Reading: `buildReading()` → structured UI + rule-based follow-up session  

**Orchestrator:** `src/lib/reader/index.ts` → question → card-context → patterns → combinations → narrative → advice  
**Session key:** `celestial-reading-session-v1`  
**Journal key:** `pet-tarot-journal-v2` (card ids; not full prose)

## Spreads

Source of truth: `src/data/spreads/registry.ts`  
IDs include: `single`, `three-time` (+ other 3-card variants), `five`, `celtic`  
URL: `/reading?spread=<registryId>` (legacy `three` → `three-time`)  
UI preview layouts still use legacy family in `SpreadPreview.tsx`.

## Topics

`general | love | career | finance | self | family | spirituality` — see `src/data/topic-lenses.ts`

## Hard rules for agents

1. **No AI/LLM** integration — ever (product decision).
2. Keep **72-card** Celestial Cat structure.
3. Prefer extending KB/registry/reader rules over inventing new random systems.
4. Bilingual: user-facing strings VI + EN.
5. Do not claim cross-device sync or supernatural certainty in copy.
6. Before large refactors: skim this file + the matching report under repo root (`TAROT_*.md`, `INTERPRETATION_ENGINE_REPORT.md`, etc.) instead of rereading all of `src/`.

## Useful commands

```bash
npm run dev
npm run build
npm run lint
npm run test:reader
npx vercel deploy --prod --yes
```

## Docs map (deep dive only if needed)

| Doc | When to open |
|-----|----------------|
| `TAROT_INTELLIGENCE_ARCHITECTURE.md` | Interpretation layer design |
| `TAROT_KNOWLEDGE_BASE_REPORT.md` | KB completeness |
| `TAROT_READER_AUDIT.md` / `TAROT_KNOWLEDGE_GAPS.md` | Baseline gaps |
| `INTERPRETATION_ENGINE_REPORT.md` | Engine stages |
| `READING_SESSION_ARCHITECTURE.md` | Session / follow-up |
| `CARD_DECK_STATUS.md` | Art inventory |
| `REDESIGN_*` | Older UI redesign history |

---

## Agent changelog

Append newest entries at the **top** of this list (newest first).  
Format: `- YYYY-MM-DD — <one line: what changed + key paths>`

- 2026-11-06 — Removed optional question input from reading setup (`PetTarotApp.tsx`); readings use topic + spread only.
- 2026-11-06 — Clarified readings: less meta/jargon, one meaning+tip per card, shorter overview/narrative/guidance (`src/lib/reader/*`, `ReadingInterpretation.tsx`).
- 2026-11-05 — Added `PROJECT_CONTEXT.md` + `.cursor/rules/project-context.mdc` so agents read/update project context instead of full-repo rediscovery.
- 2026-10-31 — Deterministic bilingual interpretation engine (`src/data/knowledge/`, `src/data/spreads/`, `src/lib/reader/`), reading UI + follow-up session; commit `53d4391`.
- 2026-10-31 — Fixed spread URL/`?spread=` so 1/5/10-card layouts apply; commit `38a1fb9`.
- 2026-10-31 — Full 72-card art + redesign + topic readings shipped; commit `1e07b2a`.
