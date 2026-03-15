"use client";

import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { useState, useEffect, useCallback } from "react";
import { gallery } from "@/lib/data/data";

interface HeroProps {
    title: string;
    subtitle?: string;
    highlightedText?: string;
    description: string;
    backgroundImage: string;
    large?: boolean;
    primaryButtonText?: string;
    secondaryButtonText?: string;
}

// ─── Carousel Slides ──────────────────────────────────────────────────────────

interface Slide {
    type: "hero" | "project";
    image: string;
    label?: string;
    title?: string;
    category?: string;
}

function buildSlides(backgroundImage: string): Slide[] {
    const gallerySlides: Slide[] = gallery.map((g) => ({
        type: "project",
        image: g.image,
        category: g.category,
    }));

    return [
        { type: "hero", image: backgroundImage },
        ...gallerySlides,
    ];
}

// ─── Large (Carousel) Hero ────────────────────────────────────────────────────

interface CarouselHeroProps extends HeroProps {
    title: string;
    highlightedText?: string;
    subtitle?: string;
    description: string;
    backgroundImage: string;
    primaryButtonText?: string;
    secondaryButtonText?: string;
}

function CarouselHero({
    title,
    highlightedText,
    subtitle,
    description,
    backgroundImage,
    primaryButtonText,
    secondaryButtonText,
}: CarouselHeroProps) {
    const slides = buildSlides(backgroundImage);
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState<1 | -1>(1);

    const goTo = useCallback(
        (index: number, dir: 1 | -1 = 1) => {
            setDirection(dir);
            setCurrent(index);
        },
        []
    );

    const next = useCallback(() => {
        const nextIndex = (current + 1) % slides.length;
        goTo(nextIndex, 1);
    }, [current, slides.length, goTo]);

    const prev = useCallback(() => {
        const prevIndex = (current - 1 + slides.length) % slides.length;
        goTo(prevIndex, -1);
    }, [current, slides.length, goTo]);

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [next]);

    const slide = slides[current];

    const bgVariants = {
        enter: (dir: number) => ({ x: dir * 60, opacity: 0, scale: 1.04 }),
        center: { x: 0, opacity: 1, scale: 1.05 },
        exit: (dir: number) => ({ x: dir * -60, opacity: 0, scale: 1 }),
    };

    return (
        <section className="relative h-[90vh] flex items-center overflow-hidden bg-secondary">
            {/* ── Background image with crossfade ── */}
            <AnimatePresence initial={false} custom={direction} mode="sync">
                <motion.div
                    key={current}
                    custom={direction}
                    variants={bgVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-secondary/70 via-secondary/50 to-secondary/85 z-10" />
                    <img
                        src={slide.image}
                        alt={slide.title ?? title}
                        className="w-full h-full object-cover"
                    />
                </motion.div>
            </AnimatePresence>

            {/* ── Content ── */}
            <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-white w-full">
                <AnimatePresence mode="wait">
                    {slide.type === "hero" ? (
                        /* Slide 0 – Company info */
                        <motion.div
                            key="hero-content"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.55, ease: "easeOut" }}
                            className="max-w-3xl space-y-8"
                        >
                            {subtitle && (
                                <motion.div variants={fadeUp} initial="hidden" animate="visible" className="inline-block">
                                    <h2 className="eyebrow text-primary mb-2 flex items-center gap-3">
                                        <span className="w-8 h-[1px] bg-primary" />
                                        {subtitle}
                                    </h2>
                                </motion.div>
                            )}

                            <h1 className="text-6xl md:text-8xl font-extrabold leading-[1.05] tracking-tight text-white">
                                {title}{" "}
                                {highlightedText && (
                                    <>
                                        <br />
                                        <span className="text-primary font-light italic">{highlightedText}</span>
                                    </>
                                )}
                            </h1>

                            <div className="h-1 w-20 bg-primary" />

                            <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed max-w-xl">
                                {description}
                            </p>

                            {(primaryButtonText || secondaryButtonText) && (
                                <div className="flex flex-wrap gap-5 pt-4">
                                    {primaryButtonText && (
                                        <button className="bg-primary hover:bg-white hover:text-secondary text-white px-10 py-4 md:py-5 rounded-full font-bold text-base transition-all duration-300 shadow-xl flex items-center gap-3 active:scale-95">
                                            {primaryButtonText}
                                            <span className="material-symbols-outlined text-sm">north_east</span>
                                        </button>
                                    )}
                                    {secondaryButtonText && (
                                        <button className="bg-transparent hover:bg-white/10 text-white border border-white/30 px-10 py-4 md:py-5 rounded-full font-bold text-base transition-all duration-300 backdrop-blur-sm active:scale-95">
                                            {secondaryButtonText}
                                        </button>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        /* Slides 1+ – Project showcase */
                        <motion.div
                            key={`project-${current}`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.55, ease: "easeOut" }}
                            className="max-w-3xl space-y-6"
                        >
                            <div className="inline-block">
                                <span className="eyebrow text-primary flex items-center gap-3">
                                    <span className="w-8 h-[1px] bg-primary" />
                                    {slide.category}
                                </span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight text-white">
                                {slide.title}
                            </h1>

                            <div className="h-1 w-16 bg-primary" />

                            <p className="text-lg md:text-xl text-white/70 font-light">
                                {slide.label}
                            </p>

                            <div className="pt-2">
                                <a
                                    href="/projects"
                                    className="inline-flex items-center gap-3 bg-primary hover:bg-white hover:text-secondary text-white px-8 py-4 rounded-full font-bold text-base transition-all duration-300 shadow-xl active:scale-95"
                                >
                                    View Project
                                    <span className="material-symbols-outlined text-sm">north_east</span>
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* ── Carousel Controls ── */}
            {/* Arrow buttons */}
            <button
                onClick={prev}
                aria-label="Previous slide"
                className="absolute left-5 md:left-8 top-1/2 -translate-y-1/2 z-30 text-white/70 hover:text-white transition-all duration-200 active:scale-90"
            >
                <span className="material-symbols-outlined text-4xl">chevron_left</span>
            </button>
            <button
                onClick={next}
                aria-label="Next slide"
                className="absolute right-5 md:right-8 top-1/2 -translate-y-1/2 z-30 text-white/70 hover:text-white transition-all duration-200 active:scale-90"
            >
                <span className="material-symbols-outlined text-4xl">chevron_right</span>
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i, i > current ? 1 : -1)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`transition-all duration-300 rounded-full ${i === current
                            ? "w-7 h-2 bg-primary"
                            : "w-2 h-2 bg-white/40 hover:bg-white/70"
                            }`}
                    />
                ))}
            </div>

            {/* Slide counter */}
            <div className="absolute bottom-10 right-6 md:right-12 z-30 text-white/50 text-xs font-mono tracking-widest select-none">
                {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </div>
        </section>
    );
}

// ─── Default (non-carousel) Hero ──────────────────────────────────────────────

function StaticHero({
    title,
    subtitle,
    highlightedText,
    description,
    backgroundImage,
}: HeroProps) {
    return (
        <section className="relative h-[500px] flex items-center overflow-hidden bg-secondary">
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-secondary/60 via-secondary/40 to-secondary/80 z-10" />
                <img
                    alt={title}
                    className="w-full h-full object-cover scale-105 animate-subtle-zoom opacity-80"
                    src={backgroundImage}
                />
            </div>
            <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-white w-full">
                <div className="max-w-2xl space-y-8">
                    {subtitle && (
                        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="inline-block">
                            <h2 className="eyebrow text-primary mb-2 flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-primary" />
                                {subtitle}
                            </h2>
                        </motion.div>
                    )}
                    <motion.h1
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight text-white"
                    >
                        {title}{" "}
                        {highlightedText && (
                            <>
                                <br />
                                <span className="text-primary font-light italic">{highlightedText}</span>
                            </>
                        )}
                    </motion.h1>
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.2 }}
                        className="h-1 w-20 bg-primary"
                    />
                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.3 }}
                        className="text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-xl"
                    >
                        {description}
                    </motion.p>
                </div>
            </div>
        </section>
    );
}

// ─── Public Export ─────────────────────────────────────────────────────────────

export default function Hero(props: HeroProps) {
    if (props.large) {
        return <CarouselHero {...props} />;
    }
    return <StaticHero {...props} />;
}
