# Interpretation Engine Report

## Orchestrator

`buildReading()` in `src/lib/reader/index.ts` composes:

1. Question analysis (heuristics)
2. Card contextualization (position × orientation × topic × depth)
3. Pattern analysis (suits, elements, numbers, majors, courts)
4. Combination hits (curated pairs)
5. Narrative + guidance + reflections
6. Ethics note

## Spreads

Configurable registry: `src/data/spreads/registry.ts`  
Families: single, three (5 variants), five, celtic.

## Depth

`quick` | `standard` | `deep` — section inclusion only (same structured data).

## AI

**None.** No providers, adapters, or LLM calls.

## Follow-up

Rule matcher in `src/lib/reader/followup.ts` over session stored in `celestial-reading-session-v1`.
