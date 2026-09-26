import Link from "next/link";
import { ArcMark } from "@/components/arc/arc-mark";
import { cn } from "@/lib/utils";

/** First Arc wordmark: brand symbol + name, tuned for light or deep backgrounds. */
export function Logo({
  href = "/",
  tone = "ink",
  className,
}: {
  href?: string;
  tone?: "ink" | "on-deep";
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="First Arc — home"
      className={cn(
        "group inline-flex items-center gap-2.5",
        tone === "ink" ? "text-ink" : "text-on-deep",
        className,
      )}
    >
      <ArcMark
        className="h-7 w-7 transition-transform duration-500 ease-out group-hover:rotate-45"
        nodeClassName={tone === "on-deep" ? "fill-on-deep-accent" : "fill-accent"}
      />
      <span className="text-[1.06rem] font-medium tracking-[-0.02em]">
        First&nbsp;Arc
      </span>
    </Link>
  );
}
