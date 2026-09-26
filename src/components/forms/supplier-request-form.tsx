"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import {
  supplierRequestSchema,
  type SupplierRequestInput,
} from "@/lib/validation";
import { submitSupplierRequest } from "@/app/actions/leads";
import {
  systemOptions,
  licensingInterestOptions,
  licensePreferenceOptions,
} from "@/lib/constants";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SelectInput } from "@/components/ui/select";
import { ChoiceChip } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { StepProgress } from "@/components/forms/step-progress";
import { Honeypot, FormSuccess } from "@/components/forms/shared";

const STEPS = ["Company", "Data inventory", "History", "Willingness"];

const fieldsByStep: (keyof SupplierRequestInput)[][] = [
  ["company", "website", "industry", "employee_count", "country", "contact_name", "role", "email"],
  ["systems"],
  ["history_years", "estimated_volume", "employees_represented", "customers_represented", "workflow_types"],
  ["licensing_interest", "license_preference", "excluded_data", "residency_constraints", "security_requirements", "notes"],
];

export function SupplierRequestForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<SupplierRequestInput>({
    resolver: zodResolver(supplierRequestSchema),
    shouldUnregister: false,
    defaultValues: {
      company: "",
      website: "",
      industry: "",
      employee_count: "",
      country: "",
      contact_name: "",
      role: "",
      email: "",
      systems: [],
      history_years: "",
      estimated_volume: "",
      employees_represented: "",
      customers_represented: "",
      workflow_types: "",
      license_preference: "",
      excluded_data: "",
      residency_constraints: "",
      security_requirements: "",
      notes: "",
    },
  });

  const {
    register,
    control,
    trigger,
    getValues,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = form;

  const isLast = step === STEPS.length - 1;

  async function next() {
    const ok = await trigger(fieldsByStep[step]);
    if (ok) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  async function onValid() {
    const raw = getValues() as Record<string, unknown>;
    const res = await submitSupplierRequest(raw);
    if (res.ok) {
      setSubmitted(true);
      return;
    }
    if (res.fieldErrors) {
      for (const [name, messages] of Object.entries(res.fieldErrors)) {
        if (messages?.[0]) {
          setError(name as keyof SupplierRequestInput, { message: messages[0] });
        }
      }
    }
    toast.error(res.error);
  }

  if (submitted) {
    return (
      <FormSuccess
        title="Thank you."
        message="We received your interest and will follow up if we see a credible path forward. Nothing is shared or committed by submitting this."
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="rounded-2xl border border-line bg-card p-6 md:p-10"
      noValidate
    >
      <Honeypot register={register} />
      <StepProgress steps={STEPS} current={step} />

      <div className="mt-8">
        {step === 0 && (
          <StepShell title="About your company">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Company" htmlFor="company" required error={errors.company?.message}>
                <Input id="company" aria-invalid={!!errors.company} {...register("company")} placeholder="Company name" />
              </Field>
              <Field label="Website" htmlFor="website" error={errors.website?.message}>
                <Input id="website" {...register("website")} placeholder="https://…" />
              </Field>
              <Field label="Industry" htmlFor="industry" required error={errors.industry?.message}>
                <Input id="industry" aria-invalid={!!errors.industry} {...register("industry")} placeholder="e.g. SaaS" />
              </Field>
              <Field label="Employee count" htmlFor="employee_count" error={errors.employee_count?.message}>
                <Input id="employee_count" {...register("employee_count")} placeholder="e.g. 201–500" />
              </Field>
              <Field label="Country" htmlFor="country" required error={errors.country?.message}>
                <Input id="country" aria-invalid={!!errors.country} {...register("country")} placeholder="e.g. United States" />
              </Field>
              <Field label="Contact name" htmlFor="contact_name" required error={errors.contact_name?.message}>
                <Input id="contact_name" aria-invalid={!!errors.contact_name} {...register("contact_name")} placeholder="Your name" />
              </Field>
              <Field label="Role" htmlFor="role" error={errors.role?.message}>
                <Input id="role" {...register("role")} placeholder="e.g. COO" />
              </Field>
              <Field label="Work email" htmlFor="email" required error={errors.email?.message}>
                <Input id="email" type="email" aria-invalid={!!errors.email} {...register("email")} placeholder="you@company.com" />
              </Field>
            </div>
          </StepShell>
        )}

        {step === 1 && (
          <StepShell
            title="Which systems hold operational data?"
            hint="Select all that apply. This is an inventory only — no data is shared."
          >
            <Controller
              control={control}
              name="systems"
              render={({ field }) => (
                <Field error={errors.systems?.message as string | undefined}>
                  <div className="flex flex-wrap gap-2.5">
                    {systemOptions.map((o) => {
                      const set = new Set(field.value ?? []);
                      const checked = set.has(o.value);
                      return (
                        <ChoiceChip
                          key={o.value}
                          checked={checked}
                          onChange={(on) => {
                            if (on) set.add(o.value);
                            else set.delete(o.value);
                            field.onChange([...set]);
                          }}
                        >
                          {o.label}
                        </ChoiceChip>
                      );
                    })}
                  </div>
                </Field>
              )}
            />
          </StepShell>
        )}

        {step === 2 && (
          <StepShell title="Operational history">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Years of operational history" htmlFor="history_years" error={errors.history_years?.message}>
                <Input id="history_years" {...register("history_years")} placeholder="e.g. 6" />
              </Field>
              <Field label="Approximate data volume" htmlFor="estimated_volume" error={errors.estimated_volume?.message}>
                <Input id="estimated_volume" {...register("estimated_volume")} placeholder="e.g. ~250k conversations" />
              </Field>
              <Field label="Employees represented" htmlFor="employees_represented" error={errors.employees_represented?.message}>
                <Input id="employees_represented" {...register("employees_represented")} placeholder="e.g. 300" />
              </Field>
              <Field label="Customers represented" htmlFor="customers_represented" error={errors.customers_represented?.message}>
                <Input id="customers_represented" {...register("customers_represented")} placeholder="e.g. 4,000" />
              </Field>
              <Field label="Which workflows are richest?" htmlFor="workflow_types" className="sm:col-span-2" error={errors.workflow_types?.message}>
                <Textarea id="workflow_types" {...register("workflow_types")} placeholder="e.g. Customer issue → investigation → escalation → resolution" />
              </Field>
            </div>
          </StepShell>
        )}

        {step === 3 && (
          <StepShell title="Willingness & constraints">
            <div className="grid gap-5 sm:grid-cols-2">
              <Controller
                control={control}
                name="licensing_interest"
                render={({ field }) => (
                  <Field label="Would you consider licensing selected historical data?" required error={errors.licensing_interest?.message}>
                    <SelectInput value={field.value} onValueChange={field.onChange} options={licensingInterestOptions} placeholder="Choose" invalid={!!errors.licensing_interest} />
                  </Field>
                )}
              />
              <Controller
                control={control}
                name="license_preference"
                render={({ field }) => (
                  <Field label="One-time or recurring?">
                    <SelectInput value={field.value} onValueChange={field.onChange} options={licensePreferenceOptions} placeholder="Choose" />
                  </Field>
                )}
              />
              <Field label="Data you would NOT consider sharing" htmlFor="excluded_data" className="sm:col-span-2" error={errors.excluded_data?.message}>
                <Textarea id="excluded_data" {...register("excluded_data")} placeholder="Categories, systems, or content to exclude." />
              </Field>
              <Field label="Geographic / residency constraints" htmlFor="residency_constraints" error={errors.residency_constraints?.message}>
                <Input id="residency_constraints" {...register("residency_constraints")} placeholder="e.g. US residency" />
              </Field>
              <Field label="Security requirements" htmlFor="security_requirements" error={errors.security_requirements?.message}>
                <Input id="security_requirements" {...register("security_requirements")} placeholder="e.g. SOC 2, DPA" />
              </Field>
              <Field label="Additional notes" htmlFor="notes" className="sm:col-span-2" error={errors.notes?.message}>
                <Textarea id="notes" {...register("notes")} placeholder="Anything else we should know." />
              </Field>
            </div>
            <p className="mt-5 rounded-xl border border-line bg-paper p-4 text-xs text-graphite">
              Do not upload or paste any actual data. This form captures interest
              and metadata only.
            </p>
          </StepShell>
        )}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0 || isSubmitting}
          className={step === 0 ? "invisible" : ""}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        {!isLast ? (
          <Button type="button" onClick={next}>
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting…" : "Explore this opportunity"}
            <Send className="h-4 w-4" />
          </Button>
        )}
      </div>
    </form>
  );
}

function StepShell({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="display text-2xl md:text-3xl">{title}</h2>
      {hint && <p className="lede mt-2 text-sm">{hint}</p>}
      <div className="mt-7">{children}</div>
    </div>
  );
}
