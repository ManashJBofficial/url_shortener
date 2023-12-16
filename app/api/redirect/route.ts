/**
 * GET handler for redirecting short URLs.
 *
 * Fetches IP and browser info from client.
 * Looks up shortcode in DB.
 * If found, redirects to associated long URL.
 * If not found, returns 404.
 *
 * Stores visit details in DB if private shortcode.
 * Handles errors and returns appropriate status codes.
 */
import prisma from "../../../lib/db";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { visitorDetails } from "../../serverAction/storeVisitorDetails";

async function fetchIpInfo() {
  try {
    const response = await fetch("https://ip.nf/me.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching IP info:", error);
  }
}

export const GET = async (req: NextRequest, res: NextResponse) => {
  if (req.method !== "GET") {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }

  const getIp = await fetchIpInfo();
  const ip = getIp.ip.ip;
  const country = getIp.ip.country;
  const headersList = headers();
  const browserArr = headersList.get("sec-ch-ua");
  const browser = browserArr?.split(",")[1].split(";")[0];
  const os = headersList.get("sec-ch-ua-platform");

  const shortcodeMatch = req.url.split("?shortcode=")[1];
  const shortcode = shortcodeMatch !== null ? shortcodeMatch : null;

  try {
    const urlEntry = await prisma.shortenedURL.findUnique({
      where: { short_code: shortcode as string },
    });
    const urlEntryPrivate = await prisma.shortenedURLPrivate.findUnique({
      where: { short_code: shortcode as string },
    });

    if (!urlEntry && !urlEntryPrivate) {
      return NextResponse.json(
        { error: "Shortcode not found" },
        { status: 404 }
      );
    }

    const responseData = urlEntry || urlEntryPrivate;

    if (urlEntryPrivate) {
      const visitorData = {
        ip: ip,
        country: country,
        browser: browser,
        os: os,
        short_code: shortcode,
        long_url: responseData?.long_url,
      };
      const visit_detail = await visitorDetails(visitorData);
    }

    if (responseData) {
      return NextResponse.json({ url: responseData.long_url }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Shortcode not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch URL" }, { status: 500 });
  }
};
