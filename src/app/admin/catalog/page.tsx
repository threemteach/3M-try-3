import { requireAdmin } from '@/lib/auth';
import CatalogManager from '@/components/admin/CatalogManager';
import type { CatalogItem } from '@/lib/catalog';
export default async function Page(){
  const {supabase}=await requireAdmin();
  const {data,error}=await supabase.from('catalog_items').select('*').order('display_order');
  if(error)return <div className="rounded-lg border bg-white p-8"><h1 className="text-xl font-bold">Catalog setup required</h1><p className="mt-4">Apply supabase/catalog.sql in the Supabase SQL editor to enable plans and templates.</p></div>;
  return <CatalogManager items={(data??[]) as CatalogItem[]}/>;
}
