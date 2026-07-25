import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import RotatingSpinner from "@/components/RotatingSpinner";

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
      <section className="relative min-h-screen w-full overflow-hidden bg-[#302451] flex flex-col justify-between pt-4 sm:pt-6 lg:pt-8">
        {/* Background Decorative Pattern */}
        <div className="absolute right-0 top-0 z-0 pointer-events-none overflow-hidden opacity-40 md:opacity-70 lg:opacity-100">
          <Image
            src="/rectangles.png"
            alt=""
            width={850}
            height={600}
            className="h-auto w-[340px] sm:w-[500px] md:w-[700px] lg:w-[900px] xl:w-[1100px] object-contain translate-x-10 lg:translate-x-0"
            priority
          />
        </div>

        {/* Mobile Header Bar */}
        <div className="relative z-50 flex items-center justify-between px-5 pt-2 sm:hidden w-full">
          <Link href="/" className="shrink-0">
            <Image
              src="/logo.png"
              alt="3M Logo"
              width={80}
              height={50}
              className="h-[32px] w-auto object-contain"
              priority
            />
          </Link>
          <Link
            href="/contact"
            className="flex h-[32px] items-center justify-center whitespace-nowrap rounded-[150px] bg-white/20 px-5 text-[12px] font-bold text-white backdrop-blur-md"
          >
            Contact
          </Link>
        </div>

        {/* Desktop / Tablet Glassmorphism Navbar */}
        <Navbar />

        {/* Main Hero Content */}
        <div className="relative z-10 w-full max-w-[1600px] mx-auto my-auto px-4 sm:px-8 md:px-12 lg:pl-12 lg:pr-16 xl:pl-16 xl:pr-20 2xl:pl-20 2xl:pr-24 pt-4 pb-24 sm:pt-8 sm:pb-16 lg:pt-20 lg:pb-20">
          
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Title */}
            <h1
              style={{ fontFamily: '"MedulaOne", serif' }}
              className="text-[44px] sm:text-[60px] md:text-[80px] lg:text-[115px] xl:text-[135px] 2xl:text-[155px] font-normal leading-[0.92] text-white"
            >
              Where Ambition<br />Meets Engineering
            </h1>

            {/* Spinner */}
            <div className="mt-2 sm:mt-3 lg:mt-4 w-full flex justify-center lg:justify-start">
              <RotatingSpinner />
            </div>

            {/* Buttons (Desktop & Tablet) */}
            <div className="mt-5 hidden sm:flex items-center gap-0 lg:mt-8">
              <a
                href="#work"
                className="flex h-[44px] w-[140px] md:h-[50px] md:w-[165px] lg:h-[56px] lg:w-[185px] items-center justify-center rounded-l-[9999px] border-2 border-white bg-transparent text-[13px] md:text-[15px] lg:text-[17px] font-semibold text-white transition-colors hover:bg-white/15"
                style={{ fontFamily: '"Cairo", sans-serif' }}
              >
                See Our Work
              </a>
              <a
                href="#contact"
                className="flex h-[44px] w-[140px] md:h-[50px] md:w-[165px] lg:h-[56px] lg:w-[185px] items-center justify-center rounded-r-[9999px] border-2 border-white bg-white text-[13px] md:text-[15px] lg:text-[17px] font-semibold text-[#302451] transition-colors hover:bg-[#f0edf5]"
                style={{ fontFamily: '"Cairo", sans-serif' }}
              >
                Get a free quote
              </a>
            </div>

          </div>

          {/* Mockup Image - Desktop (absolute, right side) */}
          <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-[45%] z-[1] pointer-events-none">
            <Image
              src="/موكب.png"
              alt="3M Portfolio Showcase"
              width={1150}
              height={700}
              className="h-auto w-[500px] xl:w-[650px] 2xl:w-[800px] max-w-none object-contain drop-shadow-2xl"
              priority
            />
          </div>

          {/* Mockup Image - Mobile & Tablet */}
          <div className="flex justify-center lg:hidden mt-8">
            <Image
              src="/موكب.png"
              alt="3M Portfolio Showcase"
              width={1150}
              height={700}
              className="h-auto w-[300px] sm:w-[420px] md:w-[520px] object-contain drop-shadow-2xl"
              priority
            />
          </div>

        </div>

      </section>

      {/* Services Section */}
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

      {/* Process Section */}
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

      {/* CTA Section */}
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
