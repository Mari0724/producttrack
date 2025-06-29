import prisma from './utils/prismaClient';

const CANTIDAD_MINIMA_DEFECTO = 30;

async function insertarRecordatoriosFaltantes() {
    const productos = await prisma.productos.findMany({
        where: { eliminadoEn: null },
        select: { id: true },
    });

    for (const producto of productos) {
        const yaTieneRecordatorio = await prisma.recorStock.findFirst({
            where: { productoId: producto.id },
        });

        if (!yaTieneRecordatorio) {
            await prisma.recorStock.create({
                data: {
                    productoId: producto.id,
                    cantidadMinima: CANTIDAD_MINIMA_DEFECTO,
                    estado: 'PENDIENTE',
                    fechaRecordatorio: new Date(),
                },
            });

            console.log(`📌 Se creó recordatorio para producto ID: ${producto.id}`);
        }
    }

    console.log("✅ Todos los productos ahora tienen recordatorios de stock.");
}

insertarRecordatoriosFaltantes()
    .catch((e) => {
        console.error("❌ Error creando recordatorios:", e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
