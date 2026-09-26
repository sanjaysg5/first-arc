import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { SupplierRequestForm } from "@/components/forms/supplier-request-form";
import { systemOptions } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Explore licensing your data",
  description:
    "Explore whether selected operational data can be responsibly licensed for AI — while you retain ownership of the underlying business.",
};

export default async function LicenseDataPage({
  searchParams,
}: {
  searchParams: Promise<{ systems?: string }>;
}) {
  const { systems } = await searchParams;
  const valid = new Set<string>(systemOptions.map((o) => o.value));
  const defaultSystems = (systems ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter((v) => valid.has(v));

  return (
    <>
      <PageHero
        eyebrow="For companies"
        title={
          <>
            Your operational history may be an{" "}
            <span className="text-accent">AI data asset</span>.
          </>
        }
        subtitle="Explore licensing selected operational data while retaining ownership of the underlying business — subject to appropriate contractual, privacy, and security controls. No data is shared by submitting this form."
      />
      <section className="border-b border-line">
        <div className="container-arc py-14 md:py-20">
          <div className="mx-auto max-w-3xl">
            <p className="mb-6 text-sm text-graphite">
              4 steps · about two minutes. Your details are reviewed privately,
              never published.
            </p>
            <SupplierRequestForm defaultSystems={defaultSystems} />
          </div>
        </div>
      </section>
    </>
  );
}
