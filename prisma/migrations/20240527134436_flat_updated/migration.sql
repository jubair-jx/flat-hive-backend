/*
  Warnings:

  - Added the required column `amenities` to the `flats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "flats" ADD COLUMN     "amenities" TEXT NOT NULL,
ADD COLUMN     "flatPhoto" TEXT;
