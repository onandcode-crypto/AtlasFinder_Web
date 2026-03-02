import Image from 'next/image';
import Link from 'next/link';

interface LogCardProps {
    log: {
        id: string;
        title: string;
        summary: string;
        thumbnail_url: string | null;
        created_at: string;
        author_id: string;
    };
}

export function LogCard({ log }: LogCardProps) {
    const formattedDate = new Date(log.created_at).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <article className="group flex flex-col bg-white rounded-3xl shadow-sm border border-mid-gray/10 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            {/* Thumbnail */}
            <div className="relative w-full h-56 bg-deep-ivory overflow-hidden">
                {log.thumbnail_url ? (
                    <img
                        src={log.thumbnail_url}
                        alt={log.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-mid-gray group-hover:bg-coral/5 transition-colors duration-500">
                        <svg className="w-12 h-12 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        <span className="text-sm font-medium">No Thumbnail</span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-coral/10 text-coral text-xs font-bold rounded-full">
                        AtlasFinder
                    </span>
                    <time className="text-sm font-medium text-mid-gray">
                        {formattedDate}
                    </time>
                </div>

                <h3 className="text-2xl font-bold text-charcoal mb-3 line-clamp-2 group-hover:text-coral transition-colors">
                    {log.title}
                </h3>

                <p className="text-charcoal/70 text-base leading-relaxed mb-6 line-clamp-3 flex-1">
                    {log.summary}
                </p>

                <div className="mt-auto flex items-center text-coral font-bold text-sm group/btn">
                    자세히 보기
                    <svg className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </div>
            </div>
            {/* The Link overlay to make entire card clickable without breaking semantic html */}
            <Link href={`/atlaslog/${log.id}`} className="absolute inset-0 z-10">
                <span className="sr-only">Read {log.title}</span>
            </Link>
        </article>
    );
}
