"use client";

import React from "react";
import LogoLoop, { LogoItem } from "@/app/components/LogoLoop";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

const LogoElement = ({ name, type }: { name: string; type: string }) => {
    return (
        <div className="flex items-center gap-4 text-gray-400 hover:text-gray-900 transition-colors px-4">
            {type === "circle" && <div className="w-12 h-12 bg-gray-300 rounded-full" />}
            {type === "square" && <div className="w-12 h-12 bg-gray-300 rounded-2xl" />}
            {type === "triangle" && (
                <div className="w-0 h-0 border-l-[24px] border-r-[24px] border-b-[40px] border-l-transparent border-r-transparent border-b-gray-300" />
            )}
            {type === "diamond" && <div className="w-10 h-10 bg-gray-300 rotate-45" />}
            {type === "pill" && <div className="w-16 h-8 bg-gray-300 rounded-full" />}
            {type === "hex" && (
                <div className="w-12 h-10 bg-gray-300 relative before:absolute before:content-[''] before:w-full before:h-full before:bg-gray-300 before:rotate-60 after:absolute after:content-[''] after:w-full after:h-full after:bg-gray-300 after:-rotate-60 scale-75" />
            )}
            <span className="text-3xl font-extrabold tracking-widest uppercase">{name}</span>
        </div>
    );
};

const topLogos: LogoItem[] = [
    { node: <LogoElement name="Nexus" type="circle" /> },
    { node: <LogoElement name="AeroSpace" type="square" /> },
    { node: <LogoElement name="BuildCorp" type="triangle" /> },
    { node: <LogoElement name="DataSys" type="diamond" /> },
    { node: <LogoElement name="Eco Energy" type="pill" /> },
    { node: <LogoElement name="FinServe" type="hex" /> },
];

const middleLogos: LogoItem[] = [
    { node: <LogoElement name="NextGen" type="circle" /> },
    { node: <LogoElement name="Vertex" type="triangle" /> },
    { node: <LogoElement name="OmniCorp" type="diamond" /> },
    { node: <LogoElement name="ProSys" type="pill" /> },
    { node: <LogoElement name="Quantum" type="hex" /> },
    { node: <LogoElement name="Synergy" type="square" /> },
];

const bottomLogos: LogoItem[] = [
    { node: <LogoElement name="GlobalNet" type="square" /> },
    { node: <LogoElement name="HealthPlus" type="circle" /> },
    { node: <LogoElement name="Infinity" type="diamond" /> },
    { node: <LogoElement name="LogosInc" type="pill" /> },
    { node: <LogoElement name="MaxPower" type="triangle" /> },
    { node: <LogoElement name="NovaCorp" type="hex" /> },
];

export default function Clients() {
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

            {/* 
        Marquee Style Logo Loop 
        Top Layer: Right to Left (direction="left")
        Bottom Layer: Left to Right (direction="right")
        Speed: 70px/s, Hover: 20px/s, Height: 120px, Gap: 85px
      */}
            <div className="flex flex-col gap-8 w-full">
                <LogoLoop
                    logos={topLogos}
                    direction="left"
                    speed={70}
                    hoverSpeed={20}
                    logoHeight={120}
                    gap={85}
                    fadeOut={true}
                    scaleOnHover={true}
                />
                <LogoLoop
                    logos={middleLogos}
                    direction="right"
                    speed={70}
                    hoverSpeed={-20}
                    logoHeight={120}
                    gap={85}
                    fadeOut={true}
                    scaleOnHover={true}
                />
                <LogoLoop
                    logos={bottomLogos}
                    direction="left"
                    speed={70}
                    hoverSpeed={20}
                    logoHeight={120}
                    gap={85}
                    fadeOut={true}
                    scaleOnHover={true}
                />
            </div>
        </section>
    );
}
