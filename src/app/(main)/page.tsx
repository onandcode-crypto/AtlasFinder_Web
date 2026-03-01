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
            효율을 만들고, 순간을 기록합니다.
          </p>
          <p className="text-base sm:text-lg text-charcoal/80 mb-10 leading-relaxed max-w-xl font-medium">
            업무의 흐름을 돕는 애플리케이션부터 당신의 가장 빛나는 순간을 담는 포트폴리오까지,
            최고의 퀄리티로 제공합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            <Button href="/applications" className="w-full sm:w-56 text-lg px-8 py-4">
              애플리케이션 보기
            </Button>
            <Button variant="secondary" href="/photo" className="w-full sm:w-56 text-lg px-8 py-4">
              촬영 알아보기
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
              <div className="absolute top-0 right-0 w-32 h-32 bg-coral/5 rounded-bl-[100px] group-hover:bg-coral/10 transition-colors duration-300" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                  <svg className="w-8 h-8 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-charcoal mb-4">애플리케이션 개발</h3>
                <p className="text-charcoal/70 mb-8 max-w-sm line-clamp-2 title-font leading-relaxed">
                  모든 실무자의 업무 효율을 비약적으로 높여주는 강력하고 직관적인 도구들을 만듭니다.
                </p>
                <Button href="/applications" variant="secondary" className="group-hover:bg-charcoal group-hover:text-white transition-colors">
                  자세히 보기 &rarr;
                </Button>
              </div>
            </div>

            {/* Photo Card */}
            <div className="group relative bg-deep-ivory rounded-2xl p-8 sm:p-12 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-coral/5 rounded-bl-[100px] group-hover:bg-coral/10 transition-colors duration-300" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                  <svg className="w-8 h-8 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-charcoal mb-4">촬영 서비스</h3>
                <p className="text-charcoal/70 mb-8 max-w-sm line-clamp-2 title-font leading-relaxed">
                  가장 아름다운 순간을 영원히 기억될 수 있도록, 최고의 퀄리티로 프레임에 담아냅니다.
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
                src="https://images.unsplash.com/photo-1497215848143-2287c2fb2731?q=80&w=2070&auto=format&fit=crop"
                alt="Brand Story"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            </div>

            <div className="flex flex-col items-start order-1 lg:order-2">
              <span className="text-coral font-bold tracking-wider uppercase mb-4 text-sm">About Us</span>
              <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-charcoal mb-8 leading-[1.2] tracking-tight">
                AtlasFinder 소개
              </h2>
              <div className="h-1 w-20 bg-coral mb-8" />

              <p className="text-lg text-charcoal/80 mb-12 leading-relaxed font-medium">
                우리는 문제를 발견하고 해결책을 제시하는 것에 끝없는 열정을 가지고 있습니다.
                단순한 기능의 구현을 넘어, 사용자에게 최고의 경험과 가치를 전달하기 위해
                세밀한 디테일까지 고민하며 만들어갑니다.
              </p>

              <div className="grid sm:grid-cols-2 gap-8 w-full">
                <div>
                  <h4 className="text-xl font-bold text-charcoal mb-3">본질에의 집중</h4>
                  <p className="text-charcoal/70 leading-relaxed text-[15px]">군더더기를 덜어내고 가장 핵심이 되는 가치에 집중합니다.</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-charcoal mb-3">끊임없는 실험</h4>
                  <p className="text-charcoal/70 leading-relaxed text-[15px]">새로운 방식을 두려워하지 않으며 더 나은 결과를 향해 나아갑니다.</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-charcoal mb-3">완벽한 기록</h4>
                  <p className="text-charcoal/70 leading-relaxed text-[15px]">빛나는 찰나의 순간을 영원한 기록으로 남깁니다.</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-charcoal mb-3">사용자 중심</h4>
                  <p className="text-charcoal/70 leading-relaxed text-[15px]">언제나 서비스를 사용하는 사람의 입장에서 경험을 설계합니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
