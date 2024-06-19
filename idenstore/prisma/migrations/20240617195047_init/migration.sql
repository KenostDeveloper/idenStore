/*
  Warnings:

  - You are about to drop the column `id_user` on the `Orders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Orders` DROP FOREIGN KEY `Orders_id_user_fkey`;

-- AlterTable
ALTER TABLE `Orders` DROP COLUMN `id_user`,
    ADD COLUMN `email` VARCHAR(191) NULL,
    ADD COLUMN `methodDelivert` VARCHAR(191) NULL,
    ADD COLUMN `name` VARCHAR(191) NULL,
    ADD COLUMN `patronymic` VARCHAR(191) NULL,
    ADD COLUMN `phone` VARCHAR(191) NULL,
    ADD COLUMN `surname` VARCHAR(191) NULL;
