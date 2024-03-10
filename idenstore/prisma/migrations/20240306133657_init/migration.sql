-- CreateTable
CREATE TABLE `productSpecific` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productSpecificValue` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productSpecificProperty` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_card` INTEGER NOT NULL,
    `id_product_specific` INTEGER NOT NULL,
    `id_product_value` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `productSpecificProperty` ADD CONSTRAINT `productSpecificProperty_id_card_fkey` FOREIGN KEY (`id_card`) REFERENCES `Card`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productSpecificProperty` ADD CONSTRAINT `productSpecificProperty_id_product_specific_fkey` FOREIGN KEY (`id_product_specific`) REFERENCES `productSpecific`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productSpecificProperty` ADD CONSTRAINT `productSpecificProperty_id_product_value_fkey` FOREIGN KEY (`id_product_value`) REFERENCES `productSpecificValue`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
