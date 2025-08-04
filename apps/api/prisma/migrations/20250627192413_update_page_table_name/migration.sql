/*
  Warnings:

  - You are about to drop the `Page` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_siteId_fkey";

-- DropTable
DROP TABLE "Page";

-- CreateTable
CREATE TABLE "page" (
    "id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "page_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "page_siteId_slug_key" ON "page"("siteId", "slug");

-- AddForeignKey
ALTER TABLE "page" ADD CONSTRAINT "page_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "sites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
