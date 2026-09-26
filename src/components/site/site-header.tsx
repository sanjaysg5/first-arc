"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { mainNav, cta } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-line bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="container-arc flex h-16 items-center justify-between md:h-20">
        <Logo />

        <nav className="hidden items-center gap-9 md:flex">
          {mainNav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "link-arc text-[0.92rem]",
                  active && "text-accent",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Button asChild size="sm">
            <Link href={cta.buyer.href}>
              {cta.buyer.label}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="border-t border-line bg-paper md:hidden">
          <nav className="container-arc flex flex-col gap-1 py-4">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-2 py-3 text-lg",
                  pathname.startsWith(item.href) ? "text-accent" : "text-ink",
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-3">
              <Button asChild size="md" className="w-full">
                <Link href={cta.buyer.href} onClick={() => setOpen(false)}>
                  {cta.buyer.label}
                </Link>
              </Button>
              <Button asChild variant="outline" size="md" className="w-full">
                <Link href={cta.supplier.href} onClick={() => setOpen(false)}>
                  {cta.supplier.label}
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
