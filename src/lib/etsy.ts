const BASE_URL = 'https://openapi.etsy.com/v3/application';

export interface EtsyListingRaw {
  listingId: string;
  title: string;
  description: string;
  preis: string;
  imageUrl: string | null;
  etsyUrl: string;
}

function formatPrice(price: { amount: number; divisor: number; currency_code: string }): string {
  const value = (price.amount / price.divisor).toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${value} ${price.currency_code === 'EUR' ? '€' : price.currency_code}`;
}

export async function fetchSectionListings(shopId: string, sectionId: string): Promise<EtsyListingRaw[]> {
  const apiKey = import.meta.env.ETSY_API_KEY;
  if (!apiKey || shopId.includes('EINTRAGEN') || sectionId.includes('EINTRAGEN')) return [];
  try {
    const url = `${BASE_URL}/shops/${shopId}/listings/active?shop_section_id=${sectionId}&includes=images&limit=100`;
    const res = await fetch(url, { headers: { 'x-api-key': apiKey } });
    if (!res.ok) {
      console.error(`[Etsy] HTTP ${res.status} Sektion ${sectionId}: ${await res.text()}`);
      return [];
    }
    const data = await res.json();
    return (data.results ?? []).map((item: any) => ({
      listingId: String(item.listing_id),
      title: item.title,
      description: item.description ?? '',
      preis: formatPrice(item.price),
      imageUrl: item.images?.[0]?.url_fullxfull ?? null,
      etsyUrl: item.url,
    }));
  } catch (e) {
    console.error('[Etsy] Netzwerkfehler:', e);
    return [];
  }
}
