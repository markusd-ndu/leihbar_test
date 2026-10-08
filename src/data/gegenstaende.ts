// Beispieldaten — bis die Datenbank (Supabase, Tag 2) angebunden ist.
// Ein Gegenstand ist absichtlich gerade verliehen (siehe Issue 1 im Backlog).
// Die Bilder liegen in public/gegenstaende/.

export const kategorien = ["Mode", "Wohnen & Deko", "Technik", "Freizeit"] as const;
export type Kategorie = (typeof kategorien)[number];

export type Gegenstand = {
  id: string;
  titel: string;
  kategorie: Kategorie;
  beschreibung: string;
  besitzer: string;
  ort: string;
  preisProTag: number; // Euro pro Tag, 0 = gratis
  verfuegbar: boolean;
  bild: string; // Pfad unter public/, z. B. "/gegenstaende/abendkleid.jpg"
};

export const gegenstaende: Gegenstand[] = [
  {
    id: "abendkleid",
    titel: "Abendkleid in Nachtblau, Größe 38",
    kategorie: "Mode",
    beschreibung:
      "Bodenlang, einmal auf dem Uni-Ball getragen. Frisch gereinigt, mit passender Clutch.",
    besitzer: "Hannah",
    ort: "NDU, Foyer",
    preisProTag: 12,
    verfuegbar: true,
    bild: "/gegenstaende/abendkleid.jpg",
  },
  {
    id: "anzug",
    titel: "Anzug mit Fliege, Größe 50",
    kategorie: "Mode",
    beschreibung:
      "Dunkelgrau, schmal geschnitten. Für Bälle, Hochzeiten und Präsentationen, die Eindruck machen sollen.",
    besitzer: "Lukas",
    ort: "St. Pölten, Domplatz",
    preisProTag: 15,
    verfuegbar: true,
    bild: "/gegenstaende/anzug.jpg",
  },
  {
    id: "samtsessel",
    titel: "Samtsessel in Senfgelb",
    kategorie: "Wohnen & Deko",
    beschreibung:
      "Hingucker für Fotoshootings, Besichtigungen oder die WG-Party. Abholung mit Auto nötig.",
    besitzer: "Sofia",
    ort: "St. Pölten, Herzogenburger Straße",
    preisProTag: 8,
    verfuegbar: true,
    bild: "/gegenstaende/samtsessel.jpg",
  },
  {
    id: "stehlampe",
    titel: "Vintage-Stehlampe aus Messing",
    kategorie: "Wohnen & Deko",
    beschreibung:
      "Warmes Licht, 1,60 m hoch. Macht jede Ecke wohnlich – auch für eine Wohnungsbesichtigung.",
    besitzer: "Jonas",
    ort: "NDU, Werkstatt",
    preisProTag: 4,
    verfuegbar: true,
    bild: "/gegenstaende/stehlampe.jpg",
  },
  {
    id: "beamer",
    titel: "Beamer mit Leinwand",
    kategorie: "Technik",
    beschreibung:
      "Full HD, HDMI-Kabel liegt bei. Für Filmabende und Präsentationen. Bitte pfleglich behandeln.",
    besitzer: "Studienvertretung",
    ort: "NDU, Raum 2.04",
    preisProTag: 0,
    verfuegbar: true,
    bild: "/gegenstaende/beamer.jpg",
  },
  {
    id: "akkuschrauber",
    titel: "Akkuschrauber mit Bit-Set",
    kategorie: "Technik",
    beschreibung:
      "Zwei Akkus, Ladegerät und 30 Bits. Reicht für jedes WG-Regal und jeden Umzug.",
    besitzer: "Emil",
    ort: "St. Pölten, Wiener Straße",
    preisProTag: 3,
    verfuegbar: true,
    bild: "/gegenstaende/akkuschrauber.jpg",
  },
  {
    id: "campingzelt",
    titel: "Campingzelt für drei",
    kategorie: "Freizeit",
    beschreibung:
      "In zehn Minuten aufgebaut, wasserdicht getestet. Ideal fürs Festival oder ein Wochenende am See.",
    besitzer: "Mira",
    ort: "St. Pölten, Hauptbahnhof",
    preisProTag: 0,
    verfuegbar: true,
    bild: "/gegenstaende/campingzelt.jpg",
  },
  {
    id: "systemkamera",
    titel: "Systemkamera mit zwei Objektiven",
    kategorie: "Technik",
    beschreibung:
      "Dieser Gegenstand ist gerade verliehen und sollte in der Liste nicht auftauchen.",
    besitzer: "Ben",
    ort: "NDU, Foyer",
    preisProTag: 10,
    verfuegbar: false,
    bild: "/gegenstaende/systemkamera.jpg",
  },
];
