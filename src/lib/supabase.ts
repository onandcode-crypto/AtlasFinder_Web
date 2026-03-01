import { createBrowserClient, createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// 클라이언트 컴포넌트용 Supabase
export function createClientClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
}

// 서버 컴포넌트/액션용 Supabase (Edge 호환)
export async function createServerSideClient() {
    const cookieStore = await cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) => {
                            cookieStore.set(name, value, options);
                        });
                    } catch (error) {
                        // Server Action / Route Handler에서 호출 시 쿠키 설정 우회 방어
                    }
                },
            },
        }
    );
}

// 서비스 역할(Server Admin)용 Supabase (예약 및 관리자 중요 액션 전용)
export function createServiceClient() {
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            cookies: {
                getAll() { return []; },
                setAll() { },
            },
        }
    );
}
