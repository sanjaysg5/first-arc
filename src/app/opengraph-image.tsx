import { ImageResponse } from "next/og";

export const alt = "First Arc — Permissioned Enterprise Data for AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f4f1ea",
          padding: "72px",
          position: "relative",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Concentric arc rings, cropped off the right edge */}
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -220,
            width: 760,
            height: 760,
            borderRadius: 760,
            border: "2px solid #ddd7c9",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 560,
            height: 560,
            borderRadius: 560,
            border: "2px solid #1f5a7a",
            opacity: 0.5,
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 28,
              border: "3px solid #0e1519",
              borderTopColor: "#1f5a7a",
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 26,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "#0e1519",
              fontFamily: "sans-serif",
            }}
          >
            First Arc
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.22em",
              color: "#1f5a7a",
              fontFamily: "sans-serif",
              marginBottom: 24,
            }}
          >
            ENTERPRISE DATA × AI
          </div>
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.04,
              color: "#1f5a7a",
              fontStyle: "italic",
            }}
          >
            The first arc
          </div>
          <div style={{ fontSize: 76, lineHeight: 1.04, color: "#0e1519" }}>
            of organizational intelligence.
          </div>
        </div>

        <div
          style={{
            fontSize: 24,
            color: "#59616a",
            fontFamily: "sans-serif",
          }}
        >
          Permissioned operational data for AI training &amp; evaluation.
        </div>
      </div>
    ),
    { ...size },
  );
}
