# Sunny Artis – Website Dokumentation

Astro-Website für Sandra Heise / Sunny Artis. Live unter `https://www.sunnyartis.de` — Hosting via GitHub Pages, DNS/Proxy/SSL via Cloudflare. Vorher lief ein Shopify-Shop unter derselben Domain; der Umzug ist abgeschlossen, Details siehe [SHOP-MIGRATION-PLAN.md](SHOP-MIGRATION-PLAN.md).

## Build & Deploy

```bash
npm run build    # Baut nach /dist
npm run dev      # Dev-Server auf localhost:4321
```

Jeder Push auf `master` deployt automatisch via GitHub Actions auf GitHub Pages (`.github/workflows/gh-pages.yml`).

`astro.config.mjs`: `site: 'https://www.sunnyartis.de/'`, `base: '/'` — Bildpfade trotzdem immer über `${base}/...` referenzieren (siehe „Bilder" unten), nicht hart auf `/` verlassen.

---

## Kostenlose Plotterdateien (Cloudflare R2)

### Bucket-Details
- **Öffentliche URL:** `https://pub-8b47857c39ee41ef8bdb9c45b849e41d.r2.dev/`
- **Verwaltung:** Cloudflare Dashboard → R2 → Bucket

### Neue Datei hinzufügen

1. **Datei hochladen** im Cloudflare Dashboard unter R2 (oder per `wrangler r2 object put`).
2. **Config eintragen** in `src/config/downloads.ts`:

```typescript
{
  id: "mein-motiv",
  title: "Name der Datei",
  beschreibung: "Kurze Beschreibung was die Datei enthält.",
  url: "https://pub-8b47857c39ee41ef8bdb9c45b849e41d.r2.dev/dateiname.zip",
  format: "ZIP (SVG)",
  kategorie: "Halloween",          // frei wählbar
  blogPost: "/blog/mein-artikel",  // optional – Link zur Anleitung
  vorschau: "/blog/mein-bild.jpg", // optional – Vorschaubild
}
```

3. **Fertig** — die Datei erscheint automatisch auf `/downloads` und kann im Blog verlinkt werden.

### Download-Link im Blog einbetten

```astro
<a href="https://pub-8b47857c39ee41ef8bdb9c45b849e41d.r2.dev/dateiname.zip" download class="btn btn-accent">
  Kostenlos herunterladen
</a>
```

### Verfügbare Dateien

| Datei | URL-Pfad |
|---|---|
| Halloween Laterne (SVG) | `SunnyArtis_plotterdatei_0114HalloweenLaterne.zip` |

---

## Blog-Beiträge

Alle Artikel liegen unter `src/pages/blog/`. Neue Artikel:

1. Datei erstellen: `src/pages/blog/mein-titel.astro`
2. Struktur kopieren von z. B. `federn-zeichnen.astro`
3. In `src/pages/blog.astro` zur `blogPosts`-Liste hinzufügen (oben = neueste)
4. Beitragsbild nach `public/blog/` legen und mit `${base}/blog/bildname.jpg` referenzieren

### Pflicht-Felder pro Blog-Karte

```typescript
{
  id: 6,
  title: "Titel",
  date: "1. Januar 2026",
  category: "Kategorie",
  excerpt: "Kurzer Teaser...",
  image: `${base}/blog/bild.jpg`,   // oder gradientClass als Fallback
  href: `${base}/blog/slug`,
}
```

---

## Bilder

| Bereich | Ordner | Hinweis |
|---|---|---|
| Gemälde | `public/gemaelde/` | JPG, hohe Auflösung |
| Malbücher | `public/malbuecher/` | Cover + Inhaltsseiten |
| Leinwände | `public/leinwaende/` | Querformat-Thumbnails |
| Blog | `public/blog/` | Hero + Artikel-Bilder |

Alle Bildpfade im Code mit `${base}/ordner/bild.jpg` — nie mit absolutem `/` beginnen. `base` ist aktuell `/` (löst also zu einem leeren String auf), das Pattern bleibt aber Konvention, falls sich der Base-Pfad je wieder ändert.

---

## SEO & Structured Data

Jede Seite bekommt:
- `title` + `description` über das `Layout`-Prop
- `canonical` auf `https://www.sunnyartis.de/pfad`
- JSON-LD per `<script is:inline type="application/ld+json" slot="head">`

Blog-Artikel zusätzlich:
- `og:type = article` + `article:*`-Meta-Tags
- `FAQPage`-Schema wenn sinnvoll
- `HowTo`-Schema für Anleitungen

---

## Seitenstruktur

```
src/pages/
├── index.astro          Startseite
├── malen.astro          Malbücher + Ausmalleinwände
├── gemaelde.astro       Original-Gemälde
├── portfolio.astro      Tabs: Porträts, Schmuck, Plotterdesigns u. a. (Anker z. B. /portfolio#portraets)
├── schmuck.astro        Schmuck
├── basteln.astro        Basteln
├── downloads.astro      Kostenlose Plotterdateien
├── blog.astro           Blog-Übersicht
├── blog/
│   ├── ausmalen-leinwand.astro
│   ├── halloween-laterne.astro
│   ├── das-sind-wir.astro
│   ├── kreativmarkt-magdeburg.astro
│   ├── federn-zeichnen.astro
│   └── prismacolor-stifte.astro
├── kontakt.astro
├── impressum.astro
└── datenschutz.astro
```

`ueber-mich.astro`, `galerie.astro` und `portraets.astro` existieren nicht (mehr) — nicht darauf verlinken.

---

## Shop-Umzug & Redirects (Shopify → Astro)

Der Umzug von Shopify auf diese Seite ist abgeschlossen (Go-live 18.08.2026). Relevant für die laufende Arbeit:

- `redirects/cloudflare-bulk-redirects.csv` — aktive Cloudflare-Bulk-Redirect-Liste für alte Shop-URLs. Bei neuen Alt-URL-Funden hier ergänzen und in Cloudflare (Bulk Redirects → Liste `shopify-migration`) neu importieren.
- `redirects/shopify-alte-urls.csv`, `redirects/shopify-redirects-export-original.csv` — Rohmaterial, nur noch als Referenz.
- Vollständiger Verlauf, offene Punkte (Catch-all-Regeln, Google-Ads-Feed, Shopify-Kündigungsdatum) und Monitoring-Hinweise: [SHOP-MIGRATION-PLAN.md](SHOP-MIGRATION-PLAN.md).
