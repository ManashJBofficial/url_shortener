import prisma from "../../../lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  if (req.method !== "GET") {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }

  try {
    const getAllPublicUrls = await prisma.shortenedURL.findMany();

    console.log("getAllPublicUrls", getAllPublicUrls);
    if (!getAllPublicUrls) {
      return NextResponse.json(
        { error: "Shortcode not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ urls: getAllPublicUrls }, { status: 200 });
  } catch (error) {
    console.error("Error fetching URL:", error);
    return NextResponse.json({ error: "Failed to fetch URL" }, { status: 500 });
  }
};
