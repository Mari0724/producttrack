import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";


interface Usuario {
  id: number;
  tipoUsuario: "INDIVIDUAL" | "EMPRESARIAL";
  rol: "ADMIN" | "DESARROLLADOR" | "LECTOR" | "EDITOR" | string;
  [key: string]: unknown;
}

interface UserContextType {
  usuario: Usuario | null;
  setUsuario: (user: Usuario | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<Usuario>(token);
        console.log("🔐 Usuario cargado desde token:", decoded); // ← agrega esto
        setUsuario(decoded);
      } catch (e) {
        console.error("❌ Error al decodificar token:", e);
      }
    }else {
    console.log("⚠️ No hay token en localStorage");
    }
  }, []);

  return (
    <UserContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe usarse dentro de un UserProvider");
  }
  return context;
};
