import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: number | string;
  hint?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-6",
        accent ? "border-accent/20 bg-accent-soft" : "border-line bg-card",
      )}
    >
      <p className="eyebrow eyebrow-muted">{label}</p>
      <p className="numeral mt-4 text-4xl text-ink">{value}</p>
      {hint && <p className="mt-1 text-xs text-graphite">{hint}</p>}
    </div>
  );
}
