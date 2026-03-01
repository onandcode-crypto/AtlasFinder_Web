'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would use NextAuth.js signIn()
        window.location.href = '/admin/dashboard';
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-ivory px-4 py-12">
            <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl border border-mid-gray/10">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-charcoal mb-4">AtlasFinder 관리자</h1>
                    <div className="h-1 w-12 bg-coral mx-auto" />
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-charcoal mb-2">이메일</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@atlasfinder.kr"
                            className="w-full border-b border-mid-gray/30 py-3 bg-transparent focus:outline-none focus:border-coral transition-colors text-charcoal placeholder-mid-gray/50"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-charcoal mb-2">비밀번호</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="●●●●●●●●"
                            className="w-full border-b border-mid-gray/30 py-3 bg-transparent focus:outline-none focus:border-coral transition-colors text-charcoal placeholder-mid-gray/50 tracking-widest"
                            required
                        />
                    </div>

                    <div className="pt-6">
                        <Button type="submit" className="w-full py-4 text-lg">
                            로그인
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
