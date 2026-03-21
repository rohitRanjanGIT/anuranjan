import { v2 as cloudinary } from "cloudinary";

/**
 * Cloudinary configuration.
 *
 * Reads from CLOUDINARY_URL env var which contains:
 * cloudinary://API_KEY:API_SECRET@CLOUD_NAME
 *
 * This auto-configures cloud_name, api_key, and api_secret.
 */

// CLOUDINARY_URL is auto-parsed by the SDK when set in env
// But we explicitly configure for clarity
const cloudinaryUrl = process.env.CLOUDINARY_URL;

if (cloudinaryUrl) {
  // Parse cloudinary://API_KEY:API_SECRET@CLOUD_NAME
  const match = cloudinaryUrl.match(
    /cloudinary:\/\/(\d+):([^@]+)@(.+)/
  );
  if (match) {
    cloudinary.config({
      cloud_name: match[3],
      api_key: match[1],
      api_secret: match[2],
      secure: true,
    });
  }
}

export { cloudinary };

/**
 * Upload a file buffer to Cloudinary.
 *
 * @param buffer - File buffer (from formData)
 * @param folder - Cloudinary folder (e.g. "projects", "gallery", "testimonials")
 * @param publicId - Optional custom public ID
 * @returns Cloudinary upload result with url, public_id, width, height
 */
export async function uploadToCloudinary(
  buffer: Buffer,
  folder: string = "anuranjan",
  publicId?: string
) {
  return new Promise<{
    url: string;
    secure_url: string;
    public_id: string;
    width: number;
    height: number;
    format: string;
    bytes: number;
  }>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: publicId,
        resource_type: "image",
        transformation: [
          { quality: "auto", fetch_format: "auto" },
        ],
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error("Upload failed"));
        } else {
          resolve({
            url: result.url,
            secure_url: result.secure_url,
            public_id: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
            bytes: result.bytes,
          });
        }
      }
    );

    uploadStream.end(buffer);
  });
}

/**
 * Delete an image from Cloudinary by public_id.
 */
export async function deleteFromCloudinary(publicId: string) {
  return cloudinary.uploader.destroy(publicId);
}
