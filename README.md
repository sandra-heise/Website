# Sunny Artis – Website

Astro-Website für [Sunny Artis](https://www.sunnyartis.de), die Kunstwerkstatt von Sandra Heise.

## Live-URL

**[https://www.sunnyartis.de](https://www.sunnyartis.de)**

Die Seite lief ursprünglich unter GitHub Pages (`sandra-heise.github.io/Website/`) und wurde im August 2026 auf die eigene Domain umgezogen (vorher: Shopify-Shop unter derselben Domain). Details zum Umzug, DNS-Setup und den Redirects für alte Shop-URLs stehen in [SHOP-MIGRATION-PLAN.md](SHOP-MIGRATION-PLAN.md).

DNS/Proxy läuft über **Cloudflare** (SSL: Full Strict), Hosting weiterhin über **GitHub Pages**. Das Deployment läuft automatisch via GitHub Actions auf GitHub Pages, sobald Änderungen auf den `master`-Branch gepusht werden.

---

## Lokale Entwicklung

```sh
npm install
npm run dev
```

Dev-Server startet unter **`localhost:4321`** (kein Unterpfad mehr — seit dem Domain-Umzug ist `base: '/'` konfiguriert).

## Befehle

| Befehl | Aktion |
| :--- | :--- |
| `npm install` | Abhängigkeiten installieren |
| `npm run dev` | Dev-Server → `localhost:4321` |
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
│   ├── malbuecher/     Malbuch-Cover und Inhaltsseiten
│   ├── CNAME           Custom-Domain-Datei für GitHub Pages (www.sunnyartis.de)
│   └── robots.txt      Verweist auf die generierte Sitemap
├── redirects/          CSV-Rohmaterial + fertige Cloudflare-Bulk-Redirect-Liste (Shopify-Umzug)
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
└── astro.config.mjs    site + base + sitemap-Integration konfiguriert
```

---

## Seiten

| Seite | Route | Beschreibung |
| :---- | :---- | :--- |
| Startseite | `/` | Hero, Highlights, CTA |
| Malbücher & Leinwände | `/malen` | 5 Malbücher + 2 Etsy-Kollektionen mit Collage |
| Gemälde | `/gemaelde` | Original-Gemälde, statische Daten |
| Portfolio | `/portfolio` | Tabs für Porträts, Schmuck, Plotterdesigns u. a. (Anker z. B. `/portfolio#portraets`) |
| Schmuck | `/schmuck` | Handgefertigter Schmuck |
| Basteln | `/basteln` | Bastelprodukte |
| **Downloads** | `/downloads` | Kostenlose Plotterdateien (R2) |
| **Blog** | `/blog` | Übersicht aller Artikel |
| Blog – Ausmalen | `/blog/ausmalen-leinwand` | |
| Blog – Halloween Laterne | `/blog/halloween-laterne` | inkl. kostenlosem Download |
| Blog – Das sind wir | `/blog/das-sind-wir` | |
| Blog – Kreativmarkt | `/blog/kreativmarkt-magdeburg` | |
| Blog – Federn zeichnen | `/blog/federn-zeichnen` | |
| Blog – Prismacolor-Stifte | `/blog/prismacolor-stifte` | |
| Kontakt | `/kontakt` | Formspree-Formular |
| Impressum | `/impressum` | |
| Datenschutz | `/datenschutz` | |

`/ueber-mich`, `/galerie` und `/portraets` existieren nicht mehr — Inhalte sind in `/portfolio` aufgegangen.

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
4. Alle Bildpfade mit `${base}/blog/bild.jpg` referenzieren (siehe „Bilder" unten)

---

## Bilder

Alle Bildpfade im Code mit `${base}/ordner/bild.jpg` referenzieren, nie mit absolutem `/ordner/bild.jpg` hart kodieren — `base` kommt aus `import.meta.env.BASE_URL`. Aktuell ist `base: '/'` konfiguriert, `${base}` löst also zu einem leeren String auf; das Pattern bleibt trotzdem Konvention im Code, falls der Base-Pfad sich je wieder ändert (z. B. Preview-Deployments).

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

**Sitemap:** wird automatisch über `@astrojs/sitemap` erzeugt (`dist/sitemap-index.xml`), `public/robots.txt` verweist darauf. Die Integration ist bewusst auf `@astrojs/sitemap@3.2.1` gepinnt — neuere Versionen (3.3+) setzen Astro 5 voraus und brechen den Build unter unserem aktuellen Astro 4.16.

---

## Kontaktformular

Verarbeitet über **[Formspree](https://formspree.io)** — Konto: `sunnyartis@gmx.de`.

---

## Deployment

- Repository: `sandra-heise/Website`
- Branch: `master`
- Plattform: GitHub Pages (Custom Domain `www.sunnyartis.de`) hinter **Cloudflare** (DNS, Proxy, SSL Full Strict, Redirects für alte Shop-URLs)
- `astro.config.mjs`: `site: 'https://www.sunnyartis.de/'`, `base: '/'`
- `public/CNAME`: `www.sunnyartis.de` — wird bei jedem Deploy aus `public/` übernommen

Alte Shopify-Shop-URLs werden über eine Cloudflare-Bulk-Redirect-Liste (`redirects/cloudflare-bulk-redirects.csv`) auf die passenden neuen Seiten umgeleitet. Details, offene Punkte und Monitoring-Hinweise: siehe [SHOP-MIGRATION-PLAN.md](SHOP-MIGRATION-PLAN.md).
