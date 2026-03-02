import { createServerSideClient } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface PageProps {
    params: {
        id: string;
    }
}

export default async function AtlasLogDetailPage({ params }: PageProps) {
    const supabase = await createServerSideClient();

    const { data: log, error } = await supabase
        .from('atlaslogs')
        .select(`
            *,
            admins (
                email
            )
        `)
        .eq('id', params.id)
        .eq('is_published', true)
        .single();

    if (error || !log) {
        notFound();
    }

    const formattedDate = new Date(log.created_at).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <article className="min-h-screen bg-ivory pt-32 pb-24">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">

                {/* Back Button */}
                <Link
                    href="/atlaslog"
                    className="inline-flex items-center text-mid-gray hover:text-coral transition-colors mb-10 font-medium group"
                >
                    <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    목록으로 돌아가기
                </Link>

                {/* Header Section */}
                <header className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-3 py-1 bg-coral/10 text-coral text-sm font-bold rounded-full">
                            AtlasFinder
                        </span>
                        <time className="text-mid-gray font-medium">
                            {formattedDate}
                        </time>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-charcoal leading-tight mb-6">
                        {log.title}
                    </h1>

                    <p className="text-xl text-charcoal/60 leading-relaxed font-medium">
                        {log.summary}
                    </p>
                </header>

                {/* Main Thumbnail (if exists) */}
                {log.thumbnail_url && (
                    <div className="w-full aspect-[21/9] relative rounded-3xl overflow-hidden shadow-sm border border-mid-gray/10 mb-16">
                        <img
                            src={log.thumbnail_url}
                            alt={log.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Content Section */}
                <div
                    className="prose prose-lg prose-p:text-charcoal/80 prose-headings:text-charcoal prose-a:text-coral hover:prose-a:text-coral/80 prose-img:rounded-2xl max-w-none mb-12"
                    dangerouslySetInnerHTML={{ __html: log.content }}
                />

                {/* Footer Section */}
                <footer className="mt-24 pt-8 border-t border-mid-gray/20 flex items-center justify-between">
                    <div>
                        <div className="text-sm font-bold text-charcoal mb-1">작성자</div>
                        <div className="text-mid-gray">{log.admins?.email || 'AtlasFinder Admin'}</div>
                    </div>

                    {/* Share or additional actions can go here */}
                    <button className="w-10 h-10 rounded-full bg-white border border-mid-gray/20 flex items-center justify-center text-charcoal hover:text-coral hover:border-coral transition-colors shadow-sm">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-5.368m0 5.368l5.657 5.657a3 3 0 100-5.368m-5.657 5.368l-5.657 5.657a3 3 0 110-5.368m0 0l5.657-5.657a3 3 0 100-5.368M13.342 9.684A3 3 0 1018.684 8m-5.342 1.684L7.684 4.02m0 0a3 3 0 100 5.368" />
                        </svg>
                    </button>
                </footer>

            </div>
        </article>
    );
}
