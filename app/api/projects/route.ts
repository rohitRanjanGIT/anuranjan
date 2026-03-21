import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/projects — list projects with optional pagination
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    const categoryId = searchParams.get("categoryId");
    const status = searchParams.get("status");
    const homepagePortfolio = searchParams.get("homepagePortfolio");

    const where: any = {};
    if (categoryId && categoryId !== "ALL") where.categoryId = Number(categoryId);
    if (status && status !== "ALL") where.status = status;
    if (homepagePortfolio === "true") where.homepagePortfolio = true;

    const queryOptions: any = {
      where,
      include: { category: true, images: true },
      orderBy: { createdAt: "desc" },
    };

    if (page && limit) {
      const pageNum = Math.max(1, parseInt(page));
      const limitNum = Math.max(1, parseInt(limit));
      queryOptions.skip = (pageNum - 1) * limitNum;
      queryOptions.take = limitNum;

      const [data, total] = await Promise.all([
        prisma.project.findMany(queryOptions),
        prisma.project.count({ where })
      ]);

      return NextResponse.json({
        data,
        meta: {
          total,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(total / limitNum),
        }
      });
    }

    // Default return all for backwards compatibility
    const projects = await prisma.project.findMany(queryOptions);
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
