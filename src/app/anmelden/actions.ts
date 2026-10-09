"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sicheresZiel } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export type AnmeldeZustand = {
  /** Eine Meldung pro Feld, als ganzer Satz. */
  fehler: Partial<Record<"email" | "passwort" | "allgemein", string>>;
  /** Nur die E-Mail kommt zurück ins Formular – das Passwort nie. */
  email: string;
  /** Hinweis, wenn Supabase erst eine Bestätigung per E-Mail verlangt. */
  hinweis?: string;
};

const text = (formData: FormData, name: string) => {
  const wert = formData.get(name);
  return typeof wert === "string" ? wert.trim() : "";
};

function pruefe(email: string, passwort: string): AnmeldeZustand["fehler"] {
  const fehler: AnmeldeZustand["fehler"] = {};
  if (email === "") fehler.email = "Bitte gib deine E-Mail-Adresse ein.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fehler.email = "Bitte gib eine gültige E-Mail-Adresse ein.";
  if (passwort === "") fehler.passwort = "Bitte gib dein Passwort ein.";
  return fehler;
}

export async function anmelden(_vorher: AnmeldeZustand, formData: FormData): Promise<AnmeldeZustand> {
  const email = text(formData, "email");
  const passwort = typeof formData.get("passwort") === "string" ? (formData.get("passwort") as string) : "";
  const fehler = pruefe(email, passwort);
  if (Object.keys(fehler).length > 0) return { fehler, email };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password: passwort });
  if (error) {
    if (error.code === "invalid_credentials")
      return { fehler: { allgemein: "E-Mail oder Passwort stimmt nicht. Bitte versuch es noch einmal." }, email };
    if (error.code === "email_not_confirmed")
      return { fehler: { allgemein: "Deine E-Mail-Adresse ist noch nicht bestätigt." }, email };
    return { fehler: { allgemein: "Die Anmeldung hat leider nicht geklappt. Bitte versuch es gleich noch einmal." }, email };
  }

  revalidatePath("/", "layout");
  redirect(sicheresZiel(text(formData, "weiter")));
}

export async function registrieren(_vorher: AnmeldeZustand, formData: FormData): Promise<AnmeldeZustand> {
  const email = text(formData, "email");
  const passwort = typeof formData.get("passwort") === "string" ? (formData.get("passwort") as string) : "";
  const fehler = pruefe(email, passwort);
  if (!fehler.passwort && passwort.length < 8) fehler.passwort = "Das Passwort braucht mindestens 8 Zeichen.";
  if (Object.keys(fehler).length > 0) return { fehler, email };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({ email, password: passwort });
  if (error) {
    if (error.code === "user_already_exists" || error.code === "email_exists")
      return { fehler: { email: "Für diese E-Mail-Adresse gibt es schon ein Konto. Melde dich stattdessen an." }, email };
    if (error.code === "weak_password")
      return { fehler: { passwort: "Dieses Passwort ist zu schwach. Nimm ein längeres mit Zahlen oder Zeichen." }, email };
    return { fehler: { allgemein: "Die Registrierung hat leider nicht geklappt. Bitte versuch es gleich noch einmal." }, email };
  }

  // Ist in Supabase die E-Mail-Bestätigung an, gibt es noch keine Sitzung.
  if (!data.session) {
    return {
      fehler: {},
      email,
      hinweis: "Dein Konto ist angelegt. Bitte bestätige zuerst den Link in der E-Mail, die wir dir geschickt haben.",
    };
  }

  revalidatePath("/", "layout");
  redirect(sicheresZiel(text(formData, "weiter")));
}

export async function abmelden() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
