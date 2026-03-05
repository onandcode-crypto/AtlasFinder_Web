import { NextResponse } from 'next/server';
import { comparePassword } from '@/lib/crypto';
import { createServiceClient } from '@/lib/supabase';
import { signJWT } from '@/lib/jwt';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: '이메일과 비밀번호를 입력해주세요.' }, { status: 400 });
        }

        const supabase = createServiceClient();
        const { data: admin, error } = await supabase
            .from('admins')
            .select('*')
            .eq('email', email)
            .single();

        if (error || !admin) {
            return NextResponse.json({ error: '이메일 또는 비밀번호가 일치하지 않습니다.' }, { status: 401 });
        }

        const isValid = await comparePassword(password, admin.password_hash);
        if (!isValid) {
            return NextResponse.json({ error: '이메일 또는 비밀번호가 일치하지 않습니다.' }, { status: 401 });
        }

        const token = await signJWT({
            id: admin.id,
            email: admin.email,
            needsPasswordChange: admin.needs_password_change,
        });

        const response = NextResponse.json({ ok: true });
        response.cookies.set('admin-token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 24 * 60 * 60,
            path: '/',
        });

        return response;
    } catch {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
