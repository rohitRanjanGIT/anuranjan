"use client";

import Hero from "../components/Hero";
import { careers, siteConfig } from "@/lib/data/data";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, slideInLeft } from "@/lib/animations";

export default function CareersClient() {
    const { hero, intro, culture } = siteConfig.careersStrings;

    return (
        <>
            <Hero
                title={hero.title}
                subtitle={hero.subtitle}
                description={hero.description}
                backgroundImage="https://lh3.googleusercontent.com/aida-public/AB6AXuDiBv1EokLVMppNO16XoFKj2CHF1uVQ196U3zn077puTyZaBtMpKt0e6Wn6qlMKHr8zk46y8VjguAybwVgr_iszvefNImzCU5rDmuI79CKRprVYP2z4ezV54mWNycGQ1uEO0t89YOXKJSP_wy3Cf7G3D2qDas7r5TNtJAC4jlbpoOnPqrHmb9GISQ-Kmy2toCY7kjxUTjQvZe_61scwG3uXHcpO43TbOu_5TAvBEJJHwVLYoD687Pq8D5y7AGeE9dsYeILM_oSa6Z2g"
            />

            <section className="py-24 md:py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false }}
                        className="text-center max-w-2xl mx-auto mb-16 md:mb-24 space-y-4"
                    >
                        <span className="eyebrow block">{intro.eyebrow}</span>
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-secondary tracking-tight">{intro.title}</h2>
                        <p className="text-secondary/60 text-lg font-light">{intro.description}</p>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, margin: "-100px" }}
                        className="grid gap-8 md:gap-12"
                    >
                        {careers.map((job) => (
                            <motion.div
                                key={job.id}
                                variants={fadeUp}
                                className="group bg-slate-50 p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-md transition-all duration-500 flex flex-col lg:flex-row justify-between items-center gap-8 md:gap-12"
                            >
                                <div className="flex-grow space-y-6 text-center lg:text-left">
                                    <div className="inline-block px-4 py-2 bg-white rounded-full shadow-sm border border-slate-100">
                                        <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{job.department}</span>
                                    </div>
                                    <h3 className="text-3xl lg:text-4xl font-extrabold text-secondary tracking-tight group-hover:text-primary transition-colors">
                                        {job.title}
                                    </h3>
                                    <div className="flex flex-wrap justify-center lg:justify-start gap-6 md:gap-8">
                                        <div className="flex items-center gap-3 text-sm text-secondary/50 font-bold">
                                            <span className="material-symbols-outlined text-primary text-xl">location_on</span>
                                            {job.location}
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-secondary/50 font-bold">
                                            <span className="material-symbols-outlined text-secondary text-xl">schedule</span>
                                            {job.type}
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-secondary/50 font-bold">
                                            <span className="material-symbols-outlined text-primary text-xl">history</span>
                                            {job.experience}
                                        </div>
                                    </div>
                                </div>
                                <button className="whitespace-nowrap bg-secondary text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-primary transition-all shadow-md active:scale-95 flex items-center gap-3">
                                    Apply Now <span className="material-symbols-outlined text-sm">north_east</span>
                                </button>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Culture Section */}
            <section className="py-24 md:py-32 bg-slate-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
                        <motion.div
                            variants={slideInLeft}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false }}
                            className="relative order-2 lg:order-1"
                        >
                            <div className="aspect-[4/5] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-xl relative z-10 group">
                                <img
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    alt="Our Culture"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiBv1EokLVMppNO16XoFKj2CHF1uVQ196U3zn077puTyZaBtMpKt0e6Wn6qlMKHr8zk46y8VjguAybwVgr_iszvefNImzCU5rDmuI79CKRprVYP2z4ezV54mWNycGQ1uEO0t89YOXKJSP_wy3Cf7G3D2qDas7r5TNtJAC4jlbpoOnPqrHmb9GISQ-Kmy2toCY7kjxUTjQvZe_61scwG3uXHcpO43TbOu_5TAvBEJJHwVLYoD687Pq8D5y7AGeE9dsYeILM_oSa6Z2g"
                                />
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
                        </motion.div>

                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false }}
                            className="space-y-10 md:space-y-12 order-1 lg:order-2"
                        >
                            <div className="space-y-4">
                                <span className="eyebrow block">{culture.eyebrow}</span>
                                <h2 className="text-4xl lg:text-6xl font-extrabold text-secondary tracking-tight leading-tight">
                                    {culture.title} <span className="text-primary italic font-light">{culture.highlightedTitle}</span>
                                </h2>
                            </div>
                            <p className="text-secondary/60 text-lg md:text-xl leading-relaxed font-light italic">
                                {culture.description}
                            </p>
                            <ul className="space-y-6 md:space-y-8">
                                {culture.points.map((item) => (
                                    <li key={item} className="flex gap-6 group">
                                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300 shadow-sm">
                                            <span className="material-symbols-outlined text-white text-sm font-bold">done</span>
                                        </div>
                                        <span className="text-secondary/80 font-bold text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-8 border-t border-slate-200">
                                <p className="eyebrow text-secondary/40 mb-6">{culture.openAppLabel}</p>
                                <button className="group flex items-center gap-4 text-secondary font-extrabold text-xl hover:text-primary transition-all duration-300 active:translate-x-2">
                                    {culture.openAppButton}
                                    <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all transform duration-300">
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </div>
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}
