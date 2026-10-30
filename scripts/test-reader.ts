import { knowledgeCards, knowledgeStats } from "../src/data/knowledge/index";
import { spreadRegistry } from "../src/data/spreads/registry";
import { buildDrawnFromSpread, buildReading } from "../src/lib/reader/index";

function assert(cond: unknown, msg: string): asserts cond {
  if (!cond) {
    console.error("FAIL:", msg);
    process.exit(1);
  }
}

assert(knowledgeCards.length === 72, `expected 72, got ${knowledgeCards.length}`);
assert(knowledgeStats.topicsComplete, "topics incomplete");
assert(spreadRegistry.length >= 8, "spread registry too small");

const celtic = spreadRegistry.find((s) => s.id === "celtic");
assert(celtic?.cardCount === 10, "celtic must be 10");

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
assert(result.ethicsNote.en.length > 10, "ethics note");
assert(!JSON.stringify(result).toLowerCase().includes("openai"), "no openai");

console.log(
  `OK: knowledge=${knowledgeCards.length} spreads=${spreadRegistry.length} pipeline green`,
);
