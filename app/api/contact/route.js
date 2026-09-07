/* ---------------------------------------------------------------------------
   POST /api/contact — delivers a contact-form submission by email.

   Delivery goes straight through GoDaddy Workspace Email's own SMTP server
   (smtpout.secureserver.net) via nodemailer, logging in as the mailbox that
   receives the enquiries. There's no third-party delivery service and no
   public API key: the previous approach (Web3Forms) turned out to reject
   server-side submissions on its free tier — it only accepts calls made
   directly from a browser — so a Next.js API route could never use it
   without a paid plan.

     SMTP_USER — required. The mailbox's full address (info@benchstrength.uk).
     SMTP_PASS — required. That mailbox's password.

   Both live in `.env.local` for development and in the host's env for
   production (see `.env.example`). Neither is ever sent to the client.

   With no credentials configured the route returns 503 and the form shows an
   "email us instead" message rather than pretending the mail was sent.
--------------------------------------------------------------------------- */

import nodemailer from "nodemailer";

const RECIPIENT = "info@benchstrength.uk";

// Deliberately loose — just enough to reject an obvious non-address. Real
// validation is "did the reply land", which no regex can tell you.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (body, status) =>
  Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });

function clean(value, max) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

// Escaped once, used in both the HTML body and reused nowhere else — no
// templating library needed for four interpolated fields.
function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

let transporter = null;
function getTransporter() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) return null;

  // Built once and reused across requests (nodemailer pools connections
  // internally), rather than logging in to GoDaddy's SMTP server fresh on
  // every submission.
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: "smtpout.secureserver.net",
      port: 465,
      secure: true,
      auth: { user, pass },
    });
  }
  return transporter;
}

async function deliver({ name, email, message }) {
  const smtp = getTransporter();
  if (!smtp) return { ok: false, status: 503, error: "not_configured" };

  try {
    await smtp.sendMail({
      from: `"Bench Strength website" <${process.env.SMTP_USER}>`,
      to: RECIPIENT,
      // So a reply in the inbox goes straight back to the sender.
      replyTo: `"${name}" <${email}>`,
      subject: `New enquiry from ${name}`,
      text: `${message}\n\n— sent from the benchstrength.uk contact form\nFrom: ${name} <${email}>`,
      html: `
        <p><strong>${escapeHtml(name)}</strong> (${escapeHtml(email)}) sent this via the benchstrength.uk contact form:</p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    });
  } catch (err) {
    console.error("[/api/contact] SMTP send failed:", err?.message || err);
    return { ok: false, status: 502, error: "send_failed" };
  }

  return { ok: true, status: 200 };
}

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Invalid request body." }, 400);
  }

  const name = clean(payload?.name, 200);
  const email = clean(payload?.email, 320);
  const message = clean(payload?.message, 5000);

  if (!name || !email || !message) {
    return json({ error: "Name, email and message are all required." }, 400);
  }
  if (!EMAIL_RE.test(email)) {
    return json({ error: "That email address doesn't look right." }, 400);
  }
  // Honeypot: a real user never fills a hidden field.
  if (clean(payload?.company, 100)) {
    return json({ ok: true });
  }

  const result = await deliver({ name, email, message });

  if (!result.ok) {
    if (result.error === "not_configured") {
      console.error(
        "[/api/contact] SMTP_USER / SMTP_PASS are not set — cannot send mail.",
      );
      return json(
        {
          error:
            "The contact form isn't available right now. Please email info@benchstrength.uk directly.",
        },
        503,
      );
    }
    return json(
      {
        error:
          "Something went wrong sending your message. Please try again, or email info@benchstrength.uk.",
      },
      502,
    );
  }

  return json({ ok: true });
}
