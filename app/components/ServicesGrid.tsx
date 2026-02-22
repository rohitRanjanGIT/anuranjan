"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { services, siteConfig } from "@/lib/data/data";
import Link from "next/link";

export default function ServicesGrid() {
    const { services: servicesStrings } = siteConfig.homeStrings;

    return (
        <section className="py-24 md:py-32 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8">
                    <div className="max-w-2xl space-y-4">
                        <span className="eyebrow mb-4 block">{servicesStrings.eyebrow}</span>
                        <h3 className="text-4xl lg:text-5xl font-extrabold text-secondary tracking-tight">{servicesStrings.title}</h3>
                    </div>
                    <Link
                        href="/services"
                        className="px-8 py-4 rounded-full border border-secondary text-secondary font-bold hover:bg-secondary hover:text-white transition-all duration-300 flex items-center gap-3 active:scale-95"
                    >
                        {servicesStrings.buttonText} <span className="material-symbols-outlined text-sm text-primary">arrow_forward</span>
                    </Link>
                </div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-100px" }}
                    className="grid md:grid-cols-2 gap-6 md:gap-8"
                >
                    {services.slice(0, 4).map((service, idx) => (
                        <motion.div
                            key={service.id}
                            variants={fadeUp}
                            className="group bg-white p-10 md:p-12 rounded-[2rem] shadow-sm hover:shadow-md transition-all duration-500 flex flex-col justify-between border border-slate-100"
                        >
                            <div>
                                <div className={`w-16 h-16 ${idx % 2 === 0 ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"} rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-300`}>
                                    <span className="material-symbols-outlined text-3xl font-bold">{service.icon}</span>
                                </div>
                                <h4 className="text-2xl md:text-3xl font-bold mb-6 text-secondary tracking-tight">{service.title}</h4>
                                <p className="text-secondary/60 text-lg leading-relaxed font-light mb-10">
                                    {service.description}
                                </p>
                            </div>
                            <div className="space-y-6">
                                <div className="h-[1px] w-full bg-slate-100"></div>
                                <div className="flex flex-wrap gap-3">
                                    {service.features.map((f) => (
                                        <span key={f} className="text-[10px] font-bold uppercase tracking-widest text-secondary/40 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                                            {f}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
