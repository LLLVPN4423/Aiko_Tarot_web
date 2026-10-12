import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { CARD_SPECS } from "./card-specs.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const deckRoot = path.join(root, "celestial-cat-tarot");
const publicCards = path.join(root, "public", "cards");
const majorPath = path.join(root, "src", "data", "major-arcana.ts");
const metaPath = path.join(deckRoot, "metadata", "major_arcana.json");

function padId(id) {
  return String(id).padStart(2, "0");
}

fs.mkdirSync(publicCards, { recursive: true });

for (const spec of CARD_SPECS) {
  const final = path.join(
    deckRoot,
    "assets/cards",
    `${padId(spec.id)}-${spec.slug}`,
    "final.png",
  );
  if (!fs.existsSync(final)) {
    console.warn("Missing final:", spec.id);
    continue;
  }
  const dest = path.join(publicCards, `${padId(spec.id)}-${spec.slug}.png`);
  fs.copyFileSync(final, dest);
  console.log("Copied", dest);
}

let src = fs.readFileSync(majorPath, "utf8");
for (const spec of CARD_SPECS) {
  const webPath = `/cards/${padId(spec.id)}-${spec.slug}.png`;
  const slug = spec.slug;
  const blockRegex = new RegExp(
    `(id: ${spec.id},[\\s\\S]*?slug: "${slug}"[\\s\\S]*?)(imagePath: "[^"]+",\\s*)?`,
    "m",
  );
  if (blockRegex.test(src)) {
    src = src.replace(blockRegex, (match, head, existing) => {
      if (existing) return head + `imagePath: "${webPath}",\n    `;
      const insertBefore = head.trimEnd();
      return (
        insertBefore +
        (insertBefore.endsWith(",") ? "" : "") +
        `\n    imagePath: "${webPath}",\n    `
      );
    });
  }
}

fs.writeFileSync(majorPath, src);

const meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
for (const card of meta.cards) {
  const final = path.join(
    deckRoot,
    "assets/cards",
    `${padId(card.id)}-${card.slug}`,
    "final.png",
  );
  if (fs.existsSync(final)) {
    card.image_status = "accepted";
    card.quality_status = "pass";
  }
}
fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2));
console.log("Updated major-arcana.ts and metadata.");
