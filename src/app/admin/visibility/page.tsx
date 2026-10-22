import { requireAdmin } from '@/lib/auth';
import { revalidatePath, revalidateTag } from 'next/cache';

async function save(form:FormData){
  'use server';
  const {supabase}=await requireAdmin();
  const page=String(form.get('page'));
  if(page!=='plans'&&page!=='templates')throw new Error('Invalid page');
  const {data,error}=await supabase.from('page_visibility').update({enabled:form.get('enabled')==='on'}).eq('page',page).select('page').single();
  if(error||!data)throw new Error('Unable to save page visibility. Check database setup.');
  revalidateTag('page-visibility');revalidatePath('/','layout');
}
export default async function Page(){
  const {supabase}=await requireAdmin();
  const {data,error}=await supabase.from('page_visibility').select('page,enabled');
  return <div className="max-w-2xl"><h1>Page visibility</h1><p className="mt-3 text-sm text-[#70677d]">Hidden pages are removed from navigation and cannot be opened directly. Their content stays saved.</p>{error?<p role="alert" className="mt-6 rounded-lg border bg-white p-5">Apply supabase/page-visibility.sql in Supabase to activate these controls.</p>:<div className="mt-8 divide-y rounded-lg border bg-white">{data?.map(row=><form key={row.page} action={save} className="flex flex-wrap items-center justify-between gap-5 p-6"><input type="hidden" name="page" value={row.page}/><label className="flex items-center gap-3"><input type="checkbox" name="enabled" defaultChecked={row.enabled} className="h-5 w-5"/><span className="font-semibold capitalize">Show {row.page}</span></label><button className="rounded-md bg-[#302451] px-5 py-2 text-sm text-white">Save</button></form>)}</div>}</div>;
}
