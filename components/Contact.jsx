"use client";

import { useState } from "react";
import { Form, TextField, TextArea, Label, Input, FieldError } from "react-aria-components";

import { Button } from "./ui/Button";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    // TODO: wire this to a real backend when ready — e.g. an API route at
    // /app/api/contact/route.js that sends the data via Resend/Nodemailer.
    // For now this simulates a submission so the UX is complete end-to-end.
    // Capture the form node now: `e.currentTarget` is nulled once the event
    // finishes dispatching, so reading it inside the timeout would throw.
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    console.log("Contact form submission:", data);

    setTimeout(() => {
      setStatus("sent");
      form.reset();
    }, 600);
  }

  return (
    <section id="contact" className="flex min-h-[calc(100vh-4rem)] items-center bg-ink-50">
      <div className="container-page py-20 sm:py-28">
        <div className="mx-auto flex w-full max-w-xl flex-col items-center text-center">
          <p className="file-tag mb-5">Get in Touch</p>
          <h1 className="text-3xl font-semibold leading-tight text-ink-900 sm:text-4xl">
            Let&apos;s scope your next case file.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ink-600">
            Tell us what your team needs covered and we&apos;ll come back with a clear,
            practical plan — no generic sales deck. Usually within one business day.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3 text-sm text-ink-500">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4.5L8 9L14 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </span>
            <a href="mailto:hello@benchstrength.uk" className="transition-colors hover:text-primary-700">
              hello@benchstrength.uk
            </a>
          </div>
        </div>

        <div className="mx-auto mt-12 w-full max-w-xl rounded-2xl border border-ink-200 bg-white p-6 shadow-card sm:p-10">
          {status === "sent" ? (
            <div className="flex flex-col items-start gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-confirm-100 text-confirm-700">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10.5L8 14.5L16 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="font-display text-lg font-semibold text-ink-900">Message sent</h2>
              <p className="text-sm leading-relaxed text-ink-600">
                Thanks — we&apos;ve logged your message and will get back to you within one
                business day.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-1 text-sm font-semibold text-primary-700 hover:text-primary-800"
              >
                Send another message
              </button>
            </div>
          ) : (
            <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 text-left sm:grid-cols-2">
              <TextField name="name" isRequired className="flex flex-col gap-1.5 sm:col-span-1">
                <Label className="text-sm font-medium text-ink-700">Name</Label>
                <Input
                  placeholder="Your full name"
                  className="rounded-lg border border-ink-300 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-400 data-[focused]:border-primary-500 data-[focused]:ring-2 data-[focused]:ring-primary-100 data-[invalid]:border-red-400"
                />
                <FieldError className="text-xs text-red-600" />
              </TextField>

              <TextField name="email" type="email" isRequired className="flex flex-col gap-1.5 sm:col-span-1">
                <Label className="text-sm font-medium text-ink-700">Email</Label>
                <Input
                  placeholder="you@company.com"
                  className="rounded-lg border border-ink-300 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-400 data-[focused]:border-primary-500 data-[focused]:ring-2 data-[focused]:ring-primary-100 data-[invalid]:border-red-400"
                />
                <FieldError className="text-xs text-red-600" />
              </TextField>

              <TextField name="message" isRequired className="flex flex-col gap-1.5 sm:col-span-2">
                <Label className="text-sm font-medium text-ink-700">Message</Label>
                <TextArea
                  placeholder="Tell us what you need covered..."
                  rows={5}
                  className="resize-none rounded-lg border border-ink-300 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-400 data-[focused]:border-primary-500 data-[focused]:ring-2 data-[focused]:ring-primary-100 data-[invalid]:border-red-400"
                />
                <FieldError className="text-xs text-red-600" />
              </TextField>

              <div className="sm:col-span-2">
                <Button
                  type="submit"
                  isDisabled={status === "sending"}
                  lift
                  className="w-full sm:w-auto"
                >
                  {status === "sending" ? "Sending…" : "Send Message"}
                </Button>
              </div>
            </Form>
          )}
        </div>
      </div>
    </section>
  );
}
