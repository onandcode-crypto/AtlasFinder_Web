import { verifyJWT, getTokenFromCookie } from '@/lib/jwt';

export interface AdminSession {
    id: string;
    email: string;
    needsPasswordChange: boolean;
}

export async function getAdminSession(req: Request): Promise<AdminSession | null> {
    const token = getTokenFromCookie(req);
    if (!token) return null;
    return verifyJWT(token);
}
