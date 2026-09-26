import { listAssets, listSuppliers } from "@/lib/db/admin-queries";
import { assetStatuses } from "@/lib/constants";
import { truncate } from "@/lib/format";
import {
  TableWrap,
  TH,
  TD,
  AdminPageHeader,
  EmptyState,
} from "@/components/admin/table";
import { StatusSelect } from "@/components/admin/status-select";

export default async function AdminAssetsPage() {
  const [assets, suppliers] = await Promise.all([listAssets(), listSuppliers()]);
  const supplierName = new Map(suppliers.map((s) => [s.id, s.company]));

  return (
    <div>
      <AdminPageHeader
        title="Potential datasets"
        subtitle="Candidate data assets derived from supplier leads."
        count={assets.length}
      />

      {assets.length === 0 ? (
        <EmptyState>
          No data assets yet. Create these manually after qualifying a supplier.
        </EmptyState>
      ) : (
        <TableWrap>
          <thead>
            <tr>
              <TH>Asset</TH>
              <TH>Supplier</TH>
              <TH>Workflow</TH>
              <TH>Size</TH>
              <TH>Sensitivity</TH>
              <TH>Status</TH>
            </tr>
          </thead>
          <tbody>
            {assets.map((a) => (
              <tr key={a.id}>
                <TD className="font-medium text-ink">{a.asset_name}</TD>
                <TD className="text-graphite">
                  {a.supplier_id ? (supplierName.get(a.supplier_id) ?? "—") : "—"}
                </TD>
                <TD className="max-w-[260px] text-graphite">
                  {truncate(a.workflow_type, 80)}
                </TD>
                <TD className="whitespace-nowrap text-graphite">
                  {a.estimated_size ?? a.estimated_records ?? "—"}
                </TD>
                <TD className="whitespace-nowrap text-graphite">
                  {a.sensitivity ?? a.pii_level ?? "—"}
                </TD>
                <TD>
                  <StatusSelect
                    entity="data_assets"
                    id={a.id}
                    value={a.status}
                    statuses={assetStatuses}
                  />
                </TD>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      )}
    </div>
  );
}
