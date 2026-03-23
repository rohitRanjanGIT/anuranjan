import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PUT /api/logos/:id
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, src, href } = body;

    const logo = await prisma.logo.update({
      where: { id: Number(id) },
      data: {
        ...(name !== undefined && { name }),
        ...(src !== undefined && { src }),
        ...(href !== undefined && { href: href || null }),
      },
    });

    return NextResponse.json(logo);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update logo" },
      { status: 500 }
    );
  }
}

// DELETE /api/logos/:id
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.logo.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete logo" },
      { status: 500 }
    );
  }
}
