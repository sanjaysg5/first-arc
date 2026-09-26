import { cn } from "@/lib/utils";

export function TableWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-card">
      <table className="w-full min-w-[760px] text-left text-sm">{children}</table>
    </div>
  );
}

export function TH({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={cn(
        "whitespace-nowrap px-4 py-3 text-xs font-medium uppercase tracking-wider text-graphite",
        className,
      )}
    >
      {children}
    </th>
  );
}

export function TD({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={cn("border-t border-line px-4 py-3 align-top", className)}>
      {children}
    </td>
  );
}

export function AdminPageHeader({
  title,
  subtitle,
  count,
}: {
  title: string;
  subtitle?: string;
  count?: number;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-baseline gap-3">
        <h1 className="display text-3xl">{title}</h1>
        {typeof count === "number" && (
          <span className="numeral text-sm text-graphite">{count}</span>
        )}
      </div>
      {subtitle && <p className="lede mt-2 text-sm">{subtitle}</p>}
    </div>
  );
}

export function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-card p-12 text-center text-sm text-graphite">
      {children}
    </div>
  );
}
