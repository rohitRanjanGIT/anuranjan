"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "@/lib/data/data";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer, scaleUp } from "@/lib/animations";
import Hero from "../components/Hero";

// ─── Types & Config ────────────────────────────────────────────────────────────

interface Category {
    id: number
    name: string
}

interface ProjectType {
    id: number
    title: string
    description: string | null
    category: { name: string }
    categoryId: number
    type: string
    image: string
    images: { id: number; src: string }[]
    location: string | null
    status: string
    year: string | null
    homepagePortfolio: boolean
}

function ProjectCard({ project }: { project: ProjectType }) {
    const isOngoing = project.status === "ONGOING";

    // Grab up to 4 images for the gallery, falling back to the main image
    const galleryImages = project.images && project.images.length > 0
        ? project.images.slice(0, 4).map((img) => img.src)
        : [project.image];

    return (
        <motion.article
            layout
            key={project.id}
            variants={scaleUp}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            className="group cursor-pointer bg-slate-50 relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
        >
            <div className="relative overflow-hidden aspect-[4/3] rounded-t-3xl border-b-0">

                {/* 
                  DAISY UI HOVER GALLERY 
                  Takes up the full width/height. Retains the scale-105 hover effect.
                */}
                <figure className="hover-gallery w-full h-full m-0 transition-transform duration-700 ease-out group-hover:scale-105 bg-slate-200">
                    {galleryImages.map((imgSrc, i) => (
                        <img
                            key={i}
                            className="w-full h-full object-cover"
                            alt={`${project.title} preview ${i + 1}`}
                            src={imgSrc}
                        />
                    ))}
                </figure>

                {/* 
                  IMPORTANT: Added 'pointer-events-none' to overlays!
                  Without this, the gradient block the mouse from touching the hover-gallery.
                */}
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/20 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90 pointer-events-none" />

                {/* Badges - pointer-events-none */}
                <div className="absolute top-5 left-5 flex items-center gap-2 z-10 pointer-events-none">
                    <span className="bg-white/95 backdrop-blur-md text-secondary text-[9px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 shadow-sm rounded-full">
                        {project.category.name}
                    </span>
                    {isOngoing && (
                        <span className="bg-primary text-white text-[9px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 flex items-center gap-1.5 shadow-sm rounded-full">
                            <span className="w-1.5 h-1.5 bg-white animate-pulse" />
                            Ongoing
                        </span>
                    )}
                </div>

                {/* Arrow icon on hover - pointer-events-none */}
                <div className="absolute top-5 right-5 w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100 z-10 rounded-xl pointer-events-none">
                    <span className="material-symbols-outlined text-white text-lg font-light">north_east</span>
                </div>

                {/* Text overlay (bottom) - pointer-events-none */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 transition-transform duration-500 group-hover:-translate-y-1 pointer-events-none">
                    <div className="flex items-end justify-between gap-4">
                        <div className="min-w-0">
                            <p className="text-[10px] uppercase tracking-[0.25em] text-white/70 font-medium mb-2">
                                {project.type}
                            </p>
                            <h3 className="text-2xl font-medium text-white tracking-wide truncate">
                                {project.title}
                            </h3>
                        </div>
                        {project.year && (
                            <span className="text-xs text-white/50 font-mono tracking-widest shrink-0">
                                {project.year}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </motion.article>
    );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function ProjectsClient() {
    const [projects, setProjects] = useState<ProjectType[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All");
    const [activeStatus, setActiveStatus] = useState<"all" | "completed" | "ongoing">("all");
    const { hero, intro } = siteConfig.projectsStrings;

    useEffect(() => {
        Promise.all([
            fetch("/api/projects").then((r) => r.json()),
            fetch("/api/categories").then((r) => r.json()),
        ])
            .then(([projectsData, categoriesData]) => {
                setProjects(Array.isArray(projectsData) ? projectsData : []);
                setCategories(Array.isArray(categoriesData) ? categoriesData : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const filtered = projects.filter((p) => {
        const catMatch = activeCategory === "All" || p.category.name === activeCategory;
        const statusMatch =
            activeStatus === "all" ||
            (activeStatus === "ongoing" && p.status === "ONGOING") ||
            (activeStatus === "completed" && p.status === "COMPLETED");
        return catMatch && statusMatch;
    });

    const ongoingCount = projects.filter((p) => p.status === "ONGOING").length;
    const completedCount = projects.filter((p) => p.status === "COMPLETED").length;

    const CATEGORIES = [
        { id: "All", label: "All Projects", icon: "grid_view" },
        ...categories.map((c) => ({ id: c.name, label: c.name, icon: "category" })),
    ];

    return (
        <div className="bg-white min-h-screen">
            <Hero
                title={hero.title}
                subtitle={hero.subtitle}
                description={hero.description}
                backgroundImage="https://lh3.googleusercontent.com/aida-public/AB6AXuBrt6ecFPhx3KgvYYBTZggjRaaVfWIfMFET6jmOUFb7rNVzLa_lT5ar04_whoCO4rXJFD2I-beeIde2x3UW7nJPU13Fw7bvZJ14nXOR6UKJNHJ3jfAzr4FJv1VoP5yinmBUnccIrkNOgoD9s_GBhzPseW23WWPRIF-kEUOIE8fvG8DLdyrDll2UPY1ZJlwNWL-LvLnbODDpWElKEte_7d3HOgquPVR5l4U_jDIkhCOAUNz1BRP5Uyu16s2fC42zAsXdNkwdcy22n2UA"
            />

            <section className="py-20 md:py-28">
                <div className="max-w-[85rem] mx-auto px-6 sm:px-8 lg:px-12">

                    {/* Header Section */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-8 pb-10 border-b border-slate-200"
                    >
                        <div className="space-y-4 max-w-2xl">
                            <span className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
                                <span className="w-8 h-[2px] bg-primary" />
                                {intro.eyebrow}
                            </span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-secondary tracking-tight">
                                {intro.title}
                            </h2>
                        </div>
                        <p className="text-secondary/60 text-base md:text-lg font-light leading-relaxed max-w-md lg:text-right">
                            {intro.description}
                        </p>
                    </motion.div>

                    {/* Filters Section */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-col items-start lg:items-end gap-1 py-10"
                    >
                        <div className="flex gap-4 overflow-x-auto w-full lg:w-auto py-4 px-2 -mx-2 scrollbar-none" style={{ scrollbarWidth: "none" }}>
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`flex items-center gap-2 px-5 py-2 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 rounded-full border ${activeCategory === cat.id
                                        ? "bg-secondary text-white border-secondary shadow-lg scale-105"
                                        : "bg-white text-secondary/50 border-slate-200 hover:border-slate-300 hover:text-secondary/80"
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-[1.1rem] font-light hidden sm:inline-block">
                                        {cat.icon}
                                    </span>
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        <div className="flex overflow-x-auto w-full lg:w-auto py-2 px-2 -mx-2 scrollbar-none" style={{ scrollbarWidth: "none" }}>
                            <div className="flex bg-slate-50 border border-slate-200 p-1.5 shrink-0 rounded-full shadow-inner max-w-full">
                                {(["all", "completed", "ongoing"] as const).map((s) => {
                                    const label = s === "all" ? `All (${projects.length})` : s === "completed" ? `Completed (${completedCount})` : `Ongoing (${ongoingCount})`;
                                    return (
                                        <button
                                            key={s}
                                            onClick={() => setActiveStatus(s)}
                                            className={`px-5 py-2 text-[10px] whitespace-nowrap font-bold uppercase tracking-[0.2em] transition-all duration-300 rounded-full ${activeStatus === s
                                                ? "bg-secondary text-white shadow-md scale-[1.02]"
                                                : "text-secondary/50 hover:text-secondary/80 hover:bg-slate-200/50"
                                                }`}
                                        >
                                            <div className="flex items-center gap-2">
                                                {s === "ongoing" && activeStatus === s && (
                                                    <span className="w-1.5 h-1.5 bg-primary animate-pulse rounded-full" />
                                                )}
                                                {label}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>

                    {/* Result Info */}
                    <motion.div layout className="mb-6 flex items-center justify-between">
                        <p className="text-[10px] text-secondary/40 font-mono uppercase tracking-[0.2em]">
                            Showing {filtered.length} project{filtered.length !== 1 ? "s" : ""}
                        </p>
                    </motion.div>

                    {/* Uniform Grid */}
                    {loading ? (
                        <div className="flex justify-center py-32">
                            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : (
                    <motion.div
                        layout
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <AnimatePresence mode="popLayout">
                            {filtered.length > 0 ? (
                                filtered.map((project) => (
                                    <ProjectCard key={project.id} project={project} />
                                ))
                            ) : (
                                <motion.div
                                    key="empty"
                                    variants={fadeUp}
                                    initial="hidden"
                                    animate="visible"
                                    exit={{ opacity: 0 }}
                                    className="col-span-full flex flex-col items-center justify-center py-32 border border-dashed border-slate-200 bg-slate-50 rounded-3xl text-center gap-4"
                                >
                                    <span className="material-symbols-outlined text-4xl text-secondary/20 font-light">
                                        architecture
                                    </span>
                                    <p className="text-secondary/40 text-sm font-medium tracking-wide uppercase">
                                        No projects match your criteria
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                    )}

                </div>
            </section>
        </div>
    );
}