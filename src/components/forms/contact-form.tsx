"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/validation";
import { submitContact } from "@/app/actions/leads";
import { contactTypeOptions } from "@/lib/constants";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SelectInput } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Honeypot, FormSuccess } from "@/components/forms/shared";

export function ContactForm({ defaultType }: { defaultType?: string }) {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      type: (defaultType as ContactInput["type"]) ?? undefined,
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const {
    register,
    control,
    getValues,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = form;

  async function onValid() {
    const raw = getValues() as Record<string, unknown>;
    const res = await submitContact(raw);
    if (res.ok) {
      setSubmitted(true);
      return;
    }
    if (res.fieldErrors) {
      for (const [name, messages] of Object.entries(res.fieldErrors)) {
        if (messages?.[0]) {
          setError(name as keyof ContactInput, { message: messages[0] });
        }
      }
    }
    toast.error(res.error);
  }

  if (submitted) {
    return (
      <FormSuccess
        title="Message sent."
        message="Thanks for reaching out. We reply within two business days."
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="space-y-5 rounded-2xl border border-line bg-card p-6 md:p-8"
      noValidate
    >
      <Honeypot register={register} />

      <Controller
        control={control}
        name="type"
        render={({ field }) => (
          <Field label="I want to" required error={errors.type?.message}>
            <SelectInput
              value={field.value}
              onValueChange={field.onChange}
              options={contactTypeOptions}
              placeholder="Choose an option"
              invalid={!!errors.type}
            />
          </Field>
        )}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="c_name" required error={errors.name?.message}>
          <Input id="c_name" aria-invalid={!!errors.name} {...register("name")} placeholder="Your name" />
        </Field>
        <Field label="Work email" htmlFor="c_email" required error={errors.email?.message}>
          <Input id="c_email" type="email" aria-invalid={!!errors.email} {...register("email")} placeholder="you@company.com" />
        </Field>
      </div>

      <Field label="Company" htmlFor="c_company" error={errors.company?.message}>
        <Input id="c_company" {...register("company")} placeholder="Company name" />
      </Field>

      <Field label="Tell us a little more" htmlFor="c_message" required error={errors.message?.message}>
        <Textarea id="c_message" aria-invalid={!!errors.message} {...register("message")} placeholder="Describe your dataset, model requirement, or partnership idea." className="min-h-32" />
      </Field>

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? "Sending…" : "Get in touch"}
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}
