/*
  Warnings:

  - You are about to drop the column `short_url` on the `VisitorDetails` table. All the data in the column will be lost.
  - Added the required column `short_url_code` to the `VisitorDetails` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "VisitorDetails" DROP CONSTRAINT "VisitorDetails_short_url_fkey";

-- DropIndex
DROP INDEX "VisitorDetails_short_url_key";

-- AlterTable
ALTER TABLE "VisitorDetails" DROP COLUMN "short_url",
ADD COLUMN     "short_url_code" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "VisitorDetails" ADD CONSTRAINT "VisitorDetails_short_url_code_fkey" FOREIGN KEY ("short_url_code") REFERENCES "ShortenedURLPrivate"("short_code") ON DELETE RESTRICT ON UPDATE CASCADE;
