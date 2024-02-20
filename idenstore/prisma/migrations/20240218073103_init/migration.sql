-- DropForeignKey
ALTER TABLE `Card` DROP FOREIGN KEY `Card_id_category_fkey`;

-- AlterTable
ALTER TABLE `Card` MODIFY `id_category` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Card` ADD CONSTRAINT `Card_id_category_fkey` FOREIGN KEY (`id_category`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
