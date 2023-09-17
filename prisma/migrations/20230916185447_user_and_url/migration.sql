/*
  Warnings:

  - Added the required column `userIdNo` to the `ShortenedURL` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ShortenedURL" ADD COLUMN     "userIdNo" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ShortenedURL" ADD CONSTRAINT "ShortenedURL_userIdNo_fkey" FOREIGN KEY ("userIdNo") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
