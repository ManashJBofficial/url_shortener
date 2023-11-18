import prisma from "../../../lib/db";
import { NextResponse } from "next/server";
import { generateRandomString } from "../../../lib/utils/RandomString";

export const POST = async (req: Request, res: Response) => {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }

  const { longUrl } = await req.json();

  try {
    const urlData = await prisma.shortenedURL.create({
      data: {
        long_url: longUrl,
        short_code: generateRandomString(6),
      },
    });
    return NextResponse.json({ body: urlData }, { status: 201 });
  } catch (error) {
    console.error("Error creating URL:", error);
    return NextResponse.json(
      { error: "Failed to create URL" },
      { status: 500 }
    );
  }
};
