/*
  Warnings:

  - The values [ADMIN] on the enum `rolEquipo` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "rolEquipo_new" AS ENUM ('LECTOR', 'COMENTARISTA', 'EDITOR');
ALTER TABLE "users" ALTER COLUMN "rolEquipo" TYPE "rolEquipo_new" USING ("rolEquipo"::text::"rolEquipo_new");
ALTER TYPE "rolEquipo" RENAME TO "rolEquipo_old";
ALTER TYPE "rolEquipo_new" RENAME TO "rolEquipo";
DROP TYPE "rolEquipo_old";
COMMIT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "empresaId" INTEGER;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "users"("idUsuario") ON DELETE SET NULL ON UPDATE CASCADE;
