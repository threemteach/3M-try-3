"use client";

import Image from "next/image";

const services = [
  {
    title: "Web Development",
    description:
      "E-Commerce, Digital Platforms, Portfolio scalable websites built for performance and business growth.",
    features: [
      "Admin Dashboards",
      "Responsive Design",
      "SEO Optimized",
      "Fast Loading",
      "CMS Integration",
    ],
    image: "/services/web-development.png",
    hasCircle: true,
  },
  {
    title: "UI/UX Design",
    description: "Creating intuitive and engaging digital experiences.",
    features: [
      "User Research",
      "Wireframing",
      "Interactive Prototypes",
      "Design Systems",
    ],
    image: "/services/uiux-design.png",
    hasCircle: true,
  },
  {
    title: "Maintenance & Support",
    description:
      "Keeping your products secure, updated, and running smoothly.",
    features: [
      "Performance Optimization",
      "Security Updates",
      "Bug Fixes",
      "Technical Support",
    ],
    image: "/services/maintenance.png",
    hasCircle: true,
  },
  {
    title: "Software Optimization",
    description: "Software tailored to your unique business needs.",
    features: [
      "Business Automation",
      "Management Systems",
      "Internal Tools",
      "API Integrations",
    ],
    image: "/services/software-optimization.png",
    hasCircle: false, // white circle is embedded in the image itself
  },
];

export default function WhatWeDo() {
  return (
    <section className="relative w-full overflow-hidden bg-[#f0edf5] px-4 py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1100px] mx-auto">
        {/* Section Header */}
        <div className="mb-1 flex items-center justify-center gap-3 sm:gap-5">
          <span className="h-[2px] w-9 bg-[#302451]/65 sm:w-16" />
          <h2
            style={{ fontFamily: '"MedulaOne", serif' }}
            className="whitespace-nowrap text-center text-[38px] font-normal leading-none text-[#302451] sm:text-[48px]"
          >
            What We Do
          </h2>
          <span className="h-[2px] w-9 bg-[#302451]/65 sm:w-16" />
        </div>

        <p
          style={{ fontFamily: '"Cairo", sans-serif' }}
          className="mx-auto max-w-[500px] text-center text-[13px] font-semibold text-[#302451]/80 sm:text-[16px]"
        >
          Everything you need to bring your ideas to life.
        </p>

        <div
          dir="ltr"
          className="relative mx-auto mb-8 mt-10 h-[255px] w-full max-w-[980px] min-[400px]:h-[285px] sm:mb-24 sm:mt-12 sm:h-[350px] lg:mb-28 lg:mt-14 lg:h-[370px]"
        >
          <div className="absolute right-[-12px] top-[14px] z-20 h-[215px] w-[225px] min-[400px]:right-0 min-[400px]:top-[16px] min-[400px]:h-[250px] min-[400px]:w-[270px] sm:top-0 sm:h-[330px] sm:w-[400px] lg:h-[360px] lg:w-[440px]">
            <div className="absolute bottom-[3px] right-[5px] h-[185px] w-[185px] rounded-full bg-white shadow-[0_28px_42px_rgba(48,36,81,.10)] min-[400px]:right-[8px] min-[400px]:h-[215px] min-[400px]:w-[215px] sm:bottom-[8px] sm:right-[12px] sm:h-[305px] sm:w-[305px] lg:h-[335px] lg:w-[335px]" />
            <Image
              src="/what we do char.png"
              alt="3M tech character"
              fill
              sizes="(max-width: 399px) 245px, (max-width: 639px) 270px, (max-width: 1023px) 400px, 440px"
              className="object-contain object-bottom"
            />
          </div>

          <div className="approach-card absolute left-0 top-[92px] z-10 min-h-[108px] w-[78%] rounded-[16px] bg-[#302451] px-4 py-4 text-left text-white shadow-[0_10px_0_#876dca,0_20px_0_rgba(135,109,202,.42)] min-[400px]:top-[108px] min-[400px]:min-h-[124px] min-[400px]:w-[76%] min-[400px]:px-5 min-[400px]:py-5 sm:top-[128px] sm:min-h-0 sm:w-[78%] sm:rounded-[22px] sm:px-8 sm:py-7 sm:shadow-[0_12px_0_#876dca,0_24px_0_rgba(135,109,202,.42)] md:w-[75%] lg:top-[146px] lg:w-[74%] lg:px-10">
            <p className="approach-label text-[9px] font-bold text-[#c9b8ef] min-[400px]:text-[11px] sm:text-[15px]">
              Our approach
            </p>
            <p className="approach-copy mt-1 max-w-[510px] pr-[72px] text-[7px] font-bold leading-[1.7] min-[360px]:pr-[88px] min-[400px]:mt-1.5 min-[400px]:pr-[102px] min-[400px]:text-[8px] sm:mt-3 sm:pr-20 sm:text-[12px] sm:leading-6 lg:pr-16 lg:text-[13px] lg:leading-7">
              No random AI design directions—every product decision is intentional,
              researched, and connected to the client&apos;s business.
            </p>
          </div>
        </div>

        {/* Service Cards */}
        <div className="flex flex-col gap-4 sm:gap-6">
          {services.map((service, idx) => {
            const isReversed = idx % 2 !== 0;
            return (
              <article
                key={idx}
                dir="ltr"
                className={`relative w-full rounded-[24px] sm:rounded-[32px] border-[3px] border-white bg-[#302451] overflow-hidden flex ${
                  isReversed ? "flex-row-reverse" : "flex-row"
                }`}
                style={{ height: "clamp(180px, 45vw, 430px)" }}
              >
                {/* Text Content - 56% */}
                <div
                  className="service-card-copy flex flex-col justify-center min-w-0 z-10"
                  style={{
                    width: "56%",
                    paddingTop: "clamp(10px, 2.5vw, 40px)",
                    paddingBottom: "clamp(10px, 2.5vw, 40px)",
                    paddingLeft: isReversed
                      ? "clamp(8px, 2vw, 24px)"
                      : "clamp(14px, 3.5vw, 52px)",
                    paddingRight: isReversed
                      ? "clamp(14px, 3.5vw, 52px)"
                      : "clamp(8px, 2vw, 24px)",
                  }}
                >
                  <h3
                    style={{ fontFamily: '"MedulaOne", serif' }}
                    className="text-[clamp(19px,4.4vw,72px)] text-white leading-tight mb-1 sm:mb-2"
                  >
                    {service.title}
                  </h3>

                  <p
                    style={{ fontFamily: '"Cairo", sans-serif' }}
                    className="text-[clamp(9px,1.9vw,24px)] text-white/90 mb-1.5 sm:mb-3 leading-snug"
                  >
                    {service.description}
                  </p>

                  <ul
                    className="flex flex-col"
                    style={{ gap: "clamp(2px, 0.7vw, 10px)" }}
                  >
                    {service.features.map((feat, fIdx) => (
                      <li
                        key={fIdx}
                        style={{
                          fontFamily: '"Cairo", sans-serif',
                          fontSize: "clamp(9px, 1.7vw, 22px)",
                        }}
                        className="flex items-center gap-1.5 sm:gap-2.5 text-white font-semibold"
                      >
                        <svg
                          viewBox="0 0 14 14"
                          fill="none"
                          className="shrink-0"
                          style={{
                            width: "clamp(9px, 1.2vw, 14px)",
                            height: "clamp(9px, 1.2vw, 14px)",
                          }}
                        >
                          <path
                            d="M2 7.5L5 10.5L12 3"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Image Area - 44% */}
                <div
                  className="relative shrink-0 h-full"
                  style={{ width: "44%" }}
                >
                  {/* White Circle (only for cards 1-3, card 4 has it embedded) */}
                  {service.hasCircle && (
                    <div
                      className="absolute rounded-full bg-white"
                      style={{
                        width: "clamp(150px, 38vw, 365px)",
                        height: "clamp(150px, 38vw, 365px)",
                        top: "50%",
                        left: isReversed ? "41%" : "59%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  )}

                  {/* Image */}
                  <div
                    className="absolute z-10"
                    style={
                      service.hasCircle
                        ? {
                            width: isReversed ? "96%" : "104%",
                            height: "86%",
                            bottom: "0",
                            ...(isReversed
                              ? { left: "calc(2% + 50px)" }
                              : { right: "-5%" }),
                          }
                        : {
                            width: "88%",
                            height: "84%",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                          }
                    }
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 640px) 40vw, 480px"
                      className={`object-contain ${
                        service.hasCircle
                          ? isReversed
                            ? "object-left-bottom"
                            : "object-right-bottom"
                          : "object-center"
                      }`}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
