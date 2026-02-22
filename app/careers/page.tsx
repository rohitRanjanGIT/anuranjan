import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CareersClient from "./CareersClient";
import { siteConfig } from "@/lib/data/data";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Careers | Anuranjan Infratech",
    description: siteConfig.careersStrings.hero.description,
};

export default function CareersPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <CareersClient />
            <Footer />
        </main>
    );
}
