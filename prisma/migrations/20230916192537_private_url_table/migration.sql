/*
  Warnings:

  - You are about to drop the column `userIdNo` on the `ShortenedURL` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ShortenedURL" DROP CONSTRAINT "ShortenedURL_userIdNo_fkey";

-- AlterTable
ALTER TABLE "ShortenedURL" DROP COLUMN "userIdNo";

-- CreateTable
CREATE TABLE "ShortenedURLPrivate" (
    "id" TEXT NOT NULL,
    "long_url" TEXT NOT NULL,
    "short_code" TEXT NOT NULL,
    "userIdNo" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShortenedURLPrivate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShortenedURLPrivate_short_code_key" ON "ShortenedURLPrivate"("short_code");

-- AddForeignKey
ALTER TABLE "ShortenedURLPrivate" ADD CONSTRAINT "ShortenedURLPrivate_userIdNo_fkey" FOREIGN KEY ("userIdNo") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
