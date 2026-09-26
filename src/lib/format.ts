const dateFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  try {
    return dateFmt.format(new Date(iso));
  } catch {
    return "—";
  }
}

export function truncate(text: string | null | undefined, max = 80): string {
  if (!text) return "—";
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
}
