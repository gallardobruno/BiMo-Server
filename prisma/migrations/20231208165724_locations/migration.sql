/*
  Warnings:

  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Owners" DROP CONSTRAINT "Owners_id_location_fkey";

-- DropForeignKey
ALTER TABLE "Prospects" DROP CONSTRAINT "Prospects_id_Location_fkey";

-- DropTable
DROP TABLE "Location";

-- CreateTable
CREATE TABLE "Locations" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "CP" INTEGER NOT NULL,

    CONSTRAINT "Locations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Owners" ADD CONSTRAINT "Owners_id_location_fkey" FOREIGN KEY ("id_location") REFERENCES "Locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prospects" ADD CONSTRAINT "Prospects_id_Location_fkey" FOREIGN KEY ("id_Location") REFERENCES "Locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
