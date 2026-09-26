/**
 * Typed, lazy environment access. Values are read at call time (not import
 * time) so public pages render even before secrets are configured. Server-only
 * secrets must never be imported into client components.
 */

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. See .env.example.`,
    );
  }
  return value;
}

function optional(name: string): string | undefined {
  return process.env[name] || undefined;
}

export const publicEnv = {
  siteUrl: () => process.env.NEXT_PUBLIC_SITE_URL ?? "https://firstarc.ai",
  supabaseUrl: () => required("NEXT_PUBLIC_SUPABASE_URL"),
  supabaseAnonKey: () => required("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
};

export const serverEnv = {
  supabaseServiceRoleKey: () => required("SUPABASE_SERVICE_ROLE_KEY"),
  resendApiKey: () => optional("RESEND_API_KEY"),
  leadNotificationEmail: () =>
    optional("LEAD_NOTIFICATION_EMAIL") ?? "hello@firstarc.ai",
  leadFromEmail: () =>
    optional("LEAD_FROM_EMAIL") ?? "First Arc <hello@firstarc.ai>",
  /** Comma-separated allowlist of admin emails (defense-in-depth with admin_users). */
  adminEmails: () =>
    (process.env.ADMIN_EMAILS ?? "")
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean),
};

/** True when the Supabase public config is present (used to gate form UX). */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
