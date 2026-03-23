import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/enquiries — with optional pagination
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  try {
    const queryOptions: any = {
      orderBy: { createdAt: "desc" as const },
    };

    if (page && limit) {
      const pageNum = Math.max(1, parseInt(page));
      const limitNum = Math.max(1, parseInt(limit));
      queryOptions.skip = (pageNum - 1) * limitNum;
      queryOptions.take = limitNum;

      const [enquiries, total] = await Promise.all([
        prisma.enquiry.findMany(queryOptions),
        prisma.enquiry.count(),
      ]);

      return NextResponse.json({
        data: enquiries,
        meta: { page: pageNum, limit: limitNum, total, totalPages: Math.ceil(total / limitNum) },
      });
    }

    const enquiries = await prisma.enquiry.findMany(queryOptions);
    return NextResponse.json(enquiries);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}

// POST /api/enquiries
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Name, email, subject, and message are required" },
        { status: 400 }
      );
    }

    const enquiry = await prisma.enquiry.create({
      data: { name, email, phone: phone || null, subject, message },
    });

    return NextResponse.json(enquiry, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create enquiry" },
      { status: 500 }
    );
  }
}
