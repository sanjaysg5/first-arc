import { cn } from "@/lib/utils";

export type BadgeTone =
  | "neutral"
  | "accent"
  | "positive"
  | "warning"
  | "danger"
  | "info";

const toneClasses: Record<BadgeTone, string> = {
  neutral: "bg-paper-dim text-graphite border-line",
  accent: "bg-accent-soft text-accent-ink border-accent/20",
  positive: "bg-green-50 text-green-700 border-green-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  danger: "bg-red-50 text-red-700 border-red-200",
  info: "bg-sky-50 text-sky-700 border-sky-200",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: BadgeTone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Map a lead/asset/match status to a badge tone. */
export function statusTone(status: string): BadgeTone {
  switch (status) {
    case "new":
    case "suggested":
    case "discovered":
      return "info";
    case "qualified":
    case "available":
    case "licensed":
    case "closed":
      return "positive";
    case "discovery":
    case "reviewing":
    case "under_review":
    case "introduced":
      return "warning";
    case "matched":
    case "pilot":
      return "accent";
    case "rejected":
      return "danger";
    default:
      return "neutral";
  }
}
