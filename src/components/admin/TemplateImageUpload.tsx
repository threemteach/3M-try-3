'use client';
import { useState } from 'react';
import { Upload } from 'lucide-react';

export default function TemplateImageUpload({value,onChange,onBusy}:{value:string;onChange:(url:string)=>void;onBusy:(busy:boolean)=>void}) {
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState('');
  async function upload(file:File){
    setError('');
    if(file.size>6*1024*1024){setError('Image must be 6 MB or smaller.');return;}
    setBusy(true);onBusy(true);
    try{
      const form=new FormData();form.set('image',file);
      const response=await fetch('/api/admin/catalog/image',{method:'POST',body:form});
      const data=await response.json();if(!response.ok)throw new Error(data.error);
      onChange(data.url);
    }catch(e){setError(e instanceof Error?e.message:'Upload failed.');}
    finally{setBusy(false);onBusy(false);}
  }
  return <div className="mb-6 rounded-lg border border-[#ddd5e7] p-4">
    <p className="mb-3 text-sm font-semibold">Template preview image</p>
    {value&&<div className="mb-4 aspect-[16/10] max-w-sm overflow-hidden rounded-md bg-[#efedf3]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={value} alt="Template preview" className="h-full w-full object-contain"/>
    </div>}
    <label className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-[#302451] px-4 py-3 text-sm text-white">
      <Upload size={16}/>{busy?'Uploading…':value?'Replace image':'Upload image'}
      <input disabled={busy} type="file" className="sr-only" accept="image/jpeg,image/png,image/webp,image/avif" onChange={e=>{const file=e.target.files?.[0];if(file)void upload(file);e.target.value='';}}/>
    </label>
    <p className="mt-3 text-xs leading-5 text-[#70677d]">JPG, PNG, WebP or AVIF. Up to 6 MB. Save the template after uploading.</p>
    {error&&<p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
  </div>;
}
