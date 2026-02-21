"use client";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import { careers } from "@/lib/data/data";

export default function CareersPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <Hero
                title="Join Our Team"
                subtitle="Careers & Growth"
                description="Build your future with Anuranjan Infratech. We are always looking for passionate people to join our journey."
                backgroundImage="https://lh3.googleusercontent.com/aida-public/AB6AXuDiBv1EokLVMppNO16XoFKj2CHF1uVQ196U3zn077puTyZaBtMpKt0e6Wn6qlMKHr8zk46y8VjguAybwVgr_iszvefNImzCU5rDmuI79CKRprVYP2z4ezV54mWNycGQ1uEO0t89YOXKJSP_wy3Cf7G3D2qDas7r5TNtJAC4jlbpoOnPqrHmb9GISQ-Kmy2toCY7kjxUTjQvZe_61scwG3uXHcpO43TbOu_5TAvBEJJHwVLYoD687Pq8D5y7AGeE9dsYeILM_oSa6Z2g"
            />

            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="text-center max-w-2xl mx-auto mb-24 space-y-4">
                        <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs block">Opportunities</span>
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">Open Positions</h2>
                        <p className="text-slate-500 text-lg font-light">Find your next challenge in the world of high-performance infrastructure.</p>
                    </div>

                    <div className="grid gap-12">
                        {careers.map((job) => (
                            <div key={job.id} className="group bg-slate-50 p-12 rounded-[3rem] border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-2xl transition-all duration-500 flex flex-col lg:flex-row justify-between items-center gap-12">
                                <div className="flex-grow space-y-6 text-center lg:text-left">
                                    <div className="inline-block px-4 py-2 bg-white rounded-full shadow-sm border border-slate-100">
                                        <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{job.department}</span>
                                    </div>
                                    <h3 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight group-hover:text-primary transition-colors">
                                        {job.title}
                                    </h3>
                                    <div className="flex flex-wrap justify-center lg:justify-start gap-8">
                                        <div className="flex items-center gap-3 text-sm text-slate-500 font-bold">
                                            <span className="material-symbols-outlined text-primary text-xl">location_on</span>
                                            {job.location}
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-slate-500 font-bold">
                                            <span className="material-symbols-outlined text-slate-900 text-xl">schedule</span>
                                            {job.type}
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-slate-500 font-bold">
                                            <span className="material-symbols-outlined text-primary text-xl">history</span>
                                            {job.experience}
                                        </div>
                                    </div>
                                </div>
                                <button className="whitespace-nowrap bg-slate-900 text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-primary transition-all shadow-xl active:scale-95 flex items-center gap-3">
                                    Apply Now <span className="material-symbols-outlined text-sm">north_east</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Culture Section - Modern Side-by-Side */}
            <section className="py-32 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <div className="relative order-2 lg:order-1">
                            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
                                <img
                                    className="w-full h-full object-cover"
                                    alt="Our Culture"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiBv1EokLVMppNO16XoFKj2CHF1uVQ196U3zn077puTyZaBtMpKt0e6Wn6qlMKHr8zk46y8VjguAybwVgr_iszvefNImzCU5rDmuI79CKRprVYP2z4ezV54mWNycGQ1uEO0t89YOXKJSP_wy3Cf7G3D2qDas7r5TNtJAC4jlbpoOnPqrHmb9GISQ-Kmy2toCY7kjxUTjQvZe_61scwG3uXHcpO43TbOu_5TAvBEJJHwVLYoD687Pq8D5y7AGeE9dsYeILM_oSa6Z2g"
                                />
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
                        </div>
                        <div className="space-y-12 order-1 lg:order-2">
                            <div className="space-y-4">
                                <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs block">Culture</span>
                                <h2 className="text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                                    Engineered for <span className="text-primary italic font-light">Success</span>
                                </h2>
                            </div>
                            <p className="text-slate-600 text-xl leading-relaxed font-light italic">
                                At Anuranjan Infratech, we believe our people are our greatest asset. We foster a culture of innovation, continuous learning, and absolute excellence.
                            </p>
                            <ul className="space-y-8">
                                {[
                                    "Dynamic work environment with a focus on global innovation",
                                    "Elite compensation packages and comprehensive wellness",
                                    "Direct mentorship from world-class industry leaders",
                                    "Opportunities to lead nation-scale infrastructure projects"
                                ].map((item) => (
                                    <li key={item} className="flex gap-6 group">
                                        <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                                            <span className="material-symbols-outlined text-white text-sm">done</span>
                                        </div>
                                        <span className="text-slate-700 font-bold text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-8 border-t border-slate-200">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Don&apos;t see your specialty?</p>
                                <button className="group flex items-center gap-4 text-slate-900 font-extrabold text-xl hover:text-primary transition-colors">
                                    Submit Open Application
                                    <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all transform group-hover:translate-x-3">
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
