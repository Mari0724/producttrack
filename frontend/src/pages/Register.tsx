import React, { useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaHome,
  FaBuilding,
  FaIdCard,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [userType, setUserType] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [nit, setNit] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!userType) newErrors.userType = "Selecciona un tipo de usuario.";
    if (!username.trim()) newErrors.username = "El nombre de usuario es obligatorio.";
    if (!email.includes("@")) newErrors.email = "Correo inválido.";
    if (password.length < 6) newErrors.password = "Mínimo 6 caracteres.";
    if (!fullName.trim()) newErrors.fullName = "Nombre completo obligatorio.";
    if (!/^[0-9]{7,15}$/.test(phone)) newErrors.phone = "Teléfono inválido.";
    if (!address.trim()) newErrors.address = "Dirección obligatoria.";
    if (userType === "empresarial") {
      if (!companyName.trim()) newErrors.companyName = "Nombre de empresa requerido.";
      if (!nit.trim()) newErrors.nit = "NIT obligatorio.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const datos = {
      username,
      correo: email,
      password,
      nombreCompleto: fullName,
      telefono: phone,
      direccion: address,
      rol: "USUARIO",
      tipoUsuario: userType.toUpperCase(),
      nombreEmpresa: userType === "empresarial" ? companyName : undefined,
      nit: userType === "empresarial" ? nit : undefined,
    };

    try {
      setLoading(true);
      await axios.post("http://localhost:3000/usuarios", datos);
      alert("Usuario registrado correctamente ✅");
      navigate("/login");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("Hubo un error al registrarse ❌");
    } finally {
      setLoading(false);
    }
  };

  const renderError = (field: string) => (
    errors[field] && <p className="text-red-600 text-sm mt-1 ml-3">{errors[field]}</p>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 md:p-8 overflow-auto">
      <div className="flex flex-col md:flex-row w-full max-w-[90%] md:max-w-4xl h-auto rounded-3xl overflow-hidden shadow-lg bg-white">
        {/* Panel izquierdo */}
        <div className="md:w-2/5 bg-[#35492c] text-white p-8 flex flex-col justify-center items-center rounded-t-3xl md:rounded-l-2xl md:rounded-tr-none">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif mb-4 text-center">
            Bienvenidos
          </h2>
          <p className="text-center text-base md:text-lg mb-6 leading-snug">
            Para unirte, por favor inicia sesión con tus datos.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 md:px-8 py-2 md:py-3 bg-[#7a1d27] text-white rounded-full hover:bg-[#6a1722] transition text-sm md:text-base"
          >
            Iniciar Sesión
          </button>
        </div>

        {/* Panel derecho */}
        <div className="md:w-3/5 p-6 md:p-10 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-black mb-6 text-center">
            Crear una cuenta
          </h2>

          <form className="flex flex-col gap-4" onSubmit={handleRegister}>
            {/* Tipo de usuario */}
            <div className="relative">
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="w-full border border-gray-300 rounded-full px-12 py-2 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700 appearance-none"
              >
                <option value="">Selecciona un tipo de usuario</option>
                <option value="individual">Individual</option>
                <option value="empresarial">Empresarial</option>
              </select>
              <FaUser className="absolute left-4 top-3 text-gray-500" />
              {renderError("userType")}
            </div>

            {/* Username */}
            <div className="relative">
              <input
                type="text"
                placeholder="Nombre de Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-300 rounded-full px-12 py-2 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700"
                />
              <FaUser className="absolute left-4 top-3 text-gray-500" />
              {renderError("username")}
            </div>

            {/* Correo */}
            <div className="relative">
              <input
                type="email"
                placeholder="Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-full px-12 py-2 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700"
              />
              <FaEnvelope className="absolute left-4 top-3 text-gray-500" />
              {renderError("email")}
            </div>

            {/* Contraseña */}
            <div className="relative">
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-full px-12 py-2 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700"
              />
              <FaLock className="absolute left-4 top-3 text-gray-500" />
              {renderError("password")}
            </div>

            {/* Datos comunes */}
            {(userType === "individual" || userType === "empresarial") && (
              <>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Nombre Completo"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full border border-gray-300 rounded-full px-12 py-2 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700"
                  />
                  <FaIdCard className="absolute left-4 top-3 text-gray-500" />
                  {renderError("fullName")}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Número de Teléfono"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-gray-300 rounded-full px-12 py-2 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700"
                  />
                  <FaPhone className="absolute left-4 top-3 text-gray-500" />
                  {renderError("phone")}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Dirección"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border border-gray-300 rounded-full px-12 py-2 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700"
                  />
                  <FaHome className="absolute left-4 top-3 text-gray-500" />
                  {renderError("address")}
                </div>
              </>
            )}

            {/* Datos empresariales */}
            {userType === "empresarial" && (
              <>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Nombre de la Empresa"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full border border-gray-300 rounded-full px-12 py-2 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700"
                  />
                  <FaBuilding className="absolute left-4 top-3 text-gray-500" />
                  {renderError("companyName")}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="NIT"
                    value={nit}
                    onChange={(e) => setNit(e.target.value)}
                    className="w-full border border-gray-300 rounded-full px-12 py-2 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700"
                  />
                  <FaIdCard className="absolute left-4 top-3 text-gray-500" />
                  {renderError("nit")}
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 text-white py-2 rounded-full transition text-sm md:text-base bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50"
            >
              {loading ? "Registrando..." : "Registrarme"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
