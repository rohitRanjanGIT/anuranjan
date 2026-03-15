"use client";

import { useState } from "react";
import { services, siteConfig } from "@/lib/data/data";
import Link from "next/link";

// Relevant background image per service
const serviceImages: Record<string, string> = {
    "civil-construction":
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDvzrXxqpQ8_TDyMsJT4exjCTprsNAlYlS_IXXP-ffXi75jWbrT1h2albO2SCmJyoh_ZzLEaE64TT_w4k3X3BhmeEd-QjkuuKY-CJ0rP5LbJv-AtA7PZjN5SnYP60QU5GJ3B69dndAOPmtvV7GcQLc8EXhtYr10HfKnJK1DX98RHB1gwlLsgdh5r3t4jyQTtOf2zWUCB17xN1iaZAkcGsfwU0yQHDzXlKSkVjBOSbceoylVDODq2iNX7gPf6nbEvN0UkZ_MZ8ektIkK",
    "interior-design":
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDqNDgwCldCXF5u-JyNAKrYeAeI6-ROHh-ByjyL7dgRyDkqw5vwUMwK9uRNKDtsWsjIpo0Ug14k4UTRESxHpDIXigvnOcEDgvUJAwoeWYXcXYHs9S1SwWYDZn7lzk2wked5CuOlBIEWI2nfRgxvw4f4ss5AV4OpjdUEMbNv063PGsGY7cEioAH8UdG1o6EAheeNxT1cjFE6muZzfwxRI4wM6uh-uBpO0qJKZEnPvIz7w30ZpMB3eitNk88xfIkxVU4vtb0VQwyEx-s1",
    "road-highway":
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBpLKKarMBFmYQuJXVVzIxlf4jHZwjuBmUWnhuJ6Whw1YDuD9eCGvp0jyeqyyVMGe_qwCoXtuJzTEBjIOo0hpWnr9qWmCQNAxdkZuv3ViT8n-DYw_34TE8h01AnkPoAb0-hri3qP_ll4_e2uPVx6LT9zNN1eJju4Yq7oWmdiX9OYvcSKBcZQgt12s9PKTWuEMl8YRntB0-u3Dyf-SYZeVkL1PtHpw_hwWvlASkyb51Q2fMZpHou7xHH1-x-b2ukHu6EtopRU4PKmmxK",
    "project-management":
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBrt6ecFPhx3KgvYYBTZggjRaaVfWIfMFET6jmOUFb7rNVzLa_lT5ar04_whoCO4rXJFD2I-beeIde2x3UW7nJPU13Fw7bvZJ14nXOR6UKJNHJ3jfAzr4FJv1VoP5yinmBUnccIrkNOgoD9s_GBhzPseW23WWPRIF-kEUOIE8fvG8DLdyrDll2UPY1ZJlwNWL-LvLnbODDpWElKEte_7d3HOgquPVR5l4U_jDIkhCOAUNz1BRP5Uyu16s2fC42zAsXdNkwdcy22n2UA",
};

export default function ServicesGrid() {
    const { services: servicesStrings } = siteConfig.homeStrings;

    // Desktop: hover effect
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    // Mobile: accordion open state (one open at a time)
    const [openId, setOpenId] = useState<string | null>(null);

    const displayedServices = services.slice(0, 4);

    return (
        <section className="py-16 md:py-24 lg:py-32 bg-slate-50 overflow-hidden">
            {/* ── Header ───────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6">
                    <div className="max-w-2xl space-y-3">
                        <span className="eyebrow mb-3 block">{servicesStrings.eyebrow}</span>
                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-secondary tracking-tight">
                            {servicesStrings.title}
                        </h3>
                    </div>
                    <Link
                        href="/services"
                        className="px-7 py-3.5 rounded-full border border-secondary text-secondary font-bold hover:bg-secondary hover:text-white transition-all duration-300 flex items-center gap-3 active:scale-95 text-sm whitespace-nowrap"
                    >
                        {servicesStrings.buttonText}
                        <span className="material-symbols-outlined text-sm text-primary">arrow_forward</span>
                    </Link>
                </div>
            </div>

            {/* ── Desktop: full-width horizontal band (md+) ────────── */}
            <div className="hidden md:flex flex-row w-full border-t border-b border-slate-200">
                {displayedServices.map((service, idx) => {
                    const isHovered = hoveredId === service.id;
                    const bgImage = serviceImages[service.id];
                    const isLast = idx === displayedServices.length - 1;

                    return (
                        <div
                            key={service.id}
                            className="relative flex-1 overflow-hidden cursor-default"
                            style={{
                                minHeight: "420px",
                                borderRight: isLast ? "none" : "1px solid #e2e8f0",
                            }}
                            onMouseEnter={() => setHoveredId(service.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            {/* Background image layer */}
                            <div
                                aria-hidden="true"
                                style={{
                                    backgroundImage: `url(${bgImage})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    opacity: isHovered ? 1 : 0,
                                    transition: "opacity 0.5s ease",
                                }}
                                className="absolute inset-0"
                            />

                            {/* Blur + dark overlay */}
                            <div
                                aria-hidden="true"
                                style={{
                                    backdropFilter: isHovered ? "blur(14px)" : "blur(0px)",
                                    WebkitBackdropFilter: isHovered ? "blur(14px)" : "blur(0px)",
                                    background: isHovered ? "rgba(15, 23, 42, 0.55)" : "rgba(255,255,255,0)",
                                    opacity: isHovered ? 1 : 0,
                                    transition: "opacity 0.5s ease, backdrop-filter 0.5s ease, -webkit-backdrop-filter 0.5s ease",
                                }}
                                className="absolute inset-0"
                            />

                            {/* White base */}
                            <div
                                aria-hidden="true"
                                style={{ opacity: isHovered ? 0 : 1, transition: "opacity 0.5s ease" }}
                                className="absolute inset-0 bg-white"
                            />

                            {/* Content */}
                            <div className="relative z-10 p-10 flex flex-col justify-between h-full">
                                <div>
                                    <div
                                        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${isHovered
                                            ? "bg-white/20 text-white"
                                            : idx % 2 === 0
                                                ? "bg-primary/10 text-primary"
                                                : "bg-secondary/10 text-secondary"
                                            }`}
                                        style={{ transition: "background 0.4s ease, color 0.4s ease" }}
                                    >
                                        <span className="material-symbols-outlined text-2xl font-bold">{service.icon}</span>
                                    </div>

                                    <h4
                                        className={`text-xl font-bold mb-4 tracking-tight ${isHovered ? "text-white" : "text-secondary"}`}
                                        style={{ transition: "color 0.4s ease" }}
                                    >
                                        {service.title}
                                    </h4>

                                    <p
                                        className={`text-sm leading-relaxed font-light ${isHovered ? "text-white/80" : "text-secondary/60"}`}
                                        style={{ transition: "color 0.4s ease" }}
                                    >
                                        {service.description}
                                    </p>
                                </div>

                                <div className="mt-8 space-y-4">
                                    <div
                                        className="h-[1px] w-full"
                                        style={{
                                            background: isHovered ? "rgba(255,255,255,0.2)" : "#f1f5f9",
                                            transition: "background 0.4s ease",
                                        }}
                                    />
                                    <div className="flex flex-wrap gap-2">
                                        {service.features.map((f) => (
                                            <span
                                                key={f}
                                                className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border ${isHovered
                                                    ? "border-white/30 text-white/70 bg-white/10"
                                                    : "border-slate-100 text-secondary/40 bg-slate-50"
                                                    }`}
                                                style={{ transition: "all 0.4s ease" }}
                                            >
                                                {f}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ── Mobile: tap-to-expand accordion (< md) ───────────── */}
            <div className="md:hidden border-t border-slate-200">
                {displayedServices.map((service, idx) => {
                    const isOpen = openId === service.id;
                    const bgImage = serviceImages[service.id];

                    return (
                        /* Shared background wrapper — one image, one blur overlay for the whole item */
                        <div
                            key={service.id}
                            className="relative overflow-hidden border-b border-white/10"
                        >
                            {/* BG image — single instance shared between header + body */}
                            <div
                                aria-hidden="true"
                                style={{
                                    backgroundImage: `url(${bgImage})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                                className="absolute inset-0"
                            />
                            {/* Unified blur + dark overlay */}
                            <div
                                aria-hidden="true"
                                className="absolute inset-0"
                                style={{
                                    backdropFilter: "blur(14px)",
                                    WebkitBackdropFilter: "blur(14px)",
                                    background: "rgba(15, 23, 42, 0.60)",
                                }}
                            />

                            {/* ── Header row ── */}
                            <button
                                onClick={() => setOpenId(isOpen ? null : service.id)}
                                className="relative z-10 w-full flex items-center justify-between px-6 py-5 text-left"
                                aria-expanded={isOpen}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-white/20 text-white">
                                        <span className="material-symbols-outlined text-xl">{service.icon}</span>
                                    </div>
                                    <span className="font-bold text-white text-base tracking-tight">
                                        {service.title}
                                    </span>
                                </div>

                                {/* Chevron — rotates when open */}
                                <span
                                    className="material-symbols-outlined flex-shrink-0"
                                    style={{
                                        color: "rgba(255,255,255,0.55)",
                                        transition: "transform 0.35s ease",
                                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                                    }}
                                >
                                    expand_more
                                </span>
                            </button>

                            {/* Thin separator between header and body */}
                            <div
                                className="relative z-10 mx-6"
                                style={{
                                    height: "1px",
                                    background: isOpen ? "rgba(255,255,255,0.12)" : "transparent",
                                    transition: "background 0.3s ease",
                                }}
                            />

                            {/* ── Expandable body — sits on the same shared background ── */}
                            <div
                                className="relative z-10"
                                style={{
                                    maxHeight: isOpen ? "600px" : "0px",
                                    overflow: "hidden",
                                    transition: "max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
                                }}
                            >
                                <div className="px-6 pb-8 pt-5">
                                    <p className="text-sm leading-relaxed text-white/80 font-light mb-7">
                                        {service.description}
                                    </p>

                                    <div className="h-[1px] w-full bg-white/15 mb-5" />

                                    <div className="flex flex-wrap gap-2">
                                        {service.features.map((f) => (
                                            <span
                                                key={f}
                                                className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/25 text-white/65 bg-white/10"
                                            >
                                                {f}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

        </section>
    );
}
