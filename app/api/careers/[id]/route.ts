import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

// PUT /api/careers/[id]
export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  try {
    const body = await request.json();
    const { title, department, location, type, experience } = body;

    const career = await prisma.career.update({
      where: { id: Number(id) },
      data: {
        ...(title !== undefined && { title }),
        ...(department !== undefined && { department }),
        ...(location !== undefined && { location }),
        ...(type !== undefined && { type }),
        ...(experience !== undefined && { experience }),
      },
    });

    return NextResponse.json(career);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update career" },
      { status: 500 }
    );
  }
}

// DELETE /api/careers/[id]
export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  try {
    await prisma.career.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete career" },
      { status: 500 }
    );
  }
}
