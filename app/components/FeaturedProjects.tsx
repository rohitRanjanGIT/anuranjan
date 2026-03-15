"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { projects, siteConfig } from "@/lib/data/data";
import Link from "next/link";
import { ParticleCard } from "./MagicBento";

export default function FeaturedProjects() {
    const { portfolio } = siteConfig.homeStrings;

    return (
        <section className="py-24 md:py-32 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 space-y-4">
                    <span className="eyebrow block">{portfolio.eyebrow}</span>
                    <h3 className="text-4xl lg:text-5xl font-extrabold text-secondary tracking-tight">{portfolio.title}</h3>
                    <p className="text-secondary/60 text-lg font-light">{portfolio.description}</p>
                </div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
                >
                    {projects.slice(0, 3).map((project, idx) => (
                        <motion.div
                            key={project.id}
                            variants={fadeUp}
                            className="cursor-pointer"
                        >
                            <ParticleCard
                                className="relative aspect-[4/5] overflow-hidden rounded-[2rem] md:rounded-[2.5rem] mb-8 shadow-sm group hover:shadow-xl transition-all duration-500"
                                glowColor="211, 49, 49"
                                particleCount={20}
                                enableTilt={true}
                                clickEffect={true}
                            >
                                <img
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    src={project.image}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                                <div className="absolute bottom-8 left-8 right-8 text-white z-10">
                                    <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-primary mb-2 block">{project.category}</span>
                                    <h5 className="text-2xl font-bold tracking-tight">{project.title}</h5>
                                </div>
                            </ParticleCard>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="mt-16 md:mt-20 text-center">
                    <Link href="/projects" className="inline-flex items-center gap-4 text-secondary font-extrabold text-lg group hover:text-primary transition-colors">
                        {portfolio.buttonText}
                        <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all transform group-hover:translate-x-3 duration-300 shadow-sm">
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
