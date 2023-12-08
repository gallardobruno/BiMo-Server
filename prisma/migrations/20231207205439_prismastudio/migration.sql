/*
  Warnings:

  - The primary key for the `Owners` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Prospects` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id_dni]` on the table `Owners` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_dni]` on the table `Prospects` will be added. If there are existing duplicate values, this will fail.

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
ALTER TABLE "Bicicles" ALTER COLUMN "id_owner" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Messages" ALTER COLUMN "id_prospect" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Motos" ALTER COLUMN "id_owner" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Orders" ALTER COLUMN "id_prospect" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Owners" DROP CONSTRAINT "Owners_pkey",
ALTER COLUMN "id_dni" SET DATA TYPE TEXT,
ADD CONSTRAINT "Owners_pkey" PRIMARY KEY ("id_dni");

-- AlterTable
ALTER TABLE "Prospects" DROP CONSTRAINT "Prospects_pkey",
ALTER COLUMN "id_dni" SET DATA TYPE TEXT,
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
