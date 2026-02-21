"use client";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import { siteConfig, team, history } from "@/lib/data/data";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <Hero
                title="About Us"
                subtitle="Legacy & Vision"
                description="Building future-ready infrastructure with excellence and innovation since inception."
                backgroundImage="https://lh3.googleusercontent.com/aida-public/AB6AXuDiBv1EokLVMppNO16XoFKj2CHF1uVQ196U3zn077puTyZaBtMpKt0e6Wn6qlMKHr8zk46y8VjguAybwVgr_iszvefNImzCU5rDmuI79CKRprVYP2z4ezV54mWNycGQ1uEO0t89YOXKJSP_wy3Cf7G3D2qDas7r5TNtJAC4jlbpoOnPqrHmb9GISQ-Kmy2toCY7kjxUTjQvZe_61scwG3uXHcpO43TbOu_5TAvBEJJHwVLYoD687Pq8D5y7AGeE9dsYeILM_oSa6Z2g"
            />

            {/* Company Introduction */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <div className="space-y-10">
                            <div className="space-y-4">
                                <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs flex items-center gap-3">
                                    <span className="w-8 h-[1px] bg-primary"></span>
                                    Our Story
                                </span>
                                <h2 className="text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                                    A Legacy of <span className="text-primary italic font-light">Excellence</span>
                                </h2>
                            </div>
                            <p className="text-slate-600 text-xl leading-relaxed font-light">
                                {siteConfig.fullName} was founded with a vision to revolutionize the infrastructure sector. Over the years, we have grown from a small consultancy into a multi-disciplinary engineering powerhouse.
                            </p>
                            <p className="text-slate-500 text-lg leading-relaxed font-medium border-l-4 border-primary pl-8 italic">
                                &quot;Our journey is defined by a relentless pursuit of quality and a commitment to delivering complex projects on time.&quot;
                            </p>
                            <div className="flex flex-wrap gap-12 pt-6">
                                <div className="space-y-2">
                                    <span className="text-5xl font-extrabold text-slate-900 tracking-tighter">{siteConfig.experienceYears}+</span>
                                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Years Experience</p>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-5xl font-extrabold text-slate-900 tracking-tighter">{siteConfig.projectsCompleted}+</span>
                                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Projects Completed</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl skew-y-3 hover:skew-y-0 transition-transform duration-1000">
                                <img
                                    className="w-full h-full object-cover"
                                    alt="Large scale construction site"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcn9dvOUwYnh_ZVdrFj11kFr7WJ5x67rFaIcz2zjij2BEAU4heNTBB5pjLPLs2KMcJcqgGAowLvaMXA3bFQE0t4gSRZRWW2tv110FQMlBk2EGVqsoe4B_PWL3KiJe3hG0kGqiVYdmuDldHb001u6h-lvleZ32bFqNEUMB9esIPnVmu7IrT8nhTkv7hOHS8hcVlUeo2S2qHLHgGDWrSVDZAd9FVA7xzwPENFJ-L1RqKMiikHEbYUMKt5uMhIMC9i7qfEvTZPv90cAsc"
                                />
                            </div>
                            <div className="absolute -z-10 -top-10 -left-10 w-full h-full bg-slate-50 rounded-[3rem]"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision - Modern */}
            <section className="py-32 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            { title: "Our Mission", icon: "target", desc: "To provide sustainable and innovative engineering solutions that exceed client expectations while maintaining the highest safety standards." },
                            { title: "Our Vision", icon: "visibility", desc: "To become a global leader in infrastructure development, recognized for our integrity, technical prowess, and contribution to society." }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-12 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100">
                                <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-10">
                                    <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                                </div>
                                <h3 className="text-3xl font-bold mb-6 text-slate-900 tracking-tight">{item.title}</h3>
                                <p className="text-slate-500 text-lg leading-relaxed font-light italic">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership Team - Premium Grid */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="text-center max-w-2xl mx-auto mb-24 space-y-4">
                        <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs block">Leadership</span>
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">The Visionaries</h2>
                        <p className="text-slate-500 text-lg font-light">Meet the specialized team driving our success.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {team.map((member) => (
                            <div key={member.name} className="group flex flex-col items-center text-center">
                                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] mb-8 shadow-xl">
                                    <img
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                                        alt={member.name}
                                        src={member.image}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                                    <div className="absolute bottom-10 inset-x-0 px-8 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                        <p className="text-white text-sm font-light italic">{member.bio}</p>
                                    </div>
                                </div>
                                <h4 className="text-slate-900 text-2xl font-extrabold tracking-tight mb-2">{member.name}</h4>
                                <p className="text-primary font-bold text-[10px] uppercase tracking-[0.3em]">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Journey Timeline - Premium Vertical */}
            <section className="py-32 bg-slate-900 text-white">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-32 space-y-4">
                        <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs block">Evolution</span>
                        <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">Our Journey</h2>
                    </div>
                    <div className="relative space-y-24">
                        <div className="absolute left-8 lg:left-1/2 transform lg:-translate-x-1/2 h-full w-[1px] bg-white/10"></div>
                        {history.map((milestone, idx) => (
                            <div key={milestone.year} className={`relative flex items-center lg:justify-between w-full ${idx % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
                                <div className="hidden lg:block lg:w-5/12"></div>
                                <div className="absolute left-8 lg:left-1/2 transform lg:-translate-x-1/2 z-20 flex items-center justify-center bg-primary w-4 h-4 rounded-full ring-8 ring-slate-900 ring-offset-4 ring-offset-white/5"></div>
                                <div className="pl-20 lg:pl-0 lg:w-5/12 space-y-4">
                                    <h3 className="text-4xl font-extrabold text-primary tracking-tighter">{milestone.year}</h3>
                                    <h4 className="text-2xl font-bold text-white tracking-tight">{milestone.title}</h4>
                                    <p className="text-lg text-slate-400 font-light leading-relaxed italic">{milestone.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
