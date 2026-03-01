'use client';

import { Button } from "@/components/ui/Button";

export default function ContactPage() {
    return (
        <div className="w-full bg-ivory min-h-screen pb-32">
            {/* Page Header */}
            <section className="pt-32 pb-16 px-6 lg:px-8 max-w-3xl mx-auto text-center">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-charcoal mb-6 tracking-tight">
                    Contact Us
                </h1>
                <div className="h-1 w-20 bg-coral mx-auto mb-8" />
                <p className="text-xl text-charcoal/70 font-medium leading-relaxed">
                    궁금하신 점이 있거나 제휴 문의가 필요하신가요?<br />
                    아래 양식을 통해 자유롭게 남겨주세요.
                </p>
            </section>

            {/* Contact Content */}
            <section className="px-6 lg:px-8 max-w-5xl mx-auto">
                <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-12 p-8 border border-mid-gray/10 flex flex-col md:flex-row gap-12 lg:gap-20">

                    {/* Left: Contact Info */}
                    <div className="md:w-1/3 flex flex-col space-y-8">
                        <div>
                            <h3 className="text-xl font-bold text-charcoal mb-2">이메일 문의</h3>
                            <p className="text-charcoal/70 font-medium leading-relaxed text-[15px]">
                                제품 관련 질문이나 비즈니스 제안 등 어떤 문의든 환영합니다. 평균 영업일 기준 1~2일 내에 회신드리고 있습니다.
                            </p>
                            <div className="mt-4 p-4 bg-deep-ivory rounded-xl border border-coral/10 inline-block">
                                <p className="font-bold text-coral select-all cursor-text tracking-wide">
                                    contact@atlasfinder.kr
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Contact Form (Mock) */}
                    <div className="md:w-2/3">
                        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('문의가 성공적으로 접수되었습니다. (현재 준비 중인 기능입니다.)'); }}>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-charcoal mb-2">이름 / 회사명 <span className="text-coral">*</span></label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full border-b border-mid-gray/30 py-3 bg-transparent focus:outline-none focus:border-coral transition-colors text-charcoal placeholder-mid-gray/50"
                                        placeholder="홍길동"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-charcoal mb-2">이메일 주소 <span className="text-coral">*</span></label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full border-b border-mid-gray/30 py-3 bg-transparent focus:outline-none focus:border-coral transition-colors text-charcoal placeholder-mid-gray/50"
                                        placeholder="hong@email.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-charcoal mb-2">문의 종류</label>
                                <select className="w-full border-b border-mid-gray/30 py-3 bg-transparent focus:outline-none focus:border-coral transition-colors text-charcoal font-medium">
                                    <option>애플리케이션 이용 문의</option>
                                    <option>촬영 서비스 문의</option>
                                    <option>비즈니스 / 제휴 제안</option>
                                    <option>기타 문의</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-charcoal mb-2">문의 내용 <span className="text-coral">*</span></label>
                                <textarea
                                    required
                                    rows={5}
                                    className="w-full border-b border-mid-gray/30 py-3 bg-transparent focus:outline-none focus:border-coral transition-colors text-charcoal placeholder-mid-gray/50 resize-none leading-relaxed"
                                    placeholder="무엇을 도와드릴까요?"
                                />
                            </div>

                            <div className="pt-4 flex justify-end">
                                <Button type="submit" className="px-10 py-4 text-[15px]">
                                    문의 보내기
                                </Button>
                            </div>
                        </form>
                    </div>

                </div>
            </section>
        </div>
    );
}
