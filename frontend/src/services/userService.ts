import axiosInstance from "../utils/axiosInstance";
import type { UserDTO } from "../types/UserDTO";

// Obtener empresa por ID
export const getEmpresaById = async (id: number) => {
  const response = await axiosInstance.get<UserDTO>(`/usuarios/empresa/${id}`);
  return response.data;
};

// Obtener usuario por ID
export const getUserById = async (id: number) => {
  const response = await axiosInstance.get<UserDTO>(`/usuarios/${id}`);
  return response.data;
};

// Actualizar usuario
export const updateUsuario = async (id: number, data: Partial<UserDTO>) => {
  const response = await axiosInstance.put<{ message: string }>(`/usuarios/${id}`, data);
  return response.data;
};

// Subir foto de perfil
export const subirFotoPerfil = async (userId: number, foto: File) => {
  const formData = new FormData();
  formData.append("fotoPerfil", foto);

  const response = await axiosInstance.put(
    `/api/usuarios/${userId}/foto`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return response.data;
};