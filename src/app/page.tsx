import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";

const services = [
  {
    title: "Strategy Consulting",
    description: "We help businesses define their vision and build actionable roadmaps for sustainable growth.",
    icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
  },
  {
    title: "Project Management",
    description: "End-to-end project execution with proven methodologies that deliver on time and within budget.",
    icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Digital Transformation",
    description: "Modernize your operations with cutting-edge technology solutions tailored to your needs.",
    icon: "M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 00.659 1.591L19 14.5m-4.25-11.396c.251.023.501.05.75.082M5 14.5l-1.43 1.43a2.25 2.25 0 000 3.18l1.5 1.5a2.25 2.25 0 003.18 0L10.5 14.5m-5.5 0h5.5",
  },
  {
    title: "Market Analysis",
    description: "Data-driven insights to identify opportunities and make informed business decisions.",
    icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative min-h-[90vh] lg:min-h-screen overflow-hidden bg-[#302451]">
        <Image
          src="/rectangles.png"
          alt=""
          width={850}
          height={600}
          className="absolute right-0 top-4 z-0 h-auto w-[440px] opacity-60 transition-all duration-500 ease-in-out -translate-x-4 md:w-[500px] md:top-0 md:-translate-x-4 md:opacity-100 lg:w-[800px] lg:-translate-x-8 xl:mt-12 xl:w-[850px] xl:-translate-x-2"
          priority
        />
        <Image
          src="/موكب.png"
          alt=""
          width={1050}
          height={600}
          className="absolute right-0 z-[1] h-auto w-[350px] bottom-[40px] -translate-x-4 transition-all duration-500 ease-in-out sm:w-[450px] sm:bottom-[60px] sm:-translate-x-6 md:bottom-0 md:w-[560px] md:-translate-x-12 lg:bottom-0 lg:w-[800px] lg:-translate-x-12 xl:mt-[270px] xl:w-[1050px] xl:-translate-x-[120px] xl:bottom-auto"
          priority
        />
        <div className="relative z-10 flex min-h-[90vh] items-center pl-4 pr-4 md:items-start md:pt-28 lg:items-start lg:pt-28 xl:items-center xl:pt-0">
          <div style={{ marginLeft: 30, marginTop: 60 }} className="max-w-[900px]">
            <h1 style={{ fontFamily: '"MedulaOne", serif' }} className="text-[58px] font-normal leading-[59px] text-white sm:text-[72px] sm:leading-[73px] md:text-[86px] md:leading-[87px] lg:text-[108px] lg:leading-[109px] xl:text-[132px] xl:leading-[133px] 2xl:text-[162px] 2xl:leading-[163px]">
              Where Ambition<br />Meets Engineering
            </h1>
          </div>
        </div>
        <Navbar />
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What We Do
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
            We provide comprehensive business services tailored to your unique challenges and goals.
          </p>
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <article
                key={service.title}
                className="rounded-xl border border-gray-200 p-6 transition-shadow hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d={service.icon} />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{service.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="bg-gray-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Process
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
            A structured approach to deliver results every time.
          </p>
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", title: "Discover", description: "We analyze your business needs and identify opportunities." },
              { step: "02", title: "Strategize", description: "We craft a tailored plan aligned with your goals." },
              { step: "03", title: "Execute", description: "We implement solutions with precision and transparency." },
              { step: "04", title: "Optimize", description: "We measure results and continuously improve." },
            ].map((item) => (
              <article
                key={item.step}
                className="rounded-xl border border-gray-200 bg-white p-6"
              >
                <div className="text-4xl font-bold text-blue-600">{item.step}</div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Ready to Start Your Next Project?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Let&apos;s discuss how 3M can help your business reach its full potential.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center rounded-lg bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow transition-colors hover:bg-blue-700"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
