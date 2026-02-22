"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

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

export default function Hero({
    title,
    subtitle,
    highlightedText,
    description,
    backgroundImage,
    large = false,
    primaryButtonText,
    secondaryButtonText
}: HeroProps) {
    return (
        <section className={`relative ${large ? "h-[90vh]" : "h-[500px]"} flex items-center overflow-hidden bg-secondary`}>
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-secondary/60 via-secondary/40 to-secondary/80 z-10"></div>
                <img
                    alt={title}
                    className="w-full h-full object-cover scale-105 animate-subtle-zoom opacity-80"
                    src={backgroundImage}
                />
            </div>
            <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-white w-full">
                <div className={`${large ? "max-w-3xl" : "max-w-2xl"} space-y-8`}>
                    {subtitle && (
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            className="inline-block"
                        >
                            <h2 className="eyebrow text-primary mb-2 flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-primary"></span>
                                {subtitle}
                            </h2>
                        </motion.div>
                    )}
                    <motion.h1
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.1 }}
                        className={`${large ? "text-6xl md:text-8xl" : "text-5xl md:text-6xl"} font-extrabold leading-[1.05] tracking-tight text-white`}
                    >
                        {title} {highlightedText && <><br /><span className="text-primary font-light italic">{highlightedText}</span></>}
                    </motion.h1>

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.2 }}
                        className="h-1 w-20 bg-primary"
                    ></motion.div>

                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.3 }}
                        className={`${large ? "text-xl md:text-2xl" : "text-lg md:text-xl"} text-white/80 font-light leading-relaxed max-w-xl`}
                    >
                        {description}
                    </motion.p>

                    {(primaryButtonText || secondaryButtonText) && (
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.4 }}
                            className="flex flex-wrap gap-5 pt-4"
                        >
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
                        </motion.div>
                    )}
                </div>
            </div>
            {large && (
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 animate-bounce cursor-pointer">
                    <span className="material-symbols-outlined text-white/50 text-4xl">expand_more</span>
                </div>
            )}
        </section>
    );
}
