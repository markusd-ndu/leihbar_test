# Entscheidungen

> Hier hält Claude fest, was im Projekt festgelegt wurde, damit es in späteren Sessions noch gilt.
> Format: Datum — Entscheidung — Grund

- 2026-10-08 — Stack: Next.js + Tailwind + Supabase + Vercel — Kursvorgabe
- 2026-10-08 — Sprache der Oberfläche: Deutsch — Zielgruppe NDU-Studierende
- 2026-10-09 — Tabelle `items` in Supabase: jeder darf lesen und anlegen, niemand ändern oder löschen; `owner_id` bleibt bis Issue 5 leer (die Regel erzwingt das) — Issue 4
- 2026-10-09 — Bilder der Startdaten bleiben in `public/gegenstaende/`, `bild_url` speichert nur den Pfad; neue Gegenstände haben kein Bild (Platzhalter) — Bild-Upload ist nicht im Umfang
- 2026-10-09 — Eingaben werden auf dem Server geprüft (ganze deutsche Sätze) und zusätzlich von der Datenbank (Titel nicht leer, Preis nicht negativ) — Doppelte Absicherung
