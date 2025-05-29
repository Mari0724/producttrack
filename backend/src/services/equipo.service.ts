import prisma from '../utils/prismaClient'; // cliente separado
import { EquipoDTO } from "../models/EquipoDTO";
import { equipoSchema } from "../models/EquipoModel";


export class EquipoService {
  // Crear usuario tipo equipo
  async crearEquipo(data: EquipoDTO, empresaId: number) {
  const datosValidados = equipoSchema.parse(data);

  const nuevoEquipo = await prisma.users.create({
    data: {
      ...datosValidados,
      tipoUsuario: "EMPRESARIAL",
      rol: "EQUIPO",
      empresaId,
    },
  });

  return nuevoEquipo;
}


  // Obtener todos los usuarios equipo (sin filtros)
  async obtenerTodosLosEquipos() {
    return await prisma.users.findMany({
      where: {
        rol: "EQUIPO",
      },
    });
  }

  // Filtro múltiple (por nombre, correo, rolEquipo, empresaId)
  async filtrarEquipos(filtros: {
    nombreCompleto?: string;
    correo?: string;
    rolEquipo?: "LECTOR" | "COMENTARISTA" | "EDITOR";
    empresaId?: number;
  }) {
    const { nombreCompleto, correo, rolEquipo, empresaId } = filtros;

    return await prisma.users.findMany({
      where: {
        rol: "EQUIPO",
        nombreCompleto: nombreCompleto ? { contains: nombreCompleto, mode: "insensitive" } : undefined,
        correo: correo ? { contains: correo, mode: "insensitive" } : undefined,
        rolEquipo,
        empresaId,
      },
    });
  }

  // Buscar un equipo por ID
  async obtenerEquipoPorId(id: number) {
    const equipo = await prisma.users.findUnique({
      where: { idUsuario: id },
    });

    if (!equipo || equipo.rol !== "EQUIPO") {
      throw new Error("Usuario no encontrado o no es del tipo EQUIPO");
    }

    return equipo;
  }

  // Actualizar usuario equipo
  async actualizarEquipo(id: number, datosActualizados: Partial<EquipoDTO>, empresaId: number) {
    const equipo = await prisma.users.findFirst({
      where: { idUsuario: id, empresaId, rol: "EQUIPO" }
    });

    if (!equipo) throw new Error("Equipo no encontrado o no pertenece a esta empresa");

    equipoSchema.partial().parse(datosActualizados);

    return await prisma.users.update({
      where: { idUsuario: id },
      data: datosActualizados,
    });
}


  // Eliminar usuario equipo
  async eliminarEquipo(id: number) {
    await this.obtenerEquipoPorId(id); // Verificación

    return await prisma.users.delete({
      where: { idUsuario: id},
    });
  }
}
