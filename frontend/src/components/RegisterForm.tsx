import React, { useState } from "react";

type Props = {
switchView: () => void;
};

const RegisterForm: React.FC<Props> = ({ switchView }) => {
const [userType, setUserType] = useState("");
const [form, setForm] = useState({
nombreUsuario: "",
nombreEmpresa: "",
nombreEmpresaEquipo: "",
nombreUsuarioEquipo: "",
correo: "",
contrasena: "",
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
const { name, value } = e.target;
setForm((prev) => ({ ...prev, [name]: value }));
};

const isPasswordSecure = (password: string) =>
/^(?=.[0-9])(?=.[!@#$%^&])[A-Za-z\d!@#$%^&]{8,}$/.test(password);

const handleSubmit = (e: React.FormEvent) => {
e.preventDefault();
const { nombreUsuario, nombreEmpresa, nombreEmpresaEquipo, nombreUsuarioEquipo, correo, contrasena } = form;

let valid = true;
switch (userType) {
  case "persona":
    valid = !!(nombreUsuario && correo && contrasena);
    break;
  case "empresa":
    valid = !!(nombreEmpresa && correo && contrasena);
    break;
  case "equipoTrabajo":
    valid = !!(nombreEmpresaEquipo && nombreUsuarioEquipo && correo && contrasena);
    break;
  default:
    valid = false;
}

if (!isPasswordSecure(contrasena)) {
  alert("La contraseña debe tener al menos 8 caracteres, un número y un carácter especial.");
  return;
}

if (!valid) {
  alert("Por favor complete todos los campos requeridos.");
  return;
}

console.log("Formulario válido:", form);
// Aquí iría la lógica de envío al backend
};

return (
<div>
<h2 className="text-2xl font-bold text-center text-yellow-500 mb-6">Crear una Cuenta</h2>

  <select
    name="userType"
    value={userType}
    onChange={(e) => setUserType(e.target.value)}
    required
    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
  >
    <option value="" disabled>
      Tipo de Usuario
    </option>
    <option value="persona">Persona</option>
    <option value="empresa">Empresa</option>
    <option value="equipoTrabajo">Equipo de Trabajo</option>
  </select>

  <form onSubmit={handleSubmit} className="space-y-3">
    {userType === "persona" && (
      <input
        type="text"
        name="nombreUsuario"
        value={form.nombreUsuario}
        onChange={handleChange}
        placeholder="Nombre de Usuario"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
      />
    )}

    {userType === "empresa" && (
      <input
        type="text"
        name="nombreEmpresa"
        value={form.nombreEmpresa}
        onChange={handleChange}
        placeholder="Nombre de la Empresa"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
      />
    )}

    {userType === "equipoTrabajo" && (
      <>
        <input
          type="text"
          name="nombreEmpresaEquipo"
          value={form.nombreEmpresaEquipo}
          onChange={handleChange}
          placeholder="Nombre de la Empresa"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
        />
        <input
          type="text"
          name="nombreUsuarioEquipo"
          value={form.nombreUsuarioEquipo}
          onChange={handleChange}
          placeholder="Nombre de Usuario"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
        />
      </>
    )}

    <input
      type="email"
      name="correo"
      value={form.correo}
      onChange={handleChange}
      placeholder="Correo Electrónico"
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
      required
    />

    <input
      type="password"
      name="contrasena"
      value={form.contrasena}
      onChange={handleChange}
      placeholder="Contraseña"
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
      required
    />

    <button
      type="submit"
      className="w-full bg-yellow-400 text-white py-2 rounded-lg hover:bg-yellow-500 transition"
    >
      Registrarme
    </button>

    <button
      type="button"
      onClick={switchView}
      className="w-full text-sm text-center text-yellow-600 hover:underline mt-2"
    >
      ¿Ya tienes cuenta? Inicia sesión
    </button>
  </form>
</div>
);
};

export default RegisterForm;