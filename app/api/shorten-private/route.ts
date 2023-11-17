import prisma from "../../../lib/db";
import { NextResponse } from "next/server";
import { generateRandomString } from "../../../lib/utils/RandomString";
import handler from "../../isAuth";

export const POST = async (req: Request, res: Response) => {
  const result = await handler(req, res);
  if (!result) {
    return NextResponse.json(
      { message: "You must be logged in." },
      { status: 401 }
    );
  }

  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }

  const { longUrl, userIdNumber } = await req.json();

  try {
    const urlData = await prisma.shortenedURLPrivate.create({
      data: {
        long_url: longUrl,
        userIdNo: userIdNumber,
        short_code: generateRandomString(6),
      },
    });

    console.log("urlData", urlData);
    return NextResponse.json({ body: urlData }, { status: 201 });
  } catch (error) {
    console.error("Error creating URL:", error);
    return NextResponse.json(
      { error: "Failed to create URL" },
      { status: 500 }
    );
  }
};
