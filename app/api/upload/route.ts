import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";

/**
 * POST /api/upload
 *
 * Accepts multipart/form-data with:
 * - file: the image file
 * - folder: optional Cloudinary folder (default: "anuranjan")
 *
 * Returns the Cloudinary upload result (url, public_id, width, height, etc.)
 *
 * Usage from frontend:
 *   const formData = new FormData();
 *   formData.append("file", fileInput.files[0]);
 *   formData.append("folder", "projects");
 *   const res = await fetch("/api/upload", { method: "POST", body: formData });
 */
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "anuranjan";

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/svg+xml",
      "image/avif",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: `Invalid file type: ${file.type}. Allowed: ${allowedTypes.join(", ")}` },
        { status: 400 }
      );
    }

    // 10MB limit
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large. Max size: 10MB" },
        { status: 400 }
      );
    }

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const result = await uploadToCloudinary(buffer, folder);

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 }
    );
  }
}
