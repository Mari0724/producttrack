/*
  Warnings:

  - You are about to drop the column `confirmado` on the `passwordReset` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `passwordReset` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `passwordReset` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "passwordReset_idUsuario_key";

-- AlterTable
ALTER TABLE "passwordReset" DROP COLUMN "confirmado",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
