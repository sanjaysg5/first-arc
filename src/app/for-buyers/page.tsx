import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/util/reveal";
import { ArcField } from "@/components/arc/arc-field";
import { cta } from "@/lib/site";
import { dataTypes, demandExamples } from "@/lib/content";

export const metadata: Metadata = {
  title: "For AI Buyers",
  description:
    "First Arc works with AI teams sourcing proprietary enterprise data for training, post-training, evaluation, agent development, and workflow simulation.",
};

const buyerUseCases = [
  {
    n: "01",
    title: "Training & pre-training",
    blurb:
      "Domain-grounded corpora drawn from how real organizations actually operate.",
  },
  {
    n: "02",
    title: "Post-training",
    blurb:
      "Instruction, preference, and workflow data for fine-tuning and alignment.",
  },
  {
    n: "03",
    title: "Evaluation",
    blurb:
      "Realistic tasks, rubrics, and outcomes that measure capability rather than recall.",
  },
  {
    n: "04",
    title: "Agent development",
    blurb:
      "Action trajectories, tool usage, failures, and corrections from real work.",
  },
  {
    n: "05",
    title: "Workflow simulation",
    blurb:
      "Multi-step operational sequences reconstructed for training and testing.",
  },
];

export default function ForBuyersPage() {
  return (
    <>
      <PageHero
        eyebrow="For AI buyers"
        title={
          <>
            Tell us the data your <span className="text-accent">AI system</span> is
            missing.
          </>
        }
        subtitle="We work with AI teams looking for proprietary enterprise data — sourced against a defined need, not selected from a static catalog."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href={cta.buyer.href}>
              Submit a data request
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Talk to us</Link>
          </Button>
        </div>
      </PageHero>

      {/* ===================== WHAT WE WORK ON ===================== */}
      <section className="border-b border-line">
        <div className="container-arc py-20 md:py-28">
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">What we work on</p>
              <h2 className="display mt-6 text-[clamp(2rem,4.4vw,3.3rem)]">
                Data for the systems you are trying to build.
              </h2>
            </div>
            <p className="lede max-w-sm text-[0.98rem]">
              Describe the capability you are training or evaluating. We help
              determine whether relevant enterprise data exists and can be
              responsibly licensed.
            </p>
          </Reveal>

          <div className="mt-14 border-t border-line">
            {buyerUseCases.map((u, i) => (
              <Reveal
                key={u.n}
                delay={i * 70}
                className="grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-2 border-b border-line py-7 md:grid-cols-[5rem_1fr_1.15fr] md:gap-10"
              >
                <span className="numeral text-2xl text-accent">{u.n}</span>
                <h3 className="display text-2xl">{u.title}</h3>
                <p className="lede col-span-2 text-[0.98rem] md:col-span-1">
                  {u.blurb}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 max-w-2xl rounded-2xl border border-line bg-accent-soft p-7 md:p-8">
            <p className="text-[1.05rem] leading-relaxed text-ink">
              You won&apos;t be forced to choose from a static catalog. Every
              engagement begins with the need — then we work backward to the
              data.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ========================= EXAMPLE DEMAND ========================= */}
      <section className="relative overflow-hidden bg-deep text-on-deep">
        <ArcField
          preset="trajectory"
          animate
          className="left-[-6%] top-[6%] h-[90%] w-[80%] text-deep-line"
        />
        <div className="container-arc relative z-10 grid gap-12 py-20 md:py-28 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="max-w-lg">
            <p className="eyebrow eyebrow-on-deep">Recent interest</p>
            <h2 className="display mt-6 text-[clamp(2rem,4.4vw,3.3rem)] text-on-deep">
              A sense of what teams ask for.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-on-deep-muted">
              Illustrative examples of the kinds of data needs we scope. Yours
              will be specific to the system you are building.
            </p>
          </div>

          <div className="rounded-2xl border border-deep-line bg-white/[0.03] p-2">
            <p className="px-5 pb-2 pt-4 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-on-deep-accent">
              Example demand
            </p>
            <ul className="flex flex-col">
              {demandExamples.map((ex) => (
                <li
                  key={ex}
                  className="flex items-center justify-between gap-4 border-t border-deep-line px-5 py-4 text-[0.98rem] text-on-deep"
                >
                  {ex}
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-on-deep-accent" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ====================== OPERATIONAL DATA TYPES ====================== */}
      <section className="border-b border-line bg-paper-dim">
        <div className="container-arc py-20 md:py-28">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">What we work with</p>
            <h2 className="display mt-6 text-[clamp(2rem,4.4vw,3.3rem)]">
              Operational data types available for licensing.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {dataTypes.slice(0, 6).map((d, i) => (
              <Reveal
                key={d.title}
                delay={(i % 3) * 70}
                className="flex flex-col bg-card p-7"
              >
                <h3 className="font-sans text-[1.05rem] font-medium leading-snug text-ink">
                  {d.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-graphite">
                  {d.blurb}
                </p>
                <p className="mt-auto pt-5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-accent">
                  {d.systems}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ FINAL CTA ============================ */}
      <section className="border-b border-line">
        <div className="container-arc py-20 md:py-28">
          <Reveal className="max-w-3xl">
            <h2 className="display text-[clamp(2.2rem,5vw,3.8rem)]">
              Describe the dataset or capability you are looking for.
            </h2>
            <p className="lede mt-6 max-w-xl text-lg">
              We source against a defined need. Tell us what your models are
              missing and we will tell you whether there is a credible path.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href={cta.buyer.href}>
                  Submit a data request
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Talk to us</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
