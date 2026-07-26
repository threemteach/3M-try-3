"use client";

import { FormEvent } from "react";

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
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const method = submitter?.value ?? "email";
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const phone = String(data.get("phone") ?? "");
    const details = String(data.get("details") ?? "");
    const message = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      "",
      details,
    ].join("\n");

    if (method === "whatsapp") {
      window.location.href = `https://wa.me/201061884370?text=${encodeURIComponent(message)}`;
      return;
    }

    window.location.href = `mailto:info.3mtechs@gmail.com?subject=${encodeURIComponent(
      `New project inquiry from ${name}`,
    )}&body=${encodeURIComponent(message)}`;
  }

  const fieldClass =
    "w-full rounded-[16px] border-0 bg-[#9d96aa] px-5 py-4 text-[15px] text-white outline-none placeholder:text-white/75 focus:ring-2 focus:ring-white/85 sm:px-7 sm:py-5 sm:text-base";

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

        <form
          onSubmit={handleSubmit}
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
            autoComplete="name"
            placeholder="Name"
            className={fieldClass}
          />

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
                className={fieldClass}
              />
            </div>
            <div>
              <label className="sr-only" htmlFor="contact-phone">
                Phone Number
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="Phone Number"
                className={fieldClass}
              />
            </div>
          </div>

          <label className="sr-only" htmlFor="contact-details">
            Project details
          </label>
          <textarea
            id="contact-details"
            name="details"
            required
            rows={7}
            placeholder="Details"
            className={`${fieldClass} min-h-[190px] resize-y sm:min-h-[230px]`}
          />

          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <button
              type="submit"
              name="sendMethod"
              value="email"
              className="flex min-h-[54px] items-center justify-center gap-1.5 rounded-[14px] bg-white px-2 text-[11px] font-bold text-[#312354] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white min-[390px]:text-[12px] sm:min-h-[58px] sm:gap-3 sm:rounded-[17px] sm:px-5 sm:text-base"
            >
              <span aria-hidden="true" className="text-base sm:text-xl">✉</span>
              Send Via Email
            </button>
            <button
              type="submit"
              name="sendMethod"
              value="whatsapp"
              className="flex min-h-[54px] items-center justify-center gap-1.5 rounded-[14px] border-2 border-white bg-transparent px-2 text-[11px] font-bold text-white transition-colors hover:bg-white hover:text-[#312354] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white min-[390px]:text-[12px] sm:min-h-[58px] sm:gap-3 sm:rounded-[17px] sm:px-5 sm:text-base"
            >
              <span aria-hidden="true" className="text-base sm:text-xl">◉</span>
              Send Via Whatsapp
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
