/**
 * POST handler for /api/user/route.ts.
 *
 * This endpoint handles user creation. It takes the user info from the request body,
 * creates a new user record in the database via Prisma, and returns a 201 response
 * if successful. If the method is not POST, it returns a 405. If there is an error
 * inserting the user, it returns a 500 with an error message.
 */
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

    return NextResponse.json({ status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to insert data" },
      { status: 500 }
    );
  }
};
