/**
 * Retrieves the authenticated user from the database.
 *
 * @param email - The email address of the user.
 * @param imageUrlPrefix - The prefix to match against the user's image URL.
 * @returns The user object if found, otherwise undefined.
 */
"use server";
import prisma from "../../lib/db";

const getAuthUser = async (email: string, imageUrlPrefix: string) => {
  const user = await prisma.user.findFirst({
    where: {
      AND: [
        {
          email: email,
        },
        {
          image_url: {
            startsWith: imageUrlPrefix,
          },
        },
      ],
    },
  });
  return user;
};

export { getAuthUser };
