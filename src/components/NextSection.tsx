"use client";

export default function NextSection() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById("work");
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: topOffset + 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative min-h-[200px] sm:min-h-[260px] lg:min-h-[300px] w-full overflow-hidden bg-[#cbc5ce] pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 px-4 flex flex-col items-center justify-center" id="work">
      {/* Desktop Curved Transition (1440px optimized viewBox) */}
      <div className="absolute top-0 left-0 w-full h-[80px] sm:h-[100px] lg:h-[110px] z-10 pointer-events-none hidden sm:block">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-full block">
          {/* Path 1: Innermost layer */}
          <path
            d="M 620 -3 C 670 -3 670 110 720 110 C 770 110 770 -3 820 -3 Z"
            fill="#302451"
            opacity="0.25"
          />
          {/* Path 2: Middle layer */}
          <path
            d="M 630 -3 C 680 -3 680 95 720 95 C 760 95 760 -3 810 -3 Z"
            fill="#302451"
            opacity="0.5"
          />
          {/* Path 3: Outermost layer */}
          <path
            d="M 640 -3 C 690 -3 690 80 720 80 C 750 80 750 -3 800 -3 Z"
            fill="#302451"
          />
          {/* Interactive chevron group */}
          <a href="#work" onClick={handleScroll} className="pointer-events-auto cursor-pointer">
            <g className="chevron-group">
              <path d="M 710 42 L 720 49 L 730 42" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="chevron-arrow arrow-1" />
              <path d="M 710 50 L 720 57 L 730 50" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="chevron-arrow arrow-2" />
              <path d="M 710 58 L 720 65 L 730 58" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="chevron-arrow arrow-3" />
            </g>
          </a>
        </svg>
      </div>

      {/* Mobile Curved Transition (430px optimized viewBox) */}
      <div className="absolute top-0 left-0 w-full h-[60px] sm:h-[70px] z-10 pointer-events-none sm:hidden">
        <svg viewBox="0 0 430 80" preserveAspectRatio="none" className="w-full h-full block">
          {/* Path 1: Innermost layer */}
          <path
            d="M 145 -3 C 180 -3 185 80 215 80 C 245 80 250 -3 285 -3 Z"
            fill="#302451"
            opacity="0.25"
          />
          {/* Path 2: Middle layer */}
          <path
            d="M 155 -3 C 185 -3 190 70 215 70 C 240 70 245 -3 275 -3 Z"
            fill="#302451"
            opacity="0.5"
          />
          {/* Path 3: Outermost layer */}
          <path
            d="M 165 -3 C 190 -3 195 60 215 60 C 235 60 240 -3 265 -3 Z"
            fill="#302451"
          />
          {/* Interactive chevron group */}
          <a href="#work" onClick={handleScroll} className="pointer-events-auto cursor-pointer">
            <g className="chevron-group">
              <path d="M 207 28 L 215 35 L 223 28" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="chevron-arrow arrow-1" />
              <path d="M 207 36 L 215 43 L 223 36" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="chevron-arrow arrow-2" />
              <path d="M 207 44 L 215 51 L 223 44" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="chevron-arrow arrow-3" />
            </g>
          </a>
        </svg>
      </div>

      <div className="flex flex-col items-center justify-center my-auto w-full">
        <h2
          style={{ fontFamily: '"MedulaOne", serif' }}
          className="text-[36px] sm:text-[60px] md:text-[84px] lg:text-[110px] xl:text-[130px] font-normal leading-[1.0] text-[#302451] text-center px-4"
        >
          Dream it and we build it
        </h2>

        {/* Gradient Line below text */}
        <div className="w-[85%] max-w-[1100px] h-[3px] sm:h-[5px] mt-2 sm:mt-4 mx-auto rounded-full bg-gradient-to-r from-transparent via-[#302451] to-transparent opacity-75 pointer-events-none" />
      </div>
    </section>
  );
}
