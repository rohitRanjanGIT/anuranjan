"use client";

import { useState, useMemo, useEffect } from "react";
import { siteConfig } from "@/lib/data/data";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "@/lib/animations";

import { MasonryPhotoAlbum } from "react-photo-album";
import "react-photo-album/masonry.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface GalleryImage {
    id: number;
    src: string;
    width: number;
    height: number;
    title: string;
    category: { name: string };
}

const ITEMS_PER_PAGE = 12;

export default function GalleryClient() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All");
    const [lightboxIndex, setLightboxIndex] = useState(-1);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetch("/api/images")
            .then((res) => res.json())
            .then((data) => {
                setImages(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const categories = useMemo(() => {
        const cats = Array.from(new Set(images.map((img) => img.category?.name).filter(Boolean)));
        return ["All", ...cats];
    }, [images]);

    const filtered = useMemo(() => {
        setCurrentPage(1);
        return activeCategory === "All"
            ? images
            : images.filter((img) => img.category?.name === activeCategory);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeCategory, images]);

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

    const paginated = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filtered.slice(start, start + ITEMS_PER_PAGE);
    }, [filtered, currentPage]);

    const photos = paginated.map((item) => ({
        src: item.src,
        width: item.width,
        height: item.height,
        alt: item.title,
    }));

    const allSlides = filtered.map((item) => ({ src: item.src, alt: item.title }));
    const pageOffset = (currentPage - 1) * ITEMS_PER_PAGE;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const pageNumbers = useMemo(() => {
        if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
        const pages: (number | "...")[] = [1];
        if (currentPage > 3) pages.push("...");
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            pages.push(i);
        }
        if (currentPage < totalPages - 2) pages.push("...");
        pages.push(totalPages);
        return pages;
    }, [currentPage, totalPages]);

    return (
        <div className="bg-white min-h-screen">

            {/* SECTION 1: HEADER + FILTERS */}
            <section className="pt-20 md:pt-10 pb-12">
                <div className="max-w-[85rem] mx-auto px-6 sm:px-8 lg:px-12">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-8 pb-10 border-b border-slate-200"
                    >
                        <div className="space-y-4 max-w-2xl">
                            <span className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
                                <span className="w-8 h-[2px] bg-primary" />
                                Visual Archive
                            </span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-secondary tracking-tight">
                                Our Gallery
                            </h2>
                        </div>
                        <p className="text-secondary/60 text-base md:text-lg font-light leading-relaxed max-w-md lg:text-right">
                            Explore our comprehensive collection of captured moments,
                            architectural details, and construction milestones.
                        </p>
                    </motion.div>

                    {/* CATEGORY FILTER PILLS */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-wrap gap-3 pt-10"
                    >
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2 rounded-full text-sm font-medium tracking-wide border transition-all duration-200 ${activeCategory === cat
                                        ? "bg-primary text-white border-primary"
                                        : "bg-white text-secondary/60 border-slate-200 hover:border-primary hover:text-primary"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* SECTION 2: PHOTO ALBUM */}
            <section className="pb-16">
                <div className="max-w-[85rem] mx-auto px-6 sm:px-8 lg:px-12">
                    {loading ? (
                        <div className="flex items-center justify-center py-24">
                            <div className="text-secondary/40 text-lg">Loading gallery...</div>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="flex items-center justify-center py-24">
                            <div className="text-secondary/40 text-lg">No images found.</div>
                        </div>
                    ) : (
                        <>
                            {/* Results count */}
                            <p className="text-sm text-secondary/40 mb-6">
                                Showing{" "}
                                <span className="font-medium text-secondary/60">
                                    {pageOffset + 1}–{Math.min(pageOffset + ITEMS_PER_PAGE, filtered.length)}
                                </span>{" "}
                                of <span className="font-medium text-secondary/60">{filtered.length}</span> photos
                            </p>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`${activeCategory}-${currentPage}`}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <MasonryPhotoAlbum
                                        photos={photos}
                                        columns={(containerWidth) => {
                                            if (containerWidth < 640) return 1;
                                            if (containerWidth < 1024) return 2;
                                            return 3;
                                        }}
                                        spacing={12}
                                        onClick={({ index }) => setLightboxIndex(pageOffset + index)}
                                        componentsProps={{
                                            image: {
                                                className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            },
                                            wrapper: {
                                                className: "overflow-hidden rounded-lg cursor-pointer group"
                                            }
                                        }}
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* PAGINATION */}
                            {totalPages > 1 && (
                                <motion.div
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className="flex items-center justify-center gap-1.5 mt-14"
                                >
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 text-secondary/60 hover:border-primary hover:text-primary transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                        </svg>
                                        Prev
                                    </button>

                                    {pageNumbers.map((page, i) =>
                                        page === "..." ? (
                                            <span
                                                key={`ellipsis-${i}`}
                                                className="w-9 h-9 flex items-center justify-center text-secondary/30 text-sm select-none"
                                            >
                                                ···
                                            </span>
                                        ) : (
                                            <button
                                                key={page}
                                                onClick={() => handlePageChange(page)}
                                                className={`w-9 h-9 rounded-lg text-sm font-medium border transition-all duration-200 ${currentPage === page
                                                        ? "bg-primary text-white border-primary"
                                                        : "bg-white text-secondary/60 border-slate-200 hover:border-primary hover:text-primary"
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        )
                                    )}

                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 text-secondary/60 hover:border-primary hover:text-primary transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none"
                                    >
                                        Next
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </motion.div>
                            )}
                        </>
                    )}
                </div>
            </section>

            {/* LIGHTBOX */}
            <Lightbox
                open={lightboxIndex >= 0}
                index={lightboxIndex}
                close={() => setLightboxIndex(-1)}
                slides={allSlides}
                on={{
                    view: ({ index }) => setLightboxIndex(index),
                }}
            />
        </div>
    );
}
