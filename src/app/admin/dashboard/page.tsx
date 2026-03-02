'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import toast, { Toaster } from 'react-hot-toast';
import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(() => import('@/components/ui/RichTextEditor'), {
    ssr: false, // Tiptap needs browser environment
    loading: () => <div className="min-h-[300px] flex justify-center items-center bg-ivory rounded-xl border border-mid-gray/20 text-mid-gray text-sm">에디터 불러오는 중...</div>
});

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type TabType = 'applications' | 'gallery' | 'reservations' | 'accounts' | 'atlaslog' | 'navigation' | 'faqs' | 'site-atlas';

interface AtlasLog {
    id: string;
    title: string;
    summary: string;
    is_published: boolean;
    created_at: string;
}

interface NavigationItem {
    id: string;
    label: string;
    path: string;
    sort_order: number;
    is_active: boolean;
}

interface ApplicationItem {
    id: string;
    name: string;
    version: string;
    price_type: string;
    description: string;
    features: string[];
    os: string;
    image_url: string;
    link_url: string;
    status: 'PUBLISHED' | 'COMING_SOON' | 'PRIVATE';
    created_at?: string;
}

export default function AdminDashboardPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<TabType>('reservations');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // AtlasLog state
    const [atlasLogs, setAtlasLogs] = useState<AtlasLog[]>([]);
    const [isAtlasLogModalOpen, setIsAtlasLogModalOpen] = useState(false);
    const [newLogData, setNewLogData] = useState({ title: '', summary: '', content: '', thumbnail_url: '', is_published: false });

    // Navigation state
    const [navItems, setNavItems] = useState<NavigationItem[]>([]);
    const [isNavModalOpen, setIsNavModalOpen] = useState(false);
    const [newNavData, setNewNavData] = useState<Partial<NavigationItem>>({ label: '', path: '', sort_order: 0, is_active: true });

    // FAQ state
    const [faqs, setFaqs] = useState<any[]>([]);
    const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
    const [newFaqData, setNewFaqData] = useState<any>({ question: '', answer: '', category: '일반', sort_order: 0, is_active: true });

    // Site Atlas state
    const [siteAtlas, setSiteAtlas] = useState<any[]>([]);
    const [isSiteAtlasModalOpen, setIsSiteAtlasModalOpen] = useState(false);
    const [newSiteAtlasData, setNewSiteAtlasData] = useState<any>({ name: '', url: '', description: '', icon_url: '', sort_order: 0, is_active: true });

    // Applications state
    const [apps, setApps] = useState<ApplicationItem[]>([]);
    const [isAppModalOpen, setIsAppModalOpen] = useState(false);
    const [newAppData, setNewAppData] = useState<Partial<ApplicationItem>>({
        name: '', version: '', price_type: '', description: '', features: [],
        os: '', image_url: '', link_url: '', status: 'PUBLISHED'
    });
    const [featuresText, setFeaturesText] = useState(''); // Textarea string for array

    // Fetch AtlasLogs
    const fetchAtlasLogs = async () => {
        try {
            const res = await fetch('/api/admin/atlaslogs');
            if (res.ok) {
                const data = await res.json();
                setAtlasLogs(data);
            }
        } catch (error) {
            console.error('Error fetching logs:', error);
        }
    };

    // Fetch Navigations
    const fetchNavigations = async () => {
        try {
            const res = await fetch('/api/admin/navigation');
            if (res.ok) {
                const data = await res.json();
                setNavItems(data);
            }
        } catch (error) {
            console.error('Error fetching navigations:', error);
        }
    };

    // Fetch FAQs
    const fetchFaqs = async () => {
        try {
            const res = await fetch('/api/admin/faqs');
            if (res.ok) setFaqs(await res.json());
        } catch (error) { console.error(error); }
    };

    // Fetch Site Atlas
    const fetchSiteAtlas = async () => {
        try {
            const res = await fetch('/api/admin/site-atlas');
            if (res.ok) setSiteAtlas(await res.json());
        } catch (error) { console.error(error); }
    };

    // Fetch Applications
    const fetchApplications = async () => {
        try {
            const res = await fetch('/api/admin/applications');
            if (res.ok) setApps(await res.json());
        } catch (error) { console.error(error); }
    };

    // Call fetch on tab change
    useEffect(() => {
        if (activeTab === 'atlaslog') {
            fetchAtlasLogs();
        } else if (activeTab === 'navigation') {
            fetchNavigations();
        } else if (activeTab === 'faqs') {
            fetchFaqs();
        } else if (activeTab === 'site-atlas') {
            fetchSiteAtlas();
        } else if (activeTab === 'applications') {
            fetchApplications();
        }
    }, [activeTab]);

    const handleCreateLog = async () => {
        try {
            const res = await fetch('/api/admin/atlaslogs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newLogData),
            });
            if (res.ok) {
                setIsAtlasLogModalOpen(false);
                setNewLogData({ title: '', summary: '', content: '', thumbnail_url: '', is_published: false });
                fetchAtlasLogs(); // Refresh list
                toast.success('글이 성공적으로 변경되었습니다.');
            } else {
                toast.error('글 작성에 실패했습니다.');
            }
        } catch (err) {
            console.error(err);
            toast.error('에러가 발생했습니다.');
        }
    };

    const handleSaveNav = async () => {
        try {
            const res = await fetch('/api/admin/navigation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newNavData),
            });
            if (res.ok) {
                setIsNavModalOpen(false);
                setNewNavData({ label: '', path: '', sort_order: 0, is_active: true });
                fetchNavigations();
                toast.success('메뉴가 저장되었습니다.');
            } else {
                toast.error('메뉴 저장에 실패했습니다.');
            }
        } catch (err) {
            console.error(err);
            toast.error('에러가 발생했습니다.');
        }
    };

    const handleDeleteNav = async (id: string) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;
        try {
            const res = await fetch(`/api/admin/navigation?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchNavigations();
                toast.success('메뉴가 삭제되었습니다.');
            }
        } catch (err) {
            console.error(err);
            toast.error('삭제 중 에러가 발생했습니다.');
        }
    };

    const handleSaveFaq = async () => {
        try {
            const res = await fetch('/api/admin/faqs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newFaqData),
            });
            if (res.ok) {
                setIsFaqModalOpen(false);
                fetchFaqs();
                toast.success('FAQ가 저장되었습니다.');
            } else toast.error('저장에 실패했습니다.');
        } catch (err) { console.error(err); toast.error('에러가 발생했습니다.'); }
    };

    const handleDeleteFaq = async (id: string) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;
        try {
            const res = await fetch(`/api/admin/faqs?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchFaqs();
                toast.success('FAQ가 삭제되었습니다.');
            }
        } catch (err) { console.error(err); toast.error('삭제 중 에러 발생'); }
    };

    const handleSaveSiteAtlas = async () => {
        try {
            const res = await fetch('/api/admin/site-atlas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newSiteAtlasData),
            });
            if (res.ok) {
                setIsSiteAtlasModalOpen(false);
                fetchSiteAtlas();
                toast.success('Site Atlas가 저장되었습니다.');
            } else toast.error('저장에 실패했습니다.');
        } catch (err) { console.error(err); toast.error('에러가 발생했습니다.'); }
    };

    const handleDeleteSiteAtlas = async (id: string) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;
        try {
            const res = await fetch(`/api/admin/site-atlas?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchSiteAtlas();
                toast.success('Site Atlas가 삭제되었습니다.');
            }
        } catch (err) { console.error(err); toast.error('삭제 중 에러 발생'); }
    };

    const handleSaveApp = async () => {
        try {
            const payload = {
                ...newAppData,
                features: featuresText.split('\n').map((f) => f.trim()).filter((f) => f.length > 0)
            };
            const res = await fetch('/api/admin/applications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (res.ok) {
                setIsAppModalOpen(false);
                fetchApplications();
                toast.success('애플리케이션이 저장되었습니다.');
            } else toast.error('저장에 실패했습니다.');
        } catch (err) { console.error(err); toast.error('에러가 발생했습니다.'); }
    };

    const handleDeleteApp = async (id: string) => {
        if (!confirm('정말 삭제하시겠습니까? 관련 데이터가 모두 삭제됩니다.')) return;
        try {
            const res = await fetch(`/api/admin/applications?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchApplications();
                toast.success('애플리케이션이 삭제되었습니다.');
            }
        } catch (err) { console.error(err); toast.error('삭제 중 에러 발생'); }
    };

    const openAppModal = (app?: ApplicationItem) => {
        if (app) {
            setNewAppData(app);
            setFeaturesText(app.features?.join('\n') || '');
        } else {
            setNewAppData({
                name: '', version: '', price_type: '', description: '', features: [],
                os: '', image_url: '', link_url: '', status: 'PUBLISHED'
            });
            setFeaturesText('');
        }
        setIsAppModalOpen(true);
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/admin/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (res.ok && data.url) {
                setter(data.url);
                toast.success('업로드가 완료되었습니다.');
            } else {
                toast.error('업로드 실패: ' + (data.error || '알 수 없는 오류'));
            }
        } catch (err) {
            console.error(err);
            toast.error('업로드 중 에러가 발생했습니다.');
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'applications':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-mid-gray/10">
                            <h2 className="text-2xl font-bold text-charcoal">애플리케이션 관리</h2>
                            <Button onClick={() => openAppModal()} className="px-5 py-2">＋ 애플리케이션 추가</Button>
                        </div>
                        <div className="bg-white rounded-2xl shadow-sm border border-mid-gray/10 overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-ivory border-b border-mid-gray/20 text-charcoal/70 text-sm">
                                        <th className="p-4 font-bold">애플리케이션 이름</th>
                                        <th className="p-4 font-bold text-center">버전</th>
                                        <th className="p-4 font-bold text-center">상태</th>
                                        <th className="p-4 font-bold text-center">링크</th>
                                        <th className="p-4 font-bold text-right">관리</th>
                                    </tr>
                                </thead>
                                <tbody className="text-charcoal text-sm">
                                    {apps.length > 0 ? apps.map((app, idx) => (
                                        <tr key={idx} className="border-b border-mid-gray/10 hover:bg-ivory/50 transition-colors">
                                            <td className="p-4 font-bold">{app.name}</td>
                                            <td className="p-4 text-center">{app.version}</td>
                                            <td className="p-4 text-center">
                                                {app.status === 'PUBLISHED' ? (
                                                    <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded">공개중/판매중</span>
                                                ) : app.status === 'COMING_SOON' ? (
                                                    <span className="text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded">공개중/준비중</span>
                                                ) : (
                                                    <span className="text-amber-600 font-bold bg-amber-50 px-2 py-1 rounded">비공개</span>
                                                )}
                                            </td>
                                            <td className="p-4 text-center"><a href={app.link_url} target="_blank" rel="noreferrer" className="underline hover:text-coral transition-colors">링크보기</a></td>
                                            <td className="p-4 text-right space-x-2">
                                                <button onClick={() => openAppModal(app)} className="text-charcoal hover:text-coral transition-colors font-bold">수정</button>
                                                <button onClick={() => handleDeleteApp(app.id)} className="text-red-500 hover:text-red-700 transition-colors font-bold">삭제</button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan={5} className="p-8 text-center text-charcoal/60">등록된 애플리케이션이 없습니다.</td></tr>
                                    )}
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
            case 'atlaslog':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-mid-gray/10">
                            <h2 className="text-2xl font-bold text-charcoal">AtlasLog 관리</h2>
                            <Button onClick={() => setIsAtlasLogModalOpen(true)} className="px-5 py-2">＋ 새 글 작성</Button>
                        </div>
                        <div className="bg-white rounded-2xl shadow-sm border border-mid-gray/10 overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-ivory border-b border-mid-gray/20 text-charcoal/70 text-sm">
                                        <th className="p-4 font-bold">제목</th>
                                        <th className="p-4 font-bold">작성일</th>
                                        <th className="p-4 font-bold text-center">상태</th>
                                        <th className="p-4 font-bold text-right">관리</th>
                                    </tr>
                                </thead>
                                <tbody className="text-charcoal text-sm">
                                    {atlasLogs.length > 0 ? atlasLogs.map((log) => (
                                        <tr key={log.id} className="border-b border-mid-gray/10 hover:bg-ivory/50 transition-colors">
                                            <td className="p-4 font-bold">{log.title}</td>
                                            <td className="p-4">{new Date(log.created_at).toLocaleDateString()}</td>
                                            <td className="p-4 text-center">
                                                {log.is_published ? (
                                                    <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded">공개</span>
                                                ) : (
                                                    <span className="text-amber-600 font-bold bg-amber-50 px-2 py-1 rounded">비공개</span>
                                                )}
                                            </td>
                                            <td className="p-4 text-right space-x-2">
                                                <button className="text-red-500 hover:text-red-700 transition-colors font-bold">삭제</button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={4} className="p-8 text-center text-charcoal/60">
                                                작성된 로그가 없습니다.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'navigation':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-mid-gray/10">
                            <h2 className="text-2xl font-bold text-charcoal">네비게이션 메뉴 관리</h2>
                            <Button onClick={() => { setNewNavData({ label: '', path: '', sort_order: navItems.length, is_active: true }); setIsNavModalOpen(true); }} className="px-5 py-2">＋ 메뉴 추가</Button>
                        </div>
                        <div className="bg-white rounded-2xl shadow-sm border border-mid-gray/10 overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-ivory border-b border-mid-gray/20 text-charcoal/70 text-sm">
                                        <th className="p-4 font-bold">순서</th>
                                        <th className="p-4 font-bold">라벨</th>
                                        <th className="p-4 font-bold">경로</th>
                                        <th className="p-4 font-bold text-center">표시 여부</th>
                                        <th className="p-4 font-bold text-right">관리</th>
                                    </tr>
                                </thead>
                                <tbody className="text-charcoal text-sm">
                                    {navItems.length > 0 ? navItems.map((item) => (
                                        <tr key={item.id} className="border-b border-mid-gray/10 hover:bg-ivory/50 transition-colors">
                                            <td className="p-4">{item.sort_order}</td>
                                            <td className="p-4 font-bold">{item.label}</td>
                                            <td className="p-4 text-mid-gray">{item.path}</td>
                                            <td className="p-4 text-center">
                                                {item.is_active ? (
                                                    <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded">표시중</span>
                                                ) : (
                                                    <span className="text-amber-600 font-bold bg-amber-50 px-2 py-1 rounded">숨김</span>
                                                )}
                                            </td>
                                            <td className="p-4 text-right space-x-2">
                                                <button onClick={() => { setNewNavData(item); setIsNavModalOpen(true); }} className="text-charcoal hover:text-coral transition-colors font-bold">수정</button>
                                                <button onClick={() => handleDeleteNav(item.id)} className="text-red-500 hover:text-red-700 transition-colors font-bold">삭제</button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={5} className="p-8 text-center text-charcoal/60">
                                                메뉴가 없습니다.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'faqs':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-mid-gray/10">
                            <h2 className="text-2xl font-bold text-charcoal">자주 묻는 질문(FAQ) 관리</h2>
                            <Button onClick={() => { setNewFaqData({ question: '', answer: '', category: '일반', sort_order: faqs.length, is_active: true }); setIsFaqModalOpen(true); }} className="px-5 py-2">＋ FAQ 추가</Button>
                        </div>
                        <div className="bg-white rounded-2xl shadow-sm border border-mid-gray/10 overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-ivory border-b border-mid-gray/20 text-charcoal/70 text-sm">
                                        <th className="p-4 font-bold">카테고리</th>
                                        <th className="p-4 font-bold max-w-sm">질문</th>
                                        <th className="p-4 font-bold text-center">상태</th>
                                        <th className="p-4 font-bold text-right">관리</th>
                                    </tr>
                                </thead>
                                <tbody className="text-charcoal text-sm">
                                    {faqs.length > 0 ? faqs.map((faq) => (
                                        <tr key={faq.id} className="border-b border-mid-gray/10 hover:bg-ivory/50 transition-colors">
                                            <td className="p-4 font-bold text-coral">{faq.category}</td>
                                            <td className="p-4 font-medium max-w-sm truncate">{faq.question}</td>
                                            <td className="p-4 text-center">
                                                {faq.is_active ? (
                                                    <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded">표시중</span>
                                                ) : (
                                                    <span className="text-amber-600 font-bold bg-amber-50 px-2 py-1 rounded">숨김</span>
                                                )}
                                            </td>
                                            <td className="p-4 text-right space-x-2">
                                                <button onClick={() => { setNewFaqData(faq); setIsFaqModalOpen(true); }} className="text-charcoal hover:text-coral transition-colors font-bold">수정</button>
                                                <button onClick={() => handleDeleteFaq(faq.id)} className="text-red-500 hover:text-red-700 transition-colors font-bold">삭제</button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan={4} className="p-8 text-center text-charcoal/60">등록된 FAQ가 없습니다.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'site-atlas':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-mid-gray/10">
                            <h2 className="text-2xl font-bold text-charcoal">Site Atlas 관리</h2>
                            <Button onClick={() => { setNewSiteAtlasData({ name: '', url: '', description: '', icon_url: '', sort_order: siteAtlas.length, is_active: true }); setIsSiteAtlasModalOpen(true); }} className="px-5 py-2">＋ 사이트 추가</Button>
                        </div>
                        <div className="bg-white rounded-2xl shadow-sm border border-mid-gray/10 overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-ivory border-b border-mid-gray/20 text-charcoal/70 text-sm">
                                        <th className="p-4 font-bold">이름</th>
                                        <th className="p-4 font-bold">URL</th>
                                        <th className="p-4 font-bold text-center">상태</th>
                                        <th className="p-4 font-bold text-right">관리</th>
                                    </tr>
                                </thead>
                                <tbody className="text-charcoal text-sm">
                                    {siteAtlas.length > 0 ? siteAtlas.map((item) => (
                                        <tr key={item.id} className="border-b border-mid-gray/10 hover:bg-ivory/50 transition-colors">
                                            <td className="p-4 font-bold">{item.name}</td>
                                            <td className="p-4"><a href={item.url} target="_blank" rel="noreferrer" className="text-coral hover:underline">{item.url}</a></td>
                                            <td className="p-4 text-center">
                                                {item.is_active ? (
                                                    <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded">표시중</span>
                                                ) : (
                                                    <span className="text-amber-600 font-bold bg-amber-50 px-2 py-1 rounded">숨김</span>
                                                )}
                                            </td>
                                            <td className="p-4 text-right space-x-2">
                                                <button onClick={() => { setNewSiteAtlasData(item); setIsSiteAtlasModalOpen(true); }} className="text-charcoal hover:text-coral transition-colors font-bold">수정</button>
                                                <button onClick={() => handleDeleteSiteAtlas(item.id)} className="text-red-500 hover:text-red-700 transition-colors font-bold">삭제</button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan={4} className="p-8 text-center text-charcoal/60">등록된 사이트가 없습니다.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-ivory flex flex-col md:flex-row">
            <Toaster position="bottom-right" />
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
                        { id: 'reservations', label: '예약 관리' },
                        { id: 'applications', label: '애플리케이션 관리' },
                        { id: 'gallery', label: '갤러리 관리' },
                        { id: 'atlaslog', label: 'AtlasLog 관리' },
                        { id: 'faqs', label: 'FAQ 관리' },
                        { id: 'site-atlas', label: 'Site Atlas 관리' },
                        { id: 'navigation', label: '메뉴 설정' },
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
                <div className="p-4 mt-auto border-t border-mid-gray/20">
                    <Link
                        href="/"
                        className="flex items-center gap-2 w-full text-left px-4 py-3 rounded-xl font-bold text-charcoal/70 hover:bg-mid-gray/5 hover:text-charcoal transition-all duration-200"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        메인 페이지로
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Top Header */}
                <header className="bg-white border-b border-mid-gray/20 px-8 py-5 flex justify-between items-center sticky top-0 z-10">
                    <h1 className="text-xl font-bold text-charcoal">
                        {activeTab === 'reservations' && '예약 관리'}
                        {activeTab === 'applications' && '애플리케이션 관리'}
                        {activeTab === 'gallery' && '갤러리 관리'}
                        {activeTab === 'atlaslog' && 'AtlasLog 관리'}
                        {activeTab === 'faqs' && '자주 묻는 질문(FAQ) 관리'}
                        {activeTab === 'site-atlas' && 'Site Atlas 관리'}
                        {activeTab === 'navigation' && '네비게이션 메뉴 관리'}
                        {activeTab === 'accounts' && '계정 관리'}
                    </h1>
                    <div className="flex items-center gap-6">
                        <span className="text-sm font-medium text-charcoal/70">
                            {session?.user?.email || '로딩 중...'}
                        </span>
                        <button onClick={() => signOut({ callbackUrl: '/admin/login' })} className="text-sm font-bold text-coral hover:underline underline-offset-4">
                            로그아웃
                        </button>
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

            {/* AtlasLog Create Modal */}
            {isAtlasLogModalOpen && (
                <div className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b border-mid-gray/10 flex justify-between items-center bg-ivory/50">
                            <h3 className="text-xl font-bold text-charcoal">AtlasLog 새 글 작성</h3>
                            <button onClick={() => setIsAtlasLogModalOpen(false)} className="text-mid-gray hover:text-charcoal transition-colors">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-8 space-y-6 overflow-y-auto">
                            <div>
                                <label className="block text-sm font-bold text-charcoal mb-2">제목</label>
                                <input
                                    type="text"
                                    value={newLogData.title}
                                    onChange={(e) => setNewLogData({ ...newLogData, title: e.target.value })}
                                    className="w-full p-3 bg-ivory border border-mid-gray/20 rounded-xl focus:border-coral focus:ring-1 focus:ring-coral transition-colors"
                                    placeholder="글 제목을 입력하세요"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-charcoal mb-2">미리보기 문구 (요약)</label>
                                <textarea
                                    value={newLogData.summary}
                                    onChange={(e) => setNewLogData({ ...newLogData, summary: e.target.value })}
                                    className="w-full p-3 bg-ivory border border-mid-gray/20 rounded-xl focus:border-coral focus:ring-1 focus:ring-coral transition-colors resize-none h-24"
                                    placeholder="목록에서 보일 요약 내용을 입력하세요"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-charcoal mb-2">본문 내용</label>
                                <RichTextEditor
                                    value={newLogData.content}
                                    onChange={(html) => setNewLogData({ ...newLogData, content: html })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-charcoal mb-2">썸네일 이미지/URL (선택)</label>
                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-4 items-center">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileUpload(e, (url) => setNewLogData({ ...newLogData, thumbnail_url: url }))}
                                            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-coral/10 file:text-coral hover:file:bg-coral/20 cursor-pointer flex-shrink-0 border border-mid-gray/20 rounded-xl p-1 w-full max-w-[280px]"
                                        />
                                        <span className="text-sm text-mid-gray">또는</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={newLogData.thumbnail_url}
                                        onChange={(e) => setNewLogData({ ...newLogData, thumbnail_url: e.target.value })}
                                        className="w-full p-3 bg-ivory border border-mid-gray/20 rounded-xl focus:border-coral focus:ring-1 focus:ring-coral transition-colors"
                                        placeholder="직접 URL 입력 (https://example.com/image.jpg)"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <label className="text-sm font-bold text-charcoal">공개 상태</label>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={newLogData.is_published}
                                        onChange={(e) => setNewLogData({ ...newLogData, is_published: e.target.checked })}
                                    />
                                    <div className="w-11 h-6 bg-mid-gray/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-mid-gray/30 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral"></div>
                                    <span className="ml-3 text-sm font-medium text-charcoal">{newLogData.is_published ? '공개됨' : '비공개'}</span>
                                </label>
                            </div>
                        </div>

                        <div className="p-6 bg-ivory/50 border-t border-mid-gray/10 flex justify-end gap-3 mt-auto">
                            <Button variant="secondary" onClick={() => setIsAtlasLogModalOpen(false)} className="py-2">취소</Button>
                            <Button onClick={handleCreateLog} className="py-2 px-8">작성 완료</Button>
                        </div>
                    </div>
                </div>
            )}
            {/* Navigation Edit Modal */}
            {isNavModalOpen && (
                <div className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b border-mid-gray/10 flex justify-between items-center bg-ivory/50">
                            <h3 className="text-xl font-bold text-charcoal">{newNavData.id ? '메뉴 수정' : '메뉴 추가'}</h3>
                            <button onClick={() => setIsNavModalOpen(false)} className="text-mid-gray hover:text-charcoal transition-colors">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-8 space-y-6 overflow-y-auto">
                            <div>
                                <label className="block text-sm font-bold text-charcoal mb-2">메뉴 이름 (Label)</label>
                                <input
                                    type="text"
                                    value={newNavData.label}
                                    onChange={(e) => setNewNavData({ ...newNavData, label: e.target.value })}
                                    className="w-full p-3 bg-ivory border border-mid-gray/20 rounded-xl focus:border-coral focus:ring-1 focus:ring-coral transition-colors"
                                    placeholder="예: About"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-charcoal mb-2">경로 (Path)</label>
                                <input
                                    type="text"
                                    value={newNavData.path}
                                    onChange={(e) => setNewNavData({ ...newNavData, path: e.target.value })}
                                    className="w-full p-3 bg-ivory border border-mid-gray/20 rounded-xl focus:border-coral focus:ring-1 focus:ring-coral transition-colors"
                                    placeholder="예: /about"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-charcoal mb-2">표시 순서 (숫자가 작을수록 먼저 표시)</label>
                                <input
                                    type="number"
                                    value={newNavData.sort_order}
                                    onChange={(e) => setNewNavData({ ...newNavData, sort_order: parseInt(e.target.value) || 0 })}
                                    className="w-full p-3 bg-ivory border border-mid-gray/20 rounded-xl focus:border-coral focus:ring-1 focus:ring-coral transition-colors"
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                <label className="text-sm font-bold text-charcoal">표시 상태</label>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={newNavData.is_active}
                                        onChange={(e) => setNewNavData({ ...newNavData, is_active: e.target.checked })}
                                    />
                                    <div className="w-11 h-6 bg-mid-gray/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-mid-gray/30 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral"></div>
                                    <span className="ml-3 text-sm font-medium text-charcoal">{newNavData.is_active ? '메뉴에 표시함' : '숨김'}</span>
                                </label>
                            </div>
                        </div>

                        <div className="p-6 bg-ivory/50 border-t border-mid-gray/10 flex justify-end gap-3 mt-auto">
                            <Button variant="secondary" onClick={() => setIsNavModalOpen(false)} className="py-2">취소</Button>
                            <Button onClick={handleSaveNav} className="py-2 px-8">저장</Button>
                        </div>
                    </div>
                </div>
            )}

            {/* FAQ Modal */}
            {isFaqModalOpen && (
                <div className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b border-mid-gray/10 flex justify-between items-center bg-ivory/50">
                            <h3 className="text-xl font-bold text-charcoal">{newFaqData.id ? 'FAQ 수정' : 'FAQ 추가'}</h3>
                            <button onClick={() => setIsFaqModalOpen(false)} className="text-mid-gray hover:text-charcoal transition-colors">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-8 space-y-6 overflow-y-auto">
                            <div>
                                <label className="block text-sm font-bold text-charcoal mb-2">카테고리</label>
                                <input
                                    type="text"
                                    value={newFaqData.category}
                                    onChange={(e) => setNewFaqData({ ...newFaqData, category: e.target.value })}
                                    className="w-full p-3 bg-ivory border border-mid-gray/20 rounded-xl focus:border-coral focus:ring-1 focus:ring-coral transition-colors"
                                    placeholder="예: 요금안내"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-charcoal mb-2">질문 (Question)</label>
                                <input
                                    type="text"
                                    value={newFaqData.question}
                                    onChange={(e) => setNewFaqData({ ...newFaqData, question: e.target.value })}
                                    className="w-full p-3 bg-ivory border border-mid-gray/20 rounded-xl focus:border-coral focus:ring-1 focus:ring-coral transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-charcoal mb-2">답변 (Answer)</label>
                                <textarea
                                    value={newFaqData.answer}
                                    onChange={(e) => setNewFaqData({ ...newFaqData, answer: e.target.value })}
                                    className="w-full p-3 bg-ivory border border-mid-gray/20 rounded-xl focus:border-coral focus:ring-1 focus:ring-coral transition-colors resize-none h-32"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-charcoal mb-2">표시 순서</label>
                                <input
                                    type="number"
                                    value={newFaqData.sort_order}
                                    onChange={(e) => setNewFaqData({ ...newFaqData, sort_order: parseInt(e.target.value) || 0 })}
                                    className="w-full p-3 bg-ivory border border-mid-gray/20 rounded-xl focus:border-coral focus:ring-1 focus:ring-coral transition-colors"
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                <label className="text-sm font-bold text-charcoal">표시 상태</label>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={newFaqData.is_active}
                                        onChange={(e) => setNewFaqData({ ...newFaqData, is_active: e.target.checked })}
                                    />
                                    <div className="w-11 h-6 bg-mid-gray/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-mid-gray/30 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral"></div>
                                    <span className="ml-3 text-sm font-medium text-charcoal">{newFaqData.is_active ? '목록에 표시함' : '숨김'}</span>
                                </label>
                            </div>
                        </div>

                        <div className="p-6 bg-ivory/50 border-t border-mid-gray/10 flex justify-end gap-3 mt-auto">
                            <Button variant="secondary" onClick={() => setIsFaqModalOpen(false)} className="py-2">취소</Button>
                            <Button onClick={handleSaveFaq} className="py-2 px-8">저장</Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Site Atlas Modal */}
            {isSiteAtlasModalOpen && (
                <div className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b border-mid-gray/10 flex justify-between items-center bg-ivory/50">
                            <h3 className="text-xl font-bold text-charcoal">{newSiteAtlasData.id ? 'Site Atlas 수정' : 'Site Atlas 추가'}</h3>
                            <button onClick={() => setIsSiteAtlasModalOpen(false)} className="text-mid-gray hover:text-charcoal transition-colors">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-8 space-y-6 overflow-y-auto">
                            <div>
                                <label className="block text-sm font-bold text-charcoal mb-2">사이트 이름</label>
                                <input
                                    type="text"
                                    value={newSiteAtlasData.name}
                                    onChange={(e) => setNewSiteAtlasData({ ...newSiteAtlasData, name: e.target.value })}
                                    className="w-full p-3 bg-ivory border border-mid-gray/20 rounded-xl focus:border-coral focus:ring-1 focus:ring-coral transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-charcoal mb-2">URL 경로</label>
                                <input
                                    type="url"
                                    value={newSiteAtlasData.url}
                                    onChange={(e) => setNewSiteAtlasData({ ...newSiteAtlasData, url: e.target.value })}
                                    className="w-full p-3 bg-ivory border border-mid-gray/20 rounded-xl focus:border-coral focus:ring-1 focus:ring-coral transition-colors"
                                    placeholder="https://example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-charcoal mb-2">설명</label>
                                <textarea
                                    value={newSiteAtlasData.description}
                                    onChange={(e) => setNewSiteAtlasData({ ...newSiteAtlasData, description: e.target.value })}
                                    className="w-full p-3 bg-ivory border border-mid-gray/20 rounded-xl focus:border-coral focus:ring-1 focus:ring-coral transition-colors resize-none h-24"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-charcoal mb-2">아이콘 이미지/URL (선택)</label>
                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-4 items-center">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileUpload(e, (url) => setNewSiteAtlasData({ ...newSiteAtlasData, icon_url: url }))}
                                            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-coral/10 file:text-coral hover:file:bg-coral/20 cursor-pointer flex-shrink-0 border border-mid-gray/20 rounded-xl p-1 w-full max-w-[280px]"
                                        />
                                        <span className="text-sm text-mid-gray">또는</span>
                                    </div>
                                    <input
                                        type="url"
                                        value={newSiteAtlasData.icon_url || ''}
                                        onChange={(e) => setNewSiteAtlasData({ ...newSiteAtlasData, icon_url: e.target.value })}
                                        className="w-full p-3 bg-ivory border border-mid-gray/20 rounded-xl focus:border-coral focus:ring-1 focus:ring-coral transition-colors"
                                        placeholder="직접 URL 입력"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-charcoal mb-2">표시 순서</label>
                                <input
                                    type="number"
                                    value={newSiteAtlasData.sort_order}
                                    onChange={(e) => setNewSiteAtlasData({ ...newSiteAtlasData, sort_order: parseInt(e.target.value) || 0 })}
                                    className="w-full p-3 bg-ivory border border-mid-gray/20 rounded-xl focus:border-coral focus:ring-1 focus:ring-coral transition-colors"
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                <label className="text-sm font-bold text-charcoal">표시 상태</label>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={newSiteAtlasData.is_active}
                                        onChange={(e) => setNewSiteAtlasData({ ...newSiteAtlasData, is_active: e.target.checked })}
                                    />
                                    <div className="w-11 h-6 bg-mid-gray/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-mid-gray/30 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral"></div>
                                    <span className="ml-3 text-sm font-medium text-charcoal">{newSiteAtlasData.is_active ? '목록에 표시함' : '숨김'}</span>
                                </label>
                            </div>
                        </div>

                        <div className="p-6 bg-ivory/50 border-t border-mid-gray/10 flex justify-end gap-3 mt-auto">
                            <Button variant="secondary" onClick={() => setIsSiteAtlasModalOpen(false)} className="py-2">취소</Button>
                            <Button onClick={handleSaveSiteAtlas} className="py-2 px-8">저장</Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Application Modal */}
            {isAppModalOpen && (
                <div className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b border-mid-gray/10 flex justify-between items-center bg-ivory/50">
                            <h3 className="text-xl font-bold text-charcoal">{newAppData.id ? '애플리케이션 수정' : '애플리케이션 추가'}</h3>
                            <button onClick={() => setIsAppModalOpen(false)} className="text-mid-gray hover:text-charcoal transition-colors">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-8 space-y-6 overflow-y-auto">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-charcoal mb-2">앱 이름</label>
                                    <input
                                        type="text"
                                        value={newAppData.name}
                                        onChange={(e) => setNewAppData({ ...newAppData, name: e.target.value })}
                                        className="w-full p-3 bg-ivory border border-mid-gray/20 rounded-xl focus:border-coral focus:ring-1 focus:ring-coral transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-charcoal mb-2">버전</label>
                                    <input
                                        type="text"
                                        value={newAppData.version}
                                        onChange={(e) => setNewAppData({ ...newAppData, version: e.target.value })}
                                        className="w-full p-3 bg-ivory border border-mid-gray/20 rounded-xl focus:border-coral focus:ring-1 focus:ring-coral transition-colors"
                                        placeholder="예: v1.0.0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-charcoal mb-2">가격/형태</label>
                                    <input
                                        type="text"
                                        value={newAppData.price_type}
                                        onChange={(e) => setNewAppData({ ...newAppData, price_type: e.target.value })}
                                        className="w-full p-3 bg-ivory border border-mid-gray/20 rounded-xl focus:border-coral focus:ring-1 focus:ring-coral transition-colors"
                                        placeholder="예: 무료, ₩50,000"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-charcoal mb-2">운영체제(OS)</label>
                                    <input
                                        type="text"
                                        value={newAppData.os}
                                        onChange={(e) => setNewAppData({ ...newAppData, os: e.target.value })}
                                        className="w-full p-3 bg-ivory border border-mid-gray/20 rounded-xl focus:border-coral focus:ring-1 focus:ring-coral transition-colors"
                                        placeholder="예: Windows 10 / 11"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-charcoal mb-2">짧은 설명</label>
                                <textarea
                                    value={newAppData.description}
                                    onChange={(e) => setNewAppData({ ...newAppData, description: e.target.value })}
                                    className="w-full p-3 bg-ivory border border-mid-gray/20 rounded-xl focus:border-coral focus:ring-1 focus:ring-coral transition-colors resize-none h-24"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-charcoal mb-2">주요 기능 (엔터로 구분)</label>
                                <textarea
                                    value={featuresText}
                                    onChange={(e) => setFeaturesText(e.target.value)}
                                    className="w-full p-3 bg-ivory border border-mid-gray/20 rounded-xl focus:border-coral focus:ring-1 focus:ring-coral transition-colors resize-none h-32"
                                    placeholder="기능 1&#10;기능 2&#10;기능 3"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 gap-y-6">
                                <div className="col-span-2">
                                    <label className="block text-sm font-bold text-charcoal mb-2">이미지/아이콘</label>
                                    <div className="flex flex-col gap-2 bg-ivory p-4 rounded-xl border border-mid-gray/10">
                                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                                            <div className="flex-shrink-0">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileUpload(e, (url) => setNewAppData({ ...newAppData, image_url: url }))}
                                                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-coral/10 file:text-coral hover:file:bg-coral/20 cursor-pointer border border-mid-gray/20 rounded-xl p-1 text-sm bg-white"
                                                />
                                            </div>
                                            <span className="text-sm font-medium text-mid-gray flex-shrink-0">또는 URL 직접 입력:</span>
                                            <input
                                                type="url"
                                                value={newAppData.image_url}
                                                onChange={(e) => setNewAppData({ ...newAppData, image_url: e.target.value })}
                                                className="w-full p-2 bg-white border border-mid-gray/20 rounded-xl focus:border-coral focus:ring-1 focus:ring-coral transition-colors text-sm"
                                                placeholder="https:// 업로드 시 자동 입력..."
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-bold text-charcoal mb-2">다운로드/이동 라우트 URL</label>
                                    <input
                                        type="url"
                                        value={newAppData.link_url}
                                        onChange={(e) => setNewAppData({ ...newAppData, link_url: e.target.value })}
                                        className="w-full p-3 bg-ivory border border-mid-gray/20 rounded-xl focus:border-coral focus:ring-1 focus:ring-coral transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-charcoal mb-2">앱 상태 설정</label>
                                <select
                                    value={newAppData.status}
                                    onChange={(e) => setNewAppData({ ...newAppData, status: e.target.value as any })}
                                    className="w-full p-3 bg-ivory border border-mid-gray/20 rounded-xl focus:border-coral focus:ring-1 focus:ring-coral transition-colors font-medium text-charcoal"
                                >
                                    <option value="PUBLISHED">공개중/판매중 (다운로드 가능)</option>
                                    <option value="COMING_SOON">공개중/준비중 (상세 노출되나 다운 불가)</option>
                                    <option value="PRIVATE">비공개 (목록에서 아예 숨김)</option>
                                </select>
                            </div>

                        </div>

                        <div className="p-6 bg-ivory/50 border-t border-mid-gray/10 flex justify-end gap-3 mt-auto">
                            <Button variant="secondary" onClick={() => setIsAppModalOpen(false)} className="py-2">취소</Button>
                            <Button onClick={handleSaveApp} className="py-2 px-8">저장</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
