import axios from "../utils/axiosInstance";

// 🔒 Cambiar contraseña
export const changeUserPassword = async (
    id: number,
    currentPassword: string,
    newPassword: string
): Promise<{ message: string }> => {
    const response = await axios.put<{ message: string }>(
        `/usuarios/cambiarContrasena`,
        { id, currentPassword, newPassword }
    );
    return response.data;
};
