# Tarot Intelligence Architecture (Deterministic / No AI)

## Product rule

Celestial Cat Tarot interpretations are **100% rule-based**.  
No LLM providers, AI SDKs, AI gateways, provider adapters, or AI chatbots — now or later.

## Layers

1. **Knowledge Base** (`src/data/knowledge/`) — bilingual structured lore for 72 cards.
2. **Spread Registry** (`src/data/spreads/`) — configurable positions, roles, hints, layout.
3. **Question Analyzer** (`src/lib/reader/question.ts`) — heuristic focus/horizon (no ML).
4. **Card Contextualizer** (`src/lib/reader/card-context.ts`) — position × orientation × topic × depth.
5. **Pattern Analyzer** (`src/lib/reader/patterns.ts`) — suits, elements, numbers, majors, courts.
6. **Combination Engine** (`src/lib/reader/combinations.ts`) — curated pair rules + scoring.
7. **Narrative Builder** (`src/lib/reader/narrative.ts`) — coherent story composition.
8. **Advice Engine** (`src/lib/reader/advice.ts`) — guidance + reflection prompts.
9. **Orchestrator** (`src/lib/reader/index.ts`) — `buildReading()` → `ReadingResult`.
10. **Session Store** (`src/lib/reader/session.ts`) — localStorage reading + follow-up FAQ.
11. **Follow-up Rules** (`src/lib/reader/followup.ts`) — answers from session + KB only.
12. **Response UI** — structured reading view + transparency (“why this reading”).

## Data flow

User question + topic + depth + spread + drawn cards → orchestrator → structured `ReadingResult` → UI.  
Follow-up intents match rules against the same session; never reshuffle unless user starts a new reading.

## Determinism

Same inputs (locale, depth, cards, positions, topic, question classification) → same structured outputs.  
Randomness exists only in shuffle/draw, not in interpretation.

## Ethics (composition rules)

- Hedge language; no guaranteed futures.
- No mind-reading of third parties.
- Finance/medical/legal: reflective only + professional-help nudge when needed.
- Challenging cards balanced; positive cards not automatic success.

## Compatibility

- Preserve `TarotCard` façade for library/components.
- Journal v2 remains readable; sessions use a separate key.
- Bilingual `vi` | `en` throughout KB and engine strings.
