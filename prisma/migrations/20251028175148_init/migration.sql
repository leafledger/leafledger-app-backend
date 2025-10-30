-- CreateEnum
CREATE TYPE "VendorType" AS ENUM ('retailer', 'LP', 'broker', 'agency');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "user_name" VARCHAR(50) NOT NULL,
    "password" TEXT NOT NULL,
    "email" VARCHAR(250) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "contact_no" VARCHAR(13) NOT NULL,
    "store" VARCHAR(100) NOT NULL,
    "province_id" CHAR(3) NOT NULL,
    "city" VARCHAR(50) NOT NULL,
    "vendor_type" "VendorType" NOT NULL,
    "address" VARCHAR(250) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Province" (
    "id" CHAR(3) NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Province_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_name_key" ON "User"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_contact_no_key" ON "User"("contact_no");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "Province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
