import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import type {
  BuyerRow,
  SupplierRow,
  DataAssetRow,
  MatchRow,
  ContactMessageRow,
} from "@/lib/db/types";

export async function listBuyers(): Promise<BuyerRow[]> {
  const { data } = await createAdminClient()
    .from("buyers")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function listSuppliers(): Promise<SupplierRow[]> {
  const { data } = await createAdminClient()
    .from("suppliers")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function listAssets(): Promise<DataAssetRow[]> {
  const { data } = await createAdminClient()
    .from("data_assets")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function listMatches(): Promise<MatchRow[]> {
  const { data } = await createAdminClient()
    .from("matches")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function listContactMessages(): Promise<ContactMessageRow[]> {
  const { data } = await createAdminClient()
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

async function count(table: "buyers" | "suppliers" | "data_assets" | "matches") {
  const { count } = await createAdminClient()
    .from(table)
    .select("*", { count: "exact", head: true });
  return count ?? 0;
}

export type OverviewStats = {
  buyers: number;
  suppliers: number;
  assets: number;
  matches: number;
  pilots: number;
  highPriority: number;
};

export async function getOverviewStats(): Promise<OverviewStats> {
  const admin = createAdminClient();
  const [buyers, suppliers, assets, matches] = await Promise.all([
    count("buyers"),
    count("suppliers"),
    count("data_assets"),
    count("matches"),
  ]);

  const { count: pilots } = await admin
    .from("matches")
    .select("*", { count: "exact", head: true })
    .eq("status", "pilot");

  const { count: highPriority } = await admin
    .from("buyers")
    .select("*", { count: "exact", head: true })
    .in("budget_range", ["100k_500k", "500k_1m", "gt_1m"]);

  return {
    buyers,
    suppliers,
    assets,
    matches,
    pilots: pilots ?? 0,
    highPriority: highPriority ?? 0,
  };
}
