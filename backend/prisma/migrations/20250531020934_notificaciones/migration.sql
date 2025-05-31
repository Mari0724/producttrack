/*
  Warnings:

  - The values [general,solicitud,recomendacion] on the enum `TipoNotificacion` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TipoNotificacion_new" AS ENUM ('STOCK_BAJO', 'PRODUCTO_VENCIDO', 'ACTUALIZACION_APP', 'COMENTARIO_PRODUCTO', 'REPOSICION_RECOMENDADA', 'PRODUCTO_POR_VENCER', 'RECOMENDACION');
ALTER TABLE "notificaciones" ALTER COLUMN "tipo" TYPE "TipoNotificacion_new" USING ("tipo"::text::"TipoNotificacion_new");
ALTER TYPE "TipoNotificacion" RENAME TO "TipoNotificacion_old";
ALTER TYPE "TipoNotificacion_new" RENAME TO "TipoNotificacion";
DROP TYPE "TipoNotificacion_old";
COMMIT;
