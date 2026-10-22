import { requireAdmin } from '@/lib/auth';
import CatalogManager from '@/components/admin/CatalogManager';
import type { CatalogItem } from '@/lib/catalog';
export default async function Page({searchParams}:{searchParams:Promise<{type?:string}>}){
  const {type}=await searchParams;
  const {supabase}=await requireAdmin();
  const {data,error}=await supabase.from('catalog_items').select('*').order('display_order');
  if(error)return <div role="alert" className="rounded-lg border bg-white p-8"><h1 className="text-xl font-bold">{['42P01','PGRST205'].includes(error.code)?'Catalog setup required':'Unable to load catalog'}</h1><p className="mt-4">{['42P01','PGRST205'].includes(error.code)?'Apply supabase/catalog.sql in the Supabase SQL editor to enable plans and templates.':'Check the database connection and access permissions, then reload this page.'}</p></div>;
  return <CatalogManager key={type} initialKind={type==='templates'?'templates':'plans'} items={(data??[]) as CatalogItem[]}/>;
}
