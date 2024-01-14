/*
  Warnings:

  - Added the required column `federation` to the `Registrations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Registrations" ADD COLUMN     "federation" TEXT NOT NULL;
