"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";
import { useLanguage } from "./LanguageProvider";

const phones = ["rent&go", "portflio", "setup", "royal cars", "evolve"];
const ribbons = {
  projects: [
    ["Online stores", "متاجر إلكترونية"], ["Business websites", "مواقع شركات"],
    ["Learning platforms", "منصات تعليمية"], ["Booking systems", "أنظمة حجز"],
    ["Mobile apps", "تطبيقات موبايل"], ["Client portals", "بوابات عملاء"],
    ["Dashboards", "لوحات تحكم"], ["Landing pages", "صفحات هبوط"],
  ],
  features: [
    ["Fast loading", "تحميل سريع"], ["Technical SEO", "SEO تقني"],
    ["SSL encryption", "تشفير SSL"], ["Responsive design", "تصميم متجاوب"],
    ["Payment integration", "ربط بوابات الدفع"], ["Easy updates", "تحديثات سهلة"],
    ["Performance tracking", "متابعة الأداء"], ["Technical support", "دعم فني"],
  ],
};

export default function HomeHero() {
  const { isArabic } = useLanguage();
  return <section className="presence-hero">
    <Navbar />
    <div className="presence-body">
      <div className="presence-copy">
        <h1>{(isArabic ? ["ابنِ حضورك الرقمي", "بمعايير عالمية."] : ["Build Your Digital", "Presence to World-", "Class Standards."]).map(line => <span key={line}>{line}</span>)}</h1>
        <p>{isArabic ? "لا نبني مواقع فحسب، بل نصمّم تجارب رقمية متكاملة تجمع بين التصميم المميز والتقنية المتقدمة لتمنح علامتك حضورًا لا يُنسى." : "We don’t just build websites. We create seamless digital experiences that combine exceptional design with advanced technology to make your brand unforgettable."}</p>
        <div className="presence-actions">
          <a href="#work">{isArabic ? "شاهد أعمالنا" : "See Our Work"}</a>
          <Link href={isArabic ? "/ar/contact#contact-form" : "/contact#contact-form"}>{isArabic ? "اطلب عرضًا مجانيًا" : "Get a free quote"}</Link>
        </div>
      </div>
      <div className="presence-phones" role="img" aria-label={isArabic ? "خمسة من مشاريعنا معروضة على الموبايل" : "Five of our projects on mobile"}>
        {phones.map((name, i) => <Image key={name} src={`/services/${name}.png`} alt="" width={[325,224,270,352,409][i]} height={[425,400,400,424,392][i]} sizes="(max-width: 640px) 38vw, 320px" priority={i === 2} className={`presence-phone phone-${i}`} />)}
      </div>
    </div>
    <div className="presence-ribbons" aria-hidden="true">
      {Object.entries(ribbons).map(([name, labels]) => <div key={name} className="presence-ribbon">
        <div className="ribbon-track" dir="ltr">
          {[0, 1].map(copy => <div key={copy} className="ribbon-repeat">
            {labels.map(([en, ar]) =>
              <span key={en} dir={isArabic ? "rtl" : "ltr"}>{isArabic ? ar : en}</span>
            )}
          </div>)}
        </div>
      </div>)}
    </div>
  </section>;
}
