// Einmalig ausführen sobald der Etsy API-Key freigegeben ist:
//   ETSY_API_KEY=dein-key node scripts/get-etsy-info.mjs
//
// Das Skript gibt Shop-ID und alle Sektions-IDs aus,
// die du dann in src/config/etsy.ts einträgst.

const API_KEY = process.env.ETSY_API_KEY;
const SHOP_NAME = 'SunnyArtis';

if (!API_KEY) {
  console.error('Fehler: ETSY_API_KEY nicht gesetzt.');
  console.error('Ausführen: ETSY_API_KEY=dein-key node scripts/get-etsy-info.mjs');
  process.exit(1);
}

const headers = { 'x-api-key': API_KEY };

// Shop-ID holen
const shopRes = await fetch(
  `https://openapi.etsy.com/v3/application/shops?shop_name=${SHOP_NAME}`,
  { headers }
);
const shopData = await shopRes.json();
if (!shopRes.ok || !shopData.results?.length) {
  console.error('Shop nicht gefunden:', shopData);
  process.exit(1);
}
const shop = shopData.results[0];

// Sektionen holen
const sectionsRes = await fetch(
  `https://openapi.etsy.com/v3/application/shops/${shop.shop_id}/sections`,
  { headers }
);
const sectionsData = await sectionsRes.json();
if (!sectionsRes.ok) {
  console.error('Sektionen-Fehler:', sectionsData);
  process.exit(1);
}

// Ausgabe
console.log(`\nShop: ${shop.shop_name}`);
console.log(`\n--- In src/config/etsy.ts eintragen ---\n`);
console.log(`export const ETSY_SHOP_ID = "${shop.shop_id}";\n`);
console.log('export const ETSY_SECTIONS: Record<string, string> = {');
for (const s of sectionsData.results) {
  const key = s.title.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
  console.log(`  ${key}: "${s.shop_section_id}", // ${s.title} (${s.active_listing_count} Artikel)`);
}
console.log('};');
