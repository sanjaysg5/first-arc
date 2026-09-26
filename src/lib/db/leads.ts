import { createClient } from "@/lib/supabase/server";
import type {
  BuyerRequestInput,
  SupplierRequestInput,
  ContactInput,
} from "@/lib/validation";

/** Empty string → null, so optional fields store cleanly. */
const n = (v?: string | null) => (v && v.length ? v : null);

/**
 * Inserts run through the anon client and rely on the tables' RLS
 * INSERT-only policy (no SELECT for anon). We intentionally do not read the
 * row back. Errors bubble up to the caller, which returns a generic message.
 */

export async function insertBuyerLead(data: BuyerRequestInput): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("buyers").insert({
    name: data.name,
    email: data.email,
    company: data.company,
    role: n(data.role),
    linkedin: n(data.linkedin),
    company_website: n(data.company_website),
    company_type: data.company_type,
    use_case: null,
    training_stage: data.training_stage,
    description: n(data.description),
    industry: n(data.industry),
    workflow: n(data.workflow),
    source_systems: n(data.source_systems),
    volume_requirement: n(data.volume_requirement),
    historical_or_ongoing: n(data.historical_or_ongoing),
    format: n(data.format),
    recurring: n(data.recurring),
    exclusivity: data.exclusivity,
    geography: n(data.geography),
    timeline: n(data.timeline),
    budget_range: data.budget_range,
  });
  if (error) throw new Error(`buyer insert failed: ${error.message}`);
}

export async function insertSupplierLead(
  data: SupplierRequestInput,
): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("suppliers").insert({
    contact_name: data.contact_name,
    email: data.email,
    company: data.company,
    website: n(data.website),
    industry: n(data.industry),
    employee_count: n(data.employee_count),
    country: n(data.country),
    role: n(data.role),
    systems: data.systems,
    history_years: n(data.history_years),
    estimated_volume: n(data.estimated_volume),
    employees_represented: n(data.employees_represented),
    customers_represented: n(data.customers_represented),
    workflow_types: n(data.workflow_types),
    excluded_data: n(data.excluded_data),
    licensing_interest: data.licensing_interest,
    license_preference: n(data.license_preference),
    residency_constraints: n(data.residency_constraints),
    security_requirements: n(data.security_requirements),
    notes: n(data.notes),
  });
  if (error) throw new Error(`supplier insert failed: ${error.message}`);
}

export async function insertContactMessage(data: ContactInput): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").insert({
    name: data.name,
    email: data.email,
    company: n(data.company),
    message: data.message,
    type: data.type,
  });
  if (error) throw new Error(`contact insert failed: ${error.message}`);
}
