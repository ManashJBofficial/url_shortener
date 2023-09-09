import prisma from "../../../lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
  const { name, email, provider, id, image } = await req.json();

  try {
    const insertUser = await prisma.user.create({
      data: {
        user_id: id,
        name: name,
        email: email,
        image_url: image,
        authProviders: {
          create: [
            {
              provider: provider,
              provider_id: id,
            },
          ],
        },
      },
      include: {
        authProviders: true, // Include the associated auth provider in the response
      },
    });

    console.log("inserted data", insertUser);
    return NextResponse.json({ status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to insert data" },
      { status: 500 }
    );
  }
};
