import { auth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Configuration
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//create an ts interface for the upload result

interface UploadCloudinaryResult {
  public_id: string;
  [key: string]: any;
  bytes: number;
  duration?: number;
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (
      !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      return NextResponse.json(
        { error: "Cloudinary not configured" },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const originalSize = formData.get("originalSize") as string;

    if (!file) {
      return NextResponse.json({ error: "No file found" }, { status: 400 });
    }

    //first convert the file to a buffer through bytes array

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    //upload the file to cloudinary
    const result = await new Promise<UploadCloudinaryResult>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "vidoes-uploads",
            resource_type: "video",
            transformation: [{ quality: "auto", fetch_format: "mp4" }],
          },
          (error, res) => {
            if (error) {
              reject(error);
            } else {
              resolve(res as UploadCloudinaryResult);
            }
          }
        );

        uploadStream.end(buffer);
      }
    );

    //save the video to the database

    const vidoe = await prisma.video.create({
      data: {
        title,
        description,
        publicId: result.public_id,
        originalSize: originalSize,
        compressedSize: String(result.bytes),
        duration: result.duration || 0,
      },
    });

    return NextResponse.json(vidoe);
  } catch {
    return NextResponse.json({ error: "Upload Video failed" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
