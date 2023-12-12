/*
  Warnings:

  - Added the required column `id_bike` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Messages" ADD COLUMN     "message" TEXT;

-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "id_bike" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_id_bike_fkey" FOREIGN KEY ("id_bike") REFERENCES "Bikes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
