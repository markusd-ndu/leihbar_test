import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, User } from "lucide-react";
import { gegenstaende } from "@/data/gegenstaende";
import { preisText } from "@/lib/format";

function finde(id: string) {
  return gegenstaende.find((g) => g.id === id);
}

export function generateStaticParams() {
  return gegenstaende.map((g) => ({ id: g.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/gegenstaende/[id]">): Promise<Metadata> {
  const { id } = await params;
  return { title: finde(id)?.titel ?? "Nicht gefunden" };
}

export default async function GegenstandSeite({ params }: PageProps<"/gegenstaende/[id]">) {
  const { id } = await params;
  const gegenstand = finde(id);
  if (!gegenstand) notFound();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
      <Link
        href="/#gegenstaende"
        className="mb-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted hover:text-foreground"
      >
        <ArrowLeft size={18} />
        Zurück zur Liste
      </Link>

      <article>
        <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-2xl bg-accent-soft">
          <Image
            src={gegenstand.bild}
            alt={gegenstand.titel}
            fill
            sizes="(min-width: 768px) 720px, 100vw"
            className="object-cover"
            preload
          />
        </div>

        <p className="mb-1 text-sm text-muted">{gegenstand.kategorie}</p>
        <h1 className="mb-2 text-3xl font-bold leading-tight">{gegenstand.titel}</h1>
        <p className="mb-4 text-xl font-semibold">{preisText(gegenstand.preisProTag)}</p>

        {!gegenstand.verfuegbar && (
          <p className="mb-4 rounded-xl border border-border bg-card px-4 py-3 text-sm">
            Dieser Gegenstand ist gerade verliehen.
          </p>
        )}

        <p className="mb-6 leading-relaxed">{gegenstand.beschreibung}</p>

        <dl className="space-y-2 rounded-2xl border border-border bg-card p-4">
          <div className="flex items-start gap-2">
            <dt className="flex items-center gap-2 text-muted">
              <MapPin size={18} />
              Ort:
            </dt>
            <dd>{gegenstand.ort}</dd>
          </div>
          <div className="flex items-start gap-2">
            <dt className="flex items-center gap-2 text-muted">
              <User size={18} />
              Verleiht:
            </dt>
            <dd>{gegenstand.besitzer}</dd>
          </div>
        </dl>
      </article>
    </main>
  );
}
