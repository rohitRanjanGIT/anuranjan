import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

// GET /api/projects/[id]
export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  try {
    const project = await prisma.project.findUnique({
      where: { id: Number(id) },
      include: { category: true, images: true },
    });
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch project" },
      { status: 500 }
    );
  }
}

// PUT /api/projects/[id]
export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  try {
    const body = await request.json();
    const { title, description, content, categoryId, type, image, images, location, status, year, homepagePortfolio } = body;

    const project = await prisma.project.update({
      where: { id: Number(id) },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(content !== undefined && { content }),
        ...(categoryId !== undefined && { categoryId: Number(categoryId) }),
        ...(type !== undefined && { type }),
        ...(image !== undefined && { image }),
        ...(location !== undefined && { location }),
        ...(status !== undefined && { status }),
        ...(year !== undefined && { year }),
        ...(homepagePortfolio !== undefined && { homepagePortfolio }),
        ...(images !== undefined && {
          images: { set: images.map((imgId: number) => ({ id: imgId })) },
        }),
      },
      include: { category: true, images: true },
    });

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[id]
export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  try {
    await prisma.project.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete project" },
      { status: 500 }
    );
  }
}
