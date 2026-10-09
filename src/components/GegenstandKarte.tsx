import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ImageOff, MapPin, User } from "lucide-react";
import type { Gegenstand } from "@/data/gegenstaende";
import { preisText } from "@/lib/format";

type Props = {
  gegenstand: Gegenstand;
  /** Nur für das erste sichtbare Bild: lädt es sofort statt erst beim Scrollen. */
  vorladen?: boolean;
  /** Auf Seiten ohne Zwischenüberschrift folgt die Karte direkt auf das `<h1>`. */
  ueberschrift?: "h2" | "h3";
  /** Zusätzliche Zeile unten in der Karte, z. B. der Status einer Anfrage. */
  zusatz?: ReactNode;
};

export default function GegenstandKarte({ gegenstand, vorladen = false, ueberschrift: Titel = "h3", zusatz }: Props) {
  return (
    // relative + after:inset-0 am Link: die ganze Karte ist anklickbar, vorgelesen wird nur der Titel.
    <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:shadow-md has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-accent">
      <div className="relative aspect-[4/3] bg-accent-soft">
        {gegenstand.bild ? (
          <Image
            src={gegenstand.bild}
            alt=""
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
            preload={vorladen}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted">
            <ImageOff size={40} aria-hidden />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-sm text-muted">{gegenstand.kategorie}</p>
        <Titel className="font-semibold leading-snug">
          <Link
            href={`/gegenstaende/${gegenstand.id}`}
            className="outline-none after:absolute after:inset-0 after:content-['']"
          >
            {gegenstand.titel}
          </Link>
        </Titel>
        <p className="font-medium">{preisText(gegenstand.preisProTag)}</p>
        <dl className="mt-auto space-y-1 pt-2 text-sm text-muted">
          <div className="flex items-start gap-2">
            <dt>
              <MapPin size={16} className="mt-0.5 shrink-0" />
              <span className="sr-only">Ort:</span>
            </dt>
            <dd>{gegenstand.ort}</dd>
          </div>
          <div className="flex items-start gap-2">
            <dt>
              <User size={16} className="mt-0.5 shrink-0" />
              <span className="sr-only">Verleiht:</span>
            </dt>
            <dd>{gegenstand.besitzer}</dd>
          </div>
        </dl>
        {zusatz}
      </div>
    </article>
  );
}
