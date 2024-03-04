-- AlterTable
ALTER TABLE `Product` ADD COLUMN `id_tag` INTEGER NULL;

-- CreateTable
CREATE TABLE `Tag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_id_tag_fkey` FOREIGN KEY (`id_tag`) REFERENCES `Tag`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
