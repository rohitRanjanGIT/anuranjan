"use client";

import React, { useEffect, useState, useMemo } from "react";
import LogoLoop, { LogoItem } from "@/app/components/LogoLoop";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

interface Logo {
    id: number;
    name: string;
    src: string;
    href: string | null;
}

function shuffle<T>(arr: T[]): T[] {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function splitIntoRows<T>(items: T[], rowCount: number): T[][] {
    const shuffled = shuffle(items);
    const rows: T[][] = Array.from({ length: rowCount }, () => []);
    shuffled.forEach((item, i) => rows[i % rowCount].push(item));
    return rows;
}

export default function Clients() {
    const [logos, setLogos] = useState<Logo[]>([]);

    useEffect(() => {
        fetch("/api/logos")
            .then((res) => res.json())
            .then((data) => setLogos(Array.isArray(data) ? data : []))
            .catch(() => {});
    }, []);

    const rows = useMemo(() => {
        const logoItems: LogoItem[] = logos.map((logo) => ({
            src: logo.src,
            alt: logo.name,
            href: logo.href || undefined,
            title: logo.name,
        }));
        return splitIntoRows(logoItems, 3);
    }, [logos]);

    if (logos.length === 0) return null;

    const directions: Array<"left" | "right"> = ["left", "right", "left"];

    return (
        <section className="py-24 bg-white overflow-hidden relative border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 mb-16">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-100px" }}
                    variants={fadeUp}
                    className="text-center space-y-4"
                >
                    <span className="eyebrow block">Our Partners</span>
                    <h3 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
                        Valued Clients & Collaborators
                    </h3>
                </motion.div>
            </div>

            <div className="flex flex-col gap-8 w-full">
                {rows.map((row, i) =>
                    row.length > 0 ? (
                        <LogoLoop
                            key={i}
                            logos={row}
                            direction={directions[i]}
                            speed={70}
                            hoverSpeed={directions[i] === "right" ? -20 : 20}
                            logoHeight={84}
                            gap={60}
                            fadeOut={true}
                            scaleOnHover={true}
                        />
                    ) : null
                )}
            </div>
        </section>
    );
}
