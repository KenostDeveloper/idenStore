-- CreateTable
CREATE TABLE `Basket` (
    `id` VARCHAR(191) NOT NULL,
    `id_product` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Basket` ADD CONSTRAINT `Basket_id_product_fkey` FOREIGN KEY (`id_product`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
