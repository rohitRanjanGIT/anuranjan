"use client";

import Hero from "../components/Hero";
import { services, siteConfig } from "@/lib/data/data";
import { motion } from "framer-motion";
import { fadeUp, slideInLeft } from "@/lib/animations";

export default function ServicesClient() {
    const { hero, cta } = siteConfig.servicesStrings;

    return (
        <>
            <Hero
                title={hero.title}
                subtitle={hero.subtitle}
                description={hero.description}
                backgroundImage="https://lh3.googleusercontent.com/aida-public/AB6AXuBpLKKarMBFmYQuJXVVzIxlf4jHZwjuBmUWnhuJ6Whw1YDuD9eCGvp0jyeqyyVMGe_qwCoXtuJzTEBjIOo0hpWnr9qWmCQNAxdkZuv3ViT8n-DYw_34TE8h01AnkPoAb0-hri3qP_ll4_e2uPVx6LT9zNN1eJju4Yq7oWmdiX9OYvcSKBcZQgt12s9PKTWuEMl8YRntB0-u3Dyf-SYZeVkL1PtHpw_hwWvlASkyb51Q2fMZpHou7xHH1-x-b2ukHu6EtopRU4PKmmxK"
            />

            <section className="py-24 md:py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="grid grid-cols-1 gap-24 md:gap-32">
                        {services.map((service, idx) => (
                            <div
                                key={service.id}
                                id={service.id}
                                className={`flex flex-col ${idx % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-16 items-center`}
                            >
                                <motion.div
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: false }}
                                    className="lg:w-1/2 space-y-8"
                                >
                                    <div className="space-y-4">
                                        <span className="eyebrow flex items-center gap-3">
                                            <span className="w-8 h-[1px] bg-primary"></span>
                                            0{idx + 1} / Service
                                        </span>
                                        <h3 className="text-4xl lg:text-5xl font-extrabold text-secondary tracking-tight leading-tight">
                                            {service.title}
                                        </h3>
                                    </div>
                                    <p className="text-secondary/60 text-lg md:text-xl leading-relaxed font-light">
                                        {service.description}
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                                        {service.features.map((feature) => (
                                            <div key={feature} className="flex items-center gap-4 group">
                                                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300 shadow-sm">
                                                    <span className="material-symbols-outlined text-xl">check</span>
                                                </div>
                                                <span className="text-secondary/80 font-bold">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="pt-6">
                                        <button className="bg-secondary hover:bg-primary text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-md active:scale-95 flex items-center gap-3">
                                            Inquire About Service <span className="material-symbols-outlined text-sm">mail</span>
                                        </button>
                                    </div>
                                </motion.div>

                                <motion.div
                                    variants={slideInLeft}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: false }}
                                    className="lg:w-1/2 relative"
                                >
                                    <div className="aspect-[4/3] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-xl">
                                        <img
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnE95sN6O_N8e38m6K0W0b-34z5u0jS6-6g4t7W2B0oI3zN_sX-19F-X3_G"
                                            alt={service.title}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                                        />
                                    </div>
                                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl z-0"></div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                    className="max-w-5xl mx-auto px-6 text-center space-y-12 relative z-10"
                >
                    <h2 className="text-4xl lg:text-7xl font-extrabold text-secondary tracking-tighter leading-tight">
                        {cta.title} <span className="text-primary italic font-light">{cta.highlightedWord}</span>
                    </h2>
                    <p className="text-lg md:text-xl text-secondary/60 font-light max-w-2xl mx-auto">
                        {cta.description}
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 pt-6">
                        <button className="bg-primary hover:bg-secondary text-white px-12 py-5 rounded-full font-bold text-xl transition-all shadow-md active:scale-95">
                            {cta.primaryButton}
                        </button>
                        <button className="bg-white hover:bg-slate-100 text-secondary border border-slate-200 px-12 py-5 rounded-full font-bold text-xl transition-all shadow-sm active:scale-95">
                            {cta.secondaryButton}
                        </button>
                    </div>
                </motion.div>
            </section>
        </>
    );
}
