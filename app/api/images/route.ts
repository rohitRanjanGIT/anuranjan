import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/images — list images (newest first), with optional pagination
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const heroOnly = searchParams.get("hero") === "true";
  const categoryId = searchParams.get("categoryId");
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  try {
    const where = {
      ...(heroOnly && { heroCarousel: true }),
      ...(categoryId && { categoryId: Number(categoryId) }),
    };

    const queryOptions: any = {
      where,
      include: { category: true },
      orderBy: { createdAt: "desc" as const },
    };

    if (page && limit) {
      const pageNum = Math.max(1, parseInt(page));
      const limitNum = Math.max(1, parseInt(limit));
      queryOptions.skip = (pageNum - 1) * limitNum;
      queryOptions.take = limitNum;

      const [images, total] = await Promise.all([
        prisma.image.findMany(queryOptions),
        prisma.image.count({ where }),
      ]);

      return NextResponse.json({
        data: images,
        meta: { page: pageNum, limit: limitNum, total, totalPages: Math.ceil(total / limitNum) },
      });
    }

    const images = await prisma.image.findMany(queryOptions);
    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch images" },
      { status: 500 }
    );
  }
}

// POST /api/images — create a new image
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { src, width, height, title, categoryId, heroCarousel } = body;

    const image = await prisma.image.create({
      data: {
        src,
        width: Number(width),
        height: Number(height),
        title,
        categoryId: Number(categoryId),
        heroCarousel: heroCarousel || false,
      },
      include: { category: true },
    });

    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create image" },
      { status: 500 }
    );
  }
}
