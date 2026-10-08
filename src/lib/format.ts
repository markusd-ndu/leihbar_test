// Anzeige-Helfer, die mehrere Seiten brauchen.

const euro = (betrag: number) =>
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: Number.isInteger(betrag) ? 0 : 2,
  }).format(betrag);

/** Preis pro Tag für die Anzeige: 0 → „gratis“, 12 → „12 € pro Tag“, 2.5 → „2,50 € pro Tag“. */
export function preisText(preisProTag: number): string {
  return preisProTag === 0 ? "gratis" : `${euro(preisProTag)} pro Tag`;
}
