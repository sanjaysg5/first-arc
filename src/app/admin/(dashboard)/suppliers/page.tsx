import { listSuppliers } from "@/lib/db/admin-queries";
import {
  labelsFor,
  labelFor,
  systemOptions,
  licensingInterestOptions,
  supplierStatuses,
} from "@/lib/constants";
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

export default async function AdminSuppliersPage() {
  const suppliers = await listSuppliers();

  return (
    <div>
      <AdminPageHeader
        title="Supplier leads"
        subtitle="Companies exploring licensing operational data."
        count={suppliers.length}
      />

      {suppliers.length === 0 ? (
        <EmptyState>No supplier leads yet.</EmptyState>
      ) : (
        <TableWrap>
          <thead>
            <tr>
              <TH>Company</TH>
              <TH>Industry</TH>
              <TH>Systems</TH>
              <TH>Interest</TH>
              <TH>Status</TH>
              <TH>Created</TH>
              <TH>Notes</TH>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((s) => (
              <tr key={s.id}>
                <TD>
                  <p className="font-medium text-ink">{s.company}</p>
                  <p className="text-xs text-graphite">{s.contact_name}</p>
                  <a
                    href={`mailto:${s.email}`}
                    className="text-xs text-accent hover:underline"
                  >
                    {s.email}
                  </a>
                </TD>
                <TD className="text-graphite">{s.industry ?? "—"}</TD>
                <TD className="max-w-[240px] text-graphite">
                  {truncate(labelsFor(systemOptions, s.systems), 60)}
                </TD>
                <TD className="whitespace-nowrap capitalize text-graphite">
                  {labelFor(licensingInterestOptions, s.licensing_interest)}
                </TD>
                <TD>
                  <StatusSelect
                    entity="suppliers"
                    id={s.id}
                    value={s.status}
                    statuses={supplierStatuses}
                  />
                </TD>
                <TD className="whitespace-nowrap text-graphite">
                  {formatDate(s.created_at)}
                </TD>
                <TD>
                  <NotesCell entity="suppliers" id={s.id} notes={s.notes} />
                </TD>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      )}
    </div>
  );
}
