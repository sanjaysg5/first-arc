import { createAdminClient } from "@/lib/supabase/admin";
import { serverEnv, publicEnv } from "@/lib/env";
import { listContactMessages } from "@/lib/db/admin-queries";
import { formatDate, truncate } from "@/lib/format";
import { labelFor, contactTypeOptions } from "@/lib/constants";
import { AdminPageHeader, TableWrap, TH, TD, EmptyState } from "@/components/admin/table";
import { Badge } from "@/components/ui/badge";

export default async function AdminSettingsPage() {
  const admin = createAdminClient();
  const [{ data: admins }, messages] = await Promise.all([
    admin.from("admin_users").select("*").order("created_at", { ascending: true }),
    listContactMessages(),
  ]);

  const resendConfigured = Boolean(serverEnv.resendApiKey());
  const allowlistCount = serverEnv.adminEmails().length;

  return (
    <div className="space-y-10">
      <AdminPageHeader title="Settings" subtitle="Configuration and inbound messages." />

      <section className="grid gap-4 sm:grid-cols-3">
        <ConfigCard label="Site URL" value={publicEnv.siteUrl()} ok />
        <ConfigCard
          label="Email (Resend)"
          value={resendConfigured ? "Configured" : "Not configured"}
          ok={resendConfigured}
        />
        <ConfigCard
          label="Admin allowlist"
          value={`${allowlistCount} email${allowlistCount === 1 ? "" : "s"} + table`}
          ok
        />
      </section>

      <section>
        <h2 className="mb-4 font-medium text-ink">Admin users</h2>
        {admins && admins.length > 0 ? (
          <TableWrap>
            <thead>
              <tr>
                <TH>Email</TH>
                <TH>Role</TH>
                <TH>Added</TH>
              </tr>
            </thead>
            <tbody>
              {admins.map((a) => (
                <tr key={a.id}>
                  <TD className="font-medium text-ink">{a.email}</TD>
                  <TD className="capitalize text-graphite">{a.role ?? "admin"}</TD>
                  <TD className="text-graphite">{formatDate(a.created_at)}</TD>
                </tr>
              ))}
            </tbody>
          </TableWrap>
        ) : (
          <EmptyState>
            No admin_users rows. Add your email to ADMIN_EMAILS or the
            admin_users table to authorize access.
          </EmptyState>
        )}
      </section>

      <section>
        <h2 className="mb-4 font-medium text-ink">
          Contact messages{" "}
          <span className="numeral text-sm text-graphite">{messages.length}</span>
        </h2>
        {messages.length === 0 ? (
          <EmptyState>No contact messages yet.</EmptyState>
        ) : (
          <TableWrap>
            <thead>
              <tr>
                <TH>From</TH>
                <TH>Type</TH>
                <TH>Message</TH>
                <TH>Received</TH>
              </tr>
            </thead>
            <tbody>
              {messages.map((m) => (
                <tr key={m.id}>
                  <TD>
                    <p className="font-medium text-ink">{m.name}</p>
                    <a href={`mailto:${m.email}`} className="text-xs text-accent hover:underline">
                      {m.email}
                    </a>
                  </TD>
                  <TD>
                    <Badge tone="neutral">
                      {labelFor(contactTypeOptions, m.type)}
                    </Badge>
                  </TD>
                  <TD className="max-w-[360px] text-graphite">
                    {truncate(m.message, 140)}
                  </TD>
                  <TD className="whitespace-nowrap text-graphite">
                    {formatDate(m.created_at)}
                  </TD>
                </tr>
              ))}
            </tbody>
          </TableWrap>
        )}
      </section>
    </div>
  );
}

function ConfigCard({
  label,
  value,
  ok,
}: {
  label: string;
  value: string;
  ok?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-line bg-card p-5">
      <p className="eyebrow eyebrow-muted">{label}</p>
      <div className="mt-3 flex items-center gap-2">
        <span
          className={`h-2 w-2 rounded-full ${ok ? "bg-green-500" : "bg-amber-500"}`}
        />
        <span className="truncate text-sm text-ink">{value}</span>
      </div>
    </div>
  );
}
