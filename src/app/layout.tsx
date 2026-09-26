import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/site/site-chrome";
import { Toaster } from "@/components/ui/toaster";

// Single app-wide typeface (Twitter/Chirp-style). Chirp is proprietary; Inter
// is the standard free substitute. No italic styles are loaded.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://firstarc.ai";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "First Arc — Permissioned Enterprise Data for AI",
    template: "%s — First Arc",
  },
  description:
    "First Arc helps AI teams access permissioned operational data from real organizations for training, evaluation and agent development.",
  keywords: [
    "enterprise training data",
    "operational data for AI",
    "AI training datasets",
    "enterprise data licensing",
    "agent training data",
    "AI evaluation datasets",
    "workflow data",
    "enterprise AI data",
  ],
  authors: [{ name: "First Arc" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "First Arc",
    title: "First Arc — Permissioned Enterprise Data for AI",
    description:
      "The first arc of organizational intelligence. Permissioned operational data for AI training, evaluation and agent development.",
  },
  twitter: {
    card: "summary_large_image",
    title: "First Arc — Permissioned Enterprise Data for AI",
    description:
      "The first arc of organizational intelligence. Permissioned operational data for AI.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f4f1ea",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <SiteChrome>{children}</SiteChrome>
        <Toaster />
      </body>
    </html>
  );
}
