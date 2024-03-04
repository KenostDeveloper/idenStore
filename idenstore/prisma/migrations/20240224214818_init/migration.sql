/*
  Warnings:

  - You are about to drop the column `token` on the `Basket` table. All the data in the column will be lost.
  - Added the required column `id_token` to the `Basket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Basket` DROP COLUMN `token`,
    ADD COLUMN `id_token` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `BasketToken` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Basket` ADD CONSTRAINT `Basket_id_token_fkey` FOREIGN KEY (`id_token`) REFERENCES `BasketToken`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
