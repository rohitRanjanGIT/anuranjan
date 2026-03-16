"use client";

import { motion } from "framer-motion";
import { fadeUp, slideInLeft } from "@/lib/animations";
import { siteConfig } from "@/lib/data/data";
import MagicBento from "./MagicBento";

export default function Overview() {
    const { overview } = siteConfig.homeStrings;

    return (
        <section className="py-20 md:py-28 bg-white">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Image Column */}
                    <motion.div
                        variants={slideInLeft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="relative"
                    >
                        <div className="overflow-hidden rounded-2xl shadow-md">
                            <img
                                alt="Architectural excellence"
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2y0k_xBQKkrn3o9gUO8ggpjGEmPYlARFX5st2lgx2dGPG3vRkU0i9vsJmX0Y9bcSXLs8mMdXAy1wljrgRZT-4o1uSdj60cLq4qTawiPMaU3ArdIU0pbTv3h7VM66Urpl0D1P4nXEVqOIzaT-hVRIYz7iVTdSoEPWvHiYCBXc0VCwb57ND4rl2CoVIeIFJNjv72JnSFnORI6r9jY3l3i8FNY_R10b9Ivth2Y6UV0YFA67WSJQYP7tDMZMvfYJAlvfas5ikwUdhixfq"
                            />
                        </div>
                        {/* Minimal stat below image */}
                        <div className="mt-4 flex items-center gap-3 text-secondary/70">
                            <span className="text-3xl font-bold text-primary">
                                {siteConfig.experienceYears}+
                            </span>
                            <span className="text-sm uppercase tracking-wider">
                                {overview.yearsLabel}
                            </span>
                        </div>
                    </motion.div>

                    {/* Text Column */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="space-y-8"
                    >
                        <div className="space-y-3">
                            <span className="text-sm font-medium text-primary uppercase tracking-widest flex items-center gap-3">
                                <span className="w-8 h-px bg-primary" />
                                {overview.eyebrow}
                            </span>
                            <h3 className="text-3xl md:text-4xl font-bold text-secondary leading-tight">
                                {overview.title}{" "}
                                <span className="text-primary italic font-light">
                                    {overview.highlightedTitle}
                                </span>
                            </h3>
                        </div>

                        <p className="text-secondary/70 text-lg leading-relaxed">
                            {overview.description}
                        </p>

                        {/* Minimal MagicBento Cards - Hidden on mobile */}
                        <MagicBento
                            cards={[
                                {
                                    title: "Our Mission",
                                    description:
                                        "Quality-driven sustainable building solutions.",
                                    icon: "shutter_speed",
                                    label: "Commitment",
                                    color: "#ffffff",
                                    className:
                                        "border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow",
                                    titleClassName:
                                        "text-xl font-semibold text-secondary mb-2",
                                    descriptionClassName:
                                        "text-sm text-secondary/70 leading-relaxed",
                                    textAutoHide: false,
                                },
                                {
                                    title: "Our Vision",
                                    description:
                                        "To be the industry leader in infrastructure innovation.",
                                    icon: "visibility",
                                    label: "Future",
                                    color: "#ffffff",
                                    className:
                                        "border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow",
                                    titleClassName:
                                        "text-xl font-semibold text-secondary mb-2",
                                    descriptionClassName:
                                        "text-sm text-secondary/70 leading-relaxed",
                                    textAutoHide: false,
                                },
                            ]}
                            enableStars={false}
                            enableSpotlight={false}
                            enableBorderGlow={false}
                            className="!p-0 !max-w-none max-sm:hidden"
                            gridCols="grid-cols-1 sm:grid-cols-2 gap-4"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}