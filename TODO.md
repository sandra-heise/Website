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

## Offen / Ideen

- [ ] Soft-launch
