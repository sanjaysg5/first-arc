import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/util/reveal";
import { cta } from "@/lib/site";
import { principles } from "@/lib/content";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "From company to capable AI, responsibly. How First Arc turns selected operational data into permissioned, privacy-aware datasets for AI teams.",
};

const pipeline = [
  {
    n: "01",
    title: "Data inventory",
    blurb:
      "We map what operational data exists, where it lives, and what could be considered for licensing.",
  },
  {
    n: "02",
    title: "Rights & permission review",
    blurb:
      "Ownership, contractual rights, consent, and commercial constraints are established before anything moves.",
  },
  {
    n: "03",
    title: "Secure extraction",
    blurb:
      "Selected data is extracted through controlled, access-limited processes.",
  },
  {
    n: "04",
    title: "Sensitive-data detection",
    blurb:
      "Personal, confidential, and regulated content is identified through automated and reviewed methods.",
  },
  {
    n: "05",
    title: "De-identification / transformation",
    blurb:
      "Data is de-identified and restructured where appropriate for its intended use.",
  },
  {
    n: "06",
    title: "Quality assessment",
    blurb:
      "Signal, completeness, and structure are assessed — value is not measured in volume alone.",
  },
  {
    n: "07",
    title: "Dataset creation",
    blurb:
      "Curated, documented datasets are assembled with provenance preserved.",
  },
  {
    n: "08",
    title: "Buyer matching",
    blurb:
      "Datasets are matched to qualified AI buyers with a defined, legitimate need.",
  },
  {
    n: "09",
    title: "License",
    blurb:
      "Access is granted under defined licensing terms and usage boundaries.",
  },
  {
    n: "10",
    title: "Controlled delivery",
    blurb:
      "Data is delivered through controlled channels appropriate to its sensitivity.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title={
          <>
            From company to <span className="text-accent">capable AI</span> —
            responsibly.
          </>
        }
        subtitle="A deliberate pipeline that turns selected operational history into permissioned, privacy-aware datasets — with rights and review at every step."
      />

      {/* ============================ PIPELINE ============================ */}
      <section className="border-b border-line">
        <div className="container-arc py-20 md:py-28">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">The pipeline</p>
            <h2 className="display mt-6 text-[clamp(2rem,4.4vw,3.3rem)]">
              Ten steps from inventory to delivery.
            </h2>
          </Reveal>

          <ol className="mt-16">
            {pipeline.map((step, i) => (
              <Reveal
                as="li"
                key={step.n}
                delay={(i % 3) * 60}
                className="grid grid-cols-[auto_1fr] gap-6 md:gap-10"
              >
                <div className="flex flex-col items-center">
                  <span className="numeral flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line-strong bg-card text-sm text-accent">
                    {step.n}
                  </span>
                  {i < pipeline.length - 1 && (
                    <span aria-hidden className="w-px flex-1 bg-line" />
                  )}
                </div>
                <div className={i < pipeline.length - 1 ? "pb-12" : ""}>
                  <h3 className="display text-2xl">{step.title}</h3>
                  <p className="lede mt-2 max-w-xl text-[0.98rem]">
                    {step.blurb}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>

          {/* Processing note */}
          <Reveal className="mt-6 flex max-w-2xl items-start gap-4 rounded-2xl border border-line-strong bg-accent-soft p-6">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <p className="text-[0.98rem] leading-relaxed text-ink-soft">
              Specific processing methods depend on the data, contractual rights,
              jurisdiction and buyer requirements.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================= TRUST ============================= */}
      <section className="border-b border-line bg-paper-dim">
        <div className="container-arc py-20 md:py-28">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Principles</p>
            <h2 className="display mt-6 text-[clamp(2rem,4.4vw,3.3rem)]">
              What guides every dataset.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div className="h-px w-full bg-line-strong">
                  <div className="h-px w-10 bg-accent" />
                </div>
                <h3 className="display mt-5 text-2xl">{p.title}</h3>
                <p className="lede mt-3 text-[0.96rem]">{p.blurb}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ DUAL CTA ============================ */}
      <section className="border-b border-line">
        <div className="container-arc py-20 md:py-28">
          <Reveal className="max-w-3xl">
            <h2 className="display text-[clamp(2.2rem,5vw,3.8rem)]">
              Tell us what you need. Or tell us what you have.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <Reveal className="flex flex-col rounded-2xl border border-line bg-accent-soft p-8 md:p-10">
              <p className="eyebrow">AI buyers</p>
              <p className="display mt-5 text-2xl">
                Describe the dataset or capability you are looking for.
              </p>
              <div className="mt-8">
                <Button asChild>
                  <Link href={cta.buyer.href}>
                    Submit a data request
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Reveal>

            <Reveal
              delay={120}
              className="flex flex-col rounded-2xl border border-line bg-card p-8 md:p-10"
            >
              <p className="eyebrow eyebrow-muted">Companies</p>
              <p className="display mt-5 text-2xl">
                Explore whether selected operational data can be licensed.
              </p>
              <div className="mt-8">
                <Button asChild variant="outline">
                  <Link href={cta.supplier.href}>
                    Explore licensing
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
