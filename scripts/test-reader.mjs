/**
 * Deterministic reader smoke tests (no AI).
 * Run: node scripts/test-reader.mjs
 */
import { createRequire } from "module";
import { register } from "node:module";
import { pathToFileURL } from "node:url";

// Use next/tsx path via dynamic import of compiled isn't available — use a lightweight inline check
// against exported TS via tsx if present; otherwise validate JSON-like invariants by spawning npx tsx.

import { spawnSync } from "child_process";

const code = `
import { knowledgeCards, knowledgeStats } from "./src/data/knowledge/index.ts";
import { spreadRegistry } from "./src/data/spreads/registry.ts";
import { buildReading, buildDrawnFromSpread } from "./src/lib/reader/index.ts";

const assert = (cond, msg) => { if (!cond) { console.error("FAIL:", msg); process.exit(1); } };

assert(knowledgeCards.length === 72, "expected 72 knowledge cards, got " + knowledgeCards.length);
assert(knowledgeStats.topicsComplete === true, "topics incomplete");
assert(spreadRegistry.length >= 8, "spread registry too small");

const celtic = spreadRegistry.find((s) => s.id === "celtic");
assert(celtic && celtic.cardCount === 10, "celtic must be 10");

const sample = knowledgeCards.slice(0, 3).map((c, i) => ({
  cardId: c.id,
  reversed: i === 1,
}));
const drawn = buildDrawnFromSpread({
  spreadId: "three-time",
  locale: "en",
  cards: sample,
});
const result = buildReading({
  question: "Should I stay in this relationship?",
  topic: "love",
  depth: "standard",
  spreadId: "three-time",
  locale: "en",
  cards: drawn,
  knowledge: knowledgeCards,
});

assert(result.cards.length === 3, "3 card interpretations");
assert(result.narrative.en.length > 20, "narrative present");
assert(result.guidance.next.en.length > 5, "guidance present");
assert(result.ethicsNote.en.includes("not"), "ethics note");
assert(!JSON.stringify(result).toLowerCase().includes("openai"), "no openai leak");

console.log("OK: knowledge=72 spreads=" + spreadRegistry.length + " reading pipeline green");
`;

const r = spawnSync("npx", ["--yes", "tsx", "-e", code], {
  cwd: process.cwd(),
  encoding: "utf8",
  shell: true,
});
process.stdout.write(r.stdout || "");
process.stderr.write(r.stderr || "");
process.exit(r.status ?? 1);
