import { auth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

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
}

export async function POST(req: NextRequest) {
  try {
    //check authorization through clerk

    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file found" }, { status: 400 });
    }

    //first convert the file to a buffer through bytes array

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    //upload the file to cloudinary
    const uploadResult = await new Promise<UploadCloudinaryResult>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "image-uploads" },
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

    return NextResponse.json(
      { publicId: uploadResult.public_id },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
