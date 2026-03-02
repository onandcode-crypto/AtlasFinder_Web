'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/admin/login');
        } else if (status === 'authenticated' && session?.user && (session.user as any).needsPasswordChange) {
            setIsPasswordModalOpen(true);
        }
    }, [status, session, router]);

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }
        if (newPassword.length < 8) {
            setError('비밀번호는 8자리 이상이어야 합니다.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const res = await fetch('/api/admin/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newPassword }),
            });

            if (!res.ok) {
                throw new Error('비밀번호 변경 실패');
            }

            // 강제 로그아웃 시켜서 새 비밀번호로 다시 로그인 유도
            await signOut({ callbackUrl: '/admin/login' });
        } catch (err) {
            setError('오류가 발생했습니다.');
            setIsLoading(false);
        }
    };

    if (status === 'loading' || status === 'unauthenticated') {
        return <div className="min-h-screen flex items-center justify-center bg-ivory text-charcoal/50">로딩 중...</div>;
    }

    return (
        <div className="min-h-screen bg-ivory flex">
            {/* Main Content Area */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto">
                {/* Mobile Header */}
                <header className="md:hidden bg-white border-b border-mid-gray/10 p-4 flex justify-between items-center">
                    <h2 className="font-bold text-charcoal">관리자 대시보드</h2>
                    <button onClick={() => signOut({ callbackUrl: '/admin/login' })} className="text-sm text-coral">
                        로그아웃
                    </button>
                </header>

                <div className="p-6 md:p-10 max-w-7xl mx-auto mt-16 md:mt-0">
                    {children}
                </div>
            </main>

            {/* Force Password Change Modal */}
            {isPasswordModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/40 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
                        <h3 className="text-2xl font-bold text-charcoal mb-2">비밀번호 설정</h3>
                        <p className="text-charcoal/60 text-sm mb-6">
                            {(session?.user as any)?.needsPasswordChange
                                ? "초기 비밀번호를 사용 중입니다. 안전한 사용을 위해 새 비밀번호로 변경해 주세요."
                                : "새로운 비밀번호를 입력해 주세요."}
                        </p>

                        <form onSubmit={handlePasswordChange} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-charcoal mb-1">새 비밀번호</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-4 py-2 border border-mid-gray/30 rounded-lg focus:outline-none focus:border-coral"
                                    placeholder="8자리 이상"
                                    required
                                    minLength={8}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-charcoal mb-1">비밀번호 확인</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-2 border border-mid-gray/30 rounded-lg focus:outline-none focus:border-coral"
                                    placeholder="다시 입력해주세요"
                                    required
                                    minLength={8}
                                />
                            </div>

                            {error && <p className="text-coral text-sm font-medium">{error}</p>}

                            <div className="flex gap-3 pt-4">
                                {!(session?.user as any)?.needsPasswordChange && (
                                    <Button type="button" variant="secondary" onClick={() => setIsPasswordModalOpen(false)} className="flex-1">
                                        취소
                                    </Button>
                                )}
                                <Button type="submit" className="flex-1" disabled={isLoading}>
                                    {isLoading ? '변경 중...' : '변경 완료'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
