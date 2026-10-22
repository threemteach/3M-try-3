'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, Plus, Trash2, Save, X } from 'lucide-react';
import type { CatalogItem } from '@/lib/catalog';
import TemplateImageUpload from './TemplateImageUpload';

const empty = {kind:'plans' as 'plans'|'templates',title:'',title_ar:'',description:'',description_ar:'',price:0,currency:'EGP',period:'monthly',features:[] as string[],features_ar:[] as string[],image_url:'',preview_url:'',category:'',is_published:false,is_featured:false,display_order:0};
export default function CatalogManager({items,initialKind='plans'}:{items:CatalogItem[];initialKind?:'plans'|'templates'}) {
  const router=useRouter();
  const [kind,setKind]=useState<'plans'|'templates'>(initialKind);
  const [query,setQuery]=useState('');
  const [status,setStatus]=useState('all');
  const [notice,setNotice]=useState('');
  const [draft,setDraft]=useState<(typeof empty & {id?:string})|null>(null);
  const [busy,setBusy]=useState(false);
  const [uploading,setUploading]=useState(false);
  const [error,setError]=useState('');
  async function send(body:object){
    if(uploading) return;
    setBusy(true);setError('');setNotice('');
    try{
      const response=await fetch('/api/admin/catalog',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
      const result=await response.json();if(!response.ok)throw new Error(result.error);
      setDraft(null);setNotice('Changes saved successfully.');router.refresh();
    }catch(e){setError(e instanceof Error?e.message:'Unable to save.');}finally{setBusy(false);}
  }
  const inputClass='mt-2 w-full rounded-md border border-[#d8d0e2] bg-white p-3 text-sm';
  const kindItems=items.filter(item=>item.kind===kind);
  const filtered=kindItems.filter(item=>(`${item.title} ${item.title_ar} ${item.category}`).toLowerCase().includes(query.toLowerCase())&&(status==='all'||item.is_published===(status==='published')));
  return <div>
    <div className="mb-6 grid grid-cols-3 gap-3">{[['Total',kindItems.length],['Published',kindItems.filter(i=>i.is_published).length],['Drafts',kindItems.filter(i=>!i.is_published).length]].map(([label,value])=><div key={label} className="rounded-lg border border-[#ddd5e7] bg-white p-4"><p className="text-xs text-[#70677d]">{label}</p><p className="mt-2 text-2xl font-bold">{value}</p></div>)}</div>
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4"><h1 className="text-2xl font-bold">Plans & templates</h1><button disabled={busy} onClick={()=>{setError('');setDraft({...empty,kind,period:kind==='templates'?'once':'monthly'});}} className="inline-flex items-center gap-2 rounded-md bg-[#302451] px-4 py-3 text-sm text-white"><Plus size={16}/>Add {kind==='plans'?'plan':'template'}</button></div>
    <div role="tablist" aria-label="Catalog type" className="mb-6 flex gap-2">{(['plans','templates'] as const).map(tab=><button key={tab} role="tab" aria-selected={kind===tab} onClick={()=>{setKind(tab);setDraft(null);}} className={`rounded-md border px-5 py-2 capitalize ${kind===tab?'bg-[#302451] text-white':'bg-white'}`}>{tab}</button>)}</div>
    {error&&<p role="alert" className="mb-5 rounded-md bg-red-50 p-4 text-sm text-red-700">{error}</p>}
    {notice&&<p role="status" className="mb-5 rounded-md bg-emerald-50 p-4 text-sm text-emerald-800">{notice}</p>}
    <div className="mb-6 flex flex-wrap gap-3"><input type="search" aria-label="Search catalog" placeholder="Search name or category" value={query} onChange={e=>setQuery(e.target.value)} className="min-w-0 flex-1 rounded-md border bg-white px-4 py-3 text-sm"/><select aria-label="Publication status" value={status} onChange={e=>setStatus(e.target.value)} className="rounded-md border bg-white px-4 py-3 text-sm"><option value="all">All statuses</option><option value="published">Published</option><option value="draft">Drafts</option></select></div>
    {draft&&<form onSubmit={e=>{e.preventDefault();void send(draft);}} className="mb-8 rounded-lg border border-[#ddd5e7] bg-white p-5 sm:p-8">
      <div className="mb-6 flex justify-between"><h2 className="font-bold">{draft.id?'Edit':'New'} {draft.kind==='plans'?'plan':'template'}</h2><button type="button" title="Close editor" onClick={()=>setDraft(null)}><X size={20}/></button></div>
      {draft.kind==='templates'&&<TemplateImageUpload value={draft.image_url} onBusy={setUploading} onChange={url=>setDraft(current=>current?{...current,image_url:url}:current)}/>}
      <fieldset disabled={busy||uploading}>
      <div className="grid gap-5 sm:grid-cols-2">
        {(['title','title_ar','description','description_ar','category','image_url','preview_url'] as const).map(field=><label key={field} className="text-sm font-semibold">{{title:'English name',title_ar:'Arabic name',description:'English description',description_ar:'Arabic description',category:'Category',image_url:'Preview image URL (HTTPS)',preview_url:'Live preview URL (HTTPS)'}[field]}{field.includes('description')?<textarea maxLength={1500} dir={field.endsWith('_ar')?'rtl':'ltr'} value={draft[field]} onChange={e=>setDraft({...draft,[field]:e.target.value})} className={inputClass} rows={3}/>:<input required={field==='title'||(field==='image_url'&&draft.kind==='templates')} type={field.endsWith('_url')?'url':'text'} dir={field.endsWith('_ar')?'rtl':'ltr'} value={draft[field]} onChange={e=>setDraft({...draft,[field]:e.target.value})} className={inputClass}/>}</label>)}
        <label className="text-sm font-semibold">Price<input type="number" min="0" step="0.01" required value={draft.price} onChange={e=>setDraft({...draft,price:Number(e.target.value)})} className={inputClass}/></label>
        <label className="text-sm font-semibold">Currency<select value={draft.currency} onChange={e=>setDraft({...draft,currency:e.target.value})} className={inputClass}>{['EGP','AED','USD','SAR'].map(c=><option key={c}>{c}</option>)}</select></label>
        <label className="text-sm font-semibold">Billing period<select value={draft.period} onChange={e=>setDraft({...draft,period:e.target.value})} className={inputClass}><option value="monthly">Monthly</option><option value="yearly">Yearly</option><option value="once">One-time</option></select></label>
        <label className="text-sm font-semibold">Display order<input type="number" min="0" max="10000" value={draft.display_order} onChange={e=>setDraft({...draft,display_order:Number(e.target.value)})} className={inputClass}/></label>
        {(['features','features_ar'] as const).map(field=><label key={field} className="text-sm font-semibold">{field==='features'?'English features (one per line)':'Arabic features (one per line)'}<textarea dir={field==='features_ar'?'rtl':'ltr'} rows={5} value={draft[field].join('\n')} onChange={e=>setDraft({...draft,[field]:e.target.value.split('\n')})} className={inputClass}/></label>)}
      </div>
      <div className="my-6 flex flex-wrap gap-6">{(['is_published','is_featured'] as const).map(field=><label key={field} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={draft[field]} onChange={e=>setDraft({...draft,[field]:e.target.checked})}/>{field==='is_published'?'Published':'Featured'}</label>)}</div>
      <button disabled={busy} className="inline-flex items-center gap-2 rounded-md bg-[#302451] px-5 py-3 text-sm text-white disabled:opacity-50"><Save size={16}/>{busy?'Saving…':'Save'}</button>
      </fieldset>
    </form>}
    <div className="divide-y divide-[#ded7e6] rounded-lg border border-[#ded7e6] bg-white">{filtered.map(item=><div key={item.id} className="flex flex-wrap items-center justify-between gap-4 p-5"><div><h2 className="font-bold">{item.title}</h2><p className="mt-1 text-xs text-[#70677d]">{item.price} {item.currency} · {item.is_published?'Published':'Draft'} · Order {item.display_order}</p></div><div className="flex gap-3"><button disabled={busy} title={`Edit ${item.title}`} onClick={()=>setDraft(item)} className="p-2"><Pencil size={18}/></button><button disabled={busy} title={`Delete ${item.title}`} onClick={()=>{if(window.confirm(`Delete ${item.title}?`))void send({id:item.id,action:'delete'});}} className="p-2 text-red-700"><Trash2 size={18}/></button></div></div>)}{!filtered.length&&<p className="p-8 text-sm text-[#70677d]">{kindItems.length ? 'No matching results. Change your search or filter.' : 'No items yet. Add your first item above.'}</p>}</div>
  </div>;
}
