import Link from "next/link";
import { StatCard } from "@/components/admin/stat-card";
import { Badge, statusTone } from "@/components/ui/badge";
import {
  getOverviewStats,
  listBuyers,
  listSuppliers,
} from "@/lib/db/admin-queries";
import { labelFor, budgetOptions } from "@/lib/constants";
import { formatDate, truncate } from "@/lib/format";

export default async function AdminOverviewPage() {
  const [stats, buyers, suppliers] = await Promise.all([
    getOverviewStats(),
    listBuyers(),
    listSuppliers(),
  ]);

  return (
    <div>
      <h1 className="display text-3xl">Overview</h1>
      <p className="lede mt-2 text-sm">
        Demand and supply captured through the site.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
        <StatCard label="Buyer requests" value={stats.buyers} />
        <StatCard label="Supplier leads" value={stats.suppliers} />
        <StatCard label="Potential datasets" value={stats.assets} />
        <StatCard label="Active matches" value={stats.matches} />
        <StatCard label="Pilots" value={stats.pilots} />
        <StatCard
          label="High-priority buyers"
          value={stats.highPriority}
          hint="Budget ≥ $100K"
          accent
        />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <RecentPanel
          title="Latest buyer requests"
          href="/admin/buyers"
          empty="No buyer requests yet."
          rows={buyers.slice(0, 5).map((b) => ({
            id: b.id,
            primary: b.company,
            secondary: truncate(b.description, 52),
            meta: labelFor(budgetOptions, b.budget_range),
            status: b.status,
            date: b.created_at,
          }))}
        />
        <RecentPanel
          title="Latest supplier leads"
          href="/admin/suppliers"
          empty="No supplier leads yet."
          rows={suppliers.slice(0, 5).map((s) => ({
            id: s.id,
            primary: s.company,
            secondary: s.industry ?? "—",
            meta: s.licensing_interest ?? "—",
            status: s.status,
            date: s.created_at,
          }))}
        />
      </div>
    </div>
  );
}

function RecentPanel({
  title,
  href,
  empty,
  rows,
}: {
  title: string;
  href: string;
  empty: string;
  rows: {
    id: string;
    primary: string;
    secondary: string;
    meta: string;
    status: string;
    date: string;
  }[];
}) {
  return (
    <div className="rounded-2xl border border-line bg-card p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-medium text-ink">{title}</h2>
        <Link href={href} className="text-xs text-accent hover:underline">
          View all →
        </Link>
      </div>
      {rows.length === 0 ? (
        <p className="mt-6 text-sm text-graphite">{empty}</p>
      ) : (
        <ul className="mt-4 divide-y divide-line">
          {rows.map((r) => (
            <li key={r.id} className="flex items-center justify-between gap-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink">
                  {r.primary}
                </p>
                <p className="truncate text-xs text-graphite">{r.secondary}</p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="text-xs text-graphite">{r.meta}</span>
                <Badge tone={statusTone(r.status)}>
                  {r.status.replace(/_/g, " ")}
                </Badge>
                <span className="hidden text-xs text-graphite-dim sm:block">
                  {formatDate(r.date)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
