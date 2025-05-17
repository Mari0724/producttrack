import { z } from "zod";

export const userSchema = z.object({
    username: z
        .string()
        .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
        .trim(),

    correo: z
        .string()
        .email("Correo inválido")
        .trim(),

    password: z
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
        .regex(/[a-z]/, "Debe contener al menos una letra minúscula")
        .regex(/[0-9]/, "Debe contener al menos un número")
        .regex(/[^A-Za-z0-9]/, "Debe contener al menos un carácter especial"),

    nombreCompleto: z
        .string()
        .min(3, "El nombre completo es requerido")
        .trim(),

    telefono: z
        .string()
        .regex(/^\+?[0-9\s\-().]{7,20}$/, "El número de teléfono no es válido"),

    direccion: z
        .string()
        .min(5, "La dirección debe tener al menos 5 caracteres")
        .trim(),

    fotoPerfil: z
        .string()
        .url("La foto de perfil debe ser una URL válida"),

    // Nombre de la empresa solo es obligatorio si tipoUsuario es EMPRESARIAL
    nombreEmpresa: z
        .string()
        .min(3, "El nombre de la empresa es requerido")
        .trim()
        .optional(),  // Esto lo hacemos opcional inicialmente

    // NIT solo es obligatorio si tipoUsuario es EMPRESARIAL
    nit: z
        .string()
        .regex(/^\d{9,15}$/, "El NIT debe tener entre 9 y 15 dígitos")
        .optional(),  // Lo dejamos opcional inicialmente

    estado: z
        .enum(["activo", "inactivo"])
        .default("activo"),

    rol: z
        .enum(["USUARIO", "EQUIPO", "ADMIN", "DESARROLLADOR"]),

    rolEquipo: z
        .enum(["LECTOR", "COMENTARISTA", "EDITOR", "ADMIN"])
        .optional(),

    // Campo para indicar si es un usuario individual o empresarial
    tipoUsuario: z
        .enum(["INDIVIDUAL", "EMPRESARIAL"]),
})
.refine(
    (data) => {
        // Validación adicional para asegurarse que el NIT y nombreEmpresa son obligatorios solo si el usuario es EMPRESARIAL
        if (data.tipoUsuario === "EMPRESARIAL") {
            if (!data.nombreEmpresa || !data.nit) {
                return false; // Si falta alguno, la validación fallará
            }
        }
        return true; // Si pasa la validación
    },
    {
        message: "El nombre de la empresa y el NIT son obligatorios para los usuarios empresariales.",
        path: ["nombreEmpresa", "nit"],
    }
);

export interface MensajeRespuesta {
    message: string;
}

export type ValidatedUser = z.infer<typeof userSchema>;


