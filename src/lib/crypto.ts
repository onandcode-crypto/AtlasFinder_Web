export async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    
    // PBKDF2 알고리즘 사용 (Edge Runtime 내장)
    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        data,
        { name: "PBKDF2" },
        false,
        ["deriveBits", "deriveKey"]
    );
    
    // 고정 솔트 사용 (필요시 DB별 솔트로 변경 가능)
    const salt = encoder.encode("atlasfinder_static_salt"); 
    
    const key = await crypto.subtle.deriveBits(
        { name: "PBKDF2", salt: salt, iterations: 100000, hash: "SHA-256" },
        keyMaterial,
        256
    );
    
    // Buffer 없이 Hex 문자열로 변환
    return Array.from(new Uint8Array(key)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function comparePassword(plain: string, hashed: string): Promise<boolean> {
    const newHash = await hashPassword(plain);
    return newHash === hashed;
}