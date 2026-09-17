# Cloudflare-Analyse & Maßnahmen

Laufendes Dokument für Traffic-/Performance-/Security-Analysen von sunnyartis.de über Cloudflare. Wird bei jeder neuen Auswertung um einen datierten Eintrag im Verlauf ergänzt; die Maßnahmen-Checkliste bleibt oben und wird laufend abgehakt.

---

## Offene Maßnahmen

### Hoch (jetzt angehen)

- [ ] **8 kaputte Amazon-Links reparieren** (siehe Fund unten, 17.09.2026) — alle "Bei Amazon ansehen"-Buttons für die Malbücher auf `/` und `/malen` zeigen auf 404. Aktiver Umsatzverlust, unabhängig vom Tracking. Braucht neue Links von Sandra (Amazon Associates SiteStripe).
- [ ] **Klick-Tracking auf Etsy-/Amazon-Links einbauen** — Entscheidung gefallen: Variante B (interne `/out/<slug>`-Redirect-Seiten, sichtbar in Analytics → Traffic). Umsetzung pausiert bis die Amazon-Links (s.o.) korrigiert sind, damit nicht auf kaputte Ziele getrackt wird.
- [ ] **Auffällige Einzel-IPs prüfen** — IPs mit 500–700+ Anfragen/Tag identifizieren (Security → Events / Analytics → Traffic), bei Bedarf per Rate-Limiting-Regel einbremsen statt unkommentiert durchlaufen zu lassen.

### Mittel

- [ ] **Mobile-Erlebnis auf echtem Gerät testen** — Zielgruppe kommt vermutlich über Pinterest/Instagram (mobil), Rohdaten zeigen aber nur ~6% Mobile-Traffic (teils bot-verzerrt, aber gegenchecken).
- [ ] **INP-Ausreißer untersuchen** — insbesondere ob eingebettete Etsy-Widgets oder Drittanbieter-Skripte die Interaktivität bremsen.

### Niedrig

- [ ] **Redirect-Regeln zentral dokumentieren** (Cloudflare Redirect Rules + GitHub Pages Custom-Domain-Konfiguration) — nach dem Redirect-Loop-Vorfall vom 17.09.2026, damit künftige DNS-/Redirect-Änderungen nicht erneut kollidieren. Ggf. als eigener Abschnitt in [SHOP-MIGRATION-PLAN.md](SHOP-MIGRATION-PLAN.md) oder hier im Verlauf festhalten, sobald die aktuelle Konfiguration klar ist.
- [ ] **Polish / Bildoptimierung prüfen** (Pro-Plan nötig) — falls Ladezeit der Gemälde-Fotos weiter gedrückt werden soll. Aktuell nicht dringend, Core Web Vitals sind bereits gut.

---

## Bereits erledigt

- [x] Dangling-DNS-Risiko (Apex-Domain `sunnyartis.de` jetzt korrekt bei GitHub Pages registriert)
- [x] Always Use HTTPS + HSTS + TLS 1.3 aktiviert
- [x] Automatic HTTPS Rewrites aktiviert
- [x] SPF + DMARC (`p=reject`) eingerichtet — E-Mail-Spoofing unter der Domain verhindert
- [x] Bot Fight Mode aktiviert
- [x] security.txt eingerichtet
- [x] Tiered Cache (Smart Tiered Cache) + längeres Browser-Cache-TTL aktiviert
- [x] Cache Rule für HTML-Seiten angelegt (Caching → Cache Rules) + automatischer Cache-Purge nach jedem Deploy via GitHub Actions ([.github/workflows/gh-pages.yml](.github/workflows/gh-pages.yml))

---

## Verkaufsfokus – laufende Beobachtungen

- Startseite ist nicht der Haupteingang — echte Besucher landen häufiger direkt auf `/downloads/`, `/schmuck/`, `/malen/`. Diese Unterseiten sollten jeweils für sich stark genug sein, um zum Kauf zu führen (klarer Etsy-/Amazon-Link nicht nur über die Startseite).
- USA + Deutschland als Kernpublikum (passend zu Etsy) → englische Produktbeschreibungen/Etsy-SEO ernst nehmen, nicht nur deutschen Markt bedienen.
- Kauf-Trichter ist blinder Fleck, solange Klick-Tracking (siehe oben) fehlt — Cloudflare-Daten sollten mit Etsy-/Amazon-Verkaufsstatistiken kombiniert werden, um zu verstehen was sich tatsächlich verkauft.
- Bei ~16 echten Besuchen/Tag ist der größere Hebel für mehr Verkäufe eher mehr qualifizierter Traffic (Etsy-SEO, Pinterest, Social Media) als weitere Infrastruktur-Feinarbeit.

---

## Verlauf

### 17.09.2026 — Erstes Cloudflare-Audit + Traffic-Analyse

**Audit-Ergebnis (Security/Performance-Check):** Kritische Punkte behoben (dangling DNS, HTTPS/HSTS/TLS, SPF/DMARC, Bot Fight Mode, security.txt) — siehe "Bereits erledigt" oben. Code-seitig keine kaputten internen Links oder fehlenden Bilder gefunden (vollständiger Abgleich aller Bild-/Link-Referenzen gegen `public/`-Baum).

**Traffic-Analyse:** Große Diskrepanz zwischen Rohdaten und echten Besuchen ist die zentrale Erkenntnis:

| Kennzahl | Rohe HTTP-Traffic-Daten (30 Tage) | Web Analytics / RUM (7 Tage) |
|---|---|---|
| Anfragen/Besuche | 259.950 Requests | 113 Visits, 127 Page Views |
| Eindeutige Besucher | 18.710 (IP-basiert, inkl. Bots) | – |
| Top-Länder | USA, NL, China, Singapur, Frankreich | USA (~39), Deutschland (~32), Italien (~3), Japan (~2), Schweiz (~1) |
| Geräte | Desktop 93%, Mobile 6%, Tablet <1% | Chrome, Firefox, Mobile Safari, Chrome Mobile — 33% „Unknown" |
| Betriebssystem | „Unknown/Others" 73%, Windows 17%, macOS 6% | – |

Der überwiegende Teil der Rohzahlen ist Bot-/Crawler-Traffic (Einzel-IPs mit 500–700+ Anfragen/Tag, 73% unbekanntes OS, 93% Desktop). Echte Besuche liegen bei ca. 16/Tag. Cache-Trefferquote extrem niedrig (1,85% der Requests, 11–29% des Datenvolumens) — HTML wird von Cloudflare standardmäßig nicht gecacht, nur Assets.

Core Web Vitals (echte Nutzerdaten): LCP 94% „Good", Ø Ladezeit ~1,15s. INP zeigt sichtbaren „Needs Improvement"-Anteil.

**Vorfall:** Redirect-Loop zwischen einer Cloudflare-Redirect-Regel und der neuen GitHub-Pages-Apex-Konfiguration trat auf und wurde behoben — zeigt, dass Redirect-Logik über mehrere Systeme (Cloudflare, GitHub, DNS) aktuell nicht zentral dokumentiert ist (→ Maßnahme unter "Niedrig").

**Nächste Schritte:** Klick-Tracking (Priorität 1), Einzel-IP-Check (Priorität 3) — siehe "Offene Maßnahmen" oben.

### Nachtrag 17.09.2026 — 8 kaputte Amazon-Links gefunden

Bei Vorbereitung des Klick-Tracking-Umbaus (Variante B, `/out/`-Redirects) alle externen Etsy-/Amazon-Links im Code gesichtet. Dabei alle 8 Amazon-Kurzlinks (`https://link.amazon/<code>`) in den Malbuch-Datensätzen ([index.astro](src/pages/index.astro), [malen.astro](src/pages/malen.astro)) per `curl` geprüft — **alle 8 liefern HTTP 404**. Domain `link.amazon` ist echte Amazon/CloudFront-Infrastruktur, die einzelnen Kurzlink-Codes sind aber abgelaufen oder nie korrekt erzeugt worden. Betroffen: alle 8 Malbuch-Titel (Fantasie in Farbe 1–3, Malbuch Magie, Tiere & Fabelwesen, Mensch & Anime, Eine Welt voller Katzen, Eine Welt voller Feen). Wartet auf korrigierte Links von Sandra, dann Fix + Klick-Tracking-Umbau in einem Schritt.

### Nachtrag 17.09.2026 — Cache Rule + Auto-Purge umgesetzt

Cache Rule für HTML-Seiten in Cloudflare angelegt und Auto-Purge-Schritt in den Deploy-Workflow eingebaut (Cloudflare API `purge_cache` nach jedem GitHub Pages Deploy). Erster Versuch schlug fehl (`zones//purge_cache`, 404) — Ursache: `CLOUDFLARE_ZONE_ID`/`CLOUDFLARE_API_TOKEN` waren als **Environment Secrets** statt **Repository Secrets** angelegt und dadurch für den Job unsichtbar. Nach Neuanlage als Repository Secrets lief der Workflow durch. Workflow hat jetzt zusätzlich eine explizite Prüfung, die bei leeren Secrets sofort mit klarer Fehlermeldung abbricht statt mit kryptischem curl-404.
