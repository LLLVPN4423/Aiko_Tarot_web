# Celestial Cat Tarot — 72-Card Blueprint

Custom deck (not traditional 78). Same cat identity across all art.

**Character reference (repo):** `celestial-cat-tarot/assets/reference/cat_reference.png`

## Structure

| Group | Count | IDs | Slug prefix |
|-------|------:|-----|-------------|
| Major Arcana | 22 | 0–21 | `the-fool`, … |
| Celestial Wands | 13 | 22–34 | `wands-*` |
| Lunar Cups | 13 | 35–47 | `cups-*` |
| Astral Swords | 12 | 48–59 | `swords-*` |
| Golden Pentacles | 12 | 60–71 | `pentacles-*` |

## Courts (custom)

- Wands & Cups: Ace–10, Page, Knight, Queen (**no King**)
- Swords & Pentacles: Ace–10, Page, Knight (**no Queen/King**)

## Art pipeline

1. Generate **art only** (no baked text) — prompts in `celestial-cat-tarot/prompts/`
2. Compose frame + title via `scripts/compose-card.mjs`
3. Publish to `public/cards/{slug}.png`
4. Update `imagePath` in data files

## Status

See `CARD_DECK_STATUS.md` for generated vs placeholder counts.

## Card back

Target: symmetrical celestial geometry, gold frame, cat emblem — asset TBD (`public/cards/card-back.png`).
