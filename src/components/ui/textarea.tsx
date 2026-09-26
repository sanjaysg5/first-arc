import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "min-h-28 w-full rounded-xl border border-line bg-card px-4 py-3 text-ink outline-none transition-colors",
      "placeholder:text-graphite-dim",
      "focus:border-accent focus:ring-4 focus:ring-accent/10",
      "aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-500/10",
      "disabled:cursor-not-allowed disabled:opacity-60",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
