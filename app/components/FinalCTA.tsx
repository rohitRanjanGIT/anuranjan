"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { siteConfig } from "@/lib/data/data";

export default function FinalCTA() {
    const { cta } = siteConfig.homeStrings;

    return (
        <section className="py-24 md:py-32 bg-white">
            <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                className="max-w-5xl mx-auto px-6 text-center space-y-10 md:space-y-12"
            >
                <h2 className="text-4xl lg:text-7xl font-extrabold text-secondary tracking-tighter leading-tight">
                    {cta.title} <span className="text-primary italic font-light">{cta.highlightedWord}</span>
                </h2>
                <p className="text-lg md:text-xl text-secondary/60 font-light max-w-2xl mx-auto">
                    {cta.description}
                </p>
                <div className="flex flex-wrap justify-center gap-6 pt-6">
                    <button className="bg-primary hover:bg-secondary text-white px-10 md:px-12 py-4 md:py-5 rounded-full font-bold text-lg md:text-xl transition-all shadow-md active:scale-95 flex items-center gap-3">
                        {cta.primaryButton} <span className="material-symbols-outlined text-lg">edit_note</span>
                    </button>
                    <button className="bg-slate-100 hover:bg-slate-200 text-secondary px-10 md:px-12 py-4 md:py-5 rounded-full font-bold text-lg md:text-xl transition-all active:scale-95 border border-slate-200">
                        {cta.secondaryButton}
                    </button>
                </div>
            </motion.div>
        </section>
    );
}
