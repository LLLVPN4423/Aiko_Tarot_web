# Tarot Knowledge Gaps

Relative to the Deterministic Professional KB target (No AI).

## Structural gaps

| Gap | Impact |
|-----|--------|
| No element / numerology / archetype on runtime cards | Cannot run elemental or number pattern analysis reliably |
| Astrology only in art JSON for majors | Not available to interpretation engine |
| Majors lack `symbolism` | Deep readings thinner for majors than minors |
| Topic × reversal missing | Love/career/etc. ignore upright vs reversed |
| No finance / family topics | Spec topics incomplete (`TopicId` lacks them) |
| No combination dictionary | Bridges are keyword templates only |
| No reversed-method taxonomy | All reversals treated similarly in UI copy |
| Spread positions not role-typed | Counsel uses regex on localized labels |
| Three-card locked to Past/Present/Future | Cannot offer other classic configurations |
| Journal omits interpretation + session | Follow-up cannot reconstruct rich reading |

## Content quality gaps

- Existing prose is usable but not structured into psychological / emotional / behavioral / advice facets.
- Tradition sources (RWS / Marseille / Thoth / deck-specific) not tagged.
- Custom court structure (no Kings; partial Queens) undocumented in engine rules.

## Non-goals (not gaps)

- Adding 6 missing RWS cards (Kings + Queens for Swords/Pentacles) — out of scope; keep Celestial Cat 72.
- LLM paraphrase or chatbot — explicitly rejected.

## Fill order

1. Typed KB schema + metadata for all 72.
2. Map existing bilingual copy into structured profiles.
3. Add element/number/archetype + source tags.
4. Topic fields with orientation awareness + finance/family.
5. Combination + spread role data.
6. Validation report (`TAROT_KNOWLEDGE_BASE_REPORT.md`).
