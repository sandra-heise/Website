import { FREE_DOWNLOADS, type Download } from '../config/downloads';

const knownIds = new Set(FREE_DOWNLOADS.map((d) => d.id));

/** Slug für die Zähl-Seite /dl/<slug>/, abgeleitet aus der Download-id. */
export function downloadSlug(d: Pick<Download, 'id'>): string {
  return d.id.toLowerCase().replace(/_/g, '-');
}

/**
 * Liefert den internen /dl/<slug>/-Zähl-Pfad eines Gratis-Downloads.
 * Verwendung: <a href={d.url} download data-dl={dlUrl(d)}> — der Link lädt die Datei weiter direkt von R2,
 * das Klick-Skript im Layout schickt parallel eine Anfrage an den data-dl-Pfad, damit Download-Klicks
 * in Cloudflare Analytics -> Traffic (Pfad "/dl/*") sichtbar werden.
 * Wirft beim Build, wenn die id nicht in downloads.ts eingetragen ist.
 */
export function dlUrl(d: Pick<Download, 'id'>): string {
  if (!knownIds.has(d.id)) {
    throw new Error(`dlUrl: kein downloads.ts-Eintrag mit id "${d.id}" - dort ergaenzen.`);
  }
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  return `${base}/dl/${downloadSlug(d)}/`;
}
