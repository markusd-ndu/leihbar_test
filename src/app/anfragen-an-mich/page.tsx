import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AnfrageZeile } from "@/components/ErhalteneAnfragen";
import { ladeOffeneAnfragenAnMich } from "@/lib/anfragen";
import { ladeNutzer } from "@/lib/auth";

export const metadata: Metadata = { title: "Anfragen an mich" };

export default async function AnfragenAnMich() {
  // Der Proxy leitet schon um; diese Prüfung ist die zweite Absicherung.
  const nutzer = await ladeNutzer();
  if (!nutzer) redirect("/anmelden?weiter=/anfragen-an-mich");

  const anfragen = await ladeOffeneAnfragenAnMich(nutzer);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
      <h1 className="mb-2 text-3xl font-bold leading-tight">Anfragen an mich</h1>
      {anfragen.length > 0 ? (
        <>
          <p className="mb-6 text-muted">
            Diese Anfragen auf deine Gegenstände warten auf deine Antwort. Beantwortete findest du auf der Seite des
            Gegenstands.
          </p>
          <ul className="divide-y divide-border rounded-2xl border border-border bg-card px-4 py-3">
            {anfragen.map((anfrage) => (
              <AnfrageZeile
                key={anfrage.id}
                gegenstandId={anfrage.gegenstand.id}
                anfrage={anfrage}
                titel={anfrage.gegenstand.titel}
              />
            ))}
          </ul>
        </>
      ) : (
        <p className="mt-4 rounded-2xl border border-dashed border-border bg-card p-8 text-center text-muted">
          Gerade wartet keine Anfrage auf deine Antwort.{" "}
          <Link href="/anbieten" className="font-medium text-foreground underline">
            Biete noch etwas an
          </Link>
        </p>
      )}
    </main>
  );
}
