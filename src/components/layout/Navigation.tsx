'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navigation() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { label: '애플리케이션', path: '/applications' },
        { label: '촬영서비스', path: '/photo' },
        { label: 'About', path: '/#about' },
    ];

    return (
        <nav className="fixed w-full z-50 bg-ivory/90 backdrop-blur-md border-b border-mid-gray/10">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    <div className="w-32 flex-shrink-0">
                        <Link href="/" className="text-2xl font-extrabold tracking-tight">
                            AtlasFinder
                        </Link>
                    </div>

                    <div className="hidden md:flex flex-1 justify-center space-x-12 absolute left-1/2 -translate-x-1/2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.path || (pathname.startsWith(item.path) && item.path !== '/');
                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`text-[15px] font-medium transition-all duration-300 relative ${isActive ? 'text-coral' : 'text-charcoal hover:text-coral'
                                        }`}
                                >
                                    {item.label}
                                    {isActive && (
                                        <span className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-coral rounded-full" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right Menu (Desktop) */}
                    <div className="hidden md:flex flex-shrink-0 justify-end items-center pl-8 ml-auto">
                        <div className="flex items-center border border-mid-gray/20 rounded-full bg-white shadow-sm text-[13px] font-bold text-charcoal transition-colors hover:border-coral/40">

                            <div className="relative group">
                                <Link href="/support" className="block px-4 py-1.5 hover:text-coral transition-colors rounded-l-full">
                                    Support
                                </Link>
                            </div>

                            <div className="w-[1px] h-3.5 bg-mid-gray/30"></div>

                            <Link href="/contact" className="block px-4 py-1.5 hover:text-coral transition-colors rounded-r-full">
                                Contact
                            </Link>

                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-charcoal focus:outline-none p-2"
                            aria-label="Toggle menu"
                        >
                            <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-ivory border-t border-mid-gray/10 absolute w-full shadow-lg">
                    <div className="px-6 pt-4 pb-8 space-y-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.path || (pathname.startsWith(item.path) && item.path !== '/');
                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-4 py-3 text-[15px] font-medium rounded-[4px] transition-colors ${isActive ? 'text-coral bg-coral/5' : 'text-charcoal hover:bg-mid-gray/5'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </nav>
    );
}
