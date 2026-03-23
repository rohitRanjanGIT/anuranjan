import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

// PATCH /api/enquiries/[id] — mark as read/unread
export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  try {
    const body = await request.json();
    const enquiry = await prisma.enquiry.update({
      where: { id: Number(id) },
      data: { read: body.read },
    });
    return NextResponse.json(enquiry);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update enquiry" },
      { status: 500 }
    );
  }
}

// DELETE /api/enquiries/[id]
export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  try {
    await prisma.enquiry.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete enquiry" },
      { status: 500 }
    );
  }
}
