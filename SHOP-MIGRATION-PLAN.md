# Shop-Umzug: Shopify → sunnyartis.de (Astro-Website)

Ziel: `sunnyartis.de` / `www.sunnyartis.de` zeigt künftig komplett auf die Astro-Website (GitHub Pages), nicht mehr auf Shopify. Alle alten Shop-URLs sollen sauber per 301 auf die passende neue Seite umgeleitet werden.

## 0. Was schon vorbereitet ist

Im Repo liegen bereits drei CSV-Dateien aus einer früheren Session:

| Datei | Inhalt | Status |
|---|---|---|
| `shopify-redirects-export-original.csv` | Rohexport der Shopify-eigenen Redirects (484 Zeilen) | Quellmaterial, nicht mehr direkt gebraucht |
| `shopify-alte-urls.csv` | Liste alter Shop-URLs, `ziel_neue_seite` meist leer (nur 23/259 befüllt) | Entwurf, überholt |
| `cloudflare-bulk-redirects.csv` | **Fertige, importfähige Cloudflare-Bulk-Redirect-Liste**: 734 eindeutige alte URLs × 2 (mit/ohne `www`) = 1468 Zeilen, Format `source,target,301,,,,` (passt exakt zum Cloudflare-CSV-Import-Schema) | **Fertig, Fehler in Abschnitt 1 bereits behoben** |

→ Die eigentliche Migrationsarbeit (alte URL → sinnvolle neue Kategorie: `/schmuck`, `/gemaelde`, `/malen`, `/downloads`, `/basteln`, `/` usw.) ist bereits gemacht.

`TODO.md` enthält im Abschnitt „Shop-Umzug" bereits eine grobe Kurzfassung — dieser Plan ersetzt/detailliert sie.

## 1. Gefundene Fehler — vor dem Import fixen ✅ erledigt

Beim Gegencheck der CSV gegen die aktuelle Seitenstruktur zwei defekte Redirect-Ziele gefunden und behoben:

- `sunnyartis.de/pages/handgezeichnete-portraits` zeigte auf die nicht mehr existierende Route `/portraets` → korrigiert auf `https://www.sunnyartis.de/portfolio#portraets`
- `sunnyartis.de/pages/portfolio` zeigte auf die entfernte Route `/galerie` → korrigiert auf `https://www.sunnyartis.de/portfolio`
- Zusätzlicher Codebug mit derselben Ursache: [src/pages/404.astro](src/pages/404.astro#L8) verlinkte auf `/portraets` → korrigiert auf `/portfolio#portraets`
- Stichprobe aller übrigen Redirect-Ziele gegen die vorhandenen Routen abgeglichen — keine weiteren toten Ziele gefunden

**Action Items:**
- [x] `cloudflare-bulk-redirects.csv` korrigiert (4 Zeilen)
- [x] `src/pages/404.astro` korrigiert
- [x] Restliche Ziele stichprobenartig/vollständig gegen `src/pages/` geprüft

## 2. Offene Entscheidungen

- [x] **Cloudflare-Plan geprüft:** Dashboard zeigt 5 Listen / 10.000 Items zur Verfügung, 0 aktuell genutzt. Die 1468 Zeilen aus `cloudflare-bulk-redirects.csv` passen also problemlos in eine einzige Liste — Plan B (Worker, siehe Anhang) wird **nicht** benötigt.
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

- [ ] **Vorher sichern:** Aktuelle DNS-Einträge bei GoDaddy dokumentieren/exportieren (Screenshot oder Export der DNS-Zone) — als Rückfallebene, falls beim Umzug etwas verloren geht. E-Mail läuft über `sunnyartis@gmx.de` (extern, nicht auf der Domain gehostet) — daher kein MX-Risiko zu erwarten, trotzdem einmal kurz gegenprüfen, ob unter `sunnyartis.de` noch andere Dienste per DNS liegen (z. B. Domain-Verifizierungen für Google/Meta, Subdomains).
- [ ] In Cloudflare: **„Add a Site"** → `sunnyartis.de` eingeben → Plan wählen (Free reicht für DNS + Bulk Redirects mit dem vorhandenen Kontingent) → Cloudflare scannt automatisch die bestehenden DNS-Records von GoDaddy
- [ ] Gescannte Records gegen die GoDaddy-Sicherung gegenprüfen — nichts Wichtiges fehlt
- [ ] Cloudflare zeigt zwei zugewiesene Nameserver (z. B. `xxx.ns.cloudflare.com`, `yyy.ns.cloudflare.com`) an
- [ ] Bei **GoDaddy** → Domain-Einstellungen → Nameserver → auf „Benutzerdefinierte Nameserver" umstellen → die beiden Cloudflare-Nameserver eintragen
- [ ] Warten, bis Cloudflare die Zone als **„Active"** meldet (Bestätigungsmail von Cloudflare) — kann von wenigen Minuten bis zu 24 Std. dauern
- [ ] Danach in Cloudflare gegenprüfen: löst die Domain weiterhin wie vorher auf (zeigt also erstmal noch auf Shopify), bevor irgendwelche Records geändert werden — der Nameserver-Wechsel selbst soll noch **keine** sichtbare Änderung verursachen

Erst wenn die Zone in Cloudflare aktiv ist, ergeben die folgenden DNS-Schritte (Phase 3) Sinn.

## 5. Phase 3 — DNS & GitHub Pages

- [ ] **GitHub Repo-Settings** → Settings → Pages → Custom domain: `www.sunnyartis.de` eintragen (GitHub prüft automatisch per DNS, kann ein paar Minuten dauern)
- [ ] **Cloudflare DNS:**
  - `CNAME www → sandra-heise.github.io` — Proxy-Status: **Proxied (orange Wolke)**
  - Für die nackte Domain `sunnyartis.de` (Apex) einen A-Record auf die GitHub-Pages-IPs anlegen (damit die Domain überhaupt auflöst, bevor die Redirect Rule greift):
    ```
    185.199.108.153
    185.199.109.153
    185.199.110.153
    185.199.111.153
    ```
    Proxy-Status ebenfalls **Proxied** — dadurch übernimmt Cloudflare den Request, bevor er den GitHub-Server überhaupt erreicht.
  - Alte, jetzt nicht mehr benötigte Records, die auf Shopify zeigten (z. B. alte A/CNAME-Records für Shopify-Hosting), entfernen bzw. durch die obigen ersetzen
- [ ] Eine einzelne **Redirect Rule** (nicht Bulk) anlegen: `sunnyartis.de/*` → `https://www.sunnyartis.de/$1` (301) — sorgt dafür, dass die Apex-Domain immer auf `www` zeigt, bevor die restlichen Redirects greifen
- [ ] In GitHub Pages Settings **„Enforce HTTPS"** aktivieren, sobald das Zertifikat für `www.sunnyartis.de` ausgestellt ist (kann bei aktivem Proxy etwas dauern; falls es hängt, testweise kurz auf „DNS only" (graue Wolke) stellen bis das Zertifikat da ist, danach wieder proxied schalten)
- [ ] SSL/TLS-Modus in Cloudflare auf **Full (Strict)** stellen, sobald das GitHub-Zertifikat aktiv ist

## 6. Phase 4 — Redirects einspielen

- [ ] Korrigierte `cloudflare-bulk-redirects.csv` in Cloudflare importieren: **Rules → Redirect Rules → Bulk Redirects → Create list** (z. B. Name `shopify-migration`) → CSV importieren
- [ ] Danach eine **Bulk Redirect Rule** erstellen, die diese Liste auf eingehende Requests für `sunnyartis.de` und `www.sunnyartis.de` anwendet ("When incoming requests match... → Then redirect using list")
- [ ] **Catch-all für nicht erfasste URLs:** Die Liste deckt 734 konkrete alte URLs ab, aber Shopify hatte vermutlich weitere (z. B. `?variant=`-Parameter, gelöschte Produkte, `/cart`, `/account`, `/checkout`). Dafür zusätzlich generische Fallback-Regeln anlegen (falls nicht schon in der Liste enthalten):
  - `/products/*` → `/` (falls nicht individuell gematcht)
  - `/collections/*` → `/`
  - `/cart*`, `/account*`, `/checkout*` → `/`
  - `/blogs/*` → `/blog` (falls nicht individuell gematcht)

  Bulk-Redirect-Listen matchen exakt (kein Wildcard), daher diese generischen Fälle als separate normale Redirect Rules mit Wildcard-Matching ergänzen, mit niedrigerer Priorität als die exakte Liste.

## 7. Phase 5 — Go-Live (Cutover-Reihenfolge)

Reihenfolge einhalten, um Downtime/Fehlleitungen zu vermeiden:

0. [ ] **Vorher:** Google-Shopping-Kampagnen (bzw. die Shopify-Google-App) pausieren/deaktivieren, bevor die Redirects live gehen — sonst laufen Anzeigen mit toten/umgeleiteten Ziel-URLs weiter und verbrennen Budget, bis Google die Produkte wegen Redirect-Fehlern von selbst ablehnt
1. [ ] Phase 1 (Code) ist deployt und live unter der GitHub-Pages-URL erreichbar
2. [ ] Phase 2 (Domain-Umzug zu Cloudflare) abgeschlossen, Zone „Active"
3. [ ] Phase 3 (DNS) eingerichtet, Custom Domain in GitHub bestätigt (grünes Häkchen in den Repo-Settings)
4. [ ] Phase 4 (Redirects) importiert und aktiviert
5. [ ] Stichprobe testen — 10–15 typische alte URLs (Produkt, Kollektion, Blog, Cart) mit `curl -I <url>` oder im Browser (Inkognito) prüfen, ob 301 auf die richtige neue Seite erfolgt
6. [ ] Erst danach: In Shopify die Domain-Verknüpfung lösen bzw. den Shop offline schalten (Online Store → Domains) — die DNS liegt ja schon bei Cloudflare, daher betrifft das nur den Shopify-seitigen Status, nicht die Erreichbarkeit
7. [ ] HTTPS-Zertifikat und Ladezeiten der neuen Domain nochmal final prüfen

## 8. Phase 6 — Nach dem Go-Live

- [ ] **Google Search Console:** Property für `https://www.sunnyartis.de` hinzufügen/bestätigen, Sitemap einreichen (siehe Phase 1, sitemap-Integration), wichtigste Seiten per „URL-Prüfung" zur erneuten Indexierung anstoßen
- [ ] Falls vorhanden: Google Business Profil / Social-Media-Bio-Links (Instagram, Etsy-Shop-Beschreibung etc.) von der alten Shop-URL auf `www.sunnyartis.de` aktualisieren
- [ ] Redirects 1–2 Wochen beobachten (Cloudflare Analytics → Redirect Rules zeigt Trefferzahlen; Google Search Console → „Nicht gefunden (404)" auf neue 404-Treffer prüfen)
- [ ] Shopify-Abo läuft Ende November 2026 automatisch aus (kein manuelles Kündigen nötig) — vorher Bestellhistorie/Kundendaten/Produktbilder aus dem Shopify-Adminbereich sichern, falls noch benötigt
- [ ] `shopify-alte-urls.csv` und `shopify-redirects-export-original.csv` können danach archiviert/gelöscht werden — sie waren nur Rohmaterial für `cloudflare-bulk-redirects.csv`
- [ ] `TODO.md`-Abschnitt „Shop-Umzug" als erledigt markieren bzw. entfernen

## Rollback-Plan

Falls nach dem Cutover etwas nicht passt:
- Der Nameserver-Wechsel (Phase 2) ist der einzige Schritt, der außerhalb von Cloudflare/GitHub liegt und etwas länger zum Rückgängigmachen braucht (wieder GoDaddy-Nameserver eintragen) — alles danach (DNS-Records, Redirect-Regeln, Bulk-Liste) lässt sich in Cloudflare jederzeit sofort anpassen/deaktivieren
- Im Notfall: Bulk-Redirect-Rule in Cloudflare pausieren (Toggle „Disabled") — dann greifen nur noch die Astro-Seite selbst und deren 404-Seite
- Shopify-Shop bleibt bis zur finalen Kündigung unter `*.myshopify.com` erreichbar, auch wenn die Domain schon umgezogen ist

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

`redirects.json` lässt sich direkt aus `cloudflare-bulk-redirects.csv` generieren (Spalte 1 ohne Domain-Präfix als Key, Spalte 2 als Value). Kostenlos bis 100.000 Requests/Tag — für ein auslaufendes Shop-URL-Aufkommen mehr als ausreichend.
