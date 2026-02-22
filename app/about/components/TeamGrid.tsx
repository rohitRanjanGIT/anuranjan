"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { team, siteConfig } from "@/lib/data/data";

export default function TeamGrid() {
    const { leadership } = siteConfig.aboutStrings;

    return (
        <section className="py-24 md:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="text-center max-w-2xl mx-auto mb-20 md:mb-24 space-y-4">
                    <span className="eyebrow block">{leadership.eyebrow}</span>
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-secondary tracking-tight">{leadership.title}</h2>
                    <p className="text-secondary/60 text-lg font-light">{leadership.description}</p>
                </div>
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16"
                >
                    {team.map((member) => (
                        <motion.div
                            key={member.name}
                            variants={fadeUp}
                            className="group flex flex-col items-center text-center"
                        >
                            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] mb-8 shadow-md group-hover:shadow-xl transition-all duration-500">
                                <img
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                    alt={member.name}
                                    src={member.image}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-secondary opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
                                <div className="absolute bottom-10 inset-x-0 px-8 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    <p className="text-white text-sm font-light italic leading-relaxed">{member.bio}</p>
                                </div>
                            </div>
                            <h4 className="text-secondary text-2xl font-extrabold tracking-tight mb-2">{member.name}</h4>
                            <p className="eyebrow text-primary text-[10px]">{member.role}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
