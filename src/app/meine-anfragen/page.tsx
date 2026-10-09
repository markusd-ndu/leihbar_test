import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ladeNutzer } from "@/lib/auth";

export const metadata: Metadata = { title: "Meine Anfragen" };

export default async function MeineAnfragen() {
  // Der Proxy leitet schon um; diese Prüfung ist die zweite Absicherung.
  if (!(await ladeNutzer())) redirect("/anmelden?weiter=/meine-anfragen");

  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-4 py-6">
      <h1 className="mb-2 text-3xl font-bold leading-tight">Meine Anfragen</h1>
      <p className="mb-4 text-muted">Hier siehst du bald alle Gegenstände, die du angefragt hast.</p>
      <Link href="/#gegenstaende" className="inline-flex min-h-11 items-center font-medium underline underline-offset-4">
        Zur Liste
      </Link>
    </main>
  );
}
