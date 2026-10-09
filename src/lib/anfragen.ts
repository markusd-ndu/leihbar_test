import type { Nutzer } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

/** Wie viele Anfragen es für einen Gegenstand gibt – für alle sichtbar, ohne zu verraten, von wem. */
export async function ladeAnzahlAnfragen(gegenstandId: string): Promise<number> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("anzahl_anfragen", { gegenstand: gegenstandId });
  if (error) throw new Error(`Anfragen konnten nicht gezählt werden: ${error.message}`);
  return Number(data);
}

/** Hat diese Person den Gegenstand schon angefragt? Ohne Anmeldung immer `false`. */
export async function hatAngefragt(gegenstandId: string, nutzer: Nutzer | null): Promise<boolean> {
  if (!nutzer) return false;
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("requests")
    .select("id", { count: "exact", head: true })
    .eq("item_id", gegenstandId)
    .eq("user_id", nutzer.id);
  if (error) throw new Error(`Anfrage konnte nicht geladen werden: ${error.message}`);
  return (count ?? 0) > 0;
}
