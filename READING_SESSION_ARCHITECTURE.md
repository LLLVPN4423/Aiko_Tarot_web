# Reading Session Architecture

## Storage

| Key | Purpose |
|-----|---------|
| `celestial-reading-session-v1` | Active reading result + follow-up turns |
| `pet-tarot-journal-v2` | Historical journal (card ids; unchanged) |

## Session shape

- readingId, timestamps
- full `ReadingResult` (deterministic)
- followUps[{ prompt, answer{vi,en} }]

## Boundaries

1. Current session drives follow-up answers.
2. Journal history does not silently alter new readings.
3. Clear follow-up chat without deleting journal entries.
4. No cross-device sync.

## No AI

Follow-ups are pattern-matched templates over the saved cards/positions/combinations.
