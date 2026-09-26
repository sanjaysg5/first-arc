"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";

/**
 * Renders the marketing header/footer around page content, except on /admin,
 * which supplies its own dashboard chrome.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <SiteHeader />}
      <main className="flex-1">{children}</main>
      {!isAdmin && <SiteFooter />}
    </>
  );
}
