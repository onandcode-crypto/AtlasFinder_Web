import { NextResponse } from 'next/server';
import { createServerSideClient } from '@/lib/supabase';
import { auth } from '@/lib/auth';

export const runtime = 'edge';

export async function GET() {
    try {
        const session = await auth();
        if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const supabase = await createServerSideClient();
        const { data, error } = await supabase
            .from('navigation_items')
            .select('*')
            .order('sort_order', { ascending: true });

        if (error) throw error;
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { id, label, path, sort_order, is_active } = await req.json();
        const supabase = await createServerSideClient();

        // Upsert (insert or update)
        const { data, error } = await supabase
            .from('navigation_items')
            .upsert({
                ...(id ? { id } : {}),
                label,
                path,
                sort_order,
                is_active,
                updated_at: new Date().toISOString()
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
        const session = await auth();
        if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

        const supabase = await createServerSideClient();
        const { error } = await supabase.from('navigation_items').delete().eq('id', id);

        if (error) throw error;
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
