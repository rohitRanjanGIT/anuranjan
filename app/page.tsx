import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Overview from "./components/Overview";
import ServicesGrid from "./components/ServicesGrid";
import FeaturedProjects from "./components/FeaturedProjects";
import TestimonialsSection from "./components/TestimonialsSection";
import FinalCTA from "./components/FinalCTA";
import { siteConfig } from "@/lib/data/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
  description: siteConfig.description,
};

export default function Home() {
  const { hero } = siteConfig.homeStrings;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <Hero
        title={hero.title}
        highlightedText={hero.highlightedText}
        subtitle={hero.subtitle}
        description={siteConfig.description}
        backgroundImage="https://lh3.googleusercontent.com/aida-public/AB6AXuA8xU9AbMloXbzR2PuV4o998pjAjl84tN8mrr4IttSkVZcBtuPQLJQfJK1Tr76o-7GaCELjMEdZz89dzRN8L7wU37sNkqrImm8Sm1o4G6s3f26qbhKmttKJ7983XSZ1RYKBTDMbsEGxDQKmvw07yZA6uODH-5yThpen_oL1SP9y6oNf8RmE7IMW0k5v79nBKCFOpOHzkVNd9bdCv7079C-jDFQ3Hyo6q-szu9AxuE1fjqJWGtMTj_sKGh3yheYb98Z1QmMZeoayMfdb"
        large={true}
        primaryButtonText={hero.primaryButton}
        secondaryButtonText={hero.secondaryButton}
      />

      <Overview />
      <ServicesGrid />
      <FeaturedProjects />
      <TestimonialsSection />
      <FinalCTA />

      <Footer />
    </main>
  );
}
