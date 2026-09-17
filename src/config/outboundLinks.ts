// Zentrale Liste aller externen Etsy-/Amazon-Ziele der Website.
// Jeder Eintrag wird zu einer statischen Redirect-Seite unter /out/<slug>,
// damit Klicks in Cloudflare Analytics -> Traffic (Pfad "/out/*") sichtbar sind.
export interface OutboundLink {
  slug: string;
  url: string;
}

export const OUTBOUND_LINKS: OutboundLink[] = [
  // Etsy – Shop
  { slug: "etsy-shop", url: "https://www.etsy.com/shop/SunnyArtis" },
  { slug: "etsy-shop-plotterdateien", url: "https://www.etsy.com/shop/SunnyArtis?section_id=45759329" },

  // Etsy – Gemälde
  { slug: "etsy-4307467400", url: "https://www.etsy.com/de/listing/4307467400/ol-gemalde-original-frau-mit-blumen" },
  { slug: "etsy-4365612544", url: "https://www.etsy.com/de/listing/4365612544/ol-gemalde-original-farbenfrohe-frau" },
  { slug: "etsy-4354656293", url: "https://www.etsy.com/de/listing/4354656293/acryl-gemalde-original-vergangliche" },
  { slug: "etsy-4354656511", url: "https://www.etsy.com/de/listing/4354656511/acryl-gemalde-original-vergangliche" },

  // Etsy – Malbücher
  { slug: "etsy-1437110610", url: "https://www.etsy.com/de/listing/1437110610/malbuch-fur-teenager-25-fantasievolle" },
  { slug: "etsy-1784178213", url: "https://www.etsy.com/de/listing/1784178213/malbuch-fur-teenager-jungs-und-madchen" },
  { slug: "etsy-4553108271", url: "https://www.etsy.com/de/listing/4553108271/malbuch-fur-teenager-junge-madchen" },
  { slug: "etsy-4375183327", url: "https://www.etsy.com/de/listing/4375183327/magisches-malbuch-fantasie-in-farbe" },
  { slug: "etsy-1843977329", url: "https://www.etsy.com/de/listing/1843977329/malbuch-fur-teenager-jungs-madchen" },
  { slug: "etsy-1727809252", url: "https://www.etsy.com/de/listing/1727809252/malbuch-fur-teenager-junge-madchen" },
  { slug: "etsy-4564162264", url: "https://www.etsy.com/de/listing/4564162264/malbuch-fur-teenager-junge-madchen" },
  { slug: "etsy-4576977805", url: "https://sunnyartis.etsy.com/listing/4576977805" },

  // Etsy – Ausmalleinwände
  { slug: "etsy-1657906760", url: "https://www.etsy.com/de/listing/1657906760/leinwande-mit-unterschiedlichen-motiven" },
  { slug: "etsy-1464917977", url: "https://www.etsy.com/de/listing/1464917977/leinwand-zum-ausmalen-motive-auf" },

  // Amazon – Malbücher
  { slug: "amazon-B03B3ZYhD", url: "https://link.amazon/B03B3ZYhD" },
  { slug: "amazon-B0iRVnbIM", url: "https://link.amazon/B0iRVnbIM" },
  { slug: "amazon-B0gaT2ms6", url: "https://link.amazon/B0gaT2ms6" },
  { slug: "amazon-B053ozSYC", url: "https://link.amazon/B053ozSYC" },
  { slug: "amazon-B0iec5mA2", url: "https://link.amazon/B0iec5mA2" },
  { slug: "amazon-B07kk7GFM", url: "https://link.amazon/B07kk7GFM" },
  { slug: "amazon-B0cEkVEr6", url: "https://link.amazon/B0cEkVEr6" },
  { slug: "amazon-B0hsPCXPU", url: "https://link.amazon/B0hsPCXPU" },

  // Amazon – Basteln/Plotter-Material
  { slug: "amazon-4aancFE", url: "https://amzn.to/4aancFE" },
  { slug: "amazon-467iYgm", url: "https://amzn.to/467iYgm" },
  { slug: "amazon-4mRdVGS", url: "https://amzn.to/4mRdVGS" },
  { slug: "amazon-3QnnP86", url: "https://amzn.to/3QnnP86" },

  // Amazon – Blog-Materialtipps
  { slug: "amazon-468Bk0q", url: "https://amzn.to/468Bk0q" },
  { slug: "amazon-46bouxj", url: "https://amzn.to/46bouxj" },
  { slug: "amazon-4w3p5fZ", url: "https://amzn.to/4w3p5fZ" },
  { slug: "amazon-47MSFx9", url: "https://amzn.to/47MSFx9" },
];
