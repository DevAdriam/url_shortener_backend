-- CreateTable
CREATE TABLE "urls" (
    "id" TEXT NOT NULL,
    "originalURL" CHAR(255) NOT NULL,
    "shortenURL" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "urls_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "urls_originalURL_key" ON "urls"("originalURL");
