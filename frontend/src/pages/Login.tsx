import React, { useState, useEffect } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LandingInfo from "../components/LandingInfo";
import Footer from "../components/Footer";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo: email, password }),
      });

      if (!response.ok) {
        throw new Error("Credenciales incorrectas");
      }

      const data = await response.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("tipoUsuario", data.tipoUsuario);
      localStorage.setItem("rol", data.rol);
      localStorage.setItem("username", data.username);

      alert("Inicio de sesión exitoso ✅");
      navigate("/nutriscan");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error al iniciar sesión ❌");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 md:p-8 overflow-auto">
        <div className="flex flex-col md:flex-row w-full max-w-[90%] md:max-w-4xl rounded-3xl overflow-hidden shadow-lg bg-white">
          <div className="md:w-2/5 bg-[#35492c] text-white p-8 flex flex-col justify-center items-center rounded-t-3xl md:rounded-l-2xl md:rounded-tr-none">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif mb-4 text-center break-words">
              ¡Bienvenido Nuevamente!
            </h2>
            <p className="text-center text-base md:text-lg mb-6 leading-snug">
              Para unirte por favor Inicia Sesión con tus datos
            </p>
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-2 bg-[#7a1d27] text-white rounded-full hover:bg-[#6a1722] transition"
            >
              Registrarse
            </button>
          </div>

          <div className="md:w-3/5 p-6 md:p-10 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-black mb-6 text-center">
              Iniciar sesión
            </h2>

            <form className="flex flex-col gap-5" onSubmit={handleLogin}>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Correo Electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-full px-12 py-2 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700"
                />
                <FaEnvelope className="absolute left-4 top-3 text-gray-500" />
              </div>

              <div className="relative">
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-full px-12 py-2 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700"
                />
                <FaLock className="absolute left-4 top-3 text-gray-500" />
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-600 text-white py-2 rounded-full hover:bg-yellow-700 transition"
              >
                Iniciar sesión
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Aquí va el contenido adicional */}
      <LandingInfo />
      <Footer />
    </>
  );
};

export default Login;
