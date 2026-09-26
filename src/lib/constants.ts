/**
 * Canonical option lists (value + human label), shared by forms, server-side
 * validation, and admin display. Values are the stored representation.
 */

export type Option = { value: string; label: string };

export const buildingOptions = [
  { value: "foundation_model", label: "Foundation model" },
  { value: "agent", label: "Agent" },
  { value: "ai_application", label: "AI application" },
  { value: "evaluation_platform", label: "Evaluation platform" },
  { value: "robotics", label: "Robotics / embodied AI" },
  { value: "research", label: "Research" },
  { value: "other", label: "Other" },
] as const satisfies readonly Option[];

export const improvementOptions = [
  { value: "training", label: "Training" },
  { value: "fine_tuning", label: "Fine-tuning / post-training" },
  { value: "evaluation", label: "Evaluation" },
  { value: "agent_behavior", label: "Agent behavior" },
  { value: "tool_use", label: "Tool use" },
  { value: "reasoning", label: "Reasoning" },
  { value: "domain_knowledge", label: "Domain knowledge" },
  { value: "simulation", label: "Simulation" },
  { value: "other", label: "Other" },
] as const satisfies readonly Option[];

export const historicalOrOngoingOptions = [
  { value: "historical", label: "Historical" },
  { value: "ongoing", label: "Ongoing" },
  { value: "both", label: "Both" },
] as const satisfies readonly Option[];

export const recurringOptions = [
  { value: "one_time", label: "One-time" },
  { value: "recurring", label: "Recurring" },
  { value: "either", label: "Either" },
] as const satisfies readonly Option[];

export const budgetOptions = [
  { value: "lt_25k", label: "< $25K" },
  { value: "25k_100k", label: "$25K – $100K" },
  { value: "100k_500k", label: "$100K – $500K" },
  { value: "500k_1m", label: "$500K – $1M" },
  { value: "gt_1m", label: "$1M+" },
  { value: "undecided", label: "Not decided" },
] as const satisfies readonly Option[];

/** Source/operational systems — supplier inventory + buyer preferences. */
export const systemOptions = [
  { value: "slack", label: "Slack" },
  { value: "teams", label: "Microsoft Teams" },
  { value: "email", label: "Email" },
  { value: "google_drive", label: "Google Drive" },
  { value: "m365", label: "Microsoft 365 / SharePoint" },
  { value: "jira", label: "Jira" },
  { value: "github", label: "GitHub" },
  { value: "salesforce", label: "Salesforce" },
  { value: "hubspot", label: "HubSpot" },
  { value: "zendesk", label: "Zendesk / Intercom" },
  { value: "servicenow", label: "ServiceNow" },
  { value: "erp", label: "ERP" },
  { value: "call_recordings", label: "Call recordings / transcripts" },
  { value: "internal_docs", label: "Internal documentation" },
  { value: "other", label: "Other" },
] as const satisfies readonly Option[];

export const licensingInterestOptions = [
  { value: "yes", label: "Yes" },
  { value: "maybe", label: "Maybe" },
  { value: "researching", label: "Just researching" },
] as const satisfies readonly Option[];

export const licensePreferenceOptions = [
  { value: "one_time", label: "One-time" },
  { value: "recurring", label: "Recurring" },
  { value: "either", label: "Either" },
] as const satisfies readonly Option[];

export const contactTypeOptions = [
  { value: "buyer", label: "I'm looking for data (AI team)" },
  { value: "supplier", label: "I have data to license (company)" },
  { value: "partnership", label: "Partnership / other" },
] as const satisfies readonly Option[];

// Lead lifecycle statuses (admin-managed).
export const buyerStatuses = [
  "new",
  "qualified",
  "discovery",
  "matched",
  "pilot",
  "closed",
  "rejected",
] as const;

export const supplierStatuses = [
  "new",
  "qualified",
  "discovery",
  "matched",
  "pilot",
  "closed",
  "rejected",
] as const;

export const assetStatuses = [
  "discovered",
  "under_review",
  "qualified",
  "available",
  "licensed",
  "rejected",
] as const;

export const matchStatuses = [
  "suggested",
  "reviewing",
  "introduced",
  "pilot",
  "licensed",
  "closed",
] as const;

/** Resolve a stored value back to its display label. */
export function labelFor(
  options: readonly Option[],
  value: string | null | undefined,
): string {
  if (!value) return "—";
  return options.find((o) => o.value === value)?.label ?? value;
}

export function labelsFor(
  options: readonly Option[],
  values: readonly string[] | null | undefined,
): string {
  if (!values || values.length === 0) return "—";
  return values.map((v) => labelFor(options, v)).join(", ");
}
