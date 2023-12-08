/*
  Warnings:

  - The primary key for the `Owners` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Prospects` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id_owner` on the `Bicicles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_prospect` on the `Messages` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_owner` on the `Motos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_prospect` on the `Orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_dni` on the `Owners` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_dni` on the `Prospects` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Bicicles" DROP CONSTRAINT "Bicicles_id_owner_fkey";

-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_id_prospect_fkey";

-- DropForeignKey
ALTER TABLE "Motos" DROP CONSTRAINT "Motos_id_owner_fkey";

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_id_prospect_fkey";

-- AlterTable
ALTER TABLE "Bicicles" DROP COLUMN "id_owner",
ADD COLUMN     "id_owner" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Messages" DROP COLUMN "id_prospect",
ADD COLUMN     "id_prospect" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Motos" DROP COLUMN "id_owner",
ADD COLUMN     "id_owner" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "id_prospect",
ADD COLUMN     "id_prospect" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Owners" DROP CONSTRAINT "Owners_pkey",
DROP COLUMN "id_dni",
ADD COLUMN     "id_dni" INTEGER NOT NULL,
ADD CONSTRAINT "Owners_pkey" PRIMARY KEY ("id_dni");

-- AlterTable
ALTER TABLE "Prospects" DROP CONSTRAINT "Prospects_pkey",
DROP COLUMN "id_dni",
ADD COLUMN     "id_dni" INTEGER NOT NULL,
ADD CONSTRAINT "Prospects_pkey" PRIMARY KEY ("id_dni");

-- CreateIndex
CREATE UNIQUE INDEX "Owners_id_dni_key" ON "Owners"("id_dni");

-- CreateIndex
CREATE UNIQUE INDEX "Prospects_id_dni_key" ON "Prospects"("id_dni");

-- AddForeignKey
ALTER TABLE "Motos" ADD CONSTRAINT "Motos_id_owner_fkey" FOREIGN KEY ("id_owner") REFERENCES "Owners"("id_dni") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_id_prospect_fkey" FOREIGN KEY ("id_prospect") REFERENCES "Prospects"("id_dni") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bicicles" ADD CONSTRAINT "Bicicles_id_owner_fkey" FOREIGN KEY ("id_owner") REFERENCES "Owners"("id_dni") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_id_prospect_fkey" FOREIGN KEY ("id_prospect") REFERENCES "Prospects"("id_dni") ON DELETE RESTRICT ON UPDATE CASCADE;
