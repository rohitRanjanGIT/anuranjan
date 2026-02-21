"use client";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import { siteConfig, services, projects, values, testimonials } from "@/lib/data/data";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <Hero
        title="Anuranjan Infratech"
        highlightedText="Resources Pvt Ltd"
        subtitle="Foundations of the Future"
        description={siteConfig.description}
        backgroundImage="https://lh3.googleusercontent.com/aida-public/AB6AXuA8xU9AbMloXbzR2PuV4o998pjAjl84tN8mrr4IttSkVZcBtuPQLJQfJK1Tr76o-7GaCELjMEdZz89dzRN8L7wU37sNkqrImm8Sm1o4G6s3f26qbhKmttKJ7983XSZ1RYKBTDMbsEGxDQKmvw07yZA6uODH-5yThpen_oL1SP9y6oNf8RmE7IMW0k5v79nBKCFOpOHzkVNd9bdCv7079C-jDFQ3Hyo6q-szu9AxuE1fjqJWGtMTj_sKGh3yheYb98Z1QmMZeoayMfdb"
        large={true}
        primaryButtonText="Explore Portfolio"
        secondaryButtonText="Our Services"
      />

      {/* Overview Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full z-0 animate-pulse"></div>
              <div className="relative z-10 overflow-hidden rounded-[3rem] shadow-2xl">
                <img
                  alt="Architectural excellence"
                  className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-1000"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2y0k_xBQKkrn3o9gUO8ggpjGEmPYlARFX5st2lgx2dGPG3vRkU0i9vsJmX0Y9bcSXLs8mMdXAy1wljrgRZT-4o1uSdj60cLq4qTawiPMaU3ArdIU0pbTv3h7VM66Urpl0D1P4nXEVqOIzaT-hVRIYz7iVTdSoEPWvHiYCBXc0VCwb57ND4rl2CoVIeIFJNjv72JnSFnORI6r9jY3l3i8FNY_R10b9Ivth2Y6UV0YFA67WSJQYP7tDMZMvfYJAlvfas5ikwUdhixfq"
                />
              </div>
              <div className="absolute -bottom-12 -right-12 bg-slate-900 p-12 rounded-[2rem] text-white shadow-2xl hidden lg:block border border-white/10 backdrop-blur-md">
                <p className="text-6xl font-extrabold tracking-tighter text-primary">{siteConfig.experienceYears}+</p>
                <p className="text-[10px] font-bold opacity-60 uppercase tracking-[0.3em] mt-3">Years of Mastery</p>
              </div>
            </div>
            <div className="space-y-10">
              <div className="space-y-4">
                <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-primary"></span>
                  The Legacy
                </span>
                <h3 className="text-4xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                  We shape the landscape of modern <span className="text-primary italic font-light">infrastructure</span>.
                </h3>
              </div>
              <p className="text-slate-600 text-xl leading-relaxed font-light">
                {siteConfig.fullName} is a premier construction and design firm dedicated to delivering structural integrity and architectural brilliance. From complex civil engineering to bespoke interiors, we merge technical expertise with creative vision.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { title: "Our Mission", desc: "Quality-driven sustainable building solutions.", icon: "shutter_speed" },
                  { title: "Our Vision", desc: "To be the industry leader in infrastructure innovation.", icon: "visibility" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-4 p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-500">
                    <span className="material-symbols-outlined text-primary text-3xl">{item.icon}</span>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg mb-2">{item.title}</h4>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Services Grid */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl space-y-4">
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Specialized Services</span>
              <h3 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">Mastering Civil & Design</h3>
            </div>
            <Link href="/services" className="px-8 py-4 rounded-full border border-slate-900 text-slate-900 font-bold hover:bg-slate-900 hover:text-white transition-all duration-500 flex items-center gap-3">
              All Services <span className="material-symbols-outlined text-sm text-primary">arrow_forward</span>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.slice(0, 2).map((service, idx) => (
              <div key={service.id} className="group bg-white p-12 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-700 flex flex-col justify-between">
                <div>
                  <div className={`w-16 h-16 ${idx === 0 ? "bg-primary/10 text-primary" : "bg-slate-900/10 text-slate-900"} rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform`}>
                    <span className="material-symbols-outlined text-3xl font-bold">{service.icon}</span>
                  </div>
                  <h4 className="text-3xl font-bold mb-6 text-slate-900 tracking-tight">{service.title}</h4>
                  <p className="text-slate-500 text-lg leading-relaxed font-light mb-10">
                    {service.description}
                  </p>
                </div>
                <div className="space-y-6">
                  <div className="h-[1px] w-full bg-slate-100"></div>
                  <div className="flex flex-wrap gap-4">
                    {service.features.map((f) => (
                      <span key={f} className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50 px-4 py-2 rounded-full">{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects with fixed cards */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-24 space-y-4">
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs block">Our Portfolio</span>
            <h3 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">Landmarks of Excellence</h3>
            <p className="text-slate-500 text-lg font-light">Showcasing our most iconic projects across the nation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {projects.slice(0, 3).map((project) => (
              <div key={project.id} className="group cursor-pointer">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] mb-8">
                  <img
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    src={project.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                  <div className="absolute bottom-10 left-10 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-primary mb-2 block">{project.category}</span>
                    <h5 className="text-2xl font-bold tracking-tight">{project.title}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-20 text-center">
            <Link href="/projects" className="inline-flex items-center gap-4 text-slate-900 font-extrabold text-lg group hover:text-primary transition-colors">
              Explore All Projects
              <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all transform group-hover:translate-x-3">
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials - Refined */}
      <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 opacity-[0.03] scale-150 rotate-12">
          <span className="material-symbols-outlined text-[600px]">format_quote</span>
        </div>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="text-center mb-24 space-y-4">
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs block">Testimonials</span>
            <h3 className="text-4xl lg:text-5xl font-extrabold tracking-tight">Trusted by Industry Leaders</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md p-12 rounded-[3rem] border border-white/10 hover:bg-white/[0.08] transition-all duration-500">
                <div className="flex gap-1 mb-8">
                  {[1, 2, 3, 4, 5].map(s => <span key={s} className="material-symbols-outlined text-primary text-sm font-bold">star</span>)}
                </div>
                <p className="text-slate-300 mb-12 text-xl italic font-light leading-relaxed">
                  &quot;{t.content}&quot;
                </p>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/10">
                    <img alt={t.name} src={t.avatar} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h6 className="font-bold text-lg text-white">{t.name}</h6>
                    <p className="text-[10px] text-primary font-bold uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-12">
          <h2 className="text-4xl lg:text-7xl font-extrabold text-slate-900 tracking-tighter leading-[1.1]">
            Ready to build your <span className="text-primary italic font-light">vision?</span>
          </h2>
          <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto">
            Let&apos;s collaborate to create something extraordinary. Our team is ready to transform your ideas into structural reality.
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-6">
            <button className="bg-primary hover:bg-slate-900 text-white px-12 py-5 rounded-full font-bold text-xl transition-all shadow-xl active:scale-95 flex items-center gap-3">
              Start a Project <span className="material-symbols-outlined text-lg">edit_note</span>
            </button>
            <button className="bg-slate-100 hover:bg-slate-200 text-slate-900 px-12 py-5 rounded-full font-bold text-xl transition-all active:scale-95">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
