import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-security';
import { validateImage } from '@/lib/project-validation';
import sharp from 'sharp';

export const runtime = 'nodejs';
export async function POST(request: NextRequest) {
  try {
    const auth = await requireAdminApi(request);
    if ('error' in auth) return NextResponse.json({error:auth.error},{status:auth.status});
    const form = await request.formData();
    const file = form.get('image');
    if (!(file instanceof File) || !file.size) throw new Error('Select an image.');
    validateImage(file);
    const bytes = await sharp(Buffer.from(await file.arrayBuffer()), {limitInputPixels:40000000})
      .rotate().resize({width:1600,withoutEnlargement:true}).webp({quality:85}).toBuffer();
    const path = `templates/${randomUUID()}.webp`;
    const {error} = await auth.supabase.storage.from('project-images').upload(path,bytes,{contentType:'image/webp',cacheControl:'31536000',upsert:false});
    if(error) throw new Error(error.message);
    const {data} = auth.supabase.storage.from('project-images').getPublicUrl(path);
    return NextResponse.json({url:data.publicUrl});
  } catch(error) {
    return NextResponse.json({error:error instanceof Error?error.message:'Unable to upload image.'},{status:400});
  }
}
