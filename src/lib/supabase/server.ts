import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Pro Anfrage ein neuer Client – nie global speichern.
export async function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase ist nicht eingerichtet: NEXT_PUBLIC_SUPABASE_URL und NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY fehlen in .env.local.",
    );
  }

  const cookieStore = await cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Aus einer Server Component darf man keine Cookies setzen. Das ist okay:
          // Der Proxy (src/proxy.ts) frischt die Sitzung vor jeder Seite auf.
        }
      },
    },
  });
}
