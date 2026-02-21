"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig, navItems } from "@/lib/data/data";
import { useState } from "react";

export default function Navbar() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky-nav bg-white/95 border-b border-slate-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="h-12 w-auto">
                            <img src={siteConfig.logo.image} alt={siteConfig.logo.text} className="h-full w-auto object-contain" />
                        </div>
                    </Link>

                    <nav className="hidden md:flex space-x-8 items-center">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`text-sm font-bold transition-all ${pathname === item.href
                                    ? "text-slate-900 border-b-2 border-slate-900 pb-1"
                                    : "text-slate-600 hover:text-slate-900"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <button className="bg-primary hover:bg-slate-900 text-white px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-primary/20">
                            Get a Quote
                        </button>
                    </nav>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-900 bg-slate-100 p-2 rounded-full">
                            <span className="material-symbols-outlined text-2xl font-bold">
                                {isMenuOpen ? "close" : "menu"}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-b border-slate-200 py-10 px-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className={`block text-2xl font-bold ${pathname === item.href ? "text-primary flex items-center gap-3" : "text-slate-900"
                                }`}
                        >
                            {pathname === item.href && <span className="w-2 h-2 bg-primary rounded-full"></span>}
                            {item.label}
                        </Link>
                    ))}
                    <button className="w-full bg-primary text-white px-6 py-4 rounded-full text-base font-bold shadow-xl">
                        Get a Quote
                    </button>
                </div>
            )}
        </header>
    );
}
