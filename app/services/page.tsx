"use client";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import { services } from "@/lib/data/data";

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <Hero
                title="Our Services"
                subtitle="Expertise & Innovation"
                description="Mastering Civil & Design with precision engineering and creative vision."
                backgroundImage="https://lh3.googleusercontent.com/aida-public/AB6AXuBpLKKarMBFmYQuJXVVzIxlf4jHZwjuBmUWnhuJ6Whw1YDuD9eCGvp0jyeqyyVMGe_qwCoXtuJzTEBjIOo0hpWnr9qWmCQNAxdkZuv3ViT8n-DYw_34TE8h01AnkPoAb0-hri3qP_ll4_e2uPVx6LT9zNN1eJju4Yq7oWmdiX9OYvcSKBcZQgt12s9PKTWuEMl8YRntB0-u3Dyf-SYZeVkL1PtHpw_hwWvlASkyb51Q2fMZpHou7xHH1-x-b2ukHu6EtopRU4PKmmxK"
            />

            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="grid grid-cols-1 gap-24">
                        {services.map((service, idx) => (
                            <div
                                key={service.id}
                                id={service.id}
                                className={`flex flex-col ${idx % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-16 items-center`}
                            >
                                <div className="lg:w-1/2 space-y-8">
                                    <div className="space-y-4">
                                        <span className={`font-bold tracking-[0.3em] uppercase text-xs flex items-center gap-3 ${idx % 2 === 0 ? "text-primary" : "text-slate-900"}`}>
                                            <span className={`w-8 h-[1px] ${idx % 2 === 0 ? "bg-primary" : "bg-slate-900"}`}></span>
                                            0{idx + 1} / Service
                                        </span>
                                        <h3 className="text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                                            {service.title}
                                        </h3>
                                    </div>
                                    <p className="text-slate-500 text-xl leading-relaxed font-light">
                                        {service.description}
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                                        {service.features.map((feature) => (
                                            <div key={feature} className="flex items-center gap-4 group">
                                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                                    <span className="material-symbols-outlined text-xl">check</span>
                                                </div>
                                                <span className="text-slate-700 font-bold">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="pt-6">
                                        <button className="bg-slate-900 hover:bg-primary text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-xl active:scale-95 flex items-center gap-3">
                                            Inquire About Service <span className="material-symbols-outlined text-sm">mail</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="lg:w-1/2 relative">
                                    <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl">
                                        <img
                                            src={idx === 0 ? "https://lh3.googleusercontent.com/aida-public/AB6AXuAnE95sN6O_N8e38m6K0W0b-34z5u0jS6-6g4t7W2B0oI3zN_sX-19F-X3_G" : "https://lh3.googleusercontent.com/aida-public/AB6AXuAnE95sN6O_N8e38m6K0W0b-34z5u0jS6-6g4t7W2B0oI3zN_sX-19F-X3_G"}
                                            alt={service.title}
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
                                        />
                                    </div>
                                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl z-0"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 bg-slate-50 relative overflow-hidden">
                <div className="max-w-5xl mx-auto px-6 text-center space-y-12 relative z-10">
                    <h2 className="text-4xl lg:text-7xl font-extrabold text-slate-900 tracking-tighter leading-[1.1]">
                        Need a <span className="text-primary italic font-light">customized</span> solution?
                    </h2>
                    <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto">
                        Our team of experts is ready to help you with bespoke engineering and design services tailored specifically to your project requirements.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 pt-6">
                        <button className="bg-primary hover:bg-slate-900 text-white px-12 py-5 rounded-full font-bold text-xl transition-all shadow-xl active:scale-95">
                            Consult with Experts
                        </button>
                        <button className="bg-white hover:bg-slate-100 text-slate-900 border border-slate-200 px-12 py-5 rounded-full font-bold text-xl transition-all shadow-sm">
                            Sector Brochure
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
