"use client";

import { useState, type ReactNode } from "react";

export default function PlanBillingFilter({arabic,periods,children}:{arabic:boolean;periods:string[];children:ReactNode}) {
  const [period,setPeriod]=useState("monthly");
  const options=[
    {value:"monthly",label:arabic?"شهري":"Monthly"},
    {value:"yearly",label:arabic?"سنوي":"Yearly"},
  ];
  const count=period==='all'?periods.length:periods.filter(value=>value===period).length;
  return <div className="billing-filter" data-billing={period}>
    <div className="mb-8 flex justify-center">
    <div role="group" aria-label={arabic?'دورة الاشتراك':'Billing period'} className="inline-flex rounded-full border border-white/25 bg-white/5 p-1">
      {options.map(option=><button key={option.value} type="button" aria-pressed={period===option.value} onClick={()=>setPeriod(option.value)} className={`min-h-11 min-w-[92px] rounded-full px-5 py-2 text-sm font-semibold transition-colors ${period===option.value?'bg-white text-[#302451] ring-2 ring-[#b8a1ed] ring-offset-2 ring-offset-[#302451]':'text-white hover:bg-white/10'}`}>{option.label}</button>)}
    </div>
    </div>
    <p role="status" className="sr-only">{arabic?`${count} خطة`:`${count} plans`}</p>
    {children}
    {!count&&periods.length>0&&<p className="py-12 text-center text-sm leading-7 text-white/75">{arabic?'لا توجد خطط متاحة لهذه الدورة حاليًا.':'No plans are available for this billing period yet.'}</p>}
  </div>;
}
