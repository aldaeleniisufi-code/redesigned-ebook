-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "authorEn" TEXT,
ADD COLUMN     "descriptionEn" TEXT,
ADD COLUMN     "titleEn" TEXT;

-- AlterTable
ALTER TABLE "ColoringPack" ADD COLUMN     "descriptionEn" TEXT,
ADD COLUMN     "titleEn" TEXT;

-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "textEn" TEXT;
