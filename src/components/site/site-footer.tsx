import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { ArcField } from "@/components/arc/arc-field";
import { siteConfig, footerNav, cta } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-deep text-on-deep">
      <ArcField
        preset="concentric"
        className="right-[-8%] top-[-30%] h-[120%] w-[55%] text-deep-line"
      />
      <div className="container-arc relative z-10 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo tone="on-deep" />
            <p className="mt-5 font-serif text-2xl leading-tight text-on-deep">
              {siteConfig.tagline}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-on-deep-muted">
              {siteConfig.description}
            </p>
            <Link
              href={`mailto:${siteConfig.contactEmail}`}
              className="mt-6 inline-flex items-center gap-1.5 text-sm text-on-deep-accent hover:underline"
            >
              {siteConfig.contactEmail}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <FooterColumn title="Platform" links={footerNav.product} />
          <FooterColumn title="Company" links={footerNav.company} />
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-deep-line pt-8 text-sm text-on-deep-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Building the data
            layer for machine-understandable organizational experience.
          </p>
          <div className="flex items-center gap-6">
            <Link href={cta.buyer.href} className="hover:text-on-deep">
              For AI Buyers
            </Link>
            <Link href={cta.supplier.href} className="hover:text-on-deep">
              For Companies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="eyebrow eyebrow-on-deep">{title}</p>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[0.95rem] text-on-deep-muted transition-colors hover:text-on-deep"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
