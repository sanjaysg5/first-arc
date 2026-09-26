"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { systemOptions } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Homepage supplier on-ramp: pick the systems your operating history lives in,
 * then jump into the licensing enquiry with those pre-selected (via query
 * param). No data is captured here — it only pre-fills the form.
 */
export function SystemPicker() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (value: string) =>
    setSelected((s) =>
      s.includes(value) ? s.filter((v) => v !== value) : [...s, value],
    );

  const go = () => {
    const qs = selected.length ? `?systems=${selected.join(",")}` : "";
    router.push(`/license-data${qs}`);
  };

  const options = systemOptions.filter((o) => o.value !== "other");

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((o) => {
          const checked = selected.includes(o.value);
          return (
            <button
              key={o.value}
              type="button"
              role="checkbox"
              aria-checked={checked}
              onClick={() => toggle(o.value)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm transition-colors",
                checked
                  ? "border-accent bg-accent-soft text-accent-ink"
                  : "border-line bg-card text-ink hover:border-line-strong",
              )}
            >
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border",
                  checked ? "border-accent bg-accent" : "border-line-strong",
                )}
              >
                {checked && <Check className="h-3.5 w-3.5 text-white" />}
              </span>
              {o.label}
            </button>
          );
        })}
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button onClick={go} size="lg" variant="primary" className="font-semibold">
          Explore licensing
          {selected.length > 0 ? ` (${selected.length})` : ""}
          <ArrowRight className="h-4 w-4" />
        </Button>
        <span className="text-sm text-graphite">
          No obligation. Nothing you select leaves this page until you submit.
        </span>
      </div>
    </div>
  );
}
