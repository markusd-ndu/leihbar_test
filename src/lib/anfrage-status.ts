// Ohne Server-Code, damit Browser-Komponenten die Status-Texte auch benutzen können.
export const anfrageStatus = ["offen", "angenommen", "abgelehnt"] as const;
export type AnfrageStatus = (typeof anfrageStatus)[number];
