"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { useState, useEffect, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

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

interface Slide {
    type: "hero" | "project";
    image: string;
    label?: string;
    title?: string;
    category?: string;
}

const bgVariants: Variants = {
    enter: (dir: number) => ({ x: dir * 40, opacity: 0, scale: 1.03 }),
    center: { x: 0, opacity: 1, scale: 1.06 },
    exit: (dir: number) => ({ x: dir * -40, opacity: 0, scale: 1 }),
};

const contentVariants: Variants = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
    exit: { opacity: 0, y: -16, transition: { duration: 0.3, ease: "easeIn" } },
};

// ─── Shared Overlay ───────────────────────────────────────────────────────────

function TextOverlay({ wide = false }: { wide?: boolean }) {
    return (
        <div
            aria-hidden
            className={`absolute bottom-0 left-0 z-10 pointer-events-none h-[85%] ${wide ? "w-full md:w-[80%] lg:w-[68%]" : "w-full md:w-[75%] lg:w-[60%]"}`}
            style={{
                background: "linear-gradient(to top right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 42%, transparent 78%)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                maskImage: "linear-gradient(to top right, black 28%, transparent 78%)",
                WebkitMaskImage: "linear-gradient(to top right, black 28%, transparent 78%)",
            }}
        />
    );
}

// ─── Eyebrow Label ─────────────────────────────────────────────────────────────

function Eyebrow({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-3">
            <span className="block w-7 h-px bg-primary shrink-0" />
            <span className="eyebrow text-primary tracking-[0.22em] text-xs uppercase font-semibold">
                {text}
            </span>
        </div>
    );
}

// ─── Carousel Hero ─────────────────────────────────────────────────────────────

function CarouselHero({
    title,
    highlightedText,
    subtitle,
    description,
    backgroundImage,
    primaryButtonText,
    secondaryButtonText,
}: HeroProps) {
    const [slides, setSlides] = useState<Slide[]>([{ type: "hero", image: backgroundImage }]);
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState<1 | -1>(1);

    useEffect(() => {
        fetch("/api/images?hero=true")
            .then((res) => res.json())
            .then((data) => {
                const imgs = Array.isArray(data) ? data : [];
                if (imgs.length > 0) {
                    setSlides([
                        { type: "hero", image: backgroundImage },
                        ...imgs.map((img: any) => ({
                            type: "project" as const,
                            image: img.src,
                            title: img.title,
                            category: img.category?.name,
                        })),
                    ]);
                }
            })
            .catch(() => {});
    }, [backgroundImage]);

    const goTo = useCallback((index: number, dir: 1 | -1 = 1) => {
        setDirection(dir);
        setCurrent(index);
    }, []);

    const next = useCallback(() => {
        goTo((current + 1) % slides.length, 1);
    }, [current, slides.length, goTo]);

    const prev = useCallback(() => {
        goTo((current - 1 + slides.length) % slides.length, -1);
    }, [current, slides.length, goTo]);

    useEffect(() => {
        const timer = setInterval(next, 5500);
        return () => clearInterval(timer);
    }, [next]);

    const slide = slides[current];

    return (
        <section className="relative h-[90vh] flex flex-col justify-end overflow-hidden bg-secondary">

            {/* Background image */}
            <AnimatePresence initial={false} custom={direction} mode="sync">
                <motion.div
                    key={current}
                    custom={direction}
                    variants={bgVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-black/15 z-10 pointer-events-none" />
                    <img
                        src={slide.image}
                        alt={slide.title ?? title}
                        className="w-full h-full object-cover"
                    />
                </motion.div>
            </AnimatePresence>

            <TextOverlay wide />

            {/* Content */}
            <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-white w-full pb-24 md:pb-32 pt-32">
                <AnimatePresence mode="wait">
                    {slide.type === "hero" ? (
                        <motion.div
                            key="hero-content"
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="max-w-3xl space-y-7"
                        >
                            {subtitle && <Eyebrow text={subtitle} />}

                            <h1 className="text-6xl md:text-8xl font-extrabold leading-[1.04] tracking-tight">
                                {title}
                                {highlightedText && (
                                    <>
                                        <br />
                                        <span className="text-primary font-light italic">{highlightedText}</span>
                                    </>
                                )}
                            </h1>

                            <div className="h-px w-16 bg-primary/80" />

                            <p className="text-lg md:text-xl text-white/75 font-light leading-relaxed max-w-lg">
                                {description}
                            </p>

                            {(primaryButtonText || secondaryButtonText) && (
                                <div className="flex flex-wrap gap-4 pt-3">
                                    {primaryButtonText && (
                                        <button className="group inline-flex items-center gap-2.5 bg-primary hover:bg-white hover:text-secondary text-white px-9 py-4 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 shadow-lg active:scale-[0.97]">
                                            {primaryButtonText}
                                            <span className="material-symbols-outlined text-base transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                                                north_east
                                            </span>
                                        </button>
                                    )}
                                    {secondaryButtonText && (
                                        <button className="inline-flex items-center gap-2 bg-white/8 hover:bg-white/15 text-white border border-white/20 px-9 py-4 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 backdrop-blur-sm active:scale-[0.97]">
                                            {secondaryButtonText}
                                        </button>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key={`project-${current}`}
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="max-w-3xl space-y-6"
                        >
                            {slide.category && <Eyebrow text={slide.category} />}

                            <h2 className="text-5xl md:text-7xl font-extrabold leading-[1.04] tracking-tight">
                                {slide.title}
                            </h2>

                            <div className="h-px w-14 bg-primary/80" />

                            {slide.label && (
                                <p className="text-base md:text-lg text-white/65 font-light">
                                    {slide.label}
                                </p>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Arrow controls */}
            {[
                { label: "Previous slide", icon: "chevron_left", action: prev, side: "left-5 md:left-8" },
                { label: "Next slide", icon: "chevron_right", action: next, side: "right-5 md:right-8" },
            ].map(({ label, icon, action, side }) => (
                <button
                    key={label}
                    onClick={action}
                    aria-label={label}
                    className={`absolute ${side} top-1/2 -translate-y-1/2 z-30 text-white hover:text-white transition-all duration-200 active:scale-90`}
                >
                    <span className="material-symbols-outlined text-4xl" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}>{icon}</span>
                </button>
            ))}

            {/* Dot indicators */}
            <div className="absolute bottom-9 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i, i > current ? 1 : -1)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`rounded-full transition-all duration-400 ${i === current
                            ? "w-6 h-1.5 bg-primary"
                            : "w-1.5 h-1.5 bg-white/30 hover:bg-white/55"
                            }`}
                    />
                ))}
            </div>

            {/* Slide counter */}
            <div className="absolute bottom-8 right-6 md:right-12 z-30 text-white/35 text-[11px] font-mono tracking-[0.2em] select-none tabular-nums">
                {String(current + 1).padStart(2, "0")}&thinsp;/&thinsp;{String(slides.length).padStart(2, "0")}
            </div>
        </section>
    );
}

// ─── Static Hero ───────────────────────────────────────────────────────────────

function StaticHero({
    title,
    subtitle,
    highlightedText,
    description,
    backgroundImage,
}: HeroProps) {
    return (
        <section className="relative h-[500px] flex flex-col justify-end overflow-hidden bg-secondary">
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 bg-black/15 z-10 pointer-events-none" />
                <img
                    alt={title}
                    src={backgroundImage}
                    className="w-full h-full object-cover scale-105 animate-subtle-zoom opacity-80"
                />
            </div>

            <TextOverlay />

            <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-white w-full pb-16 md:pb-24 pt-20">
                <div className="max-w-2xl space-y-6">
                    {subtitle && (
                        <motion.div variants={fadeUp} initial="hidden" animate="visible">
                            <Eyebrow text={subtitle} />
                        </motion.div>
                    )}

                    <motion.h1
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-extrabold leading-[1.04] tracking-tight"
                    >
                        {title}
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
                        transition={{ delay: 0.18 }}
                        className="h-px w-14 bg-primary/80"
                    />

                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.26 }}
                        className="text-base md:text-lg text-white/75 font-light leading-relaxed max-w-lg"
                    >
                        {description}
                    </motion.p>
                </div>
            </div>
        </section>
    );
}

// ─── Export ────────────────────────────────────────────────────────────────────

export default function Hero(props: HeroProps) {
    return props.large ? <CarouselHero {...props} /> : <StaticHero {...props} />;
}