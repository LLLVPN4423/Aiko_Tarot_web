import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const jsonPath = path.join(
  __dirname,
  "..",
  "celestial-cat-tarot",
  "metadata",
  "major_arcana.json",
);

const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
const updates = process.argv.slice(2);
// usage: node update-card-status.mjs 0:composed 1:composed
for (const u of updates) {
  const [idStr, status] = u.split(":");
  const id = Number(idStr);
  const card = data.cards.find((c) => c.id === id);
  if (card) {
    card.image_status = status;
    if (status === "composed") card.quality_status = "review_pending";
  }
}
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
console.log("Updated", updates.join(", "));
