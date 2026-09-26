"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { updateStatus } from "@/app/admin/actions";

type Entity = "buyers" | "suppliers" | "data_assets" | "matches";

export function StatusSelect({
  entity,
  id,
  value,
  statuses,
}: {
  entity: Entity;
  id: string;
  value: string;
  statuses: readonly string[];
}) {
  const [val, setVal] = useState(value);
  const [pending, startTransition] = useTransition();

  return (
    <select
      value={val}
      disabled={pending}
      aria-label="Status"
      onChange={(e) => {
        const next = e.target.value;
        const prev = val;
        setVal(next);
        startTransition(async () => {
          const res = await updateStatus(entity, id, next);
          if (!res.ok) {
            setVal(prev);
            toast.error(res.error);
          } else {
            toast.success("Status updated");
          }
        });
      }}
      className="rounded-lg border border-line bg-card px-2.5 py-1.5 text-xs capitalize text-ink outline-none focus:border-accent disabled:opacity-60"
    >
      {statuses.map((s) => (
        <option key={s} value={s}>
          {s.replace(/_/g, " ")}
        </option>
      ))}
    </select>
  );
}
