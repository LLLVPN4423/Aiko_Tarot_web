import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { CARD_SPECS } from "./card-specs.mjs";

const majorPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "src",
  "data",
  "major-arcana.ts",
);
let src = fs.readFileSync(majorPath, "utf8");

for (const spec of CARD_SPECS) {
  const pad = String(spec.id).padStart(2, "0");
  const webPath = `/cards/${pad}-${spec.slug}.png`;
  const slugLine = `slug: "${spec.slug}",`;
  const insert = `${slugLine}\n    imagePath: "${webPath}",`;
  if (src.includes(`${slugLine}\n    imagePath:`)) continue;
  if (!src.includes(slugLine)) {
    console.warn("Missing slug:", spec.slug);
    continue;
  }
  src = src.replace(slugLine, insert);
}

fs.writeFileSync(majorPath, src);
console.log("Patched imagePath for", CARD_SPECS.length, "cards");
