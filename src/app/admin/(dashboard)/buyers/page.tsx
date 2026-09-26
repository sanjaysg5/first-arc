import { listBuyers } from "@/lib/db/admin-queries";
import { labelFor, budgetOptions, buyerStatuses } from "@/lib/constants";
import { formatDate, truncate } from "@/lib/format";
import {
  TableWrap,
  TH,
  TD,
  AdminPageHeader,
  EmptyState,
} from "@/components/admin/table";
import { StatusSelect } from "@/components/admin/status-select";
import { NotesCell } from "@/components/admin/notes-cell";

export default async function AdminBuyersPage() {
  const buyers = await listBuyers();

  return (
    <div>
      <AdminPageHeader
        title="Buyer requests"
        subtitle="AI teams describing the data they need."
        count={buyers.length}
      />

      {buyers.length === 0 ? (
        <EmptyState>No buyer requests yet.</EmptyState>
      ) : (
        <TableWrap>
          <thead>
            <tr>
              <TH>Company</TH>
              <TH>Need</TH>
              <TH>Industry</TH>
              <TH>Budget</TH>
              <TH>Status</TH>
              <TH>Created</TH>
              <TH>Notes</TH>
            </tr>
          </thead>
          <tbody>
            {buyers.map((b) => (
              <tr key={b.id}>
                <TD>
                  <p className="font-medium text-ink">{b.company}</p>
                  <p className="text-xs text-graphite">{b.name}</p>
                  <a
                    href={`mailto:${b.email}`}
                    className="text-xs text-accent hover:underline"
                  >
                    {b.email}
                  </a>
                </TD>
                <TD className="max-w-[280px] text-graphite">
                  {truncate(b.description, 120)}
                </TD>
                <TD className="text-graphite">{b.industry ?? "—"}</TD>
                <TD className="whitespace-nowrap text-graphite">
                  {labelFor(budgetOptions, b.budget_range)}
                </TD>
                <TD>
                  <StatusSelect
                    entity="buyers"
                    id={b.id}
                    value={b.status}
                    statuses={buyerStatuses}
                  />
                </TD>
                <TD className="whitespace-nowrap text-graphite">
                  {formatDate(b.created_at)}
                </TD>
                <TD>
                  <NotesCell entity="buyers" id={b.id} notes={b.notes} />
                </TD>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      )}
    </div>
  );
}
