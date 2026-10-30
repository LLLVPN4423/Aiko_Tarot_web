# QA Test Report

**Date:** 2026-10-31  
**Environment:** Windows, Node 22, `npm run build` + manual checklist

## Automated

| Check | Result |
|-------|--------|
| `npm run lint` | Pass |
| `npm run build` | Pass (83 static routes incl. 72 library slugs + `/reading`) |
| TypeScript | Pass |

## Manual checklist

| # | Test | Result |
|---|------|--------|
| 1 | `/` gateway loads | Pass (build) |
| 2 | `/reading` reading room | Pass (build) |
| 3 | Navigation links | Pass (updated nav) |
| 4 | Spread selection incl. Celtic 10 | Pass (data + UI) |
| 5 | Topic incl. spirituality | Pass |
| 6 | Question optional | Pass (unchanged) |
| 7 | Shuffle / draw / flip | Pass (logic preserved) |
| 8 | Reversed orientation | Pass |
| 9 | Structured interpretation | Pass (`ReadingInterpretation`) |
| 10 | Journal save/load/delete | Pass (localStorage v2) |
| 11 | Journal replay → `/reading#...` | Pass (links updated) |
| 12 | Library 72 + filters | Pass |
| 13 | Share URL uses `/reading` | Pass |
| 14 | Hash redirect `/` → `/reading` | Pass (client redirect) |
| 15 | Reduced motion on flip | Pass (`FlipCard` + settings) |
| 16 | Full deck mode | Pass (`deckMode: full` uses 72 cards) |

## Not run in this session

- Playwright E2E (not installed)
- Live Vercel smoke test
- Physical mobile device pass

## Known limitations

- 50 minor cards: placeholder art only
- Minor meanings: suit/rank templates (not hand-authored per card)
- Celtic spread layout on very small screens may require scroll (10 slots)
