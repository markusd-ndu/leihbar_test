import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex min-h-11 items-center gap-2 font-semibold">
          <span className="inline-block h-3 w-3 rounded-full bg-accent" />
          Leihbar
        </Link>
        <nav aria-label="Hauptnavigation" className="flex items-center gap-4 text-sm text-muted">
          {/* Am Handy ist kein Platz: Das Logo führt ebenfalls zur Liste. */}
          <Link href="/#gegenstaende" className="hidden min-h-11 items-center hover:text-foreground sm:flex">
            Gegenstände
          </Link>
          <Link href="/anbieten" className="flex min-h-11 items-center hover:text-foreground">
            Anbieten
          </Link>
          <span className="whitespace-nowrap rounded-full border border-border px-3 py-1 text-xs">
            Anmelden · Tag 2
          </span>
        </nav>
      </div>
    </header>
  );
}
