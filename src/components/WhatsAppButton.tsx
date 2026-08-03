"use client";

import { SITE_PHONE } from "@/lib/constants";
import { useLanguage } from "@/components/LanguageProvider";

export default function WhatsAppButton() {
  const { isArabic } = useLanguage();
  const whatsappUrl = `https://wa.me/${SITE_PHONE.replace(/\D/g, "")}`;
  const label = isArabic ? "تواصل معنا" : "Chat with us";
  const accessibleLabel = isArabic
    ? "تواصل مع 3M tech عبر واتساب"
    : "Chat with 3M tech on WhatsApp";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab group"
      aria-label={accessibleLabel}
      title={accessibleLabel}
    >
      <span className="whatsapp-fab-label" aria-hidden="true">
        {label}
      </span>
      <span className="whatsapp-fab-icon" aria-hidden="true">
        <svg viewBox="0 0 32 32" role="img">
          <path
            fill="currentColor"
            d="M27.3 4.6A15.8 15.8 0 0 0 2.5 23.7L.3 31.8l8.3-2.2a15.7 15.7 0 0 0 7.5 1.9h.1A15.8 15.8 0 0 0 27.3 4.6ZM16.2 28.8a13 13 0 0 1-6.6-1.8l-.5-.3-4.9 1.3 1.3-4.8-.3-.5a13 13 0 1 1 11 6.1Zm7.1-9.7c-.4-.2-2.3-1.1-2.7-1.3-.3-.1-.6-.2-.8.2-.2.4-1 1.3-1.2 1.5-.2.3-.4.3-.8.1a10.7 10.7 0 0 1-3.2-2 12 12 0 0 1-2.2-2.8c-.2-.4 0-.6.2-.8l.6-.7.4-.7c.1-.3 0-.5 0-.7l-1.2-2.8c-.3-.8-.7-.7-1-.7h-.8c-.3 0-.7.1-1.1.5-.4.4-1.5 1.5-1.5 3.6s1.6 4.2 1.8 4.5c.2.3 3.1 4.7 7.5 6.6 1 .5 1.9.7 2.5.9 1 .3 2 .3 2.7.2.8-.1 2.3-1 2.7-1.9.3-.9.3-1.7.2-1.9-.1-.2-.4-.3-.8-.5Z"
          />
        </svg>
      </span>
    </a>
  );
}
