import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/lib/db/types";
import { publicEnv } from "@/lib/env";

/** Supabase client for client components (anon key, subject to RLS). */
export function createClient() {
  return createBrowserClient<Database>(
    publicEnv.supabaseUrl(),
    publicEnv.supabaseAnonKey(),
  );
}
