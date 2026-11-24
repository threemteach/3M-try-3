"use client";

import { useEffect, useRef, useState } from "react";
import { Code2, Compass, PenTool, Rocket, Search, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const steps = [
  { icon: Search, title: "Research", titleAr: "البحث والفهم", description: "We listen, ask the right questions, and understand your audience, your goals, and the opportunity ahead.", descriptionAr: "نستمع لرؤيتك، ونفهم جمهورك وأهدافك لنحدد الفرص والتحديات من البداية." },
  { icon: Compass, title: "Strategy", titleAr: "التخطيط والاستراتيجية", description: "We turn insights into a clear roadmap, defining the scope, priorities, and the right approach for your product.", descriptionAr: "نحوّل الأفكار إلى خطة واضحة، ونحدد نطاق العمل والأولويات والطريق الأنسب لمنتجك." },
  { icon: PenTool, title: "UI / UX Design", titleAr: "تصميم التجربة والواجهة", description: "We shape intuitive journeys and a distinctive visual language, making every interaction feel natural.", descriptionAr: "نصمم رحلة استخدام سلسة وهوية بصرية مميزة، ليكون كل تفاعل واضحًا وطبيعيًا." },
  { icon: Code2, title: "Development", titleAr: "التطوير والبرمجة", description: "We bring the design to life with clean, reliable code built for performance, accessibility, and growth.", descriptionAr: "نحوّل التصميم إلى منتج فعلي بكود منظم وموثوق، يراعي الأداء وسهولة الوصول وقابلية النمو." },
  { icon: ShieldCheck, title: "Testing & Refinement", titleAr: "الاختبار والتحسين", description: "We test across devices, refine the details, and make sure everything works as beautifully as it looks.", descriptionAr: "نختبر على مختلف الأجهزة، وندقق التفاصيل ونحسّن الأداء لضمان تجربة تعمل بجودة تصميمها." },
  { icon: Rocket, title: "Launch & Beyond", titleAr: "الإطلاق وما بعده", description: "We launch with confidence, monitor real-world performance, and support your product as it evolves.", descriptionAr: "نطلق منتجك بثقة، ونتابع أداءه الفعلي وندعم تطوره مع نمو أعمالك." },
];

export default function Workflow() {
  const { isArabic } = useLanguage();
  const section = useRef<HTMLElement>(null);
  const intro = useRef<HTMLElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!section.current || !list.current) return;
      const bounds = section.current.getBoundingClientRect();
      if (bounds.top > innerHeight || bounds.bottom < 0) return;
      const introBottom = Math.max(0, intro.current?.getBoundingClientRect().bottom || 0);
      const focus = innerWidth < 768 ? Math.max(innerHeight * .55, introBottom + (innerHeight - introBottom) / 2) : innerHeight * .55;
      let closest = 0;
      let distance = Infinity;
      Array.from(list.current.children).forEach((step, index) => {
        const rect = step.getBoundingClientRect();
        const delta = Math.abs(rect.top + rect.height / 2 - focus);
        if (delta < distance) { distance = delta; closest = index; }
      });
      setActive(current => current === closest ? current : closest);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(onScroll);
    if (section.current) observer.observe(section.current);
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={section} id="process" className="workflow-section" dir={isArabic ? "rtl" : "ltr"} aria-labelledby="workflow-title">
      <div className="workflow-layout">
        <header ref={intro} className="workflow-intro">
          <h2 id="workflow-title" className="workflow-label">{isArabic ? "منهجية عملنا" : "Our Workflow"}</h2>
          <h3 className="workflow-statement">
            <span>{isArabic ? "تصميم برؤية." : "Thoughtfully Designed."}</span>
            <span>{isArabic ? "تنفيذ بإتقان." : "Precisely Engineered."}</span>
          </h3>
          <p className="workflow-description">
            {isArabic
              ? "من الفكرة الأولى إلى أدق التفاصيل البرمجية، نوحّد الرؤية الاستراتيجية والتصميم والتكنولوجيا لنصنع تجارب رقمية متكاملة، تُحدث فرقًا حقيقيًا وتترك أثرًا مستدامًا."
              : "From the first spark of an idea to the final line of code, we bring strategy, design, and technology together to create seamless digital experiences built to make a difference."}
          </p>
          <div className="workflow-progress" aria-hidden="true">
            {steps.map((step, index) => <span key={step.title} data-current={index <= active} />)}
          </div>
        </header>

        <ol ref={list} className="workflow-steps" aria-label={isArabic ? "مراحل تنفيذ المشروع" : "Project stages"}>
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <li key={step.title} className="workflow-step" data-active={index === active} aria-current={index === active ? "step" : undefined}>
                <div className="workflow-step-top">
                  <span className="workflow-step-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <Icon className="workflow-step-icon" size={38} strokeWidth={1.4} aria-hidden="true" />
                </div>
                <h3>{isArabic ? step.titleAr : step.title}</h3>
                <p>{isArabic ? step.descriptionAr : step.description}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
