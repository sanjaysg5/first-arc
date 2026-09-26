"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Option } from "@/lib/constants";

/** Branded single-select built on Radix Select, RHF-friendly. */
export function SelectInput({
  value,
  onValueChange,
  options,
  placeholder = "Choose an option",
  id,
  invalid,
  name,
}: {
  value?: string;
  onValueChange: (value: string) => void;
  options: readonly Option[];
  placeholder?: string;
  id?: string;
  invalid?: boolean;
  name?: string;
}) {
  return (
    <SelectPrimitive.Root value={value || undefined} onValueChange={onValueChange} name={name}>
      <SelectPrimitive.Trigger
        id={id}
        aria-invalid={invalid}
        className={cn(
          "flex h-12 w-full items-center justify-between rounded-xl border border-line bg-card px-4 text-left text-ink outline-none transition-colors",
          "data-[placeholder]:text-graphite-dim",
          "focus:border-accent focus:ring-4 focus:ring-accent/10",
          "aria-[invalid=true]:border-red-500",
        )}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon>
          <ChevronDown className="h-4 w-4 text-graphite" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={6}
          className={cn(
            "z-50 max-h-72 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xl border border-line bg-card shadow-lg",
          )}
        >
          <SelectPrimitive.Viewport className="p-1.5">
            {options.map((o) => (
              <SelectPrimitive.Item
                key={o.value}
                value={o.value}
                className={cn(
                  "relative flex cursor-pointer select-none items-center rounded-lg py-2.5 pl-3 pr-8 text-sm text-ink outline-none",
                  "data-[highlighted]:bg-accent-soft data-[highlighted]:text-accent-ink",
                )}
              >
                <SelectPrimitive.ItemText>{o.label}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="absolute right-2.5">
                  <Check className="h-4 w-4 text-accent" />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
