import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

// PUT /api/categories/[id]
export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  try {
    const { name } = await request.json();
    const category = await prisma.category.update({
      where: { id: Number(id) },
      data: { name },
    });
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update category" },
      { status: 500 }
    );
  }
}

// DELETE /api/categories/[id]
export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  try {
    await prisma.category.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete category" },
      { status: 500 }
    );
  }
}
