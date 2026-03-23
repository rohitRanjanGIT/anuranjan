"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { team, siteConfig } from "@/lib/data/data";

export default function TeamGrid() {
    const { leadership } = siteConfig.aboutStrings;

    return (
        <section className="py-24 md:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto mb-20 md:mb-24 space-y-4"
                >
                    <span className="eyebrow block">{leadership.eyebrow}</span>
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-secondary tracking-tight">{leadership.title}</h2>
                    <p className="text-secondary/60 text-lg font-light">{leadership.description}</p>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12"
                >
                    {team.map((member) => (
                        <motion.div
                            key={member.name}
                            variants={fadeUp}
                            className="group"
                        >
                            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] mb-7 shadow-md group-hover:shadow-xl transition-all duration-500">
                                <img
                                    className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                    alt={member.name}
                                    src={member.image}
                                />
                                {/* Gradient overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                {/* Bio on hover */}
                                <div className="absolute bottom-0 inset-x-0 p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    <p className="text-white/90 text-sm font-light leading-relaxed">{member.bio}</p>
                                </div>
                                {/* Corner accent */}
                                <div className="absolute top-5 right-5 w-8 h-8 border-t-2 border-r-2 border-white/0 group-hover:border-primary rounded-tr-xl transition-all duration-500" />
                            </div>
                            <div className="px-1">
                                <h4 className="text-secondary text-xl font-bold tracking-tight mb-1">{member.name}</h4>
                                <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em]">{member.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
