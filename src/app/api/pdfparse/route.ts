// src/app/api/convert-pdf/route.ts
import { NextResponse } from "next/server";

// This is needed for parsing multipart form data
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  if (!req.headers.get("content-type")?.includes("multipart/form-data")) {
    return NextResponse.json(
      { error: "Content type must be multipart/form-data" },
      { status: 400 }
    );
  }

  const apiKey = process.env.OCR_SPACE_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "OCR API key not configured" },
      { status: 500 }
    );
  }

  try {
    // Parse the incoming form data
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No PDF file provided" },
        { status: 400 }
      );
    }

    // Create a new FormData object for the API request
    const apiFormData = new FormData();

    // Convert the file to an ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();

    // Add the file to the API request
    apiFormData.append("file", new Blob([arrayBuffer]), file.name);
    apiFormData.append("apikey", apiKey);
    apiFormData.append("language", "eng");
    apiFormData.append("isOverlayRequired", "false");
    apiFormData.append("filetype", "PDF");

    // Make the API request
    const response = await fetch("https://api.ocr.space/parse/image", {
      method: "POST",
      body: apiFormData,
    });

    // Parse the API response
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.ErrorMessage || "Failed to convert PDF");
    }

    // Return the extracted text
    return NextResponse.json({
      text: data.ParsedResults?.[0]?.ParsedText || "",
      status: data.OCRExitCode,
    });
  } catch (error) {
    console.error("Error converting PDF:", error);
    return NextResponse.json(
      { error: "Failed to convert PDF" },
      { status: 500 }
    );
  }
}
