import { NextResponse } from 'next/server';
import { createServerSideClient } from '@/lib/supabase';
import { getAdminSession } from '@/lib/auth';

export const runtime = 'edge';

export async function GET(req: Request) {
    try {
        const session = await getAdminSession(req);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const supabase = await createServerSideClient();
        const { data, error } = await supabase
            .from('atlaslogs')
            .select(`
                id,
                title,
                summary,
                thumbnail_url,
                is_published,
                created_at,
                updated_at,
                admins (email)
            `)
            .order('created_at', { ascending: false });

        if (error) {
            throw error;
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Failed to fetch AtlasLogs in admin:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getAdminSession(req);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { title, summary, content, thumbnail_url, is_published } = body;

        const supabase = await createServerSideClient();

        // Find admin id based on session email
        const { data: adminData } = await supabase
            .from('admins')
            .select('id')
            .eq('email', session)
            .single();

        if (!adminData) {
            return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
        }

        const { data, error } = await supabase
            .from('atlaslogs')
            .insert([{
                title,
                summary,
                content,
                thumbnail_url,
                is_published,
                author_id: adminData.id
            }])
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        console.error('Failed to create AtlasLog:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
