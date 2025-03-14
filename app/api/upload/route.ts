import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    // ✅ Ensure request is multipart/form-data
    if (!req.headers.get("content-type")?.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Invalid content type" },
        { status: 400 }
      );
    }
    const formData = await req.formData();

    // Extract file from FormData
    const file = formData.get("file") as Blob | null;
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    const fileName = file instanceof File ? file.name : "uploaded-file";

    // Convert Blob to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Save file to database
    const savedFile = await prisma.file.create({
      data: {
        name: fileName || "uploaded-file",
        data: buffer, // Store binary data
        mimeType: file.type || "application/octet-stream",
      },
    });

    return NextResponse.json({ success: true, fileId: savedFile.id });
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
