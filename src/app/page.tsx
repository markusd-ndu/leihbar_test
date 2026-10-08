import { Hand, Recycle, Search } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import { gegenstaende } from "@/data/gegenstaende";

export default function Home() {
  const anzahl = gegenstaende.length;

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-12 sm:block">
      <section className="mb-14">
        <p className="mb-3 inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-foreground">
          NDU · Wintersemester 2026
        </p>
        <h1 className="mb-4 max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
          Leihen statt kaufen.
        </h1>
        <p className="mb-8 max-w-xl text-lg text-muted">
          Abendkleid für den Ball, Akkuschrauber fürs WG-Regal, Zelt fürs
          Festival – am Campus hat es schon jemand. Anbieten, finden, anfragen.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="#gegenstaende"
            className="rounded-xl bg-accent px-5 py-3 font-medium text-white shadow-sm transition hover:opacity-90"
          >
            Gegenstände ansehen
          </a>
          <span className="rounded-xl border border-border px-5 py-3 text-muted">
            Anbieten – kommt an Tag 2
          </span>
        </div>
      </section>

      <section aria-label="Was Leihbar kann" className="order-last mb-14 grid gap-4 sm:order-none sm:grid-cols-3">
        <FeatureCard
          icon={Search}
          titel="Alles an einem Ort"
          text="Was andere am Campus verleihen – von Mode über Möbel bis Technik, ohne Herumfragen in Chats."
        />
        <FeatureCard
          icon={Hand}
          titel="Mit einem Klick anfragen"
          text="Besitzer*innen sehen sofort, wer etwas ausleihen möchte. Kein Hin und Her mehr."
        />
        <FeatureCard
          icon={Recycle}
          titel="Leihen statt kaufen"
          text="Für einmal kaufen lohnt sich selten. Leihen spart Geld und Platz in der WG."
        />
      </section>

      <section
        id="gegenstaende"
        className="rounded-2xl border border-dashed border-border bg-card p-8 text-center"
      >
        <h2 className="mb-2 text-xl font-semibold">Hier kommt die Liste hin</h2>
        <p className="mx-auto max-w-md text-sm text-muted">
          In <code className="rounded bg-accent-soft px-1">src/data/gegenstaende.ts</code>{" "}
          warten bereits {anzahl} Beispiel-Gegenstände. Dein erstes Issue (Issue 1
          im Backlog) bringt sie auf diese Seite.
        </p>
      </section>
    </main>
  );
}
