import { NextResponse } from 'next/server';
import { createServerSideClient } from '@/lib/supabase';
import { getAdminSession } from '@/lib/auth';

export async function GET(req: Request) {
    try {
        const session = await getAdminSession(req);
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const supabase = await createServerSideClient();
        const { data, error } = await supabase
            .from('applications')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getAdminSession(req);
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { id, name, version, price_type, description, features, os, image_url, link_url, status } = await req.json();
        const supabase = await createServerSideClient();

        const { data, error } = await supabase
            .from('applications')
            .upsert({
                ...(id ? { id } : {}),
                name,
                version,
                price_type,
                description,
                features, // Expecting an array of strings
                os,
                image_url,
                link_url,
                status
            })
            .select()
            .single();

        if (error) throw error;
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await getAdminSession(req);
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

        const supabase = await createServerSideClient();
        const { error } = await supabase.from('applications').delete().eq('id', id);

        if (error) throw error;
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
