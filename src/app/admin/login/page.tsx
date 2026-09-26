import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArcMark } from "@/components/arc/arc-mark";
import { Button } from "@/components/ui/button";
import { AdminLoginForm } from "./login-form";
import { getSessionUser, isAuthorizedAdmin } from "@/lib/admin/auth";
import { isSupabaseConfigured } from "@/lib/env";
import { signOutAdmin } from "@/app/admin/actions";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ forbidden?: string }>;
}) {
  const { forbidden } = await searchParams;
  const configured = isSupabaseConfigured();

  if (configured) {
    const user = await getSessionUser();
    if (user && (await isAuthorizedAdmin(user.email))) redirect("/admin");
  }

  return (
    <div className="grid min-h-screen place-items-center bg-paper px-6 py-16">
      <div className="w-full max-w-sm">
        <Link href="/" className="inline-flex items-center gap-2 text-ink">
          <ArcMark className="h-7 w-7" />
          <span className="font-medium tracking-[-0.02em]">First Arc</span>
        </Link>

        <h1 className="display mt-8 text-3xl">Admin</h1>
        <p className="lede mt-2 text-sm">
          Internal demand &amp; supply workspace.
        </p>

        <div className="mt-8 rounded-2xl border border-line bg-card p-6 md:p-8">
          {!configured ? (
            <div className="text-sm text-graphite">
              <p className="font-medium text-ink">Supabase not configured</p>
              <p className="mt-2">
                Add your Supabase environment variables (see{" "}
                <code className="rounded bg-paper-dim px-1">.env.example</code>)
                and restart the server to enable admin sign-in.
              </p>
            </div>
          ) : forbidden ? (
            <div className="space-y-4 text-sm text-graphite">
              <p className="font-medium text-ink">Not authorized</p>
              <p>
                This account is signed in but is not on the admin allowlist. Add
                its email to <code className="rounded bg-paper-dim px-1">ADMIN_EMAILS</code>{" "}
                or the <code className="rounded bg-paper-dim px-1">admin_users</code>{" "}
                table.
              </p>
              <form action={signOutAdmin}>
                <Button type="submit" variant="outline" className="w-full">
                  Sign out
                </Button>
              </form>
            </div>
          ) : (
            <AdminLoginForm />
          )}
        </div>

        <Link
          href="/"
          className="mt-6 inline-block text-sm text-graphite hover:text-accent"
        >
          ← Back to site
        </Link>
      </div>
    </div>
  );
}
