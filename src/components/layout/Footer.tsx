import React from 'react';
import Link from 'next/link';

export function Footer() {
    return (
        <footer className="w-full py-16 bg-deep-ivory mt-auto">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">

                    <div className="flex flex-col items-center md:items-start">
                        <Link href="/" className="text-xl font-extrabold tracking-tight text-charcoal mb-4">
                            AtlasFinder
                        </Link>
                        <p className="text-[13px] text-mid-gray">
                            © 2026 AtlasFinder. All rights reserved.
                        </p>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-3">
                        <p className="text-[13px] text-charcoal">contact@atlasfinder.kr</p>
                        <div className="flex gap-3 mt-2">
                            {/* SNS Placeholders */}
                            <a href="#" className="w-9 h-9 border border-mid-gray/30 rounded-full flex items-center justify-center text-[11px] font-medium text-charcoal hover:bg-coral hover:text-white hover:border-coral transition-colors">IN</a>
                            <a href="#" className="w-9 h-9 border border-mid-gray/30 rounded-full flex items-center justify-center text-[11px] font-medium text-charcoal hover:bg-coral hover:text-white hover:border-coral transition-colors">FB</a>
                            <a href="#" className="w-9 h-9 border border-mid-gray/30 rounded-full flex items-center justify-center text-[11px] font-medium text-charcoal hover:bg-coral hover:text-white hover:border-coral transition-colors">YT</a>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
}
