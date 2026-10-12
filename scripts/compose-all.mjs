import { execSync } from "child_process";
import { CARD_SPECS } from "./card-specs.mjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const deckRoot = path.join(__dirname, "..", "celestial-cat-tarot");

function padId(id) {
  return String(id).padStart(2, "0");
}

const ids = process.argv.slice(2).map(Number).filter((n) => !Number.isNaN(n));
const list = ids.length ? CARD_SPECS.filter((c) => ids.includes(c.id)) : CARD_SPECS;

for (const spec of list) {
  const raw = path.join(
    deckRoot,
    "assets/cards",
    `${padId(spec.id)}-${spec.slug}`,
    "art_raw.png",
  );
  if (!fs.existsSync(raw)) {
    console.warn("Skip (no raw):", spec.id, spec.slug);
    continue;
  }
  execSync(`node scripts/compose-card.mjs --id ${spec.id}`, {
    cwd: path.join(__dirname, ".."),
    stdio: "inherit",
  });
}
