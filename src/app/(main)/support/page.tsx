'use client';

export default function SupportPage() {
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
                        <div className="border-b border-mid-gray/10 pb-6">
                            <h3 className="text-lg font-bold text-charcoal mb-2">Q. 애플리케이션 라이선스와 기기 대수가 어떻게 되나요?</h3>
                            <p className="text-charcoal/70 leading-relaxed text-[15px]">
                                기본 제공되는 라이선스는 1계정 당 1대의 PC 환경에서 인증 및 사용을 권장하고 있습니다. 기업체 대량 구매나 추가 인증 절차 등 도움이 필요하신 경우 Contact 메일로 문의 남겨주시기 바랍니다.
                            </p>
                        </div>
                        <div className="border-b border-mid-gray/10 pb-6">
                            <h3 className="text-lg font-bold text-charcoal mb-2">Q. 촬영 서비스 예약은 최소 며칠 전에 해야 하나요?</h3>
                            <p className="text-charcoal/70 leading-relaxed text-[15px]">
                                원활한 스케줄 및 컨셉 조율을 위해 원하시는 촬영일 기준 최소 2주~한달 전 접수를 권장하고 있습니다. '대기중' 상태에서 담당자가 연락을 드린 후 스케줄이 조율되며, 이후 상태가 확정 처리됩니다.
                            </p>
                        </div>
                        <div className="pb-2">
                            <h3 className="text-lg font-bold text-charcoal mb-2">Q. 결제 후 환불 규정이나 교환 절차는 어떻게 되나요?</h3>
                            <p className="text-charcoal/70 leading-relaxed text-[15px]">
                                디지털 소프트웨어 상품은 설치 또는 다운로드 후에는 취소가 불가합니다. 부득이하게 라이선스 오류나 심각한 프로그램 에러 발생 시에는 상세 내역을 접수해주시면 확인 후 환불 및 재발급 기준에 맞춰 처리해 드립니다.
                            </p>
                        </div>
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
