/**
 * Compose final 2:3 tarot card: art + gold frame + Roman numeral + title.
 * Usage: node scripts/compose-card.mjs --id 0
 *        node scripts/compose-card.mjs --slug the-fool
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { CARD_SPECS } from "./card-specs.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");
const deckRoot = path.join(projectRoot, "celestial-cat-tarot");

const W = 1000;
const H = 1500;
const ART_X = 70;
const ART_Y = 120;
const ART_W = 860;
const ART_H = 1140;

function padId(id) {
  return String(id).padStart(2, "0");
}

function parseArgs() {
  const args = process.argv.slice(2);
  let id = null;
  let slug = null;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--id") id = Number(args[++i]);
    if (args[i] === "--slug") slug = args[++i];
  }
  return { id, slug };
}

function findSpec({ id, slug }) {
  if (id != null) return CARD_SPECS.find((c) => c.id === id);
  if (slug) return CARD_SPECS.find((c) => c.slug === slug);
  return null;
}

function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}

function buildOverlaySvg(roman, title) {
  const num = escapeXml(roman);
  const name = escapeXml(title.toUpperCase());
  return Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#b8944f"/>
      <stop offset="50%" stop-color="#D9B66F"/>
      <stop offset="100%" stop-color="#b8944f"/>
    </linearGradient>
  </defs>
  <rect x="24" y="24" width="952" height="1452" fill="none" stroke="url(#gold)" stroke-width="6" rx="12"/>
  <rect x="40" y="40" width="920" height="1420" fill="none" stroke="#D9B66F" stroke-width="2" opacity="0.55" rx="8"/>
  <text x="500" y="95" text-anchor="middle" fill="#D9B66F" font-family="Georgia, 'Times New Roman', serif" font-size="42" font-weight="600" letter-spacing="6">${num}</text>
  <text x="500" y="1385" text-anchor="middle" fill="#E7D7B5" font-family="Georgia, 'Times New Roman', serif" font-size="38" font-weight="600" letter-spacing="4">${name}</text>
</svg>`);
}

async function compose(spec) {
  const folder = path.join(deckRoot, "assets", "cards", `${padId(spec.id)}-${spec.slug}`);
  const rawPath = path.join(folder, "art_raw.png");
  const composedPath = path.join(folder, "art_composed.png");
  const finalPath = path.join(folder, "final.png");

  if (!fs.existsSync(rawPath)) {
    console.error(`Missing art_raw: ${rawPath}`);
    process.exit(1);
  }

  const art = await sharp(rawPath)
    .resize(ART_W, ART_H, { fit: "cover", position: "centre" })
    .png()
    .toBuffer();

  const base = sharp({
    create: {
      width: W,
      height: H,
      channels: 4,
      background: { r: 8, g: 9, b: 16, alpha: 1 },
    },
  }).png();

  const overlay = buildOverlaySvg(spec.roman, spec.name);

  await sharp(await base.toBuffer())
    .composite([
      { input: art, left: ART_X, top: ART_Y },
      { input: overlay, top: 0, left: 0 },
    ])
    .png()
    .toFile(composedPath);

  await fs.promises.copyFile(composedPath, finalPath);
  console.log(`Composed: ${finalPath}`);
  return finalPath;
}

const { id, slug } = parseArgs();
const spec = findSpec({ id, slug });
if (!spec) {
  console.error("Usage: node scripts/compose-card.mjs --id 0");
  process.exit(1);
}

await compose(spec);
