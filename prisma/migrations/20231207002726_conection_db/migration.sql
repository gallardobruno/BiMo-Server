-- CreateTable
CREATE TABLE "Motos" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "km" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "photos" INTEGER,
    "id_owner" INTEGER NOT NULL,

    CONSTRAINT "Motos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "id_moto" INTEGER NOT NULL,
    "id_prospect" INTEGER NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Owners" (
    "id_dni" INTEGER NOT NULL,
    "owner_name" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "id_location" INTEGER NOT NULL,

    CONSTRAINT "Owners_pkey" PRIMARY KEY ("id_dni")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "CP" INTEGER NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prospects" (
    "id_dni" INTEGER NOT NULL,
    "prospect_name" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "id_Location" INTEGER NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Prospects_pkey" PRIMARY KEY ("id_dni")
);

-- CreateTable
CREATE TABLE "Bicicles" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER,
    "price" INTEGER NOT NULL,
    "photos" INTEGER,
    "id_owner" INTEGER NOT NULL,

    CONSTRAINT "Bicicles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Owners_mail_key" ON "Owners"("mail");

-- CreateIndex
CREATE UNIQUE INDEX "Owners_phone_key" ON "Owners"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Prospects_mail_key" ON "Prospects"("mail");

-- CreateIndex
CREATE UNIQUE INDEX "Prospects_phone_key" ON "Prospects"("phone");

-- AddForeignKey
ALTER TABLE "Motos" ADD CONSTRAINT "Motos_id_owner_fkey" FOREIGN KEY ("id_owner") REFERENCES "Owners"("id_dni") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_id_moto_fkey" FOREIGN KEY ("id_moto") REFERENCES "Motos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_id_prospect_fkey" FOREIGN KEY ("id_prospect") REFERENCES "Prospects"("id_dni") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Owners" ADD CONSTRAINT "Owners_id_location_fkey" FOREIGN KEY ("id_location") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prospects" ADD CONSTRAINT "Prospects_id_Location_fkey" FOREIGN KEY ("id_Location") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bicicles" ADD CONSTRAINT "Bicicles_id_owner_fkey" FOREIGN KEY ("id_owner") REFERENCES "Owners"("id_dni") ON DELETE RESTRICT ON UPDATE CASCADE;
