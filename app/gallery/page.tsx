import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import { gallery } from "@/lib/data/data";

export default function GalleryPage() {
    return (
        <main className="min-h-screen bg-background-light">
            <Navbar />

            <Hero
                title="Visual Gallery"
                description="A glimpse into our world of architectural excellence and design brilliance."
                backgroundImage="https://lh3.googleusercontent.com/aida-public/AB6AXuDvzrXxqpQ8_TDyMsJT4exjCTprsNAlYlS_IXXP-ffXi75jWbrT1h2albO2SCmJyoh_ZzLEaE64TT_w4k3X3BhmeEd-QjkuuKY-CJ0rP5LbJv-AtA7PZjN5SnYP60QU5GJ3B69dndAOPmtvV7GcQLc8EXhtYr10HfKnJK1DX98RHB1gwlLsgdh5r3t4jyQTtOf2zWUCB17xN1iaZAkcGsfwU0yQHDzXlKSkVjBOSbceoylVDODq2iNX7gPf6nbEvN0UkZ_MZ8ektIkK"
            />

            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
                        {gallery.map((item) => (
                            <div key={item.id} className="relative group overflow-hidden rounded-[2rem] break-inside-avoid shadow-xl border-4 border-white hover:border-primary transition-all duration-700">
                                <img
                                    className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                                    alt={`Gallery item ${item.id}`}
                                    src={item.image}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                                    <span className="text-primary font-black text-xs uppercase tracking-[0.2em] italic mb-2 block">
                                        {item.category}
                                    </span>
                                    <div className="w-12 h-12 bg-white text-secondary rounded-2xl flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 absolute top-6 right-6 shadow-2xl">
                                        <span className="material-symbols-outlined font-black">zoom_in</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Showcase Banner */}
            <section className="py-24 bg-primary text-white overflow-hidden relative">
                <div className="absolute right-0 bottom-0 opacity-10">
                    <span className="material-symbols-outlined text-[400px]">photo_library</span>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center relative z-10">
                    <div className="w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center mb-10 shadow-2xl backdrop-blur-md border border-white/20">
                        <span className="material-symbols-outlined text-5xl">auto_awesome_motion</span>
                    </div>
                    <h2 className="text-4xl lg:text-6xl font-black mb-8 italic tracking-tighter">Want to see more of our work?</h2>
                    <p className="text-xl lg:text-2xl max-w-3xl mx-auto opacity-90 mb-12 font-medium italic">
                        We have thousands of documented projects. For sector-specific portfolios, request our archival digest today.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <button className="bg-white text-primary px-12 py-5 rounded-2xl font-black text-xl hover:bg-secondary hover:text-white transition-all shadow-2xl transform hover:scale-105 italic">
                            Request Full Archive
                        </button>
                        <button className="bg-secondary text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-white hover:text-secondary transition-all shadow-2xl italic">
                            Visit Design Studio
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
