import Link from "next/link";
import { Check } from "lucide-react";
import type { UseFormRegister, FieldValues, Path } from "react-hook-form";
import { HONEYPOT_FIELD } from "@/lib/validation";
import { Button } from "@/components/ui/button";

/** Off-screen honeypot; real users never fill it. */
export function Honeypot<T extends FieldValues>({
  register,
}: {
  register: UseFormRegister<T>;
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-[-9999px] h-0 w-0 overflow-hidden"
    >
      <label>
        Do not fill this field
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register(HONEYPOT_FIELD as Path<T>)}
        />
      </label>
    </div>
  );
}

/** Post-submission confirmation panel. */
export function FormSuccess({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-line bg-card p-10 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent-soft">
        <Check className="h-7 w-7 text-accent" />
      </div>
      <h2 className="display mt-6 text-3xl">{title}</h2>
      <p className="lede mt-3">{message}</p>
      <div className="mt-8 flex justify-center gap-3">
        <Button asChild variant="outline">
          <Link href="/">Back to home</Link>
        </Button>
        <Button asChild>
          <Link href="/how-it-works">How it works</Link>
        </Button>
      </div>
    </div>
  );
}
