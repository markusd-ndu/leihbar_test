"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import GegenstandKarte from "@/components/GegenstandKarte";
import type { Gegenstand } from "@/data/gegenstaende";

type Props = {
  gegenstaende: Gegenstand[];
  /** Der Gegenstand, den man gerade angeboten hat – er ist kurz hervorgehoben. */
  neuId?: string | null;
};

/** Wie lange die Hervorhebung bleibt. */
const HERVORHEBUNG_MS = 4000;

// Beim Filterwechsel kommt vom Server eine neue Liste: Karten, die wegfallen, blenden aus,
// die übrigen gleiten an ihren neuen Platz. Die Liste hängt nur an den Props – bei schnellen
// Klicks gewinnt also immer die zuletzt geladene.
export default function GegenstandListe({ gegenstaende, neuId = null }: Props) {
  // „Bewegung reduzieren“: MotionConfig stoppt Bewegung, aber nicht das Ausblenden – hier ganz ohne.
  const reduziert = useReducedMotion();
  const dauer = reduziert ? 0 : 0.3;
  const [hervorgehoben, setHervorgehoben] = useState(neuId);

  useEffect(() => {
    if (!neuId) return;
    const timer = setTimeout(() => setHervorgehoben(null), HERVORHEBUNG_MS);
    return () => clearTimeout(timer);
  }, [neuId]);

  return (
    <ul className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {/* initial={false}: beim ersten Laden der Seite wird nichts animiert. */}
      <AnimatePresence initial={false} mode="popLayout">
        {gegenstaende.map((gegenstand, index) => (
          <motion.li
            key={gegenstand.id}
            layout="position"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: dauer, ease: "easeOut" }}
            className="relative"
          >
            <GegenstandKarte gegenstand={gegenstand} vorladen={index === 0} />
            <AnimatePresence>
              {gegenstand.id === hervorgehoben && (
                // Gelbe Fläche mit schwarzem Rahmen über der Karte; blendet nach ein paar Sekunden aus.
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute -inset-1 border-4 border-foreground bg-signal/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduziert ? 0 : 0.6, ease: "easeOut" }}
                />
              )}
            </AnimatePresence>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
