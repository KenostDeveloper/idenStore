/*
  Warnings:

  - You are about to drop the column `id_cardCategory` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Product` table. All the data in the column will be lost.
  - Added the required column `name` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_cardCategory` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Card` DROP FOREIGN KEY `Card_id_cardCategory_fkey`;

-- AlterTable
ALTER TABLE `Card` DROP COLUMN `id_cardCategory`,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `description`,
    DROP COLUMN `name`,
    ADD COLUMN `id_cardCategory` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_id_cardCategory_fkey` FOREIGN KEY (`id_cardCategory`) REFERENCES `CardCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
