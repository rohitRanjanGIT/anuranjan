"use client";

import { useState } from "react";
import { projects, siteConfig } from "@/lib/data/data";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer, scaleUp } from "@/lib/animations";
import Hero from "../components/Hero";  // Original Hero component

// ─── Types & Config ────────────────────────────────────────────────────────────

const CATEGORIES = [
    { id: "All", label: "All Projects", icon: "grid_view" },
    { id: "Commercial", label: "Commercial", icon: "business" },
    { id: "Residential", label: "Residential", icon: "home_work" },
    { id: "Villa", label: "Villa", icon: "villa" },
    { id: "Interior", label: "Interior", icon: "chair" },
    { id: "Industrial", label: "Industrial", icon: "factory" },
];

const STATS = [
    { value: `${siteConfig.projectsCompleted}+`, label: "Projects Completed" },
    { value: "80+", label: "Design Awards" },
    { value: "15+", label: "Active Ventures" },
    { value: "99%", label: "Success Rate" },
];

// ─── Project Card (Text always visible) ──────────────────────────────────────────

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
    const isOngoing = project.status === "ongoing";

    return (
        <motion.article
            layout
            key={project.id}
            variants={scaleUp}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            className="group cursor-pointer"
        >
            {/* Image container with overlay text */}
            <div className="relative overflow-hidden rounded-2xl shadow-sm group-hover:shadow-md transition-shadow duration-500">
                <div className={`absolute inset-0 ${index % 3 === 0 ? "aspect-[16/10]" : "aspect-[4/3]"}`} />
                <img
                    className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${index % 3 === 0 ? "aspect-[16/10]" : "aspect-[4/3]"}`}
                    alt={project.title}
                    src={project.fullImage}
                />

                {/* Permanent dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/30 to-transparent opacity-60" />

                {/* Badges (always visible) */}
                <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                    <span className="bg-white/95 backdrop-blur-md text-secondary text-[10px] font-bold uppercase tracking-[0.18em] px-3.5 py-1.5 rounded-full shadow-sm">
                        {project.category}
                    </span>
                    {isOngoing && (
                        <span className="bg-primary text-white text-[10px] font-bold uppercase tracking-[0.18em] px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            Ongoing
                        </span>
                    )}
                </div>

                {/* Arrow icon on hover */}
                <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
                    <span className="material-symbols-outlined text-secondary text-base">north_east</span>
                </div>

                {/* Text overlay (bottom) – always visible */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                    <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                            <h3 className="text-xl font-bold text-white drop-shadow-md truncate">
                                {project.title}
                            </h3>
                            <p className="text-[11px] uppercase tracking-[0.2em] text-white/70 font-semibold mt-1">
                                {project.type}
                            </p>
                        </div>
                        {project.year && (
                            <span className="text-xs text-white/50 font-mono shrink-0 mt-1">{project.year}</span>
                        )}
                    </div>
                </div>
            </div>

            {/* No separate text below image */}
        </motion.article>
    );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function ProjectsClient() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [activeStatus, setActiveStatus] = useState<"all" | "completed" | "ongoing">("all");
    const { hero, intro } = siteConfig.projectsStrings;

    const filtered = projects.filter((p) => {
        const catMatch = activeCategory === "All" || p.category === activeCategory;
        const statusMatch =
            activeStatus === "all" ||
            (activeStatus === "ongoing" && p.status === "ongoing") ||
            (activeStatus === "completed" && p.status !== "ongoing");
        return catMatch && statusMatch;
    });

    const ongoingCount = projects.filter((p) => p.status === "ongoing").length;
    const completedCount = projects.filter((p) => p.status !== "ongoing").length;

    return (
        <>
            {/* Original Hero Component */}
            <Hero
                title={hero.title}
                subtitle={hero.subtitle}
                description={hero.description}
                backgroundImage="https://lh3.googleusercontent.com/aida-public/AB6AXuBrt6ecFPhx3KgvYYBTZggjRaaVfWIfMFET6jmOUFb7rNVzLa_lT5ar04_whoCO4rXJFD2I-beeIde2x3UW7nJPU13Fw7bvZJ14nXOR6UKJNHJ3jfAzr4FJv1VoP5yinmBUnccIrkNOgoD9s_GBhzPseW23WWPRIF-kEUOIE8fvG8DLdyrDll2UPY1ZJlwNWL-LvLnbODDpWElKEte_7d3HOgquPVR5l4U_jDIkhCOAUNz1BRP5Uyu16s2fC42zAsXdNkwdcy22n2UA"
            />

            <section className="py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                    {/* Header */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-24 mb-12 md:mb-14"
                    >
                        <div className="space-y-4 lg:max-w-xl shrink-0">
                            <span className="eyebrow flex items-center gap-3">
                                <span className="w-7 h-px bg-primary" />
                                {intro.eyebrow}
                            </span>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-secondary tracking-tight leading-tight">
                                {intro.title}
                            </h2>
                        </div>
                        <p className="text-secondary/55 text-lg font-light leading-relaxed lg:pb-1 lg:max-w-md">
                            {intro.description}
                        </p>
                    </motion.div>

                    {/* Filters */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-col gap-4 mb-8 md:mb-10"
                    >
                        {/* Status toggle */}
                        <div className="flex items-center gap-2">
                            {(["all", "completed", "ongoing"] as const).map((s) => {
                                const label = s === "all" ? `All (${projects.length})` : s === "completed" ? `Completed (${completedCount})` : `Ongoing (${ongoingCount})`;
                                return (
                                    <button
                                        key={s}
                                        onClick={() => setActiveStatus(s)}
                                        className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-200 ${activeStatus === s
                                            ? "bg-secondary text-white"
                                            : "bg-slate-100 text-secondary/50 hover:bg-slate-200 hover:text-secondary/70"
                                            }`}
                                    >
                                        {s === "ongoing" && activeStatus === s && (
                                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mr-1.5 animate-pulse" />
                                        )}
                                        {label}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Category filter — horizontally scrollable on mobile */}
                        <div className="flex gap-2 overflow-x-auto pb-1 -mx-6 px-6 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-none" style={{ scrollbarWidth: "none" }}>
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 shrink-0 active:scale-95 ${activeCategory === cat.id
                                        ? "bg-primary text-white shadow-sm"
                                        : "bg-slate-50 border border-slate-200 text-secondary/60 hover:border-slate-300 hover:text-secondary/80"
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-[1rem]">{cat.icon}</span>
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Result count */}
                    <motion.p
                        layout
                        className="text-xs text-secondary/35 font-mono uppercase tracking-[0.18em] mb-6"
                    >
                        {filtered.length} project{filtered.length !== 1 ? "s" : ""}
                    </motion.p>

                    {/* Grid */}
                    <motion.div
                        layout
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 md:gap-y-12"
                    >
                        <AnimatePresence mode="popLayout">
                            {filtered.length > 0 ? (
                                filtered.map((project, i) => (
                                    <ProjectCard key={project.id} project={project} index={i} />
                                ))
                            ) : (
                                <motion.div
                                    key="empty"
                                    variants={fadeUp}
                                    initial="hidden"
                                    animate="visible"
                                    exit={{ opacity: 0 }}
                                    className="col-span-full flex flex-col items-center justify-center py-24 text-center gap-4"
                                >
                                    <span className="material-symbols-outlined text-5xl text-secondary/15">search_off</span>
                                    <p className="text-secondary/30 font-light">No projects in this category yet.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                </div>
            </section>

            {/* Stats section – hidden for now, can be enabled later */}
            {/* <StatsSection stats={STATS} /> */}
        </>
    );
}