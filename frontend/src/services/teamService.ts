import axiosInstance from "../utils/axiosInstance";

interface CreateTeamMemberDTO {
    username: string;
    correo: string;
    password: string;
    nombreCompleto: string;
    rol: "EQUIPO";
    rolEquipo: "LECTOR" | "COMENTARISTA" | "EDITOR";
    empresaId: number;
}

export async function createTeamMember(data: CreateTeamMemberDTO) {
    const response = await axiosInstance.post("/usuarios", data);
    return response.data;
}