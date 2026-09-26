import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { BuyerRequestForm } from "@/components/forms/buyer-request-form";

export const metadata: Metadata = {
  title: "Submit a data request",
  description:
    "Tell us the proprietary enterprise data your AI system is missing. We source against a defined need, not a static catalog.",
};

export default function RequestDataPage() {
  return (
    <>
      <PageHero
        eyebrow="For AI buyers"
        title={
          <>
            Tell us the data your <em className="text-accent">AI system</em> is
            missing.
          </>
        }
        subtitle="We work with AI teams sourcing proprietary enterprise data for training, post-training, evaluation, agent development, and workflow simulation. You won't be forced to pick from a static catalog."
      />
      <section className="border-b border-line">
        <div className="container-arc py-14 md:py-20">
          <div className="mx-auto max-w-3xl">
            <BuyerRequestForm />
          </div>
        </div>
      </section>
    </>
  );
}
