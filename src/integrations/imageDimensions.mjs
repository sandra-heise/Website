// Astro-Integration: ergänzt nach dem Build bei allen lokalen <img> ohne width/height die echten
// Bildmaße. Der Browser reserviert damit den Platz vorab, und die Seite springt beim Laden nicht
// (CLS). Das Seitenverhältnis bleibt erhalten, weil global.css `img { height: auto; }` setzt.
import sharp from 'sharp';
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

function* htmlFiles(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* htmlFiles(p);
    else if (name.endsWith('.html')) yield p;
  }
}

export default function imageDimensions() {
  return {
    name: 'image-dimensions',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const distDir = fileURLToPath(dir);
        const sizes = new Map();
        const sizeOf = async (src) => {
          if (!sizes.has(src)) {
            let size = null;
            try {
              const m = await sharp(join(distDir, decodeURIComponent(src))).metadata();
              // EXIF-Orientierung 5–8 = um 90° gedreht → Breite/Höhe tauschen
              size = (m.orientation ?? 1) >= 5 ? [m.height, m.width] : [m.width, m.height];
            } catch {
              // Datei nicht lesbar (z. B. SVG ohne Maße) → Tag unverändert lassen
            }
            sizes.set(src, size);
          }
          return sizes.get(src);
        };

        let added = 0;
        for (const file of htmlFiles(distDir)) {
          const html = readFileSync(file, 'utf8');
          const tags = html.match(/<img\b[^>]*>/g) ?? [];
          let out = html;
          for (const tag of new Set(tags)) {
            if (/\s(width|height)=/.test(tag)) continue;
            const src = tag.match(/\ssrc="(\/[^"]+)"/)?.[1];
            if (!src || src.startsWith('//')) continue;
            const size = await sizeOf(src.split(/[?#]/)[0]);
            if (!size) continue;
            const withSize = tag.replace(/^<img\b/, `<img width="${size[0]}" height="${size[1]}"`);
            added += out.split(tag).length - 1;
            out = out.split(tag).join(withSize);
          }
          if (out !== html) writeFileSync(file, out);
        }
        logger.info(`width/height bei ${added} Bildern ergänzt`);
      },
    },
  };
}
