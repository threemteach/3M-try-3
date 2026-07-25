# Prompt to explain everything done in this session

Copy and paste this into ChatGPT or any AI to get a full explanation:

---

أنا عندي مشروع website بتقنية Next.js 15 + TypeScript + Tailwind CSS 4 اسمه "3M". Sessions الأخيرة اتعملت فيها شغل كتير، عايزك تشرحلي كل حاجة اتعملت بالتفصيل:

## 1. RotatingSpinner Component
- عملت component اسمه RotatingSpinner بيعرض "WE Build" + سهم (CSS triangle) + كلمة دوّارة
- الكلمات الدوّارة: E-commerce, Web Application, UI/UX Designs, Scalable Websites, Portfolio, Digital Platforms
- التأثير: 3 كلمات ظاهرة في نفس الوقت - وحدة باهتة فوق، وحدة نشطة في النص (عليها glow/opacity 100)، وحدة باهتة تحت
- الكلمات بتلف كل 2.2 ثانية مع transition ناعم
- الـ component بيستخدم CSS classes في globals.css للـ positioning: `.pos-top`, `.pos-mid`, `.pos-bot`, `.pos-hidden`
- الـ positioning بيتغير تلقائياً مع كل breakpoint (mobile: 120px height, tablet: 160px, md: 190px, desktop: 210px)

## 2. Hero Section Layout
- **Mobile:** كل حاجة في النص (text-center) - العنوان + الـ spinner + الصور تحت بعض
- **Desktop:** العنوان والspinner شمال، والـ Mockup image (`موكب.png`) على اليمين بشكل absolute
- العنوان "Where Ambition / Meets Engineering" على سطرين بس (لا ي折行 لـ 3 lines)
- الـ Mockup على الديسكتوب بيتعمله `absolute` positioning على اليمين عشان ما ي cut off النص
- على الموبايل والتابلت الـ Mockup بيظهر في النص تحت النص

## 3. Hero Buttons
- زرين يظهران من `sm` breakpoint فما فوق: "See Our Work" (outline) + "Get a free quote" (solid white)
- التصميم: pill shape (rounded-[9999px])
- محددين بـ `hidden sm:flex`

## 4. Mobile Top Bar
- لوجو 3M شمال + زر Contact يمين
- `sm:hidden` يعني بيظهر بس على الموبايل

## 5. Mobile Bottom Navigation
- شريط سفلي عائم بخلفية بيضاء مع SVG notch متحرك
- 4 عناصر: Home, Portfolio, About Us, Process
- الـ notch بيتحرك مع العنصر النشط

## 6. Glassmorphism Navbar (Desktop/Tablet)
- يظهر من `sm` breakpoint (640px+)
- تأثير زجاجي (backdrop-blur + rgba background)
- حواف ملساء `rounded-[72px]`
- فيه: لوجو + روابط (Home, Our work, About, Process) + زر Contact

## 7. globals.css
- `.rotating-item`: font-family MedulaOne, color white, text-shadow
- Responsive positioning rules مع media queries لكل breakpoint
- `overflow-x: hidden` على html/body لمنع أي horizontal scroll

## 8. الكونفيج
- عملت `opencode.json` في البروجكت + في `~/.config/opencode/` عشان أضيف Kimi (Moonshot AI) كـ provider
- الـ provider بيستخدم OpenAI-compatible API

عايزك تشرحلي بالعربي الفصيح:
1. إيه الفرق بين كل breakpoint (mobile vs tablet vs desktop)
2. إزاي الـ RotatingSpinner بيشتغل من ناحية الـ CSS والـ JavaScript
3. ليه استخدمت `absolute` positioning للـ Mockup على الديسكتوب
4. إزاي الـ Mobile Bottom Navigation الـ SVG notch بيشتغل
5. إيه المطلوب عشان الـ Hero Section يبقى responsive بشكل مثالي

شرّحلي كإنك بتعلمني من الصفر.
