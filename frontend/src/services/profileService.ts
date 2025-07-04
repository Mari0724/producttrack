import axios from "../utils/axiosInstance";
import type { UserDTO } from "../types/UserDTO";

// 🔍 Obtener perfil por ID
export const getUserProfile = async (id: number): Promise<UserDTO> => {
  const response = await axios.get<UserDTO>(`/usuarios/${id}`);
  return response.data;
};

// 🆙 Actualizar datos del perfil
export const updateUserProfile = async (
  id: number,
  data: Partial<UserDTO>
): Promise<{ message: string }> => {
  const response = await axios.put<{ message: string }>(`/usuarios/${id}`, data);
  return response.data;
};

// 🖼️ Subir nueva foto de perfil
export const uploadUserProfilePhoto = async (
  userId: number,
  file: File
): Promise<{ message: string; url: string }> => {
  const formData = new FormData();
  formData.append("fotoPerfil", file);

  const response = await axios.put<{ message: string; url: string }>(
    `/api/usuarios/${userId}/foto`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return response.data;
};

// 🏢 Obtener info de la empresa desde su ID
export const getEmpresaInfo = async (empresaId: number) => {
  const response = await axios.get(`/usuarios/${empresaId}?tipoUsuario=EMPRESARIAL`);
  return response.data;
};
