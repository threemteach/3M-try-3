import { KEYWORD_CLUSTERS } from "@/lib/seo";

export type ServiceSlug =
  | "web-development"
  | "ui-ux-design"
  | "ecommerce-development"
  | "digital-platforms"
  | "educational-platforms";

type LocalizedCopy = {
  title: string;
  seoTitle: string;
  eyebrow: string;
  description: string;
  intro: string;
  outcomes: string[];
  deliverables: string[];
};

export type ServiceData = {
  slug: ServiceSlug;
  keywordCluster: keyof typeof KEYWORD_CLUSTERS;
  en: LocalizedCopy;
  ar: LocalizedCopy;
};

export const SERVICES: ServiceData[] = [
  {
    slug: "web-development",
    keywordCluster: "webDevelopment",
    en: {
      title: "Web Development for Growing Businesses",
      seoTitle: "Web Development Company in Egypt & GCC",
      eyebrow: "Websites & Web Applications",
      description:
        "Fast, responsive, SEO-ready websites and custom web applications for businesses in Egypt, Saudi Arabia, the UAE, and the Gulf.",
      intro:
        "We turn business requirements into dependable digital products—from corporate websites and booking systems to dashboards, customer portals, and focused MVPs.",
      outcomes: [
        "A fast experience built for mobile, tablet, and desktop",
        "Clear journeys that turn visitors into qualified enquiries",
        "A scalable technical foundation that can grow with the business",
      ],
      deliverables: [
        "Corporate and portfolio websites",
        "Custom web applications and dashboards",
        "Booking systems and customer portals",
        "CMS integration and content migration",
        "Performance, accessibility, and technical SEO",
        "Maintenance and launch support",
      ],
    },
    ar: {
      title: "تطوير مواقع تدعم نمو أعمالك",
      seoTitle: "شركة تصميم وتطوير مواقع في مصر والخليج",
      eyebrow: "مواقع وتطبيقات ويب",
      description:
        "نصمّم ونطوّر مواقع سريعة ومتجاوبة ومهيأة لمحركات البحث للشركات في مصر والسعودية والإمارات ودول الخليج.",
      intro:
        "نحوّل احتياجات عملك إلى منتج رقمي يعتمد عليه؛ من مواقع الشركات وأنظمة الحجز إلى لوحات التحكم وبوابات العملاء والنسخ الأولية MVP.",
      outcomes: [
        "تجربة سريعة ومتكاملة على الموبايل والتابلت والديسك توب",
        "رحلة واضحة تحوّل الزائر إلى عميل مهتم",
        "بنية تقنية قابلة للتوسّع مع نمو أعمالك",
      ],
      deliverables: [
        "مواقع الشركات ومعارض الأعمال",
        "تطبيقات ويب ولوحات تحكم مخصّصة",
        "أنظمة حجز وبوابات عملاء",
        "ربط أنظمة إدارة المحتوى ونقل البيانات",
        "تحسين السرعة وسهولة الاستخدام والسيو التقني",
        "دعم الإطلاق والصيانة",
      ],
    },
  },
  {
    slug: "ui-ux-design",
    keywordCluster: "uiUx",
    en: {
      title: "UI/UX Design Built Around Real Users",
      seoTitle: "UI/UX Design Agency in Egypt & GCC",
      eyebrow: "Product Design",
      description:
        "Research-led UI/UX design for websites, mobile apps, SaaS products, and e-commerce experiences across Egypt and the Gulf.",
      intro:
        "No random AI design directions. We study the product, users, market, and business goals before shaping an interface that is clear, distinctive, and ready to build.",
      outcomes: [
        "Less friction across the most important user journeys",
        "A consistent visual system that strengthens the brand",
        "Developer-ready designs that reduce rework and ambiguity",
      ],
      deliverables: [
        "User and competitor research",
        "Information architecture and user flows",
        "Wireframes and interactive prototypes",
        "Responsive website and mobile app interfaces",
        "Reusable design systems",
        "Organized Figma files and developer handoff",
      ],
    },
    ar: {
      title: "تصميم UI/UX مبني حول المستخدم الحقيقي",
      seoTitle: "شركة تصميم UI/UX في مصر والخليج",
      eyebrow: "تصميم المنتجات الرقمية",
      description:
        "تصميم تجربة وواجهة المستخدم للمواقع والتطبيقات ومنتجات SaaS والمتاجر الإلكترونية في مصر ودول الخليج.",
      intro:
        "لا نقدّم اتجاهات عشوائية مولّدة بالذكاء الاصطناعي. ندرس المنتج والمستخدم والسوق وهدف العمل أولًا، ثم نصمّم تجربة واضحة ومميّزة وجاهزة للتطوير.",
      outcomes: [
        "تقليل التعقيد في أهم رحلات المستخدم",
        "هوية بصرية متناسقة تدعم العلامة التجارية",
        "تصميمات جاهزة للتطوير تقلّل التعديلات والهدر",
      ],
      deliverables: [
        "بحث المستخدم والمنافسين",
        "هيكلة المعلومات ورحلات المستخدم",
        "مخططات Wireframes ونماذج تفاعلية",
        "واجهات متجاوبة للمواقع وتطبيقات الموبايل",
        "أنظمة تصميم قابلة لإعادة الاستخدام",
        "ملفات Figma منظّمة وتسليم واضح للمطورين",
      ],
    },
  },
  {
    slug: "ecommerce-development",
    keywordCluster: "ecommerce",
    en: {
      title: "E-Commerce Experiences Designed to Sell",
      seoTitle: "E-Commerce Development Company in Egypt & GCC",
      eyebrow: "Online Stores",
      description:
        "Custom e-commerce and Shopify development with fast browsing, clear product journeys, and regional payment and shipping integrations.",
      intro:
        "We build online stores around how your customers discover, compare, and buy—not around a generic template. Every detail supports trust, usability, and conversion.",
      outcomes: [
        "A smoother path from product discovery to checkout",
        "An Arabic and English experience suited to regional customers",
        "A store your team can manage and expand confidently",
      ],
      deliverables: [
        "Custom e-commerce websites",
        "Shopify setup and theme customization",
        "Product catalogs, filters, search, and wishlists",
        "Payment, shipping, and business-system integrations",
        "Arabic, English, and RTL storefronts",
        "Analytics, performance, and conversion improvements",
      ],
    },
    ar: {
      title: "متاجر إلكترونية مصمّمة لزيادة المبيعات",
      seoTitle: "شركة تصميم متاجر إلكترونية في مصر والخليج",
      eyebrow: "التجارة الإلكترونية",
      description:
        "نطوّر متاجر إلكترونية وحلول Shopify سريعة وسهلة الشراء، مع ربط وسائل الدفع والشحن المناسبة لمصر ودول الخليج.",
      intro:
        "نبني المتجر حول طريقة اكتشاف عميلك للمنتج ومقارنته وشرائه، لا حول قالب جاهز. كل تفصيلة تدعم الثقة وسهولة الاستخدام والتحويل إلى مبيعات.",
      outcomes: [
        "رحلة أسهل من اكتشاف المنتج حتى إتمام الطلب",
        "تجربة عربية وإنجليزية تناسب عملاء المنطقة",
        "متجر يستطيع فريقك إدارته وتوسيعه بثقة",
      ],
      deliverables: [
        "متاجر إلكترونية مخصّصة",
        "إعداد Shopify وتخصيص القوالب",
        "كتالوجات وفلاتر وبحث وقوائم مفضلة",
        "ربط الدفع والشحن وأنظمة العمل",
        "واجهات عربية وإنجليزية ودعم RTL",
        "تحليلات وتحسين السرعة ومعدل التحويل",
      ],
    },
  },
  {
    slug: "digital-platforms",
    keywordCluster: "digitalPlatforms",
    en: {
      title: "Digital Platforms Tailored to Your Operation",
      seoTitle: "Digital Platform Development in Egypt & GCC",
      eyebrow: "Custom Digital Solutions",
      description:
        "Custom platforms, management systems, marketplaces, and automation tools engineered around the way your business actually works.",
      intro:
        "When off-the-shelf software creates more work, we design a focused platform that connects teams, data, customers, and daily operations in one dependable experience.",
      outcomes: [
        "Fewer repetitive tasks and disconnected tools",
        "Better visibility into operations and performance",
        "A secure platform designed around real workflows",
      ],
      deliverables: [
        "SaaS and marketplace platforms",
        "Custom CRM and management systems",
        "Admin dashboards and internal tools",
        "Business process automation",
        "API and third-party integrations",
        "Role-based access, reporting, and support",
      ],
    },
    ar: {
      title: "منصات رقمية مصمّمة لطريقة عملك",
      seoTitle: "شركة تطوير منصات وحلول رقمية في مصر والخليج",
      eyebrow: "حلول رقمية مخصّصة",
      description:
        "نطوّر منصات وأنظمة إدارة وأسواقًا رقمية وأدوات أتمتة مبنية حول احتياجات شركتك الفعلية.",
      intro:
        "عندما تزيد البرامج الجاهزة التعقيد، نصمّم منصة مركّزة تربط الفريق والبيانات والعملاء والعمليات اليومية في تجربة واحدة يعتمد عليها.",
      outcomes: [
        "تقليل المهام المتكررة والأدوات المنفصلة",
        "رؤية أوضح للعمليات والأداء",
        "منصة آمنة مبنية حول سير العمل الحقيقي",
      ],
      deliverables: [
        "منصات SaaS وأسواق رقمية",
        "أنظمة CRM وإدارة مخصّصة",
        "لوحات تحكم وأدوات داخلية",
        "أتمتة عمليات الأعمال",
        "ربط API وخدمات الطرف الثالث",
        "صلاحيات وتقارير ودعم مستمر",
      ],
    },
  },
  {
    slug: "educational-platforms",
    keywordCluster: "educationalPlatforms",
    en: {
      title: "Educational Platforms That Make Learning Easier",
      seoTitle: "Educational Platform & LMS Development in Egypt & GCC",
      eyebrow: "E-Learning & LMS",
      description:
        "Custom e-learning platforms, LMS products, course websites, and training systems for schools, academies, experts, and businesses.",
      intro:
        "We design the full learning journey for students, instructors, and administrators, combining simple course delivery with useful progress, assessment, and management tools.",
      outcomes: [
        "A clear learning experience across every device",
        "Simpler course, student, and instructor management",
        "A scalable foundation for new programs and learners",
      ],
      deliverables: [
        "Custom LMS and course platforms",
        "Student, instructor, and admin dashboards",
        "Video lessons, assignments, quizzes, and certificates",
        "Subscriptions, payments, and access control",
        "Arabic, English, and RTL learning experiences",
        "Progress reports, notifications, and integrations",
      ],
    },
    ar: {
      title: "منصات تعليمية تجعل التعلّم أسهل",
      seoTitle: "شركة برمجة منصات تعليمية وLMS في مصر والخليج",
      eyebrow: "التعليم الإلكتروني وLMS",
      description:
        "نطوّر منصات تعليم إلكتروني وأنظمة LMS ومواقع كورسات وتدريب للمدارس والأكاديميات والخبراء والشركات.",
      intro:
        "نصمّم رحلة التعلّم كاملة للطالب والمدرّس والإدارة، ونجمع تقديم المحتوى بسهولة مع أدوات التقييم والمتابعة والإدارة.",
      outcomes: [
        "تجربة تعلّم واضحة على كل الأجهزة",
        "إدارة أسهل للكورسات والطلاب والمدرّسين",
        "بنية قابلة للنمو مع البرامج والمتعلمين الجدد",
      ],
      deliverables: [
        "منصات LMS وكورسات مخصّصة",
        "لوحات للطلاب والمدرّسين والإدارة",
        "فيديوهات وواجبات واختبارات وشهادات",
        "اشتراكات ومدفوعات وإدارة صلاحيات",
        "تجربة عربية وإنجليزية ودعم RTL",
        "تقارير تقدّم وإشعارات وتكاملات",
      ],
    },
  },
];

export const serviceSlugs = SERVICES.map((service) => service.slug);

export function getService(slug: string) {
  return SERVICES.find((service) => service.slug === slug);
}
