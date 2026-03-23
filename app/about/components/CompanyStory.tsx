"use client";

import { motion } from "framer-motion";
import { fadeUp, slideInLeft } from "@/lib/animations";
import { siteConfig } from "@/lib/data/data";

export default function CompanyStory() {
    const { story } = siteConfig.aboutStrings;

    return (
        <section className="py-24 md:py-32 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-10"
                    >
                        <div className="space-y-4">
                            <span className="eyebrow flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-primary" />
                                {story.eyebrow}
                            </span>
                            <h2 className="text-4xl lg:text-6xl font-extrabold text-secondary tracking-tight leading-tight">
                                {story.title}{" "}
                                <span className="text-primary italic font-light">{story.highlightedTitle}</span>
                            </h2>
                        </div>
                        <p className="text-secondary/70 text-lg md:text-xl leading-relaxed font-light">
                            {story.p1}
                        </p>

                        {/* Quote */}
                        <div className="relative">
                            <span className="absolute -top-4 -left-2 text-primary/10 text-[6rem] font-serif leading-none select-none">&ldquo;</span>
                            <p className="relative text-secondary/80 text-lg leading-relaxed font-medium border-l-4 border-primary pl-8 italic bg-slate-50 py-6 pr-6 rounded-r-2xl">
                                {story.quote}
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-16 pt-4">
                            {[
                                { value: `${siteConfig.experienceYears}+`, label: "Years Experience" },
                                { value: `${siteConfig.projectsCompleted}+`, label: "Projects Completed" },
                            ].map((stat) => (
                                <div key={stat.label} className="space-y-1">
                                    <span className="text-5xl font-extrabold text-secondary tracking-tighter">
                                        {stat.value}
                                    </span>
                                    <p className="eyebrow text-secondary/40">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        variants={slideInLeft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl group">
                            <img
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                alt="Large scale construction site"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcn9dvOUwYnh_ZVdrFj11kFr7WJ5x67rFaIcz2zjij2BEAU4heNTBB5pjLPLs2KMcJcqgGAowLvaMXA3bFQE0t4gSRZRWW2tv110FQMlBk2EGVqsoe4B_PWL3KiJe3hG0kGqiVYdmuDldHb001u6h-lvleZ32bFqNEUMB9esIPnVmu7IrT8nhTkv7hOHS8hcVlUeo2S2qHLHgGDWrSVDZAd9FVA7xzwPENFJ-L1RqKMiikHEbYUMKt5uMhIMC9i7qfEvTZPv90cAsc"
                            />
                        </div>
                        {/* Decorative accents */}
                        <div className="absolute -z-10 -bottom-6 -right-6 w-2/3 h-2/3 border-2 border-primary/15 rounded-[2.5rem]" />
                        <div className="absolute -z-10 -top-6 -left-6 w-1/2 h-1/2 bg-slate-50 rounded-[2.5rem]" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
