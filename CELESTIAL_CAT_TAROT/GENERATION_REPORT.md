# Generation Report — Minor Arcana

**Updated:** 2026-10-31  
**Master reference:** `MASTER_REFERENCE/CAT_MASTER_REFERENCE.png`  
**Tool:** Cursor GenerateImage (`reference_image_paths`) + `scripts/compose-minor.mjs`

## Final counts (verified on disk)

| Suit | Target | Accepted files | Folder |
|------|-------:|---------------:|--------|
| Celestial Wands | 13 | **13** | `CELESTIAL_WANDS/` |
| Lunar Cups | 13 | **13** | `LUNAR_CUPS/` |
| Astral Swords | 12 | **12** | `ASTRAL_SWORDS/` |
| Golden Pentacles | 12 | **12** | `GOLDEN_PENTACLES/` |
| **Total** | **50** | **50** | — |

Also mirrored to `public/cards/{id}-{slug}.png` and wired via `src/data/minors/image-paths.ts`.

## Workflow notes

- Every card used the same master reference image.
- Artwork generated without baked titles; compose adds gold frame + Roman + English title.
- Full deck art total on site: **22 Major + 50 Minor = 72**.

## QC

- Spot-checked batches for tabby identity, yellow-green eyes, scene readability.
- No contact sheets; each card is an independent PNG.
- Regenerations were done inline when needed during batch production.
