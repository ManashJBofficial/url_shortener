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
