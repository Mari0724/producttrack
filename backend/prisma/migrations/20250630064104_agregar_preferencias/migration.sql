-- CreateTable
CREATE TABLE "preferenciasNotificaciones" (
    "id" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "stockBajo" BOOLEAN NOT NULL DEFAULT true,
    "productoVencido" BOOLEAN NOT NULL DEFAULT true,
    "comentarios" BOOLEAN NOT NULL DEFAULT true,
    "reposicion" BOOLEAN NOT NULL DEFAULT true,
    "actualizacion" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "preferenciasNotificaciones_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "preferenciasNotificaciones_idUsuario_key" ON "preferenciasNotificaciones"("idUsuario");

-- AddForeignKey
ALTER TABLE "preferenciasNotificaciones" ADD CONSTRAINT "preferenciasNotificaciones_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "users"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;
