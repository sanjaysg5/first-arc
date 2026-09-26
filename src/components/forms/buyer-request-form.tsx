"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import { buyerRequestSchema, type BuyerRequestInput } from "@/lib/validation";
import { submitBuyerRequest } from "@/app/actions/leads";
import {
  buildingOptions,
  improvementOptions,
  budgetOptions,
  historicalOrOngoingOptions,
  recurringOptions,
} from "@/lib/constants";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SelectInput } from "@/components/ui/select";
import { Checkbox, ChoiceChip } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { StepProgress } from "@/components/forms/step-progress";
import { Honeypot, FormSuccess } from "@/components/forms/shared";

const STEPS = ["About you", "Building", "Goals", "Requirement", "Commercial"];

const fieldsByStep: (keyof BuyerRequestInput)[][] = [
  ["name", "email", "company", "role", "linkedin", "company_website"],
  ["company_type"],
  ["training_stage"],
  [
    "description",
    "industry",
    "workflow",
    "source_systems",
    "volume_requirement",
    "historical_or_ongoing",
    "format",
    "recurring",
    "exclusivity",
    "geography",
    "timeline",
  ],
  ["budget_range", "acknowledge"],
];

export function BuyerRequestForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<BuyerRequestInput>({
    resolver: zodResolver(buyerRequestSchema),
    shouldUnregister: false,
    defaultValues: {
      name: "",
      email: "",
      company: "",
      role: "",
      linkedin: "",
      company_website: "",
      training_stage: [],
      description: "",
      industry: "",
      workflow: "",
      source_systems: "",
      volume_requirement: "",
      historical_or_ongoing: "",
      format: "",
      recurring: "",
      exclusivity: false,
      geography: "",
      timeline: "",
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
    // Include the honeypot in the raw payload; the server re-validates.
    const raw = getValues() as Record<string, unknown>;
    const res = await submitBuyerRequest(raw);
    if (res.ok) {
      setSubmitted(true);
      return;
    }
    if (res.fieldErrors) {
      for (const [name, messages] of Object.entries(res.fieldErrors)) {
        if (messages?.[0]) {
          setError(name as keyof BuyerRequestInput, { message: messages[0] });
        }
      }
    }
    toast.error(res.error);
  }

  if (submitted) {
    return (
      <FormSuccess
        title="Received."
        message="We'll review the request and follow up if we see a relevant match. This is exploratory — it does not guarantee data availability."
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
        {/* Step 0 — About you */}
        {step === 0 && (
          <StepShell
            title="Tell us who you are"
            hint="We reply to work emails within two business days."
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" htmlFor="name" required error={errors.name?.message}>
                <Input id="name" aria-invalid={!!errors.name} {...register("name")} placeholder="Your name" />
              </Field>
              <Field label="Work email" htmlFor="email" required error={errors.email?.message}>
                <Input id="email" type="email" aria-invalid={!!errors.email} {...register("email")} placeholder="you@company.com" />
              </Field>
              <Field label="Company" htmlFor="company" required error={errors.company?.message}>
                <Input id="company" aria-invalid={!!errors.company} {...register("company")} placeholder="Company name" />
              </Field>
              <Field label="Role" htmlFor="role" required error={errors.role?.message}>
                <Input id="role" aria-invalid={!!errors.role} {...register("role")} placeholder="e.g. Head of Data" />
              </Field>
              <Field label="LinkedIn" htmlFor="linkedin" hint="Optional" error={errors.linkedin?.message}>
                <Input id="linkedin" {...register("linkedin")} placeholder="https://linkedin.com/in/…" />
              </Field>
              <Field label="Company website" htmlFor="company_website" hint="Optional" error={errors.company_website?.message}>
                <Input id="company_website" {...register("company_website")} placeholder="https://…" />
              </Field>
            </div>
          </StepShell>
        )}

        {/* Step 1 — Building */}
        {step === 1 && (
          <StepShell title="What are you building?">
            <Controller
              control={control}
              name="company_type"
              render={({ field }) => (
                <Field label="Primary system" required error={errors.company_type?.message}>
                  <SelectInput
                    value={field.value}
                    onValueChange={field.onChange}
                    options={buildingOptions}
                    placeholder="Choose one"
                    invalid={!!errors.company_type}
                  />
                </Field>
              )}
            />
          </StepShell>
        )}

        {/* Step 2 — Goals */}
        {step === 2 && (
          <StepShell
            title="What are you trying to improve?"
            hint="Select all that apply."
          >
            <Controller
              control={control}
              name="training_stage"
              render={({ field }) => (
                <Field error={errors.training_stage?.message as string | undefined}>
                  <div className="flex flex-wrap gap-2.5">
                    {improvementOptions.map((o) => {
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

        {/* Step 3 — Requirement */}
        {step === 3 && (
          <StepShell title="Describe the data you need">
            <div className="space-y-5">
              <Field label="What data do you need?" htmlFor="description" required error={errors.description?.message}>
                <Textarea id="description" aria-invalid={!!errors.description} {...register("description")} placeholder="Describe the workflow, signal, and outcomes you're looking for." />
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Industry / domain" htmlFor="industry" error={errors.industry?.message}>
                  <Input id="industry" {...register("industry")} placeholder="e.g. SaaS, fintech" />
                </Field>
                <Field label="Workflow / task" htmlFor="workflow" error={errors.workflow?.message}>
                  <Input id="workflow" {...register("workflow")} placeholder="e.g. support resolution" />
                </Field>
                <Field label="Preferred source systems" htmlFor="source_systems" error={errors.source_systems?.message}>
                  <Input id="source_systems" {...register("source_systems")} placeholder="e.g. Zendesk, Salesforce" />
                </Field>
                <Field label="Estimated volume" htmlFor="volume_requirement" error={errors.volume_requirement?.message}>
                  <Input id="volume_requirement" {...register("volume_requirement")} placeholder="e.g. 100k+ records" />
                </Field>
                <Controller
                  control={control}
                  name="historical_or_ongoing"
                  render={({ field }) => (
                    <Field label="Historical or ongoing?">
                      <SelectInput value={field.value} onValueChange={field.onChange} options={historicalOrOngoingOptions} placeholder="Choose" />
                    </Field>
                  )}
                />
                <Controller
                  control={control}
                  name="recurring"
                  render={({ field }) => (
                    <Field label="Recurring or one-time?">
                      <SelectInput value={field.value} onValueChange={field.onChange} options={recurringOptions} placeholder="Choose" />
                    </Field>
                  )}
                />
                <Field label="Preferred format" htmlFor="format" error={errors.format?.message}>
                  <Input id="format" {...register("format")} placeholder="e.g. JSONL, parquet" />
                </Field>
                <Field label="Geographic requirements" htmlFor="geography" error={errors.geography?.message}>
                  <Input id="geography" {...register("geography")} placeholder="e.g. US, EU" />
                </Field>
                <Field label="Timeline" htmlFor="timeline" error={errors.timeline?.message}>
                  <Input id="timeline" {...register("timeline")} placeholder="e.g. this quarter" />
                </Field>
              </div>
              <Controller
                control={control}
                name="exclusivity"
                render={({ field }) => (
                  <label className="flex cursor-pointer items-center gap-3 text-sm text-ink">
                    <Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(v === true)} />
                    Exclusivity required
                  </label>
                )}
              />
            </div>
          </StepShell>
        )}

        {/* Step 4 — Commercial */}
        {step === 4 && (
          <StepShell title="Commercial context">
            <div className="space-y-6">
              <Controller
                control={control}
                name="budget_range"
                render={({ field }) => (
                  <Field label="Indicative budget range" required error={errors.budget_range?.message}>
                    <SelectInput value={field.value} onValueChange={field.onChange} options={budgetOptions} placeholder="Choose a range" invalid={!!errors.budget_range} />
                  </Field>
                )}
              />
              <Controller
                control={control}
                name="acknowledge"
                render={({ field }) => (
                  <Field error={errors.acknowledge?.message}>
                    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-paper p-4 text-sm text-ink-soft">
                      <Checkbox className="mt-0.5" checked={!!field.value} onCheckedChange={(v) => field.onChange(v === true)} />
                      I understand this is an exploratory request and does not guarantee data availability.
                    </label>
                  </Field>
                )}
              />
            </div>
          </StepShell>
        )}
      </div>

      {/* Nav */}
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
            {isSubmitting ? "Submitting…" : "Submit data request"}
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
