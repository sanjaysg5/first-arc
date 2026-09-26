"use client";

import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import { GitCompareArrows } from "lucide-react";
import type { BuyerRow, SupplierRow, DataAssetRow, MatchRow } from "@/lib/db/types";
import { scoreMatch } from "@/lib/matching";
import {
  labelFor,
  labelsFor,
  budgetOptions,
  systemOptions,
  licensingInterestOptions,
  matchStatuses,
} from "@/lib/constants";
import { createMatch } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Badge, statusTone } from "@/components/ui/badge";
import { StatusSelect } from "@/components/admin/status-select";
import { NotesCell } from "@/components/admin/notes-cell";
import { TableWrap, TH, TD, EmptyState } from "@/components/admin/table";

type Props = {
  buyers: BuyerRow[];
  suppliers: SupplierRow[];
  assets: DataAssetRow[];
  matches: MatchRow[];
};

export function MatchWorkspace({ buyers, suppliers, assets, matches }: Props) {
  const [buyerId, setBuyerId] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [assetId, setAssetId] = useState("");
  const [pending, startTransition] = useTransition();

  const buyer = buyers.find((b) => b.id === buyerId);
  const supplier = suppliers.find((s) => s.id === supplierId);
  const asset = assets.find((a) => a.id === assetId);

  const breakdown = useMemo(
    () => (buyer && supplier ? scoreMatch(buyer, supplier, asset) : null),
    [buyer, supplier, asset],
  );

  const buyerName = new Map(buyers.map((b) => [b.id, b.company]));
  const supplierName = new Map(suppliers.map((s) => [s.id, s.company]));
  const supplierAssets = assets.filter(
    (a) => !supplierId || a.supplier_id === supplierId,
  );

  function onCreate() {
    if (!buyer || !supplier || !breakdown) return;
    startTransition(async () => {
      const res = await createMatch({
        buyer_id: buyer.id,
        supplier_id: supplier.id,
        asset_id: assetId || null,
        match_score: breakdown.score,
        match_reason: breakdown.reasons.join("; "),
      });
      if (res.ok) {
        toast.success("Match created");
        setBuyerId("");
        setSupplierId("");
        setAssetId("");
      } else {
        toast.error(res.error);
      }
    });
  }

  return (
    <div className="space-y-10">
      {/* Builder */}
      <div className="rounded-2xl border border-line bg-card p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Selector
            label="Buyer"
            value={buyerId}
            onChange={setBuyerId}
            options={buyers.map((b) => ({ value: b.id, label: b.company }))}
          />
          <Selector
            label="Supplier"
            value={supplierId}
            onChange={(v) => {
              setSupplierId(v);
              setAssetId("");
            }}
            options={suppliers.map((s) => ({ value: s.id, label: s.company }))}
          />
          <Selector
            label="Asset (optional)"
            value={assetId}
            onChange={setAssetId}
            options={supplierAssets.map((a) => ({
              value: a.id,
              label: a.asset_name,
            }))}
          />
        </div>

        {buyer && supplier ? (
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr_0.8fr]">
            <Panel title="Buyer">
              <Row label="Company" value={buyer.company} />
              <Row label="Need" value={buyer.description} />
              <Row label="Industry" value={buyer.industry} />
              <Row label="Workflow" value={buyer.workflow} />
              <Row label="Systems" value={buyer.source_systems} />
              <Row label="Budget" value={labelFor(budgetOptions, buyer.budget_range)} />
              <Row label="Timeline" value={buyer.timeline} />
            </Panel>

            <Panel title="Supplier">
              <Row label="Company" value={supplier.company} />
              <Row label="Systems" value={labelsFor(systemOptions, supplier.systems)} />
              <Row label="History" value={supplier.history_years} />
              <Row label="Volume" value={supplier.estimated_volume} />
              <Row label="Workflows" value={supplier.workflow_types} />
              <Row
                label="Interest"
                value={labelFor(licensingInterestOptions, supplier.licensing_interest)}
              />
              <Row label="Residency" value={supplier.residency_constraints} />
            </Panel>

            <div className="rounded-xl border border-accent/20 bg-accent-soft p-5">
              <p className="eyebrow eyebrow-muted">Match score</p>
              <p className="numeral mt-3 text-5xl text-accent">
                {breakdown?.score ?? 0}
                <span className="text-2xl text-graphite">/100</span>
              </p>
              <ul className="mt-4 space-y-1.5">
                {breakdown?.reasons.length ? (
                  breakdown.reasons.map((r) => (
                    <li key={r} className="text-xs text-accent-ink">
                      {r}
                    </li>
                  ))
                ) : (
                  <li className="text-xs text-graphite">
                    No overlapping signals detected.
                  </li>
                )}
              </ul>
              <Button
                className="mt-5 w-full"
                onClick={onCreate}
                disabled={pending}
              >
                {pending ? "Creating…" : "Create match"}
              </Button>
            </div>
          </div>
        ) : (
          <p className="mt-6 flex items-center gap-2 text-sm text-graphite">
            <GitCompareArrows className="h-4 w-4" />
            Select a buyer and a supplier to score a potential match.
          </p>
        )}
      </div>

      {/* Existing matches */}
      <div>
        <h2 className="mb-4 font-medium text-ink">
          Matches <span className="numeral text-sm text-graphite">{matches.length}</span>
        </h2>
        {matches.length === 0 ? (
          <EmptyState>No matches yet. Create one above.</EmptyState>
        ) : (
          <TableWrap>
            <thead>
              <tr>
                <TH>Buyer</TH>
                <TH>Supplier</TH>
                <TH>Score</TH>
                <TH>Status</TH>
                <TH>Notes</TH>
              </tr>
            </thead>
            <tbody>
              {matches.map((m) => (
                <tr key={m.id}>
                  <TD className="font-medium text-ink">
                    {buyerName.get(m.buyer_id) ?? "—"}
                  </TD>
                  <TD className="text-graphite">
                    {supplierName.get(m.supplier_id) ?? "—"}
                  </TD>
                  <TD>
                    <Badge tone={statusTone(m.status)}>{m.match_score ?? 0}</Badge>
                  </TD>
                  <TD>
                    <StatusSelect
                      entity="matches"
                      id={m.id}
                      value={m.status}
                      statuses={matchStatuses}
                    />
                  </TD>
                  <TD>
                    <NotesCell entity="matches" id={m.id} notes={m.notes} />
                  </TD>
                </tr>
              ))}
            </tbody>
          </TableWrap>
        )}
      </div>
    </div>
  );
}

function Selector({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-graphite">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-xl border border-line bg-paper px-3 text-sm outline-none focus:border-accent"
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-line bg-paper p-5">
      <p className="eyebrow eyebrow-muted">{title}</p>
      <dl className="mt-4 space-y-2.5">{children}</dl>
    </div>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div className="grid grid-cols-[80px_1fr] gap-3 text-sm">
      <dt className="text-graphite-dim">{label}</dt>
      <dd className="text-ink">{value?.trim() ? value : "—"}</dd>
    </div>
  );
}
