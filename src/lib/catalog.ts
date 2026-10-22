import { createClient } from '@supabase/supabase-js';
import { getSupabaseConfig, isSupabaseConfigured } from './supabase/config';
import { z } from 'zod';

const safeUrl = z.string().max(2000).refine(v => !v || /^https:\/\//i.test(v), 'Use an HTTPS URL.');
export const catalogSchema = z.object({
  kind: z.enum(['plans', 'templates']), title: z.string().trim().min(1).max(120), title_ar: z.string().max(120),
  description: z.string().max(1500), description_ar: z.string().max(1500),
  price: z.number().min(0).max(100000000), currency: z.enum(['EGP','AED','USD','SAR']),
  period: z.enum(['monthly','yearly','once']), features: z.array(z.string().max(200)).max(20), features_ar: z.array(z.string().max(200)).max(20),
  image_url: safeUrl, preview_url: safeUrl, category: z.string().max(80),
  is_published: z.boolean(), is_featured: z.boolean(), display_order: z.number().int().min(0).max(10000),
}).refine(v => v.kind !== 'templates' || Boolean(v.image_url), { message: 'A template preview image is required.', path: ['image_url'] });
export type CatalogItem = z.infer<typeof catalogSchema> & { id: string };
export async function getCatalog(kind: 'plans' | 'templates') {
  if (!isSupabaseConfigured()) return { items: [] as CatalogItem[], unavailable: true };
  const {url,publishableKey} = getSupabaseConfig();
  const client = createClient(url,publishableKey,{auth:{persistSession:false,autoRefreshToken:false}});
  const {data,error} = await client.from('catalog_items').select('*').eq('kind',kind).eq('is_published',true).order('display_order').order('id');
  return { items: (data ?? []) as CatalogItem[], unavailable: Boolean(error) };
}
