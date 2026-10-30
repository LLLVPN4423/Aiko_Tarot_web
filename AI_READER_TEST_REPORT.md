# Deterministic Reader Test Report

**Note:** Filename kept for plan compatibility. This product has **no AI reader**.

## Checks

| Case | Expected | Status |
|------|----------|--------|
| 72 KB records | `knowledgeCards.length === 72` | Covered by `scripts/test-reader.mjs` |
| Topics complete | 7 topics × upright/reversed | Same |
| Celtic 10 | registry cardCount 10 | Same |
| 3-card love reading | narrative + guidance + ethics | Same |
| No OpenAI strings in result | absent | Same |
| Follow-up context | session answers from same cards | Manual / UI |
| Journal still saves | legacy spread family ids | Manual |
| Lint / build | green | See CI/local |

## How to run

```bash
node scripts/test-reader.mjs
npm run lint
npm run build
```

## Limitations

- Prose quality is rule-composed; not human-reviewed card-by-card for every facet.
- Combination coverage is a seed set.
- Evaluation is structural, not “exact wording” gold labels.
