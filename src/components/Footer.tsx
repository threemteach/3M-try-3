import Image from "next/image";
import Link from "next/link";
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  SITE_PHONE,
  TIKTOK_URL,
} from "@/lib/constants";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Our Work" },
  { href: "/about", label: "About" },
  { href: "/plans", label: "Subscription Plans" },
  { href: "/templates", label: "Ready-made Templates" },
  { href: "/#process", label: "Process" },
];
export default function Footer({ visibility }: { visibility: { plans: boolean; templates: boolean } }) {
  const currentYear = new Date().getFullYear();
  const visibleLinks = quickLinks.filter(({ href }) =>
    (href !== "/plans" || visibility.plans) && (href !== "/templates" || visibility.templates)
  );

  const heading = "mb-3 w-fit border-b border-white/50 pb-1 text-base font-semibold text-white";
  return (
    <footer className="overflow-hidden bg-[#302451] pt-12 text-[#e4deec] sm:pt-20">
      <div className="mx-auto w-[90%] max-w-[1180px]">
        <a href="#" aria-label="Scroll back to the top" className="mx-auto mb-12 block w-32 sm:w-48">
          <Image src="/logo-wordmark-white.svg" width={413} height={337} alt="3M Techs" className="h-auto w-full" />
        </a>
        <div className="grid grid-cols-2 gap-x-4 gap-y-7 text-start sm:grid-cols-[1.5fr_.8fr_1fr] sm:gap-8">
          <div>
            <h2 className={heading}>Follow on</h2>
            <nav aria-label="Social media" className="mt-3 flex items-center gap-5 sm:mt-4">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#312354] transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#312354] transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="currentColor">
              <path d="M13.7 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5H17V3.7c-.7-.1-1.5-.2-2.3-.2-2.3 0-3.9 1.4-3.9 4.1v2.3H8.2V13h2.6v8h2.9Z" />
            </svg>
          </a>
          <a
            href={TIKTOK_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="TikTok"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#312354] transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[21px] w-[21px]" fill="currentColor">
              <path d="M14.1 3h3.1c.3 1.8 1.4 3.4 3 4.3v3.1a8.3 8.3 0 0 1-3-1v5.9A5.7 5.7 0 1 1 12.3 9v3.1a2.7 2.7 0 1 0 1.8 2.6V3Z" />
            </svg>
          </a>
        </nav>
          </div>
          <div>
            <h2 className={heading}>Quick Links</h2>
            <ul className="space-y-1.5">{visibleLinks.map(link => <li key={link.href}><Link href={link.href} className="hover:underline">{link.label}</Link></li>)}</ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h2 className={heading}>Contact</h2>
            <address className="flex flex-col items-start gap-2 not-italic">
              <a href="mailto:info.3mtechs@gmail.com" dir="ltr" className="break-all hover:underline">info.3mtechs@gmail.com</a>
              <a href={`https://wa.me/${SITE_PHONE.replace(/\D/g, "")}`} dir="ltr" className="hover:underline">+20 10 6188 43 70</a>
            </address>
          </div>
        </div>
        <div className="mt-9 flex flex-wrap items-baseline justify-between gap-3 pb-5 text-sm">
          <p>© {currentYear} 3M tech · All rights reserved</p>
          <div className="flex gap-6"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
        </div>
      </div>
      <Image src="/footer-signature.svg" width={794} height={139} alt="" className="block h-auto w-full opacity-60" />
      <div aria-hidden="true" className="h-[calc(5rem+env(safe-area-inset-bottom))] sm:hidden" />
    </footer>
  );
}
