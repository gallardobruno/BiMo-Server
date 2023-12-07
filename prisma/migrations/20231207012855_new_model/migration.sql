/*
  Warnings:

  - You are about to drop the column `message` on the `Prospects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Orders" ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Prospects" DROP COLUMN "message";

-- CreateTable
CREATE TABLE "Messages" (
    "id" SERIAL NOT NULL,
    "id_prospect" INTEGER NOT NULL,
    "id_order" INTEGER NOT NULL,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_id_prospect_fkey" FOREIGN KEY ("id_prospect") REFERENCES "Prospects"("id_dni") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
