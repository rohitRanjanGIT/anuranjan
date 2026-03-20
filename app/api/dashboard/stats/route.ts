import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/dashboard/stats — aggregated counts for dashboard cards
export async function GET() {
  try {
    const [
      totalProjects,
      ongoingProjects,
      completedProjects,
      totalImages,
      heroImages,
      totalTestimonials,
      totalCareers,
      totalCategories,
      featuredProjects,
    ] = await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { status: "ONGOING" } }),
      prisma.project.count({ where: { status: "COMPLETED" } }),
      prisma.image.count(),
      prisma.image.count({ where: { heroCarousel: true } }),
      prisma.testimonial.count(),
      prisma.career.count(),
      prisma.category.count(),
      prisma.project.count({ where: { homepagePortfolio: true } }),
    ]);

    return NextResponse.json({
      totalProjects,
      ongoingProjects,
      completedProjects,
      totalImages,
      heroImages,
      totalTestimonials,
      totalCareers,
      totalCategories,
      featuredProjects,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
