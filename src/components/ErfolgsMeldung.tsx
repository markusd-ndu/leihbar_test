"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";

/** Wie lange die Meldung stehen bleibt. */
const ANZEIGE_MS = 5000;

/** Nimmt `?neu=…` aus der Adresse, ohne die Seite neu zu laden – so ist nach einem Reload alles weg. */
export function entferneNeuAusAdresse() {
  const adresse = new URL(window.location.href);
  if (!adresse.searchParams.has("neu")) return;
  adresse.searchParams.delete("neu");
  window.history.replaceState(window.history.state, "", adresse);
}

type Props = {
  /** Nur gesetzt, wenn man gerade etwas angeboten hat. */
  sichtbar: boolean;
};

/** Meldung mit Häkchen nach dem Anbieten; verschwindet nach ein paar Sekunden von selbst. */
export default function ErfolgsMeldung({ sichtbar }: Props) {
  const [offen, setOffen] = useState(sichtbar);
  // „Bewegung reduzieren“: MotionConfig stoppt Bewegung, aber nicht das Ein- und Ausblenden – hier ganz ohne.
  const reduziert = useReducedMotion();

  useEffect(() => {
    if (!sichtbar) return;
    entferneNeuAusAdresse();
    const timer = setTimeout(() => setOffen(false), ANZEIGE_MS);
    return () => clearTimeout(timer);
  }, [sichtbar]);

  return (
    <AnimatePresence>
      {offen && (
        <motion.div
          role="status"
          className="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-md items-center gap-3 border-2 border-foreground bg-signal px-4 py-3 font-medium shadow-md"
          initial={{ opacity: 0, y: reduziert ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduziert ? 0 : 0.3, ease: "easeOut" }}
        >
          <Check size={20} aria-hidden className="shrink-0" />
          Geschafft: Dein Gegenstand ist jetzt online.
        </motion.div>
      )}
    </AnimatePresence>
  );
}
