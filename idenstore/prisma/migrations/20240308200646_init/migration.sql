-- DropIndex
DROP INDEX `Product_acticle_idx` ON `Product`;

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `search` VARCHAR(191) NULL;

-- CreateIndex
CREATE FULLTEXT INDEX `Product_search_idx` ON `Product`(`search`);
