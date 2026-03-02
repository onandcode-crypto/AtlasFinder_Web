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
                        <Link href="/admin/login" className="text-[13px] text-mid-gray hover:text-charcoal transition-colors">
                            © 2026 AtlasFinder. All rights reserved.
                        </Link>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-3">
                        <Link
                            href="/site-atlas"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-mid-gray/20 rounded-full shadow-sm text-[13px] font-bold text-charcoal hover:border-coral/50 hover:text-coral transition-all duration-300 group"
                        >
                            <span>Site Atlas</span>
                            <svg className="w-4 h-4 text-mid-gray group-hover:text-coral transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                    </div>

                </div>
            </div>
        </footer>
    );
}
