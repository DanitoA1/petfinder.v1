/*
  Warnings:

  - The values [not_adoptable] on the enum `PetStatus` will be removed. If these variants are still used in the database, this will fail.
  - Changed the type of `age` on the `Pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PetAge" AS ENUM ('baby', 'young', 'adult', 'senior');

-- AlterEnum
ALTER TYPE "PetSize" ADD VALUE 'xlarge';

-- AlterEnum
BEGIN;
CREATE TYPE "PetStatus_new" AS ENUM ('adoptable', 'adopted', 'found');
ALTER TABLE "Pets" ALTER COLUMN "status" TYPE "PetStatus_new" USING ("status"::text::"PetStatus_new");
ALTER TYPE "PetStatus" RENAME TO "PetStatus_old";
ALTER TYPE "PetStatus_new" RENAME TO "PetStatus";
DROP TYPE "PetStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "Pets" DROP COLUMN "age",
ADD COLUMN     "age" "PetAge" NOT NULL;
