-- CreateEnum
CREATE TYPE "VendorType" AS ENUM ('retailer', 'LP', 'broker', 'agency');

-- CreateTable
CREATE TABLE "users" (
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
    "organisation_id" VARCHAR(36),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provinces" (
    "id" CHAR(3) NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "provinces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organisations" (
    "id" TEXT NOT NULL,
    "organisation_name" TEXT NOT NULL,
    "organisation_address" TEXT,
    "plan_id" INTEGER,

    CONSTRAINT "organisations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plans" (
    "id" SERIAL NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "features" JSONB NOT NULL,

    CONSTRAINT "plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "auth_token" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "user_id" VARCHAR(36) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListingAppSide" (
    "id" UUID NOT NULL,
    "source_id" TEXT NOT NULL,
    "url" VARCHAR(250) NOT NULL,
    "title" VARCHAR(250) NOT NULL,
    "category" VARCHAR(50) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "location" VARCHAR(250) NOT NULL,
    "status" BOOLEAN NOT NULL,
    "type" VARCHAR(50),
    "discounts" VARCHAR(4),
    "variant" TEXT,
    "stock" INTEGER,
    "variantType" CHAR(10),
    "listedPrice" DOUBLE PRECISION,
    "sku" VARCHAR(50),
    "thc" TEXT,
    "cbd" TEXT,

    CONSTRAINT "ListingAppSide_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_user_name_key" ON "users"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_contact_no_key" ON "users"("contact_no");

-- CreateIndex
CREATE UNIQUE INDEX "ListingAppSide_source_id_key" ON "ListingAppSide"("source_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "provinces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_organisation_id_fkey" FOREIGN KEY ("organisation_id") REFERENCES "organisations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organisations" ADD CONSTRAINT "organisations_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plans"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
