import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";
import { CARD_SPECS } from "./card-specs.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const deckRoot = path.join(__dirname, "..", "celestial-cat-tarot");
const assetsDir = path.join(
  process.env.USERPROFILE || "",
  ".cursor/projects/c-Users-ACER-pet-tarot/assets",
);

function padId(id) {
  return String(id).padStart(2, "0");
}

async function importOne(id, src) {
  const spec = CARD_SPECS.find((c) => c.id === id);
  if (!spec) throw new Error(`Unknown id ${id}`);
  const dest = path.join(
    deckRoot,
    "assets/cards",
    `${padId(id)}-${spec.slug}`,
    "art_raw.png",
  );
  if (!fs.existsSync(src)) throw new Error(`Missing source: ${src}`);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  await sharp(src).png().toFile(dest);
  console.log("Imported:", dest);
}

const args = process.argv.slice(2);
if (args[0] === "--all-generated") {
  const files = fs.readdirSync(assetsDir).filter((f) => f.startsWith("deck-") && f.endsWith(".jpg"));
  for (const f of files) {
    const m = f.match(/^deck-(\d+)-/);
    if (!m) continue;
    await importOne(Number(m[1]), path.join(assetsDir, f));
  }
} else if (args[0] === "--id" && args[1] && args[2] === "--src" && args[3]) {
  await importOne(Number(args[1]), args[3]);
} else {
  console.error("Usage: import-raw-art.mjs --id N --src path | --all-generated");
  process.exit(1);
}
