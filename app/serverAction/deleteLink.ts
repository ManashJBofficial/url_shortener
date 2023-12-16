/**
 * Deletes a shortened URL from the database.
 *
 * First deletes any visitor details records associated with the short code.
 * Then deletes the ShortenedURLPrivate record with the matching short code.
 *
 * @param shortCode - The short code of the shortened URL to delete.
 */
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
