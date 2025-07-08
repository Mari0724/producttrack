import prisma from '../utils/prismaClient';
import { EquipoDTO } from "../models/EquipoDTO";
import { equipoSchema } from "../models/EquipoModel";
import { sendTeamWelcomeEmail } from '../services/email.service';
import bcrypt from 'bcryptjs';

export class EquipoService {
  // Crear usuario tipo equipo
  async crearEquipo(data: EquipoDTO, empresaId: number) {
    const datosValidados = equipoSchema.parse(data);

    const hashedPassword = await bcrypt.hash(datosValidados.password, 10);

    const { empresaId: _omitEmpresaId, ...datosSinEmpresaId } = datosValidados;
    datosSinEmpresaId.perfilCompleto ??= false;

    // 🔍 Buscar nombre real de la empresa
    const empresa = await prisma.users.findUnique({
      where: { idUsuario: empresaId },
    });

    const nuevoEquipo = await prisma.users.create({
      data: {
        ...datosSinEmpresaId,
        password: hashedPassword,
        tipoUsuario: "EMPRESARIAL",
        rol: "EQUIPO",
        empresaId,
      },
    });

    // 💌 Enviar correo con nombre real de la empresa
    await sendTeamWelcomeEmail(
      nuevoEquipo.correo,
      datosValidados.password,
      empresa?.nombreEmpresa || 'Tu empresa'
    );

    return nuevoEquipo;
  }


  // Obtener todos los usuarios equipo (sin filtros)
  async obtenerTodosLosEquipos() {
    return await prisma.users.findMany({
      where: {
        rol: "EQUIPO",
        estado: "activo",
        deletedAt: null,
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
  async actualizarEquipo(id: number, datosActualizados: Partial<EquipoDTO>, empresaId?: number) {
    const condiciones: any = {
      idUsuario: id,
      rol: "EQUIPO",
    };

    if (empresaId !== undefined) {
      condiciones.empresaId = empresaId;
    }

    const equipo = await prisma.users.findFirst({ where: condiciones });

    if (!equipo) throw new Error("Equipo no encontrado o no pertenece a esta empresa");

    equipoSchema.partial().parse(datosActualizados);

    return await prisma.users.update({
      where: { idUsuario: id },
      data: datosActualizados,
    });
  }

  // Borrado lógico de un usuario equipo
  async marcarComoEliminado(id: number, empresaId?: number) {
    const condiciones: any = {
      idUsuario: id,
      rol: "EQUIPO",
    };

    if (empresaId !== undefined) {
      condiciones.empresaId = empresaId;
    }

    const equipo = await prisma.users.findFirst({
      where: condiciones,
    });

    if (!equipo) throw new Error("Equipo no encontrado o no pertenece a esta empresa");

    return await prisma.users.update({
      where: { idUsuario: id },
      data: {
        estado: "inactivo",
        deletedAt: new Date(),
      },
    });
  }

  // Eliminación física (completa) de un miembro del equipo (solo ADMIN)
  async eliminarFisicamente(id: number) {
    const usuario = await prisma.users.findUnique({
      where: { idUsuario: id },
    });

    if (!usuario || usuario.rol !== "EQUIPO") {
      throw new Error("Usuario no encontrado o no es del tipo EQUIPO");
    }

    return await prisma.users.delete({
      where: { idUsuario: id },
    });
  }


  // Eliminar a todo el equipo de una empresa
  async eliminarTodoElEquipo(empresaId: number) {
    const resultado = await prisma.users.deleteMany({
      where: {
        rol: "EQUIPO",
        empresaId,
      },
    });

    return {
      mensaje: `Se eliminaron ${resultado.count} usuarios del equipo de la empresa.`,
    };
  }
}