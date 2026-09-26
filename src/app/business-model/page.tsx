import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  FileText,
  Repeat,
  Boxes,
  Lock,
  Workflow,
  Scale,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/util/reveal";
import { cta } from "@/lib/site";
import { licensingModels } from "@/lib/content";

export const metadata: Metadata = {
  title: "Licensing Models",
  description:
    "Different data needs require different licensing models — one-time datasets, subscriptions, custom builds, exclusive licenses, data feeds, and evaluation assets.",
};

const modelIcons = [FileText, Repeat, Boxes, Lock, Workflow, Scale] as const;

export default function BusinessModelPage() {
  return (
    <>
      <PageHero
        eyebrow="Licensing"
        title={
          <>
            Different data needs require different{" "}
            <span className="text-accent">licensing models</span>.
          </>
        }
        subtitle="Some buyers need a fixed historical dataset. Others need an ongoing feed, an exclusive arrangement, or an evaluation suite. We scope the model to the need."
      />

      {/* =========================== MODELS =========================== */}
      <section className="border-b border-line">
        <div className="container-arc py-20 md:py-28">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Models</p>
            <h2 className="display mt-6 text-[clamp(2rem,4.4vw,3.3rem)]">
              Six ways to license operational data.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {licensingModels.map((m, i) => {
              const Icon = modelIcons[i % modelIcons.length];
              return (
                <Reveal
                  key={m.title}
                  delay={(i % 3) * 70}
                  className="flex flex-col bg-card p-8"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="numeral text-sm text-graphite">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="display mt-6 text-2xl">{m.title}</h3>
                  <p className="lede mt-3 text-[0.98rem]">{m.blurb}</p>
                </Reveal>
              );
            })}
          </div>

          {/* Pricing note */}
          <Reveal className="mt-12 flex flex-col gap-6 rounded-2xl border border-line bg-paper-dim p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <p className="max-w-xl text-[1.05rem] leading-relaxed text-ink">
              We don&apos;t publish standard pricing — each engagement is scoped
              to the data and the buyer.
            </p>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">
                Talk through your use case
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ============================ CTA ============================ */}
      <section className="border-b border-line bg-deep text-on-deep">
        <div className="container-arc py-20 md:py-28">
          <Reveal className="max-w-3xl">
            <p className="eyebrow eyebrow-on-deep">Get in touch</p>
            <h2 className="display mt-6 text-[clamp(2.2rem,5vw,3.6rem)] text-on-deep">
              Let us scope the right model with you.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-on-deep-muted">
              Whether you are sourcing data or considering licensing your own, a
              short conversation is the fastest way to find the right structure.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-white text-deep hover:bg-white/90"
              >
                <Link href="/contact">
                  Contact us
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline-deep">
                <Link href={cta.buyer.href}>Submit a data request</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
