import type { BuyerRow, SupplierRow, DataAssetRow } from "@/lib/db/types";
import { systemOptions } from "@/lib/constants";

export type MatchBreakdown = {
  score: number;
  reasons: string[];
};

type BuyerLike = Pick<
  BuyerRow,
  | "industry"
  | "workflow"
  | "source_systems"
  | "historical_or_ongoing"
  | "volume_requirement"
  | "geography"
  | "budget_range"
>;
type SupplierLike = Pick<
  SupplierRow,
  | "industry"
  | "workflow_types"
  | "systems"
  | "license_preference"
  | "estimated_volume"
  | "country"
  | "residency_constraints"
  | "licensing_interest"
>;

const norm = (v: string | null | undefined) => (v ?? "").toLowerCase().trim();

/** Do two free-text values share a meaningful token (len > 3)? */
function textOverlap(a: string, b: string): boolean {
  const bt = norm(b);
  if (!bt) return false;
  return norm(a)
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 3)
    .some((t) => bt.includes(t));
}

/**
 * Transparent, rules-based match score (0–100). Deliberately simple while the
 * founders validate demand/supply; can later be replaced by an ML/LLM engine.
 */
export function scoreMatch(
  buyer: BuyerLike,
  supplier: SupplierLike,
  asset?: Pick<DataAssetRow, "workflow_type" | "industry" | "systems"> | null,
): MatchBreakdown {
  const reasons: string[] = [];
  let score = 0;

  // +25 workflow match
  const supplierWorkflow = `${supplier.workflow_types ?? ""} ${asset?.workflow_type ?? ""}`;
  if (buyer.workflow && textOverlap(buyer.workflow, supplierWorkflow)) {
    score += 25;
    reasons.push("Workflow overlap (+25)");
  }

  // +20 industry match
  const supplierIndustry = supplier.industry ?? asset?.industry ?? "";
  if (
    buyer.industry &&
    supplierIndustry &&
    (norm(buyer.industry) === norm(supplierIndustry) ||
      textOverlap(buyer.industry, supplierIndustry))
  ) {
    score += 20;
    reasons.push("Industry match (+20)");
  }

  // +15 source-system match
  const supplierSystems = [
    ...(supplier.systems ?? []),
    ...(asset?.systems ?? []),
  ];
  const buyerSystemsText = norm(buyer.source_systems);
  const systemHit = supplierSystems.some((sys) => {
    const label = norm(
      systemOptions.find((o) => o.value === sys)?.label ?? sys,
    );
    return (
      buyerSystemsText.includes(norm(sys)) ||
      (label && buyerSystemsText.includes(label.split(" ")[0]!))
    );
  });
  if (buyerSystemsText && systemHit) {
    score += 15;
    reasons.push("Source-system match (+15)");
  }

  // +15 historical / ongoing alignment
  const pref = norm(supplier.license_preference); // one_time | recurring | either
  const need = norm(buyer.historical_or_ongoing); // historical | ongoing | both
  if (need && pref) {
    const compatible =
      pref === "either" ||
      need === "both" ||
      (need === "historical" && pref === "one_time") ||
      (need === "ongoing" && pref === "recurring");
    if (compatible) {
      score += 15;
      reasons.push("Historical/ongoing alignment (+15)");
    }
  }

  // +10 volume signal (both parties indicated volume)
  if (buyer.volume_requirement && supplier.estimated_volume) {
    score += 10;
    reasons.push("Volume indicated on both sides (+10)");
  }

  // +10 geography
  const geo = norm(buyer.geography);
  const supplierGeo = `${supplier.country ?? ""} ${supplier.residency_constraints ?? ""}`;
  if (!geo) {
    score += 10;
    reasons.push("No geographic constraint (+10)");
  } else if (textOverlap(geo, supplierGeo)) {
    score += 10;
    reasons.push("Geography match (+10)");
  }

  // +5 commercial fit
  const seriousBudget = !["undecided", "lt_25k", ""].includes(
    norm(buyer.budget_range),
  );
  if (seriousBudget && norm(supplier.licensing_interest) === "yes") {
    score += 5;
    reasons.push("Commercial fit (+5)");
  }

  return { score: Math.min(score, 100), reasons };
}
