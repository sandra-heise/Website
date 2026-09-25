# Cloudflare-Analyse & Maßnahmen

Laufendes Dokument für Traffic-/Performance-/Security-Analysen von sunnyartis.de über Cloudflare. Wird bei jeder neuen Auswertung um einen datierten Eintrag im Verlauf ergänzt; die Maßnahmen-Checkliste bleibt oben und wird laufend abgehakt.

---

## Offene Maßnahmen

Priorisiert nach Wirkung auf Verkäufe (seit 25.09.2026, siehe Verlauf). Infrastruktur-/Security-Punkte sind nicht vergessen, aber nachrangig, solange sie keine echten Besucher oder Käufe beeinträchtigen.

### Hoch (jetzt angehen)

- [ ] **`/schmuck` braucht einen Online-Kaufweg** — Seite bietet nur Markt (nächster Termin Januar 2027), Instagram-DM und Kontaktformular. Wer heute kaufen will, kann es nicht. Entscheidung nötig: Schmuck auf Etsy einstellen, oder zumindest das Anfrageformular als klaren Haupt-CTA mit Preisrahmen nach oben ziehen.
- [ ] **Erste Auswertung `/out/*`-Klicks + Abgleich mit Etsy-/Amazon-Statistik** — nach ~2 Wochen Laufzeit (ab Anfang Oktober 2026): Welche Produkte werden geklickt, welche verkauft? Ergebnis als Verlaufseintrag hier festhalten.

### Mittel

- [ ] **Download-Klicks messbar machen** — die „Herunterladen"-Buttons auf `/downloads` verlinken direkt auf R2 und laufen nicht über `/out/`, tauchen also in Cloudflare Analytics der Domain nicht auf. Ohne Zahlen ist unklar, welche Gratis-Motive als Köder funktionieren.
- [ ] **Mobile-Erlebnis auf echtem Gerät testen** — Zielgruppe kommt vermutlich über Pinterest/Instagram (mobil), Rohdaten zeigen aber nur ~6% Mobile-Traffic (teils bot-verzerrt, aber gegenchecken). Schwerpunkt: Sind Etsy-/Amazon-Buttons auf `/malen` und `/gemaelde` mobil ohne Scrollen auffindbar?
- [ ] **Englische Zielgruppe bedienen** — USA ist in den echten Besuchen das größte Land, die Seite ist komplett deutsch (`lang="de"`). Erster Schritt ohne Umbau: englische Etsy-Listings/Tags prüfen; eine englische Seitenversion erst, wenn die `/out/`-Daten zeigen, dass US-Besucher tatsächlich klicken.
- [ ] **INP-Ausreißer untersuchen** — insbesondere ob eingebettete Etsy-Widgets oder Drittanbieter-Skripte die Interaktivität bremsen.

### Niedrig

- [ ] **Auffällige Einzel-IPs prüfen** — IPs mit 500–700+ Anfragen/Tag identifizieren (Security → Events / Analytics → Traffic), bei Bedarf per Rate-Limiting-Regel einbremsen. Herabgestuft von „Hoch": Bot Fight Mode ist aktiv, Seite ist statisch und gecacht — die Bots kosten weder Geld noch Verkäufe, verzerren nur die Rohzahlen.
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
- [x] Klick-Tracking auf allen Etsy-/Amazon-Links via interne `/out/<slug>`-Redirects (siehe Nachtrag unten)
- [x] `/downloads` verweist auf Malbücher (`/malen#malbuecher`) und Etsy-Plotterdateien — Block „Mehr davon?" nach dem Download-Grid, Reihenfolge je nach aktivem Filter, plus „Mehr im Malbuch →" auf jeder Ausmalbild-Karte (25.09.2026)

---

## Verkaufsfokus – laufende Beobachtungen

- Startseite ist nicht der Haupteingang — echte Besucher landen häufiger direkt auf `/downloads/`, `/schmuck/`, `/malen/`. Diese Unterseiten müssen jeweils für sich zum Kauf führen. Stand 25.09.2026:

  | Einstiegsseite | Direkter Kauf-Link? | Bewertung |
  |---|---|---|
  | `/malen/` | Ja — Etsy + Amazon pro Malbuch, Etsy pro Leinwand, Preis sichtbar | gut |
  | `/downloads/` | Seit 25.09.2026 ja — Block zu Malbüchern + Etsy-Plotterdateien, Ausmalbild-Karten verlinken aufs Malbuch | behoben, Wirkung über `/out/etsy-shop-plotterdateien` bzw. Aufrufe von `/malen` beobachten |
  | `/schmuck/` | Nein — nur Markt, Instagram-DM, Kontaktformular | kein Online-Kauf möglich |

  Der Etsy-Button im Header ist zwar auf jeder Seite da, aber unspezifisch (führt auf den ganzen Shop, nicht zum passenden Produkt).
- USA + Deutschland als Kernpublikum (passend zu Etsy) → englische Produktbeschreibungen/Etsy-SEO ernst nehmen, nicht nur deutschen Markt bedienen.
- Kauf-Trichter: Klick-Tracking läuft seit 17.09.2026 (`/out/*`). Lücke bleibt zwischen Klick und Kauf — die Cloudflare-Klickzahlen müssen mit den Etsy-/Amazon-Verkaufsstatistiken abgeglichen werden, um zu verstehen was sich tatsächlich verkauft.
- Bei ~16 echten Besuchen/Tag ist der größere Hebel für mehr Verkäufe eher mehr qualifizierter Traffic (Etsy-SEO, Pinterest, Social Media) und bessere Weiterleitung der vorhandenen Besucher zum Produkt als weitere Infrastruktur-Feinarbeit.

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

### Nachtrag 17.09.2026 — Klick-Tracking (Variante B) umgesetzt

Alle 32 externen Etsy-/Amazon-Ziele der Seite (Shop-Links, Etsy-Listings für Gemälde/Malbücher/Leinwände, Amazon-Kurzlinks in Malbuch-Karten, Basteln-Material und Blog-Materialtipps) laufen jetzt über interne `/out/<slug>`-Redirect-Seiten, bevor sie extern weiterleiten. Klicks sind dadurch als Requests unter `/out/*` in Analytics → Traffic sichtbar — kein neues Tool, kein Cookie-Consent nötig.

Umsetzung: `src/config/outboundLinks.ts` (zentrale Liste), `src/utils/outboundLink.ts` (`outUrl()`-Helper, wirft beim Build einen Fehler, wenn ein neuer Link vergessen wird), `src/pages/out/[slug].astro` (Redirect-Seite). SEO abgesichert: Redirect-Seiten haben `noindex, nofollow` und sind über einen Filter im Sitemap-Plugin ([astro.config.mjs](astro.config.mjs)) explizit von der `sitemap.xml` ausgeschlossen — `robots.txt` bleibt bewusst offen für diese Pfade, da eine Sperre dort verhindern würde, dass Google das `noindex`-Tag überhaupt sieht.

**Nächster Schritt zur Auswertung:** In Cloudflare unter Analytics → Traffic nach Pfad `/out/` filtern, um zu sehen, welche Etsy-/Amazon-Ziele tatsächlich geklickt werden.

**Cache-Stolperstein direkt danach:** Nach dem Deploy zeigte die Live-Seite noch die alten Links, obwohl GitHub Pages (per direkter IP-Abfrage verifiziert) bereits die neue Version ausgeliefert hat und der automatische Cache-Purge (siehe oben) erfolgreich gelaufen war. Ursache vermutlich: Cloudflare hatte die Seite unter leicht anderer URL-Variante (`/malen` vs. `/malen/`, mit/ohne `www`) im Cache, die der automatische Purge nicht erwischt hat. **Fix:** Im Dashboard unter Caching → Configuration → **"Purge Everything"** (nicht Custom Purge mit Einzel-URLs) + Hard-Refresh im Browser. Für künftige Deploys, bei denen sich sichtbarer Seiteninhalt ändert: Falls die automatische Purge nicht zu reichen scheint, "Purge Everything" manuell nachschieben.

### Nachtrag 17.09.2026 — Amazon-Link-Check per curl war ein Fehlalarm

Bei Vorbereitung des Klick-Tracking-Umbaus alle 8 Amazon-Kurzlinks (`https://link.amazon/<code>`) in den Malbuch-Datensätzen ([index.astro](src/pages/index.astro), [malen.astro](src/pages/malen.astro)) per `curl` geprüft — alle lieferten HTTP 404 (mit und ohne Sandbox, mit echter Amazon/CloudFront-Response). Sandra bestätigte, dass die Links im Browser normal funktionieren. Wahrscheinlichste Erklärung: Amazons Kurzlink-Dienst blockt Anfragen von Cloud-/Rechenzentrums-IPs (Scraper-Schutz) — automatisierte curl-Checks von einer Server-Umgebung aus sind für diesen speziellen Linktyp also kein verlässlicher Test. Kein Handlungsbedarf; Lehre für künftige Link-Checks: Amazon-Kurzlinks (`link.amazon`, `amzn.to`) nicht per automatisiertem Tool prüfen, sondern nur manuell/im Browser.

### Nachtrag 17.09.2026 — Cache Rule + Auto-Purge umgesetzt

Cache Rule für HTML-Seiten in Cloudflare angelegt und Auto-Purge-Schritt in den Deploy-Workflow eingebaut (Cloudflare API `purge_cache` nach jedem GitHub Pages Deploy). Erster Versuch schlug fehl (`zones//purge_cache`, 404) — Ursache: `CLOUDFLARE_ZONE_ID`/`CLOUDFLARE_API_TOKEN` waren als **Environment Secrets** statt **Repository Secrets** angelegt und dadurch für den Job unsichtbar. Nach Neuanlage als Repository Secrets lief der Workflow durch. Workflow hat jetzt zusätzlich eine explizite Prüfung, die bei leeren Secrets sofort mit klarer Fehlermeldung abbricht statt mit kryptischem curl-404.

### 25.09.2026 — Maßnahmen nach Verkaufsfokus neu priorisiert

Die drei häufigsten Einstiegsseiten (`/downloads`, `/schmuck`, `/malen`) im Code darauf geprüft, ob Besucher von dort direkt zu einem Produkt kommen (Tabelle unter „Verkaufsfokus"). Ergebnis: Nur `/malen` führt sauber zu Etsy/Amazon. `/downloads` — laut Traffic die wichtigste Einstiegsseite — verweist nirgends auf die bezahlten Plotterdateien bei Etsy, obwohl dieser Shopbereich existiert und auf `/basteln` schon verlinkt ist. `/schmuck` hat gar keinen Online-Kaufweg.

Daraus folgend „Offene Maßnahmen" umsortiert: Die zwei Einstiegsseiten-Lücken und die erste Auswertung der `/out/`-Klicks stehen jetzt oben. Der Einzel-IP-Check ist von „Hoch" auf „Niedrig" gerutscht, weil Bot-Traffic bei einer statischen, gecachten Seite mit aktivem Bot Fight Mode weder Kosten noch Verkaufsverluste verursacht. Neu aufgenommen: Download-Klicks messbar machen, englische Zielgruppe als eigener Punkt.
