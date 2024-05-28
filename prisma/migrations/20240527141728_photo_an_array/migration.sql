/*
  Warnings:

  - The `flatPhoto` column on the `flats` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "flats" DROP COLUMN "flatPhoto",
ADD COLUMN     "flatPhoto" TEXT[] DEFAULT ARRAY[]::TEXT[];
