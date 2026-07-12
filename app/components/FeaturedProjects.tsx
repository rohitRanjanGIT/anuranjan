"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { siteConfig } from "@/lib/data/data";
import Link from "next/link";
import { projectHref } from "@/lib/utils";
import { useRef, useState, useEffect, useCallback } from "react";

interface FeaturedProject {
    id: number
    title: string
    image: string
    category: { name: string }
}

export default function FeaturedProjects() {
    const { portfolio } = siteConfig.homeStrings;

    const [projects, setProjects] = useState<FeaturedProject[]>([]);
    const [loading, setLoading] = useState(true);

    const trackRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number>(0);
    const offsetRef = useRef(0);
    const pausedRef = useRef(false);
    const SPEED = 0.2; // px per frame

    // Fetch featured projects
    useEffect(() => {
        fetch("/api/projects?homepagePortfolio=true")
            .then((res) => res.json())
            .then((data) => {
                setProjects(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    // Auto-scroll via rAF
    useEffect(() => {
        if (projects.length === 0) return;
        const track = trackRef.current;
        if (!track) return;

        const tick = () => {
            if (!pausedRef.current) {
                offsetRef.current += SPEED;
                const half = track.scrollWidth / 2;
                if (offsetRef.current >= half) offsetRef.current -= half;
                track.style.transform = `translateX(-${offsetRef.current}px)`;
            }
            rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, [projects]);

    const nudge = useCallback((dir: 1 | -1) => {
        const track = trackRef.current;
        if (!track || projects.length === 0) return;
        pausedRef.current = true;

        const cardWidth = track.scrollWidth / 2 / projects.length;
        const target = offsetRef.current + dir * (cardWidth + 32);
        const half = track.scrollWidth / 2;
        const normalised = ((target % half) + half) % half;

        const start = offsetRef.current;
        const diff = normalised - start;
        // Wrap-safe shortest path
        const delta = Math.abs(diff) > half / 2 ? diff - Math.sign(diff) * half : diff;

        const duration = 420;
        const startTime = performance.now();

        const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

        const animate = (now: number) => {
            const t = Math.min((now - startTime) / duration, 1);
            offsetRef.current = ((start + delta * ease(t)) % half + half) % half;
            track.style.transform = `translateX(-${offsetRef.current}px)`;
            if (t < 1) {
                requestAnimationFrame(animate);
            } else {
                setTimeout(() => { pausedRef.current = false; }, 800);
            }
        };

        requestAnimationFrame(animate);
    }, [projects]);

    // Duplicate items for seamless loop
    const items = [...projects, ...projects];

    return (
        <section className="py-24 md:py-32 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                {/* Header */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16 md:mb-20 space-y-4"
                >
                    <span className="eyebrow block">{portfolio.eyebrow}</span>
                    <h3 className="text-4xl lg:text-5xl font-extrabold text-secondary tracking-tight">
                        {portfolio.title}
                    </h3>
                    <p className="text-secondary/60 text-lg font-light">{portfolio.description}</p>
                </motion.div>
            </div>

            {/* Carousel */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
            ) : projects.length === 0 ? (
                <div className="text-center py-20 text-secondary/40">
                    <span className="material-symbols-outlined text-4xl mb-2 block">construction</span>
                    <p className="text-sm font-medium uppercase tracking-wide">No featured projects yet</p>
                </div>
            ) : (
            <div
                className="relative"
                onMouseEnter={() => { pausedRef.current = true; }}
                onMouseLeave={() => { pausedRef.current = false; }}
            >
                {/* Left fade */}
                <div className="absolute left-0 top-0 h-full w-32 md:w-48 z-10 pointer-events-none"
                    style={{ background: "linear-gradient(to right, white 0%, transparent 100%)" }} />

                {/* Right fade */}
                <div className="absolute right-0 top-0 h-full w-32 md:w-48 z-10 pointer-events-none"
                    style={{ background: "linear-gradient(to left, white 0%, transparent 100%)" }} />

                {/* Left arrow */}
                <button
                    onClick={() => nudge(-1)}
                    aria-label="Previous"
                    className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white border border-slate-100 shadow-md flex items-center justify-center text-secondary/60 hover:text-secondary transition-all duration-200 backdrop-blur-sm active:scale-90"
                >
                    <span className="material-symbols-outlined text-xl">chevron_left</span>
                </button>

                {/* Right arrow */}
                <button
                    onClick={() => nudge(1)}
                    aria-label="Next"
                    className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white border border-slate-100 shadow-md flex items-center justify-center text-secondary/60 hover:text-secondary transition-all duration-200 backdrop-blur-sm active:scale-90"
                >
                    <span className="material-symbols-outlined text-xl">chevron_right</span>
                </button>

                {/* Track */}
                <div className="overflow-hidden">
                    <div
                        ref={trackRef}
                        className="flex gap-6 md:gap-8 will-change-transform"
                        style={{ width: "max-content" }}
                    >
                        {items.map((project, idx) => (
                            <div
                                key={`${project.id}-${idx}`}
                                className="w-[280px] md:w-[340px] lg:w-[380px] shrink-0"
                            >
                                <Link
                                    href={projectHref(project)}
                                    className="block relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-sm group hover:shadow-xl transition-all duration-500"
                                >
                                    <img
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        src={project.image}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                                    <div className="absolute bottom-7 left-7 right-7 text-white z-10">
                                        <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-primary mb-1.5 block">
                                            {project.category.name}
                                        </span>
                                        <h5 className="text-xl font-bold tracking-tight leading-snug">
                                            {project.title}
                                        </h5>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            )}

            {/* Footer CTA */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="mt-16 md:mt-20 text-center">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-4 text-secondary font-extrabold text-lg group hover:text-primary transition-colors duration-300"
                    >
                        {portfolio.buttonText}
                        <div className="w-11 h-11 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300 group-hover:translate-x-2 shadow-sm">
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}