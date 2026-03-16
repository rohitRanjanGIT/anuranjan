"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { testimonials, siteConfig } from "@/lib/data/data";
import { ParticleCard } from "./MagicBento";

export default function TestimonialsSection() {
    const { testimonials: strings } = siteConfig.homeStrings;

    return (
        <section className="py-24 md:py-32 bg-secondary text-white overflow-hidden relative">

            {/* Ambient background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/4 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

                {/* Header */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 md:mb-20"
                >
                    <div className="space-y-4 max-w-xl">
                        <span className="eyebrow flex items-center gap-3 text-primary/80">
                            <span className="w-7 h-px bg-primary/60" />
                            {strings.eyebrow}
                        </span>
                        <h3 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                            {strings.title}
                        </h3>
                    </div>

                    {/* Aggregate rating */}
                    <div className="flex items-center gap-4 lg:pb-1 shrink-0">
                        <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <span key={s} className="material-symbols-outlined text-primary text-lg">star</span>
                            ))}
                        </div>
                        <div className="h-5 w-px bg-white/15" />
                        <p className="text-white/40 text-sm font-light">
                            {testimonials.length} client reviews
                        </p>
                    </div>
                </motion.div>

                {/* Cards */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:snap-none sm:pb-0 lg:grid-cols-3 sm:gap-6 scrollbar-none"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {testimonials.map((t, i) => (
                        <motion.div key={i} variants={fadeUp} className="flex snap-start shrink-0 w-[80vw] max-w-[340px] sm:w-auto sm:max-w-none sm:shrink">
                            <ParticleCard
                                className="flex flex-col w-full bg-white/[0.04] backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-white/8 hover:bg-white/[0.07] hover:border-white/14 transition-all duration-300"
                                glowColor="211, 49, 49"
                                particleCount={12}
                                enableTilt={true}
                                clickEffect={true}
                                enableMagnetism={false}
                            >
                                <div className="relative z-10 flex flex-col h-full">

                                    {/* Top — stars + opening quote */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <span key={s} className="material-symbols-outlined text-primary text-sm">star</span>
                                            ))}
                                        </div>
                                        <span
                                            className="material-symbols-outlined text-3xl leading-none select-none"
                                            style={{ color: "rgba(211,49,49,0.2)" }}
                                        >
                                            format_quote
                                        </span>
                                    </div>

                                    {/* Quote */}
                                    <p className="text-white/65 text-base md:text-[1.05rem] italic font-light leading-relaxed flex-1 mb-8">
                                        &ldquo;{t.content}&rdquo;
                                    </p>

                                    {/* Divider */}
                                    <div className="h-px w-full bg-white/8 mb-7" />

                                    {/* Author */}
                                    <div className="flex items-center gap-3.5">
                                        <div className="w-11 h-11 rounded-xl overflow-hidden border border-white/10 shrink-0">
                                            <img
                                                alt={t.name}
                                                src={t.avatar}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <h6 className="font-semibold text-sm text-white truncate">
                                                {t.name}
                                            </h6>
                                            <p className="text-[11px] uppercase tracking-[0.16em] text-primary/70 font-semibold mt-0.5 truncate">
                                                {t.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </ParticleCard>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}