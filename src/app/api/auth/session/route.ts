import { NextResponse } from 'next/server';
import { verifyJWT, getTokenFromCookie } from '@/lib/jwt';

export const runtime = 'edge';

export async function GET(req: Request) {
    const token = getTokenFromCookie(req);
    if (!token) return NextResponse.json(null);

    const payload = await verifyJWT(token);
    if (!payload) return NextResponse.json(null);

    return NextResponse.json({
        user: {
            id: payload.id,
            email: payload.email,
            needsPasswordChange: payload.needsPasswordChange,
        },
    });
}
