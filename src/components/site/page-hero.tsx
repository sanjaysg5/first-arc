import { ArcField } from "@/components/arc/arc-field";

/** Reusable sub-page hero with the arc backdrop. */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <ArcField
        preset="rings"
        className="right-[-16%] top-[-42%] h-[170%] w-[58%] opacity-60"
      />
      <div className="container-arc relative z-10 py-16 md:py-24">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display mt-6 max-w-3xl text-[clamp(2.4rem,5.5vw,4rem)]">
          {title}
        </h1>
        {subtitle && (
          <p className="lede mt-6 max-w-xl text-lg">{subtitle}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
