/*
  Warnings:

  - You are about to drop the `analisisImagenes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "analisisImagenes" DROP CONSTRAINT "analisisImagenes_usuarioId_fkey";

-- DropTable
DROP TABLE "analisisImagenes";

-- CreateTable
CREATE TABLE "NutriScan" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "esAlimento" BOOLEAN NOT NULL,
    "consulta" TEXT NOT NULL,
    "respuesta" JSONB NOT NULL,
    "tipoAnalisis" TEXT NOT NULL,
    "fechaAnalisis" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NutriScan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NutriScan" ADD CONSTRAINT "NutriScan_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "users"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;
