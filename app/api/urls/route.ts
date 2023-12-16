/**
 * GET handler for retrieving all public shortened URLs.
 *
 * Imports prisma client and Next.js server utilities.
 *
 * Checks request method is GET, returns 405 error if not.
 *
 * Calls prisma to findMany() shortened URLs.
 *
 * Returns 404 error if no URLs found.
 *
 * Returns 200 OK with found URLs.
 *
 * Logs and returns 500 error on any exceptions.
 */
import prisma from "../../../lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  if (req.method !== "GET") {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }

  try {
    const getAllPublicUrls = await prisma.shortenedURL.findMany();

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
