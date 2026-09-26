import "server-only";
import { Resend } from "resend";
import { serverEnv } from "@/lib/env";

/**
 * Thin Resend wrapper. If RESEND_API_KEY is unset, emails are skipped (logged
 * without PII) so local development works without a mail provider.
 */

function getResend(): Resend | null {
  const key = serverEnv.resendApiKey();
  return key ? new Resend(key) : null;
}

type SendResult = { sent: boolean; skipped?: boolean; error?: string };

async function send(args: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<SendResult> {
  const resend = getResend();
  if (!resend) {
    console.info("[email] skipped (RESEND_API_KEY unset):", args.subject);
    return { sent: false, skipped: true };
  }
  try {
    const { error } = await resend.emails.send({
      from: serverEnv.leadFromEmail(),
      to: args.to,
      subject: args.subject,
      html: args.html,
      ...(args.replyTo ? { replyTo: args.replyTo } : {}),
    });
    if (error) {
      console.error("[email] send failed:", error.message);
      return { sent: false, error: error.message };
    }
    return { sent: true };
  } catch (err) {
    console.error(
      "[email] send threw:",
      err instanceof Error ? err.message : "unknown",
    );
    return { sent: false, error: "send_failed" };
  }
}

const shell = (title: string, body: string) => `
  <div style="font-family:ui-sans-serif,system-ui,sans-serif;color:#0e1519;line-height:1.55;max-width:560px">
    <div style="font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#1f5a7a">First Arc</div>
    <h1 style="font-size:20px;margin:8px 0 16px">${title}</h1>
    ${body}
  </div>`;

const row = (label: string, value: string) =>
  value
    ? `<tr><td style="padding:6px 12px 6px 0;color:#59616a;vertical-align:top;white-space:nowrap">${label}</td><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`
    : "";

/** Escape user-provided values before embedding in HTML email. */
function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function notifyInternal(args: {
  kind: "buyer" | "supplier" | "contact";
  fields: Record<string, string>;
  replyTo?: string;
}): Promise<SendResult> {
  const heading =
    args.kind === "buyer"
      ? "New buyer request received"
      : args.kind === "supplier"
        ? "New supplier lead received"
        : "New contact message";

  const rows = Object.entries(args.fields)
    .map(([k, v]) => row(k, v))
    .join("");

  return send({
    to: serverEnv.leadNotificationEmail(),
    subject: `[First Arc] ${heading}`,
    html: shell(
      heading,
      `<table style="border-collapse:collapse;font-size:14px">${rows}</table>`,
    ),
    replyTo: args.replyTo,
  });
}

export async function sendConfirmation(args: {
  to: string;
  name: string;
  kind: "buyer" | "supplier" | "contact";
}): Promise<SendResult> {
  const line =
    args.kind === "supplier"
      ? "We received your interest in licensing operational data. We will review it and follow up if we see a credible path forward."
      : "We received your request. We will review it and follow up if we see a relevant match.";

  return send({
    to: args.to,
    subject: "First Arc — we received your submission",
    html: shell(
      `Thanks, ${escapeHtml(args.name)}.`,
      `<p style="font-size:14px;color:#333b41">${line}</p>
       <p style="font-size:14px;color:#59616a">This is an exploratory conversation — it does not guarantee data availability or a commercial outcome.</p>`,
    ),
  });
}
