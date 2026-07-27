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
    <section className="relative w-full bg-[#f0edf5] py-16 sm:py-20 lg:py-24 px-4 overflow-hidden">
      <div className="max-w-[1100px] mx-auto">
        {/* Section Header */}
        <div className="mb-3 flex items-center justify-center gap-2 sm:gap-6">
          <span className="h-[2px] w-7 bg-[#302451] sm:w-12 lg:w-20" />
          <h2
            style={{ fontFamily: '"MedulaOne", serif' }}
            className="whitespace-nowrap px-2 text-center text-[36px] font-normal leading-[1.0] text-[#302451] sm:px-4 sm:text-[60px] md:text-[84px] lg:text-[110px] xl:text-[130px]"
          >
            What We Do
          </h2>
          <span className="h-[2px] w-7 bg-[#302451] sm:w-12 lg:w-20" />
        </div>
        <div className="mx-auto mb-5 h-[3px] w-[76%] max-w-[700px] rounded-full bg-gradient-to-r from-transparent via-[#302451] to-transparent opacity-70 sm:h-[4px]" />

        <p
          style={{ fontFamily: '"Cairo", sans-serif' }}
          className="mx-auto mb-3 max-w-[500px] text-center text-sm text-gray-500 sm:text-base"
        >
          Everything you need to bring your ideas to life.
        </p>
        <p className="mx-auto mb-10 max-w-[720px] text-center text-[12px] font-semibold leading-6 text-[#302451]/75 sm:mb-14 sm:text-sm">
          We don&apos;t create random AI-generated designs. Every interface is
          shaped by research, brand context, and a real business goal.
        </p>

        {/* Service Cards */}
        <div className="flex flex-col gap-4 sm:gap-6">
          {services.map((service, idx) => {
            const isReversed = idx % 2 !== 0;
            return (
              <article
                key={idx}
                className={`relative w-full rounded-[24px] sm:rounded-[32px] border-[3px] border-white bg-[#302451] overflow-hidden flex ${
                  isReversed ? "flex-row-reverse" : "flex-row"
                }`}
                style={{ height: "clamp(180px, 45vw, 430px)" }}
              >
                {/* Text Content - 56% */}
                <div
                  className="flex flex-col justify-center min-w-0 z-10"
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
                            width: "96%",
                            height: "86%",
                            bottom: "0",
                            ...(isReversed
                              ? { left: "calc(2% + 50px)" }
                              : { right: "2%" }),
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
