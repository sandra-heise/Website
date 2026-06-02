# Sunny Artis – Website

Astro-Website für [Sunny Artis](https://sandra-heise.github.io/Website/), die Kunstwerkstatt von Sandra Heise.

## Live-URL

**[https://sandra-heise.github.io/Website/](https://sandra-heise.github.io/Website/)**  
Ziel-Domain: `https://www.sunnyartis.de`

Das Deployment läuft automatisch via GitHub Actions auf GitHub Pages, sobald Änderungen auf den `master`-Branch gepusht werden.

---

## Lokale Entwicklung

```sh
npm install
npm run dev
```

Dev-Server startet unter **`localhost:4321/Website/`** (nicht `localhost:4321` — wegen des konfigurierten Base-Pfads `/Website/`).

## Befehle

| Befehl | Aktion |
| :--- | :--- |
| `npm install` | Abhängigkeiten installieren |
| `npm run dev` | Dev-Server → `localhost:4321/Website/` |
| `npm run build` | Produktions-Build nach `./dist/` |
| `npm run preview` | Build lokal vorschauen |

---

## Projektstruktur

```
/
├── public/
│   ├── blog/           Bilder für Blog-Artikel
│   ├── gemaelde/       Original-Gemälde Fotos
│   ├── leinwaende/     Ausmalleinwand-Thumbnails (Querformat)
│   └── malbuecher/     Malbuch-Cover und Inhaltsseiten
├── src/
│   ├── components/     Header, Footer
│   ├── config/
│   │   └── downloads.ts    Zentrale Liste aller R2-Plotterdateien
│   ├── layouts/        Layout.astro (title, description, og, canonical)
│   ├── pages/
│   │   ├── blog/       Einzelne Blog-Artikel
│   │   └── *.astro     Alle Hauptseiten
│   ├── styles/         global.css
│   └── utils/          assetPath.js
└── astro.config.mjs    site + base konfiguriert
```

---

## Seiten

| Seite | Route | Beschreibung |
| :---- | :---- | :--- |
| Startseite | `/` | Hero, Highlights, CTA |
| Malbücher & Leinwände | `/malen` | 5 Malbücher + 2 Etsy-Kollektionen mit Collage |
| Gemälde | `/gemaelde` | Original-Gemälde, statische Daten |
| Galerie | `/galerie` | Bildergalerie |
| Porträts | `/portraets` | Portrait-Aufträge |
| Schmuck | `/schmuck` | Handgefertigter Schmuck |
| Basteln | `/basteln` | Bastelprodukte |
| **Downloads** | `/downloads` | Kostenlose Plotterdateien (R2) |
| **Blog** | `/blog` | Übersicht aller Artikel |
| Blog – Ausmalen | `/blog/ausmalen-leinwand` | |
| Blog – Halloween Laterne | `/blog/halloween-laterne` | inkl. kostenlosem Download |
| Blog – Das sind wir | `/blog/das-sind-wir` | |
| Blog – Kreativmarkt | `/blog/kreativmarkt-magdeburg` | |
| Blog – Federn zeichnen | `/blog/federn-zeichnen` | |
| Über mich | `/ueber-mich` | |
| Portfolio | `/portfolio` | |
| Kontakt | `/kontakt` | Formspree-Formular |
| Impressum | `/impressum` | |
| Datenschutz | `/datenschutz` | |

---

## Kostenlose Plotterdateien (Cloudflare R2)

Dateien werden auf **Cloudflare R2** gehostet und sind öffentlich zugänglich.

**Bucket-URL:** `https://pub-8b47857c39ee41ef8bdb9c45b849e41d.r2.dev/`

### Neue Datei hinzufügen

1. Datei im Cloudflare Dashboard hochladen (R2 → Bucket → Upload)
2. Eintrag in **`src/config/downloads.ts`** ergänzen:

```typescript
{
  id: "mein-motiv",
  title: "Name der Datei",
  beschreibung: "Was ist enthalten.",
  url: "https://pub-8b47857c39ee41ef8bdb9c45b849e41d.r2.dev/dateiname.zip",
  format: "ZIP (SVG)",
  kategorie: "Kategorie",
  blogPost: "/blog/mein-artikel",  // optional
  vorschau: "/blog/vorschau.jpg",  // optional
}
```

3. Fertig — erscheint automatisch auf `/downloads` und in der Blog-Übersicht.

### Verfügbare Dateien

| Titel | Dateiname |
| :---- | :-------- |
| Halloween Laterne | `SunnyArtis_plotterdatei_0114HalloweenLaterne.zip` |

---

## Blog-Artikel hinzufügen

1. Neue Datei unter `src/pages/blog/mein-slug.astro` anlegen (Vorlage: `federn-zeichnen.astro`)
2. Bilder nach `public/blog/` legen
3. Eintrag in `src/pages/blog.astro` in der `blogPosts`-Liste oben ergänzen (neueste zuerst)
4. Alle Bildpfade mit `${base}/blog/bild.jpg` — nie mit absolutem `/` (wegen Base-Pfad)

---

## Bilder

Alle Bildpfade im Code **immer** mit `${base}/ordner/bild.jpg` referenzieren — nie mit `/ordner/bild.jpg`.  
Grund: GitHub Pages liefert unter `/Website/`, ein einfaches `/` würde den Basepfad überspringen.

---

## SEO & Structured Data

Jede Seite hat:
- `title`, `description`, `canonical`, `og:image` via Layout-Props
- JSON-LD per `<script type="application/ld+json" slot="head">`
- BreadcrumbList-Schema

Blog-Artikel zusätzlich:
- `og:type = article` + `article:*`-Tags
- `FAQPage`-Schema (wo sinnvoll)
- `HowTo`-Schema für Schritt-für-Schritt-Anleitungen
- `speakable` für KI/Voice-Search

---

## Kontaktformular

Verarbeitet über **[Formspree](https://formspree.io)** — Konto: `sunnyartis@gmx.de`.

---

## Deployment

- Repository: `sandra-heise/Website`
- Branch: `master`
- Plattform: GitHub Pages + GitHub Actions
- `astro.config.mjs`: `site: 'https://sandra-heise.github.io/Website/'`, `base: '/Website/'`

Sobald die Domain `sunnyartis.de` umgestellt wird: `SITE`-Variable in den `.astro`-Dateien von `https://www.sunnyartis.de` auf die neue Domain anpassen (canonical URLs).
