import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/util/reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "First Arc is building infrastructure for the transition from AI that knows things to AI that can operate in the real world.",
};

const founders = [
  {
    id: "founder-1",
    name: "Founder name",
    role: "Co-founder",
    bio: "[Add background]",
  },
  {
    id: "founder-2",
    name: "Founder name",
    role: "Co-founder",
    bio: "[Add background]",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            Infrastructure for the transition from AI that knows things to AI
            that can <em className="text-accent">operate in the real world</em>.
          </>
        }
      />

      {/* ============================ MISSION ============================ */}
      <section className="border-b border-line">
        <div className="container-arc grid gap-10 py-20 md:grid-cols-[0.5fr_1fr] md:gap-16 md:py-28">
          <Reveal>
            <p className="eyebrow">Mission</p>
          </Reveal>
          <Reveal
            delay={80}
            className="max-w-2xl space-y-6 text-lg leading-relaxed text-ink-soft"
          >
            <p>
              AI has learned almost everything the public internet has to teach.
              The next layer of capability depends on something harder to reach:
              an understanding of how real organizations actually operate.
            </p>
            <p>
              First Arc exists to make that knowledge available — responsibly. We
              help companies license selected operational history, and we help AI
              teams source it against a defined need, with rights, privacy, and
              security review built into the process.
            </p>
            <p>
              We are early, and we are deliberate. We would rather build durable
              infrastructure and earn trust than overclaim what does not yet
              exist.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================ FOUNDERS ============================ */}
      <section className="border-b border-line bg-paper-dim">
        <div className="container-arc py-20 md:py-28">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Founders</p>
            <h2 className="display mt-6 text-[clamp(2rem,4.4vw,3.3rem)]">
              The people behind First Arc.
            </h2>
          </Reveal>

          {/* TODO: replace with real founder details */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {founders.map((f, i) => (
              <Reveal
                key={f.id}
                delay={i * 100}
                className="flex flex-col rounded-2xl border border-line bg-card p-8"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <User className="h-6 w-6" />
                </span>
                <h3 className="display mt-6 text-2xl">{f.name}</h3>
                <p className="mt-1 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-graphite">
                  {f.role}
                </p>
                <p className="lede mt-4 text-[0.98rem]">{f.bio}</p>
                <Link
                  href="#"
                  className="mt-6 inline-flex items-center gap-1.5 text-accent hover:underline"
                >
                  LinkedIn
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ======================= WHY WE ARE BUILDING ======================= */}
      <section className="border-b border-line">
        <div className="container-arc py-20 md:py-28">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Why we are building this</p>
            <p className="display mt-6 text-[clamp(1.6rem,3.4vw,2.6rem)] leading-tight">
              The organizations that ran the last era of work hold the data the
              next era of AI needs to learn from. Making that exchange safe,
              permissioned, and fair is worth building carefully.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================ CONTACT ============================ */}
      <section className="border-b border-line bg-deep text-on-deep">
        <div className="container-arc flex flex-col gap-8 py-16 md:flex-row md:items-center md:justify-between md:py-20">
          <div className="max-w-xl">
            <p className="eyebrow eyebrow-on-deep">Get in touch</p>
            <h2 className="display mt-5 text-[clamp(1.8rem,3.6vw,2.8rem)] text-on-deep">
              Have a question, or something to license?
            </h2>
          </div>
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
        </div>
      </section>
    </>
  );
}
