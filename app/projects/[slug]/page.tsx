import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { prisma } from "@/lib/prisma";
import { parseProjectId } from "@/lib/utils";
import ProjectDetailClient from "./ProjectDetailClient";

type Params = { params: Promise<{ slug: string }> };

async function getProject(slug: string) {
    const id = parseProjectId(slug);
    if (id === null) return null;
    return prisma.project.findUnique({
        where: { id },
        include: { category: true, images: true },
    });
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { slug } = await params;
    const project = await getProject(slug);

    if (!project) {
        return { title: "Project Not Found | Anuranjan Infratech" };
    }

    const description =
        project.description ??
        `${project.title} — a ${project.category.name.toLowerCase()} project by Anuranjan Infratech${project.location ? ` in ${project.location}` : ""}.`;

    return {
        title: `${project.title} | Anuranjan Infratech`,
        description,
        openGraph: {
            title: project.title,
            description,
            images: project.image ? [{ url: project.image }] : undefined,
        },
    };
}

export default async function ProjectDetailPage({ params }: Params) {
    const { slug } = await params;
    const project = await getProject(slug);

    if (!project) notFound();

    // Pull a few sibling projects from the same category for the "related" strip.
    const related = await prisma.project.findMany({
        where: { categoryId: project.categoryId, NOT: { id: project.id } },
        include: { category: true },
        orderBy: { createdAt: "desc" },
        take: 3,
    });

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <ProjectDetailClient
                project={JSON.parse(JSON.stringify(project))}
                related={JSON.parse(JSON.stringify(related))}
            />
            <Footer />
        </main>
    );
}
