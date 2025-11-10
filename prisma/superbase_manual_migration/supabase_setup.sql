-- LeafLedger Database Setup for Supabase
-- Execute this file via: psql "postgresql://postgres.lbqqlaqzeyuszrhtdnvc:Leafledger2025@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres" -f supabase_setup.sql

-- Migration 1: Initial Setup (20251028175148_init)
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

-- Migration 2: Schema Refactor (20251108095401_adding_f_key)
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_province_id_fkey";

-- DropTable
DROP TABLE "Province";

-- DropTable
DROP TABLE "User";

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

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_user_name_key" ON "users"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_contact_no_key" ON "users"("contact_no");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "provinces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_organisation_id_fkey" FOREIGN KEY ("organisation_id") REFERENCES "organisations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organisations" ADD CONSTRAINT "organisations_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plans"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Create _prisma_migrations table to track migrations
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
    "id" VARCHAR(36) NOT NULL PRIMARY KEY,
    "checksum" VARCHAR(64) NOT NULL,
    "finished_at" TIMESTAMPTZ,
    "migration_name" VARCHAR(255) NOT NULL,
    "logs" TEXT,
    "rolled_back_at" TIMESTAMPTZ,
    "started_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "applied_steps_count" INTEGER NOT NULL DEFAULT 0
);

-- Record migrations as applied
INSERT INTO "_prisma_migrations" ("id", "checksum", "migration_name", "finished_at", "applied_steps_count")
VALUES
    (gen_random_uuid()::text, 'a1b2c3d4e5f6', '20251028175148_init', now(), 1),
    (gen_random_uuid()::text, 'f6e5d4c3b2a1', '20251108095401_adding_f_key', now(), 1);

-- All done! Your database schema is now set up.
