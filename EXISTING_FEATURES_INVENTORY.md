# Existing Features Inventory

Features **must remain working** after redesign unless explicitly migrated.

## Reading (`PetTarotApp`)

- [x] Spread selection: `single`, `three`, `cross` (5 positions)
- [x] Topic selection: `general`, `love`, `career`, `self`
- [x] Optional question field
- [x] Shuffle deck with motion (respects `reduceMotion` setting)
- [x] Manual draw from face-down deck into spread slots
- [x] Flip animation per slot (`FlipCard`)
- [x] Modal zoom on flipped card (`CardModal`)
- [x] Reading summary + per-position meanings (upright/reversed from card data)
- [x] Topic lens intro text (`topic-lenses.ts`)
- [x] Save journal entry (max 50)
- [x] Export reading as PNG (`html2canvas`)
- [x] Share via Web Share API or clipboard + URL hash encoding
- [x] Restore reading from URL hash on load
- [x] Daily card banner (`DailyCardBanner`)
- [x] Bilingual UI toggle (vi/en)
- [x] Audio: BGM + hover/flip SFX with mute + localStorage preference
- [x] Onboarding modal + settings drawer (reversed %, deck mode, reduce motion)

## Library

- [x] Grid of 22 Major Arcana
- [x] Search by name/keywords
- [x] Static detail pages per slug

## Journal

- [x] List entries (date, spread, question, cards, notes)
- [x] Edit note inline
- [x] Delete entry
- [x] Replay via hash link
- [x] v1 → v2 migration for position labels

## About / meta

- [x] About page + disclaimer
- [x] `manifest.json`, sitemap, robots
- [x] OpenGraph metadata

## Deck / art pipeline (repo)

- [x] 22 composed major images in `public/cards/`
- [x] Scripts: `deck:meta`, `deck:compose`
- [x] Prompts + QC docs under `celestial-cat-tarot/`

## Not implemented (gaps vs product brief)

- [ ] 72-card playable deck (minors empty)
- [ ] Celtic Cross (10-card) spread
- [ ] Dedicated landing / gateway home
- [ ] Structured interpretation sections + topic-specific card fields
- [ ] Library filters by suit / 72-card gallery
- [ ] Journal search/filter/export
- [ ] E2E test suite
