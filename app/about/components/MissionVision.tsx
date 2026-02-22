"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { siteConfig } from "@/lib/data/data";

export default function MissionVision() {
    const { mission, vision } = siteConfig.aboutStrings;

    const items = [
        { ...mission, icon: "target" },
        { ...vision, icon: "visibility" }
    ];

    return (
        <section className="py-24 md:py-32 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-100px" }}
                    className="grid md:grid-cols-2 gap-8 md:gap-12"
                >
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            variants={fadeUp}
                            className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-sm hover:shadow-md transition-all duration-500 border border-slate-100 group"
                        >
                            <div className="w-16 h-16 bg-secondary text-white rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-300">
                                <span className="material-symbols-outlined text-3xl font-bold">{item.icon}</span>
                            </div>
                            <h3 className="text-3xl font-bold mb-6 text-secondary tracking-tight">{item.title}</h3>
                            <p className="text-secondary/60 text-lg leading-relaxed font-light italic">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
