import React from 'react';
import Link from 'next/link';
import { createServerSideClient } from '@/lib/supabase';

export const runtime = 'edge';

// DB 데이터 타입 정의
interface SiteAtlasItem {
    id: string;
    name: string;
    url: string;
    description: string;
    icon_url: string;
}

export default async function SiteAtlasPage() {
    const supabase = await createServerSideClient();

    const { data: sites, error } = await supabase
        .from('site_atlas')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

    if (error) {
        console.error('Failed to fetch Site Atlas data:', error);
    }

    return (
        <div className="min-h-screen bg-ivory pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Header */}
                <div className="mb-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-charcoal tracking-tight mb-4">
                        Site Atlas
                    </h1>
                    <p className="text-mid-gray text-lg max-w-2xl mx-auto">
                        AtlasFinder와 관련된 다양한 프로젝트와 서비스들을 한 곳에서 탐험해보세요.
                    </p>
                </div>

                {/* Grid */}
                {sites && sites.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sites.map((site) => (
                            <a
                                key={site.id}
                                href={site.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-white border border-mid-gray/10 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
                            >
                                {/* Icon Placeholder */}
                                <div className="w-16 h-16 bg-coral/10 rounded-2xl flex items-center justify-center text-coral mb-6 group-hover:scale-110 group-hover:bg-coral group-hover:text-white transition-all duration-300">
                                    {site.icon_url ? (
                                        <img src={site.icon_url} alt={site.name} className="w-8 h-8 object-contain" />
                                    ) : (
                                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                        </svg>
                                    )}
                                </div>

                                <h3 className="text-xl font-bold text-charcoal mb-3 group-hover:text-coral transition-colors">
                                    {site.name}
                                </h3>

                                <p className="text-charcoal/60 text-sm leading-relaxed mb-6">
                                    {site.description || 'AtlasFinder 관련 웹사이트입니다.'}
                                </p>

                                <div className="mt-auto px-5 py-2 rounded-full border border-mid-gray/20 text-xs font-bold text-charcoal group-hover:border-coral/50 group-hover:text-coral transition-all">
                                    방문하기
                                </div>
                            </a>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white p-12 rounded-3xl border border-mid-gray/10 text-center shadow-sm">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-deep-ivory text-mid-gray mb-4">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-charcoal mb-2">등록된 사이트가 없습니다.</h3>
                        <p className="text-mid-gray">관리자 페이지에서 관련 사이트를 추가해주세요.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
