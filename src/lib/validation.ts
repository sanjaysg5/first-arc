import { z } from "zod";
import {
  buildingOptions,
  improvementOptions,
  historicalOrOngoingOptions,
  recurringOptions,
  budgetOptions,
  systemOptions,
  licensingInterestOptions,
  licensePreferenceOptions,
  contactTypeOptions,
  type Option,
} from "@/lib/constants";

/** Extract the value union of an option list as a Zod enum tuple. */
const enumOf = (opts: readonly Option[]) =>
  z.enum(opts.map((o) => o.value) as [string, ...string[]]);

const trimmed = (max: number) => z.string().trim().max(max);
const requiredText = (max: number, msg = "Required") =>
  z.string().trim().min(1, msg).max(max);
const optionalUrl = z
  .string()
  .trim()
  .max(300)
  .url("Enter a valid URL")
  .optional()
  .or(z.literal(""));

/* ------------------------------- Buyer ------------------------------- */

export const buyerRequestSchema = z.object({
  // Step 1 — about you
  name: requiredText(120, "Your name is required"),
  email: z.string().trim().email("Enter a valid work email").max(200),
  company: requiredText(160, "Company is required"),
  role: requiredText(120, "Role is required"),
  linkedin: optionalUrl,
  company_website: optionalUrl,

  // Step 2 — what are you building
  company_type: enumOf(buildingOptions),

  // Step 3 — what are you trying to improve
  training_stage: z
    .array(enumOf(improvementOptions))
    .min(1, "Select at least one goal"),

  // Step 4 — data requirement
  description: z
    .string()
    .trim()
    .min(10, "Please describe the data you need")
    .max(4000),
  industry: trimmed(160).optional().or(z.literal("")),
  workflow: trimmed(300).optional().or(z.literal("")),
  source_systems: trimmed(300).optional().or(z.literal("")),
  volume_requirement: trimmed(160).optional().or(z.literal("")),
  historical_or_ongoing: enumOf(historicalOrOngoingOptions)
    .optional()
    .or(z.literal("")),
  format: trimmed(160).optional().or(z.literal("")),
  recurring: enumOf(recurringOptions).optional().or(z.literal("")),
  exclusivity: z.boolean(),
  geography: trimmed(200).optional().or(z.literal("")),
  timeline: trimmed(200).optional().or(z.literal("")),

  // Step 5 — commercial
  budget_range: enumOf(budgetOptions),

  // Final acknowledgement
  acknowledge: z.literal(true, {
    errorMap: () => ({ message: "Please acknowledge to continue" }),
  }),
});

export type BuyerRequestInput = z.infer<typeof buyerRequestSchema>;

/* ------------------------------ Supplier ----------------------------- */

export const supplierRequestSchema = z.object({
  // Company
  company: requiredText(160, "Company is required"),
  website: optionalUrl,
  industry: requiredText(160, "Industry is required"),
  employee_count: trimmed(60).optional().or(z.literal("")),
  country: requiredText(120, "Country is required"),
  contact_name: requiredText(120, "Contact name is required"),
  role: trimmed(120).optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid work email").max(200),

  // Data inventory
  systems: z.array(enumOf(systemOptions)).min(1, "Select at least one system"),

  // History
  history_years: trimmed(60).optional().or(z.literal("")),
  estimated_volume: trimmed(120).optional().or(z.literal("")),
  employees_represented: trimmed(120).optional().or(z.literal("")),
  customers_represented: trimmed(120).optional().or(z.literal("")),
  workflow_types: trimmed(600).optional().or(z.literal("")),

  // Willingness
  licensing_interest: enumOf(licensingInterestOptions),
  license_preference: enumOf(licensePreferenceOptions)
    .optional()
    .or(z.literal("")),
  excluded_data: trimmed(600).optional().or(z.literal("")),
  residency_constraints: trimmed(400).optional().or(z.literal("")),
  security_requirements: trimmed(400).optional().or(z.literal("")),
  notes: trimmed(2000).optional().or(z.literal("")),
});

export type SupplierRequestInput = z.infer<typeof supplierRequestSchema>;

/* ------------------------------ Contact ------------------------------ */

export const contactSchema = z.object({
  type: enumOf(contactTypeOptions),
  name: requiredText(120, "Your name is required"),
  email: z.string().trim().email("Enter a valid email").max(200),
  company: trimmed(160).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Please add a short message").max(4000),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Shared honeypot: must be empty. Read from the raw payload in server actions. */
export const HONEYPOT_FIELD = "company_role_hp";
