interface JWTPayload {
    id: string;
    email: string;
    needsPasswordChange: boolean;
    exp: number;
}

function toBase64url(data: Uint8Array | ArrayBuffer): string {
    const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
    let str = '';
    for (let i = 0; i < bytes.length; i++) {
        str += String.fromCharCode(bytes[i]);
    }
    return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function fromBase64url(base64url: string): Uint8Array {
    const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
    const str = atob(padded);
    const bytes = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) {
        bytes[i] = str.charCodeAt(i);
    }
    return bytes;
}

async function getKey(): Promise<CryptoKey> {
    const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || 'change-this-secret';
    return crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(secret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign', 'verify']
    );
}

export async function signJWT(
    payload: Omit<JWTPayload, 'exp'>,
    maxAge = 24 * 60 * 60
): Promise<string> {
    const header = { alg: 'HS256', typ: 'JWT' };
    const fullPayload: JWTPayload = {
        ...payload,
        exp: Math.floor(Date.now() / 1000) + maxAge,
    };

    const enc = new TextEncoder();
    const headerB64 = toBase64url(enc.encode(JSON.stringify(header)));
    const payloadB64 = toBase64url(enc.encode(JSON.stringify(fullPayload)));
    const unsigned = `${headerB64}.${payloadB64}`;

    const key = await getKey();
    const sig = await crypto.subtle.sign('HMAC', key, enc.encode(unsigned));

    return `${unsigned}.${toBase64url(sig)}`;
}

export async function verifyJWT(token: string): Promise<JWTPayload | null> {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;

        const [headerB64, payloadB64, sigB64] = parts;
        const unsigned = `${headerB64}.${payloadB64}`;

        const key = await getKey();
        const isValid = await crypto.subtle.verify(
            'HMAC',
            key,
            fromBase64url(sigB64).buffer as ArrayBuffer,
            new TextEncoder().encode(unsigned)
        );

        if (!isValid) return null;

        const payload: JWTPayload = JSON.parse(
            new TextDecoder().decode(fromBase64url(payloadB64))
        );

        if (payload.exp < Math.floor(Date.now() / 1000)) return null;

        return payload;
    } catch {
        return null;
    }
}

export function getTokenFromCookie(req: Request): string | null {
    const cookie = req.headers.get('cookie') || '';
    const match = cookie.match(/(?:^|;\s*)admin-token=([^;]+)/);
    return match ? match[1] : null;
}
