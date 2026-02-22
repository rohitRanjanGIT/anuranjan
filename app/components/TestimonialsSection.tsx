"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { testimonials, siteConfig } from "@/lib/data/data";

export default function TestimonialsSection() {
    const { testimonials: testimonialStrings } = siteConfig.homeStrings;

    return (
        <section className="py-24 md:py-32 bg-secondary text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 opacity-[0.03] scale-150 rotate-12 select-none pointer-events-none">
                <span className="material-symbols-outlined text-[600px]">format_quote</span>
            </div>
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
                <div className="text-center mb-16 md:mb-24 space-y-4">
                    <span className="eyebrow block">{testimonialStrings.eyebrow}</span>
                    <h3 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white">{testimonialStrings.title}</h3>
                </div>
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-100px" }}
                    className="grid md:grid-cols-3 gap-8 md:gap-10"
                >
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            variants={fadeUp}
                            className="bg-white/5 backdrop-blur-md p-10 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-white/10 hover:bg-white/[0.08] transition-all duration-300"
                        >
                            <div className="flex gap-1 mb-8">
                                {[1, 2, 3, 4, 5].map(s => <span key={s} className="material-symbols-outlined text-primary text-sm font-bold">star</span>)}
                            </div>
                            <p className="text-white/80 mb-12 text-lg md:text-xl italic font-light leading-relaxed">
                                &quot;{t.content}&quot;
                            </p>
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/10 shadow-sm">
                                    <img alt={t.name} src={t.avatar} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h6 className="font-bold text-lg text-white">{t.name}</h6>
                                    <p className="eyebrow text-[10px] text-primary">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
