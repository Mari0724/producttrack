import prisma from './utils/prismaClient';

const UMBRAL_INDIVIDUAL = 2;
const UMBRAL_EMPRESARIAL = 30;

async function sincronizarRecordatorios() {
    const productos = await prisma.productos.findMany({
        where: { eliminadoEn: null },
        select: {
            id: true,
            usuario: {
                select: {
                    tipoUsuario: true,
                },
            },
        },
    });

    for (const producto of productos) {
        const tipo = producto.usuario?.tipoUsuario?.toLowerCase() || "empresarial";
        const cantidadMinimaDeseada = tipo === "individual" ? UMBRAL_INDIVIDUAL : UMBRAL_EMPRESARIAL;

        const existente = await prisma.recorStock.findFirst({
            where: { productoId: producto.id },
            select: { cantidadMinima: true, idRecordatorio: true }, // 👈 aseguramos traer la clave única correcta
        });

        if (existente) {
            const cantidadMinimaDeseada = tipo === "individual" ? UMBRAL_INDIVIDUAL : UMBRAL_EMPRESARIAL;

            if (existente.cantidadMinima !== cantidadMinimaDeseada) {
                await prisma.recorStock.update({
                    where: { idRecordatorio: existente.idRecordatorio }, // ✅ usamos la clave única correcta
                    data: { cantidadMinima: cantidadMinimaDeseada },
                });

                console.log(`🔄 Actualizado recordatorio para producto ${producto.id}`);
            }
        }
    }

    console.log("🎯 Sincronización finalizada correctamente.");
}

sincronizarRecordatorios()
    .catch((e) => {
        console.error("❌ Error en la sincronización:", e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
