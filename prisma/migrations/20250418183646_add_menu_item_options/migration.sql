/*
  Warnings:

  - You are about to drop the column `label` on the `MenuItemOption` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `MenuItemOption` table. All the data in the column will be lost.
  - Added the required column `name` to the `MenuItemOption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `MenuItemOption` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MenuItemOption" DROP COLUMN "label",
DROP COLUMN "value",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
