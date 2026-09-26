import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/db/types";
import { publicEnv, serverEnv } from "@/lib/env";

/**
 * Service-role Supabase client — bypasses RLS. SERVER ONLY.
 * The `server-only` import makes bundling this into client code a build error.
 * Use exclusively behind authenticated admin checks or trusted server actions.
 */
export function createAdminClient() {
  return createClient<Database>(
    publicEnv.supabaseUrl(),
    serverEnv.supabaseServiceRoleKey(),
    {
      auth: { persistSession: false, autoRefreshToken: false },
    },
  );
}
