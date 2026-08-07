-- Only descriptions and project highlights are localized. All project identity,
-- client, date, slug, category, URL, and technology fields stay shared in English.
alter table public.projects
  add column if not exists description_ar text,
  add column if not exists long_description_ar text,
  add column if not exists features_ar jsonb not null default '[]'::jsonb;

-- Remove columns from any partial run of the earlier, broader draft migration.
alter table public.projects
  drop column if exists title_ar,
  drop column if exists category_ar,
  drop column if exists client_ar,
  drop column if exists completion_date_ar,
  drop column if exists tags_ar;

update public.projects set
  description_ar = 'متجر أنيق لمنتجات الجمال والعناية الشخصية، يضم منتجات مختارة وتصنيفات واضحة وعروضًا وتجربة تسوق سهلة.',
  long_description_ar = 'كيورا كير تجربة متجر إلكتروني متجاوبة لمنتجات الجمال والعناية الشخصية. يجمع الموقع بين التصميم التحريري الهادئ واكتشاف المنتجات وفلاتر التصنيفات والبحث والمجموعات المميزة والأسعار الترويجية وسلة التسوق والدفع وتتبع الطلبات والتنقل السهل على الهاتف.',
  features_ar = '[{"icon":"star","title":"اكتشاف المنتجات المختارة","description":"يساعد البحث وفلاتر التصنيفات والمجموعات المميزة والعروض وتفاصيل المنتجات الواضحة العملاء على الوصول إلى منتجات العناية المناسبة بسرعة."}]'::jsonb
where slug = 'cura-care';

update public.projects set
  description_ar = 'منصة راقية لعرض وحجز مواقع استوديو إبداعي يوفر مساحات متنوعة للتصوير وصناعة الأفلام والإعلانات وإنتاج المحتوى.',
  long_description_ar = 'سيت أب ستوديو منصة متجاوبة لعرض وحجز مواقع وكالة متخصصة في تأجير مواقع الإنتاج الإبداعي. تعرض أكثر من 15 مساحة عبر معارض غنية بالصور والفيديو، وتنظم المواقع حسب نوع الإنتاج، وتقود الزائر خلال رحلة واضحة لطلب عرض سعر. كما تتيح لوحة الإدارة للفريق إدارة المواقع والوسائط والأسعار والاستفسارات دون تعديل كود الموقع.',
  features_ar = '[{"icon":"design","title":"معرض المواقع","description":"عرض احترافي لمساحات الاستوديو من خلال معارض الصور والفيديو."},{"icon":"booking","title":"حجز وعروض أسعار","description":"مسار واضح لطلب عرض سعر مع خيارات تسعير متعددة لاحتياجات الإنتاج."},{"icon":"settings","title":"إدارة المحتوى","description":"لوحة تحكم لإدارة المواقع والوسائط والأسعار ومحتوى الموقع."},{"icon":"globe","title":"تجربة ثنائية اللغة","description":"تجربة متجاوبة باللغتين العربية والإنجليزية على الهاتف والكمبيوتر."}]'::jsonb
where slug = 'setup-studio';

update public.projects set
  description_ar = 'معرض أعمال شخصي يبدأ بالعربية للمصمم الجرافيكي معتز جمعة، يعرض أكثر من 75 تصميمًا وأعمال العملاء والخدمات الإبداعية ووسائل التواصل.',
  long_description_ar = 'معرض أعمال معتز هو موقع جريء يعمل بالكامل من اليمين إلى اليسار لمصمم جرافيك مصري. يحول مجموعة كبيرة من أعمال العملاء إلى تجربة جذابة وسهلة التصفح باستخدام بطاقات خدمات متحركة وشرائط مهارات وتفاعلات للمشروعات ودعوات واضحة للتواصل. وتدعم لوحة تحكم خاصة الإدارة المستمرة للمشروعات والخدمات وإعدادات الموقع.',
  features_ar = '[{"icon":"design","title":"تصميم يبدأ بالعربية","description":"واجهة مميزة من اليمين إلى اليسار مبنية حول الهوية البصرية للمصمم."},{"icon":"star","title":"عرض إبداعي","description":"معارض تفاعلية تنظم مجموعة كبيرة من أعمال العملاء والأعمال الشخصية."},{"icon":"performance","title":"تجربة حركية","description":"تضيف تأثيرات التمرير والعدادات والحركة والتفاعل طاقة إلى التجربة."},{"icon":"settings","title":"لوحة الإدارة","description":"يمكن إدارة المشروعات والخدمات وإعدادات الموقع من مكان واحد."}]'::jsonb
where slug = 'mo3taz-portfolio';

update public.projects set
  description_ar = 'موقع حديث لتأجير السيارات يعرض الأسطول المتاح ويشرح خدمات التأجير ويساعد العملاء على العثور على السيارة المناسبة وطلبها بسرعة.',
  long_description_ar = 'رويال كارز تجربة متجاوبة لتأجير السيارات صُممت لتجعل تصفح المركبات بسيطًا وجذابًا. تعرض المنصة الأسطول عبر بطاقات واضحة وصور تفصيلية، وتوضح خيارات التأجير وخدمات الشركة، وتمنح العملاء مسارًا مباشرًا للاستفسار والحجز. ويحافظ التنفيذ السريع والتصميم المتجاوب على سهولة الاستخدام عبر الهاتف والتابلت والكمبيوتر.',
  features_ar = '[{"icon":"search","title":"استكشاف الأسطول","description":"يمكن للعملاء تصفح المركبات المتاحة ومقارنتها من خلال كتالوج واضح."},{"icon":"booking","title":"استفسارات التأجير","description":"تساعد الدعوات الواضحة العملاء على طلب السيارة المناسبة أو حجزها."},{"icon":"responsive","title":"تجربة متجاوبة","description":"يبقى محتوى المركبات سهل التصفح على جميع أحجام الشاشات."},{"icon":"performance","title":"تحميل سريع","description":"تحافظ الصفحات والتفاعلات المحسنة على سرعة تجربة التصفح."}]'::jsonb
where slug = 'royal-cars';

update public.projects set
  description_ar = 'منصة متكاملة لحجز السيارات مع عرض التوفر المباشر وإدارة الأسطول والحجز عبر الإنترنت والمدفوعات الرقمية المدمجة.',
  long_description_ar = 'رينت آند جو منصة متكاملة لتأجير السيارات تربط العملاء بأسطول محدث ورحلة حجز إلكترونية سهلة. يمكن للزائر التحقق من التوفر واختيار السيارة المناسبة وإكمال بيانات الحجز والدفع عبر الإنترنت. وتوفر لوحة الإدارة لفريق التأجير أدوات عملية لإدارة المركبات والتوفر والحجوزات ونشاط العملاء.',
  features_ar = '[{"icon":"search","title":"التوفر المباشر","description":"يمكن للعملاء العثور على السيارات المتاحة خلال فترة التأجير المختارة."},{"icon":"booking","title":"الحجز عبر الإنترنت","description":"يحول مسار الحجز الواضح اختيار السيارة إلى حجز مؤكد."},{"icon":"commerce","title":"مدفوعات آمنة","description":"تدعم المدفوعات الإلكترونية المدمجة رحلة تأجير رقمية متكاملة."},{"icon":"settings","title":"إدارة الأسطول","description":"تدير لوحة التحكم المركبات والتوفر والحجوزات."}]'::jsonb
where slug = 'rent-and-go';

-- Safe fallback for any projects added outside the dashboard before this migration.
update public.projects set
  description_ar = coalesce(nullif(description_ar, ''), description),
  long_description_ar = coalesce(nullif(long_description_ar, ''), long_description),
  features_ar = case when jsonb_array_length(features_ar) = 0 then to_jsonb(features) else features_ar end;

alter table public.projects
  alter column description_ar set not null,
  alter column long_description_ar set not null;
