import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export type Nutzer = { id: string; email: string };

/** Wer gerade angemeldet ist – `null`, wenn niemand. Einmal pro Anfrage. */
export const ladeNutzer = cache(async (): Promise<Nutzer | null> => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (!claims) return null;
  return { id: claims.sub, email: typeof claims.email === "string" ? claims.email : "" };
});

/** Für `?weiter=`: nur Pfade innerhalb der App, sonst die Startseite. */
export function sicheresZiel(ziel: unknown): string {
  // Steuerzeichen (z. B. Tab) entfernen Browser stillschweigend – aus „/<Tab>/fremd.de“ würde „//fremd.de“.
  if (typeof ziel !== "string" || /[\x00-\x1f\x7f\\]/.test(ziel) || !ziel.startsWith("/") || ziel.startsWith("//"))
    return "/";
  const basis = "http://leihbar.invalid";
  try {
    const url = new URL(ziel, basis);
    if (url.origin !== basis) return "/";
    // „/.//fremd.de“ wird beim Auflösen zu „//fremd.de“ – darum auch das Ergebnis prüfen.
    const ergebnis = url.pathname + url.search + url.hash;
    return ergebnis.startsWith("//") ? "/" : ergebnis;
  } catch {
    return "/";
  }
}
