import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import { siteConfig } from "@/lib/data/data";
import { Metadata } from "next";
import CompanyStory from "./components/CompanyStory";
import MissionVision from "./components/MissionVision";
import TeamGrid from "./components/TeamGrid";
import JourneyTimeline from "./components/JourneyTimeline";

export const metadata: Metadata = {
    title: "About Us | Anuranjan Infratech",
    description: siteConfig.aboutStrings.hero.description,
};

export default function AboutPage() {
    const { hero } = siteConfig.aboutStrings;

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <Hero
                title={hero.title}
                subtitle={hero.subtitle}
                description={hero.description}
                backgroundImage="https://lh3.googleusercontent.com/aida-public/AB6AXuDiBv1EokLVMppNO16XoFKj2CHF1uVQ196U3zn077puTyZaBtMpKt0e6Wn6qlMKHr8zk46y8VjguAybwVgr_iszvefNImzCU5rDmuI79CKRprVYP2z4ezV54mWNycGQ1uEO0t89YOXKJSP_wy3Cf7G3D2qDas7r5TNtJAC4jlbpoOnPqrHmb9GISQ-Kmy2toCY7kjxUTjQvZe_61scwG3uXHcpO43TbOu_5TAvBEJJHwVLYoD687Pq8D5y7AGeE9dsYeILM_oSa6Z2g"
            />

            <CompanyStory />
            <MissionVision />
            <TeamGrid />
            <JourneyTimeline />

            <Footer />
        </main>
    );
}
