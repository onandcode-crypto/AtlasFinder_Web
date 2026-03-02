import { createServerSideClient } from '@/lib/supabase';

export const revalidate = 0; // Disable static caching so FAQs are always fresh

export default async function SupportPage() {
    const supabase = await createServerSideClient();
    const { data: faqs, error } = await supabase
        .from('faqs')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

    if (error) {
        console.error('Error fetching FAQs:', error);
    }

    return (
        <div className="w-full bg-ivory min-h-screen pb-32">
            {/* Page Header */}
            <section className="pt-32 pb-16 px-6 lg:px-8 max-w-3xl mx-auto text-center">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-charcoal mb-6 tracking-tight">
                    Support
                </h1>
                <div className="h-1 w-20 bg-coral mx-auto mb-8" />
                <p className="text-xl text-charcoal/70 font-medium leading-relaxed">
                    자주 묻는 질문과 서비스 관련 안내
                </p>
            </section>

            {/* Support Content */}
            <section className="px-6 lg:px-8 max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-12 border border-mid-gray/10">
                    <h2 className="text-2xl font-bold text-charcoal mb-8">자주 묻는 질문 (FAQ)</h2>

                    <div className="space-y-6">
                        {faqs && faqs.length > 0 ? (
                            faqs.map((faq, index) => (
                                <div key={faq.id} className={index !== faqs.length - 1 ? "border-b border-mid-gray/10 pb-6" : "pb-2"}>
                                    <h3 className="text-lg font-bold text-charcoal mb-2">Q. {faq.question}</h3>
                                    <p className="text-charcoal/70 leading-relaxed text-[15px] whitespace-pre-wrap">
                                        {faq.answer}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="py-8 text-center text-charcoal/50">
                                등록된 자주 묻는 질문이 없습니다.
                            </div>
                        )}
                    </div>

                    {/* Email Inquiry Section */}
                    <div className="mt-16 pt-12 border-t border-mid-gray/10 text-center">
                        <div className="w-12 h-12 bg-coral/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-charcoal mb-4">원하시는 답변을 찾지 못하셨나요?</h2>
                        <p className="text-charcoal/70 mb-8 font-medium">
                            아래 공식 지원 이메일로 추가적인 질문이나 요청사항을 남겨주시면,<br />
                            담당 서포터즈가 빠르고 친절하게 답변해 드립니다.
                        </p>
                        <div className="inline-block bg-ivory px-6 py-3 rounded-xl border border-mid-gray/10 shadow-sm">
                            <span className="font-bold text-coral px-2 select-all cursor-text text-lg tracking-wide">
                                support@atlasfinder.kr
                            </span>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
