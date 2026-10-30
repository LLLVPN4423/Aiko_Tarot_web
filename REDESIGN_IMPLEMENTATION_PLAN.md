# Redesign Implementation Plan

## Phase 0 — Audit ✅

Deliverables: `REDESIGN_AUDIT.md`, `EXISTING_FEATURES_INVENTORY.md`, this file.

## Phase 1 — Design system

- [x] CSS tokens (midnight navy, antique gold, typography roles) in `globals.css`
- [ ] Shared UI primitives: `Button`, `SectionHeading`, `SiteFooter`, `SpreadPreview`
- [ ] Reduce glass/neon; gold accents for emphasis only

## Phase 2 — Application UX

- [x] `/` — Celestial Gateway landing (`HomeGateway`)
- [x] `/reading` — Reading Room (`PetTarotApp` relocated)
- [x] Nav + footer updated; replay links point to `/reading#...`
- [x] Spread: add `celtic` (10); clarify `cross` as 5-card expanded
- [x] Topic: add `spirituality`
- [x] Structured reading UI via `ReadingInterpretation` + `lib/interpretation.ts`
- [ ] Reading room layout pass (full visual polish — iterative)

## Phase 3 — 72-card deck

- [x] `Celestial_Cat_Tarot_72_Blueprint.md` manifest
- [x] `src/data/minor-arcana.ts` — 50 records + suit templates
- [x] `src/data/deck-index.ts` — unified 72-card index
- [x] `deck.ts` — full deck when `deckMode === "full"`
- [x] Placeholder faces for minors (SVG component)
- [ ] Generate 50 minor illustrations (batch pipeline — **not claimed complete**)
- [ ] Optional: regenerate card back asset

## Phase 4 — Motion

- [x] `FlipCard` respects settings + `prefers-reduced-motion`
- [ ] Page transition wrapper (optional light fade)

## Phase 5 — Responsive

- [x] Gateway + library filters mobile-friendly
- [ ] Celtic spread layout tuning on small screens

## Phase 6 — Library & journal

- [x] Library: category filters + 72-card list
- [ ] Journal: search/filter (next iteration)

## Phase 7 — QA docs

- [x] `REDESIGN_IMPLEMENTATION_REPORT.md`
- [x] `QA_TEST_REPORT.md`
- [x] `CARD_DECK_STATUS.md`
- [ ] Playwright (optional — add if time)

## Execution order (this session)

1. Tokens + shell (nav, footer, gateway, `/reading` route)
2. Data model (72 cards, spreads, topics, interpretation)
3. Library + reading UI components
4. Build/lint + QA reports
