import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/** Numbered step indicator with a connecting rule (the "arc" of the form). */
export function StepProgress({
  steps,
  current,
}: {
  steps: string[];
  current: number;
}) {
  return (
    <ol className="flex flex-wrap items-center gap-y-3">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={label} className="flex items-center">
            <span
              className={cn(
                "grid h-8 w-8 place-items-center rounded-full border text-xs font-medium transition-colors",
                done && "border-accent bg-accent text-white",
                active && "border-accent text-accent",
                !done && !active && "border-line text-graphite",
              )}
            >
              {done ? <Check className="h-4 w-4" /> : i + 1}
            </span>
            <span
              className={cn(
                "ml-2 hidden text-xs sm:block",
                active ? "text-ink" : "text-graphite",
              )}
            >
              {label}
            </span>
            {i < steps.length - 1 && (
              <span
                className={cn(
                  "mx-2 h-px w-6 sm:w-8",
                  done ? "bg-accent" : "bg-line",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
