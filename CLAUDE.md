# Sunny Artis – Website Dokumentation

Astro-Website für Sandra Heise / Sunny Artis. Deployed auf GitHub Pages unter `https://sandra-heise.github.io/Website/` (Ziel: `https://www.sunnyartis.de`).

## Build & Deploy

```bash
npm run build    # Baut nach /dist
npm run dev      # Dev-Server auf localhost:4321
```

GitHub Pages: jeder Push auf `master` deployt automatisch (falls GitHub Actions eingerichtet).

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

Alle Bildpfade im Code mit `${base}/ordner/bild.jpg` — nie mit absolutem `/` beginnen (wegen GitHub Pages Basepfad `/Website/`).

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
├── galerie.astro        Galerie
├── portraets.astro      Portrait-Aufträge
├── schmuck.astro        Schmuck
├── basteln.astro        Basteln
├── downloads.astro      Kostenlose Plotterdateien
├── blog.astro           Blog-Übersicht
├── blog/
│   ├── ausmalen-leinwand.astro
│   ├── halloween-laterne.astro
│   ├── das-sind-wir.astro
│   ├── kreativmarkt-magdeburg.astro
│   └── federn-zeichnen.astro
├── ueber-mich.astro
├── kontakt.astro
├── impressum.astro
└── datenschutz.astro
```
