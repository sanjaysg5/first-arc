/**
 * Seed DEMO data for local development only.
 * Run:  npm run seed
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 *
 * Every record is clearly marked DEMO. Do not run against production.
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });
config(); // fallback to .env

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "✗ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local",
  );
  process.exit(1);
}

const db = createClient(url, serviceKey, {
  auth: { persistSession: false },
});

const DEMO_BUYER_EMAIL = "demo-buyer@firstarc.example";
const DEMO_SUPPLIER_EMAIL = "demo-supplier@firstarc.example";

async function main() {
  // Idempotency guard.
  const { data: existing } = await db
    .from("buyers")
    .select("id")
    .eq("email", DEMO_BUYER_EMAIL)
    .limit(1);
  if (existing && existing.length > 0) {
    console.log("• Demo data already present — skipping.");
    return;
  }

  // Admin users from ADMIN_EMAILS (so you can sign in and be authorized).
  const adminEmails = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  for (const email of adminEmails) {
    await db.from("admin_users").upsert({ email, role: "admin" }, { onConflict: "email" });
  }
  if (adminEmails.length) console.log(`• Ensured ${adminEmails.length} admin_users`);

  const { data: buyer, error: buyerErr } = await db
    .from("buyers")
    .insert({
      name: "DEMO — Priya Menon",
      email: DEMO_BUYER_EMAIL,
      company: "AI Infrastructure Co. (DEMO)",
      role: "Head of Data",
      company_type: "foundation_model",
      training_stage: ["training", "evaluation"],
      description:
        "DEMO record. Seeking customer-support resolution trajectories with full context: conversation, investigation, escalation, and outcome.",
      industry: "SaaS",
      workflow: "Customer support resolution",
      source_systems: "Zendesk, Salesforce, Slack",
      volume_requirement: "100k+ tickets",
      historical_or_ongoing: "both",
      recurring: "recurring",
      exclusivity: false,
      geography: "US / EU",
      timeline: "This quarter",
      budget_range: "100k_500k",
      status: "new",
      notes: "DEMO seed data.",
    })
    .select("id")
    .single();
  if (buyerErr) throw buyerErr;

  const { data: supplier, error: supErr } = await db
    .from("suppliers")
    .insert({
      contact_name: "DEMO — Alex Ford",
      email: DEMO_SUPPLIER_EMAIL,
      company: "B2B SaaS Company (DEMO)",
      website: "https://example.com",
      industry: "SaaS",
      employee_count: "201-500",
      country: "United States",
      role: "COO",
      systems: ["zendesk", "salesforce", "slack", "jira"],
      history_years: "6",
      estimated_volume: "~250k support conversations",
      employees_represented: "300",
      customers_represented: "4,000",
      workflow_types:
        "Customer issue → investigation → escalation → resolution",
      licensing_interest: "yes",
      license_preference: "either",
      excluded_data: "Anything containing customer PII without de-identification",
      residency_constraints: "US data residency preferred",
      security_requirements: "SOC 2, signed DPA",
      status: "new",
      notes: "DEMO seed data.",
    })
    .select("id")
    .single();
  if (supErr) throw supErr;

  const { data: asset, error: assetErr } = await db
    .from("data_assets")
    .insert({
      supplier_id: supplier!.id,
      asset_name: "DEMO — Customer Support Resolution History",
      description:
        "DEMO record. Six years of support conversations with linked investigation and resolution steps.",
      industry: "SaaS",
      systems: ["zendesk", "salesforce", "slack"],
      workflow_type: "Customer issue → investigation → escalation → resolution",
      historical_years: "6",
      estimated_records: "~250,000 conversations",
      estimated_size: "~40 GB text",
      sensitivity: "Medium",
      pii_level: "Contains PII (requires de-identification)",
      ip_risk: "Low",
      customer_data: "Yes",
      workflow_richness: "High",
      legal_status: "Under review",
      status: "under_review",
    })
    .select("id")
    .single();
  if (assetErr) throw assetErr;

  const { error: matchErr } = await db.from("matches").insert({
    buyer_id: buyer!.id,
    supplier_id: supplier!.id,
    asset_id: asset!.id,
    match_score: 90,
    match_reason:
      "Workflow overlap (+25); Industry match (+20); Source-system match (+15); Historical/ongoing alignment (+15); Volume indicated on both sides (+10); Commercial fit (+5)",
    status: "suggested",
    notes: "DEMO seed match.",
  });
  if (matchErr) throw matchErr;

  await db.from("contact_messages").insert({
    name: "DEMO — Jordan Lee",
    email: "demo-contact@firstarc.example",
    company: "Frontier Labs (DEMO)",
    type: "buyer",
    message: "DEMO message. Interested in evaluation trajectories for agents.",
  });

  console.log("✓ Seeded DEMO buyer, supplier, asset, match, and contact.");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("✗ Seed failed:", err instanceof Error ? err.message : err);
    process.exit(1);
  });
