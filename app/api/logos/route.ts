import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/logos
export async function GET() {
  try {
    const logos = await prisma.logo.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(logos);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch logos" },
      { status: 500 }
    );
  }
}

// POST /api/logos
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, src, href } = body;

    const logo = await prisma.logo.create({
      data: { name, src, href: href || null },
    });

    return NextResponse.json(logo, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create logo" },
      { status: 500 }
    );
  }
}
