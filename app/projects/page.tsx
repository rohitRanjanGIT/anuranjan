"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import { projects } from "@/lib/data/data";

const categories = ["All Projects", "Corporate", "Residential", "Villa", "Industrial"];

export default function ProjectsPage() {
    const [activeCategory, setActiveCategory] = useState("All Projects");

    const filteredProjects = activeCategory === "All Projects"
        ? projects
        : projects.filter(p => p.category === activeCategory);

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <Hero
                title="Our Portfolio"
                description="this is the one!"
                
                subtitle="Excellence in Execution - Showcasing our best work across civil and interior sectors."
                backgroundImage="https://lh3.googleusercontent.com/aida-public/AB6AXuBrt6ecFPhx3KgvYYBTZggjRaaVfWIfMFET6jmOUFb7rNVzLa_lT5ar04_whoCO4rXJFD2I-beeIde2x3UW7nJPU13Fw7bvZJ14nXOR6UKJNHJ3jfAzr4FJv1VoP5yinmBUnccIrkNOgoD9s_GBhzPseW23WWPRIF-kEUOIE8fvG8DLdyrDll2UPY1ZJlwNWL-LvLnbODDpWElKEte_7d3HOgquPVR5l4U_jDIkhCOAUNz1BRP5Uyu16s2fC42zAsXdNkwdcy22n2UA"
            />

            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="flex flex-col items-center mb-20 text-center">
                        <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4">Case Studies</span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">Iconic Infrastructure</h2>
                        <p className="text-slate-600 max-w-2xl text-lg font-light leading-relaxed">
                            A chronicle of our architectural legacy, featuring projects that redefine modern living and working spaces.
                        </p>
                    </div>

                    {/* Filter Section */}
                    <div className="flex flex-wrap justify-center gap-3 mb-16">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${activeCategory === cat
                                    ? "bg-slate-900 text-white shadow-xl scale-105"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {filteredProjects.map((project) => (
                            <div key={project.id} className="group cursor-pointer">
                                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl mb-8">
                                    <img
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        alt={project.title}
                                        src={project.fullImage}
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
                                    <div className="absolute top-6 left-6">
                                        <span className="bg-white/95 backdrop-blur-md text-slate-900 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-sm">
                                            {project.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-3 px-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors duration-300 tracking-tight">
                                                {project.title}
                                            </h3>
                                            <p className="text-slate-500 font-medium text-xs uppercase tracking-wider mt-1">
                                                {project.type}
                                            </p>
                                        </div>
                                        <div className="w-12 h-12 flex items-center justify-center bg-slate-100 rounded-full group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:translate-x-1 group-hover:-translate-y-1">
                                            <span className="material-symbols-outlined text-xl">north_east</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-32 bg-slate-900 text-white">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20">
                        {[
                            { label: "Projects Completed", value: "250+" },
                            { label: "Design Awards", value: "80+" },
                            { label: "Active Ventures", value: "15+" },
                            { label: "Success Rate", value: "99%" }
                        ].map((stat, idx) => (
                            <div key={idx} className="space-y-4">
                                <p className="text-4xl md:text-6xl font-extrabold tracking-tighter text-primary">
                                    {stat.value}
                                </p>
                                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-400">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}