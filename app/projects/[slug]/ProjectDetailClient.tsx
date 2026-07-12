"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer, scaleUp } from "@/lib/animations";
import { projectHref } from "@/lib/utils";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface GalleryImage {
    id: number;
    src: string;
    title: string;
}

interface Project {
    id: number;
    title: string;
    description: string | null;
    content: string | null;
    type: string;
    status: string;
    year: string | null;
    location: string | null;
    image: string;
    category: { id: number; name: string };
    images: GalleryImage[];
}

interface RelatedProject {
    id: number;
    title: string;
    image: string;
    year: string | null;
    category: { name: string };
}

// ─── Detail Row ──────────────────────────────────────────────────────────────────

function DetailRow({ icon, label, value }: { icon: string; label: string; value: string }) {
    return (
        <div className="flex items-start gap-4 py-4 border-b border-slate-100 last:border-0">
            <span className="material-symbols-outlined text-primary text-xl mt-0.5 shrink-0">{icon}</span>
            <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.22em] text-secondary/40 font-bold mb-1">{label}</p>
                <p className="text-secondary font-medium break-words">{value}</p>
            </div>
        </div>
    );
}

// ─── Lightbox ────────────────────────────────────────────────────────────────────

function Lightbox({
    images,
    index,
    onClose,
    onNav,
}: {
    images: string[];
    index: number;
    onClose: () => void;
    onNav: (dir: 1 | -1) => void;
}) {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") onNav(1);
            if (e.key === "ArrowLeft") onNav(-1);
        };
        window.addEventListener("keydown", handler);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", handler);
            document.body.style.overflow = "";
        };
    }, [onClose, onNav]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
            onClick={onClose}
        >
            <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
                <span className="material-symbols-outlined">close</span>
            </button>

            <button
                onClick={(e) => { e.stopPropagation(); onNav(-1); }}
                aria-label="Previous image"
                className="absolute left-4 md:left-8 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors active:scale-90"
            >
                <span className="material-symbols-outlined text-2xl">chevron_left</span>
            </button>

            <AnimatePresence mode="wait">
                <motion.img
                    key={index}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    src={images[index]}
                    alt={`Gallery image ${index + 1}`}
                    className="max-h-full max-w-full object-contain rounded-lg select-none"
                    onClick={(e) => e.stopPropagation()}
                />
            </AnimatePresence>

            <button
                onClick={(e) => { e.stopPropagation(); onNav(1); }}
                aria-label="Next image"
                className="absolute right-4 md:right-8 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors active:scale-90"
            >
                <span className="material-symbols-outlined text-2xl">chevron_right</span>
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs font-mono tracking-[0.2em] tabular-nums">
                {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </div>
        </motion.div>
    );
}

// ─── Main ────────────────────────────────────────────────────────────────────────

export default function ProjectDetailClient({
    project,
    related,
}: {
    project: Project;
    related: RelatedProject[];
}) {
    const isOngoing = project.status === "ONGOING";

    // Gallery = attached images, falling back to the main thumbnail.
    const gallery = project.images.length > 0
        ? project.images.map((img) => img.src)
        : [project.image];

    const [lightbox, setLightbox] = useState<number | null>(null);

    const navLightbox = useCallback((dir: 1 | -1) => {
        setLightbox((prev) => {
            if (prev === null) return prev;
            return (prev + dir + gallery.length) % gallery.length;
        });
    }, [gallery.length]);

    return (
        <div className="bg-white">
            {/* ─── Hero ─────────────────────────────────────────────── */}
            <section className="relative h-[70vh] min-h-[480px] flex flex-col justify-end overflow-hidden bg-secondary">
                <div className="absolute inset-0 z-0">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover scale-105 animate-subtle-zoom opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-transparent" />
                </div>

                <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full pb-14 md:pb-20 pt-28 text-white">
                    <motion.nav
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="flex items-center gap-2 text-xs text-white/60 mb-6"
                    >
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                        <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                        <span className="text-white/90 truncate max-w-[50vw]">{project.title}</span>
                    </motion.nav>

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.1 }}
                        className="flex items-center gap-3 mb-5"
                    >
                        <span className="bg-white/95 text-secondary text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
                            {project.category.name}
                        </span>
                        <span className={`text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full flex items-center gap-1.5 ${isOngoing ? "bg-primary text-white" : "bg-white/10 text-white border border-white/25"}`}>
                            {isOngoing && <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />}
                            {isOngoing ? "Ongoing" : "Completed"}
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.18 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] max-w-4xl"
                    >
                        {project.title}
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.26 }}
                        className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-white/70 text-sm font-light"
                    >
                        {project.location && (
                            <span className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-base text-primary">location_on</span>
                                {project.location}
                            </span>
                        )}
                        {project.year && (
                            <span className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-base text-primary">calendar_today</span>
                                {project.year}
                            </span>
                        )}
                        <span className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-base text-primary">architecture</span>
                            {project.type}
                        </span>
                    </motion.p>
                </div>
            </section>

            {/* ─── Body ─────────────────────────────────────────────── */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">

                        {/* Overview */}
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="lg:col-span-2 space-y-6"
                        >
                            <span className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
                                <span className="w-8 h-[2px] bg-primary" />
                                Project Overview
                            </span>
                            <h2 className="text-3xl md:text-4xl font-semibold text-secondary tracking-tight">
                                About this project
                            </h2>
                            {/* Short description acts as the lead / summary */}
                            {project.description?.trim() && (
                                <p className="text-secondary/80 text-xl font-light leading-relaxed">
                                    {project.description}
                                </p>
                            )}
                            {/* Long-form content dedicated to this page */}
                            <div className="prose prose-slate max-w-none text-secondary/70 text-lg font-light leading-relaxed whitespace-pre-line">
                                {project.content?.trim()
                                    ? project.content
                                    : project.description?.trim()
                                        ? ""
                                        : "Detailed information about this project will be available soon. Get in touch with our team to learn more about the scope, engineering approach and outcomes."}
                            </div>
                        </motion.div>

                        {/* Details sidebar */}
                        <motion.aside
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="lg:col-span-1"
                        >
                            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 lg:sticky lg:top-28">
                                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-secondary mb-2">
                                    Project Details
                                </h3>
                                <div className="mt-4">
                                    <DetailRow icon="category" label="Category" value={project.category.name} />
                                    <DetailRow icon="architecture" label="Type" value={project.type} />
                                    {project.location && <DetailRow icon="location_on" label="Location" value={project.location} />}
                                    {project.year && <DetailRow icon="calendar_today" label="Year" value={project.year} />}
                                    <DetailRow icon="verified" label="Status" value={isOngoing ? "Ongoing" : "Completed"} />
                                </div>

                                <Link
                                    href="/about#contact"
                                    className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white px-6 py-3.5 rounded-full font-semibold text-sm tracking-wide transition-colors duration-300"
                                >
                                    Enquire about this project
                                    <span className="material-symbols-outlined text-base">north_east</span>
                                </Link>
                            </div>
                        </motion.aside>
                    </div>
                </div>
            </section>

            {/* ─── Gallery ──────────────────────────────────────────── */}
            {gallery.length > 0 && (
                <section className="pb-16 md:pb-24">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="mb-10 space-y-3"
                        >
                            <span className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
                                <span className="w-8 h-[2px] bg-primary" />
                                Gallery
                            </span>
                            <h2 className="text-3xl md:text-4xl font-semibold text-secondary tracking-tight">
                                Visual Showcase
                            </h2>
                        </motion.div>

                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-2 md:grid-cols-3 auto-rows-[200px] md:auto-rows-[260px] gap-4"
                        >
                            {gallery.map((src, i) => (
                                <motion.button
                                    key={i}
                                    variants={scaleUp}
                                    onClick={() => setLightbox(i)}
                                    className={`group relative overflow-hidden rounded-2xl bg-slate-100 ${i % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
                                >
                                    <img
                                        src={src}
                                        alt={`${project.title} gallery ${i + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/20 transition-colors duration-300 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-3xl">
                                            zoom_in
                                        </span>
                                    </div>
                                </motion.button>
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* ─── Related ──────────────────────────────────────────── */}
            {related.length > 0 && (
                <section className="pb-24 border-t border-slate-100 pt-16 md:pt-24">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                        <div className="flex items-end justify-between mb-10 gap-4">
                            <div className="space-y-3">
                                <span className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
                                    <span className="w-8 h-[2px] bg-primary" />
                                    Related Work
                                </span>
                                <h2 className="text-3xl md:text-4xl font-semibold text-secondary tracking-tight">
                                    More {project.category.name} projects
                                </h2>
                            </div>
                            <Link href="/projects" className="hidden sm:inline-flex items-center gap-2 text-secondary font-semibold text-sm hover:text-primary transition-colors shrink-0">
                                View all
                                <span className="material-symbols-outlined text-base">arrow_forward</span>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {related.map((r) => (
                                <Link
                                    key={r.id}
                                    href={projectHref(r)}
                                    className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-100 shadow-sm hover:shadow-xl transition-shadow duration-500"
                                >
                                    <img
                                        src={r.image}
                                        alt={r.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/20 to-transparent opacity-80" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                        <p className="text-[10px] uppercase tracking-[0.25em] text-white/70 font-medium mb-1.5">
                                            {r.category.name}
                                        </p>
                                        <h3 className="text-xl font-medium tracking-wide">{r.title}</h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ─── Lightbox ─────────────────────────────────────────── */}
            <AnimatePresence>
                {lightbox !== null && (
                    <Lightbox
                        images={gallery}
                        index={lightbox}
                        onClose={() => setLightbox(null)}
                        onNav={navLightbox}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
