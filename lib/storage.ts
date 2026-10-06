import { writeFile, mkdir } from "fs/promises";
import path from "path";

const MIME: Record<string, string> = {
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

/**
 * Persist an uploaded file and return its public URL.
 * - On Vercel (BLOB_READ_WRITE_TOKEN set) → Vercel Blob (persistent).
 * - Locally → public/uploads/<folder> on disk.
 */
export async function saveUpload(
  buffer: Buffer,
  filename: string,
  folder: "cv" | "news"
): Promise<string> {
  const ext = path.extname(filename).toLowerCase();
  const contentType = MIME[ext] || "application/octet-stream";

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import("@vercel/blob");
    const blob = await put(`${folder}/${filename}`, buffer, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
      addRandomSuffix: false,
      contentType,
    });
    return blob.url;
  }

  const dir = path.join(process.cwd(), "public", "uploads", folder);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), buffer);
  return `/uploads/${folder}/${filename}`;
}
