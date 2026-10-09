import type { Gegenstand } from "@/data/gegenstaende";
import type { Nutzer } from "@/lib/auth";
import { spalten, zuGegenstand, type Zeile } from "@/lib/items";
import type { AnfrageStatus } from "@/lib/anfrage-status";
import { createClient } from "@/lib/supabase/server";

/** Eine Anfrage, wie die Besitzer*in sie auf der Detailseite sieht. */
export type ErhalteneAnfrage = { id: string; email: string; status: AnfrageStatus };

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

/** Alle Gegenstände, die diese Person angefragt hat, mit Status – die neueste Anfrage zuerst. */
export async function ladeMeineAnfragen(
  nutzer: Nutzer,
): Promise<{ gegenstand: Gegenstand; status: AnfrageStatus }[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("requests")
    .select(`status, items (${spalten})`)
    .eq("user_id", nutzer.id)
    .order("created_at", { ascending: false })
    .overrideTypes<{ status: AnfrageStatus; items: Zeile }[]>();
  if (error) throw new Error(`Anfragen konnten nicht geladen werden: ${error.message}`);
  return data.map((anfrage) => ({ gegenstand: zuGegenstand(anfrage.items), status: anfrage.status }));
}

/**
 * Die Anfragen an einen Gegenstand, die neueste zuerst. Die Regel in der Datenbank
 * gibt sie nur der Besitzer*in heraus (und jeder Person ihre eigene) – deshalb nur für Besitzer*innen aufrufen.
 */
export async function ladeErhalteneAnfragen(gegenstandId: string): Promise<ErhalteneAnfrage[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("requests")
    .select("id, email, status")
    .eq("item_id", gegenstandId)
    .order("created_at", { ascending: false })
    .overrideTypes<ErhalteneAnfrage[]>();
  if (error) throw new Error(`Anfragen konnten nicht geladen werden: ${error.message}`);
  return data;
}
