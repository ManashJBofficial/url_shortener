import prisma from "../../../lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }

  const { longUrl, userIdNumber } = await req.json();

  try {
    const createdUrl = await prisma.shortenedURLPrivate.create({
      data: {
        long_url: longUrl,
        userIdNo: userIdNumber,
        short_code: generateRandomString(6),
      },
    });

    console.log("createdUrl(6)", createdUrl);
    return NextResponse.json({ body: createdUrl }, { status: 201 });
  } catch (error) {
    console.error("Error creating URL:", error);
    return NextResponse.json(
      { error: "Failed to create URL" },
      { status: 500 }
    );
  }
};

function generateRandomString(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
function addItems(serializedItem: {
  created_at: string;
  id: string;
  long_url: string;
  short_code: string;
  userIdNo: string;
}): any {
  throw new Error("Function not implemented.");
}
