import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { SupplierRequestForm } from "@/components/forms/supplier-request-form";

export const metadata: Metadata = {
  title: "Explore licensing your data",
  description:
    "Explore whether selected operational data can be responsibly licensed for AI — while you retain ownership of the underlying business.",
};

export default function LicenseDataPage() {
  return (
    <>
      <PageHero
        eyebrow="For companies"
        title={
          <>
            Your operational history may be an{" "}
            <em className="text-accent">AI data asset</em>.
          </>
        }
        subtitle="Explore licensing selected operational data while retaining ownership of the underlying business — subject to appropriate contractual, privacy, and security controls. No data is shared by submitting this form."
      />
      <section className="border-b border-line">
        <div className="container-arc py-14 md:py-20">
          <div className="mx-auto max-w-3xl">
            <SupplierRequestForm />
          </div>
        </div>
      </section>
    </>
  );
}
