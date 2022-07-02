-- CreateEnum
CREATE TYPE "PetType" AS ENUM ('Dog', 'Cat', 'Rabbit', 'Small_Furry', 'Horse', 'Birds', 'Scales_Fins_Others', 'Barnyard');

-- CreateEnum
CREATE TYPE "PetGender" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "PetSize" AS ENUM ('small', 'medium', 'large');

-- CreateEnum
CREATE TYPE "PetStatus" AS ENUM ('adoptable', 'not_adoptable');

-- CreateTable
CREATE TABLE "Pets" (
    "id" SERIAL NOT NULL,
    "organization_id" TEXT NOT NULL,
    "url" TEXT,
    "type" "PetType" NOT NULL,
    "species" TEXT NOT NULL,
    "breeds" JSONB,
    "colors" JSONB,
    "age" INTEGER NOT NULL,
    "gender" "PetGender" NOT NULL,
    "size" "PetSize" NOT NULL,
    "attributes" JSONB,
    "tags" JSONB,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "photos" JSONB,
    "status" "PetStatus" NOT NULL,
    "status_changed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pets_pkey" PRIMARY KEY ("id")
);
