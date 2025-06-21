// src/components/register/RegisterForm.tsx
import React from "react";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaHome, FaBuilding, FaIdCard, } from "react-icons/fa";

interface Props {
  userType: string;
  username: string;
  email: string;
  password: string;
  fullName: string;
  phone: string;
  address: string;
  companyName: string;
  nit: string;
  errors: { [key: string]: string };
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  setUserType: React.Dispatch<React.SetStateAction<string>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setFullName: React.Dispatch<React.SetStateAction<string>>;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  setCompanyName: React.Dispatch<React.SetStateAction<string>>;
  setNit: React.Dispatch<React.SetStateAction<string>>;
}

const RegisterForm: React.FC<Props> = ({
  userType,
  username,
  email,
  password,
  fullName,
  phone,
  address,
  companyName,
  nit,
  errors,
  loading,
  onSubmit,
  setUserType,
  setUsername,
  setEmail,
  setPassword,
  setFullName,
  setPhone,
  setAddress,
  setCompanyName,
  setNit,
}) => {
  const renderError = (field: string) =>
    errors[field] && <p className="text-red-600 text-sm mt-1 ml-3">{errors[field]}</p>;

  return (
    <div className="md:w-3/5 p-6 md:p-10 flex flex-col justify-center">
      <h2 className="text-2xl md:text-3xl font-semibold text-black mb-6 text-center">
        Crear una cuenta
      </h2>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        {/* Select Tipo Usuario */}
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

        {/* Campos comunes */}
        {[
          { icon: FaUser, placeholder: "Nombre de Usuario", value: username, setter: setUsername, name: "username" },
          { icon: FaEnvelope, placeholder: "Correo Electrónico", value: email, setter: setEmail, name: "email" },
          { icon: FaLock, placeholder: "Contraseña", value: password, setter: setPassword, name: "password", type: "password" },
        ].map(({ icon: Icon, placeholder, value, setter, name, type }) => (
          <div key={name} className="relative">
            <input
              type={type || "text"}
              placeholder={placeholder}
              value={value}
              onChange={(e) => setter(e.target.value)}
              className="w-full border border-gray-300 rounded-full px-12 py-2 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
            <Icon className="absolute left-4 top-3 text-gray-500" />
            {renderError(name)}
          </div>
        ))}

        {/* Datos comunes */}
        {(userType === "individual" || userType === "empresarial") && (
          <>
            <div className="relative">
              <input
                type="text"
                placeholder="Nombre Completo"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border border-gray-300 rounded-full px-12 py-2"
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
                className="w-full border border-gray-300 rounded-full px-12 py-2"
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
                className="w-full border border-gray-300 rounded-full px-12 py-2"
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
                className="w-full border border-gray-300 rounded-full px-12 py-2"
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
                className="w-full border border-gray-300 rounded-full px-12 py-2"
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
  );
};

export default RegisterForm;
