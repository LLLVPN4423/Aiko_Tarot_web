import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { CARD_SPECS, buildImagePrompt, buildNegative } from "./card-specs.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..", "celestial-cat-tarot");

function padId(id) {
  return String(id).padStart(2, "0");
}

const cards = CARD_SPECS.map((spec) => ({
  id: spec.id,
  number: spec.id,
  slug: spec.slug,
  name: spec.name,
  roman_numeral: spec.roman,
  upright_meaning: spec.upright_meaning,
  visual_concept: spec.visual_concept,
  cat_pose: spec.cat_pose,
  props: spec.props,
  tarot_symbols: spec.tarot_symbols,
  astrology_symbols: spec.astrology_symbols,
  color_palette: spec.color_palette,
  composition: spec.composition,
  emotion: spec.emotion,
  image_prompt: buildImagePrompt(spec),
  negative_prompt: buildNegative(spec),
  image_status: [0, 1, 21].includes(spec.id) ? "prompt_ready" : "prompt_ready",
  quality_status: "pending",
  files: {
    art_raw: `assets/cards/${padId(spec.id)}-${spec.slug}/art_raw.png`,
    art_composed: `assets/cards/${padId(spec.id)}-${spec.slug}/art_composed.png`,
    final: `assets/cards/${padId(spec.id)}-${spec.slug}/final.png`,
  },
}));

fs.mkdirSync(path.join(root, "metadata"), { recursive: true });
fs.writeFileSync(
  path.join(root, "metadata", "major_arcana.json"),
  JSON.stringify({ project: "Celestial Cat Tarot", version: 1, cards }, null, 2),
);

for (const spec of CARD_SPECS) {
  const dir = path.join(root, "assets", "cards", `${padId(spec.id)}-${spec.slug}`);
  fs.mkdirSync(dir, { recursive: true });

  const md = `# ${spec.roman} — ${spec.name}

## Core meaning
${spec.upright_meaning}

## Visual concept
${spec.visual_concept}

## Cat action
${spec.cat_pose}

## Expression / gaze
${spec.emotion}

## Props
${spec.props}

## Tarot symbols
${spec.tarot_symbols}

## Astrology / astronomy
${spec.astrology_symbols}

## Secondary palette
${spec.color_palette.join(", ")}

## Composition / camera
${spec.composition}

## Background
${spec.scene}

## Identity (required)
See \`prompts/character_identity.md\` identity block.

## Image prompt
\`\`\`
${buildImagePrompt(spec)}
\`\`\`

## Negative prompt
\`\`\`
${buildNegative(spec)}
\`\`\`

## Status
- image_status: prompt_ready
- quality_status: pending
`;

  fs.writeFileSync(
    path.join(root, "prompts", "major_arcana", `${padId(spec.id)}-${spec.slug}.md`),
    md,
  );
}

console.log(`Wrote ${cards.length} cards to metadata and prompts.`);
