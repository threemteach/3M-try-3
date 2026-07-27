"use client";

import { FormEvent, useState } from "react";
import emailjs from "@emailjs/browser";
import { SITE_PHONE } from "@/lib/constants";

type FieldName = "name" | "email" | "phone" | "details";
type FieldErrors = Partial<Record<FieldName, string>>;

function Flourish({ flip = false }: { flip?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`hidden h-[8px] w-[65px] bg-[#685a80] sm:block md:w-[85px] ${flip ? "rotate-180" : ""}`}
      style={{ clipPath: "polygon(0 15%, 100% 42%, 100% 58%, 0 85%)" }}
    />
  );
}

export default function ContactForm() {
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function validate(values: Record<FieldName, string>) {
    const nextErrors: FieldErrors = {};

    if (values.name.length < 2) {
      nextErrors.name = "Please enter your full name.";
    } else if (values.name.length > 80) {
      nextErrors.name = "Name must be 80 characters or fewer.";
    }

    if (!values.email) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(values.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    const phoneDigits = values.phone.replace(/\D/g, "");
    if (!values.phone) {
      nextErrors.phone = "Please enter your phone number.";
    } else if (phoneDigits.length < 8 || phoneDigits.length > 15) {
      nextErrors.phone = "Enter a valid phone number with 8–15 digits.";
    }

    if (values.details.length < 20) {
      nextErrors.details = "Please tell us a little more (at least 20 characters).";
    } else if (values.details.length > 2000) {
      nextErrors.details = "Project details must be 2,000 characters or fewer.";
    }

    return nextErrors;
  }

  function clearFieldError(field: FieldName) {
    setFieldErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const method = submitter?.value ?? "email";
    const data = new FormData(event.currentTarget);
    const values = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      details: String(data.get("details") ?? "").trim(),
    };
    const validationErrors = validate(values);

    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      setError(false);
      const firstInvalidField = Object.keys(validationErrors)[0] as FieldName;
      document.getElementById(`contact-${firstInvalidField}`)?.focus();
      return;
    }

    setFieldErrors({});
    const { name, email, phone, details } = values;

    if (method === "whatsapp") {
      const message = [
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : "",
        "",
        details,
      ].join("\n");
      window.location.href = `https://wa.me/${SITE_PHONE.replace("+", "")}?text=${encodeURIComponent(message)}`;
      return;
    }

    setError(false);
    setSending(true);

    const msg = `Email: ${email}${phone ? `\nPhone: ${phone}\n\n` : "\n\n"}${details}`;
    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        { name, email, message: msg },
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! },
      )
      .then(() => {
        setSubmitted(true);
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        setError(true);
      })
      .finally(() => {
        setSending(false);
      });
  }

  const fieldClass = (field: FieldName) =>
    `w-full rounded-[16px] border bg-[#9d96aa] px-5 py-4 text-[15px] text-white outline-none placeholder:text-white/75 transition-[border-color,box-shadow] focus:ring-2 sm:px-7 sm:py-5 sm:text-base ${
      fieldErrors[field]
        ? "border-red-300 ring-2 ring-red-300/35 focus:ring-red-300"
        : "border-transparent focus:ring-white/85"
    }`;

  const fieldError = (field: FieldName) =>
    fieldErrors[field] ? (
      <p
        id={`contact-${field}-error`}
        className="mt-2 px-1 text-xs font-semibold text-red-200"
        role="alert"
      >
        {fieldErrors[field]}
      </p>
    ) : null;

  return (
    <section id="contact-form" className="bg-[#f5f2f3] px-4 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-[940px]">
        <header className="text-center text-[#312354]">
          <div className="flex items-center justify-center gap-4">
            <Flourish />
            <h2 className="text-[30px] leading-none [font-family:MedulaOne] sm:text-[38px] md:text-[44px]">
              Let&apos;s Build Something Great Together
            </h2>
            <Flourish flip />
          </div>
          <p className="mx-auto mt-4 max-w-[650px] text-[14px] font-semibold leading-relaxed sm:text-[17px]">
            Have a project in mind?
            <br />
            We&apos;d love to hear your ideas and help bring them to life.
          </p>
        </header>

        {submitted ? (
          <div className="mx-auto mt-10 max-w-[780px] rounded-[34px] bg-[#312354] p-10 text-center shadow-[0_16px_28px_rgba(49,35,84,.18)] sm:mt-12 sm:p-12">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <h3 className="text-xl font-bold text-white">Message Sent!</h3>
            <p className="mt-2 text-white/70">Thank you for reaching out. We&apos;ll get back to you soon.</p>
          </div>
        ) : (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="mx-auto mt-10 max-w-[780px] space-y-5 rounded-[34px] bg-[#312354] p-5 shadow-[0_16px_28px_rgba(49,35,84,.18)] sm:mt-12 sm:space-y-7 sm:p-10 md:p-12"
        >
          <label className="sr-only" htmlFor="contact-name">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={80}
            autoComplete="name"
            placeholder="Name"
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
            onInput={() => clearFieldError("name")}
            className={fieldClass("name")}
          />
          {fieldError("name")}

          <div className="grid gap-5 sm:grid-cols-2 sm:gap-4">
            <div>
              <label className="sr-only" htmlFor="contact-email">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="Email"
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
                onInput={() => clearFieldError("email")}
                className={fieldClass("email")}
              />
              {fieldError("email")}
            </div>
            <div>
              <label className="sr-only" htmlFor="contact-phone">
                Phone Number
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                required
                inputMode="numeric"
                pattern="[0-9]*"
                minLength={8}
                maxLength={15}
                autoComplete="tel"
                placeholder="Phone Number"
                aria-invalid={Boolean(fieldErrors.phone)}
                aria-describedby={fieldErrors.phone ? "contact-phone-error" : undefined}
                onInput={(event) => {
                  event.currentTarget.value = event.currentTarget.value.replace(/\D/g, "");
                  clearFieldError("phone");
                }}
                className={fieldClass("phone")}
              />
              {fieldError("phone")}
            </div>
          </div>

          <label className="sr-only" htmlFor="contact-details">
            Project details
          </label>
          <textarea
            id="contact-details"
            name="details"
            required
            minLength={20}
            maxLength={2000}
            rows={7}
            placeholder="Details"
            aria-invalid={Boolean(fieldErrors.details)}
            aria-describedby={fieldErrors.details ? "contact-details-error" : undefined}
            onInput={() => clearFieldError("details")}
            className={`${fieldClass("details")} min-h-[190px] resize-y sm:min-h-[230px]`}
          />
          {fieldError("details")}

          {error && (
            <p className="text-center text-sm text-red-400">
              Something went wrong. Please try again or contact us directly.
            </p>
          )}

          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <button
              type="submit"
              name="sendMethod"
              value="email"
              disabled={sending}
              className="flex min-h-[54px] items-center justify-center gap-1.5 rounded-[14px] bg-white px-2 text-[11px] font-bold text-[#312354] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white min-[390px]:text-[12px] sm:min-h-[58px] sm:gap-3 sm:rounded-[17px] sm:px-5 sm:text-base disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {sending ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full border-2 border-[#312354]/30 border-t-[#312354] animate-spin" />
                  Sending...
                </span>
              ) : (
                <>
                  <span aria-hidden="true" className="flex"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></span>
                  Send Via Email
                </>
              )}
            </button>
            <button
              type="submit"
              name="sendMethod"
              value="whatsapp"
              disabled={sending}
              className="flex min-h-[54px] items-center justify-center gap-1.5 rounded-[14px] border-2 border-white bg-transparent px-2 text-[11px] font-bold text-white transition-colors hover:bg-white hover:text-[#312354] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white min-[390px]:text-[12px] sm:min-h-[58px] sm:gap-3 sm:rounded-[17px] sm:px-5 sm:text-base disabled:opacity-50"
            >
              <span aria-hidden="true" className="flex"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></span>
              Send Via Whatsapp
            </button>
          </div>
        </form>
        )}
      </div>
    </section>
  );
}
