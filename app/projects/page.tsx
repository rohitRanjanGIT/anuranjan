import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProjectsClient from "./ProjectsClient";
import { siteConfig } from "@/lib/data/data";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects | Anuranjan Infratech",
    description: siteConfig.projectsStrings.hero.description,
};

export default function ProjectsPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <ProjectsClient />
            <Footer />
        </main>
    );
}