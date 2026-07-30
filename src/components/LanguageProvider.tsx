"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

type Language = "en" | "ar";

const ARABIC: Record<string, string> = {
  Home: "الرئيسية",
  "Our Work": "أعمالنا",
  Portfolio: "معرض الأعمال",
  "About Us": "من نحن",
  About: "عن الشركة",
  Process: "مراحل العمل",
  Contact: "تواصل معنا",
  "Quick Links": "روابط سريعة",
  Privacy: "الخصوصية",
  Terms: "الشروط",
  "All rights reserved": "جميع الحقوق محفوظة",
  "Scroll back to the top": "العودة إلى أعلى الصفحة",
  "Mobile navigation": "التنقل على الموبايل",
  "Where Ambition": "حيثُ يلتقي الطموح",
  "Meets Engineering": "بالهندسة",
  "WE Build": "نحنُ نبني",
  "UI / UX Designs": "تجارب وواجهات",
  "Web Application": "تطبيقات ويب",
  "E-commerce": "متاجر إلكترونية",
  "Scalable Websites": "مواقع قابلة للنمو",
  "Digital Platforms": "منصات رقمية",
  "See Our Work": "شاهد أعمالنا",
  "Get a free quote": "اطلب عرضًا مجانيًا",
  "Dream it and we build it": "تخيّلها ونحنُ نبنيها",
  "Explore some of the products we've built for our clients.":
    "استكشف نماذج من المنتجات التي صنعناها لعملائنا.",
  "See All Projects": "شاهد كل المشاريع",
  "Web application": "تطبيق ويب",
  "A professional corporate website for a luxury car rental and consulting company showcasing their portfolio and services.":
    "موقع مؤسسي راقٍ لشركة تأجير واستشارات سيارات فاخرة، يعرض أعمالها وخدماتها بوضوح.",
  "Premium car rental platform with seamless booking, fleet showcase, and responsive multi-language support across the UAE.":
    "منصّة متكاملة لتأجير السيارات، بحجز سلس وعرض احترافي للأسطول ودعم متجاوب لعدّة لغات في الإمارات.",
  "Modern e-commerce showcase featuring product categories, custom quote requests, and interactive catalog browsing.":
    "واجهة تجارة إلكترونية حديثة تضم تصنيفات واضحة، وطلبات عروض أسعار مخصّصة، وكتالوجًا تفاعليًا سهل التصفّح.",
  "New projects are coming soon.": "مشاريع جديدة ستنطلق قريبًا.",
  "Back to Home": "العودة للرئيسية",
  "What We Do": "ماذا نقدّم",
  "Everything you need to bring your ideas to life.":
    "كل ما تحتاجه لتحويل فكرتك إلى منتجٍ ناجح.",
  "Our approach": "منهجُنا",
  "No random AI design directions—every product decision is intentional, researched, and connected to the client's business.":
    "لا نصنع تصاميم عشوائية بالذكاء الاصطناعي؛ كل قرارٍ مدروس، مبنيّ على بحث، ومرتبط بهدف العميل.",
  "Web Development": "تطوير الويب",
  "E-Commerce, Digital Platforms, Portfolio scalable websites built for performance and business growth.":
    "متاجر ومنصات ومواقع سريعة وقابلة للتوسّع، مصممة للنمو وتحقيق نتائج حقيقية.",
  "Admin Dashboards": "لوحات تحكّم",
  "Responsive Design": "تصميم متجاوب",
  "SEO Optimized": "تهيئة لمحركات البحث",
  "Fast Loading": "تحميل سريع",
  "CMS Integration": "ربط أنظمة المحتوى",
  "UI/UX Design": "تصميم تجربة وواجهة المستخدم",
  "Creating intuitive and engaging digital experiences.":
    "تجارب رقمية واضحة، جذابة، وسهلة الاستخدام.",
  "User Research": "بحث المستخدم",
  Wireframing: "تخطيط الواجهات",
  "Interactive Prototypes": "نماذج تفاعلية",
  "Design Systems": "أنظمة تصميم",
  "Maintenance & Support": "الصيانة والدعم",
  "Keeping your products secure, updated, and running smoothly.":
    "نحافظ على منتجك آمنًا، محدّثًا، ويعمل بكفاءة.",
  "Performance Optimization": "تحسين الأداء",
  "Security Updates": "تحديثات الأمان",
  "Bug Fixes": "إصلاح المشكلات",
  "Technical Support": "دعم تقني",
  "Software Optimization": "تطوير كفاءة البرمجيات",
  "Software tailored to your unique business needs.":
    "حلول برمجية مصممة لاحتياجات عملك الفعلية.",
  "Business Automation": "أتمتة الأعمال",
  "Management Systems": "أنظمة الإدارة",
  "Internal Tools": "أدوات داخلية",
  "API Integrations": "ربط الأنظمة",
  Growth: "نمو",
  Development: "تطوير",
  Strategy: "استراتيجية",
  Design: "تصميم",
  "Who We Are": "من نحن",
  "We combine design, technology, and strategy to build digital products that help businesses launch faster, scale smarter, and stand out in a competitive market.":
    "نجمع بين التصميم والتقنية والاستراتيجية لنصنع منتجات رقمية تساعد الأعمال على الانطلاق أسرع، والنمو بذكاء، والتميّز في سوق تنافسي.",
  "User-Centered Design": "تصميم يضع المستخدم أولًا",
  "Scalable Development": "تطوير قابل للنمو",
  "Long-Term Partnership": "شراكة طويلة المدى",
  "Our Workflow": "كيف نعمل",
  "Combining creativity, strategy, and technology to deliver software solutions that drive measurable results.":
    "نمزج الإبداع والاستراتيجية والتقنية لنقدّم حلولًا برمجية بنتائج يمكن قياسها.",
  Research: "بحث",
  "UI / UX": "تجربة وواجهة",
  Testing: "اختبار",
  Launch: "إطلاق",
  "Let's Build Something Great Together": "لنصنع شيئًا عظيمًا معًا",
  "Have a project in mind?": "لديك فكرة مشروع؟",
  "We'd love to hear your ideas and help bring them to life.":
    "يسعدنا أن نسمع فكرتك ونساعدك على تحويلها إلى واقع.",
  Name: "الاسم",
  Email: "البريد الإلكتروني",
  "Phone Number": "رقم الهاتف",
  Details: "تفاصيل المشروع",
  "Send Via Email": "إرسال بالبريد",
  "Send Via Whatsapp": "إرسال عبر واتساب",
  Sending: "جارٍ الإرسال",
  "Message Sent!": "تم إرسال رسالتك!",
  "Thank you for reaching out. We'll get back to you soon.":
    "شكرًا لتواصلك معنا، سنرد عليك قريبًا.",
  "Please enter your full name.": "اكتب اسمك كاملًا من فضلك.",
  "Name must be 80 characters or fewer.": "يجب ألا يتجاوز الاسم 80 حرفًا.",
  "Please enter your email address.": "اكتب بريدك الإلكتروني.",
  "Please enter a valid email address.": "اكتب بريدًا إلكترونيًا صحيحًا.",
  "Please enter your phone number.": "اكتب رقم هاتفك.",
  "Enter a valid phone number with 8–15 digits.": "اكتب رقمًا صحيحًا من 8 إلى 15 رقمًا.",
  "Please tell us a little more (at least 20 characters).":
    "اكتب تفاصيل أكثر عن مشروعك (20 حرفًا على الأقل).",
  "Project details must be 2,000 characters or fewer.":
    "يجب ألا تتجاوز التفاصيل 2000 حرف.",
  "Something went wrong. Please try again or contact us directly.":
    "حدث خطأ. حاول مرة أخرى أو تواصل معنا مباشرة.",
  "Contact Us": "تواصل معنا",
  "Let's Build Something Great": "لنصنع شيئًا عظيمًا",
  "Tell us what you want to build. The project form below can open your message in email or WhatsApp with all the details ready to send.":
    "أخبرنا بما تريد بناءه، وسنجهّز رسالتك بكل التفاصيل لإرسالها عبر البريد أو واتساب.",
  "Start Your Project": "ابدأ مشروعك",
  "All Featured Projects": "كل مشاريعنا",
  "Our Projects": "مشاريعنا",
  "The complete collection of products we've designed and built for our clients.":
    "مجموعة متكاملة من المنتجات الرقمية التي صمّمناها وطوّرناها لعملائنا.",
  "Explore our complete portfolio of web applications, platforms, and digital experiences.":
    "استكشف أعمالنا في تطبيقات الويب والمنصات والتجارب الرقمية.",
  "Back to Our Work": "العودة لأعمالنا",
  "Visit Live Project": "زيارة المشروع",
  "Project Overview": "نظرة على المشروع",
  "Key Features": "أبرز المزايا",
  "Technologies Used": "التقنيات المستخدمة",
  "Completion Date": "تاريخ الإنجاز",
  Client: "العميل",
  "About 3M tech": "عن 3M tech",
  "Egypt-based · Middle East focused": "من مصر، ونخدم الشرق الأوسط",
  "Egypt-based Â· Middle East focused": "من مصر، ونخدم الشرق الأوسط",
  "We Turn Ambition": "نحوّل الطموح",
  "Into Digital Products": "إلى منتجات رقمية",
  "3M tech is a digital product studio that brings strategy, creative design, and modern engineering together to build useful, scalable products for startups and established businesses.":
    "3M tech استوديو منتجات رقمية يجمع الاستراتيجية والتصميم الإبداعي والهندسة الحديثة لبناء منتجات مفيدة وقابلة للنمو للشركات الناشئة والمؤسسات.",
  "We don't build random designs generated by AI. We use research, product thinking, and human creative judgment to design for each business intentionally.":
    "لا نبني تصاميم عشوائية مولّدة بالذكاء الاصطناعي؛ نبدأ بالبحث والتفكير في المنتج، ونصمّم بوعي ليناسب كل نشاط.",
  "We started 3M tech to close the gap between beautiful ideas and dependable software. Our team works from the first sketch through launch, helping clients make clearer product decisions and ship without unnecessary complexity.":
    "بدأنا 3M tech لنحوّل الأفكار الجذابة إلى برمجيات يعتمد عليها. نعمل معك من أول تصور حتى الإطلاق، ونساعدك على اتخاذ قرارات أوضح دون تعقيد زائد.",
  "Based in Egypt, we understand the needs of growing businesses in the region while building to modern international standards.":
    "من مصر، نفهم احتياجات الأعمال النامية في المنطقة ونبني وفق معايير عالمية حديثة.",
  "Weeks for most projects": "أسابيع لمعظم المشاريع",
  "Weeks for a focused MVP": "أسبوعان لنسخة أولية مركّزة",
  "Core digital services": "خدمات رقمية أساسية",
  "Primary markets served": "أسواقنا الرئيسية",
  "Product strategy, design, development, and launch support in one focused team.":
    "استراتيجية وتصميم وتطوير ودعم للإطلاق، مع فريق واحد متكامل.",
  "Custom Web Applications": "تطبيقات ويب مخصّصة",
  "Dashboards, booking systems, internal tools, and customer portals engineered around real business workflows.":
    "لوحات تحكم وأنظمة حجز وأدوات داخلية وبوابات عملاء مبنية حول سير العمل الحقيقي.",
  "E-Commerce Platforms": "منصات تجارة إلكترونية",
  "Fast, conversion-focused stores with secure payments and experiences tailored to Egypt and the Middle East.":
    "متاجر سريعة تركّز على المبيعات، بمدفوعات آمنة وتجربة تناسب مصر والشرق الأوسط.",
  "Shopify Store Setup": "إنشاء متاجر Shopify",
  "Professional storefronts with custom themes, product configuration, shipping, and payment integrations.":
    "متاجر احترافية بقوالب مخصّصة وإعداد المنتجات والشحن وربط وسائل الدفع.",
  "MVP Development": "تطوير النسخة الأولية",
  "Focused products that help founders validate an idea quickly with real customers, partners, and investors.":
    "منتجات مركّزة تساعد المؤسسين على اختبار الفكرة سريعًا مع عملاء وشركاء ومستثمرين حقيقيين.",
  "Research-led wireframes, Figma interfaces, prototypes, design systems, and developer-ready handoff.":
    "مخططات وواجهات Figma ونماذج أولية وأنظمة تصميم مبنية على البحث وجاهزة للتطوير.",
  "Co-Founder & Web Developer": "شريك مؤسس ومطوّر ويب",
  "Co-Founder & Creative Designer": "شريك مؤسس ومصمّم إبداعي",
  "Meet the Founders": "تعرّف على المؤسسين",
  "The people behind the work": "الفريق وراء كل إنجاز",
  "How We Work": "مبادئ عملنا",
  "Frequently Asked Questions": "أسئلة شائعة",
  "Clear answers about working with 3M tech.": "إجابات واضحة عن العمل مع 3M tech.",
  "No random AI designs": "لا لتصاميم الذكاء الاصطناعي العشوائية",
  "AI may support parts of the workflow, but it never replaces research, brand understanding, product thinking, or human creative judgment.":
    "قد يساعدنا الذكاء الاصطناعي في بعض الخطوات، لكنه لا يستبدل البحث وفهم العلامة والتفكير في المنتج والحكم الإبداعي البشري.",
  "Business before features": "العمل أولًا، ثم المزايا",
  "Every decision starts with the result your product needs to create—not a checklist of trendy technology.":
    "كل قرار يبدأ بالنتيجة التي يجب أن يحققها المنتج، لا بقائمة تقنيات رائجة.",
  "Design and engineering together": "التصميم والهندسة معًا",
  "Designers and developers work as one team so the final experience stays true to the original idea.":
    "يعمل المصممون والمطورون كفريق واحد حتى تظل التجربة النهائية وفيّة للفكرة.",
  "Clear, measurable delivery": "تنفيذ واضح قابل للقياس",
  "Focused scopes, visible progress, responsive communication, and practical milestones from discovery to launch.":
    "نطاق واضح وتقدّم مرئي وتواصل سريع ومراحل عملية من الاستكشاف حتى الإطلاق.",
  "What does 3M tech do?": "ماذا تقدّم 3M tech؟",
  "3M tech builds custom web applications, Shopify stores, e-commerce platforms, MVPs, and UI/UX designs for startups and businesses across Egypt and the Middle East.":
    "تبني 3M tech تطبيقات ويب مخصّصة ومتاجر Shopify ومنصات تجارة إلكترونية ونسخًا أولية وتصميمات تجربة وواجهة للشركات في مصر والشرق الأوسط.",
  "How much does it cost to build a website with 3M tech?": "كم تكلفة بناء موقع مع 3M tech؟",
  "Every project is scoped individually. Contact us for a free consultation and a quote based on your goals, features, integrations, and delivery requirements.":
    "نحدّد نطاق كل مشروع بصورة مستقلة. تواصل معنا لاستشارة مجانية وعرض سعر مبني على أهدافك والمزايا والتكاملات وموعد التسليم.",
  "How long does a project take?": "كم يستغرق تنفيذ المشروع؟",
  "Most projects are delivered within one to four weeks depending on complexity. A focused MVP can be delivered in as little as two weeks.":
    "تُسلَّم معظم المشاريع خلال أسبوع إلى أربعة أسابيع حسب التعقيد، ويمكن إنجاز نسخة أولية مركّزة خلال أسبوعين.",
  "What technologies does 3M tech use?": "ما التقنيات التي تستخدمها 3M tech؟",
  "The team works with React, Next.js, Vite, Tailwind CSS, Supabase and PostgreSQL, with deployments on Vercel and integrations such as Paymob and Stripe.":
    "نعمل بتقنيات مثل React وNext.js وVite وTailwind CSS وSupabase وPostgreSQL، مع النشر على Vercel وربط خدمات مثل Paymob وStripe.",
  "Where does 3M tech work?": "أين تعمل 3M tech؟",
  "3M tech is based in Egypt and works with clients across Egypt and the Middle East.":
    "يقع فريق 3M tech في مصر ويعمل مع عملاء في مصر والشرق الأوسط.",
  "What We Build": "ما الذي نبنيه",
  "Built for Real Business": "حلول لأعمال حقيقية",
  "Explore Our Work": "استكشف أعمالنا",
  "Start a Project": "ابدأ مشروعًا",
  "Privacy Policy": "سياسة الخصوصية",
  "Information you provide": "المعلومات التي تقدّمها",
  "Terms of Use": "شروط الاستخدام",
  "Website content": "محتوى الموقع",
  "Project enquiries": "طلبات المشاريع",
  "3M tech only uses information you submit through the project form to understand your enquiry and contact you about that project. The form opens your email or WhatsApp application; this website does not store the submitted message in a database.":
    "تستخدم 3M tech البيانات التي ترسلها عبر نموذج المشروع لفهم طلبك والتواصل معك بشأنه فقط. يفتح النموذج تطبيق البريد أو واتساب، ولا يخزّن الموقع الرسالة في قاعدة بيانات.",
  "This may include your name, email address, phone number, and project details. Your chosen email or messaging provider may process that information under its own privacy terms.":
    "قد تشمل البيانات اسمك وبريدك ورقم هاتفك وتفاصيل المشروع. وقد يعالج مزوّد البريد أو الرسائل هذه البيانات وفق سياسة الخصوصية الخاصة به.",
  "Questions about privacy can be sent to contact@3mtechs.com.":
    "يمكن إرسال استفسارات الخصوصية إلى contact@3mtechs.com.",
  "The information on this website describes 3M tech's services and selected work. Project timelines and pricing are estimates until both parties agree to a written scope, schedule, and commercial proposal.":
    "توضح معلومات الموقع خدمات 3M tech ونماذج من أعمالها. تظل المدد والأسعار تقديرية حتى يتفق الطرفان كتابيًا على النطاق والجدول والعرض المالي.",
  "Site content may be updated as services and projects evolve. Client work, names, and third-party marks remain the property of their respective owners.":
    "قد يتحدّث محتوى الموقع مع تطور الخدمات والمشاريع. تظل أعمال العملاء وأسماؤهم وعلامات الأطراف الأخرى ملكًا لأصحابها.",
  "Sending an enquiry does not create a service agreement. Work begins only after scope, responsibilities, payment terms, and delivery terms are confirmed.":
    "إرسال الطلب لا ينشئ اتفاق خدمة. يبدأ العمل بعد تأكيد النطاق والمسؤوليات وشروط الدفع والتسليم.",
  "Project Image Gallery & Views (Click to Preview)": "صور المشروع (اضغط للمعاينة)",
  "Project Highlights & Specifications": "أبرز ملامح المشروع ومواصفاته",
  "Back to All Projects": "العودة لكل المشاريع",
  Completed: "اكتمل",
  View: "عرض",
  Loading: "جارٍ التحميل",
};

const REVERSE = Object.fromEntries(
  Object.entries(ARABIC).map(([english, arabic]) => [arabic, english])
);

type LanguageContextValue = {
  language: Language;
  isArabic: boolean;
  toggleLanguage: () => void;
};

const ARABIC_RE = /[\u0600-\u06FF]/;
const LATIN_RE = /[A-Za-z]/;

const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  isArabic: false,
  toggleLanguage: () => undefined,
});

function replaceText(root: ParentNode, language: Language) {
  const map = language === "ar" ? ARABIC : REVERSE;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();

  root.querySelectorAll<HTMLElement>("[data-latin-text]").forEach((element) => {
    element.removeAttribute("data-latin-text");
  });

  while (node) {
    const parent = node.parentElement;
    if (parent && !["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)) {
      const value = node.textContent ?? "";
      const trimmed = value.trim();
      const normalized = trimmed.replace(/\s+/g, " ");
      const translated = map[normalized];
      if (translated) {
        const leading = value.match(/^\s*/)?.[0] ?? "";
        const trailing = value.match(/\s*$/)?.[0] ?? "";
        node.textContent = `${leading}${translated}${trailing}`;
      }
      const current = node.textContent?.trim().replace(/\s+/g, " ") ?? "";
      if (language === "ar" && LATIN_RE.test(current) && !ARABIC_RE.test(current)) {
        parent.setAttribute("data-latin-text", "true");
      }
    }
    node = walker.nextNode();
  }

  root.querySelectorAll<HTMLElement>("[placeholder],[aria-label],[title]").forEach((element) => {
    ["placeholder", "aria-label", "title"].forEach((attribute) => {
      const value = element.getAttribute(attribute);
      if (value && map[value]) element.setAttribute(attribute, map[value]);
    });
  });
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [language, setLanguage] = useState<Language>("en");
  const isPublic = pathname !== "/login" && !pathname.startsWith("/admin");

  useEffect(() => {
    const stored = window.localStorage.getItem("3m-language");
    if (stored === "ar") setLanguage("ar");
  }, []);

  useEffect(() => {
    if (!isPublic) return;
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("arabic-site", language === "ar");
    window.localStorage.setItem("3m-language", language);

    const apply = () => replaceText(document.body, language);
    apply();
    let frame = 0;
    const observer = new MutationObserver(() => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(apply);
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [language, isPublic, pathname]);

  const value = useMemo(
    () => ({
      language,
      isArabic: language === "ar",
      toggleLanguage: () => setLanguage((current) => (current === "ar" ? "en" : "ar")),
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
      {isPublic && <MobileLanguageToggle />}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { isArabic, toggleLanguage } = useLanguage();
  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className={`language-toggle group relative isolate flex shrink-0 items-center overflow-hidden rounded-full border border-white/35 bg-white/10 font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.18)] backdrop-blur-xl transition-all hover:border-white/70 hover:bg-white/20 ${
        compact ? "h-8 min-w-[58px] px-2 text-[11px]" : "h-10 min-w-[76px] px-2.5 text-xs"
      }`}
      aria-label={isArabic ? "Switch to English" : "التبديل إلى العربية"}
    >
      <span className="relative z-10 mx-auto">{isArabic ? "EN" : "عربي"}</span>
      <span className="absolute inset-y-1 left-1 w-[46%] rounded-full bg-white/14 transition-transform duration-300 group-hover:translate-x-[85%] rtl:left-auto rtl:right-1 rtl:group-hover:-translate-x-[85%]" />
    </button>
  );
}

function MobileLanguageToggle() {
  return (
    <div className="mobile-language-toggle fixed bottom-[88px] right-4 z-[900] sm:hidden">
      <LanguageToggle compact />
    </div>
  );
}
