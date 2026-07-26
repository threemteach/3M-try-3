const steps = [
  "Research",
  "Strategy",
  "UI / UX",
  "Development",
  "Testing",
  "Launch",
];

function Flourish({ flip = false }: { flip?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`h-[8px] w-[64px] bg-[#685a80] sm:w-[82px] ${flip ? "rotate-180" : ""}`}
      style={{ clipPath: "polygon(0 15%, 100% 42%, 100% 58%, 0 85%)" }}
    />
  );
}

export default function Workflow() {
  return (
    <section id="process" className="bg-[#f5f2f3] px-4 py-20 sm:px-8 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1120px]">
        <header className="text-center text-[#312354]">
          <div className="flex items-center justify-center gap-3 sm:gap-5">
            <Flourish />
            <h2 className="whitespace-nowrap text-[32px] leading-none [font-family:MedulaOne] sm:text-[40px]">
              Our Workflow
            </h2>
            <Flourish flip />
          </div>
          <p className="mx-auto mt-3 max-w-[610px] text-[14px] font-semibold leading-relaxed sm:text-[17px]">
            Combining creativity, strategy, and technology to deliver software
            solutions that drive measurable results.
          </p>
        </header>

        <div className="relative mx-auto mt-16 max-w-[980px] sm:mt-20">
          <span
            aria-hidden="true"
            className="absolute bottom-8 left-1/2 top-[72px] w-[3px] -translate-x-1/2 bg-[#5c487d] sm:top-[88px] sm:w-[4px]"
          />
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-0 h-[92px] w-[3px] -translate-x-1/2 -translate-y-5 sm:h-[120px] sm:w-[4px] sm:-translate-y-8"
            style={{
              background:
                "repeating-linear-gradient(to bottom, #aa8bed 0 7px, transparent 7px 14px)",
            }}
          />

          <div className="relative space-y-14 sm:space-y-8">
            {steps.map((title, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={title}
                  className="relative grid min-h-[104px] grid-cols-[1fr_24px_1fr] items-center sm:min-h-[118px] sm:grid-cols-[1fr_54px_1fr]"
                >
                  <article
                    className="relative flex min-h-[62px] w-full max-w-[430px] items-center justify-center rounded-[15px] bg-[#312354] px-1 py-3 text-center text-white shadow-[0_8px_0_#775db0,0_15px_0_#a78be3] sm:min-h-[96px] sm:rounded-[25px] sm:px-12 sm:py-5 sm:shadow-[0_13px_0_#775db0,0_25px_0_#a78be3]"
                    style={{
                      gridColumn: isLeft ? "1" : "3",
                      justifySelf: isLeft ? "end" : "start",
                    }}
                  >
                    <span className="absolute -top-[21px] left-1/2 flex h-[42px] w-[42px] -translate-x-1/2 items-center justify-center rounded-full bg-[#68577f] text-[29px] leading-none [font-family:MedulaOne] sm:-top-[34px] sm:h-[68px] sm:w-[68px] sm:text-[44px]">
                      {index + 1}
                    </span>

                    <span className="hidden sm:block">
                      <Flourish />
                    </span>
                    <h3 className="mx-1 mt-1 whitespace-nowrap text-[19px] leading-none [font-family:MedulaOne] min-[390px]:text-[22px] sm:mx-4 sm:mt-2 sm:text-[36px]">
                      {title}
                    </h3>
                    <span className="hidden sm:block">
                      <Flourish flip />
                    </span>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
