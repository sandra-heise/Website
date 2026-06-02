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
  blogPost?: string; // relativer Pfad, z. B. "/blog/halloween-laterne"
  vorschau?: string; // relativer Pfad zum Vorschaubild, z. B. "/blog/halloween-hero.jpg"
}

export const FREE_DOWNLOADS: Download[] = [
  {
    id: "halloween-laterne",
    title: "Halloween Laterne",
    beschreibung: "SVG-Plotterdatei für eine selbstgebastelte viereckige Halloween-Laterne aus Papier — inkl. aller Seitenteile und Laschen.",
    url: "https://pub-8b47857c39ee41ef8bdb9c45b849e41d.r2.dev/SunnyArtis_plotterdatei_0114HalloweenLaterne.zip",
    format: "ZIP (SVG)",
    kategorie: "Halloween",
    blogPost: "/blog/halloween-laterne",
    vorschau: "/blog/halloween-hero.jpg",
  },
  // Weitere Dateien hier eintragen:
  // {
  //   id: "mein-motiv",
  //   title: "Mein Motiv",
  //   beschreibung: "...",
  //   url: "https://pub-8b47857c39ee41ef8bdb9c45b849e41d.r2.dev/dateiname.zip",
  //   format: "ZIP (SVG)",
  //   kategorie: "...",
  // },
];
