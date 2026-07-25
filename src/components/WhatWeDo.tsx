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
    image: "/royalcars-preview.png",
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
                className={`relative w-full rounded-[28px] sm:rounded-[36px] border-2 border-white bg-[#302451] overflow-hidden flex flex-col sm:flex-row min-h-[300px] sm:min-h-[320px] lg:min-h-[340px] ${isReversed ? "sm:flex-row-reverse" : ""}`}
              >
                {/* Text Content */}
                <div className={`flex-1 p-7 sm:p-9 lg:pl-14 lg:pr-6 lg:py-12 flex flex-col justify-center z-10 ${isReversed ? "sm:pl-6 sm:pr-0" : ""}`}>
                  <h3
                    style={{ fontFamily: '"MedulaOne", serif' }}
                    className="text-[36px] sm:text-[46px] lg:text-[58px] text-white leading-tight mb-3"
                  >
                    {service.title}
                  </h3>

                  <p
                    style={{ fontFamily: '"Cairo", sans-serif' }}
                    className="text-[16px] sm:text-[19px] lg:text-[22px] text-white mb-5 leading-relaxed max-w-[460px]"
                  >
                    {service.description}
                  </p>

                  <ul className="flex flex-col gap-2.5">
                    {service.features.map((feat, fIdx) => (
                      <li
                        key={fIdx}
                        style={{ fontFamily: '"Cairo", sans-serif' }}
                        className="flex items-center gap-2.5 text-white text-[15px] sm:text-[17px] lg:text-[19px] font-semibold"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          className="shrink-0"
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

                {/* Image Area - White Circle behind + Image on top */}
                <div
                  className={`relative w-full sm:w-[42%] lg:w-[44%] min-h-[240px] sm:min-h-0 flex items-center justify-center ${isReversed ? "" : ""}`}
                >
                  {/* White Circle (background decoration) */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 translate-x-[15px] w-[240px] h-[240px] sm:w-[276px] sm:h-[276px] lg:w-[324px] lg:h-[324px] rounded-full bg-white shrink-0"
                  />
                  {/* Image on top of circle */}
                  <div className={`absolute bottom-[-84.25px] ${isReversed ? "left-[-25%]" : "right-[0%]"} w-[90%] h-[85%] z-10`}>
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-contain object-center"
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
