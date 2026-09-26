"use client";

/**
 * Signature homepage visual — "from information to experience".
 * Faint information fragments drift toward a drawn arc; along the arc sit the
 * operational systems where organizational data lives; the arc's leading node
 * is the AI system it feeds. Pure SVG/CSS, deterministic (no hydration drift),
 * and frozen to its final composed state under prefers-reduced-motion
 * (handled globally in globals.css).
 */

const ARC_PATH =
  "M 24 548 C 210 542 322 468 424 356 C 516 256 600 176 744 96";

const fragments = [
  { x: 34, y: 520, d: 0 },
  { x: 62, y: 486, d: 0.5 },
  { x: 30, y: 452, d: 1.1 },
  { x: 88, y: 512, d: 0.8 },
  { x: 58, y: 430, d: 1.6 },
  { x: 104, y: 470, d: 0.3 },
  { x: 130, y: 500, d: 1.3 },
  { x: 44, y: 402, d: 2.0 },
  { x: 96, y: 420, d: 0.9 },
  { x: 148, y: 452, d: 1.9 },
  { x: 74, y: 376, d: 1.4 },
  { x: 122, y: 396, d: 2.3 },
  { x: 168, y: 486, d: 0.6 },
  { x: 20, y: 486, d: 1.7 },
];

const systems = [
  { x: 236, y: 452, label: "Slack" },
  { x: 316, y: 404, label: "Support" },
  { x: 398, y: 350, label: "Jira" },
  { x: 486, y: 292, label: "CRM" },
  { x: 566, y: 232, label: "GitHub" },
  { x: 648, y: 170, label: "Docs" },
];

export function HeroArc() {
  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 760 600"
        fill="none"
        role="img"
        aria-label="Information fragments converging along an arc into the operational systems where organizations work, then into an AI system."
        className="h-auto w-full overflow-visible"
      >
        <style>{`
          .fa-arc { stroke-dasharray: 1200; stroke-dashoffset: 1200; animation: arc-draw 2.4s cubic-bezier(0.22,1,0.36,1) 0.2s forwards; }
          .fa-frag { animation: node-drift 6s ease-in-out infinite; }
          .fa-node { opacity: 0; animation: fade-up 0.7s ease-out forwards; }
          .fa-travel { offset-path: path('${ARC_PATH}'); offset-rotate: 0deg; animation: fa-travel 7s linear 2s infinite; }
          .fa-pulse { transform-box: fill-box; transform-origin: center; animation: pulse-soft 3s ease-in-out infinite; }
          @keyframes fa-travel { from { offset-distance: 0%; } to { offset-distance: 100%; } }
        `}</style>

        {/* faint guide rings, cropped */}
        <g className="text-line" stroke="currentColor">
          <circle cx="744" cy="96" r="150" opacity="0.35" />
          <circle cx="744" cy="96" r="250" opacity="0.18" />
        </g>

        {/* information fragments (public information) */}
        <g className="text-ink">
          {fragments.map((f, i) => (
            <rect
              key={i}
              className="fa-frag"
              x={f.x}
              y={f.y}
              width="14"
              height="3"
              rx="1.5"
              fill="currentColor"
              opacity="0.22"
              style={{ animationDelay: `${f.d}s` }}
            />
          ))}
        </g>

        {/* the arc */}
        <path
          className="fa-arc"
          d={ARC_PATH}
          stroke="var(--accent)"
          strokeWidth="1.75"
          strokeLinecap="round"
        />

        {/* traveling data node */}
        <circle className="fa-travel" r="4" fill="var(--accent)" />

        {/* system nodes along the arc */}
        {systems.map((s, i) => (
          <g
            key={s.label}
            className="fa-node"
            style={{ animationDelay: `${0.9 + i * 0.18}s` }}
          >
            <circle cx={s.x} cy={s.y} r="5" fill="var(--paper)" stroke="var(--accent)" strokeWidth="1.5" />
            <circle cx={s.x} cy={s.y} r="1.8" fill="var(--accent)" />
            <text
              x={s.x + 12}
              y={s.y + 4}
              fill="var(--graphite)"
              style={{
                fontFamily: "var(--font-space-mono), monospace",
                fontSize: "12px",
                letterSpacing: "0.06em",
              }}
            >
              {s.label}
            </text>
          </g>
        ))}

        {/* AI terminal node */}
        <g className="fa-node" style={{ animationDelay: "2.1s" }}>
          <circle className="fa-pulse" cx="744" cy="96" r="16" fill="var(--accent)" opacity="0.16" />
          <circle cx="744" cy="96" r="8" fill="var(--accent)" />
          <text
            x="744"
            y="72"
            textAnchor="middle"
            fill="var(--accent-strong)"
            style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: "12px",
              letterSpacing: "0.14em",
            }}
          >
            AI
          </text>
        </g>

        {/* editorial anchor labels */}
        <text
          x="24"
          y="586"
          fill="var(--graphite-dim)"
          style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "11px", letterSpacing: "0.14em" }}
        >
          PUBLIC INFORMATION
        </text>
      </svg>
    </div>
  );
}
