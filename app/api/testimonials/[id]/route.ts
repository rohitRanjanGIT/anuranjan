import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

// PUT /api/testimonials/[id]
export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  try {
    const body = await request.json();
    const { name, role, content, avatar, rating, source } = body;

    const testimonial = await prisma.testimonial.update({
      where: { id: Number(id) },
      data: {
        ...(name !== undefined && { name }),
        ...(role !== undefined && { role }),
        ...(content !== undefined && { content }),
        ...(avatar !== undefined && { avatar }),
        ...(rating !== undefined && { rating }),
        ...(source !== undefined && { source }),
      },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update testimonial" },
      { status: 500 }
    );
  }
}

// DELETE /api/testimonials/[id]
export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  try {
    await prisma.testimonial.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}
