import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// 🎭 Interfaz del usuario que extraemos del token
export interface Usuario {
  idUsuario: number;
  username: string;
  correo: string;
  tipoUsuario: "INDIVIDUAL" | "EMPRESARIAL";
  rol: "ADMIN" | "DESARROLLADOR" | "LECTOR" | "EDITOR" | string;
  rolEquipo?: string;
  empresaId?: number;
  perfilCompleto: boolean;
  nombreEmpresa?: string;
}

// 📦 Tipo del contexto
interface UserContextType {
  usuario: Usuario | null;
  setUsuario: (user: Usuario | null) => void;
  cargando: boolean;
  refreshUsuario: () => void;
}

// 🧠 Creamos el contexto
const UserContext = createContext<UserContextType | undefined>(undefined);

// 🌍 Proveedor de usuario
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(true); // 🔄 Estado de carga inicial

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<Usuario>(token);
        console.log("🔐 Usuario cargado desde token:", decoded);
        setUsuario(decoded);
      } catch (e) {
        console.error("❌ Error al decodificar token:", e);
      }
    } else {
      console.log("⚠️ No hay token en localStorage");
    }
    setCargando(false); // ✅ Marcamos que ya terminó de cargar
  }, []);

  // ✅ Función para refrescar manualmente el usuario desde el token
  const refreshUsuario = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<Usuario>(token);
        console.log("🔁 Usuario refrescado desde token:", decoded);
        setUsuario(decoded);
      } catch (e) {
        console.error("❌ Error al refrescar token:", e);
      }
    }
  };

  return (
    <UserContext.Provider value={{ usuario, setUsuario, cargando, refreshUsuario }}>
      {children}
    </UserContext.Provider>
  );
};

// 📟 Hook personalizado para acceder al contexto
/* eslint-disable react-refresh/only-export-components */
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe usarse dentro de un UserProvider");
  }
  return context;
};