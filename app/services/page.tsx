import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ServicesClient from "./ServicesClient";
import { siteConfig } from "@/lib/data/data";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Services | Anuranjan Infratech",
    description: siteConfig.servicesStrings.hero.description,
};

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <ServicesClient />
            <Footer />
        </main>
    );
}
