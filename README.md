# Sunny Artis – Website

Astro-Website für [Sunny Artis](https://sandra-heise.github.io/Website/), die Kunstwerkstatt von Sandra Heise.

## Live-URL

**[https://sandra-heise.github.io/Website/](https://sandra-heise.github.io/Website/)**

Die Seite wird automatisch via GitHub Actions auf GitHub Pages deployed, sobald Änderungen auf den `master`-Branch gepusht werden.

## Lokale Entwicklung

```sh
npm install
npm run dev
```

Der Dev-Server startet unter **`localhost:4321/Website/`** (nicht `localhost:4321` – wegen des konfigurierten Base-Pfads).

## Projektstruktur

```text
/
├── public/               # Statische Assets (Bilder, Favicon usw.)
├── src/
│   ├── components/       # Wiederverwendbare Komponenten (Header, Footer …)
│   ├── layouts/          # Seitenlayouts
│   ├── pages/            # Seiten (je Datei eine Route)
│   ├── styles/           # Globale CSS-Dateien
│   └── utils/            # Hilfsfunktionen (z. B. assetPath)
└── astro.config.mjs      # Astro-Konfiguration (site, base)
```

## Befehle

| Befehl                    | Aktion                                              |
| :------------------------ | :-------------------------------------------------- |
| `npm install`             | Abhängigkeiten installieren                         |
| `npm run dev`             | Dev-Server starten → `localhost:4321/Website/`      |
| `npm run build`           | Produktions-Build nach `./dist/`                    |
| `npm run preview`         | Build lokal vorschauen (vor dem Deployment)         |
| `npm run astro ...`       | Astro CLI-Befehle wie `astro add`, `astro check`    |

## Seiten & Status

| Seite | Route | Status |
| :---- | :---- | :----- |
| Startseite | `/` | ✅ fertig |
| Gemälde | `/gemaelde` | ✅ fertig (siehe unten) |
| Porträts | `/portraets` | 🔲 noch nicht gebaut |
| Galerie | `/galerie` | 🔲 noch nicht gebaut |
| Malbücher & Basteln | `/malen`, `/basteln` | 🔲 noch nicht gebaut |
| Schmuck | `/schmuck` | 🔲 noch nicht gebaut |
| Über mich | `/ueber-mich` | 🔲 noch nicht gebaut |
| Portfolio | `/portfolio` | 🔲 noch nicht gebaut |
| Kontakt | `/kontakt` | ✅ fertig |
| Impressum / Datenschutz | `/impressum`, `/datenschutz` | ✅ fertig |

---

## Gemälde-Seite

### Aufbau

- **Hero** mit asymmetrischer Bildcollage (5 Gemälde) und Introtext
- **Gefiltertes Gemälde-Grid** (Filter: Alle / Öl / Acryl)
- Jede Karte zeigt: Bild, Technik-Label, Format, Preis, Beschreibung, Etsy-Link
- Gemälde „In Trocknung" werden mit grauem Badge angezeigt, Etsy-Button deaktiviert
- Abschluss-Sektion mit Links zu Portfolio und Kontakt

### Bilder

Lokale Fallback-Bilder liegen in `public/gemaelde/`:

```
public/gemaelde/
  blutengeist.jpg
  farbenfroh.jpg
  silent-crown.jpg
  vergaengliche-staerke.jpg
  vergaengliche-staerke-2.jpg
```

Format: JPG, ca. 1000–1400 px auf der langen Seite.

### SEO & Strukturierte Daten

- `<title>`, `<meta description>`, `canonical`, `og:image` seitenspezifisch gesetzt
- **JSON-LD** im `<head>`: Schema `CollectionPage → ItemList → VisualArtwork` pro Gemälde
- Jedes Werk enthält: Name, Beschreibung, Bild, Technik, Maße, Künstlerin, Offer (Preis + Etsy-URL)
- Das Layout (`src/layouts/Layout.astro`) unterstützt die Props `ogImage`, `canonical` und einen `head`-Slot für seitenspezifische Tags

---

## Etsy API Integration

### Architektur

| Datei | Zweck |
| :---- | :---- |
| `src/lib/etsy.ts` | Generische Fetch-Funktion, wiederverwendbar für alle Seiten |
| `src/config/etsy.ts` | Shop-ID und Sektions-IDs (nach Freigabe eintragen) |
| `scripts/get-etsy-info.mjs` | Einmaliges Hilfsskript zum Auslesen der IDs |

### Funktionsweise

- Preise, Bilder und Titel werden beim **Build auf GitHub Actions** live von Etsy abgerufen
- Kein Browser-Request — die Seite bleibt statisch
- Fallback: Wenn die API nicht erreichbar ist, werden die hardcodierten Daten in `gemaelde.astro` verwendet
- Neue Gemälde in der Etsy-Sektion erscheinen automatisch beim nächsten Build

### Manuell verwaltete Einträge

Gemälde die (noch) nicht auf Etsy sind (z. B. „Silent Crown – In Trocknung") werden direkt in `gemaelde.astro` im Array `MANUAL_GEMAELDE` gepflegt.

### GitHub Actions Workflow

Der Workflow (`.github/workflows/gh-pages.yml`) baut die Seite:
- bei jedem Push auf `master`
- täglich um **0:00 Uhr** (Preise aktuell halten)
- **manuell** via „Run workflow" im GitHub Actions Tab

Der `ETSY_API_KEY` muss als Repository Secret gesetzt sein:
`GitHub → Settings → Secrets and variables → Actions → ETSY_API_KEY`

### ⚠️ Noch offen: Etsy API Freigabe

Der API-Key ist aktuell im Status **„Pending Personal Approval"**. Sobald Etsy die App freigibt:

1. Skript ausführen um Shop- und Sektions-IDs zu erhalten:
   ```sh
   ETSY_API_KEY=dein-key node scripts/get-etsy-info.mjs
   ```
2. Ausgabe in `src/config/etsy.ts` eintragen (Shop-ID + Sektions-IDs)
3. Workflow manuell starten — ab dann laufen Preise und Bilder vollautomatisch

---

## Was noch zu tun ist

### Seiten aufbauen
- Malbücher-Seite (`/malen`) — kann die Etsy-Architektur aus der Gemälde-Seite direkt wiederverwenden: nur `ETSY_SECTIONS.malbuecher` eintragen
- Schmuck-Seite, Galerie, Portfolio, Porträts, Über mich

### Etsy Sektions-IDs eintragen
Nach API-Freigabe `src/config/etsy.ts` befüllen — dann läuft alles automatisch.

### Silent Crown
Sobald das Gemälde auf Etsy gelistet wird: Listing-ID in `SUPPLEMENTS` in `gemaelde.astro` eintragen und den Eintrag aus `MANUAL_GEMAELDE` entfernen.

### Domain klären
Die canonical URLs zeigen aktuell auf `https://www.sunnyartis.de`. Falls die Website unter einer anderen Domain live geht, muss die Variable `SITE` in den jeweiligen Seiten-Dateien angepasst werden (z. B. in `gemaelde.astro`).

---

## Kontaktformular

Das Kontaktformular wird über **[Formspree](https://formspree.io)** verarbeitet.

- Konto: `sunnyartis@gmx.de`
- Einsendungen sind im Formspree-Dashboard unter [formspree.io](https://formspree.io) einsehbar und werden per E-Mail weitergeleitet.


## Deployment

Das Deployment läuft über **GitHub Pages** mit GitHub Actions.

- Repository: `sandra-heise/Website`
- Branch: `master`
- Live-URL: [https://sandra-heise.github.io/Website/](https://sandra-heise.github.io/Website/)

Die Konfiguration in `astro.config.mjs`:

```js
export default defineConfig({
  site: 'https://sandra-heise.github.io/Website/',
  base: '/Website/',
});
```
