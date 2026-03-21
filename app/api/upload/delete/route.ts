import { NextResponse } from "next/server";
import { deleteFromCloudinary } from "@/lib/cloudinary";

/**
 * DELETE /api/upload
 *
 * Deletes an image from Cloudinary by public_id.
 *
 * Body: { publicId: "anuranjan/projects/abc123" }
 */
export async function DELETE(request: Request) {
  try {
    const { publicId } = await request.json();

    if (!publicId) {
      return NextResponse.json(
        { error: "publicId is required" },
        { status: 400 }
      );
    }

    const result = await deleteFromCloudinary(publicId);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Delete failed" },
      { status: 500 }
    );
  }
}
