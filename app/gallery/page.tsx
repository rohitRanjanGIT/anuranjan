import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GalleryClient from "./GalleryClient";
import { siteConfig } from "@/lib/data/data";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Gallery | Anuranjan Infratech",
    description: siteConfig.galleryStrings.hero.description,
};

export default function GalleryPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <GalleryClient />
            <Footer />
        </main>
    );
}
