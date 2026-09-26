"use server";

import {
  buyerRequestSchema,
  supplierRequestSchema,
  contactSchema,
  HONEYPOT_FIELD,
} from "@/lib/validation";
import {
  insertBuyerLead,
  insertSupplierLead,
  insertContactMessage,
} from "@/lib/db/leads";
import { notifyInternal, sendConfirmation } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/request";
import {
  labelFor,
  labelsFor,
  buildingOptions,
  improvementOptions,
  budgetOptions,
  systemOptions,
  licensingInterestOptions,
  licensePreferenceOptions,
  historicalOrOngoingOptions,
  recurringOptions,
  contactTypeOptions,
} from "@/lib/constants";

export type ActionResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

const TOO_MANY = (s: number) =>
  `Too many submissions from this network. Please try again in ${s || 60}s.`;
const GENERIC = "Something went wrong. Please try again shortly.";

function honeypotTripped(raw: unknown): boolean {
  const hp = (raw as Record<string, unknown> | null)?.[HONEYPOT_FIELD];
  return typeof hp === "string" && hp.trim() !== "";
}

/** Emails must never block or fail a submission. */
async function dispatchEmails(fn: () => Promise<unknown>) {
  try {
    await fn();
  } catch (err) {
    console.error(
      "[leads] email dispatch error:",
      err instanceof Error ? err.message : "unknown",
    );
  }
}

/* ------------------------------- Buyer ------------------------------- */

export async function submitBuyerRequest(raw: unknown): Promise<ActionResult> {
  if (honeypotTripped(raw)) return { ok: true }; // silently drop bots

  const rl = rateLimit(`buyer:${await getClientIp()}`, 5, 60_000);
  if (!rl.ok) return { ok: false, error: TOO_MANY(rl.retryAfterSeconds) };

  const parsed = buyerRequestSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please review the highlighted fields.",
      fieldErrors: parsed.error.flatten()
        .fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await insertBuyerLead(parsed.data);
  } catch (err) {
    console.error(
      "[buyer] insert error:",
      err instanceof Error ? err.message : "unknown",
    );
    return { ok: false, error: GENERIC };
  }

  const d = parsed.data;
  await dispatchEmails(() =>
    Promise.allSettled([
      notifyInternal({
        kind: "buyer",
        replyTo: d.email,
        fields: {
          Name: d.name,
          Email: d.email,
          Company: d.company,
          Role: d.role,
          Building: labelFor(buildingOptions, d.company_type),
          Goals: labelsFor(improvementOptions, d.training_stage),
          Need: d.description,
          Industry: d.industry ?? "",
          Workflow: d.workflow ?? "",
          "Source systems": d.source_systems ?? "",
          Volume: d.volume_requirement ?? "",
          Cadence: labelFor(recurringOptions, d.recurring),
          "Historical/ongoing": labelFor(
            historicalOrOngoingOptions,
            d.historical_or_ongoing,
          ),
          Exclusivity: d.exclusivity ? "Yes" : "No",
          Geography: d.geography ?? "",
          Timeline: d.timeline ?? "",
          Budget: labelFor(budgetOptions, d.budget_range),
        },
      }),
      sendConfirmation({ to: d.email, name: d.name, kind: "buyer" }),
    ]),
  );

  return { ok: true };
}

/* ------------------------------ Supplier ----------------------------- */

export async function submitSupplierRequest(
  raw: unknown,
): Promise<ActionResult> {
  if (honeypotTripped(raw)) return { ok: true };

  const rl = rateLimit(`supplier:${await getClientIp()}`, 5, 60_000);
  if (!rl.ok) return { ok: false, error: TOO_MANY(rl.retryAfterSeconds) };

  const parsed = supplierRequestSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please review the highlighted fields.",
      fieldErrors: parsed.error.flatten()
        .fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await insertSupplierLead(parsed.data);
  } catch (err) {
    console.error(
      "[supplier] insert error:",
      err instanceof Error ? err.message : "unknown",
    );
    return { ok: false, error: GENERIC };
  }

  const d = parsed.data;
  await dispatchEmails(() =>
    Promise.allSettled([
      notifyInternal({
        kind: "supplier",
        replyTo: d.email,
        fields: {
          Company: d.company,
          Contact: d.contact_name,
          Email: d.email,
          Website: d.website ?? "",
          Industry: d.industry,
          "Employee count": d.employee_count ?? "",
          Country: d.country,
          Systems: labelsFor(systemOptions, d.systems),
          "History (years)": d.history_years ?? "",
          Volume: d.estimated_volume ?? "",
          "Richest workflows": d.workflow_types ?? "",
          Interest: labelFor(licensingInterestOptions, d.licensing_interest),
          Preference: labelFor(licensePreferenceOptions, d.license_preference),
          Excluded: d.excluded_data ?? "",
          Residency: d.residency_constraints ?? "",
          Security: d.security_requirements ?? "",
          Notes: d.notes ?? "",
        },
      }),
      sendConfirmation({ to: d.email, name: d.contact_name, kind: "supplier" }),
    ]),
  );

  return { ok: true };
}

/* ------------------------------ Contact ------------------------------ */

export async function submitContact(raw: unknown): Promise<ActionResult> {
  if (honeypotTripped(raw)) return { ok: true };

  const rl = rateLimit(`contact:${await getClientIp()}`, 5, 60_000);
  if (!rl.ok) return { ok: false, error: TOO_MANY(rl.retryAfterSeconds) };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please review the highlighted fields.",
      fieldErrors: parsed.error.flatten()
        .fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await insertContactMessage(parsed.data);
  } catch (err) {
    console.error(
      "[contact] insert error:",
      err instanceof Error ? err.message : "unknown",
    );
    return { ok: false, error: GENERIC };
  }

  const d = parsed.data;
  await dispatchEmails(() =>
    Promise.allSettled([
      notifyInternal({
        kind: "contact",
        replyTo: d.email,
        fields: {
          Type: labelFor(contactTypeOptions, d.type),
          Name: d.name,
          Email: d.email,
          Company: d.company ?? "",
          Message: d.message,
        },
      }),
      sendConfirmation({ to: d.email, name: d.name, kind: "contact" }),
    ]),
  );

  return { ok: true };
}
