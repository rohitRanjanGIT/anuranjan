"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { siteConfig, values } from "@/lib/data/data";

export default function MissionVision() {
    const { mission, vision } = siteConfig.aboutStrings;

    const cards = [
        { ...mission, icon: "target", accent: "bg-primary" },
        { ...vision, icon: "visibility", accent: "bg-secondary" },
    ];

    return (
        <section className="py-24 md:py-32 bg-slate-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                {/* Mission & Vision */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid md:grid-cols-2 gap-8 md:gap-10"
                >
                    {cards.map((item, i) => (
                        <motion.div
                            key={i}
                            variants={fadeUp}
                            className="relative bg-white p-10 md:p-12 rounded-[2rem] shadow-sm hover:shadow-lg transition-all duration-500 border border-slate-100 group overflow-hidden"
                        >
                            {/* Top accent bar */}
                            <div className={`absolute top-0 left-0 right-0 h-1 ${item.accent} opacity-80`} />
                            <div className={`w-14 h-14 ${item.accent} text-white rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md`}>
                                <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-5 text-secondary tracking-tight">{item.title}</h3>
                            <p className="text-secondary/55 text-lg leading-relaxed font-light">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Core Values */}
                <div className="mt-20 md:mt-28">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center max-w-2xl mx-auto mb-14 space-y-4"
                    >
                        <span className="eyebrow block">What Drives Us</span>
                        <h2 className="text-3xl lg:text-4xl font-extrabold text-secondary tracking-tight">
                            Our Core Values
                        </h2>
                    </motion.div>
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {values.map((value, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                className="group bg-white rounded-2xl p-8 border border-slate-100 hover:border-primary/20 shadow-sm hover:shadow-md transition-all duration-400 text-center"
                            >
                                <div className="w-14 h-14 bg-primary/8 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                    <span className="material-symbols-outlined text-2xl">{value.icon}</span>
                                </div>
                                <h4 className="text-lg font-bold text-secondary tracking-tight mb-3">{value.title}</h4>
                                <p className="text-secondary/50 text-sm leading-relaxed font-light">{value.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
