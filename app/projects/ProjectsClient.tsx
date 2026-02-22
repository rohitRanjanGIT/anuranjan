"use client";

import { useState } from "react";
import { projects, siteConfig } from "@/lib/data/data";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer, scaleUp } from "@/lib/animations";
import Hero from "../components/Hero";

const categories = ["All Projects", "Corporate", "Residential", "Villa", "Industrial"];

export default function ProjectsClient() {
    const [activeCategory, setActiveCategory] = useState("All Projects");
    const { hero, intro } = siteConfig.projectsStrings;

    const filteredProjects = activeCategory === "All Projects"
        ? projects
        : projects.filter(p => p.category === activeCategory);

    return (
        <>
            <Hero
                title={hero.title}
                subtitle={hero.subtitle}
                description={hero.description}
                backgroundImage="https://lh3.googleusercontent.com/aida-public/AB6AXuBrt6ecFPhx3KgvYYBTZggjRaaVfWIfMFET6jmOUFb7rNVzLa_lT5ar04_whoCO4rXJFD2I-beeIde2x3UW7nJPU13Fw7bvZJ14nXOR6UKJNHJ3jfAzr4FJv1VoP5yinmBUnccIrkNOgoD9s_GBhzPseW23WWPRIF-kEUOIE8fvG8DLdyrDll2UPY1ZJlwNWL-LvLnbODDpWElKEte_7d3HOgquPVR5l4U_jDIkhCOAUNz1BRP5Uyu16s2fC42zAsXdNkwdcy22n2UA"
            />

            <section className="py-24 md:py-32">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false }}
                        className="flex flex-col items-center mb-16 md:mb-20 text-center"
                    >
                        <span className="eyebrow mb-4">{intro.eyebrow}</span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-secondary tracking-tight mb-6">{intro.title}</h2>
                        <p className="text-secondary/60 max-w-2xl text-lg font-light leading-relaxed">
                            {intro.description}
                        </p>
                    </motion.div>

                    {/* Filter Section */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false }}
                        className="flex flex-wrap justify-center gap-3 mb-16"
                    >
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 active:scale-95 ${activeCategory === cat
                                    ? "bg-secondary text-white shadow-md scale-105"
                                    : "bg-slate-100 text-secondary/60 hover:bg-slate-200"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </motion.div>

                    {/* Projects Grid */}
                    <motion.div
                        layout
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project) => (
                                <motion.div
                                    layout
                                    key={project.id}
                                    variants={scaleUp}
                                    initial="hidden"
                                    animate="visible"
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="group cursor-pointer"
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] md:rounded-3xl mb-8 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                                        <img
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            alt={project.title}
                                            src={project.fullImage}
                                        />
                                        <div className="absolute inset-0 bg-secondary/20 group-hover:bg-secondary/10 transition-colors duration-500"></div>
                                        <div className="absolute top-6 left-6">
                                            <span className="bg-white/95 backdrop-blur-md text-secondary text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-sm">
                                                {project.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="space-y-3 px-2">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-2xl font-bold text-secondary group-hover:text-primary transition-colors duration-300 tracking-tight">
                                                    {project.title}
                                                </h3>
                                                <p className="eyebrow text-[10px] mt-1">
                                                    {project.type}
                                                </p>
                                            </div>
                                            <div className="w-12 h-12 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-full group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1">
                                                <span className="material-symbols-outlined text-xl">north_east</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-24 md:py-32 bg-secondary text-white">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 text-center md:text-left">
                        {[
                            { label: "Projects Completed", value: `${siteConfig.projectsCompleted}+` },
                            { label: "Design Awards", value: "80+" },
                            { label: "Active Ventures", value: "15+" },
                            { label: "Success Rate", value: "99%" }
                        ].map((stat, idx) => (
                            <div key={idx} className="space-y-4">
                                <p className="text-4xl md:text-6xl font-extrabold tracking-tighter text-primary">
                                    {stat.value}
                                </p>
                                <p className="eyebrow text-white/40">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
