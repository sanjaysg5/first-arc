import type {
  buyerStatuses,
  supplierStatuses,
  assetStatuses,
  matchStatuses,
} from "@/lib/constants";

export type BuyerStatus = (typeof buyerStatuses)[number];
export type SupplierStatus = (typeof supplierStatuses)[number];
export type AssetStatus = (typeof assetStatuses)[number];
export type MatchStatus = (typeof matchStatuses)[number];

// NOTE: these MUST be `type` aliases (not `interface`) so they satisfy
// supabase-js's `Record<string, unknown>` table constraint.

export type BuyerRow = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string;
  role: string | null;
  linkedin: string | null;
  company_website: string | null;
  company_type: string | null;
  use_case: string | null;
  training_stage: string[] | null;
  description: string | null;
  industry: string | null;
  workflow: string | null;
  source_systems: string | null;
  volume_requirement: string | null;
  historical_or_ongoing: string | null;
  format: string | null;
  recurring: string | null;
  exclusivity: boolean | null;
  geography: string | null;
  timeline: string | null;
  budget_range: string | null;
  status: BuyerStatus;
  notes: string | null;
};

export type SupplierRow = {
  id: string;
  created_at: string;
  contact_name: string;
  email: string;
  company: string;
  website: string | null;
  industry: string | null;
  employee_count: string | null;
  country: string | null;
  role: string | null;
  systems: string[] | null;
  history_years: string | null;
  estimated_volume: string | null;
  employees_represented: string | null;
  customers_represented: string | null;
  workflow_types: string | null;
  excluded_data: string | null;
  licensing_interest: string | null;
  license_preference: string | null;
  residency_constraints: string | null;
  security_requirements: string | null;
  status: SupplierStatus;
  notes: string | null;
};

export type DataAssetRow = {
  id: string;
  supplier_id: string | null;
  created_at: string;
  asset_name: string;
  description: string | null;
  industry: string | null;
  systems: string[] | null;
  workflow_type: string | null;
  historical_years: string | null;
  estimated_records: string | null;
  estimated_size: string | null;
  sensitivity: string | null;
  pii_level: string | null;
  ip_risk: string | null;
  customer_data: string | null;
  workflow_richness: string | null;
  legal_status: string | null;
  status: AssetStatus;
};

export type MatchRow = {
  id: string;
  buyer_id: string;
  supplier_id: string;
  asset_id: string | null;
  created_at: string;
  match_score: number | null;
  match_reason: string | null;
  status: MatchStatus;
  notes: string | null;
};

export type AdminUserRow = {
  id: string;
  created_at: string;
  email: string;
  role: string | null;
};

export type ContactMessageRow = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  type: string | null;
};

export type AdminAuditLogRow = {
  id: string;
  created_at: string;
  actor_email: string | null;
  entity: string;
  entity_id: string | null;
  action: string;
  detail: string | null;
};

type NullableKeys<T> = {
  [K in keyof T]: null extends T[K] ? K : never;
}[keyof T];

/**
 * Insert shape: generated columns (id/created_at/status…) and any nullable
 * columns are optional; only the genuinely required columns must be provided.
 */
type Insertable<T, Generated extends keyof T> = Omit<
  T,
  Generated | NullableKeys<T>
> &
  Partial<Omit<T, Exclude<keyof T, NullableKeys<T> | Generated>>>;

type TableDef<Row, Insert, Update> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      buyers: TableDef<
        BuyerRow,
        Insertable<BuyerRow, "id" | "created_at" | "status">,
        Partial<BuyerRow>
      >;
      suppliers: TableDef<
        SupplierRow,
        Insertable<SupplierRow, "id" | "created_at" | "status">,
        Partial<SupplierRow>
      >;
      data_assets: TableDef<
        DataAssetRow,
        Insertable<DataAssetRow, "id" | "created_at" | "status">,
        Partial<DataAssetRow>
      >;
      matches: TableDef<
        MatchRow,
        Insertable<MatchRow, "id" | "created_at" | "status">,
        Partial<MatchRow>
      >;
      admin_users: TableDef<
        AdminUserRow,
        Insertable<AdminUserRow, "id" | "created_at">,
        Partial<AdminUserRow>
      >;
      contact_messages: TableDef<
        ContactMessageRow,
        Insertable<ContactMessageRow, "id" | "created_at">,
        Partial<ContactMessageRow>
      >;
      admin_audit_log: TableDef<
        AdminAuditLogRow,
        Insertable<AdminAuditLogRow, "id" | "created_at">,
        Partial<AdminAuditLogRow>
      >;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
