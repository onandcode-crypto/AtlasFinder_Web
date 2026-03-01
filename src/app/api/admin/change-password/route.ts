import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
export const runtime = 'edge';
import bcrypt from 'bcryptjs';
import { createServerSideClient } from '@/lib/supabase';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { newPassword } = await req.json();
        if (!newPassword || newPassword.length < 8) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 400 });
        }

        const email = session.user.email;
        const password_hash = await bcrypt.hash(newPassword, 10);

        const supabase = await createServerSideClient();
        const { error } = await supabase
            .from('admins')
            .update({ password_hash, needs_password_change: false })
            .eq('email', email);

        if (error) {
            throw error;
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Password change error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
