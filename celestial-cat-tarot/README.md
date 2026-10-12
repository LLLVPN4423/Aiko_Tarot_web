# Celestial Cat Tarot — Major Arcana (22)

Art pipeline for the **Celestial Cat Tarot** deck: cosmic vintage fine-art illustrations starring the user's tabby cat.

## Structure

- `assets/reference/` — character reference PNGs
- `assets/cards/XX-slug/` — `art_raw.png`, `art_composed.png`, `final.png`
- `prompts/` — style bible + per-card design sheets
- `metadata/major_arcana.json` — prompts, status, QC fields
- `reports/` — progress and pilot review

## Commands

```bash
node scripts/generate-deck-metadata.mjs
node scripts/compose-card.mjs --id 0
```

## Image generation

Use Cursor `GenerateImage` or external tools with:

- `image_prompt` / `negative_prompt` from JSON or `prompts/major_arcana/*.md`
- Reference paths in `assets/reference/cat_reference.png`

Art is generated **without text**; titles and Roman numerals are added by `compose-card.mjs`.

## Acceptance

Each card targets **≥ 85/100** on the rubric in the project brief. Do not mark `image_status: accepted` until human review passes.

## Web integration

Approved `final.png` files are copied to `public/cards/` and referenced from `src/data/major-arcana.ts`.
