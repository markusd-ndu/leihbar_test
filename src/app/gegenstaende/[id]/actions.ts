"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ladeNutzer } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export type AnfrageZustand = { fehler?: string };

/**
 * Fragt an oder zieht zurück. Das Formular sagt, was gemeint ist – so ändert ein
 * doppelter Klick nichts, statt die Anfrage gleich wieder zurückzuziehen.
 */
export async function anfrageUmschalten(
  gegenstandId: string,
  _vorher: AnfrageZustand,
  formData: FormData,
): Promise<AnfrageZustand> {
  const nutzer = await ladeNutzer();
  if (!nutzer) redirect(`/anmelden?weiter=/gegenstaende/${encodeURIComponent(gegenstandId)}`);

  const supabase = await createClient();
  if (formData.get("aktion") === "zurueckziehen") {
    // Die Regel in der Datenbank lässt ohnehin nur die eigene Anfrage löschen.
    const { error } = await supabase
      .from("requests")
      .delete()
      .eq("item_id", gegenstandId)
      .eq("user_id", nutzer.id);
    if (error) return { fehler: "Die Anfrage konnte nicht zurückgezogen werden. Bitte versuch es gleich noch einmal." };
  } else {
    const { error } = await supabase.from("requests").insert({ item_id: gegenstandId, user_id: nutzer.id });
    // 23505: schon angefragt (z. B. Doppelklick) – das Ziel ist erreicht.
    if (error && error.code !== "23505")
      return { fehler: "Die Anfrage konnte nicht gespeichert werden. Bitte versuch es gleich noch einmal." };
  }

  revalidatePath(`/gegenstaende/${gegenstandId}`);
  return {};
}
