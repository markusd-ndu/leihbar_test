import type { RealtimeChannel } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

type Beobachtung = {
  kanal: RealtimeChannel;
  verbunden: boolean;
  zuhoerer: Set<() => void>;
  abmelden?: ReturnType<typeof setTimeout>;
};

// Supabase gibt für denselben Kanalnamen denselben Kanal zurück – auch einen, der gerade schließt.
// Zähler und Header-Hinweis teilen sich darum einen Kanal pro Gegenstand, und geschlossen wird er
// erst kurz nachdem niemand mehr zuhört (beim Seitenwechsel meldet sich oft gleich jemand wieder an).
const beobachtungen = new Map<string, Beobachtung>();
const SCHLIESSEN_NACH_MS = 5000;

/**
 * Ruft `zuhoerer` auf, sobald sich die Anfragen an einem Gegenstand ändern – und einmal beim
 * (Wieder-)Verbinden, falls in der Zwischenzeit etwas passiert ist. Gibt die Abmeldung zurück.
 */
export function beobachteAnfragen(gegenstandId: string, zuhoerer: () => void): () => void {
  const supabase = createClient();
  let beobachtung = beobachtungen.get(gegenstandId);

  if (!beobachtung) {
    const neu: Beobachtung = { kanal: supabase.channel(`anfragen:${gegenstandId}`), verbunden: false, zuhoerer: new Set() };
    neu.kanal
      .on("broadcast", { event: "geaendert" }, () => neu.zuhoerer.forEach((z) => z()))
      .subscribe((status) => {
        neu.verbunden = status === "SUBSCRIBED";
        if (neu.verbunden) neu.zuhoerer.forEach((z) => z());
      });
    beobachtungen.set(gegenstandId, neu);
    beobachtung = neu;
  } else {
    clearTimeout(beobachtung.abmelden);
    // Schon verbunden: Das Nachladen beim Verbinden ist vorbei, also einmal für die neue Komponente.
    if (beobachtung.verbunden) queueMicrotask(zuhoerer);
  }

  const aktiv = beobachtung;
  aktiv.zuhoerer.add(zuhoerer);

  return () => {
    aktiv.zuhoerer.delete(zuhoerer);
    if (aktiv.zuhoerer.size > 0) return;
    clearTimeout(aktiv.abmelden);
    aktiv.abmelden = setTimeout(() => {
      if (aktiv.zuhoerer.size > 0) return;
      beobachtungen.delete(gegenstandId);
      supabase.removeChannel(aktiv.kanal);
    }, SCHLIESSEN_NACH_MS);
  };
}
