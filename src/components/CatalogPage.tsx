import { Check, ArrowUpRight, MessageCircle } from 'lucide-react';
import Navbar from './Navbar';
import { getCatalog } from '@/lib/catalog';
import { SITE_PHONE } from '@/lib/constants';
import PlanBillingFilter from './PlanBillingFilter';

export default async function CatalogPage({kind,arabic=false}:{kind:'plans'|'templates';arabic?:boolean}) {
  const {items,unavailable} = await getCatalog(kind);
  const plans = kind === 'plans';
  const title = plans ? (arabic?'خطط الاشتراك':'Subscription Plan') : (arabic?'القوالب الجاهزة':'Templates');
  const GridWrapper = plans ? PlanBillingFilter : PlainGridWrapper;
  return <div dir={arabic?'rtl':'ltr'} className={`catalog-page pricing-future min-h-screen bg-[#f5f3f6] text-[#302451] ${plans?'catalog-plans':'catalog-templates'}`}>
    <Navbar/>
    <div aria-hidden="true" className="catalog-reference-pattern" />
    <section className="relative isolate overflow-hidden bg-[#302451] px-5 pb-14 pt-28 text-white sm:pb-20 sm:pt-44">
      <div className="relative z-10 mx-auto max-w-[1120px]">
        <h1 className="catalog-reference-title">{title}</h1>
      </div>
    </section>
    <section className="mx-auto max-w-[1120px] px-5 py-12 sm:py-20">
      {!items.length && <p role="status" className="py-16 text-center leading-8">{unavailable?(arabic?'القائمة غير متاحة حاليًا، تواصل معنا لمعرفة التفاصيل.':'The catalog is currently unavailable. Contact us for details.'):(arabic?'نعمل على تجهيز خيارات جديدة. تواصل معنا لمناقشة مشروعك.':'New options are on the way. Contact us to discuss your project.')}</p>}
      <GridWrapper arabic={arabic} periods={items.map(item=>item.period)}>
      <div className="catalog-reference-grid grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map(item=>{
          const name = arabic ? item.title_ar || item.title : item.title;
          const description = arabic ? item.description_ar || item.description : item.description;
          const features = arabic && item.features_ar.length ? item.features_ar : item.features;
          const message = arabic ? `مرحبًا، أريد ${plans?'الاشتراك في خطة':'اختيار قالب'} ${name}. السعر المعروض: ${item.price} ${item.currency} (${item.period}).` : `Hello, I am interested in ${plans?'the plan':'the template'} "${name}". Listed price: ${item.price} ${item.currency} (${item.period}).`;
          return <article key={item.id} data-period={item.period} data-featured={item.is_featured} className={`flex min-w-0 flex-col overflow-hidden rounded-lg border bg-white ${item.is_featured?'border-[#876dca]':'border-[#ded9e5]'}`}>
            {!plans && <div className="aspect-[16/10] overflow-hidden border-b border-[#ded9e5] bg-[#e6e2eb]"><img src={item.image_url} alt={name} loading="lazy" className="h-full w-full object-cover object-top"/></div>}
            <div className="catalog-card-body flex flex-1 flex-col p-6 sm:p-8">
              {item.category && !plans && <p className="template-category mb-3 text-xs text-[#70677d]">{item.category}</p>}
              <h2 className="catalog-card-name break-words text-xl font-bold leading-relaxed">{name}</h2>
              {description.trim() && description.trim().toLowerCase() !== name.trim().toLowerCase() && <p className="catalog-card-description mt-3 text-sm leading-7 text-[#70677d]">{description}</p>}
              <p className="catalog-card-price mt-6 flex flex-wrap items-baseline gap-2"><span className="text-3xl font-bold">{new Intl.NumberFormat(arabic?'ar-EG':'en').format(item.price)}</span><span className="text-sm">{item.currency}</span><span className="text-xs text-[#70677d]">{item.period==='monthly'?(arabic?'شهريًا':'/ month'):item.period==='yearly'?(arabic?'سنويًا':'/ year'):(arabic?'مرة واحدة':'one-time')}</span></p>
              {features.some(feature=>feature.trim()) && <ul className="mb-8 mt-6 space-y-3 border-t border-[#ece8f0] pt-6">{features.filter(feature=>feature.trim()).map((feature,i)=><li key={i} className="flex gap-3 text-sm leading-7"><Check className="mt-1 h-4 w-4 shrink-0 text-[#765cad]"/><span>{feature}</span></li>)}</ul>}
              <div className="catalog-card-actions mt-auto flex flex-wrap gap-3">
                <a href={`https://wa.me/${SITE_PHONE.replace(/\D/g,'')}?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer" className="catalog-subscribe inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md bg-[#302451] px-4 py-3 text-sm font-semibold text-white hover:bg-[#493769]">{plans?(arabic?'اشترك الآن':'Subscribe'):(arabic?'اختر القالب':'Choose template')}</a>
                {!plans && item.preview_url && <a href={item.preview_url} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[#ded9e5] px-4 text-sm">{arabic?'معاينة':'Preview'}<ArrowUpRight className="h-4 w-4"/></a>}
              </div>
            </div>
          </article>;
        })}
      </div>
      </GridWrapper>
      <a href={`https://wa.me/${SITE_PHONE.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="mt-12 inline-flex items-center gap-2 border-b border-[#302451]/40 pb-2 text-sm">{arabic?'تحتاج مساعدة في الاختيار؟ تواصل معنا':'Need help choosing? Talk to us'}<MessageCircle className="h-4 w-4"/></a>
    </section>
  </div>;
}

function PlainGridWrapper({children}:{children:React.ReactNode;arabic:boolean;periods:string[]}){return <>{children}</>;}
