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
