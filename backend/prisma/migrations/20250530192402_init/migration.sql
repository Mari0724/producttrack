-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('INDIVIDUAL', 'EMPRESARIAL');

-- CreateEnum
CREATE TYPE "rol" AS ENUM ('USUARIO', 'EQUIPO', 'ADMIN', 'DESARROLLADOR');

-- CreateEnum
CREATE TYPE "rolEquipo" AS ENUM ('LECTOR', 'COMENTARISTA', 'EDITOR');

-- CreateEnum
CREATE TYPE "EstadoProducto" AS ENUM ('DISPONIBLE', 'AGOTADO', 'RESERVADO', 'VENCIDO');

-- CreateEnum
CREATE TYPE "TipoNotificacion" AS ENUM ('general', 'solicitud', 'recomendacion');

-- CreateEnum
CREATE TYPE "EstadoRecordatorio" AS ENUM ('pendiente', 'atendido');

-- CreateEnum
CREATE TYPE "EstadoComentario" AS ENUM ('pendiente', 'revisado');

-- CreateEnum
CREATE TYPE "EstadoSoporte" AS ENUM ('pendiente', 'en_proceso', 'resuelto');

-- CreateEnum
CREATE TYPE "AccionHistorial" AS ENUM ('agregado', 'modificado', 'eliminado');

-- CreateEnum
CREATE TYPE "MetodoAPI" AS ENUM ('GET', 'POST', 'PUT', 'DELETE');

-- CreateEnum
CREATE TYPE "TipoEvento" AS ENUM ('evento', 'error', 'metrica');

-- CreateTable
CREATE TABLE "users" (
    "idUsuario" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nombreCompleto" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "fotoPerfil" TEXT NOT NULL,
    "nombreEmpresa" TEXT,
    "nit" TEXT,
    "estado" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "tipoUsuario" "TipoUsuario" NOT NULL,
    "rolEquipo" "rolEquipo",
    "empresaId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("idUsuario")
);

-- CreateTable
CREATE TABLE "auteRest" (
    "idSeguridad" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "googleId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "fechaSolicitud" TIMESTAMP(3) NOT NULL,
    "fechaExpiracion" TIMESTAMP(3) NOT NULL,
    "usado" BOOLEAN NOT NULL,
    "confirmado" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "auteRest_pkey" PRIMARY KEY ("idSeguridad")
);

-- CreateTable
CREATE TABLE "notificaciones" (
    "idNotificacion" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "tipo" "TipoNotificacion" NOT NULL,
    "titulo" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "fechaEnvio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leida" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "notificaciones_pkey" PRIMARY KEY ("idNotificacion")
);

-- CreateTable
CREATE TABLE "productos" (
    "id" SERIAL NOT NULL,
    "codigoBarras" TEXT NOT NULL,
    "codigoQR" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio" DECIMAL(65,30) NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "fechaAdquisicion" TIMESTAMP(3) NOT NULL,
    "fechaVencimiento" TIMESTAMP(3) NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "estado" "EstadoProducto" NOT NULL,
    "imagen" TEXT NOT NULL,
    "categoria" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "eliminadoEn" TIMESTAMP(3),

    CONSTRAINT "productos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "histoVenta" (
    "idVenta" SERIAL NOT NULL,
    "idProducto" INTEGER NOT NULL,
    "cantidadVendida" INTEGER NOT NULL,
    "fechaVenta" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "histoVenta_pkey" PRIMARY KEY ("idVenta")
);

-- CreateTable
CREATE TABLE "recorStock" (
    "idRecordatorio" SERIAL NOT NULL,
    "idProducto" INTEGER NOT NULL,
    "cantidadMinima" INTEGER NOT NULL,
    "fechaRecordatorio" TIMESTAMP(3) NOT NULL,
    "estado" "EstadoRecordatorio" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recorStock_pkey" PRIMARY KEY ("idRecordatorio")
);

-- CreateTable
CREATE TABLE "comentarios" (
    "idComentario" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "comentario" TEXT NOT NULL,
    "fechaComentario" TIMESTAMP(3) NOT NULL,
    "estado" "EstadoComentario" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comentarios_pkey" PRIMARY KEY ("idComentario")
);

-- CreateTable
CREATE TABLE "soporte" (
    "idSoporte" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "asunto" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "estado" "EstadoSoporte" NOT NULL,
    "respuesta" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "soporte_pkey" PRIMARY KEY ("idSoporte")
);

-- CreateTable
CREATE TABLE "ajustInven" (
    "idAjuste" SERIAL NOT NULL,
    "idProducto" INTEGER NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "cantidadAnterior" INTEGER NOT NULL,
    "cantidadNueva" INTEGER NOT NULL,
    "motivo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ajustInven_pkey" PRIMARY KEY ("idAjuste")
);

-- CreateTable
CREATE TABLE "alertVen" (
    "idAlerta" SERIAL NOT NULL,
    "idProducto" INTEGER NOT NULL,
    "fechaAlerta" TIMESTAMP(3) NOT NULL,
    "estado" "EstadoRecordatorio" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "alertVen_pkey" PRIMARY KEY ("idAlerta")
);

-- CreateTable
CREATE TABLE "analisisImagenes" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "esAlimento" BOOLEAN NOT NULL,
    "consulta" TEXT NOT NULL,
    "respuesta" JSONB NOT NULL,
    "fechaAnalisis" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "analisisImagenes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "colaboraciones" (
    "id" SERIAL NOT NULL,
    "productoId" INTEGER NOT NULL,
    "marca" TEXT NOT NULL,
    "tarifa" DECIMAL(65,30) NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaFin" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "colaboraciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "histInv" (
    "id" SERIAL NOT NULL,
    "productoId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "accion" "AccionHistorial" NOT NULL,
    "cantidad_anterior" INTEGER NOT NULL,
    "cantidad_nueva" INTEGER NOT NULL,
    "precio_anterior" DECIMAL(65,30) NOT NULL,
    "precio_nuevo" DECIMAL(65,30) NOT NULL,
    "fechaCambio" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "histInv_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "api_logs" (
    "id" SERIAL NOT NULL,
    "endpoint" TEXT NOT NULL,
    "metodo" "MetodoAPI" NOT NULL,
    "statusCode" INTEGER NOT NULL,
    "tiempoRespuesta" DECIMAL(65,30) NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "errorMensaje" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "api_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonAudRend" (
    "id" SERIAL NOT NULL,
    "tipoEvento" "TipoEvento" NOT NULL,
    "nombreEvento" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "ip_address" TEXT NOT NULL,
    "nivel" TEXT NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "stackTrace" TEXT NOT NULL,

    CONSTRAINT "MonAudRend_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auditoria" (
    "id" SERIAL NOT NULL,
    "evento" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "auditoria_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_correo_key" ON "users"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "users_nit_key" ON "users"("nit");

-- CreateIndex
CREATE UNIQUE INDEX "auteRest_idUsuario_key" ON "auteRest"("idUsuario");

-- CreateIndex
CREATE UNIQUE INDEX "auteRest_googleId_key" ON "auteRest"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "productos_codigoBarras_key" ON "productos"("codigoBarras");

-- CreateIndex
CREATE UNIQUE INDEX "productos_codigoQR_key" ON "productos"("codigoQR");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "users"("idUsuario") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auteRest" ADD CONSTRAINT "auteRest_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "users"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificaciones" ADD CONSTRAINT "notificaciones_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "users"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productos" ADD CONSTRAINT "productos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "users"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "histoVenta" ADD CONSTRAINT "histoVenta_idProducto_fkey" FOREIGN KEY ("idProducto") REFERENCES "productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recorStock" ADD CONSTRAINT "recorStock_idProducto_fkey" FOREIGN KEY ("idProducto") REFERENCES "productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentarios" ADD CONSTRAINT "comentarios_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "users"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "soporte" ADD CONSTRAINT "soporte_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "users"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ajustInven" ADD CONSTRAINT "ajustInven_idProducto_fkey" FOREIGN KEY ("idProducto") REFERENCES "productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ajustInven" ADD CONSTRAINT "ajustInven_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "users"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alertVen" ADD CONSTRAINT "alertVen_idProducto_fkey" FOREIGN KEY ("idProducto") REFERENCES "productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "analisisImagenes" ADD CONSTRAINT "analisisImagenes_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "users"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "colaboraciones" ADD CONSTRAINT "colaboraciones_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "histInv" ADD CONSTRAINT "histInv_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "histInv" ADD CONSTRAINT "histInv_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "users"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "api_logs" ADD CONSTRAINT "api_logs_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "users"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonAudRend" ADD CONSTRAINT "MonAudRend_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "users"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auditoria" ADD CONSTRAINT "auditoria_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "users"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;
