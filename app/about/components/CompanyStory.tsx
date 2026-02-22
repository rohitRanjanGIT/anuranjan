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
                        viewport={{ once: false }}
                        className="space-y-10"
                    >
                        <div className="space-y-4">
                            <span className="eyebrow flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-primary"></span>
                                {story.eyebrow}
                            </span>
                            <h2 className="text-4xl lg:text-6xl font-extrabold text-secondary tracking-tight leading-tight">
                                {story.title} <span className="text-primary italic font-light">{story.highlightedTitle}</span>
                            </h2>
                        </div>
                        <p className="text-secondary/70 text-lg md:text-xl leading-relaxed font-light">
                            {story.p1}
                        </p>
                        <p className="text-secondary/80 text-lg leading-relaxed font-medium border-l-4 border-primary pl-8 italic bg-slate-50 py-6 pr-6 rounded-r-2xl">
                            &quot;{story.quote}&quot;
                        </p>
                        <div className="flex flex-wrap gap-12 pt-6">
                            <div className="space-y-2">
                                <span className="text-5xl font-extrabold text-secondary tracking-tighter">{siteConfig.experienceYears}+</span>
                                <p className="eyebrow text-secondary/40">Years Experience</p>
                            </div>
                            <div className="space-y-2">
                                <span className="text-5xl font-extrabold text-secondary tracking-tighter">{siteConfig.projectsCompleted}+</span>
                                <p className="eyebrow text-secondary/40">Projects Completed</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={slideInLeft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false }}
                        className="relative"
                    >
                        <div className="aspect-square rounded-[3rem] overflow-hidden shadow-xl skew-y-3 hover:skew-y-0 transition-all duration-1000 group">
                            <img
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                alt="Large scale construction site"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcn9dvOUwYnh_ZVdrFj11kFr7WJ5x67rFaIcz2zjij2BEAU4heNTBB5pjLPLs2KMcJcqgGAowLvaMXA3bFQE0t4gSRZRWW2tv110FQMlBk2EGVqsoe4B_PWL3KiJe3hG0kGqiVYdmuDldHb001u6h-lvleZ32bFqNEUMB9esIPnVmu7IrT8nhTkv7hOHS8hcVlUeo2S2qHLHgGDWrSVDZAd9FVA7xzwPENFJ-L1RqKMiikHEbYUMKt5uMhIMC9i7qfEvTZPv90cAsc"
                            />
                        </div>
                        <div className="absolute -z-10 -top-10 -left-10 w-full h-full bg-slate-50 rounded-[3rem]"></div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
