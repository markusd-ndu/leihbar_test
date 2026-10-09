import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Wie viele offene Anfragen auf die Gegenstände dieser Person warten. Ohne Server-Code, damit
 * Server und Browser dieselbe Abfrage benutzen. Fremde Anfragen gibt die Regel in der Datenbank
 * ohnehin nur der Besitzer*in heraus.
 */
export async function zaehleOffeneAnfragen(supabase: SupabaseClient, besitzerinId: string): Promise<number> {
  const { count, error } = await supabase
    .from("requests")
    .select("id, items!inner(owner_id)", { count: "exact", head: true })
    .eq("status", "offen")
    .eq("items.owner_id", besitzerinId);
  if (error) throw new Error(`Offene Anfragen konnten nicht gezählt werden: ${error.message}`);
  return count ?? 0;
}
