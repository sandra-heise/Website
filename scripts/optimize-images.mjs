// Verkleinert zu große Bilder in public/ direkt an Ort und Stelle (Dateiname bleibt gleich).
// Aufruf: npm run optimize-images            (ändert Dateien)
//         npm run optimize-images -- --dry   (zeigt nur an, was passieren würde)
// Mehrfach ausführbar: bereits optimierte Bilder liegen unter den Grenzwerten und werden übersprungen.
import sharp from 'sharp';
import { readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const ROOT = 'public';
const MAX_EDGE = 1400;          // längste Kante in px
const MIN_BYTES = 200 * 1024;   // kleinere Dateien nur anfassen, wenn sie zu groß (in px) sind
const MIN_SAVING = 0.1;         // nur überschreiben, wenn mind. 10 % kleiner
// Sonderfälle: Bilder, die deutlich kleiner angezeigt werden
const SPECIAL = { 'logo.png': 240 };  // Header-Logo, angezeigt mit 60 px Höhe

const dry = process.argv.includes('--dry');

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (/\.(jpe?g|png)$/i.test(name)) yield p;
  }
}

let before = 0, after = 0, changed = 0;
for (const file of walk(ROOT)) {
  const rel = relative(ROOT, file).split(sep).join('/');
  const input = readFileSync(file);
  const { width, height } = await sharp(input).metadata();
  const maxEdge = SPECIAL[rel] ?? MAX_EDGE;
  const tooWide = Math.max(width, height) > maxEdge;
  if (!tooWide && input.length < MIN_BYTES) continue;

  let img = sharp(input).rotate();
  if (tooWide) img = img.resize({ width: maxEdge, height: maxEdge, fit: 'inside' });
  img = /\.png$/i.test(file)
    ? img.png({ compressionLevel: 9, effort: 10 })
    : img.jpeg({ quality: 80, mozjpeg: true });
  const output = await img.toBuffer();
  if (output.length > input.length * (1 - MIN_SAVING)) continue;

  const meta = await sharp(output).metadata();
  console.log(`${rel}: ${width}x${height} ${(input.length / 1024) | 0} KB -> ${meta.width}x${meta.height} ${(output.length / 1024) | 0} KB`);
  before += input.length; after += output.length; changed++;
  if (!dry) writeFileSync(file, output);
}
console.log(`\n${changed} Bilder${dry ? ' (Probelauf)' : ''}: ${(before / 1048576).toFixed(1)} MB -> ${(after / 1048576).toFixed(1)} MB`);
