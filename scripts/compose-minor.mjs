/**
 * Compose a minor arcana card (art_raw → framed final → public/cards).
 * Usage: node scripts/compose-minor.mjs --id 22
 *        node scripts/compose-minor.mjs --slug wands-ace
 *        node scripts/compose-minor.mjs --all-pending
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { MINOR_SPECS } from "./minor-card-specs.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");
const deckRoot = path.join(projectRoot, "celestial-cat-tarot");
const publicCards = path.join(projectRoot, "public", "cards");
const exportRoot = path.join(projectRoot, "CELESTIAL_CAT_TAROT");

const W = 1000;
const H = 1500;
const ART_X = 70;
const ART_Y = 120;
const ART_W = 860;
const ART_H = 1140;

function padId(id) {
  return String(id).padStart(2, "0");
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
  <text x="500" y="1385" text-anchor="middle" fill="#E7D7B5" font-family="Georgia, 'Times New Roman', serif" font-size="28" font-weight="600" letter-spacing="3">${name}</text>
</svg>`);
}

export async function composeMinor(spec, rawSourcePath) {
  const folder = path.join(deckRoot, "assets", "cards", `${padId(spec.id)}-${spec.slug}`);
  fs.mkdirSync(folder, { recursive: true });
  const rawPath = path.join(folder, "art_raw.png");
  const composedPath = path.join(folder, "art_composed.png");
  const finalPath = path.join(folder, "final.png");
  const publicPath = path.join(publicCards, `${padId(spec.id)}-${spec.slug}.png`);
  const exportDir = path.join(exportRoot, spec.folder);
  fs.mkdirSync(exportDir, { recursive: true });
  const exportPath = path.join(exportDir, spec.filename);

  if (rawSourcePath && fs.existsSync(rawSourcePath)) {
    await sharp(rawSourcePath).png().toFile(rawPath);
  }
  if (!fs.existsSync(rawPath)) {
    throw new Error(`Missing art_raw: ${rawPath}`);
  }

  const art = await sharp(rawPath)
    .resize(ART_W, ART_H, { fit: "cover", position: "centre" })
    .png()
    .toBuffer();

  const base = await sharp({
    create: {
      width: W,
      height: H,
      channels: 4,
      background: { r: 8, g: 9, b: 16, alpha: 1 },
    },
  })
    .png()
    .toBuffer();

  const overlay = buildOverlaySvg(spec.roman, spec.name);

  await sharp(base)
    .composite([
      { input: art, left: ART_X, top: ART_Y },
      { input: overlay, top: 0, left: 0 },
    ])
    .png()
    .toFile(composedPath);

  await fs.promises.copyFile(composedPath, finalPath);
  await fs.promises.copyFile(finalPath, publicPath);
  await fs.promises.copyFile(rawPath, exportPath);

  return { finalPath, publicPath, exportPath, imagePath: `/cards/${padId(spec.id)}-${spec.slug}.png` };
}

function parseArgs() {
  const args = process.argv.slice(2);
  let id = null;
  let slug = null;
  let raw = null;
  let allPending = false;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--id") id = Number(args[++i]);
    if (args[i] === "--slug") slug = args[++i];
    if (args[i] === "--raw") raw = args[++i];
    if (args[i] === "--all-pending") allPending = true;
  }
  return { id, slug, raw, allPending };
}

const { id, slug, raw, allPending } = parseArgs();

if (allPending) {
  for (const spec of MINOR_SPECS) {
    const folder = path.join(deckRoot, "assets", "cards", `${padId(spec.id)}-${spec.slug}`);
    const rawPath = path.join(folder, "art_raw.png");
    if (!fs.existsSync(rawPath)) continue;
    const result = await composeMinor(spec);
    console.log("OK", spec.slug, result.publicPath);
  }
} else {
  const spec =
    id != null
      ? MINOR_SPECS.find((c) => c.id === id)
      : MINOR_SPECS.find((c) => c.slug === slug);
  if (!spec) {
    console.error("Usage: node scripts/compose-minor.mjs --id 22 [--raw path]");
    process.exit(1);
  }
  const result = await composeMinor(spec, raw);
  console.log(JSON.stringify(result, null, 2));
}
