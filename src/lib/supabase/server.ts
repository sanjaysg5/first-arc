import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/lib/db/types";
import { publicEnv } from "@/lib/env";

/**
 * Supabase client for server components / route handlers / server actions.
 * Uses the anon key and the request's cookies, so it operates as the
 * signed-in user (or anonymous) and is subject to Row Level Security.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    publicEnv.supabaseUrl(),
    publicEnv.supabaseAnonKey(),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Called from a Server Component render pass; cookie writes are
            // applied by middleware instead. Safe to ignore.
          }
        },
      },
    },
  );
}
