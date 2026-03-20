import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

// PUT /api/images/[id]
export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  try {
    const body = await request.json();
    const { src, width, height, title, categoryId, heroCarousel } = body;

    const image = await prisma.image.update({
      where: { id: Number(id) },
      data: {
        ...(src !== undefined && { src }),
        ...(width !== undefined && { width: Number(width) }),
        ...(height !== undefined && { height: Number(height) }),
        ...(title !== undefined && { title }),
        ...(categoryId !== undefined && { categoryId: Number(categoryId) }),
        ...(heroCarousel !== undefined && { heroCarousel }),
      },
      include: { category: true },
    });

    return NextResponse.json(image);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update image" },
      { status: 500 }
    );
  }
}

// DELETE /api/images/[id]
export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  try {
    await prisma.image.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete image" },
      { status: 500 }
    );
  }
}
