import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroArc } from "@/components/home/hero-arc";
import { Reveal } from "@/components/util/reveal";
import { ArcField } from "@/components/arc/arc-field";
import { cta } from "@/lib/site";
import { knowledgeLayers, dataTypes, demandExamples } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      {/* ============================== HERO ============================== */}
      <section className="relative overflow-hidden border-b border-line">
        <ArcField
          preset="rings"
          className="right-[-14%] top-[-24%] h-[150%] w-[70%] opacity-70"
        />
        <div className="container-arc relative z-10 grid items-center gap-10 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
          <div className="max-w-xl">
            <p className="eyebrow animate-fade-up">Enterprise Data × AI</p>
            <h1 className="display mt-6 text-[clamp(2.7rem,6.4vw,4.7rem)] animate-fade-up">
              The <span className="text-accent">first arc</span> of organizational
              intelligence.
            </h1>
            <p className="lede mt-7 max-w-md text-lg animate-fade-up">
              AI has learned from the public internet. The next layer of
              intelligence will increasingly come from understanding how real
              organizations work.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="deep" size="lg">
                <Link href={cta.buyer.href}>
                  Tell us what data you need
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="primary"
                size="lg"
                className="font-semibold"
              >
                <Link href={cta.supplier.href}>License your data</Link>
              </Button>
            </div>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.14em] text-graphite">
              Permissioned · Privacy-aware · Built for training &amp; evaluation
            </p>
          </div>

          <div className="lg:pl-4">
            <HeroArc />
          </div>
        </div>
      </section>

      {/* ============================ PROBLEM ============================ */}
      <section className="border-b border-line bg-paper-dim">
        <div className="container-arc py-20 md:py-28">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Why this matters</p>
            <h2 className="display mt-6 text-[clamp(2rem,4.4vw,3.3rem)]">
              AI knows what exists. The next generation needs to learn how work
              gets done.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
            {knowledgeLayers.map((layer, i) => (
              <Reveal
                key={layer.label}
                delay={i * 90}
                className={
                  i === 1
                    ? "bg-accent-soft p-8 md:p-10"
                    : "bg-card p-8 md:p-10"
                }
              >
                <div className="flex items-center gap-3">
                  <span className="numeral text-sm text-accent">0{i + 1}</span>
                  <span className="eyebrow eyebrow-muted">{layer.label}</span>
                </div>
                <h3 className="display mt-6 text-2xl">{layer.title}</h3>
                <p className="lede mt-3 text-[0.98rem]">{layer.blurb}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14 flex items-baseline gap-4">
            <span aria-hidden className="hidden h-px flex-1 bg-line-strong sm:block" />
            <p className="display text-[clamp(1.6rem,3vw,2.4rem)] text-ink">
              We work on the missing middle.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ========================== DATA TYPES ========================== */}
      <section className="border-b border-line">
        <div className="container-arc py-20 md:py-28">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">What we work with</p>
            <h2 className="display mt-6 text-[clamp(2rem,4.4vw,3.3rem)]">
              Operational data is more than documents.
            </h2>
            <p className="lede mt-6 text-lg">
              Not the number of files — the structure of the work inside them.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {dataTypes.slice(0, 6).map((d) => (
              <div
                key={d.title}
                className="flex items-baseline justify-between gap-4 bg-card p-6"
              >
                <h3 className="font-medium leading-snug text-ink">{d.title}</h3>
                <span className="shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-accent">
                  {d.systems.split(" · ")[0]}
                </span>
              </div>
            ))}
          </div>

          <Reveal className="mt-12">
            <Link
              href="/how-it-works"
              className="link-arc inline-flex items-center gap-2 text-accent"
            >
              How licensing works, end to end
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============================ BUYERS ============================ */}
      <section className="relative overflow-hidden bg-deep text-on-deep">
        <ArcField
          preset="trajectory"
          animate
          className="left-[-6%] top-[6%] h-[90%] w-[80%] text-deep-line"
        />
        <div className="container-arc relative z-10 grid gap-12 py-20 md:py-28 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="max-w-lg">
            <p className="eyebrow eyebrow-on-deep">For AI buyers</p>
            <h2 className="display mt-6 text-[clamp(2rem,4.4vw,3.3rem)] text-on-deep">
              Looking for proprietary data?
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-on-deep-muted">
              Tell us what capability you are trying to train or evaluate. We
              will help identify whether relevant enterprise data exists — and
              whether it can be responsibly licensed.
            </p>
            <div className="mt-9">
              <Button
                asChild
                size="lg"
                className="bg-white text-deep hover:bg-white/90"
              >
                <Link href={cta.buyer.href}>
                  Describe your data need
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
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

      {/* ========================== FINAL CTA ========================== */}
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
                    Submit demand
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
              <ul className="mt-6 space-y-2">
                {["No public listing", "You keep ownership", "Managed diligence"].map(
                  (b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-graphite">
                      <Check className="h-4 w-4 text-accent" />
                      {b}
                    </li>
                  ),
                )}
              </ul>
              <div className="mt-8">
                <Button asChild variant="primary" className="font-semibold">
                  <Link href={cta.supplier.href}>
                    License your data
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
