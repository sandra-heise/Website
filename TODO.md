# TODO – Sunny Artis Website

## Blog

- [ ] **Prismacolor/Acrylstifte-Beitrag fertigstellen** (`src/pages/blog/prismacolor-acrylstifte.astro`)
  - Inhalt schreiben
  - Hero-Bild erstellen und als `public/blog/pens-hero.jpg` ablegen
  - Danach in `src/pages/blog.astro` wieder zur `blogPosts`-Liste hinzufügen (oben = neueste)

## Bilder & Medien

- [ ] **Ausmalbilder auf R2 prüfen** — sicherstellen dass alle 7 Bilder (Faultier, Fische, Frau auf Blume, Gesicht, Rosen, Sanduhr, Schirm) tatsächlich im R2-Bucket liegen, da die lokale Kopie gelöscht wurde

## Neue Inhalte

- [ ] Neue Plotterdateien in `src/config/downloads.ts` eintragen (nach Upload auf R2)
- [ ] Neue Blog-Beiträge anlegen (Struktur von vorhandenem Beitrag kopieren, dann in `blog.astro` eintragen)

## Technik / SEO

- [ ] **Domain sunnyartis.de** → GitHub Pages verbinden (CNAME-Eintrag beim DNS-Anbieter + `public/CNAME`-Datei mit `www.sunnyartis.de`)
- [ ] CLAUDE.md aktualisieren: `portraets.astro` existiert nicht mehr, heißt jetzt `portfolio.astro`; `galerie.astro` wurde entfernt

## Shop-Umzug (Shopify → Sunny Artis)

### Cloudflare Redirect Rules (im Cloudflare Dashboard einrichten)
- [ ] `/products/*` → `https://www.sunnyartis.de/` (301)
- [ ] `/collections/*` → `https://www.sunnyartis.de/` (301)
- [ ] `/blogs/*` → `https://www.sunnyartis.de/blog` (301)
- [ ] `/pages/ueber-mich` → `https://www.sunnyartis.de/ueber-mich` (301)
- [ ] `/pages/kontakt` → `https://www.sunnyartis.de/kontakt` (301)

### Domain-Umzug (einmalig, beim Go-live)
- [ ] `astro.config.mjs` anpassen: `site` auf `https://www.sunnyartis.de`, `base` auf `/`
- [ ] GitHub Pages: Custom Domain `www.sunnyartis.de` in Repo-Einstellungen eintragen
- [ ] Cloudflare DNS: CNAME `www` → `sandra-heise.github.io` (Proxy aktiviert), SSL-Modus auf **Full**

## Offen / Ideen

- [ ] Soft-launch
