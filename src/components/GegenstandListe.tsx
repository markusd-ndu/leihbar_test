"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import GegenstandKarte from "@/components/GegenstandKarte";
import type { Gegenstand } from "@/data/gegenstaende";

type Props = {
  gegenstaende: Gegenstand[];
};

// Beim Filterwechsel kommt vom Server eine neue Liste: Karten, die wegfallen, blenden aus,
// die übrigen gleiten an ihren neuen Platz. Die Liste hängt nur an den Props – bei schnellen
// Klicks gewinnt also immer die zuletzt geladene.
export default function GegenstandListe({ gegenstaende }: Props) {
  // „Bewegung reduzieren“: MotionConfig stoppt Bewegung, aber nicht das Ausblenden – hier ganz ohne.
  const reduziert = useReducedMotion();
  const dauer = reduziert ? 0 : 0.3;

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
          >
            <GegenstandKarte gegenstand={gegenstand} vorladen={index === 0} />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
