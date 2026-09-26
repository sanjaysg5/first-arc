"use client";

import { Toaster as Sonner } from "sonner";

/** App-wide toast portal, themed to the First Arc palette. */
export function Toaster() {
  return (
    <Sonner
      position="bottom-right"
      toastOptions={{
        style: {
          background: "var(--card)",
          color: "var(--ink)",
          border: "1px solid var(--line)",
          borderRadius: "0.75rem",
          fontFamily: "var(--font-space-grotesk), sans-serif",
        },
      }}
    />
  );
}
