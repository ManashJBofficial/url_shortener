import prisma from "../../../lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  if (req.method !== "GET") {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }

  const shortcodeMatch = req.url.split("?shortcode=")[1];
  const shortcode = shortcodeMatch !== null ? shortcodeMatch : null;

  console.log(shortcode);
  try {
    const urlEntry = await prisma.shortenedURL.findUnique({
      where: { short_code: shortcode as string },
    });
    const urlEntryPrivate = await prisma.shortenedURLPrivate.findUnique({
      where: { short_code: shortcode as string },
    });
    console.log("urlEntry", urlEntry);
    console.log("urlEntryPrivate", urlEntryPrivate);

    if (!urlEntry && !urlEntryPrivate) {
      return NextResponse.json(
        { error: "Shortcode not found" },
        { status: 404 }
      );
    }

    const responseData = urlEntry || urlEntryPrivate;

    if (responseData) {
      return NextResponse.json({ url: responseData.long_url }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Shortcode not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching URL:", error);
    return NextResponse.json({ error: "Failed to fetch URL" }, { status: 500 });
  }
};
