import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { ArcField } from "@/components/arc/arc-field";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Have unique data or a difficult data need? Tell us what you have or what your models need.",
};

export default function ContactPage() {
  return (
    <section className="border-b border-line">
      <div className="container-arc py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left — editorial panel */}
          <div className="relative overflow-hidden rounded-3xl bg-deep p-8 text-on-deep md:p-12">
            <ArcField
              preset="concentric"
              className="right-[-20%] top-[-10%] h-[120%] w-[70%] text-deep-line"
            />
            <div className="relative z-10">
              <p className="eyebrow eyebrow-on-deep">Start a conversation</p>
              <h1 className="display mt-6 text-[clamp(2.2rem,4.6vw,3.4rem)] text-on-deep">
                Have unique data or a difficult data need?
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-on-deep-muted">
                Tell us what you have or what your models need. We&apos;ll
                quickly determine whether there is a credible path forward.
              </p>
              <Link
                href={`mailto:${siteConfig.contactEmail}`}
                className="mt-8 inline-flex items-center gap-2 text-on-deep-accent hover:underline"
              >
                <Mail className="h-4 w-4" />
                {siteConfig.contactEmail}
              </Link>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:pt-2">
            <ContactForm />
            <p className="mt-4 text-center text-xs text-graphite">
              We reply within two business days.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
