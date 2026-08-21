-- CreateTable
CREATE TABLE "ColoringPack" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "coverImage" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'Ζωγραφιές',
    "priceCents" INTEGER NOT NULL DEFAULT 299,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ColoringPack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ColoringPage" (
    "id" TEXT NOT NULL,
    "packId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "ColoringPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ColoringPurchase" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "packId" TEXT NOT NULL,
    "stripeSessionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ColoringPurchase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ColoringPurchase_userId_packId_key" ON "ColoringPurchase"("userId", "packId");

-- AddForeignKey
ALTER TABLE "ColoringPage" ADD CONSTRAINT "ColoringPage_packId_fkey" FOREIGN KEY ("packId") REFERENCES "ColoringPack"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ColoringPurchase" ADD CONSTRAINT "ColoringPurchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ColoringPurchase" ADD CONSTRAINT "ColoringPurchase_packId_fkey" FOREIGN KEY ("packId") REFERENCES "ColoringPack"("id") ON DELETE CASCADE ON UPDATE CASCADE;
