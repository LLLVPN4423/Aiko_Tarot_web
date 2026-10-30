# Tarot Knowledge Base Report

Date: 2026-10-31  
Mode: **Deterministic / No AI**

## Completeness

| Check | Status |
|-------|--------|
| 72 knowledge cards assembled | Yes (`knowledgeCards.length`) |
| Element on every card | Yes (suit defaults + major meta) |
| Numerology where applicable | Majors 0–21; pip minors 1–10 |
| Astrology tagged (majors) | RWS/Golden Dawn lineage labels + tradition tag |
| Upright / reversed profiles | Structured facets from bilingual core copy |
| 5 reversed approaches | blocked / internalized / excessive / delayed / shadow |
| Topics (7) × upright/reversed | general, love, career, finance, self, family, spirituality |
| Symbolism | Minors from source; majors deck-voice fallback |
| References | celestial-cat + rws/general notes (original wording) |

## Deck identity preserved

- 22 Major + 13 Wands + 13 Cups + 12 Swords + 12 Pentacles
- No Kings; Swords/Pentacles have no Queens
- Not expanded to 78-card RWS

## Source files

- `src/data/knowledge/types.ts`
- `src/data/knowledge/major-meta.ts`
- `src/data/knowledge/assemble.ts`
- `src/data/knowledge/combinations.ts`
- `src/data/knowledge/index.ts`

## Known limitations

- Faceted psychological/emotional paragraphs are rule-composed from existing bilingual core text, not separately hand-authored encyclopedia essays for every facet.
- Combination library is curated seed set (~10 pairs), not exhaustive.
- Marseille/Thoth differences are acknowledged in architecture docs; runtime majors lean RWS correspondences with tags.
