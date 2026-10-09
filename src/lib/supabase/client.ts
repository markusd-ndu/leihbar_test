import { createBrowserClient } from "@supabase/ssr";

// Für den Browser. createBrowserClient liefert bei jedem Aufruf denselben Client.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
