/*
  Warnings:

  - You are about to drop the column `rankingPosition` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_rankingPosition_idx";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "rankingPosition";
