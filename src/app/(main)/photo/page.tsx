'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

// Mock Data
const PORTFOLIO_ITEMS = [
    { id: 1, type: '인물', title: '웨딩 본식 스냅', src: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop' },
    { id: 2, type: '상품', title: '화장품 패키지', src: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop' },
    { id: 3, type: '인물', title: '야외 프로필', src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop' },
    { id: 4, type: '상품', title: '라이프스타일', src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop' },
    { id: 5, type: '인물', title: '스튜디오 스냅', src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop' },
    { id: 6, type: '상품', title: '제품 누끼', src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop' },
];

const CATEGORIES = ['전체', '인물', '상품'];

export default function PhotoPage() {
    const [activeTab, setActiveTab] = useState('전체');
    const [isFormMode, setIsFormMode] = useState<'reserve' | 'check'>('reserve');

    const filteredItems = activeTab === '전체'
        ? PORTFOLIO_ITEMS
        : PORTFOLIO_ITEMS.filter(item => item.type === activeTab);

    return (
        <div className="w-full bg-ivory min-h-screen pb-32">
            {/* Page Header */}
            <section className="pt-32 pb-20 px-6 lg:px-8 max-w-7xl mx-auto text-center">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-charcoal mb-6 tracking-tight">
                    촬영 서비스
                </h1>
                <div className="h-1 w-20 bg-coral mx-auto mb-8" />
                <p className="text-xl sm:text-2xl text-charcoal/70 font-medium">
                    순간을 영원한 기록으로 남깁니다.
                </p>
            </section>

            {/* Portfolio Gallery Section */}
            <section className="px-6 lg:px-8 max-w-7xl mx-auto mb-32">
                {/* Category Tabs */}
                <div className="flex justify-center gap-8 mb-16 border-b border-mid-gray/20 pb-4">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveTab(category)}
                            className={`text-lg font-medium transition-colors relative pb-4 
                ${activeTab === category ? 'text-coral' : 'text-charcoal hover:text-coral'}`}
                        >
                            {category}
                            {activeTab === category && (
                                <span className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-coral rounded-full" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map((item) => (
                        <div
                            key={item.id}
                            className="relative aspect-[4/5] bg-deep-ivory rounded-xl overflow-hidden group cursor-pointer"
                        >
                            <Image
                                src={item.src}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-coral/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-6 text-white text-center">
                                <span className="text-sm tracking-widest uppercase mb-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{item.type}</span>
                                <h3 className="text-2xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">{item.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Reservation & Check Section */}
            <section className="px-6 lg:px-8 max-w-3xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 border border-mid-gray/10 relative overflow-hidden">
                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-coral/5 rounded-bl-[100px] pointer-events-none" />

                    <div className="flex justify-center gap-8 mb-12 border-b border-mid-gray/20 pb-4 relative z-10">
                        <button
                            onClick={() => setIsFormMode('reserve')}
                            className={`text-2xl font-bold transition-colors relative pb-4 
                ${isFormMode === 'reserve' ? 'text-charcoal' : 'text-mid-gray hover:text-charcoal'}`}
                        >
                            예약 신청
                            {isFormMode === 'reserve' && (
                                <span className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-coral rounded-full" />
                            )}
                        </button>
                        <button
                            onClick={() => setIsFormMode('check')}
                            className={`text-2xl font-bold transition-colors relative pb-4 
                ${isFormMode === 'check' ? 'text-charcoal' : 'text-mid-gray hover:text-charcoal'}`}
                        >
                            예약 현황 조회
                            {isFormMode === 'check' && (
                                <span className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-coral rounded-full" />
                            )}
                        </button>
                    </div>

                    <div className="relative z-10">
                        {isFormMode === 'reserve' ? (
                            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); alert('예약이 접수되었습니다.'); }}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-sm font-bold text-charcoal mb-2">이름 *</label>
                                        <input type="text" placeholder="이름을 입력하세요" className="w-full border-b border-mid-gray/30 py-3 bg-transparent focus:outline-none focus:border-coral transition-colors text-charcoal placeholder-mid-gray/50" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-charcoal mb-2">전화번호 *</label>
                                        <input type="tel" placeholder="010-0000-0000" className="w-full border-b border-mid-gray/30 py-3 bg-transparent focus:outline-none focus:border-coral transition-colors text-charcoal placeholder-mid-gray/50" required />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-charcoal mb-2">이메일 *</label>
                                    <input type="email" placeholder="example@email.com" className="w-full border-b border-mid-gray/30 py-3 bg-transparent focus:outline-none focus:border-coral transition-colors text-charcoal placeholder-mid-gray/50" required />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-charcoal mb-2">촬영 유형 *</label>
                                    <select className="w-full border-b border-mid-gray/30 py-3 bg-transparent focus:outline-none focus:border-coral transition-colors text-charcoal appearance-none cursor-pointer" required>
                                        <option value="" disabled selected>선택하세요</option>
                                        <option value="인물웨딩">인물 — 웨딩 본식</option>
                                        <option value="인물스냅">인물 — 일반 스냅</option>
                                        <option value="상품">상품 촬영</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-sm font-bold text-charcoal mb-2">희망 촬영 날짜 *</label>
                                        <input type="date" className="w-full border-b border-mid-gray/30 py-3 bg-transparent focus:outline-none focus:border-coral transition-colors text-charcoal" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-charcoal mb-2">희망 촬영 장소 (선택)</label>
                                        <input type="text" placeholder="장소를 입력하세요" className="w-full border-b border-mid-gray/30 py-3 bg-transparent focus:outline-none focus:border-coral transition-colors text-charcoal placeholder-mid-gray/50" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-charcoal mb-2">요청 사항 (선택)</label>
                                    <textarea rows={3} placeholder="자유롭게 입력해 주세요" className="w-full border-b border-mid-gray/30 py-3 bg-transparent focus:outline-none focus:border-coral transition-colors text-charcoal placeholder-mid-gray/50 resize-none" />
                                </div>

                                <div className="pt-6">
                                    <Button type="submit" className="w-full py-4 text-lg">예약 신청하기</Button>
                                </div>
                            </form>
                        ) : (
                            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); alert('예약 내역을 조회합니다.'); }}>
                                <p className="text-charcoal/70 mb-8 font-medium text-center">예약 시 입력하신 전화번호 또는 이메일을 입력해 주세요.</p>
                                <div>
                                    <label className="block text-sm font-bold text-charcoal mb-2">전화번호 또는 이메일 *</label>
                                    <input type="text" placeholder="예: 010-0000-0000 또는 admin@email.com" className="w-full border-b border-mid-gray/30 py-3 bg-transparent focus:outline-none focus:border-coral transition-colors text-charcoal placeholder-mid-gray/50 text-center text-lg" required />
                                </div>
                                <div className="pt-6">
                                    <Button type="submit" className="w-full py-4 text-lg">예약 조회하기</Button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </section>

        </div>
    );
}
