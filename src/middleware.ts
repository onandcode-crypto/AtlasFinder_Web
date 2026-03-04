import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/jwt';

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('admin-token')?.value;

    if (!token) {
        return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    const payload = await verifyJWT(token);
    if (!payload) {
        return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/dashboard/:path*'],
};
