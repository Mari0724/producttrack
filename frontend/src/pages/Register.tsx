import React from "react";

const Register: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-[900px] h-[500px] rounded-2xl overflow-hidden shadow-lg">
        {/* Panel izquierdo (verde con bienvenida) */}
        <div className="w-2/5 bg-[#35492c] text-white flex flex-col justify-center items-center p-8">
          <h2 className="text-3xl font-bold mb-4">Bienvenidos</h2>
          <p className="text-center mb-6">
            Para unirte, por favor inicia sesión con tus datos.
          </p>
          <button className="px-6 py-2 border border-white rounded-full hover:bg-white hover:text-[#35492c] transition">
            Iniciar Sesión
          </button>
        </div>

        {/* Panel derecho (formulario) */}
        <div className="w-3/5 bg-white p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-6">Crear una cuenta</h2>
          <form className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Nombre de usuario
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-4 bg-[#35492c] text-white py-2 rounded-md hover:bg-[#2b3b24] transition"
            >
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
