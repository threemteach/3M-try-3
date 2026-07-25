"use client";

import Image from "next/image";

const services = [
  {
    title: "Web Development",
    description:
      "E-Commerce, Digital Platforms, Portfolio — scalable websites built for performance and business growth.",
    features: [
      "Admin Dashboards",
      "Responsive Design",
      "SEO Optimized",
      "Fast Loading",
      "CMS Integration",
    ],
    image: "/services/web-development.png",
  },
  {
    title: "UI/UX Design",
    description:
      "Creating intuitive and engaging digital experiences.",
    features: [
      "User Research",
      "Wireframing",
      "Interactive Prototypes",
      "Design Systems",
    ],
    image: "/services/uiux-design.png",
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
    image: "/rentgo-preview.png",
  },
  {
    title: "Software Optimization",
    description:
      "Software tailored to your unique business needs.",
    features: [
      "Business Automation",
      "Management Systems",
      "Internal Tools",
      "API Integrations",
    ],
    image: "/royalcars-preview.png",
  },
];

export default function WhatWeDo() {
  return (
    <section className="relative w-full bg-[#f0edf5] py-16 sm:py-20 lg:py-24 px-4 overflow-hidden">
      <div className="max-w-[1100px] mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-3">
          <span className="hidden sm:block h-[2px] w-10 lg:w-16 bg-[#302451]" />
          <h2
            style={{ fontFamily: '"MedulaOne", serif' }}
            className="text-[36px] sm:text-[60px] md:text-[84px] lg:text-[110px] xl:text-[130px] font-normal leading-[1.0] text-[#302451] text-center px-4 whitespace-nowrap"
          >
            What We Do
          </h2>
          <span className="hidden sm:block h-[2px] w-10 lg:w-16 bg-[#302451]" />
        </div>

        <p
          style={{ fontFamily: '"Cairo", sans-serif' }}
          className="text-center text-sm sm:text-base text-gray-500 mb-10 sm:mb-14 max-w-[500px] mx-auto"
        >
          Everything you need to bring your ideas to life.
        </p>

        {/* Service Cards */}
        <div className="flex flex-col gap-5 sm:gap-6">
          {services.map((service, idx) => {
            const isReversed = idx % 2 !== 0;
            return (
              <article
                key={idx}
                className={`relative w-full rounded-[28px] sm:rounded-[36px] border-2 border-white bg-[#302451] overflow-hidden flex flex-row ${isReversed ? "flex-row-reverse" : ""}`}
                style={{ minHeight: "clamp(140px, 35vw, 408px)" }}
              >
                {/* Text Content - 56% */}
                <div className={`flex flex-col justify-center z-10 min-w-0 ${isReversed ? "pl-4 pr-5 sm:pl-6 sm:pr-8 lg:pl-6 lg:pr-14" : "pl-5 pr-4 sm:pl-8 sm:pr-6 lg:pl-14 lg:pr-6"}`}
                  style={{ width: "clamp(55%, 56%, 56%)", paddingTop: "clamp(10px, 2.5vw, 58px)", paddingBottom: "clamp(10px, 2.5vw, 58px)" }}
                >
                  <h3
                    style={{ fontFamily: '"MedulaOne", serif' }}
                    className="text-[clamp(18px,4.2vw,70px)] text-white leading-tight mb-1 sm:mb-3"
                  >
                    {service.title}
                  </h3>

                  <p
                    style={{ fontFamily: '"Cairo", sans-serif' }}
                    className="text-[clamp(10px,2vw,26px)] text-white mb-2 sm:mb-4 leading-relaxed"
                  >
                    {service.description}
                  </p>

                  <ul className="flex flex-col gap-1 sm:gap-2.5">
                    {service.features.map((feat, fIdx) => (
                      <li
                        key={fIdx}
                        style={{ fontFamily: '"Cairo", sans-serif', fontSize: "clamp(9px,1.6vw,23px)" }}
                        className="flex items-center gap-1.5 sm:gap-2.5 text-white font-semibold"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          className="shrink-0"
                          style={{ width: "clamp(9px,1.2vw,14px)", height: "clamp(9px,1.2vw,14px)" }}
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
                <div className="relative shrink-0 overflow-hidden"
                  style={{ width: "clamp(44%, 44%, 44%)", minHeight: "clamp(140px, 35vw, 340px)" }}
                >
                  {/* White Circle */}
                  <div
                    className="absolute rounded-full bg-white"
                    style={{
                      width: "clamp(120px, 28vw, 360px)",
                      height: "clamp(120px, 28vw, 360px)",
                      top: "50%",
                      left: "50%",
                      transform: isReversed
                        ? "translate(-50%, -40%) translateX(-15%)"
                        : "translate(-50%, -40%) translateX(15%)",
                    }}
                  />
                  {/* Image */}
                  <div
                    className={`absolute z-10 ${isReversed ? "-ml-[10px] sm:ml-0" : "-mr-[10px] sm:mr-0"}`}
                    style={{
                      width: "clamp(130px, 30vw, 372px)",
                      height: "clamp(120px, 28vw, 336px)",
                      bottom: "0",
                      [isReversed ? "left" : "right"]: "0",
                      maxWidth: "100%",
                    }}
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-contain object-right-bottom"
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
