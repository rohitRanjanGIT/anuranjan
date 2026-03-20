import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/testimonials
export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(testimonials);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

// POST /api/testimonials
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, role, content, avatar, rating, source } = body;

    const testimonial = await prisma.testimonial.create({
      data: { name, role, content, avatar, rating, source },
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create testimonial" },
      { status: 500 }
    );
  }
}
