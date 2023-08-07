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

    console.log("urlEntry", urlEntry);
    if (!urlEntry) {
      return NextResponse.json(
        { error: "Shortcode not found" },
        { status: 404 }
      );
    }

    // Redirect the user to the long URL
    // return NextResponse.redirect(new URL( urlEntry.long_url))
    return NextResponse.json({ url: urlEntry.long_url }, { status: 200 });
  } catch (error) {
    console.error("Error fetching URL:", error);
    return NextResponse.json({ error: "Failed to fetch URL" }, { status: 500 });
  }
};
