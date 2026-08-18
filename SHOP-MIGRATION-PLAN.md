# Shop-Umzug: Shopify → sunnyartis.de (Astro-Website)

Ziel: `sunnyartis.de` / `www.sunnyartis.de` zeigt künftig komplett auf die Astro-Website (GitHub Pages), nicht mehr auf Shopify. Alle alten Shop-URLs sollen sauber per 301 auf die passende neue Seite umgeleitet werden.

## 0. Was schon vorbereitet ist

Im Repo liegen bereits drei CSV-Dateien aus einer früheren Session:

| Datei | Inhalt | Status |
|---|---|---|
| `redirects/shopify-redirects-export-original.csv` | Rohexport der Shopify-eigenen Redirects (484 Zeilen) | Quellmaterial, nicht mehr direkt gebraucht |
| `redirects/shopify-alte-urls.csv` | Liste alter Shop-URLs, `ziel_neue_seite` meist leer (nur 23/259 befüllt) | Entwurf, überholt |
| `redirects/cloudflare-bulk-redirects.csv` | **Fertige, importfähige Cloudflare-Bulk-Redirect-Liste**: 734 eindeutige alte URLs × 2 (mit/ohne `www`) = 1468 Zeilen, Format `source,target,301,,,,` (passt exakt zum Cloudflare-CSV-Import-Schema) | **Fertig, Fehler in Abschnitt 1 bereits behoben** |

→ Die eigentliche Migrationsarbeit (alte URL → sinnvolle neue Kategorie: `/schmuck`, `/gemaelde`, `/malen`, `/downloads`, `/basteln`, `/` usw.) ist bereits gemacht.

`TODO.md` enthält im Abschnitt „Shop-Umzug" bereits eine grobe Kurzfassung — dieser Plan ersetzt/detailliert sie.

## 1. Gefundene Fehler — vor dem Import fixen ✅ erledigt

Beim Gegencheck der CSV gegen die aktuelle Seitenstruktur zwei defekte Redirect-Ziele gefunden und behoben:

- `sunnyartis.de/pages/handgezeichnete-portraits` zeigte auf die nicht mehr existierende Route `/portraets` → korrigiert auf `https://www.sunnyartis.de/portfolio#portraets`
- `sunnyartis.de/pages/portfolio` zeigte auf die entfernte Route `/galerie` → korrigiert auf `https://www.sunnyartis.de/portfolio`
- Zusätzlicher Codebug mit derselben Ursache: [src/pages/404.astro](src/pages/404.astro#L8) verlinkte auf `/portraets` → korrigiert auf `/portfolio#portraets`
- Stichprobe aller übrigen Redirect-Ziele gegen die vorhandenen Routen abgeglichen — keine weiteren toten Ziele gefunden

**Action Items:**
- [x] `redirects/cloudflare-bulk-redirects.csv` korrigiert (4 Zeilen)
- [x] `src/pages/404.astro` korrigiert
- [x] Restliche Ziele stichprobenartig/vollständig gegen `src/pages/` geprüft

## 2. Offene Entscheidungen

- [x] **Cloudflare-Plan geprüft:** Dashboard zeigt 5 Listen / 10.000 Items zur Verfügung, 0 aktuell genutzt. Die 1468 Zeilen aus `redirects/cloudflare-bulk-redirects.csv` passen also problemlos in eine einzige Liste — Plan B (Worker, siehe Anhang) wird **nicht** benötigt.
- [x] **Wie lange soll Shopify parallel laufen?** Abo läuft **Ende November 2026** automatisch aus — kein manuelles Kündigen nötig. Das ergibt ca. 3,5 Monate Puffer ab heute (17.08.2026). Empfehlung: Go-Live nicht erst kurz vor Ablauf ansetzen, sondern mit min. 2–3 Wochen Puffer davor (z. B. Anfang/Mitte November), damit bei Problemen mit den Redirects noch Zeit zum Nachjustieren bleibt, während der Shopify-Shop als Referenz/Fallback noch erreichbar ist. Vor Ablauf außerdem prüfen, ob aus dem Shopify-Adminbereich noch Daten gesichert werden müssen (Bestellhistorie, Kundendaten, Produktbilder) — nach dem 30.11. sind diese vermutlich nicht mehr abrufbar.
- [x] **Wo liegt die Domain aktuell?** Bei **GoDaddy** — noch nicht bei Cloudflare. Es existiert zwar schon ein Cloudflare-Account (siehe Abschnitt 2, Bulk-Redirects-Limit), aber `sunnyartis.de` ist dort noch keine Zone. → **Neue Phase 2 unten** kümmert sich darum, die Domain zunächst zu Cloudflare zu holen (Nameserver-Wechsel bei GoDaddy), bevor die eigentlichen DNS-/Redirect-Schritte greifen können.
- [x] **Google Ads / Shopping-Feed?** Läuft aktuell über Shopify-Apps (Google-Sales-Channel-App + verknüpfte Merchant-Center/Ads-Kampagnen). Das betrifft die Migration direkt:
  - Sobald die Redirects live sind, zeigen die im Feed hinterlegten Produkt-URLs nur noch auf 301-Weiterleitungen zu Kategorieseiten (`/schmuck`, `/gemaelde` usw.) statt auf echte Produktseiten — Google Merchant Center wird diese Produkte vermutlich ablehnen ("Redirect error"/"Landing page not found"), und laufende Shopping-Kampagnen würden ins Leere laufen bzw. Anzeigen mit toten Zielseiten schalten.
  - Die neue Astro-Seite hat **keinen Checkout/Warenkorb** — ein 1:1-Ersatz des Shopify-Produktkatalogs für Google Shopping ist damit nicht möglich, solange Verkäufe nur noch über Etsy laufen.
  - **Offene Entscheidung:** Sollen die Google-Shopping-Kampagnen komplett eingestellt werden, oder auf einen Etsy-Produktfeed umgestellt werden (falls Etsy/ein Drittanbieter-Tool einen Google-Merchant-Feed für den Etsy-Shop unterstützt)? Bitte vor Go-Live festlegen — siehe Action Item in Phase 5.

## 3. Phase 1 — Code- und Deploy-Vorbereitung

- [x] `astro.config.mjs` angepasst: `site: 'https://www.sunnyartis.de/'`, `base: '/'`
- [x] `public/CNAME` mit Inhalt `www.sunnyartis.de` angelegt
- [x] Build lokal getestet (`npm run build`) — alle Asset-/Bildpfade lösen root-relativ auf (`/logo.png`, `/_astro/...`), keine `/Website/`-Reste mehr, Canonical-Tags zeigen korrekt auf `www.sunnyartis.de`
- [x] `@astrojs/sitemap` eingebaut + `public/robots.txt` mit Sitemap-Verweis ergänzt. **Hinweis:** die aktuellste Sitemap-Version (3.7.3) ist nicht mehr mit unserem Astro 4.16 kompatibel (Fehler beim Build, `reduce` von `undefined`) — daher bewusst auf `@astrojs/sitemap@3.2.1` gepinnt (letzte Version vor dem Astro-5-Sprung). Sitemap enthält alle 17 Seiten, `sitemap-index.xml` korrekt referenziert.
- [ ] Änderungen committen — **aber noch nicht pushen**, siehe Warnung unten
- [ ] Erst zusammen mit Phase 3 (DNS) pushen → GitHub Actions deployt automatisch (`.github/workflows/gh-pages.yml`), Custom Domain via `CNAME`-Datei wird dabei mit übernommen (`keep_files: false` — das ist ok, die Action schreibt die `CNAME`-Datei aus `public/` bei jedem Deploy neu)

⚠️ **Wichtig zur Reihenfolge:** `base: '/'` und `CNAME` dürfen **nicht vor** Phase 2/3 (Domain bei Cloudflare + DNS/Custom-Domain-Eintrag in GitHub) auf `master` gepusht werden — der Auto-Deploy-Workflow läuft bei jedem Push, und mit `base: '/'` würden die Assets auf der aktuell noch unter `sandra-heise.github.io/Website/` laufenden Live-Seite sofort brechen (root-relative Pfade, aber GitHub liefert die Seite noch unter `/Website/`). Die Codeänderungen sind fertig und lokal verifiziert, der Push erfolgt als Teil des Go-Live-Cutovers (Phase 5, Schritt 1).

## 4. Phase 2 — Domain von GoDaddy zu Cloudflare umziehen

Das ist der Schritt mit der längsten Vorlaufzeit (Nameserver-Propagation kann einige Stunden dauern) — am besten früh im Zeitplan anpacken, unabhängig vom eigentlichen Go-Live-Termin.

- [x] **Vorher sichern:** DNS-Scan-Ergebnis von Cloudflare dokumentiert (Screenshot). Gefundene Records:
  - `A sunnyartis.de → 23.227.38.32` (Proxied) — aktuelle Shopify-Verknüpfung, bleibt bis Phase 3 unverändert
  - `CNAME www → sunnyartis.de` (Proxied) — zeigt über den A-Record ebenfalls auf Shopify, bleibt bis Phase 3 unverändert
  - `TXT sunnyartis.de → "google-site-ver..."` — Google-Search-Console-Verifizierung, **muss erhalten bleiben**
  - `CNAME _domainconnect → _domainconnect.g...` — GoDaddy-eigener Domain-Connect-Mechanismus, wird nach dem Nameserver-Wechsel funktionslos, kann später gelöscht werden (nicht dringend) 
- [x] In Cloudflare: Domain onboarded (heißt inzwischen „Onboard a domain" statt „Add a Site", unter **Domains** im Dashboard) → `sunnyartis.de` eingegeben → Cloudflare hat automatisch die bestehenden DNS-Records von GoDaddy gescannt
- [x] Gescannte Records gegengeprüft (siehe oben) — nichts Wichtiges fehlt, TXT-Verifizierung ist da
- [x] Cloudflare zeigt zwei zugewiesene Nameserver an: `adaline.ns.cloudflare.com`, `lennox.ns.cloudflare.com`
- [x] Bei **GoDaddy** → Nameserver auf die beiden Cloudflare-Nameserver umgestellt, Cloudflare als "aktualisiert" bestätigt
- [x] **Propagation abgeschlossen:** Per DNS-Check bestätigt — `sunnyartis.de` und `www.sunnyartis.de` lösen jetzt über Cloudflares Nameserver auf (`adaline`/`lennox.ns.cloudflare.com`), Antworten kommen von Cloudflares Proxy-IPs (`104.21.x`, `172.67.x`)
- [x] Gegengeprüft: Domain löst weiterhin wie vorher auf — Shopify ist über die Domain nach wie vor erreichbar, keine sichtbare Änderung durch den Nameserver-Wechsel selbst

**Phase 2 abgeschlossen** ✅ — Zone ist aktiv bei Cloudflare, der A-Record/CNAME zeigen aber noch unverändert auf Shopify. Weiter mit Phase 3.

Erst wenn die Zone in Cloudflare aktiv ist, ergeben die folgenden DNS-Schritte (Phase 3) Sinn.

## 5. Phase 3 — DNS & GitHub Pages

- [x] **GitHub Repo-Settings** → Settings → Pages → Custom domain: `www.sunnyartis.de` eingetragen, DNS check successful
- [x] Zertifikat ausgestellt, **„Enforce HTTPS"** aktiviert
- [x] Code-Fix unterwegs entdeckt: der Phase-1-Commit (base `/`, CNAME, Sitemap) war committet, aber nicht gepusht — dadurch lief die Seite unter der neuen Domain noch mit dem alten Build (`base: '/Website/'`), daher fehlten alle Styles. Gepusht (`8825f0e`), GitHub Actions hat neu deployt — Seite sieht jetzt korrekt aus.
- [x] A-Records (185.199.108/109/110/111.153) + `www`-CNAME (`sandra-heise.github.io`) sind bereits angelegt (aus dem DNS-Umzug, siehe Phase 2)
- [x] A-Records + `www`-CNAME zurück auf **Proxied (orange Wolke)** gestellt
- [x] SSL/TLS-Modus in Cloudflare auf **Full (strict)** gestellt
- [x] Apex-**Redirect Rule** `apex-to-www` angelegt und aktiv: „Hostname equals sunnyartis.de" → 301 auf `concat("https://www.sunnyartis.de", http.request.uri.path)`
- [x] Von außen verifiziert (`curl`):
  - `https://www.sunnyartis.de/` → `200 OK`, läuft proxied über Cloudflare (`Server: cloudflare`, `CF-RAY`-Header) zu GitHub Pages durch
  - `http://sunnyartis.de/` → `301` direkt auf `https://www.sunnyartis.de/`

**Phase 3 abgeschlossen** ✅ — die Domain läuft jetzt vollständig über die neue Astro-Seite. Weiter mit Phase 4 (alte Shop-URLs umleiten).

## 6. Phase 4 — Redirects einspielen

- [x] Korrigierte `redirects/cloudflare-bulk-redirects.csv` als Liste `shopify-migration` importiert
- [x] Bulk Redirect Rule angelegt und aktiv (Hostname is in `sunnyartis.de`/`www.sunnyartis.de` → Redirect using list)
- [x] Von außen verifiziert (`curl`): 4 Stichproben (Produkt→Schmuck, Produkt→Downloads über Apex-Redirect-Kette, Blog-Artikel, die zuvor gefixte `/pages/handgezeichnete-portraits`) — alle leiten korrekt weiter
- [ ] **Zurückgestellt — Catch-all für nicht erfasste URLs:** Entscheidung vertagt auf nach der Beobachtungsphase (siehe Phase 6) — erst schauen, ob über Cloudflare Analytics/Search Console überhaupt 404-Treffer auf nicht abgedeckten alten URL-Mustern auftauchen, dann gezielt nachziehen statt vorab pauschal Regeln anzulegen. Falls doch nötig, generische Fallback-Regeln:
  - `/products/*` → `/` (falls nicht individuell gematcht)
  - `/collections/*` → `/`
  - `/cart*`, `/account*`, `/checkout*` → `/`
  - `/blogs/*` → `/blog` (falls nicht individuell gematcht)

  Bulk-Redirect-Listen matchen exakt (kein Wildcard), daher diese generischen Fälle als separate normale Redirect Rules mit Wildcard-Matching ergänzen, mit niedrigerer Priorität als die exakte Liste.

## 7. Phase 5 — Go-Live (Cutover-Reihenfolge) ✅ erledigt

Ist am 18.08.2026 in einem Rutsch durchgelaufen (schneller als ursprünglich mit "Puffer bis November" geplant — kein Problem, das gibt sogar mehr Sicherheitsabstand vor dem Shopify-Ablauf):

1. [x] Phase 1 (Code) deployt
2. [x] Phase 2 (Domain-Umzug zu Cloudflare) abgeschlossen
3. [x] Phase 3 (DNS) eingerichtet, Custom Domain bestätigt
4. [x] Phase 4 (Redirects) importiert und aktiviert
5. [x] Stichprobe getestet (`curl`) — alle Beispiel-URLs leiten korrekt
6. [ ] In Shopify die Domain-Verknüpfung lösen bzw. den Shop offline schalten (Online Store → Domains) — optional/Aufräumarbeit, da die Domain technisch schon nicht mehr zu Shopify zeigt
7. [x] HTTPS-Zertifikat geprüft (Full-Strict aktiv, Zertifikat gültig)

⚠️ **Nachträglich zu prüfen:** Schritt 0 aus der ursprünglichen Reihenfolge (Google-Shopping-Kampagnen *vor* dem Redirect-Go-Live pausieren) ist nicht mehr rechtzeitig passiert, da die Redirects schon live sind. Falls noch aktive Google-Shopping-Kampagnen über die Shopify-App laufen: jetzt zeitnah im Merchant Center nachschauen, ob Produkte wegen der Redirects abgelehnt werden, und ggf. pausieren (siehe Abschnitt 2, offene Entscheidung Etsy-Feed vs. einstellen).

## 8. Phase 6 — Nach dem Go-Live ← **aktuelle Phase**

- [ ] **Google Search Console:** Property für `https://www.sunnyartis.de` hinzufügen/bestätigen, Sitemap einreichen (`https://www.sunnyartis.de/sitemap-index.xml`), wichtigste Seiten per „URL-Prüfung" zur erneuten Indexierung anstoßen
- [ ] Falls vorhanden: Google Business Profil / Social-Media-Bio-Links (Instagram, Etsy-Shop-Beschreibung etc.) von der alten Shop-URL auf `www.sunnyartis.de` aktualisieren
- [ ] **Laufend (Entscheidung: ein paar Tage abwarten, Stand 18.08.2026):** Redirects beobachten — Cloudflare Analytics → Redirect Rules (Trefferzahlen der Bulk-Liste) und Google Search Console → „Seiten" → „Nicht gefunden (404)" prüfen. Ergebnis entscheidet, ob die zurückgestellten Catch-all-Regeln (Phase 4) noch nötig sind.
- [ ] Shopify-Abo läuft Ende November 2026 automatisch aus (kein manuelles Kündigen nötig) — vorher Bestellhistorie/Kundendaten/Produktbilder aus dem Shopify-Adminbereich sichern, falls noch benötigt
- [ ] `redirects/shopify-alte-urls.csv` und `redirects/shopify-redirects-export-original.csv` können danach archiviert/gelöscht werden — sie waren nur Rohmaterial für `redirects/cloudflare-bulk-redirects.csv`
- [ ] `TODO.md`-Abschnitt „Shop-Umzug" als erledigt markieren bzw. entfernen

## Rollback-Plan

Falls nach dem Cutover etwas nicht passt:
- Der Nameserver-Wechsel (Phase 2) ist der einzige Schritt, der außerhalb von Cloudflare/GitHub liegt und etwas länger zum Rückgängigmachen braucht (wieder GoDaddy-Nameserver eintragen) — alles danach (DNS-Records, Redirect-Regeln, Bulk-Liste) lässt sich in Cloudflare jederzeit sofort anpassen/deaktivieren
- Im Notfall: Bulk-Redirect-Rule in Cloudflare pausieren (Toggle „Disabled") — dann greifen nur noch die Astro-Seite selbst und deren 404-Seite
- Shopify-Shop bleibt bis zur finalen Kündigung unter `*.myshopify.com` erreichbar, auch wenn die Domain schon umgezogen ist

---

## Anhang: Alte Shopify-Betriebsdoku — was sich durch den Umzug ändert

Abgleich der bisherigen internen Notion/Miro-Doku zum Shopify-Betrieb mit dem aktuellen Stand nach dem Umzug (18.08.2026):

**Domain**

Domain-Registrar: GoDaddy (`https://www.godaddy.com/de-de`), registriert mit dem Google-Konto — unverändert.

~~Shopify mit Drittanbieter-Domain verbinden Anleitung~~ — **obsolet**, Shopify-Shop ist abgeschaltet.

**Neu seit 18.08.2026:** DNS/Nameserver laufen nicht mehr über GoDaddy, sondern über **Cloudflare** (Nameserver `adaline.ns.cloudflare.com` / `lennox.ns.cloudflare.com`). Die Domain zeigt auf die Astro-Website via GitHub Pages, nicht mehr auf Shopify (siehe Phase 2/3 oben).

**Farbschema**

(keine Beschreibung) — unverändert, nicht migrationsrelevant.

**Menü infos und Miroboard**

Miro-Boards unverändert erreichbar. **Zu prüfen:** Die dort geplante Menüstruktur sollte mit der aktuellen Navigation abgeglichen werden — die neue Seite hat kein „Portraits"/„Galerie" mehr als eigene Menüpunkte, das ist jetzt in **„Portfolio"** (mit Tabs) zusammengefasst. Aktuelle Nav: Startseite, Gemälde, Malen, Portfolio, Basteln, Schmuck, Downloads, Blog, Kontakt, Etsy Shop (extern).

**Cookiebot Infos (CCM19)** — **obsolet**

~~Angemeldet auf cloud.ccm19.de, Script in theme.liquid eingebaut, Cookie-Auflistung automatisch auf Datenschutzseite~~

Die neue Astro-Seite braucht **kein CCM19/Cookiebanner**: Sie setzt laut Datenschutzerklärung (`src/pages/datenschutz.astro`) selbst keine Cookies und nutzt keine Tracking-Tools — es gibt keinen Consent-pflichtigen Dienst mehr, den CCM19 verwalten müsste (theme.liquid existiert als Shopify-Konzept ohnehin nicht mehr). **Empfehlung:** CCM19-Abo prüfen und ggf. kündigen, falls kein künftiges Tracking/Ads geplant ist.

⚠️ Inkonsistenz gefunden: `datenschutz.astro` erwähnt weiter unten noch **Google AdSense** — das widerspricht der Aussage weiter oben „ohne Tracking-Tools". Falls kein AdSense (mehr) genutzt wird, sollte der Absatz entfernt werden (noch offen).

**Digitale Produkte** — **obsolet, komplett ersetzt**

~~Verkauf digitaler Produkte über die App „Digital Downloads": stellt Downloadlink per E-Mail bereit~~

Entfällt komplett — keine Shopify-App mehr nötig. Kostenlose Dateien liegen direkt auf **Cloudflare R2** und werden ohne E-Mail-Umweg per Direktlink zum Download angeboten (siehe `README.md`/`CLAUDE.md`, Abschnitt „Kostenlose Plotterdateien").

**Kostenlose Downloads** — **obsolet, komplett ersetzt**

~~Theme-Vorlage „kostenlose-Dateien" + Metafield „downloadURL" + selbstgeschriebener Button-Block~~

Ersetzt durch: Eintrag in `src/config/downloads.ts` (Titel, Beschreibung, R2-URL, Format, Kategorie, optional Blog-Link + Vorschaubild) → erscheint automatisch auf `/downloads`. Kein Theme/Metafield-Konzept mehr, da kein Shopify.

**Testbestellungen** — **obsolet**

Entfällt — die neue Seite hat keinen Checkout/Warenkorb mehr, es gibt nichts zu bestellen.

---

## Anhang: Plan B — Cloudflare Worker statt Bulk Redirects

Nur nötig, falls das Cloudflare-Plan-Limit für Bulk Redirects (Abschnitt 2) nicht ausreicht — aktuell **nicht der Fall** (10.000 Items verfügbar, nur 1468 benötigt). Grundidee: ein Worker liest eine Mapping-Tabelle und redirected selbst, ohne Limit durch den Bulk-Redirect-Feature-Tier.

```js
// worker.js (Route: sunnyartis.de/* und www.sunnyartis.de/*)
import redirects from './redirects.json'; // { "/products/foo": "https://www.sunnyartis.de/downloads", ... }

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const target = redirects[url.pathname];
    if (target) {
      return Response.redirect(target, 301);
    }
    return fetch(request); // durchreichen an GitHub Pages als Origin
  },
};
```

`redirects.json` lässt sich direkt aus `redirects/cloudflare-bulk-redirects.csv` generieren (Spalte 1 ohne Domain-Präfix als Key, Spalte 2 als Value). Kostenlos bis 100.000 Requests/Tag — für ein auslaufendes Shop-URL-Aufkommen mehr als ausreichend.
