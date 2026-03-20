import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/images — list all images (newest first)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const heroOnly = searchParams.get("hero") === "true";
  const categoryId = searchParams.get("categoryId");

  try {
    const images = await prisma.image.findMany({
      where: {
        ...(heroOnly && { heroCarousel: true }),
        ...(categoryId && { categoryId: Number(categoryId) }),
      },
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
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
