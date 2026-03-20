import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Simple query to verify the connection
    const result = await prisma.$queryRaw<
      { now: Date }[]
    >`SELECT NOW() AS now`;

    return NextResponse.json({
      status: "ok",
      connected: true,
      serverTime: result[0].now,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { status: "error", connected: false, message },
      { status: 500 }
    );
  }
}
