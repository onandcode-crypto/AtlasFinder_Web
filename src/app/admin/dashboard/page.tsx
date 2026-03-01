'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

type TabType = 'applications' | 'gallery' | 'reservations' | 'accounts';

export default function AdminDashboardPage() {
    const [activeTab, setActiveTab] = useState<TabType>('reservations');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const renderContent = () => {
        switch (activeTab) {
            case 'applications':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-mid-gray/10">
                            <h2 className="text-2xl font-bold text-charcoal">애플리케이션 관리</h2>
                            <Button className="px-5 py-2">＋ 애플리케이션 추가</Button>
                        </div>
                        <div className="bg-white rounded-2xl shadow-sm border border-mid-gray/10 overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-ivory border-b border-mid-gray/20 text-charcoal/70 text-sm">
                                        <th className="p-4 font-bold">애플리케이션 이름</th>
                                        <th className="p-4 font-bold">버전</th>
                                        <th className="p-4 font-bold">상태</th>
                                        <th className="p-4 font-bold">링크</th>
                                        <th className="p-4 font-bold text-right">관리</th>
                                    </tr>
                                </thead>
                                <tbody className="text-charcoal text-sm">
                                    <tr className="border-b border-mid-gray/10 hover:bg-ivory/50 transition-colors">
                                        <td className="p-4 font-bold">PixelPDF</td>
                                        <td className="p-4">v2.0</td>
                                        <td className="p-4"><span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded">공개중</span></td>
                                        <td className="p-4"><a href="#" className="underline hover:text-coral transition-colors">링크보기</a></td>
                                        <td className="p-4 text-right space-x-2">
                                            <button className="text-charcoal hover:text-coral transition-colors font-bold">수정</button>
                                            <button className="text-red-500 hover:text-red-700 transition-colors font-bold">삭제</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            case 'gallery':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-mid-gray/10">
                            <h2 className="text-2xl font-bold text-charcoal">갤러리 관리</h2>
                            <Button className="px-5 py-2">＋ 사진 업로드</Button>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-mid-gray/10 mb-6">
                            <div className="flex gap-4">
                                <span className="font-bold text-charcoal">필터:</span>
                                <button className="text-coral font-bold underline underline-offset-4">전체</button>
                                <button className="text-charcoal hover:text-coral transition-colors font-medium">인물</button>
                                <button className="text-charcoal hover:text-coral transition-colors font-medium">상품</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map(idx => (
                                <div key={idx} className="aspect-square bg-deep-ivory rounded-xl flex items-center justify-center relative group overflow-hidden border border-mid-gray/20">
                                    <span className="text-mid-gray">사진 {idx}</span>
                                    <div className="absolute inset-0 bg-charcoal/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="text-white font-bold underline hover:text-red-400">삭제</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'reservations':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-mid-gray/10">
                            <h2 className="text-2xl font-bold text-charcoal">예약 관리</h2>
                            <div className="flex gap-2 text-sm max-w-xs text-right text-mid-gray">새로운 예약이 접수되면 이메일로 알림이 발송됩니다.</div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-mid-gray/10">
                            <div className="flex gap-4 mb-6">
                                <span className="font-bold text-charcoal">필터:</span>
                                <button className="text-coral font-bold underline underline-offset-4">대기중</button>
                                <button className="text-charcoal hover:text-coral transition-colors font-medium">확정</button>
                                <button className="text-charcoal hover:text-coral transition-colors font-medium">취소</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-ivory border-b border-mid-gray/20 text-charcoal/70 text-sm">
                                            <th className="p-4 font-bold">이름</th>
                                            <th className="p-4 font-bold">연락처</th>
                                            <th className="p-4 font-bold">촬영유형</th>
                                            <th className="p-4 font-bold">희망일자</th>
                                            <th className="p-4 font-bold">상태</th>
                                            <th className="p-4 font-bold text-right">관리</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-charcoal text-sm">
                                        <tr className="border-b border-mid-gray/10 hover:bg-ivory/50 transition-colors">
                                            <td className="p-4 font-bold">홍길동</td>
                                            <td className="p-4">010-0000-0000</td>
                                            <td className="p-4">인물-스냅</td>
                                            <td className="p-4">2026.04.10</td>
                                            <td className="p-4"><span className="text-amber-600 font-bold bg-amber-50 px-2 py-1 rounded">대기중</span></td>
                                            <td className="p-4 text-right">
                                                <button onClick={() => setIsModalOpen(true)} className="text-coral font-bold hover:underline transition-all">상세보기</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );

            case 'accounts':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-mid-gray/10">
                            <h2 className="text-2xl font-bold text-charcoal">계정 관리 <span className="text-sm font-normal text-mid-gray ml-2">(슈퍼 관리자 전용)</span></h2>
                            <Button className="px-5 py-2">＋ 계정 추가</Button>
                        </div>
                        <div className="bg-white rounded-2xl shadow-sm border border-mid-gray/10 overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-ivory border-b border-mid-gray/20 text-charcoal/70 text-sm">
                                        <th className="p-4 font-bold">이메일</th>
                                        <th className="p-4 font-bold">권한</th>
                                        <th className="p-4 font-bold text-right">관리</th>
                                    </tr>
                                </thead>
                                <tbody className="text-charcoal text-sm">
                                    <tr className="border-b border-mid-gray/10 hover:bg-ivory/50 transition-colors">
                                        <td className="p-4 font-bold">admin@atlasfinder.kr</td>
                                        <td className="p-4"><span className="text-purple-600 font-bold bg-purple-50 px-2 py-1 rounded">슈퍼관리자</span></td>
                                        <td className="p-4 text-right text-mid-gray">(본인 삭제 불가)</td>
                                    </tr>
                                    <tr className="border-b border-mid-gray/10 hover:bg-ivory/50 transition-colors">
                                        <td className="p-4 font-bold">staff@atlasfinder.kr</td>
                                        <td className="p-4"><span className="text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded">일반관리자</span></td>
                                        <td className="p-4 text-right">
                                            <button className="text-red-500 font-bold hover:text-red-700 transition-all">삭제</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-ivory flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white border-r border-mid-gray/20 flex-shrink-0 md:min-h-screen">
                <div className="p-6 border-b border-mid-gray/20">
                    <Link href="/" className="text-2xl font-extrabold tracking-tight text-charcoal">
                        AtlasFinder
                    </Link>
                    <div className="text-xs text-mid-gray mt-1">Admin Dashboard</div>
                </div>
                <nav className="p-4 space-y-2">
                    {([
                        { id: 'applications', label: '애플리케이션 관리' },
                        { id: 'gallery', label: '갤러리 관리' },
                        { id: 'reservations', label: '예약 관리' },
                        { id: 'accounts', label: '계정 관리' },
                    ] as const).map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all duration-200 ${activeTab === tab.id
                                    ? 'bg-coral text-white shadow-md'
                                    : 'text-charcoal/70 hover:bg-mid-gray/5 hover:text-charcoal'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Top Header */}
                <header className="bg-white border-b border-mid-gray/20 px-8 py-5 flex justify-between items-center sticky top-0 z-10">
                    <h1 className="text-xl font-bold text-charcoal">
                        {activeTab === 'applications' && '애플리케이션 관리'}
                        {activeTab === 'gallery' && '갤러리 관리'}
                        {activeTab === 'reservations' && '예약 관리'}
                        {activeTab === 'accounts' && '계정 관리'}
                    </h1>
                    <div className="flex items-center gap-6">
                        <span className="text-sm font-medium text-charcoal/70">admin@atlasfinder.kr</span>
                        <Link href="/admin/login" className="text-sm font-bold text-coral hover:underline underline-offset-4">
                            로그아웃
                        </Link>
                    </div>
                </header>

                {/* Content Area */}
                <div className="p-8 pb-32 overflow-y-auto">
                    {renderContent()}
                </div>
            </main>

            {/* Reservation Detail Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b border-mid-gray/10 flex justify-between items-center bg-ivory/50">
                            <h3 className="text-xl font-bold text-charcoal">예약 상세</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-mid-gray hover:text-charcoal transition-colors">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-8 space-y-6 overflow-y-auto">
                            <div className="grid grid-cols-[100px_1fr] gap-4 text-sm">
                                <div className="font-bold text-mid-gray">이름</div>
                                <div className="font-bold text-charcoal">홍길동</div>

                                <div className="font-bold text-mid-gray">연락처</div>
                                <div className="font-medium text-charcoal">010-0000-0000</div>

                                <div className="font-bold text-mid-gray">이메일</div>
                                <div className="font-medium text-charcoal">hong@email.com</div>

                                <div className="font-bold text-mid-gray">촬영유형</div>
                                <div className="font-medium text-charcoal">인물 — 일반 스냅</div>

                                <div className="font-bold text-mid-gray">희망일자</div>
                                <div className="font-medium text-charcoal">2026.04.10</div>

                                <div className="font-bold text-mid-gray">희망장소</div>
                                <div className="font-medium text-charcoal">한강공원</div>

                                <div className="font-bold text-mid-gray">요청사항</div>
                                <div className="font-medium text-charcoal">자연스러운 분위기 원함</div>
                            </div>

                            <div className="pt-6 border-t border-mid-gray/10">
                                <div className="font-bold text-charcoal mb-4">상태 변경:</div>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer font-medium text-charcoal">
                                        <input type="radio" name="status" defaultChecked className="w-4 h-4 text-amber-500 focus:ring-amber-500 border-mid-gray/30" />
                                        대기중
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer font-medium text-charcoal">
                                        <input type="radio" name="status" className="w-4 h-4 text-emerald-500 focus:ring-emerald-500 border-mid-gray/30" />
                                        확정
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer font-medium text-charcoal">
                                        <input type="radio" name="status" className="w-4 h-4 text-red-500 focus:ring-red-500 border-mid-gray/30" />
                                        취소
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-ivory/50 border-t border-mid-gray/10 flex justify-end gap-3 mt-auto">
                            <Button variant="secondary" onClick={() => setIsModalOpen(false)} className="py-2">닫기</Button>
                            <Button onClick={() => setIsModalOpen(false)} className="py-2 px-8">저장</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
