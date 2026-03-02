import { NextResponse } from 'next/server';
import { createServerSideClient } from '@/lib/supabase';

export const runtime = 'edge';
import { auth } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get('file') as File;
        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const supabase = await createServerSideClient();

        // Generate a unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const filePath = `uploads/${fileName}`;

        const { data, error } = await supabase.storage
            .from('atlas_assets')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false,
            });

        if (error) {
            console.error('Supabase upload error:', error);
            throw error;
        }

        const { data: publicUrlData } = supabase.storage
            .from('atlas_assets')
            .getPublicUrl(filePath);

        return NextResponse.json({ url: publicUrlData.publicUrl });
    } catch (error) {
        console.error('Upload Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
