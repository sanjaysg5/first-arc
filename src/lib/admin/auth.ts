import "server-only";
import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { serverEnv, isSupabaseConfigured } from "@/lib/env";

/** The authenticated Supabase user, or null. */
export async function getSessionUser(): Promise<User | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/**
 * Authorization (deny by default): an authenticated user is an admin only if
 * their email is in ADMIN_EMAILS or the admin_users table.
 */
export async function isAuthorizedAdmin(
  email: string | null | undefined,
): Promise<boolean> {
  if (!email) return false;
  const e = email.toLowerCase();
  if (serverEnv.adminEmails().includes(e)) return true;
  try {
    const admin = createAdminClient();
    const { data } = await admin
      .from("admin_users")
      .select("email")
      .eq("email", e)
      .limit(1);
    return Boolean(data && data.length > 0);
  } catch {
    return false;
  }
}

/** Gate for admin server components / actions. Redirects if not authorized. */
export async function requireAdmin(): Promise<User> {
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");
  const ok = await isAuthorizedAdmin(user.email);
  if (!ok) redirect("/admin/login?forbidden=1");
  return user;
}
