import Image from "next/image";
import { Button } from "@/components/ui/Button";

// Mock Data
const applications = [
    {
        id: 1,
        name: "PixelPDF",
        version: "v2.0",
        priceType: "무료",
        description: "PDF 문서의 용량을 화질 저하 없이 극적으로 압축해주는 경량화 도구입니다. 텍스트 추출 및 병합 기능까지 지원하여 문서 작업 효율을 높입니다.",
        features: ["혁신적인 압축 알고리즘", "빠른 텍스트 추출", "PDF 병합 및 분할 지원"],
        os: "Windows 10 / 11",
        image: "/images/pixelpdf-icon.png",
        hasAppIcon: true,
        bgColor: "from-[#F25C54]/10 to-[#1A1A1A]/5",
        link: "https://github.com/onandcode-crypto/atlasfinder_app_release/releases/download/PixelPDF_v2.0/PixelPDF_v2.0.0_Setup.exe"
    },
    {
        id: 2,
        name: "Candidate Manager Pro",
        version: "v1.0",
        priceType: "₩100,000",
        description: "업무 생산성을 높이기 위한 다양한 미니 유틸리티를 하나로 모은 종합 툴박스입니다. 필요한 기능을 빠르게 실행하고 단축키로 접근할 수 있습니다.",
        features: ["클립보드 매니저", "화면 캡쳐 및 주석", "커스텀 단축키 매핑"],
        os: "Windows 10 / 11",
        image: "/images/candidate_manager.png",
        hasAppIcon: true,
        bgColor: "from-[#F25C54]/10 to-[#1A1A1A]/5",
        link: "https://example.com/download/atlastool"
    },
    {
        id: 2,
        name: "Candidate Manager",
        version: "v2.5",
        priceType: "₩50,000",
        description: "업무 생산성을 높이기 위한 다양한 미니 유틸리티를 하나로 모은 종합 툴박스입니다. 필요한 기능을 빠르게 실행하고 단축키로 접근할 수 있습니다.",
        features: ["클립보드 매니저", "화면 캡쳐 및 주석", "커스텀 단축키 매핑"],
        os: "Windows 10 / 11",
        image: "/images/candidate_manager.png",
        hasAppIcon: true,
        bgColor: "from-[#F25C54]/10 to-[#1A1A1A]/5",
        link: "https://example.com/download/atlastool"
    },
    {
        id: 2,
        name: "Smart HR Manager Pro",
        version: "v1.0",
        priceType: "₩100,000",
        description: "업무 생산성을 높이기 위한 다양한 미니 유틸리티를 하나로 모은 종합 툴박스입니다. 필요한 기능을 빠르게 실행하고 단축키로 접근할 수 있습니다.",
        features: ["클립보드 매니저", "화면 캡쳐 및 주석", "커스텀 단축키 매핑"],
        os: "Windows 10 / 11",
        image: "/images/smart_hr_manager.png",
        hasAppIcon: true,
        bgColor: "from-[#F25C54]/10 to-[#1A1A1A]/5",
        link: "https://example.com/download/atlastool"
    },
    {
        id: 2,
        name: "Smart HR Manager",
        version: "v1.5",
        priceType: "₩50,000",
        description: "업무 생산성을 높이기 위한 다양한 미니 유틸리티를 하나로 모은 종합 툴박스입니다. 필요한 기능을 빠르게 실행하고 단축키로 접근할 수 있습니다.",
        features: ["클립보드 매니저", "화면 캡쳐 및 주석", "커스텀 단축키 매핑"],
        os: "Windows 10 / 11",
        image: "/images/smart_hr_manager.png",
        hasAppIcon: true,
        bgColor: "from-[#F25C54]/10 to-[#1A1A1A]/5",
        link: "https://example.com/download/atlastool"
    },
    {
        id: 2,
        name: "AtlasTool",
        version: "v1.0",
        priceType: "₩200,000",
        description: "업무 생산성을 높이기 위한 다양한 미니 유틸리티를 하나로 모은 종합 툴박스입니다. 필요한 기능을 빠르게 실행하고 단축키로 접근할 수 있습니다.",
        features: ["클립보드 매니저", "화면 캡쳐 및 주석", "커스텀 단축키 매핑"],
        os: "Windows 10 / 11",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
        hasAppIcon: false,
        bgColor: "",
        link: "https://example.com/download/atlastool"
    }
];

export default function ApplicationsPage() {
    return (
        <div className="w-full bg-ivory min-h-screen">
            {/* Page Header */}
            <section className="pt-32 pb-20 px-6 lg:px-8 max-w-7xl mx-auto">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-charcoal mb-6 tracking-tight">
                    애플리케이션
                </h1>
                <div className="h-1 w-20 bg-coral mb-8" />
                <p className="text-xl sm:text-2xl text-charcoal/70 font-medium">
                    업무 효율을 높이는 도구들을 만듭니다
                </p>
            </section>

            {/* App List */}
            <section className="px-6 lg:px-8 max-w-7xl mx-auto pb-32">
                <div className="flex flex-col gap-16 lg:gap-24">
                    {applications.map((app) => (
                        <div key={app.id} className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-mid-gray/10 group">
                            <div className="grid lg:grid-cols-2 gap-0">
                                {/* Image Area */}
                                <div className={`relative h-[300px] lg:h-auto w-full overflow-hidden flex items-center justify-center ${app.hasAppIcon ? `bg-gradient-to-br ${app.bgColor}` : 'bg-deep-ivory'
                                    }`}>
                                    <div className="absolute inset-0 bg-white/40 group-hover:bg-transparent transition-colors duration-500 z-10" />

                                    {app.hasAppIcon ? (
                                        <div className="relative w-48 h-48 sm:w-64 sm:h-64 z-20 transition-transform duration-700 group-hover:scale-110 drop-shadow-2xl">
                                            <Image
                                                src={app.image}
                                                alt={`${app.name} icon`}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    ) : (
                                        <Image
                                            src={app.image}
                                            alt={app.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    )}
                                </div>

                                {/* Content Area */}
                                <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-3xl font-bold text-charcoal tracking-tight">{app.name}</h2>
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-medium text-mid-gray bg-ivory px-3 py-1 rounded-full">{app.version}</span>
                                            <span className="text-sm font-bold text-coral bg-coral/10 px-3 py-1 rounded-full">{app.priceType}</span>
                                        </div>
                                    </div>

                                    <p className="text-charcoal/80 text-lg leading-relaxed mb-8 font-medium">
                                        {app.description}
                                    </p>

                                    <div className="mb-10">
                                        <ul className="space-y-3">
                                            {app.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-center text-charcoal/70">
                                                    <svg className="w-5 h-5 text-coral mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span className="text-[15px]">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="flex items-center justify-between mt-auto pt-8 border-t border-mid-gray/10">
                                        <span className="text-sm text-mid-gray font-medium flex items-center">
                                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            {app.os}
                                        </span>
                                        <Button
                                            href={app.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm px-6 py-3"
                                        >
                                            다운로드 &rarr;
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
