import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/careers
export async function GET() {
  try {
    const careers = await prisma.career.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(careers);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch careers" },
      { status: 500 }
    );
  }
}

// POST /api/careers
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, department, location, type, experience } = body;

    const career = await prisma.career.create({
      data: { title, department, location, type, experience },
    });

    return NextResponse.json(career, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create career" },
      { status: 500 }
    );
  }
}
