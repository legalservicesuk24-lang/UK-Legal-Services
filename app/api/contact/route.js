/* ---------------------------------------------------------------------------
   POST /api/contact — delivers a contact-form submission by email.

   Delivery goes through Web3Forms (https://web3forms.com) via its REST API.
   Web3Forms needs no account: you enter the destination inbox on their site
   and they email back an access key. The key is what decides where mail is
   delivered, so the recipient address lives with the key, not in this file
   (it was set to info@benchstrength.uk when the key was generated).

     WEB3FORMS_ACCESS_KEY — required. Set it in `.env.local` for development
                            and in the host's env for production (see
                            `.env.example`).

   With no key configured the route returns 503 and the form shows an
   "email us instead" message rather than pretending the mail was sent.

   Swapping providers (Resend / Postmark / Nodemailer + SMTP) is a change to
   `deliver()` alone — the validation and response contract around it stay
   the same.
--------------------------------------------------------------------------- */

const ENDPOINT = "https://api.web3forms.com/submit";

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

async function deliver({ name, email, message }) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) return { ok: false, status: 503, error: "not_configured" };

  let res;
  try {
    res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `New enquiry from ${name}`,
        from_name: "Bench Strength website",
        name,
        email,
        // So a reply in the inbox goes straight back to the sender.
        replyto: email,
        message: `${message}\n\n— sent from the benchstrength.uk contact form`,
      }),
    });
  } catch {
    // Network error reaching Web3Forms.
    return { ok: false, status: 502, error: "send_failed" };
  }

  // Web3Forms answers 200 + { success: true } on delivery, and a 4xx +
  // { success: false, message } for a bad or disabled key.
  let data = null;
  try {
    data = await res.json();
  } catch {
    /* fall through to the check below */
  }

  if (!res.ok || !data?.success) {
    return {
      ok: false,
      status: 502,
      error: "send_failed",
      detail: data?.message || `HTTP ${res.status}`,
    };
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
        "[/api/contact] WEB3FORMS_ACCESS_KEY is not set — cannot send mail.",
      );
      return json(
        {
          error:
            "The contact form isn't available right now. Please email info@benchstrength.uk directly.",
        },
        503,
      );
    }
    console.error(
      "[/api/contact] delivery failed:",
      result.detail || result.error,
    );
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
