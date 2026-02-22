"use client";

import Hero from "../components/Hero";
import { gallery, siteConfig } from "@/lib/data/data";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, scaleUp } from "@/lib/animations";

export default function GalleryClient() {
    const { hero, cta } = siteConfig.galleryStrings;

    return (
        <>
            <Hero
                title={hero.title}
                description={hero.description}
                backgroundImage="https://lh3.googleusercontent.com/aida-public/AB6AXuDvzrXxqpQ8_TDyMsJT4exjCTprsNAlYlS_IXXP-ffXi75jWbrT1h2albO2SCmJyoh_ZzLEaE64TT_w4k3X3BhmeEd-QjkuuKY-CJ0rP5LbJv-AtA7PZjN5SnYP60QU5GJ3B69dndAOPmtvV7GcQLc8EXhtYr10HfKnJK1DX98RHB1gwlLsgdh5r3t4jyQTtOf2zWUCB17xN1iaZAkcGsfwU0yQHDzXlKSkVjBOSbceoylVDODq2iNX7gPf6nbEvN0UkZ_MZ8ektIkK"
            />

            <section className="py-24 md:py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, margin: "-100px" }}
                        className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8"
                    >
                        {gallery.map((item) => (
                            <motion.div
                                key={item.id}
                                variants={scaleUp}
                                className="relative group overflow-hidden rounded-[2rem] break-inside-avoid shadow-sm hover:shadow-md transition-all duration-500 border border-slate-100"
                            >
                                <img
                                    className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                                    alt={`Gallery item ${item.id}`}
                                    src={item.image}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                                    <span className="eyebrow text-primary mb-2 block">
                                        {item.category}
                                    </span>
                                    <div className="w-12 h-12 bg-white text-secondary rounded-2xl flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 absolute top-6 right-6 shadow-xl">
                                        <span className="material-symbols-outlined font-bold">zoom_in</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Showcase Banner */}
            <section className="py-24 md:py-32 bg-primary text-white overflow-hidden relative">
                <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                    <span className="material-symbols-outlined text-[400px]">photo_library</span>
                </div>
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                    className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center flex flex-col items-center relative z-10"
                >
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-white/10 rounded-3xl flex items-center justify-center mb-10 shadow-xl backdrop-blur-md border border-white/20">
                        <span className="material-symbols-outlined text-4xl md:text-5xl">auto_awesome_motion</span>
                    </div>
                    <h2 className="text-4xl lg:text-6xl font-extrabold mb-8 tracking-tight text-white leading-tight">
                        {cta.title}
                    </h2>
                    <p className="text-lg md:text-2xl max-w-3xl mx-auto opacity-90 mb-12 font-light italic">
                        {cta.description}
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <button className="bg-white text-primary px-10 md:px-12 py-4 md:py-5 rounded-full font-bold text-lg md:text-xl hover:bg-secondary hover:text-white transition-all shadow-xl active:scale-95">
                            {cta.primaryButton}
                        </button>
                        <button className="bg-secondary text-white px-10 md:px-12 py-4 md:py-5 rounded-full font-bold text-lg md:text-xl hover:bg-white hover:text-secondary transition-all shadow-xl active:scale-95 border border-white/10">
                            {cta.secondaryButton}
                        </button>
                    </div>
                </motion.div>
            </section>
        </>
    );
}
