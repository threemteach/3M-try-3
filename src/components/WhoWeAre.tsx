import Image from "next/image";

const badges = [
  { label: "Growth", position: "left-[1%] top-[20%] -rotate-[14deg]" },
  { label: "Development", position: "left-[3%] top-[61%] -rotate-[12deg]" },
  { label: "Strategy", position: "right-[1%] top-[13%] -rotate-[9deg]" },
  { label: "Design", position: "right-0 top-[57%] rotate-[18deg]" },
];

const features = [
  {
    title: "User-Centered Design",
    icon: (
      <>
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5.5 19c1.2-3.2 3.8-5 6.5-5s5.3 1.8 6.5 5" />
      </>
    ),
  },
  {
    title: "Scalable Development",
    icon: (
      <>
        <path d="M4 19v-5.5M9.5 19V9M15 19v-7M20 19V5" />
        <path d="m4 11.5 5.5-5.5 3.5 3 6-6.5M16 2h4v4" />
      </>
    ),
  },
  {
    title: "Long-Term Partnership",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.2" />
        <path d="M12 7.5V12l3 2" />
      </>
    ),
  },
];

export default function WhoWeAre() {
  return (
    <section
      aria-labelledby="who-we-are-title"
      className="relative overflow-hidden bg-[#312354] px-3 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-16 lg:px-10 lg:pb-20 lg:pt-10"
    >
      <h2 id="who-we-are-title" className="sr-only">
        Who We Are
      </h2>

      <div className="relative mx-auto flex w-full max-w-[1120px] flex-col items-center">
        <div className="relative flex h-[330px] w-full max-w-[650px] items-center justify-center sm:h-[430px] sm:max-w-[850px] lg:h-[500px] lg:max-w-[1000px]">
          {badges.map((badge) => (
            <span
              key={badge.label}
              aria-hidden="true"
              className={`absolute z-10 flex h-[38px] w-[100px] items-center justify-center rounded-full border border-white/15 bg-[#4a3d6b] text-[12px] font-medium text-white shadow-[0_9px_17px_rgba(0,0,0,.22)] sm:h-[44px] sm:w-[116px] sm:text-sm ${badge.position}`}
            >
              {badge.label}
            </span>
          ))}

          <div className="relative h-[275px] w-[265px] sm:h-[390px] sm:w-[380px] lg:h-[485px] lg:w-[470px]">
            <Image
              src="/who-we-are.png"
              alt="Who We Are"
              fill
              sizes="(max-width: 640px) 265px, (max-width: 1024px) 380px, 470px"
              className="object-contain"
              priority
            />
          </div>
        </div>

        <p className="mt-4 flex max-w-[860px] items-start gap-3 text-left text-[12px] leading-6 text-white sm:mt-5 sm:text-[15px] sm:leading-7 lg:text-base">
          <span className="mt-[7px] shrink-0 text-[14px] leading-none text-white" aria-hidden="true">
            ▶
          </span>
          <span>
            We combine design, technology, and strategy to build digital products
            that help businesses launch faster, scale smarter, and stand out in a
            competitive market.
          </span>
        </p>
        <p className="mt-5 max-w-[760px] rounded-full border border-white/15 bg-white/8 px-5 py-3 text-center text-[11px] font-semibold leading-5 text-white/80 sm:px-7 sm:text-sm">
          No random AI design directions—every product decision is intentional,
          researched, and connected to the client&apos;s business.
        </p>

        <div className="mt-11 grid w-full max-w-[1040px] grid-cols-3 gap-2 sm:mt-12 sm:gap-4 lg:gap-6">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="relative flex min-h-[64px] items-center justify-center rounded-[9px] bg-white px-1 pb-3 pt-4 text-center shadow-[0_9px_0_#8064bd,0_15px_14px_rgba(0,0,0,.18)] sm:min-h-[76px] sm:rounded-[12px] sm:px-4 sm:pb-4 sm:pt-5 sm:shadow-[0_13px_0_#8064bd,0_20px_18px_rgba(0,0,0,.18)]"
            >
              <span
                className="absolute -top-[29px] left-1/2 flex h-[35px] w-[82px] -translate-x-1/2 items-start justify-center bg-white pt-[5px] sm:-top-[35px] sm:h-[41px] sm:w-[100px] sm:pt-[7px]"
                style={{
                  clipPath: "ellipse(50% 100% at 50% 100%)",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="h-[19px] w-[19px] stroke-[#312354] [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.35] sm:h-[23px] sm:w-[23px]"
                >
                  {feature.icon}
                </svg>
              </span>
              <h3 className="mt-1 text-[9px] font-bold leading-tight text-[#312354] min-[390px]:text-[10px] sm:whitespace-nowrap sm:text-[12px] md:text-[14px] lg:text-base">
                {feature.title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
