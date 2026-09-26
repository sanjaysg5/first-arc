import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How First Arc handles information on this site — what we collect, how we use it, and how long we keep it.",
};

const sections = [
  {
    heading: "What we collect",
    paras: [
      "We collect only what we need to respond to enquiries and operate this site: contact and lead information you submit (such as your name, work email, company, and the details of your request), and standard technical metadata (such as pages visited and general device information).",
      "We do not collect, request, or receive raw enterprise data through this website. Any evaluation of operational data happens later, under a separate agreement and appropriate legal, privacy, and security review.",
    ],
  },
  {
    heading: "How we use it",
    paras: [
      "We use the information you provide to respond to your enquiry, to understand whether there is a credible path forward, and to improve how this site works. We do not sell personal information.",
    ],
  },
  {
    heading: "Data retention",
    paras: [
      "We retain lead and contact information for as long as needed to pursue a potential engagement or to meet legal and operational requirements, after which it is deleted or de-identified.",
    ],
  },
  {
    heading: "Contact",
    paras: [
      "For any question about this policy or the information we hold, please get in touch and we will respond promptly.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="This page explains, in plain terms, how we handle information submitted through this website."
      />

      {/* TODO: Placeholder copy — to be reviewed and finalized by legal counsel before launch. */}
      <section className="border-b border-line">
        <div className="container-arc py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-graphite">
              Last updated: September 2026
            </p>

            <div className="mt-12 space-y-12">
              {sections.map((s) => (
                <div key={s.heading}>
                  <h2 className="display text-2xl md:text-[1.7rem]">
                    {s.heading}
                  </h2>
                  <div className="mt-4 space-y-4">
                    {s.paras.map((p, i) => (
                      <p key={i} className="leading-relaxed text-graphite">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-12 leading-relaxed text-graphite">
              Questions about privacy?{" "}
              <Link href="/contact" className="link-arc text-accent">
                Contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
