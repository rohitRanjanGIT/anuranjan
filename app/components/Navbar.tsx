"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig, navItems } from "@/lib/data/data";
import { useState } from "react";

export default function Navbar() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky-nav">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="flex justify-between items-center h-20">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="h-10 w-auto">
                            <img src={siteConfig.logo.image} alt={siteConfig.logo.text} className="h-full w-auto object-contain" />
                        </div>
                    </Link>

                    <nav className="hidden md:flex space-x-8 items-center">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`text-sm font-bold transition-all duration-300 ${pathname === item.href
                                    ? "text-primary border-b-2 border-primary pb-1"
                                    : "text-secondary/70 hover:text-primary"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <button className="bg-primary hover:bg-secondary text-white px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 shadow-md active:scale-95">
                            {siteConfig.common.getQuote}
                        </button>
                    </nav>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-secondary bg-slate-100 p-2 rounded-full active:scale-90 transition-transform">
                            <span className="material-symbols-outlined text-2xl font-bold">
                                {isMenuOpen ? "close" : "menu"}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-b border-slate-100 py-10 px-8 space-y-6 shadow-xl animate-in fade-in zoom-in-95 duration-300">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className={`block text-2xl font-bold transition-colors ${pathname === item.href ? "text-primary flex items-center gap-3" : "text-secondary"
                                }`}
                        >
                            {pathname === item.href && <span className="w-2 h-2 bg-primary rounded-full"></span>}
                            {item.label}
                        </Link>
                    ))}
                    <button className="w-full bg-primary text-white px-6 py-4 rounded-full text-base font-bold shadow-md active:scale-95 transition-transform">
                        {siteConfig.common.getQuote}
                    </button>
                </div>
            )}
        </header>
    );
}
