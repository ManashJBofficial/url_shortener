-- CreateTable
CREATE TABLE "VisitorDetails" (
    "id" TEXT NOT NULL,
    "visit_count" INTEGER NOT NULL,
    "ip" TEXT NOT NULL,
    "browser" TEXT NOT NULL,
    "device" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "long_url" TEXT NOT NULL,
    "short_url" TEXT NOT NULL,

    CONSTRAINT "VisitorDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VisitorDetails_short_url_key" ON "VisitorDetails"("short_url");

-- AddForeignKey
ALTER TABLE "VisitorDetails" ADD CONSTRAINT "VisitorDetails_short_url_fkey" FOREIGN KEY ("short_url") REFERENCES "ShortenedURLPrivate"("short_code") ON DELETE RESTRICT ON UPDATE CASCADE;
