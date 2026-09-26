"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "h-5 w-5 shrink-0 rounded-md border border-line-strong bg-card outline-none transition-colors",
      "data-[state=checked]:border-accent data-[state=checked]:bg-accent",
      "focus-visible:ring-4 focus-visible:ring-accent/10",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center">
      <Check className="h-3.5 w-3.5 text-white" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = "Checkbox";

/** Toggle chip for multi-select groups. */
export function ChoiceChip({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors",
        checked
          ? "border-accent bg-accent-soft text-accent-ink"
          : "border-line bg-card text-ink hover:border-line-strong",
      )}
    >
      <span
        className={cn(
          "flex h-4 w-4 items-center justify-center rounded-full border",
          checked ? "border-accent bg-accent" : "border-line-strong",
        )}
      >
        {checked && <Check className="h-3 w-3 text-white" />}
      </span>
      {children}
    </button>
  );
}
