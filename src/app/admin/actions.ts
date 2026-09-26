"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/admin/auth";
import {
  buyerStatuses,
  supplierStatuses,
  assetStatuses,
  matchStatuses,
} from "@/lib/constants";

export type AdminResult = { ok: true } | { ok: false; error: string };

type Entity = "buyers" | "suppliers" | "data_assets" | "matches";

const STATUS_SETS: Record<Entity, readonly string[]> = {
  buyers: buyerStatuses,
  suppliers: supplierStatuses,
  data_assets: assetStatuses,
  matches: matchStatuses,
};

const ENTITY_PATH: Record<Entity, string> = {
  buyers: "buyers",
  suppliers: "suppliers",
  data_assets: "assets",
  matches: "matches",
};

async function logAudit(
  actorEmail: string | undefined,
  entity: string,
  entityId: string,
  action: string,
  detail: string,
) {
  try {
    await createAdminClient()
      .from("admin_audit_log")
      .insert({
        actor_email: actorEmail ?? null,
        entity,
        entity_id: entityId,
        action,
        detail,
      });
  } catch (err) {
    console.error(
      "[admin] audit log failed:",
      err instanceof Error ? err.message : "unknown",
    );
  }
}

function revalidateAdmin(entity: Entity) {
  revalidatePath("/admin");
  revalidatePath(`/admin/${ENTITY_PATH[entity]}`);
}

export async function updateStatus(
  entity: Entity,
  id: string,
  status: string,
): Promise<AdminResult> {
  const user = await requireAdmin();
  if (!STATUS_SETS[entity]?.includes(status)) {
    return { ok: false, error: "Invalid status" };
  }
  const { error } = await createAdminClient()
    .from(entity)
    .update({ status } as never)
    .eq("id", id);
  if (error) {
    console.error("[admin] status update failed:", error.message);
    return { ok: false, error: "Update failed" };
  }
  await logAudit(user.email, entity, id, "status_change", status);
  revalidateAdmin(entity);
  return { ok: true };
}

export async function updateNotes(
  entity: Entity,
  id: string,
  notes: string,
): Promise<AdminResult> {
  const user = await requireAdmin();
  const clean = notes.slice(0, 4000);
  const { error } = await createAdminClient()
    .from(entity)
    .update({ notes: clean } as never)
    .eq("id", id);
  if (error) {
    console.error("[admin] notes update failed:", error.message);
    return { ok: false, error: "Update failed" };
  }
  await logAudit(user.email, entity, id, "notes_update", "notes edited");
  revalidateAdmin(entity);
  return { ok: true };
}

export async function createMatch(input: {
  buyer_id: string;
  supplier_id: string;
  asset_id?: string | null;
  match_score: number;
  match_reason: string;
}): Promise<AdminResult> {
  const user = await requireAdmin();
  if (!input.buyer_id || !input.supplier_id) {
    return { ok: false, error: "Buyer and supplier are required" };
  }
  const { error } = await createAdminClient()
    .from("matches")
    .insert({
      buyer_id: input.buyer_id,
      supplier_id: input.supplier_id,
      asset_id: input.asset_id ?? null,
      match_score: Math.max(0, Math.min(100, Math.round(input.match_score))),
      match_reason: input.match_reason.slice(0, 2000),
      status: "suggested",
    });
  if (error) {
    console.error("[admin] create match failed:", error.message);
    return { ok: false, error: "Could not create match" };
  }
  await logAudit(user.email, "matches", input.buyer_id, "match_created", input.supplier_id);
  revalidatePath("/admin/matches");
  revalidatePath("/admin");
  return { ok: true };
}

export async function signOutAdmin() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
