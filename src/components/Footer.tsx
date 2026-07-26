import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Our Work" },
  { href: "/about", label: "About" },
  { href: "/#process", label: "Process" },
];

const stars = [
  "left-[-22px] top-[155px] h-20 w-20 rotate-12 sm:left-[2%] sm:top-[150px] sm:h-24 sm:w-24",
  "left-[8%] top-[125px] h-9 w-9 -rotate-12 sm:h-12 sm:w-12",
  "left-[17%] top-[205px] h-16 w-16 rotate-[18deg] sm:h-24 sm:w-24",
  "left-[27%] top-[145px] h-10 w-10 rotate-45 sm:h-14 sm:w-14",
  "left-[4%] top-[255px] h-10 w-10 rotate-[8deg] sm:h-14 sm:w-14",
  "left-[14%] top-[285px] h-7 w-7 rotate-45 sm:h-10 sm:w-10",
  "right-[3%] top-[185px] h-16 w-16 -rotate-12 sm:h-24 sm:w-24",
  "right-[14%] top-[125px] h-10 w-10 rotate-[18deg] sm:h-14 sm:w-14",
  "right-[23%] top-[205px] h-11 w-11 rotate-45 sm:h-16 sm:w-16",
  "right-[9%] top-[280px] h-8 w-8 -rotate-12 sm:h-12 sm:w-12",
  "right-[27%] top-[270px] h-6 w-6 rotate-45 sm:h-9 sm:w-9",
  "right-[-20px] top-[315px] h-12 w-12 rotate-12 sm:h-16 sm:w-16",
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden bg-[#312354] pb-7 pt-[158px] text-[#e5e0eb] sm:pb-9 sm:pt-[170px]">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[105px] bg-[#f5f2f3]" />
      <a
        href="#"
        aria-label="Scroll back to the top"
        className="group absolute left-1/2 top-[23px] z-[5] h-[165px] w-[225px] -translate-x-1/2 rounded-[50%] bg-[#312354] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#312354] sm:top-[19px] sm:h-[185px] sm:w-[275px]"
      >
        <span className="absolute left-1/2 top-[18px] flex -translate-x-1/2 flex-col items-center sm:top-[22px]">
          {[0, 1, 2, 3, 4].map((line) => (
            <span
              key={line}
              aria-hidden="true"
              className="-mt-[12px] block h-[25px] w-[25px] rotate-45 border-l border-t border-white/75 transition-transform first:mt-0 group-hover:-translate-y-0.5 sm:-mt-[14px] sm:h-[29px] sm:w-[29px]"
            />
          ))}
        </span>
      </a>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0">
        {stars.map((position) => (
          <Image
            key={position}
            src="/star-34.svg"
            alt=""
            width={185}
            height={185}
            className={`absolute object-contain opacity-40 ${position}`}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1120px] flex-col items-center px-4 sm:px-8">
        <Image
          src="/logo.png"
          alt="3M"
          width={616}
          height={388}
          className="h-auto w-[170px] object-contain sm:w-[215px] md:w-[240px]"
        />

        <nav aria-label="Social media" className="mt-3 flex items-center gap-5 sm:mt-4">
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[22px] font-bold leading-none text-[#312354] transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            in
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#312354] transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <span className="relative h-[23px] w-[23px] rounded-[7px] border-[2.5px] border-current after:absolute after:right-[3px] after:top-[3px] after:h-[3px] after:w-[3px] after:rounded-full after:bg-current">
              <span className="absolute left-1/2 top-1/2 h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-current" />
            </span>
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="flex h-10 w-10 items-end justify-center overflow-hidden rounded-full bg-white text-[34px] font-bold leading-[39px] text-[#312354] transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            f
          </a>
        </nav>

        <div className="mt-12 grid w-full max-w-[940px] grid-cols-1 gap-9 text-center sm:mt-14 sm:grid-cols-2 sm:gap-10">
          <section>
            <h2 className="mx-auto w-fit border-b border-white/70 pb-2 text-lg text-white">
              Quick Links
            </h2>
            <ul className="mt-4 flex flex-wrap justify-center gap-x-7 gap-y-3 text-[15px] sm:text-base">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link className="transition-colors hover:text-white" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mx-auto w-fit border-b border-white/70 pb-2 text-lg text-white">
              Contact
            </h2>
            <address className="mt-4 space-y-2 text-[15px] not-italic sm:text-base">
              <a className="block transition-colors hover:text-white" href="mailto:info.3mtechs@gmail.com">
                info.3mtechs@gmail.com
              </a>
              <a className="block transition-colors hover:text-white" href="tel:+201061884370">
                +20 10 6188 43 70
              </a>
            </address>
          </section>
        </div>

        <div className="mt-12 flex w-full max-w-[940px] flex-col items-center justify-between gap-4 text-sm sm:mt-14 sm:flex-row sm:text-[15px]">
          <div className="flex gap-9">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms
            </Link>
          </div>
          <p>© {currentYear} triple m · All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
