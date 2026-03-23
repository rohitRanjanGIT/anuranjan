"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { history, siteConfig } from "@/lib/data/data";

export default function JourneyTimeline() {
    const { journey } = siteConfig.aboutStrings;
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const lineWidth = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "100%"]);

    return (
        <section ref={sectionRef} className="py-24 md:py-32 bg-secondary text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-center mb-16 md:mb-20 space-y-4"
                >
                    <span className="eyebrow block text-primary/80">{journey.eyebrow}</span>
                    <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white">{journey.title}</h2>
                    <div className="w-16 h-[2px] bg-primary mx-auto mt-4" />
                </motion.div>

                {/* Horizontal scrollable timeline */}
                <div className="relative">
                    {/* Static track line */}
                    <div className="absolute top-[52px] left-0 right-0 h-px bg-white/10" />
                    {/* Animated progress line */}
                    <motion.div
                        className="absolute top-[52px] left-0 h-px bg-gradient-to-r from-primary via-primary/60 to-primary"
                        style={{ width: lineWidth }}
                    />

                    <div className="flex gap-6 md:gap-8 overflow-x-auto pb-6 pt-2 scrollbar-hide snap-x snap-mandatory -mx-6 px-6 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
                        {history.map((milestone, idx) => (
                            <motion.div
                                key={milestone.year}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.12, duration: 0.5 }}
                                className="flex-shrink-0 w-[280px] md:w-[320px] snap-start"
                            >
                                {/* Node */}
                                <div className="flex flex-col items-start mb-6">
                                    <div className="relative mb-6">
                                        <span className="absolute -inset-3 rounded-full bg-primary/10 animate-pulse" style={{ animationDuration: "3s", animationDelay: `${idx * 0.5}s` }} />
                                        <span className="relative block w-5 h-5 rounded-full bg-primary ring-4 ring-secondary shadow-lg shadow-primary/25" />
                                    </div>
                                    <span className="text-primary text-3xl font-extrabold tracking-tighter leading-none">{milestone.year}</span>
                                </div>

                                {/* Card */}
                                <div className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.08] transition-colors duration-300 h-full">
                                    <h4 className="text-lg font-bold text-white tracking-tight mb-3">{milestone.title}</h4>
                                    <p className="text-white/45 text-sm font-light leading-relaxed">{milestone.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
