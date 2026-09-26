import { cn } from "@/lib/utils";

/** Label + hint + error wrapper for a form control. */
export function Field({
  label,
  htmlFor,
  hint,
  error,
  required,
  children,
  className,
}: {
  label?: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="block text-sm font-medium text-ink-soft"
        >
          {label}
          {required && <span className="text-accent"> *</span>}
        </label>
      )}
      {children}
      {hint && !error && <p className="text-xs text-graphite">{hint}</p>}
      {error && (
        <p className="text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
