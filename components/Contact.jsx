"use client";

import { useState } from "react";
import { Form, TextField, TextArea, Label, Input, Button, FieldError } from "react-aria-components";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    // TODO: wire this to a real backend when ready — e.g. an API route at
    // /app/api/contact/route.js that sends the data via Resend/Nodemailer.
    // For now this simulates a submission so the UX is complete end-to-end.
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log("Contact form submission:", data);

    setTimeout(() => {
      setStatus("sent");
      e.currentTarget.reset();
    }, 600);
  }

  return (
    <section id="contact" className="border-t border-ink-200 bg-white">
      <div className="container-page grid grid-cols-1 gap-14 py-24 sm:py-32 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="file-tag mb-5">Get in Touch</p>
          <h2 className="text-3xl font-semibold leading-tight text-ink-900 sm:text-4xl">
            Let's scope your next case file.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-600">
            Tell us what your team needs covered and we'll come back with a clear,
            practical plan — no generic sales deck. Usually within one business day.
          </p>

          <div className="mt-9 flex items-center gap-3 text-sm text-ink-500">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4.5L8 9L14 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </span>
            hello@stylehive.co.uk
          </div>
        </div>

        <div className="lg:col-span-7">
          {status === "sent" ? (
            <div className="flex flex-col items-start gap-3 rounded-2xl border border-confirm-100 bg-confirm-50 p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-confirm-100 text-confirm-700">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10.5L8 14.5L16 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-display text-lg font-semibold text-ink-900">Message sent</h3>
              <p className="text-sm leading-relaxed text-ink-600">
                Thanks — we've logged your message and will get back to you within one
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
            <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
                  className="cursor-pointer rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-700 hover:shadow-card-hover data-[pressed]:translate-y-0 data-[pressed]:bg-primary-800 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-60 data-[focus-visible]:ring-2 data-[focus-visible]:ring-primary-400 data-[focus-visible]:ring-offset-2"
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
