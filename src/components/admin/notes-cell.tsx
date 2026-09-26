"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { updateNotes } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";

type Entity = "buyers" | "suppliers" | "data_assets" | "matches";

export function NotesCell({
  entity,
  id,
  notes,
}: {
  entity: Entity;
  id: string;
  notes: string | null;
}) {
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState(notes ?? "");
  const [pending, startTransition] = useTransition();

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="max-w-[220px] truncate text-left text-sm text-graphite hover:text-accent"
      >
        {notes?.trim() ? notes : "Add note"}
      </button>
    );
  }

  return (
    <div className="w-64 space-y-2">
      <textarea
        value={val}
        onChange={(e) => setVal(e.target.value)}
        rows={3}
        className="w-full rounded-lg border border-line bg-card p-2 text-sm outline-none focus:border-accent"
        autoFocus
      />
      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          disabled={pending}
          onClick={() =>
            startTransition(async () => {
              const res = await updateNotes(entity, id, val);
              if (res.ok) {
                toast.success("Note saved");
                setOpen(false);
              } else {
                toast.error(res.error);
              }
            })
          }
        >
          Save
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => {
            setVal(notes ?? "");
            setOpen(false);
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
