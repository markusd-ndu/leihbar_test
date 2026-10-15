"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { kategorien, type Kategorie } from "@/data/gegenstaende";

type Props = {
  aktiv: Kategorie | null; // null = „Alle“
};

// Der Filter steckt in der Adresse (/?kategorie=Mode): teilbar, und „Zurück“ im Browser funktioniert.
export default function KategorieFilter({ aktiv }: Props) {
  // „Bewegung reduzieren“: die Markierung springt dann direkt zum neuen Filter.
  const reduziert = useReducedMotion();
  const optionen: { name: string; kategorie: Kategorie | null }[] = [
    { name: "Alle", kategorie: null },
    ...kategorien.map((k) => ({ name: k, kategorie: k })),
  ];

  return (
    <nav aria-label="Nach Kategorie filtern" className="mb-6">
      <ul className="flex flex-wrap gap-2">
        {optionen.map(({ name, kategorie }) => {
          const istAktiv = kategorie === aktiv;
          return (
            <li key={name}>
              <Link
                href={kategorie ? { pathname: "/", query: { kategorie } } : "/"}
                scroll={false}
                aria-current={istAktiv ? "true" : undefined}
                className={`relative flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition ${
                  istAktiv
                    ? "border-accent text-white"
                    : "border-border bg-card text-foreground hover:border-foreground"
                }`}
              >
                {istAktiv && (
                  // Die Markierung gehört nicht zu einem Filter, sondern wandert zwischen ihnen.
                  <motion.span
                    layoutId="filter-markierung"
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ duration: reduziert ? 0 : 0.3, ease: "easeOut" }}
                  />
                )}
                <span className="relative">{name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
