import React from 'react';
import { createServerSideClient } from '@/lib/supabase';
import { LogCard } from '@/components/atlaslog/LogCard';

export default async function AtlasLogPage() {
    const supabase = await createServerSideClient();

    // 공개된 로그만 최신순으로 가져오기
    const { data: logs, error } = await supabase
        .from('atlaslogs')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Failed to fetch AtlasLogs:', error);
    }

    return (
        <div className="min-h-screen bg-ivory pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Header */}
                <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-mid-gray/20 pb-8">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-charcoal tracking-tight mb-4">
                            AtlasLog
                        </h1>
                        <p className="text-mid-gray text-lg max-w-2xl">
                            AtlasFinder 팀이 들려주는 프로젝트 개발기, 비하인드 스토리, 그리고 새로운 소식들.
                        </p>
                    </div>
                    {/* Optional Dropdown or Filter could go here */}
                </div>

                {/* Grid */}
                {logs && logs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {logs.map((log) => (
                            <LogCard key={log.id} log={log} />
                        ))}
                    </div>
                ) : (
                    <div className="py-24 text-center bg-white rounded-3xl border border-mid-gray/10 shadow-sm">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-deep-ivory text-mid-gray mb-6">
                            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-charcoal mb-3">아직 작성된 로그가 없습니다.</h3>
                        <p className="text-mid-gray text-lg">첫 번째 이야기가 곧 준비될 예정입니다.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
