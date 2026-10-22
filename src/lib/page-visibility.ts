import { createClient } from '@supabase/supabase-js';
import { getSupabaseConfig, isSupabaseConfigured } from './supabase/config';
import { unstable_cache } from 'next/cache';
export const getPageVisibility=unstable_cache(async()=>{
  const visibility={plans:true,templates:true};
  if(!isSupabaseConfigured())return visibility;
  const {url,publishableKey}=getSupabaseConfig();
  const client=createClient(url,publishableKey,{auth:{persistSession:false,autoRefreshToken:false}});
  const {data}=await client.from('page_visibility').select('page,enabled');
  data?.forEach(row=>{if(row.page==='plans'||row.page==='templates')visibility[row.page as keyof typeof visibility]=row.enabled;});
  return visibility;
},['page-visibility'],{revalidate:60,tags:['page-visibility']});
