# Tarot Reader Audit — Celestial Cat Tarot

Date: 2026-10-31  
Scope: existing production app before Deterministic Interpretation upgrade  
AI status: **none** (and none planned — product is rule-based only)

## 1. Card database

| Layer | Path | Notes |
|-------|------|-------|
| Types | `src/data/deck-types.ts` | `TarotCardBase`: id, slug, arcana, name, keywords, upright, reversed, optional symbolism + 4 topic fields |
| Majors | `src/data/major-arcana.ts` | 22 cards, bilingual prose |
| Major topics | `src/data/major-topic-meanings.ts` | love / career / growth / spirit per major slug |
| Minors | `src/data/minors/{wands,cups,swords,pentacles}.ts` | Custom 50: 13+13+12+12 |
| Index | `src/data/deck-index.ts` | Merges topics onto majors; `allTarotCards` = 72 |

**Deck identity (preserve):** 72 cards total — no Kings; Swords & Pentacles have no Queens. Do not expand to RWS 78 silently.

## 2. Upright / reversed

- Present as single bilingual paragraphs per card.
- Topic fields do **not** vary by orientation (`topic-reading.ts` returns the same love/career/… string when dedicated copy exists).
- No structured reversed methods (blocked / internalized / excessive / delayed / shadow).

## 3. Spreads

Source: `src/lib/tarot.ts`  
UI exposes: `single`, `three`, `five`, `celtic`.  
Orphan: `cross` (duplicate of `five` positions).  
Layouts: hardcoded in `SpreadPreview.tsx`.  
No variants for three-card (always Past/Present/Future).

## 4. Draw / randomization

- `src/lib/deck.ts` — Fisher–Yates; reversal at shuffle (`reversedChance` default 0.35).
- User picks face-down cards into slots (`PetTarotApp`).
- `drawReading()` in `tarot.ts` is unused (majors-only auto-draw).

## 5. Interpretation logic

- `src/lib/interpretation.ts` — template sections + keyword bridges + suit count balance.
- `src/lib/topic-reading.ts` — topic frames + regex position counsel + light synthesis.
- UI: `ReadingInterpretation.tsx` — overview + per-card section list.
- **No** combination library, element/numerology analysis, question understanding, reading depth, or session follow-up.

## 6. AI integration

**Absent.** No API routes, no SDKs, no keys. Product direction: remain fully deterministic.

## 7. Frontend / backend

- Next.js App Router, client-only reading room.
- Persistence: localStorage (journal v2, settings, audio, daily salt).
- Deploy: Vercel (`pet-tarot-rose.vercel.app`).

## 8. Languages

- Card + UI: `vi` | `en` via `I18nProvider` (locale not persisted).

## 9. Journal

- Stores spread, topic, card ids + reversed, position labels, optional question/note.
- Does **not** store full interpretation text or follow-up history.

## 10. Working features to preserve

Reading room phases, shuffle/draw/flip, journal, share hash, library, bilingual UI, 72-card art, settings (deck mode major|full, reversal).
