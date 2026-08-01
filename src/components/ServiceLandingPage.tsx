import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, SITE_PHONE, SITE_URL } from "@/lib/constants";
import { SERVICES, type ServiceData } from "@/lib/serviceData";

export default function ServiceLandingPage({
  service,
  isArabic,
}: {
  service: ServiceData;
  isArabic: boolean;
}) {
  const copy = isArabic ? service.ar : service.en;
  const prefix = isArabic ? "/ar" : "";
  const pagePath = `${prefix}/services/${service.slug}`;
  const Arrow = isArabic ? ArrowLeft : ArrowRight;
  const whatsappNumber = SITE_PHONE.replace(/\D/g, "");
  const whatsappText = encodeURIComponent(
    isArabic
      ? `مرحبًا 3M tech، أريد معرفة المزيد عن خدمة ${copy.eyebrow}.`
      : `Hello 3M tech, I would like to know more about ${copy.eyebrow}.`
  );

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${SITE_URL}${pagePath}#service`,
      name: copy.title,
      description: copy.description,
      url: `${SITE_URL}${pagePath}`,
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: ["Egypt", "Saudi Arabia", "United Arab Emirates", "Kuwait", "Qatar", "Bahrain", "Oman"],
      availableLanguage: ["Arabic", "English"],
      serviceType: copy.eyebrow,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: isArabic ? "الرئيسية" : "Home",
          item: `${SITE_URL}${prefix || "/"}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: copy.eyebrow,
          item: `${SITE_URL}${pagePath}`,
        },
      ],
    },
  ];

  return (
    <div dir={isArabic ? "rtl" : "ltr"} className="bg-[#f0edf5] text-[#302451]">
      <JsonLd data={jsonLd} />
      <section className="relative isolate overflow-hidden bg-[#302451] px-4 pb-20 pt-36 text-white sm:px-8 sm:pb-28 sm:pt-44 lg:px-12 lg:pb-32">
        <Navbar />
        <div className="pointer-events-none absolute -right-24 top-16 h-80 w-80 rounded-full bg-[#9d7de7]/20 blur-3xl sm:h-[430px] sm:w-[430px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-white/10 blur-3xl sm:h-[420px] sm:w-[420px]" />
        <div className="relative mx-auto max-w-[1180px]">
          <p className="mb-5 text-sm font-bold tracking-[0.16em] text-[#cbbbf1] sm:text-base">
            {copy.eyebrow}
          </p>
          <h1 className="max-w-[950px] text-[42px] font-black leading-[1.08] sm:text-[62px] lg:text-[78px]">
            {copy.title}
          </h1>
          <p className="mt-7 max-w-[760px] text-base font-semibold leading-8 text-white/78 sm:text-xl sm:leading-9">
            {copy.description}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href={`${prefix}/contact`}
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-[#302451] transition-transform hover:-translate-y-0.5"
            >
              {isArabic ? "ابدأ مشروعك" : "Start your project"}
              <Arrow className="h-4 w-4" />
            </Link>
            <Link
              href={`${prefix}/projects`}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/35 bg-white/10 px-6 py-3 font-bold text-white backdrop-blur-md transition-colors hover:bg-white/15"
            >
              {isArabic ? "شاهد أعمالنا" : "Explore our work"}
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.14em] text-[#765cad]">
              {isArabic ? "من الفكرة إلى نتيجة واضحة" : "From an idea to a clear outcome"}
            </p>
            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">
              {isArabic ? "نبني الحل حول عملك، لا حول قالب جاهز" : "Built around your business—not a generic template"}
            </h2>
            <p className="mt-6 text-base font-semibold leading-8 text-[#302451]/75 sm:text-lg">
              {copy.intro}
            </p>
          </div>
          <div className="rounded-[28px] border border-white/80 bg-white/65 p-6 shadow-[0_24px_70px_rgba(48,36,81,.12)] backdrop-blur-xl sm:p-8">
            <h2 className="text-2xl font-black">{isArabic ? "النتائج التي نستهدفها" : "Outcomes we design for"}</h2>
            <ul className="mt-6 space-y-5">
              {copy.outcomes.map((item) => (
                <li key={item} className="flex gap-3 text-sm font-bold leading-7 sm:text-base">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#302451] text-white">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white/55 px-4 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-[1180px]">
          <div className="max-w-[720px]">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-[#765cad]">
              {isArabic ? "نطاق الخدمة" : "What is included"}
            </p>
            <h2 className="mt-4 text-3xl font-black sm:text-5xl">
              {isArabic ? "كل ما تحتاجه للانتقال بثقة إلى الإطلاق" : "Everything needed to move confidently toward launch"}
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {copy.deliverables.map((item, index) => (
              <article key={item} className="rounded-[24px] border border-[#302451]/10 bg-white p-6 shadow-[0_16px_45px_rgba(48,36,81,.07)]">
                <span className="text-sm font-black text-[#876dca]">0{index + 1}</span>
                <h3 className="mt-4 text-lg font-black leading-7">{item}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-[1180px]">
          <h2 className="text-center text-3xl font-black sm:text-5xl">
            {isArabic ? "خدمات تساعد مشروعك على النمو" : "Related services for your next stage"}
          </h2>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.filter((item) => item.slug !== service.slug).map((item) => {
              const itemCopy = isArabic ? item.ar : item.en;
              return (
                <Link
                  key={item.slug}
                  href={`${prefix}/services/${item.slug}`}
                  className="group flex min-h-36 flex-col justify-between rounded-[24px] bg-[#302451] p-5 text-white shadow-[0_10px_0_#876dca] transition-transform hover:-translate-y-1"
                >
                  <h3 className="text-xl font-black leading-7">{itemCopy.eyebrow}</h3>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white/75 group-hover:text-white">
                    {isArabic ? "اعرف المزيد" : "Learn more"}
                    <Arrow className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-8 sm:pb-28 lg:px-12">
        <div className="mx-auto flex max-w-[1180px] flex-col items-start justify-between gap-8 rounded-[32px] bg-[#302451] p-7 text-white shadow-[0_14px_0_#876dca] sm:p-10 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <p className="text-sm font-bold text-[#cbbbf1]">{SITE_NAME}</p>
            <h2 className="mt-2 text-3xl font-black leading-tight sm:text-4xl">
              {isArabic ? "لديك مشروع وتبحث عن شريك تقني؟" : "Have a project and need the right digital partner?"}
            </h2>
          </div>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 font-black text-[#302451]"
          >
            <MessageCircle className="h-5 w-5" />
            {isArabic ? "تواصل عبر واتساب" : "Talk to us on WhatsApp"}
          </a>
        </div>
      </section>
    </div>
  );
}
