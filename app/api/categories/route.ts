import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/categories — with optional pagination
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  try {
    const queryOptions: any = {
      orderBy: { name: "asc" as const },
      include: {
        _count: { select: { projects: true, images: true } },
      },
    };

    if (page && limit) {
      const pageNum = Math.max(1, parseInt(page));
      const limitNum = Math.max(1, parseInt(limit));
      queryOptions.skip = (pageNum - 1) * limitNum;
      queryOptions.take = limitNum;

      const [categories, total] = await Promise.all([
        prisma.category.findMany(queryOptions),
        prisma.category.count(),
      ]);

      return NextResponse.json({
        data: categories,
        meta: { page: pageNum, limit: limitNum, total, totalPages: Math.ceil(total / limitNum) },
      });
    }

    const categories = await prisma.category.findMany(queryOptions);
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

// POST /api/categories
export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    const category = await prisma.category.create({ data: { name } });
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create category" },
      { status: 500 }
    );
  }
}
