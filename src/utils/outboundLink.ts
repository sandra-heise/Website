import { OUTBOUND_LINKS } from '../config/outboundLinks';

const urlToSlug = new Map(OUTBOUND_LINKS.map((link) => [link.url, link.slug]));

/**
 * Wandelt eine Etsy-/Amazon-URL in den internen /out/<slug>-Redirect-Link um,
 * damit Klicks in Cloudflare Analytics -> Traffic sichtbar werden.
 * Wirft beim Build, wenn die URL nicht in outboundLinks.ts eingetragen ist.
 */
export function outUrl(realUrl: string): string {
  const slug = urlToSlug.get(realUrl);
  if (!slug) {
    throw new Error(`outUrl: keine outboundLinks.ts-Eintrag fuer "${realUrl}" - dort ergaenzen.`);
  }
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  return `${base}/out/${slug}/`;
}
