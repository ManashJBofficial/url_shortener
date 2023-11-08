"use server";
import prisma from "../../lib/db";

const deleteLink = async (shortCode: string) => {
  // First, delete related VisitorDetails records
  await prisma.visitorDetails.deleteMany({
    where: {
      short_url_code: shortCode,
    },
  });

  // Then, delete the ShortenedURLPrivate record
  await prisma.shortenedURLPrivate.delete({
    where: {
      short_code: shortCode,
    },
  });
};

export { deleteLink };
