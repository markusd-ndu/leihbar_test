---
name: ndu-issue
description: Aus einem Satz wird ein Issue im Backlog – Ziel, Nicht im Umfang, Akzeptanzkriterien, Fertig wenn; danach die Frage nach der Priorität
argument-hint: "[ein Satz, z. B. „Besitzer*innen sollen Anfragen ablehnen können“]"
disable-model-invocation: true
---

Mein Wunsch: $ARGUMENTS

Fehlt der Satz oben: Frag nach dem Wunsch in einem Satz und hör auf, bis ich antworte.

1. **Lesen.** Lies `docs/BACKLOG.md` und, falls vorhanden, `docs/PRODUKT.md`. Gibt es schon ein Issue, das den Wunsch ganz oder größtenteils abdeckt, sag welches (Nummer und Titel) und frag, ob ich trotzdem ein neues will, das bestehende ergänzen möchte oder abbreche. Bestehende Issues änderst du nur, wenn ich es ausdrücklich sage.
2. **Unklar?** Lässt der Satz eine Entscheidung offen, die die Kriterien verändert (wer darf das, was passiert danach), stell höchstens 2 Rückfragen mit je 2–3 Optionen. Sonst formulier direkt.
3. **Formulieren** im Format der Datei, Status ⬜ offen, Nummer = höchste Issue-Nummer im Backlog + 1:
   - Überschrift: `### ⬜ Issue <Nr> — <kurzer Titel>`
   - **Ziel:** ein, zwei Sätze – was danach möglich ist, für wen und warum („damit …“). Keine Satzform „Als … möchte ich …“.
   - **Nicht im Umfang:** was naheliegend wäre, aber nicht dazugehört – damit das Issue klein bleibt.
   - **Akzeptanzkriterien:** 3–5, jedes als „Gegeben … wenn … dann …“ (das „wenn“ darf fehlen, wenn es keine Handlung gibt). Mindestens ein **Negativfall** (falsche Eingabe, fremde Daten, nicht angemeldet …). Jedes Kriterium muss im Browser prüfbar sein; geht es um Zugriffsrechte, nenn die Tabelle und „Row Level Security“ wie in den bestehenden Issues. Steht am Handy etwas Neues auf der Seite, ein Kriterium für 375 px.
   - **Fertig, wenn:** eine Zeile, woran ich es im Browser prüfe.
4. **Anhängen.** Füg das Issue hinter dem letzten Issue ein – vor dem Abschnitt „Später / Ideen“, falls es ihn gibt, sonst ans Ende. Nichts anderes in der Datei ändern.
5. **Abschluss.** Zeig mir das neue Issue so, wie es jetzt im Backlog steht, und frag: „Soll es priorisiert werden – also weiter nach oben, vor ein anderes offenes Issue? Wenn ja, vor welches?“ Nenn dazu die offenen Issues (⬜) mit Nummer und Titel. Verschiebe es erst nach meiner Antwort; die Nummern bleiben dabei, wie sie sind. Bitte mich außerdem, die Kriterien zu lesen und in meinen Worten zu sagen, was ich ändern will – du formulierst es um. Setz das Issue nicht um und führ `/ndu-commit` nicht selbst aus.

Sprache: Deutsch, einfache Worte, Fachbegriffe beim ersten Mal in einem Halbsatz erklären.
