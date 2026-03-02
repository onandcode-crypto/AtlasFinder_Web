import { NextResponse } from 'next/server';
import { createServerSideClient } from '@/lib/supabase';

export const runtime = 'edge';

export async function GET() {
    try {
        const supabase = await createServerSideClient();
        const { data, error } = await supabase
            .from('navigation_items')
            .select('label, path')
            .eq('is_active', true)
            .order('sort_order', { ascending: true });

        if (error) {
            console.error('Supabase error fetching navigation:', error);
            return NextResponse.json([], { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error in navigation API:', error);
        return NextResponse.json([], { status: 500 });
    }
}
