/*
  Warnings:

  - The required column `uid` was added to the `productProperty` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `productProperty` ADD COLUMN `uid` VARCHAR(191) NOT NULL;
