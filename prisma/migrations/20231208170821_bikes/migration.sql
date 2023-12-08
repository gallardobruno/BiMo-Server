/*
  Warnings:

  - You are about to drop the `Bicicles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bicicles" DROP CONSTRAINT "Bicicles_id_owner_fkey";

-- DropTable
DROP TABLE "Bicicles";

-- CreateTable
CREATE TABLE "Bikes" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER,
    "price" INTEGER NOT NULL,
    "photos" INTEGER,
    "id_owner" INTEGER NOT NULL,

    CONSTRAINT "Bikes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bikes" ADD CONSTRAINT "Bikes_id_owner_fkey" FOREIGN KEY ("id_owner") REFERENCES "Owners"("id_dni") ON DELETE RESTRICT ON UPDATE CASCADE;
