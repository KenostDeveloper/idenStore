/*
  Warnings:

  - You are about to drop the column `color_id` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `id_cardCategory` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `id_company` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `CardCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_category` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Color` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Color` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_color` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_size` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `CardCategory` DROP FOREIGN KEY `CardCategory_id_subCategory_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_color_id_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_id_cardCategory_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_id_company_fkey`;

-- DropForeignKey
ALTER TABLE `SubCategory` DROP FOREIGN KEY `SubCategory_id_category_fkey`;

-- AlterTable
ALTER TABLE `Card` ADD COLUMN `id_category` INTEGER NOT NULL,
    ADD COLUMN `id_company` INTEGER NULL;

-- AlterTable
ALTER TABLE `Color` ADD COLUMN `code` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `color_id`,
    DROP COLUMN `id_cardCategory`,
    DROP COLUMN `id_company`,
    ADD COLUMN `id_color` INTEGER NOT NULL,
    ADD COLUMN `id_size` INTEGER NOT NULL;

-- DropTable
DROP TABLE `CardCategory`;

-- DropTable
DROP TABLE `SubCategory`;

-- CreateTable
CREATE TABLE `Size` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_id_color_fkey` FOREIGN KEY (`id_color`) REFERENCES `Color`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_id_size_fkey` FOREIGN KEY (`id_size`) REFERENCES `Size`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Card` ADD CONSTRAINT `Card_id_company_fkey` FOREIGN KEY (`id_company`) REFERENCES `Company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Card` ADD CONSTRAINT `Card_id_category_fkey` FOREIGN KEY (`id_category`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
