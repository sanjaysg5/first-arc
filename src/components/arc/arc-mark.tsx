import { cn } from "@/lib/utils";

/**
 * The First Arc brand symbol: a cropped 270° arc with a leading node —
 * an incomplete curve that implies continuation ("the first arc").
 * Stroke inherits `currentColor`; the node can be tinted with `nodeClassName`.
 */
export function ArcMark({
  className,
  nodeClassName,
  strokeWidth = 2,
}: {
  className?: string;
  nodeClassName?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn("h-6 w-6", className)}
    >
      {/* faint inner concentric arc */}
      <path
        d="M12 6.5 A 5.5 5.5 0 1 1 6.5 12"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.7}
        strokeLinecap="round"
        opacity="0.32"
      />
      {/* primary arc */}
      <path
        d="M12 3 A 9 9 0 1 1 3 12"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* leading node */}
      <circle cx="12" cy="3" r="2.1" className={cn("fill-accent", nodeClassName)} />
    </svg>
  );
}
