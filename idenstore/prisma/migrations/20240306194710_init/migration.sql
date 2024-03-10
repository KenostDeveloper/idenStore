/*
  Warnings:

  - You are about to drop the `productSpecific` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productSpecificProperty` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productSpecificValue` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `productSpecificProperty` DROP FOREIGN KEY `productSpecificProperty_id_card_fkey`;

-- DropForeignKey
ALTER TABLE `productSpecificProperty` DROP FOREIGN KEY `productSpecificProperty_id_product_specific_fkey`;

-- DropForeignKey
ALTER TABLE `productSpecificProperty` DROP FOREIGN KEY `productSpecificProperty_id_product_value_fkey`;

-- DropTable
DROP TABLE `productSpecific`;

-- DropTable
DROP TABLE `productSpecificProperty`;

-- DropTable
DROP TABLE `productSpecificValue`;

-- CreateTable
CREATE TABLE `productProperty` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_card` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `productProperty` ADD CONSTRAINT `productProperty_id_card_fkey` FOREIGN KEY (`id_card`) REFERENCES `Card`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
