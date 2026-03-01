'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

const DOMAIN_OPTIONS = [
    { label: 'atlasfinder.kr', value: 'atlasfinder.kr' },
    { label: 'naver.com', value: 'naver.com' },
    { label: 'gmail.com', value: 'gmail.com' },
    { label: 'daum.net', value: 'daum.net' },
    { label: 'kakao.com', value: 'kakao.com' },
    { label: '직접입력', value: 'custom' },
];

export default function LoginPage() {
    const router = useRouter();
    const [emailId, setEmailId] = useState('');
    const [emailDomain, setEmailDomain] = useState('atlasfinder.kr');
    const [customDomain, setCustomDomain] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const finalDomain = emailDomain === 'custom' ? customDomain : emailDomain;

        if (!emailId || !finalDomain) {
            setError('이메일 주소를 올바르게 입력해주세요.');
            setIsLoading(false);
            return;
        }

        const finalEmail = `${emailId}@${finalDomain}`;

        try {
            const res = await signIn('credentials', {
                redirect: false,
                email: finalEmail,
                password,
            });

            if (res?.error) {
                setError(res?.status === 401 ? '이메일 또는 비밀번호가 일치하지 않습니다.' : res.error);
            } else {
                router.push('/admin/dashboard');
                router.refresh();
            }
        } catch (err) {
            setError('로그인 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-ivory px-4 pb-20 mt-10">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-mid-gray/10 w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-charcoal">관리자 로그인</h1>
                    <p className="text-sm text-charcoal/60 mt-2">AtlasFinder 통합 관리 시스템</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-charcoal mb-1">이메일</label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={emailId}
                                onChange={(e) => setEmailId(e.target.value)}
                                className="w-full px-4 py-2 border border-mid-gray/30 rounded-lg focus:outline-none focus:border-coral transition-colors"
                                placeholder="아이디"
                                required
                            />
                            <span className="text-charcoal/60 font-medium">@</span>
                            <select
                                value={emailDomain}
                                onChange={(e) => {
                                    setEmailDomain(e.target.value);
                                    if (e.target.value !== 'custom') setCustomDomain('');
                                }}
                                className="w-full px-2 py-2 border border-mid-gray/30 rounded-lg focus:outline-none focus:border-coral transition-colors bg-white text-charcoal min-w-[135px] appearance-none cursor-pointer"
                                style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23494541%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right .7rem top 50%', backgroundSize: '.65rem auto' }}
                            >
                                {DOMAIN_OPTIONS.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {emailDomain === 'custom' && (
                            <div className="mt-2">
                                <input
                                    type="text"
                                    value={customDomain}
                                    onChange={(e) => setCustomDomain(e.target.value)}
                                    className="w-full px-4 py-2 border border-mid-gray/30 rounded-lg focus:outline-none focus:border-coral transition-colors"
                                    placeholder="도메인명 (예: example.com)"
                                    required
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-charcoal mb-1">비밀번호</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-mid-gray/30 rounded-lg focus:outline-none focus:border-coral transition-colors"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-coral text-sm font-medium text-center">{error}</p>
                    )}

                    <Button type="submit" className="w-full pt-2" disabled={isLoading}>
                        {isLoading ? '로그인 중...' : '로그인'}
                    </Button>
                </form>
            </div>
        </div>
    );
}
