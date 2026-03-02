import Image from "next/image";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="flex flex-col w-full -mt-20">
      {/* HERO Section */}
      <section className="relative min-h-screen flex items-center bg-ivory pt-20 overflow-hidden">
        {/* Abstract Background Element for 'wow' factor */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-deep-ivory rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 lg:px-8 w-full z-10 flex flex-col items-center justify-center text-center pt-12 lg:pt-0">
          <h1 className="text-6xl sm:text-7xl lg:text-[80px] font-extrabold leading-[1.1] text-charcoal tracking-tight mb-8">
            ATLASFINDER
          </h1>
          <p className="text-2xl sm:text-3xl font-medium text-charcoal mb-4">
            나다운 내일을 찾아가는 항해 지도
          </p>
          <p className="text-base sm:text-lg text-charcoal/80 mb-10 leading-relaxed max-w-xl font-medium">
            흩어진 생각과 가능성을 모아 우리 삶의 방향을 하나씩 짚어봅니다.<br />
            어디로 가야 할지 막막할 때, 우리의 항해를 돕는 공간입니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            <Button href="/applications" className="w-full sm:w-56 text-lg px-8 py-4">
              애플리케이션 보기
            </Button>
            <Button variant="secondary" href="/photo" className="w-full sm:w-56 text-lg px-8 py-4">
              촬영 알아보기(준비중)
            </Button>
          </div>
        </div>
      </section>

      {/* SERVICE CARDS Section */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-charcoal mb-16 text-center tracking-tight">
            우리의 서비스
          </h2>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* App Card */}
            <div className="group relative bg-deep-ivory rounded-2xl p-8 sm:p-12 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                  <svg className="w-8 h-8 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-charcoal mb-4">애플리케이션 개발</h3>
                <p className="text-[15px] sm:text-base text-charcoal/70 mb-8 leading-relaxed font-medium">
                  회사에서 일하는 여러분이 복잡한 고민 대신 본질적인 일에 집중하도록 돕는,<br className="hidden sm:block" />
                  강력하고도 직관적인 방향 탐색 도구를 만듭니다.<br className="hidden sm:block" /><br className="hidden sm:block" />

                  AtlasFinder는 각자의 일과 삶에서 길을 잃지 않도록<br className="hidden sm:block" />
                  다음 선택을 더 명확하게 보여주는 실무자의 개인 나침반입니다.
                </p>
                <Button href="/applications" variant="secondary" className="group-hover:bg-charcoal group-hover:text-white transition-colors">
                  자세히 보기 &rarr;
                </Button>
              </div>
            </div>

            {/* Photo Card */}
            <div className="group relative bg-deep-ivory rounded-2xl p-8 sm:p-12 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                  <svg className="w-8 h-8 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-charcoal mb-4">촬영 서비스(준비중)</h3>
                <p className="text-[15px] sm:text-base text-charcoal/70 mb-8 leading-relaxed font-medium">
                  AtlasFinder의 촬영 서비스는 사람과 제품, 공간을 두루 담으며<br className="hidden sm:block" />
                  당신이 어떤 길을 걷고 있는지 자연스럽게 담아냅니다.<br className="hidden sm:block" /><br className="hidden sm:block" />

                  브랜딩 사진부터 제품 촬영, 작업 현장까지<br className="hidden sm:block" />
                  일과 삶의 방향이 스며 있는 장면을<br className="hidden sm:block" />
                  차분한 리듬으로 깊이 있게 기록해 드립니다.
                </p>
                <Button href="/photo" variant="secondary" className="group-hover:bg-charcoal group-hover:text-white transition-colors">
                  자세히 보기 &rarr;
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT Section */}
      <section id="about" className="py-24 sm:py-32 bg-ivory relative border-t border-mid-gray/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative h-[400px] sm:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1 group">
              <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-transparent transition-colors duration-700 z-10" />
              <Image
                src="/images/abotus.png"
                alt="Brand Story"
                fill
                unoptimized
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            </div>

            <div className="flex flex-col items-start order-1 lg:order-2">
              <span className="text-coral font-bold tracking-wider uppercase mb-4 text-sm">About Us</span>
              <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-charcoal mb-8 leading-[1.2] tracking-tight">
                AtlasFinder 소개
              </h2>
              <div className="h-1 w-20 bg-coral mb-8" />

              <p className="text-[17px] text-charcoal/80 mb-12 leading-loose font-medium">
                AtlasFinder는 흩어진 생각과 가능성을 모아 우리 삶의 방향을 하나씩 짚어보는 항해 지도입니다.
                <br /><br />
                어디로 가야 할지 막막할 때, AtlasFinder는 우리의 경험과 선택들을 정리해 오늘보다 더 나다운 내일을 찾아가도록 돕는 공간입니다.
              </p>

              <div className="grid sm:grid-cols-2 gap-8 w-full">
                <div>
                  <h4 className="text-xl font-bold text-charcoal mb-3">경험의 기록</h4>
                  <p className="text-charcoal/70 leading-relaxed text-[15px]">지나온 시간과 선택들을 빠짐없이 모아 우리만의 지도를 그립니다.</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-charcoal mb-3">생각의 정리</h4>
                  <p className="text-charcoal/70 leading-relaxed text-[15px]">복잡하게 얽힌 고민들을 풀어내어 온전한 우리의 모습을 발견합니다.</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-charcoal mb-3">방향의 탐색</h4>
                  <p className="text-charcoal/70 leading-relaxed text-[15px]">어디로 가야 할지 막막한 순간, 앞으로 나아갈 길을 비춰줍니다.</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-charcoal mb-3">내일의 성장</h4>
                  <p className="text-charcoal/70 leading-relaxed text-[15px]">정리된 과거를 나침반 삼아 더 나다운 내일을 향해 항해합니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
