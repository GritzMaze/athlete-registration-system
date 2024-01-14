/*
  Warnings:

  - Added the required column `birthDate` to the `Registrations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Registrations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Registrations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Registrations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Registrations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Registrations" ADD COLUMN     "birthDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "club" TEXT,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "events" TEXT[],
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
