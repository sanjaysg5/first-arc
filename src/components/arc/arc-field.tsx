import { cn } from "@/lib/utils";

type Preset = "rings" | "trajectory" | "concentric";

/**
 * Decorative arc backdrop. Non-interactive, inherits `currentColor`.
 * Position + crop with the parent (`relative overflow-hidden`) and place
 * this with utility classes via `className`.
 */
export function ArcField({
  preset = "rings",
  className,
  animate = false,
}: {
  preset?: Preset;
  className?: string;
  animate?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 600 600"
      fill="none"
      aria-hidden="true"
      className={cn("pointer-events-none absolute select-none text-line", className)}
    >
      {preset === "rings" && (
        <g stroke="currentColor" strokeWidth="1">
          <circle cx="300" cy="300" r="120" opacity="0.9" />
          <circle cx="300" cy="300" r="200" opacity="0.55" />
          <circle cx="300" cy="300" r="290" opacity="0.3" />
          <circle cx="420" cy="180" r="4" className="fill-accent" stroke="none" />
        </g>
      )}

      {preset === "concentric" && (
        <g stroke="currentColor" fill="none">
          {/* nested partial arcs, cropped */}
          <path d="M40 560 A 260 260 0 0 1 300 300" strokeWidth="1" opacity="0.8" />
          <path d="M40 560 A 360 360 0 0 1 400 200" strokeWidth="1" opacity="0.5" />
          <path d="M40 560 A 460 460 0 0 1 500 100" strokeWidth="1" opacity="0.28" />
          <circle cx="300" cy="300" r="4" className="fill-accent" stroke="none" />
        </g>
      )}

      {preset === "trajectory" && (
        <g fill="none">
          <path
            d="M-20 500 C 160 460, 280 300, 620 140"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeDasharray={animate ? "4 8" : undefined}
            className={animate ? "[stroke-dashoffset:0]" : undefined}
          />
          <circle cx="160" cy="418" r="3.5" className="fill-accent" />
          <circle cx="330" cy="286" r="3.5" className="fill-accent" opacity="0.7" />
          <circle cx="500" cy="205" r="3.5" className="fill-accent" opacity="0.45" />
        </g>
      )}
    </svg>
  );
}
