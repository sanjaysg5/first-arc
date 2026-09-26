"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building2,
  Boxes,
  GitCompareArrows,
  Settings,
} from "lucide-react";
import { ArcMark } from "@/components/arc/arc-mark";
import { Button } from "@/components/ui/button";
import { signOutAdmin } from "@/app/admin/actions";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Buyers", href: "/admin/buyers", icon: Users },
  { label: "Suppliers", href: "/admin/suppliers", icon: Building2 },
  { label: "Assets", href: "/admin/assets", icon: Boxes },
  { label: "Matches", href: "/admin/matches", icon: GitCompareArrows },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminShell({
  userEmail,
  children,
}: {
  userEmail: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-paper md:grid md:grid-cols-[248px_1fr]">
      {/* Sidebar */}
      <aside className="border-b border-line bg-card md:sticky md:top-0 md:h-screen md:border-b-0 md:border-r">
        <div className="flex items-center gap-2 px-6 py-5">
          <ArcMark className="h-6 w-6" />
          <span className="font-medium tracking-[-0.02em]">First Arc</span>
          <span className="ml-1 rounded-full bg-paper-dim px-2 py-0.5 text-[0.65rem] uppercase tracking-wider text-graphite">
            Admin
          </span>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:overflow-visible md:pb-0">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-colors",
                  active
                    ? "bg-accent-soft text-accent-ink"
                    : "text-graphite hover:bg-paper-dim hover:text-ink",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex min-h-screen flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-line px-6 py-4">
          <p className="truncate text-sm text-graphite">{userEmail}</p>
          <form action={signOutAdmin}>
            <Button type="submit" variant="outline" size="sm">
              Sign out
            </Button>
          </form>
        </header>
        <div className="flex-1 px-6 py-8">{children}</div>
      </div>
    </div>
  );
}
