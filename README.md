# Leihbar — NDU Coding 2026

Dein Startpunkt für den Kurs **„Programmieren mit AI“** (MSc Management by Innovation, NDU).
Du musst **nichts installieren.** Alles läuft im Browser.
Lokal auf dem eigenen Laptop arbeiten statt im Codespace (ab Tag 2): Anleitung unter [Setup → Lokal](https://ndu.datamonkeys.ai/setup#lokal).

## In 5 Schritten zur laufenden App

1. **Eigenes Repo anlegen:** oben rechts auf **„Use this template“ → „Create a new repository“**. Name: `leihbar`, Owner: dein GitHub-Account, Public. → „Create repository“.
2. **Codespace starten:** in deinem neuen Repo auf den grünen Button **„Code“ → Tab „Codespaces“ → „Create codespace on main“**. Das dauert beim ersten Mal 2–4 Minuten. Du landest in VS Code im Browser.
3. **Claude Code anmelden:** unten im **Terminal** eintippen:
   ```
   claude
   ```
   Es erscheint ein Link → anklicken → mit deinem Claude-Account (Claude Pro) anmelden → Code zurück ins Terminal kopieren. Das machst du nur einmal.
4. **App starten:** in Claude Code eintippen (ja, auf Deutsch, in ganzen Sätzen):
   > Starte die App und sag mir, wie ich sie im Browser öffne.

   Oder klassisch in einem zweiten Terminal: `npm run dev` – rechts öffnet sich automatisch eine Vorschau (Port 3000).
5. **Erste Frage stellen:**
   > /ndu-explain

   Claude erklärt dir, was in diesem Projekt steckt – ohne Code.

## Was ist hier drin?

| Ordner / Datei | Was es ist |
|---|---|
| `src/app/` | Die Seiten der App (eine Mappe = eine URL) |
| `src/components/` | Wiederverwendbare UI-Bausteine |
| `src/data/gegenstaende.ts` | Beispiel-Gegenstände, bis die Datenbank kommt (Tag 2); Bilder in `public/gegenstaende/` |
| `docs/PRODUKT-VORLAGE.md` | Vorlage für deinen Produkt-Brief (eine Seite, lebt mit dem Produkt) |
| `docs/BACKLOG.md` | Issues mit Akzeptanzkriterien – deine Arbeitsliste |
| `docs/HILFE-ANFRAGE.md` | So holst du dir Hilfe in Teams |
| `CLAUDE.md` | Die Spielregeln für Claude in diesem Projekt (lies sie – sie sind auch deine) |
| `.claude/commands/` | Eigene Befehle: `/ndu-idee`, `/ndu-brainstorm`, `/ndu-explain`, `/ndu-check`, `/ndu-commit`, `/ndu-beratung` |
| `.devcontainer/` | Das Rezept für deine Codespace-Umgebung (nicht anfassen) |

## Die wichtigsten Befehle

Diese Befehle sind **nicht in Claude Code eingebaut** – sie gehören zu diesem Kurs-Template (Dateien in `.claude/commands/`), deshalb beginnen sie mit `ndu-`. Eingebaute Befehle wie `/clear`, `/compact` oder `/mcp` haben kein Präfix.

| Befehl | Wann |
|---|---|
| `/ndu-idee` | Du startest ein neues Produkt: kurzes Interview, dann schreibt Claude den Produkt-Brief |
| `/ndu-brainstorm` | Nach dem Brief: Claude schlägt Funktionen vor – auch solche, an die du nicht gedacht hast –, du entscheidest MVP / Später / Nein, dann schreibt Claude den Backlog |
| `/ndu-explain` | Du willst verstehen, was gerade im Projekt passiert |
| `/ndu-check` | Du willst wissen, ob alles läuft und nichts Geheimes im Code steckt |
| `/ndu-commit` | Du hast etwas fertig und willst es sichern (Git = Undo-Knopf) |
| `/ndu-beratung` | Du planst etwas Größeres, Claude dreht sich im Kreis oder du willst vor einem PR eine Zweitmeinung: Ein stärkeres Modell (Opus) schaut in einem eigenen Subagenten drauf |

Claude arbeitet in diesem Projekt mit **Sonnet** – das schont dein Pro-Kontingent. Wie viel davon verbraucht ist, zeigt `/usage`.

## Wenn etwas nicht geht

1. Fehlermeldung komplett kopieren → Claude geben: *„Erkläre mir zuerst in einfachen Worten, was passiert ist.“*
2. `/clear` und das Problem kleiner formulieren.
3. `docs/HILFE-ANFRAGE.md` lesen und in Teams posten.

## Nach dem Kurstag

Codespace **stoppen** (GitHub → Codespaces → „…“ → Stop), sonst läuft dein Freikontingent weiter. Deine Arbeit ist sicher, solange du gepusht hast (`/ndu-commit`).

---
Kurs-Website mit allen Konzepten, Prompts und Checklisten: *(Link folgt)*
