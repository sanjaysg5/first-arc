import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "The terms that govern use of the First Arc website and any information submitted through it.",
};

const sections = [
  {
    heading: "Use of this site",
    paras: [
      "This website is provided for general information about First Arc and to let you get in touch. By using it, you agree to use it lawfully, and not to disrupt or misuse the site or attempt to access it in ways it is not intended to be accessed.",
    ],
  },
  {
    heading: "No data upload",
    paras: [
      "Do not submit raw enterprise data, confidential records, or the personal data of others through this site. The forms here are for describing a need or an interest — not for transferring datasets. Any evaluation of operational data happens later, under a separate agreement with appropriate safeguards.",
    ],
  },
  {
    heading: "Exploratory nature of submissions",
    paras: [
      "Submitting a form does not create an obligation on either side. It begins a conversation. Nothing on this site is an offer, a commitment to license or acquire data, or a guarantee of any particular outcome or price.",
    ],
  },
  {
    heading: "Limitation of liability",
    paras: [
      "This site is provided on an “as is” basis, without warranties of any kind. To the fullest extent permitted by law, First Arc is not liable for any loss arising from your use of, or reliance on, this website.",
    ],
  },
  {
    heading: "Changes",
    paras: [
      "We may update these terms from time to time. Continued use of the site after changes are posted means you accept the revised terms.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        subtitle="These terms govern your use of this website and any information you submit through it."
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
              Questions about these terms?{" "}
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
