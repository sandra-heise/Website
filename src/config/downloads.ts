// Alle kostenlosen Plotterdateien auf Cloudflare R2
// Neue Datei hochladen auf: https://pub-8b47857c39ee41ef8bdb9c45b849e41d.r2.dev/
// Dann hier eintragen und fertig — erscheint automatisch auf /downloads und im Blog.

export interface Download {
  id: string;
  title: string;
  beschreibung: string;
  url: string;
  format: string;
  kategorie: string;
  bestseller?: boolean;
  blogPost?: string; // relativer Pfad, z. B. "/blog/halloween-laterne"
  vorschau?: string; // relativer Pfad zum Vorschaubild, z. B. "/blog/halloween-hero.jpg"
}

export const FREE_DOWNLOADS: Download[] = [

// ── Feiertage ────────────────────────────────────────────────────────────
  {
    id: "0053Muttertagsset",
    title: "Muttertags Set",
    beschreibung: "kostenlose Plotterdatei für ein Muttertags Set - Freebie.",
    url: "https://pub-8b47857c39ee41ef8bdb9c45b849e41d.r2.dev/SunnyArtis_Plotterdatei_0053Muttertagsset.zip",
    format: "ZIP (SVG, PNG, DXF, JPG)",
    kategorie: "Feiertage",
    vorschau: "/downloads/muttertag.jpg",
  },
  {
    id: "0054Vatertagsset",
    title: "Vatertags Set",
    beschreibung: "kostenlose Plotterdatei für ein Vatertags Set - Freebie.",
    url: "https://pub-8b47857c39ee41ef8bdb9c45b849e41d.r2.dev/SunnyArtis_Plotterdatei_0054Vatertagsset.zip",
    format: "ZIP (SVG, PNG, DXF, JPG)",
    kategorie: "Feiertage",
    vorschau: "/downloads/vatertag.jpg",
  },
    {
    id: "0049Musterkarte",
    title: "Musterkarte",
    beschreibung: "kostenlose Plotterdatei für eine Musterkarte - Freebie",
    url: "https://pub-8b47857c39ee41ef8bdb9c45b849e41d.r2.dev/SunnyArtis_Plotterdatei_0049Musterkarte.zip",
    format: "ZIP (SVG, PNG, DXF, JPG)",
    kategorie: "Feiertage",
    vorschau: "/downloads/Gluckwunschkarte.jpg",
  },

  // ── Halloween ────────────────────────────────────────────────────────────
  {
    id: "0074Geoface",
    title: "Halloween Gesicht gruselig",
    beschreibung: "kostenlose Plotterdatei eine gruselige Halloween-Gesicht - Freebie.",
    url: "https://pub-8b47857c39ee41ef8bdb9c45b849e41d.r2.dev/SunnyArtis_Plotterdatei_0074Geoface.zip",
    format: "ZIP (SVG, PNG, DXF, JPG)",
    kategorie: "Halloween",
    vorschau: "/downloads/Geoface.jpg",
  },
  {
    id: "0075Kurbisgesichter",
    title: "Halloween Kürbisse",
    beschreibung: "kostenlose Plotterdatei mit süßen und gruseligen Kürbisgesichtern - Freebie.",
    url: "https://pub-8b47857c39ee41ef8bdb9c45b849e41d.r2.dev/SunnyArtis_Plotterdatei_0075Kurbisgesichter.zip",
    format: "ZIP (SVG, PNG, DXF, JPG)",
    kategorie: "Halloween",
    vorschau: "/downloads/Kuerbisgesichterfree.jpg",
  },
  {
    id: "0093HCity",
    title: "Halloween Town",
    beschreibung: "kostenlose Plotterdatei einer Halloween Stadt - Freebie",
    url: "https://pub-8b47857c39ee41ef8bdb9c45b849e41d.r2.dev/PLotterdatei_SunnyArtis_0093HCity.zip",
    format: "ZIP (SVG, PNG, DXF, JPG)",
    kategorie: "Halloween",
    bestseller: true,
    vorschau: "/downloads/Thumbnail_halloweenCity_free.png",
  },
  {
    id: "0114HalloweenLaterne",
    title: "Halloween Laterne",
    beschreibung: "kostenlose Plotterdatei für eine selbstgebastelte viereckige Halloween-Laterne aus Papier — inkl. aller Seitenteile und Laschen. - Freebie",
    url: "https://pub-8b47857c39ee41ef8bdb9c45b849e41d.r2.dev/SunnyArtis_plotterdatei_0114HalloweenLaterne.zip",
    format: "ZIP (SVG, PNG, DXF, JPG)",
    kategorie: "Halloween",
    blogPost: "/blog/halloween-laterne",
    vorschau: "/blog/halloween-hero.jpg",
  },

  // ── Herbst ───────────────────────────────────────────────────────────────
  {
    id: "0102IgelBlumen",
    title: "Herbst Igel",
    beschreibung: "kostenlose Plotterdatei für einen Herbst-Igel - Freebie",
    url: "https://pub-8b47857c39ee41ef8bdb9c45b849e41d.r2.dev/SunnyArtis_Plotterdatei_0102IgelBlumen.zip",
    format: "ZIP (SVG, PNG, DXF, JPG)",
    kategorie: "Herbst",
    bestseller: true,
    vorschau: "/downloads/igel_blumen_free.jpg",
  },

  // ── Ostern ───────────────────────────────────────────────────────────────
    {
    id: "0051OsterSet",
    title: "Oster Set",
    beschreibung: "kostenlose Plotterdatei für ein Oster Set - Freebie",
    url: "https://pub-8b47857c39ee41ef8bdb9c45b849e41d.r2.dev/SunnyArtis_Plotterdatei_0051OsterSet.zip",
    format: "ZIP (SVG, PNG, DXF, JPG)",
    kategorie: "Ostern",
    vorschau: "/downloads/Ostersetfree.jpg",
  },
  {
    id: "0108HappyEaster",
    title: "Happy Easter",
    beschreibung: "kostenlose Plotterdatei für einen Osterhase - Freebie",
    url: "https://pub-8b47857c39ee41ef8bdb9c45b849e41d.r2.dev/SunnyArtis_Plotterdatei_0108HappyEaster.zip",
    format: "ZIP (SVG, PNG, DXF, JPG)",
    kategorie: "Ostern",
    bestseller: true,
    vorschau: "/downloads/Happy_Easter_free.jpg",
  },

  // ── Sonstiges ────────────────────────────────────────────────────────────
  {
    id: "0064KatzeMuster",
    title: "Katzengesicht",
    beschreibung: "kostenlose Plotterdatei für ein Katzengesicht - Freebie",
    url: "https://pub-8b47857c39ee41ef8bdb9c45b849e41d.r2.dev/SunnyArtis_Plotterdatei_0064KatzeMuster.zip",
    format: "ZIP (SVG, PNG, DXF, JPG)",
    kategorie: "Sonstiges",
    vorschau: "/downloads/Katze_Muster_Free.jpg",
  },
  {
    id: "0073HerzSilhoutte",
    title: "Bezaubernde Herzsilhouette",
    beschreibung: "kostenlose Plotterdatei einer Herzsilhouette - Freebie",
    url: "https://pub-8b47857c39ee41ef8bdb9c45b849e41d.r2.dev/SunnyArtis_Plotterdateien_0073HerzSilhoutte.zip",
    format: "ZIP (SVG, PNG, DXF, JPG)",
    kategorie: "Sonstiges",
    bestseller: true,
    vorschau: "/downloads/herz_free.png",
  },
    {
    id: "0073SilhoutteStern",
    title: "Bezaubernde Sternsilhouette",
    beschreibung: "kostenlose Plotterdatei einer Sternsilhouette - Freebie",
    url: "https://pub-8b47857c39ee41ef8bdb9c45b849e41d.r2.dev/SunnyArtis_Plotterdateien_0073SilhoutteStern.zip",
    format: "ZIP (SVG, PNG, DXF, JPG)",
    kategorie: "Sonstiges",
    bestseller: true,
    vorschau: "/downloads/Stern.jpg",
  },
  {
    id: "0076Feuerwehrmann",
    title: "Feuerwehrmann Chibbi",
    beschreibung: "kostenlose Plotterdatei eines Feuerwehrmann- Feuerwehrkind - Freebie",
    url: "https://pub-8b47857c39ee41ef8bdb9c45b849e41d.r2.dev/SunnyArtis_Plotterdateien_0076Feuerwehrmann.zip",
    format: "ZIP (SVG, PNG, DXF, JPG)",
    kategorie: "Sonstiges",
    vorschau: "/downloads/Feuerwehrmann.jpg",
  },
   {
    id: "0077Cocktail",
    title: "Cocktailglas",
    beschreibung: "kostenlose Plotterdatei für ein Cocktails Glas - Freebie",
    url: "https://pub-8b47857c39ee41ef8bdb9c45b849e41d.r2.dev/SunnyArtis_Plotterdateien_0077Cocktail.zip",
    format: "ZIP (SVG, PNG, DXF, JPG)",
    kategorie: "Sonstiges",
    vorschau: "/downloads/summer_free.jpg",
  },
  {
    id: "0078immerVerbunden",
    title: "Text - immer verbunden",
    beschreibung: "kostenlose Plotterdatei für einen Schriftzug - Freebie",
    url: "https://pub-8b47857c39ee41ef8bdb9c45b849e41d.r2.dev/SunnyArtis_Plotterdatei_0078immerVerbunden.zip",
    format: "ZIP (SVG, PNG, DXF, JPG)",
    kategorie: "Sonstiges",
    vorschau: "/downloads/immer_verbunden_free.jpg",
  },
  {
    id: "0079immerVerbunden2",
    title: "Text - immer verbunden (Variante 2)",
    beschreibung: "kostenlose Plotterdatei für einen Schriftzug - Freebie",
    url: "https://pub-8b47857c39ee41ef8bdb9c45b849e41d.r2.dev/SunnyArtis_Plotterdatei_0079immerVerbunden2.zip",
    format: "ZIP (SVG, PNG, DXF, JPG)",
    kategorie: "Sonstiges",
    vorschau: "/downloads/immer_verbunden_free2.jpg",
  },
  {
    id: "0087Schmetterling",
    title: "Schmetterling mit Rosen",
    beschreibung: "kostenlose Plotterdatei für einen Schmetterling - Freebie",
    url: "https://pub-8b47857c39ee41ef8bdb9c45b849e41d.r2.dev/SunnyArtis_Plotterdatei_0087Schmetterling.zip",
    format: "ZIP (SVG, PNG, DXF, JPG)",
    kategorie: "Sonstiges",
    vorschau: "/downloads/Schmetterling_Free.jpg",
  },
  {
    id: "0113Herz",
    title: "Herz mit Blüten",
    beschreibung: "kostenlose Plotterdatei eines Herzens mit Blüten - Freebie",
    url: "https://pub-8b47857c39ee41ef8bdb9c45b849e41d.r2.dev/SunnyArtis_Plotterdatei_0113Herz.zip",
    format: "ZIP (SVG, PNG, DXF, JPG)",
    kategorie: "Sonstiges",
    bestseller: true,
    vorschau: "/downloads/herz_mit_blueten.jpg",
  },

  // ── Weihnachten ──────────────────────────────────────────────────────────
  {
    id: "0071Weihnachtsanhaenger",
    title: "Weihnachts-Geschenkanhänger",
    beschreibung: "kostenlose Plotterdatei für einen Weihnachtsanhänger - Freebie",
    url: "https://pub-8b47857c39ee41ef8bdb9c45b849e41d.r2.dev/SunnyArtis_Plotterdatei_0071Weihnachtsanhaenger.zip",
    format: "ZIP (SVG, PNG, DXF, JPG)",
    kategorie: "Weihnachten",
    vorschau: "/downloads/Weihnachsanhaengerkostenlos.jpg",
  },
  {
    id: "0107wichtel",
    title: "Weihnachtswichtel",
    beschreibung: "kostenlose Plotterdatei Weihnachtswichtel - Freebie",
    url: "https://pub-8b47857c39ee41ef8bdb9c45b849e41d.r2.dev/SunnyArtis_Plotterdatei_0107wichtel.zip",
    format: "ZIP (SVG, PNG, DXF, JPG)",
    kategorie: "Weihnachten",
    bestseller: true,
    vorschau: "/downloads/thumbnail_wichtel.png",
  },

  // Weitere Dateien hier eintragen — nach Kategorie gruppiert:
  // {
  //   id: "0000Beispiel",
  //   title: "Titel",
  //   beschreibung: "...",
  //   url: "https://pub-8b47857c39ee41ef8bdb9c45b849e41d.r2.dev/dateiname.zip",
  //   format: "ZIP (SVG, PNG, DXF, JPG)",
  //   kategorie: "Halloween", // oder Herbst / Ostern / Sonstiges / Weihnachten
  // },
];
