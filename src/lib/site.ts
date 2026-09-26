/** Central site configuration: navigation, CTAs, contact. */

export const siteConfig = {
  name: "First Arc",
  tagline: "The first arc of organizational intelligence.",
  description:
    "We turn how organizations work into permissioned data for AI.",
  contactEmail: "hello@firstarc.ai",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://firstarc.ai",
} as const;

export const mainNav = [
  { label: "For AI Buyers", href: "/for-buyers" },
  { label: "For Companies", href: "/for-companies" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
] as const;

export const cta = {
  buyer: { label: "Tell us what you need", href: "/request-data" },
  supplier: { label: "License your data", href: "/license-data" },
  buyerShort: { label: "Describe your data need", href: "/request-data" },
  supplierShort: { label: "Explore licensing", href: "/license-data" },
} as const;

export const footerNav = {
  product: [
    { label: "For AI Buyers", href: "/for-buyers" },
    { label: "For Companies", href: "/for-companies" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Licensing Models", href: "/business-model" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
} as const;
