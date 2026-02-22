"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { history, siteConfig } from "@/lib/data/data";

export default function JourneyTimeline() {
    const { journey } = siteConfig.aboutStrings;

    return (
        <section className="py-24 md:py-32 bg-secondary text-white">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-24 md:mb-32 space-y-4">
                    <span className="eyebrow block">{journey.eyebrow}</span>
                    <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white">{journey.title}</h2>
                </div>
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-100px" }}
                    className="relative space-y-20 md:space-y-24"
                >
                    <div className="absolute left-8 lg:left-1/2 transform lg:-translate-x-1/2 h-full w-[1px] bg-white/10"></div>
                    {history.map((milestone, idx) => (
                        <motion.div
                            key={milestone.year}
                            variants={fadeUp}
                            className={`relative flex items-center lg:justify-between w-full ${idx % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"}`}
                        >
                            <div className="hidden lg:block lg:w-5/12"></div>
                            <div className="absolute left-8 lg:left-1/2 transform lg:-translate-x-1/2 z-20 flex items-center justify-center bg-primary w-4 h-4 rounded-full ring-8 ring-secondary ring-offset-4 ring-offset-white/5"></div>
                            <div className="pl-20 lg:pl-0 lg:w-5/12 space-y-4">
                                <h3 className="text-4xl font-extrabold text-primary tracking-tighter leading-none">{milestone.year}</h3>
                                <h4 className="text-2xl font-bold text-white tracking-tight">{milestone.title}</h4>
                                <p className="text-lg text-white/50 font-light leading-relaxed italic">{milestone.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
