// Tests for POST /api/contact (app/api/contact/route.js).
// Run with `npm test`. nodemailer's createTransport is stubbed, so no real
// email is ever sent and no SMTP credentials are needed.

import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import nodemailer from "nodemailer";

// Stub the transport before the route is imported. The route calls
// `nodemailer.createTransport` at request time, so patching the shared module
// object is enough.
let createCalls = 0;
let lastTransportOptions = null;
let sent = [];
let sendImpl = async () => ({ messageId: "test" });
nodemailer.createTransport = (options) => {
  createCalls += 1;
  lastTransportOptions = options;
  return { sendMail: (mail) => (sent.push(mail), sendImpl(mail)) };
};

const { POST } = await import("../app/api/contact/route.js");

const valid = {
  name: "Jane Doe",
  email: "jane@example.com",
  message: "We need help with disclosure.",
};

function post(body) {
  return POST(
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
  );
}

const env = { ...process.env };
const origError = console.error;

beforeEach(() => {
  process.env.SMTP_USER = "info@benchstrength.uk";
  process.env.SMTP_PASS = "secret";
  sent = [];
  sendImpl = async () => ({ messageId: "test" });
  console.error = () => {}; // the route logs expected failures
});

afterEach(() => {
  process.env = { ...env };
  console.error = origError;
});

test("sends a valid submission and returns 200", async () => {
  const res = await post(valid);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true });
  assert.equal(res.headers.get("Cache-Control"), "no-store");

  assert.equal(sent.length, 1);
  const mail = sent[0];
  assert.equal(mail.to, "info@benchstrength.uk");
  assert.match(mail.from, /<info@benchstrength\.uk>$/);
  assert.deepEqual(mail.replyTo, { name: "Jane Doe", address: "jane@example.com" });
  assert.equal(mail.subject, "New enquiry from Jane Doe");
  assert.match(mail.text, /We need help with disclosure\./);
});

test("trims whitespace from fields", async () => {
  const res = await post({ name: "  Jane  ", email: " jane@example.com ", message: " hi " });
  assert.equal(res.status, 200);
  assert.deepEqual(sent[0].replyTo, { name: "Jane", address: "jane@example.com" });
});

test("rejects a non-JSON body with 400", async () => {
  const res = await post("not json");
  assert.equal(res.status, 400);
  assert.equal(sent.length, 0);
});

test("rejects a JSON null body with 400", async () => {
  const res = await post("null");
  assert.equal(res.status, 400);
  assert.equal(sent.length, 0);
});

for (const field of ["name", "email", "message"]) {
  test(`rejects a missing ${field} with 400`, async () => {
    const res = await post({ ...valid, [field]: "" });
    assert.equal(res.status, 400);
    assert.match((await res.json()).error, /required/);
    assert.equal(sent.length, 0);
  });

  test(`rejects a whitespace-only ${field} with 400`, async () => {
    const res = await post({ ...valid, [field]: "   " });
    assert.equal(res.status, 400);
    assert.equal(sent.length, 0);
  });
}

test("rejects non-string fields with 400", async () => {
  const res = await post({ name: 123, email: ["a@b.co"], message: { x: 1 } });
  assert.equal(res.status, 400);
  assert.equal(sent.length, 0);
});

for (const email of ["jane", "jane@", "jane@example", "ja ne@example.com", "@example.com"]) {
  test(`rejects invalid email "${email}" with 400`, async () => {
    const res = await post({ ...valid, email });
    assert.equal(res.status, 400);
    assert.match((await res.json()).error, /email/i);
    assert.equal(sent.length, 0);
  });
}

test("honeypot: silently accepts but does not send", async () => {
  const res = await post({ ...valid, company: "Spam Inc" });
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true });
  assert.equal(sent.length, 0);
});

test("honeypot: does not send even when other fields are invalid", async () => {
  const res = await post({ name: "", email: "x", message: "", company: "Spam Inc" });
  assert.equal(sent.length, 0);
  // A bot shouldn't be able to tell the honeypot from a real success.
  assert.equal(res.status, 200);
});

test("escapes HTML in the email body", async () => {
  await post({
    name: "<script>alert(1)</script>",
    email: "jane@example.com",
    message: "a & b <b>bold</b>\nline two",
  });
  const { html } = sent[0];
  assert.doesNotMatch(html, /<script>/);
  assert.match(html, /&lt;script&gt;/);
  assert.match(html, /a &amp; b &lt;b&gt;bold&lt;\/b&gt;<br>line two/);
});

test("strips newlines from the name so it can't break the subject line", async () => {
  await post({ ...valid, name: "Jane\r\nBcc: victim@example.com" });
  assert.doesNotMatch(sent[0].subject, /[\r\n]/);
  assert.doesNotMatch(sent[0].replyTo.name, /[\r\n]/);
});

test("truncates overlong fields", async () => {
  await post({ ...valid, name: "n".repeat(500), message: "m".repeat(10_000) });
  assert.equal(sent[0].replyTo.name.length, 200);
  assert.ok(sent[0].text.startsWith("m".repeat(5000) + "\n"));
});

test("returns 503 when SMTP credentials are missing", async () => {
  delete process.env.SMTP_USER;
  delete process.env.SMTP_PASS;
  const res = await post(valid);
  assert.equal(res.status, 503);
  assert.match((await res.json()).error, /info@benchstrength\.uk/);
  assert.equal(sent.length, 0);
});

test("returns 502 when SMTP send fails, and rebuilds the transport next time", async () => {
  sendImpl = async () => {
    throw new Error("535 Authentication failed");
  };
  const before = createCalls;
  const res = await post(valid);
  assert.equal(res.status, 502);
  assert.match((await res.json()).error, /try again/);

  sendImpl = async () => ({ messageId: "ok" });
  const res2 = await post(valid);
  assert.equal(res2.status, 200);
  assert.equal(createCalls, before + 1, "transport should be recreated after a failure");
});

test("pins TLS servername to the SMTP hostname", async () => {
  sendImpl = async () => {
    throw new Error("force a fresh transport next time");
  };
  await post(valid);
  sendImpl = async () => ({ messageId: "ok" });
  await post(valid);

  // host is the OS-resolved IP (or the hostname if lookup failed); either
  // way certificate checks must run against the real hostname.
  assert.equal(lastTransportOptions.servername, "smtpout.secureserver.net");
  assert.equal(lastTransportOptions.port, 465);
  assert.equal(lastTransportOptions.secure, true);
});

test("reuses the transport across successful sends", async () => {
  await post(valid); // ensure one exists
  const before = createCalls;
  await post(valid);
  await post(valid);
  assert.equal(createCalls, before);
});
