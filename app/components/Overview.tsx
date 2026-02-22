"use client";

import { motion } from "framer-motion";
import { fadeUp, slideInLeft } from "@/lib/animations";
import { siteConfig } from "@/lib/data/data";

export default function Overview() {
    const { overview } = siteConfig.homeStrings;

    return (
        <section className="py-24 md:py-32 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
                    <motion.div
                        variants={slideInLeft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false }}
                        className="relative"
                    >
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full z-0 animate-pulse"></div>
                        <div className="relative z-10 overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-xl">
                            <img
                                alt="Architectural excellence"
                                className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-1000"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2y0k_xBQKkrn3o9gUO8ggpjGEmPYlARFX5st2lgx2dGPG3vRkU0i9vsJmX0Y9bcSXLs8mMdXAy1wljrgRZT-4o1uSdj60cLq4qTawiPMaU3ArdIU0pbTv3h7VM66Urpl0D1P4nXEVqOIzaT-hVRIYz7iVTdSoEPWvHiYCBXc0VCwb57ND4rl2CoVIeIFJNjv72JnSFnORI6r9jY3l3i8FNY_R10b9Ivth2Y6UV0YFA67WSJQYP7tDMZMvfYJAlvfas5ikwUdhixfq"
                            />
                        </div>
                        <div className="absolute -bottom-12 -right-12 bg-secondary p-8 md:p-12 rounded-[2rem] text-white shadow-xl hidden lg:block border border-white/10 backdrop-blur-md">
                            <p className="text-5xl md:text-6xl font-extrabold tracking-tighter text-primary">{siteConfig.experienceYears}+</p>
                            <p className="eyebrow text-white/60 mt-3">{overview.yearsLabel}</p>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false }}
                        className="space-y-8 md:space-y-10"
                    >
                        <div className="space-y-4">
                            <span className="eyebrow flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-primary"></span>
                                {overview.eyebrow}
                            </span>
                            <h3 className="text-4xl lg:text-5xl font-extrabold text-secondary leading-tight tracking-tight">
                                {overview.title} <span className="text-primary italic font-light">{overview.highlightedTitle}</span>.
                            </h3>
                        </div>
                        <p className="text-secondary/70 text-lg md:text-xl leading-relaxed font-light">
                            {overview.description}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                            {[
                                { title: "Our Mission", desc: "Quality-driven sustainable building solutions.", icon: "shutter_speed" },
                                { title: "Our Vision", desc: "To be the industry leader in infrastructure innovation.", icon: "visibility" }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col gap-4 p-6 md:p-8 rounded-[0.625rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md transition-all duration-300">
                                    <span className="material-symbols-outlined text-primary text-3xl">{item.icon}</span>
                                    <div>
                                        <h4 className="font-bold text-secondary text-lg mb-2">{item.title}</h4>
                                        <p className="text-sm text-secondary/60 font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
