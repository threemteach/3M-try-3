import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireAdminApi } from '@/lib/api-security';
import { catalogSchema } from '@/lib/catalog';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAdminApi(request);
    if ('error' in auth) return NextResponse.json({error:auth.error},{status:auth.status});
    const body = await request.json();
    const id = body.id ? z.string().uuid().parse(body.id) : null;
    let error;
    if (body.action === 'delete') {
      if (!id) throw new Error('An item ID is required.');
      ({error} = await auth.supabase.from('catalog_items').delete().eq('id',id));
    } else {
      const input = catalogSchema.parse(body);
      ({error} = id ? await auth.supabase.from('catalog_items').update(input).eq('id',id) : await auth.supabase.from('catalog_items').insert(input));
    }
    if(error) throw new Error(error.message);
    ['/plans','/templates','/ar/plans','/ar/templates','/admin/catalog'].forEach(path=>revalidatePath(path));
    return NextResponse.json({ok:true});
  } catch(error) {
    return NextResponse.json({error:error instanceof Error ? error.message : 'Unable to save.'},{status:400});
  }
}
