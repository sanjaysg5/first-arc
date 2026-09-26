import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/util/reveal";
import { ArcField } from "@/components/arc/arc-field";
import { cta } from "@/lib/site";
import { dataTypes } from "@/lib/content";

export const metadata: Metadata = {
  title: "For Companies",
  description:
    "Explore whether selected operational data can be responsibly licensed for AI — while you retain ownership of the underlying business, IP, and customer relationships.",
};

const glance: { label: string; value: string }[] = [
  {
    label: "Counterparty",
    value:
      "A qualified AI buyer, introduced and managed by First Arc. No public marketplace or listing.",
  },
  {
    label: "What's licensed",
    value:
      "A defined, bounded dataset of selected operational history — de-identified where appropriate.",
  },
  {
    label: "What stays yours",
    value:
      "Your business, IP, and customer relationships. You keep the underlying data.",
  },
  {
    label: "Cost to explore",
    value: "None. Assessing your data and whether there's a fit carries no fee.",
  },
  {
    label: "Exclusivity",
    value: "Non-exclusive by default; exclusive terms only if you agree to them.",
  },
  {
    label: "Review",
    value:
      "Rights, privacy, and security are reviewed before anything is prepared or moves.",
  },
  {
    label: "Anonymization",
    value:
      "Identifying fields are handled as part of preparing the dataset, before delivery.",
  },
  {
    label: "Pricing",
    value:
      "Scoped per engagement by signal and structure, not raw volume. No public rate card.",
  },
];

const faqs = [
  {
    q: "Does First Arc buy our data, or broker it?",
    a: "We are the managed layer between your operational data and the AI teams that license it. We handle discovery, diligence, privacy, preparation, and licensing — so you deal with one trusted counterparty, not a public marketplace.",
  },
  {
    q: "What does licensing actually mean?",
    a: "You grant defined, permissioned access to a selected, de-identified-where-appropriate dataset under agreed terms. You are not selling your business and you are not handing over your live systems.",
  },
  {
    q: "What does it cost to explore?",
    a: "Nothing to assess fit. There is no fee to have us review what you have and tell you whether there is a credible path forward.",
  },
  {
    q: "How is data priced?",
    a: "By signal, structure, and relevance to a defined AI capability — not by raw volume. Each engagement is scoped and priced individually; there is no public rate card.",
  },
  {
    q: "Which companies qualify?",
    a: "Any company with real operating history. The depth and texture of the record matter more than headcount or revenue.",
  },
  {
    q: "What happens to the data afterwards?",
    a: "Selected data is reviewed, de-identified where appropriate, structured, and licensed to a qualified buyer under defined terms. Use is bounded by the license.",
  },
];

const reviewSteps = [
  {
    n: "01",
    title: "Rights & ownership",
    blurb: "We confirm who owns the data and what rights permit its use.",
  },
  {
    n: "02",
    title: "Permission",
    blurb:
      "Consent and contractual constraints are established before anything moves.",
  },
  {
    n: "03",
    title: "Privacy",
    blurb:
      "Personal and confidential content is detected and de-identified where appropriate.",
  },
  {
    n: "04",
    title: "Security review",
    blurb: "Extraction and handling pass appropriate legal and security review.",
  },
];

export default function ForCompaniesPage() {
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
        subtitle="Explore licensing selected operational data while retaining ownership of the underlying business — subject to legal, privacy, and security review."
      >
        <Button asChild size="lg">
          <Link href={cta.supplier.href}>
            Explore licensing your data
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </PageHero>

      {/* ======================= WHAT KINDS OF DATA ======================= */}
      <section className="border-b border-line">
        <div className="container-arc py-20 md:py-28">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">What kinds of data?</p>
            <h2 className="display mt-6 text-[clamp(2rem,4.4vw,3.3rem)]">
              Selected operational history — not your live systems.
            </h2>
            <p className="lede mt-6 text-lg">
              The value is rarely a single file. It is the structure of the work
              inside your history — the sequence from problem to outcome. A few
              examples of what can be considered:
            </p>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {dataTypes.slice(0, 4).map((d, i) => (
              <Reveal
                key={d.title}
                delay={(i % 4) * 70}
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

      {/* =============================== FAQ =============================== */}
      <section className="border-b border-line bg-paper-dim">
        <div className="container-arc py-20 md:py-28">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Questions</p>
            <h2 className="display mt-6 text-[clamp(2rem,4.4vw,3.3rem)]">
              Questions companies ask first.
            </h2>
          </Reveal>
          <div className="mt-12 border-t border-line">
            {faqs.map((f, i) => (
              <Reveal
                key={f.q}
                delay={i * 90}
                className="grid gap-4 border-b border-line py-10 md:grid-cols-[0.8fr_1.2fr] md:gap-12"
              >
                <h2 className="display text-[clamp(1.6rem,3vw,2.3rem)]">
                  {f.q}
                </h2>
                <p className="lede text-lg">{f.a}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== WHAT REMAINS YOURS ======================== */}
      <section className="border-b border-line">
        <div className="container-arc grid gap-14 py-20 md:py-28 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <Reveal className="max-w-lg">
            <p className="eyebrow">What remains yours?</p>
            <h2 className="display mt-6 text-[clamp(2rem,4.4vw,3.3rem)]">
              You license data. You keep the business.
            </h2>
            <p className="lede mt-6 max-w-md text-lg">
              Licensing selected historical data does not transfer ownership of
              the business that produced it. You decide what is eligible — and
              what is never shared.
            </p>
          </Reveal>

          <Reveal delay={120} className="grid gap-4">
            <div className="rounded-2xl border border-line bg-accent-soft p-7">
              <p className="eyebrow">Licensed</p>
              <p className="mt-3 text-[1.05rem] text-ink">
                Selected, permissioned operational data — de-identified where
                appropriate, scoped to a defined use.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-card p-7">
              <p className="eyebrow eyebrow-muted">Retained</p>
              <p className="mt-3 text-[1.05rem] text-ink">
                Your business, your IP, your customer relationships, and control
                over what is never shared.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== LICENSING AT A GLANCE ===================== */}
      <section className="border-b border-line bg-paper-dim">
        <div className="container-arc py-20 md:py-28">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Licensing at a glance</p>
            <h2 className="display mt-6 text-[clamp(2rem,4.4vw,3.3rem)]">
              The shape of a licensing engagement.
            </h2>
            <p className="lede mt-6 text-lg">
              A plain summary of how we work with companies. Every term is
              confirmed with you before anything moves.
            </p>
          </Reveal>
          <dl className="mt-12 border-t border-line">
            {glance.map((row, i) => (
              <Reveal
                key={row.label}
                delay={(i % 4) * 60}
                className="grid gap-2 border-b border-line py-6 md:grid-cols-[0.5fr_1fr] md:gap-12"
              >
                <dt className="eyebrow eyebrow-muted pt-1">{row.label}</dt>
                <dd className="text-[1.05rem] leading-relaxed text-ink">
                  {row.value}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* =================== BEFORE DATA IS SHARED (review) =================== */}
      <section className="relative overflow-hidden bg-deep text-on-deep">
        <ArcField
          preset="concentric"
          className="right-[-14%] top-[-10%] h-[130%] w-[62%] text-deep-line"
        />
        <div className="container-arc relative z-10 py-20 md:py-28">
          <Reveal className="max-w-2xl">
            <p className="eyebrow eyebrow-on-deep">
              What happens before data is shared?
            </p>
            <h2 className="display mt-6 text-[clamp(2rem,4.4vw,3.3rem)] text-on-deep">
              Nothing moves before review.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-on-deep-muted">
              Every engagement passes through a managed diligence process before
              any data is prepared or licensed.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-deep-line bg-deep-line sm:grid-cols-2 lg:grid-cols-4">
            {reviewSteps.map((s, i) => (
              <Reveal
                key={s.n}
                delay={i * 80}
                className="flex flex-col bg-deep p-7"
              >
                <span className="numeral text-sm text-on-deep-accent">
                  {s.n}
                </span>
                <h3 className="mt-4 font-sans text-[1.05rem] font-medium text-on-deep">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-on-deep-muted">
                  {s.blurb}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PROCESS + REASSURANCE + CTA ==================== */}
      <section className="border-b border-line bg-paper-dim">
        <div className="container-arc grid gap-14 py-20 md:py-28 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <Reveal className="max-w-lg">
            <p className="eyebrow">How does the process work?</p>
            <h2 className="display mt-6 text-[clamp(2rem,4.4vw,3.3rem)]">
              A guided path, at your pace.
            </h2>
            <p className="lede mt-6 max-w-md text-lg">
              From a first conversation to controlled delivery, each step is
              scoped with you. Nothing is listed publicly and nothing proceeds
              without your sign-off.
            </p>
            <div className="mt-8">
              <Link
                href="/how-it-works"
                className="link-arc inline-flex items-center gap-2 text-accent"
              >
                See how it works, end to end
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <Reveal
            delay={120}
            className="rounded-2xl border border-line bg-card p-8 md:p-10"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-accent" />
              <p className="eyebrow eyebrow-muted">What to expect</p>
            </div>
            <ul className="mt-6 space-y-4">
              {[
                "No public listing of your company or your data",
                "You keep ownership of your business and IP",
                "Managed diligence — legal, privacy, and security review",
              ].map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 text-[1.02rem] text-ink"
                >
                  <Check className="mt-1 h-4 w-4 shrink-0 text-accent" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <Button asChild size="lg">
                <Link href={cta.supplier.href}>
                  Explore licensing your data
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
