import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/projects — list all projects (newest first)
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: { category: true, images: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST /api/projects — create a new project
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, categoryId, type, image, images, location, status, year, homepagePortfolio } = body;

    const project = await prisma.project.create({
      data: {
        title,
        description,
        categoryId: Number(categoryId),
        type,
        image,
        location,
        status: status || "COMPLETED",
        year,
        homepagePortfolio: homepagePortfolio || false,
        ...(images && images.length > 0
          ? { images: { connect: images.map((id: number) => ({ id })) } }
          : {}),
      },
      include: { category: true, images: true },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create project" },
      { status: 500 }
    );
  }
}
